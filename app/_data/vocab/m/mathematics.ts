import { VocabTerm } from '../_registry';

export const mathCoreVocab: VocabTerm[] = [
    {
        id: "math-axiom",
        word: "Axiom",
        definition: "A statement or proposition which is regarded as being established, accepted, or self-evidently true, serving as a starting point for further reasoning.",
        domain: "Mathematics",
        tags: ["Foundations", "Logic"],
        relatedTerms: ["math-theorem"],
        isAdult: false
    },
    {
        id: "math-theorem",
        word: "Theorem",
        definition: "A general proposition that has been proven true based on previously established statements, such as other theorems and accepted axioms.",
        domain: "Mathematics",
        tags: ["Foundations", "Proofs"],
        relatedTerms: ["math-axiom", "math-lemma"],
        isAdult: false
    },
    {
        id: "math-variable",
        word: "Variable",
        definition: "A symbol (commonly an alphabetic character) representing a mathematical object or a quantity that may change or take on different values.",
        domain: "Mathematics",
        tags: ["Algebra"],
        isAdult: false
    },
    {
        id: "math-function",
        word: "Function",
        definition: "A relation from a set of inputs to a set of possible outputs where each input is related to exactly one output.",
        domain: "Mathematics",
        tags: ["Algebra", "Calculus"],
        isAdult: false
    },
    {
        id: "math-derivative",
        word: "Derivative",
        definition: "The rate of change of a function with respect to a variable. Geometrically, the slope of the tangent line to the function's graph.",
        domain: "Mathematics",
        tags: ["Calculus", "Change"],
        relatedTerms: ["math-integral"],
        isAdult: false
    },
    {
        id: "math-integral",
        word: "Integral",
        definition: "A mathematical object that can be interpreted as an area or a generalization of area, representing the accumulation of quantities.",
        domain: "Mathematics",
        tags: ["Calculus", "Area"],
        relatedTerms: ["math-derivative"],
        isAdult: false
    },
    {
        id: "math-vector",
        word: "Vector",
        definition: "A quantity that has both magnitude and direction, often represented by an arrow in geometric space.",
        domain: "Mathematics",
        tags: ["Geometry", "Linear Algebra"],
        relatedTerms: ["math-matrix", "math-scalar"],
        isAdult: false
    },
    {
        id: "math-matrix",
        word: "Matrix",
        definition: "A rectangular array or table of numbers, symbols, or expressions, arranged in rows and columns, used to represent linear maps.",
        domain: "Mathematics",
        tags: ["Linear Algebra", "Data"],
        relatedTerms: ["math-vector"],
        isAdult: false
    },
    {
        id: "math-probability",
        word: "Probability",
        definition: "A numerical description of how likely an event is to occur or how likely it is that a proposition is true.",
        domain: "Mathematics",
        tags: ["Statistics", "Chance"],
        isAdult: false
    },
    {
        id: "math-algorithm",
        word: "Algorithm",
        definition: "A finite sequence of rigorous instructions, typically used to solve a class of specific problems or to perform a computation.",
        domain: "Mathematics",
        tags: ["Discrete Math", "Computation"],
        isAdult: false
    }
];
