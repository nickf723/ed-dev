import assert from "node:assert/strict";
import { buildCurriculumVocabularyScopes } from "../app/_data/vocab/aggregate.mjs";
import { chemistryVocab } from "../app/_data/vocab/c/chemistry.ts";
import {
  BALANCED_METHANE_COEFFICIENTS,
  CHEMISTRY_BRANCH_IDS,
  CHEMISTRY_EVIDENCE_CASES,
  CHEMISTRY_MOLECULES,
  DEFAULT_METHANE_COEFFICIENTS,
  getChemistryMolecule,
  getMethaneReactionLedger,
  isChemistryEvidenceAnswerCorrect,
  isMethaneReactionBalanced,
  projectMolecule,
} from "../app/natural-science/chemistry/chemistryModel.ts";
import { CHEMISTRY_CURRICULUM } from "../lib/curriculum/natural/chemistry/index.ts";

assert.deepEqual(
  CHEMISTRY_CURRICULUM.children?.map((child) => child.id),
  [...CHEMISTRY_BRANCH_IDS]
);
assert.equal(CHEMISTRY_BRANCH_IDS.length, 7);
assert.equal(new Set(CHEMISTRY_BRANCH_IDS).size, 7);

assert.deepEqual(getMethaneReactionLedger(DEFAULT_METHANE_COEFFICIENTS), {
  reactants: { C: 1, H: 4, O: 2 },
  products: { C: 1, H: 2, O: 3 },
});
assert.deepEqual(getMethaneReactionLedger(BALANCED_METHANE_COEFFICIENTS), {
  reactants: { C: 1, H: 4, O: 4 },
  products: { C: 1, H: 4, O: 4 },
});
assert.equal(isMethaneReactionBalanced(DEFAULT_METHANE_COEFFICIENTS), false);
assert.equal(isMethaneReactionBalanced(BALANCED_METHANE_COEFFICIENTS), true);
assert.equal(
  isMethaneReactionBalanced({
    methane: 2,
    oxygen: 4,
    carbonDioxide: 2,
    water: 4,
  }),
  true
);
assert.equal(
  isMethaneReactionBalanced({
    methane: 1,
    oxygen: 2,
    carbonDioxide: 1,
    water: 1,
  }),
  false
);

assert.equal(CHEMISTRY_MOLECULES.length, 5);
assert.equal(
  new Set(CHEMISTRY_MOLECULES.map((molecule) => molecule.id)).size,
  5
);
assert.equal(getChemistryMolecule("co2").geometry, "Linear");
assert.equal(getChemistryMolecule("missing").id, "h2o");

for (const molecule of CHEMISTRY_MOLECULES) {
  const projection = projectMolecule(molecule.id, 0);
  assert.equal(projection.length, molecule.atoms.length);
  assert.deepEqual(projection, projectMolecule(molecule.id, 0));
  assert.deepEqual(projection, projectMolecule(molecule.id, 4));
  for (const atom of projection) {
    assert.equal(Number.isFinite(atom.screenX), true);
    assert.equal(Number.isFinite(atom.screenY), true);
    assert.ok(atom.screenRadius > 0);
  }
}

for (const evidenceCase of CHEMISTRY_EVIDENCE_CASES) {
  assert.equal(evidenceCase.options.length, 3);
  assert.ok(
    evidenceCase.options.some(
      (option) => option.id === evidenceCase.correctOptionId
    )
  );
  for (const option of evidenceCase.options) {
    assert.equal(
      isChemistryEvidenceAnswerCorrect(evidenceCase.id, option.id),
      option.id === evidenceCase.correctOptionId
    );
  }
}
assert.equal(isChemistryEvidenceAnswerCorrect("missing", "missing"), false);

assert.equal(chemistryVocab.length, 20);
assert.equal(new Set(chemistryVocab.map((term) => term.id)).size, 20);

const vocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [CHEMISTRY_CURRICULUM],
  registrations: [
    {
      nodeId: CHEMISTRY_CURRICULUM.id,
      terms: chemistryVocab,
    },
  ],
  accent: "emerald",
});
const chemistryScope = vocabularyScopes.find(
  (scope) => scope.path === CHEMISTRY_CURRICULUM.href
);
assert.ok(chemistryScope);
assert.deepEqual(
  chemistryScope.groups.map((group) => group.id),
  [CHEMISTRY_CURRICULUM.id]
);
assert.equal(chemistryScope.groups[0].terms.length, 20);
assert.equal(chemistryScope.groups[0].sourceNodeId, CHEMISTRY_CURRICULUM.id);
assert.equal(chemistryScope.groups[0].sourcePath, CHEMISTRY_CURRICULUM.href);

console.log("Chemistry model tests passed.");
