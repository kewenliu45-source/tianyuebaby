/**
 * Unify legacy news content images as portableImage blocks.
 *
 * Usage:
 *   node scripts/migrate-news-content-images.ts --dry-run
 *   node scripts/migrate-news-content-images.ts --apply --expect=<dry-run token>
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { isDeepStrictEqual } from "node:util";
import nextEnv from "@next/env";
import { createClient } from "next-sanity";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!token) throw new Error("Missing SANITY_API_WRITE_TOKEN");

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "raw",
  token,
});

type ContentBlock = Record<string, unknown> & {
  _key?: string;
  _type?: string;
};

interface NewsArticleDocument {
  _id: string;
  _rev: string;
  _type: "newsArticle";
  title?: string;
  content?: ContentBlock[];
}

interface ImageStats {
  documents: number;
  imageWithAlt: number;
  nativeImage: number;
  portableImage: number;
}

function isLegacyImage(block: ContentBlock): boolean {
  return block._type === "imageWithAlt" || block._type === "image";
}

function countStats(documents: NewsArticleDocument[]): ImageStats {
  let imageWithAlt = 0;
  let nativeImage = 0;
  let portableImage = 0;
  let affectedDocuments = 0;

  for (const document of documents) {
    let affected = false;
    for (const block of document.content || []) {
      if (block._type === "imageWithAlt") {
        imageWithAlt += 1;
        affected = true;
      } else if (block._type === "image") {
        nativeImage += 1;
        affected = true;
      } else if (block._type === "portableImage") {
        portableImage += 1;
      }
    }
    if (affected) affectedDocuments += 1;
  }

  return {
    documents: affectedDocuments,
    imageWithAlt,
    nativeImage,
    portableImage,
  };
}

function statsToken(stats: ImageStats): string {
  return [
    stats.documents,
    stats.imageWithAlt,
    stats.nativeImage,
    stats.portableImage,
  ].join(":");
}

function expectedTokenFromArgs(): string | undefined {
  return process.argv
    .find((argument) => argument.startsWith("--expect="))
    ?.slice("--expect=".length);
}

function transformBlock(block: ContentBlock): ContentBlock {
  if (block._type === "imageWithAlt") {
    return { ...block, _type: "portableImage" };
  }

  if (block._type === "image") {
    const {
      _key,
      _type: _discardedType,
      alt,
      caption,
      ...imageFields
    } = block;

    return {
      _key,
      _type: "portableImage",
      image: { _type: "image", ...imageFields },
      ...(alt !== undefined ? { alt } : {}),
      ...(caption !== undefined ? { caption } : {}),
    };
  }

  return block;
}

function transformedContent(document: NewsArticleDocument): ContentBlock[] {
  return (document.content || []).map(transformBlock);
}

async function fetchNewsArticles(): Promise<NewsArticleDocument[]> {
  return client.fetch(
    `*[_type == "newsArticle"]{_id, _rev, _type, title, content}`,
  );
}

async function createBackup(
  documents: NewsArticleDocument[],
): Promise<string> {
  const directory = path.join(process.cwd(), "tmp", "migration-backups");
  await mkdir(directory, { recursive: true });
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = path.join(
    directory,
    `news-content-images-${timestamp}.json`,
  );
  await writeFile(
    filename,
    `${JSON.stringify(
      {
        createdAt: new Date().toISOString(),
        projectId,
        dataset,
        documents,
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
  return filename;
}

function printStats(label: string, stats: ImageStats): void {
  console.log(label);
  console.log(`  Affected documents: ${stats.documents}`);
  console.log(`  imageWithAlt blocks: ${stats.imageWithAlt}`);
  console.log(`  native image blocks: ${stats.nativeImage}`);
  console.log(`  portableImage blocks: ${stats.portableImage}`);
}

async function main(): Promise<void> {
  const apply = process.argv.includes("--apply");
  const dryRun = process.argv.includes("--dry-run") || !apply;

  if (apply && process.argv.includes("--dry-run")) {
    throw new Error("Choose either --dry-run or --apply, not both");
  }

  console.log(
    `News image migration (${dryRun ? "dry run" : "apply"}) on dataset ${dataset}`,
  );

  const documents = await fetchNewsArticles();
  const beforeStats = countStats(documents);
  const affectedDocuments = documents.filter((document) =>
    (document.content || []).some(isLegacyImage),
  );

  printStats("Before migration:", beforeStats);

  if (affectedDocuments.length === 0) {
    console.log("No legacy news image blocks found; nothing to migrate.");
    return;
  }

  for (const document of affectedDocuments) {
    const legacyCount = (document.content || []).filter(isLegacyImage).length;
    console.log(`  ${document._id} | ${document.title || "Untitled"} | ${legacyCount}`);
  }

  if (dryRun) {
    console.log("Review the list above, then apply this exact snapshot with:");
    console.log(
      `  node scripts/migrate-news-content-images.ts --apply --expect=${statsToken(beforeStats)}`,
    );
    return;
  }

  const expectedToken = expectedTokenFromArgs();
  if (!expectedToken) {
    throw new Error(
      "Missing --expect token. Run --dry-run first and use the exact command it prints.",
    );
  }
  if (expectedToken !== statsToken(beforeStats)) {
    throw new Error(
      `Snapshot mismatch. Expected ${expectedToken}, received ${statsToken(beforeStats)}. Run --dry-run again.`,
    );
  }

  const backupPath = await createBackup(affectedDocuments);
  console.log(`Backup created: ${backupPath}`);

  let transaction = client.transaction();
  const expectedContent = new Map<string, ContentBlock[]>();

  for (const document of affectedDocuments) {
    const content = transformedContent(document);
    expectedContent.set(document._id, content);
    transaction = transaction.patch(document._id, (patch) =>
      patch.ifRevisionId(document._rev).set({ content }),
    );
  }

  await transaction.commit();

  const afterDocuments = await fetchNewsArticles();
  const afterStats = countStats(afterDocuments);
  printStats("After migration:", afterStats);

  if (
    afterStats.documents !== 0 ||
    afterStats.imageWithAlt !== 0 ||
    afterStats.nativeImage !== 0 ||
    afterStats.portableImage !==
      beforeStats.portableImage +
        beforeStats.imageWithAlt +
        beforeStats.nativeImage
  ) {
    throw new Error("Post-migration image counts do not match expectations");
  }

  for (const [documentId, content] of expectedContent) {
    const migratedDocument = afterDocuments.find(
      (document) => document._id === documentId,
    );
    if (!migratedDocument) {
      throw new Error(`Migrated document is missing: ${documentId}`);
    }
    if (!isDeepStrictEqual(migratedDocument.content, content)) {
      throw new Error(`Content verification failed: ${documentId}`);
    }
  }

  console.log("Migration and content verification completed successfully.");
}

main().then(
  () => process.exit(0),
  (error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  },
);
