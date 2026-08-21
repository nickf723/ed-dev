import assert from "node:assert/strict";
import { PHYSICS_CURRICULUM } from "../lib/curriculum/natural/physics/index.ts";
import { physicsVocab } from "../app/_data/vocab/p/physics.ts";
import {
  physicsAtomicVocab,
  physicsBranchVocab,
  physicsElectromagnetismVocab,
  physicsKinematicsVocab,
  physicsMechanicsVocab,
  physicsMotionVocab,
  physicsNuclearVocab,
  physicsQuantumVocab,
  physicsRelativityVocab,
  physicsThermodynamicsVocab,
  physicsWavesVocab,
} from "../app/_data/vocab/p/physics-branches.ts";
import { buildCurriculumVocabularyScopes } from "../app/_data/vocab/aggregate.mjs";
import {
  PHYSICS_DEFINING_CONSTANTS,
  PHYSICS_DIRECT_BRANCH_IDS,
  PHYSICS_EVIDENCE_CASES,
  PHYSICS_SCENARIOS,
  calculateMotionObservation,
  isPhysicsEvidenceAnswerCorrect,
} from "../app/natural-science/physics/physicsModel.ts";

assert.deepEqual(
  PHYSICS_CURRICULUM.children?.map((child) => child.id),
  PHYSICS_DIRECT_BRANCH_IDS
);
assert.equal(PHYSICS_DIRECT_BRANCH_IDS.length, 8);
assert.ok(
  PHYSICS_CURRICULUM.children?.every((child) => child.status === "active")
);

assert.equal(PHYSICS_SCENARIOS.length, 8);
assert.equal(new Set(PHYSICS_SCENARIOS.map((item) => item.id)).size, 8);
assert.deepEqual(
  new Set(PHYSICS_SCENARIOS.map((item) => item.primaryNodeId)),
  new Set(PHYSICS_DIRECT_BRANCH_IDS)
);
for (const scenario of PHYSICS_SCENARIOS) {
  assert.ok(PHYSICS_DIRECT_BRANCH_IDS.includes(scenario.primaryNodeId));
  assert.ok(
    scenario.companionNodeIds.every((id) =>
      PHYSICS_DIRECT_BRANCH_IDS.includes(id)
    )
  );
}

assert.deepEqual(calculateMotionObservation(-4, 8, 3), {
  displacementM: 12,
  distanceM: 12,
  averageVelocityMps: 4,
  averageSpeedMps: 4,
});
assert.deepEqual(calculateMotionObservation(8, -4, 3), {
  displacementM: -12,
  distanceM: 12,
  averageVelocityMps: -4,
  averageSpeedMps: 4,
});
assert.deepEqual(calculateMotionObservation(3, 3, 2), {
  displacementM: 0,
  distanceM: 0,
  averageVelocityMps: 0,
  averageSpeedMps: 0,
});
assert.throws(() => calculateMotionObservation(0, 2, 0));

assert.equal(PHYSICS_DEFINING_CONSTANTS.length, 4);
assert.deepEqual(
  PHYSICS_DEFINING_CONSTANTS.map((constant) => constant.value),
  [
    "299 792 458",
    "6.626 070 15 × 10⁻³⁴",
    "1.602 176 634 × 10⁻¹⁹",
    "1.380 649 × 10⁻²³",
  ]
);

const terms = [...physicsVocab, ...physicsBranchVocab];
assert.equal(physicsVocab.length, 13);
assert.equal(physicsBranchVocab.length, 22);
assert.equal(terms.length, 35);
assert.equal(new Set(terms.map((term) => term.id)).size, terms.length);
for (const stableId of [
  "phys-entropy",
  "phys-entanglement",
  "phys-kinematics",
  "phys-position",
  "phys-displacement",
  "phys-velocity",
  "phys-acceleration",
  "phys-speed",
]) {
  assert.ok(terms.some((term) => term.id === stableId));
}

const vocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [PHYSICS_CURRICULUM],
  registrations: [
    { nodeId: "natural.physics", terms: physicsVocab },
    { nodeId: "natural.physics.mechanics", terms: physicsMechanicsVocab },
    { nodeId: "natural.physics.mechanics.motion", terms: physicsMotionVocab },
    {
      nodeId: "natural.physics.mechanics.motion.kinematics",
      terms: physicsKinematicsVocab,
    },
    {
      nodeId: "natural.physics.thermodynamics",
      terms: physicsThermodynamicsVocab,
    },
    {
      nodeId: "natural.physics.electromagnetism",
      terms: physicsElectromagnetismVocab,
    },
    { nodeId: "natural.physics.waves-optics", terms: physicsWavesVocab },
    { nodeId: "natural.physics.relativity", terms: physicsRelativityVocab },
    {
      nodeId: "natural.physics.quantum-mechanics",
      terms: physicsQuantumVocab,
    },
    { nodeId: "natural.physics.atomic", terms: physicsAtomicVocab },
    { nodeId: "natural.physics.nuclear", terms: physicsNuclearVocab },
  ],
  accent: "sky",
});
const physicsScope = vocabularyScopes.find(
  (scope) => scope.path === "/natural-science/physics"
);
assert.deepEqual(
  physicsScope?.groups.map((group) => group.id),
  ["natural.physics", ...PHYSICS_DIRECT_BRANCH_IDS]
);
assert.equal(physicsScope?.groups.flatMap((group) => group.terms).length, 35);
assert.equal(
  vocabularyScopes
    .find((scope) => scope.path === "/natural-science/physics/mechanics")
    ?.groups.flatMap((group) => group.terms).length,
  8
);

assert.equal(PHYSICS_EVIDENCE_CASES.length, 4);
for (const evidenceCase of PHYSICS_EVIDENCE_CASES) {
  for (const option of evidenceCase.options) {
    assert.equal(
      isPhysicsEvidenceAnswerCorrect(evidenceCase.id, option.id),
      option.id === evidenceCase.correctOptionId
    );
  }
}
assert.equal(isPhysicsEvidenceAnswerCorrect("missing", "missing"), false);

console.log("Physics model tests passed.");
