import { VocabTerm } from '../_registry';

export const mathVocab: VocabTerm[] = [
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
