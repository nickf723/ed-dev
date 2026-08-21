import type { VocabTerm } from "../types";

export const medicinePathologyVocab: VocabTerm[] = [
  {
    id: "med-etiology",
    word: "Etiology",
    definition:
      "The cause or contributing origins of a disease or condition, which may include interacting biological, environmental, behavioral, structural, and social factors.",
    domain: "Pathology & Disease Mechanisms",
    tags: ["Cause", "Disease Mechanisms"],
    relatedTerms: ["med-pathogenesis", "med-pathogen"],
    isAdult: false,
  },
  {
    id: "med-pathogenesis",
    word: "Pathogenesis",
    definition:
      "The sequence and mechanisms through which a disease or condition develops and produces structural, biochemical, physiological, or functional effects.",
    domain: "Pathology & Disease Mechanisms",
    tags: ["Mechanism", "Disease Course"],
    relatedTerms: ["med-etiology", "med-apoptosis"],
    isAdult: false,
  },
  {
    id: "med-apoptosis",
    word: "Apoptosis",
    definition:
      "A regulated process of cell death that contributes to development and tissue maintenance and can be increased, reduced, or otherwise altered in disease.",
    domain: "Pathology & Disease Mechanisms",
    tags: ["Cell Biology", "Pathology"],
    relatedTerms: ["med-pathogenesis"],
    isAdult: false,
  },
  {
    id: "med-pathogen",
    word: "Pathogen",
    definition:
      "A biological or acellular infectious agent capable of causing disease in a susceptible host under particular exposure, host, and environmental conditions.",
    domain: "Pathology & Disease Mechanisms",
    tags: ["Infectious Disease", "Microbiology"],
    relatedTerms: ["med-etiology"],
    isAdult: false,
  },
];

export const medicineDiagnosticsVocab: VocabTerm[] = [
  {
    id: "med-diagnostics-sensitivity",
    word: "Diagnostic Sensitivity",
    definition:
      "The proportion of people with the reference condition who receive a positive result at a stated threshold: true positives divided by true positives plus false negatives.",
    domain: "Diagnostics & Laboratory Medicine",
    tags: ["Test Performance", "Measurement"],
    relatedTerms: ["med-diagnostics-specificity", "med-diagnosis"],
    isAdult: false,
  },
  {
    id: "med-diagnostics-specificity",
    word: "Diagnostic Specificity",
    definition:
      "The proportion of people without the reference condition who receive a negative result at a stated threshold: true negatives divided by true negatives plus false positives.",
    domain: "Diagnostics & Laboratory Medicine",
    tags: ["Test Performance", "Measurement"],
    relatedTerms: ["med-diagnostics-sensitivity", "med-diagnosis"],
    isAdult: false,
  },
];

export const medicinePharmacologyVocab: VocabTerm[] = [
  {
    id: "med-pharmacokinetics",
    word: "Pharmacokinetics",
    definition:
      "The study of how drug absorption, distribution, metabolism, and excretion shape concentration over time in a particular person and dosing context.",
    domain: "Pharmacology & Therapeutics",
    tags: ["Drug Exposure", "Time"],
    relatedTerms: ["med-pharmacodynamics", "med-follow-up"],
    isAdult: false,
  },
  {
    id: "med-pharmacodynamics",
    word: "Pharmacodynamics",
    definition:
      "The study of how a drug interacts with biological targets and how concentration or dose relates to intended effects, adverse effects, and variability in response.",
    domain: "Pharmacology & Therapeutics",
    tags: ["Drug Response", "Mechanism"],
    relatedTerms: ["med-pharmacokinetics", "med-benefit-harm"],
    isAdult: false,
  },
];

export const medicineProceduresVocab: VocabTerm[] = [
  {
    id: "med-procedure-indication",
    word: "Procedural Indication",
    definition:
      "A clinical reason a procedure may be appropriate for a defined goal in a particular context after considering evidence, alternatives, feasibility, contraindications, benefit, and harm.",
    domain: "Surgery & Procedures",
    tags: ["Decision", "Procedure"],
    relatedTerms: ["med-benefit-harm", "med-perioperative-care"],
    isAdult: false,
  },
  {
    id: "med-perioperative-care",
    word: "Perioperative Care",
    definition:
      "Assessment, preparation, communication, monitoring, treatment, recovery, and complication prevention surrounding an operation or invasive procedure.",
    domain: "Surgery & Procedures",
    tags: ["Safety", "Continuity"],
    relatedTerms: ["med-procedure-indication", "med-follow-up"],
    isAdult: false,
  },
];

