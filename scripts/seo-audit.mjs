#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const USER_AGENT =
  "Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)";
const MAX_REDIRECTS = 5;

function parseArgs(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) options[key] = true;
    else {
      options[key] = value;
      index += 1;
    }
  }
  return options;
}

function normalizeOrigin(value) {
  const url = new URL(value);
  if (url.pathname !== "/" || url.search || url.hash) {
    throw new Error("--site must be an origin without path, query, or hash");
  }
  return url.origin;
}

function extractAttributeTag(html, identity, value) {
  const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const expression = new RegExp(
    `<(?:meta|link)\\b(?=[^>]*${identity}=["']${escaped}["'])(?=[^>]*(?:content|href)=["']([^"']*)["'])[^>]*>`,
    "i"
  );
  return expression.exec(html)?.[1]?.trim();
}

function extractSitemapUrls(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((match) =>
    match[1].replaceAll("&amp;", "&").trim()
  );
}

function urlsEquivalent(left, right) {
  const a = new URL(left);
  const b = new URL(right);
  const normalizedPath = (pathname) => (pathname === "/" ? "" : pathname);
  return (
    a.origin === b.origin &&
    normalizedPath(a.pathname) === normalizedPath(b.pathname) &&
    a.search === b.search &&
    a.hash === b.hash
  );
}

async function fetchWithTrace(inputUrl) {
  const redirects = [];
  let currentUrl = inputUrl;
  const startedAt = Date.now();

  for (let index = 0; index <= MAX_REDIRECTS; index += 1) {
    const response = await fetch(currentUrl, {
      redirect: "manual",
      headers: { "user-agent": USER_AGENT, accept: "text/html,application/xml,text/plain,*/*" },
      signal: AbortSignal.timeout(20_000),
    });
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (!location) {
        return { inputUrl, finalUrl: currentUrl, status: response.status, redirects,
          durationMs: Date.now() - startedAt, contentType: "", xRobotsTag: "",
          body: "", error: "Redirect is missing Location" };
      }
      const nextUrl = new URL(location, currentUrl).toString();
      redirects.push({ from: currentUrl, to: nextUrl, status: response.status });
      currentUrl = nextUrl;
      continue;
    }
    return {
      inputUrl, finalUrl: currentUrl, status: response.status, redirects,
      durationMs: Date.now() - startedAt,
      contentType: response.headers.get("content-type") || "",
      xRobotsTag: response.headers.get("x-robots-tag") || "",
      body: await response.text(),
    };
  }
  return { inputUrl, finalUrl: currentUrl, status: 0, redirects,
    durationMs: Date.now() - startedAt, contentType: "", xRobotsTag: "", body: "",
    error: `More than ${MAX_REDIRECTS} redirects` };
}

function inspectPage(result, expectedOrigin) {
  const issues = [];
  const isHtml = result.contentType.includes("text/html");
  const canonicalRaw = isHtml
    ? extractAttributeTag(result.body, "rel", "canonical")
    : undefined;
  const robots = isHtml
    ? extractAttributeTag(result.body, "name", "robots")
    : undefined;
  const ogUrlRaw = isHtml
    ? extractAttributeTag(result.body, "property", "og:url")
    : undefined;
  const canonical = canonicalRaw
    ? new URL(canonicalRaw, result.finalUrl).toString()
    : undefined;
  const ogUrl = ogUrlRaw ? new URL(ogUrlRaw, result.finalUrl).toString() : undefined;

  if (result.status !== 200) issues.push(`HTTP status is ${result.status}`);
  if (result.redirects.length > 1) issues.push(`Redirect chain has ${result.redirects.length} hops`);
  if (new URL(result.finalUrl).origin !== expectedOrigin) {
    issues.push(`Final URL is outside ${expectedOrigin}`);
  }
  if (isHtml && !canonical) issues.push("Canonical is missing");
  if (canonical && !urlsEquivalent(canonical, result.finalUrl)) {
    issues.push(`Canonical is not self-referencing: ${canonical}`);
  }
  if (ogUrl && ogUrl !== canonical) issues.push(`og:url differs from canonical: ${ogUrl}`);
  if (`${robots || ""},${result.xRobotsTag}`.toLowerCase().includes("noindex")) {
    issues.push("Page contains noindex");
  }
  return {
    url: result.inputUrl, finalUrl: result.finalUrl, status: result.status,
    redirects: result.redirects, durationMs: result.durationMs,
    contentType: result.contentType, canonical, robots,
    xRobotsTag: result.xRobotsTag, ogUrl, issues, error: result.error,
  };
}

