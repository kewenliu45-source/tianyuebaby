/**
 * 一次性迁移脚本：将 Sanity CMS 文档中的"天赐宝贝/天赐"替换为"天悦宝贝/天悦"
 *
 * 用法：
 *   npx tsx scripts/migrate-brand-name.ts --dry-run   # 仅预览，不实际修改
 *   npx tsx scripts/migrate-brand-name.ts --apply      # 执行替换
 *
 * 环境变量要求：
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_WRITE_TOKEN
 */

import { createClient } from "next-sanity";

// ── 配置 ──
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
const writeToken = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error("❌ 缺少 NEXT_PUBLIC_SANITY_PROJECT_ID 环境变量");
  process.exit(1);
}
if (!writeToken) {
  console.error("❌ 缺少 SANITY_API_WRITE_TOKEN 环境变量");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: writeToken,
});

// ── 替换规则 ──
const REPLACEMENTS: Array<{ from: RegExp; to: string; label: string }> = [
  { from: /天赐宝贝（国际）助孕中心/g, to: "天悦宝贝（国际）助孕中心", label: "天赐宝贝（国际）助孕中心 → 天悦宝贝（国际）助孕中心" },
  { from: /天赐宝贝/g, to: "天悦宝贝", label: "天赐宝贝 → 天悦宝贝" },
];

// 需要检查的文档类型和字段路径
// 使用 GROQ 查询所有文档，逐个检查文本字段
const TEXT_FIELDS_TO_CHECK = [
  "title",
  "description",
  "siteName",
  "footerDescription",
  "copyrightText",
  "introTitle",
  "introContent",
  "metaTitle",
  "metaDescription",
  "ogTitle",
  "ogDescription",
  "excerpt",
  "answer",
  "question",
  "buttonText",
  "subtitle",
  "alt",
];

interface ChangeLog {
  documentId: string;
  documentType: string;
  field: string;
  before: string;
  after: string;
}

// 递归扫描对象中的字符串字段
function findAndReplaceInValue(
  value: unknown,
  path: string
): { changed: boolean; value: unknown; logs: ChangeLog[] } {
  const logs: ChangeLog[] = [];

  if (typeof value === "string") {
    let newValue = value;
    for (const rule of REPLACEMENTS) {
      newValue = newValue.replace(rule.from, rule.to);
    }
    if (newValue !== value) {
      return { changed: true, value: newValue, logs: [{ documentId: "", documentType: "", field: path, before: value, after: newValue }] };
    }
    return { changed: false, value, logs };
  }

  if (Array.isArray(value)) {
    let changed = false;
    const newArr = value.map((item, index) => {
      const result = findAndReplaceInValue(item, `${path}[${index}]`);
      if (result.changed) changed = true;
      logs.push(...result.logs);
      return result.value;
    });
    return { changed, value: newArr, logs };
  }

  if (value && typeof value === "object") {
    let changed = false;
    const newObj: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      const result = findAndReplaceInValue(val, path ? `${path}.${key}` : key);
      if (result.changed) changed = true;
      logs.push(...result.logs);
      newObj[key] = result.value;
    }
    return { changed, value: newObj, logs };
  }

  return { changed: false, value, logs };
}

async function main() {
  const isDryRun = process.argv.includes("--dry-run");
  const isApply = process.argv.includes("--apply");

  if (!isDryRun && !isApply) {
    console.error("请指定 --dry-run 或 --apply 参数");
    process.exit(1);
  }

  console.log(`\n🔄 品牌名称迁移脚本 — ${isDryRun ? "预览模式" : "执行模式"}`);
  console.log(`   Project: ${projectId}`);
  console.log(`   Dataset: ${dataset}\n`);

  // 查询所有文档
  const allDocs = await client.fetch<Array<{ _id: string; _type: string }>>(
    `*[_type in ["siteSettings", "homePage", "whyUsPage", "privacyPage", "newsArticle", "faqItem", "page", "startJourneyPage"]] {_id, _type}`
  );

  console.log(`📄 找到 ${allDocs.length} 个文档待检查\n`);

  const allChanges: ChangeLog[] = [];
  let processedCount = 0;
  let changedCount = 0;

  for (const doc of allDocs) {
    // 获取完整文档
    const fullDoc = await client.fetch(`*[_id == $id][0]`, { id: doc._id });
    if (!fullDoc) continue;

    processedCount++;
    const result = findAndReplaceInValue(fullDoc, "");

    if (result.changed) {
      changedCount++;
      // 给日志添加文档信息
      for (const log of result.logs) {
        log.documentId = doc._id;
        log.documentType = doc._type;
      }
      allChanges.push(...result.logs);

      if (isApply) {
        // 写回文档（排除 _id, _type, _createdAt, _updatedAt 等系统字段）
        const { _id, _type, _createdAt, _updatedAt, _rev, ...updateData } = result.value as Record<string, unknown>;
        try {
          await client.patch(doc._id).set(updateData).commit();
          console.log(`  ✅ 已更新: [${doc._type}] ${doc._id}`);
        } catch (err) {
          console.error(`  ❌ 更新失败: [${doc._type}] ${doc._id}`, err);
        }
      }
    }
  }

  // 输出结果
  console.log("\n" + "─".repeat(60));
  console.log(`📊 扫描完成：检查了 ${processedCount} 个文档，其中 ${changedCount} 个需要修改\n`);

  if (allChanges.length > 0) {
    console.log("📝 变更明细：");
    for (const change of allChanges) {
      console.log(`  [${change.documentType}] ${change.documentId}`);
      console.log(`    字段: ${change.field}`);
      console.log(`    前: ${change.before.substring(0, 80)}${change.before.length > 80 ? "..." : ""}`);
      console.log(`    后: ${change.after.substring(0, 80)}${change.after.length > 80 ? "..." : ""}`);
      console.log("");
    }
  } else {
    console.log("✅ 未发现需要替换的内容\n");
  }

  if (isDryRun && allChanges.length > 0) {
    console.log("💡 这是预览模式，未做任何修改。如需执行替换，请运行：");
    console.log("   npx tsx scripts/migrate-brand-name.ts --apply\n");
  }

  if (isApply) {
    console.log("✅ 迁移完成！\n");
  }
}

main().catch((err) => {
  console.error("脚本执行出错：", err);
  process.exit(1);
});
