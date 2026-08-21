export const EARTH_SCIENCE_BRANCH_IDS = [
  "natural.earth-science.geology",
  "natural.earth-science.hydrology",
  "natural.earth-science.meteorology",
  "natural.earth-science.geography",
  "natural.earth-science.climatology",
] as const;

export type EarthScienceBranchId = (typeof EARTH_SCIENCE_BRANCH_IDS)[number];

export const MINERALOGY_NODE_ID = "natural.earth-science.mineralogy" as const;

export type WaterBudget = {
  precipitation: number;
  evapotranspiration: number;
  runoff: number;
};

export const TEACHING_WATER_BUDGET: WaterBudget = {
  precipitation: 120,
  evapotranspiration: 45,
  runoff: 55,
};

export function getStorageChange({
  precipitation,
  evapotranspiration,
  runoff,
}: WaterBudget): number {
  return precipitation - evapotranspiration - runoff;
}

export const EARTH_SCIENCE_EVIDENCE_CASES = [
  {
    id: "budget",
    label: "Close the budget",
    eyebrow: "Field file 01 · arithmetic",
    observation:
      "A teaching watershed receives 120 mm of precipitation. Evapotranspiration removes 45 mm and runoff exports 55 mm during the same stated interval.",
    prompt: "What storage change closes this simplified water budget?",
    options: [
      {
        id: "plus-twenty",
        label: "+20 mm because ΔS = 120 − 45 − 55.",
      },
      {
        id: "minus-twenty",
        label: "−20 mm because every listed flux must be subtracted.",
      },
      {
        id: "two-twenty",
        label: "220 mm because inputs and outputs are all added together.",
      },
    ],
    correctOptionId: "plus-twenty",
    success:
      "Correct. The stated input exceeds the two stated outputs by 20 mm, so modeled storage increases over that interval.",
    correction:
      "Keep the system boundary and sign convention visible: precipitation is the input; evapotranspiration and runoff are outputs. The residual is +20 mm.",
  },
  {
    id: "hierarchy",
    label: "Place the material lens",
    eyebrow: "Field file 02 · ontology",
    observation:
      "A specimen record compares crystal structure, composition, hardness, cleavage, and luster before naming a mineral.",
    prompt: "Where does that investigation sit in this Earth Science map?",
    options: [
      {
        id: "mineralogy-under-geology",
        label:
          "Mineralogy, nested under Geology because it studies the material building blocks of rocks and the solid Earth.",
      },
      {
        id: "meteorology",
        label:
          "Meteorology, because every physical property is a short-term atmospheric condition.",
      },
      {
        id: "climatology",
        label:
          "Climatology, because one hand specimen establishes a long-term regional climate normal.",
      },
    ],
    correctOptionId: "mineralogy-under-geology",
    success:
      "Yes. Mineralogy is a specialized material-scale branch within Geology, while its specimens can still inform broader Earth-system questions.",
    correction:
      "The observations concern composition, ordered structure, and mineral properties. That makes Mineralogy the direct destination and Geology its containing field here.",
  },
  {
    id: "weather-climate",
    label: "Match claim to timescale",
    eyebrow: "Field file 03 · time",
    observation:
      "One station records an unusually cold two-day event during a season whose long-term temperature distribution has been changing.",
    prompt: "What is the strongest interpretation?",
    options: [
      {
        id: "different-scales",
        label:
          "The two-day event is weather; climate claims require long-term distributions, variability, location, and a defined comparison period.",
      },
      {
        id: "event-proves-climate",
        label:
          "The short event alone determines the regional climate trend in either direction.",
      },
      {
        id: "unrelated",
        label:
          "Weather observations can never contribute to a climate record.",
      },
    ],
    correctOptionId: "different-scales",
    success:
      "Right. Weather and climate use related observations at different temporal and statistical scales. An event belongs in the record without defining the long-term pattern alone.",
    correction:
      "Do not let one event carry a long-term claim. Climate is built from weather observations summarized across a defined place, period, distribution, and set of variables.",
  },
  {
    id: "scale",
    label: "Keep the boundary visible",
    eyebrow: "Field file 04 · inference",
    observation:
      "After a storm, one monitored stream shows higher discharge and suspended sediment than it did the previous day.",
    prompt: "Which conclusion fits the observation?",
    options: [
      {
        id: "local-response",
        label:
          "The monitored stream changed across the two observations; additional timing, source, baseline, and spatial evidence is needed to generalize the mechanism or rate.",
      },
      {
        id: "global-rate",
        label:
          "The two measurements establish the same erosion rate for every watershed on Earth.",
      },
      {
        id: "single-cause",
        label:
          "The measurements identify one exclusive sediment source without any material or spatial tracing.",
      },
    ],
    correctOptionId: "local-response",
    success:
      "Correct. The local change is real evidence, but mechanism, source attribution, rate, and generalization need a better-resolved field record.",
    correction:
      "Match the claim to the station, interval, and measured variables. A local before-and-after record cannot by itself establish a global rate or exclusive source.",
  },
] as const;

export type EarthScienceEvidenceCaseId =
  (typeof EARTH_SCIENCE_EVIDENCE_CASES)[number]["id"];

export function isEarthScienceEvidenceAnswerCorrect(
  caseId: string,
  optionId: string,
): boolean {
  const evidenceCase = EARTH_SCIENCE_EVIDENCE_CASES.find(
    (item) => item.id === caseId,
  );
  return evidenceCase?.correctOptionId === optionId;
}
