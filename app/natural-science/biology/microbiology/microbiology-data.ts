import { Circle, Hexagon, Cylinder, Skull, ShieldCheck, Bug, Dna } from "lucide-react";

export type MicrobeType = 'BACTERIA' | 'VIRUS' | 'PROTOZOA' | 'ARCHAEA';
export type BSLLevel = 'BSL-1' | 'BSL-2' | 'BSL-3' | 'BSL-4';

export const MICROBE_CONFIG = {
  BACTERIA: { label: 'Bacterium', icon: Cylinder, color: 'text-cyan-400', border: 'border-cyan-500/30' },
  VIRUS: { label: 'Viral Agent', icon: Hexagon, color: 'text-rose-400', border: 'border-rose-500/30' },
  PROTOZOA: { label: 'Protozoan', icon: Bug, color: 'text-lime-400', border: 'border-lime-500/30' },
  ARCHAEA: { label: 'Archaean', icon: Circle, color: 'text-amber-400', border: 'border-amber-500/30' },
};

export const BSL_CONFIG = {
  'BSL-1': { label: 'Low Risk', color: 'text-emerald-500', icon: ShieldCheck },
  'BSL-2': { label: 'Moderate Risk', color: 'text-yellow-500', icon: AlertTriangle }, // Note: Need to import AlertTriangle
  'BSL-3': { label: 'High Risk', color: 'text-orange-500', icon: Skull },
  'BSL-4': { label: 'Extreme Hazard', color: 'text-red-600', icon: Skull },
};

export const INITIAL_MICROBES = [
  { id: "coli", query: "Escherichia_coli", type: "BACTERIA", bsl: "BSL-1", shape: "Bacillus (Rod)" },
  { id: "flu", query: "Influenza_A_virus", type: "VIRUS", bsl: "BSL-2", shape: "Spherical" },
  { id: "tardigrade", query: "Tardigrade", type: "PROTOZOA", bsl: "BSL-1", shape: "Complex" }, // Technically animalia, but microscopic
  { id: "anthrax", query: "Bacillus_anthracis", type: "BACTERIA", bsl: "BSL-3", shape: "Bacillus" },
  { id: "ebola", query: "Ebolavirus", type: "VIRUS", bsl: "BSL-4", shape: "Filamentous" },
  { id: "strep", query: "Streptococcus", type: "BACTERIA", bsl: "BSL-2", shape: "Coccus (Sphere)" },
  { id: "amoeba", query: "Amoeba_proteus", type: "PROTOZOA", bsl: "BSL-1", shape: "Amorphous" },
  { id: "phage", query: "Bacteriophage", type: "VIRUS", bsl: "BSL-1", shape: "Complex Head-Tail" },
  { id: "covid", query: "SARS-CoV-2", type: "VIRUS", bsl: "BSL-3", shape: "Spherical" }
];

import { AlertTriangle } from "lucide-react"; // Fix import