export const CHEMISTRY_BRANCH_IDS = [
  "natural.chemistry.general",
  "natural.chemistry.organic",
  "natural.chemistry.inorganic",
  "natural.chemistry.physical",
  "natural.chemistry.analytical",
  "natural.chemistry.biochemistry",
  "natural.chemistry.quantum",
] as const;

export type MethaneReactionCoefficients = {
  methane: number;
  oxygen: number;
  carbonDioxide: number;
  water: number;
};

export const DEFAULT_METHANE_COEFFICIENTS: MethaneReactionCoefficients = {
  methane: 1,
  oxygen: 1,
  carbonDioxide: 1,
  water: 1,
};

export const BALANCED_METHANE_COEFFICIENTS: MethaneReactionCoefficients = {
  methane: 1,
  oxygen: 2,
  carbonDioxide: 1,
  water: 2,
};

export type AtomCounts = Record<"C" | "H" | "O", number>;

export function getMethaneReactionLedger(
  coefficients: MethaneReactionCoefficients
): { reactants: AtomCounts; products: AtomCounts } {
  return {
    reactants: {
      C: coefficients.methane,
      H: coefficients.methane * 4,
      O: coefficients.oxygen * 2,
    },
    products: {
      C: coefficients.carbonDioxide,
      H: coefficients.water * 2,
      O: coefficients.carbonDioxide * 2 + coefficients.water,
    },
  };
}

export function isMethaneReactionBalanced(
  coefficients: MethaneReactionCoefficients
): boolean {
  const { reactants, products } = getMethaneReactionLedger(coefficients);
  return (Object.keys(reactants) as Array<keyof AtomCounts>).every(
    (element) => reactants[element] === products[element]
  );
}

export type MoleculeAtom = {
  element: string;
  x: number;
  y: number;
  z: number;
  radius: number;
  color: string;
};

export type ChemistryMolecule = {
  id: string;
  name: string;
  formula: string;
  geometry: string;
  polarity: string;
  description: string;
  atoms: readonly MoleculeAtom[];
  bonds: readonly (readonly [number, number])[];
};

export const CHEMISTRY_MOLECULES = [
  {
    id: "h2o",
    name: "Water",
    formula: "H₂O",
    geometry: "Bent",
    polarity: "Polar",
    description:
      "Two O–H bond dipoles point in different directions, so their vectors do not cancel in the bent molecular geometry.",
    atoms: [
      { element: "O", x: 0, y: -8, z: 0, radius: 22, color: "#ef4444" },
      { element: "H", x: -34, y: 30, z: 0, radius: 13, color: "#f8fafc" },
      { element: "H", x: 34, y: 30, z: 0, radius: 13, color: "#f8fafc" },
    ],
    bonds: [
      [0, 1],
      [0, 2],
    ],
  },
  {
    id: "ch4",
    name: "Methane",
    formula: "CH₄",
    geometry: "Tetrahedral",
    polarity: "Nonpolar",
    description:
      "Four equivalent C–H bonds point toward tetrahedral directions, so their bond-dipole vectors cancel in this symmetric molecule.",
    atoms: [
      { element: "C", x: 0, y: 0, z: 0, radius: 22, color: "#64748b" },
      { element: "H", x: 0, y: -48, z: 0, radius: 13, color: "#f8fafc" },
      { element: "H", x: -42, y: 19, z: -28, radius: 13, color: "#f8fafc" },
      { element: "H", x: 42, y: 19, z: -28, radius: 13, color: "#f8fafc" },
      { element: "H", x: 0, y: 20, z: 48, radius: 13, color: "#f8fafc" },
    ],
    bonds: [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
    ],
  },
  {
    id: "co2",
    name: "Carbon dioxide",
    formula: "CO₂",
    geometry: "Linear",
    polarity: "Nonpolar overall",
    description:
      "Each C=O bond is polar, but the equal bond-dipole vectors point in opposite directions and cancel in the linear molecule.",
    atoms: [
      { element: "C", x: 0, y: 0, z: 0, radius: 21, color: "#64748b" },
      { element: "O", x: -58, y: 0, z: 0, radius: 19, color: "#ef4444" },
      { element: "O", x: 58, y: 0, z: 0, radius: 19, color: "#ef4444" },
    ],
    bonds: [
      [0, 1],
      [0, 2],
    ],
  },
  {
    id: "nh3",
    name: "Ammonia",
    formula: "NH₃",
    geometry: "Trigonal pyramidal",
    polarity: "Polar",
    description:
      "A lone pair changes the electron-domain arrangement around nitrogen and leaves a net molecular dipole.",
    atoms: [
      { element: "N", x: 0, y: -14, z: 0, radius: 22, color: "#3b82f6" },
      { element: "H", x: -38, y: 28, z: -22, radius: 13, color: "#f8fafc" },
      { element: "H", x: 38, y: 28, z: -22, radius: 13, color: "#f8fafc" },
      { element: "H", x: 0, y: 29, z: 42, radius: 13, color: "#f8fafc" },
    ],
    bonds: [
      [0, 1],
      [0, 2],
      [0, 3],
    ],
  },
  {
    id: "c2h4",
    name: "Ethene",
    formula: "C₂H₄",
    geometry: "Planar around each carbon",
    polarity: "Nonpolar overall",
    description:
      "The carbon–carbon double bond restricts rotation, and the atoms around each carbon lie in a common plane in this model.",
    atoms: [
      { element: "C", x: -24, y: 0, z: 0, radius: 21, color: "#64748b" },
      { element: "C", x: 24, y: 0, z: 0, radius: 21, color: "#64748b" },
      { element: "H", x: -58, y: -35, z: 0, radius: 13, color: "#f8fafc" },
      { element: "H", x: -58, y: 35, z: 0, radius: 13, color: "#f8fafc" },
      { element: "H", x: 58, y: -35, z: 0, radius: 13, color: "#f8fafc" },
      { element: "H", x: 58, y: 35, z: 0, radius: 13, color: "#f8fafc" },
    ],
    bonds: [
      [0, 1],
      [0, 2],
      [0, 3],
      [1, 4],
      [1, 5],
    ],
  },
] as const satisfies readonly ChemistryMolecule[];

