import { economicsVocab } from "./e/economics";
import type { NodeVocabularyRegistration } from "./aggregate.mjs";

export const ECONOMICS_VOCABULARY_REGISTRATIONS = [
  {
    nodeId: "social.economics",
    terms: economicsVocab,
  },
] as const satisfies readonly NodeVocabularyRegistration[];