export const medicineClinicalReasoningVocab: VocabTerm[] = [
  {
    id: "med-diagnosis",
    word: "Diagnosis",
    definition:
      "A clinically supported identification or explanatory classification based on the available history, examination, tests, course, and context and subject to revision when evidence changes.",
    domain: "Clinical Reasoning & Evidence",
    tags: ["Explanation", "Evidence"],
    relatedTerms: ["med-differential-diagnosis", "med-clinical-uncertainty"],
    isAdult: false,
  },
  {
    id: "med-differential-diagnosis",
    word: "Differential Diagnosis",
    definition:
      "An organized set of plausible explanations for a clinical problem, prioritized and revised according to fit, likelihood, consequence, and discriminating evidence.",
    domain: "Clinical Reasoning & Evidence",
    tags: ["Hypothesis", "Reasoning"],
    relatedTerms: ["med-diagnosis", "med-problem-representation"],
    isAdult: false,
  },
];

export const medicineSpecialtiesVocab: VocabTerm[] = [
  {
    id: "med-specialty",
    word: "Medical Specialty",
    definition:
      "An organized area of medical expertise defined by combinations of patient population, organ system, disease family, procedure, technology, setting, or pattern of care.",
    domain: "Medical Specialties",
    tags: ["Expertise", "Care System"],
    relatedTerms: ["med-consultation", "med-clinical-encounter"],
    isAdult: false,
  },
  {
    id: "med-consultation",
    word: "Clinical Consultation",
    definition:
      "A structured request for another clinician’s expertise that should preserve the question, relevant context, urgency, findings, communication, responsibility, and follow-through.",
    domain: "Medical Specialties",
    tags: ["Communication", "Coordination"],
    relatedTerms: ["med-specialty", "med-continuity-care"],
    isAdult: false,
  },
];

export const medicineAcuteCareVocab: VocabTerm[] = [
  {
    id: "med-triage",
    word: "Triage",
    definition:
      "A time-sensitive process for prioritizing assessment and resources according to urgency, likely benefit, available capacity, and the risk of delay rather than simply order of arrival.",
    domain: "Emergency & Critical Care",
    tags: ["Priority", "Acute Care"],
    relatedTerms: ["med-stabilization", "med-benefit-harm"],
    isAdult: false,
  },
  {
    id: "med-stabilization",
    word: "Clinical Stabilization",
    definition:
      "Immediate actions and monitoring intended to support threatened vital functions, prevent rapid deterioration, and create time for further assessment and definitive care.",
    domain: "Emergency & Critical Care",
    tags: ["Acute Care", "Monitoring"],
    relatedTerms: ["med-triage", "med-follow-up"],
    isAdult: false,
  },
];

export const medicineLongitudinalCareVocab: VocabTerm[] = [
  {
    id: "med-continuity-care",
    word: "Continuity of Care",
    definition:
      "Coherent care across time, clinicians, organizations, and settings in which information, goals, responsibility, relationships, and follow-up remain connected.",
    domain: "Primary & Longitudinal Care",
    tags: ["Time", "Coordination"],
    relatedTerms: ["med-follow-up", "med-multimorbidity"],
    isAdult: false,
  },
  {
    id: "med-multimorbidity",
    word: "Multimorbidity",
    definition:
      "The co-occurrence of multiple long-term conditions in one person, requiring care to consider interactions, burden, priorities, function, and goals rather than treating each condition in isolation.",
    domain: "Primary & Longitudinal Care",
    tags: ["Chronic Care", "Patient Context"],
    relatedTerms: ["med-continuity-care", "med-benefit-harm"],
    isAdult: false,
  },
];

export const medicineEthicsVocab: VocabTerm[] = [
  {
    id: "med-informed-consent",
    word: "Informed Consent",
    definition:
      "A voluntary authorization by a person with decision-making capacity after an understandable discussion of the proposed action, purpose, material benefits and harms, alternatives, and the option to refuse or withdraw.",
    domain: "Medical Ethics & Professionalism",
    tags: ["Autonomy", "Communication"],
    relatedTerms: ["med-decision-capacity", "med-benefit-harm"],
    isAdult: false,
  },
  {
    id: "med-decision-capacity",
    word: "Decision-Making Capacity",
    definition:
      "A decision-specific and potentially changing clinical assessment of whether a person can understand relevant information, appreciate consequences, reason about options, and communicate a choice.",
    domain: "Medical Ethics & Professionalism",
    tags: ["Autonomy", "Assessment"],
    relatedTerms: ["med-informed-consent", "med-clinical-uncertainty"],
    isAdult: false,
  },
];

export const medicineBranchVocab: VocabTerm[] = [
  ...medicinePathologyVocab,
  ...medicineDiagnosticsVocab,
  ...medicinePharmacologyVocab,
  ...medicineProceduresVocab,
  ...medicineClinicalReasoningVocab,
  ...medicineSpecialtiesVocab,
  ...medicineAcuteCareVocab,
  ...medicineLongitudinalCareVocab,
  ...medicineEthicsVocab,
];
