export type ElementGroup = "Nonmetal" | "Noble Gas" | "Alkali Metal" | "Alkaline Earth" | "Metalloid" | "Halogen" | "Transition Metal" | "Post-Transition Metal" | "Lanthanide" | "Actinide";

export interface ChemicalElement {
  z: number;
  symbol: string;
  name: string;
  group: ElementGroup;
  mass: number;
  config: string;     // e.g., "[He] 2s2 2p2"
  shells: number[];   // e.g., [2, 4] for Carbon
  desc: string;
}

export const ELEMENTS: ChemicalElement[] = [
  // ROW 1
  { z: 1, symbol: "H", name: "Hydrogen", group: "Nonmetal", mass: 1.008, config: "1s1", shells: [1], desc: "The lightest element. Fuel of stars." },
  { z: 2, symbol: "He", name: "Helium", group: "Noble Gas", mass: 4.002, config: "1s2", shells: [2], desc: "Inert gas. Superfluid properties." },
  
  // ROW 2
  { z: 3, symbol: "Li", name: "Lithium", group: "Alkali Metal", mass: 6.94, config: "[He] 2s1", shells: [2, 1], desc: "Lightest metal. Battery tech." },
  { z: 4, symbol: "Be", name: "Beryllium", group: "Alkaline Earth", mass: 9.012, config: "[He] 2s2", shells: [2, 2], desc: "Rare, stiff, and toxic." },
  { z: 5, symbol: "B", name: "Boron", group: "Metalloid", mass: 10.81, config: "[He] 2s2 2p1", shells: [2, 3], desc: "Essential plant nutrient." },
  { z: 6, symbol: "C", name: "Carbon", group: "Nonmetal", mass: 12.01, config: "[He] 2s2 2p2", shells: [2, 4], desc: "Basis of all known life." },
  { z: 7, symbol: "N", name: "Nitrogen", group: "Nonmetal", mass: 14.00, config: "[He] 2s2 2p3", shells: [2, 5], desc: "78% of Earth's atmosphere." },
  { z: 8, symbol: "O", name: "Oxygen", group: "Nonmetal", mass: 16.00, config: "[He] 2s2 2p4", shells: [2, 6], desc: "Highly reactive oxidant." },
  { z: 9, symbol: "F", name: "Fluorine", group: "Halogen", mass: 19.00, config: "[He] 2s2 2p5", shells: [2, 7], desc: "Most electronegative element." },
  { z: 10, symbol: "Ne", name: "Neon", group: "Noble Gas", mass: 20.18, config: "[He] 2s2 2p6", shells: [2, 8], desc: "Red-orange glow in vacuum." },

  // ROW 3
  { z: 11, symbol: "Na", name: "Sodium", group: "Alkali Metal", mass: 22.99, config: "[Ne] 3s1", shells: [2, 8, 1], desc: "Highly reactive soft metal." },
  { z: 12, symbol: "Mg", name: "Magnesium", group: "Alkaline Earth", mass: 24.30, config: "[Ne] 3s2", shells: [2, 8, 2], desc: "Burns with brilliant white light." },
  { z: 13, symbol: "Al", name: "Aluminum", group: "Post-Transition Metal", mass: 26.98, config: "[Ne] 3s2 3p1", shells: [2, 8, 3], desc: "Lightweight and conductive." },
  { z: 14, symbol: "Si", name: "Silicon", group: "Metalloid", mass: 28.08, config: "[Ne] 3s2 3p2", shells: [2, 8, 4], desc: "Semiconductor backbone." },
  { z: 15, symbol: "P", name: "Phosphorus", group: "Nonmetal", mass: 30.97, config: "[Ne] 3s2 3p3", shells: [2, 8, 5], desc: "Glows in the dark (white P)." },
  { z: 16, symbol: "S", name: "Sulfur", group: "Nonmetal", mass: 32.06, config: "[Ne] 3s2 3p4", shells: [2, 8, 6], desc: "Yellow crystals, rotten egg smell." },
  { z: 17, symbol: "Cl", name: "Chlorine", group: "Halogen", mass: 35.45, config: "[Ne] 3s2 3p5", shells: [2, 8, 7], desc: "Yellow-green toxic gas." },
  { z: 18, symbol: "Ar", name: "Argon", group: "Noble Gas", mass: 39.95, config: "[Ne] 3s2 3p6", shells: [2, 8, 8], desc: "Used in welding and bulbs." },

  // ROW 4 (Selection)
  { z: 19, symbol: "K", name: "Potassium", group: "Alkali Metal", mass: 39.09, config: "[Ar] 4s1", shells: [2, 8, 8, 1], desc: "Vital for nerve function." },
  { z: 20, symbol: "Ca", name: "Calcium", group: "Alkaline Earth", mass: 40.07, config: "[Ar] 4s2", shells: [2, 8, 8, 2], desc: "Bone structure mineral." },
  { z: 26, symbol: "Fe", name: "Iron", group: "Transition Metal", mass: 55.84, config: "[Ar] 3d6 4s2", shells: [2, 8, 14, 2], desc: "Steel basis, blood transport." },
  { z: 29, symbol: "Cu", name: "Copper", group: "Transition Metal", mass: 63.54, config: "[Ar] 3d10 4s1", shells: [2, 8, 18, 1], desc: "Excellent conductor." },
  { z: 30, symbol: "Zn", name: "Zinc", group: "Transition Metal", mass: 65.38, config: "[Ar] 3d10 4s2", shells: [2, 8, 18, 2], desc: "Used to galvanize steel." },
  { z: 35, symbol: "Br", name: "Bromine", group: "Halogen", mass: 79.90, config: "[Ar] 3d10 4s2 4p5", shells: [2, 8, 18, 7], desc: "Red-brown liquid at room temp." },
  { z: 36, symbol: "Kr", name: "Krypton", group: "Noble Gas", mass: 83.79, config: "[Ar] 3d10 4s2 4p6", shells: [2, 8, 18, 8], desc: "Used in high-speed photography." },

  // HEAVY HITTERS
  { z: 47, symbol: "Ag", name: "Silver", group: "Transition Metal", mass: 107.86, config: "[Kr] 4d10 5s1", shells: [2, 8, 18, 18, 1], desc: "Highest conductivity of all metals." },
  { z: 50, symbol: "Sn", name: "Tin", group: "Post-Transition Metal", mass: 118.71, config: "[Kr] 4d10 5s2 5p2", shells: [2, 8, 18, 18, 4], desc: "Used in bronze alloys." },
  { z: 79, symbol: "Au", name: "Gold", group: "Transition Metal", mass: 196.97, config: "[Xe] 4f14", shells: [2, 8, 18, 32, 18, 1], desc: "Dense, soft, shiny metal." },
  { z: 80, symbol: "Hg", name: "Mercury", group: "Transition Metal", mass: 200.59, config: "[Xe] 4f14 5d10 6s2", shells: [2, 8, 18, 32, 18, 2], desc: "Liquid metal at room temperature." },
  { z: 82, symbol: "Pb", name: "Lead", group: "Post-Transition Metal", mass: 207.2, config: "[Xe] 4f14 5d10 6s2 6p2", shells: [2, 8, 18, 32, 18, 4], desc: "Dense, soft, and toxic." },
  { z: 92, symbol: "U", name: "Uranium", group: "Actinide", mass: 238.03, config: "[Rn] 5f3", shells: [2, 8, 18, 32, 21, 9, 2], desc: "Nuclear fuel source." },
];

export const GROUP_COLORS: Record<string, string> = {
    "Alkali Metal": "border-red-500/50 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.2)]",
    "Alkaline Earth": "border-orange-500/50 text-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.2)]",
    "Transition Metal": "border-yellow-500/50 text-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.2)]",
    "Post-Transition Metal": "border-teal-500/50 text-teal-400 shadow-[0_0_10px_rgba(20,184,166,0.2)]",
    "Metalloid": "border-green-500/50 text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.2)]",
    "Nonmetal": "border-blue-500/50 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.2)]",
    "Halogen": "border-indigo-500/50 text-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.2)]",
    "Noble Gas": "border-purple-500/50 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.2)]",
    "Actinide": "border-pink-500/50 text-pink-400 shadow-[0_0_10px_rgba(236,72,153,0.2)]",
};