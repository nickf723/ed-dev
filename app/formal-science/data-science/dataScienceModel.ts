export const DATA_SCIENCE_BRANCH_IDS = [
  "formal.data-science.collection-wrangling",
  "formal.data-science.exploration",
  "formal.data-science.statistics",
  "formal.data-science.machine-learning",
  "formal.data-science.data-engineering",
  "formal.data-science.visualization-communication",
  "formal.data-science.causal-experiments",
  "formal.data-science.responsible-evaluation",
] as const;

export type KMeansPoint = {
  id: number;
  x: number;
  y: number;
  cluster: number | null;
};

export type KMeansCentroid = {
  x: number;
  y: number;
};

export const KMEANS_INITIAL_CENTROIDS: readonly KMeansCentroid[] = [
  { x: 18, y: 24 },
  { x: 79, y: 24 },
  { x: 46, y: 78 },
  { x: 81, y: 72 },
] as const;

export const KMEANS_POINTS: readonly KMeansPoint[] = Array.from(
  { length: 72 },
  (_, index) => {
    const source = index % 3;
    const center =
      source === 0
        ? { x: 26, y: 30 }
        : source === 1
          ? { x: 67, y: 31 }
          : { x: 50, y: 70 };
    const dx = ((((index * 37) % 29) - 14) / 14) * (source === 2 ? 12 : 14);
    const dy = ((((index * 53 + 7) % 31) - 15) / 15) * (source === 1 ? 12 : 14);

    return {
      id: index,
      x: clamp(center.x + dx, 6, 94),
      y: clamp(center.y + dy, 6, 94),
      cluster: null,
    };
  }
);

export function cloneKMeansPoints(): KMeansPoint[] {
  return KMEANS_POINTS.map((point) => ({ ...point }));
}

export function assignKMeansPoints(
  points: readonly KMeansPoint[],
  centroids: readonly KMeansCentroid[]
): KMeansPoint[] {
  if (centroids.length === 0) {
    return points.map((point) => ({ ...point, cluster: null }));
  }

  return points.map((point) => {
    let best = 0;
    let bestDistance = Number.POSITIVE_INFINITY;

    centroids.forEach((centroid, index) => {
      const distance = squaredDistance(point, centroid);
      if (distance < bestDistance) {
        best = index;
        bestDistance = distance;
      }
    });

    return { ...point, cluster: best };
  });
}

export function recenterKMeans(
  points: readonly KMeansPoint[],
  previous: readonly KMeansCentroid[]
): KMeansCentroid[] {
  return previous.map((centroid, index) => {
    const assigned = points.filter((point) => point.cluster === index);
    if (assigned.length === 0) return { ...centroid };

    return {
      x: assigned.reduce((sum, point) => sum + point.x, 0) / assigned.length,
      y: assigned.reduce((sum, point) => sum + point.y, 0) / assigned.length,
    };
  });
}

export function calculateKMeansObjective(
  points: readonly KMeansPoint[],
  centroids: readonly KMeansCentroid[]
): number | null {
  if (!points.some((point) => point.cluster !== null)) return null;

  return points.reduce((sum, point) => {
    if (point.cluster === null) return sum;
    const centroid = centroids[point.cluster];
    return centroid ? sum + squaredDistance(point, centroid) : sum;
  }, 0);
}

export function runKMeansIteration(
  points: readonly KMeansPoint[],
  centroids: readonly KMeansCentroid[]
): { points: KMeansPoint[]; centroids: KMeansCentroid[] } {
  const assigned = assignKMeansPoints(points, centroids);
  const nextCentroids = recenterKMeans(assigned, centroids);

  return {
    centroids: nextCentroids,
    points: assignKMeansPoints(assigned, nextCentroids),
  };
}

export function calculateClassificationMetrics({
  truePositive,
  falseNegative,
  trueNegative,
  falsePositive,
}: {
  truePositive: number;
  falseNegative: number;
  trueNegative: number;
  falsePositive: number;
}) {
  const total = truePositive + falseNegative + trueNegative + falsePositive;
  const actualPositive = truePositive + falseNegative;

  return {
    accuracy: total === 0 ? 0 : (truePositive + trueNegative) / total,
    recall: actualPositive === 0 ? 0 : truePositive / actualPositive,
  };
}

