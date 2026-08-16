import type { CurriculumNode } from "@/lib/curriculum/types";

function node(
  id: string,
  label: string,
  href: string,
  description: string,
  children?: readonly CurriculumNode[],
  status: CurriculumNode["status"] = "placeholder",
): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "humanities",
    status,
    pageKind: children?.length ? "hub" : "unit",
    children,
  };
}

export const MUSIC_CURRICULUM: CurriculumNode = {
  id: "humanities.music",
  label: "Music",
  href: "/humanities/music",
  description:
    "Sound organized through pitch, rhythm, timbre, form, performance, recording, and culture.",
  domainId: "humanities",
  status: "active",
  pageKind: "hub",
  children: [
    node(
      "humanities.music.theory",
      "Theory & Composition",
      "/humanities/music/theory",
      "Pitch, rhythm, harmony, notation, form, and the structural relationships used to analyze and create music.",
      [
        node(
          "humanities.music.theory.rhythm",
          "Rhythm & Meter",
          "/humanities/music/rhythm",
          "Pulse, duration, meter, subdivision, syncopation, polyrhythm, groove, and the organization of musical time.",
          undefined,
          "active",
        ),
        node(
          "humanities.music.theory.scales",
          "Scales & Modes",
          "/humanities/music/scales",
          "Pitch collections, intervals, tonal centers, major and minor scales, modes, and alternative pitch organizations.",
          undefined,
          "active",
        ),
        node(
          "humanities.music.theory.chords",
          "Chords",
          "/humanities/music/chords",
          "Simultaneous pitch structures, triads, seventh chords, extensions, voicing, and chord quality.",
          undefined,
          "active",
        ),
        node(
          "humanities.music.theory.harmony",
          "Harmony",
          "/humanities/music/harmony",
          "Chord relationships, harmonic function, progression, voice leading, tension, and resolution.",
          undefined,
          "active",
        ),
        node(
          "humanities.music.theory.notation",
          "Notation",
          "/humanities/music/notation",
          "Systems for recording pitch, rhythm, dynamics, articulation, form, and performance instructions.",
          undefined,
          "active",
        ),
      ],
      "active",
    ),
    node(
      "humanities.music.acoustics",
      "Acoustics",
      "/humanities/music/acoustics",
      "Frequency, resonance, spectra, timbre, instruments, rooms, hearing, and the physical behavior of musical sound.",
    ),
    node(
      "humanities.music.performance",
      "Performance & Instrumentation",
      "/humanities/music/performance",
      "Technique, interpretation, ensembles, orchestration, instrumentation, improvisation, and live musical practice.",
    ),
    node(
      "humanities.music.history-culture",
      "Music History & Culture",
      "/humanities/music/history",
      "Musical traditions, scenes, technologies, institutions, genres, identities, and change across time and place.",
    ),
    node(
      "humanities.music.recordings",
      "Recorded Music & Discography",
      "/humanities/music/recordings",
      "Albums, singles, release histories, artists, editions, recordings, production, and catalog metadata.",
      undefined,
      "active",
    ),
  ],
};
