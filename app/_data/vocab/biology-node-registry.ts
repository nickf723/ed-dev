import { botanyVocab } from "./b/botany";
import { biologyVocab } from "./natural-science/biology";
import {
  biologyAnatomyVocab,
  biologyCytologyVocab,
  biologyEcologyVocab,
  biologyEvolutionVocab,
  biologyGeneticsVocab,
  biologyMicrobiologyVocab,
  biologyMolecularVocab,
  biologyMycologyVocab,
  biologyZoologyComparativeVocab,
  biologyZoologyDiversityVocab,
  biologyZoologyEthologyVocab,
  biologyZoologyPaleoVocab,
  biologyZoologyVocab,
} from "./natural-science/biology/branches";
import type { NodeVocabularyRegistration } from "./aggregate.mjs";

export const BIOLOGY_VOCABULARY_REGISTRATIONS = [
  {
    nodeId: "natural.biology",
    terms: biologyVocab,
  },
  {
    nodeId: "natural.biology.cytology",
    terms: biologyCytologyVocab,
  },
  {
    nodeId: "natural.biology.genetics",
    terms: biologyGeneticsVocab,
  },
  {
    nodeId: "natural.biology.molecular",
    terms: biologyMolecularVocab,
  },
  {
    nodeId: "natural.biology.microbiology",
    terms: biologyMicrobiologyVocab,
  },
  {
    nodeId: "natural.biology.mycology",
    terms: biologyMycologyVocab,
  },
  {
    nodeId: "natural.biology.botany",
    terms: botanyVocab,
  },
  {
    nodeId: "natural.biology.zoology",
    terms: biologyZoologyVocab,
  },
  {
    nodeId: "natural.biology.zoology.diversity",
    terms: biologyZoologyDiversityVocab,
  },
  {
    nodeId: "natural.biology.zoology.comparative",
    terms: biologyZoologyComparativeVocab,
  },
  {
    nodeId: "natural.biology.zoology.ethology",
    terms: biologyZoologyEthologyVocab,
  },
  {
    nodeId: "natural.biology.zoology.paleozoology",
    terms: biologyZoologyPaleoVocab,
  },
  {
    nodeId: "natural.biology.anatomy",
    terms: biologyAnatomyVocab,
  },
  {
    nodeId: "natural.biology.ecology",
    terms: biologyEcologyVocab,
  },
  {
    nodeId: "natural.biology.evolution",
    terms: biologyEvolutionVocab,
  },
] as const satisfies readonly NodeVocabularyRegistration[];
