import { CloudRain, Sun, Snowflake, Waves, CloudFog, ThermometerSun } from "lucide-react";

export type BiomeType = 'RAINFOREST' | 'SAVANNA' | 'TUNDRA' | 'OCEAN' | 'DESERT' | 'WETLANDS';
export type TrophicLevel = 'APEX_PREDATOR' | 'MESOPREDATOR' | 'HERBIVORE' | 'INSECTIVORE' | 'OMNIVORE';
export type RelationType = 'PREDATES_ON' | 'PREY_OF' | 'SYMBIOSIS_WITH' | 'COMPETES_WITH';

export const BIOMES = [
  { id: 'RAINFOREST', label: 'Rainforest', icon: CloudRain, color: 'text-emerald-400', weather: 'RAIN' },
  { id: 'SAVANNA', label: 'Savanna', icon: Sun, color: 'text-amber-400', weather: 'GOD_RAYS' },
  { id: 'DESERT', label: 'Desert', icon: ThermometerSun, color: 'text-orange-500', weather: 'HEAT_HAZE' },
  { id: 'TUNDRA', label: 'Tundra', icon: Snowflake, color: 'text-cyan-300', weather: 'SNOW_STORM' },
  { id: 'OCEAN', label: 'Oceanic', icon: Waves, color: 'text-blue-500', weather: 'BUBBLES' },
  { id: 'WETLANDS', label: 'Wetlands', icon: CloudFog, color: 'text-teal-600', weather: 'FOG' },
];

// Rich Metadata Map: Maps Wiki Query ID to Ecological Data
export const ECOLOGY_MAP: Record<string, {
  trophic: TrophicLevel;
  tags: string[]; 
  relationships: { type: RelationType; targetId: string; targetName: string }[];
}> = {
  "Lion": {
    trophic: "APEX_PREDATOR",
    tags: ["Pack Hunter", "Diurnal", "Big Cat"],
    relationships: [
      { type: "PREDATES_ON", targetId: "Zebra", targetName: "Plains Zebra" },
      { type: "COMPETES_WITH", targetId: "Spotted_hyena", targetName: "Spotted Hyena" }
    ]
  },
  "Nile_crocodile": {
    trophic: "APEX_PREDATOR",
    tags: ["Ambush Predator", "Semi-Aquatic", "Cold-Blooded"],
    relationships: [
      { type: "SYMBIOSIS_WITH", targetId: "Egyptian_plover", targetName: "Egyptian Plover" },
      { type: "PREDATES_ON", targetId: "Wildebeest", targetName: "Wildebeest" }
    ]
  },
  "Egyptian_plover": {
    trophic: "INSECTIVORE",
    tags: ["Avian", "Symbiotic"],
    relationships: [
      { type: "SYMBIOSIS_WITH", targetId: "Nile_crocodile", targetName: "Nile Crocodile" }
    ]
  },
   "Plains_zebra": {
    trophic: "HERBIVORE",
    tags: ["Herd Animal", "Migratory"],
    relationships: [
      { type: "PREY_OF", targetId: "Lion", targetName: "Lion" }
    ]
  },
  "Spotted_hyena": {
      trophic: "MESOPREDATOR",
      tags: ["Scavenger", "Pack Hunter"],
      relationships: [
          { type: "COMPETES_WITH", targetId: "Lion", targetName: "Lion" }
      ]
  }
};

// Expanded Collections for the new Biomes
export const COLLECTIONS = {
  RAINFOREST: ["Jaguar", "Harpy_eagle", "Poison_dart_frog", "Capybara", "Green_anaconda", "Three-toed_sloth"],
  SAVANNA: ["Lion", "African_bush_elephant", "Cheetah", "Giraffe", "Plains_zebra", "Spotted_hyena", "White_rhinoceros"],
  DESERT: ["Fennec_fox", "Dromedary", "Gila_monster", "Meerkat", "Sidewinder", "Deathstalker"],
  TUNDRA: ["Polar_bear", "Arctic_fox", "Snowy_owl", "Muskox", "Walrus", "Reindeer"],
  OCEAN: ["Orca", "Great_white_shark", "Blue_whale", "Giant_Pacific_octopus", "Manta_ray", "Lionfish"],
  WETLANDS: ["Nile_crocodile", "Hippopotamus", "Egyptian_plover", "Shoebill", "Beaver", "American_alligator"]
};