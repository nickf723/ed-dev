import { VocabTerm } from '../_registry';

export const abstractAlgebraVocab: VocabTerm[] = [
    {
        id: 'aa-01',
        word: 'Group',
        definition: 'A set equipped with a binary operation that combines any two elements to form a third element, satisfying closure, associativity, identity, and invertibility.',
        domain: 'Abstract Algebra',
        tags: ['Core', 'Axioms'],
        relatedTerms: ['Abelian', 'Isomorphism'],
        isAdult: false
    },
    {
        id: 'aa-02',
        word: 'Abelian Group',
        definition: 'A group in which the result of applying the group operation to two group elements does not depend on the order in which they are written (the operation is commutative: $a * b = b * a$).',
        domain: 'Abstract Algebra',
        tags: ['Core', 'Properties'],
        relatedTerms: ['Group'],
        isAdult: false
    },
    {
        id: 'aa-03',
        word: 'Naked Singularity', 
        definition: 'A gravitational singularity without an event horizon. (Flagged for adult/advanced theoretical physics terminology).',
        domain: 'Abstract Algebra',
        tags: ['Theoretical', 'Edge Case'],
        isAdult: true 
    }
];