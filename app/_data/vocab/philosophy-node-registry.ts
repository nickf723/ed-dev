import { philosophyVocab } from "./p/philosophy";
import {
  philosophyAestheticsVocab,
  philosophyConsequentialismVocab,
  philosophyEpistemologyVocab,
  philosophyEthicsVocab,
  philosophyMetaphysicsVocab,
  philosophyMindVocab,
  philosophyNormativeVocab,
  philosophyPoliticalVocab,
  philosophyScienceVocab,
} from "./p/philosophy-branches";
import type { NodeVocabularyRegistration } from "./aggregate.mjs";

export const PHILOSOPHY_VOCABULARY_REGISTRATIONS = [
  { nodeId: "humanities.philosophy", terms: philosophyVocab },
  {
    nodeId: "humanities.philosophy.metaphysics",
    terms: philosophyMetaphysicsVocab,
  },
  {
    nodeId: "humanities.philosophy.epistemology",
    terms: philosophyEpistemologyVocab,
  },
  { nodeId: "humanities.philosophy.mind", terms: philosophyMindVocab },
  { nodeId: "humanities.philosophy.ethics", terms: philosophyEthicsVocab },
  {
    nodeId: "humanities.philosophy.ethics.normative",
    terms: philosophyNormativeVocab,
  },
  {
    nodeId: "humanities.philosophy.ethics.normative.consequentialism",
    terms: philosophyConsequentialismVocab,
  },
  {
    nodeId: "humanities.philosophy.political",
    terms: philosophyPoliticalVocab,
  },
  {
    nodeId: "humanities.philosophy.aesthetics",
    terms: philosophyAestheticsVocab,
  },
  {
    nodeId: "humanities.philosophy.science",
    terms: philosophyScienceVocab,
  },
] as const satisfies readonly NodeVocabularyRegistration[];
