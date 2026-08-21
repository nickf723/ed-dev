import type { VocabTerm } from "../types";

export const physicsVocab: VocabTerm[] = [
  {
    id: "physics-physical-system",
    word: "Physical System",
    definition:
      "The object, collection, region, or process selected for analysis, with everything else treated as its environment.",
    domain: "Physics",
    tags: ["Modeling", "Boundary"],
    relatedTerms: ["physics-system-boundary", "physics-state"],
    isAdult: false,
  },
  {
    id: "physics-system-boundary",
    word: "System Boundary",
    definition:
      "The conceptual or physical division used to decide what lies inside a system and which matter, energy, momentum, or information may cross.",
    domain: "Physics",
    tags: ["Modeling", "Transfer"],
    relatedTerms: ["physics-physical-system", "physics-interaction"],
    isAdult: false,
  },
  {
    id: "physics-state",
    word: "Physical State",
    definition:
      "A specification of the variables needed by a chosen model to describe a system at an instant or under a set of conditions.",
    domain: "Physics",
    tags: ["Modeling", "Description"],
    relatedTerms: ["physics-observable", "physics-regime"],
    isAdult: false,
  },
  {
    id: "physics-interaction",
    word: "Interaction",
    definition:
      "A relationship through which physical systems affect one another, often represented through forces, fields, exchanges, or transition probabilities.",
    domain: "Physics",
    tags: ["Forces", "Fields"],
    relatedTerms: ["physics-field", "physics-system-boundary"],
    isAdult: false,
  },
  {
    id: "physics-field",
    word: "Field",
    definition:
      "A physical quantity assigned throughout space and time that can describe local conditions and mediate interactions.",
    domain: "Physics",
    tags: ["Interactions", "Space"],
    relatedTerms: ["physics-interaction", "physics-state"],
    isAdult: false,
  },
  {
    id: "physics-energy",
    word: "Energy",
    definition:
      "A conserved scalar bookkeeping quantity that can be stored in a system or transferred across a boundary through work, heating, radiation, and other processes.",
    domain: "Physics",
    tags: ["Conservation", "Transfer"],
    relatedTerms: ["physics-conservation-law", "physics-system-boundary"],
    isAdult: false,
  },
  {
    id: "physics-scale",
    word: "Physical Scale",
    definition:
      "The characteristic length, time, energy, speed, or population range relevant to a phenomenon and to the approximations used to model it.",
    domain: "Physics",
    tags: ["Modeling", "Regime"],
    relatedTerms: ["physics-regime", "physics-model"],
    isAdult: false,
  },
  {
    id: "physics-regime",
    word: "Model Regime",
    definition:
      "The range of conditions in which a model's assumptions and approximations produce useful predictions at the required precision.",
    domain: "Physics",
    tags: ["Modeling", "Assumptions"],
    relatedTerms: ["physics-scale", "physics-model"],
    isAdult: false,
  },
  {
    id: "physics-model",
    word: "Physical Model",
    definition:
      "A selective representation connecting variables, assumptions, and laws so that observations can be explained or predicted.",
    domain: "Physics",
    tags: ["Modeling", "Prediction"],
    relatedTerms: ["physics-regime", "physics-residual"],
    isAdult: false,
  },
  {
    id: "physics-observable",
    word: "Observable",
    definition:
      "A physical quantity whose value can be connected to a measurement procedure or predicted distribution within a model.",
    domain: "Physics",
    tags: ["Measurement", "Quantity"],
    relatedTerms: ["physics-measurement-uncertainty", "physics-state"],
    isAdult: false,
  },
  {
    id: "physics-conservation-law",
    word: "Conservation Law",
    definition:
      "A rule stating that a total physical quantity remains constant for a specified isolated system or changes only through accounted boundary transfers.",
    domain: "Physics",
    tags: ["Law", "Bookkeeping"],
    relatedTerms: ["physics-energy", "physics-system-boundary"],
    isAdult: false,
  },
  {
    id: "physics-measurement-uncertainty",
    word: "Measurement Uncertainty",
    definition:
      "A quantified statement of the dispersion reasonably attributable to a measured value under a documented method, calibration, and set of conditions.",
    domain: "Physics",
    tags: ["Measurement", "Evidence"],
    relatedTerms: ["physics-observable", "physics-residual"],
    isAdult: false,
  },
  {
    id: "physics-residual",
    word: "Residual",
    definition:
      "The signed difference between an observed value and a model prediction, examined for size, uncertainty, and systematic pattern.",
    domain: "Physics",
    tags: ["Evidence", "Model Testing"],
    relatedTerms: ["physics-model", "physics-measurement-uncertainty"],
    isAdult: false,
  },
];
