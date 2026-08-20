import { literatureVocab } from "./l/literature";
import { narrativeFictionVocab } from "./n/narrative-fiction";
import type { NodeVocabularyRegistration } from "./aggregate.mjs";

/**
 * Literature vocabulary is owned by the narrowest built curriculum node that
 * currently teaches it. Parent scopes are derived from curriculum containment.
 */
export const LITERATURE_VOCABULARY_REGISTRATIONS = [
  {
    nodeId: "humanities.literature",
    terms: literatureVocab,
  },
  {
    nodeId: "humanities.literature.narrative-fiction",
    terms: narrativeFictionVocab,
  },
] as const satisfies readonly NodeVocabularyRegistration[];
