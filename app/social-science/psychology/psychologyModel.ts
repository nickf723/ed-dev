export const PSYCHOLOGY_BRANCH_IDS = [
  "social.psychology.cognitive",
  "social.psychology.biological",
  "social.psychology.developmental",
  "social.psychology.social-personality",
  "social.psychology.clinical-counseling",
  "social.psychology.methods-measurement",
] as const;

export type PsychologyBranchId = (typeof PSYCHOLOGY_BRANCH_IDS)[number];

export const ATTENTION_CONDITION_SCORES = {
  uninterrupted: [8, 7, 9, 8, 8],
  interrupted: [5, 6, 4, 5, 5],
} as const;

export function getMean(values: readonly number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function getConditionDifference(
  first: readonly number[],
  second: readonly number[],
): number {
  return getMean(first) - getMean(second);
}

export const ATTENTION_CONDITION_SUMMARY = {
  uninterruptedMean: getMean(ATTENTION_CONDITION_SCORES.uninterrupted),
  interruptedMean: getMean(ATTENTION_CONDITION_SCORES.interrupted),
  meanDifference: getConditionDifference(
    ATTENTION_CONDITION_SCORES.uninterrupted,
    ATTENTION_CONDITION_SCORES.interrupted,
  ),
} as const;

export const PSYCHOLOGY_EVIDENCE_CASES = [
  {
    id: "difference",
    label: "Calculate the contrast",
    eyebrow: "Study file 01 · arithmetic",
    observation:
      "Five uninterrupted scores are 8, 7, 9, 8, 8. Five interrupted scores are 5, 6, 4, 5, 5.",
    prompt: "What is the uninterrupted mean minus the interrupted mean?",
    options: [
      { id: "three", label: "3 points: 8 − 5 = 3." },
      { id: "two", label: "2 points: compare only the first two observations." },
      { id: "thirteen", label: "13 points: add the two condition means." },
    ],
    correctOptionId: "three",
    success:
      "Correct. Each condition mean summarizes five scores: 40 ÷ 5 = 8 and 25 ÷ 5 = 5, so the observed contrast is 3 points.",
    correction:
      "Average all five scores in each condition first. The two means are 8 and 5; the requested difference is 3.",
  },
  {
    id: "operationalize",
    label: "Make a construct observable",
    eyebrow: "Study file 02 · measurement",
    observation:
      "A research question asks whether interruptions change sustained attention during a ten-minute monitoring task.",
    prompt: "Which plan most directly operationalizes sustained attention?",
    options: [
      {
        id: "task-measures",
        label:
          "Define target events in advance and compare detection accuracy and response time under specified interruption conditions.",
      },
      {
        id: "impression",
        label:
          "Ask the researcher whether each participant looked attentive and leave the judgment undefined.",
      },
      {
        id: "unrelated",
        label:
          "Record each participant’s favorite color and treat it as a complete measure of attention.",
      },
    ],
    correctOptionId: "task-measures",
    success:
      "Yes. The construct is linked to observable outcomes with a repeatable task and a stated comparison.",
    correction:
      "Operationalization requires a public rule connecting the construct to observable measures. Undefined impressions and unrelated preferences do not provide that rule.",
  },
  {
    id: "causality",
    label: "Bound the causal claim",
    eyebrow: "Study file 03 · design",
    observation:
      "Students choose whether to study with music or silence. The silence group later has a higher average test score.",
    prompt: "What is the strongest claim this self-selected comparison supports?",
    options: [
      {
        id: "association",
        label:
          "Study choice and score are associated in this sample; self-selection and other differences remain plausible explanations.",
      },
      {
        id: "music-causes",
        label:
          "Music caused every score difference because the group means were unequal.",
      },
      {
        id: "randomized",
        label:
          "The study already used random assignment because participants made their own choices.",
      },
    ],
    correctOptionId: "association",
    success:
      "Right. The pattern is worth explaining, but self-selection leaves competing explanations. Random assignment would address some—not all—causal alternatives.",
    correction:
      "Choosing one’s own condition is not random assignment. The observed difference supports an association in the sample, not an isolated causal effect.",
  },
  {
    id: "boundary",
    label: "Respect the practice boundary",
    eyebrow: "Study file 04 · clinical boundary",
    observation:
      "A learner receives a low retention cue from this page’s simplified working-memory model and wonders whether it is a diagnosis.",
    prompt: "How should the result be interpreted?",
    options: [
      {
        id: "teaching-model",
        label:
          "It is an educational model output, not a diagnosis; personal concerns require an appropriate qualified health professional.",
      },
      {
        id: "diagnosis",
        label:
          "It proves a mental disorder because the numerical cue is below the learner’s expectation.",
      },
      {
        id: "treatment",
        label:
          "It identifies the exact treatment the learner should begin without a clinical assessment.",
      },
    ],
    correctOptionId: "teaching-model",
    success:
      "Correct. A toy model can teach directional relationships; it cannot assess a person, diagnose a condition, or select treatment.",
    correction:
      "Do not turn a teaching readout into a clinical conclusion. Diagnosis and treatment require an appropriate professional assessment using information far beyond this model.",
  },
] as const;

export type PsychologyEvidenceCaseId =
  (typeof PSYCHOLOGY_EVIDENCE_CASES)[number]["id"];

export function isPsychologyEvidenceAnswerCorrect(
  caseId: string,
  optionId: string,
): boolean {
  const evidenceCase = PSYCHOLOGY_EVIDENCE_CASES.find(
    (item) => item.id === caseId,
  );
  return evidenceCase?.correctOptionId === optionId;
}
