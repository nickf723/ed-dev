import { dataScienceVocab } from "./d/data-science";
import type { NodeVocabularyRegistration } from "./aggregate.mjs";

/**
 * Data Science currently teaches a shared root vocabulary. Narrower terms can
 * move to child-owned registrations as substantive child units are built and
 * will continue to aggregate through curriculum containment.
 */
export const DATA_SCIENCE_VOCABULARY_REGISTRATIONS = [
  {
    nodeId: "formal.data-science",
    terms: dataScienceVocab,
  },
] as const satisfies readonly NodeVocabularyRegistration[];
