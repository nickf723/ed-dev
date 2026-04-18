import { VocabTerm } from '../_registry';

export const quantumMechanicsVocab: VocabTerm[] = [
    {
        id: "quant-superposition",
        word: "Superposition",
        definition: "The principle that a quantum system can exist in multiple states or configurations simultaneously until it is measured or observed.",
        domain: "Physics",
        tags: ["Quantum Mechanics", "Theory"],
        relatedTerms: ["quant-wave-function"],
        isAdult: false
    },
    {
        id: "quant-wave-function",
        word: "Wave Function",
        definition: "A mathematical description of the quantum state of an isolated quantum system, representing the probability amplitude of finding a particle in a given state.",
        domain: "Physics",
        tags: ["Quantum Mechanics", "Mathematics"],
        isAdult: false
    },
    {
        id: "quant-tunneling",
        word: "Quantum Tunneling",
        definition: "The quantum mechanical phenomenon where a subatomic particle passes through a potential barrier that it classicaly shouldn't have enough energy to overcome.",
        domain: "Physics",
        tags: ["Quantum Mechanics", "Phenomena"],
        isAdult: false
    }
];