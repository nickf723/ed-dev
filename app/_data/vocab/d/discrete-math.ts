import type { VocabTerm } from "../types";

export const discreteMathVocab: VocabTerm[] = [
  {
    id: "dm-discrete-mathematics",
    word: "Discrete Mathematics",
    definition:
      "The branch of mathematics that studies distinct, individually distinguishable objects and the structures formed from them.",
    domain: "Discrete Mathematics",
    tags: ["Structures", "Counting", "Relations"],
    relatedTerms: ["dm-discrete-structure"],
    isAdult: false,
  },
  {
    id: "dm-discrete-structure",
    word: "Discrete Structure",
    definition:
      "A mathematical structure whose objects can be distinguished and considered one at a time, such as a set, graph, sequence, or logical system.",
    domain: "Discrete Mathematics",
    tags: ["Structures", "Objects"],
    relatedTerms: ["dm-discrete-mathematics"],
    isAdult: false,
  },
];
