import type { VocabTerm } from "@/app/_data/vocab/types";

export const computerScienceVocab: VocabTerm[] = [
  {
    id: "cs-computation",
    word: "Computation",
    definition:
      "A rule-governed transformation of represented state, considered as a formal process and as an execution carried out by physical or virtual machinery.",
    domain: "Computer Science",
    tags: ["Process", "State"],
    relatedTerms: ["cs-representation", "cs-state"],
    isAdult: false,
  },
  {
    id: "cs-representation",
    word: "Representation",
    definition:
      "A mapping that lets physical or symbolic states stand for numbers, text, images, instructions, relationships, or other information under an encoding rule.",
    domain: "Computer Science",
    tags: ["Encoding", "Meaning"],
    relatedTerms: ["cs-state", "cs-interface"],
    isAdult: false,
  },
  {
    id: "cs-state",
    word: "Computational State",
    definition:
      "The information required to describe a system at one step of execution, such as memory contents, registers, control position, stored objects, messages, or persistent records.",
    domain: "Computer Science",
    tags: ["Memory", "Execution"],
    relatedTerms: ["cs-computation", "cs-machine-instruction"],
    isAdult: false,
  },
  {
    id: "cs-abstraction",
    word: "Abstraction",
    definition:
      "A representation or interface that exposes the details relevant to one task while hiding other implementation details behind a stated contract.",
    domain: "Computer Science",
    tags: ["Layer", "Contract"],
    relatedTerms: ["cs-interface", "cs-polymorphism"],
    isAdult: false,
  },
  {
    id: "cs-interface",
    word: "Interface",
    definition:
      "A defined boundary through which components exchange operations, data, signals, or messages, including the inputs, outputs, errors, identity, and behavioral guarantees they rely on.",
    domain: "Computer Science",
    tags: ["Boundary", "Composition"],
    relatedTerms: ["cs-abstraction", "cs-correctness"],
    isAdult: false,
  },
  {
    id: "cs-correctness",
    word: "Correctness",
    definition:
      "The degree to which a program, algorithm, or system satisfies its stated specification for all conditions covered by the claim, rather than merely appearing to work on selected examples.",
    domain: "Computer Science",
    tags: ["Specification", "Evidence"],
    relatedTerms: ["cs-algorithm", "cs-interface"],
    isAdult: false,
  },
];
