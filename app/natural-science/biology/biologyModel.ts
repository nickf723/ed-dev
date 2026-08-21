export const BIOLOGY_DIRECT_BRANCH_IDS = [
  "natural.biology.cytology",
  "natural.biology.genetics",
  "natural.biology.molecular",
  "natural.biology.microbiology",
  "natural.biology.mycology",
  "natural.biology.botany",
  "natural.biology.zoology",
  "natural.biology.anatomy",
  "natural.biology.ecology",
  "natural.biology.evolution",
] as const;

export type BiologyScaleBand = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  measure: string;
  rgb: string;
  nodeIds: readonly (typeof BIOLOGY_DIRECT_BRANCH_IDS)[number][];
};

export const BIOLOGY_SCALE_BANDS: readonly BiologyScaleBand[] = [
  {
    id: "molecular",
    eyebrow: "01 · Molecular scale",
    title: "Information & machinery",
    description:
      "Genes and biomolecules store, express, copy, and modify information while molecular interactions build and regulate living structures.",
    measure: "nm → µm",
    rgb: "139,92,246",
    nodeIds: ["natural.biology.genetics", "natural.biology.molecular"],
  },
  {
    id: "cellular",
    eyebrow: "02 · Cellular scale",
    title: "The living unit",
    description:
      "Cells organize chemistry into bounded, self-maintaining systems; microbes show how much biological function can occur at tiny scales.",
    measure: "µm → mm",
    rgb: "34,211,238",
    nodeIds: ["natural.biology.cytology", "natural.biology.microbiology"],
  },
  {
    id: "organismal",
    eyebrow: "03 · Organismal scale",
    title: "Bodies & forms of life",
    description:
      "Organisms coordinate structure, exchange, regulation, growth, and reproduction while fungi, plants, and animals embody different evolutionary histories.",
    measure: "mm → 100 m",
    rgb: "132,204,22",
    nodeIds: [
      "natural.biology.mycology",
      "natural.biology.botany",
      "natural.biology.zoology",
      "natural.biology.anatomy",
    ],
  },
  {
    id: "ecological",
    eyebrow: "04 · Ecological scale",
    title: "Populations & ecosystems",
    description:
      "Organisms form populations and communities connected by interactions, energy transfer, material cycles, disturbance, and environmental conditions.",
    measure: "m → planet",
    rgb: "52,211,153",
    nodeIds: ["natural.biology.ecology"],
  },
];

export const BIOLOGY_RECURRING_THEMES = [
  "Information",
  "Energy & matter",
  "Structure & function",
  "Regulation",
  "Evolution",
] as const;

export type MagnificationSpecimenKey =
  | "onion"
  | "cheek"
  | "pollen"
  | "bacterium";

export type MagnificationSpecimen = {
  key: MagnificationSpecimenKey;
  label: string;
  context: string;
  actualMicrometers: number;
  imageMillimeters: number;
  rgb: string;
  shape: "brick" | "disc" | "spiked" | "rod";
};

export const MAGNIFICATION_SPECIMENS: readonly MagnificationSpecimen[] = [
  {
    key: "onion",
    label: "Onion epidermal cell",
    context: "plant tissue specimen",
    actualMicrometers: 180,
    imageMillimeters: 72,
    rgb: "132,204,22",
    shape: "brick",
  },
  {
    key: "cheek",
    label: "Cheek epithelial cell",
    context: "animal tissue specimen",
    actualMicrometers: 60,
    imageMillimeters: 30,
    rgb: "251,113,133",
    shape: "disc",
  },
  {
    key: "pollen",
    label: "Pollen grain",
    context: "plant reproductive structure",
    actualMicrometers: 25,
    imageMillimeters: 20,
    rgb: "250,204,21",
    shape: "spiked",
  },
  {
    key: "bacterium",
    label: "Rod-shaped bacterium",
    context: "single microbial cell",
    actualMicrometers: 2,
    imageMillimeters: 8,
    rgb: "45,212,191",
    shape: "rod",
  },
] as const;

export function calculateMagnification(
  imageMillimeters: number,
  actualMicrometers: number
): number {
  if (imageMillimeters <= 0 || actualMicrometers <= 0) return 0;
  return (imageMillimeters * 1000) / actualMicrometers;
}

