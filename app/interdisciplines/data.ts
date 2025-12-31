import { 
  Dna, Atom, Cpu, Palette, FlaskConical, 
  Zap, Code, Music, Eye, Microscope, Layers, 
  Component, Activity, ShieldCheck,
  BrainCircuit, Sparkles, Sigma, Hourglass,
  Landmark, Calculator, BarChart3, Search,
  Binary, Scale, FileText, Bone, Star, TrendingUp,
  Brain, Users, Gavel, Coins, HeartPulse,
  MessageSquare, Globe2, Lightbulb, Ruler, ScrollText, Network, Flame, Factory,
} from "lucide-react";

export const AXES = [
  { id: "bio", label: "Biology", color: "text-green-400", bg: "bg-green-500", icon: Dna },
  { id: "phys", label: "Physics", color: "text-blue-400", bg: "bg-blue-500", icon: Atom },
  { id: "tech", label: "Tech", color: "text-cyan-400", bg: "bg-cyan-500", icon: Cpu },
  { id: "chem", label: "Chem", color: "text-orange-400", bg: "bg-orange-500", icon: FlaskConical },
  { id: "math", label: "Math", color: "text-rose-400", bg: "bg-rose-500", icon: Sigma },
  { id: "hist", label: "History", color: "text-amber-400", bg: "bg-amber-500", icon: Hourglass },
  { id: "arts", label: "Arts", color: "text-purple-400", bg: "bg-purple-500", icon: Palette },
  { id: "psy", label: "Psych", color: "text-pink-400", bg: "bg-pink-500", icon: Brain },
  { id: "soc", label: "Society", color: "text-indigo-400", bg: "bg-indigo-500", icon: Users },
  { id: "phil", label: "Phil", color: "text-zinc-400", bg: "bg-zinc-500", icon: Lightbulb },
];

