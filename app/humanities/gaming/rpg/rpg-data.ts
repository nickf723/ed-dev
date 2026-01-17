import { Sword, Shield, Book, Sparkles, Skull, Eye, Crosshair, Feather } from "lucide-react";

export type StatLabel = 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';

export interface RpgClass {
  id: string;
  label: string;
  desc: string;
  icon: any;
  color: string;
  stats: Record<StatLabel, number>; // 0 to 10 scale
}

export const RPG_CLASSES: RpgClass[] = [
  {
    id: "warrior",
    label: "Warrior",
    desc: "Masters of martial combat, relying on heavy armor and weaponry.",
    icon: Sword,
    color: "#ef4444", // Red
    stats: { STR: 10, DEX: 5, CON: 9, INT: 3, WIS: 4, CHA: 5 }
  },
  {
    id: "mage",
    label: "Arcanist",
    desc: "Scholars who manipulate the fabric of reality using learned magic.",
    icon: Book,
    color: "#3b82f6", // Blue
    stats: { STR: 2, DEX: 4, CON: 4, INT: 10, WIS: 8, CHA: 3 }
  },
  {
    id: "rogue",
    label: "Scoundrel",
    desc: "Skillful operatives who prefer stealth and precision over brute force.",
    icon: Feather, // Agility
    color: "#10b981", // Emerald
    stats: { STR: 4, DEX: 10, CON: 5, INT: 7, WIS: 6, CHA: 8 }
  },
  {
    id: "paladin",
    label: "Crusader",
    desc: "Holy knights sworn to oaths of justice and righteousness.",
    icon: Shield,
    color: "#eab308", // Gold
    stats: { STR: 9, DEX: 3, CON: 8, INT: 4, WIS: 5, CHA: 9 }
  },
  {
    id: "warlock",
    label: "Warlock",
    desc: "Seekers of knowledge that lies hidden in the fabric of the multiverse.",
    icon: Skull,
    color: "#a855f7", // Purple
    stats: { STR: 3, DEX: 5, CON: 6, INT: 8, WIS: 6, CHA: 10 }
  },
  {
    id: "ranger",
    label: "Ranger",
    desc: "Warriors of the wilderness, hunters of monsters.",
    icon: Crosshair,
    color: "#84cc16", // Lime
    stats: { STR: 6, DEX: 9, CON: 6, INT: 5, WIS: 9, CHA: 4 }
  }
];

export const SKILL_MAP: Record<string, StatLabel> = {
  "Acrobatics": "DEX",
  "Animal Handling": "WIS",
  "Arcana": "INT",
  "Athletics": "STR",
  "Deception": "CHA",
  "History": "INT",
  "Insight": "WIS",
  "Intimidation": "CHA",
  "Investigation": "INT",
  "Medicine": "WIS",
  "Nature": "INT",
  "Perception": "WIS",
  "Performance": "CHA",
  "Persuasion": "CHA",
  "Religion": "INT",
  "Sleight of Hand": "DEX",
  "Stealth": "DEX",
  "Survival": "WIS"
};

export const STAT_CONFIG = {
  STR: { full: "Strength", color: "#ef4444" },
  DEX: { full: "Dexterity", color: "#10b981" },
  CON: { full: "Constitution", color: "#f97316" },
  INT: { full: "Intelligence", color: "#3b82f6" },
  WIS: { full: "Wisdom", color: "#8b5cf6" },
  CHA: { full: "Charisma", color: "#eab308" }
};