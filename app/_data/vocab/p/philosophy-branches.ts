import type { VocabTerm } from "../types";

export const philosophyMetaphysicsVocab: VocabTerm[] = [
  {
    id: "phil-determinism",
    word: "Determinism",
    definition:
      "The view that the state of the world together with the laws of nature fixes every later event, though versions differ about laws, causation, and possibility.",
    domain: "Metaphysics",
    tags: ["Causation", "Free Will"],
    relatedTerms: ["philosophy-modality"],
    isAdult: false,
  },
  {
    id: "philosophy-modality",
    word: "Modality",
    definition:
      "The study of possibility, necessity, actuality, contingency, and the ways things could or must be.",
    domain: "Metaphysics",
    tags: ["Possibility", "Necessity"],
    relatedTerms: ["phil-determinism"],
    isAdult: false,
  },
];

export const philosophyEpistemologyVocab: VocabTerm[] = [
  {
    id: "phil-epistemology",
    word: "Epistemology",
    definition:
      "The branch of philosophy examining knowledge, belief, justification, evidence, testimony, skepticism, and the limits of inquiry.",
    domain: "Epistemology",
    tags: ["Knowledge", "Justification"],
    relatedTerms: ["philosophy-justification", "phil-solipsism"],
    isAdult: false,
  },
  {
    id: "philosophy-justification",
    word: "Epistemic Justification",
    definition:
      "The property or status that makes a belief responsibly or adequately supported from an epistemic point of view.",
    domain: "Epistemology",
    tags: ["Belief", "Evidence"],
    relatedTerms: ["phil-epistemology", "philosophy-premise"],
    isAdult: false,
  },
  {
    id: "phil-solipsism",
    word: "Solipsism",
    definition:
      "A family of positions or skeptical problems giving one's own mind a uniquely secure status and questioning knowledge of an external world or other minds.",
    domain: "Epistemology",
    tags: ["Skepticism", "Other Minds"],
    relatedTerms: ["phil-epistemology"],
    isAdult: false,
  },
];

export const philosophyMindVocab: VocabTerm[] = [
  {
    id: "philosophy-phenomenal-consciousness",
    word: "Phenomenal Consciousness",
    definition:
      "The subjective, qualitative character of experience—what it is like for a subject to undergo a mental state.",
    domain: "Philosophy of Mind",
    tags: ["Experience", "Mind"],
    relatedTerms: ["philosophy-mental-causation"],
    isAdult: false,
  },
  {
    id: "philosophy-mental-causation",
    word: "Mental Causation",
    definition:
      "The problem of how mental states can cause actions or other events and how such causation relates to physical explanations.",
    domain: "Philosophy of Mind",
    tags: ["Mind", "Causation"],
    relatedTerms: ["philosophy-phenomenal-consciousness"],
    isAdult: false,
  },
];

export const philosophyEthicsVocab: VocabTerm[] = [
  {
    id: "philosophy-moral-reason",
    word: "Moral Reason",
    definition:
      "A consideration that counts in favor of or against an action, policy, character trait, or response from a moral point of view.",
    domain: "Ethics",
    tags: ["Reason", "Value"],
    relatedTerms: ["philosophy-normative-theory"],
    isAdult: false,
  },
];

export const philosophyNormativeVocab: VocabTerm[] = [
  {
    id: "philosophy-normative-theory",
    word: "Normative Ethical Theory",
    definition:
      "A systematic account of which moral considerations matter and how they determine right action, good character, obligation, or value.",
    domain: "Normative Ethics",
    tags: ["Ethics", "Theory"],
    relatedTerms: ["philosophy-moral-reason", "phil-utilitarianism"],
    isAdult: false,
  },
];

export const philosophyConsequentialismVocab: VocabTerm[] = [
  {
    id: "phil-utilitarianism",
    word: "Utilitarianism",
    definition:
      "A family of consequentialist theories that evaluate actions, rules, or institutions by their effects on aggregate well-being, with major disagreements about value and distribution.",
    domain: "Consequentialist Ethics",
    tags: ["Consequences", "Well-Being"],
    relatedTerms: ["philosophy-normative-theory"],
    isAdult: false,
  },
];

export const philosophyPoliticalVocab: VocabTerm[] = [
  {
    id: "philosophy-legitimacy",
    word: "Political Legitimacy",
    definition:
      "The moral or normative right of a political institution to rule, make demands, or exercise coercive power.",
    domain: "Political Philosophy",
    tags: ["Authority", "Institutions"],
    relatedTerms: ["philosophy-distributive-justice"],
    isAdult: false,
  },
  {
    id: "philosophy-distributive-justice",
    word: "Distributive Justice",
    definition:
      "The study of principles governing how benefits, burdens, opportunities, resources, and social positions should be distributed.",
    domain: "Political Philosophy",
    tags: ["Justice", "Distribution"],
    relatedTerms: ["philosophy-legitimacy"],
    isAdult: false,
  },
];

export const philosophyAestheticsVocab: VocabTerm[] = [
  {
    id: "philosophy-aesthetic-experience",
    word: "Aesthetic Experience",
    definition:
      "An experience in which perceptual, emotional, imaginative, formal, expressive, or interpretive features are attended to aesthetically.",
    domain: "Aesthetics",
    tags: ["Experience", "Value"],
    relatedTerms: ["philosophy-artistic-interpretation"],
    isAdult: false,
  },
  {
    id: "philosophy-artistic-interpretation",
    word: "Artistic Interpretation",
    definition:
      "An account of a work's meaning, significance, structure, or expressive content supported by features of the work and relevant context.",
    domain: "Aesthetics",
    tags: ["Art", "Meaning"],
    relatedTerms: ["philosophy-aesthetic-experience"],
    isAdult: false,
  },
];

export const philosophyScienceVocab: VocabTerm[] = [
  {
    id: "philosophy-falsifiability",
    word: "Falsifiability",
    definition:
      "The capacity of a claim or theory to conflict with some possible observation, often proposed as one feature of empirical testability rather than a complete definition of science.",
    domain: "Philosophy of Science",
    tags: ["Testing", "Theory"],
    relatedTerms: ["philosophy-underdetermination"],
    isAdult: false,
  },
  {
    id: "philosophy-underdetermination",
    word: "Underdetermination",
    definition:
      "A situation in which available evidence is compatible with more than one theory or explanation, requiring attention to auxiliary assumptions and other standards of comparison.",
    domain: "Philosophy of Science",
    tags: ["Evidence", "Theory Choice"],
    relatedTerms: ["philosophy-falsifiability"],
    isAdult: false,
  },
];

export const philosophyBranchVocab = [
  ...philosophyMetaphysicsVocab,
  ...philosophyEpistemologyVocab,
  ...philosophyMindVocab,
  ...philosophyEthicsVocab,
  ...philosophyNormativeVocab,
  ...philosophyConsequentialismVocab,
  ...philosophyPoliticalVocab,
  ...philosophyAestheticsVocab,
  ...philosophyScienceVocab,
];
