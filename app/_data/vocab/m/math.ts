import { VocabTerm } from '../_registry';

export const mathVocab: VocabTerm[] = [
    {
        id: 'math-01',
        word: 'Axiom',
        definition: 'A statement or proposition which is regarded as being established, accepted, or self-evidently true.',
        domain: 'Mathematics',
        tags: ['Logic', 'Foundation'],
        relatedTerms: ['Theorem'],
        isAdult: false
    },
    {
        id: 'math-02',
        word: 'Symmetry',
        definition: 'Invariants under transformation, forming the foundational concept behind advanced algebraic structures.',
        domain: 'Mathematics',
        tags: ['Group Theory', 'Geometry'],
        relatedTerms: ['Isomorphism'],
        isAdult: false
    },
    {
        id: "math-derivative",
        word: "Derivative",
        definition: "The instantaneous rate of change of a function with respect to one of its variables. Geometrically, the slope of the tangent line.",
        domain: "Calculus",
        tags: ["Calculus", "Rate of Change", "Functions"],
        relatedTerms: ["math-integral", "math-limit"],
        isAdult: false
    },
    {
        id: "math-integral",
        word: "Integral",
        definition: "The mathematical operator that calculates the area under a curve. It is the fundamental object of accumulation.",
        domain: "Calculus",
        tags: ["Calculus", "Accumulation", "Area"],
        relatedTerms: ["math-derivative", "math-limit"],
        isAdult: false
    },
    {
        id: "math-limit",
        word: "Limit",
        definition: "The value that a function (or sequence) approaches as the input (or index) approaches some value.",
        domain: "Calculus",
        tags: ["Calculus", "Foundations", "Approximation"],
        isAdult: false
    },
    {
        id: "math-diff-eq",
        word: "Differential Equation",
        definition: "An equation that relates one or more unknown functions and their derivatives, used to model dynamic systems over time.",
        domain: "Calculus",
        tags: ["Calculus", "Systems", "Modeling"],
        relatedTerms: ["math-derivative"],
        isAdult: false
    }
];