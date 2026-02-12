// NOTES DEFINITION
export const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

// INTERVAL FORMULAS (Semitones from Root)
export const FORMULAS = {
  scales: {
    "Major": [0, 2, 4, 5, 7, 9, 11],
    "Minor (Natural)": [0, 2, 3, 5, 7, 8, 10],
    "Harmonic Minor": [0, 2, 3, 5, 7, 8, 11],
    "Blues": [0, 3, 5, 6, 7, 10],
    "Pentatonic Major": [0, 2, 4, 7, 9],
    "Pentatonic Minor": [0, 3, 5, 7, 10]
  },
  chords: {
    "Major": [0, 4, 7],
    "Minor": [0, 3, 7],
    "Diminished": [0, 3, 6],
    "Augmented": [0, 4, 8],
    "Major 7th": [0, 4, 7, 11],
    "Minor 7th": [0, 3, 7, 10],
    "Dominant 7th": [0, 4, 7, 10]
  }
};

// HELPER: Get frequency from Note Name + Octave
// A4 = 440Hz. Formula: f = 440 * (2 ^ (n / 12)) where n is semitones from A4
export const getFreq = (note: string, octave: number) => {
  const semitonesFromA4 = (octave - 4) * 12 + NOTES.indexOf(note) - NOTES.indexOf("A");
  return 440 * Math.pow(2, semitonesFromA4 / 12);
};

// API FUNCTION: Get notes for a specific Root + Type
export const getTheoryData = (root: string, type: string, mode: 'scale' | 'chord') => {
  const rootIndex = NOTES.indexOf(root);
  const formula = mode === 'scale' 
      ? FORMULAS.scales[type as keyof typeof FORMULAS.scales] 
      : FORMULAS.chords[type as keyof typeof FORMULAS.chords];
  
  if (!formula) return [];

  // Map intervals to actual notes
  // Note: We don't handle octave wrapping logic here for simplicity, 
  // the visualizer will match note names regardless of octave.
  return formula.map(interval => NOTES[(rootIndex + interval) % 12]);
};