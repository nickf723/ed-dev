export type ChemicalElement = {
    z: number;
    symbol: string;
    name: string;
    group: string;
    mass: number;
    config: string;
};

// Map chemical groups to specific Tailwind border and text colors
export const GROUP_COLORS: Record<string, string> = {
    'Nonmetal': 'border-emerald-500/50 text-emerald-400',
    'Noble Gas': 'border-cyan-500/50 text-cyan-400',
    'Alkali Metal': 'border-rose-500/50 text-rose-400',
    'Alkaline Earth Metal': 'border-orange-500/50 text-orange-400',
    'Metalloid': 'border-yellow-500/50 text-yellow-400',
    'Halogen': 'border-teal-500/50 text-teal-400',
    'Transition Metal': 'border-indigo-500/50 text-indigo-400',
    'Post-Transition Metal': 'border-sky-500/50 text-sky-400',
    'Actinide': 'border-purple-500/50 text-purple-400',
};

export const ELEMENTS: ChemicalElement[] = [
    // ROW 1
    { z: 1, symbol: 'H', name: 'Hydrogen', group: 'Nonmetal', mass: 1.008, config: '1s¹' },
    { z: 2, symbol: 'He', name: 'Helium', group: 'Noble Gas', mass: 4.0026, config: '1s²' },
    
    // ROW 2
    { z: 3, symbol: 'Li', name: 'Lithium', group: 'Alkali Metal', mass: 6.94, config: '[He] 2s¹' },
    { z: 4, symbol: 'Be', name: 'Beryllium', group: 'Alkaline Earth Metal', mass: 9.0122, config: '[He] 2s²' },
    { z: 5, symbol: 'B', name: 'Boron', group: 'Metalloid', mass: 10.81, config: '[He] 2s² 2p¹' },
    { z: 6, symbol: 'C', name: 'Carbon', group: 'Nonmetal', mass: 12.011, config: '[He] 2s² 2p²' },
    { z: 7, symbol: 'N', name: 'Nitrogen', group: 'Nonmetal', mass: 14.007, config: '[He] 2s² 2p³' },
    { z: 8, symbol: 'O', name: 'Oxygen', group: 'Nonmetal', mass: 15.999, config: '[He] 2s² 2p⁴' },
    { z: 9, symbol: 'F', name: 'Fluorine', group: 'Halogen', mass: 18.998, config: '[He] 2s² 2p⁵' },
    { z: 10, symbol: 'Ne', name: 'Neon', group: 'Noble Gas', mass: 20.180, config: '[He] 2s² 2p⁶' },

    // ROW 3
    { z: 11, symbol: 'Na', name: 'Sodium', group: 'Alkali Metal', mass: 22.990, config: '[Ne] 3s¹' },
    { z: 12, symbol: 'Mg', name: 'Magnesium', group: 'Alkaline Earth Metal', mass: 24.305, config: '[Ne] 3s²' },
    { z: 13, symbol: 'Al', name: 'Aluminum', group: 'Post-Transition Metal', mass: 26.982, config: '[Ne] 3s² 3p¹' },
    { z: 14, symbol: 'Si', name: 'Silicon', group: 'Metalloid', mass: 28.085, config: '[Ne] 3s² 3p²' },
    { z: 15, symbol: 'P', name: 'Phosphorus', group: 'Nonmetal', mass: 30.974, config: '[Ne] 3s² 3p³' },
    { z: 16, symbol: 'S', name: 'Sulfur', group: 'Nonmetal', mass: 32.06, config: '[Ne] 3s² 3p⁴' },
    { z: 17, symbol: 'Cl', name: 'Chlorine', group: 'Halogen', mass: 35.45, config: '[Ne] 3s² 3p⁵' },
    { z: 18, symbol: 'Ar', name: 'Argon', group: 'Noble Gas', mass: 39.95, config: '[Ne] 3s² 3p⁶' },

    // ROW 4 (Sample)
    { z: 19, symbol: 'K', name: 'Potassium', group: 'Alkali Metal', mass: 39.098, config: '[Ar] 4s¹' },
    { z: 20, symbol: 'Ca', name: 'Calcium', group: 'Alkaline Earth Metal', mass: 40.078, config: '[Ar] 4s²' },

    // NOTABLES
    { z: 79, symbol: 'Au', name: 'Gold', group: 'Transition Metal', mass: 196.97, config: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹' },
    { z: 92, symbol: 'U', name: 'Uranium', group: 'Actinide', mass: 238.03, config: '[Rn] 5f³ 6d¹ 7s²' }
];