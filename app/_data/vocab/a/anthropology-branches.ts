import type { VocabTerm } from "@/app/_data/vocab/types";

export const culturalAnthropologyVocab: VocabTerm[] = [
  {
    id: "anth-ethnography",
    word: "Ethnography",
    definition:
      "A sustained, contextual, and reflexive approach to learning with and about people through observation, participation, conversation, records, and other methods, and the account produced from that work.",
    domain: "Cultural Anthropology",
    tags: ["Fieldwork", "Interpretation"],
    relatedTerms: ["anth-positionality", "anth-cultural-relativism"],
    isAdult: false,
  },
  {
    id: "anth-cultural-relativism",
    word: "Cultural Relativism",
    definition:
      "A methodological commitment to understand beliefs and practices in their own historical and social contexts before judging or explaining them; it does not require accepting every practice as ethical.",
    domain: "Cultural Anthropology",
    tags: ["Context", "Interpretation"],
    relatedTerms: ["anth-culture", "anth-ethnography"],
    isAdult: false,
  },
];

export const biologicalAnthropologyVocab: VocabTerm[] = [
  {
    id: "anth-bipedalism",
    word: "Bipedalism",
    definition:
      "Habitual movement on two legs, studied through anatomy, biomechanics, footprints, fossils, development, behavior, environment, and comparison rather than as a single trait appearing all at once.",
    domain: "Biological Anthropology",
    tags: ["Locomotion", "Evolution"],
    relatedTerms: ["anth-human-variation", "anth-biocultural-approach"],
    isAdult: false,
  },
  {
    id: "anth-biocultural-approach",
    word: "Biocultural Approach",
    definition:
      "An approach that studies biological bodies and processes together with social conditions, culture, political economy, environment, development, history, and lived experience.",
    domain: "Biological Anthropology",
    tags: ["Biology", "Culture"],
    relatedTerms: ["anth-human-variation", "anth-holism"],
    isAdult: false,
  },
];

export const archaeologyAnthropologyVocab: VocabTerm[] = [
  {
    id: "anth-provenience",
    word: "Provenience",
    definition:
      "The recorded three-dimensional location and contextual association of an archaeological find within a site or survey, distinguished from the wider ownership and collection history often called provenance.",
    domain: "Archaeology",
    tags: ["Location", "Context"],
    relatedTerms: ["anth-stratigraphy", "anth-stewardship"],
    isAdult: false,
  },
  {
    id: "anth-stratigraphy",
    word: "Archaeological Stratigraphy",
    definition:
      "The study of deposits, cuts, fills, interfaces, features, sequences, and formation processes to reconstruct relative relationships through documented context rather than depth alone.",
    domain: "Archaeology",
    tags: ["Layer", "Sequence"],
    relatedTerms: ["anth-provenience", "anth-context"],
    isAdult: false,
  },
];

export const linguisticAnthropologyVocab: VocabTerm[] = [
  {
    id: "anth-speech-community",
    word: "Speech Community",
    definition:
      "A group connected through shared or negotiated norms for using and interpreting language, whose boundaries may overlap and need not match one language, place, ethnicity, or nation.",
    domain: "Linguistic Anthropology",
    tags: ["Language", "Community"],
    relatedTerms: ["anth-language-ideology", "anth-context"],
    isAdult: false,
  },
  {
    id: "anth-language-ideology",
    word: "Language Ideology",
    definition:
      "Beliefs and assumptions about language, speakers, correctness, identity, authority, and social difference that shape interaction and can naturalize power relations.",
    domain: "Linguistic Anthropology",
    tags: ["Language", "Power"],
    relatedTerms: ["anth-speech-community", "anth-culture"],
    isAdult: false,
  },
];

export const anthropologyBranchVocab = [
  ...culturalAnthropologyVocab,
  ...biologicalAnthropologyVocab,
  ...archaeologyAnthropologyVocab,
  ...linguisticAnthropologyVocab,
];
