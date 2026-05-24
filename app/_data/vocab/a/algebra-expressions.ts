import { VocabTerm } from '../_registry';

export const expressionsVocab: VocabTerm[] = [
    {
        id: "expr-expression",
        word: "Expression",
        definition: "A mathematical phrase that can contain numbers, variables, and operators. It does NOT have an equals sign (e.g., 3x + 5).",
        domain: "Pre-Algebra",
        tags: ["Core", "Syntax"],
        isAdult: false
    },
    {
        id: "expr-term",
        word: "Term",
        definition: "A single mathematical package inside an expression, separated by plus or minus signs. (e.g., in 3x + 5, '3x' and '5' are terms).",
        domain: "Pre-Algebra",
        tags: ["Anatomy", "Syntax"],
        isAdult: false
    },
    {
        id: "expr-coefficient",
        word: "Coefficient",
        definition: "The number attached to the front of a variable, telling you how many of that variable you have (e.g., the 3 in 3x).",
        domain: "Pre-Algebra",
        tags: ["Anatomy", "Numbers"],
        isAdult: false
    },
    {
        id: "expr-constant",
        word: "Constant",
        definition: "A plain number without a variable attached to it. Its value never changes.",
        domain: "Pre-Algebra",
        tags: ["Anatomy", "Numbers"],
        isAdult: false
    },
    {
        id: "expr-like-terms",
        word: "Like Terms",
        definition: "Terms whose variables and exponents are exactly the same. Only like terms can be added or subtracted together.",
        domain: "Pre-Algebra",
        tags: ["Rules", "Operations"],
        isAdult: false
    }
];
