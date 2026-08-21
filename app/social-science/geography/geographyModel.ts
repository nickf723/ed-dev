export const GEOGRAPHY_BRANCH_IDS = [
  "social.geography.population",
  "social.geography.migration",
  "social.geography.urban",
  "social.geography.cultural",
  "social.geography.political",
  "social.geography.economic",
  "social.geography.development",
  "social.geography.methods",
] as const;

export type GeographyBranchId = (typeof GEOGRAPHY_BRANCH_IDS)[number];

export const AGE_GROUPS = [
  "0–9",
  "10–19",
  "20–29",
  "30–39",
  "40–49",
  "50–59",
  "60–69",
  "70–79",
  "80+",
] as const;

type PopulationProfile = {
  label: string;
  values: readonly number[];
  description: string;
  implication: string;
  rgb: string;
};

export const POPULATION_PROFILES = {
  expansive: {
    label: "Expansive",
    values: [92, 84, 72, 59, 47, 35, 24, 14, 7],
    description: "A broad base and progressively narrower older cohorts.",
    implication:
      "This stylized shape places a large share of the population in younger age groups, so schools, housing, labor-market entry, and future population momentum become important questions.",
    rgb: "56,189,248",
  },
  column: {
    label: "Column-like",
    values: [61, 63, 64, 62, 61, 58, 49, 35, 19],
    description: "Many younger and middle cohorts have similar relative width.",
    implication:
      "This stylized shape suggests a more even distribution through much of the age structure, while older cohorts still narrow. Stable-looking shapes can still change through migration, fertility, mortality, and cohort aging.",
    rgb: "94,234,212",
  },
  constrictive: {
    label: "Constrictive",
    values: [38, 43, 56, 67, 73, 70, 59, 43, 25],
    description:
      "Younger cohorts are narrower than several middle-age cohorts.",
    implication:
      "This stylized shape places relatively more people in middle and older cohorts, raising questions about labor-force replacement, care systems, pensions, housing, and how migration might alter the age structure.",
    rgb: "244,114,182",
  },
} as const satisfies Record<string, PopulationProfile>;

export type PopulationProfileKey = keyof typeof POPULATION_PROFILES;

export type PopulationProfileShares = {
  young: number;
  working: number;
  older: number;
};

export function getPopulationProfileShares(
  profileKey: PopulationProfileKey
): PopulationProfileShares {
  const values = POPULATION_PROFILES[profileKey].values;
  const total = values.reduce((sum, value) => sum + value, 0);
  const share = (start: number, end?: number) =>
    Math.round(
      (values.slice(start, end).reduce((sum, value) => sum + value, 0) /
        total) *
        100
    );

  return {
    young: share(0, 2),
    working: share(2, 6),
    older: share(6),
  };
}

export const GEOGRAPHY_EVIDENCE_CASES = [
  {
    id: "denominator",
    label: "Counts need context",
    eyebrow: "Layer file 01 · denominator",
    observation:
      "A central zone records 120 bicycle crashes; an outer zone records 60. The central zone also has five times as many bicycle trips.",
    prompt: "What is the strongest claim supported by those observations?",
    visual: "counts",
    options: [
      {
        id: "rate-needed",
        label:
          "The central zone had more recorded crashes, but trip exposure is needed before comparing crash risk.",
      },
      {
        id: "twice-risk",
        label:
          "Cycling in the central zone is exactly twice as risky because 120 is twice 60.",
      },
      {
        id: "outer-safer",
        label:
          "The outer zone is proven safer under every possible definition of safety.",
      },
    ],
    correctOptionId: "rate-needed",
    success:
      "Correct. Counts locate events; rates relate events to exposure. Both can matter, but they answer different geographic questions.",
    correction:
      "The map gives event counts and a clue about exposure. Compare crashes per trip—or another justified denominator—before making a risk claim.",
  },
  {
    id: "scale",
    label: "Averages hide variation",
    eyebrow: "Layer file 02 · scale",
    observation:
      "A citywide report gives tree cover as 28%. Neighborhood cells in the same dataset range from 5% to 61%.",
    prompt: "What does changing the scale of observation reveal?",
    visual: "scale",
    options: [
      {
        id: "variation",
        label:
          "The city average is valid for the whole city but hides meaningful neighborhood variation.",
      },
      {
        id: "average-false",
        label: "The 28% citywide average must be mathematically false.",
      },
      {
        id: "cells-identical",
        label:
          "Every neighborhood has 28% tree cover because the city average is 28%.",
      },
    ],
    correctOptionId: "variation",
    success:
      "Exactly. Aggregation can be accurate and still conceal local inequality, clusters, or outliers. Scale changes what can be seen.",
    correction:
      "A whole-city average and neighborhood values can both be correct. The key inference is that aggregation compresses spatial variation.",
  },
  {
    id: "mechanism",
    label: "Pattern is not mechanism",
    eyebrow: "Layer file 03 · connection",
    observation:
      "Retail growth and new transit stations appear along the same corridor during the same five-year period.",
    prompt: "What can the co-located pattern justify by itself?",
    visual: "association",
    options: [
      {
        id: "investigate",
        label:
          "It supports investigating a relationship, but comparison, timing, policy, land values, and other mechanisms are needed for a causal claim.",
      },
      {
        id: "transit-caused-all",
        label:
          "The map alone proves that transit caused every new retail opening.",
      },
      {
        id: "no-relationship",
        label:
          "Co-location proves the two patterns cannot be related in any way.",
      },
    ],
    correctOptionId: "investigate",
    success:
      "Right. Spatial association is evidence worth explaining, not a complete mechanism. Stronger claims need design, comparison, and context.",
    correction:
      "Treat co-location as a question generator. A map can reveal association; it does not isolate cause by itself.",
  },
] as const;

export type GeographyEvidenceCaseId =
  (typeof GEOGRAPHY_EVIDENCE_CASES)[number]["id"];

export function isGeographyEvidenceAnswerCorrect(
  caseId: string,
  optionId: string
): boolean {
  const evidenceCase = GEOGRAPHY_EVIDENCE_CASES.find(
    (item) => item.id === caseId
  );
  return evidenceCase?.correctOptionId === optionId;
}
