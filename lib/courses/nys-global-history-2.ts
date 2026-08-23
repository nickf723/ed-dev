import type {
  Course,
  CourseLesson,
  CourseUnit,
  StandardAlignment,
  StandardsFramework,
} from "@/lib/courses/types";

const NYS_SOCIAL_STUDIES_FRAMEWORK_URL =
  "https://www.nysed.gov/common/nysed/files/programs/curriculum-instruction/ss-framework-9-12.pdf";
const NYS_GLOBAL_II_URL =
  "https://www.nysed.gov/state-assessment/global-history-and-geography-ii";
const UNIT_ONE_BASE = "/classroom/social-studies/global-history-2/unit-1";

export const NYS_GLOBAL_II_FRAMEWORK: StandardsFramework = {
  id: "nys-global-history-geography-2",
  label: "NYS Grades 9–12 Social Studies Framework · Global History II",
  issuer: "New York State Education Department",
  sourceUrl: NYS_SOCIAL_STUDIES_FRAMEWORK_URL,
  courseSourceUrl: NYS_GLOBAL_II_URL,
  assessmentNote:
    "The Regents course begins with a snapshot of the world circa 1750 and continues to the present.",
  independenceNote:
    "Education Station is independently authored and standards-aligned. NYSED does not publish this curriculum sequence or lesson presentation.",
  standards: [
    {
      code: "10.1",
      label: "The World in 1750",
      summary:
        "Examine powerful states, empires, kingdoms, and changing global trade networks around 1750.",
      sourcePage: 20,
    },
    {
      code: "10.1a",
      label: "States and Empires",
      summary:
        "Compare how powerful Eurasian states and empires organized power and responded to challenges.",
      sourcePage: 20,
    },
    {
      code: "10.1b",
      label: "Outsiders and Exchange",
      summary:
        "Compare responses to outsiders and map the reach and influence of states and maritime empires.",
      sourcePage: 20,
    },
    {
      code: "SSP-A.2",
      label: "Gathering and Interpreting Evidence",
      summary:
        "Identify, select, and evaluate evidence about events from multiple sources.",
      sourcePage: 3,
    },
    {
      code: "SSP-C.5",
      label: "Comparison and Context",
      summary:
        "Analyze similarities and differences across societies while accounting for historical context.",
      sourcePage: 4,
    },
  ],
};

function plannedLesson({
  slug,
  title,
  summary,
  outcome,
  alignment,
  status = "planned",
}: {
  slug: string;
  title: string;
  summary: string;
  outcome: string;
  alignment: readonly StandardAlignment[];
  status?: CourseLesson["status"];
}): CourseLesson {
  return {
    id: `nys.global-2.unit-1.${slug}`,
    slug,
    title,
    summary,
    outcome,
    durationMinutes: 45,
    status,
    href: `${UNIT_ONE_BASE}/${slug}`,
    knowledgeNodeId: "humanities.history",
    alignment,
    teacher: {
      warmUp: `Place ${title} on the 1750 world map and ask what evidence would make a comparison fair.`,
      misconception:
        "Avoid ranking states on a single scale; power depended on region, institutions, trade, and context.",
      exitTicket: `Support one comparison from ${title.toLowerCase()} with specific evidence.`,
    },
  };
}

