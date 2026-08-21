import { computerScienceVocab } from "./c/computer-science";
import {
  artificialIntelligenceComputerScienceVocab,
  computationTheoryComputerScienceVocab,
  computerAlgorithmsVocab,
  computerHardwareVocab,
  computerSecurityVocab,
  computerSoftwareVocab,
} from "./c/computer-science-branches";
import type { NodeVocabularyRegistration } from "./aggregate.mjs";

export const COMPUTER_SCIENCE_VOCABULARY_REGISTRATIONS = [
  { nodeId: "formal.computer-science", terms: computerScienceVocab },
  { nodeId: "formal.computer-science.hardware", terms: computerHardwareVocab },
  { nodeId: "formal.computer-science.software", terms: computerSoftwareVocab },
  {
    nodeId: "formal.computer-science.algorithms",
    terms: computerAlgorithmsVocab,
  },
  {
    nodeId: "formal.computer-science.artificial-intelligence",
    terms: artificialIntelligenceComputerScienceVocab,
  },
  {
    nodeId: "formal.computer-science.theory",
    terms: computationTheoryComputerScienceVocab,
  },
  { nodeId: "formal.computer-science.security", terms: computerSecurityVocab },
] as const satisfies readonly NodeVocabularyRegistration[];
