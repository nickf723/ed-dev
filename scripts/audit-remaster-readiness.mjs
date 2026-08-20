import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const APP_ROOT = path.join(ROOT, "app");

const AREA_LABELS = new Map([
  ["formal-science", "Formal Science"],
  ["natural-science", "Natural Science"],
  ["social-science", "Social Science"],
  ["humanities", "Humanities"],
  ["applied-science", "Applied Science"],
  ["interdisciplines", "Interdisciplines"],
]);

function walk(directory) {
  const files = [];

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(absolute));
    else if (entry.name === "page.tsx") files.push(absolute);
  }

  return files;
}

function relative(file) {
  return path.relative(ROOT, file).replaceAll(path.sep, "/");
}

function areaFor(file) {
  const [, area] = relative(file).split("/");
  return AREA_LABELS.get(area) ?? "Other product routes";
}

function routeFor(file) {
  const route = relative(file)
    .replace(/^app/, "")
    .replace(/\/page\.tsx$/, "");
  return route || "/";
}

const pages = walk(APP_ROOT)
  .map((file) => ({
    file,
    route: routeFor(file),
    area: areaFor(file),
    source: fs.readFileSync(file, "utf8"),
  }))
  .sort((a, b) => a.route.localeCompare(b.route));

const counts = new Map(
  [...AREA_LABELS.values(), "Other product routes"].map((label) => [label, 0]),
);

for (const page of pages) counts.set(page.area, (counts.get(page.area) ?? 0) + 1);

const signals = [
  {
    label: "whole route is a Client Component",
    test: (source) => /^\s*["']use client["'];/m.test(source),
  },
  {
    label: "uses DomainPageHeader",
    test: (source) => source.includes("DomainPageHeader"),
  },
  {
    label: "resolves curriculum page context",
    test: (source) => /(?:require|get)CurriculumPageContext/.test(source),
  },
  {
    label: "uses SceneFrame",
    test: (source) => source.includes("SceneFrame"),
  },
  {
    label: "explicitly imports a Background or World",
    test: (source) => /import\s+[\s\S]{0,160}?(?:Background|World)\s+from/.test(source),
  },
  {
    label: "contains a 6–10 px text token",
    test: (source) => /text-\[(?:6|7|8|9|10)px\]/.test(source),
  },
  {
    label: "manually declares breadcrumbs",
    test: (source) => /breadcrumbs\s*=\s*\{/.test(source),
  },
  {
    label: "contains legacy implementation-themed chrome",
    test: (source) => /SYSTEM\.INIT|System Modules|Unit \d+(?:\.\d+)?/.test(source),
  },
];

console.log("Education Station 64 — remaster readiness audit");
console.log("Informational only: signals prioritize review; they are not automatic defects.\n");
console.log(`Route modules scanned: ${pages.length}`);

console.log("\nRoute inventory");
for (const [label, count] of counts) {
  console.log(`  - ${label}: ${count}`);
}

console.log("\nMigration signals");
for (const signal of signals) {
  const matching = pages.filter((page) => signal.test(page.source));
  console.log(`  - ${matching.length} ${signal.label}`);
}

const legacyPages = pages.filter((page) =>
  /SYSTEM\.INIT|System Modules|Unit \d+(?:\.\d+)?/.test(page.source),
);

console.log(`\nLegacy-chrome route candidates (${legacyPages.length})`);
if (legacyPages.length === 0) {
  console.log("  none");
} else {
  for (const page of legacyPages) console.log(`  - ${page.route} ← ${relative(page.file)}`);
}

console.log("\nInterpretation");
console.log("  • Audit one curriculum family at a time; do not apply a global cosmetic rewrite.");
console.log("  • Client pages, manual breadcrumbs, and tiny text are migration prompts, not automatic failures.");
console.log("  • Verify scenery corridors, foreground grouping, and background memorability in a rendered browser.");
console.log("  • Preserve successful local worlds and instruments while repairing the semantic contract around them.");
