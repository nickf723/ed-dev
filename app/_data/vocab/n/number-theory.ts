import type { VocabTerm } from "../types";

export const numberTheoryVocab: VocabTerm[] = [
  {
    id: "fs-prime",
    word: "Prime Number",
    definition: "An integer greater than 1 whose only positive divisors are 1 and itself.",
    domain: "Number Theory",
    tags: ["Integers", "Divisibility"],
    relatedTerms: ["nt-composite", "nt-prime-factorization"],
    isAdult: false,
  },
  {
    id: "nt-composite",
    word: "Composite Number",
    definition: "An integer greater than 1 that has a positive divisor other than 1 and itself.",
    domain: "Number Theory",
    tags: ["Integers", "Divisibility"],
    relatedTerms: ["fs-prime", "nt-prime-factorization"],
    isAdult: false,
  },
  {
    id: "nt-divisor",
    word: "Divisor",
    definition: "An integer that divides another integer with no remainder.",
    domain: "Number Theory",
    tags: ["Integers", "Divisibility"],
    relatedTerms: ["nt-congruence", "nt-prime-factorization"],
    isAdult: false,
  },
  {
    id: "nt-prime-factorization",
    word: "Prime Factorization",
    definition: "A representation of an integer greater than 1 as a product of prime powers.",
    domain: "Number Theory",
    tags: ["Primes", "Multiplication"],
    relatedTerms: ["fs-prime", "nt-fundamental-theorem-arithmetic"],
    isAdult: false,
  },
  {
    id: "nt-fundamental-theorem-arithmetic",
    word: "Fundamental Theorem of Arithmetic",
    definition: "Every integer greater than 1 has a prime factorization that is unique apart from the order of its factors.",
    domain: "Number Theory",
    tags: ["Theorems", "Prime Factorization"],
    relatedTerms: ["nt-prime-factorization"],
    isAdult: false,
  },
  {
    id: "nt-congruence",
    word: "Congruence",
    definition: "A relation in which two integers have the same remainder after division by a chosen modulus.",
    domain: "Number Theory",
    tags: ["Modular Arithmetic", "Remainders"],
    relatedTerms: ["nt-divisor"],
    isAdult: false,
  },
];

export const diophantineVocab: VocabTerm[] = [
  {
    id: "nt-diophantine-equation",
    word: "Diophantine Equation",
    definition: "An equation studied under the requirement that its solutions be integers, or sometimes a specified subset of the integers.",
    domain: "Number Theory",
    tags: ["Equations", "Integers"],
    isAdult: false,
  },
];
