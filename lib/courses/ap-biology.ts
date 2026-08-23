import type {
  Course,
  CourseLesson,
  CourseUnit,
  StandardAlignment,
  StandardsFramework,
} from "@/lib/courses/types";

const AP_BIOLOGY_CED_URL =
  "https://apcentral.collegeboard.org/media/pdf/ap-biology-course-and-exam-description.pdf";
const AP_BIOLOGY_COURSE_URL =
  "https://apcentral.collegeboard.org/courses/ap-biology";
const UNIT_ONE_BASE = "/classroom/science/ap-biology/unit-1";

export const AP_BIOLOGY_FRAMEWORK: StandardsFramework = {
  id: "college-board-ap-biology-2025",
  label: "AP Biology Course and Exam Description · 2025",
  issuer: "College Board",
  sourceUrl: AP_BIOLOGY_CED_URL,
  courseSourceUrl: AP_BIOLOGY_COURSE_URL,
  assessmentNote:
    "Unit 1, Chemistry of Life, represents 8–11% of the AP Biology multiple-choice section.",
  independenceNote:
    "Education Station is independently authored. College Board publishes the AP framework, not these lessons or their presentation.",
  standards: [
    {
      code: "APBIO-1.1.A",
      label: "Structure of Water and Hydrogen Bonding",
      summary:
        "Explain how water's polarity and hydrogen bonding produce properties that support biological function.",
      sourcePage: 38,
    },
    {
      code: "APBIO-1.2.A",
      label: "Elements of Life",
      summary:
        "Describe the elemental composition of biological macromolecules.",
      sourcePage: 39,
    },
    {
      code: "APBIO-1.3.A",
      label: "Introduction to Macromolecules",
      summary:
        "Describe the reactions that build and break biological macromolecules.",
      sourcePage: 40,
    },
    {
      code: "APBIO-1.4.A",
      label: "Carbohydrates",
      summary:
        "Describe relationships between carbohydrate structure and function.",
      sourcePage: 41,
    },
    {
      code: "APBIO-1.5.A",
      label: "Lipids",
      summary: "Describe relationships between lipid structure and function.",
      sourcePage: 42,
    },
    {
      code: "APBIO-1.6.A",
      label: "Nucleic Acids",
      summary: "Describe the structure and function of DNA and RNA.",
      sourcePage: 44,
    },
    {
      code: "APBIO-1.7.A",
      label: "Proteins",
      summary: "Describe relationships between protein structure and function.",
      sourcePage: 46,
    },
    {
      code: "APBIO-SP-2.A",
      label: "Visual Representations",
      summary:
        "Describe characteristics and patterns in visual representations of biological concepts and processes.",
      sourcePage: 18,
    },
    {
      code: "APBIO-SP-6.E",
      label: "Argumentation",
      summary:
        "Predict the effects of a change or disruption in a biological system.",
      sourcePage: 20,
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
    id: `ap-biology.unit-1.${slug}`,
    slug,
    title,
    summary,
    outcome,
    durationMinutes: 45,
    status,
    href: `${UNIT_ONE_BASE}/${slug}`,
    knowledgeNodeId: "natural.biology.molecular",
    alignment,
    teacher: {
      warmUp: `Ask learners to sketch what they already notice about ${title.toLowerCase()}.`,
      misconception:
        "Treat structural details as evidence for function, not isolated labels.",
      exitTicket: `Explain one structure-function relationship from ${title.toLowerCase()}.`,
    },
  };
}

const lessons: readonly CourseLesson[] = [
  {
    id: "ap-biology.unit-1.water-hydrogen-bonding",
    slug: "water-hydrogen-bonding",
    title: "Water & Hydrogen Bonding",
    summary:
      "Use molecular charge patterns to explain cohesion, temperature stability, and evaporative cooling.",
    outcome:
      "Explain how polarity and hydrogen bonding connect water's molecular structure to biological function.",
    durationMinutes: 45,
    status: "active",
    href: `${UNIT_ONE_BASE}/water-hydrogen-bonding`,
    knowledgeNodeId: "natural.biology.molecular",
    alignment: [
      {
        code: "APBIO-1.1.A",
        emphasis: "primary",
        note: "Connects polarity and hydrogen bonding to water's biological properties.",
      },
      {
        code: "APBIO-SP-2.A",
        emphasis: "primary",
        note: "Learners read and revise a molecular interaction model.",
      },
    ],
    teacher: {
      warmUp:
        "Ask why a water droplet holds together instead of immediately flattening into a film.",
      misconception:
        "Students may confuse the polar covalent bonds within a water molecule with hydrogen bonds between molecules.",
      exitTicket:
        "Explain why disrupting attractions among water molecules changes surface tension.",
    },
  },
  plannedLesson({
    slug: "elements-of-life",
    title: "Elements of Life",
    summary:
      "Trace how carbon, hydrogen, oxygen, nitrogen, phosphorus, and sulfur enter biological molecules.",
    outcome: "Connect common elements to the macromolecules they help build.",
    alignment: [
      {
        code: "APBIO-1.2.A",
        emphasis: "primary",
        note: "Maps elements to biological molecular composition.",
      },
    ],
    status: "active",
  }),
  plannedLesson({
    slug: "building-breaking-polymers",
    title: "Building & Breaking Polymers",
    summary:
      "Model dehydration synthesis and hydrolysis as opposite changes in monomer bonds.",
    outcome:
      "Describe how water participates when polymers are built or broken.",
    alignment: [
      {
        code: "APBIO-1.3.A",
        emphasis: "primary",
        note: "Models dehydration synthesis and hydrolysis.",
      },
    ],
    status: "active",
  }),
  plannedLesson({
    slug: "carbohydrates",
    title: "Carbohydrates",
    summary:
      "Connect monosaccharides, polysaccharide shape, energy storage, and structural roles.",
    outcome:
      "Explain how carbohydrate structure supports storage and structural functions.",
    alignment: [
      {
        code: "APBIO-1.4.A",
        emphasis: "primary",
        note: "Connects carbohydrate structure and function.",
      },
    ],
  }),
  plannedLesson({
    slug: "lipids",
    title: "Lipids",
    summary:
      "Compare saturated and unsaturated fatty acids and predict effects of tail structure.",
    outcome: "Predict how fatty-acid structure changes lipid properties.",
    alignment: [
      {
        code: "APBIO-1.5.A",
        emphasis: "primary",
        note: "Connects fatty-acid structure and lipid function.",
      },
      {
        code: "APBIO-SP-6.E",
        emphasis: "supporting",
        note: "Predicts effects of structural disruption.",
      },
    ],
  }),
  plannedLesson({
    slug: "nucleic-acids",
    title: "Nucleic Acids",
    summary:
      "Read nucleotide structure, strand direction, base pairing, and information sequence.",
    outcome: "Relate nucleotide organization to DNA and RNA function.",
    alignment: [
      {
        code: "APBIO-1.6.A",
        emphasis: "primary",
        note: "Connects nucleic-acid structure and information storage.",
      },
    ],
  }),
  plannedLesson({
    slug: "proteins",
    title: "Proteins",
    summary:
      "Follow amino-acid sequence through folding, chemical interactions, and function.",
    outcome: "Predict how a change in protein structure can alter function.",
    alignment: [
      {
        code: "APBIO-1.7.A",
        emphasis: "primary",
        note: "Connects protein structure and function.",
      },
      {
        code: "APBIO-SP-6.E",
        emphasis: "supporting",
        note: "Predicts the effect of structural changes.",
      },
    ],
  }),
];

export const AP_BIOLOGY_UNIT_ONE: CourseUnit = {
  id: "ap-biology.unit-1",
  slug: "unit-1",
  number: 1,
  title: "Chemistry of Life",
  summary:
    "Build biological explanations from water, elements, monomers, polymers, and the structure-function relationships of macromolecules.",
  essentialQuestion: "How does molecular structure make life possible?",
  status: "active",
  href: UNIT_ONE_BASE,
  pacing: "9–11 class periods",
  prerequisites: [
    "Basic atomic structure and chemical bonding",
    "Reading simple molecular diagrams",
    "Making claims from visual evidence",
  ],
  lessons,
  teacherGuide: {
    openingRoutine:
      "Begin with a molecular representation and ask what visible structure could cause the observed biological property.",
    evidencePlan: [
      "Use prediction before terminology.",
      "Require a structure → interaction → property → function chain.",
      "Collect a short AP-style explanation after each lesson.",
    ],
    differentiation: [
      "Keep charge and bond legends visible during early models.",
      "Allow verbal explanation before formal scientific vocabulary.",
      "Extend by asking how a structural disruption changes the system.",
    ],
  },
};

export const AP_BIOLOGY_COURSE: Course = {
  id: "ap-biology",
  slug: "ap-biology",
  subjectId: "science",
  title: "AP Biology",
  shortTitle: "AP Biology",
  description:
    "Investigate evolution, cellular processes, energetics, information transfer, ecology, and interacting biological systems.",
  gradeBand: "High school · Advanced Placement",
  status: "active",
  href: "/classroom/science/ap-biology",
  framework: AP_BIOLOGY_FRAMEWORK,
  units: [AP_BIOLOGY_UNIT_ONE],
  plannedUnits: [
    {
      id: "ap-biology.unit-2",
      slug: "unit-2",
      number: 2,
      title: "Cells",
      summary:
        "Relate cellular structures, membranes, size, and transport to cell function.",
    },
    {
      id: "ap-biology.unit-3",
      slug: "unit-3",
      number: 3,
      title: "Cellular Energetics",
      summary:
        "Trace enzymes, photosynthesis, respiration, and energy transfer.",
    },
    {
      id: "ap-biology.unit-4",
      slug: "unit-4",
      number: 4,
      title: "Cell Communication & Cycle",
      summary: "Model signaling, feedback, cell-cycle control, and disruption.",
    },
    {
      id: "ap-biology.unit-5",
      slug: "unit-5",
      number: 5,
      title: "Heredity",
      summary:
        "Connect meiosis, inheritance patterns, and genetic probability.",
    },
    {
      id: "ap-biology.unit-6",
      slug: "unit-6",
      number: 6,
      title: "Gene Expression & Regulation",
      summary: "Follow information from DNA through expression and regulation.",
    },
    {
      id: "ap-biology.unit-7",
      slug: "unit-7",
      number: 7,
      title: "Natural Selection",
      summary: "Use evidence and models to explain evolutionary change.",
    },
    {
      id: "ap-biology.unit-8",
      slug: "unit-8",
      number: 8,
      title: "Ecology",
      summary:
        "Analyze population, community, ecosystem, and energy relationships.",
    },
  ],
};
