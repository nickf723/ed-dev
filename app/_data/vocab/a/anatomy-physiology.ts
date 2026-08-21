import type { VocabTerm } from "../types";

export const anatomyPhysiologyVocab: VocabTerm[] = [
  {
    id: "anp-anatomy",
    word: "Anatomy",
    definition:
      "The study of body structures, their organization, and their spatial relationships.",
    domain: "Anatomy & Physiology",
    tags: ["Structure", "Human Body"],
    relatedTerms: ["anp-physiology", "anp-regional-anatomy"],
    isAdult: false,
  },
  {
    id: "anp-physiology",
    word: "Physiology",
    definition:
      "The study of how living structures function and how their activities are regulated and coordinated.",
    domain: "Anatomy & Physiology",
    tags: ["Function", "Regulation"],
    relatedTerms: ["anp-anatomy", "anp-homeostasis"],
    isAdult: false,
  },
  {
    id: "anp-tissue",
    word: "Tissue",
    definition:
      "An organized group of cells and extracellular material that performs related functions.",
    domain: "Anatomy & Physiology",
    tags: ["Organization", "Histology"],
    relatedTerms: ["anp-organ"],
    isAdult: false,
  },
  {
    id: "anp-organ",
    word: "Organ",
    definition:
      "A discrete body structure composed of two or more tissue types that work together in one or more functions.",
    domain: "Anatomy & Physiology",
    tags: ["Organization", "Structure–Function"],
    relatedTerms: ["anp-tissue", "anp-organ-system"],
    isAdult: false,
  },
  {
    id: "anp-organ-system",
    word: "Organ System",
    definition:
      "A group of organs that coordinate broad physiological functions, often across several body regions.",
    domain: "Anatomy & Physiology",
    tags: ["Organization", "Systems"],
    relatedTerms: ["anp-organ", "anp-regional-anatomy"],
    isAdult: false,
  },
  {
    id: "anp-homeostasis",
    word: "Homeostasis",
    definition:
      "The dynamic regulation of internal conditions within ranges compatible with healthy function despite ongoing change.",
    domain: "Anatomy & Physiology",
    tags: ["Regulation", "Feedback"],
    relatedTerms: ["anp-physiology"],
    isAdult: false,
  },
  {
    id: "anp-regional-anatomy",
    word: "Regional Anatomy",
    definition:
      "The study of all structures within a particular body region and the spatial relationships among them.",
    domain: "Anatomy & Physiology",
    tags: ["Regions", "Spatial Relationships"],
    relatedTerms: ["anp-anatomy", "anp-organ-system"],
    isAdult: false,
  },
];
