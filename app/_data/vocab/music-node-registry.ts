import { musicVocab } from "./m/music";
import type { NodeVocabularyRegistration } from "./aggregate.mjs";

export const MUSIC_VOCABULARY_REGISTRATIONS = [
  {
    nodeId: "humanities.music",
    terms: musicVocab,
  },
] as const satisfies readonly NodeVocabularyRegistration[];
