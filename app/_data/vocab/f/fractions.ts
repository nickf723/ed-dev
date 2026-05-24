import { VocabTerm } from '../_registry';

export const fractionsVocab: VocabTerm[] = [
    {
        id: "frac-improper",
        word: "Improper Fraction",
        definition: "A fraction where the numerator (top number) is greater than or equal to the denominator (bottom number), representing a value greater than 1.",
        domain: "Pre-Algebra",
        tags: ["Types", "Core"],
        isAdult: false
    },
    {
        id: "frac-mixed",
        word: "Mixed Number",
        definition: "A number consisting of a whole number and a proper fraction (e.g., 1 ½). It is another way to write an improper fraction.",
        domain: "Pre-Algebra",
        tags: ["Types", "Numbers"],
        isAdult: false
    },
    {
        id: "frac-lcd",
        word: "Lowest Common Denominator (LCD)",
        definition: "The smallest common multiple of the denominators of two or more fractions. Required for adding and subtracting fractions.",
        domain: "Pre-Algebra",
        tags: ["Operations", "Addition"],
        isAdult: false
    },
    {
        id: "frac-reciprocal",
        word: "Reciprocal",
        definition: "The inverted form of a fraction, created by flipping the numerator and the denominator. Multiplying a fraction by its reciprocal always equals 1.",
        domain: "Pre-Algebra",
        tags: ["Operations", "Division"],
        isAdult: false
    }
];
