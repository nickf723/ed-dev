import { physicsVocab } from "./p/physics";
import {
  physicsAtomicVocab,
  physicsElectromagnetismVocab,
  physicsKinematicsVocab,
  physicsMechanicsVocab,
  physicsMotionVocab,
  physicsNuclearVocab,
  physicsQuantumVocab,
  physicsRelativityVocab,
  physicsThermodynamicsVocab,
  physicsWavesVocab,
} from "./p/physics-branches";
import type { NodeVocabularyRegistration } from "./aggregate.mjs";

export const PHYSICS_VOCABULARY_REGISTRATIONS = [
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
] as const satisfies readonly NodeVocabularyRegistration[];
