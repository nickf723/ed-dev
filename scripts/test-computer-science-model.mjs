import assert from "node:assert/strict";
import { buildCurriculumVocabularyScopes } from "../app/_data/vocab/aggregate.mjs";
import { computerScienceVocab } from "../app/_data/vocab/c/computer-science.ts";
import {
  artificialIntelligenceComputerScienceVocab,
  computationTheoryComputerScienceVocab,
  computerAlgorithmsVocab,
  computerHardwareVocab,
  computerScienceBranchVocab,
  computerSecurityVocab,
  computerSoftwareVocab,
} from "../app/_data/vocab/c/computer-science-branches.ts";
import {
  COMPUTER_SCIENCE_DIRECT_BRANCH_IDS,
  COMPUTER_SCIENCE_EVIDENCE_CASES,
  calculateBitPatterns,
  isComputerScienceEvidenceAnswerCorrect,
} from "../app/formal-science/computer-science/computerScienceModel.ts";
import { COMPUTER_SCIENCE_CURRICULUM } from "../lib/curriculum/computer-science.ts";

assert.deepEqual(
  COMPUTER_SCIENCE_CURRICULUM.children?.map((child) => child.id),
  COMPUTER_SCIENCE_DIRECT_BRANCH_IDS
);
assert.equal(COMPUTER_SCIENCE_DIRECT_BRANCH_IDS.length, 6);
assert.equal(new Set(COMPUTER_SCIENCE_DIRECT_BRANCH_IDS).size, 6);
assert.ok(
  COMPUTER_SCIENCE_CURRICULUM.children?.every(
    (child) => child.status === "active"
  )
);

assert.equal(calculateBitPatterns(0), 1);
assert.equal(calculateBitPatterns(1), 2);
assert.equal(calculateBitPatterns(8), 256);
assert.equal(calculateBitPatterns(16), 65_536);
assert.equal(calculateBitPatterns(52), 4_503_599_627_370_496);
assert.equal(calculateBitPatterns(-1), 0);
assert.equal(calculateBitPatterns(1.5), 0);
assert.equal(calculateBitPatterns(53), 0);
assert.equal(calculateBitPatterns(Number.NaN), 0);

assert.equal(COMPUTER_SCIENCE_EVIDENCE_CASES.length, 4);
for (const evidenceCase of COMPUTER_SCIENCE_EVIDENCE_CASES) {
  assert.equal(evidenceCase.options.length, 3);
  assert.ok(
    evidenceCase.options.some(
      (option) => option.id === evidenceCase.correctOptionId
    )
  );
  for (const option of evidenceCase.options) {
    assert.equal(
      isComputerScienceEvidenceAnswerCorrect(evidenceCase.id, option.id),
      option.id === evidenceCase.correctOptionId
    );
  }
}
assert.equal(
  isComputerScienceEvidenceAnswerCorrect("missing", "missing"),
  false
);

const branchGroups = [
  computerHardwareVocab,
  computerSoftwareVocab,
  computerAlgorithmsVocab,
  artificialIntelligenceComputerScienceVocab,
  computationTheoryComputerScienceVocab,
  computerSecurityVocab,
];
assert.equal(computerScienceVocab.length, 6);
assert.deepEqual(
  branchGroups.map((group) => group.length),
  [2, 2, 2, 2, 2, 2]
);
assert.equal(computerScienceBranchVocab.length, 12);
const allTerms = [...computerScienceVocab, ...computerScienceBranchVocab];
assert.equal(allTerms.length, 18);
assert.equal(new Set(allTerms.map((term) => term.id)).size, 18);
for (const stableId of [
  "cs-polymorphism",
  "cs-recursion",
  "cs-pointer",
  "cs-latency",
]) {
  assert.equal(allTerms.filter((term) => term.id === stableId).length, 1);
}

const vocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [COMPUTER_SCIENCE_CURRICULUM],
  registrations: [
    { nodeId: "formal.computer-science", terms: computerScienceVocab },
    {
      nodeId: "formal.computer-science.hardware",
      terms: computerHardwareVocab,
    },
    {
      nodeId: "formal.computer-science.software",
      terms: computerSoftwareVocab,
    },
    {
      nodeId: "formal.computer-science.algorithms",
      terms: computerAlgorithmsVocab,
    },
    {
      nodeId: "formal.computer-science.artificial-intelligence",
      terms: artificialIntelligenceComputerScienceVocab,
    },
    {
      nodeId: "formal.computer-science.theory",
      terms: computationTheoryComputerScienceVocab,
    },
    {
      nodeId: "formal.computer-science.security",
      terms: computerSecurityVocab,
    },
  ],
  accent: "cyan",
});
const rootScope = vocabularyScopes.find(
  (scope) => scope.path === COMPUTER_SCIENCE_CURRICULUM.href
);
assert.ok(rootScope);
assert.deepEqual(
  rootScope.groups.map((group) => group.id),
  [COMPUTER_SCIENCE_CURRICULUM.id, ...COMPUTER_SCIENCE_DIRECT_BRANCH_IDS]
);
assert.equal(rootScope.groups.flatMap((group) => group.terms).length, 18);
for (const child of COMPUTER_SCIENCE_CURRICULUM.children ?? []) {
  const branchScope = vocabularyScopes.find(
    (scope) => scope.path === child.href
  );
  assert.ok(branchScope);
  assert.equal(branchScope.groups[0].terms.length, 2);
}

console.log("Computer Science model tests passed.");
