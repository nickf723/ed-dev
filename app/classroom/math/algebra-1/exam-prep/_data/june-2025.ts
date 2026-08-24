export const JUNE_2025_EXAM_URL =
  "https://www.nysedregents.org/algebraone/625/algone-62025-exam.pdf";

export const JUNE_2025_SCORING_URL =
  "https://www.nysedregents.org/algebraone/625/algone-62025-sk.pdf";

export type GuidedExamItem = {
  number: number;
  sourcePage: number;
  skill: string;
  standard: string;
  prompt: string;
  displayMath?: string;
  table?: readonly (readonly [string, string])[];
  options: readonly {
    id: string;
    label?: string;
    math?: string;
  }[];
  answer: string;
  hint: string;
  reasoning: readonly string[];
  takeaway: string;
  reviewHref: string;
};

export const JUNE_2025_GUIDED_ITEMS: readonly GuidedExamItem[] = [
  {
    number: 5,
    sourcePage: 3,
    skill: "Read polynomial structure",
    standard: "AI-A.SSE.1a",
    prompt:
      "The released item asks for the polynomial whose degree is 3 and whose leading coefficient is 2.",
    options: [
      { id: "1", math: "2x^2+3x+1" },
      { id: "2", math: "6x^3+3x^2-2x" },
      { id: "3", math: "3x^2+2x+2" },
      { id: "4", math: "2x^3+x^2+4x" },
    ],
    answer: "4",
    hint:
      "Find the greatest exponent first. Only then inspect the coefficient attached to that term.",
    reasoning: [
      "Degree 3 means the greatest exponent must be 3.",
      "That narrows the choices to the polynomials containing an x³ term.",
      "The leading coefficient is the number multiplying that highest-degree term. Only choice 4 begins with 2x³.",
    ],
    takeaway: "Read degree and leading coefficient from the same leading term.",
    reviewHref:
      "/classroom/math/algebra-1/unit-1/expressions-variables",
  },
  {
    number: 7,
    sourcePage: 4,
    skill: "Average rate of change",
    standard: "AI-N.Q.1",
    prompt:
      "A tomato plant's average height is recorded by week. The released item asks for its average rate of change from week 4 through week 12.",
    table: [
      ["Week, x", "Height, h(x)"],
      ["4", "12"],
      ["12", "60"],
    ],
    options: [
      { id: "1", label: "6 inches per week" },
      { id: "2", label: "8 inches per week" },
      { id: "3", label: "48 inches per week" },
      { id: "4", label: "58 inches per week" },
    ],
    answer: "1",
    hint:
      "Average rate compares change in output with change in input—not either change by itself.",
    reasoning: [
      "The height changes from 12 inches to 60 inches, a change of 48.",
      "The time changes from week 4 to week 12, a change of 8 weeks.",
      "Divide 48 by 8. The plant averages 6 inches per week over that interval.",
    ],
    takeaway: "Average rate of change is output change divided by input change.",
    reviewHref:
      "/classroom/math/algebra-1/unit-1/variables-changing-quantities",
  },
  {
    number: 8,
    sourcePage: 4,
    skill: "Justify an equation step",
    standard: "AI-A.REI.1a",
    prompt:
      "The released item asks which property justifies rewriting the given equation as the next equation.",
    displayMath: "x^2+5x=3x+3\quad\longrightarrow\quad x^2+2x-3=0",
    options: [
      { id: "1", label: "Zero product property" },
      { id: "2", label: "Commutative property" },
      { id: "3", label: "Distributive property" },
      { id: "4", label: "Subtraction property of equality" },
    ],
    answer: "4",
    hint:
      "Track what was removed from both sides instead of focusing only on the final arrangement.",
    reasoning: [
      "Subtract 3x from both sides to collect the x-terms on the left.",
      "Then subtract 3 from both sides so the right side becomes zero.",
      "Both moves preserve equality because the same quantity is subtracted from each side.",
    ],
    takeaway: "A legal equation step names the operation applied equally to both sides.",
    reviewHref:
      "/classroom/math/algebra-1/unit-1/algebraic-properties",
  },
  {
    number: 17,
    sourcePage: 7,
    skill: "Translate a situation into an equation",
    standard: "AI-N.Q.1",
    prompt:
      "Tim and Jack's ages total 44. Jack's age is x, and Tim is 4 less than 7 times Jack's age. Which equation models the situation?",
    options: [
      { id: "1", math: "(7x-4)+x=44" },
      { id: "2", math: "(4-7x)+x=44" },
      { id: "3", math: "7x-4=44" },
      { id: "4", math: "4-7x=44" },
    ],
    answer: "1",
    hint:
      "Build each person's age separately, then use the statement that their ages have a sum of 44.",
    reasoning: [
      "Jack's age is x.",
      "Tim's age is 4 less than 7x, so it is 7x − 4.",
      "Their sum is 44, so add the two age expressions and set the result equal to 44.",
    ],
    takeaway: "Translate one quantity at a time before connecting them with the stated relationship.",
    reviewHref:
      "/classroom/math/algebra-1/unit-1/two-step-equations",
  },
] as const;
