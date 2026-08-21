import { geographyVocab } from "./g/geography";
import type { NodeVocabularyRegistration } from "./aggregate.mjs";

export const GEOGRAPHY_VOCABULARY_REGISTRATIONS = [
  {
    nodeId: "social.geography",
    terms: geographyVocab,
  },
] as const satisfies readonly NodeVocabularyRegistration[];
