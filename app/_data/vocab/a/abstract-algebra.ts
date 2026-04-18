import { VocabTerm } from '../_registry';

export const abstractAlgebraVocab: VocabTerm[] = [
    {
        id: 'alg-group',
        word: 'Group',
        definition: 'A set equipped with a binary operation that combines any two elements to form a third element, satisfying closure, associativity, identity, and invertibility.',
        domain: 'Abstract Algebra',
        tags: ['Core', 'Axioms'],
        relatedTerms: ['Abelian', 'Isomorphism'],
        isAdult: false
    },
    {
        id: 'alg-abelian',
        word: 'Abelian Group',
        definition: 'A group in which the result of applying the group operation to two group elements does not depend on the order in which they are written (the operation is commutative: $a * b = b * a$).',
        domain: 'Abstract Algebra',
        tags: ['Core', 'Properties'],
        relatedTerms: ['Group'],
        isAdult: false
    },
    {
        id: 'alg-naked-singularity',
        word: 'Naked Singularity', 
        definition: 'A gravitational singularity without an event horizon. (Flagged for adult/advanced theoretical physics terminology).',
        domain: 'Abstract Algebra',
        tags: ['Theoretical', 'Edge Case'],
        isAdult: true 
    },
    {
        id: "alg-field",
        word: "Field",
        definition: "An algebraic structure in which addition, subtraction, multiplication, and division are defined and behave perfectly (excluding division by zero).",
        domain: "Abstract Algebra",
        tags: ["Structures", "Field Theory"],
        relatedTerms: ["alg-ring", "alg-group"],
        isAdult: false
    },
    {
        id: "alg-ring",
        word: "Ring",
        definition: "An algebraic structure equipped with two binary operations (usually addition and multiplication). Unlike a Field, it does not guarantee the ability to divide.",
        domain: "Abstract Algebra",
        tags: ["Structures", "Ring Theory"],
        relatedTerms: ["alg-field", "alg-zero-divisor"],
        isAdult: false
    },
    {
        id: "alg-zero-divisor",
        word: "Zero Divisor",
        definition: "A non-zero element in a ring that, when multiplied by another non-zero element, results in zero. Their existence prevents safe division.",
        domain: "Abstract Algebra",
        tags: ["Ring Theory", "Anomalies"],
        relatedTerms: ["alg-ring"],
        isAdult: false
    },
    {
        id: "alg-modulo",
        word: "Modular Arithmetic",
        definition: "A system of arithmetic for integers where numbers 'wrap around' upon reaching a certain value, known as the modulus.",
        domain: "Abstract Algebra",
        tags: ["Number Theory", "Cryptography"],
        isAdult: false
    }
];