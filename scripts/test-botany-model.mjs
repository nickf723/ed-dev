import assert from "node:assert/strict";
import {
  AIR_PROFILES,
  BOTANY_BRANCH_IDS,
  BOTANY_EVIDENCE_CASES,
  calculateStomatalExchange,
  isBotanyEvidenceAnswerCorrect,
} from "../app/natural-science/biology/botany/botanyModel.ts";

assert.equal(BOTANY_BRANCH_IDS.length, 6);
assert.equal(new Set(BOTANY_BRANCH_IDS).size, BOTANY_BRANCH_IDS.length);
assert.deepEqual(Object.keys(AIR_PROFILES), ["humid", "dry"]);

assert.deepEqual(calculateStomatalExchange(50, "humid"), {
  aperture: 50,
  openness: 0.5,
  carbonDioxideCapacity: 54,
  waterVaporFlux: 23,
});
assert.equal(calculateStomatalExchange(50, "dry").waterVaporFlux, 50);
assert.equal(calculateStomatalExchange(-20, "dry").aperture, 0);
assert.equal(calculateStomatalExchange(120, "dry").aperture, 100);
assert.equal(calculateStomatalExchange(0, "humid").carbonDioxideCapacity, 8);
assert.equal(
  calculateStomatalExchange(100, "humid").carbonDioxideCapacity,
  100
);

for (const evidenceCase of BOTANY_EVIDENCE_CASES) {
  assert.equal(evidenceCase.options.length, 3);
  assert.ok(
    evidenceCase.options.some(
      (option) => option.id === evidenceCase.correctOptionId
    ),
    `${evidenceCase.id} should reference a real option`
  );

  for (const option of evidenceCase.options) {
    assert.equal(
      isBotanyEvidenceAnswerCorrect(evidenceCase.id, option.id),
      option.id === evidenceCase.correctOptionId,
      `${evidenceCase.id}/${option.id} should have a deterministic verdict`
    );
  }
}

assert.equal(isBotanyEvidenceAnswerCorrect("missing", "missing"), false);

console.log("Botany model tests passed.");
