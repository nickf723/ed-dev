export const MUSIC_BRANCH_IDS = [
  "humanities.music.theory",
  "humanities.music.acoustics",
  "humanities.music.performance",
  "humanities.music.history-culture",
  "humanities.music.recordings",
] as const;

export const PITCH_CLASSES = [
  "C",
  "C♯",
  "D",
  "D♯",
  "E",
  "F",
  "F♯",
  "G",
  "G♯",
  "A",
  "A♯",
  "B",
] as const;

export type PitchClass = (typeof PITCH_CLASSES)[number];

export type NoteValue = "whole" | "half" | "quarter" | "eighth" | "sixteenth";

export const NOTE_VALUE_IN_QUARTERS: Record<NoteValue, number> = {
  whole: 4,
  half: 2,
  quarter: 1,
  eighth: 0.5,
  sixteenth: 0.25,
};

export function transposePitch(
  pitch: PitchClass,
  semitones: number
): PitchClass {
  const index = PITCH_CLASSES.indexOf(pitch);
  const normalized = (((index + semitones) % 12) + 12) % 12;
  return PITCH_CLASSES[normalized];
}

export function transposePhrase(
  pitches: readonly PitchClass[],
  semitones: number
): PitchClass[] {
  return pitches.map((pitch) => transposePitch(pitch, semitones));
}

export function getMeasureLedger(
  values: readonly NoteValue[],
  beatsPerMeasure = 4
) {
  const usedBeats = values.reduce(
    (total, value) => total + NOTE_VALUE_IN_QUARTERS[value],
    0
  );

  return {
    usedBeats,
    beatsPerMeasure,
    remainingBeats: beatsPerMeasure - usedBeats,
    complete: usedBeats === beatsPerMeasure,
    overflow: usedBeats > beatsPerMeasure,
  };
}

export type MusicAssessmentCase = {
  id: "meter" | "transposition" | "object-identity" | "evidence-boundary";
  eyebrow: string;
  prompt: string;
  options: readonly string[];
  correctIndex: number;
  explanation: string;
  representation:
    | "beat-ledger"
    | "pitch-strip"
    | "object-chain"
    | "evidence-tags";
};

export const MUSIC_ASSESSMENT_CASES: readonly MusicAssessmentCase[] = [
  {
    id: "meter",
    eyebrow: "Rote practice · duration",
    prompt:
      "A 4/4 measure contains one half note, one quarter note, and two eighth notes. Is the measure full?",
    options: [
      "Yes — 2 + 1 + ½ + ½ = 4 beats",
      "No — it contains only 3 beats",
      "No — the eighth notes make it overflow",
    ],
    correctIndex: 0,
    explanation:
      "Duration is additive. In quarter-note units, the events occupy exactly four beats.",
    representation: "beat-ledger",
  },
  {
    id: "transposition",
    eyebrow: "Rote practice · pitch",
    prompt: "Transpose the pitch classes C–E–G upward by two semitones.",
    options: ["D–F♯–A", "D–F–A", "C♯–F–G♯"],
    correctIndex: 0,
    explanation:
      "Transposition preserves interval distances while moving every pitch by the same amount.",
    representation: "pitch-strip",
  },
  {
    id: "object-identity",
    eyebrow: "Interpretation · musical objects",
    prompt:
      "A singer uses the same score but changes tempo and phrasing in a newly captured take. What changed?",
    options: [
      "The performance and recording changed; the composition may remain the same",
      "Only the composition changed",
      "Nothing changed because the score is unchanged",
    ],
    correctIndex: 0,
    explanation:
      "A composition can support many performed realizations, and each captured event can become a distinct recording.",
    representation: "object-chain",
  },
  {
    id: "evidence-boundary",
    eyebrow: "Evidence · claim discipline",
    prompt:
      "An album record supplies a cover, artist, and release year. Can those fields prove that a track uses syncopation?",
    options: [
      "No — inspect the sounding rhythm or a trustworthy transcription",
      "Yes — release metadata describes every musical feature",
      "Yes — cover art is a direct representation of rhythm",
    ],
    correctIndex: 0,
    explanation:
      "Catalog metadata can establish identity and publication context. A claim about rhythm needs sonic or notated evidence.",
    representation: "evidence-tags",
  },
] as const;

export function isMusicAssessmentAnswerCorrect(
  caseId: MusicAssessmentCase["id"],
  selectedIndex: number
) {
  const assessmentCase = MUSIC_ASSESSMENT_CASES.find(
    (candidate) => candidate.id === caseId
  );
  return assessmentCase?.correctIndex === selectedIndex;
}
