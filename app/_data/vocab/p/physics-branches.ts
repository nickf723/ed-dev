import type { VocabTerm } from "../types";

export const physicsMechanicsVocab: VocabTerm[] = [
  {
    id: "physics-force",
    word: "Force",
    definition:
      "A vector representation of an interaction that can change a system's momentum; a force belongs to an interacting pair, not to an isolated object.",
    domain: "Mechanics",
    tags: ["Interaction", "Vector"],
    relatedTerms: ["physics-momentum", "physics-interaction"],
    isAdult: false,
  },
  {
    id: "physics-momentum",
    word: "Momentum",
    definition:
      "A vector quantity equal to mass times velocity in classical mechanics and conserved for an isolated system.",
    domain: "Mechanics",
    tags: ["Motion", "Conservation"],
    relatedTerms: ["physics-force", "phys-velocity"],
    isAdult: false,
  },
];

export const physicsMotionVocab: VocabTerm[] = [
  {
    id: "phys-position",
    word: "Position",
    definition:
      "An object's location relative to a chosen origin and coordinate system.",
    domain: "Motion",
    tags: ["Reference Frame", "Kinematics"],
    relatedTerms: ["phys-displacement", "phys-velocity"],
    isAdult: false,
  },
  {
    id: "phys-displacement",
    word: "Displacement",
    definition:
      "The vector change from an object's initial position to its final position; it depends on the endpoints rather than the path length.",
    domain: "Motion",
    tags: ["Vector", "Kinematics"],
    relatedTerms: ["phys-position", "phys-velocity"],
    isAdult: false,
  },
  {
    id: "phys-velocity",
    word: "Velocity",
    definition:
      "The rate at which position changes with time, including direction as well as magnitude.",
    domain: "Motion",
    tags: ["Rate", "Vector"],
    relatedTerms: ["phys-speed", "phys-acceleration"],
    isAdult: false,
  },
  {
    id: "phys-acceleration",
    word: "Acceleration",
    definition:
      "The rate at which velocity changes with time; it may change speed, direction, or both.",
    domain: "Motion",
    tags: ["Rate", "Vector"],
    relatedTerms: ["phys-velocity", "physics-force"],
    isAdult: false,
  },
  {
    id: "phys-speed",
    word: "Speed",
    definition:
      "The nonnegative magnitude of velocity, describing how fast motion occurs without specifying direction.",
    domain: "Motion",
    tags: ["Rate", "Scalar"],
    relatedTerms: ["phys-velocity", "phys-displacement"],
    isAdult: false,
  },
];

export const physicsKinematicsVocab: VocabTerm[] = [
  {
    id: "phys-kinematics",
    word: "Kinematics",
    definition:
      "The description of motion through position, displacement, velocity, acceleration, and time without first specifying the interactions that cause it.",
    domain: "Kinematics",
    tags: ["Mechanics", "Motion"],
    relatedTerms: ["phys-position", "phys-acceleration"],
    isAdult: false,
  },
];

export const physicsThermodynamicsVocab: VocabTerm[] = [
  {
    id: "phys-entropy",
    word: "Entropy",
    definition:
      "A thermodynamic state function connected to the multiplicity of microscopic states and the direction of spontaneous processes; total entropy does not decrease for an isolated system.",
    domain: "Thermodynamics",
    tags: ["State Function", "Second Law"],
    relatedTerms: ["physics-internal-energy", "physics-system-boundary"],
    isAdult: false,
  },
  {
    id: "physics-internal-energy",
    word: "Internal Energy",
    definition:
      "The energy associated with the microscopic degrees of freedom included inside a thermodynamic system, excluding bulk kinetic and external potential energies by convention.",
    domain: "Thermodynamics",
    tags: ["State Function", "Energy"],
    relatedTerms: ["phys-entropy", "physics-energy"],
    isAdult: false,
  },
];

export const physicsElectromagnetismVocab: VocabTerm[] = [
  {
    id: "physics-electric-field",
    word: "Electric Field",
    definition:
      "A vector field that assigns the electric force per unit positive test charge at each point in space and time.",
    domain: "Electromagnetism",
    tags: ["Field", "Charge"],
    relatedTerms: ["physics-electromagnetic-induction", "physics-field"],
    isAdult: false,
  },
  {
    id: "physics-electromagnetic-induction",
    word: "Electromagnetic Induction",
    definition:
      "The production of an electromotive effect by changing magnetic flux, described by Faraday's law with direction encoded by Lenz's law.",
    domain: "Electromagnetism",
    tags: ["Magnetism", "Change"],
    relatedTerms: ["physics-electric-field", "physics-energy"],
    isAdult: false,
  },
];

