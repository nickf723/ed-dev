import type {
  Course,
  CourseLesson,
  CourseUnit,
  StandardsFramework,
} from "@/lib/courses/types";

const NYS_MATH_STANDARDS_URL =
  "https://www.nysed.gov/sites/default/files/programs/standards-instruction/nys-next-generation-mathematics-p-12-standards.pdf";

const NYS_ALGEBRA_I_URL =
  "https://www.nysed.gov/state-assessment/algebra-i";

export const NYS_ALGEBRA_I_FRAMEWORK: StandardsFramework = {
  id: "nys-next-generation-mathematics-algebra-i",
  label: "NYS Next Generation Mathematics Learning Standards · Algebra I",
  issuer: "New York State Education Department",
  sourceUrl: NYS_MATH_STANDARDS_URL,
  courseSourceUrl: NYS_ALGEBRA_I_URL,
  assessmentNote:
    "New York's Next Generation Algebra I Regents examination has been in use since June 2024.",
  independenceNote:
    "Education Station is independently authored and standards-aligned. NYSED publishes learning standards, not this curriculum or its lesson order.",
  standards: [
    {
      code: "AI-A.SSE.1a",
      label: "Seeing Structure in Expressions",
      summary:
        "Write a polynomial in standard form and identify its terms, coefficients, degree, leading coefficient, and constant term.",
      sourcePage: 110,
    },
    {
      code: "AI-A.SSE.1b",
      label: "Seeing Structure in Expressions",
      summary:
        "Interpret an expression by treating one or more of its parts as a single mathematical object.",
      sourcePage: 110,
    },
    {
      code: "AI-A.SSE.2",
      label: "Equivalent Expressions",
      summary:
        "Use the visible structure of an expression to choose a valid equivalent rewrite.",
      sourcePage: 110,
    },
    {
      code: "AI-A.REI.1a",
      label: "Reasoning with Equations",
      summary:
        "Explain why each step in solving an equation follows from the equality established in the preceding step.",
      sourcePage: 114,
    },
    {
      code: "AI-A.REI.3",
      label: "Equations and Inequalities in One Variable",
      summary:
        "Solve linear equations and inequalities in one variable, including cases with literal coefficients.",
      sourcePage: 115,
    },
    {
      code: "AI-N.RN.3",
      label: "The Real Number System",
      summary:
        "Use properties and operations to reason about rational and irrational numbers and their different forms.",
      sourcePage: 109,
    },
    {
      code: "MP.3",
      label: "Mathematical Practice",
      summary:
        "Construct a viable mathematical argument and evaluate the reasoning used in another argument.",
      sourcePage: 7,
    },
    {
      code: "MP.6",
      label: "Mathematical Practice",
      summary: "Use definitions, symbols, units, and calculations precisely.",
      sourcePage: 8,
    },
    {
      code: "MP.7",
      label: "Mathematical Practice",
      summary: "Look for and make use of mathematical structure.",
      sourcePage: 8,
    },
  ],
};

const UNIT_ONE_BASE = "/classroom/math/algebra-1/unit-1";

