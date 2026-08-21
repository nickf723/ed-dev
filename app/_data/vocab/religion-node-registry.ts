import {
  religionMaterialVocab,
  religionMethodsVocab,
  religionMythologyVocab,
  religionRitualVocab,
  religionSocietyVocab,
  religionTextsVocab,
  religionTheologyVocab,
  religionTraditionsVocab,
} from "./r/religion-branches";
import { religionVocab } from "./r/religion";
import type { NodeVocabularyRegistration } from "./aggregate.mjs";

export const RELIGION_VOCABULARY_REGISTRATIONS = [
  { nodeId: "humanities.religion", terms: religionVocab },
  { nodeId: "humanities.religion.methods", terms: religionMethodsVocab },
  {
    nodeId: "humanities.religion.traditions",
    terms: religionTraditionsVocab,
  },
  {
    nodeId: "humanities.religion.texts-interpretation",
    terms: religionTextsVocab,
  },
  { nodeId: "humanities.religion.ritual-practice", terms: religionRitualVocab },
  {
    nodeId: "humanities.religion.material-place",
    terms: religionMaterialVocab,
  },
  {
    nodeId: "humanities.religion.society-politics",
    terms: religionSocietyVocab,
  },
  {
    nodeId: "humanities.religion.theology-philosophy",
    terms: religionTheologyVocab,
  },
  { nodeId: "humanities.religion.mythology", terms: religionMythologyVocab },
] as const satisfies readonly NodeVocabularyRegistration[];
