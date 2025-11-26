// lib/atlas-db.ts

export type ZoneId = "formal" | "natural" | "social" | "applied" | "humanities";

export type MapZone = {
  id: ZoneId;
  label: string;
  color: string;
  x: number;
  y: number;
  r: number;
  desc: string;
};

export type MapNode = {
  id: string;
  label: string;
  zone: ZoneId;
  x: number;
  y: number;
  href: string;
  size: "hub" | "outpost";
  desc: string;
};

export type MapRoute = {
  source: string; // Node ID
  target: string; // Node ID
  type: "strong" | "weak";
};

export const ZONES: MapZone[] = [
  { id: "formal", label: "Formal Sciences", color: "#ef4444", x: 50, y: 20, r: 25, desc: "The realm of pure logic, symbols, and abstract structures." },
  { id: "natural", label: "Natural Sciences", color: "#06b6d4", x: 25, y: 50, r: 28, desc: "The study of the physical universe, from atoms to ecosystems." },
  { id: "applied", label: "Applied Sciences", color: "#f97316", x: 75, y: 50, r: 28, desc: "Knowledge turned into technology, infrastructure, and medicine." },
  { id: "social", label: "Social Sciences", color: "#8b5cf6", x: 35, y: 80, r: 25, desc: "The complex analysis of human behavior, society, and culture." },
  { id: "humanities", label: "Humanities", color: "#eab308", x: 65, y: 80, r: 25, desc: "The exploration of the human condition through art and history." },
];

export const NODES: MapNode[] = [
  // FORMAL
  { id: "logic", label: "Logic", zone: "formal", x: 50, y: 15, href: "/formal-science/logic", size: "hub", desc: "The rules of valid reasoning." },
  { id: "math", label: "Mathematics", zone: "formal", x: 42, y: 25, href: "/formal-science/mathematics", size: "hub", desc: "The language of the universe." },
  { id: "cs", label: "Comp Sci", zone: "formal", x: 58, y: 25, href: "/formal-science/computer-science", size: "hub", desc: "The automation of information." },
  
  // NATURAL
  { id: "physics", label: "Physics", zone: "natural", x: 20, y: 40, href: "/natural-science/physics", size: "hub", desc: "Matter, energy, and spacetime." },
  { id: "chem", label: "Chemistry", zone: "natural", x: 30, y: 50, href: "/natural-science/chemistry", size: "hub", desc: "The central science of change." },
  { id: "bio", label: "Biology", zone: "natural", x: 15, y: 60, href: "/natural-science/biology", size: "hub", desc: "The machinery of life." },
  
  // APPLIED
  { id: "eng", label: "Engineering", zone: "applied", x: 80, y: 40, href: "/applied-science/engineering", size: "hub", desc: "Building the world." },
  { id: "med", label: "Medicine", zone: "applied", x: 85, y: 60, href: "/applied-science/medicine", size: "hub", desc: "The art of healing." },
  
  // SOCIAL
  { id: "psych", label: "Psychology", zone: "social", x: 30, y: 75, href: "/social-science/psychology", size: "hub", desc: "The inner universe of the mind." },
  { id: "econ", label: "Economics", zone: "social", x: 40, y: 85, href: "/social-science/economics", size: "hub", desc: "Allocation of scarce resources." },
  
  // HUMANITIES
  { id: "hist", label: "History", zone: "humanities", x: 60, y: 75, href: "/humanities/history", size: "hub", desc: "The record of human events." },
  { id: "philo", label: "Philosophy", zone: "humanities", x: 70, y: 85, href: "/humanities/philosophy", size: "hub", desc: "The search for wisdom." },
];

export const ROUTES: MapRoute[] = [
  // The "Spine"
  { source: "logic", target: "math", type: "strong" },
  { source: "logic", target: "cs", type: "strong" },
  { source: "logic", target: "philo", type: "strong" },
  
  // Natural Chains
  { source: "math", target: "physics", type: "strong" },
  { source: "physics", target: "chem", type: "strong" },
  { source: "chem", target: "bio", type: "strong" },
  
  // Applied Bridges
  { source: "physics", target: "eng", type: "strong" },
  { source: "bio", target: "med", type: "strong" },
  { source: "cs", target: "eng", type: "weak" },
  
  // Social Bridges
  { source: "bio", target: "psych", type: "strong" },
  { source: "math", target: "econ", type: "strong" },
  { source: "philo", target: "hist", type: "weak" },
  { source: "hist", target: "econ", type: "weak" },
];