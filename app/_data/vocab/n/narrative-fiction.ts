import type { VocabTerm } from "../types";

export const narrativeFictionVocab: VocabTerm[] = [
  {
    id: "narrative-story",
    word: "Story",
    definition:
      "The events, participants, and situations a reader reconstructs in their chronological and causal relations, regardless of the order in which the narrative presents them.",
    domain: "Narrative & Fiction",
    tags: ["Narratology", "Events", "Time"],
    relatedTerms: ["narrative-plot", "narrative-anachrony"],
    isAdult: false,
  },
  {
    id: "narrative-plot",
    word: "Plot",
    definition:
      "The selection and arrangement through which a narrative presents story material, including the order, duration, emphasis, gaps, and causal connections a reader encounters.",
    domain: "Narrative & Fiction",
    tags: ["Narratology", "Structure", "Time"],
    relatedTerms: ["narrative-story", "narrative-anachrony"],
    isAdult: false,
  },
  {
    id: "narrative-narrator",
    word: "Narrator",
    definition:
      "The voice or textual agency that tells a narrative; the narrator may be a character or may stand outside the story and should not automatically be equated with the author.",
    domain: "Narrative & Fiction",
    tags: ["Voice", "Perspective", "Narratology"],
    relatedTerms: ["narrative-focalization"],
    isAdult: false,
  },
  {
    id: "narrative-focalization",
    word: "Focalization",
    definition:
      "The filtering of narrative information through a particular position of perception or knowledge—often summarized as the distinction between who perceives and who speaks.",
    domain: "Narrative & Fiction",
    tags: ["Perspective", "Knowledge", "Narratology"],
    relatedTerms: ["narrative-narrator"],
    isAdult: false,
  },
  {
    id: "narrative-anachrony",
    word: "Anachrony",
    definition:
      "A mismatch between the chronological order of story events and the order in which they are narrated, including retrospection and anticipation.",
    domain: "Narrative & Fiction",
    tags: ["Time", "Order", "Narratology"],
    relatedTerms: ["narrative-story", "narrative-plot"],
    isAdult: false,
  },
  {
    id: "narrative-scene",
    word: "Scene",
    definition:
      "A mode of presentation that renders an event with relatively sustained detail, often making reading time feel closer to the represented event's duration.",
    domain: "Narrative & Fiction",
    tags: ["Pacing", "Duration", "Structure"],
    relatedTerms: ["narrative-summary"],
    isAdult: false,
  },
  {
    id: "narrative-summary",
    word: "Summary",
    definition:
      "A mode of presentation that compresses a comparatively long span of story time into a shorter stretch of narration.",
    domain: "Narrative & Fiction",
    tags: ["Pacing", "Duration", "Structure"],
    relatedTerms: ["narrative-scene"],
    isAdult: false,
  },
  {
    id: "narrative-characterization",
    word: "Characterization",
    definition:
      "The textual construction of a character through action, speech, thought, description, relation, pattern, contradiction, and other evidence available to the reader.",
    domain: "Narrative & Fiction",
    tags: ["Character", "Evidence", "Interpretation"],
    isAdult: false,
  },
  {
    id: "narrative-storyworld",
    word: "Storyworld",
    definition:
      "The world a reader reconstructs from a narrative, including its places, times, inhabitants, objects, rules, social relations, and possible events.",
    domain: "Narrative & Fiction",
    tags: ["Setting", "World", "Narratology"],
    isAdult: false,
  },
  {
    id: "narrative-genre-convention",
    word: "Genre Convention",
    definition:
      "A historically changing expectation about the forms, situations, styles, or effects associated with a genre; conventions can be followed, combined, revised, or resisted.",
    domain: "Narrative & Fiction",
    tags: ["Genre", "Convention", "History"],
    isAdult: false,
  },
];
