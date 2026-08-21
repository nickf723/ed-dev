import type { VocabTerm } from "@/app/_data/vocab/types";

export const computerHardwareVocab: VocabTerm[] = [
  {
    id: "cs-machine-instruction",
    word: "Machine Instruction",
    definition:
      "An encoded operation in an instruction-set architecture that directs a processor to transform data, move state, compare values, branch, or interact with memory or devices.",
    domain: "Hardware Architecture",
    tags: ["Processor", "Execution"],
    relatedTerms: ["cs-state", "cs-representation"],
    isAdult: false,
  },
  {
    id: "cs-pointer",
    word: "Pointer",
    definition:
      "A value interpreted as the address or reference of another region of memory or object, whose validity depends on the language, runtime, architecture, lifetime, and access rules.",
    domain: "Hardware Architecture",
    tags: ["Memory", "Address"],
    relatedTerms: ["cs-state", "cs-runtime"],
    isAdult: false,
  },
];

export const computerSoftwareVocab: VocabTerm[] = [
  {
    id: "cs-runtime",
    word: "Runtime",
    definition:
      "The execution environment and support machinery that load, schedule, interpret, compile, allocate, communicate, and handle errors while a program runs.",
    domain: "Software",
    tags: ["Execution", "Environment"],
    relatedTerms: ["cs-interface", "cs-machine-instruction"],
    isAdult: false,
  },
  {
    id: "cs-polymorphism",
    word: "Polymorphism",
    definition:
      "The ability for one interface or operation to work with values of multiple types through a stated dispatch, subtype, generic, or parametric rule.",
    domain: "Software",
    tags: ["Types", "Interface"],
    relatedTerms: ["cs-interface", "cs-abstraction"],
    isAdult: false,
  },
];

export const computerAlgorithmsVocab: VocabTerm[] = [
  {
    id: "cs-algorithm",
    word: "Algorithm",
    definition:
      "A finite, unambiguous procedure for transforming an allowed input into a required output under a specified computational model and resource account.",
    domain: "Algorithms & Data",
    tags: ["Procedure", "Resource"],
    relatedTerms: ["cs-correctness", "cs-recursion"],
    isAdult: false,
  },
  {
    id: "cs-recursion",
    word: "Recursion",
    definition:
      "A definition or procedure that refers to smaller instances of the same structure or problem and requires a base case and progress toward it.",
    domain: "Algorithms & Data",
    tags: ["Decomposition", "Control Flow"],
    relatedTerms: ["cs-algorithm", "cs-correctness"],
    isAdult: false,
  },
];

export const artificialIntelligenceComputerScienceVocab: VocabTerm[] = [
  {
    id: "cs-model",
    word: "Computational Model",
    definition:
      "A formal or learned representation used to predict, classify, generate, decide, simulate, or explain within stated inputs, assumptions, objectives, and evaluation conditions.",
    domain: "Artificial Intelligence",
    tags: ["Inference", "Evaluation"],
    relatedTerms: ["cs-training-data", "cs-representation"],
    isAdult: false,
  },
  {
    id: "cs-training-data",
    word: "Training Data",
    definition:
      "Examples, observations, labels, feedback, or interactions used to fit a model, carrying sampling choices, measurement limits, provenance, rights, and possible bias into the learned system.",
    domain: "Artificial Intelligence",
    tags: ["Learning", "Provenance"],
    relatedTerms: ["cs-model", "cs-correctness"],
    isAdult: false,
  },
];

export const computationTheoryComputerScienceVocab: VocabTerm[] = [
  {
    id: "cs-computability",
    word: "Computability",
    definition:
      "The study of which problems can be solved by an idealized effective procedure and which cannot, independent of whether a practical machine has enough time or memory.",
    domain: "Computation Theory",
    tags: ["Limits", "Formal Model"],
    relatedTerms: ["cs-turing-machine", "cs-algorithm"],
    isAdult: false,
  },
  {
    id: "cs-turing-machine",
    word: "Turing Machine",
    definition:
      "An abstract machine with a finite control, symbols on an unbounded tape, and transition rules, used to define effective computation and reason about computability.",
    domain: "Computation Theory",
    tags: ["Automata", "Formal Model"],
    relatedTerms: ["cs-computability", "cs-state"],
    isAdult: false,
  },
];

export const computerSecurityVocab: VocabTerm[] = [
  {
    id: "cs-threat-model",
    word: "Threat Model",
    definition:
      "An explicit account of assets, adversaries, capabilities, trust boundaries, attack paths, required security properties, and assumptions used to choose and evaluate controls.",
    domain: "Security & Cryptography",
    tags: ["Risk", "Trust"],
    relatedTerms: ["cs-interface", "cs-latency"],
    isAdult: false,
  },
  {
    id: "cs-latency",
    word: "Latency",
    definition:
      "The elapsed delay between a request, event, or transmission and the corresponding response or arrival, measured with a stated start, endpoint, distribution, and network or system context.",
    domain: "Security & Cryptography",
    tags: ["Network", "Performance"],
    relatedTerms: ["cs-interface", "cs-runtime"],
    isAdult: false,
  },
];

export const computerScienceBranchVocab = [
  ...computerHardwareVocab,
  ...computerSoftwareVocab,
  ...computerAlgorithmsVocab,
  ...artificialIntelligenceComputerScienceVocab,
  ...computationTheoryComputerScienceVocab,
  ...computerSecurityVocab,
];
