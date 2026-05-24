import { VocabTerm } from '../_registry';

export const pemdasVocab: VocabTerm[] = [
    {
        id: "pem-acronym",
        word: "PEMDAS",
        definition: "An acronym used to remember the order of operations: Parentheses, Exponents, Multiplication & Division, Addition & Subtraction.",
        domain: "Pre-Algebra",
        tags: ["Rules", "Core"],
        isAdult: false
    },
    {
        id: "pem-parentheses",
        word: "Parentheses",
        definition: "Grouping symbols like ( ), { }, or [ ] that tell you which part of a math problem to solve absolutely first.",
        domain: "Pre-Algebra",
        tags: ["Grouping", "Priority"],
        isAdult: false
    },
    {
        id: "pem-exponents",
        word: "Exponents",
        definition: "A quantity representing the power to which a given number or expression is to be raised, evaluated immediately after parentheses.",
        domain: "Pre-Algebra",
        tags: ["Powers", "Priority"],
        isAdult: false
    },
    {
        id: "pem-implied-mult",
        word: "Implied Multiplication",
        definition: "When a number is placed directly next to a variable or parenthesis without an operator (e.g., 2(x)), it implies multiplication.",
        domain: "Pre-Algebra",
        tags: ["Syntax", "Operations"],
        isAdult: false
    },
    {
        id: "pem-left-right",
        word: "Left-to-Right Rule",
        definition: "The tie-breaking rule used when evaluating operations of equal rank (like multiplication and division). You solve them exactly as you read a book: left to right.",
        domain: "Pre-Algebra",
        tags: ["Rules", "Logic"],
        isAdult: false
    }
];