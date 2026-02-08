export type Force = 'Fluvial' | 'Glacial' | 'Tectonic' | 'Aeolian' | 'Coastal';

export interface Landform {
  id: string;
  name: string;
  force: Force;
  process: string; // "Erosion", "Deposition", "Uplift"
  desc: string;
  icon: string; // Lucide icon name
  image: string;
}

export const LANDFORMS: Landform[] = [
  {
    id: 'oxbow',
    name: 'Oxbow Lake',
    force: 'Fluvial',
    process: 'Erosion & Deposition',
    desc: "A U-shaped lake that forms when a wide meander of a river is cut off, creating a free-standing body of water.",
    icon: 'Waves',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Oxbow_lake_in_the_Amazon_Rainforest.jpg/800px-Oxbow_lake_in_the_Amazon_Rainforest.jpg'
  },
  {
    id: 'fjord',
    name: 'Fjord',
    force: 'Glacial',
    process: 'Erosion',
    desc: "A long, deep, narrow body of water that reaches far inland. Formed when a glacier cuts a U-shaped valley and the sea fills the void.",
    icon: 'Snowflake',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Geirangerfjord_2011_02.jpg/800px-Geirangerfjord_2011_02.jpg'
  },
  {
    id: 'delta',
    name: 'River Delta',
    force: 'Fluvial',
    process: 'Deposition',
    desc: "Wetlands that form as rivers empty their water and sediment into another body of water, such as an ocean.",
    icon: 'Triangle',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Lena_River_Delta_-_Landsat_2000.jpg/800px-Lena_River_Delta_-_Landsat_2000.jpg'
  },
  {
    id: 'mesa',
    name: 'Mesa / Butte',
    force: 'Aeolian',
    process: 'Erosion',
    desc: "An isolated hill with steep sides and a flat top. Formed by weathering and erosion of horizontally layered rocks.",
    icon: 'Wind',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Monument_Valley_Buttes.jpg/800px-Monument_Valley_Buttes.jpg'
  },
  {
    id: 'atoll',
    name: 'Atoll',
    force: 'Coastal',
    process: 'Biological/Tectonic',
    desc: "A ring-shaped coral reef, island, or series of islets. Formed when a volcanic island sinks, leaving the reef ring behind.",
    icon: 'Circle',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Atafu_atoll_in_Tokelau.jpg/800px-Atafu_atoll_in_Tokelau.jpg'
  }
];