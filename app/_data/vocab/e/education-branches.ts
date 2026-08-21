import type { VocabTerm } from "../types";

export const educationLearningSciencesVocab: VocabTerm[] = [
  {
    id: "education-retrieval-practice",
    word: "Retrieval Practice",
    definition:
      "Practice that requires bringing previously learned information to mind, with the retrieval conditions, feedback, spacing, and target knowledge specified.",
    domain: "Learning Sciences",
    tags: ["Memory", "Practice"],
    relatedTerms: ["education-practice"],
    isAdult: false,
  },
  {
    id: "education-metacognition",
    word: "Metacognition",
    definition:
      "Knowledge and regulation of one's own thinking and learning, including planning, monitoring, evaluating, and adjusting strategies in relation to a task and evidence.",
    domain: "Learning Sciences",
    tags: ["Monitoring", "Strategy"],
    relatedTerms: ["education-feedback"],
    isAdult: false,
  },
];

export const educationCurriculumInstructionVocab: VocabTerm[] = [
  {
    id: "education-curriculum",
    word: "Curriculum",
    definition:
      "An organized plan for what is to be learned, why it matters, how content and experiences are arranged, and how progress and attainment will be interpreted.",
    domain: "Curriculum & Instruction",
    tags: ["Plan", "Content"],
    relatedTerms: ["education-scope-sequence"],
    isAdult: false,
  },
  {
    id: "education-scope-sequence",
    word: "Scope and Sequence",
    definition:
      "A curriculum representation that states the breadth of content or performance and an intended ordering through time, without implying that every learner follows one identical path.",
    domain: "Curriculum & Instruction",
    tags: ["Breadth", "Order"],
    relatedTerms: ["education-curriculum"],
    isAdult: false,
  },
];

export const educationAssessmentVocab: VocabTerm[] = [
  {
    id: "education-assessment-validity",
    word: "Validity Argument",
    definition:
      "A reasoned case that evidence and theory support the proposed interpretation and use of assessment results for a stated population, purpose, and context.",
    domain: "Assessment & Measurement",
    tags: ["Interpretation", "Use"],
    relatedTerms: [
      "education-assessment-reliability",
      "education-learning-evidence",
    ],
    isAdult: false,
  },
  {
    id: "education-assessment-reliability",
    word: "Score Reliability",
    definition:
      "The consistency or precision of scores under stated replications or conditions, which contributes to but does not by itself establish the validity of an interpretation or use.",
    domain: "Assessment & Measurement",
    tags: ["Consistency", "Uncertainty"],
    relatedTerms: ["education-assessment-validity"],
    isAdult: false,
  },
];

export const educationInstructionalDesignVocab: VocabTerm[] = [
  {
    id: "education-learner-analysis",
    word: "Learner Analysis",
    definition:
      "A design inquiry into relevant prior knowledge, goals, language, experiences, variability, access needs, motivations, settings, resources, and constraints without reducing learners to fixed profiles.",
    domain: "Instructional Design",
    tags: ["Learner", "Context"],
    relatedTerms: [
      "education-prior-knowledge",
      "education-opportunity-to-learn",
    ],
    isAdult: false,
  },
  {
    id: "education-formative-evaluation",
    word: "Formative Evaluation",
    definition:
      "The collection and use of evidence while a learning experience is being designed or implemented in order to identify problems and guide revision.",
    domain: "Instructional Design",
    tags: ["Revision", "Evidence"],
    relatedTerms: ["education-feedback", "education-alignment"],
    isAdult: false,
  },
];

export const educationAccessibilityVocab: VocabTerm[] = [
  {
    id: "education-accessibility",
    word: "Educational Accessibility",
    definition:
      "The extent to which learners can perceive, navigate, participate in, communicate through, and demonstrate learning within an environment without avoidable barriers.",
    domain: "Accessibility & Special Education",
    tags: ["Access", "Participation"],
    relatedTerms: ["education-accommodation", "education-opportunity-to-learn"],
    isAdult: false,
  },
  {
    id: "education-accommodation",
    word: "Accommodation",
    definition:
      "A change in access, presentation, response, timing, setting, equipment, or support intended to reduce a disability-related barrier while preserving the construct or goal being interpreted.",
    domain: "Accessibility & Special Education",
    tags: ["Barrier", "Support"],
    relatedTerms: ["education-accessibility"],
    isAdult: false,
  },
];

