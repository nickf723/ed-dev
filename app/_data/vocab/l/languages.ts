import type { VocabTerm } from "../types";

export const languagesVocab: VocabTerm[] = [
  {
    id: "lang-language-use",
    word: "Language Use",
    definition:
      "The situated use of a spoken, signed, written, or otherwise represented language to make and interpret meaning with particular people, purposes, genres, relationships, and communities.",
    domain: "Languages",
    tags: ["Communication", "Context"],
    relatedTerms: ["lang-communicative-competence", "lang-register"],
    isAdult: false,
  },
  {
    id: "lang-communicative-competence",
    word: "Communicative Competence",
    definition:
      "The developing ability to understand and produce language appropriately and effectively by coordinating form, meaning, discourse, interaction, strategy, and social context.",
    domain: "Languages",
    tags: ["Proficiency", "Communication"],
    relatedTerms: ["lang-receptive-skill", "lang-productive-skill"],
    isAdult: false,
  },
  {
    id: "lang-receptive-skill",
    word: "Receptive Language Skill",
    definition:
      "The ability to construct meaning while listening, watching signed language, or reading, using linguistic form together with context, expectation, inference, and prior knowledge.",
    domain: "Languages",
    tags: ["Comprehension", "Input"],
    relatedTerms: ["lang-productive-skill", "lang-learning-feedback"],
    isAdult: false,
  },
  {
    id: "lang-productive-skill",
    word: "Productive Language Skill",
    definition:
      "The ability to organize and express meaning through speaking, signing, or writing with attention to intelligibility, form, interaction, audience, purpose, and context.",
    domain: "Languages",
    tags: ["Expression", "Output"],
    relatedTerms: ["lang-receptive-skill", "lang-register"],
    isAdult: false,
  },
  {
    id: "lang-register",
    word: "Register",
    definition:
      "A patterned variety of language associated with a situation, relationship, activity, genre, or level of formality, shaping choices such as vocabulary, grammar, pronunciation, signing, and address.",
    domain: "Languages",
    tags: ["Context", "Variation"],
    relatedTerms: ["lang-language-use", "lang-genre"],
    isAdult: false,
  },
  {
    id: "lang-learning-feedback",
    word: "Language-Learning Feedback",
    definition:
      "Information from interlocutors, teachers, texts, recordings, self-observation, or task results that helps a learner notice a gap, test a revision, and adjust later language use.",
    domain: "Languages",
    tags: ["Learning", "Revision"],
    relatedTerms: ["lang-spaced-retrieval", "lang-communicative-competence"],
    isAdult: false,
  },
];
