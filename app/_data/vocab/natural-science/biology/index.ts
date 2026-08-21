import type { VocabTerm } from "@/app/_data/vocab/types";

export const biologyVocab: VocabTerm[] = [
  {
    id: "bio-homeostasis",
    word: "Homeostasis",
    definition:
      "Dynamic regulation that keeps selected internal variables within functional ranges despite changing internal processes and environmental conditions.",
    domain: "Biology",
    tags: ["Regulation", "Systems"],
    relatedTerms: ["biology-regulation", "biology-metabolism"],
    isAdult: false,
  },
  {
    id: "biology-cell",
    word: "Cell",
    definition:
      "A membrane-bounded unit that organizes metabolism, information, regulation, growth, response, and reproduction, either independently or as part of a multicellular organism.",
    domain: "Biology",
    tags: ["Organization", "Life"],
    relatedTerms: ["biology-organism", "biology-membrane-transport"],
    isAdult: false,
  },
  {
    id: "biology-organism",
    word: "Organism",
    definition:
      "An individual living system whose parts and processes are coordinated across a life cycle and whose boundary depends on the biological question and form of life.",
    domain: "Biology",
    tags: ["Individual", "Life Cycle"],
    relatedTerms: ["biology-cell", "biology-population"],
    isAdult: false,
  },
  {
    id: "biology-population",
    word: "Population",
    definition:
      "A set of organisms of a focal kind occupying a stated place and time and connected through reproduction, demography, interaction, or another specified study criterion.",
    domain: "Biology",
    tags: ["Group", "Scale"],
    relatedTerms: ["biology-community", "biology-natural-selection"],
    isAdult: false,
  },
  {
    id: "biology-community",
    word: "Biological Community",
    definition:
      "Populations of different organisms considered together through their co-occurrence and interactions in a stated place, time, and sampling frame.",
    domain: "Biology",
    tags: ["Interaction", "Ecology"],
    relatedTerms: ["biology-population", "biology-ecosystem"],
    isAdult: false,
  },
  {
    id: "biology-ecosystem",
    word: "Ecosystem",
    definition:
      "Organisms, physical conditions, material pools, energy transfers, and interactions considered as a connected system within a stated boundary and time scale.",
    domain: "Biology",
    tags: ["System", "Environment"],
    relatedTerms: ["biology-community", "biology-energy-matter"],
    isAdult: false,
  },
  {
    id: "biology-metabolism",
    word: "Metabolism",
    definition:
      "The coordinated network of chemical reactions that transforms matter and energy to maintain, build, regulate, and reproduce living systems.",
    domain: "Biology",
    tags: ["Chemistry", "Energy"],
    relatedTerms: ["biology-energy-matter", "bio-homeostasis"],
    isAdult: false,
  },
  {
    id: "biology-structure-function",
    word: "Structure–Function Relationship",
    definition:
      "A testable relationship between biological form and what a molecule, cell, tissue, organ, organism, or ecological structure does under stated conditions.",
    domain: "Biology",
    tags: ["Form", "Mechanism"],
    relatedTerms: ["biology-scale", "biology-organ-system"],
    isAdult: false,
  },
  {
    id: "biology-biological-information",
    word: "Biological Information",
    definition:
      "Patterns whose sequence, state, location, or transmission matters to biological processes, including genetic sequences, regulatory states, signals, and inherited organization.",
    domain: "Biology",
    tags: ["Sequence", "Signal"],
    relatedTerms: ["biology-gene-expression", "bio-genotype"],
    isAdult: false,
  },
  {
    id: "biology-energy-matter",
    word: "Energy and Matter Flow",
    definition:
      "The transformations and transfers of energy and materials through biological reactions, organisms, trophic relationships, and environmental reservoirs.",
    domain: "Biology",
    tags: ["Flow", "Transformation"],
    relatedTerms: ["biology-metabolism", "biology-ecosystem"],
    isAdult: false,
  },
  {
    id: "biology-regulation",
    word: "Biological Regulation",
    definition:
      "Processes that sense or integrate conditions and modify biological activity through feedback, signaling, expression, behavior, or interaction.",
    domain: "Biology",
    tags: ["Feedback", "Response"],
    relatedTerms: ["bio-homeostasis", "biology-gene-expression"],
    isAdult: false,
  },
  {
    id: "biology-scale",
    word: "Biological Scale",
    definition:
      "The spatial, temporal, and organizational level at which a biological object or process is defined, observed, measured, and explained.",
    domain: "Biology",
    tags: ["Measurement", "Organization"],
    relatedTerms: ["biology-structure-function", "biology-population"],
    isAdult: false,
  },
];
