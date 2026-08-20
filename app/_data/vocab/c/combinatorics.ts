import type { VocabTerm } from "../types";

export const combinatoricsVocab: VocabTerm[] = [
  {
    id: "combo-factorial",
    word: "Factorial",
    definition:
      "For a nonnegative integer n, the product n(n − 1)(n − 2)⋯1, written n!, with 0! defined as 1.",
    domain: "Combinatorics",
    tags: ["Counting", "Notation"],
    relatedTerms: ["combo-permutation", "combo-combination"],
    isAdult: false,
  },
  {
    id: "combo-sum-rule",
    word: "Sum Rule",
    definition:
      "If an outcome can occur through exactly one of several disjoint cases, the total count is the sum of the case counts.",
    domain: "Combinatorics",
    tags: ["Counting", "Cases"],
    relatedTerms: ["combo-product-rule", "combo-inclusion-exclusion"],
    isAdult: false,
  },
  {
    id: "combo-product-rule",
    word: "Product Rule",
    definition:
      "If a process has successive stages, multiply the number of available choices at each stage to count complete outcomes.",
    domain: "Combinatorics",
    tags: ["Counting", "Decisions"],
    relatedTerms: ["combo-sum-rule", "combo-permutation"],
    isAdult: false,
  },
  {
    id: "combo-permutation",
    word: "Permutation",
    definition:
      "An ordered arrangement or selection in which changing position creates a different outcome.",
    domain: "Combinatorics",
    tags: ["Counting", "Order"],
    relatedTerms: ["combo-factorial", "combo-combination"],
    isAdult: false,
  },
  {
    id: "combo-combination",
    word: "Combination",
    definition:
      "An unordered selection in which rearranging the same chosen objects does not create a different outcome.",
    domain: "Combinatorics",
    tags: ["Counting", "Selection"],
    relatedTerms: [
      "combo-permutation",
      "combo-factorial",
      "combo-binomial-coefficient",
    ],
    isAdult: false,
  },
  {
    id: "combo-binomial-coefficient",
    word: "Binomial Coefficient",
    definition:
      "The number of ways to choose k objects from n distinct objects without regard to order, written as n choose k.",
    domain: "Combinatorics",
    tags: ["Counting", "Selection", "Binomial"],
    relatedTerms: ["combo-combination", "combo-factorial"],
    isAdult: false,
  },
  {
    id: "combo-overcounting",
    word: "Overcounting",
    definition:
      "Counting one mathematical outcome more than once because it has several descriptions or belongs to overlapping cases.",
    domain: "Combinatorics",
    tags: ["Counting", "Symmetry", "Overlap"],
    relatedTerms: ["combo-combination", "combo-inclusion-exclusion"],
    isAdult: false,
  },
  {
    id: "combo-inclusion-exclusion",
    word: "Inclusion–Exclusion Principle",
    definition:
      "A counting rule that adds case counts and subtracts their overlaps so shared outcomes are not counted repeatedly.",
    domain: "Combinatorics",
    tags: ["Counting", "Overlap"],
    relatedTerms: ["combo-sum-rule", "combo-overcounting"],
    isAdult: false,
  },
  {
    id: "combo-pigeonhole-principle",
    word: "Pigeonhole Principle",
    definition:
      "If N objects are placed into k containers, at least one container holds at least ⌈N/k⌉ objects.",
    domain: "Combinatorics",
    tags: ["Counting", "Existence", "Distribution"],
    isAdult: false,
  },
];
