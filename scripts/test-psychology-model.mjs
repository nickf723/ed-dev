import assert from "node:assert/strict";
import {
  ATTENTION_CONDITION_SCORES,
  ATTENTION_CONDITION_SUMMARY,
  PSYCHOLOGY_BRANCH_IDS,
  PSYCHOLOGY_EVIDENCE_CASES,
  getConditionDifference,
  getMean,
  isPsychologyEvidenceAnswerCorrect,
} from "../app/social-science/psychology/psychologyModel.ts";

assert.deepEqual(PSYCHOLOGY_BRANCH_IDS, [
  "social.psychology.cognitive",
  "social.psychology.biological",
  "social.psychology.developmental",
  "social.psychology.social-personality",
  "social.psychology.clinical-counseling",
  "social.psychology.methods-measurement",
]);
assert.equal(new Set(PSYCHOLOGY_BRANCH_IDS).size, PSYCHOLOGY_BRANCH_IDS.length);

assert.equal(getMean([]), 0);
assert.equal(getMean([2, 4, 6]), 4);
assert.equal(getMean(ATTENTION_CONDITION_SCORES.uninterrupted), 8);
assert.equal(getMean(ATTENTION_CONDITION_SCORES.interrupted), 5);
assert.equal(
  getConditionDifference(
    ATTENTION_CONDITION_SCORES.uninterrupted,
    ATTENTION_CONDITION_SCORES.interrupted,
  ),
  3,
);
assert.deepEqual(ATTENTION_CONDITION_SUMMARY, {
  uninterruptedMean: 8,
  interruptedMean: 5,
  meanDifference: 3,
});

assert.equal(PSYCHOLOGY_EVIDENCE_CASES.length, 4);
for (const evidenceCase of PSYCHOLOGY_EVIDENCE_CASES) {
  assert.equal(evidenceCase.options.length, 3);
  assert.ok(
    evidenceCase.options.some(
      (option) => option.id === evidenceCase.correctOptionId,
    ),
    `${evidenceCase.id} should reference a real option`,
  );
  for (const option of evidenceCase.options) {
    assert.equal(
      isPsychologyEvidenceAnswerCorrect(evidenceCase.id, option.id),
      option.id === evidenceCase.correctOptionId,
      `${evidenceCase.id}/${option.id} should have a deterministic verdict`,
    );
  }
}

assert.equal(isPsychologyEvidenceAnswerCorrect("missing", "missing"), false);

console.log("Psychology model tests passed.");
