import { materialsScienceVocab } from "./m/materials-science";
import type { NodeVocabularyRegistration } from "./aggregate.mjs";

/**
 * Materials Science currently teaches shared root terms. As substantive child
 * units are built, narrower terms should move to their owning registrations and
 * continue to aggregate through curriculum containment.
 */
export const MATERIALS_SCIENCE_VOCABULARY_REGISTRATIONS = [
  {
    nodeId: "applied.materials-science",
    terms: materialsScienceVocab,
  },
] as const satisfies readonly NodeVocabularyRegistration[];
