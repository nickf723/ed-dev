import type {
  Course,
  CourseLesson,
  CourseUnit,
  StandardAlignment,
  StandardsFramework,
} from "@/lib/courses/types";

const NYS_ELA_STANDARDS_URL =
  "https://www.nysed.gov/sites/default/files/programs/standards-instruction/nys-next-generation-ela-standards.pdf";
const NYS_ELA_URL =
  "https://www.nysed.gov/standards-instruction/english-language-arts";
const UNIT_ONE_BASE = "/classroom/english/literature/unit-1";

export const NYS_LITERATURE_FRAMEWORK: StandardsFramework = {
  id: "nys-next-generation-ela-literature-9-10",
  label: "NYS Next Generation ELA Learning Standards · Grades 9–10",
  issuer: "New York State Education Department",
  sourceUrl: NYS_ELA_STANDARDS_URL,
  courseSourceUrl: NYS_ELA_URL,
  assessmentNote:
    "This course uses the grades 9–10 reading and writing standards as a flexible high-school literature foundation.",
  independenceNote:
    "Education Station is independently authored and standards-aligned. NYSED publishes standards, not this reading list or lesson sequence.",
  standards: [
    {
      code: "9-10R1",
      label: "Evidence and Inference",
      summary:
        "Cite strong textual evidence, distinguish explicit and implicit meaning, and make logical inferences.",
      sourcePage: 98,
    },
    {
      code: "9-10R3",
      label: "Character and Development",
      summary:
        "Analyze how characters develop, interact, advance plot, and contribute to theme.",
      sourcePage: 98,
    },
    {
      code: "9-10R4",
      label: "Language, Tone, and Mood",
      summary:
        "Analyze figurative and connotative meaning and the effects of specific word choices.",
      sourcePage: 98,
    },
    {
      code: "9-10R5",
      label: "Literary Structure",
      summary:
        "Analyze how structural choices create meaning and affect the reader.",
      sourcePage: 98,
    },
    {
      code: "9-10R6",
      label: "Point of View and Perspective",
      summary:
        "Analyze how point of view, perspective, and purpose shape explicit and implicit messages.",
      sourcePage: 98,
    },
    {
      code: "9-10W1",
      label: "Text-Based Argument",
      summary:
        "Write claims about texts using valid reasoning and relevant, sufficient evidence.",
      sourcePage: 100,
    },
    {
      code: "9-10W5",
      label: "Evidence in Writing",
      summary:
        "Draw evidence from literary texts to support analysis and reflection.",
      sourcePage: 101,
    },
  ],
};

function plannedLesson({
  slug,
  title,
  summary,
  outcome,
  knowledgeNodeId,
  alignment,
}: {
  slug: string;
  title: string;
  summary: string;
  outcome: string;
  knowledgeNodeId: string;
  alignment: readonly StandardAlignment[];
}): CourseLesson {
  return {
    id: `nys.literature.unit-1.${slug}`,
    slug,
    title,
    summary,
    outcome,
    durationMinutes: 45,
    status: "planned",
    href: `${UNIT_ONE_BASE}/${slug}`,
    knowledgeNodeId,
    alignment,
    teacher: {
      warmUp: `Read one short passage and ask what a reader can notice before naming ${title.toLowerCase()}.`,
      misconception:
        "Students may state an interpretation without tracing it back to a specific textual choice.",
      exitTicket: `Support one interpretation about ${title.toLowerCase()} with precise evidence.`,
    },
  };
}

