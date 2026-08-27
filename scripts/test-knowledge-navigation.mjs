import assert from "node:assert/strict";
import {
  knowledgeBreadcrumbForSlug,
  knowledgeDomainForSlug,
  navigationForKnowledgeNode,
  navigationForKnowledgeSlug,
} from "../app/_data/knowledge-navigation.ts";

const factoring = navigationForKnowledgeNode("factoring");
assert.ok(factoring);
assert.equal(factoring.parent?.id, "elementary-algebra");
assert.ok(factoring.children.some((node) => node.id === "difference-of-perfect-squares"));
assert.ok(factoring.siblings.some((node) => node.id === "linear-equations"));

const modern = navigationForKnowledgeSlug("/humanities/history/chronology/modern/");
assert.ok(modern);
assert.equal(modern.current.id, "modern-history");
assert.equal(modern.parent?.id, "chronology");
assert.equal(knowledgeDomainForSlug(modern.current.slug)?.id, "humanities");

assert.deepEqual(
  knowledgeBreadcrumbForSlug("/natural-science/earth-science/geology").map((node) => node.id),
  ["education-station", "natural-science", "earth-science", "geology"],
);

assert.equal(navigationForKnowledgeNode("does-not-exist"), undefined);
assert.equal(navigationForKnowledgeSlug("/does-not-exist"), undefined);

console.log("Knowledge navigation integrity OK.");
