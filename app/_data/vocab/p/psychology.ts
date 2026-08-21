import type { VocabTerm } from "../types";

export const psychologyVocab: VocabTerm[] = [
  {
    id: "psych-behavior",
    word: "Behavior",
    definition:
      "An observable action or response of an organism, studied in relation to context, history, physiology, and consequences.",
    domain: "Psychology",
    tags: ["Observation", "Action"],
    relatedTerms: ["psych-cognition", "psych-learning"],
    isAdult: false,
  },
  {
    id: "psych-cognition",
    word: "Cognition",
    definition:
      "The processes involved in acquiring, representing, transforming, storing, and using information, including perception, attention, memory, language, and reasoning.",
    domain: "Psychology",
    tags: ["Cognitive", "Information Processing"],
    relatedTerms: ["psych-perception", "psych-working-memory"],
    isAdult: false,
  },
  {
    id: "psych-perception",
    word: "Perception",
    definition:
      "The organization and interpretation of sensory information into experienced objects, events, and relations.",
    domain: "Psychology",
    tags: ["Cognitive", "Sensation"],
    relatedTerms: ["psych-cognition", "psych-attention"],
    isAdult: false,
  },
  {
    id: "psych-attention",
    word: "Attention",
    definition:
      "The selective allocation of limited processing resources among competing information, tasks, or actions.",
    domain: "Psychology",
    tags: ["Cognitive", "Selection"],
    relatedTerms: ["psych-perception", "psych-working-memory"],
    isAdult: false,
  },
  {
    id: "psych-working-memory",
    word: "Working Memory",
    definition:
      "A limited system for temporarily maintaining and manipulating information during ongoing thought and action.",
    domain: "Psychology",
    tags: ["Cognitive", "Memory"],
    relatedTerms: ["psych-attention", "psych-cognition"],
    isAdult: false,
  },
  {
    id: "psych-learning",
    word: "Learning",
    definition:
      "A relatively enduring change in knowledge, skill, behavior, or behavioral potential associated with experience.",
    domain: "Psychology",
    tags: ["Behavior", "Change"],
    relatedTerms: ["psych-conditioning", "psych-reinforcement"],
    isAdult: false,
  },
  {
    id: "psych-conditioning",
    word: "Conditioning",
    definition:
      "A family of learning processes in which relations among stimuli, responses, and consequences alter later behavior.",
    domain: "Psychology",
    tags: ["Learning", "Behavior"],
    relatedTerms: ["psych-learning", "psych-reinforcement"],
    isAdult: false,
  },
  {
    id: "psych-reinforcement",
    word: "Reinforcement",
    definition:
      "A consequence that increases the future probability of the behavior it follows under specified conditions.",
    domain: "Psychology",
    tags: ["Learning", "Consequence"],
    relatedTerms: ["psych-conditioning", "psych-behavior"],
    isAdult: false,
  },
  {
    id: "psych-emotion",
    word: "Emotion",
    definition:
      "A coordinated episode involving appraisal, subjective experience, physiological change, expression, and action tendency, with components varying by theory and context.",
    domain: "Psychology",
    tags: ["Experience", "Affect"],
    relatedTerms: ["psych-motivation", "psych-cognition"],
    isAdult: false,
  },
  {
    id: "psych-motivation",
    word: "Motivation",
    definition:
      "Processes that energize, direct, and sustain behavior toward or away from outcomes.",
    domain: "Psychology",
    tags: ["Action", "Goals"],
    relatedTerms: ["psych-emotion", "psych-behavior"],
    isAdult: false,
  },
  {
    id: "psych-development",
    word: "Development",
    definition:
      "Patterns of continuity and change in physical, cognitive, emotional, and social functioning across the lifespan.",
    domain: "Psychology",
    tags: ["Lifespan", "Change"],
    relatedTerms: ["psych-attachment", "psych-learning"],
    isAdult: false,
  },
  {
    id: "psych-attachment",
    word: "Attachment",
    definition:
      "An enduring emotional bond in which another person can function as a source of proximity, comfort, and security, especially under stress.",
    domain: "Psychology",
    tags: ["Development", "Relationships"],
    relatedTerms: ["psych-development", "psych-social-influence"],
    isAdult: false,
  },
  {
    id: "psych-personality-trait",
    word: "Personality Trait",
    definition:
      "A dimension describing relatively stable individual differences in characteristic patterns of thought, feeling, and behavior.",
    domain: "Psychology",
    tags: ["Personality", "Individual Differences"],
    relatedTerms: ["psych-social-influence", "psych-behavior"],
    isAdult: false,
  },
  {
    id: "psych-social-influence",
    word: "Social Influence",
    definition:
      "Change in judgment, emotion, or behavior associated with the real, imagined, or implied presence and actions of other people.",
    domain: "Psychology",
    tags: ["Social", "Context"],
    relatedTerms: ["psych-personality-trait", "psych-behavior"],
    isAdult: false,
  },
  {
    id: "psych-construct",
    word: "Construct",
    definition:
      "A theoretical concept used to organize and explain related observations, such as attention, anxiety, intelligence, or motivation.",
    domain: "Psychology",
    tags: ["Theory", "Measurement"],
    relatedTerms: ["psych-operational-definition", "psych-validity"],
    isAdult: false,
  },
  {
    id: "psych-operational-definition",
    word: "Operational Definition",
    definition:
      "A stated rule connecting a construct or variable to the specific procedure used to manipulate or measure it.",
    domain: "Psychology",
    tags: ["Measurement", "Method"],
    relatedTerms: ["psych-construct", "psych-variable"],
    isAdult: false,
  },
  {
    id: "psych-variable",
    word: "Variable",
    definition:
      "A characteristic, condition, or measurement that can take different values across people, observations, settings, or times.",
    domain: "Psychology",
    tags: ["Research", "Measurement"],
    relatedTerms: ["psych-operational-definition", "psych-confounding-variable"],
    isAdult: false,
  },
  {
    id: "psych-random-assignment",
    word: "Random Assignment",
    definition:
      "Using a chance procedure to assign participants to study conditions so preexisting differences are distributed without systematic choice.",
    domain: "Psychology",
    tags: ["Experiment", "Causal Inference"],
    relatedTerms: ["psych-correlation", "psych-confounding-variable"],
    isAdult: false,
  },
  {
    id: "psych-correlation",
    word: "Correlation",
    definition:
      "A statistical description of the direction and strength of association between variables; by itself it does not identify a causal mechanism.",
    domain: "Psychology",
    tags: ["Association", "Statistics"],
    relatedTerms: ["psych-confounding-variable", "psych-random-assignment"],
    isAdult: false,
  },
  {
    id: "psych-confounding-variable",
    word: "Confounding Variable",
    definition:
      "A factor related to both an explanatory condition and an outcome that can provide an alternative account of their observed association.",
    domain: "Psychology",
    tags: ["Causal Inference", "Design"],
    relatedTerms: ["psych-correlation", "psych-random-assignment"],
    isAdult: false,
  },
  {
    id: "psych-reliability",
    word: "Reliability",
    definition:
      "The consistency or repeatability of scores or observations across relevant occasions, items, forms, or raters.",
    domain: "Psychology",
    tags: ["Measurement", "Psychometrics"],
    relatedTerms: ["psych-validity", "psych-replication"],
    isAdult: false,
  },
  {
    id: "psych-validity",
    word: "Validity",
    definition:
      "The degree to which evidence and theory support the interpretation and use made of measurements or study conclusions.",
    domain: "Psychology",
    tags: ["Measurement", "Inference"],
    relatedTerms: ["psych-reliability", "psych-construct"],
    isAdult: false,
  },
  {
    id: "psych-replication",
    word: "Replication",
    definition:
      "A new study that tests whether a finding or inference can be obtained again under stated conditions or meaningful variations.",
    domain: "Psychology",
    tags: ["Research", "Reproducibility"],
    relatedTerms: ["psych-reliability", "psych-validity"],
    isAdult: false,
  },
  {
    id: "psych-informed-consent",
    word: "Informed Consent",
    definition:
      "A voluntary agreement to participate in research made with adequate information and comprehension, including the opportunity to decline or withdraw.",
    domain: "Psychology",
    tags: ["Ethics", "Human Subjects"],
    relatedTerms: ["psych-operational-definition"],
    isAdult: false,
  },
];
