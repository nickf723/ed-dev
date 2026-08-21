import type { VocabTerm } from "../types";

export const politicalTheoryVocab: VocabTerm[] = [
  {
    id: "poli-theory-justice",
    word: "Justice",
    definition:
      "A contested standard for evaluating how rights, duties, opportunities, resources, recognition, punishment, and political power should be distributed or exercised.",
    domain: "Political Theory",
    tags: ["Normative Theory", "Institutions"],
    relatedTerms: ["poli-legitimacy", "poli-theory-liberty"],
    isAdult: false,
  },
  {
    id: "poli-theory-liberty",
    word: "Liberty",
    definition:
      "A family of political concepts concerning freedom from interference, freedom from domination, and the effective capacity to act, whose meaning depends on a stated theory and context.",
    domain: "Political Theory",
    tags: ["Freedom", "Normative Theory"],
    relatedTerms: ["poli-theory-justice", "poli-authority"],
    isAdult: false,
  },
];

export const comparativePoliticsVocab: VocabTerm[] = [
  {
    id: "poli-comparative-regime",
    word: "Political Regime",
    definition:
      "The durable rules and practices that determine access to governing authority, the exercise and constraint of power, and relations between rulers and the governed.",
    domain: "Comparative Politics",
    tags: ["Institutions", "Comparison"],
    relatedTerms: ["poli-comparative-democratization", "poli-legitimacy"],
    isAdult: false,
  },
  {
    id: "poli-comparative-democratization",
    word: "Democratization",
    definition:
      "A contested and potentially reversible process through which political competition, participation, rights, accountability, and constraints on authority become more democratic under stated criteria.",
    domain: "Comparative Politics",
    tags: ["Political Change", "Democracy"],
    relatedTerms: [
      "poli-comparative-regime",
      "poli-methods-operationalization",
    ],
    isAdult: false,
  },
];

export const politicalInstitutionsVocab: VocabTerm[] = [
  {
    id: "poli-institutions-separation-powers",
    word: "Separation of Powers",
    definition:
      "An institutional arrangement that distributes governing functions among offices or branches whose actual independence, overlap, and capacity to constrain one another vary by constitutional system.",
    domain: "Political Institutions",
    tags: ["Constitutions", "Accountability"],
    relatedTerms: ["poli-institutions-veto-point", "poli-authority"],
    isAdult: false,
  },
  {
    id: "poli-institutions-veto-point",
    word: "Veto Point",
    definition:
      "A place in a decision process where an actor or institution can prevent, delay, or condition change under the governing rules.",
    domain: "Political Institutions",
    tags: ["Decision Rules", "Policy"],
    relatedTerms: [
      "poli-institutions-separation-powers",
      "poli-collective-choice",
    ],
    isAdult: false,
  },
];

export const politicalBehaviorVocab: VocabTerm[] = [
  {
    id: "poli-gerrymandering",
    word: "Gerrymandering",
    definition:
      "The strategic design of electoral district boundaries to advantage or disadvantage political parties, groups, candidates, or voters within a particular legal and electoral system.",
    domain: "Political Behavior & Elections",
    tags: ["Elections", "Representation"],
    relatedTerms: ["poli-representation", "poli-behavior-turnout"],
    isAdult: false,
  },
  {
    id: "poli-behavior-turnout",
    word: "Voter Turnout",
    definition:
      "Participation in an election expressed relative to a stated eligible, registered, voting-age, or voting-eligible population and attached to a specific contest, place, and time.",
    domain: "Political Behavior & Elections",
    tags: ["Participation", "Measurement"],
    relatedTerms: ["poli-gerrymandering", "poli-representation"],
    isAdult: false,
  },
];

export const publicPolicyVocab: VocabTerm[] = [
  {
    id: "poli-policy-agenda-setting",
    word: "Agenda Setting",
    definition:
      "The political process through which some conditions are defined as public problems and gain decision-making attention while other issues, frames, and alternatives remain excluded or delayed.",
    domain: "Public Policy & Administration",
    tags: ["Policy Process", "Power"],
    relatedTerms: ["poli-power", "poli-policy-feedback"],
    isAdult: false,
  },
  {
    id: "poli-policy-feedback",
    word: "Policy Feedback",
    definition:
      "The process by which an existing policy reshapes later political resources, identities, expectations, participation, organizations, institutions, and policy possibilities.",
    domain: "Public Policy & Administration",
    tags: ["Implementation", "Political Change"],
    relatedTerms: ["poli-policy-agenda-setting", "poli-collective-choice"],
    isAdult: false,
  },
];

export const internationalRelationsVocab: VocabTerm[] = [
  {
    id: "poli-sovereignty",
    word: "Sovereignty",
    definition:
      "A historically changing claim and institutional principle concerning supreme political authority within a territory and recognition or independence in relations with external actors.",
    domain: "International Relations",
    tags: ["Authority", "International Order"],
    relatedTerms: ["poli-authority", "poli-hegemony"],
    isAdult: false,
  },
  {
    id: "poli-hegemony",
    word: "Hegemony",
    definition:
      "A form of predominance in which an actor or coalition shapes rules, institutions, ideas, incentives, or material relations beyond direct command alone.",
    domain: "International Relations",
    tags: ["Power", "International Order"],
    relatedTerms: ["poli-power", "poli-sovereignty"],
    isAdult: false,
  },
];

export const politicalEconomyVocab: VocabTerm[] = [
  {
    id: "poli-economy-redistribution",
    word: "Redistribution",
    definition:
      "A change in the distribution of income, wealth, services, opportunities, burdens, or risks produced through taxes, transfers, public spending, regulation, institutions, or political power.",
    domain: "Political Economy",
    tags: ["Distribution", "Public Finance"],
    relatedTerms: ["poli-economy-regulation", "poli-theory-justice"],
    isAdult: false,
  },
  {
    id: "poli-economy-regulation",
    word: "Regulation",
    definition:
      "Public rules, standards, permissions, prohibitions, reporting duties, incentives, and enforcement practices intended to shape conduct within a defined jurisdiction and policy domain.",
    domain: "Political Economy",
    tags: ["Institutions", "Markets"],
    relatedTerms: ["poli-economy-redistribution", "poli-policy-feedback"],
    isAdult: false,
  },
];

export const politicalMethodologyVocab: VocabTerm[] = [
  {
    id: "poli-methods-operationalization",
    word: "Operationalization",
    definition:
      "The explicit translation of a political concept into observable indicators, coding rules, measures, cases, or procedures while documenting what the measurement includes and omits.",
    domain: "Political Methodology",
    tags: ["Measurement", "Research Design"],
    relatedTerms: [
      "poli-methods-causal-inference",
      "poli-comparative-democratization",
    ],
    isAdult: false,
  },
  {
    id: "poli-methods-causal-inference",
    word: "Causal Inference",
    definition:
      "Reasoning from a research design and evidence toward whether and how a factor changed an outcome relative to a stated counterfactual while assessing assumptions and rival explanations.",
    domain: "Political Methodology",
    tags: ["Explanation", "Research Design"],
    relatedTerms: ["poli-methods-operationalization", "poli-policy-feedback"],
    isAdult: false,
  },
];

export const politicalScienceBranchVocab: VocabTerm[] = [
  ...politicalTheoryVocab,
  ...comparativePoliticsVocab,
  ...politicalInstitutionsVocab,
  ...politicalBehaviorVocab,
  ...publicPolicyVocab,
  ...internationalRelationsVocab,
  ...politicalEconomyVocab,
  ...politicalMethodologyVocab,
];
