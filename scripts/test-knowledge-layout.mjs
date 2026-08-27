import assert from "node:assert/strict";
import { layoutKnowledgeTree, layoutSubtree } from "../app/_data/knowledge-layout.ts";

const layout = layoutKnowledgeTree();
const ids = new Set(layout.nodes.map((node) => node.id));

assert.ok(layout.nodes.length > 6);
assert.equal(layout.edges.length, layout.nodes.length - 1, "A parent-child tree should have n - 1 edges");
assert.equal(ids.size, layout.nodes.length, "Layout node ids must be unique");

const root = layout.nodes.find((node) => node.id === "education-station");
assert.ok(root);
assert.equal(root.x, 0.5);
assert.equal(root.y, 0.5);

for (const node of layout.nodes) {
  assert.ok(node.x >= 0 && node.x <= 1, `${node.id} x must be normalized`);
  assert.ok(node.y >= 0 && node.y <= 1, `${node.id} y must be normalized`);

  if (node.parentId) {
    const parent = layout.nodes.find((candidate) => candidate.id === node.parentId);
    assert.ok(parent, `${node.id} must reference an existing parent`);
    assert.ok(parent.depth < node.depth, `${node.id} must be deeper than its parent`);

    const parentRadius = Math.hypot(parent.x - 0.5, parent.y - 0.5);
    const nodeRadius = Math.hypot(node.x - 0.5, node.y - 0.5);
    assert.ok(nodeRadius > parentRadius, `${node.id} must render farther from the center than its parent`);
  }
}

const factoring = layoutSubtree("factoring");
assert.ok(factoring);
const factoringRoot = factoring.nodes.find((node) => node.id === "factoring");
assert.equal(factoringRoot?.x, 0.5);
assert.equal(factoringRoot?.y, 0.5);
assert.equal(factoring?.edges.length, (factoring?.nodes.length ?? 1) - 1);
assert.ok(factoring?.nodes.some((node) => node.id === "difference-of-perfect-squares"));

console.log(`Knowledge radial layout integrity OK: ${layout.nodes.length} nodes, ${layout.edges.length} edges, depth ${layout.maxDepth}.`);
