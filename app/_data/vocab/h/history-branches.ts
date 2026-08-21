import type { VocabTerm } from "../types";

export const historyChronologyVocab: VocabTerm[] = [
  {
    id: "history-chronology",
    word: "Chronology",
    definition: "The ordering and dating of events and processes in time.",
    domain: "History by Time",
    tags: ["Sequence", "Dating"],
    relatedTerms: ["history-duration"],
    isAdult: false,
  },
  {
    id: "history-periodization",
    word: "Periodization",
    definition:
      "The analytical division of the past into named intervals whose boundaries emphasize some changes and continuities over others.",
    domain: "History by Time",
    tags: ["Eras", "Interpretation"],
    relatedTerms: ["history-era"],
    isAdult: false,
  },
  {
    id: "history-era",
    word: "Era",
    definition:
      "A named span of time defined for a historical purpose by selected characteristics or transitions.",
    domain: "History by Time",
    tags: ["Period", "Time"],
    relatedTerms: ["history-periodization"],
    isAdult: false,
  },
  {
    id: "history-sequence",
    word: "Sequence",
    definition: "The order in which dated events or stages occur.",
    domain: "History by Time",
    tags: ["Order", "Chronology"],
    relatedTerms: ["history-chronology"],
    isAdult: false,
  },
  {
    id: "history-duration",
    word: "Duration",
    definition:
      "The amount of time a state, event, process, or interval lasts under a stated dating convention.",
    domain: "History by Time",
    tags: ["Interval", "Time"],
    relatedTerms: ["history-chronology"],
    isAdult: false,
  },
  {
    id: "history-change",
    word: "Historical Change",
    definition:
      "A difference over time in institutions, relationships, environments, practices, ideas, populations, or material conditions.",
    domain: "History by Time",
    tags: ["Process", "Comparison"],
    relatedTerms: ["history-continuity"],
    isAdult: false,
  },
  {
    id: "history-continuity",
    word: "Historical Continuity",
    definition:
      "A pattern, institution, practice, or condition that persists across a period despite surrounding changes.",
    domain: "History by Time",
    tags: ["Persistence", "Comparison"],
    relatedTerms: ["history-change"],
    isAdult: false,
  },
  {
    id: "history-turning-point",
    word: "Turning Point",
    definition:
      "A proposed moment or interval after which a historically significant trajectory changes; its importance depends on scale and question.",
    domain: "History by Time",
    tags: ["Change", "Scale"],
    relatedTerms: ["history-periodization"],
    isAdult: false,
  },
  {
    id: "history-anachronism",
    word: "Anachronism",
    definition:
      "The mistaken placement of a person, object, concept, practice, or value in a time where it does not belong.",
    domain: "History by Time",
    tags: ["Error", "Context"],
    relatedTerms: ["history-contextualization"],
    isAdult: false,
  },
];

export const historyRegionalVocab: VocabTerm[] = [
  {
    id: "history-historical-geography",
    word: "Historical Geography",
    definition:
      "The study of how places, environments, territories, movement, and spatial relationships change through time.",
    domain: "History by Place",
    tags: ["Place", "Change"],
    relatedTerms: ["history-spatial-scale"],
    isAdult: false,
  },
  {
    id: "history-spatial-scale",
    word: "Spatial Scale",
    definition:
      "The geographic extent at which a historical question or claim is framed, such as local, regional, transregional, or global.",
    domain: "History by Place",
    tags: ["Scale", "Geography"],
    relatedTerms: ["history-historical-geography"],
    isAdult: false,
  },
  {
    id: "history-border",
    word: "Historical Border",
    definition:
      "A changing territorial, legal, cultural, ecological, or social boundary whose meaning and enforcement vary over time.",
    domain: "History by Place",
    tags: ["Territory", "Power"],
    relatedTerms: ["history-migration"],
    isAdult: false,
  },
  {
    id: "history-migration",
    word: "Migration",
    definition:
      "The movement of people across space and time, shaped by choice, coercion, networks, institutions, environments, and opportunity.",
    domain: "History by Place",
    tags: ["Movement", "People"],
    relatedTerms: ["history-network"],
    isAdult: false,
  },
  {
    id: "history-network",
    word: "Historical Network",
    definition:
      "A changing set of connections through which people, goods, information, practices, resources, or power move.",
    domain: "History by Place",
    tags: ["Connection", "Exchange"],
    relatedTerms: ["history-migration"],
    isAdult: false,
  },
  {
    id: "history-place",
    word: "Place",
    definition:
      "A location understood through its physical setting, human meanings, relationships, boundaries, and accumulated histories.",
    domain: "History by Place",
    tags: ["Geography", "Meaning"],
    relatedTerms: ["history-historical-geography"],
    isAdult: false,
  },
];

export const historyThemeVocab: VocabTerm[] = [
  {
    id: "history-thematic-history",
    word: "Thematic History",
    definition:
      "Historical study organized around a recurring problem or domain across multiple periods and places.",
    domain: "History by Theme",
    tags: ["Pattern", "Comparison"],
    relatedTerms: ["history-comparison"],
    isAdult: false,
  },
  {
    id: "history-causation",
    word: "Historical Causation",
    definition:
      "An argument about how conditions, actions, mechanisms, structures, and contingencies contributed to an outcome.",
    domain: "History by Theme",
    tags: ["Explanation", "Mechanism"],
    relatedTerms: ["history-contingency"],
    isAdult: false,
  },
  {
    id: "history-contingency",
    word: "Contingency",
    definition:
      "The dependence of an outcome on conditions and choices that could plausibly have unfolded differently.",
    domain: "History by Theme",
    tags: ["Possibility", "Causation"],
    relatedTerms: ["history-causation"],
    isAdult: false,
  },
  {
    id: "history-agency",
    word: "Historical Agency",
    definition:
      "The capacity of people and groups to make choices and act within enabling and constraining conditions.",
    domain: "History by Theme",
    tags: ["Action", "People"],
    relatedTerms: ["history-structure"],
    isAdult: false,
  },
  {
    id: "history-structure",
    word: "Historical Structure",
    definition:
      "A durable arrangement of institutions, relationships, resources, norms, or environments that shapes possible action.",
    domain: "History by Theme",
    tags: ["Constraint", "Institution"],
    relatedTerms: ["history-agency"],
    isAdult: false,
  },
  {
    id: "history-comparison",
    word: "Historical Comparison",
    definition:
      "The systematic examination of similarities and differences across cases to refine description and explanation.",
    domain: "History by Theme",
    tags: ["Cases", "Method"],
    relatedTerms: ["history-thematic-history"],
    isAdult: false,
  },
];

export const historyBranchVocab = [
  ...historyChronologyVocab,
  ...historyRegionalVocab,
  ...historyThemeVocab,
];
