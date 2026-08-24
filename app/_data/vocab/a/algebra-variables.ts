import type { VocabTerm } from "../_registry";

export const algebraVariablesVocab: VocabTerm[] = [
  {
    id: "algebra-variable-quantity",
    word: "Variable",
    definition: "A symbol that names a quantity whose value may change or may not yet be known.",
    domain: "Algebra",
    tags: ["Quantities", "Expressions"],
    isAdult: false,
  },
  {
    id: "algebra-input-quantity",
    word: "Input quantity",
    definition: "The quantity whose selected value is put into a rule to determine a related output.",
    domain: "Algebra",
    tags: ["Quantities", "Functions"],
    isAdult: false,
  },
  {
    id: "algebra-output-quantity",
    word: "Output quantity",
    definition: "The quantity produced when an input value is processed by a mathematical rule.",
    domain: "Algebra",
    tags: ["Quantities", "Functions"],
    isAdult: false,
  },
];
