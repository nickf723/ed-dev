import assert from "node:assert/strict";
import { buildCurriculumVocabularyScopes } from "../app/_data/vocab/aggregate.mjs";
import { materialsScienceVocab } from "../app/_data/vocab/m/materials-science.ts";
import {
  MATERIALS_EVIDENCE_CASES,
  MATERIALS_SCIENCE_BRANCH_IDS,
  calculateEngineeringStress,
  getMechanicalCurve,
  getMechanicalRegime,
  getMechanicalResponse,
  isMaterialsEvidenceAnswerCorrect,
} from "../app/applied-science/materials-science/materialsScienceModel.ts";
import { MATERIALS_SCIENCE_CURRICULUM } from "../lib/curriculum/applied/materials-science.ts";

assert.equal(MATERIALS_SCIENCE_BRANCH_IDS.length, 8);
assert.equal(
  new Set(MATERIALS_SCIENCE_BRANCH_IDS).size,
  MATERIALS_SCIENCE_BRANCH_IDS.length
);

assert.deepEqual(getMechanicalResponse("brittle", 0), {
  stress: 0,
  fractured: false,
});
assert.deepEqual(getMechanicalResponse("brittle", 2), {
  stress: 0.94,
  fractured: false,
});
assert.deepEqual(getMechanicalResponse("brittle", 2.2), {
  stress: 0,
  fractured: true,
});
assert.equal(getMechanicalResponse("ductile", 2).stress, 0.62);
assert.equal(getMechanicalResponse("ductile", 14).stress, 0.872);
assert.equal(getMechanicalResponse("ductile", 20).fractured, false);
assert.equal(getMechanicalResponse("ductile", 22).fractured, true);
assert.equal(getMechanicalResponse("elastomer", 20).fractured, false);
assert.equal(getMechanicalResponse("elastomer", 22).fractured, true);
assert.equal(getMechanicalResponse("brittle", -2).stress, 0);

assert.equal(getMechanicalRegime("brittle", 1).label, "elastic");
assert.equal(getMechanicalRegime("brittle", 3).label, "fractured");
assert.equal(getMechanicalRegime("ductile", 1).label, "elastic");
assert.equal(getMechanicalRegime("ductile", 4).label, "plastic");
assert.equal(getMechanicalRegime("ductile", 21).label, "fractured");
assert.equal(getMechanicalRegime("elastomer", 4).label, "large reversible");
assert.equal(getMechanicalRegime("elastomer", 21).label, "outside model");

const curve = getMechanicalCurve("ductile");
assert.equal(curve.length, 111);
assert.equal(curve[0].x, 0);
assert.equal(curve.at(-1).x, 22);
assert.deepEqual(curve, getMechanicalCurve("ductile"));
assert.equal(getMechanicalCurve("brittle", 1).length, 2);

assert.equal(calculateEngineeringStress(18_000, 60), 300);
assert.equal(calculateEngineeringStress(18_000, 0), null);

for (const evidenceCase of MATERIALS_EVIDENCE_CASES) {
  assert.equal(evidenceCase.options.length, 3);
  assert.ok(
    evidenceCase.options.some(
      (option) => option.id === evidenceCase.correctOptionId
    ),
    `${evidenceCase.id} should reference a real option`
  );

  for (const option of evidenceCase.options) {
    assert.equal(
      isMaterialsEvidenceAnswerCorrect(evidenceCase.id, option.id),
      option.id === evidenceCase.correctOptionId,
      `${evidenceCase.id}/${option.id} should have a deterministic verdict`
    );
  }
}

assert.equal(isMaterialsEvidenceAnswerCorrect("missing", "missing"), false);

const vocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [MATERIALS_SCIENCE_CURRICULUM],
  registrations: [
    {
      nodeId: MATERIALS_SCIENCE_CURRICULUM.id,
      terms: materialsScienceVocab,
    },
  ],
  accent: "sky",
});
const materialsScope = vocabularyScopes.find(
  (scope) => scope.path === MATERIALS_SCIENCE_CURRICULUM.href
);
assert.ok(materialsScope);
assert.deepEqual(
  materialsScope.groups.map((group) => group.id),
  [MATERIALS_SCIENCE_CURRICULUM.id]
);
assert.equal(materialsScope.groups[0].terms.length, 20);
assert.equal(
  materialsScope.groups[0].sourceNodeId,
  MATERIALS_SCIENCE_CURRICULUM.id
);
assert.equal(
  materialsScope.groups[0].sourcePath,
  MATERIALS_SCIENCE_CURRICULUM.href
);

console.log("Materials Science model tests passed.");
