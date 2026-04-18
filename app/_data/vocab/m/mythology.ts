import { VocabTerm } from '../_registry';

export const mythologyVocab: VocabTerm[] = [
    {
        id: "myth-pantheon",
        word: "Pantheon",
        definition: "The particular set of all gods of any individual polytheistic religion, mythology, or tradition.",
        domain: "Humanities",
        tags: ["Mythology", "Religion"],
        isAdult: false
    },
    {
        id: "myth-monomyth",
        word: "Monomyth (Hero's Journey)",
        definition: "A common template of a broad category of tales and lore that involves a hero who goes on an adventure, is victorious in a decisive crisis, and comes home changed or transformed.",
        domain: "Humanities",
        tags: ["Narrative", "Literature"],
        isAdult: false
    },
    {
        id: "myth-titanomachy",
        word: "Titanomachy",
        definition: "In Greek mythology, the ten-year series of battles fought in Thessaly between the two camps of deities long before the existence of mankind: the Titans and the Olympians.",
        domain: "Humanities",
        tags: ["Greek Mythology", "History"],
        relatedTerms: ["myth-pantheon"],
        isAdult: false
    }
];