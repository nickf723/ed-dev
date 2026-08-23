import assert from "node:assert/strict";
import {
  ELEMENT_ORDER,
  MOLECULES,
  formulaParts,
  matchingMolecules,
} from "../app/classroom/_components/lessons/elements-of-life-model.ts";
import {
  COMPARISON_CLAIMS,
  COMPARISON_EMPIRES,
  COMPARISON_LENSES,
  COMPARISON_SUMMARIES,
} from "../app/classroom/_components/lessons/ottoman-mughal-model.ts";

assert.deepEqual(ELEMENT_ORDER, ["C", "H", "O", "N", "P", "S"]);
assert.deepEqual(
  MOLECULES.map(({ id, formula }) => [id, formula]),
  [
    ["glucose", "C6H12O6"],
    ["palmitic-acid", "C16H32O2"],
    ["cysteine", "C3H7NO2S"],
    ["amp", "C10H14N5O7P"],
  ]
);

for (const molecule of MOLECULES) {
  assert.equal(
    formulaParts(molecule).reduce((total, part) => total + part.count, 0),
    Object.values(molecule.counts).reduce(
      (total, count) => total + (count ?? 0),
      0
    ),
    `${molecule.name} should preserve every atom count in its scanner`
  );
}

assert.deepEqual(
  matchingMolecules([]).map((molecule) => molecule.id),
  ["glucose", "palmitic-acid", "cysteine", "amp"]
);
assert.deepEqual(
  matchingMolecules(["S"]).map((molecule) => molecule.id),
  ["cysteine"]
);
assert.deepEqual(
  matchingMolecules(["P"]).map((molecule) => molecule.id),
  ["amp"]
);
assert.deepEqual(matchingMolecules(["P", "S"]), []);
assert.deepEqual(
  matchingMolecules(["C", "H", "O"]).map((molecule) => molecule.id),
  ["glucose", "palmitic-acid", "cysteine", "amp"]
);

assert.deepEqual(
  COMPARISON_LENSES.map((lens) => lens.id),
  ["government", "geography", "exchange", "change"]
);
assert.deepEqual(Object.keys(COMPARISON_EMPIRES), ["ottoman", "mughal"]);

for (const empire of Object.values(COMPARISON_EMPIRES)) {
  assert.deepEqual(Object.keys(empire.evidence), [
    "government",
    "geography",
    "exchange",
    "change",
  ]);
}

assert.deepEqual(Object.keys(COMPARISON_SUMMARIES), [
  "government",
  "geography",
  "exchange",
  "change",
]);
assert.deepEqual(
  COMPARISON_CLAIMS.map((claim) => claim.verdict),
  ["supported", "overgeneralized", "not-shown", "supported"]
);
assert.equal(
  COMPARISON_CLAIMS.some((claim) => claim.id === "map-control"),
  true,
  "The workshop should explicitly test the map/control boundary"
);

console.log("Classroom Unit 1 model tests passed.");
