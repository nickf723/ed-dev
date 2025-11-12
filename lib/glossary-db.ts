// lib/glossary-db.ts

// A central database for glossary terms
// This allows <GlossaryTerm> and the main /glossary page
// to pull from the same source of truth.

export const glossaryTerms = {
  // --- General Terms (from /glossary page) ---
  "Abstraction":
    "Simplifying a system by focusing on the essential pattern or rule and ignoring unnecessary detail.",
  "Model":
    "A representation that captures how something works, often expressed with diagrams, formulas, or code.",
  "Heuristic":
    "A rule of thumb that guides problem solving when an exact method is impractical or unknown.",
  "Decomposition":
    "Breaking a complex challenge into smaller parts that are easier to understand and solve.",
  "Iteration": "Repeating a process with feedback so each pass improves on the last.",
  "Proof":
    "A logical argument that demonstrates why a statement must be true in every valid case.",
  "Feedback Loop":
    "When the output of a system circles back as input, amplifying or dampening future behavior.",
  "Symmetry":
    "A transformation that leaves an object unchanged — a shared idea in art, physics, and algorithms.",
  "Optimization":
    "Finding the best solution under given constraints, whether that’s cost, time, or accuracy.",

  // --- Terms from num-ops page ---
  "Number System":
    "A collection of numbers (e.g., Natural, Integers, Rationals) defined by a specific set of rules and properties.",
  "Natural Numbers":
    "The 'counting numbers' starting from 1. (1, 2, 3, ...)",
  "Whole Numbers":
    "The set of Natural Numbers plus zero. (0, 1, 2, 3, ...)",
  "Integers":
    "All Whole Numbers and their negative opposites. (...-2, -1, 0, 1, 2...)",
  "Rational Numbers":
    "Any number that can be written as a ratio (fraction) of two integers, like a/b, where b is not zero.",
  "Irrational Numbers":
    "Numbers that cannot be written as a simple fraction. Their decimals are non-repeating and non-terminating (e.g., π, √2).",
  "Real Numbers":
    "The set of all Rational and Irrational numbers. Represents every point on the number line.",
  "Imaginary Unit":
    "The number defined as i = √-1. It is the foundation of complex numbers.",
  "Complex Numbers":
    "Numbers with both a real and an imaginary part, written in the form 'a + bi'.",
  "Commutative Property":
    "The rule stating that order does not matter for addition or multiplication (e.g., a + b = b + a).",
  "Associative Property":
    "The rule stating that grouping does not matter for addition or multiplication (e.g., (a + b) + c = a + (b + c)).",
  "Identity Property":
    "A property involving a number that leaves another number unchanged (0 for addition, 1 for multiplication).",
  "Additive Identity": "The identity for addition, which is 0. (e.g., a + 0 = a).",
  "Multiplicative Identity":
    "The identity for multiplication, which is 1. (e.g., a × 1 = a).",
  "Inverse Property":
    "A property involving a number that 'cancels out' another, returning it to the identity (e.g., a + (-a) = 0).",
  "Additive Inverse":
    "A number's 'opposite' that, when added, results in 0. (e.g., 5 and -5).",
  "Multiplicative Inverse":
    "A number's 'reciprocal' that, when multiplied, results in 1. (e.g., 7 and 1/7).",
  "Distributive Property":
    "The rule that links multiplication and addition (e.g., a(b + c) = ab + ac).",
  "Order of Operations":
    "The standard sequence for calculations: Parentheses, Exponents, Multiply/Divide, Add/Subtract.",
  "Absolute Value":
    "A number's distance from zero on the number line, which is always positive or zero.",
  "Factor":
    "A number that is multiplied to get a product. (e.g., factors of 12 are 1, 2, 3, 4, 6, 12).",
  "Multiple":
    "The result of multiplying a number by an integer (e.g., multiples of 3 are 3, 6, 9...)",
  "Greatest Common Factor":
    "The largest factor that two or more numbers share.",
  "Least Common Multiple":
    "The smallest multiple that two or more numbers share.",
  "Ratio":
    "A comparison of two quantities, often written as a fraction or with a colon (e.g., 3:4).",
  "Rate":
    "A ratio that compares two quantities with different units (e.g., miles per hour).",
  "Percentage":
    "A ratio where the second number is always 100. 'Per cent' means 'per hundred'.",
};

export type GlossaryTermKey = keyof typeof glossaryTerms;