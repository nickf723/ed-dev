import { historyVocab } from "./h/history";
import {
  historyChronologyVocab,
  historyRegionalVocab,
  historyThemeVocab,
} from "./h/history-branches";
import type { NodeVocabularyRegistration } from "./aggregate.mjs";

export const HISTORY_VOCABULARY_REGISTRATIONS = [
  { nodeId: "humanities.history", terms: historyVocab },
  { nodeId: "humanities.history.chronology", terms: historyChronologyVocab },
  { nodeId: "humanities.history.regional", terms: historyRegionalVocab },
  { nodeId: "humanities.history.theme", terms: historyThemeVocab },
] as const satisfies readonly NodeVocabularyRegistration[];
