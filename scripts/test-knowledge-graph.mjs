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

assert.deepEqual(
  findGraphPath("modern-history")?.map((node) => node.id),
  ["education-station", "humanities", "history", "chronology", "modern-history"],
);

assert.deepEqual(
  findGraphPath("set-theory")?.map((node) => node.id),
  ["education-station", "formal-science", "mathematics", "discrete-mathematics", "set-theory"],
);

assert.deepEqual(
  findGraphPath("anthropology-archaeology")?.map((node) => node.id),
  ["education-station", "social-science", "anthropology", "anthropology-archaeology"],
);

assert.deepEqual(
  findGraphPath("game-studies-science")?.map((node) => node.id),
  ["education-station", "interdisciplines", "game-studies", "game-studies-science"],
);

assert.equal(
  findGraphNodeBySlug("/natural-science/biology/zoology")?.id,
  "zoology",
);
assert.equal(
  findGraphNodeBySlug("/natural-science/physics/mechanics")?.id,
  "mechanics",
);
assert.equal(
  findGraphNodeBySlug("/humanities/literature/narrative-fiction")?.id,
  "narrative-fiction",
);
assert.equal(
  findGraphNodeBySlug("/natural-science/astronomy/cosmology")?.id,
  "cosmology",
);
assert.equal(findGraphNode("machine-learning")?.label, "Machine Learning");
assert.ok(graphChildren("computer-science").length >= 6);
assert.ok(graphChildren("elementary-algebra").length >= 10);
assert.ok(graphChildren("physics").length >= 6);
assert.equal(graphChildren("chronology").length, 5);
assert.equal(graphChildren("philosophy").length, 3);
assert.equal(graphChildren("music").length, 4);
assert.equal(graphChildren("engineering").length, 6);
assert.equal(graphChildren("astronomy").length, 2);
assert.equal(graphChildren("game-studies").length, 2);

console.log(`Knowledge graph integrity OK: ${nodes.length} nodes, ${slugs.length} routed nodes.`);
