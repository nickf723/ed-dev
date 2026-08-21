export const PHYSICS_DIRECT_BRANCH_IDS = [
  "natural.physics.mechanics",
  "natural.physics.thermodynamics",
  "natural.physics.electromagnetism",
  "natural.physics.waves-optics",
  "natural.physics.relativity",
  "natural.physics.quantum-mechanics",
  "natural.physics.atomic",
  "natural.physics.nuclear",
] as const;

export type PhysicsBranchId = (typeof PHYSICS_DIRECT_BRANCH_IDS)[number];

export type PhysicsScenario = {
  id: string;
  label: string;
  setting: string;
  primaryNodeId: PhysicsBranchId;
  companionNodeIds: readonly PhysicsBranchId[];
  observation: string;
  regimeCue: string;
  boundary: string;
};

export const PHYSICS_SCENARIOS: readonly PhysicsScenario[] = [
  {
    id: "ball-flight",
    label: "Ball in flight",
    setting: "A basketball leaves a player's hand and crosses the court.",
    primaryNodeId: "natural.physics.mechanics",
    companionNodeIds: [],
    observation:
      "Record position against time; infer velocity and acceleration.",
    regimeCue:
      "The ball is macroscopic, moves far below light speed, and experiences weak gravity.",
    boundary:
      "Choose whether the system includes the ball alone, Earth, and the surrounding air before assigning forces or energy transfers.",
  },
  {
    id: "heated-pan",
    label: "Induction cooktop",
    setting: "A changing current heats a ferromagnetic pan and its contents.",
    primaryNodeId: "natural.physics.electromagnetism",
    companionNodeIds: ["natural.physics.thermodynamics"],
    observation:
      "Measure current, voltage, field frequency, power, and temperature over time.",
    regimeCue:
      "Classical fields describe induction while thermodynamics tracks where energy goes.",
    boundary:
      "Separate electrical input, field-mediated transfer, pan heating, food heating, and losses to the room.",
  },
  {
    id: "concert-hall",
    label: "Concert hall",
    setting:
      "A tone reflects, interferes, and forms resonant patterns in a room.",
    primaryNodeId: "natural.physics.waves-optics",
    companionNodeIds: [],
    observation:
      "Measure frequency, wavelength, phase, amplitude, and sound level by position.",
    regimeCue:
      "A continuous wave model is effective at room scale and ordinary sound intensities.",
    boundary:
      "Specify the source, room geometry, reflecting materials, microphone response, and time window.",
  },
  {
    id: "steam-cylinder",
    label: "Gas in a cylinder",
    setting: "A confined gas is heated while it pushes a movable piston.",
    primaryNodeId: "natural.physics.thermodynamics",
    companionNodeIds: ["natural.physics.mechanics"],
    observation:
      "Measure pressure, volume, temperature, work, and energy crossing the wall.",
    regimeCue:
      "Microscopic collisions can be summarized by macroscopic state variables and a process path.",
    boundary:
      "State whether the gas, piston, heater, and environment lie inside or outside the system.",
  },
  {
    id: "gps-clock",
    label: "GPS clock",
    setting:
      "An orbiting clock distributes radio timing to receivers on Earth.",
    primaryNodeId: "natural.physics.relativity",
    companionNodeIds: ["natural.physics.electromagnetism"],
    observation:
      "Compare proper-time accumulation, orbital state, radio travel time, and receiver coordinates.",
    regimeCue:
      "Small special- and general-relativistic timing effects accumulate enough to matter for navigation.",
    boundary:
      "Name the reference frame, worldlines, gravitational environment, signal path, and synchronization convention.",
  },
  {
    id: "hydrogen-spectrum",
    label: "Hydrogen spectrum",
    setting:
      "Excited hydrogen emits discrete wavelengths rather than a continuous rainbow.",
    primaryNodeId: "natural.physics.atomic",
    companionNodeIds: [
      "natural.physics.quantum-mechanics",
      "natural.physics.waves-optics",
    ],
    observation:
      "Measure wavelength, line intensity, resolution, and the atom or ion state.",
    regimeCue:
      "Quantized atomic energy levels and photon transitions set the spectral lines.",
    boundary:
      "Retain species, ionization stage, environment, wavelength medium, calibration, resolution, and uncertainty.",
  },
  {
    id: "qubit",
    label: "Superconducting qubit",
    setting:
      "A fabricated circuit is controlled as a two-level quantum system.",
    primaryNodeId: "natural.physics.quantum-mechanics",
    companionNodeIds: ["natural.physics.electromagnetism"],
    observation:
      "Measure control frequency, state probabilities, coherence time, and readout error.",
    regimeCue:
      "Phase, amplitude, superposition, and measurement statistics are essential to the prediction.",
    boundary:
      "Include the device, control field, readout chain, thermal environment, and preparation procedure in the model contract.",
  },
  {
    id: "fission",
    label: "Fission event",
    setting:
      "A heavy nucleus divides and releases fragments, neutrons, and energy.",
    primaryNodeId: "natural.physics.nuclear",
    companionNodeIds: [
      "natural.physics.quantum-mechanics",
      "natural.physics.thermodynamics",
    ],
    observation:
      "Measure isotope, incident-particle energy, products, momentum, energy, and event probability.",
    regimeCue:
      "Changes to the nucleus require nuclear structure, quantum probabilities, and conservation bookkeeping.",
    boundary:
      "Distinguish one reaction event from a material, reactor, detector, or heat-transfer system built from many events.",
  },
] as const;

