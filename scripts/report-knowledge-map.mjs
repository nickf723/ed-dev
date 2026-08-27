import {
  educationStationKnowledgeGraph,
  findKnowledgeHostPage,
  flattenKnowledgeGraph,
} from "../app/_data/knowledge-graph.ts";
import { knowledgeRelations } from "../app/_data/knowledge-relations.ts";

function renderTree(node, depth = 0) {
  const indent = "  ".repeat(depth);
  const route = node.slug ? `  (${node.slug})` : node.id === "education-station" ? "" : "  [embedded]";
  const status = node.status && node.status !== "live" ? `  [${node.status}]` : "";
  const lines = [`${indent}- ${node.label}${status}${route}`];

  for (const child of node.children ?? []) {
    lines.push(...renderTree(child, depth + 1));
  }

  return lines;
}

function walkWithDepth(node, depth = 0, result = []) {
  result.push({ node, depth });
  for (const child of node.children ?? []) walkWithDepth(child, depth + 1, result);
  return result;
}

const flattened = flattenKnowledgeGraph();
const withDepth = walkWithDepth(educationStationKnowledgeGraph);
const depthById = new Map(withDepth.map(({ node, depth }) => [node.id, depth]));
const routed = flattened.filter((node) => node.slug);
const embedded = flattened.filter((node) => !node.slug && node.id !== "education-station");
const hostedEmbedded = embedded.filter((node) => findKnowledgeHostPage(node.id)?.slug);
const unhostedEmbedded = embedded.filter((node) => !findKnowledgeHostPage(node.id)?.slug);
const concepts = flattened.filter((node) => node.kind === "concept");
const leaves = flattened.filter((node) => !(node.children?.length));
const branchNodes = flattened.filter((node) => node.children?.length);
const hubLeaves = leaves.filter((node) => node.kind === "discipline");
const deepLeaves = leaves.filter((node) => (depthById.get(node.id) ?? 0) >= 4);
const maxDepth = Math.max(...withDepth.map(({ depth }) => depth));
const domains = educationStationKnowledgeGraph.children ?? [];
const relationKinds = ["part-of", "prerequisite-for", "related-to", "contrasts-with", "applied-in"];
const relationCounts = new Map(
  relationKinds.map((kind) => [kind, knowledgeRelations.filter((relation) => relation.kind === kind).length]),
);
const relationNodeIds = new Set(knowledgeRelations.flatMap((relation) => [relation.sourceId, relation.targetId]));

console.log("Education Station Knowledge Map\n");
console.log(renderTree(educationStationKnowledgeGraph).join("\n"));
console.log("\nCoverage summary");
console.log(`- Nodes: ${flattened.length}`);
console.log(`- Routed nodes: ${routed.length}`);
console.log(`- Embedded nodes: ${embedded.length}`);
console.log(`- Embedded with host page: ${hostedEmbedded.length}/${embedded.length}`);
console.log(`- Concept nodes: ${concepts.length}`);
console.log(`- Branch nodes: ${branchNodes.length}`);
console.log(`- Leaves: ${leaves.length}`);
console.log(`- Hub leaves: ${hubLeaves.length}`);
console.log(`- Deep frontier leaves: ${deepLeaves.length}`);
console.log(`- Maximum depth: ${maxDepth}`);
console.log(`- Cross-links: ${knowledgeRelations.length}`);
console.log(`- Nodes participating in cross-links: ${relationNodeIds.size}`);

console.log("\nRelation summary");
for (const kind of relationKinds) {
  console.log(`- ${kind}: ${relationCounts.get(kind) ?? 0}`);
}

console.log("\nDomain summaries");
for (const domain of domains) {
  const domainNodes = flattenKnowledgeGraph(domain);
  const domainLeaves = domainNodes.filter((node) => !(node.children?.length));
  const routedDomainNodes = domainNodes.filter((node) => node.slug);
  const embeddedDomainNodes = domainNodes.filter((node) => !node.slug);
  const domainConcepts = domainNodes.filter((node) => node.kind === "concept");
  console.log(
    `- ${domain.label}: ${domainNodes.length} nodes, ${routedDomainNodes.length} routed, ${embeddedDomainNodes.length} embedded, ${domainConcepts.length} concepts, ${domainLeaves.length} leaves`,
  );
}

if (unhostedEmbedded.length) {
  console.log("\nEmbedded nodes missing host pages");
  for (const node of unhostedEmbedded.sort((a, b) => a.label.localeCompare(b.label))) {
    console.log(`- ${node.label} · ${node.id}`);
  }
}

console.log("\nHub expansion frontier");
for (const node of hubLeaves.sort((a, b) => a.label.localeCompare(b.label))) {
  console.log(`- ${node.label}${node.slug ? ` (${node.slug})` : ""}`);
}

console.log("\nDeep expansion frontier");
for (const node of deepLeaves
  .sort((a, b) => (depthById.get(b.id) ?? 0) - (depthById.get(a.id) ?? 0) || a.label.localeCompare(b.label))) {
  const destination = node.slug ? ` (${node.slug})` : node.id === "education-station" ? "" : " [embedded]";
  console.log(`- ${node.label} · depth ${depthById.get(node.id)}${destination}`);
}
