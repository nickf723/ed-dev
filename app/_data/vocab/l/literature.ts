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
    },
    {
        id: "lit-synecdoche",
        word: "Synecdoche",
        definition: "A figure of speech in which a part is made to represent the whole or vice versa (e.g., 'new wheels' referring to a new car).",
        domain: "Literature",
        tags: ["Rhetoric", "Poetry"],
        isAdult: false
    },
    {
        id: "lit-epistolary",
        word: "Epistolary",
        definition: "A novel written as a series of documents, usually letters, although diary entries, newspaper clippings, and other documents are sometimes used.",
        domain: "Literature",
        tags: ["Form", "Novel"],
        isAdult: false
    },
    {
        id: "lit-allegory",
        word: "Allegory",
        definition: "A narrative, whether in prose or verse, in which characters, events, and settings represent abstract concepts or moral qualities.",
        domain: "Literature",
        tags: ["Narrative", "Symbolism"],
        isAdult: false
    }
];