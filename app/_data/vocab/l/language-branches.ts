import type { VocabTerm } from "../types";

export const modernLanguagesVocab: VocabTerm[] = [
  {
    id: "lang-target-language",
    word: "Target Language",
    definition:
      "A language a learner is currently working to understand or use; the term identifies a learning goal without implying that every learner begins from one language or shares the same purpose.",
    domain: "Modern Languages",
    tags: ["Learning Goal", "Language Use"],
    relatedTerms: ["lang-heritage-language", "lang-proficiency"],
    isAdult: false,
  },
  {
    id: "lang-heritage-language",
    word: "Heritage Language",
    definition:
      "A language connected to a learner through family, household, ancestry, or community experience, often with an uneven and individually specific profile across comprehension, speaking, signing, reading, and writing.",
    domain: "Modern Languages",
    tags: ["Community", "Identity"],
    relatedTerms: ["lang-target-language", "lang-speech-community"],
    isAdult: false,
  },
];

export const signedLanguagesVocab: VocabTerm[] = [
  {
    id: "lang-signed-language",
    word: "Signed Language",
    definition:
      "A natural language expressed primarily through visual-spatial or tactile-manual resources, with its own grammar, lexicon, variation, histories, and patterns of community use rather than a manual copy of a spoken language.",
    domain: "Signed Languages",
    tags: ["Modality", "Natural Language"],
    relatedTerms: ["lang-deaf-community", "lang-language-use"],
    isAdult: false,
  },
  {
    id: "lang-deaf-community",
    word: "Deaf Community",
    definition:
      "A culturally and socially connected community in which signed language, shared institutions, histories, arts, identities, and practices may be central, while individual hearing, language, and identity experiences remain diverse.",
    domain: "Signed Languages",
    tags: ["Community", "Culture"],
    relatedTerms: ["lang-signed-language", "lang-speech-community"],
    isAdult: false,
  },
];

export const classicalHistoricalLanguagesVocab: VocabTerm[] = [
  {
    id: "lang-philology",
    word: "Philology",
    definition:
      "The historically grounded study of language and texts through manuscripts, inscriptions, textual comparison, grammar, meaning, transmission, interpretation, and cultural context.",
    domain: "Classical & Historical Languages",
    tags: ["Texts", "History"],
    relatedTerms: ["lang-textual-transmission", "lang-translation"],
    isAdult: false,
  },
  {
    id: "lang-textual-transmission",
    word: "Textual Transmission",
    definition:
      "The copying, editing, translating, adapting, preserving, losing, and recirculating of texts across people, materials, places, and periods, producing variants that must be interpreted rather than erased.",
    domain: "Classical & Historical Languages",
    tags: ["Manuscripts", "Provenance"],
    relatedTerms: ["lang-philology", "lang-writing-system"],
    isAdult: false,
  },
];

export const constructedLanguagesVocab: VocabTerm[] = [
  {
    id: "lang-constructed-language",
    word: "Constructed Language",
    definition:
      "A language deliberately designed to some degree for artistic, auxiliary, experimental, engineered, or other purposes and potentially extended, changed, or conventionalized through community use.",
    domain: "Constructed Languages",
    tags: ["Design", "Community"],
    relatedTerms: ["lang-auxiliary-language", "lang-language-use"],
    isAdult: false,
  },
  {
    id: "lang-auxiliary-language",
    word: "International Auxiliary Language",
    definition:
      "A constructed language intended to support communication among people with different language backgrounds, evaluated through its design goals, learnability, use, community, history, and social context.",
    domain: "Constructed Languages",
    tags: ["Communication", "Design Goal"],
    relatedTerms: [
      "lang-constructed-language",
      "lang-communicative-competence",
    ],
    isAdult: false,
  },
];

export const writingLiteracyVocab: VocabTerm[] = [
  {
    id: "lang-writing-system",
    word: "Writing System",
    definition:
      "A conventional system for representing language visually or tactually through signs and structural principles, including but not limited to alphabetic, syllabic, and morphographic strategies.",
    domain: "Writing Systems & Literacy",
    tags: ["Script", "Representation"],
    relatedTerms: ["lang-orthography", "lang-textual-transmission"],
    isAdult: false,
  },
  {
    id: "lang-orthography",
    word: "Orthography",
    definition:
      "A community's conventional spelling and writing practices, including correspondences, word division, punctuation, capitalization or comparable distinctions, and accepted variation.",
    domain: "Writing Systems & Literacy",
    tags: ["Writing", "Convention"],
    relatedTerms: ["lang-writing-system", "lang-register"],
    isAdult: false,
  },
];

export const translationInterpretingVocab: VocabTerm[] = [
  {
    id: "lang-translation",
    word: "Translation",
    definition:
      "The production of a target text that responds to a source text under constraints of meaning, purpose, audience, genre, register, terminology, culture, medium, and target-language convention.",
    domain: "Translation & Interpreting",
    tags: ["Written Mediation", "Meaning"],
    relatedTerms: ["lang-interpreting", "lang-register"],
    isAdult: false,
  },
  {
    id: "lang-interpreting",
    word: "Interpreting",
    definition:
      "Real-time or time-constrained mediation between languages or modalities in spoken, signed, tactile, or mixed settings, requiring attention to meaning, interaction, role, ethics, access, and context.",
    domain: "Translation & Interpreting",
    tags: ["Live Mediation", "Interaction"],
    relatedTerms: ["lang-translation", "lang-communicative-competence"],
    isAdult: false,
  },
];

export const languageLearningProficiencyVocab: VocabTerm[] = [
  {
    id: "lang-proficiency",
    word: "Language Proficiency",
    definition:
      "A context- and task-sensitive profile of what a person can understand and do with a language across skills, purposes, conditions, and degrees of support rather than one percentage of a whole language.",
    domain: "Language Learning & Proficiency",
    tags: ["Ability", "Assessment"],
    relatedTerms: ["lang-communicative-competence", "lang-spaced-retrieval"],
    isAdult: false,
  },
  {
    id: "lang-spaced-retrieval",
    word: "Spaced Retrieval",
    definition:
      "Practice that asks a learner to recall information or produce a form across separated occasions, allowing effortful retrieval and feedback to strengthen later access without replacing meaningful use.",
    domain: "Language Learning & Proficiency",
    tags: ["Memory", "Practice"],
    relatedTerms: ["lang-learning-feedback", "lang-proficiency"],
    isAdult: false,
  },
];

export const languageLiteratureCultureVocab: VocabTerm[] = [
  {
    id: "lang-speech-community",
    word: "Speech Community",
    definition:
      "A group connected by shared or interacting norms for language use and interpretation; membership and boundaries may overlap, change, and include signed as well as spoken practices.",
    domain: "Language, Literature & Culture",
    tags: ["Community", "Norms"],
    relatedTerms: ["lang-genre", "lang-language-use"],
    isAdult: false,
  },
  {
    id: "lang-genre",
    word: "Genre",
    definition:
      "A socially recognizable type of communicative event or text whose recurring purposes, audiences, structures, styles, and expectations guide both production and interpretation.",
    domain: "Language, Literature & Culture",
    tags: ["Text", "Convention"],
    relatedTerms: ["lang-register", "lang-speech-community"],
    isAdult: false,
  },
];

export const languageBranchVocab: VocabTerm[] = [
  ...modernLanguagesVocab,
  ...signedLanguagesVocab,
  ...classicalHistoricalLanguagesVocab,
  ...constructedLanguagesVocab,
  ...writingLiteracyVocab,
  ...translationInterpretingVocab,
  ...languageLearningProficiencyVocab,
  ...languageLiteratureCultureVocab,
];