export type ChemistryMoleculeId = (typeof CHEMISTRY_MOLECULES)[number]["id"];

export function getChemistryMolecule(id: string): ChemistryMolecule {
  return (
    CHEMISTRY_MOLECULES.find((molecule) => molecule.id === id) ??
    CHEMISTRY_MOLECULES[0]
  );
}

export type ProjectedMoleculeAtom = MoleculeAtom & {
  screenX: number;
  screenY: number;
  screenRadius: number;
};

export function projectMolecule(
  moleculeId: string,
  quarterTurn: number
): ProjectedMoleculeAtom[] {
  const molecule = getChemistryMolecule(moleculeId);
  const angleY = (((quarterTurn % 4) + 4) % 4) * (Math.PI / 2) + 0.42;
  const angleX = -0.24;

  return molecule.atoms.map((atom) => {
    const x = atom.x * Math.cos(angleY) - atom.z * Math.sin(angleY);
    let z = atom.z * Math.cos(angleY) + atom.x * Math.sin(angleY);
    const y = atom.y * Math.cos(angleX) - z * Math.sin(angleX);
    z = z * Math.cos(angleX) + atom.y * Math.sin(angleX);
    const depth = 520 / (520 + z);

    return {
      ...atom,
      x,
      y,
      z,
      screenX: 310 + x * depth * 1.7,
      screenY: 158 + y * depth * 1.7,
      screenRadius: atom.radius * depth * 1.7,
    };
  });
}

