import assert from "node:assert/strict";
import {
  educationStationKnowledgeGraph,
  findGraphNode,
  findGraphNodeBySlug,
  findGraphPath,
  flattenKnowledgeGraph,
  graphChildren,
} from "../app/_data/knowledge-graph.ts";

const nodes = flattenKnowledgeGraph();
const ids = nodes.map((node) => node.id);
const slugs = nodes.flatMap((node) => (node.slug ? [node.slug] : []));

assert.equal(educationStationKnowledgeGraph.children?.length, 6);
assert.equal(new Set(ids).size, ids.length, "Knowledge graph node ids must be unique");
assert.equal(new Set(slugs).size, slugs.length, "Knowledge graph slugs must be unique");

assert.deepEqual(
  findGraphPath("difference-of-perfect-squares")?.map((node) => node.id),
  [
    "education-station",
    "formal-science",
    "mathematics",
    "algebra",
    "elementary-algebra",
    "factoring",
    "difference-of-perfect-squares",
  ],
);

assert.equal(
  findGraphNodeBySlug("/natural-science/biology/zoology")?.id,
  "zoology",
);
assert.equal(findGraphNode("machine-learning")?.label, "Machine Learning");
assert.ok(graphChildren("computer-science").length >= 6);
assert.ok(graphChildren("elementary-algebra").length >= 10);

console.log(`Knowledge graph integrity OK: ${nodes.length} nodes, ${slugs.length} routed nodes.`);
