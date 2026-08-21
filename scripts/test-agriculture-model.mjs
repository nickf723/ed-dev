import assert from "node:assert/strict";
import {
  AGRICULTURE_DIRECT_BRANCH_IDS,
  AGRICULTURE_EVIDENCE_CASES,
  CROP_SYSTEMS,
  calculateNitrogenBudget,
  isAgricultureEvidenceAnswerCorrect,
} from "../app/applied-science/agriculture/agricultureModel.ts";
import { AGRICULTURE_CURRICULUM } from "../lib/curriculum/applied/agriculture.ts";
import { agricultureVocab } from "../app/_data/vocab/a/agriculture.ts";
import {
  agricultureEconomicsVocab,
  agricultureEngineeringVocab,
  agronomyVocab,
  agroecologyVocab,
  animalScienceVocab,
  aquacultureVocab,
  forestryAgroforestryVocab,
  horticultureVocab,
  soilNutrientsVocab,
} from "../app/_data/vocab/a/agriculture-branches.ts";

const assertApproximately = (actual, expected) =>
  assert.ok(Math.abs(actual - expected) < 1e-12, `${actual} ≈ ${expected}`);

assert.deepEqual(
  AGRICULTURE_CURRICULUM.children?.map((child) => child.id),
  AGRICULTURE_DIRECT_BRANCH_IDS
);
assert.equal(AGRICULTURE_DIRECT_BRANCH_IDS.length, 9);
assert.equal(new Set(AGRICULTURE_DIRECT_BRANCH_IDS).size, 9);
assert.ok(
  AGRICULTURE_CURRICULUM.children?.every(
    (child) => child.status === "placeholder"
  )
);

const grainLegume = CROP_SYSTEMS.find(
  (system) => system.key === "grain-legume"
);
assert.ok(grainLegume);
const canonical = calculateNitrogenBudget(grainLegume, 24, 35, 75);
assert.equal(canonical.startingMineral, 69);
assert.equal(canonical.lossFraction, 0.1375);
assert.equal(canonical.losses, 9.4875);
assert.equal(canonical.soilUptake, 59.5125);
assertApproximately(canonical.fixation, 2.4875);
assert.equal(canonical.plantN, 62);
assert.equal(canonical.shortfall, 0);
assert.equal(canonical.harvestRemoval, 39.68);
assertApproximately(canonical.retainedResidue, 16.74);
assertApproximately(canonical.removedResidue, 5.58);
assert.equal(canonical.residualMineral, 0);

const cereal = CROP_SYSTEMS.find((system) => system.key === "cereal");
assert.ok(cereal);
const limited = calculateNitrogenBudget(cereal, 0, 0, 0);
assert.equal(limited.startingMineral, 45);
assert.equal(limited.losses, 2.25);
assert.equal(limited.fixation, 0);
assert.equal(limited.shortfall, 29.25);
assert.equal(limited.retainedResidue, 0);

const cover = CROP_SYSTEMS.find((system) => system.key === "cover");
assert.ok(cover);
const abundant = calculateNitrogenBudget(cover, 60, 100, 100);
assert.equal(abundant.losses, 31.5);
assert.equal(abundant.soilUptake, 50);
assert.equal(abundant.fixation, 0);
assert.equal(abundant.harvestRemoval, 4);
assert.equal(abundant.retainedResidue, 46);

const vocabularyGroups = [
  agricultureVocab,
  agronomyVocab,
  soilNutrientsVocab,
  horticultureVocab,
  animalScienceVocab,
  aquacultureVocab,
  forestryAgroforestryVocab,
  agroecologyVocab,
  agricultureEngineeringVocab,
  agricultureEconomicsVocab,
];
const vocabularyTerms = vocabularyGroups.flat();
assert.deepEqual(
  vocabularyGroups.map((group) => group.length),
  [18, 2, 2, 2, 2, 2, 2, 2, 2, 2]
);
assert.equal(vocabularyTerms.length, 36);
assert.equal(new Set(vocabularyTerms.map((term) => term.id)).size, 36);

assert.equal(AGRICULTURE_EVIDENCE_CASES.length, 4);
for (const evidenceCase of AGRICULTURE_EVIDENCE_CASES) {
  assert.equal(evidenceCase.options.length, 3);
  assert.ok(
    evidenceCase.options.some(
      (option) => option.id === evidenceCase.correctOptionId
    )
  );
  for (const option of evidenceCase.options) {
    assert.equal(
      isAgricultureEvidenceAnswerCorrect(evidenceCase.id, option.id),
      option.id === evidenceCase.correctOptionId
    );
  }
}
assert.equal(isAgricultureEvidenceAnswerCorrect("missing", "missing"), false);

console.log("Agriculture model tests passed.");
