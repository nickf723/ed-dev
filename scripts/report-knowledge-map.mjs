import {
  educationStationKnowledgeGraph,
  flattenKnowledgeGraph,
} from "../app/_data/knowledge-graph.ts";

function renderTree(node, depth = 0) {
  const indent = "  ".repeat(depth);
  const route = node.slug ? `  (${node.slug})` : "";
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
const leaves = flattened.filter((node) => !(node.children?.length));
const branchNodes = flattened.filter((node) => node.children?.length);
const hubLeaves = leaves.filter((node) => node.kind === "discipline");
const deepLeaves = leaves.filter((node) => (depthById.get(node.id) ?? 0) >= 4);
const maxDepth = Math.max(...withDepth.map(({ depth }) => depth));
const domains = educationStationKnowledgeGraph.children ?? [];

console.log("Education Station Knowledge Map\n");
console.log(renderTree(educationStationKnowledgeGraph).join("\n"));
console.log("\nCoverage summary");
console.log(`- Nodes: ${flattened.length}`);
console.log(`- Routed nodes: ${routed.length}`);
console.log(`- Branch nodes: ${branchNodes.length}`);
console.log(`- Leaves: ${leaves.length}`);
console.log(`- Hub leaves: ${hubLeaves.length}`);
console.log(`- Deep frontier leaves: ${deepLeaves.length}`);
console.log(`- Maximum depth: ${maxDepth}`);

console.log("\nDomain summaries");
for (const domain of domains) {
  const domainNodes = flattenKnowledgeGraph(domain);
  const domainLeaves = domainNodes.filter((node) => !(node.children?.length));
  const routedDomainNodes = domainNodes.filter((node) => node.slug);
  console.log(
    `- ${domain.label}: ${domainNodes.length} nodes, ${routedDomainNodes.length} routed, ${domainLeaves.length} leaves`,
  );
}

console.log("\nHub expansion frontier");
for (const node of hubLeaves.sort((a, b) => a.label.localeCompare(b.label))) {
  console.log(`- ${node.label}${node.slug ? ` (${node.slug})` : ""}`);
}

console.log("\nDeep expansion frontier");
for (const node of deepLeaves
  .sort((a, b) => (depthById.get(b.id) ?? 0) - (depthById.get(a.id) ?? 0) || a.label.localeCompare(b.label))) {
  console.log(`- ${node.label} · depth ${depthById.get(node.id)}${node.slug ? ` (${node.slug})` : ""}`);
}
