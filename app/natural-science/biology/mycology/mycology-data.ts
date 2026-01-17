import { Skull, Utensils, Zap, Sprout, CloudFog } from "lucide-react";

export type Edibility = 'CHOICE' | 'EDIBLE' | 'INEDIBLE' | 'POISONOUS' | 'DEADLY' | 'PSYCHOACTIVE';

export const MYCOLOGY_CONFIG = {
  CHOICE: { label: 'Choice Edible', icon: Utensils, color: 'text-emerald-400', border: 'border-emerald-500', bg: 'bg-emerald-950/50' },
  EDIBLE: { label: 'Edible', icon: Utensils, color: 'text-green-400', border: 'border-green-500', bg: 'bg-green-950/50' },
  INEDIBLE: { label: 'Inedible', icon: CloudFog, color: 'text-stone-400', border: 'border-stone-500', bg: 'bg-stone-900/50' },
  POISONOUS: { label: 'Toxic', icon: Skull, color: 'text-orange-500', border: 'border-orange-500', bg: 'bg-orange-950/50' },
  DEADLY: { label: 'Lethal', icon: Skull, color: 'text-red-600', border: 'border-red-600', bg: 'bg-red-950/50' },
  PSYCHOACTIVE: { label: 'Psychoactive', icon: Zap, color: 'text-purple-500', border: 'border-purple-500', bg: 'bg-purple-950/50' },
};

export const INITIAL_FUNGI = [
  { id: "amanita", query: "Amanita_muscaria", edibility: "POISONOUS", substrate: "Soil (Mycorrhizal)" },
  { id: "morel", query: "Morchella", edibility: "CHOICE", substrate: "Forest Floor" },
  { id: "lion", query: "Hericium_erinaceus", edibility: "CHOICE", substrate: "Hardwood Logs" },
  { id: "deathcap", query: "Amanita_phalloides", edibility: "DEADLY", substrate: "Oak Roots" },
  { id: "cordyceps", query: "Ophiocordyceps_unilateralis", edibility: "INEDIBLE", substrate: "Insects" },
  { id: "reishi", query: "Lingzhi_mushroom", edibility: "EDIBLE", substrate: "Decaying Wood" },
  { id: "chant", query: "Chanterelle", edibility: "CHOICE", substrate: "Mossy Soil" },
  { id: "psilocybe", query: "Psilocybe_cubensis", edibility: "PSYCHOACTIVE", substrate: "Dung/Soil" },
  { id: "puffball", query: "Lycoperdon_perlatum", edibility: "EDIBLE", substrate: "Grasslands" }
];