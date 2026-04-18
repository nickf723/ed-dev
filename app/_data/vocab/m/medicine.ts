import { VocabTerm } from '../_registry';

export const medicineVocab: VocabTerm[] = [
    {
        id: "med-etiology",
        word: "Etiology",
        definition: "The study of the causes, origins, or reasons behind a disease or abnormal condition.",
        domain: "Medicine",
        tags: ["Pathology", "Diagnosis"],
        isAdult: false
    },
    {
        id: "med-apoptosis",
        word: "Apoptosis",
        definition: "The death of cells which occurs as a normal and controlled part of an organism's growth or development (programmed cell death).",
        domain: "Medicine",
        tags: ["Cellular", "Physiology"],
        isAdult: false
    },
    {
        id: "med-pathogen",
        word: "Pathogen",
        definition: "An organism, such as a virus, bacterium, or prion, that causes disease in its host.",
        domain: "Medicine",
        tags: ["Infectious Disease", "Microbiology"],
        isAdult: false
    }
];