import { VocabTerm } from '../_registry';

export const foundationsVocab: VocabTerm[] = [
    {
        id: "mf-peano",
        word: "Peano Axioms",
        definition: "A set of axioms for the natural numbers that define arithmetic properties recursively. It states 0 is a number, and every number has a successor.",
        domain: "Math Foundations",
        tags: ["Axioms", "Numbers"],
        isAdult: false
    },
    {
        id: "mf-natural-numbers",
        word: "Natural Numbers",
        definition: "The set of positive integers used for counting and ordering, often defined as starting from 0 or 1.",
        domain: "Math Foundations",
        tags: ["Numbers", "Counting"],
        relatedTerms: ["mf-peano"],
        isAdult: false
    },
    {
        id: "mf-arithmetic",
        word: "Arithmetic",
        definition: "The most elementary branch of mathematics, dealing with the properties and manipulation of numbers (addition, subtraction, multiplication, division).",
        domain: "Math Foundations",
        tags: ["Operations", "Basics"],
        isAdult: false
    },
    {
        id: "mf-inequality",
        word: "Inequality",
        definition: "A relation that holds between two values when they are different, establishing relative size (e.g., less than <, greater than >).",
        domain: "Math Foundations",
        tags: ["Comparison", "Logic"],
        relatedTerms: ["mf-magnitude"],
        isAdult: false
    },
    {
        id: "mf-magnitude",
        word: "Magnitude",
        definition: "The size, extent, or mathematical absolute value of an object or quantity.",
        domain: "Math Foundations",
        tags: ["Measurement", "Comparison"],
        relatedTerms: ["mf-inequality"],
        isAdult: false
    },
    {
        id: "mf-polygon",
        word: "Polygon",
        definition: "A two-dimensional closed figure made up of straight line segments. Examples include triangles, rectangles, and pentagons.",
        domain: "Math Foundations",
        tags: ["Geometry", "Shapes"],
        isAdult: false
    },
    {
        id: "mf-symmetry",
        word: "Symmetry",
        definition: "A property where a shape looks identical to its original shape after being flipped, rotated, or translated.",
        domain: "Math Foundations",
        tags: ["Geometry", "Properties"],
        isAdult: false
    },
    {
        id: "mf-set",
        word: "Set",
        definition: "A well-defined grouping or collection of distinct objects, considered as an object in its own right.",
        domain: "Math Foundations",
        tags: ["Grouping", "Logic"],
        isAdult: false
    },
    {
        id: "mf-probability",
        word: "Probability",
        definition: "A numerical measure from 0 to 1 representing the likelihood of a specific event occurring.",
        domain: "Math Foundations",
        tags: ["Statistics", "Chance"],
        isAdult: false
    }
];