export function magnificationForSpecimen(
  specimen: MagnificationSpecimen
): number {
  return calculateMagnification(
    specimen.imageMillimeters,
    specimen.actualMicrometers
  );
}

export function formatBiologyInteger(value: number): string {
  const rounded = Math.round(value);
  const sign = rounded < 0 ? "-" : "";
  const digits = String(Math.abs(rounded));
  return `${sign}${digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export const BIOLOGY_EVIDENCE_CASES = [
  {
    id: "magnification",
    label: "Close the scale conversion",
    eyebrow: "Lab file 01 · exact practice",
    prompt:
      "An onion epidermal cell is 180 µm long. Its image is 72 mm long. What is the image magnification?",
    options: [
      { id: "400x", label: "400×" },
      { id: "0.4x", label: "0.4×" },
      { id: "12-96x", label: "12,960×" },
    ],
    correctOptionId: "400x",
    success:
      "Correct. Convert 72 mm to 72,000 µm, then divide image size by actual size: 72,000 ÷ 180 = 400×.",
    correction:
      "Magnification is a ratio of like units. Convert millimeters to micrometers before dividing image size by actual size.",
  },
  {
    id: "homeostasis",
    label: "Interpret regulation",
    eyebrow: "Lab file 02 · dynamic stability",
    prompt:
      "A mammal's internal temperature fluctuates within a bounded range as metabolism and heat exchange continually change. Which claim fits homeostasis?",
    options: [
      {
        id: "regulated-range",
        label:
          "Homeostasis can be dynamic regulation around a functional range, not perfect constancy or isolation from the environment.",
      },
      {
        id: "no-change",
        label: "Any fluctuation proves homeostasis has failed.",
      },
      {
        id: "no-exchange",
        label: "Homeostasis requires the organism to stop exchanging energy.",
      },
    ],
    correctOptionId: "regulated-range",
    success:
      "Correct. Biological regulation uses sensing, response, exchange, and feedback to keep relevant variables within workable conditions despite change.",
    correction:
      "Do not translate stability into stillness. Ask what variable is regulated, around what range, by which processes, and under which conditions.",
  },
  {
    id: "selection",
    label: "Locate evolutionary change",
    eyebrow: "Lab file 03 · generations",
    prompt:
      "After several generations of antibiotic exposure, a bacterial population contains a larger proportion of resistant variants. What changed evolutionarily?",
    options: [
      {
        id: "frequency",
        label:
          "The frequency of heritable variants changed across generations because survival and reproduction differed.",
      },
      {
        id: "individual-needed",
        label:
          "Each bacterium deliberately changed its genes because resistance was needed.",
      },
      {
        id: "antibiotic-created",
        label:
          "The antibiotic necessarily created the exact useful mutation in every exposed cell.",
      },
    ],
    correctOptionId: "frequency",
    success:
      "Correct. Natural selection changes populations across generations when heritable variation is associated with differential survival or reproduction.",
    correction:
      "Keep individual response, mutation origin, inheritance, selection, and population-level frequency change distinct.",
  },
  {
    id: "phylogeny",
    label: "Read a tree branch",
    eyebrow: "Lab file 04 · relationship",
    prompt:
      "Two living species share a recent branch point on a supported phylogenetic tree. What does that topology most directly represent?",
    options: [
      {
        id: "common-ancestor",
        label:
          "They are inferred to share a more recent common ancestor with each other than with lineages branching earlier in that tree.",
      },
      {
        id: "one-descends",
        label: "One living species must be the direct ancestor of the other.",
      },
      {
        id: "same-traits",
        label: "They must have identical traits and occupy the same habitat.",
      },
    ],
    correctOptionId: "common-ancestor",
    success:
      "Correct. Tree topology represents hypotheses about branching relationships; branch length, time, character change, and support require their own annotations.",
    correction:
      "Read the branching order first. Living tips are usually compared as relatives, not arranged as a ladder of one modern species turning into another.",
  },
] as const;

export function isBiologyEvidenceAnswerCorrect(
  caseId: string,
  optionId: string
): boolean {
  return (
    BIOLOGY_EVIDENCE_CASES.find((item) => item.id === caseId)
      ?.correctOptionId === optionId
  );
}
