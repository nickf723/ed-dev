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
import {
  ACCESS_FACTS,
  TELLINGS,
  accessCount,
  classifyVoice,
} from "../app/classroom/_components/lessons/narrator-perspective-model.ts";
import {
  breakBond,
  buildBond,
  getPolymerBenchState,
  maxBonds,
  waterForCompleteBuild,
  waterForHydrolysis,
} from "../app/classroom/_components/lessons/polymer-reactions-model.ts";
import {
  CENTRALIZATION_CASES,
  CENTRALIZATION_CLAIMS,
  CENTRALIZATION_LENSES,
} from "../app/classroom/_components/lessons/tokugawa-bourbon-model.ts";

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

assert.deepEqual(Object.keys(TELLINGS), ["mara", "limited", "outside"]);
assert.deepEqual(
  ACCESS_FACTS.map((fact) => fact.id),
  ["mara-plan", "theo-suspicion", "envelope-contents"]
);
assert.equal(classifyVoice("mara"), "first person");
assert.equal(classifyVoice("limited"), "third person");
assert.equal(accessCount("mara", "direct"), 1);
assert.equal(accessCount("outside", "direct"), 0);
assert.deepEqual(TELLINGS.mara.access, {
  "mara-plan": "direct",
  "theo-suspicion": "inferred",
  "envelope-contents": "withheld",
});
assert.deepEqual(TELLINGS.limited.access, {
  "mara-plan": "inferred",
  "theo-suspicion": "direct",
  "envelope-contents": "withheld",
});

assert.equal(maxBonds(1), 0);
assert.equal(maxBonds(5), 4);
assert.deepEqual(getPolymerBenchState(5, 0), {
  monomers: 5,
  bonds: 0,
  chains: 5,
  freeMonomers: 5,
  waterReleased: 0,
});
assert.deepEqual(getPolymerBenchState(5, 3), {
  monomers: 5,
  bonds: 3,
  chains: 2,
  freeMonomers: 1,
  waterReleased: 3,
});
assert.deepEqual(getPolymerBenchState(5, 99), {
  monomers: 5,
  bonds: 4,
  chains: 1,
  freeMonomers: 0,
  waterReleased: 4,
});
assert.equal(buildBond(getPolymerBenchState(4, 1)).bonds, 2);
assert.equal(breakBond(getPolymerBenchState(4, 1)).bonds, 0);
assert.equal(waterForCompleteBuild(6), 5);
assert.equal(waterForHydrolysis(2), 2);

assert.deepEqual(
  CENTRALIZATION_LENSES.map((lens) => lens.id),
  ["center", "elite-control", "administration", "limit"]
);
assert.deepEqual(Object.keys(CENTRALIZATION_CASES), ["tokugawa", "bourbon"]);
for (const historicalCase of Object.values(CENTRALIZATION_CASES)) {
  assert.deepEqual(Object.keys(historicalCase.evidence), [
    "center",
    "elite-control",
    "administration",
    "limit",
  ]);
}
assert.deepEqual(
  CENTRALIZATION_CLAIMS.map((claim) => claim.verdict),
  ["supported", "overgeneralized", "overgeneralized", "not-shown"]
);
assert.equal(
  CENTRALIZATION_CLAIMS.some((claim) => claim.id === "map-proof"),
  true,
  "The centralization workshop should preserve the map/administration boundary"
);

console.log("Classroom Unit 1 model tests passed.");