const lessons: readonly CourseLesson[] = [
  {
    id: "nys.global-2.unit-1.world-in-1750",
    slug: "world-in-1750",
    title: "A World of Empires",
    summary:
      "Build a 1750 world snapshot by locating major states and comparing how geography, government, and exchange shaped power.",
    outcome:
      "Use mapped and written evidence to compare major states and explain why power in 1750 had no single center.",
    durationMinutes: 45,
    status: "active",
    href: `${UNIT_ONE_BASE}/world-in-1750`,
    knowledgeNodeId: "humanities.history",
    alignment: [
      {
        code: "10.1",
        emphasis: "primary",
        note: "Constructs the required snapshot of the world circa 1750.",
      },
      {
        code: "SSP-A.2",
        emphasis: "primary",
        note: "Uses evidence categories to support a historical comparison.",
      },
      {
        code: "SSP-C.5",
        emphasis: "supporting",
        note: "Compares political and commercial strategies in context.",
      },
    ],
    teacher: {
      warmUp:
        "Ask students to predict which region held the most power in 1750—and what 'power' would need to mean.",
      misconception:
        "Students may begin with a Europe-centered map or treat land area as identical to political and commercial power.",
      exitTicket:
        "Choose two states and explain one meaningful similarity and one contextual difference.",
    },
  },
  plannedLesson({
    slug: "ottoman-mughal",
    title: "Ottoman & Mughal Empires",
    summary:
      "Compare political organization, commercial activity, and religious and ethnic diversity.",
    outcome: "Build a contextualized comparison of two major Eurasian empires.",
    alignment: [
      {
        code: "10.1a",
        emphasis: "primary",
        note: "Directly compares the Ottoman and Mughal Empires.",
      },
      {
        code: "SSP-C.5",
        emphasis: "primary",
        note: "Uses contextual comparison.",
      },
    ],
    status: "active",
  }),
  plannedLesson({
    slug: "tokugawa-bourbon",
    title: "Tokugawa Japan & Bourbon France",
    summary:
      "Compare centralization, elite control, capital cities, and bureaucratic power.",
    outcome:
      "Explain how two governments used different institutions to centralize authority.",
    alignment: [
      {
        code: "10.1a",
        emphasis: "primary",
        note: "Compares Tokugawa and Bourbon centralization.",
      },
      {
        code: "SSP-C.5",
        emphasis: "supporting",
        note: "Distinguishes similarity from identical context.",
      },
    ],
    status: "active",
  }),
  plannedLesson({
    slug: "outsiders-exchange",
    title: "Outsiders & Exchange",
    summary:
      "Compare state responses to outsiders and trace changing maritime trade networks.",
    outcome:
      "Use policy and map evidence to explain different approaches to exchange.",
    alignment: [
      {
        code: "10.1b",
        emphasis: "primary",
        note: "Compares responses to outsiders and global exchange.",
      },
      {
        code: "SSP-A.2",
        emphasis: "supporting",
        note: "Evaluates map and policy evidence.",
      },
    ],
  }),
];

export const NYS_GLOBAL_II_UNIT_ONE: CourseUnit = {
  id: "nys.global-2.unit-1",
  slug: "unit-1",
  number: 1,
  title: "The World in 1750",
  summary:
    "Create a global baseline by comparing states, empires, kingdoms, geography, political organization, and exchange before the age of revolutions.",
  essentialQuestion:
    "Where did power reside in 1750—and how can evidence show it?",
  status: "active",
  href: UNIT_ONE_BASE,
  pacing: "4 class periods",
  prerequisites: [
    "Reading a world map and timeline",
    "Distinguishing a claim from evidence",
    "Basic comparison language",
  ],
  lessons,
  teacherGuide: {
    openingRoutine:
      "Begin with a map or evidence fragment and ask what it reveals, what it does not reveal, and what comparison it supports.",
    evidencePlan: [
      "Track map observations separately from historical claims.",
      "Require evidence in every comparison.",
      "Use the exit ticket to check for one-dimensional definitions of power.",
    ],
    differentiation: [
      "Provide a fixed comparison frame: government, geography, exchange, and outside relations.",
      "Allow students to construct comparisons orally before writing.",
      "Extend by evaluating how the choice of evidence changes the claim.",
    ],
  },
};

export const NYS_GLOBAL_II_COURSE: Course = {
  id: "nys.global-history-2",
  slug: "global-history-2",
  subjectId: "social-studies",
  title: "New York Global History II",
  shortTitle: "Global II",
  description:
    "Study global history from 1750 to the present through evidence, comparison, causation, geography, and enduring issues.",
  gradeBand: "Grade 10 · Regents course",
  status: "active",
  href: "/classroom/social-studies/global-history-2",
  framework: NYS_GLOBAL_II_FRAMEWORK,
  units: [NYS_GLOBAL_II_UNIT_ONE],
  plannedUnits: [
    {
      id: "nys.global-2.unit-2",
      slug: "unit-2",
      number: 2,
      title: "Enlightenment, Revolution & Nationalism",
      summary: "Trace how new ideas challenged authority and reshaped states.",
    },
    {
      id: "nys.global-2.unit-3",
      slug: "unit-3",
      number: 3,
      title: "Industrialization",
      summary: "Explain changing production, labor, cities, class, and reform.",
    },
    {
      id: "nys.global-2.unit-4",
      slug: "unit-4",
      number: 4,
      title: "Imperialism",
      summary: "Analyze motives, methods, resistance, and global consequences.",
    },
    {
      id: "nys.global-2.unit-5",
      slug: "unit-5",
      number: 5,
      title: "World Wars",
      summary:
        "Connect militarism, alliances, total war, genocide, and global change.",
    },
    {
      id: "nys.global-2.unit-6",
      slug: "unit-6",
      number: 6,
      title: "Cold War & Decolonization",
      summary:
        "Compare ideological rivalry, independence movements, and new states.",
    },
    {
      id: "nys.global-2.unit-7",
      slug: "unit-7",
      number: 7,
      title: "Globalization & Enduring Issues",
      summary:
        "Use evidence across time to analyze contemporary global challenges.",
    },
  ],
};
