import { anthropologyVocab } from "./a/anthropology";
import {
  archaeologyAnthropologyVocab,
  biologicalAnthropologyVocab,
  culturalAnthropologyVocab,
  linguisticAnthropologyVocab,
} from "./a/anthropology-branches";
import type { NodeVocabularyRegistration } from "./aggregate.mjs";

export const ANTHROPOLOGY_VOCABULARY_REGISTRATIONS = [
  { nodeId: "social.anthropology", terms: anthropologyVocab },
  {
    nodeId: "social.anthropology.cultural",
    terms: culturalAnthropologyVocab,
  },
  {
    nodeId: "social.anthropology.biological",
    terms: biologicalAnthropologyVocab,
  },
  {
    nodeId: "social.anthropology.archaeology",
    terms: archaeologyAnthropologyVocab,
  },
  {
    nodeId: "social.anthropology.linguistic",
    terms: linguisticAnthropologyVocab,
  },
] as const satisfies readonly NodeVocabularyRegistration[];
