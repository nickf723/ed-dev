import type { VocabTerm } from "../types";

export const recursionVocab: VocabTerm[] = [
  {
    id: "rec-base-case",
    word: "Base Case",
    definition:
      "A smallest case in a recursive definition or procedure that is specified directly rather than reduced again.",
    domain: "Recursion Theory",
    tags: ["Recursion", "Termination"],
    relatedTerms: ["rec-recursive-case"],
    isAdult: false,
  },
  {
    id: "rec-recursive-case",
    word: "Recursive Case",
    definition:
      "The part of a recursive definition or procedure that refers to smaller instances of the same structure or problem.",
    domain: "Recursion Theory",
    tags: ["Recursion", "Reduction"],
    relatedTerms: ["rec-base-case", "rec-recurrence-relation"],
    isAdult: false,
  },
  {
    id: "rec-recurrence-relation",
    word: "Recurrence Relation",
    definition:
      "An equation that defines terms of a sequence using one or more earlier terms.",
    domain: "Recursion Theory",
    tags: ["Recursion", "Sequences"],
    relatedTerms: ["rec-recursive-case"],
    isAdult: false,
  },
];
