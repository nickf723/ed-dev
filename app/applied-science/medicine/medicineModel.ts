export const MEDICINE_DIRECT_BRANCH_IDS = [
  "applied.medicine.anatomy-physiology",
  "applied.medicine.pathology",
  "applied.medicine.diagnostics",
  "applied.medicine.pharmacology",
  "applied.medicine.surgery-procedures",
  "applied.medicine.clinical-reasoning",
  "applied.medicine.specialties",
  "applied.medicine.acute-care",
  "applied.medicine.longitudinal-care",
  "applied.medicine.ethics-professionalism",
] as const;

export type MedicineBranchId = (typeof MEDICINE_DIRECT_BRANCH_IDS)[number];

export const MEDICINE_REASONING_STAGES = [
  {
    key: "observe",
    label: "Observe",
    rgb: "125,211,252",
    prompt: "Build the problem representation before choosing an explanation.",
  },
  {
    key: "interpret",
    label: "Interpret",
    rgb: "94,234,212",
    prompt:
      "Generate more than one plausible working hypothesis and look for discriminating evidence.",
  },
  {
    key: "test",
    label: "Test",
    rgb: "192,132,252",
    prompt:
      "A test changes uncertainty only in context. Results are evidence, not diagnoses by themselves.",
  },
  {
    key: "act",
    label: "Act",
    rgb: "251,191,36",
    prompt:
      "Interventions have intended benefits, burdens, risks, alternatives, and monitoring needs.",
  },
  {
    key: "monitor",
    label: "Monitor",
    rgb: "248,113,113",
    prompt:
      "Clinical reasoning continues after an action. Response and new evidence can revise the plan.",
  },
] as const;

export type MedicineStageKey =
  (typeof MEDICINE_REASONING_STAGES)[number]["key"];

export const MEDICINE_EVIDENCE_PACKETS = [
  {
    key: "history",
    label: "History packet",
    kind: "reported",
    weight: [2, 1, 0],
    note: "A synthetic report adds context and timing, but remains incomplete and potentially noisy.",
  },
  {
    key: "exam",
    label: "Exam clue",
    kind: "observed",
    weight: [0, 2, 1],
    note: "A schematic finding changes the balance among hypotheses without proving any one of them.",
  },
  {
    key: "trend",
    label: "Trend over time",
    kind: "longitudinal",
    weight: [1, 0, 2],
    note: "Repeated measurements can reveal trajectory that a single snapshot cannot.",
  },
  {
    key: "testA",
    label: "Test result A",
    kind: "measured",
    weight: [2, -1, 0],
    note: "A result can support one hypothesis while weighing against another.",
  },
  {
    key: "testB",
    label: "Test result B",
    kind: "measured",
    weight: [-1, 1, 2],
    note: "Different tests answer different questions and should be interpreted with the case context.",
  },
] as const;

export type MedicineEvidenceKey =
  (typeof MEDICINE_EVIDENCE_PACKETS)[number]["key"];

export const MEDICINE_HYPOTHESES = [
  { label: "Mechanism A", rgb: "125,211,252", baseline: 2 },
  { label: "Mechanism B", rgb: "94,234,212", baseline: 2 },
  { label: "Mechanism C", rgb: "192,132,252", baseline: 2 },
] as const;

export function calculateMedicineSupport(
  selectedEvidence: readonly MedicineEvidenceKey[]
): number[] {
  const selected = new Set(selectedEvidence);
  return MEDICINE_HYPOTHESES.map((hypothesis, hypothesisIndex) => {
    const evidenceDelta = MEDICINE_EVIDENCE_PACKETS.reduce(
      (sum, packet) =>
        selected.has(packet.key) ? sum + packet.weight[hypothesisIndex] : sum,
      0
    );
    return Math.max(0, hypothesis.baseline + evidenceDelta);
  });
}

export const DIAGNOSTIC_TABLE = {
  truePositive: 90,
  falseNegative: 10,
  falsePositive: 45,
  trueNegative: 855,
} as const;

export function calculateSensitivity({
  truePositive,
  falseNegative,
}: {
  truePositive: number;
  falseNegative: number;
}): number | null {
  const denominator = truePositive + falseNegative;
  if (
    !Number.isFinite(truePositive) ||
    !Number.isFinite(falseNegative) ||
    truePositive < 0 ||
    falseNegative < 0 ||
    denominator <= 0
  ) {
    return null;
  }
  return truePositive / denominator;
}

export function calculateSpecificity({
  trueNegative,
  falsePositive,
}: {
  trueNegative: number;
  falsePositive: number;
}): number | null {
  const denominator = trueNegative + falsePositive;
  if (
    !Number.isFinite(trueNegative) ||
    !Number.isFinite(falsePositive) ||
    trueNegative < 0 ||
    falsePositive < 0 ||
    denominator <= 0
  ) {
    return null;
  }
  return trueNegative / denominator;
}

