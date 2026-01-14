import { 
  Mic2, Clapperboard, Drama, Move, 
  Tent, // For Variety/Circus
  Palette, // For Scenography
  Speaker,
  Music 
} from "lucide-react";

export interface PerformingArtDomain {
  id: string;
  title: string;
  desc: string;
  icon: any;
  color: string;
  // Future-proofing: This ID links to your future Media Databases
  repositoryId?: string; 
  subdomains: { title: string; desc: string }[];
}

export const PERFORMING_ARTS_DATA: PerformingArtDomain[] = [
  {
    id: "screen",
    title: "Screen Performance",
    desc: "The captured performance. From the silver screen to the streaming stream.",
    icon: Clapperboard,
    color: "text-cyan-400",
    repositoryId: "screen-db", // Future link to Movie/TV Repository
    subdomains: [
      { title: "Cinema & Television", desc: "The blurring lines of episodic and feature storytelling." },
      { title: "Voice Acting", desc: "Animation, dubbing, and narrative audio." },
      { title: "Stunt Performance", desc: "Physical choreography and safety coordination." },
      { title: "Motion Capture", desc: "Digital puppetry via human movement." }
    ]
  },
  {
    id: "theatre",
    title: "Theatre",
    desc: "The immediate, ephemeral connection between actor and audience.",
    icon: Drama,
    color: "text-rose-500",
    repositoryId: "play-db", // Future link to Script Repository
    subdomains: [
      { title: "Acting & Method", desc: "Stanislavski, Meisner, and the craft of being." },
      { title: "Directing", desc: "The unification of vision and blocking." },
      { title: "Musical Theatre", desc: "The seamless integration of song, dance, and narrative." },
      { title: "Improv", desc: "Spontaneous composition of dramatic action." }
    ]
  },
  {
    id: "music-performance",
    title: "Vocals & Instrumentals",
    desc: "The physical mastery of sound production.",
    icon: Mic2, // Distinct from 'Music Theory' icon
    color: "text-amber-400",
    repositoryId: "sheet-music-db", // Future link to Song/Lyrics Repository
    subdomains: [
      { title: "Vocal Technique", desc: "Opera, Bel Canto, Jazz, and Pop stylings." },
      { title: "Instrumental Virtuosity", desc: "Strings, Woodwinds, Brass, and Percussion mastery." },
      { title: "Conducting", desc: "The physical leadership of the ensemble." },
      { title: "Ensemble Practice", desc: "Chamber music, bands, and orchestral dynamics." }
    ]
  },
  {
    id: "dance",
    title: "Dance",
    desc: "Expression through the movement of the body in space and time.",
    icon: Move,
    color: "text-indigo-400",
    repositoryId: "choreo-db",
    subdomains: [
      { title: "Choreography", desc: "The notation and design of movement." },
      { title: "Classical Ballet", desc: "Rigorous technique and historical repertoire." },
      { title: "Contemporary & Modern", desc: "Breaking form and gravity." },
      { title: "Somatic Practice", desc: "Body awareness and movement therapy." }
    ]
  },
  {
    id: "variety",
    title: "Variety Arts",
    desc: "The specialized skills of entertainment, spectacle, and wonder.",
    icon: Tent, // Represents Circus/Tent
    color: "text-fuchsia-500",
    subdomains: [
      { title: "Comedy", desc: "Stand-up, sketch, and the architecture of a joke." },
      { title: "Magic & Illusion", desc: "The psychology of attention and deception." },
      { title: "Puppetry", desc: "Giving life to the inanimate (Marionette, Hand, Shadow)." },
      { title: "Circus Arts", desc: "Acrobatics, aerials, and clowning." }
    ]
  },
  {
    id: "scenography",
    title: "Scenography",
    desc: "The creation of the performance environment.",
    icon: Palette,
    color: "text-emerald-400",
    subdomains: [
      { title: "Set Design", desc: "Architectural storytelling and spacing." },
      { title: "Lighting Design", desc: "Painting with photons and shadow." },
      { title: "Costume Design", desc: "Character psychology through texture and silhouette." },
      { title: "Sound Design", desc: "The sonic landscape of the stage." }
    ]
  }
];