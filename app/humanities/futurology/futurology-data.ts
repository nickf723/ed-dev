import { Cpu, Rocket, Dna, Globe, Zap, Radio, Eye } from "lucide-react";

export const SCENARIOS = [
  {
    id: "fusion",
    title: "Net Positive Fusion",
    year: "2035",
    probability: 85,
    impact: "HIGH",
    category: "ENERGY",
    icon: Zap,
    desc: "Commercial fusion reactors come online, providing near-infinite clean energy, effectively solving the climate crisis."
  },
  {
    id: "mars",
    title: "Mars Colony Alpha",
    year: "2042",
    probability: 60,
    impact: "EXTREME",
    category: "SPACE",
    icon: Rocket,
    desc: "The first permanent human settlement is established on the Red Planet, making humanity a multi-planetary species."
  },
  {
    id: "agi",
    title: "The Singularity (AGI)",
    year: "2045",
    probability: 50,
    impact: "UNCALCULABLE",
    category: "AI",
    icon: Cpu,
    desc: "Artificial Intelligence surpasses human intelligence in all domains, leading to recursive self-improvement cycles."
  },
  {
    id: "longevity",
    title: "Longevity Escape Velocity",
    year: "2060",
    probability: 40,
    impact: "HIGH",
    category: "BIO",
    icon: Dna,
    desc: "Medical technology advances faster than we age. For every year you live, science extends your lifespan by more than a year."
  },
  {
    id: "dyson",
    title: "Dyson Swarm",
    year: "2200",
    probability: 20,
    impact: "TYPE-II",
    category: "SPACE",
    icon: Globe,
    desc: "A megastructure array built around the sun to harvest a significant percentage of its solar output."
  },
  {
    id: "upload",
    title: "Mind Uploading",
    year: "2100",
    probability: 30,
    impact: "EXISTENTIAL",
    category: "DIGITAL",
    icon: Eye,
    desc: "Mapping the connectome allows human consciousness to be transferred into a digital substrate."
  }
];

export const KARDASHEV_LEVELS = [
  { level: 0, label: "Planetary Culture", energy: "10¹⁶ Watts", desc: "Harnesses energy from dead plants (fossil fuels). Vulnerable to extinction." },
  { level: 1, label: "Stellar Culture", energy: "10¹⁷ Watts", desc: "Harnesses all energy reaching the planet from its parent star. Controls weather/climate." },
  { level: 2, label: "Interstellar Culture", energy: "10²⁶ Watts", desc: "Harnesses the total energy of a star (Dyson Sphere). Immune to planetary disasters." },
  { level: 3, label: "Galactic Culture", energy: "10³⁶ Watts", desc: "Harnesses the energy of an entire galaxy. Time/Space manipulation possible." }
];