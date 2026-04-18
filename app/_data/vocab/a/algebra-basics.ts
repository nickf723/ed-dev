import { VocabTerm } from '../_registry';

export const algebraBasicsVocab: VocabTerm[] = [
    {
        id: "alg-variable",
        word: "Variable",
        definition: "A symbol (usually a letter like x or y) used to represent an unknown or changeable quantity in a mathematical expression.",
        domain: "Mathematics",
        tags: ["Algebra", "Foundations"],
        relatedTerms: ["alg-expression"],
        isAdult: false
    },
    {
        id: "alg-expression",
        word: "Expression",
        definition: "A mathematical phrase that can contain ordinary numbers, variables, and operators (like add and subtract), but does not contain an equals sign.",
        domain: "Mathematics",
        tags: ["Algebra", "Syntax"],
        isAdult: false
    },
    {
        id: "alg-polynomial",
        word: "Polynomial",
        definition: "An expression consisting of variables and coefficients, that involves only the operations of addition, subtraction, multiplication, and non-negative integer exponentiation.",
        domain: "Mathematics",
        tags: ["Algebra", "Functions"],
        isAdult: false
    }
];