export const DATA_SCIENCE_EVIDENCE_CASES = [
  {
    id: "metric-arithmetic",
    label: "Audit a metric",
    eyebrow: "Practice 01 · exact calculation",
    evidence:
      "A held-out set has 42 true positives, 2 false negatives, 48 true negatives, and 8 false positives: 100 cases in total.",
    prompt: "Which report calculates both accuracy and recall correctly?",
    options: [
      {
        id: "90-and-95",
        label:
          "Accuracy = (42 + 48) / 100 = 90%; recall = 42 / (42 + 2) ≈ 95.5%.",
      },
      {
        id: "90-and-84",
        label: "Accuracy = 90%; recall = 42 / (42 + 8) = 84%.",
      },
      {
        id: "42-and-48",
        label:
          "Accuracy = 42%; recall = 48%, because the two correct cells are reported separately.",
      },
    ],
    correctOptionId: "90-and-95",
    success:
      "Correct. Accuracy uses every correct prediction, while recall asks what share of the actual positive cases the system recovered.",
    correction:
      "Build each denominator from its question. Accuracy divides all correct predictions by all cases. Recall divides true positives by all actual positives: true positives plus false negatives.",
  },
  {
    id: "temporal-leakage",
    label: "Stop future leakage",
    eyebrow: "Practice 02 · prediction time",
    evidence:
      "A hospital wants to predict readmission risk at discharge. One candidate feature records whether the patient filled a prescription during the following 45 days.",
    prompt: "How should the future prescription field be treated?",
    options: [
      {
        id: "exclude-future",
        label:
          "Exclude it from this prediction model because it is unavailable at discharge and leaks future information.",
      },
      {
        id: "include-correlation",
        label:
          "Include it whenever it improves cross-validation because predictive correlation settles feature validity.",
      },
      {
        id: "fill-missing",
        label:
          "Replace it with a missing-value code at discharge and let the model infer the future value.",
      },
    ],
    correctOptionId: "exclude-future",
    success:
      "Exactly. A feature must be available when the real prediction is made. Otherwise the evaluation rehearses a system that cannot exist at deployment time.",
    correction:
      "Draw the deployment timeline. The model predicts at discharge, but the prescription field is created later. Predictive usefulness cannot repair that time boundary.",
  },
  {
    id: "test-contamination",
    label: "Protect held-out evidence",
    eyebrow: "Practice 03 · independent evaluation",
    evidence:
      "A team compares 60 feature sets and repeatedly checks the same test set, keeping whichever configuration scores highest there.",
    prompt: "What happened to the test set?",
    options: [
      {
        id: "became-tuning-data",
        label:
          "It became tuning evidence; a separate untouched test set is needed for a credible final estimate.",
      },
      {
        id: "more-independent",
        label:
          "It became more independent because many comparisons average away selection bias.",
      },
      {
        id: "training-unaffected",
        label:
          "It remains a clean test set as long as gradient updates never used its rows directly.",
      },
    ],
    correctOptionId: "became-tuning-data",
    success:
      "Right. Repeated selection against test performance transfers information from the test set into the chosen system, even without a gradient update.",
    correction:
      "Model choice is still learning. Once test results influence which features or settings survive, that set is part of the tuning process rather than an independent final check.",
  },
  {
    id: "causal-boundary",
    label: "Separate association from cause",
    eyebrow: "Practice 04 · claim strength",
    evidence:
      "In an observational dataset, neighborhoods with more trees also report lower summer electricity use. Housing type, income, shade, building age, and local temperature differ across neighborhoods.",
    prompt: "What is the strongest claim the dataset supports by itself?",
    options: [
      {
        id: "association-only",
        label:
          "Tree cover is associated with electricity use in these observations; a causal effect needs a design that addresses confounding and selection.",
      },
      {
        id: "causal-percent",
        label:
          "Planting trees will reduce every household’s electricity use by the observed percentage.",
      },
      {
        id: "no-information",
        label:
          "Observational data can never reveal a useful pattern, so the relationship should not be reported.",
      },
    ],
    correctOptionId: "association-only",
    success:
      "Correct. The association is evidence worth describing, but the intervention claim requires stronger assumptions or design because other differences may explain part of the pattern.",
    correction:
      "Do not erase the observed relationship or promote it into an intervention effect. Report the association and name the causal evidence that remains missing.",
  },
] as const;

export type DataScienceEvidenceCaseId =
  (typeof DATA_SCIENCE_EVIDENCE_CASES)[number]["id"];

export function isDataScienceEvidenceAnswerCorrect(
  caseId: string,
  optionId: string
): boolean {
  const evidenceCase = DATA_SCIENCE_EVIDENCE_CASES.find(
    (item) => item.id === caseId
  );
  return evidenceCase?.correctOptionId === optionId;
}

function squaredDistance(
  a: { x: number; y: number },
  b: { x: number; y: number }
) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}
