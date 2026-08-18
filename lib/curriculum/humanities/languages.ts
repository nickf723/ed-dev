import type { CurriculumNode } from "@/lib/curriculum/types";

function branch(id: string, label: string, href: string, description: string): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "humanities",
    status: "placeholder",
    pageKind: "unit",
  };
}

export const LANGUAGES_CURRICULUM: CurriculumNode = {
  id: "humanities.languages",
  label: "Languages",
  href: "/humanities/languages",
  description:
    "Learn and use human languages through speaking, signing, listening, reading, writing, translation, cultural context, literature, historical traditions, and sustained communicative practice.",
  domainId: "humanities",
  status: "active",
  pageKind: "hub",
  children: [
    branch(
      "humanities.languages.modern",
      "Modern Languages",
      "/humanities/languages/modern",
      "Living spoken languages studied for communication, literacy, cultural participation, travel, professional use, heritage, scholarship, and access to literature and media.",
    ),
    branch(
      "humanities.languages.signed",
      "Signed Languages",
      "/humanities/languages/signed",
      "Natural visual-spatial languages and Deaf community language traditions, including their own grammars, literatures, regional variation, histories, and cultural contexts.",
    ),
    branch(
      "humanities.languages.classical-historical",
      "Classical & Historical Languages",
      "/humanities/languages/classical-historical",
      "Languages studied through surviving texts, inscriptions, manuscripts, reconstructed pronunciation, historical grammar, translation, philology, and changing traditions of use.",
    ),
    branch(
      "humanities.languages.constructed",
      "Constructed Languages",
      "/humanities/languages/constructed",
      "Deliberately created languages, including international auxiliary, artistic, experimental, and engineered projects, studied through design goals, grammar, lexicon, community, and use.",
    ),
    branch(
      "humanities.languages.writing-literacy",
      "Writing Systems & Literacy",
      "/humanities/languages/writing-literacy",
      "Learn scripts, spelling conventions, punctuation, reading direction, orthographic depth, keyboard/input methods, handwriting, calligraphic traditions, and literacy practices.",
    ),
    branch(
      "humanities.languages.translation-interpreting",
      "Translation & Interpreting",
      "/humanities/languages/translation-interpreting",
      "Meaning across languages and modalities: context, register, ambiguity, terminology, literary translation, community interpreting, simultaneous and consecutive interpreting, localization, and translation technology.",
    ),
    branch(
      "humanities.languages.learning-proficiency",
      "Language Learning & Proficiency",
      "/humanities/languages/learning-proficiency",
      "Vocabulary, grammar, pronunciation, comprehension, interaction, fluency, feedback, spaced practice, extensive input, output, assessment, study strategy, and proficiency development over time.",
    ),
    branch(
      "humanities.languages.literature-culture",
      "Language, Literature & Culture",
      "/humanities/languages/literature-culture",
      "Use language study to engage literature, film, music, conversation, humor, rhetoric, historical documents, everyday genres, communities, and cultural contexts without reducing culture to vocabulary trivia.",
    ),
  ],
};
