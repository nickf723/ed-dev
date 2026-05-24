import { VocabTerm } from '../_registry';

export const integersVocab: VocabTerm[] = [
    {
        id: "int-integer",
        word: "Integer",
        definition: "A whole number that can be positive, negative, or zero. It does not include fractions or decimals.",
        domain: "Pre-Algebra",
        tags: ["Numbers", "Core"],
        isAdult: false
    },
    {
        id: "int-negative",
        word: "Negative Number",
        definition: "A real number that is less than zero. They represent opposites, such as debt or below-freezing temperatures.",
        domain: "Pre-Algebra",
        tags: ["Numbers", "Magnitude"],
        isAdult: false
    },
    {
        id: "int-absolute-value",
        word: "Absolute Value",
        definition: "The distance of a number from zero on the number line, regardless of direction. It is always positive or zero.",
        domain: "Pre-Algebra",
        tags: ["Distance", "Magnitude"],
        isAdult: false
    },
    {
        id: "int-opposite",
        word: "Opposite",
        definition: "Two numbers that have the same absolute value but different signs (e.g., 5 and -5). They add up to zero.",
        domain: "Pre-Algebra",
        tags: ["Properties"],
        isAdult: false
    }
];
