// lib/glossary-db.ts

// A central database for glossary terms
// This allows <GlossaryTerm> and the main /glossary page
// to pull from the same source of truth.

export const termCategories = {
  GENERAL: "General",
  MATH_FOUNDATIONS: "Math Foundations",
  NUMBER_SYSTEMS: "Number Systems",
  ALGEBRA: "Algebra", // NEW CATEGORY
};

// REWORKED: The structure is now { definition: string, category: string }
export const glossaryTerms = {
  // --- General Terms (from /glossary page) ---
  Abstraction: {
    definition:
      "Simplifying a system by focusing on the essential pattern or rule and ignoring unnecessary detail.",
    category: termCategories.GENERAL,
  },
  Model: {
    definition:
      "A representation that captures how something works, often expressed with diagrams, formulas, or code.",
    category: termCategories.GENERAL,
  },
  Heuristic: {
    definition:
      "A rule of thumb that guides problem solving when an exact method is impractical or unknown.",
    category: termCategories.GENERAL,
  },
  Decomposition: {
    definition:
      "Breaking a complex challenge into smaller parts that are easier to understand and solve.",
    category: termCategories.GENERAL,
  },
  Iteration: {
    definition: "Repeating a process with feedback so each pass improves on the last.",
    category: termCategories.GENERAL,
  },
  Proof: {
    definition:
      "A logical argument that demonstrates why a statement must be true in every valid case.",
    category: termCategories.MATH_FOUNDATIONS,
  },
  "Feedback Loop": {
    definition:
      "When the output of a system circles back as input, amplifying or dampening future behavior.",
    category: termCategories.GENERAL,
  },
  Symmetry: {
    definition:
      "A transformation that leaves an object unchanged — a shared idea in art, physics, and algorithms.",
    category: termCategories.GENERAL,
  },
  Optimization: {
    definition:
      "Finding the best solution under given constraints, whether that’s cost, time, or accuracy.",
    category: termCategories.GENERAL,
  },

  // --- Terms from num-ops page ---
  "Number System": {
    definition:
      "A collection of numbers (e.g., Natural, Integers, Rationals) defined by a specific set of rules and properties.",
    category: termCategories.NUMBER_SYSTEMS,
  },
  "Natural Numbers": {
    definition:
      "The 'counting numbers' starting from 1. (1, 2, 3, ...)",
    category: termCategories.NUMBER_SYSTEMS,
  },
  "Whole Numbers": {
    definition:
      "The set of Natural Numbers plus zero. (0, 1, 2, 3, ...)",
    category: termCategories.NUMBER_SYSTEMS,
  },
  Integers: {
    definition:
      "All Whole Numbers and their negative opposites. (...-2, -1, 0, 1, 2...)",
    category: termCategories.NUMBER_SYSTEMS,
  },
  "Rational Numbers": {
    definition:
      "Any number that can be written as a ratio (fraction) of two integers, like a/b, where b is not zero.",
    category: termCategories.NUMBER_SYSTEMS,
  },
  "Irrational Numbers": {
    definition:
      "Numbers that cannot be written as a simple fraction. Their decimals are non-repeating and non-terminating (e.g., π, √2).",
    category: termCategories.NUMBER_SYSTEMS,
  },
  "Real Numbers": {
    definition:
      "The set of all Rational and Irrational numbers. Represents every point on the number line.",
    category: termCategories.NUMBER_SYSTEMS,
  },
  "Imaginary Unit": {
    definition:
      "The number defined as i = √-1. It is the foundation of complex numbers.",
    category: termCategories.NUMBER_SYSTEMS,
  },
  "Complex Numbers": {
    definition:
      "Numbers with both a real and an imaginary part, written in the form 'a + bi'.",
    category: termCategories.NUMBER_SYSTEMS,
  },
  "Commutative Property": {
    definition:
      "The rule stating that order does not matter for addition or multiplication (e.g., a + b = b + a).",
    category: termCategories.MATH_FOUNDATIONS,
  },
  "Associative Property": {
    definition:
      "The rule stating that grouping does not matter for addition or multiplication (e.g., (a + b) + c = a + (b + c)).",
    category: termCategories.MATH_FOUNDATIONS,
  },
  "Identity Property": {
    definition:
      "A property involving a number that leaves another number unchanged (0 for addition, 1 for multiplication).",
    category: termCategories.MATH_FOUNDATIONS,
  },
  "Additive Identity": {
    definition: "The identity for addition, which is 0. (e.g., a + 0 = a).",
    category: termCategories.MATH_FOUNDATIONS,
  },
  "Multiplicative Identity": {
    definition:
      "The identity for multiplication, which is 1. (e.g., a × 1 = a).",
    category: termCategories.MATH_FOUNDATIONS,
  },
  "Inverse Property": {
    definition:
      "A property involving a number that 'cancels out' another, returning it to the identity (e.g., a + (-a) = 0).",
    category: termCategories.MATH_FOUNDATIONS,
  },
  "Additive Inverse": {
    definition:
      "A number's 'opposite' that, when added, results in 0. (e.g., 5 and -5).",
    category: termCategories.MATH_FOUNDATIONS,
  },
  "Multiplicative Inverse": {
    definition:
      "A number's 'reciprocal' that, when multiplied, results in 1. (e.g., 7 and 1/7).",
    category: termCategories.MATH_FOUNDATIONS,
  },
  "Distributive Property": {
    definition:
      "The rule that links multiplication and addition (e.g., a(b + c) = ab + ac).",
    category: termCategories.MATH_FOUNDATIONS,
  },
  "Order of Operations": {
    definition:
      "The standard sequence for calculations: Parentheses, Exponents, Multiply/Divide, Add/Subtract.",
    category: termCategories.MATH_FOUNDATIONS,
  },
  "Absolute Value": {
    definition:
      "A number's distance from zero on the number line, which is always positive or zero.",
    category: termCategories.MATH_FOUNDATIONS,
  },
  Factor: {
    definition:
      "A number that is multiplied to get a product. (e.g., factors of 12 are 1, 2, 3, 4, 6, 12).",
    category: termCategories.MATH_FOUNDATIONS,
  },
  Multiple: {
    definition:
      "The result of multiplying a number by an integer (e.g., multiples of 3 are 3, 6, 9...)",
    category: termCategories.MATH_FOUNDATIONS,
  },
  "Greatest Common Factor": {
    definition: "The largest factor that two or more numbers share.",
    category: termCategories.MATH_FOUNDATIONS,
  },
  "Least Common Multiple": {
    definition: "The smallest multiple that two or more numbers share.",
    category: termCategories.MATH_FOUNDATIONS,
  },
  Ratio: {
    definition:
      "A comparison of two quantities, often written as a fraction or with a colon (e.g., 3:4).",
    category: termCategories.MATH_FOUNDATIONS,
  },
  Rate: {
    definition:
      "A ratio that compares two quantities with different units (e.g., miles per hour).",
    category: termCategories.MATH_FOUNDATIONS,
  },
  Percentage: {
    definition:
      "A ratio where the second number is always 100. 'Per cent' means 'per hundred'.",
    category: termCategories.MATH_FOUNDATIONS,
  },

  // --- NEW: Terms from variables-expressions page ---
  Variable: {
    definition:
      "A symbol (usually a letter like x) that represents an unknown value or a value that can change.",
    category: termCategories.ALGEBRA,
  },
  Constant: {
    definition: "A fixed number whose value does not change (e.g., 5, -10, π).",
    category: termCategories.ALGEBRA,
  },
  Coefficient: {
    definition:
      "The number multiplied by a variable in an algebraic term (e.g., the '2' in 2x).",
    category: termCategories.ALGEBRA,
  },
  Expression: {
    definition:
      "A mathematical phrase made of variables, constants, and operations. It does not have an equals sign (e.g., 2x + 5).",
    category: termCategories.ALGEBRA,
  },
  Equation: {
    definition:
      "A mathematical statement that sets two expressions equal to each other using an equals sign (e.g., 2x + 5 = 11).",
    category: termCategories.ALGEBRA,
  },
  Evaluate: {
    definition:
      "To find the numerical value of an expression by replacing the variables with specific numbers.",
    category: termCategories.ALGEBRA,
  },
  Substitution: {
    definition:
      "The act of replacing a variable with a specific number (e.g., replacing 'x' with '3').",
    category: termCategories.ALGEBRA,
  },
};

export type GlossaryTermKey = keyof typeof glossaryTerms;