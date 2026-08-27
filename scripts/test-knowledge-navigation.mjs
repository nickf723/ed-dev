import assert from "node:assert/strict";
import {
  findKnowledgeHostPage,
  searchKnowledgeGraph,
} from "../app/_data/knowledge-graph.ts";
import {
  knowledgeBreadcrumbForSlug,
  knowledgeDomainForSlug,
  navigationForKnowledgeNode,
  navigationForKnowledgeSlug,
} from "../app/_data/knowledge-navigation.ts";
import { knowledgeRelationsFor } from "../app/_data/knowledge-relations.ts";

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

const coefficient = navigationForKnowledgeNode("coefficient");
assert.ok(coefficient);
assert.equal(coefficient.current.slug, undefined);
assert.equal(coefficient.parent?.id, "expressions-variables");
assert.equal(findKnowledgeHostPage(coefficient.current.id)?.id, "expressions-variables");
assert.ok(coefficient.siblings.some((node) => node.id === "variable"));
assert.ok(knowledgeRelationsFor(coefficient.current.id).some(({ other }) => other.id === "term"));

const photosynthesis = navigationForKnowledgeNode("photosynthesis");
assert.ok(photosynthesis);
assert.equal(photosynthesis.parent?.id, "plant-physiology");
assert.equal(findKnowledgeHostPage(photosynthesis.current.id)?.id, "botany");

const collectiveChoice = navigationForKnowledgeNode("collective-choice");
assert.ok(collectiveChoice);
assert.equal(findKnowledgeHostPage(collectiveChoice.current.id)?.id, "political-science");
assert.ok(knowledgeRelationsFor(collectiveChoice.current.id).length >= 3);

const narrativeStory = navigationForKnowledgeNode("narrative-story");
assert.ok(narrativeStory);
assert.equal(narrativeStory.parent?.id, "story-plot-time");
assert.equal(findKnowledgeHostPage(narrativeStory.current.id)?.id, "narrative-fiction");
assert.ok(knowledgeRelationsFor(narrativeStory.current.id).some(({ other }) => other.id === "narrative-plot"));

assert.equal(searchKnowledgeGraph("DOPS", 1)[0]?.id, "difference-of-perfect-squares");
assert.equal(searchKnowledgeGraph("FBD", 1)[0]?.id, "free-body-diagrams");
assert.equal(searchKnowledgeGraph("F=ma", 1)[0]?.id, "newtons-second-law");
assert.equal(searchKnowledgeGraph("POV", 1)[0]?.id, "narrator-perspective");
assert.equal(searchKnowledgeGraph("GCF", 1)[0]?.id, "greatest-common-factor");

assert.equal(navigationForKnowledgeNode("does-not-exist"), undefined);
assert.equal(navigationForKnowledgeSlug("/does-not-exist"), undefined);
assert.equal(findKnowledgeHostPage("does-not-exist"), undefined);

console.log("Knowledge navigation integrity OK across routes, concepts, hosts, cross-links, and search aliases.");
