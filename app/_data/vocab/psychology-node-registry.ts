import { psychologyVocab } from "./p/psychology";
import type { NodeVocabularyRegistration } from "./aggregate.mjs";

export const PSYCHOLOGY_VOCABULARY_REGISTRATIONS = [
  {
    nodeId: "social.psychology",
    terms: psychologyVocab,
  },
] as const satisfies readonly NodeVocabularyRegistration[];
