import assert from "node:assert/strict";
import {
  AGE_GROUPS,
  GEOGRAPHY_BRANCH_IDS,
  GEOGRAPHY_EVIDENCE_CASES,
  POPULATION_PROFILES,
  getPopulationProfileShares,
  isGeographyEvidenceAnswerCorrect,
} from "../app/social-science/geography/geographyModel.ts";

assert.equal(GEOGRAPHY_BRANCH_IDS.length, 8);
assert.equal(new Set(GEOGRAPHY_BRANCH_IDS).size, GEOGRAPHY_BRANCH_IDS.length);
assert.equal(AGE_GROUPS.length, 9);

for (const [profileKey, profile] of Object.entries(POPULATION_PROFILES)) {
  assert.equal(
    profile.values.length,
    AGE_GROUPS.length,
    `${profileKey} should provide one value per age group`
  );
  assert.ok(
    profile.values.every((value) => value > 0 && value <= 100),
    `${profileKey} should contain bounded positive teaching values`
  );

  const shares = getPopulationProfileShares(profileKey);
  const roundedTotal = shares.young + shares.working + shares.older;
  assert.ok(
    Math.abs(roundedTotal - 100) <= 1,
    `${profileKey} rounded shares should remain approximately complete`
  );
}

const expansive = getPopulationProfileShares("expansive");
const constrictive = getPopulationProfileShares("constrictive");
assert.ok(expansive.young > expansive.older);
assert.ok(constrictive.older > constrictive.young);

for (const evidenceCase of GEOGRAPHY_EVIDENCE_CASES) {
  assert.equal(evidenceCase.options.length, 3);
  assert.ok(
    evidenceCase.options.some(
      (option) => option.id === evidenceCase.correctOptionId
    ),
    `${evidenceCase.id} should reference a real option`
  );
  for (const option of evidenceCase.options) {
    assert.equal(
      isGeographyEvidenceAnswerCorrect(evidenceCase.id, option.id),
      option.id === evidenceCase.correctOptionId,
      `${evidenceCase.id}/${option.id} should have a deterministic verdict`
    );
  }
}

assert.equal(isGeographyEvidenceAnswerCorrect("missing", "missing"), false);

console.log("Geography model tests passed.");
