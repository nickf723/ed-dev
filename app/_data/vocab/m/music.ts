import type { VocabTerm } from "../types";

export const musicVocab: VocabTerm[] = [
  term(
    "music",
    "Music",
    "Sound and silence organized through time as structure, performance, experience, and cultural practice.",
    ["Foundations"]
  ),
  term(
    "pitch",
    "Pitch",
    "The perceived highness or lowness of a sound, related chiefly to the rate of its repeating vibration.",
    ["Acoustics", "Theory"]
  ),
  term(
    "pitch-class",
    "Pitch Class",
    "All pitches treated as equivalent when separated by one or more octaves, such as every C.",
    ["Theory", "Scales"]
  ),
  term(
    "rhythm",
    "Rhythm",
    "The pattern of musical durations, attacks, accents, and silences through time.",
    ["Theory", "Rhythm"]
  ),
  term(
    "beat",
    "Beat",
    "A recurring temporal reference pulse used to orient durations and accents.",
    ["Theory", "Rhythm"]
  ),
  term(
    "tempo",
    "Tempo",
    "The rate of the musical pulse, often measured in beats per minute.",
    ["Rhythm", "Performance"]
  ),
  term(
    "meter",
    "Meter",
    "A recurring organization of beats into stronger and weaker positions, commonly grouped into measures.",
    ["Theory", "Rhythm"]
  ),
  term(
    "syncopation",
    "Syncopation",
    "Rhythmic emphasis that contradicts or displaces an expected metrical accent.",
    ["Rhythm", "Performance"]
  ),
  term(
    "melody",
    "Melody",
    "A perceived succession of pitches and durations that forms a coherent musical line.",
    ["Theory", "Composition"]
  ),
  term(
    "interval",
    "Interval",
    "The measured pitch distance between two notes.",
    ["Theory", "Scales"]
  ),
  term(
    "scale",
    "Scale",
    "An ordered collection of pitches used as a framework for melody and harmony.",
    ["Theory", "Scales"]
  ),
  term(
    "mode",
    "Mode",
    "A pitch organization characterized by a tonal center and a particular pattern of intervals.",
    ["Theory", "Scales"]
  ),
  term(
    "chord",
    "Chord",
    "A collection of pitches understood as sounding together as one harmonic unit.",
    ["Theory", "Harmony"]
  ),
  term(
    "harmony",
    "Harmony",
    "The organization and perceived relationship of pitches sounding together and moving through time.",
    ["Theory", "Harmony"]
  ),
  term(
    "timbre",
    "Timbre",
    "The perceived character or tone color that helps distinguish sounds with similar pitch and loudness.",
    ["Acoustics", "Instrumentation"]
  ),
  term(
    "texture",
    "Texture",
    "The relationship among simultaneous musical layers, voices, or lines.",
    ["Theory", "Composition"]
  ),
  term(
    "form",
    "Form",
    "The large-scale organization of musical sections, repetition, contrast, and return.",
    ["Theory", "Composition"]
  ),
  term(
    "dynamics",
    "Dynamics",
    "The shaping and relative level of musical loudness.",
    ["Notation", "Performance"]
  ),
  term(
    "articulation",
    "Articulation",
    "How a performer begins, connects, sustains, and releases musical sounds.",
    ["Notation", "Performance"]
  ),
  term(
    "notation",
    "Musical Notation",
    "A visual system for representing musical events and performance instructions.",
    ["Theory", "Representation"]
  ),
  term(
    "composition",
    "Composition",
    "A deliberately organized musical design that can support one or many performances.",
    ["Composition", "Identity"]
  ),
  term(
    "performance",
    "Performance",
    "A situated realization of music by people, instruments, voices, or other sound-producing systems.",
    ["Performance", "Identity"]
  ),
  term(
    "recording",
    "Recording",
    "A captured and reproducible representation of a sounding event, shaped by production and media.",
    ["Recording", "Identity"]
  ),
  term(
    "release-group",
    "Release Group",
    "A catalog entity that groups editions and releases understood as versions of the same overall album or single concept.",
    ["Recording", "Catalogs"]
  ),
];

function term(
  id: string,
  word: string,
  definition: string,
  tags: string[]
): VocabTerm {
  return {
    id: `music-${id}`,
    word,
    definition,
    domain: "Music",
    tags,
    isAdult: false,
  };
}