const lessons: readonly CourseLesson[] = [
  {
    id: "nys.algebra-1.unit-1.expressions-variables",
    slug: "expressions-variables",
    title: "Expressions & Variables",
    summary:
      "Read signed terms, coefficients, variables, constants, and exponents before changing an expression.",
    outcome:
      "Identify the structure of a polynomial expression and combine only terms with matching variable parts.",
    durationMinutes: 42,
    status: "active",
    href: `${UNIT_ONE_BASE}/expressions-variables`,
    knowledgeNodeId:
      "formal.mathematics.algebra.elementary-algebra.fundamentals.expressions-variables",
    alignment: [
      {
        code: "AI-A.SSE.1a",
        emphasis: "primary",
        note: "Names and interprets the visible parts of a polynomial.",
      },
      {
        code: "AI-A.SSE.1b",
        emphasis: "supporting",
        note: "Builds the habit of seeing a term or variable part as one object.",
      },
      {
        code: "MP.7",
        emphasis: "primary",
        note: "Uses structure to decide which terms can combine.",
      },
    ],
    teacher: {
      warmUp: "Ask students to mark every top-level term in 4x² − 3x + 8 without simplifying.",
      misconception:
        "Students may detach a minus sign from its term or combine terms whose exponents differ.",
      exitTicket: "Explain why 5x² and −2x² combine but 5x² and −2x do not.",
    },
  },
  {
    id: "nys.algebra-1.unit-1.one-step-equations",
    slug: "one-step-equations",
    title: "Solving One-Step Equations",
    summary:
      "Use inverse operations on both sides of an equation while keeping equality visible.",
    outcome:
      "Solve one-step equations and justify the balance-preserving operation used in each solution.",
    durationMinutes: 40,
    status: "active",
    href: `${UNIT_ONE_BASE}/one-step-equations`,
    knowledgeNodeId:
      "formal.mathematics.algebra.elementary-algebra.fundamentals.one-step-equations",
    alignment: [
      {
        code: "AI-A.REI.1a",
        emphasis: "primary",
        note: "Connects every solving move to the equality in the preceding state.",
      },
      {
        code: "AI-A.REI.3",
        emphasis: "primary",
        note: "Introduces linear-equation fluency through one-operation cases.",
      },
      {
        code: "MP.6",
        emphasis: "supporting",
        note: "Requires precise names for operations and solution checks.",
      },
    ],
    teacher: {
      warmUp: "Show 8 + 6 = 14 and ask which operation isolates the 8 without changing the truth of the statement.",
      misconception:
        "Students may describe a term as moving across the equals sign instead of naming the operation applied to both sides.",
      exitTicket: "Solve x/4 = 7 and explain why multiplying both sides by 4 preserves equality.",
    },
  },
  {
    id: "nys.algebra-1.unit-1.two-step-equations",
    slug: "two-step-equations",
    title: "Solving Two-Step Equations",
    summary:
      "Undo the outside layer and then the inside layer while preserving the same solution set.",
    outcome:
      "Solve linear equations of the form ax + b = c and explain why each equivalent step is valid.",
    durationMinutes: 45,
    status: "active",
    href: `${UNIT_ONE_BASE}/two-step-equations`,
    knowledgeNodeId:
      "formal.mathematics.algebra.elementary-algebra.fundamentals.two-step-equations",
    alignment: [
      {
        code: "AI-A.REI.1a",
        emphasis: "primary",
        note: "Makes the state-to-move-to-state reasoning explicit.",
      },
      {
        code: "AI-A.REI.3",
        emphasis: "primary",
        note: "Develops fluency with multi-operation linear equations.",
      },
      {
        code: "MP.6",
        emphasis: "supporting",
        note: "Distinguishes legal transformations from merely convenient ones.",
      },
    ],
    teacher: {
      warmUp: "Build 3x + 5 from x, then ask students which layer was added last.",
      misconception:
        "Students may divide only one term or believe the conventional shortest route is the only legal route.",
      exitTicket: "Solve 4x − 7 = 21 and annotate the reason for both transformation steps.",
    },
  },
  {
    id: "nys.algebra-1.unit-1.algebraic-properties",
    slug: "algebraic-properties",
    title: "Algebraic Properties",
    summary:
      "Use commutative, associative, distributive, identity, and inverse properties as precise rewrite permissions.",
    outcome:
      "Name the property that justifies an equivalent rewrite and identify when a proposed rewrite is invalid.",
    durationMinutes: 44,
    status: "active",
    href: `${UNIT_ONE_BASE}/algebraic-properties`,
    knowledgeNodeId:
      "formal.mathematics.algebra.elementary-algebra.fundamentals.algebraic-properties",
    alignment: [
      {
        code: "AI-A.SSE.2",
        emphasis: "primary",
        note: "Uses expression structure to choose and defend equivalent forms.",
      },
      {
        code: "AI-A.REI.1a",
        emphasis: "supporting",
        note: "Connects valid equation steps to general properties of equality and operations.",
      },
      {
        code: "MP.3",
        emphasis: "primary",
        note: "Asks learners to justify or reject a proposed symbolic argument.",
      },
    ],
    teacher: {
      warmUp: "Compare 3 + 8 and 8 + 3, then compare 3 − 8 and 8 − 3. Ask what changed and what did not.",
      misconception:
        "Students may treat property names as labels to memorize instead of conditions that permit specific changes.",
      exitTicket: "Justify 5(y − 2) = 5y − 10 and explain why y − 2 cannot become 2 − y.",
    },
  },
  {
    id: "nys.algebra-1.unit-1.number-systems",
    slug: "number-systems",
    title: "The Real Number System",
    summary:
      "Organize natural, integer, rational, irrational, and real numbers by containment and operation.",
    outcome:
      "Classify real numbers precisely and reason about how rational and irrational values behave under operations.",
    durationMinutes: 42,
    status: "active",
    href: `${UNIT_ONE_BASE}/number-systems`,
    knowledgeNodeId:
      "formal.mathematics.algebra.elementary-algebra.fundamentals.number-systems",
    alignment: [
      {
        code: "AI-N.RN.3",
        emphasis: "primary",
        note: "Introduces the forms and operation boundaries of rational and irrational numbers.",
      },
      {
        code: "MP.7",
        emphasis: "supporting",
        note: "Uses nested-set structure to organize number classifications.",
      },
    ],
    teacher: {
      warmUp: "Sort 7, −4, 3/5, 0.272727…, and √2 into the most specific familiar number set.",
      misconception:
        "Students may assume a number belongs to only one set or that any operation on two irrational numbers stays irrational.",
      exitTicket: "Give two irrational numbers whose sum is rational and explain why this does not contradict their classification.",
    },
  },
] as const;

