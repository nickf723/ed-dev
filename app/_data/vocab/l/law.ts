import { VocabTerm } from "../_registry";

export const lawVocab: VocabTerm[] = [
    {
        id: 'law-01',
        word: 'Jurisprudence',
        definition: 'The theoretical study of law. It explores the origins of law, its role in society, and its underlying philosophical principles.',
        domain: 'Law',
        tags: ['Theory', 'Philosophy'],
        relatedTerms: ['Stare Decisis'],
        isAdult: false
    },
    {
        id: 'law-02',
        word: 'Stare Decisis',
        definition: 'Latin for "to stand by things decided." The legal principle of determining points in litigation according to precedent.',
        domain: 'Law',
        tags: ['Common Law', 'Precedent'],
        isAdult: false
    },
    {
        id: 'law-03',
        word: 'Mens Rea',
        definition: 'Latin for "guilty mind." The mental element of a person\'s intention to commit a crime; a necessary element of many crimes.',
        domain: 'Law',
        tags: ['Criminal Law', 'Latin'],
        relatedTerms: ['Actus Reus'],
        isAdult: false
    },
    {
        id: 'law-04',
        word: 'Actus Reus',
        definition: 'Latin for "guilty act." The objective element of a crime; the external action or omission that breaches the law.',
        domain: 'Law',
        tags: ['Criminal Law', 'Latin'],
        relatedTerms: ['Mens Rea'],
        isAdult: false
    }
];