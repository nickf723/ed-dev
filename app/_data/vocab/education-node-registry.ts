import { educationVocab } from "./e/education";
import {
  educationAccessibilityVocab,
  educationAssessmentVocab,
  educationCurriculumInstructionVocab,
  educationEnvironmentsVocab,
  educationInstructionalDesignVocab,
  educationLearningSciencesVocab,
  educationPolicyVocab,
  educationTeacherLearningVocab,
  educationTechnologyVocab,
} from "./e/education-branches";
import type { NodeVocabularyRegistration } from "./aggregate.mjs";

export const EDUCATION_VOCABULARY_REGISTRATIONS = [
  { nodeId: "applied.education", terms: educationVocab },
  {
    nodeId: "applied.education.learning-sciences",
    terms: educationLearningSciencesVocab,
  },
  {
    nodeId: "applied.education.curriculum-instruction",
    terms: educationCurriculumInstructionVocab,
  },
  {
    nodeId: "applied.education.assessment",
    terms: educationAssessmentVocab,
  },
  {
    nodeId: "applied.education.instructional-design",
    terms: educationInstructionalDesignVocab,
  },
  {
    nodeId: "applied.education.accessibility-special-education",
    terms: educationAccessibilityVocab,
  },
  {
    nodeId: "applied.education.educational-technology",
    terms: educationTechnologyVocab,
  },
  {
    nodeId: "applied.education.teaching-learning-environments",
    terms: educationEnvironmentsVocab,
  },
  {
    nodeId: "applied.education.policy-systems",
    terms: educationPolicyVocab,
  },
  {
    nodeId: "applied.education.teacher-learning",
    terms: educationTeacherLearningVocab,
  },
] as const satisfies readonly NodeVocabularyRegistration[];
