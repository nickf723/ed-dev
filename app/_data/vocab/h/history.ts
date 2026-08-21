import type { VocabTerm } from "../types";

export const historyVocab: VocabTerm[] = [
  {
    id: "history-history",
    word: "History",
    definition:
      "The evidence-based study and interpretation of human pasts, including change, continuity, experience, and explanation.",
    domain: "History",
    tags: ["Past", "Interpretation"],
    relatedTerms: ["history-historical-evidence"],
    isAdult: false,
  },
  {
    id: "history-historical-evidence",
    word: "Historical Evidence",
    definition:
      "A surviving trace used to support, limit, revise, or challenge a claim about the past.",
    domain: "History",
    tags: ["Evidence", "Claims"],
    relatedTerms: ["history-source", "history-corroboration"],
    isAdult: false,
  },
  {
    id: "history-source",
    word: "Historical Source",
    definition:
      "A document, object, image, recording, testimony, landscape, dataset, or other trace examined in relation to a historical question.",
    domain: "History",
    tags: ["Evidence", "Trace"],
    relatedTerms: ["history-primary-source", "history-secondary-source"],
    isAdult: false,
  },
  {
    id: "history-primary-source",
    word: "Primary Source",
    definition:
      "A source directly connected to the period, people, activity, or phenomenon being investigated; the classification depends on the research question.",
    domain: "History",
    tags: ["Sources", "Question"],
    relatedTerms: ["history-secondary-source"],
    isAdult: false,
  },
  {
    id: "history-secondary-source",
    word: "Secondary Source",
    definition:
      "A later analysis or interpretation that uses other sources to explain, synthesize, or debate the past.",
    domain: "History",
    tags: ["Sources", "Interpretation"],
    relatedTerms: ["history-primary-source"],
    isAdult: false,
  },
  {
    id: "history-contextualization",
    word: "Contextualization",
    definition:
      "Locating evidence within the relevant time, place, institutions, conventions, events, audiences, and conditions of production.",
    domain: "History",
    tags: ["Context", "Sources"],
    relatedTerms: ["history-provenance"],
    isAdult: false,
  },
  {
    id: "history-provenance",
    word: "Source Provenance",
    definition:
      "The documented origin, custody, transformations, survival, and discovery of a historical source.",
    domain: "History",
    tags: ["Origin", "Custody"],
    relatedTerms: ["history-contextualization"],
    isAdult: false,
  },
  {
    id: "history-corroboration",
    word: "Corroboration",
    definition:
      "Comparing independent evidence to identify agreement, conflict, silence, and the limits of a historical claim.",
    domain: "History",
    tags: ["Comparison", "Evidence"],
    relatedTerms: ["history-historical-evidence"],
    isAdult: false,
  },
  {
    id: "history-perspective",
    word: "Perspective",
    definition:
      "A historically situated point of view shaped by a person's position, experience, purposes, concepts, and available information.",
    domain: "History",
    tags: ["Viewpoint", "Context"],
    relatedTerms: ["history-contextualization"],
    isAdult: false,
  },
  {
    id: "history-historical-interpretation",
    word: "Historical Interpretation",
    definition:
      "An evidence-based account that selects, relates, and explains traces of the past while remaining open to revision.",
    domain: "History",
    tags: ["Explanation", "Argument"],
    relatedTerms: ["history-historical-claim"],
    isAdult: false,
  },
  {
    id: "history-historical-claim",
    word: "Historical Claim",
    definition:
      "A contestable statement about the past whose scope and confidence should be supported by identified evidence and reasoning.",
    domain: "History",
    tags: ["Argument", "Evidence"],
    relatedTerms: ["history-historical-interpretation"],
    isAdult: false,
  },
  {
    id: "history-source-criticism",
    word: "Source Criticism",
    definition:
      "The systematic evaluation of a source's origin, purpose, form, audience, reliability for a question, transmission, and relationship to other evidence.",
    domain: "History",
    tags: ["Method", "Evaluation"],
    relatedTerms: ["history-corroboration"],
    isAdult: false,
  },
  {
    id: "history-archive",
    word: "Archive",
    definition:
      "A body of records preserved and arranged through institutions or practices whose selection and description shape research access.",
    domain: "History",
    tags: ["Collection", "Preservation"],
    relatedTerms: ["history-silence"],
    isAdult: false,
  },
  {
    id: "history-silence",
    word: "Archival Silence",
    definition:
      "An absence or underrepresentation in surviving records that may result from power, creation, preservation, collection, description, access, or loss.",
    domain: "History",
    tags: ["Absence", "Power"],
    relatedTerms: ["history-archive"],
    isAdult: false,
  },
];
