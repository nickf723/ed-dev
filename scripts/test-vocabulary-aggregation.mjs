import assert from "node:assert/strict";
import { buildCurriculumVocabularyScopes } from "../app/_data/vocab/aggregate.mjs";

const term = (id, word, definition = `${word} definition`) => ({
  id,
  word,
  definition,
  domain: "Test",
  tags: [],
  isAdult: false,
});

const roots = [
  {
    id: "root",
    label: "Root",
    href: "/root",
    children: [
      {
        id: "root.alpha",
        label: "Alpha",
        href: "/root/alpha",
        children: [
          {
            id: "root.alpha.leaf",
            label: "Leaf",
            href: "/root/alpha/leaf",
          },
        ],
      },
      {
        id: "root.beta",
        label: "Beta",
        href: "/root/beta",
      },
      {
        id: "root.empty",
        label: "Empty",
        href: "/root/empty",
      },
    ],
  },
];

const scopes = buildCurriculumVocabularyScopes({
  roots,
  registrations: [
    { nodeId: "root", terms: [term("root-term", "Root term")] },
    { nodeId: "root.alpha", terms: [term("alpha-term", "Alpha term")] },
    { nodeId: "root.alpha.leaf", terms: [term("leaf-term", "Leaf term")] },
    { nodeId: "root.beta", terms: [term("beta-term", "Beta term")] },
  ],
  accent: "cyan",
});

const byPath = new Map(scopes.map((scope) => [scope.path, scope]));
const rootScope = byPath.get("/root");
const alphaScope = byPath.get("/root/alpha");
const leafScope = byPath.get("/root/alpha/leaf");

assert.deepEqual(
  rootScope?.groups.map((group) => group.id),
  ["root", "root.alpha", "root.beta"],
  "a parent should group its own terms and each contributing direct child",
);
assert.deepEqual(
  rootScope?.groups.find((group) => group.id === "root.alpha")?.terms.map((item) => item.id),
  ["alpha-term", "leaf-term"],
  "a direct-child group should aggregate that child's descendants",
);
assert.deepEqual(
  alphaScope?.groups.map((group) => group.id),
  ["root.alpha", "root.alpha.leaf"],
  "a child scope should preserve its own local and direct-child provenance",
);
assert.deepEqual(
  leafScope?.groups.flatMap((group) => group.terms.map((item) => item.id)),
  ["leaf-term"],
  "a leaf scope should contain only terms owned by that leaf",
);
assert.equal(
  byPath.has("/root/empty"),
  false,
  "nodes without local or descendant terms should not create empty scopes",
);

assert.throws(
  () =>
    buildCurriculumVocabularyScopes({
      roots,
      registrations: [{ nodeId: "missing", terms: [] }],
      accent: "cyan",
    }),
  /unknown curriculum node/,
);

assert.throws(
  () =>
    buildCurriculumVocabularyScopes({
      roots,
      registrations: [
        { nodeId: "root.alpha", terms: [term("shared", "Shared", "First")] },
        { nodeId: "root.beta", terms: [term("shared", "Shared", "Second")] },
      ],
      accent: "cyan",
    }),
  /Conflicting vocabulary term shared/,
);

console.log("Vocabulary aggregation tests passed.");