export const educationTechnologyVocab: VocabTerm[] = [
  {
    id: "education-learning-management-system",
    word: "Learning Management System",
    definition:
      "A digital platform used to organize learning materials, activities, communication, submissions, records, and access controls, whose features and data practices shape participation.",
    domain: "Educational Technology",
    tags: ["Platform", "Records"],
    relatedTerms: ["education-learning-analytics"],
    isAdult: false,
  },
  {
    id: "education-learning-analytics",
    word: "Learning Analytics",
    definition:
      "The measurement, analysis, and reporting of data about learners and learning contexts for stated purposes, with attention to validity, privacy, equity, uncertainty, and actionability.",
    domain: "Educational Technology",
    tags: ["Data", "Interpretation"],
    relatedTerms: [
      "education-learning-evidence",
      "education-learning-management-system",
    ],
    isAdult: false,
  },
];

export const educationEnvironmentsVocab: VocabTerm[] = [
  {
    id: "education-classroom-climate",
    word: "Classroom Climate",
    definition:
      "The experienced social, emotional, relational, and normative qualities of a learning environment, including belonging, safety, expectations, respect, and responses to error.",
    domain: "Teaching & Learning Environments",
    tags: ["Belonging", "Relationships"],
    relatedTerms: ["education-participation-structure"],
    isAdult: false,
  },
  {
    id: "education-participation-structure",
    word: "Participation Structure",
    definition:
      "The organized roles, turns, grouping, tools, norms, and communication pathways through which people take part in a learning activity.",
    domain: "Teaching & Learning Environments",
    tags: ["Interaction", "Organization"],
    relatedTerms: ["education-classroom-climate"],
    isAdult: false,
  },
];

export const educationPolicyVocab: VocabTerm[] = [
  {
    id: "education-accountability",
    word: "Educational Accountability",
    definition:
      "Arrangements for defining responsibilities, gathering evidence, reporting performance, applying consequences or support, and evaluating whether institutions meet stated obligations.",
    domain: "Education Policy & Systems",
    tags: ["Institutions", "Responsibility"],
    relatedTerms: ["education-equity"],
    isAdult: false,
  },
  {
    id: "education-equity",
    word: "Educational Equity",
    definition:
      "The analysis and pursuit of fair access, participation, resources, treatment, opportunity, support, and outcomes while attending to differing needs and structural barriers.",
    domain: "Education Policy & Systems",
    tags: ["Fairness", "Opportunity"],
    relatedTerms: [
      "education-opportunity-to-learn",
      "education-accountability",
    ],
    isAdult: false,
  },
];

export const educationTeacherLearningVocab: VocabTerm[] = [
  {
    id: "education-pedagogical-content-knowledge",
    word: "Pedagogical Content Knowledge",
    definition:
      "Professional knowledge of how particular subject matter can be represented, explained, questioned, sequenced, assessed, and connected to learners' ideas and difficulties.",
    domain: "Teacher Learning & Professional Practice",
    tags: ["Teaching", "Subject Matter"],
    relatedTerms: ["education-curriculum", "education-prior-knowledge"],
    isAdult: false,
  },
  {
    id: "education-lesson-study",
    word: "Lesson Study",
    definition:
      "A collaborative professional-learning process in which educators study goals and learners, plan a research lesson, observe evidence, discuss it, and revise their understanding or design.",
    domain: "Teacher Learning & Professional Practice",
    tags: ["Inquiry", "Collaboration"],
    relatedTerms: ["education-formative-evaluation"],
    isAdult: false,
  },
];

export const educationBranchVocab = [
  ...educationLearningSciencesVocab,
  ...educationCurriculumInstructionVocab,
  ...educationAssessmentVocab,
  ...educationInstructionalDesignVocab,
  ...educationAccessibilityVocab,
  ...educationTechnologyVocab,
  ...educationEnvironmentsVocab,
  ...educationPolicyVocab,
  ...educationTeacherLearningVocab,
];
