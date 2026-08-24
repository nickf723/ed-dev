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
    number: 3,
    sourcePage: 2,
    skill: "Recognize exponential change",
    standard: "MP.7",
    prompt:
      "Which scenario represents an exponential relationship?",
    options: [
      { id: "1", label: "Lose 1 pound each week" },
      { id: "2", label: "Raise a grade by 5 points each quarter" },
      { id: "3", label: "Reduce spending by $50 each month" },
      { id: "4", label: "Grow a business by 5% each month" },
    ],
    answer: "4",
    hint:
      "Separate repeated addition or subtraction from repeated multiplication by a percent factor.",
    reasoning: [
      "A fixed number added or removed each interval produces additive, linear change.",
      "A fixed percent acts on the current amount, so the amount added changes as the total changes.",
      "Growing by 5% each month repeatedly multiplies the current value by 1.05, making choice 4 exponential.",
    ],
    takeaway: "Fixed amount means additive change; fixed percent means multiplicative change.",
    reviewHref:
      "/formal-science/mathematics/algebra/elementary-algebra/exponents",
  },
  {
    number: 5,
    sourcePage: 3,
    skill: "Read polynomial structure",
    standard: "AI-A.SSE.1a",
    prompt:
      "Which polynomial has a degree of 3 and a leading coefficient of 2?",
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
    number: 6,
    sourcePage: 3,
    skill: "Subtract polynomial expressions",
    standard: "AI-A.SSE.2",
    prompt: "Which expression is equivalent to the subtraction shown?",
    displayMath: "(-3x^2+9)-(7x^2-5x+4)",
    options: [
      { id: "1", math: "-10x^2+5x+5" },
      { id: "2", math: "-10x^2+5x+13" },
      { id: "3", math: "-10x^2-5x+5" },
      { id: "4", math: "-10x^2-5x+13" },
    ],
    answer: "1",
    hint:
      "The subtraction sign changes every term inside the second parentheses.",
    reasoning: [
      "Distribute the subtraction across all three terms in the second polynomial.",
      "The expression becomes −3x² + 9 − 7x² + 5x − 4.",
      "Combine matching terms to get −10x² + 5x + 5, which is choice 1.",
    ],
    takeaway: "Subtracting a polynomial means adding the opposite of every term.",
    reviewHref:
      "/classroom/math/algebra-1/unit-1/algebraic-properties",
  },
  {
    number: 7,
    sourcePage: 4,
    skill: "Average rate of change",
    standard: "AI-N.Q.1",
    prompt:
      "Between weeks 4 and 12, what is the tomato plant’s average rate of change in inches per week?",
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
    prompt: "Which property justifies this step?",
    displayMath: "x^2+5x=3x+3\\quad\\longrightarrow\\quad x^2+2x-3=0",
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
  {
    number: 20,
    sourcePage: 8,
    skill: "Rearrange a formula",
    standard: "AI-A.REI.3",
    prompt:
      "Kinetic energy is given by the formula below. Which equation expresses mass, m, in terms of K and v?",
    displayMath: "K=\\frac{1}{2}mv^2",
    options: [
      { id: "1", math: "m=\\frac{2K}{v^2}" },
      { id: "2", math: "m=2Kv^2" },
      { id: "3", math: "m=\\frac{v^2}{2K}" },
      { id: "4", math: "m=\\frac{2v^2}{K}" },
    ],
    answer: "1",
    hint:
      "Undo the factor of one-half first, then undo the multiplication by v².",
    reasoning: [
      "Multiply both sides by 2 so the one-half no longer scales the mass term: 2K = mv².",
      "Mass is still multiplied by v², so divide both sides by v².",
      "This isolates m as 2K divided by v², which is choice 1.",
    ],
    takeaway: "To isolate a formula’s target, undo its operations in reverse order on both sides.",
    reviewHref:
      "/classroom/math/algebra-1/unit-1/two-step-equations",
  },
  {
    number: 24,
    sourcePage: 10,
    skill: "Convert a compound rate",
    standard: "AI-N.Q.1",
    prompt:
      "A train travels 49 miles per hour, and each railroad car is 56 feet long. Which calculation gives the number of cars passing per minute?",
    displayMath: "49\\;\\frac{\\text{miles}}{\\text{hour}}\\qquad 56\\;\\frac{\\text{feet}}{\\text{car}}",
    options: [
      { id: "1", math: "49\\times56\\times5280\\div60" },
      { id: "2", math: "49\\times5280\\times60\\div56" },
      { id: "3", math: "49\\times5280\\div60\\div56" },
      { id: "4", math: "49\\div5280\\times60\\times56" },
    ],
    answer: "3",
    hint:
      "Choose operations that turn miles into feet, hours into minutes, and feet into railroad cars.",
    reasoning: [
      "Multiply by 5280 to convert each mile traveled into feet traveled.",
      "Divide by 60 to spread one hour of travel across its 60 minutes.",
      "Divide the feet passing each minute by 56 feet per car. This produces choice 3, measured in cars per minute.",
    ],
    takeaway: "A conversion chain is correct when unwanted units cancel and the requested unit survives.",
    reviewHref:
      "/classroom/math/algebra-1/unit-1/variables-changing-quantities",
  },
] as const;
