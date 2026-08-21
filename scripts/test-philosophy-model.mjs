import assert from "node:assert/strict";
import { buildCurriculumVocabularyScopes } from "../app/_data/vocab/aggregate.mjs";
import { philosophyVocab } from "../app/_data/vocab/p/philosophy.ts";
import {
  philosophyAestheticsVocab,
  philosophyBranchVocab,
  philosophyConsequentialismVocab,
  philosophyEpistemologyVocab,
  philosophyEthicsVocab,
  philosophyMetaphysicsVocab,
  philosophyMindVocab,
  philosophyNormativeVocab,
  philosophyPoliticalVocab,
  philosophyScienceVocab,
} from "../app/_data/vocab/p/philosophy-branches.ts";
import {
  PHILOSOPHY_ARGUMENT_NODES,
  PHILOSOPHY_DIRECT_BRANCH_IDS,
  PHILOSOPHY_EVIDENCE_CASES,
  isPhilosophyEvidenceAnswerCorrect,
  validatePhilosophyArgument,
} from "../app/humanities/philosophy/philosophyModel.ts";
import { PHILOSOPHY_CURRICULUM } from "../lib/curriculum/humanities/philosophy/index.ts";

assert.deepEqual(
  PHILOSOPHY_CURRICULUM.children?.map((child) => child.id),
  PHILOSOPHY_DIRECT_BRANCH_IDS
);
assert.equal(PHILOSOPHY_DIRECT_BRANCH_IDS.length, 7);
assert.deepEqual(
  PHILOSOPHY_CURRICULUM.children?.map((child) => child.status),
  [
    "active",
    "placeholder",
    "placeholder",
    "active",
    "placeholder",
    "active",
    "placeholder",
  ]
);

assert.equal(PHILOSOPHY_ARGUMENT_NODES.length, 6);
assert.equal(validatePhilosophyArgument(), true);
assert.equal(
  validatePhilosophyArgument([
    ...PHILOSOPHY_ARGUMENT_NODES,
    { id: "bad", type: "reason", text: "Orphan", parentId: "missing" },
  ]),
  false
);
assert.deepEqual(
  PHILOSOPHY_ARGUMENT_NODES.map((node) => node.type),
  ["question", "claim", "reason", "reason", "objection", "reply"]
);

const terms = [...philosophyVocab, ...philosophyBranchVocab];
assert.equal(philosophyVocab.length, 12);
assert.equal(philosophyBranchVocab.length, 16);
assert.equal(terms.length, 28);
assert.equal(new Set(terms.map((term) => term.id)).size, terms.length);
for (const stableId of [
  "phil-epistemology",
  "phil-solipsism",
  "phil-utilitarianism",
  "phil-determinism",
]) {
  assert.ok(terms.some((term) => term.id === stableId));
}

const vocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [PHILOSOPHY_CURRICULUM],
  registrations: [
    { nodeId: "humanities.philosophy", terms: philosophyVocab },
    {
      nodeId: "humanities.philosophy.metaphysics",
      terms: philosophyMetaphysicsVocab,
    },
    {
      nodeId: "humanities.philosophy.epistemology",
      terms: philosophyEpistemologyVocab,
    },
    { nodeId: "humanities.philosophy.mind", terms: philosophyMindVocab },
    { nodeId: "humanities.philosophy.ethics", terms: philosophyEthicsVocab },
    {
      nodeId: "humanities.philosophy.ethics.normative",
      terms: philosophyNormativeVocab,
    },
    {
      nodeId: "humanities.philosophy.ethics.normative.consequentialism",
      terms: philosophyConsequentialismVocab,
    },
    {
      nodeId: "humanities.philosophy.political",
      terms: philosophyPoliticalVocab,
    },
    {
      nodeId: "humanities.philosophy.aesthetics",
      terms: philosophyAestheticsVocab,
    },
    {
      nodeId: "humanities.philosophy.science",
      terms: philosophyScienceVocab,
    },
  ],
  accent: "amber",
});
const philosophyScope = vocabularyScopes.find(
  (scope) => scope.path === "/humanities/philosophy"
);
assert.deepEqual(
  philosophyScope?.groups.map((group) => group.id),
  ["humanities.philosophy", ...PHILOSOPHY_DIRECT_BRANCH_IDS]
);
assert.equal(
  philosophyScope?.groups.flatMap((group) => group.terms).length,
  28
);
assert.equal(
  vocabularyScopes
    .find((scope) => scope.path === "/humanities/philosophy/ethics")
    ?.groups.flatMap((group) => group.terms).length,
  3
);

assert.equal(PHILOSOPHY_EVIDENCE_CASES.length, 4);
for (const evidenceCase of PHILOSOPHY_EVIDENCE_CASES) {
  for (const option of evidenceCase.options) {
    assert.equal(
      isPhilosophyEvidenceAnswerCorrect(evidenceCase.id, option.id),
      option.id === evidenceCase.correctOptionId
    );
  }
}
assert.equal(isPhilosophyEvidenceAnswerCorrect("missing", "missing"), false);

console.log("Philosophy model tests passed.");
