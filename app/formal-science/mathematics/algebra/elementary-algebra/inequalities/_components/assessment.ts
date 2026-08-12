import type { AssessmentQuestion } from "@/app/_components/Assessment";

export const inequalitiesQuiz: AssessmentQuestion[] = [
  {
    id: "ineq-symbol-behavior",
    type: "matching",
    prompt: "Match each inequality symbol to the region it creates.",
    leftItems: ["<", "≤", ">", "≥"],
    rightItems: [
      "right · boundary included",
      "left · boundary excluded",
      "right · boundary excluded",
      "left · boundary included",
    ],
    correctPairs: {
      "<": "left · boundary excluded",
      "≤": "left · boundary included",
      ">": "right · boundary excluded",
      "≥": "right · boundary included",
    },
    explanation:
      "The symbol tells you both direction and inclusion: < and ≤ point left, > and ≥ point right; the equality bar means the boundary is included.",
  },
  {
    id: "ineq-negative-short",
    type: "short_answer",
    prompt: "Solve −2x < 6. Type the isolated inequality for x.",
    acceptableAnswers: ["x > -3", "x>-3", "x > −3", "x>−3"],
    explanation:
      "Dividing both sides by −2 gives −3, and dividing an inequality by a negative reverses < into >.",
  },
  {
    id: "ineq-many-solutions",
    type: "multiselect",
    prompt: "Which values satisfy x < 3?",
    options: ["−2", "2", "3", "4"],
    correctAnswers: ["−2", "2"],
    explanation:
      "Every value smaller than 3 works. The boundary 3 is excluded because the inequality is strict, and 4 lies on the wrong side.",
  },
  {
    id: "ineq-interval",
    type: "mcq",
    prompt: "Which interval describes x ≥ 4?",
    options: ["[4, ∞)", "(4, ∞)", "(−∞, 4]"],
    correctAnswer: "[4, ∞)",
    explanation:
      "≥ extends to the right and includes 4, so the finite endpoint gets a bracket while infinity always gets a parenthesis.",
  },
];
