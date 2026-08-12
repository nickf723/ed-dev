import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SOURCE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs"]);
const SKIP_DIRS = new Set(["node_modules", ".next", ".git"]);
const ACADEMIC_ROUTE_ROOTS = [
  "/formal-science",
  "/natural-science",
  "/social-science",
  "/humanities",
  "/applied-science",
  "/interdisciplines",
];
const ACADEMIC_DOMAIN_ROOTS = new Set(ACADEMIC_ROUTE_ROOTS);

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

function normalizeRoute(value) {
  const rawPath = value.split(/[?#]/, 1)[0]?.trim() || "/";
  const withLeadingSlash = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;
  const collapsedSlashes = withLeadingSlash.replace(/\/{2,}/g, "/");
  if (collapsedSlashes === "/") return "/";
  return collapsedSlashes.replace(/\/+$/, "");
}

function isAcademicRoute(route) {
  return ACADEMIC_ROUTE_ROOTS.some(
    (root) => route === root || route.startsWith(`${root}/`),
  );
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function routeInfoForPage(file) {
  const rel = relative(file);
  const withoutApp = rel.slice("app/".length);
  const routeSource = withoutApp === "page.tsx"
    ? ""
    : withoutApp.replace(/\/page\.tsx$/, "");
  const rawSegments = routeSource ? routeSource.split("/") : [];
  const segments = rawSegments.filter(
    (segment) =>
      !(segment.startsWith("(") && segment.endsWith(")")) &&
      !segment.startsWith("@"),
  );

  let dynamic = false;
  let pattern = "^";

  for (const segment of segments) {
    if (/^\[\[\.\.\.[^\]]+\]\]$/.test(segment)) {
      dynamic = true;
      pattern += "(?:/.*)?";
    } else if (/^\[\.\.\.[^\]]+\]$/.test(segment)) {
      dynamic = true;
      pattern += "/.+";
    } else if (/^\[[^\]]+\]$/.test(segment)) {
      dynamic = true;
      pattern += "/[^/]+";
    } else {
      pattern += `/${escapeRegExp(segment)}`;
    }
  }

  if (segments.length === 0) pattern += "/";
  pattern += "$";

  return {
    file,
    route: normalizeRoute(`/${segments.join("/")}`),
    dynamic,
    matcher: new RegExp(pattern),
  };
}

