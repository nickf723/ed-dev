import { earthScienceVocab } from "./e/earth-science";
import { mineralogyVocab } from "./m/mineralogy";
import type { NodeVocabularyRegistration } from "./aggregate.mjs";

export const EARTH_SCIENCE_VOCABULARY_REGISTRATIONS = [
  {
    nodeId: "natural.earth-science",
    terms: earthScienceVocab,
  },
  {
    nodeId: "natural.earth-science.mineralogy",
    terms: mineralogyVocab,
  },
] as const satisfies readonly NodeVocabularyRegistration[];
