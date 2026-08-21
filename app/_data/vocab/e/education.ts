import type { VocabTerm } from "../types";

export const educationVocab: VocabTerm[] = [
  {
    id: "education-learning-goal",
    word: "Learning Goal",
    definition:
      "A statement of the knowledge, understanding, practice, disposition, or performance a learning experience is intended to develop, with enough specificity to guide design and evidence.",
    domain: "Education",
    tags: ["Goal", "Design"],
    relatedTerms: ["education-alignment", "education-learning-evidence"],
    isAdult: false,
  },
  {
    id: "education-prior-knowledge",
    word: "Prior Knowledge",
    definition:
      "The learner's existing knowledge, experiences, skills, models, language, and misconceptions that can support, reshape, or interfere with new learning.",
    domain: "Education",
    tags: ["Learner", "Knowledge"],
    relatedTerms: ["education-scaffold", "education-opportunity-to-learn"],
    isAdult: false,
  },
  {
    id: "education-instruction",
    word: "Instruction",
    definition:
      "Intentional arrangements of explanation, modeling, questioning, examples, tasks, discussion, practice, feedback, resources, and environment in service of learning goals.",
    domain: "Education",
    tags: ["Teaching", "Design"],
    relatedTerms: ["education-practice", "education-feedback"],
    isAdult: false,
  },
  {
    id: "education-practice",
    word: "Practice",
    definition:
      "Opportunities to attempt, retrieve, explain, perform, compare, revise, or apply a target so knowledge and skill can become more accurate, connected, fluent, and adaptable.",
    domain: "Education",
    tags: ["Attempt", "Learning"],
    relatedTerms: ["education-feedback", "education-transfer"],
    isAdult: false,
  },
  {
    id: "education-feedback",
    word: "Instructional Feedback",
    definition:
      "Information that connects evidence from a performance with a goal or criterion and can help a learner or educator decide what to retain, revise, reinforce, or try next.",
    domain: "Education",
    tags: ["Evidence", "Revision"],
    relatedTerms: ["education-learning-evidence", "education-practice"],
    isAdult: false,
  },
  {
    id: "education-learning-evidence",
    word: "Learning Evidence",
    definition:
      "An observable response, product, explanation, performance, conversation, or pattern used to support a stated interpretation about learning, with uncertainty and task conditions attached.",
    domain: "Education",
    tags: ["Assessment", "Interpretation"],
    relatedTerms: ["education-learning-goal", "education-assessment-validity"],
    isAdult: false,
  },
  {
    id: "education-transfer",
    word: "Transfer",
    definition:
      "The use of learning in a task, representation, setting, time, or combination meaningfully different from the conditions in which it was first learned or practiced.",
    domain: "Education",
    tags: ["Application", "Context"],
    relatedTerms: ["education-practice", "education-learning-goal"],
    isAdult: false,
  },
  {
    id: "education-opportunity-to-learn",
    word: "Opportunity to Learn",
    definition:
      "The access, time, instruction, materials, participation, practice, support, and conditions that give a learner a meaningful chance to engage the intended content and performance.",
    domain: "Education",
    tags: ["Access", "Conditions"],
    relatedTerms: ["education-accessibility", "education-learning-goal"],
    isAdult: false,
  },
  {
    id: "education-scaffold",
    word: "Scaffold",
    definition:
      "Temporary or adjustable support that helps a learner participate in a task or performance and is monitored, changed, or faded in response to need and growing independence.",
    domain: "Education",
    tags: ["Support", "Independence"],
    relatedTerms: ["education-prior-knowledge", "education-practice"],
    isAdult: false,
  },
  {
    id: "education-alignment",
    word: "Instructional Alignment",
    definition:
      "The degree to which learning goals, learning opportunities, practice, and evidence tasks call for compatible content, performances, conditions, and levels of complexity.",
    domain: "Education",
    tags: ["Goal", "Evidence"],
    relatedTerms: ["education-learning-goal", "education-learning-evidence"],
    isAdult: false,
  },
];