export const CHEMISTRY_EVIDENCE_CASES = [
  {
    id: "conservation",
    label: "Balance without changing identity",
    eyebrow: "Practice 01 · exact coefficients",
    evidence:
      "Methane combustion is written CH₄ + O₂ → CO₂ + H₂O. Coefficients may change; molecular subscripts may not.",
    prompt: "Which smallest whole-number coefficients conserve C, H, and O?",
    visual: "balance",
    options: [
      { id: "one-two-one-two", label: "1 CH₄ + 2 O₂ → 1 CO₂ + 2 H₂O" },
      { id: "two-one-two-one", label: "2 CH₄ + 1 O₂ → 2 CO₂ + 1 H₂O" },
      { id: "change-subscript", label: "CH₂ + O₂ → CO₂ + H₂O" },
    ],
    correctOptionId: "one-two-one-two",
    success:
      "Correct. Both sides contain 1 carbon, 4 hydrogen, and 4 oxygen atoms. Coefficients count whole formulas; changing a subscript would name a different chemical species.",
    correction:
      "Count each element on both sides. Use coefficients 1, 2, 1, 2 so C = 1, H = 4, and O = 4 without rewriting any molecular formula.",
  },
  {
    id: "isotope-identity",
    label: "Keep elemental identity fixed",
    eyebrow: "Practice 02 · particles and notation",
    evidence:
      "Carbon-12 has 6 protons and 6 neutrons. Carbon-14 has 6 protons and 8 neutrons. Neutral atoms of both have 6 electrons.",
    prompt: "Why are both nuclides carbon?",
    visual: "isotopes",
    options: [
      {
        id: "same-protons",
        label:
          "Atomic number—and therefore elemental identity—is fixed by the shared 6 protons.",
      },
      {
        id: "same-neutrons",
        label: "They are the same element because their neutron counts match.",
      },
      {
        id: "mass-is-identity",
        label:
          "Elemental identity is fixed by mass number, so they are different elements.",
      },
    ],
    correctOptionId: "same-protons",
    success:
      "Exactly. Proton count fixes atomic number and element identity. Different neutron counts create isotopes and change mass number without changing the element.",
    correction:
      "Compare proton count before mass number. Six protons means atomic number 6, carbon; the neutron difference distinguishes the isotopes.",
  },
  {
    id: "geometry-polarity",
    label: "Reason from vectors and shape",
    eyebrow: "Practice 03 · structure to property",
    evidence:
      "A CO₂ molecule has two polar C=O bonds of equal strength arranged 180° apart. A water molecule has two polar O–H bonds in a bent arrangement.",
    prompt: "Which molecular-polarity conclusion follows from the model?",
    visual: "dipoles",
    options: [
      {
        id: "co2-cancels-water-does-not",
        label:
          "CO₂'s opposing bond-dipole vectors cancel; water's bent vectors leave a net dipole.",
      },
      {
        id: "all-polar-bonds",
        label: "Any molecule containing a polar bond must be polar overall.",
      },
      {
        id: "geometry-irrelevant",
        label:
          "Only formula matters; three-dimensional arrangement cannot affect polarity.",
      },
    ],
    correctOptionId: "co2-cancels-water-does-not",
    success:
      "Right. Bond polarity and molecular polarity are different levels of description. Molecular geometry determines how the bond-dipole vectors combine.",
    correction:
      "Treat each bond dipole as a vector. Equal opposite vectors cancel in linear CO₂, while the bent O–H vectors do not cancel in water.",
  },
  {
    id: "unknown-safety",
    label: "Respect the unknown sample",
    eyebrow: "Practice 04 · evidence and safety",
    evidence:
      "An unlabeled clear liquid is found on a teaching-laboratory bench. Its appearance alone does not identify composition, concentration, hazards, or disposal route.",
    prompt: "What is the defensible next action?",
    visual: "unknown",
    options: [
      {
        id: "isolate-report-protocol",
        label:
          "Do not handle or test it casually; isolate the area and follow the laboratory's reporting and unknown-chemical procedure.",
      },
      {
        id: "smell",
        label:
          "Smell the liquid directly because clear liquids are usually dilute and safe.",
      },
      {
        id: "drain",
        label:
          "Pour it down the drain to remove the uncertainty from the workspace.",
      },
    ],
    correctOptionId: "isolate-report-protocol",
    success:
      "Correct. Appearance is not an identification method or risk assessment. Trained personnel, local procedures, labeling records, and appropriate controls must govern unknown chemicals.",
    correction:
      "Do not infer safety from appearance and do not improvise exposure or disposal. Preserve distance, report the unknown, and use the institution's chemical-hygiene procedure.",
  },
] as const;

export type ChemistryEvidenceCaseId =
  (typeof CHEMISTRY_EVIDENCE_CASES)[number]["id"];

export function isChemistryEvidenceAnswerCorrect(
  caseId: string,
  optionId: string
): boolean {
  const evidenceCase = CHEMISTRY_EVIDENCE_CASES.find(
    (item) => item.id === caseId
  );
  return evidenceCase?.correctOptionId === optionId;
}
