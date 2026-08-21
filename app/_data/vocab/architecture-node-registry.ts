import { architectureVocab } from "./a/architecture";
import type { NodeVocabularyRegistration } from "./aggregate.mjs";

export const ARCHITECTURE_VOCABULARY_REGISTRATIONS = [
  {
    nodeId: "applied.architecture",
    terms: architectureVocab,
  },
] as const satisfies readonly NodeVocabularyRegistration[];
