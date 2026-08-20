import {
  Activity,
  Atom,
  BarChart3,
  Binary,
  Bone,
  BookOpen,
  Box,
  Brain,
  BrainCircuit,
  Briefcase,
  Building,
  ChefHat,
  Coins,
  Component,
  Cpu,
  Dna,
  Drama,
  Factory,
  FlaskConical,
  Gamepad2,
  Gavel,
  GraduationCap,
  Globe2,
  Hammer,
  HeartPulse,
  Hourglass,
  Languages,
  Library,
  Lightbulb,
  Map,
  MessageSquare,
  Microscope,
  Music,
  Network,
  Palette,
  PenTool,
  Rocket,
  Ruler,
  Scale,
  Search,
  ShieldCheck,
  Sigma,
  Sparkles,
  Star,
  Trophy,
  Users,
  Wheat,
  type LucideIcon,
} from "lucide-react";

export type CoreDomainId = "formal" | "natural" | "social" | "humanities" | "applied";

export type MatrixAxisSeed = {
  id: string;
  label: string;
  href: string;
  domainId: CoreDomainId;
};

export type Pairing = {
  title: string;
  desc: string;
  field: string;
  icon: LucideIcon;
  href?: string;
};

export const CORE_DOMAIN_ORDER: readonly CoreDomainId[] = [
  "formal",
  "natural",
  "social",
  "humanities",
  "applied",
];

export const DOMAIN_META: Record<
  CoreDomainId,
  { label: string; rgb: string; icon: LucideIcon }
> = {
  formal: { label: "Formal", rgb: "255, 65, 54", icon: Sigma },
  natural: { label: "Natural", rgb: "52, 211, 153", icon: Atom },
  social: { label: "Social", rgb: "96, 165, 250", icon: Users },
  humanities: { label: "Humanities", rgb: "251, 191, 36", icon: BookOpen },
  applied: { label: "Applied", rgb: "167, 139, 250", icon: Hammer },
};

export const SUBJECT_ICONS: Record<string, LucideIcon> = {
  "formal.mathematics": Sigma,
  "formal.logic": Binary,
  "formal.computer-science": Cpu,
  "formal.systems-science": Network,
  "formal.data-science": BarChart3,
  "formal.information-science": Library,
  "natural.physics": Atom,
  "natural.chemistry": FlaskConical,
  "natural.biology": Dna,
  "natural.earth-science": Globe2,
  "natural.astronomy": Star,
  "social.psychology": Brain,
  "social.communications": MessageSquare,
  "social.linguistics": Languages,
  "social.sociology": Users,
  "social.anthropology": Search,
  "social.economics": Coins,
  "social.political-science": Gavel,
  "social.law": Scale,
  "social.geography": Map,
  "humanities.philosophy": Lightbulb,
  "humanities.religion": Star,
  "humanities.history": Hourglass,
  "humanities.futurology": Rocket,
  "humanities.languages": Languages,
  "humanities.literature": BookOpen,
  "humanities.visual-arts": Palette,
  "humanities.music": Music,
  "humanities.performing-arts": Drama,
  "humanities.gaming": Gamepad2,
  "humanities.culinary-arts": ChefHat,
  "humanities.sports": Trophy,
  "humanities.culture": Users,
  "applied.engineering": Hammer,
  "applied.technology": Cpu,
  "applied.materials-science": Box,
  "applied.industrial-design": PenTool,
  "applied.architecture": Building,
  "applied.medicine": HeartPulse,
  "applied.health": Activity,
  "applied.agriculture": Wheat,
  "applied.business": Briefcase,
  "applied.education": GraduationCap,
  "applied.library-science": Library,
};

export function pairKey(a: string, b: string): string {
  return [a, b].sort().join("::");
}

export function subjectCode(label: string): string {
  const words = label.replace(/&/g, " ").split(/\s+/).filter(Boolean);
  if (words.length > 1) return words.slice(0, 3).map((word) => word[0]).join("").toUpperCase();
  return label.slice(0, 3).toUpperCase();
}

const LEGACY_IDS = {
  bio: "natural.biology",
  phys: "natural.physics",
  tech: "applied.technology",
  chem: "natural.chemistry",
  math: "formal.mathematics",
  hist: "humanities.history",
  arts: "humanities.visual-arts",
  psy: "social.psychology",
  soc: "social.sociology",
  phil: "humanities.philosophy",
} as const;

