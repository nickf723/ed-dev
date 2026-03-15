// 1. The Centralized Type Definition
export type VocabTerm = {
    id: string;
    word: string;
    definition: string;
    domain: string;
    tags: string[];
    relatedTerms?: string[];
    isAdult: boolean;
};

// 2. Import your domain files
import { mathVocab } from './m/math';
import { abstractAlgebraVocab } from './a/abstract-algebra';
import { ludologyVocab } from './l/ludology';
import { gameDesignVocab } from './g/game-design';
import { lawVocab } from './l/law'; // Example additional domain

export { mathVocab, abstractAlgebraVocab, ludologyVocab, gameDesignVocab };

// 3. Compile the Master List (Strictly Typed!)
export const ALL_VOCAB: VocabTerm[] = [
    ...mathVocab,
    ...abstractAlgebraVocab,
    ...ludologyVocab,
    ...gameDesignVocab,
    ...lawVocab
];