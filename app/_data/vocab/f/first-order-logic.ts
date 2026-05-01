import { VocabTerm } from '../_registry';

export const firstOrderVocab: VocabTerm[] = [
    {
        id: "fol-predicate",
        word: "Predicate",
        definition: "A property or relation that is asserted about one or more variables or constants. Unlike a proposition, its truth value depends on the inputs (e.g., P(x) = 'x is prime').",
        domain: "First-Order Logic",
        tags: ["Structure", "Functions"],
        isAdult: false
    },
    {
        id: "fol-quantifier",
        word: "Quantifier",
        definition: "A logical operator that specifies the quantity of specimens in the domain of discourse that satisfy a open formula.",
        domain: "First-Order Logic",
        tags: ["Operators", "Scope"],
        relatedTerms: ["fol-universal", "fol-existential"],
        isAdult: false
    },
    {
        id: "fol-universal",
        word: "Universal Quantifier (∀)",
        definition: "Asserts that a property holds for every single element within the domain. Equivalent to a massive chain of ANDs.",
        domain: "First-Order Logic",
        tags: ["Quantifiers", "All"],
        isAdult: false
    },
    {
        id: "fol-existential",
        word: "Existential Quantifier (∃)",
        definition: "Asserts that there is at least one element in the domain for which the property holds. Equivalent to a massive chain of ORs.",
        domain: "First-Order Logic",
        tags: ["Quantifiers", "Some"],
        isAdult: false
    },
    {
        id: "fol-domain",
        word: "Domain of Discourse",
        definition: "The set of all possible values that variables in a logical statement can take. The 'universe' of the conversation.",
        domain: "First-Order Logic",
        tags: ["Context", "Sets"],
        isAdult: false
    },
    {
        id: "fol-bound-variable",
        word: "Bound Variable",
        definition: "A variable that is within the scope of a quantifier (e.g., 'x' in ∀x P(x)). Its value is strictly governed by the quantifier.",
        domain: "First-Order Logic",
        tags: ["Variables", "Syntax"],
        relatedTerms: ["fol-free-variable"],
        isAdult: false
    },
    {
        id: "fol-free-variable",
        word: "Free Variable",
        definition: "A variable that appears in a formula but is not bound by any quantifier. Its truth value cannot be determined until it is assigned a specific value.",
        domain: "First-Order Logic",
        tags: ["Variables", "Syntax"],
        relatedTerms: ["fol-bound-variable"],
        isAdult: false
    },
    {
        id: "fol-constant",
        word: "Constant",
        definition: "A symbol that refers to a fixed, specific object within the domain (e.g., '0' in arithmetic or 'Socrates' in philosophy).",
        domain: "First-Order Logic",
        tags: ["Syntax", "Objects"],
        isAdult: false
    },
    {
        id: "fol-interpretation",
        word: "Interpretation",
        definition: "An assignment of meaning to the symbols of a formal language (constants, functions, and predicates) relative to a specific domain.",
        domain: "First-Order Logic",
        tags: ["Semantics", "Models"],
        isAdult: false
    }
];
