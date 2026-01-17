import { 
  Activity, Zap, Heart, Bone, 
  Utensils, Wind, Brain, Eye 
} from "lucide-react";

export type SystemType = 'SKELETAL' | 'NERVOUS' | 'CIRCULATORY' | 'RESPIRATORY' | 'DIGESTIVE' | 'MUSCULAR';

export const ANATOMY_DATA: {
  id: string;
  type: SystemType;
  label: string;
  wikiQuery: string; // New field for API
  desc: string;
  icon: any;
  color: string;
  stat: string;
}[] = [
  {
    id: "skeletal",
    type: "SKELETAL",
    label: "Skeletal System",
    wikiQuery: "Human_skeleton",
    desc: "The internal framework of the body. 206 bones providing structure and protection.",
    icon: Bone,
    color: "#f5f5f4",
    stat: "206 Bones"
  },
  {
    id: "nervous",
    type: "NERVOUS",
    label: "Nervous System",
    wikiQuery: "Nervous_system",
    desc: "The master control network. Transmits signals between the brain and the rest of the body.",
    icon: Zap,
    color: "#0ea5e9",
    stat: "100B Neurons"
  },
  {
    id: "circulatory",
    type: "CIRCULATORY",
    label: "Circulatory System",
    wikiQuery: "Circulatory_system",
    desc: "The transport highway. Moves blood, nutrients, and oxygen to and from cells.",
    icon: Heart,
    color: "#ef4444",
    stat: "60,000 Miles"
  },
  {
    id: "respiratory",
    type: "RESPIRATORY",
    label: "Respiratory System",
    wikiQuery: "Respiratory_system",
    desc: "Gas exchange mechanism. Harvests oxygen and expels carbon dioxide.",
    icon: Wind,
    color: "#10b981",
    stat: "20k Breaths/Day"
  },
  {
    id: "digestive",
    type: "DIGESTIVE",
    label: "Digestive System",
    wikiQuery: "Human_digestive_system",
    desc: "Energy processing plant. Breaks down food into absorbable nutrients.",
    icon: Utensils,
    color: "#eab308",
    stat: "30 Foot Length"
  },
  {
    id: "muscular",
    type: "MUSCULAR",
    label: "Muscular System",
    wikiQuery: "Muscular_system",
    desc: "The engine of movement. Tissues that contract to produce force and motion.",
    icon: Activity,
    color: "#f43f5e",
    stat: "600+ Muscles"
  }
];