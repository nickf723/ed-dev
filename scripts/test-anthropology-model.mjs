import assert from "node:assert/strict";
import { buildCurriculumVocabularyScopes } from "../app/_data/vocab/aggregate.mjs";
import { anthropologyVocab } from "../app/_data/vocab/a/anthropology.ts";
import {
  anthropologyBranchVocab,
  archaeologyAnthropologyVocab,
  biologicalAnthropologyVocab,
  culturalAnthropologyVocab,
  linguisticAnthropologyVocab,
} from "../app/_data/vocab/a/anthropology-branches.ts";
import {
  ANTHROPOLOGY_DIRECT_BRANCH_IDS,
  ANTHROPOLOGY_EVIDENCE_CASES,
  HOMININ_SPECIMENS,
  calculateObservedShare,
  formatObservedPercent,
  isAnthropologyEvidenceAnswerCorrect,
} from "../app/social-science/anthropology/anthropologyModel.ts";
import { ANTHROPOLOGY_CURRICULUM } from "../lib/curriculum/social/anthropology.ts";

assert.deepEqual(
  ANTHROPOLOGY_CURRICULUM.children?.map((child) => child.id),
  ANTHROPOLOGY_DIRECT_BRANCH_IDS
);
assert.equal(ANTHROPOLOGY_DIRECT_BRANCH_IDS.length, 4);
assert.equal(new Set(ANTHROPOLOGY_DIRECT_BRANCH_IDS).size, 4);
assert.deepEqual(
  ANTHROPOLOGY_CURRICULUM.children?.map((child) => child.status),
  ["placeholder", "placeholder", "active", "placeholder"]
);

assert.equal(HOMININ_SPECIMENS.length, 5);
assert.equal(new Set(HOMININ_SPECIMENS.map((item) => item.id)).size, 5);
assert.equal(HOMININ_SPECIMENS[0].id, "afarensis");
assert.equal(HOMININ_SPECIMENS.at(-1)?.id, "sapiens");
assert.ok(
  HOMININ_SPECIMENS.every(
    (item) =>
      item.name && item.time && item.brain && item.clue && item.description
  )
);

assert.equal(calculateObservedShare(18, 48), 37.5);
assert.equal(calculateObservedShare(1, 3), 33.3);
assert.equal(calculateObservedShare(60, 48), 100);
assert.equal(calculateObservedShare(-1, 48), 0);
assert.equal(calculateObservedShare(18, 0), 0);
assert.equal(calculateObservedShare(Number.NaN, 48), 0);
assert.equal(formatObservedPercent(37.5), "37.5%");
assert.equal(formatObservedPercent(100), "100%");

assert.equal(ANTHROPOLOGY_EVIDENCE_CASES.length, 4);
for (const evidenceCase of ANTHROPOLOGY_EVIDENCE_CASES) {
  assert.equal(evidenceCase.options.length, 3);
  assert.ok(
    evidenceCase.options.some(
      (option) => option.id === evidenceCase.correctOptionId
    )
  );
  for (const option of evidenceCase.options) {
    assert.equal(
      isAnthropologyEvidenceAnswerCorrect(evidenceCase.id, option.id),
      option.id === evidenceCase.correctOptionId
    );
  }
}
assert.equal(isAnthropologyEvidenceAnswerCorrect("missing", "missing"), false);

const branchGroups = [
  culturalAnthropologyVocab,
  biologicalAnthropologyVocab,
  archaeologyAnthropologyVocab,
  linguisticAnthropologyVocab,
];
assert.equal(anthropologyVocab.length, 10);
assert.deepEqual(
  branchGroups.map((group) => group.length),
  [2, 2, 2, 2]
);
assert.equal(anthropologyBranchVocab.length, 8);
const allTerms = [...anthropologyVocab, ...anthropologyBranchVocab];
assert.equal(allTerms.length, 18);
assert.equal(new Set(allTerms.map((term) => term.id)).size, 18);
for (const stableId of [
  "anth-ethnography",
  "anth-cultural-relativism",
  "anth-bipedalism",
]) {
  assert.equal(allTerms.filter((term) => term.id === stableId).length, 1);
}

const vocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [ANTHROPOLOGY_CURRICULUM],
  registrations: [
    { nodeId: "social.anthropology", terms: anthropologyVocab },
    {
      nodeId: "social.anthropology.cultural",
      terms: culturalAnthropologyVocab,
    },
    {
      nodeId: "social.anthropology.biological",
      terms: biologicalAnthropologyVocab,
    },
    {
      nodeId: "social.anthropology.archaeology",
      terms: archaeologyAnthropologyVocab,
    },
    {
      nodeId: "social.anthropology.linguistic",
      terms: linguisticAnthropologyVocab,
    },
  ],
  accent: "amber",
});
const anthropologyScope = vocabularyScopes.find(
  (scope) => scope.path === ANTHROPOLOGY_CURRICULUM.href
);
assert.ok(anthropologyScope);
assert.deepEqual(
  anthropologyScope.groups.map((group) => group.id),
  [ANTHROPOLOGY_CURRICULUM.id, ...ANTHROPOLOGY_DIRECT_BRANCH_IDS]
);
assert.equal(
  anthropologyScope.groups.flatMap((group) => group.terms).length,
  18
);
const archaeologyScope = vocabularyScopes.find(
  (scope) => scope.path === "/social-science/anthropology/archaeology"
);
assert.ok(archaeologyScope);
assert.equal(archaeologyScope.groups.length, 1);
assert.equal(archaeologyScope.groups[0].terms.length, 2);

console.log("Anthropology model tests passed.");
