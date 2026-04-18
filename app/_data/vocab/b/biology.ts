import { VocabTerm } from '../_registry';

export const biologyVocab: VocabTerm[] = [
    {
        id: "bio-homeostasis",
        word: "Homeostasis",
        definition: "The state of steady internal, physical, and chemical conditions maintained by living systems, regardless of external environmental changes.",
        domain: "Biology",
        tags: ["Physiology", "Systems"],
        isAdult: false
    },
    {
        id: "bio-phenotype",
        word: "Phenotype",
        definition: "The observable characteristics or traits of an organism resulting from the interaction of its genotype with the environment.",
        domain: "Biology",
        tags: ["Genetics", "Evolution"],
        relatedTerms: ["bio-genotype"],
        isAdult: false
    },
    {
        id: "bio-mitosis",
        word: "Mitosis",
        definition: "A part of the cell cycle in which replicated chromosomes are separated into two new nuclei, resulting in genetically identical daughter cells.",
        domain: "Biology",
        tags: ["Cellular Biology", "Reproduction"],
        isAdult: false
    }
];