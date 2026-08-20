import type { CurriculumNode } from "@/lib/curriculum/types";

function planned(id: string, label: string, href: string, description: string): CurriculumNode {
  return { id, label, href, description, domainId: "humanities", status: "placeholder", pageKind: "unit" };
}

export const PERFORMING_ARTS_CURRICULUM: CurriculumNode = {
  id: "humanities.performing-arts",
  label: "Performing Arts",
  href: "/humanities/performing-arts",
  description:
    "Study live and mediated performance through acting, movement, voice, directing, choreography, stagecraft, screen performance, ensemble practice, audience relationships, rehearsal, interpretation, and the coordination of bodies, space, time, and cues.",
  domainId: "humanities",
  status: "active",
  pageKind: "hub",
  children: [
    planned("humanities.performing-arts.theatre", "Theatre & Acting", "/humanities/performing-arts/theatre", "Study acting, character, scene work, rehearsal, staging, dramatic action, ensemble, theatrical traditions, and live relationships between performer and audience."),
    planned("humanities.performing-arts.dance", "Dance & Choreography", "/humanities/performing-arts/dance", "Study movement vocabularies, technique, choreography, rhythm, space, weight, dynamics, embodiment, partnering, notation, repertoire, and performance traditions."),
    {
      id: "humanities.performing-arts.screen-performance",
      label: "Screen Performance & Film",
      href: "/humanities/performing-arts/tv-film",
      description: "Study acting for camera, blocking for frame, voice performance, motion capture, stunt performance, continuity, takes, editing context, and how captured performance differs from live presence.",
      domainId: "humanities",
      status: "active",
      pageKind: "unit",
    },
    planned("humanities.performing-arts.directing-dramaturgy", "Directing & Dramaturgy", "/humanities/performing-arts/directing-dramaturgy", "Study interpretation, rehearsal leadership, blocking, pacing, composition, collaboration, research, text or score analysis, dramaturgy, and the shaping of performance as a whole."),
    planned("humanities.performing-arts.stagecraft-design", "Stagecraft & Performance Design", "/humanities/performing-arts/stagecraft-design", "Study scenery, lighting, costume, sound, props, stage management, technical systems, cueing, backstage workflows, safety, and how design organizes attention and meaning."),
    planned("humanities.performing-arts.voice-spoken", "Voice & Spoken Performance", "/humanities/performing-arts/voice-spoken", "Study vocal production, speech, storytelling, spoken word, public performance, comedy, narration, text delivery, microphone technique, and expressive timing."),
    planned("humanities.performing-arts.circus-variety", "Circus, Variety & Physical Performance", "/humanities/performing-arts/circus-variety", "Study circus, clowning, puppetry, magic, physical comedy, acrobatics, illusion, object performance, timing, attention, risk, and specialized performance craft."),
    planned("humanities.performing-arts.performance-studies", "Performance Studies", "/humanities/performing-arts/performance-studies", "Study performance as cultural practice through ritual, identity, spectatorship, embodiment, liveness, documentation, institutions, politics, everyday performance, and performance history/theory."),
  ],
};
