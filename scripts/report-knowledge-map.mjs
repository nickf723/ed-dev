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
const routed = flattened.filter((node) => node.slug);
const leaves = flattened.filter((node) => !(node.children?.length));
const branchNodes = flattened.filter((node) => node.children?.length);
const maxDepth = Math.max(...withDepth.map(({ depth }) => depth));
const domains = educationStationKnowledgeGraph.children ?? [];

console.log("Education Station Knowledge Map\n");
console.log(renderTree(educationStationKnowledgeGraph).join("\n"));
console.log("\nCoverage summary");
console.log(`- Nodes: ${flattened.length}`);
console.log(`- Routed nodes: ${routed.length}`);
console.log(`- Branch nodes: ${branchNodes.length}`);
console.log(`- Leaves: ${leaves.length}`);
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
