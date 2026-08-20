import type { CurriculumNode } from "@/lib/curriculum/types";

function branch(
  id: string,
  label: string,
  href: string,
  description: string
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

function plannedLesson(
  id: string,
  label: string,
  href: string,
  description: string
): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "humanities",
    status: "placeholder",
    pageKind: "lesson",
  };
}

const NARRATIVE_FICTION_CURRICULUM: CurriculumNode = {
  id: "humanities.literature.narrative-fiction",
  label: "Narrative & Fiction",
  href: "/humanities/literature/narrative-fiction",
  description:
    "Study how narrators, characters, plot, time, setting, scene, conflict, structure, and genre arrange story material into a reader's experience.",
  domainId: "humanities",
  status: "active",
  pageKind: "unit",
  children: [
    plannedLesson(
      "humanities.literature.narrative-fiction.narrator-perspective",
      "Narrator & Perspective",
      "/humanities/literature/narrative-fiction/narrator-perspective",
      "Distinguish author, narrator, and focalizer; trace who speaks, who perceives, what can be known, and what a telling withholds."
    ),
    plannedLesson(
      "humanities.literature.narrative-fiction.story-plot-time",
      "Story, Plot & Time",
      "/humanities/literature/narrative-fiction/story-plot-time",
      "Compare chronological events with presentation order, duration, frequency, flashback, anticipation, pause, scene, summary, and omission."
    ),
    plannedLesson(
      "humanities.literature.narrative-fiction.character-desire",
      "Character & Desire",
      "/humanities/literature/narrative-fiction/character-desire",
      "Infer characters from action, speech, thought, relation, description, pressure, change, contradiction, desire, and the limits of available evidence."
    ),
    plannedLesson(
      "humanities.literature.narrative-fiction.setting-world",
      "Setting & World",
      "/humanities/literature/narrative-fiction/setting-world",
      "Read place, time, material conditions, social rules, atmosphere, scale, and world knowledge as active constraints on possible action."
    ),
    plannedLesson(
      "humanities.literature.narrative-fiction.scene-conflict-structure",
      "Scene, Conflict & Structure",
      "/humanities/literature/narrative-fiction/scene-conflict-structure",
      "Track units of action, pressures, reversals, gaps, escalation, causality, consequence, and the shapes that organize narrative change."
    ),
    plannedLesson(
      "humanities.literature.narrative-fiction.genre-convention",
      "Genre & Convention",
      "/humanities/literature/narrative-fiction/genre-convention",
      "Use genre as a changing set of expectations and conventions rather than a rigid box, then notice how texts fulfill, combine, or resist them."
    ),
  ],
};

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
    NARRATIVE_FICTION_CURRICULUM,
    branch(
      "humanities.literature.poetry",
      "Poetry & Poetics",
      "/humanities/literature/poetry",
      "Line, stanza, rhythm, sound, image, figurative language, voice, form, free verse, and traditions of poetic making and interpretation."
    ),
    branch(
      "humanities.literature.drama",
      "Drama & Performance Texts",
      "/humanities/literature/drama",
      "Dialogue, scene, stage direction, dramatic structure, performance, audience, tragedy, comedy, and texts written to become events in space and time."
    ),
    branch(
      "humanities.literature.nonfiction",
      "Nonfiction & Essay",
      "/humanities/literature/nonfiction",
      "Memoir, essay, literary journalism, argument, voice, evidence, reflection, rhetoric, and the boundary between factual claim and crafted form."
    ),
    branch(
      "humanities.literature.style",
      "Literary Language & Style",
      "/humanities/literature/style",
      "Diction, syntax, image, metaphor, symbol, irony, rhythm, sound, ambiguity, register, and the local choices that shape a reader's experience."
    ),
    branch(
      "humanities.literature.criticism",
      "Criticism & Theory",
      "/humanities/literature/criticism",
      "Close reading, interpretation, argument, critical frameworks, reader response, form, ideology, identity, power, and debates about how texts mean."
    ),
    branch(
      "humanities.literature.comparative",
      "World & Comparative Literature",
      "/humanities/literature/comparative",
      "Texts across languages, cultures, regions, translation, circulation, adaptation, influence, colonial histories, diaspora, and cross-cultural comparison."
    ),
    branch(
      "humanities.literature.history",
      "Literary History & Movements",
      "/humanities/literature/history",
      "Literary periods, movements, publishing conditions, technologies, institutions, audiences, canons, and changing relationships between texts and their historical worlds."
    ),
  ],
};
