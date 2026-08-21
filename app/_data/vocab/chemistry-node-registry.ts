import { chemistryVocab } from "./c/chemistry";
import type { NodeVocabularyRegistration } from "./aggregate.mjs";

export const CHEMISTRY_VOCABULARY_REGISTRATIONS = [
  {
    nodeId: "natural.chemistry",
    terms: chemistryVocab,
  },
] as const satisfies readonly NodeVocabularyRegistration[];
