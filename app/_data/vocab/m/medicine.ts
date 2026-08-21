import type { VocabTerm } from "../types";

export const medicineCoreVocab: VocabTerm[] = [
  {
    id: "med-medicine",
    word: "Medicine",
    definition:
      "The applied field concerned with understanding, preventing, recognizing, and caring for illness and injury while supporting health through evidence, clinical judgment, skilled action, ethics, communication, and follow-up.",
    domain: "Medicine",
    tags: ["Field", "Clinical Care"],
    relatedTerms: ["med-clinical-encounter", "med-follow-up"],
    isAdult: false,
  },
  {
    id: "med-clinical-encounter",
    word: "Clinical Encounter",
    definition:
      "A situated interaction in which a patient and clinician exchange information, examine concerns, make decisions, take or coordinate action, and establish responsibilities for communication and follow-up.",
    domain: "Medicine",
    tags: ["Patient Context", "Communication"],
    relatedTerms: ["med-problem-representation", "med-follow-up"],
    isAdult: false,
  },
  {
    id: "med-problem-representation",
    word: "Clinical Problem Representation",
    definition:
      "A concise, revisable summary that preserves the patient context, time course, and discriminating findings needed to organize clinical reasoning without pretending to be the final diagnosis.",
    domain: "Medicine",
    tags: ["Clinical Reasoning", "Synthesis"],
    relatedTerms: ["med-clinical-uncertainty", "med-differential-diagnosis"],
    isAdult: false,
  },
  {
    id: "med-clinical-uncertainty",
    word: "Clinical Uncertainty",
    definition:
      "Incomplete confidence about a clinical state, cause, course, response, or best action that should be characterized, updated with evidence, communicated, and managed rather than hidden.",
    domain: "Medicine",
    tags: ["Evidence", "Decision"],
    relatedTerms: ["med-problem-representation", "med-benefit-harm"],
    isAdult: false,
  },
  {
    id: "med-benefit-harm",
    word: "Benefit–Harm Balance",
    definition:
      "A context-sensitive comparison of intended benefits, possible harms, burdens, alternatives, timing, feasibility, uncertainty, equity, and the patient’s goals when considering an action.",
    domain: "Medicine",
    tags: ["Decision", "Ethics"],
    relatedTerms: ["med-clinical-uncertainty", "med-informed-consent"],
    isAdult: false,
  },
  {
    id: "med-follow-up",
    word: "Clinical Follow-Up",
    definition:
      "A planned reassessment of symptoms, function, measurements, response, adverse effects, adherence, new evidence, and goals at a stated time with criteria for continuing, changing, escalating, or stopping care.",
    domain: "Medicine",
    tags: ["Monitoring", "Time"],
    relatedTerms: ["med-clinical-encounter", "med-continuity-care"],
    isAdult: false,
  },
];

export const medicineVocab: VocabTerm[] = [...medicineCoreVocab];
