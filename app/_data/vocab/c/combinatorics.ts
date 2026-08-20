import type { VocabTerm } from "../types";

export const combinatoricsVocab: VocabTerm[] = [
  {
    id: "combo-permutation",
    word: "Permutation",
    definition: "An arrangement of objects in which order matters.",
    domain: "Combinatorics",
    tags: ["Counting", "Order"],
    relatedTerms: ["combo-combination"],
    isAdult: false,
  },
  {
    id: "combo-combination",
    word: "Combination",
    definition: "A selection of objects in which order does not matter.",
    domain: "Combinatorics",
    tags: ["Counting", "Selection"],
    relatedTerms: ["combo-permutation"],
    isAdult: false,
  },
  {
    id: "combo-pigeonhole-principle",
    word: "Pigeonhole Principle",
    definition:
      "If more objects are placed into fewer containers, at least one container must hold more than one object.",
    domain: "Combinatorics",
    tags: ["Counting", "Existence"],
    isAdult: false,
  },
];
