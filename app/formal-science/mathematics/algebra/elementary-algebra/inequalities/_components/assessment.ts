import type { AssessmentQuestion } from "@/app/_components/Assessment";

export const inequalitiesQuiz: AssessmentQuestion[] = [
  {
    id: "ineq-region",
    type: "mcq",
    prompt: "Which description matches x ≤ −2?",
    options: [
      "Shade left of −2 and include the endpoint",
      "Shade left of −2 and exclude the endpoint",
      "Shade right of −2 and include the endpoint",
    ],
    correctAnswer: "Shade left of −2 and include the endpoint",
    explanation:
      "≤ means values less than −2 plus the boundary itself, so the region extends left and the endpoint is closed.",
  },
  {
    id: "ineq-negative",
    type: "mcq",
    prompt: "Solve −2x < 6.",
    options: ["x < −3", "x > −3", "x > 3"],
    correctAnswer: "x > −3",
    explanation:
      "Dividing both sides by −2 gives −3, and dividing an inequality by a negative reverses < into >.",
  },
  {
    id: "ineq-membership",
    type: "tf",
    prompt: "x = 4 satisfies x > 1.",
    correctAnswer: true,
    explanation:
      "Substitution gives 4 > 1, which is true, so 4 belongs to the solution set.",
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
];