function curriculumRouteLiterals(files) {
  const routes = new Set();
  const routePattern = /["'`](\/(?:formal-science|natural-science|social-science|humanities|applied-science|interdisciplines)(?:\/[^"'`\s${}]*)?)["'`]/g;

  for (const file of files) {
    const source = read(file);
    for (const match of source.matchAll(routePattern)) {
      routes.add(normalizeRoute(match[1]));
    }
  }

  return routes;
}

function printFileSection(title, files) {
  console.log(`\n${title} (${files.length})`);
  if (files.length === 0) {
    console.log("  none");
    return;
  }
  for (const file of files) console.log(`  - ${relative(file)}`);
}

function printValueSection(title, values) {
  console.log(`\n${title} (${values.length})`);
  if (values.length === 0) {
    console.log("  none");
    return;
  }
  for (const value of values) console.log(`  - ${value}`);
}

const appRoot = path.join(ROOT, "app");
const curriculumRoot = path.join(ROOT, "lib", "curriculum");
const sourceFiles = [
  ...walk(appRoot),
  ...walk(path.join(ROOT, "lib")),
].filter((file, index, all) => all.indexOf(file) === index);
const sourceByFile = new Map(sourceFiles.map((file) => [file, read(file)]));

const pageFiles = sourceFiles.filter((file) => relative(file).endsWith("/page.tsx"));
const layoutFiles = sourceFiles.filter((file) => relative(file).endsWith("/layout.tsx"));
const sharedComponents = sourceFiles.filter((file) => relative(file).startsWith("app/_components/"));
const topLevelSharedComponents = sharedComponents.filter((file) =>
  /^app\/_components\/[^/]+\.(?:ts|tsx|js|jsx)$/.test(relative(file)),
);
const routeInfos = pageFiles.map(routeInfoForPage);
const dynamicAcademicPages = routeInfos.filter(
  (info) => info.dynamic && isAcademicRoute(info.route),
);
const concreteAcademicPages = routeInfos.filter(
  (info) =>
    !info.dynamic &&
    isAcademicRoute(info.route) &&
    !ACADEMIC_DOMAIN_ROOTS.has(info.route),
);
const concreteAcademicRoutes = new Set(
  concreteAcademicPages.map((info) => info.route),
);
const curriculumRoutes = curriculumRouteLiterals(walk(curriculumRoot));

const manualBreadcrumbs = pageFiles.filter((file) => /breadcrumbs\s*=\s*\{/.test(sourceByFile.get(file) ?? ""));
const hardcodedSequenceNavigation = pageFiles.filter((file) => /Previous lesson|Next lesson/.test(sourceByFile.get(file) ?? ""));
const pathnamePolicyLists = layoutFiles.filter((file) => /hiddenTriggerPaths|hiddenPaths|excludedPaths/.test(sourceByFile.get(file) ?? ""));
const sharedMainLandmarks = sharedComponents.filter((file) => /<main(?:\s|>)/.test(sourceByFile.get(file) ?? ""));
const clientRegistryImports = sourceFiles.filter((file) => {
  const source = sourceByFile.get(file) ?? "";
  return /^\s*["']use client["'];/m.test(source) && source.includes("@/lib/curriculum/registry");
});
const sharedCurriculumIdSpecialCases = sharedComponents.filter((file) => {
  const source = sourceByFile.get(file) ?? "";
  return /["'](?:formal|natural|social|humanities|applied|inter)\.[^"']+["']/.test(source);
});
const unusedTopLevelSharedComponents = topLevelSharedComponents.filter((file) => {
  const stem = path.basename(file, path.extname(file));
  const aliasImport = `@/app/_components/${stem}`;
  const siblingImport = `./${stem}`;

  return !sourceFiles.some((candidate) => {
    if (candidate === file) return false;
    const source = sourceByFile.get(candidate) ?? "";
    if (source.includes(aliasImport)) return true;
    return relative(candidate).startsWith("app/_components/") && source.includes(siblingImport);
  });
});

const pageRoutesMissingCurriculum = concreteAcademicPages
  .filter((info) => !curriculumRoutes.has(info.route))
  .map((info) => `${info.route} ← ${relative(info.file)}`)
  .sort();

const curriculumRoutesWithoutConcretePage = [...curriculumRoutes]
  .filter((route) => !ACADEMIC_DOMAIN_ROOTS.has(route))
  .filter((route) => !concreteAcademicRoutes.has(route))
  .filter(
    (route) => !dynamicAcademicPages.some((info) => info.matcher.test(route)),
  )
  .sort();

const dynamicAcademicRoutePages = dynamicAcademicPages
  .map((info) => `${info.route} ← ${relative(info.file)}`)
  .sort();

console.log("Education Station 64 — site architecture audit");
console.log("Informational only: findings describe migration debt and do not fail the command.");
console.log(`\nRoute pages scanned: ${pageFiles.length}`);
console.log(`Source files scanned: ${sourceFiles.length}`);
console.log(`Curriculum route literals scanned: ${curriculumRoutes.size}`);

printFileSection("Pages manually declaring breadcrumbs", manualBreadcrumbs);
printFileSection("Pages containing hard-coded previous/next lesson language", hardcodedSequenceNavigation);
printFileSection("Layouts containing pathname policy/exception lists", pathnamePolicyLists);
printFileSection("Shared components rendering a <main> landmark", sharedMainLandmarks);
printFileSection("Client components importing the curriculum registry directly", clientRegistryImports);
printFileSection("Shared components hard-coding curriculum node IDs", sharedCurriculumIdSpecialCases);
printFileSection("Top-level shared components with no direct import reference", unusedTopLevelSharedComponents);

printValueSection(
  "Concrete academic page routes missing a curriculum route literal",
  pageRoutesMissingCurriculum,
);
printValueSection(
  "Curriculum routes without a concrete or matching dynamic page",
  curriculumRoutesWithoutConcretePage,
);
printValueSection(
  "Dynamic academic route pages requiring explicit parity review",
  dynamicAcademicRoutePages,
);

console.log("\nInterpretation");
console.log("  • Breadcrumb and sequence findings are migration candidates, not automatic bugs.");
console.log("  • Pathname policy lists should move toward stable node-ID page policy when practical.");
console.log("  • Shared <main> findings require semantic review because route pages should normally own the page-level main landmark.");
console.log("  • Client registry imports are worth reviewing for smaller server-resolved page-context contracts.");
console.log("  • Shared component node-ID special cases often indicate feature policy living at the wrong layer; review before generalizing them.");
console.log("  • Unreferenced top-level shared components are deletion/relocalization candidates, not automatic dead code; dynamic imports and unusual resolution still need review.");
console.log("  • Page routes missing curriculum literals are strong ontology-audit candidates, but meta/tool routes and migration exceptions may be intentional.");
console.log("  • Curriculum routes without concrete pages may be planned placeholders; this source-level audit cannot infer runtime status.");
console.log("  • Dynamic route pages are matched against curriculum routes where possible and are listed separately because catch-all behavior needs human review.");
