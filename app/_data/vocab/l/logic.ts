import { VocabTerm } from '../_registry';

export const logicVocab: VocabTerm[] = [
    {
        id: "log-proposition",
        word: "Proposition",
        definition: "A declarative statement that is either true or false, but not both. The fundamental building block of logic.",
        domain: "Propositional Logic",
        tags: ["Truth Values", "Statements"],
        relatedTerms: ["log-truth-value"],
        isAdult: false
    },
    {
        id: "log-truth-value",
        word: "Truth Value",
        definition: "The attribute assigned to a proposition in respect to its truth or falsehood, typically True (T/1) or False (F/0).",
        domain: "Propositional Logic",
        tags: ["Boolean", "Values"],
        isAdult: false
    },
    {
        id: "log-tautology",
        word: "Tautology",
        definition: "A logical formula or assertion that is always true under every possible interpretation or assignment of truth values.",
        domain: "Propositional Logic",
        tags: ["Truth Tables", "Evaluation"],
        relatedTerms: ["log-contradiction"],
        isAdult: false
    },
    {
        id: "log-contradiction",
        word: "Contradiction",
        definition: "A logical formula or assertion that is always false under every possible interpretation. The opposite of a tautology.",
        domain: "Propositional Logic",
        tags: ["Truth Tables", "Evaluation"],
        relatedTerms: ["log-tautology"],
        isAdult: false
    },
    {
        id: "log-conjunction",
        word: "Conjunction (AND)",
        definition: "A logical connective (∧) that joins two propositions. The resulting compound proposition is true ONLY if BOTH original propositions are true.",
        domain: "Boolean Logic",
        tags: ["Connectives", "Operators"],
        relatedTerms: ["log-disjunction"],
        isAdult: false
    },
    {
        id: "log-disjunction",
        word: "Disjunction (OR)",
        definition: "A logical connective (∨) that joins two propositions. The resulting compound proposition is true if AT LEAST ONE of the original propositions is true.",
        domain: "Boolean Logic",
        tags: ["Connectives", "Operators"],
        relatedTerms: ["log-conjunction"],
        isAdult: false
    },
    {
        id: "log-negation",
        word: "Negation (NOT)",
        definition: "A logical operator (¬ or ~) that inverts the truth value of a proposition. True becomes False, and False becomes True.",
        domain: "Boolean Logic",
        tags: ["Operators", "Inversion"],
        isAdult: false
    },
    {
        id: "log-implication",
        word: "Implication (IF...THEN)",
        definition: "A conditional logical connective (→). It is considered false ONLY when the premise is true and the conclusion is false. Otherwise, it is true.",
        domain: "Propositional Logic",
        tags: ["Conditionals", "Connectives"],
        relatedTerms: ["log-vacuous-truth"],
        isAdult: false
    },
    {
        id: "log-vacuous-truth",
        word: "Vacuous Truth",
        definition: "A statement that asserts that all members of the empty set have a certain property. Often occurs in implication when the premise is false (making the whole statement technically true).",
        domain: "Formal Logic",
        tags: ["Truth Values", "Edge Cases"],
        relatedTerms: ["log-implication"],
        isAdult: false
    },
    {
        id: "log-predicate",
        word: "Predicate",
        definition: "A statement whose truth value depends on the value of one or more variables within a specific domain (e.g., 'x > 5').",
        domain: "First-Order Logic",
        tags: ["Variables", "Functions"],
        relatedTerms: ["log-quantifier"],
        isAdult: false
    },
    {
        id: "log-quantifier",
        word: "Quantifier",
        definition: "An operator that specifies how many individuals in the domain of discourse satisfy an open formula. The two standard ones are Universal (∀) and Existential (∃).",
        domain: "First-Order Logic",
        tags: ["Operators", "Domain"],
        relatedTerms: ["log-predicate"],
        isAdult: false
    },
    {
        id: "log-universal",
        word: "Universal Quantifier (∀)",
        definition: "Read as 'for all'. It asserts that a predicate is true for every single element within the given domain.",
        domain: "First-Order Logic",
        tags: ["Quantifiers", "All"],
        isAdult: false
    },
    {
        id: "log-existential",
        word: "Existential Quantifier (∃)",
        definition: "Read as 'there exists'. It asserts that there is at least one element within the given domain for which the predicate is true.",
        domain: "First-Order Logic",
        tags: ["Quantifiers", "Some"],
        isAdult: false
    },
    {
        id: "log-set",
        word: "Set",
        definition: "A well-defined collection of distinct mathematical objects, called elements or members.",
        domain: "Set Theory",
        tags: ["Collections", "Foundations"],
        isAdult: false
    },
    {
        id: "log-subset",
        word: "Subset",
        definition: "Set A is a subset of set B if all elements of A are also elements of B. Denoted by ⊆.",
        domain: "Set Theory",
        tags: ["Relationships", "Containment"],
        isAdult: false
    },
    {
        id: "log-fallacy",
        word: "Logical Fallacy",
        definition: "An error in reasoning that renders an argument invalid. Can be formal (a flaw in the structure) or informal (a flaw in the content).",
        domain: "Informal Logic",
        tags: ["Arguments", "Errors"],
        isAdult: false
    },
    {
        id: "log-ad-hominem",
        word: "Ad Hominem",
        definition: "An informal fallacy where an argument is rebutted by attacking the character or motive of the person making the argument, rather than the substance of the argument itself.",
        domain: "Informal Logic",
        tags: ["Fallacies", "Attacks"],
        isAdult: false
    },
    {
        id: "log-straw-man",
        word: "Straw Man Fallacy",
        definition: "An informal fallacy of refuting an argument different from the one actually under discussion, essentially substituting the opponent's argument with a weaker, distorted version.",
        domain: "Informal Logic",
        tags: ["Fallacies", "Misrepresentation"],
        isAdult: false
    }
];