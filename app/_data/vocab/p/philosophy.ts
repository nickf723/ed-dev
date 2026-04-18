import { VocabTerm } from '../_registry';
export const philosophyVocab: VocabTerm[] = [
    {
        id: "phil-epistemology",
        word: "Epistemology",
        definition: "The branch of philosophy concerned with the theory of knowledge—what knowledge is, how it is acquired, and the extent to which a given subject or entity can be known.",
        domain: "Philosophy",
        tags: ["Theory of Knowledge", "Foundations"],
        relatedTerms: ["phil-solipsism", "phil-empiricism"],
        isAdult: false
    },
    {
        id: "phil-solipsism",
        word: "Solipsism",
        definition: "The philosophical idea that only one's own mind is sure to exist. As an epistemological position, it holds that knowledge of anything outside one's own mind is unsure.",
        domain: "Philosophy",
        tags: ["Metaphysics", "Consciousness"],
        relatedTerms: ["phil-epistemology"],
        isAdult: false
    },
    {
        id: "phil-utilitarianism",
        word: "Utilitarianism",
        definition: "An ethical theory that determines right from wrong by focusing on outcomes, specifically holding that the most ethical choice is the one that will produce the greatest good for the greatest number.",
        domain: "Philosophy",
        tags: ["Ethics", "Morality"],
        isAdult: false
    },
    {
        id: "phil-determinism",
        word: "Determinism",
        definition: "The philosophical view that all events, including moral choices, are determined completely by previously existing causes.",
        domain: "Philosophy",
        tags: ["Free Will", "Metaphysics"],
        isAdult: false
    }
];