const LEGACY_PAIRINGS: Record<string, Pairing> = {
  "bio-phys": { title: "Biophysics", desc: "Physical principles applied to living systems.", icon: Activity, field: "Life × Physics" },
  "bio-tech": { title: "Synthetic Biology", desc: "Engineering biological circuits and programmable living systems.", icon: Dna, field: "Life × Technology" },
  "bio-chem": { title: "Biochemistry", desc: "Chemical processes that create and sustain life.", icon: Microscope, field: "Life × Chemistry" },
  "bio-math": { title: "Biostatistics", desc: "Quantitative reasoning for biological variation, evidence, and populations.", icon: BarChart3, field: "Life × Mathematics" },
  "bio-hist": { title: "Paleontology", desc: "Reconstructing the history of life through fossils and deep time.", icon: Bone, field: "Life × History" },
  "arts-bio": { title: "Biodesign", desc: "Design practices that work with living materials and biological processes.", icon: Component, field: "Life × Art" },
  "bio-psy": { title: "Neuroscience", desc: "The biological mechanisms underlying mind and behavior.", icon: BrainCircuit, field: "Life × Mind" },
  "bio-soc": { title: "Public Health", desc: "Health, disease, and prevention at population scale.", icon: HeartPulse, field: "Life × Society" },
  "bio-phil": { title: "Bioethics", desc: "Ethical questions created by medicine, biology, and biotechnology.", icon: Scale, field: "Life × Philosophy" },
  "phys-tech": { title: "Quantum Computing", desc: "Computation built from quantum states, measurement, and information.", icon: Sparkles, field: "Physics × Technology" },
  "chem-phys": { title: "Materials Science", desc: "Structure and behavior of matter engineered for useful properties.", icon: Component, field: "Physics × Chemistry" },
  "math-phys": { title: "Mathematical Physics", desc: "Mathematical structures used to formulate physical theories.", icon: Sigma, field: "Physics × Mathematics" },
  "hist-phys": { title: "Archaeoastronomy", desc: "How past cultures understood, measured, and used the sky.", icon: Star, field: "Physics × History" },
  "arts-phys": { title: "Acoustics", desc: "The physics of sound, resonance, spaces, instruments, and perception.", icon: Music, field: "Physics × Art" },
  "phys-psy": { title: "Psychophysics", desc: "How physical stimuli relate to sensation and perception.", icon: Brain, field: "Physics × Mind" },
  "phys-soc": { title: "Social Physics", desc: "Quantitative models of flows, networks, and collective behavior.", icon: Network, field: "Physics × Society" },
  "phil-phys": { title: "Metaphysics", desc: "Questions about reality, causation, time, possibility, and existence.", icon: Sparkles, field: "Physics × Philosophy" },
  "chem-tech": { title: "Nanotechnology", desc: "Engineering structures and devices at molecular and atomic scales.", icon: Component, field: "Chemistry × Technology" },
  "math-tech": { title: "Cryptography", desc: "Mathematical structures used to protect information and computation.", icon: Binary, field: "Mathematics × Technology" },
  "hist-tech": { title: "Digital Humanities", desc: "Computational methods used to analyze, preserve, and present human records.", icon: Search, field: "History × Technology" },
  "arts-tech": { title: "Generative Art", desc: "Creative systems where algorithms participate in making form, image, or sound.", icon: Cpu, field: "Art × Technology" },
  "psy-tech": { title: "Human-Computer Interaction", desc: "Designing computational systems around human perception, behavior, and goals.", icon: MessageSquare, field: "Mind × Technology" },
  "soc-tech": { title: "Digital Sociology", desc: "Social life, institutions, communities, and networks mediated by technology.", icon: Globe2, field: "Society × Technology" },
  "phil-tech": { title: "AI Ethics", desc: "Moral, political, and social questions created by intelligent systems.", icon: Gavel, field: "Philosophy × Technology" },
  "chem-math": { title: "Cheminformatics", desc: "Computational and mathematical representation of molecules and chemical data.", icon: Cpu, field: "Chemistry × Mathematics" },
  "chem-hist": { title: "Archaeometry", desc: "Scientific measurement and chemical analysis applied to archaeological materials.", icon: Hourglass, field: "Chemistry × History" },
  "arts-chem": { title: "Conservation Science", desc: "Material chemistry used to preserve art, artifacts, and cultural heritage.", icon: ShieldCheck, field: "Chemistry × Art" },
  "chem-psy": { title: "Psychopharmacology", desc: "How chemical interventions alter brain function, mood, and behavior.", icon: FlaskConical, field: "Chemistry × Mind" },
  "chem-soc": { title: "Industrial Ecology", desc: "Material and chemical flows through industries, cities, and ecosystems.", icon: Factory, field: "Chemistry × Society" },
  "chem-phil": { title: "Alchemy & Early Chemistry", desc: "Historical ideas about matter at the boundary of craft, philosophy, and science.", icon: FlaskConical, field: "Chemistry × Philosophy" },
  "hist-math": { title: "Cliometrics", desc: "Quantitative methods applied to historical economic and social questions.", icon: BarChart3, field: "Mathematics × History" },
  "arts-math": { title: "Mathematics of Form", desc: "Geometry, symmetry, proportion, pattern, and structure in visual creation.", icon: Ruler, field: "Mathematics × Art" },
  "math-psy": { title: "Psychometrics", desc: "Measurement models for ability, traits, behavior, and psychological constructs.", icon: Ruler, field: "Mathematics × Mind" },
  "math-soc": { title: "Mathematical Economics", desc: "Models of value, choice, incentives, markets, and allocation.", icon: Coins, field: "Mathematics × Society" },
  "math-phil": { title: "Logic", desc: "Formal systems for valid inference, proof, and reasoning.", icon: Binary, field: "Mathematics × Philosophy" },
  "arts-hist": { title: "Art History", desc: "Creative works interpreted through time, place, culture, and evidence.", icon: Palette, field: "History × Art" },
  "hist-psy": { title: "Psychohistory", desc: "Psychological interpretation of historical actors, groups, and collective behavior.", icon: Users, field: "History × Mind" },
  "hist-soc": { title: "Historical Sociology", desc: "How institutions, states, classes, and social structures change through time.", icon: Users, field: "History × Society" },
  "hist-phil": { title: "Intellectual History", desc: "The movement and transformation of ideas across historical contexts.", icon: BookOpen, field: "History × Philosophy" },
  "arts-psy": { title: "Art Therapy", desc: "Creative practice used within psychological care and expression.", icon: HeartPulse, field: "Art × Mind" },
  "arts-soc": { title: "Cultural Studies", desc: "Media, art, identity, power, and meaning in social life.", icon: Globe2, field: "Art × Society" },
  "arts-phil": { title: "Aesthetics", desc: "Philosophical study of beauty, art, taste, interpretation, and experience.", icon: Lightbulb, field: "Art × Philosophy" },
  "psy-soc": { title: "Social Psychology", desc: "How groups, norms, identities, and situations shape individual behavior.", icon: Users, field: "Mind × Society" },
  "phil-psy": { title: "Philosophy of Mind", desc: "Consciousness, cognition, identity, perception, and the nature of mental states.", icon: Brain, field: "Mind × Philosophy" },
  "phil-soc": { title: "Political Philosophy", desc: "Justice, rights, authority, freedom, institutions, and the state.", icon: Scale, field: "Society × Philosophy" },
};

