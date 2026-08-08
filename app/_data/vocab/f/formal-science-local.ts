import type { VocabTerm } from "../types";

export const formalScienceLocalVocab: VocabTerm[] = [
  {
    id: "formal-science",
    word: "Formal Science",
    definition:
      "A field that studies abstract systems using definitions, symbols, rules, and deduction rather than direct physical observation.",
    domain: "Formal Science",
    tags: ["Foundations", "Deduction"],
    relatedTerms: ["formal-system", "formal-deduction"],
    isAdult: false,
  },
  {
    id: "formal-system",
    word: "Formal System",
    definition:
      "A precisely defined collection of symbols, starting assumptions, and rules for producing valid conclusions.",
    domain: "Formal Science",
    tags: ["Rules", "Structure"],
    relatedTerms: ["formal-deduction"],
    isAdult: false,
  },
  {
    id: "formal-deduction",
    word: "Deductive Reasoning",
    definition:
      "Reasoning that applies valid rules to accepted premises so the conclusion must follow when the premises are true.",
    domain: "Formal Science",
    tags: ["Reasoning", "Proof"],
    relatedTerms: ["formal-system"],
    isAdult: false,
  },
  {
    id: "formal-abstraction",
    word: "Abstraction",
    definition:
      "The process of focusing on essential structure while setting aside details that do not affect the question being studied.",
    domain: "Formal Science",
    tags: ["Models", "Structure"],
    isAdult: false,
  },
  {
    id: "formal-proof",
    word: "Proof",
    definition:
      "A sequence of justified statements showing that a conclusion follows from definitions, assumptions, and previously established results.",
    domain: "Formal Science",
    tags: ["Reasoning", "Verification"],
    relatedTerms: ["formal-deduction"],
    isAdult: false,
  },
];
