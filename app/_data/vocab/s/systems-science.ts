import type { VocabTerm } from "../types";

export const systemsScienceVocab: VocabTerm[] = [
  {
    id: "systems-system",
    word: "System",
    definition:
      "A collection of interacting parts considered together because their relationships produce organized behavior.",
    domain: "Systems Science",
    tags: ["Structure", "Relationships"],
    relatedTerms: ["systems-component", "systems-boundary"],
    isAdult: false,
  },
  {
    id: "systems-component",
    word: "Component",
    definition:
      "A part of a system that performs a role and interacts with other parts of that system.",
    domain: "Systems Science",
    tags: ["Parts", "Structure"],
    relatedTerms: ["systems-system"],
    isAdult: false,
  },
  {
    id: "systems-boundary",
    word: "System Boundary",
    definition:
      "The chosen division between a system and its environment, used to decide what is included in an analysis.",
    domain: "Systems Science",
    tags: ["Models", "Scope"],
    relatedTerms: ["systems-system"],
    isAdult: false,
  },
  {
    id: "systems-feedback",
    word: "Feedback Loop",
    definition:
      "A chain of influence in which a system's output eventually affects its future input or behavior.",
    domain: "Systems Science",
    tags: ["Dynamics", "Control"],
    relatedTerms: ["systems-cybernetics"],
    isAdult: false,
  },
  {
    id: "systems-emergence",
    word: "Emergence",
    definition:
      "A property or behavior of a whole system that arises from interactions among its parts and is not present in the parts alone.",
    domain: "Systems Science",
    tags: ["Complexity", "Interactions"],
    relatedTerms: ["systems-system"],
    isAdult: false,
  },
  {
    id: "systems-cybernetics",
    word: "Cybernetics",
    definition:
      "The study of communication, control, and feedback in organisms, machines, and other systems.",
    domain: "Systems Science",
    tags: ["Control", "Feedback"],
    relatedTerms: ["systems-feedback"],
    isAdult: false,
  },
];
