import type { VocabTerm } from "../types";

export const recursionVocab: VocabTerm[] = [
  {
    id: "rec-recursion",
    word: "Recursion",
    definition:
      "A method of defining or solving a case using one or more smaller cases of the same kind together with directly specified base cases.",
    domain: "Recursion & Recurrence",
    tags: ["Recursion", "Definition"],
    relatedTerms: ["rec-base-case", "rec-recursive-case"],
    isAdult: false,
  },
  {
    id: "rec-base-case",
    word: "Base Case",
    definition:
      "A smallest case in a recursive definition or procedure that is specified directly rather than reduced again.",
    domain: "Recursion & Recurrence",
    tags: ["Recursion", "Termination"],
    relatedTerms: ["rec-recursion", "rec-recursive-case", "rec-termination"],
    isAdult: false,
  },
  {
    id: "rec-recursive-case",
    word: "Recursive Case",
    definition:
      "The part of a recursive definition or procedure that refers to smaller instances of the same structure or problem.",
    domain: "Recursion & Recurrence",
    tags: ["Recursion", "Reduction"],
    relatedTerms: [
      "rec-recursion",
      "rec-base-case",
      "rec-recurrence-relation",
      "rec-call-stack",
    ],
    isAdult: false,
  },
  {
    id: "rec-recurrence-relation",
    word: "Recurrence Relation",
    definition:
      "An equation that defines terms of a sequence using one or more earlier terms.",
    domain: "Recursion & Recurrence",
    tags: ["Recursion", "Sequences"],
    relatedTerms: ["rec-recursive-case"],
    isAdult: false,
  },
  {
    id: "rec-call-stack",
    word: "Call Stack",
    definition:
      "The ordered collection of active function calls whose unfinished work is waiting for deeper calls to return.",
    domain: "Recursion & Recurrence",
    tags: ["Recursion", "Computation", "Trace"],
    relatedTerms: ["rec-recursive-case", "rec-termination"],
    isAdult: false,
  },
  {
    id: "rec-termination",
    word: "Termination",
    definition:
      "The property that a procedure eventually stops; in a recursive procedure, every call path must make progress toward a reachable base case.",
    domain: "Recursion & Recurrence",
    tags: ["Recursion", "Correctness"],
    relatedTerms: ["rec-base-case", "rec-call-stack"],
    isAdult: false,
  },
];
