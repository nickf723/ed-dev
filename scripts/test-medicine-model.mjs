import assert from "node:assert/strict";
import { buildCurriculumVocabularyScopes } from "../app/_data/vocab/aggregate.mjs";
import { anatomyPhysiologyVocab } from "../app/_data/vocab/a/anatomy-physiology.ts";
import { medicineCoreVocab } from "../app/_data/vocab/m/medicine.ts";
import {
  medicineAcuteCareVocab,
  medicineBranchVocab,
  medicineClinicalReasoningVocab,
  medicineDiagnosticsVocab,
  medicineEthicsVocab,
  medicineLongitudinalCareVocab,
  medicinePathologyVocab,
  medicinePharmacologyVocab,
  medicineProceduresVocab,
  medicineSpecialtiesVocab,
} from "../app/_data/vocab/m/medicine-branches.ts";
import { skeletalSystemVocab } from "../app/_data/vocab/s/skeletal-system.ts";
import {
  DIAGNOSTIC_TABLE,
  MEDICINE_DIRECT_BRANCH_IDS,
  MEDICINE_EVIDENCE_CASES,
  MEDICINE_EVIDENCE_PACKETS,
  MEDICINE_REASONING_STAGES,
  calculateMedicineSupport,
  calculatePositivePredictiveValue,
  calculateSensitivity,
  calculateSpecificity,
  formatMedicinePercent,
  isMedicineEvidenceAnswerCorrect,
} from "../app/applied-science/medicine/medicineModel.ts";
import { MEDICINE_CURRICULUM } from "../lib/curriculum/applied/medicine.ts";

assert.equal(MEDICINE_CURRICULUM.pageKind, "hub");
assert.deepEqual(
  MEDICINE_CURRICULUM.children?.map((child) => child.id),
  MEDICINE_DIRECT_BRANCH_IDS
);
assert.equal(MEDICINE_DIRECT_BRANCH_IDS.length, 10);
assert.equal(new Set(MEDICINE_DIRECT_BRANCH_IDS).size, 10);
assert.deepEqual(
  MEDICINE_CURRICULUM.children?.map((child) => child.status),
  ["active", ...Array(9).fill("placeholder")]
);

assert.deepEqual(
  MEDICINE_REASONING_STAGES.map((stage) => stage.key),
  ["observe", "interpret", "test", "act", "monitor"]
);
assert.equal(MEDICINE_EVIDENCE_PACKETS.length, 5);
assert.deepEqual(calculateMedicineSupport([]), [2, 2, 2]);
assert.deepEqual(calculateMedicineSupport(["history"]), [4, 3, 2]);
assert.deepEqual(calculateMedicineSupport(["history", "history"]), [4, 3, 2]);
assert.deepEqual(
  calculateMedicineSupport(MEDICINE_EVIDENCE_PACKETS.map((item) => item.key)),
  [6, 5, 7]
);

assert.equal(
  Object.values(DIAGNOSTIC_TABLE).reduce((sum, value) => sum + value, 0),
  1000
);
assert.equal(
  DIAGNOSTIC_TABLE.truePositive + DIAGNOSTIC_TABLE.falseNegative,
  100
);
assert.equal(
  DIAGNOSTIC_TABLE.trueNegative + DIAGNOSTIC_TABLE.falsePositive,
  900
);
assert.equal(
  DIAGNOSTIC_TABLE.truePositive + DIAGNOSTIC_TABLE.falsePositive,
  135
);
assert.equal(calculateSensitivity(DIAGNOSTIC_TABLE), 0.9);
assert.equal(calculateSpecificity(DIAGNOSTIC_TABLE), 0.95);
assert.equal(calculatePositivePredictiveValue(DIAGNOSTIC_TABLE), 2 / 3);
assert.equal(calculateSensitivity({ truePositive: 0, falseNegative: 0 }), null);
assert.equal(
  calculateSpecificity({ trueNegative: -1, falsePositive: 1 }),
  null
);
assert.equal(
  calculatePositivePredictiveValue({
    truePositive: Number.NaN,
    falsePositive: 1,
  }),
  null
);
assert.equal(formatMedicinePercent(0.9), "90.0%");
assert.equal(formatMedicinePercent(2 / 3), "66.7%");
assert.equal(formatMedicinePercent(null), "invalid inputs");

