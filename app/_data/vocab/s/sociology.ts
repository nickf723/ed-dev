import type { VocabTerm } from "../types";

export const sociologyVocab: VocabTerm[] = [
  {
    id: "sociology-sociology",
    word: "Sociology",
    definition:
      "The systematic study of patterned social relationships, interaction, groups, institutions, inequality, populations, and change across connected levels of analysis.",
    domain: "Sociology",
    tags: ["Society", "Evidence"],
    relatedTerms: ["sociology-social-structure"],
    isAdult: false,
  },
  {
    id: "sociology-social-system",
    word: "Social System",
    definition:
      "A set of interdependent social relationships, positions, rules, resources, institutions, and practices whose interactions produce patterned outcomes.",
    domain: "Sociology",
    tags: ["System", "Relations"],
    relatedTerms: ["sociology-social-structure"],
    isAdult: false,
  },
  {
    id: "sociology-social-structure",
    word: "Social Structure",
    definition:
      "Relatively durable patterns of relationships, positions, institutions, and resource distributions that enable and constrain social action.",
    domain: "Sociology",
    tags: ["Pattern", "Constraint"],
    relatedTerms: ["sociology-agency"],
    isAdult: false,
  },
  {
    id: "sociology-social-mechanism",
    word: "Social Mechanism",
    definition:
      "A specified process connecting conditions, actions, relationships, and an outcome in a sociological explanation.",
    domain: "Sociology",
    tags: ["Process", "Explanation"],
    relatedTerms: ["sociology-emergence"],
    isAdult: false,
  },
  {
    id: "sociology-emergence",
    word: "Social Emergence",
    definition:
      "The formation of a collective pattern through interactions among parts, where the aggregate result is not identical to any single participant's action.",
    domain: "Sociology",
    tags: ["Pattern", "Scale"],
    relatedTerms: ["sociology-social-mechanism"],
    isAdult: false,
  },
  {
    id: "sociology-norm",
    word: "Social Norm",
    definition:
      "A shared or enforced expectation about appropriate behavior in a situation, sustained through interpretation, learning, approval, sanctions, or institutions.",
    domain: "Sociology",
    tags: ["Expectation", "Behavior"],
    relatedTerms: ["sociology-role"],
    isAdult: false,
  },
  {
    id: "sociology-role",
    word: "Social Role",
    definition:
      "A set of expectations and practices associated with a social position or relationship, interpreted and performed in context.",
    domain: "Sociology",
    tags: ["Position", "Expectation"],
    relatedTerms: ["sociology-status"],
    isAdult: false,
  },
  {
    id: "sociology-status",
    word: "Social Status",
    definition:
      "A socially recognized position that carries identities, expectations, rights, duties, prestige, or access to resources.",
    domain: "Sociology",
    tags: ["Position", "Recognition"],
    relatedTerms: ["sociology-role"],
    isAdult: false,
  },
  {
    id: "sociology-power",
    word: "Social Power",
    definition:
      "The capacity to shape actions, agendas, meanings, rules, resource distributions, or outcomes, including by structuring available choices.",
    domain: "Sociology",
    tags: ["Influence", "Resources"],
    relatedTerms: ["soc-stratification"],
    isAdult: false,
  },
  {
    id: "sociology-agency",
    word: "Agency",
    definition:
      "The capacity of people or groups to interpret situations and act within, reproduce, resist, or transform social conditions.",
    domain: "Sociology",
    tags: ["Action", "Constraint"],
    relatedTerms: ["sociology-social-structure"],
    isAdult: false,
  },
  {
    id: "sociology-unit-of-analysis",
    word: "Unit of Analysis",
    definition:
      "The entity about which a study describes or explains variation, such as people, interactions, households, groups, organizations, networks, places, or countries.",
    domain: "Sociology",
    tags: ["Method", "Scale"],
    relatedTerms: ["sociology-social-context"],
    isAdult: false,
  },
  {
    id: "sociology-social-context",
    word: "Social Context",
    definition:
      "The relationships, institutions, histories, places, rules, meanings, and conditions within which an action or observation occurs.",
    domain: "Sociology",
    tags: ["Setting", "Interpretation"],
    relatedTerms: ["sociology-unit-of-analysis"],
    isAdult: false,
  },
  {
    id: "sociology-socialization",
    word: "Socialization",
    definition:
      "The lifelong processes through which people learn, negotiate, reproduce, and transform language, norms, roles, identities, skills, and social practices.",
    domain: "Sociology",
    tags: ["Learning", "Culture"],
    relatedTerms: ["sociology-norm"],
    isAdult: false,
  },
  {
    id: "soc-anomie",
    word: "Anomie",
    definition:
      "A condition in which social regulation, integration, or shared expectations are disrupted or mismatched, producing uncertainty about norms and goals.",
    domain: "Sociology",
    tags: ["Theory", "Regulation"],
    relatedTerms: ["sociology-norm"],
    isAdult: false,
  },
  {
    id: "soc-ethnocentrism",
    word: "Ethnocentrism",
    definition:
      "The interpretation of other groups and practices primarily through one's own cultural standards, often treating those standards as universal or superior.",
    domain: "Sociology",
    tags: ["Culture", "Bias"],
    relatedTerms: ["sociology-social-context"],
    isAdult: false,
  },
];
