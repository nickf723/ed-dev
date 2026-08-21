import assert from "node:assert/strict";
import {
  EARTH_SCIENCE_BRANCH_IDS,
  EARTH_SCIENCE_EVIDENCE_CASES,
  MINERALOGY_NODE_ID,
  TEACHING_WATER_BUDGET,
  getStorageChange,
  isEarthScienceEvidenceAnswerCorrect,
} from "../app/natural-science/earth-science/earthScienceModel.ts";
import { EARTH_SCIENCE_CURRICULUM } from "../lib/curriculum/natural/earth-science.ts";
import { earthScienceVocab } from "../app/_data/vocab/e/earth-science.ts";

assert.deepEqual(EARTH_SCIENCE_BRANCH_IDS, [
  "natural.earth-science.geology",
  "natural.earth-science.hydrology",
  "natural.earth-science.meteorology",
  "natural.earth-science.geography",
  "natural.earth-science.climatology",
]);
assert.equal(
  new Set(EARTH_SCIENCE_BRANCH_IDS).size,
  EARTH_SCIENCE_BRANCH_IDS.length,
);
assert.deepEqual(
  EARTH_SCIENCE_CURRICULUM.children?.map((child) => child.id),
  EARTH_SCIENCE_BRANCH_IDS,
);

const geology = EARTH_SCIENCE_CURRICULUM.children?.find(
  (child) => child.id === "natural.earth-science.geology",
);
assert.deepEqual(geology?.children?.map((child) => child.id), [
  MINERALOGY_NODE_ID,
]);
assert.equal(geology?.children?.[0].status, "active");
assert.equal(geology?.children?.[0].pageKind, "reference");

assert.equal(earthScienceVocab.length, 26);
assert.equal(new Set(earthScienceVocab.map((term) => term.id)).size, 26);
for (const stableId of [
  "earth-lithosphere",
  "earth-subduction",
  "earth-albedo",
  "earth-troposphere",
]) {
  assert.ok(
    earthScienceVocab.some((term) => term.id === stableId),
    `${stableId} should retain its established vocabulary identity`,
  );
}

assert.equal(getStorageChange(TEACHING_WATER_BUDGET), 20);
assert.equal(
  getStorageChange({
    precipitation: 80,
    evapotranspiration: 30,
    runoff: 50,
  }),
  0,
);
assert.equal(
  getStorageChange({
    precipitation: 60,
    evapotranspiration: 40,
    runoff: 35,
  }),
  -15,
);

assert.equal(EARTH_SCIENCE_EVIDENCE_CASES.length, 4);
for (const evidenceCase of EARTH_SCIENCE_EVIDENCE_CASES) {
  assert.equal(evidenceCase.options.length, 3);
  assert.ok(
    evidenceCase.options.some(
      (option) => option.id === evidenceCase.correctOptionId,
    ),
    `${evidenceCase.id} should reference a real option`,
  );
  for (const option of evidenceCase.options) {
    assert.equal(
      isEarthScienceEvidenceAnswerCorrect(evidenceCase.id, option.id),
      option.id === evidenceCase.correctOptionId,
      `${evidenceCase.id}/${option.id} should have a deterministic verdict`,
    );
  }
}

assert.equal(isEarthScienceEvidenceAnswerCorrect("missing", "missing"), false);

console.log("Earth Science model tests passed.");
