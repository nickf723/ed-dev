import assert from "node:assert/strict";
import {
  ANATOMY_EVIDENCE_CASES,
  ORGANIZATION_LEVELS,
  REGION_PROFILES,
  isEvidenceAnswerCorrect,
} from "../app/applied-science/medicine/anatomy-physiology/anatomyModel.ts";

assert.deepEqual(
  ORGANIZATION_LEVELS.map((level) => level.id),
  ["chemical", "cellular", "tissue", "organ", "organ-system", "organism"],
  "the introductory model should retain the canonical six structural levels"
);

assert.equal(new Set(ORGANIZATION_LEVELS.map((level) => level.id)).size, 6);
assert.equal(
  new Set(REGION_PROFILES.map((region) => region.id)).size,
  REGION_PROFILES.length
);

for (const region of REGION_PROFILES) {
  assert.ok(
    region.systems.length >= 5,
    `${region.label} should show genuine system overlap`
  );
  assert.ok(
    region.structures.length >= 5,
    `${region.label} should provide structures to locate`
  );
}

for (const evidenceCase of ANATOMY_EVIDENCE_CASES) {
  assert.equal(
    evidenceCase.options.length,
    3,
    `${evidenceCase.id} should have three bounded options`
  );
  assert.ok(
    evidenceCase.options.some(
      (option) => option.id === evidenceCase.correctOptionId
    ),
    `${evidenceCase.id} should point to a real option`
  );
  for (const option of evidenceCase.options) {
    assert.equal(
      isEvidenceAnswerCorrect(evidenceCase.id, option.id),
      option.id === evidenceCase.correctOptionId,
      `${evidenceCase.id}/${option.id} should have a deterministic verdict`
    );
  }
}

assert.equal(isEvidenceAnswerCorrect("missing", "missing"), false);

console.log("Anatomy & Physiology model tests passed.");
