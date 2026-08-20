import type { VocabTerm } from "../types";

export const setTheoryVocab: VocabTerm[] = [
  {
    id: "log-set",
    word: "Set",
    definition:
      "A well-defined collection of distinct mathematical objects, called elements or members.",
    domain: "Set Theory",
    tags: ["Collections", "Foundations"],
    isAdult: false,
  },
  {
    id: "set-element",
    word: "Element",
    definition: "An object that belongs to a set.",
    domain: "Set Theory",
    tags: ["Membership", "Collections"],
    relatedTerms: ["log-set", "log-subset"],
    isAdult: false,
  },
  {
    id: "log-subset",
    word: "Subset",
    definition:
      "Set A is a subset of set B if all elements of A are also elements of B. Denoted by ⊆.",
    domain: "Set Theory",
    tags: ["Relationships", "Containment"],
    isAdult: false,
  },
  {
    id: "set-union",
    word: "Union",
    definition:
      "The set containing every element that belongs to at least one of the sets being combined.",
    domain: "Set Theory",
    tags: ["Operations", "Combination"],
    relatedTerms: ["set-intersection"],
    isAdult: false,
  },
  {
    id: "set-intersection",
    word: "Intersection",
    definition:
      "The set containing exactly the elements shared by all of the sets being compared.",
    domain: "Set Theory",
    tags: ["Operations", "Overlap"],
    relatedTerms: ["set-union"],
    isAdult: false,
  },
  {
    id: "set-difference",
    word: "Set Difference",
    definition:
      "The set of elements that belong to the first set but do not belong to the second set. Denoted by A ∖ B.",
    domain: "Set Theory",
    tags: ["Operations", "Membership"],
    relatedTerms: ["set-union", "set-intersection"],
    isAdult: false,
  },
  {
    id: "set-empty-set",
    word: "Empty Set",
    definition: "The unique set containing no elements. Denoted by ∅ or {}.",
    domain: "Set Theory",
    tags: ["Collections", "Boundary Cases"],
    relatedTerms: ["log-set", "set-disjoint-sets"],
    isAdult: false,
  },
  {
    id: "set-disjoint-sets",
    word: "Disjoint Sets",
    definition:
      "Sets with no elements in common, so their intersection is the empty set.",
    domain: "Set Theory",
    tags: ["Relationships", "Intersection"],
    relatedTerms: ["set-intersection", "set-empty-set"],
    isAdult: false,
  },
];
