import { Database, Zap, Layers, Activity, Circle, Shield, Trash2, Box } from "lucide-react";

export type OrganelleType = 'NUCLEUS' | 'MITOCHONDRIA' | 'GOLGI' | 'ER' | 'LYSOSOME' | 'MEMBRANE' | 'CYTOPLASM';

export const ORGANELLES = [
  {
    id: "nucleus",
    type: "NUCLEUS",
    label: "Nucleus",
    wikiQuery: "Cell_nucleus",
    role: "Command Center",
    desc: "Stores the cell's DNA and coordinates growth, metabolism, and reproduction.",
    icon: Database,
    color: "#a855f7", // Purple
    count: 1
  },
  {
    id: "mitochondria",
    type: "MITOCHONDRIA",
    label: "Mitochondria",
    wikiQuery: "Mitochondrion",
    role: "Powerhouse",
    desc: "Generates most of the chemical energy needed to power the cell's biochemical reactions (ATP).",
    icon: Zap,
    color: "#f59e0b", // Amber
    count: 5
  },
  {
    id: "golgi",
    type: "GOLGI",
    label: "Golgi Apparatus",
    wikiQuery: "Golgi_apparatus",
    role: "Shipping Dept",
    desc: "Modifies, sorts, and packages proteins for secretion.",
    icon: Box,
    color: "#ec4899", // Pink
    count: 3
  },
  {
    id: "er",
    type: "ER",
    label: "Endoplasmic Reticulum",
    wikiQuery: "Endoplasmic_reticulum",
    role: "Manufacturing",
    desc: "A network of membranes involved in protein and lipid synthesis.",
    icon: Layers,
    color: "#3b82f6", // Blue
    count: 1 // Drawn as a complex shape
  },
  {
    id: "lysosome",
    type: "LYSOSOME",
    label: "Lysosome",
    wikiQuery: "Lysosome",
    role: "Waste Disposal",
    desc: "Contains digestive enzymes to break down waste materials.",
    icon: Trash2,
    color: "#ef4444", // Red
    count: 8
  },
  {
    id: "membrane",
    type: "MEMBRANE",
    label: "Cell Membrane",
    wikiQuery: "Cell_membrane",
    role: "Security Gate",
    desc: "Selectively permeable barrier that protects the cell.",
    icon: Shield,
    color: "#10b981", // Emerald
    count: 1
  }
];