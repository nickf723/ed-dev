import { VocabTerm } from '../_registry';

export const propLogicVocab: VocabTerm[] = [
    {
        id: "pl-proposition",
        word: "Proposition",
        definition: "A declarative sentence that is definitively either True or False, but not both. Examples include mathematical statements or factual claims.",
        domain: "Propositional Logic",
        tags: ["Foundations", "Truth Values"],
        isAdult: false
    },
    {
        id: "pl-truth-value",
        word: "Truth Value",
        definition: "The status of a proposition as either True (often represented as 1 or T) or False (represented as 0 or F).",
        domain: "Propositional Logic",
        tags: ["Foundations", "Boolean"],
        isAdult: false
    },
    {
        id: "pl-logical-equivalence",
        word: "Logical Equivalence",
        definition: "When two distinct logical statements yield the exact same truth values under every possible interpretation. Denoted by the symbol ≡.",
        domain: "Propositional Logic",
        tags: ["Equivalence", "Truth Tables"],
        relatedTerms: ["pl-de-morgan"],
        isAdult: false
    },
    {
        id: "pl-de-morgan",
        word: "De Morgan's Laws",
        definition: "A pair of transformation rules relating AND and OR through negation: ¬(P ∧ Q) ≡ ¬P ∨ ¬Q, and ¬(P ∨ Q) ≡ ¬P ∧ ¬Q.",
        domain: "Propositional Logic",
        tags: ["Theorems", "Negation", "Equivalence"],
        relatedTerms: ["pl-logical-equivalence"],
        isAdult: false
    },
    {
        id: "pl-tautology",
        word: "Tautology",
        definition: "A compound proposition that is always True, regardless of the truth values of its individual components (e.g., P ∨ ¬P).",
        domain: "Propositional Logic",
        tags: ["Truth Tables", "Absolute"],
        relatedTerms: ["pl-contradiction", "pl-contingency"],
        isAdult: false
    },
    {
        id: "pl-contradiction",
        word: "Contradiction",
        definition: "A compound proposition that is always False, regardless of the truth values of its individual components (e.g., P ∧ ¬P).",
        domain: "Propositional Logic",
        tags: ["Truth Tables", "Absolute"],
        relatedTerms: ["pl-tautology", "pl-contingency"],
        isAdult: false
    },
    {
        id: "pl-contingency",
        word: "Contingency",
        definition: "A proposition that is neither a tautology nor a contradiction; its truth value depends on the truth values of its variables.",
        domain: "Propositional Logic",
        tags: ["Truth Tables", "Variable"],
        relatedTerms: ["pl-tautology", "pl-contradiction"],
        isAdult: false
    },
    {
        id: "pl-conjunction",
        word: "Conjunction",
        definition: "A logical operation that combines two propositions with AND (∧). It is only true if both propositions are true.",
        domain: "Propositional Logic",
        tags: ["Connectives", "Operators"],
        isAdult: false
    },
    {
        id: "pl-disjunction",
        word: "Disjunction",
        definition: "A logical operation that combines two propositions with OR (∨). It is true if at least one of the propositions is true.",
        domain: "Propositional Logic",
        tags: ["Connectives", "Operators"],
        isAdult: false
    },
    {
        id: "pl-negation",
        word: "Negation",
        definition: "A unary logical operation that inverts the truth value of a proposition (NOT, ¬).",
        domain: "Propositional Logic",
        tags: ["Connectives", "Operators"],
        isAdult: false
    },
    {
        id: "pl-truth-table",
        word: "Truth Table",
        definition: "A mathematical table used in logic to compute the functional values of logical expressions based on all possible combinations of inputs.",
        domain: "Propositional Logic",
        tags: ["Computation", "Analysis"],
        isAdult: false
    },
    {
        id: "pl-atomic",
        word: "Atomic Proposition",
        definition: "The simplest form of a proposition, containing no logical connectives. It cannot be broken down further.",
        domain: "Propositional Logic",
        tags: ["Foundations", "Structure"],
        relatedTerms: ["pl-compound"],
        isAdult: false
    },
    {
        id: "pl-compound",
        word: "Compound Proposition",
        definition: "A logical statement formed by combining two or more atomic propositions using logical connectives like AND, OR, or NOT.",
        domain: "Propositional Logic",
        tags: ["Foundations", "Structure"],
        relatedTerms: ["pl-atomic"],
        isAdult: false
    }
];
