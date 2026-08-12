import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SOURCE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs"]);
const SKIP_DIRS = new Set(["node_modules", ".next", ".git"]);

function walk(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory() && SKIP_DIRS.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(absolute));
    else if (SOURCE_EXTENSIONS.has(path.extname(entry.name))) files.push(absolute);
  }

  return files;
}

function relative(file) {
  return path.relative(ROOT, file).replaceAll(path.sep, "/");
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function printSection(title, files) {
  console.log(`\n${title} (${files.length})`);
  if (files.length === 0) {
    console.log("  none");
    return;
  }
  for (const file of files) console.log(`  - ${relative(file)}`);
}

const appRoot = path.join(ROOT, "app");
const sourceFiles = [
  ...walk(appRoot),
  ...walk(path.join(ROOT, "lib")),
].filter((file, index, all) => all.indexOf(file) === index);

const pageFiles = sourceFiles.filter((file) => relative(file).endsWith("/page.tsx"));
const layoutFiles = sourceFiles.filter((file) => relative(file).endsWith("/layout.tsx"));
const sharedComponents = sourceFiles.filter((file) => relative(file).startsWith("app/_components/"));

const manualBreadcrumbs = pageFiles.filter((file) => /breadcrumbs\s*=\s*\{/.test(read(file)));
const hardcodedSequenceNavigation = pageFiles.filter((file) => /Previous lesson|Next lesson/.test(read(file)));
const pathnamePolicyLists = layoutFiles.filter((file) => /hiddenTriggerPaths|hiddenPaths|excludedPaths/.test(read(file)));
const sharedMainLandmarks = sharedComponents.filter((file) => /<main(?:\s|>)/.test(read(file)));
const clientRegistryImports = sourceFiles.filter((file) => {
  const source = read(file);
  return /^\s*["']use client["'];/m.test(source) && source.includes("@/lib/curriculum/registry");
});
const sharedCurriculumIdSpecialCases = sharedComponents.filter((file) => {
  const source = read(file);
  return /["'](?:formal|natural|social|humanities|applied|inter)\.[^"']+["']/.test(source);
});

console.log("Education Station 64 — site architecture audit");
console.log("Informational only: findings describe migration debt and do not fail the command.");
console.log(`\nRoute pages scanned: ${pageFiles.length}`);
console.log(`Source files scanned: ${sourceFiles.length}`);

printSection("Pages manually declaring breadcrumbs", manualBreadcrumbs);
printSection("Pages containing hard-coded previous/next lesson language", hardcodedSequenceNavigation);
printSection("Layouts containing pathname policy/exception lists", pathnamePolicyLists);
printSection("Shared components rendering a <main> landmark", sharedMainLandmarks);
printSection("Client components importing the curriculum registry directly", clientRegistryImports);
printSection("Shared components hard-coding curriculum node IDs", sharedCurriculumIdSpecialCases);

console.log("\nInterpretation");
console.log("  • Breadcrumb and sequence findings are migration candidates, not automatic bugs.");
console.log("  • Pathname policy lists should move toward stable node-ID page policy when practical.");
console.log("  • Shared <main> findings require semantic review because route pages should normally own the page-level main landmark.");
console.log("  • Client registry imports are worth reviewing for smaller server-resolved page-context contracts.");
console.log("  • Shared component node-ID special cases often indicate feature policy living at the wrong layer; review before generalizing them.");
