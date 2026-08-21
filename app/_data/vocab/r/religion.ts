import type { VocabTerm } from "@/app/_data/vocab/types";

export const religionVocab: VocabTerm[] = [
  {
    id: "rel-religious-studies",
    word: "Religious Studies",
    definition:
      "The critical academic study of religion using historical, anthropological, sociological, textual, philosophical, archaeological, psychological, and other methods without requiring confessional agreement.",
    domain: "Religion",
    tags: ["Field", "Method"],
    relatedTerms: ["rel-confessional-descriptive", "rel-religious-literacy"],
    isAdult: false,
  },
  {
    id: "rel-religious-literacy",
    word: "Religious Literacy",
    definition:
      "The ability to describe and interpret religious traditions and expressions accurately enough to recognize internal diversity, historical change, social context, and the difference between descriptive and confessional claims.",
    domain: "Religion",
    tags: ["Interpretation", "Context"],
    relatedTerms: ["rel-internal-diversity", "rel-confessional-descriptive"],
    isAdult: false,
  },
  {
    id: "rel-tradition",
    word: "Religious Tradition",
    definition:
      "A changing and internally diverse inheritance of communities, practices, institutions, texts, objects, narratives, arguments, identities, and memories transmitted and remade through history.",
    domain: "Religion",
    tags: ["History", "Community"],
    relatedTerms: ["rel-internal-diversity", "rel-lived-religion"],
    isAdult: false,
  },
  {
    id: "rel-internal-diversity",
    word: "Internal Diversity",
    definition:
      "The normal presence of regional, historical, institutional, theological, political, generational, gendered, classed, racialized, and individual differences within what is named as one religion or tradition.",
    domain: "Religion",
    tags: ["Variation", "Community"],
    relatedTerms: ["rel-tradition", "rel-comparison"],
    isAdult: false,
  },
  {
    id: "rel-lived-religion",
    word: "Lived Religion",
    definition:
      "An approach that studies religion as people practice, negotiate, embody, feel, materialize, combine, contest, and interpret it in everyday life rather than only through official doctrine or institutions.",
    domain: "Religion",
    tags: ["Practice", "Everyday Life"],
    relatedTerms: ["rel-tradition", "rel-material-religion"],
    isAdult: false,
  },
  {
    id: "rel-confessional-descriptive",
    word: "Confessional–Descriptive Distinction",
    definition:
      "The distinction between claims made from within a tradition about what is true, authoritative, or required and academic claims describing or analyzing how such claims function in evidence and context.",
    domain: "Religion",
    tags: ["Claim", "Perspective"],
    relatedTerms: ["rel-religious-studies", "rel-religious-authority"],
    isAdult: false,
  },
  {
    id: "rel-comparison",
    word: "Comparative Method in Religion",
    definition:
      "A research operation that selects cases and dimensions for a stated purpose, examines similarity and difference, and resists treating one feature as proof of global equivalence or one tradition as the universal norm.",
    domain: "Religion",
    tags: ["Comparison", "Method"],
    relatedTerms: ["rel-context", "rel-internal-diversity"],
    isAdult: false,
  },
  {
    id: "rel-religious-authority",
    word: "Religious Authority",
    definition:
      "The socially recognized capacity of a person, office, text, institution, object, lineage, experience, tradition, or interpretation to guide belief or practice, always exercised and contested in context.",
    domain: "Religion",
    tags: ["Power", "Interpretation"],
    relatedTerms: ["rel-canon", "rel-tradition"],
    isAdult: false,
  },
  {
    id: "rel-context",
    word: "Religious Context",
    definition:
      "The relationships around a religious claim or record—speaker, audience, place, time, genre, language, institution, power, purpose, collection history, and use—that shape what it can support.",
    domain: "Religion",
    tags: ["Evidence", "Boundary"],
    relatedTerms: ["rel-interpretation", "rel-comparison"],
    isAdult: false,
  },
  {
    id: "rel-interpretation",
    word: "Religious Interpretation",
    definition:
      "A situated account of meaning that connects sources, methods, assumptions, readers or participants, histories, and consequences and remains open to corroboration, disagreement, and revision.",
    domain: "Religion",
    tags: ["Meaning", "Evidence"],
    relatedTerms: ["rel-context", "rel-hermeneutics"],
    isAdult: false,
  },
];
