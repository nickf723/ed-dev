export const BOTANY_BRANCH_IDS = [
  "natural.biology.botany.structure-development",
  "natural.biology.botany.physiology",
  "natural.biology.botany.reproduction",
  "natural.biology.botany.diversity-evolution",
  "natural.biology.botany.ecology",
  "natural.biology.botany.methods-collections",
] as const;

export type BotanyBranchId = (typeof BOTANY_BRANCH_IDS)[number];
export type AirProfileKey = keyof typeof AIR_PROFILES;

export const AIR_PROFILES = {
  humid: {
    label: "More humid outside air",
    dryness: 0.46,
    note: "A smaller vapor-pressure contrast reduces the toy model's outward water-vapor flux.",
  },
  dry: {
    label: "Drier outside air",
    dryness: 1,
    note: "A larger vapor-pressure contrast increases the toy model's outward water-vapor flux.",
  },
} as const;

export type StomatalExchange = {
  aperture: number;
  openness: number;
  carbonDioxideCapacity: number;
  waterVaporFlux: number;
};

export function calculateStomatalExchange(
  aperture: number,
  airKey: AirProfileKey
): StomatalExchange {
  const boundedAperture = Math.min(100, Math.max(0, aperture));
  const openness = boundedAperture / 100;

  return {
    aperture: boundedAperture,
    openness,
    carbonDioxideCapacity: Math.round((0.08 + openness * 0.92) * 100),
    waterVaporFlux: Math.round(openness * AIR_PROFILES[airKey].dryness * 100),
  };
}

export const BOTANY_EVIDENCE_CASES = [
  {
    id: "dryness-calculation",
    label: "Calculate the contrast",
    eyebrow: "Practice 01 · controlled comparison",
    observation:
      "The model sets aperture to 50%. Its dryness factors are 0.46 for more humid air and 1.00 for drier air. Water-vapor flux is round(openness × dryness × 100).",
    prompt:
      "What water-vapor indicators should the model return without changing the aperture?",
    options: [
      {
        id: "23-and-50",
        label: "23% in more humid air and 50% in drier air.",
      },
      {
        id: "50-and-50",
        label: "50% in both conditions because the aperture is unchanged.",
      },
      {
        id: "46-and-100",
        label: "46% in more humid air and 100% in drier air.",
      },
    ],
    correctOptionId: "23-and-50",
    success:
      "Correct. At 50% aperture, openness is 0.50: 0.50 × 0.46 × 100 rounds to 23, while 0.50 × 1.00 × 100 is 50.",
    correction:
      "Convert 50% aperture to 0.50, then multiply by each dryness factor and by 100. Keep the aperture fixed so only outside-air dryness changes.",
  },
  {
    id: "tradeoff",
    label: "Read the mechanism",
    eyebrow: "Practice 02 · model inference",
    observation:
      "At the same outside-air dryness, widening the modeled pore raises both its carbon-dioxide diffusion capacity and water-vapor flux indicators.",
    prompt: "Which claim stays inside the model's evidence boundary?",
    options: [
      {
        id: "coupled-path",
        label:
          "A wider pore opens a stronger diffusion pathway for both CO₂ entry and water-vapor loss in this model.",
      },
      {
        id: "measured-rate",
        label:
          "The percentages are measured photosynthesis and transpiration rates for every plant species.",
      },
      {
        id: "selective-pore",
        label:
          "A stoma can admit more CO₂ while physically blocking all water vapor under the same modeled conditions.",
      },
    ],
    correctOptionId: "coupled-path",
    success:
      "Exactly. The model isolates a coupled diffusion pathway. It does not predict a real species' measured rates or every regulatory response.",
    correction:
      "Treat both percentages as normalized teaching indicators. The supported inference is about a shared opening, not universal field measurements.",
  },
  {
    id: "source-sink",
    label: "Trace source to sink",
    eyebrow: "Practice 03 · transport direction",
    observation:
      "A mature lower leaf exports sugar to roots while an upper leaf exports sugar to a growing shoot tip. Later, a storage organ can export sugar to new growth.",
    prompt: "What rule best explains these directions?",
    options: [
      {
        id: "source-to-sink",
        label:
          "Phloem transport follows changing source–sink relationships, so direction is not universally downward.",
      },
      {
        id: "gravity-only",
        label:
          "Gravity forces all phloem contents from the canopy to the roots.",
      },
      {
        id: "xylem-only",
        label: "Only xylem transports sugars between plant organs.",
      },
    ],
    correctOptionId: "source-to-sink",
    success:
      "Right. Sources export transported compounds and sinks import them; tissues can change roles with development, season, and demand.",
    correction:
      "Locate the producing or mobilizing source and the consuming or storing sink. That relationship—not a fixed up/down rule—organizes the claim.",
  },
  {
    id: "classification",
    label: "Classify with evidence",
    eyebrow: "Practice 04 · evolutionary identity",
    observation:
      "Two organisms are green and photosynthetic, but molecular and developmental evidence places only one inside the plant lineage. A non-green parasitic species is nested within that lineage.",
    prompt: "Which classification claim is defensible?",
    options: [
      {
        id: "lineage-evidence",
        label:
          "Plant identity follows evolutionary relationship supported by multiple traits, not a green-color test or human use category.",
      },
      {
        id: "green-rule",
        label: "Every green photosynthetic organism is necessarily a plant.",
      },
      {
        id: "use-rule",
        label:
          "Edible and medicinal organisms form the two main botanical lineages.",
      },
    ],
    correctOptionId: "lineage-evidence",
    success:
      "Correct. Color, photosynthesis, edibility, and medicinal use can be useful observations, but none alone defines evolutionary membership.",
    correction:
      "Separate observable resemblance and human use from shared ancestry. Botanical systematics tests relationships with converging evidence.",
  },
] as const;

export type BotanyEvidenceCaseId = (typeof BOTANY_EVIDENCE_CASES)[number]["id"];

export function isBotanyEvidenceAnswerCorrect(
  caseId: string,
  optionId: string
): boolean {
  const evidenceCase = BOTANY_EVIDENCE_CASES.find((item) => item.id === caseId);
  return evidenceCase?.correctOptionId === optionId;
}
