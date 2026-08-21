import assert from "node:assert/strict";
import {
  SOCIOLOGY_DIRECT_BRANCH_IDS,
  SOCIOLOGY_EVIDENCE_CASES,
  analyzeSchellingGrid,
  createSchellingGrid,
  isSociologyEvidenceAnswerCorrect,
  stepSchellingGrid,
} from "../app/social-science/sociology/sociologyModel.ts";
import { SOCIOLOGY_CURRICULUM } from "../lib/curriculum/social/sociology.ts";
import { sociologyVocab } from "../app/_data/vocab/s/sociology.ts";
import { sociologyBranchVocab } from "../app/_data/vocab/s/sociology-branches.ts";

assert.deepEqual(
  SOCIOLOGY_CURRICULUM.children?.map((child) => child.id),
  SOCIOLOGY_DIRECT_BRANCH_IDS
);
assert.equal(SOCIOLOGY_DIRECT_BRANCH_IDS.length, 7);
assert.ok(
  SOCIOLOGY_CURRICULUM.children?.every(
    (child) => child.status === "placeholder"
  )
);

const initial = createSchellingGrid(64);
assert.deepEqual(
  [0, 1, 2].map((cell) => initial.filter((value) => value === cell).length),
  [54, 182, 164]
);
assert.deepEqual(analyzeSchellingGrid(initial, 0.3), {
  agents: 346,
  dissatisfied: 81,
  satisfiedPercent: 77,
  localSimilarityPercent: 48,
});
assert.deepEqual(createSchellingGrid(64), initial);
assert.notDeepEqual(createSchellingGrid(65), initial);

const stepped = stepSchellingGrid(initial, 0.3, 65);
assert.deepEqual(analyzeSchellingGrid(stepped, 0.3), {
  agents: 346,
  dissatisfied: 32,
  satisfiedPercent: 91,
  localSimilarityPercent: 62,
});
assert.deepEqual(stepSchellingGrid(initial, 0.3, 65), stepped);
assert.deepEqual(
  [0, 1, 2].map((cell) => stepped.filter((value) => value === cell).length),
  [54, 182, 164]
);

const terms = [...sociologyVocab, ...sociologyBranchVocab];
assert.equal(sociologyVocab.length, 15);
assert.equal(sociologyBranchVocab.length, 14);
assert.equal(terms.length, 29);
assert.equal(new Set(terms.map((term) => term.id)).size, 29);
for (const stableId of [
  "soc-anomie",
  "soc-ethnocentrism",
  "soc-stratification",
]) {
  assert.ok(terms.some((term) => term.id === stableId));
}

assert.equal(SOCIOLOGY_EVIDENCE_CASES.length, 4);
for (const evidenceCase of SOCIOLOGY_EVIDENCE_CASES) {
  for (const option of evidenceCase.options) {
    assert.equal(
      isSociologyEvidenceAnswerCorrect(evidenceCase.id, option.id),
      option.id === evidenceCase.correctOptionId
    );
  }
}
assert.equal(isSociologyEvidenceAnswerCorrect("missing", "missing"), false);

console.log("Sociology model tests passed.");
