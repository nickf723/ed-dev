export const AGRICULTURE_DIRECT_BRANCH_IDS = [
  "applied.agriculture.agronomy",
  "applied.agriculture.soil-nutrients",
  "applied.agriculture.horticulture",
  "applied.agriculture.animal-science",
  "applied.agriculture.aquaculture",
  "applied.agriculture.forestry-agroforestry",
  "applied.agriculture.agroecology",
  "applied.agriculture.engineering-technology",
  "applied.agriculture.economics-food-systems",
] as const;

export type CropSystemKey = "cereal" | "grain-legume" | "cover";

export type CropSystem = {
  key: CropSystemKey;
  label: string;
  subtitle: string;
  demand: number;
  fixationPotential: number;
  harvestFraction: number;
  rgb: string;
};

export const CROP_SYSTEMS = [
  {
    key: "cereal",
    label: "Cereal crop",
    subtitle: "soil-derived N dominates",
    demand: 72,
    fixationPotential: 0,
    harvestFraction: 0.72,
    rgb: "250,204,21",
  },
  {
    key: "grain-legume",
    label: "Grain legume",
    subtitle: "soil N + biological fixation",
    demand: 62,
    fixationPotential: 35,
    harvestFraction: 0.64,
    rgb: "74,222,128",
  },
  {
    key: "cover",
    label: "Legume cover crop",
    subtitle: "biomass retained, little harvest export",
    demand: 50,
    fixationPotential: 32,
    harvestFraction: 0.08,
    rgb: "134,239,172",
  },
] as const satisfies readonly CropSystem[];

export const INITIAL_MINERAL_POOL = 45;

export function calculateNitrogenBudget(
  system: CropSystem,
  amendment: number,
  lossPressure: number,
  residueRetention: number
) {
  const startingMineral = INITIAL_MINERAL_POOL + amendment;
  const lossFraction = 0.05 + (lossPressure / 100) * 0.25;
  const losses = startingMineral * lossFraction;
  const mineralAfterLoss = Math.max(0, startingMineral - losses);
  const soilUptake = Math.min(system.demand, mineralAfterLoss);
  const remainingDemand = Math.max(0, system.demand - soilUptake);
  const fixation = Math.min(system.fixationPotential, remainingDemand);
  const plantN = soilUptake + fixation;
  const shortfall = Math.max(0, system.demand - plantN);
  const harvestRemoval = plantN * system.harvestFraction;
  const nonHarvestPlantN = Math.max(0, plantN - harvestRemoval);
  const retainedResidue = nonHarvestPlantN * (residueRetention / 100);
  const removedResidue = Math.max(0, nonHarvestPlantN - retainedResidue);
  const residualMineral = Math.max(0, mineralAfterLoss - soilUptake);

  return {
    startingMineral,
    lossFraction,
    losses,
    soilUptake,
    fixation,
    plantN,
    shortfall,
    harvestRemoval,
    retainedResidue,
    removedResidue,
    residualMineral,
  };
}

export type NitrogenBudget = ReturnType<typeof calculateNitrogenBudget>;

export const AGRICULTURE_EVIDENCE_CASES = [
  {
    id: "ledger",
    label: "Close the nitrogen ledger",
    eyebrow: "Field file 01 · arithmetic",
    observation:
      "The canonical grain-legume scenario starts with 45 mineral units, adds 24 external units, and exposes that pool to 35% modeled loss pressure. The model applies a 13.75% loss fraction before uptake.",
    prompt:
      "How many mineral units remain after modeled loss, before plant uptake?",
    options: [
      { id: "59-5125", label: "59.5125 units" },
      { id: "45", label: "45 units" },
      { id: "69", label: "69 units" },
    ],
    correctOptionId: "59-5125",
    success:
      "Correct. The starting mineral pool is 69; 69 × 0.1375 = 9.4875 is lost, leaving 59.5125 before uptake.",
    correction:
      "First combine the soil pool and external input. Then apply the modeled loss fraction to that combined mineral pool before subtracting uptake.",
  },
  {
    id: "residue",
    label: "Place retained residue",
    eyebrow: "Field file 02 · timing",
    observation:
      "A cover crop retains most non-harvest plant nitrogen in residue at the end of this teaching step.",
    prompt: "What can the current ledger claim about that retained residue?",
    options: [
      {
        id: "organic-pathway",
        label:
          "It enters an organic residue pathway whose later mineralization or immobilization depends on conditions not modeled here.",
      },
      {
        id: "instant-mineral",
        label:
          "It immediately becomes an equal amount of plant-available mineral nitrogen.",
      },
      {
        id: "vanishes",
        label: "It leaves the field as harvest export.",
      },
    ],
    correctOptionId: "organic-pathway",
    success:
      "Correct. Retention identifies a pathway and location, not an instantaneous mineralization rate or fertilizer credit.",
    correction:
      "Keep stocks, forms, and timing distinct. Organic residue nitrogen can be transformed later; this step does not calculate when or how much becomes mineral.",
  },
  {
    id: "estimate",
    label: "Read a county estimate",
    eyebrow: "Field file 03 · statistics",
    observation:
      "USDA NASS reports a county-level crop-yield estimate assembled from surveys, administrative information, and an estimation program.",
    prompt: "Which interpretation stays within the evidence?",
    options: [
      {
        id: "population-estimate",
        label:
          "It estimates a defined county population for a stated commodity, year, unit, and statistic; it does not prescribe a particular field's management.",
      },
      {
        id: "farm-prescription",
        label:
          "It proves the nitrogen rate every farm in the county should use next season.",
      },
      {
        id: "weather-cause",
        label:
          "A change from last year identifies weather as the sole cause of the difference.",
      },
    ],
    correctOptionId: "population-estimate",
    success:
      "Correct. Keep geography, commodity, statistic, unit, reference period, estimation method, and revision status attached to the number.",
    correction:
      "An aggregate estimate is not a field prescription or a single-cause experiment. Preserve the statistic's population, method, unit, time, and geography.",
  },
  {
    id: "soil-map",
    label: "Use a soil survey",
    eyebrow: "Field file 04 · spatial scale",
    observation:
      "NRCS Web Soil Survey maps a soil map unit and provides component-level properties and interpretations for a user-defined area of interest.",
    prompt: "How should that record enter a field decision?",
    options: [
      {
        id: "planning-evidence",
        label:
          "Use it as planning evidence, then connect map scale and component uncertainty to site observations, sampling, management history, and the decision at hand.",
      },
      {
        id: "exact-point",
        label:
          "Treat every point inside the polygon as an identical measured soil profile.",
      },
      {
        id: "yield-guarantee",
        label:
          "Convert its texture class directly into a guaranteed crop yield.",
      },
    ],
    correctOptionId: "planning-evidence",
    success:
      "Correct. Survey data are powerful at their mapped and interpreted scale, while field decisions may require current, site-specific evidence.",
    correction:
      "A mapped soil unit is not a uniform point sample or a yield guarantee. Match the source's scale, components, date, and interpretation to local evidence.",
  },
] as const;

export function isAgricultureEvidenceAnswerCorrect(
  caseId: string,
  optionId: string
): boolean {
  const evidenceCase = AGRICULTURE_EVIDENCE_CASES.find(
    (item) => item.id === caseId
  );
  return evidenceCase?.correctOptionId === optionId;
}
