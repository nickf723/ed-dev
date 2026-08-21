import assert from "node:assert/strict";
import {
  VISUAL_ARTS_BRANCH_IDS,
  VISUAL_ARTS_EVIDENCE_CASES,
  getHarmonyHues,
  isVisualArtsEvidenceAnswerCorrect,
  normalizeHue,
} from "../app/humanities/visual-arts/visualArtsModel.ts";

assert.equal(VISUAL_ARTS_BRANCH_IDS.length, 6);
assert.equal(
  new Set(VISUAL_ARTS_BRANCH_IDS).size,
  VISUAL_ARTS_BRANCH_IDS.length
);

assert.equal(normalizeHue(360), 0);
assert.equal(normalizeHue(-30), 330);
assert.equal(normalizeHue(721), 1);
assert.deepEqual(getHarmonyHues(18, "complementary"), [18, 198]);
assert.deepEqual(getHarmonyHues(18, "analogous"), [348, 18, 48]);
assert.deepEqual(getHarmonyHues(18, "triadic"), [18, 138, 258]);
assert.deepEqual(getHarmonyHues(18, "split"), [18, 168, 228]);

for (const evidenceCase of VISUAL_ARTS_EVIDENCE_CASES) {
  assert.equal(evidenceCase.options.length, 3);
  assert.ok(
    evidenceCase.options.some(
      (option) => option.id === evidenceCase.correctOptionId
    ),
    `${evidenceCase.id} should reference a real option`
  );

  for (const option of evidenceCase.options) {
    assert.equal(
      isVisualArtsEvidenceAnswerCorrect(evidenceCase.id, option.id),
      option.id === evidenceCase.correctOptionId,
      `${evidenceCase.id}/${option.id} should have a deterministic verdict`
    );
  }
}

assert.equal(isVisualArtsEvidenceAnswerCorrect("missing", "missing"), false);

console.log("Visual Arts model tests passed.");
