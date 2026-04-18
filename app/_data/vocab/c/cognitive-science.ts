import { VocabTerm } from '../_registry';

export const cognitiveScienceVocab: VocabTerm[] = [
    {
        id: "cog-embodied-cognition",
        word: "Embodied Cognition",
        definition: "The theory that many features of cognition, whether human or otherwise, are shaped by aspects of the entire body of the organism, not just the brain.",
        domain: "Cognitive Science",
        tags: ["Theory", "Psychology", "Philosophy"],
        isAdult: false
    },
    {
        id: "cog-working-memory",
        word: "Working Memory",
        definition: "A cognitive system with a limited capacity that can hold information temporarily. It is important for reasoning and the guidance of decision-making and behavior.",
        domain: "Cognitive Science",
        tags: ["Psychology", "Neuroscience"],
        isAdult: false
    },
    {
        id: "cog-connectionism",
        word: "Connectionism",
        definition: "An approach to the study of human cognition that utilizes mathematical models, known as artificial neural networks, to explain how brains might function.",
        domain: "Cognitive Science",
        tags: ["Artificial Intelligence", "Modeling"],
        relatedTerms: ["ds-neural-network"],
        isAdult: false
    }
];