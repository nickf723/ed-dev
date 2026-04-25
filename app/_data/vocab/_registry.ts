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
import { lawVocab } from './l/law';
import { linguisticsVocab } from './l/linguistics';
import { economicsVocab } from './e/economics';
import { philosophyVocab } from './p/philosophy';
import { earthScienceVocab } from './e/earth-science';
import { computerScienceVocab } from './c/computer-science';
import { physicsVocab } from './p/physics';
import { chemistryVocab } from './c/chemistry';
import { biologyVocab } from './b/biology';
import { astronomyVocab } from './a/astronomy';
import { psychologyVocab } from './p/psychology';
import { sociologyVocab } from './s/sociology';
import { politicalScienceVocab } from './p/political-science';
import { medicineVocab } from './m/medicine';
import { musicVocab } from './m/music';
import { visualArtsVocab } from './v/visual-arts';
import { literatureVocab } from './l/literature';
import { religionVocab } from './r/religion';
import { algebraBasicsVocab } from './a/algebra-basics';
import { architectureVocab } from './a/architecture';
import { quantumMechanicsVocab } from './q/quantum-mechanics';
import { dataScienceVocab } from './d/data-science';
import { meteorologyVocab } from './m/meteorology';
import { metroidvaniaVocab } from './m/metroidvania';
import { anthropologyVocab } from './a/anthropology';
import { mythologyVocab } from './m/mythology';
import { cognitiveScienceVocab } from './c/cognitive-science';

export { mathVocab, abstractAlgebraVocab, ludologyVocab, gameDesignVocab };

// 3. Compile the Master List (Strictly Typed!)
export const ALL_VOCAB: VocabTerm[] = [
    ...mathVocab,
    ...abstractAlgebraVocab,
    ...ludologyVocab,
    ...gameDesignVocab,
    ...lawVocab,
    ...linguisticsVocab,
    ...economicsVocab,
    ...philosophyVocab,
    ...earthScienceVocab,
    ...computerScienceVocab,
    ...physicsVocab,
    ...chemistryVocab,
    ...biologyVocab,
    ...astronomyVocab,
    ...psychologyVocab,
    ...sociologyVocab,
    ...politicalScienceVocab,
    ...medicineVocab,
    ...musicVocab,
    ...visualArtsVocab,
    ...literatureVocab,
    ...religionVocab,
    ...algebraBasicsVocab,
    ...architectureVocab,
    ...quantumMechanicsVocab,
    ...dataScienceVocab,
    ...meteorologyVocab,
    ...anthropologyVocab,
    ...mythologyVocab,
    ...cognitiveScienceVocab,
    ...metroidvaniaVocab
];