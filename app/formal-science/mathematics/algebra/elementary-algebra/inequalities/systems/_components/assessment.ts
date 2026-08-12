import type { AssessmentQuestion } from "@/app/_components/Assessment";

export const systemsInequalitiesQuiz: AssessmentQuestion[] = [
  {
    id: "systems-sign-behavior",
    type: "matching",
    prompt: "Match each inequality sign to the half-plane it creates in y-form.",
    leftItems: ["<", "≤", ">", "≥"],
    rightItems: [
      "above · solid line",
      "below · dashed line",
      "above · dashed line",
      "below · solid line",
    ],
    correctPairs: {
      "<": "below · dashed line",
      "≤": "below · solid line",
      ">": "above · dashed line",
      "≥": "above · solid line",
    },
    explanation:
      "Less-than shades below and greater-than shades above. The equality bar includes the boundary, so ≤ and ≥ use solid lines.",
  },
  {
    id: "systems-boundary-line",
    type: "mcq",
    prompt: "What is the boundary line for y > 2x + 1?",
    options: ["y = 2x + 1", "y > 2x + 1", "x = 2y + 1"],
    correctAnswer: "y = 2x + 1",
    explanation:
      "The boundary comes from replacing the inequality sign with equality. The > still controls which side is shaded and tells us the boundary itself is excluded.",
  },
  {
    id: "systems-shared-points",
    type: "multiselect",
    prompt: "For y ≥ 1 and y < 4, which points satisfy both constraints?",
    options: ["(0, 0)", "(0, 1)", "(2, 3)", "(1, 4)"],
    correctAnswers: ["(0, 1)", "(2, 3)"],
    explanation:
      "A point must have y at least 1 and still below 4. The x-coordinate does not matter for these horizontal boundaries.",
  },
  {
    id: "systems-overlap-meaning",
    type: "tf",
    prompt: "A point in the solution of a system of inequalities must satisfy every inequality in the system.",
    correctAnswer: true,
    explanation:
      "The solution region is the intersection of the individual half-planes, so every surviving point passes every constraint.",
  },
];
