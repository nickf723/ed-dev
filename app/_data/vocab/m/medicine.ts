import type { VocabTerm } from "../types";

const medicineCoreTerms = [
  {
    id: "med-etiology",
    word: "Etiology",
    definition:
      "The cause or origin of a disease or condition, including interacting biological, environmental, behavioral, and social contributors when relevant.",
    domain: "Medicine",
    tags: ["Clinical Reasoning", "Disease Mechanisms"],
    isAdult: false,
  },
  {
    id: "med-pathogenesis",
    word: "Pathogenesis",
    definition:
      "The biological processes through which a disease or condition develops and produces its structural or functional effects.",
    domain: "Medicine",
    tags: ["Pathology", "Disease Mechanisms"],
    isAdult: false,
  },
  {
    id: "med-diagnosis",
    word: "Diagnosis",
    definition:
      "A clinically supported identification of a disease, condition, or explanatory category based on the available history, examination, tests, and context.",
    domain: "Medicine",
    tags: ["Clinical Reasoning", "Evidence"],
    isAdult: false,
  },
] as const satisfies readonly VocabTerm[];

const retainedLegacyTerms = [
  {
    id: "med-apoptosis",
    word: "Apoptosis",
    definition:
      "A regulated process of cell death that helps shape development and maintain tissues and can also be altered in disease.",
    domain: "Medicine",
    tags: ["Cell Biology", "Pathology"],
    isAdult: false,
  },
  {
    id: "med-pathogen",
    word: "Pathogen",
    definition:
      "An infectious agent capable of causing disease in a host, such as a bacterium, virus, fungus, parasite, or prion.",
    domain: "Medicine",
    tags: ["Infectious Disease", "Microbiology"],
    isAdult: false,
  },
] as const satisfies readonly VocabTerm[];

export const medicineCoreVocab: VocabTerm[] = [...medicineCoreTerms];
export const medicineVocab: VocabTerm[] = [
  ...medicineCoreTerms,
  ...retainedLegacyTerms,
];
