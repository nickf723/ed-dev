export const ARCHITECTURE_BRANCH_IDS = [
  "applied.architecture.design-studio",
  "applied.architecture.building-technology",
  "applied.architecture.structures",
  "applied.architecture.environmental-systems",
  "applied.architecture.urban-site",
  "applied.architecture.history-theory",
  "applied.architecture.representation-fabrication",
  "applied.architecture.practice-codes",
] as const;

export function getRectangularArea(widthMeters: number, depthMeters: number) {
  return widthMeters * depthMeters;
}

export function drawingMillimetersToActualMeters(
  drawingMillimeters: number,
  scaleDenominator: number
) {
  return (drawingMillimeters * scaleDenominator) / 1000;
}

export function getRampRunMeters(riseMeters: number, runPerRise = 12) {
  return riseMeters * runPerRise;
}

export type ArchitectureAssessmentCase = {
  id: "area" | "scale" | "ramp" | "coordination";
  eyebrow: string;
  prompt: string;
  options: readonly string[];
  correctIndex: number;
  explanation: string;
  representation: "plan" | "scale-bar" | "section" | "overlay";
};

export const ARCHITECTURE_ASSESSMENT_CASES: readonly ArchitectureAssessmentCase[] =
  [
    {
      id: "area",
      eyebrow: "Rote practice · plan area",
      prompt:
        "A rectangular studio is 8 m wide and 6 m deep. What is its floor area?",
      options: ["48 m²", "28 m²", "14 m²"],
      correctIndex: 0,
      explanation:
        "For a rectangle, floor area equals width multiplied by depth: 8 × 6 = 48 square metres.",
      representation: "plan",
    },
    {
      id: "scale",
      eyebrow: "Rote practice · representation",
      prompt:
        "A wall measures 72 mm on a 1:100 drawing. How long is it in the building?",
      options: ["7.2 m", "72 m", "0.72 m"],
      correctIndex: 0,
      explanation:
        "At 1:100, each drawing unit represents 100 actual units. 72 mm becomes 7,200 mm, or 7.2 m.",
      representation: "scale-bar",
    },
    {
      id: "ramp",
      eyebrow: "Rote practice · section",
      prompt:
        "Using a 1:12 rise-to-run ratio, what run corresponds to a 0.75 m rise?",
      options: ["9 m", "6.25 m", "12.75 m"],
      correctIndex: 0,
      explanation:
        "The simplified run is 0.75 × 12 = 9 m. This arithmetic alone does not establish code compliance.",
      representation: "section",
    },
    {
      id: "coordination",
      eyebrow: "Design judgment · coordination",
      prompt:
        "A column moves into the clear path beside an entry ramp. What is the strongest next move?",
      options: [
        "Coordinate structure, circulation, accessibility, dimensions, and construction together",
        "Keep the column because structural drawings always outrank use",
        "Erase the ramp because appearance is the only design criterion",
      ],
      correctIndex: 0,
      explanation:
        "Architecture coordinates systems. A conflict at an accessible route cannot be solved responsibly inside only one drawing layer.",
      representation: "overlay",
    },
  ] as const;

export function isArchitectureAssessmentAnswerCorrect(
  caseId: ArchitectureAssessmentCase["id"],
  selectedIndex: number
) {
  const assessmentCase = ARCHITECTURE_ASSESSMENT_CASES.find(
    (candidate) => candidate.id === caseId
  );
  return assessmentCase?.correctIndex === selectedIndex;
}
