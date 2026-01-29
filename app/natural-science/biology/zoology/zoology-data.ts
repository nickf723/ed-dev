import { CloudRain, Sun, Snowflake, Waves, CloudFog, ThermometerSun, Mountain, Trees, Flower, Fish } from "lucide-react";

export type BiomeType = 'RAINFOREST' | 'SAVANNA' | 'TUNDRA' | 'OCEAN' | 'DESERT' | 'WETLANDS' | 'MOUNTAINS' | 'GRASSLAND' | 'FOREST' | 'CORAL_REEF';
export type TrophicLevel = 'APEX_PREDATOR' | 'MESOPREDATOR' | 'HERBIVORE' | 'INSECTIVORE' | 'OMNIVORE';
export type RelationType = 'PREDATES_ON' | 'PREY_OF' | 'SYMBIOSIS_WITH' | 'COMPETES_WITH';

export const BIOMES = [
  { id: 'RAINFOREST', label: 'Rainforest', icon: CloudRain, color: 'text-emerald-400', weather: 'RAIN' },
  { id: 'SAVANNA', label: 'Savanna', icon: Sun, color: 'text-amber-400', weather: 'GOD_RAYS' },
  { id: 'DESERT', label: 'Desert', icon: ThermometerSun, color: 'text-orange-500', weather: 'HEAT_HAZE' },
  { id: 'TUNDRA', label: 'Tundra', icon: Snowflake, color: 'text-cyan-300', weather: 'SNOW_STORM' },
  { id: 'OCEAN', label: 'Oceanic', icon: Waves, color: 'text-blue-500', weather: 'BUBBLES' },
  { id: 'WETLANDS', label: 'Wetlands', icon: CloudFog, color: 'text-teal-600', weather: 'FOG' },
  { id: 'MOUNTAINS', label: 'Mountains', icon: Mountain, color: 'text-stone-400', weather: 'CRAGGY' },
  { id: 'GRASSLAND', label: 'Grassland', icon: Flower, color: 'text-lime-400', weather: 'GRASSY' },
  { id: 'FOREST', label: 'Forest', icon: Trees, color: 'text-green-600', weather: 'LEAVES' },
  { id: 'CORAL_REEF', label: 'Coral Reef', icon: Fish, color: 'text-pink-400', weather: 'UNDERWATER' },
];

// Rich Metadata Map: Maps Wiki Query ID to Ecological Data
export const ECOLOGY_MAP: Record<string, {
  trophic: TrophicLevel;
  tags: string[]; 
  relationships: { type: RelationType; targetId: string; targetName: string }[];
}> = {
  // SAVANNA
  "Lion": {
    trophic: "APEX_PREDATOR",
    tags: ["Pack Hunter", "Diurnal", "Big Cat"],
    relationships: [
      { type: "PREDATES_ON", targetId: "Plains_zebra", targetName: "Plains Zebra" },
      { type: "COMPETES_WITH", targetId: "Spotted_hyena", targetName: "Spotted Hyena" }
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
  },
  // WETLANDS
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
  // OCEAN / REEF
  "Great_white_shark": {
      trophic: "APEX_PREDATOR",
      tags: ["Cartilaginous", "Migratory"],
      relationships: [
          { type: "PREDATES_ON", targetId: "Seal", targetName: "Seal" }
      ]
  },
  "Clownfish": {
      trophic: "OMNIVORE",
      tags: ["Symbiotic", "Reef Dweller"],
      relationships: [
          { type: "SYMBIOSIS_WITH", targetId: "Anemone", targetName: "Sea Anemone" }
      ]
  }
};

// Expanded Collections for the new Biomes
export const COLLECTIONS = {
  RAINFOREST:[  "Jaguar", "Harpy_eagle", "Poison_dart_frog", 
                "Capybara", "Green_anaconda", "Three-toed_sloth", "Toucan"],
  SAVANNA:[     "Lion", "African_bush_elephant", "Cheetah", "Giraffe", 
                "Plains_zebra", "Spotted_hyena", "White_rhinoceros"],
  DESERT:[      "Fennec_fox", "Dromedary", "Gila_monster", "Meerkat", 
                "Sidewinder", "Deathstalker"],
  TUNDRA:[      "Polar_bear", "Arctic_fox", "Snowy_owl", "Muskox", 
                "Walrus", "Reindeer"],
  OCEAN:[       "Orca", "Great_white_shark", "Blue_whale", 
                "Giant_Pacific_octopus", "Manta_ray", "Lionfish"],
  WETLANDS:[    "Nile_crocodile", "Hippopotamus", "Egyptian_plover", 
                "Shoebill", "Beaver", "American_alligator"],
  MOUNTAINS:[   "Mountain_goat", "Snow_leopard", "Golden_eagle", 
                "Alpine_marmot", "Ibex", "Pika"],
  GRASSLAND:[   "Bison", "Prairie_dog", "Meadowlark", "Coyote", 
                "Pronghorn", "Burrowing_owl"],
  FOREST:[      "Red_fox", "Eastern_gray_squirrel", "Barred_owl", 
                "White-tailed_deer", "Black_bear", "Pileated_woodpecker"],
  CORAL_REEF:[  "Clownfish", "Parrotfish", "Moray_eel", "Sea_turtle", 
                "Reef_shark", "Anemone"]
};