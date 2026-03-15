import { VocabTerm } from "../_registry";

export const literatureVocab: VocabTerm[] = [
    {
        id: 'lit-01',
        word: 'Mimesis',
        definition: 'The imitation or representation of aspects of the sensible world, especially human actions, in literature and art.',
        domain: 'Literature',
        tags: ['Theory', 'Greek'],
        isAdult: false
    },
    {
        id: 'lit-02',
        word: 'Bildungsroman',
        definition: 'A novel dealing with one person\'s formative years or spiritual education; a coming-of-age story.',
        domain: 'Literature',
        tags: ['Genre', 'Prose'],
        relatedTerms: ['Protagonist'],
        isAdult: false
    },
    {
        id: 'lit-03',
        word: 'Stream of Consciousness',
        definition: 'A narrative mode or method that attempts to depict the multitudinous thoughts and feelings which pass through the mind of a narrator.',
        domain: 'Literature',
        tags: ['Technique', 'Modernism'],
        isAdult: false
    },
    {
        id: 'lit-04',
        word: 'Motif',
        definition: 'A distinctive repeating feature or idea in a literary composition that helps develop the theme.',
        domain: 'Literature',
        tags: ['Analysis', 'Device'],
        relatedTerms: ['Theme', 'Symbolism'],
        isAdult: false
    }
];