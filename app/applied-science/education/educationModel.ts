export const EDUCATION_DIRECT_BRANCH_IDS = [
  "applied.education.learning-sciences",
  "applied.education.curriculum-instruction",
  "applied.education.assessment",
  "applied.education.instructional-design",
  "applied.education.accessibility-special-education",
  "applied.education.educational-technology",
  "applied.education.teaching-learning-environments",
  "applied.education.policy-systems",
  "applied.education.teacher-learning",
] as const;

export const EDUCATION_FOLIOS = [
  {
    id: "understand",
    number: "FOLIO 01",
    title: "Understand learning",
    note: "Study learners, development, motivation, context, and the professional knowledge used to notice and respond to learning.",
    ids: [
      "applied.education.learning-sciences",
      "applied.education.teacher-learning",
    ],
    rgb: "96,165,250",
  },
  {
    id: "design",
    number: "FOLIO 02",
    title: "Design the experience",
    note: "Shape goals, content, activities, media, environments, practice, participation, and the tools that carry an instructional design.",
    ids: [
      "applied.education.curriculum-instruction",
      "applied.education.instructional-design",
      "applied.education.educational-technology",
      "applied.education.teaching-learning-environments",
    ],
    rgb: "167,139,250",
  },
  {
    id: "evidence",
    number: "FOLIO 03",
    title: "Make learning visible & reachable",
    note: "Gather evidence, design for access, and examine the systems that distribute opportunities, constraints, resources, and accountability.",
    ids: [
      "applied.education.assessment",
      "applied.education.accessibility-special-education",
      "applied.education.policy-systems",
    ],
    rgb: "52,211,153",
  },
] as const;

export type EducationFit = "direct" | "partial" | "weak";
export type EducationGoalKey =
  | "recall"
  | "procedure"
  | "explanation"
  | "transfer";
export type EducationActivityKey =
  | "model"
  | "guided"
  | "retrieval"
  | "explain"
  | "novel";
export type EducationEvidenceKey =
  | "recognition"
  | "free-recall"
  | "familiar-performance"
  | "explanation"
  | "novel-application";

export const EDUCATION_ACTIVITIES: readonly {
  key: EducationActivityKey;
  label: string;
  note: string;
}[] = [
  {
    key: "model",
    label: "Study a model / worked example",
    note: "Observe a representation of the target performance or idea.",
  },
  {
    key: "guided",
    label: "Guided practice",
    note: "Attempt the target with prompts, scaffolds, examples, or teacher support.",
  },
  {
    key: "retrieval",
    label: "Retrieve from memory",
    note: "Produce previously learned information without simply rereading it.",
  },
  {
    key: "explain",
    label: "Explain & compare",
    note: "Articulate relationships, reasons, evidence, differences, or models.",
  },
  {
    key: "novel",
    label: "Apply in a new context",
    note: "Use prior learning where surface features, setting, or task conditions differ.",
  },
] as const;

export const EDUCATION_EVIDENCE_TASKS: readonly {
  key: EducationEvidenceKey;
  label: string;
  note: string;
}[] = [
  {
    key: "recognition",
    label: "Recognition / selected response",
    note: "Identify an answer, feature, or relationship from supplied options.",
  },
  {
    key: "free-recall",
    label: "Unprompted recall",
    note: "Produce requested information from memory without seeing the answer.",
  },
  {
    key: "familiar-performance",
    label: "Independent familiar performance",
    note: "Carry out the learned procedure or performance on a familiar task type.",
  },
  {
    key: "explanation",
    label: "Explanation with reasoning / evidence",
    note: "Construct an explanation, justification, model, or argument rather than merely select one.",
  },
  {
    key: "novel-application",
    label: "Novel-context application",
    note: "Use the target knowledge or strategy in a meaningfully different task or context.",
  },
] as const;

type FitMatrix<Key extends string> = Record<Key, EducationFit>;