const lessons: readonly CourseLesson[] = [
  {
    id: "nys.literature.unit-1.evidence-inference",
    slug: "evidence-inference",
    title: "Evidence & Inference",
    summary:
      "Separate what a text states from what a reader can reasonably infer, then choose evidence that actually supports the inference.",
    outcome:
      "Build a defensible inference from specific textual evidence and explain the reasoning that connects them.",
    durationMinutes: 45,
    status: "active",
    href: `${UNIT_ONE_BASE}/evidence-inference`,
    knowledgeNodeId: "humanities.literature.narrative-fiction.character-desire",
    alignment: [
      {
        code: "9-10R1",
        emphasis: "primary",
        note: "Distinguishes explicit detail, inference, evidence, and reasoning.",
      },
      {
        code: "9-10W5",
        emphasis: "primary",
        note: "Uses selected lines to support a short analytical explanation.",
      },
    ],
    teacher: {
      warmUp:
        "Show a muddy footprint beside a closed door and list observations separately from possible explanations.",
      misconception:
        "Students may treat any detail from the passage as evidence even when it does not logically support the chosen inference.",
      exitTicket:
        "Write one inference, cite the strongest line, and explain the connection without adding facts the text cannot support.",
    },
  },
  plannedLesson({
    slug: "narrator-perspective",
    title: "Narrator & Perspective",
    summary:
      "Distinguish author, narrator, and perceiving character while tracking what the telling reveals or withholds.",
    outcome: "Explain how perspective shapes the reader's access to events.",
    knowledgeNodeId:
      "humanities.literature.narrative-fiction.narrator-perspective",
    alignment: [
      {
        code: "9-10R6",
        emphasis: "primary",
        note: "Analyzes point of view and perspective.",
      },
    ],
  }),
  plannedLesson({
    slug: "character-desire",
    title: "Character & Desire",
    summary:
      "Infer goals and pressures from action, speech, thought, relationship, and contradiction.",
    outcome: "Use a pattern of details to explain what drives a character.",
    knowledgeNodeId: "humanities.literature.narrative-fiction.character-desire",
    alignment: [
      {
        code: "9-10R3",
        emphasis: "primary",
        note: "Analyzes character development and interaction.",
      },
    ],
  }),
  plannedLesson({
    slug: "structure-time",
    title: "Structure & Time",
    summary:
      "Compare story order with presentation order and notice scene, summary, pause, omission, and flashback.",
    outcome: "Explain how structural order changes the reader's experience.",
    knowledgeNodeId: "humanities.literature.narrative-fiction.story-plot-time",
    alignment: [
      {
        code: "9-10R5",
        emphasis: "primary",
        note: "Analyzes how structure creates meaning.",
      },
    ],
  }),
  plannedLesson({
    slug: "language-mood",
    title: "Language, Tone & Mood",
    summary:
      "Trace how diction, image, syntax, sound, and connotation shape a passage.",
    outcome: "Explain how specific word choices influence tone and mood.",
    knowledgeNodeId: "humanities.literature.style",
    alignment: [
      {
        code: "9-10R4",
        emphasis: "primary",
        note: "Analyzes language choices and their effects.",
      },
    ],
  }),
  plannedLesson({
    slug: "literary-claim",
    title: "Writing a Literary Claim",
    summary:
      "Turn an observation into a precise, arguable claim supported by relevant evidence and reasoning.",
    outcome: "Write a concise literary argument with a clear evidence chain.",
    knowledgeNodeId: "humanities.literature.criticism",
    alignment: [
      {
        code: "9-10W1",
        emphasis: "primary",
        note: "Builds a text-based analytical claim.",
      },
      {
        code: "9-10W5",
        emphasis: "supporting",
        note: "Draws relevant evidence from a literary text.",
      },
    ],
  }),
];

export const NYS_LITERATURE_UNIT_ONE: CourseUnit = {
  id: "nys.literature.unit-1",
  slug: "unit-1",
  number: 1,
  title: "Reading Fiction Closely",
  summary:
    "Move from observation to inference, then study how perspective, character, structure, and language create a defensible interpretation.",
  essentialQuestion: "How does a reader turn details into an interpretation?",
  status: "active",
  href: UNIT_ONE_BASE,
  pacing: "6 class periods",
  prerequisites: [
    "Reading a short narrative independently",
    "Paraphrasing a passage",
    "Distinguishing a statement from an opinion",
  ],
  lessons,
  teacherGuide: {
    openingRoutine:
      "Begin with a short original passage and separate visible detail, possible inference, and supporting reasoning.",
    evidencePlan: [
      "Ask learners to point to a line before defending an interpretation.",
      "Treat changed answers as opportunities to revise reasoning.",
      "Collect a compact claim-evidence-reasoning response.",
    ],
    differentiation: [
      "Use numbered lines and one inference at a time.",
      "Allow evidence selection before sentence writing.",
      "Extend by asking for a competing inference supported by different evidence.",
    ],
  },
};

export const NYS_LITERATURE_COURSE: Course = {
  id: "nys.literature",
  slug: "literature",
  subjectId: "english",
  title: "New York Literature",
  shortTitle: "Literature",
  description:
    "Practice close reading, literary interpretation, evidence-based discussion, and analytical writing across varied texts.",
  gradeBand: "High school · Grades 9–10 standards",
  status: "active",
  href: "/classroom/english/literature",
  framework: NYS_LITERATURE_FRAMEWORK,
  units: [NYS_LITERATURE_UNIT_ONE],
  plannedUnits: [
    {
      id: "nys.literature.unit-2",
      slug: "unit-2",
      number: 2,
      title: "Character, Conflict & Change",
      summary:
        "Analyze desire, pressure, decision, relationship, and transformation.",
    },
    {
      id: "nys.literature.unit-3",
      slug: "unit-3",
      number: 3,
      title: "Poetry & Voice",
      summary: "Read line, image, sound, rhythm, form, and speaker.",
    },
    {
      id: "nys.literature.unit-4",
      slug: "unit-4",
      number: 4,
      title: "Drama & Performance",
      summary:
        "Study dialogue, scene, stage direction, audience, and dramatic structure.",
    },
    {
      id: "nys.literature.unit-5",
      slug: "unit-5",
      number: 5,
      title: "Novel Study",
      summary:
        "Sustain an interpretation across chapters, patterns, and changing contexts.",
    },
    {
      id: "nys.literature.unit-6",
      slug: "unit-6",
      number: 6,
      title: "Comparative Literature",
      summary:
        "Compare how texts transform shared ideas across cultures, eras, and forms.",
    },
  ],
};
