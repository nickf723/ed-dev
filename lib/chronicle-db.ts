// lib/chronicle-db.ts

export type Era = "Cosmos" | "Earth" | "Life" | "Humanity" | "Modern";

export type ChronicleEvent = {
  id: string;
  yearLabel: string; // "13.8 BYA", "4000 BC", "1969"
  title: string;
  desc: string;
  category: Era;
  color: string;
};

export const CHRONICLE_DATA: ChronicleEvent[] = [
  // --- COSMOS (Purple) ---
  { id: "big-bang", yearLabel: "13.8 BYA", title: "The Big Bang", category: "Cosmos", desc: "Space and time begin. The universe expands rapidly from a singularity.", color: "text-violet-400" },
  { id: "first-stars", yearLabel: "13.6 BYA", title: "First Stars", category: "Cosmos", desc: "Hydrogen collapses to form the first stars, lighting up the dark universe.", color: "text-violet-400" },
  
  // --- EARTH (Blue) ---
  { id: "earth-forms", yearLabel: "4.5 BYA", title: "Formation of Earth", category: "Earth", desc: "Earth forms from the accretion disk of the Sun.", color: "text-blue-400" },
  { id: "moon-forms", yearLabel: "4.5 BYA", title: "The Moon", category: "Earth", desc: "A Mars-sized object collides with Earth; debris forms the Moon.", color: "text-blue-400" },
  { id: "oxygen", yearLabel: "2.4 BYA", title: "Great Oxidation Event", category: "Earth", desc: "Cyanobacteria produce oxygen, changing the atmosphere forever.", color: "text-blue-400" },

  // --- LIFE (Green) ---
  { id: "multicell", yearLabel: "600 MYA", title: "Multicellular Life", category: "Life", desc: "Life becomes complex. The Ediacaran biota appear.", color: "text-lime-400" },
  { id: "cambrian", yearLabel: "541 MYA", title: "Cambrian Explosion", category: "Life", desc: "Rapid diversification of life forms. Most modern animal phyla appear.", color: "text-lime-400" },
  { id: "dinosaurs", yearLabel: "230 MYA", title: "Age of Dinosaurs", category: "Life", desc: "Reptiles dominate the land. Mammals remain small.", color: "text-lime-400" },
  { id: "asteroid", yearLabel: "66 MYA", title: "K-Pg Extinction", category: "Life", desc: "Asteroid impact ends the reign of dinosaurs. Mammals rise.", color: "text-lime-400" },

  // --- HUMANITY (Amber) ---
  { id: "fire", yearLabel: "1 MYA", title: "Control of Fire", category: "Humanity", desc: "Homo erectus learns to control fire, enabling cooking and warmth.", color: "text-amber-400" },
  { id: "agriculture", yearLabel: "10,000 BC", title: "Agricultural Revolution", category: "Humanity", desc: "Humans settle down, farm, and build the first cities.", color: "text-amber-400" },
  { id: "writing", yearLabel: "3200 BC", title: "Invention of Writing", category: "Humanity", desc: "Cuneiform in Mesopotamia. History begins to be recorded.", color: "text-amber-400" },
  
  // --- MODERN (Cyan) ---
  { id: "printing", yearLabel: "1440", title: "Printing Press", category: "Modern", desc: "Gutenberg democratizes knowledge, fueling the Renaissance.", color: "text-cyan-400" },
  { id: "industrial", yearLabel: "1760", title: "Industrial Revolution", category: "Modern", desc: "Steam power and mechanization transform society.", color: "text-cyan-400" },
  { id: "internet", yearLabel: "1983", title: "The Internet", category: "Modern", desc: "TCP/IP creates a global network of information.", color: "text-cyan-400" },
  { id: "ai", yearLabel: "2025", title: "The Age of AI", category: "Modern", desc: "Artificial Intelligence begins to reshape labor, creativity, and logic.", color: "text-cyan-400" },
];