import { Leaf, Droplets, Sun, Skull, HeartPulse, Utensils, Hammer, Flower2 } from "lucide-react";

export type PlantUsage = 'MEDICINAL' | 'TOXIC' | 'EDIBLE' | 'INDUSTRIAL' | 'ORNAMENTAL';

export const BOTANY_DATA = [
  {
    id: "monstera",
    wikiQuery: "Monstera_deliciosa",
    commonName: "Swiss Cheese Plant",
    scientificName: "Monstera deliciosa",
    usage: ["ORNAMENTAL", "EDIBLE"], // Fruit is edible!
    water: "High",
    sun: "Indirect",
    desc: "Famous for its fenestrated leaves. In the wild, these holes allow wind to pass through without tearing.",
    tags: ["Epiphyte", "Tropical", "Climber"]
  },
  {
    id: "foxglove",
    wikiQuery: "Digitalis",
    commonName: "Foxglove",
    scientificName: "Digitalis purpurea",
    usage: ["TOXIC", "MEDICINAL"], // Heart medication (Digoxin)
    water: "Moderate",
    sun: "Partial Shade",
    desc: "A beautiful but deadly spire of bell-shaped flowers. Source of cardiac glycosides used to treat heart failure.",
    tags: ["Biennial", "Poisonous", "Pharmacological"]
  },
  {
    id: "bamboo",
    wikiQuery: "Bamboo",
    commonName: "Giant Bamboo",
    scientificName: "Bambusoideae",
    usage: ["INDUSTRIAL", "EDIBLE"],
    water: "High",
    sun: "Full Sun",
    desc: "The fastest growing plant on Earth. Some species can grow 91 cm (36 in) within a 24-hour period.",
    tags: ["Grass", "Construction", "Sustainable"]
  }
];

export const USAGE_CONFIG = {
  MEDICINAL: { label: 'Pharmacological', icon: HeartPulse, color: 'text-rose-400', border: 'border-rose-500/30' },
  TOXIC: { label: 'Hazardous', icon: Skull, color: 'text-purple-400', border: 'border-purple-500/30' },
  EDIBLE: { label: 'Sustenance', icon: Utensils, color: 'text-orange-400', border: 'border-orange-500/30' },
  INDUSTRIAL: { label: 'Industrial', icon: Hammer, color: 'text-stone-400', border: 'border-stone-500/30' },
  ORNAMENTAL: { label: 'Aesthetic', icon: Flower2, color: 'text-emerald-400', border: 'border-emerald-500/30' },
};

export const INITIAL_PLANTS = [
  { id: "monstera", query: "Monstera_deliciosa", category: "ORNAMENTAL", sun: "Indirect", water: "High" },
  { id: "foxglove", query: "Digitalis_purpurea", category: "TOXIC", sun: "Partial", water: "Moderate" },
  { id: "bamboo", query: "Bamboo", category: "INDUSTRIAL", sun: "High", water: "High" },
  { id: "aloe", query: "Aloe_vera", category: "MEDICINAL", sun: "High", water: "Low" },
  { id: "venus", query: "Venus_flytrap", category: "ORNAMENTAL", sun: "High", water: "High" },
  { id: "coffee", query: "Coffea_arabica", category: "EDIBLE", sun: "Partial", water: "Moderate" },
  { id: "poppy", query: "Papaver_somniferum", category: "MEDICINAL", sun: "High", water: "Moderate" },
  { id: "hemp", query: "Hemp", category: "INDUSTRIAL", sun: "High", water: "Moderate" },
  { id: "belladonna", query: "Atropa_belladonna", category: "TOXIC", sun: "Shade", water: "Moderate" },
];