export const EDUCATION_GOALS: Record<
  EducationGoalKey,
  {
    label: string;
    rgb: string;
    target: string;
    activity: FitMatrix<EducationActivityKey>;
    evidence: FitMatrix<EducationEvidenceKey>;
  }
> = {
  recall: {
    label: "Recall",
    rgb: "96,165,250",
    target: "Recall key factual information without an answer cue.",
    activity: {
      model: "weak",
      guided: "partial",
      retrieval: "direct",
      explain: "partial",
      novel: "partial",
    },
    evidence: {
      recognition: "partial",
      "free-recall": "direct",
      "familiar-performance": "weak",
      explanation: "partial",
      "novel-application": "weak",
    },
  },
  procedure: {
    label: "Procedure",
    rgb: "167,139,250",
    target:
      "Carry out a learned multi-step procedure independently on a familiar task type.",
    activity: {
      model: "partial",
      guided: "direct",
      retrieval: "weak",
      explain: "partial",
      novel: "partial",
    },
    evidence: {
      recognition: "weak",
      "free-recall": "weak",
      "familiar-performance": "direct",
      explanation: "partial",
      "novel-application": "partial",
    },
  },
  explanation: {
    label: "Explanation",
    rgb: "52,211,153",
    target:
      "Explain why a relationship or outcome occurs using a model, reasoning, or evidence.",
    activity: {
      model: "partial",
      guided: "partial",
      retrieval: "weak",
      explain: "direct",
      novel: "partial",
    },
    evidence: {
      recognition: "weak",
      "free-recall": "partial",
      "familiar-performance": "partial",
      explanation: "direct",
      "novel-application": "partial",
    },
  },
  transfer: {
    label: "Transfer",
    rgb: "251,191,36",
    target:
      "Use a learned strategy or idea in a meaningfully different context where the answer is not cued by surface familiarity.",
    activity: {
      model: "weak",
      guided: "partial",
      retrieval: "weak",
      explain: "partial",
      novel: "direct",
    },
    evidence: {
      recognition: "weak",
      "free-recall": "weak",
      "familiar-performance": "partial",
      explanation: "partial",
      "novel-application": "direct",
    },
  },
};

export const EDUCATION_FIT_META: Record<
  EducationFit,
  { label: string; rgb: string; description: string }
> = {
  direct: {
    label: "direct",
    rgb: "52,211,153",
    description: "The task closely samples the stated performance.",
  },
  partial: {
    label: "partial",
    rgb: "251,191,36",
    description:
      "The task is related, but it samples only part of the stated performance.",
  },
  weak: {
    label: "weak",
    rgb: "148,163,184",
    description:
      "The task may still support learning, but it is a poor direct sample of this goal.",
  },
};

export function evaluateEducationAlignment(
  goalKey: EducationGoalKey,
  activityKey: EducationActivityKey,
  evidenceKey: EducationEvidenceKey
) {
  const goal = EDUCATION_GOALS[goalKey];
  const activityFit = goal.activity[activityKey];
  const evidenceFit = goal.evidence[evidenceKey];

  let nextMove =
    "Goal, practice opportunity, and evidence are directly aligned in this toy example. That still does not guarantee learning: prior knowledge, task quality, accessibility, feedback, motivation, time, and context still matter.";

  if (evidenceFit === "weak") {
    nextMove =
      "The evidence task does not directly ask learners to show the stated goal. Revise the evidence before interpreting a score as mastery.";
  } else if (activityFit === "weak") {
    nextMove =
      "The learning activity offers little direct practice of the stated goal. Add an opportunity to perform the target before the assessment.";
  } else if (evidenceFit === "partial" || activityFit === "partial") {
    nextMove =
      "The pieces are related but not fully aligned. Decide whether the goal is too broad, the activity is only preparatory, or the evidence samples only part of the intended performance.";
  }

  return { activityFit, evidenceFit, nextMove };
}