// NOTE: Keys are alphabetically sorted (e.g. "bio-tech", not "tech-bio")
export const COMBINATIONS: Record<string, any> = {
  // --- PURE DISCIPLINES ---
  "bio-bio": { title: "Pure Biology", desc: "The study of life.", icon: Dna, field: "Life Sciences" },
  "phys-phys": { title: "Theoretical Physics", desc: "Laws of the universe.", icon: Atom, field: "Physical Sciences" },
  "tech-tech": { title: "Computer Science", desc: "Computation & Algorithms.", icon: Cpu, field: "Info Sciences" },
  "chem-chem": { title: "Pure Chemistry", desc: "Matter & Change.", icon: FlaskConical, field: "Chemical Sciences" },
  "math-math": { title: "Pure Mathematics", desc: "Number, Structure, Space.", icon: Calculator, field: "Formal Sciences" },
  "hist-hist": { title: "Historiography", desc: "The study of history itself.", icon: FileText, field: "Humanities" },
  "arts-arts": { title: "Fine Arts", desc: "Creative expression.", icon: Palette, field: "Arts" },
  "psy-psy": { title: "Psychology", desc: "The study of mind and behavior.", icon: Brain, field: "Social Sciences" },
  "soc-soc": { title: "Sociology", desc: "The study of society and culture.", icon: Users, field: "Social Sciences" },
  "phil-phil": { title: "Philosophy", desc: "The study of fundamental truths.", icon: Lightbulb, field: "Humanities" },

  // --- BIOLOGY CROSSOVERS ---
  "bio-phys": { title: "Biophysics", desc: "Mechanics of life.", icon: Activity, field: "Mechanics" },
  "bio-tech": { title: "Synthetic Biology", desc: "Engineering biological circuits.", icon: Dna, field: "Programmable Life" },
  "bio-chem": { title: "Biochemistry", desc: "Chemical processes of life.", icon: Microscope, field: "Molecular Bio" },
  "bio-math": { title: "Biostatistics", desc: "Modeling biological data.", icon: BarChart3, field: "Data Analysis" },
  "bio-hist": { title: "Paleontology", desc: "History of life via fossils.", icon: Bone, field: "Deep Time" },
  "arts-bio": { title: "Bio-Design", desc: "Growing organic structures.", icon: Layers, field: "Organic Arch" },
  "bio-psy": { title: "Neuroscience", desc: "The biology of the brain.", icon: BrainCircuit, field: "Cognitive Science" },
  "bio-soc": { title: "Public Health", desc: "Biology at the population level.", icon: HeartPulse, field: "Epidemiology" },
  "bio-phil": { title: "Bioethics", desc: "Moral implications of biology.", icon: Scale, field: "Ethics" },

  // --- PHYSICS CROSSOVERS ---
  "phys-tech": { title: "Quantum Computing", desc: "Quantum information processing.", icon: Sparkles, field: "Future Comp" },
  "chem-phys": { title: "Materials Science", desc: "Engineering matter.", icon: Component, field: "Engineering" },
  "math-phys": { title: "Mathematical Physics", desc: "Relativity & String Theory.", icon: Sigma, field: "Theory" },
  "hist-phys": { title: "Archaeoastronomy", desc: "Ancient cosmology.", icon: Star, field: "Ancient Science" },
  "arts-phys": { title: "Acoustics", desc: "Physics of sound.", icon: Music, field: "Sensory Physics" },
  "phys-psy": { title: "Psychophysics", desc: "Physical stimuli vs perception.", icon: Eye, field: "Perception" },
  "phys-soc": { title: "Social Physics", desc: "Data flow in human networks.", icon: Network, field: "Big Data" },
  "phil-phys": { title: "Metaphysics", desc: "Nature of reality and time.", icon: Sparkles, field: "Ontology" },

  // --- TECH CROSSOVERS ---
  "chem-tech": { title: "Nanotech", desc: "Atomic scale engineering.", icon: Component, field: "Micro-Eng" },
  "math-tech": { title: "Cryptography", desc: "Mathematics of secrecy.", icon: Binary, field: "Security" },
  "hist-tech": { title: "Digital Humanities", desc: "Digitizing the past.", icon: Search, field: "Data Mining" },
  "arts-tech": { title: "Generative Art", desc: "Algorithmic creativity.", icon: Code, field: "Code Art" },
  "psy-tech": { title: "HCI", desc: "Human-Computer Interaction.", icon: MessageSquare, field: "UX Design" },
  "soc-tech": { title: "Social Networks", desc: "Digital sociology.", icon: Globe2, field: "Connectivity" },
  "phil-tech": { title: "AI Ethics", desc: "Machine morality.", icon: Gavel, field: "Future Ethics" },

  // --- CHEMISTRY CROSSOVERS ---
  "chem-math": { title: "Cheminformatics", desc: "Molecular simulation.", icon: Cpu, field: "Simulation" },
  "chem-hist": { title: "Archaeometry", desc: "Chemical dating of artifacts.", icon: Hourglass, field: "Dating" },
  "arts-chem": { title: "Conservation", desc: "Chemistry of art preservation.", icon: ShieldCheck, field: "Restoration" },
  "chem-psy": { title: "Psychopharmacology", desc: "Drugs and the mind.", icon: FlaskConical, field: "Medicine" },
  "chem-soc": { title: "Industrial Ecology", desc: "Chemical flows in society.", icon: Factory, field: "Sustainability" }, // Need Factory
  "chem-phil": { title: "Alchemy (History)", desc: "The pre-science of matter.", icon: Flame, field: "History of Science" }, // Need Flame

  // --- MATH CROSSOVERS ---
  "hist-math": { title: "Cliometrics", desc: "Economic history via data.", icon: TrendingUp, field: "Econ History" },
  "arts-math": { title: "Geometry", desc: "Math of form and space.", icon: Scale, field: "Form" },
  "math-psy": { title: "Psychometrics", desc: "Measuring the mind.", icon: Ruler, field: "Statistics" }, // Need Ruler
  "math-soc": { title: "Economics", desc: "Modeling value and exchange.", icon: Coins, field: "Economy" },
  "math-phil": { title: "Logic", desc: "Formal systems of reasoning.", icon: Binary, field: "Reason" },

  // --- HISTORY CROSSOVERS ---
  "arts-hist": { title: "Art History", desc: "Cultural context of art.", icon: Landmark, field: "Culture" },
  "hist-psy": { title: "Psychohistory", desc: "Psychological motivations of groups.", icon: Users, field: "Analysis" },
  "hist-soc": { title: "Political Science", desc: "Evolution of governance.", icon: Gavel, field: "Politics" },
  "hist-phil": { title: "Intellectual History", desc: "History of ideas.", icon: ScrollText, field: "Ideas" },

  // --- ARTS CROSSOVERS ---
  "arts-psy": { title: "Art Therapy", desc: "Healing through creation.", icon: HeartPulse, field: "Therapy" },
  "arts-soc": { title: "Cultural Studies", desc: "Art as social commentary.", icon: Globe2, field: "Culture" },
  "arts-phil": { title: "Aesthetics", desc: "Philosophy of beauty.", icon: Eye, field: "Beauty" },

  // --- PSYCHOLOGY CROSSOVERS ---
  "psy-soc": { title: "Social Psychology", desc: "Individual in the group.", icon: Users, field: "Behavior" },
  "phil-psy": { title: "Philosophy of Mind", desc: "Consciousness and qualia.", icon: Brain, field: "Consciousness" },

  // --- SOCIOLOGY CROSSOVERS ---
  "phil-soc": { title: "Political Philosophy", desc: "Justice and the state.", icon: Scale, field: "Justice" },
};