export const NYS_ALGEBRA_I_UNIT_ONE: CourseUnit = {
  id: "nys.algebra-1.unit-1",
  slug: "unit-1",
  number: 1,
  title: "Foundations of Algebra",
  summary:
    "Read algebraic structure, preserve equality, justify equivalent rewrites, and identify the number system in which the work takes place.",
  essentialQuestion: "How can symbols change form without changing meaning?",
  status: "active",
  href: UNIT_ONE_BASE,
  pacing: "5 class periods · approximately 40–45 minutes each",
  prerequisites: [
    "Whole-number operations and signed-number fluency",
    "Fraction and decimal representations",
    "Order of operations with numerical expressions",
  ],
  lessons,
  teacherGuide: {
    openingRoutine:
      "Begin each lesson with one visible mathematical object and ask students to name what may change and what must remain invariant.",
    evidencePlan: [
      "Use the guided instrument for immediate misconception feedback.",
      "Collect each lesson's transfer check as evidence of the learner's mental model.",
      "Use the exit ticket to decide whether the next class begins with reteaching, comparison, or extension.",
    ],
    differentiation: [
      "Keep the canonical example visible while students attempt a fresh case.",
      "Let students explain a valid move in words before requiring formal property names.",
      "For extension, ask for a second legal solution path and a comparison of efficiency.",
    ],
  },
};

export const NYS_ALGEBRA_I_COURSE: Course = {
  id: "nys.algebra-1",
  slug: "algebra-1",
  subjectId: "math",
  title: "New York Algebra I",
  shortTitle: "Algebra I",
  description:
    "A classroom-ready Algebra I sequence built around the current New York State Next Generation standards and the Regents course expectations.",
  gradeBand: "High school · Regents course",
  status: "active",
  href: "/classroom/math/algebra-1",
  framework: NYS_ALGEBRA_I_FRAMEWORK,
  units: [NYS_ALGEBRA_I_UNIT_ONE],
};