export function calculatePositivePredictiveValue({
  truePositive,
  falsePositive,
}: {
  truePositive: number;
  falsePositive: number;
}): number | null {
  const denominator = truePositive + falsePositive;
  if (
    !Number.isFinite(truePositive) ||
    !Number.isFinite(falsePositive) ||
    truePositive < 0 ||
    falsePositive < 0 ||
    denominator <= 0
  ) {
    return null;
  }
  return truePositive / denominator;
}

export function formatMedicinePercent(value: number | null): string {
  return value === null ? "invalid inputs" : `${(value * 100).toFixed(1)}%`;
}

export const MEDICINE_EVIDENCE_CASES = [
  {
    id: "sensitivity",
    eyebrow: "Case 01 · exact practice",
    label: "Read the condition-positive row",
    prompt:
      "In a teaching sample, 90 people with the condition test positive and 10 test negative. What is the test sensitivity in this sample?",
    options: [
      {
        id: "sensitivity-90",
        label:
          "90.0%, because sensitivity = true positives / (true positives + false negatives) = 90 / 100.",
      },
      {
        id: "sensitivity-667",
        label:
          "66.7%, because every positive test belongs in the sensitivity denominator.",
      },
      {
        id: "sensitivity-95",
        label: "95.0%, because sensitivity and specificity are always equal.",
      },
    ],
    correctOptionId: "sensitivity-90",
    success:
      "Correct. Sensitivity conditions on people who have the condition in the reference classification: 90 / (90 + 10) = 90.0%. It does not tell us the probability that one positive result is a true positive.",
    correction:
      "Use the condition-positive row: true positives plus false negatives. Positive predictive value uses a different denominator—the positive-test column.",
  },
  {
    id: "predictive-value",
    eyebrow: "Case 02 · denominator",
    label: "Read the positive-test column",
    prompt:
      "The same sample contains 90 true-positive and 45 false-positive results. What fraction of positive results are true positives?",
    options: [
      {
        id: "ppv-667",
        label:
          "66.7%, because positive predictive value = 90 / (90 + 45) = 90 / 135.",
      },
      {
        id: "ppv-90",
        label:
          "90.0%, because sensitivity can be substituted for predictive value in any population.",
      },
      {
        id: "ppv-100",
        label:
          "100%, because a positive result is the same thing as a confirmed diagnosis.",
      },
    ],
    correctOptionId: "ppv-667",
    success:
      "Correct. 90 / 135 = 66.7%. Predictive value depends on the tested population and prevalence as well as test performance, so it cannot be copied unchanged into every clinical context.",
    correction:
      "Use every positive test in the denominator: true positives plus false positives. Do not interpret sensitivity as the probability that a positive result identifies disease.",
  },
  {
    id: "registered-study",
    eyebrow: "Case 03 · evidence object",
    label: "Keep registration and results distinct",
    prompt:
      "A ClinicalTrials.gov record says a study is recruiting for an intervention. What does that record establish?",
    options: [
      {
        id: "registration-boundary",
        label:
          "It documents a submitted study record and recruitment status at a versioned time; it does not by itself prove that the intervention is safe, effective, completed, or appropriate for a person.",
      },
      {
        id: "approval-proof",
        label:
          "Registration proves that the U.S. government approved the intervention’s safety and effectiveness.",
      },
      {
        id: "results-guaranteed",
        label:
          "A recruiting record guarantees favorable final results and complete reporting.",
      },
    ],
    correctOptionId: "registration-boundary",
    success:
      "Correct. A registry record is valuable provenance about planned or ongoing research. Study design, updates, completion, posted results, publications, bias, applicability, and synthesis remain separate questions.",
    correction:
      "Do not turn registration into approval or a positive result. Preserve the NCT ID, version/update time, study status, design, sponsor-submitted fields, and whether results are actually posted.",
  },
  {
    id: "follow-up",
    eyebrow: "Case 04 · action boundary",
    label: "Make monitoring part of the plan",
    prompt:
      "A fictional treatment is started under appropriate care. Which plan best represents clinical reasoning after the action?",
    options: [
      {
        id: "monitor-revise",
        label:
          "State the goal, expected time course, possible harms, what will be measured, when reassessment occurs, and what findings would continue, change, or stop the plan.",
      },
      {
        id: "action-ends-reasoning",
        label:
          "Treat the initial decision as final; response and adverse effects cannot change the working assessment.",
      },
      {
        id: "one-number",
        label:
          "Use one isolated measurement as a complete substitute for symptoms, function, preferences, harms, and trajectory.",
      },
    ],
    correctOptionId: "monitor-revise",
    success:
      "Correct. An intervention creates a new observation period. Monitoring connects benefit, harm, adherence, feasibility, patient goals, time, and stopping or escalation rules to a revisable plan.",
    correction:
      "Reasoning continues after action. Define the target, measurement, time horizon, adverse-effect surveillance, reassessment point, and conditions for changing course.",
  },
] as const;

export function isMedicineEvidenceAnswerCorrect(
  caseId: string,
  optionId: string
): boolean {
  return (
    MEDICINE_EVIDENCE_CASES.find((item) => item.id === caseId)
      ?.correctOptionId === optionId
  );
}
