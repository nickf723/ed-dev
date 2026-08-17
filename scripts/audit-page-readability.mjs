import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const APP_ROOT = path.join(ROOT, "app");
const STRICT = process.argv.includes("--strict");
const SOURCE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx"]);
const SKIP_DIRS = new Set(["node_modules", ".next", ".git"]);
const TINY_TYPE = /text-\[(\d+(?:\.\d+)?)px\]/g;
const HEAVY_SURFACE = /bg-(?:black|\[#[0-9a-fA-F]{3,8}\])\/\[0\.(7\d|8\d|9\d)\]/g;
const FIXED_HEIGHT = /(?:min-h|h)-\[(\d+)px\]/g;
const WORLD_WINDOW = /<WorldWindow\b/g;
const COMPACT_WORLD_WINDOW = /<WorldWindow[\s\S]{0,360}?density=["']compact["']/g;

function walk(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
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

function lineNumber(source, index) {
  return source.slice(0, index).split("\n").length;
}

const files = walk(APP_ROOT);
const tinyFindings = [];
const heavySurfaceFindings = [];
const tallWidgetFindings = [];
const sceneCompositions = [];
const worldWindowModules = [];

for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  const name = relative(file);

  if (source.includes("SceneFrame")) {
    sceneCompositions.push(name);
  }

  const worldWindowCount = [...source.matchAll(WORLD_WINDOW)].length;
  const compactCount = [...source.matchAll(COMPACT_WORLD_WINDOW)].length;
  if (worldWindowCount) {
    worldWindowModules.push({ file: name, worldWindowCount, compactCount });
  }

  for (const match of source.matchAll(TINY_TYPE)) {
    const size = Number(match[1]);
    if (size >= 11) continue;
    tinyFindings.push({
      file: name,
      line: lineNumber(source, match.index ?? 0),
      size,
      token: match[0],
    });
  }

  for (const match of source.matchAll(HEAVY_SURFACE)) {
    heavySurfaceFindings.push({
      file: name,
      line: lineNumber(source, match.index ?? 0),
      token: match[0],
    });
  }

  for (const match of source.matchAll(FIXED_HEIGHT)) {
    const height = Number(match[1]);
    if (height < 480) continue;
    tallWidgetFindings.push({
      file: name,
      line: lineNumber(source, match.index ?? 0),
      height,
      token: match[0],
    });
  }
}

console.log("Education Station 64 — page readability and scene exposure audit");
console.log("The audit is informational unless called with --strict.\n");
console.log(`Source files scanned: ${files.length}`);
console.log(`SceneFrame compositions: ${sceneCompositions.length}`);
console.log(`WorldWindow modules: ${worldWindowModules.length}`);
console.log(
  `Compact WorldWindow uses: ${worldWindowModules.reduce((sum, item) => sum + item.compactCount, 0)}`,
);
console.log(`Text tokens below 11px: ${tinyFindings.length}`);
console.log(`High-opacity surface tokens: ${heavySurfaceFindings.length}`);
console.log(`Fixed heights at or above 480px: ${tallWidgetFindings.length}`);

if (sceneCompositions.length) {
  console.log("\nScene-composed page modules");
  for (const moduleName of sceneCompositions) console.log(`  - ${moduleName}`);
}

if (worldWindowModules.length) {
  console.log("\nWorld-window density review");
  for (const item of worldWindowModules) {
    console.log(
      `  - ${item.file}  compact ${item.compactCount}/${item.worldWindowCount}`,
    );
  }
}

if (tinyFindings.length) {
  console.log("\nSmallest required-text candidates");
  for (const finding of tinyFindings
    .sort((a, b) => a.size - b.size || a.file.localeCompare(b.file))
    .slice(0, 40)) {
    console.log(`  - ${finding.file}:${finding.line}  ${finding.token}`);
  }
  if (tinyFindings.length > 40) {
    console.log(`  … ${tinyFindings.length - 40} more`);
  }
}

if (heavySurfaceFindings.length) {
  console.log("\nHigh-opacity surfaces worth checking against world focal points");
  for (const finding of heavySurfaceFindings.slice(0, 40)) {
    console.log(`  - ${finding.file}:${finding.line}  ${finding.token}`);
  }
  if (heavySurfaceFindings.length > 40) {
    console.log(`  … ${heavySurfaceFindings.length - 40} more`);
  }
}

if (tallWidgetFindings.length) {
  console.log(
    "\nTall fixed-height regions worth checking against the functional viewport budget",
  );
  for (const finding of tallWidgetFindings
    .sort((a, b) => b.height - a.height || a.file.localeCompare(b.file))
    .slice(0, 40)) {
    console.log(`  - ${finding.file}:${finding.line}  ${finding.token}`);
  }
  if (tallWidgetFindings.length > 40) {
    console.log(`  … ${tallWidgetFindings.length - 40} more`);
  }
}

console.log("\nInterpretation");
console.log(
  "  • Text below 11px should be decorative telemetry, never required instruction or navigation.",
);
console.log(
  "  • High-opacity surfaces are not automatically wrong, but should not blanket a behavioral world engine.",
);
console.log(
  "  • SceneFrame pages should reserve a deliberate open or ghost-surface region for their academic world.",
);
console.log(
  "  • A control-rich signature widget should keep its controls, response, and result inside one desktop viewport.",
);
console.log(
  "  • Fixed regions at or above 480px are review prompts, especially when nested inside another minimum-height stage.",
);
console.log(
  '  • Use WorldWindow density="compact" when an explanatory rail and interactive lab must remain visible together.',
);

if (STRICT && tinyFindings.length > 0) process.exitCode = 1;
