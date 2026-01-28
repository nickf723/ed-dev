import { GlossaryDatabase, termCategories } from "./types";

export const formalTerms: GlossaryDatabase = {
  // --- MATH FOUNDATIONS ---
  "Proof": {
    definition: "A logical argument that demonstrates why a statement must be true in every valid case.",
    category: termCategories.MATH,
    href: "/formal-science/axioms"
  },
  "Axiom": {
    definition: "A statement or proposition that is regarded as being established, accepted, or self-evidently true.",
    category: termCategories.MATH,
    href: "/formal-science/axioms"
  },
  
  // --- ALGEBRA ---
  "Variable": {
    definition: "A symbol (usually a letter like x) that represents an unknown value or a value that can change.",
    category: termCategories.ALGEBRA,
    href: "/formal-science/mathematics/algebra/pre-algebra/variables-expressions"
  },
  "Quadratic Equation": {
    definition: "A polynomial equation of degree 2, usually written as ax² + bx + c = 0.",
    category: termCategories.ALGEBRA,
    href: "/formal-science/mathematics/algebra/elementary-algebra/quadratic-equations"
  },
  "Group Theory": {
    definition: "The study of algebraic structures known as groups, which are sets equipped with an operation that satisfies certain axioms.",
    category: termCategories.ALGEBRA,
    href: "/formal-science/mathematics/algebra/abstract-algebra/group-theory"
  },

  // --- CALCULUS ---
  "Derivative": {
    definition: "A measure of how a function changes as its input changes. Geometrically, the slope of the tangent line.",
    category: termCategories.CALCULUS,
    href: "/formal-science/mathematics/calculus"
  },
  "Integral": {
    definition: "Assigns numbers to functions in a way that describes displacement, area, volume, and other concepts that arise by combining infinitesimal data.",
    category: termCategories.CALCULUS,
    href: "/formal-science/mathematics/calculus/integral-calculus"
  },
  "Riemann Sum": {
    definition: "A method for approximating the total area underneath a curve on a graph, otherwise known as an integral.",
    category: termCategories.CALCULUS,
    href: "/formal-science/mathematics/calculus/RiemannBackground"
  },

  // --- COMPUTER SCIENCE ---
  "Algorithm": {
    definition: "A precise, step-by-step sequence of instructions to solve a problem or perform a computation.",
    category: termCategories.COMPUTER_SCIENCE,
    href: "/formal-science/computer-science/software/fundamentals"
  },
  "Big O Notation": {
    definition: "A mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity.",
    category: termCategories.COMPUTER_SCIENCE,
    href: "/applied-science/engineering/software"
  },
  "Turing Machine": {
    definition: "A mathematical model of computation that defines an abstract machine which manipulates symbols on a strip of tape according to a table of rules.",
    category: termCategories.COMPUTER_SCIENCE,
    href: "/formal-science/computer-science"
  }
};