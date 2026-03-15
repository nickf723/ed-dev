import { VocabTerm } from '../_registry';

export const gameDesignVocab: VocabTerm[] = [
    {
        id: 'gd-01',
        word: 'Action Economy',
        definition: 'The concept of how many actions a player or entity can take in a given turn or timeframe, crucial for turn-based balancing and encounter design.',
        domain: 'Game Design',
        tags: ['Mechanics', 'Balancing'],
        relatedTerms: ['Turn-Based'],
        isAdult: false
    },
    {
        id: 'gd-02',
        word: 'State Machine',
        definition: 'An architecture used to manage the behavior of game entities by breaking down their actions into distinct, mutually exclusive states (e.g., Idle, Run, Attack).',
        domain: 'Game Design',
        tags: ['Architecture', 'Logic'],
        isAdult: false
    }
];