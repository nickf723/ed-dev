import {
  archivesPreservationVocab,
  bibliometricsVocab,
  encodingRepresentationVocab,
  informationBehaviorVocab,
  informationRetrievalVocab,
  knowledgeGraphsVocab,
  metadataSemanticsVocab,
  taxonomyOntologyVocab,
} from "./i/information-science-branches";
import { informationScienceVocab } from "./i/information-science";
import { informationTheoryVocab } from "./i/information-theory";
import type { NodeVocabularyRegistration } from "./aggregate.mjs";

export const INFORMATION_SCIENCE_VOCABULARY_REGISTRATIONS = [
  { nodeId: "formal.information-science", terms: informationScienceVocab },
  { nodeId: "formal.information-science.information-theory", terms: informationTheoryVocab },
  { nodeId: "formal.information-science.encoding-representation", terms: encodingRepresentationVocab },
  { nodeId: "formal.information-science.metadata-semantics", terms: metadataSemanticsVocab },
  { nodeId: "formal.information-science.information-retrieval", terms: informationRetrievalVocab },
  { nodeId: "formal.information-science.taxonomy-ontology", terms: taxonomyOntologyVocab },
  { nodeId: "formal.information-science.knowledge-graphs", terms: knowledgeGraphsVocab },
  { nodeId: "formal.information-science.archives-preservation", terms: archivesPreservationVocab },
  { nodeId: "formal.information-science.information-behavior", terms: informationBehaviorVocab },
  { nodeId: "formal.information-science.bibliometrics", terms: bibliometricsVocab },
] as const satisfies readonly NodeVocabularyRegistration[];
