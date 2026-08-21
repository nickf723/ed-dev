import {
  classicalHistoricalLanguagesVocab,
  constructedLanguagesVocab,
  languageLearningProficiencyVocab,
  languageLiteratureCultureVocab,
  modernLanguagesVocab,
  signedLanguagesVocab,
  translationInterpretingVocab,
  writingLiteracyVocab,
} from "./l/language-branches";
import { languagesVocab } from "./l/languages";
import type { NodeVocabularyRegistration } from "./aggregate.mjs";

export const LANGUAGES_VOCABULARY_REGISTRATIONS = [
  { nodeId: "humanities.languages", terms: languagesVocab },
  { nodeId: "humanities.languages.modern", terms: modernLanguagesVocab },
  { nodeId: "humanities.languages.signed", terms: signedLanguagesVocab },
  {
    nodeId: "humanities.languages.classical-historical",
    terms: classicalHistoricalLanguagesVocab,
  },
  {
    nodeId: "humanities.languages.constructed",
    terms: constructedLanguagesVocab,
  },
  {
    nodeId: "humanities.languages.writing-literacy",
    terms: writingLiteracyVocab,
  },
  {
    nodeId: "humanities.languages.translation-interpreting",
    terms: translationInterpretingVocab,
  },
  {
    nodeId: "humanities.languages.learning-proficiency",
    terms: languageLearningProficiencyVocab,
  },
  {
    nodeId: "humanities.languages.literature-culture",
    terms: languageLiteratureCultureVocab,
  },
] as const satisfies readonly NodeVocabularyRegistration[];
