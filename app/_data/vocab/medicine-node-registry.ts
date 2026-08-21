import { anatomyPhysiologyVocab } from "./a/anatomy-physiology";
import { medicineCoreVocab } from "./m/medicine";
import { skeletalSystemVocab } from "./s/skeletal-system";
import type { NodeVocabularyRegistration } from "./aggregate.mjs";

/**
 * Medicine terms are owned by the narrowest active curriculum node that
 * teaches them. Parent scopes are derived from curriculum containment.
 */
export const MEDICINE_VOCABULARY_REGISTRATIONS = [
  {
    nodeId: "applied.medicine",
    terms: medicineCoreVocab,
  },
  {
    nodeId: "applied.medicine.anatomy-physiology",
    terms: anatomyPhysiologyVocab,
  },
  {
    nodeId: "applied.medicine.anatomy-physiology.skeletal",
    terms: skeletalSystemVocab,
  },
] as const satisfies readonly NodeVocabularyRegistration[];