assert.equal(MEDICINE_EVIDENCE_CASES.length, 4);
for (const evidenceCase of MEDICINE_EVIDENCE_CASES) {
  assert.equal(evidenceCase.options.length, 3);
  assert.ok(
    evidenceCase.options.some(
      (option) => option.id === evidenceCase.correctOptionId
    )
  );
  for (const option of evidenceCase.options) {
    assert.equal(
      isMedicineEvidenceAnswerCorrect(evidenceCase.id, option.id),
      option.id === evidenceCase.correctOptionId
    );
  }
}
assert.equal(isMedicineEvidenceAnswerCorrect("missing", "missing"), false);

const branchGroups = [
  medicinePathologyVocab,
  medicineDiagnosticsVocab,
  medicinePharmacologyVocab,
  medicineProceduresVocab,
  medicineClinicalReasoningVocab,
  medicineSpecialtiesVocab,
  medicineAcuteCareVocab,
  medicineLongitudinalCareVocab,
  medicineEthicsVocab,
];
assert.equal(medicineCoreVocab.length, 6);
assert.deepEqual(
  branchGroups.map((group) => group.length),
  [4, 2, 2, 2, 2, 2, 2, 2, 2]
);
assert.equal(medicineBranchVocab.length, 20);
assert.equal(anatomyPhysiologyVocab.length, 7);
assert.equal(skeletalSystemVocab.length, 6);
const allTerms = [
  ...medicineCoreVocab,
  ...medicineBranchVocab,
  ...anatomyPhysiologyVocab,
  ...skeletalSystemVocab,
];
assert.equal(allTerms.length, 39);
assert.equal(new Set(allTerms.map((term) => term.id)).size, 39);
for (const stableId of [
  "med-etiology",
  "med-pathogenesis",
  "med-diagnosis",
  "med-apoptosis",
  "med-pathogen",
]) {
  assert.equal(allTerms.filter((term) => term.id === stableId).length, 1);
}

const registrations = [
  { nodeId: MEDICINE_CURRICULUM.id, terms: medicineCoreVocab },
  {
    nodeId: "applied.medicine.anatomy-physiology",
    terms: anatomyPhysiologyVocab,
  },
  ...MEDICINE_DIRECT_BRANCH_IDS.slice(1).map((nodeId, index) => ({
    nodeId,
    terms: branchGroups[index],
  })),
  {
    nodeId: "applied.medicine.anatomy-physiology.skeletal",
    terms: skeletalSystemVocab,
  },
];
const vocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [MEDICINE_CURRICULUM],
  registrations,
  accent: "teal",
});
const rootScope = vocabularyScopes.find(
  (scope) => scope.path === MEDICINE_CURRICULUM.href
);
assert.ok(rootScope);
assert.deepEqual(
  rootScope.groups.map((group) => group.id),
  [MEDICINE_CURRICULUM.id, ...MEDICINE_DIRECT_BRANCH_IDS]
);
assert.equal(rootScope.groups.flatMap((group) => group.terms).length, 39);
const anatomyScope = vocabularyScopes.find(
  (scope) => scope.path === "/applied-science/medicine/anatomy-physiology"
);
assert.ok(anatomyScope);
assert.equal(anatomyScope.groups.flatMap((group) => group.terms).length, 13);
for (const [index, child] of (MEDICINE_CURRICULUM.children ?? [])
  .slice(1)
  .entries()) {
  const branchScope = vocabularyScopes.find(
    (scope) => scope.path === child.href
  );
  assert.ok(branchScope);
  assert.equal(branchScope.groups[0].terms.length, branchGroups[index].length);
}

console.log("Medicine model tests passed.");
