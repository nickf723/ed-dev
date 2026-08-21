import { visualArtsVocab } from "./v/visual-arts";
import type { NodeVocabularyRegistration } from "./aggregate.mjs";

/**
 * Visual Arts currently teaches a shared root vocabulary. As substantive child
 * studios are remastered, their narrower terms should move to child-owned
 * registrations and continue to aggregate through curriculum containment.
 */
export const VISUAL_ARTS_VOCABULARY_REGISTRATIONS = [
  {
    nodeId: "humanities.visual-arts",
    terms: visualArtsVocab,
  },
] as const satisfies readonly NodeVocabularyRegistration[];
