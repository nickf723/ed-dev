import { VocabTerm } from '../_registry';

export const gameDesignVocab: VocabTerm[] = [
    {
        id: "game-stack",
        word: "The Stack",
        definition: "A LIFO (Last In, First Out) resolution zone used to handle simultaneous or interrupting player actions, spells, and abilities.",
        domain: "Game Design",
        tags: ["Mechanics", "Tabletop", "Resolution"],
        relatedTerms: ["game-priority"],
        isAdult: false
    },
    {
        id: "game-priority",
        word: "Priority",
        definition: "The rules-defined right of a player to take an action or cast a spell at a specific moment in time.",
        domain: "Game Design",
        tags: ["Mechanics", "Turn Structure"],
        relatedTerms: ["game-stack"],
        isAdult: false
    },
    {
        id: "game-ludonarrative",
        word: "Ludonarrative Dissonance",
        definition: "The conflict between a video game's narrative storytelling and its interactive gameplay mechanics.",
        domain: "Ludology",
        tags: ["Theory", "Narrative", "Criticism"],
        isAdult: false
    },
    {
        id: "game-action-economy",
        word: "Action Economy",
        definition: "The concept detailing how many actions a player or entity can take in a single turn, often dictating the balance of power in combat.",
        domain: "Game Design",
        tags: ["Balance", "Combat", "Mechanics"],
        isAdult: false
    }
];