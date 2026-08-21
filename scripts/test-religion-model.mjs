import assert from "node:assert/strict";
import { buildCurriculumVocabularyScopes } from "../app/_data/vocab/aggregate.mjs";
import { religionVocab } from "../app/_data/vocab/r/religion.ts";
import {
  religionBranchVocab,
  religionMaterialVocab,
  religionMethodsVocab,
  religionMythologyVocab,
  religionRitualVocab,
  religionSocietyVocab,
  religionTextsVocab,
  religionTheologyVocab,
  religionTraditionsVocab,
} from "../app/_data/vocab/r/religion-branches.ts";
import {
  RELIGION_DIRECT_BRANCH_IDS,
  RELIGION_EVIDENCE_CASES,
  calculateSourceShare,
  formatSourcePercent,
  isReligionEvidenceAnswerCorrect,
} from "../app/humanities/religion/religionModel.ts";
import { RELIGION_CURRICULUM } from "../lib/curriculum/humanities/religion.ts";

assert.deepEqual(
  RELIGION_CURRICULUM.children?.map((child) => child.id),
  RELIGION_DIRECT_BRANCH_IDS
);
assert.equal(RELIGION_DIRECT_BRANCH_IDS.length, 8);
assert.equal(new Set(RELIGION_DIRECT_BRANCH_IDS).size, 8);
assert.deepEqual(
  RELIGION_CURRICULUM.children?.map((child) => child.status),
  [
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    "active",
  ]
);

assert.equal(calculateSourceShare(9, 24), 37.5);
assert.equal(calculateSourceShare(1, 3), 33.3);
assert.equal(calculateSourceShare(40, 24), 100);
assert.equal(calculateSourceShare(-1, 24), 0);
assert.equal(calculateSourceShare(9, 0), 0);
assert.equal(calculateSourceShare(Number.NaN, 24), 0);
assert.equal(formatSourcePercent(37.5), "37.5%");
assert.equal(formatSourcePercent(100), "100%");

assert.equal(RELIGION_EVIDENCE_CASES.length, 4);
for (const evidenceCase of RELIGION_EVIDENCE_CASES) {
  assert.equal(evidenceCase.options.length, 3);
  assert.ok(
    evidenceCase.options.some(
      (option) => option.id === evidenceCase.correctOptionId
    )
  );
  for (const option of evidenceCase.options) {
    assert.equal(
      isReligionEvidenceAnswerCorrect(evidenceCase.id, option.id),
      option.id === evidenceCase.correctOptionId
    );
  }
}
assert.equal(isReligionEvidenceAnswerCorrect("missing", "missing"), false);

const branchGroups = [
  religionMethodsVocab,
  religionTraditionsVocab,
  religionTextsVocab,
  religionRitualVocab,
  religionMaterialVocab,
  religionSocietyVocab,
  religionTheologyVocab,
  religionMythologyVocab,
];
assert.equal(religionVocab.length, 10);
assert.deepEqual(
  branchGroups.map((group) => group.length),
  [2, 2, 2, 2, 2, 2, 2, 2]
);
assert.equal(religionBranchVocab.length, 16);
const allTerms = [...religionVocab, ...religionBranchVocab];
assert.equal(allTerms.length, 26);
assert.equal(new Set(allTerms.map((term) => term.id)).size, 26);
for (const stableId of ["rel-theodicy", "rel-syncretism", "rel-eschatology"]) {
  assert.equal(allTerms.filter((term) => term.id === stableId).length, 1);
}

const vocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [RELIGION_CURRICULUM],
  registrations: [
    { nodeId: "humanities.religion", terms: religionVocab },
    { nodeId: "humanities.religion.methods", terms: religionMethodsVocab },
    {
      nodeId: "humanities.religion.traditions",
      terms: religionTraditionsVocab,
    },
    {
      nodeId: "humanities.religion.texts-interpretation",
      terms: religionTextsVocab,
    },
    {
      nodeId: "humanities.religion.ritual-practice",
      terms: religionRitualVocab,
    },
    {
      nodeId: "humanities.religion.material-place",
      terms: religionMaterialVocab,
    },
    {
      nodeId: "humanities.religion.society-politics",
      terms: religionSocietyVocab,
    },
    {
      nodeId: "humanities.religion.theology-philosophy",
      terms: religionTheologyVocab,
    },
    { nodeId: "humanities.religion.mythology", terms: religionMythologyVocab },
  ],
  accent: "amber",
});
const rootScope = vocabularyScopes.find(
  (scope) => scope.path === RELIGION_CURRICULUM.href
);
assert.ok(rootScope);
assert.deepEqual(
  rootScope.groups.map((group) => group.id),
  [RELIGION_CURRICULUM.id, ...RELIGION_DIRECT_BRANCH_IDS]
);
assert.equal(rootScope.groups.flatMap((group) => group.terms).length, 26);
for (const child of RELIGION_CURRICULUM.children ?? []) {
  const branchScope = vocabularyScopes.find(
    (scope) => scope.path === child.href
  );
  assert.ok(branchScope);
  assert.equal(branchScope.groups[0].terms.length, 2);
}

console.log("Religion model tests passed.");