function markdownReport(report) {
  const lines = [
    `# SEO Technical Audit: ${report.site}`, "",
    `- Generated: ${report.generatedAt}`,
    `- Sitemap URLs: ${report.summary.sitemapUrlCount}`,
    `- Checked pages: ${report.summary.checkedPageCount}`,
    `- Issues: ${report.summary.issueCount}`, "",
    "## Host checks", "",
    "| Input | Final | Status | Hops | Issues |",
    "| --- | --- | ---: | ---: | --- |",
    ...report.hostChecks.map((item) =>
      `| ${item.url} | ${item.finalUrl} | ${item.status} | ${item.redirects.length} | ${item.issues.join("; ") || "None"} |`
    ), "", "## Robots", "",
    `- Status: ${report.robots.status}`,
    `- Declares canonical sitemap: ${report.robots.declaresCanonicalSitemap ? "Yes" : "No"}`,
    `- Blocks all crawling: ${report.robots.blocksAll ? "Yes" : "No"}`, "",
    "## Sitemap pages", "",
    "| URL | Status | Canonical | Time (ms) | Issues |",
    "| --- | ---: | --- | ---: | --- |",
    ...report.pages.map((item) =>
      `| ${item.url} | ${item.status} | ${item.canonical || ""} | ${item.durationMs} | ${item.issues.join("; ") || "None"} |`
    ), "",
  ];
  return lines.join("\\n");
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (!options.site) {
    throw new Error("Usage: node scripts/seo-audit.mjs --site https://example.com [--alternate-host www.example.com] [--output-dir tmp/seo-audit]");
  }
  const site = normalizeOrigin(options.site);
  const canonicalUrl = new URL(site);
  const alternateHost = options["alternate-host"] ||
    (canonicalUrl.hostname.startsWith("www.")
      ? canonicalUrl.hostname.slice(4)
      : `www.${canonicalUrl.hostname}`);
  const outputDir = path.resolve(options["output-dir"] || "tmp/seo-audit");
  const hostInputs = [
    site, `http://${canonicalUrl.host}`,
    `https://${alternateHost}`, `http://${alternateHost}`,
  ];
  const hostChecks = [];
  for (const url of hostInputs) {
    const item = inspectPage(await fetchWithTrace(url), site);
    if (!urlsEquivalent(url, site)) {
      if (item.redirects.length === 0) {
        item.issues.push("Noncanonical origin does not redirect");
      } else if (item.redirects[0].status !== 301) {
        item.issues.push(`Expected 301, received ${item.redirects[0].status}`);
      }
    }
    hostChecks.push(item);
  }

  const robotsResult = await fetchWithTrace(`${site}/robots.txt`);
  const sitemapResult = await fetchWithTrace(`${site}/sitemap.xml`);
  const sitemapUrls = sitemapResult.status === 200
    ? extractSitemapUrls(sitemapResult.body)
    : [];
  const pages = [];
  for (const url of [...new Set(sitemapUrls)]) {
    let parsed;
    try { parsed = new URL(url); }
    catch {
      pages.push({ url, finalUrl: url, status: 0, redirects: [], durationMs: 0,
        issues: ["Invalid sitemap URL"] });
      continue;
    }
    if (parsed.origin !== site) {
      pages.push({ url, finalUrl: url, status: 0, redirects: [], durationMs: 0,
        issues: [`Sitemap URL is outside ${site}`] });
      continue;
    }
    pages.push(inspectPage(await fetchWithTrace(url), site));
  }

  const robotsBody = robotsResult.body.toLowerCase();
  const issueCount =
    hostChecks.reduce((sum, item) => sum + item.issues.length, 0) +
    pages.reduce((sum, item) => sum + item.issues.length, 0) +
    (robotsResult.status === 200 ? 0 : 1) + (sitemapResult.status === 200 ? 0 : 1);
  const report = {
    generatedAt: new Date().toISOString(), site, userAgent: USER_AGENT,
    summary: {
      sitemapUrlCount: sitemapUrls.length,
      uniqueSitemapUrlCount: new Set(sitemapUrls).size,
      checkedPageCount: pages.length, issueCount,
    },
    hostChecks,
    robots: {
      status: robotsResult.status, finalUrl: robotsResult.finalUrl,
      declaresCanonicalSitemap: robotsBody.includes(`sitemap: ${site}/sitemap.xml`.toLowerCase()),
      blocksAll: /user-agent:\s*\*[\s\S]*disallow:\s*\/(?:\s|$)/i.test(robotsResult.body),
    },
    sitemap: {
      status: sitemapResult.status, finalUrl: sitemapResult.finalUrl,
      urlCount: sitemapUrls.length,
      duplicateCount: sitemapUrls.length - new Set(sitemapUrls).size,
    },
    pages,
  };
  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, "seo-audit.json"), JSON.stringify(report, null, 2), "utf8");
  await writeFile(path.join(outputDir, "seo-audit.md"), markdownReport(report), "utf8");
  console.log(JSON.stringify({ site, outputDir, ...report.summary }, null, 2));
  if (issueCount > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error("[SEO audit]", error);
  process.exitCode = 1;
});
