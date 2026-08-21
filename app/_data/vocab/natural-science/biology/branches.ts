import type { VocabTerm } from "@/app/_data/vocab/types";

export const biologyCytologyVocab: VocabTerm[] = [
  {
    id: "bio-mitosis",
    word: "Mitosis",
    definition:
      "Nuclear division in which replicated chromosomes are separated into daughter nuclei, usually coordinated with a wider cell cycle and cytokinesis.",
    domain: "Cytology",
    tags: ["Cell Cycle", "Chromosomes"],
    relatedTerms: ["biology-cell"],
    isAdult: false,
  },
  {
    id: "biology-membrane-transport",
    word: "Membrane Transport",
    definition:
      "The movement of substances across biological membranes through diffusion, channels, carriers, pumps, vesicles, or other mechanisms under stated gradients and energy conditions.",
    domain: "Cytology",
    tags: ["Membrane", "Exchange"],
    relatedTerms: ["biology-cell", "bio-homeostasis"],
    isAdult: false,
  },
];

export const biologyGeneticsVocab: VocabTerm[] = [
  {
    id: "bio-genotype",
    word: "Genotype",
    definition:
      "The genetic constitution of an organism, cell, or locus as specified for the variants and scope relevant to a particular question.",
    domain: "Genetics",
    tags: ["Inheritance", "Variation"],
    relatedTerms: ["bio-phenotype"],
    isAdult: false,
  },
  {
    id: "bio-phenotype",
    word: "Phenotype",
    definition:
      "An observable or measurable trait produced through interactions among genotype, development, environment, history, and measurement conditions.",
    domain: "Genetics",
    tags: ["Trait", "Variation"],
    relatedTerms: ["bio-genotype"],
    isAdult: false,
  },
];

export const biologyMolecularVocab: VocabTerm[] = [
  {
    id: "biology-gene-expression",
    word: "Gene Expression",
    definition:
      "The regulated use of genetic information to produce functional RNA or protein products, including transcription, RNA processing, translation, localization, and turnover where applicable.",
    domain: "Molecular Biology",
    tags: ["Gene", "Regulation"],
    relatedTerms: ["biology-biological-information", "biology-protein"],
    isAdult: false,
  },
  {
    id: "biology-protein",
    word: "Protein",
    definition:
      "A polymer of amino acids whose sequence, folding, modification, location, partners, and conditions shape structural, catalytic, signaling, transport, and regulatory functions.",
    domain: "Molecular Biology",
    tags: ["Macromolecule", "Function"],
    relatedTerms: ["biology-gene-expression", "biology-structure-function"],
    isAdult: false,
  },
];

export const biologyMicrobiologyVocab: VocabTerm[] = [
  {
    id: "biology-microorganism",
    word: "Microorganism",
    definition:
      "A microscopic organism, including diverse bacteria, archaea, protists, fungi, and other forms, defined by organismal biology rather than small size alone.",
    domain: "Microbiology",
    tags: ["Microscopic", "Diversity"],
    relatedTerms: ["biology-microbial-community"],
    isAdult: false,
  },
  {
    id: "biology-microbial-community",
    word: "Microbial Community",
    definition:
      "Microbial populations considered together through their membership, interactions, functions, and environmental context under a stated sampling and detection method.",
    domain: "Microbiology",
    tags: ["Community", "Method"],
    relatedTerms: ["biology-community", "biology-microorganism"],
    isAdult: false,
  },
];

export const biologyMycologyVocab: VocabTerm[] = [
  {
    id: "biology-mycelium",
    word: "Mycelium",
    definition:
      "A network or mass of fungal hyphae that grows through a substrate and participates in absorption, transport, interaction, and reproduction.",
    domain: "Mycology",
    tags: ["Fungi", "Hyphae"],
    relatedTerms: ["biology-mycorrhiza"],
    isAdult: false,
  },
  {
    id: "biology-mycorrhiza",
    word: "Mycorrhiza",
    definition:
      "A symbiotic association between a fungus and plant roots whose structures and exchanges vary across fungal and plant partners and environmental conditions.",
    domain: "Mycology",
    tags: ["Symbiosis", "Roots"],
    relatedTerms: ["biology-mycelium"],
    isAdult: false,
  },
];

export const biologyZoologyVocab: VocabTerm[] = [
  {
    id: "biology-animal-body-plan",
    word: "Animal Body Plan",
    definition:
      "A comparative pattern of animal organization described through traits such as symmetry, tissue layers, body cavities, segmentation, appendages, and developmental pathways.",
    domain: "Zoology",
    tags: ["Anatomy", "Development"],
    relatedTerms: ["biology-animal-phylogeny"],
    isAdult: false,
  },
  {
    id: "biology-animal-phylogeny",
    word: "Animal Phylogeny",
    definition:
      "A hypothesis about evolutionary branching relationships among animal lineages supported and revised through morphological, developmental, molecular, fossil, and other evidence.",
    domain: "Zoology",
    tags: ["Animals", "Relationship"],
    relatedTerms: ["biology-common-ancestry", "biology-clade"],
    isAdult: false,
  },
];

export const biologyZoologyDiversityVocab: VocabTerm[] = [
  {
    id: "biology-taxonomic-rank",
    word: "Taxonomic Rank",
    definition:
      "A named level such as family, genus, or species used in a classification system; ranks organize names but do not by themselves measure evolutionary distance or time.",
    domain: "Animal Diversity & Taxonomy",
    tags: ["Classification", "Rank"],
    relatedTerms: ["biology-clade"],
    isAdult: false,
  },
  {
    id: "biology-clade",
    word: "Clade",
    definition:
      "A group consisting of a common ancestor and all of its descendants within a stated phylogenetic hypothesis.",
    domain: "Animal Diversity & Taxonomy",
    tags: ["Phylogeny", "Ancestry"],
    relatedTerms: ["biology-common-ancestry", "biology-taxonomic-rank"],
    isAdult: false,
  },
];

