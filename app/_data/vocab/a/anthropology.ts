import type { VocabTerm } from "@/app/_data/vocab/types";

export const anthropologyVocab: VocabTerm[] = [
  {
    id: "anth-anthropology",
    word: "Anthropology",
    definition:
      "The comparative study of human life across culture, language, biology, material evidence, history, environment, and relationships, using methods and ethical obligations fitted to the question.",
    domain: "Anthropology",
    tags: ["Humanity", "Comparison"],
    relatedTerms: ["anth-holism", "anth-comparative-approach"],
    isAdult: false,
  },
  {
    id: "anth-culture",
    word: "Culture",
    definition:
      "Learned, shared, contested, and changing patterns of meaning and practice made through social relationships, institutions, histories, material conditions, and human creativity.",
    domain: "Anthropology",
    tags: ["Meaning", "Practice"],
    relatedTerms: ["anth-context", "anth-cultural-relativism"],
    isAdult: false,
  },
  {
    id: "anth-holism",
    word: "Anthropological Holism",
    definition:
      "An orientation that relates biological, social, linguistic, material, historical, and environmental dimensions while still respecting the limits of each evidence stream.",
    domain: "Anthropology",
    tags: ["Synthesis", "Relationship"],
    relatedTerms: ["anth-anthropology", "anth-context"],
    isAdult: false,
  },
  {
    id: "anth-comparative-approach",
    word: "Comparative Approach",
    definition:
      "A disciplined comparison across people, communities, populations, places, periods, languages, or material records that states comparable dimensions and resists assuming one universal path.",
    domain: "Anthropology",
    tags: ["Comparison", "Method"],
    relatedTerms: ["anth-context", "anth-human-variation"],
    isAdult: false,
  },
  {
    id: "anth-context",
    word: "Anthropological Context",
    definition:
      "The relationships around a record—who, where, when, how, with whom, under what conditions, and through whose categories—that shape what it can mean and support.",
    domain: "Anthropology",
    tags: ["Evidence", "Boundary"],
    relatedTerms: ["anth-positionality", "anth-provenience"],
    isAdult: false,
  },
  {
    id: "anth-positionality",
    word: "Positionality",
    definition:
      "The researcher's social position, relationships, assumptions, access, power, and history as factors that shape questions, encounters, records, interpretation, and consequences.",
    domain: "Anthropology",
    tags: ["Reflexivity", "Method"],
    relatedTerms: ["anth-context", "anth-informed-consent"],
    isAdult: false,
  },
  {
    id: "anth-informed-consent",
    word: "Informed Consent",
    definition:
      "A continuing process through which people receive understandable information about research, risks, uses, choices, and limits and can decide freely whether and how to participate.",
    domain: "Anthropology",
    tags: ["Ethics", "Permission"],
    relatedTerms: ["anth-reciprocity", "anth-stewardship"],
    isAdult: false,
  },
  {
    id: "anth-reciprocity",
    word: "Research Reciprocity",
    definition:
      "The obligation to consider what collaborators and affected communities receive, control, need, risk, or sustain through a research relationship rather than treating participation as extraction.",
    domain: "Anthropology",
    tags: ["Ethics", "Relationship"],
    relatedTerms: ["anth-informed-consent", "anth-stewardship"],
    isAdult: false,
  },
  {
    id: "anth-stewardship",
    word: "Anthropological Stewardship",
    definition:
      "Responsible care for records, materials, knowledge, access, privacy, provenance, rights, consultation, return, preservation, and consequences across and beyond a research project.",
    domain: "Anthropology",
    tags: ["Collections", "Ethics"],
    relatedTerms: ["anth-informed-consent", "anth-provenience"],
    isAdult: false,
  },
  {
    id: "anth-human-variation",
    word: "Human Variation",
    definition:
      "Differences and similarities among people and populations described through distributions, overlap, ancestry, development, environment, culture, history, and measurement rather than fixed racial types.",
    domain: "Anthropology",
    tags: ["Biology", "Population"],
    relatedTerms: ["anth-biocultural-approach", "anth-comparative-approach"],
    isAdult: false,
  },
];
