export type ElementId = "C" | "H" | "O" | "N" | "P" | "S";

export type ElementRecord = {
  id: ElementId;
  name: string;
  clue: string;
  color: string;
  surface: string;
};

export type MoleculeId = "glucose" | "palmitic-acid" | "cysteine" | "amp";

export type MoleculeRecord = {
  id: MoleculeId;
  name: string;
  family: string;
  formula: string;
  counts: Readonly<Partial<Record<ElementId, number>>>;
  structureClue: string;
  boundary: string;
};

export const ELEMENTS: readonly ElementRecord[] = [
  {
    id: "C",
    name: "Carbon",
    clue: "Forms versatile skeletons that can branch, ring, and chain.",
    color: "#86efac",
    surface: "border-green-200/25 bg-green-300/[0.10] text-green-50",
  },
  {
    id: "H",
    name: "Hydrogen",
    clue: "Completes many covalent bonds and participates in polar groups.",
    color: "#e2e8f0",
    surface: "border-slate-200/25 bg-slate-200/[0.08] text-slate-100",
  },
  {
    id: "O",
    name: "Oxygen",
    clue: "Creates polar regions in groups such as hydroxyl and carbonyl groups.",
    color: "#fca5a5",
    surface: "border-red-200/25 bg-red-300/[0.09] text-red-50",
  },
  {
    id: "N",
    name: "Nitrogen",
    clue: "Appears in amino groups and nitrogenous bases.",
    color: "#67e8f9",
    surface: "border-cyan-200/25 bg-cyan-300/[0.09] text-cyan-50",
  },
  {
    id: "P",
    name: "Phosphorus",
    clue: "Appears in phosphate groups, nucleotides, and phospholipids.",
    color: "#fcd34d",
    surface: "border-amber-200/25 bg-amber-300/[0.09] text-amber-50",
  },
  {
    id: "S",
    name: "Sulfur",
    clue: "Appears in particular amino-acid side chains and can help stabilize proteins.",
    color: "#c4b5fd",
    surface: "border-violet-200/25 bg-violet-300/[0.09] text-violet-50",
  },
] as const;

export const MOLECULES: readonly MoleculeRecord[] = [
  {
    id: "glucose",
    name: "Glucose",
    family: "Carbohydrate building block",
    formula: "C6H12O6",
    counts: { C: 6, H: 12, O: 6 },
    structureClue:
      "A carbon-based molecule with many oxygen-containing polar groups.",
    boundary:
      "C, H, and O alone do not prove that an unknown molecule is a carbohydrate.",
  },
  {
    id: "palmitic-acid",
    name: "Palmitic acid",
    family: "Lipid component",
    formula: "C16H32O2",
    counts: { C: 16, H: 32, O: 2 },
    structureClue:
      "A long hydrocarbon-rich chain with a small oxygen-containing end group.",
    boundary:
      "This fatty acid is one lipid component; complete lipids can contain other groups and elements.",
  },
  {
    id: "cysteine",
    name: "Cysteine",
    family: "Protein building block",
    formula: "C3H7NO2S",
    counts: { C: 3, H: 7, N: 1, O: 2, S: 1 },
    structureClue:
      "An amino acid with nitrogen and a sulfur-containing side chain.",
    boundary:
      "Some amino acids contain sulfur; many do not. Proteins inherit the elements in their amino-acid sequences.",
  },
  {
    id: "amp",
    name: "Adenosine monophosphate",
    family: "Nucleic-acid building block",
    formula: "C10H14N5O7P",
    counts: { C: 10, H: 14, N: 5, O: 7, P: 1 },
    structureClue:
      "A nucleotide with a nitrogenous base, sugar, and phosphate group.",
    boundary:
      "Nitrogen and phosphorus support the identification, but molecular arrangement still matters.",
  },
] as const;

export const ELEMENT_ORDER = ELEMENTS.map((element) => element.id);

export function getElement(id: ElementId) {
  return ELEMENTS.find((element) => element.id === id) ?? ELEMENTS[0];
}

export function getMolecule(id: MoleculeId) {
  return MOLECULES.find((molecule) => molecule.id === id) ?? MOLECULES[0];
}

export function moleculeContains(molecule: MoleculeRecord, element: ElementId) {
  return (molecule.counts[element] ?? 0) > 0;
}

export function matchingMolecules(elements: readonly ElementId[]) {
  return MOLECULES.filter((molecule) =>
    elements.every((element) => moleculeContains(molecule, element))
  );
}

export function formulaParts(molecule: MoleculeRecord) {
  return ELEMENT_ORDER.flatMap((element) => {
    const count = molecule.counts[element];
    return count ? [{ element, count }] : [];
  });
}