export const biologyZoologyComparativeVocab: VocabTerm[] = [
  {
    id: "biology-homology",
    word: "Homology",
    definition:
      "Similarity of a structure, sequence, or trait attributed to inheritance from a common ancestor, evaluated relative to the character and taxa being compared.",
    domain: "Comparative Zoology",
    tags: ["Comparison", "Ancestry"],
    relatedTerms: ["biology-analogy"],
    isAdult: false,
  },
  {
    id: "biology-analogy",
    word: "Analogy",
    definition:
      "Similarity in function or appearance that evolved independently rather than being inherited as that trait from the most recent common ancestor considered.",
    domain: "Comparative Zoology",
    tags: ["Convergence", "Function"],
    relatedTerms: ["biology-homology"],
    isAdult: false,
  },
];

export const biologyZoologyEthologyVocab: VocabTerm[] = [
  {
    id: "biology-ethology",
    word: "Ethology",
    definition:
      "The biological study of animal behavior through observation, experiment, comparison, development, mechanism, function, and evolutionary history.",
    domain: "Ethology",
    tags: ["Behavior", "Animals"],
    relatedTerms: ["biology-fixed-action-pattern"],
    isAdult: false,
  },
  {
    id: "biology-fixed-action-pattern",
    word: "Fixed Action Pattern",
    definition:
      "A relatively stereotyped behavioral sequence elicited under particular conditions, used as a bounded ethological concept rather than a claim that behavior is mechanically unchangeable.",
    domain: "Ethology",
    tags: ["Behavior", "Sequence"],
    relatedTerms: ["biology-ethology"],
    isAdult: false,
  },
];

export const biologyZoologyPaleoVocab: VocabTerm[] = [
  {
    id: "biology-taphonomy",
    word: "Taphonomy",
    definition:
      "The study of processes affecting remains from death through decay, transport, burial, preservation, discovery, and collection, shaping what enters the fossil record.",
    domain: "Paleozoology",
    tags: ["Fossil", "Preservation"],
    relatedTerms: ["biology-fossil-range"],
    isAdult: false,
  },
  {
    id: "biology-fossil-range",
    word: "Fossil Range",
    definition:
      "The observed stratigraphic interval between a taxon's earliest and latest known fossil occurrences, bounded by sampling, dating, identification, and preservation uncertainty.",
    domain: "Paleozoology",
    tags: ["Time", "Occurrence"],
    relatedTerms: ["biology-taphonomy"],
    isAdult: false,
  },
];

export const biologyAnatomyVocab: VocabTerm[] = [
  {
    id: "biology-organ",
    word: "Organ",
    definition:
      "A body structure composed of multiple tissues coordinated around one or more functions, with boundaries interpreted according to the organism and question.",
    domain: "Anatomy & Physiology",
    tags: ["Structure", "Tissue"],
    relatedTerms: ["biology-organ-system"],
    isAdult: false,
  },
  {
    id: "biology-organ-system",
    word: "Organ System",
    definition:
      "A teaching and analytical grouping of interacting organs and tissues around major functions, whose boundaries overlap with other systems.",
    domain: "Anatomy & Physiology",
    tags: ["Organization", "Function"],
    relatedTerms: ["biology-organ", "biology-structure-function"],
    isAdult: false,
  },
];

export const biologyEcologyVocab: VocabTerm[] = [
  {
    id: "biology-ecological-niche",
    word: "Ecological Niche",
    definition:
      "The multidimensional set of environmental conditions, resources, interactions, and functional roles associated with a population, distinguished from the place alone.",
    domain: "Ecology",
    tags: ["Environment", "Interaction"],
    relatedTerms: ["biology-population", "biology-food-web"],
    isAdult: false,
  },
  {
    id: "biology-food-web",
    word: "Food Web",
    definition:
      "A network representation of feeding relationships and energy or material transfer among organisms or trophic groups within a stated community and time.",
    domain: "Ecology",
    tags: ["Network", "Energy"],
    relatedTerms: ["biology-community", "biology-energy-matter"],
    isAdult: false,
  },
];

export const biologyEvolutionVocab: VocabTerm[] = [
  {
    id: "biology-natural-selection",
    word: "Natural Selection",
    definition:
      "A process in which heritable variants differ in survival or reproduction under particular conditions, changing variant frequencies across generations.",
    domain: "Evolution",
    tags: ["Variation", "Generations"],
    relatedTerms: ["biology-population", "bio-phenotype"],
    isAdult: false,
  },
  {
    id: "biology-common-ancestry",
    word: "Common Ancestry",
    definition:
      "The evolutionary relationship in which lineages descend from a shared ancestral population, represented through branching hypotheses rather than a ladder of modern forms.",
    domain: "Evolution",
    tags: ["Phylogeny", "Relationship"],
    relatedTerms: ["biology-clade", "biology-animal-phylogeny"],
    isAdult: false,
  },
];

export const biologyBranchVocab = [
  ...biologyCytologyVocab,
  ...biologyGeneticsVocab,
  ...biologyMolecularVocab,
  ...biologyMicrobiologyVocab,
  ...biologyMycologyVocab,
  ...biologyZoologyVocab,
  ...biologyZoologyDiversityVocab,
  ...biologyZoologyComparativeVocab,
  ...biologyZoologyEthologyVocab,
  ...biologyZoologyPaleoVocab,
  ...biologyAnatomyVocab,
  ...biologyEcologyVocab,
  ...biologyEvolutionVocab,
];