export const EDUCATION_EVIDENCE_CASES = [
  {
    id: "alignment",
    label: "Read an alignment claim",
    eyebrow: "Case conference 01 · evidence",
    prompt:
      "The goal asks learners to explain why seasons occur. Students study a diagram, but the final task only asks them to select the month when summer begins. What is the most precise conclusion?",
    options: [
      {
        id: "weak-sample",
        label:
          "The selected response may sample related knowledge, but it does not directly sample the requested causal explanation.",
      },
      {
        id: "mastered",
        label:
          "A correct month proves that the learner can explain the axial-tilt mechanism.",
      },
      {
        id: "diagram-bad",
        label: "Diagrams are therefore an ineffective learning activity.",
      },
    ],
    correctOptionId: "weak-sample",
    success:
      "Correct. Keep the quality of the activity separate from whether the evidence task directly samples the stated performance.",
    correction:
      "Compare the verb and conditions in the goal with what the final task actually requires the learner to produce.",
  },
  {
    id: "feedback",
    label: "Make feedback usable",
    eyebrow: "Case conference 02 · next attempt",
    prompt:
      "After a draft, a learner receives only “72%—try harder.” Which revision would make the response more usable as feedback?",
    options: [
      {
        id: "criteria-next-move",
        label:
          "Identify evidence from the draft relative to a criterion and name a manageable next move the learner can attempt.",
      },
      {
        id: "more-praise",
        label: "Replace the score with general praise and no task information.",
      },
      {
        id: "answer-key",
        label: "Give the finished answer so no revision is necessary.",
      },
    ],
    correctOptionId: "criteria-next-move",
    success:
      "Correct. Useful feedback connects present evidence, a goal or criterion, and an actionable next attempt.",
    correction:
      "Feedback is more than approval or a score. Ask what information helps the learner decide what to retain, revise, or try next.",
  },
  {
    id: "measurement",
    label: "Separate reliability and validity",
    eyebrow: "Case conference 03 · interpretation",
    prompt:
      "A quiz produces highly consistent scores across two administrations. What does that consistency establish by itself?",
    options: [
      {
        id: "reliability-evidence",
        label:
          "It is evidence about score reliability under those conditions, not proof that the intended learning construct was measured well.",
      },
      {
        id: "full-validity",
        label:
          "It proves every intended interpretation and use of the scores is valid.",
      },
      {
        id: "causal-effect",
        label: "It proves the instruction caused the scores.",
      },
    ],
    correctOptionId: "reliability-evidence",
    success:
      "Correct. Consistency matters, but a validity argument also asks what the task samples and whether the proposed interpretation and use are warranted.",
    correction:
      "Do not let repeatability carry claims about construct coverage, fairness, causation, or use that were not actually examined.",
  },
  {
    id: "access",
    label: "Remove an access barrier",
    eyebrow: "Case conference 04 · construct",
    prompt:
      "The goal is to compare two ecosystems using evidence. A learner cannot operate the drag-and-drop interface, but can make the same comparison with keyboard controls. What is the strongest design move?",
    options: [
      {
        id: "keyboard-path",
        label:
          "Provide the keyboard path and preserve the evidence-comparison target, then verify that both routes expose equivalent information and actions.",
      },
      {
        id: "lower-target",
        label: "Replace the comparison goal with a simpler recall question.",
      },
      {
        id: "exclude",
        label:
          "Keep one input method and treat inability to use it as inability to compare.",
      },
    ],
    correctOptionId: "keyboard-path",
    success:
      "Correct. When the input method is not the construct, an accessible route can remove a barrier without lowering the learning target.",
    correction:
      "Distinguish the intended learning performance from an incidental interface demand. Preserve the construct while widening access.",
  },
] as const;

export function isEducationEvidenceAnswerCorrect(
  caseId: string,
  optionId: string
): boolean {
  return (
    EDUCATION_EVIDENCE_CASES.find((item) => item.id === caseId)
      ?.correctOptionId === optionId
  );
}
