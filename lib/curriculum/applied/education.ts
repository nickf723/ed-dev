import type { CurriculumNode } from "@/lib/curriculum/types";

function planned(id: string, label: string, href: string, description: string): CurriculumNode {
  return { id, label, href, description, domainId: "applied", status: "placeholder", pageKind: "unit" };
}

export const EDUCATION_CURRICULUM: CurriculumNode = {
  id: "applied.education",
  label: "Education",
  href: "/applied-science/education",
  description:
    "Study how learning goals, prior knowledge, instruction, practice, feedback, assessment, accessibility, motivation, social context, technology, curriculum, and educational systems interact across learners and settings.",
  domainId: "applied",
  status: "active",
  pageKind: "hub",
  children: [
    planned("applied.education.learning-sciences", "Learning Sciences", "/applied-science/education/learning-sciences", "Study learning through cognitive, developmental, motivational, social, cultural, and situational perspectives while distinguishing evidence from popular learning myths."),
    planned("applied.education.curriculum-instruction", "Curriculum & Instruction", "/applied-science/education/curriculum-instruction", "Study goals, scope, sequence, representations, examples, explanations, tasks, practice, discussion, and how subject matter is transformed for learning."),
    planned("applied.education.assessment", "Assessment & Measurement", "/applied-science/education/assessment", "Design and interpret evidence of learning through tasks, observations, rubrics, tests, performance assessments, validity arguments, reliability, fairness, feedback, and uncertainty."),
    planned("applied.education.instructional-design", "Instructional Design", "/applied-science/education/instructional-design", "Align goals, learner needs, activities, media, practice, assessment, feedback, transfer, evaluation, and revision across courses and learning experiences."),
    planned("applied.education.accessibility-special-education", "Accessibility & Special Education", "/applied-science/education/accessibility-special-education", "Study disability, access, accommodations, individualized supports, inclusive design, assistive technology, communication, participation, and legal or institutional responsibilities."),
    planned("applied.education.educational-technology", "Educational Technology", "/applied-science/education/educational-technology", "Study how digital tools, learning platforms, media, simulations, AI, data systems, accessibility features, and classroom technologies shape opportunities and constraints for learning."),
    planned("applied.education.teaching-learning-environments", "Teaching & Learning Environments", "/applied-science/education/teaching-learning-environments", "Study classroom routines, questioning, discussion, group work, climate, relationships, behavior support, physical space, online environments, and participation structures."),
    planned("applied.education.policy-systems", "Education Policy & Systems", "/applied-science/education/policy-systems", "Study institutions, governance, funding, accountability, access, inequality, staffing, standards, credentials, policy implementation, and how educational systems distribute opportunities and constraints."),
    planned("applied.education.teacher-learning", "Teacher Learning & Professional Practice", "/applied-science/education/teacher-learning", "Study professional knowledge, pedagogical content knowledge, reflection, collaborative inquiry, coaching, lesson study, professional learning, and improvement across teaching careers."),
  ],
};