export const physicsWavesVocab: VocabTerm[] = [
  {
    id: "physics-wavelength",
    word: "Wavelength",
    definition:
      "The spatial period of a wave: the distance between points in the same phase on successive cycles.",
    domain: "Waves & Optics",
    tags: ["Wave", "Periodicity"],
    relatedTerms: ["physics-superposition"],
    isAdult: false,
  },
  {
    id: "physics-superposition",
    word: "Superposition",
    definition:
      "The principle that overlapping solutions of a linear wave equation add to form the resulting displacement or field.",
    domain: "Waves & Optics",
    tags: ["Wave", "Interference"],
    relatedTerms: ["physics-wavelength"],
    isAdult: false,
  },
];

export const physicsRelativityVocab: VocabTerm[] = [
  {
    id: "physics-spacetime-interval",
    word: "Spacetime Interval",
    definition:
      "An invariant combination of spatial and temporal separation between events that all inertial observers agree on even when their coordinates differ.",
    domain: "Relativity",
    tags: ["Spacetime", "Invariant"],
    relatedTerms: ["physics-proper-time"],
    isAdult: false,
  },
  {
    id: "physics-proper-time",
    word: "Proper Time",
    definition:
      "The time accumulated by a clock along its own path through spacetime between two events.",
    domain: "Relativity",
    tags: ["Time", "Worldline"],
    relatedTerms: ["physics-spacetime-interval"],
    isAdult: false,
  },
];

export const physicsQuantumVocab: VocabTerm[] = [
  {
    id: "physics-probability-amplitude",
    word: "Probability Amplitude",
    definition:
      "A generally complex-valued quantity whose alternatives can interfere and whose squared magnitude contributes to a measurement probability.",
    domain: "Quantum Physics",
    tags: ["State", "Probability"],
    relatedTerms: ["phys-entanglement"],
    isAdult: false,
  },
  {
    id: "phys-entanglement",
    word: "Quantum Entanglement",
    definition:
      "A relationship in which the joint quantum state of multiple systems cannot be represented as independent states for each system.",
    domain: "Quantum Physics",
    tags: ["Composite State", "Correlation"],
    relatedTerms: ["physics-probability-amplitude"],
    isAdult: false,
  },
];

export const physicsAtomicVocab: VocabTerm[] = [
  {
    id: "physics-atomic-energy-level",
    word: "Atomic Energy Level",
    definition:
      "An allowed energy eigenvalue for an atom or ion under a specified model and set of conditions.",
    domain: "Atomic Physics",
    tags: ["Atom", "Quantization"],
    relatedTerms: ["physics-spectral-line"],
    isAdult: false,
  },
  {
    id: "physics-spectral-line",
    word: "Spectral Line",
    definition:
      "A localized feature in a spectrum associated with emission, absorption, or scattering at a particular transition energy, frequency, or wavelength.",
    domain: "Atomic Physics",
    tags: ["Spectrum", "Transition"],
    relatedTerms: ["physics-atomic-energy-level", "physics-wavelength"],
    isAdult: false,
  },
];

export const physicsNuclearVocab: VocabTerm[] = [
  {
    id: "physics-nuclide",
    word: "Nuclide",
    definition:
      "A class of atomic nuclei specified by proton number, neutron number, and nuclear energy state.",
    domain: "Nuclear Physics",
    tags: ["Nucleus", "Isotope"],
    relatedTerms: ["physics-nuclear-binding-energy"],
    isAdult: false,
  },
  {
    id: "physics-nuclear-binding-energy",
    word: "Nuclear Binding Energy",
    definition:
      "The energy required to separate a nucleus into its constituent nucleons, equal to the mass defect times the speed of light squared.",
    domain: "Nuclear Physics",
    tags: ["Nucleus", "Energy"],
    relatedTerms: ["physics-nuclide", "physics-energy"],
    isAdult: false,
  },
];

export const physicsBranchVocab = [
  ...physicsMechanicsVocab,
  ...physicsMotionVocab,
  ...physicsKinematicsVocab,
  ...physicsThermodynamicsVocab,
  ...physicsElectromagnetismVocab,
  ...physicsWavesVocab,
  ...physicsRelativityVocab,
  ...physicsQuantumVocab,
  ...physicsAtomicVocab,
  ...physicsNuclearVocab,
];
