import assert from "node:assert/strict";
import {
  educationStationKnowledgeGraph,
  findGraphNode,
  findGraphNodeBySlug,
  findGraphPath,
  flattenKnowledgeGraph,
  graphChildren,
  graphDescendantCount,
  graphDescendants,
  searchKnowledgeGraph,
} from "../app/_data/knowledge-graph.ts";
import { layoutKnowledgeTree } from "../app/_data/knowledge-layout.ts";

const nodes = flattenKnowledgeGraph();
const ids = nodes.map((node) => node.id);
const slugs = nodes.flatMap((node) => (node.slug ? [node.slug] : []));
const layout = layoutKnowledgeTree();

assert.equal(educationStationKnowledgeGraph.children?.length, 6);
assert.equal(new Set(ids).size, ids.length, "Knowledge graph node ids must be unique");
assert.equal(new Set(slugs).size, slugs.length, "Knowledge graph slugs must be unique");

assert.deepEqual(findGraphPath("difference-of-perfect-squares")?.map((node) => node.id), ["education-station", "formal-science", "mathematics", "algebra", "elementary-algebra", "factoring", "difference-of-perfect-squares"]);
assert.deepEqual(findGraphPath("coefficient")?.map((node) => node.id), ["education-station", "formal-science", "mathematics", "algebra", "elementary-algebra", "algebra-fundamentals", "expressions-variables", "coefficient"]);
assert.deepEqual(findGraphPath("united-states-history")?.map((node) => node.id), ["education-station", "humanities", "history", "regional-history", "history-americas", "united-states-history"]);
assert.deepEqual(findGraphPath("greek-mythology")?.map((node) => node.id), ["education-station", "humanities", "religion", "mythology", "greek-mythology"]);
assert.deepEqual(findGraphPath("set-theory")?.map((node) => node.id), ["education-station", "formal-science", "mathematics", "discrete-mathematics", "set-theory"]);
assert.deepEqual(findGraphPath("anthropology-archaeology")?.map((node) => node.id), ["education-station", "social-science", "anthropology", "anthropology-archaeology"]);
assert.deepEqual(findGraphPath("game-studies-science")?.map((node) => node.id), ["education-station", "interdisciplines", "game-studies", "game-studies-science"]);
assert.deepEqual(findGraphPath("newtons-second-law")?.map((node) => node.id), ["education-station", "natural-science", "physics", "mechanics", "forces", "newtons-second-law"]);
assert.deepEqual(findGraphPath("paleozoology")?.map((node) => node.id), ["education-station", "natural-science", "biology", "zoology", "paleozoology"]);

assert.equal(findGraphNodeBySlug("/formal-science/mathematics/statistics/descriptive")?.id, "descriptive-statistics");
assert.equal(findGraphNodeBySlug("/natural-science/biology/zoology")?.id, "zoology");
assert.equal(findGraphNodeBySlug("/humanities/religion/mythology/greek")?.id, "greek-mythology");
assert.equal(findGraphNode("coefficient")?.slug, undefined);
assert.equal(findGraphNode("coefficient")?.kind, "concept");

const coefficientLayoutNode = layout.nodes.find((node) => node.id === "coefficient");
assert.equal(coefficientLayoutNode?.kind, "concept");
assert.equal(coefficientLayoutNode?.status, "live");
assert.equal(coefficientLayoutNode?.slug, undefined);
assert.equal(layout.nodes.find((node) => node.id === "set-theory")?.kind, "branch");
assert.equal(layout.nodes.find((node) => node.id === "set-theory")?.slug, "/formal-science/mathematics/discrete/set-theory");

assert.ok(graphChildren("computer-science").length >= 6);
assert.ok(graphChildren("elementary-algebra").length >= 10);
assert.equal(graphChildren("algebra-fundamentals").length, 7);
assert.equal(graphChildren("expressions-variables").length, 6);
assert.equal(graphChildren("chronology").length, 5);
assert.equal(graphChildren("engineering").length, 6);
assert.equal(graphChildren("limits").length, 5);
assert.equal(graphChildren("euclidean-geometry").length, 6);
assert.equal(graphChildren("zoology").length, 4);
assert.equal(graphChildren("mechanics").length, 2);
assert.equal(graphChildren("forces").length, 3);
assert.equal(graphChildren("mechanical-energy").length, 2);
assert.equal(graphChildren("mythology").length, 1);

assert.equal(graphDescendantCount("expressions-variables"), 6);
assert.equal(graphDescendantCount("limits"), 5);
assert.equal(graphDescendantCount("euclidean-geometry"), 6);
assert.equal(graphDescendantCount("zoology"), 4);
assert.equal(graphDescendantCount("regional-history"), 3);
assert.ok(graphDescendantCount("mechanics") >= 7);
assert.ok(graphDescendantCount("mathematics") > graphChildren("mathematics").length);
assert.deepEqual(graphDescendants("does-not-exist"), []);

assert.equal(searchKnowledgeGraph("coefficient", 1)[0]?.id, "coefficient");
assert.equal(searchKnowledgeGraph("set theory", 1)[0]?.id, "set-theory");
assert.equal(searchKnowledgeGraph("greek mythology", 1)[0]?.id, "greek-mythology");
assert.ok(searchKnowledgeGraph("geometry").some((node) => node.id === "geometry"));
assert.ok(searchKnowledgeGraph("geometry").some((node) => node.id === "euclidean-geometry"));
assert.ok(searchKnowledgeGraph("archaeology").some((node) => node.id === "archaeology"));
assert.ok(searchKnowledgeGraph("archaeology").some((node) => node.id === "anthropology-archaeology"));
assert.deepEqual(searchKnowledgeGraph(""), []);
assert.deepEqual(searchKnowledgeGraph("set", 0), []);

console.log(`Knowledge graph integrity OK: ${nodes.length} nodes, ${slugs.length} routed nodes.`);
