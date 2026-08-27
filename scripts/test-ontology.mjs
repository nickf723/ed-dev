import assert from "node:assert/strict";
import {
  educationStationOntology,
  findKnowledgeNode,
  findKnowledgePath,
  flattenKnowledgeTree,
} from "../app/_data/ontology.ts";

const nodes = flattenKnowledgeTree(educationStationOntology);
const ids = nodes.map((node) => node.id);
const slugs = nodes.flatMap((node) => (node.slug ? [node.slug] : []));

assert.equal(educationStationOntology.kind, "root");
assert.equal(educationStationOntology.children?.length, 6);
assert.equal(new Set(ids).size, ids.length, "Ontology node ids must be unique");
assert.equal(new Set(slugs).size, slugs.length, "Ontology slugs must be unique");

for (const node of nodes) {
  assert.ok(node.id.trim(), "Every ontology node needs an id");
  assert.ok(node.label.trim(), `Ontology node ${node.id} needs a label`);

  if (node.slug) {
    assert.ok(node.slug.startsWith("/"), `${node.id} must use an absolute route slug`);
    assert.equal(node.slug.endsWith("/"), false, `${node.id} should not end its slug with /`);
  }
}

const algebraPath = findKnowledgePath("algebra");
assert.deepEqual(
  algebraPath?.map((node) => node.id),
  ["education-station", "formal-science", "mathematics", "algebra"],
);

assert.equal(findKnowledgeNode("biology")?.slug, "/natural-science/biology");
assert.equal(findKnowledgeNode("does-not-exist"), undefined);
assert.equal(findKnowledgePath("does-not-exist"), undefined);

console.log(`Ontology integrity OK: ${nodes.length} nodes, ${slugs.length} routed nodes.`);
