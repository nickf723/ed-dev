import { botanyVocab } from "./b/botany";
import { biologyVocab } from "./natural-science/biology";
import type { NodeVocabularyRegistration } from "./aggregate.mjs";

export const BIOLOGY_VOCABULARY_REGISTRATIONS = [
  {
    nodeId: "natural.biology",
    terms: biologyVocab,
  },
  {
    nodeId: "natural.biology.botany",
    terms: botanyVocab,
  },
] as const satisfies readonly NodeVocabularyRegistration[];
