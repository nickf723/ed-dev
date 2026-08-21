export const ASTRONOMY_DIRECT_BRANCH_IDS = [
  "natural.astronomy.planetary",
  "natural.astronomy.stellar",
  "natural.astronomy.galactic",
  "natural.astronomy.extragalactic",
  "natural.astronomy.cosmology",
  "natural.astronomy.methods",
] as const;

export type AstronomyBranchId = (typeof ASTRONOMY_DIRECT_BRANCH_IDS)[number];

export const ASTRONOMY_LIGHT_TRAVEL_EXAMPLES = [
  {
    id: "moon",
    label: "Moon",
    travelTime: "1.3 seconds",
    distance: "384,400 km",
    note: "The lunar surface appears as it was roughly 1.3 seconds earlier.",
    accentRgb: "203, 213, 225",
  },
  {
    id: "sun",
    label: "Sun",
    travelTime: "8 min 20 sec",
    distance: "1 astronomical unit",
    note: "Every view of the Sun is a report carried across space for more than eight minutes.",
    accentRgb: "250, 204, 21",
  },
  {
    id: "proxima",
    label: "Proxima Centauri",
    travelTime: "4.24 years",
    distance: "4.24 light-years",
    note: "The nearest star beyond the Sun is already being observed several years in its past.",
    accentRgb: "248, 113, 113",
  },
  {
    id: "andromeda",
    label: "Andromeda Galaxy",
    travelTime: "about 2.5 million years",
    distance: "about 2.5 million light-years",
    note: "Andromeda appears as it was long before our species began recording history.",
    accentRgb: "167, 139, 250",
  },
  {
    id: "cmb",
    label: "Cosmic microwave background",
    travelTime: "about 13.8 billion years",
    distance: "the early observable universe",
    note: "This oldest observable light was released when the young universe first became transparent.",
    accentRgb: "34, 211, 238",
  },
] as const;

export function calculateRedshift(
  observedWavelength: number,
  restWavelength: number
): number | null {
  if (
    !Number.isFinite(observedWavelength) ||
    !Number.isFinite(restWavelength) ||
    observedWavelength <= 0 ||
    restWavelength <= 0
  ) {
    return null;
  }

  return (
    Math.round(
      ((observedWavelength - restWavelength) / restWavelength) * 1000
    ) / 1000
  );
}

export function formatRedshift(value: number | null): string {
  return value === null ? "invalid inputs" : `z = ${value.toFixed(3)}`;
}

export const ASTRONOMY_EVIDENCE_CASES = [
  {
    id: "spectrum",
    eyebrow: "Signal 01 · exact practice",
    label: "Measure a spectral shift",
    prompt:
      "A line measured at 656.30 nm in the laboratory arrives from a galaxy at 721.93 nm. Using z = (λobserved − λrest) / λrest, what has been measured?",
    options: [
      {
        id: "redshift-point-one",
        label:
          "z = 0.100, a dimensionless redshift; turning it into distance or velocity requires an additional physical model.",
      },
      {
        id: "redshift-negative",
        label:
          "z = −0.100, because the observed wavelength is longer than the laboratory wavelength.",
      },
      {
        id: "distance-direct",
        label:
          "The wavelengths alone prove that the galaxy is exactly 0.100 light-years away.",
      },
    ],
    correctOptionId: "redshift-point-one",
    success:
      "Correct. (721.93 − 656.30) / 656.30 = 0.100. That comparison measures a shift. Its cause and any distance or velocity inference depend on the source, scale, and model.",
    correction:
      "Subtract the reference wavelength first, then divide by that reference. A longer observed wavelength gives positive z, but z is not itself a distance.",
  },
  {
    id: "atmosphere",
    eyebrow: "Signal 02 · detector",
    label: "Put the instrument where the signal arrives",
    prompt:
      "A source is bright in X-rays, but Earth’s atmosphere absorbs nearly all incoming X-rays. Which observing plan matches the signal?",
    options: [
      {
        id: "space-xray",
        label:
          "Use a calibrated space-based X-ray observatory and retain its energy band, instrument response, time, and processing record.",
      },
      {
        id: "ground-optical",
        label:
          "Use an ordinary ground-based visible-light camera and label every bright pixel as an X-ray photon.",
      },
      {
        id: "atmosphere-amplifies",
        label:
          "Observe from the ground because the atmosphere amplifies X-rays before detection.",
      },
    ],
    correctOptionId: "space-xray",
    success:
      "Correct. Detector location and calibration belong to the evidence chain. A visible-light image may add context, but it does not become an X-ray measurement.",
    correction:
      "Match the detector and observing location to the messenger. Earth’s atmosphere is protective precisely because it blocks most astronomical X-rays.",
  },
  {
    id: "messengers",
    eyebrow: "Signal 03 · comparison",
    label: "Do not flatten different messengers",
    prompt:
      "A galaxy looks compact in visible light but extended in radio emission. What is the strongest interpretation?",
    options: [
      {
        id: "different-processes",
        label:
          "The bands can trace different emission mechanisms and material; compare resolution, sensitivity, calibration, and coverage before explaining the difference.",
      },
      {
        id: "one-image-false",
        label:
          "One image must be false because a real galaxy has one appearance at every wavelength.",
      },
      {
        id: "radio-size-literal",
        label:
          "The radio image alone proves every star in the galaxy is physically larger.",
      },
    ],
    correctOptionId: "different-processes",
    success:
      "Correct. Multi-wavelength views are coordinated measurements, not competing portraits. Their differences can reveal cold gas, dust, jets, stars, magnetic fields, and instrumental limits.",
    correction:
      "Start by asking what produces each signal and how each instrument samples it. Apparent morphology is evidence conditioned by wavelength, resolution, sensitivity, and processing.",
  },
  {
    id: "lookback",
    eyebrow: "Signal 04 · time boundary",
    label: "Separate the received past from the unobserved present",
    prompt:
      "Light from a distant galaxy has traveled for millions of years. Which claim stays inside the observation?",
    options: [
      {
        id: "past-state",
        label:
          "The signal records an earlier state of the galaxy; its later history must be inferred with additional observations and models.",
      },
      {
        id: "present-state",
        label:
          "The image directly shows the galaxy exactly as it is everywhere at this instant.",
      },
      {
        id: "distance-time-same-unit",
        label:
          "A light-year is a unit of time, so distance does not need to be stated.",
      },
    ],
    correctOptionId: "past-state",
    success:
      "Correct. Astronomy receives delayed information. A light-year measures distance, while lookback time describes how old the arriving information is under a stated cosmological model when needed.",
    correction:
      "The telescope receives a signal that left earlier. Do not silently replace that measured past state with an unobserved present state, and keep distance units distinct from time units.",
  },
] as const;

export function isAstronomyEvidenceAnswerCorrect(
  caseId: string,
  optionId: string
): boolean {
  return (
    ASTRONOMY_EVIDENCE_CASES.find((item) => item.id === caseId)
      ?.correctOptionId === optionId
  );
}
