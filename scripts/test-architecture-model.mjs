import assert from "node:assert/strict";
import {
  ARCHITECTURE_ASSESSMENT_CASES,
  ARCHITECTURE_BRANCH_IDS,
  drawingMillimetersToActualMeters,
  getRampRunMeters,
  getRectangularArea,
  isArchitectureAssessmentAnswerCorrect,
} from "../app/applied-science/architecture/architectureModel.ts";

assert.deepEqual(ARCHITECTURE_BRANCH_IDS, [
  "applied.architecture.design-studio",
  "applied.architecture.building-technology",
  "applied.architecture.structures",
  "applied.architecture.environmental-systems",
  "applied.architecture.urban-site",
  "applied.architecture.history-theory",
  "applied.architecture.representation-fabrication",
  "applied.architecture.practice-codes",
]);

assert.equal(getRectangularArea(8, 6), 48);
assert.equal(getRectangularArea(4.5, 3.2), 14.4);
assert.equal(drawingMillimetersToActualMeters(72, 100), 7.2);
assert.equal(drawingMillimetersToActualMeters(40, 50), 2);
assert.equal(getRampRunMeters(0.75), 9);
assert.equal(getRampRunMeters(0.5, 10), 5);

assert.equal(ARCHITECTURE_ASSESSMENT_CASES.length, 4);
for (const assessmentCase of ARCHITECTURE_ASSESSMENT_CASES) {
  assert.equal(
    isArchitectureAssessmentAnswerCorrect(
      assessmentCase.id,
      assessmentCase.correctIndex
    ),
    true
  );
  const wrongIndex =
    (assessmentCase.correctIndex + 1) % assessmentCase.options.length;
  assert.equal(
    isArchitectureAssessmentAnswerCorrect(assessmentCase.id, wrongIndex),
    false
  );
}

console.log("Architecture model tests passed.");
