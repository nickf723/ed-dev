import type { VocabTerm } from "../types";

export const sociologyInteractionVocab: VocabTerm[] = [
  {
    id: "sociology-definition-of-situation",
    word: "Definition of the Situation",
    definition:
      "The shared, contested, or changing interpretation of what is happening in an encounter and which identities, rules, and actions apply.",
    domain: "Social Interaction",
    tags: ["Meaning", "Encounter"],
    relatedTerms: ["sociology-social-context"],
    isAdult: false,
  },
  {
    id: "sociology-impression-management",
    word: "Impression Management",
    definition:
      "The ways people present information, appearance, conduct, and setting to influence how others define them and the situation.",
    domain: "Social Interaction",
    tags: ["Identity", "Presentation"],
    relatedTerms: ["sociology-role"],
    isAdult: false,
  },
];
export const sociologyNetworksVocab: VocabTerm[] = [
  {
    id: "sociology-social-network",
    word: "Social Network",
    definition:
      "A defined set of social actors and measured relations among them, bounded by stated node, tie, time, direction, weight, and sampling rules.",
    domain: "Groups & Networks",
    tags: ["Relations", "Structure"],
    relatedTerms: ["sociology-social-capital"],
    isAdult: false,
  },
  {
    id: "sociology-social-capital",
    word: "Social Capital",
    definition:
      "Resources and capacities available through social relationships, network positions, trust, obligations, recognition, or group membership.",
    domain: "Groups & Networks",
    tags: ["Networks", "Resources"],
    relatedTerms: ["sociology-social-network"],
    isAdult: false,
  },
];
export const sociologyInstitutionsVocab: VocabTerm[] = [
  {
    id: "sociology-institution",
    word: "Social Institution",
    definition:
      "A durable arrangement of roles, rules, meanings, organizations, resources, and practices that coordinates a recurring area of social life.",
    domain: "Institutions",
    tags: ["Rules", "Durability"],
    relatedTerms: ["sociology-institutionalization"],
    isAdult: false,
  },
  {
    id: "sociology-institutionalization",
    word: "Institutionalization",
    definition:
      "The process through which a practice, category, rule, or relationship becomes established, routinized, legitimate, and supported by organizations or sanctions.",
    domain: "Institutions",
    tags: ["Process", "Rules"],
    relatedTerms: ["sociology-institution"],
    isAdult: false,
  },
];
export const sociologyStratificationVocab: VocabTerm[] = [
  {
    id: "soc-stratification",
    word: "Social Stratification",
    definition:
      "The patterned and durable unequal distribution of resources, opportunities, risks, power, status, and life chances among social categories and positions.",
    domain: "Stratification & Inequality",
    tags: ["Inequality", "Hierarchy"],
    relatedTerms: ["sociology-social-mobility"],
    isAdult: false,
  },
  {
    id: "sociology-social-mobility",
    word: "Social Mobility",
    definition:
      "Movement between socially differentiated positions within or across generations, measured using a stated dimension and comparison frame.",
    domain: "Stratification & Inequality",
    tags: ["Movement", "Position"],
    relatedTerms: ["soc-stratification"],
    isAdult: false,
  },
];
export const sociologyDemographyVocab: VocabTerm[] = [
  {
    id: "sociology-demographic-rate",
    word: "Demographic Rate",
    definition:
      "The frequency of a population event relative to a specified population at risk and time interval, such as a birth, death, or migration rate.",
    domain: "Population & Demography",
    tags: ["Rate", "Population"],
    relatedTerms: ["sociology-population-composition"],
    isAdult: false,
  },
  {
    id: "sociology-population-composition",
    word: "Population Composition",
    definition:
      "The distribution of a population across characteristics such as age, household, education, occupation, nativity, or other defined categories.",
    domain: "Population & Demography",
    tags: ["Distribution", "Population"],
    relatedTerms: ["sociology-demographic-rate"],
    isAdult: false,
  },
];
export const sociologyChangeVocab: VocabTerm[] = [
  {
    id: "sociology-collective-action",
    word: "Collective Action",
    definition:
      "Coordinated or interdependent action by multiple people pursuing, defending, or contesting shared interests, goods, identities, or changes.",
    domain: "Social Change",
    tags: ["Action", "Coordination"],
    relatedTerms: ["sociology-diffusion"],
    isAdult: false,
  },
  {
    id: "sociology-diffusion",
    word: "Social Diffusion",
    definition:
      "The spread of information, practices, innovations, identities, or behaviors through networks, organizations, places, and institutions over time.",
    domain: "Social Change",
    tags: ["Spread", "Network"],
    relatedTerms: ["sociology-collective-action"],
    isAdult: false,
  },
];
export const sociologyTheoryMethodsVocab: VocabTerm[] = [
  {
    id: "sociology-sociological-theory",
    word: "Sociological Theory",
    definition:
      "A connected set of concepts and propositions used to describe or explain social patterns, specify mechanisms, and generate questions or expectations.",
    domain: "Theory & Methods",
    tags: ["Explanation", "Concepts"],
    relatedTerms: ["sociology-social-mechanism"],
    isAdult: false,
  },
  {
    id: "sociology-operationalization",
    word: "Operationalization",
    definition:
      "The explicit translation of a concept into observable indicators, coding rules, measurements, manipulations, or classifications.",
    domain: "Theory & Methods",
    tags: ["Measurement", "Method"],
    relatedTerms: ["sociology-unit-of-analysis"],
    isAdult: false,
  },
];

export const sociologyBranchVocab = [
  ...sociologyInteractionVocab,
  ...sociologyNetworksVocab,
  ...sociologyInstitutionsVocab,
  ...sociologyStratificationVocab,
  ...sociologyDemographyVocab,
  ...sociologyChangeVocab,
  ...sociologyTheoryMethodsVocab,
];
