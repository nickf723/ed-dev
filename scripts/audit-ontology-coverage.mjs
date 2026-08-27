import fs from "node:fs";
import path from "node:path";
import { educationStationOntology, flattenKnowledgeTree } from "../app/_data/ontology.ts";

const ROOT = process.cwd();
const APP = path.join(ROOT, "app");
const DOMAIN_ROOTS = [
  "formal-science",
  "natural-science",
  "social-science",
  "humanities",
  "applied-science",
  "interdisciplines",
];

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith("_") || entry.name.startsWith("(")) return [];
      return walk(absolute);
    }
    return entry.name === "page.tsx" ? [absolute] : [];
  });
}

function routeForPage(file) {
  const relative = path.relative(APP, file).replaceAll(path.sep, "/");
  const route = relative.replace(/\/page\.tsx$/, "");
  return `/${route}`.replace(/\/$/, "") || "/";
}

function isAcademicRoute(route) {
  return DOMAIN_ROOTS.some((domain) => route === `/${domain}` || route.startsWith(`/${domain}/`));
}

function depth(route) {
  return route.split("/").filter(Boolean).length;
}

const routes = walk(APP)
  .map(routeForPage)
  .filter(isAcademicRoute)
  .filter((route) => !route.includes("["))
  .sort((a, b) => depth(a) - depth(b) || a.localeCompare(b));

const ontologyNodes = flattenKnowledgeTree(educationStationOntology);
const ontologyRoutes = new Set(ontologyNodes.flatMap((node) => (node.slug ? [node.slug] : [])));
const routeSet = new Set(routes);

const missingFromOntology = routes.filter((route) => !ontologyRoutes.has(route));
const missingFromRoutes = [...ontologyRoutes].filter((route) => !routeSet.has(route));

const countsByDomain = Object.fromEntries(
  DOMAIN_ROOTS.map((domain) => {
    const prefix = `/${domain}`;
    const domainRoutes = routes.filter((route) => route === prefix || route.startsWith(`${prefix}/`));
    const mapped = domainRoutes.filter((route) => ontologyRoutes.has(route));
    return [domain, { routes: domainRoutes.length, mapped: mapped.length }];
  }),
);

console.log("Education Station ontology coverage\n");
for (const [domain, counts] of Object.entries(countsByDomain)) {
  const pct = counts.routes ? Math.round((counts.mapped / counts.routes) * 100) : 100;
  console.log(`  ${domain}: ${counts.mapped}/${counts.routes} routes mapped (${pct}%)`);
}

console.log(`\nAcademic routes discovered: ${routes.length}`);
console.log(`Ontology routes: ${ontologyRoutes.size}`);
console.log(`Routes not yet represented: ${missingFromOntology.length}`);
console.log(`Ontology routes without a concrete page: ${missingFromRoutes.length}`);

if (missingFromOntology.length) {
  console.log("\nNext ontology expansion backlog:");
  for (const route of missingFromOntology) console.log(`  - ${route}`);
}

if (missingFromRoutes.length) {
  console.log("\nOntology nodes without concrete pages:");
  for (const route of missingFromRoutes.sort()) console.log(`  - ${route}`);
}
