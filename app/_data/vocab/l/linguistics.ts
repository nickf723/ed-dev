import { VocabTerm } from "../_registry";

export const linguisticsVocab: VocabTerm[] = [
    {
        id: "ling-morphology",
        word: "Morphology",
        definition: "The study of the internal structure of words and how they are formed from smaller units called morphemes.",
        domain: "Linguistics",
        tags: ["Structure", "Grammar"],
        relatedTerms: ["ling-syntax", "ling-agglutinative"],
        isAdult: false
    },
    {
        id: "ling-syntax",
        word: "Syntax",
        definition: "The set of rules, principles, and processes that govern the structure of sentences in a given language.",
        domain: "Linguistics",
        tags: ["Structure", "Grammar", "Word Order"],
        relatedTerms: ["ling-morphology"],
        isAdult: false
    },
    {
        id: "ling-agglutinative",
        word: "Agglutinative",
        definition: "A language type where words are formed by stringing together morphemes, each representing a single grammatical category.",
        domain: "Linguistics",
        tags: ["Typology", "Morphology"],
        relatedTerms: ["ling-morphology"],
        isAdult: false
    }
];