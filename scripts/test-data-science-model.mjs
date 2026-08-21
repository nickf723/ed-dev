import assert from "node:assert/strict";
import { buildCurriculumVocabularyScopes } from "../app/_data/vocab/aggregate.mjs";
import { dataScienceVocab } from "../app/_data/vocab/d/data-science.ts";
import {
  DATA_SCIENCE_BRANCH_IDS,
  DATA_SCIENCE_EVIDENCE_CASES,
  KMEANS_INITIAL_CENTROIDS,
  KMEANS_POINTS,
  assignKMeansPoints,
  calculateClassificationMetrics,
  calculateKMeansObjective,
  cloneKMeansPoints,
  isDataScienceEvidenceAnswerCorrect,
  recenterKMeans,
  runKMeansIteration,
} from "../app/formal-science/data-science/dataScienceModel.ts";
import { DATA_SCIENCE_CURRICULUM } from "../lib/curriculum/data-science.ts";

assert.equal(DATA_SCIENCE_BRANCH_IDS.length, 8);
assert.equal(
  new Set(DATA_SCIENCE_BRANCH_IDS).size,
  DATA_SCIENCE_BRANCH_IDS.length
);

assert.equal(KMEANS_POINTS.length, 72);
assert.equal(new Set(KMEANS_POINTS.map((point) => point.id)).size, 72);
assert.ok(
  KMEANS_POINTS.every(
    (point) =>
      point.cluster === null &&
      point.x >= 6 &&
      point.x <= 94 &&
      point.y >= 6 &&
      point.y <= 94
  )
);

const centroids = KMEANS_INITIAL_CENTROIDS.slice(0, 3);
const assigned = assignKMeansPoints(cloneKMeansPoints(), centroids);
assert.ok(assigned.every((point) => point.cluster !== null));
assert.deepEqual(
  assigned.map((point) => point.cluster),
  assignKMeansPoints(cloneKMeansPoints(), centroids).map(
    (point) => point.cluster
  )
);

const firstObjective = calculateKMeansObjective(assigned, centroids);
assert.ok(firstObjective !== null && firstObjective > 0);
const recentered = recenterKMeans(assigned, centroids);
const reassigned = assignKMeansPoints(assigned, recentered);
const nextObjective = calculateKMeansObjective(reassigned, recentered);
assert.ok(nextObjective !== null && nextObjective < firstObjective);

const iteration = runKMeansIteration(cloneKMeansPoints(), centroids);
assert.deepEqual(iteration.centroids, recentered);
assert.deepEqual(iteration.points, reassigned);
assert.equal(calculateKMeansObjective(cloneKMeansPoints(), centroids), null);

const metrics = calculateClassificationMetrics({
  truePositive: 42,
  falseNegative: 2,
  trueNegative: 48,
  falsePositive: 8,
});
assert.equal(metrics.accuracy, 0.9);
assert.equal(metrics.recall, 42 / 44);

for (const evidenceCase of DATA_SCIENCE_EVIDENCE_CASES) {
  assert.equal(evidenceCase.options.length, 3);
  assert.ok(
    evidenceCase.options.some(
      (option) => option.id === evidenceCase.correctOptionId
    ),
    `${evidenceCase.id} should reference a real option`
  );

  for (const option of evidenceCase.options) {
    assert.equal(
      isDataScienceEvidenceAnswerCorrect(evidenceCase.id, option.id),
      option.id === evidenceCase.correctOptionId,
      `${evidenceCase.id}/${option.id} should have a deterministic verdict`
    );
  }
}

assert.equal(isDataScienceEvidenceAnswerCorrect("missing", "missing"), false);

const vocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [DATA_SCIENCE_CURRICULUM],
  registrations: [
    { nodeId: DATA_SCIENCE_CURRICULUM.id, terms: dataScienceVocab },
  ],
  accent: "cyan",
});
const dataScienceScope = vocabularyScopes.find(
  (scope) => scope.path === DATA_SCIENCE_CURRICULUM.href
);
assert.ok(dataScienceScope);
assert.deepEqual(
  dataScienceScope.groups.map((group) => group.id),
  [DATA_SCIENCE_CURRICULUM.id]
);
assert.equal(dataScienceScope.groups[0].terms.length, 18);
assert.equal(
  dataScienceScope.groups[0].sourceNodeId,
  DATA_SCIENCE_CURRICULUM.id
);
assert.equal(
  dataScienceScope.groups[0].sourcePath,
  DATA_SCIENCE_CURRICULUM.href
);

console.log("Data Science model tests passed.");