const remappedLegacyPairings = Object.fromEntries(
  Object.entries(LEGACY_PAIRINGS).map(([legacyKey, pairing]) => {
    const [left, right] = legacyKey.split("-") as [keyof typeof LEGACY_IDS, keyof typeof LEGACY_IDS];
    return [pairKey(LEGACY_IDS[left], LEGACY_IDS[right]), pairing];
  }),
) as Record<string, Pairing>;

const EXTRA_PAIRINGS: Record<string, Pairing> = {
  [pairKey("formal.data-science", "natural.biology")]: {
    title: "Bioinformatics",
    desc: "Computational methods for biological sequences, structures, systems, and large-scale data.",
    icon: Dna,
    field: "Biology × Data Science",
    href: "/interdisciplines/bioinformatics",
  },
  [pairKey("formal.computer-science", "social.psychology")]: {
    title: "Cognitive Science",
    desc: "Mind and intelligence studied across psychology, computation, language, neuroscience, and philosophy.",
    icon: BrainCircuit,
    field: "Computation × Mind",
    href: "/interdisciplines/cognitive-science",
  },
  [pairKey("applied.engineering", "applied.technology")]: {
    title: "Mechatronics",
    desc: "Mechanical systems integrated with electronics, control, sensing, and computation.",
    icon: Component,
    field: "Engineering × Technology",
    href: "/interdisciplines/mechatronics",
  },
  [pairKey("formal.computer-science", "humanities.gaming")]: {
    title: "Game Studies",
    desc: "Games examined through computation, rules, design, culture, play, and interactive systems.",
    icon: Gamepad2,
    field: "Computation × Gaming",
    href: "/humanities/gaming/ludology",
  },
  [pairKey("natural.astronomy", "natural.biology")]: {
    title: "Astrobiology",
    desc: "The origin, evolution, distribution, and possible futures of life in the universe.",
    icon: Star,
    field: "Astronomy × Biology",
    href: "/interdisciplines/astrobiology",
  },
};

export const PAIRINGS: Record<string, Pairing> = {
  ...remappedLegacyPairings,
  ...EXTRA_PAIRINGS,
};

export function pairingFor(a: string, b: string): Pairing | undefined {
  return PAIRINGS[pairKey(a, b)];
}
