import {
  comparativePoliticsVocab,
  internationalRelationsVocab,
  politicalBehaviorVocab,
  politicalEconomyVocab,
  politicalInstitutionsVocab,
  politicalMethodologyVocab,
  politicalTheoryVocab,
  publicPolicyVocab,
} from "./p/political-science-branches";
import { politicalScienceVocab } from "./p/political-science";
import type { NodeVocabularyRegistration } from "./aggregate.mjs";

export const POLITICAL_SCIENCE_VOCABULARY_REGISTRATIONS = [
  { nodeId: "social.political-science", terms: politicalScienceVocab },
  {
    nodeId: "social.political-science.theory",
    terms: politicalTheoryVocab,
  },
  {
    nodeId: "social.political-science.comparative",
    terms: comparativePoliticsVocab,
  },
  {
    nodeId: "social.political-science.institutions",
    terms: politicalInstitutionsVocab,
  },
  {
    nodeId: "social.political-science.behavior",
    terms: politicalBehaviorVocab,
  },
  { nodeId: "social.political-science.policy", terms: publicPolicyVocab },
  {
    nodeId: "social.political-science.international-relations",
    terms: internationalRelationsVocab,
  },
  {
    nodeId: "social.political-science.political-economy",
    terms: politicalEconomyVocab,
  },
  {
    nodeId: "social.political-science.methods",
    terms: politicalMethodologyVocab,
  },
] as const satisfies readonly NodeVocabularyRegistration[];
