export const MATERIALS_SCIENCE_BRANCH_IDS = [
  "applied.materials-science.structure",
  "applied.materials-science.properties",
  "applied.materials-science.metals",
  "applied.materials-science.ceramics",
  "applied.materials-science.polymers",
  "applied.materials-science.composites",
  "applied.materials-science.functional",
  "applied.materials-science.processing-characterization",
] as const;

export type MechanicalProfileKey = "brittle" | "ductile" | "elastomer";

export type MechanicalProfile = {
  label: string;
  rgb: string;
  stiffness: string;
  deformation: string;
  limit: number;
  summary: string;
};

export type MechanicalResponse = {
  stress: number;
  fractured: boolean;
};

export const MECHANICAL_PROFILES: Record<
  MechanicalProfileKey,
  MechanicalProfile
> = {
  brittle: {
    label: "Brittle-like response",
    rgb: "125,211,252",
    stiffness: "high cue",
    deformation: "mostly elastic → fracture",
    limit: 2,
    summary:
      "A steep initial slope and little strain before the teaching fracture point. This emphasizes stiffness and limited deformation capacity, not a specific ceramic or glass dataset.",
  },
  ductile: {
    label: "Ductile-like response",
    rgb: "251,191,36",
    stiffness: "moderate-high cue",
    deformation: "elastic → plastic → fracture",
    limit: 20,
    summary:
      "An initial elastic region is followed by idealized yielding and plastic deformation before the teaching fracture point. Real metals show material-, temperature-, rate-, and processing-dependent curves.",
  },
  elastomer: {
    label: "Elastomer-like response",
    rgb: "244,114,182",
    stiffness: "low initial cue",
    deformation: "large reversible deformation",
    limit: 20,
    summary:
      "A low initial slope and strongly nonlinear rise illustrate large reversible deformation within this toy window. Real elastomers can show rate dependence, hysteresis, temperature sensitivity, and much larger strains.",
  },
};

export function getMechanicalResponse(
  profile: MechanicalProfileKey,
  strain: number
): MechanicalResponse {
  const boundedStrain = Math.max(0, strain);

  if (profile === "brittle") {
    if (boundedStrain > 2) return { stress: 0, fractured: true };
    return {
      stress: Math.min(0.94, boundedStrain * 0.47),
      fractured: false,
    };
  }

  if (profile === "ductile") {
    if (boundedStrain > 20) return { stress: 0, fractured: true };
    if (boundedStrain <= 2) {
      return { stress: boundedStrain * 0.31, fractured: false };
    }
    if (boundedStrain <= 14) {
      return {
        stress: 0.62 + (boundedStrain - 2) * 0.021,
        fractured: false,
      };
    }
    return {
      stress: Math.max(0.62, 0.872 - (boundedStrain - 14) * 0.038),
      fractured: false,
    };
  }

  if (boundedStrain > 20) return { stress: 0, fractured: true };
  return {
    stress: Math.min(0.96, 0.0122 * Math.pow(boundedStrain, 1.45)),
    fractured: false,
  };
}

export function getMechanicalRegime(
  profile: MechanicalProfileKey,
  strain: number
) {
  if (profile === "brittle") {
    return strain > 2
      ? {
          label: "fractured",
          note: "beyond the teaching fracture point",
          rgb: "248,113,113",
        }
      : {
          label: "elastic",
          note: "steep reversible-response cue",
          rgb: "125,211,252",
        };
  }

  if (profile === "ductile") {
    if (strain > 20) {
      return {
        label: "fractured",
        note: "beyond the teaching fracture point",
        rgb: "248,113,113",
      };
    }
    if (strain <= 2) {
      return {
        label: "elastic",
        note: "initial reversible-response cue",
        rgb: "125,211,252",
      };
    }
    return {
      label: "plastic",
      note: "idealized permanent-deformation regime",
      rgb: "251,191,36",
    };
  }

  return strain > 20
    ? {
        label: "outside model",
        note: "toy curve stops at 20% strain",
        rgb: "248,113,113",
      }
    : {
        label: "large reversible",
        note: "schematic nonlinear elastic cue",
        rgb: "244,114,182",
      };
}

export function getMechanicalCurve(
  profile: MechanicalProfileKey,
  points = 111
) {
  const count = Math.max(2, Math.round(points));
  return Array.from({ length: count }, (_, index) => {
    const strain = (index / (count - 1)) * 22;
    return { x: strain, ...getMechanicalResponse(profile, strain) };
  });
}

export function calculateEngineeringStress(
  forceNewtons: number,
  originalAreaSquareMillimeters: number
): number | null {
  if (originalAreaSquareMillimeters <= 0) return null;
  return forceNewtons / originalAreaSquareMillimeters;
}

