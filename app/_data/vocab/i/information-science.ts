import type { VocabTerm } from "../types";

export const informationScienceVocab: VocabTerm[] = [
  {
    id: "info-information",
    word: "Information",
    definition:
      "Data interpreted in a context that gives it meaning or makes it useful for answering a question.",
    domain: "Information Science",
    tags: ["Meaning", "Data"],
    relatedTerms: ["info-metadata"],
    isAdult: false,
  },
  {
    id: "info-metadata",
    word: "Metadata",
    definition:
      "Structured information that describes another resource, such as its author, date, format, subject, or location.",
    domain: "Information Science",
    tags: ["Description", "Organization"],
    relatedTerms: ["info-classification"],
    isAdult: false,
  },
  {
    id: "info-classification",
    word: "Classification",
    definition:
      "The organization of items into categories according to shared properties or an agreed system of distinctions.",
    domain: "Information Science",
    tags: ["Organization", "Categories"],
    relatedTerms: ["info-metadata", "info-taxonomy"],
    isAdult: false,
  },
  {
    id: "info-taxonomy",
    word: "Taxonomy",
    definition:
      "A hierarchical system for naming and arranging concepts or resources into related categories.",
    domain: "Information Science",
    tags: ["Hierarchy", "Organization"],
    relatedTerms: ["info-classification"],
    isAdult: false,
  },
  {
    id: "info-retrieval",
    word: "Information Retrieval",
    definition:
      "The process of finding relevant information within a collection in response to a search or information need.",
    domain: "Information Science",
    tags: ["Search", "Relevance"],
    relatedTerms: ["info-index"],
    isAdult: false,
  },
  {
    id: "info-index",
    word: "Index",
    definition:
      "A structure that records where information can be found so a collection can be searched more efficiently.",
    domain: "Information Science",
    tags: ["Search", "Structure"],
    relatedTerms: ["info-retrieval"],
    isAdult: false,
  },
];
