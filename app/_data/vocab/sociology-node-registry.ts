import { sociologyVocab } from "./s/sociology";
import {
  sociologyChangeVocab,
  sociologyDemographyVocab,
  sociologyInstitutionsVocab,
  sociologyInteractionVocab,
  sociologyNetworksVocab,
  sociologyStratificationVocab,
  sociologyTheoryMethodsVocab,
} from "./s/sociology-branches";
import type { NodeVocabularyRegistration } from "./aggregate.mjs";

export const SOCIOLOGY_VOCABULARY_REGISTRATIONS = [
  { nodeId: "social.sociology", terms: sociologyVocab },
  { nodeId: "social.sociology.interaction", terms: sociologyInteractionVocab },
  { nodeId: "social.sociology.groups-networks", terms: sociologyNetworksVocab },
  {
    nodeId: "social.sociology.institutions",
    terms: sociologyInstitutionsVocab,
  },
  {
    nodeId: "social.sociology.stratification",
    terms: sociologyStratificationVocab,
  },
  { nodeId: "social.sociology.demography", terms: sociologyDemographyVocab },
  { nodeId: "social.sociology.social-change", terms: sociologyChangeVocab },
  {
    nodeId: "social.sociology.theory-methods",
    terms: sociologyTheoryMethodsVocab,
  },
] as const satisfies readonly NodeVocabularyRegistration[];
