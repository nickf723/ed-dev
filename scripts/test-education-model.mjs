import assert from "node:assert/strict";
import {
  EDUCATION_ACTIVITIES,
  EDUCATION_DIRECT_BRANCH_IDS,
  EDUCATION_EVIDENCE_CASES,
  EDUCATION_EVIDENCE_TASKS,
  EDUCATION_FOLIOS,
  EDUCATION_GOALS,
  evaluateEducationAlignment,
  isEducationEvidenceAnswerCorrect,
} from "../app/applied-science/education/educationModel.ts";
import { EDUCATION_CURRICULUM } from "../lib/curriculum/applied/education.ts";
import { educationVocab } from "../app/_data/vocab/e/education.ts";
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
} from "../app/_data/vocab/e/education-branches.ts";

assert.deepEqual(
  EDUCATION_CURRICULUM.children?.map((child) => child.id),
  EDUCATION_DIRECT_BRANCH_IDS
);
assert.equal(EDUCATION_DIRECT_BRANCH_IDS.length, 9);
assert.equal(new Set(EDUCATION_DIRECT_BRANCH_IDS).size, 9);
assert.ok(
  EDUCATION_CURRICULUM.children?.every(
    (child) => child.status === "placeholder"
  )
);

const folioIds = EDUCATION_FOLIOS.flatMap((folio) => folio.ids);
assert.equal(folioIds.length, EDUCATION_DIRECT_BRANCH_IDS.length);
assert.equal(new Set(folioIds).size, EDUCATION_DIRECT_BRANCH_IDS.length);
assert.deepEqual(
  [...folioIds].sort(),
  [...EDUCATION_DIRECT_BRANCH_IDS].sort(),
  "conceptual folios should cover every direct branch exactly once"
);

const activityKeys = EDUCATION_ACTIVITIES.map((item) => item.key).sort();
const evidenceKeys = EDUCATION_EVIDENCE_TASKS.map((item) => item.key).sort();
for (const goal of Object.values(EDUCATION_GOALS)) {
  assert.deepEqual(Object.keys(goal.activity).sort(), activityKeys);
  assert.deepEqual(Object.keys(goal.evidence).sort(), evidenceKeys);
}

assert.deepEqual(
  evaluateEducationAlignment("explanation", "explain", "explanation"),
  {
    activityFit: "direct",
    evidenceFit: "direct",
    nextMove:
      "Goal, practice opportunity, and evidence are directly aligned in this toy example. That still does not guarantee learning: prior knowledge, task quality, accessibility, feedback, motivation, time, and context still matter.",
  }
);
assert.equal(
  evaluateEducationAlignment("transfer", "novel", "recognition").evidenceFit,
  "weak"
);
assert.match(
  evaluateEducationAlignment("procedure", "model", "familiar-performance")
    .nextMove,
  /related but not fully aligned/
);

const vocabularyGroups = [
  educationVocab,
  educationLearningSciencesVocab,
  educationCurriculumInstructionVocab,
  educationAssessmentVocab,
  educationInstructionalDesignVocab,
  educationAccessibilityVocab,
  educationTechnologyVocab,
  educationEnvironmentsVocab,
  educationPolicyVocab,
  educationTeacherLearningVocab,
];
const vocabularyTerms = vocabularyGroups.flat();
assert.deepEqual(
  vocabularyGroups.map((group) => group.length),
  [10, 2, 2, 2, 2, 2, 2, 2, 2, 2]
);
assert.equal(vocabularyTerms.length, 28);
assert.equal(new Set(vocabularyTerms.map((term) => term.id)).size, 28);

assert.equal(EDUCATION_EVIDENCE_CASES.length, 4);
for (const evidenceCase of EDUCATION_EVIDENCE_CASES) {
  assert.equal(evidenceCase.options.length, 3);
  assert.ok(
    evidenceCase.options.some(
      (option) => option.id === evidenceCase.correctOptionId
    )
  );
  for (const option of evidenceCase.options) {
    assert.equal(
      isEducationEvidenceAnswerCorrect(evidenceCase.id, option.id),
      option.id === evidenceCase.correctOptionId
    );
  }
}
assert.equal(isEducationEvidenceAnswerCorrect("missing", "missing"), false);

console.log("Education model tests passed.");