export const MATERIALS_EVIDENCE_CASES = [
  {
    id: "stress-calculation",
    label: "Calculate engineering stress",
    eyebrow: "Practice 01 · exact units",
    evidence:
      "A tensile specimen carries 18 kN of force. Its original cross-sectional area is 60 mm². One newton per square millimeter equals one megapascal.",
    prompt: "What engineering stress should be reported at that instant?",
    options: [
      {
        id: "300-mpa",
        label: "18,000 N ÷ 60 mm² = 300 N/mm² = 300 MPa.",
      },
      {
        id: "30-mpa",
        label: "18,000 N ÷ 60 mm² = 30 MPa.",
      },
      {
        id: "1080-mpa",
        label: "18 kN × 60 mm² = 1,080 MPa.",
      },
    ],
    correctOptionId: "300-mpa",
    success:
      "Correct. Engineering stress divides applied force by the original cross-sectional area. The N/mm² unit is numerically identical to MPa.",
    correction:
      "Convert 18 kN to 18,000 N, then divide by 60 mm². Multiplying force and area or dropping a power of ten changes both the operation and the unit.",
  },
  {
    id: "stiffness-strength",
    label: "Separate stiffness from strength",
    eyebrow: "Practice 02 · curve reading",
    evidence:
      "Curve A has a steeper initial elastic slope than Curve B. The graph does not show either curve's maximum stress or fracture energy.",
    prompt: "What does the visible evidence support?",
    options: [
      {
        id: "stiffer-only",
        label:
          "Curve A represents the stiffer response in the plotted elastic region; strength and toughness need additional evidence.",
      },
      {
        id: "stronger-tougher",
        label:
          "Curve A must also be stronger and tougher because every steep curve stores more energy before fracture.",
      },
      {
        id: "same-stiffness",
        label:
          "The slopes cannot support a stiffness comparison unless both materials fracture at the same strain.",
      },
    ],
    correctOptionId: "stiffer-only",
    success:
      "Exactly. Initial elastic slope is a stiffness cue. Strength depends on stress limits, while toughness depends on energy absorbed through deformation and fracture.",
    correction:
      "Name the feature actually visible: initial slope. A curve needs more of its stress and strain history before it can support claims about strength or toughness.",
  },
  {
    id: "processing-path",
    label: "Trace processing to performance",
    eyebrow: "Practice 03 · causal chain",
    evidence:
      "Two specimens have the same nominal alloy composition. One was quenched and tempered; the other was slowly cooled. Microscopy shows different phase and grain structures, and their tensile curves differ.",
    prompt: "Which explanation best uses all of the evidence?",
    options: [
      {
        id: "process-structure-property",
        label:
          "Processing changed microstructure, and the different microstructures contributed to different mechanical responses.",
      },
      {
        id: "composition-complete",
        label:
          "Nominal composition completely determines response, so one of the tests must be invalid.",
      },
      {
        id: "microscopy-proves-life",
        label:
          "A different micrograph proves which specimen will have the longer service life in every environment.",
      },
    ],
    correctOptionId: "process-structure-property",
    success:
      "Right. Composition matters, but processing can change phases, defects, grains, and interfaces. Those structures help determine measured properties and performance.",
    correction:
      "Follow the complete chain: processing → structure → measured response. The evidence does not erase composition, invalidate a test, or establish every service-life condition.",
  },
  {
    id: "selection-boundary",
    label: "Select for service",
    eyebrow: "Practice 04 · requirements",
    evidence:
      "Candidate X has the highest room-temperature tensile strength. The component will cycle at 700 °C in a corrosive atmosphere for 20,000 hours. No creep, oxidation, fatigue, or joining data are supplied.",
    prompt: "What is the defensible selection decision?",
    options: [
      {
        id: "insufficient-service-data",
        label:
          "Do not select from room-temperature strength alone; obtain property and degradation evidence under relevant service and manufacturing conditions.",
      },
      {
        id: "choose-x",
        label:
          "Select Candidate X because the largest tensile-strength number dominates every other requirement.",
      },
      {
        id: "reject-x",
        label:
          "Reject Candidate X because every high-strength material necessarily creeps and corrodes faster.",
      },
    ],
    correctOptionId: "insufficient-service-data",
    success:
      "Correct. Selection is conditional on service, geometry, processing, failure modes, uncertainty, and consequences. The supplied metric does not answer the actual requirement set.",
    correction:
      "Translate the service description into required evidence. Room-temperature tensile strength cannot stand in for high-temperature creep, cyclic damage, oxidation, joining, or lifetime.",
  },
] as const;

export type MaterialsEvidenceCaseId =
  (typeof MATERIALS_EVIDENCE_CASES)[number]["id"];

export function isMaterialsEvidenceAnswerCorrect(
  caseId: string,
  optionId: string
): boolean {
  const evidenceCase = MATERIALS_EVIDENCE_CASES.find(
    (item) => item.id === caseId
  );
  return evidenceCase?.correctOptionId === optionId;
}
