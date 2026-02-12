export const PIANO_MEDIA = {
  hero: "https://images.unsplash.com/photo-1552422535-c45813c61732?auto=format&fit=crop&q=80&w=1600", // Grand Piano close up
  posture: "https://images.unsplash.com/photo-1513883049090-d0b7439799bf?auto=format&fit=crop&q=80&w=1000", // Hands on keys
};

export const PIANO_VOCAB = [
  {
    term: 'Legato',
    def: 'Smooth and connected. No silence between notes. Imagine pouring water.',
    icon: 'Wave'
  },
  {
    term: 'Staccato',
    def: 'Short and detached. Notes are crisp and bouncy. Imagine touching a hot stove.',
    icon: 'Dot'
  },
  {
    term: 'Dynamics',
    def: 'The volume of the sound. From Pianissimo (very soft) to Fortissimo (very loud).',
    icon: 'Volume2'
  },
  {
    term: 'Fingering',
    def: 'The choice of which finger to use for a specific note. Thumbs are always "1", Pinkies are "5".',
    icon: 'Hand'
  }
];

export const PIANO_CONFIG = {
  notes: [
    { note: "C4", type: "white", key: "a" },
    { note: "C#4", type: "black", key: "w" },
    { note: "D4", type: "white", key: "s" },
    { note: "D#4", type: "black", key: "e" },
    { note: "E4", type: "white", key: "d" },
    { note: "F4", type: "white", key: "f" },
    { note: "F#4", type: "black", key: "t" },
    { note: "G4", type: "white", key: "g" },
    { note: "G#4", type: "black", key: "y" },
    { note: "A4", type: "white", key: "h" },
    { note: "A#4", type: "black", key: "u" },
    { note: "B4", type: "white", key: "j" },
    { note: "C5", type: "white", key: "k" }
  ]
};

export const SCALES_DB = {
  "Chromatic": ["C4","C#4","D4","D#4","E4","F4","F#4","G4","G#4","A4","A#4","B4","C5"],
  "C Major": ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"],
  "G Major": ["G4", "A4", "B4", "C5", "D4", "E4", "F#4", "G4"], // Note: Partial view on this small keyboard
  "A Minor": ["A4", "B4", "C5", "D4", "E4", "F4", "G4", "A4"],
  "Blues (C)": ["C4", "D#4", "F4", "F#4", "G4", "A#4", "C5"]
};