import type { CurriculumNode } from "@/lib/curriculum/types";

function branch(
  id: string,
  label: string,
  href: string,
  description: string,
): CurriculumNode {
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

export const LITERATURE_CURRICULUM: CurriculumNode = {
  id: "humanities.literature",
  label: "Literature",
  href: "/humanities/literature",
  description:
    "Study how written and performed texts create meaning through form, language, voice, narrative, genre, history, interpretation, and relationships among readers, writers, and cultures.",
  domainId: "humanities",
  status: "active",
  pageKind: "hub",
  children: [
    branch(
      "humanities.literature.narrative-fiction",
      "Narrative & Fiction",
      "/humanities/literature/narrative-fiction",
      "Narrators, characters, plot, time, point of view, world-building, genre, narrative structure, and the many ways prose fiction organizes experience.",
    ),
    branch(
      "humanities.literature.poetry",
      "Poetry & Poetics",
      "/humanities/literature/poetry",
      "Line, stanza, rhythm, sound, image, figurative language, voice, form, free verse, and traditions of poetic making and interpretation.",
    ),
    branch(
      "humanities.literature.drama",
      "Drama & Performance Texts",
      "/humanities/literature/drama",
      "Dialogue, scene, stage direction, dramatic structure, performance, audience, tragedy, comedy, and texts written to become events in space and time.",
    ),
    branch(
      "humanities.literature.nonfiction",
      "Nonfiction & Essay",
      "/humanities/literature/nonfiction",
      "Memoir, essay, literary journalism, argument, voice, evidence, reflection, rhetoric, and the boundary between factual claim and crafted form.",
    ),
    branch(
      "humanities.literature.style",
      "Literary Language & Style",
      "/humanities/literature/style",
      "Diction, syntax, image, metaphor, symbol, irony, rhythm, sound, ambiguity, register, and the local choices that shape a reader's experience.",
    ),
    branch(
      "humanities.literature.criticism",
      "Criticism & Theory",
      "/humanities/literature/criticism",
      "Close reading, interpretation, argument, critical frameworks, reader response, form, ideology, identity, power, and debates about how texts mean.",
    ),
    branch(
      "humanities.literature.comparative",
      "World & Comparative Literature",
      "/humanities/literature/comparative",
      "Texts across languages, cultures, regions, translation, circulation, adaptation, influence, colonial histories, diaspora, and cross-cultural comparison.",
    ),
    branch(
      "humanities.literature.history",
      "Literary History & Movements",
      "/humanities/literature/history",
      "Literary periods, movements, publishing conditions, technologies, institutions, audiences, canons, and changing relationships between texts and their historical worlds.",
    ),
  ],
};