export type MotionObservation = {
  displacementM: number;
  distanceM: number;
  averageVelocityMps: number;
  averageSpeedMps: number;
};

export function calculateMotionObservation(
  startM: number,
  endM: number,
  durationS: number
): MotionObservation {
  if (!Number.isFinite(durationS) || durationS <= 0) {
    throw new Error("Duration must be greater than zero");
  }
  const displacementM = endM - startM;
  return {
    displacementM,
    distanceM: Math.abs(displacementM),
    averageVelocityMps: displacementM / durationS,
    averageSpeedMps: Math.abs(displacementM) / durationS,
  };
}

export const PHYSICS_DEFINING_CONSTANTS = [
  {
    id: "c",
    symbol: "c",
    name: "speed of light in vacuum",
    value: "299 792 458",
    unit: "m s⁻¹",
    connects: "space · time · relativity · electromagnetism",
  },
  {
    id: "h",
    symbol: "h",
    name: "Planck constant",
    value: "6.626 070 15 × 10⁻³⁴",
    unit: "J s",
    connects: "energy · frequency · quantum physics",
  },
  {
    id: "e",
    symbol: "e",
    name: "elementary charge",
    value: "1.602 176 634 × 10⁻¹⁹",
    unit: "C",
    connects: "charge · atoms · circuits · fields",
  },
  {
    id: "k",
    symbol: "k",
    name: "Boltzmann constant",
    value: "1.380 649 × 10⁻²³",
    unit: "J K⁻¹",
    connects: "temperature · energy · statistical physics",
  },
] as const;

export const PHYSICS_EVIDENCE_CASES = [
  {
    id: "velocity",
    prompt:
      "A cart moves from x = 2 m to x = 14 m in 3 s. What is its average velocity along the positive x-axis?",
    options: [
      { id: "four", label: "+4 m/s" },
      { id: "five", label: "+5.3 m/s" },
      { id: "negative", label: "−4 m/s" },
    ],
    correctOptionId: "four",
    success:
      "Correct. Displacement is 14 − 2 = +12 m, so average velocity is +12/3 = +4 m/s.",
    correction:
      "Use change in position, not final position: Δx = xfinal − xinitial, then divide by elapsed time and retain direction.",
  },
  {
    id: "units",
    prompt:
      "A pulse travels 2.4 km in 120 s. Which speed is expressed in coherent SI units?",
    options: [
      { id: "twenty", label: "20 m/s" },
      { id: "point-zero-two", label: "0.02 m/s" },
      { id: "twenty-km", label: "20 km/s" },
    ],
    correctOptionId: "twenty",
    success:
      "Correct. Convert 2.4 km to 2,400 m before dividing: 2,400/120 = 20 m/s.",
    correction:
      "Convert the distance into meters first. A correct number with an incorrect unit does not describe the same physical quantity.",
  },
  {
    id: "uncertainty",
    prompt:
      "A model predicts 9.75 m/s². A calibrated measurement reports 9.80 ± 0.10 m/s². What is supported?",
    options: [
      {
        id: "consistent",
        label:
          "The result is consistent with the prediction at the stated measurement uncertainty; that agreement does not uniquely prove the model.",
      },
      {
        id: "exact",
        label: "The prediction is false because 9.75 is not exactly 9.80.",
      },
      {
        id: "proved",
        label: "The measurement proves this is the only possible model.",
      },
    ],
    correctOptionId: "consistent",
    success:
      "Correct. The predicted value lies within the reported interval. Agreement constrains models but does not make one explanation logically unique.",
    correction:
      "Compare the prediction with the uncertainty interval, then keep consistency separate from proof or uniqueness.",
  },
  {
    id: "residual",
    prompt:
      "Repeated measurements differ from a prediction in the same direction. What should happen next?",
    options: [
      {
        id: "audit",
        label:
          "Audit calibration, units, system boundary, assumptions, uncontrolled variables, and the model's regime before revising the claim.",
      },
      {
        id: "erase",
        label:
          "Delete the discrepant observations because the equation is known.",
      },
      {
        id: "law-false",
        label: "Announce that every physical law in the field is false.",
      },
    ],
    correctOptionId: "audit",
    success:
      "Correct. A patterned residual is useful evidence, but locating its source requires checks of instrument, procedure, boundary, conditions, and model scope.",
    correction:
      "A discrepancy is a prompt for bounded diagnosis. Neither discarding data nor rejecting an entire field identifies the source of the residual.",
  },
] as const;

export function isPhysicsEvidenceAnswerCorrect(
  caseId: string,
  optionId: string
) {
  return (
    PHYSICS_EVIDENCE_CASES.find((item) => item.id === caseId)
      ?.correctOptionId === optionId
  );
}
