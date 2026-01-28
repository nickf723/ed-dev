import { GlossaryDatabase, termCategories } from "./types";

export const naturalTerms: GlossaryDatabase = {
  // --- PHYSICS ---
  "Kinematics": {
    definition: "The branch of mechanics that describes the motion of objects without reference to the forces causing the motion.",
    category: termCategories.PHYSICS,
    href: "/natural-science/physics/classical-mechanics/kinematics"
  },
  "Thermodynamics": {
    definition: "The study of heat and its relation to other forms of energy and work.",
    category: termCategories.PHYSICS,
    href: "/natural-science/physics/thermodynamics"
  },
  "Quantum Superposition": {
    definition: "A fundamental principle of quantum mechanics where a quantum system can exist in multiple states at once until measured.",
    category: termCategories.PHYSICS,
    href: "/natural-science/physics/quantum-mechanics"
  },

  // --- CHEMISTRY ---
  "Mole": {
    definition: "A unit of measurement for amount of substance. One mole contains exactly 6.022 × 10²³ elementary entities.",
    category: termCategories.CHEMISTRY,
    href: "/natural-science/chemistry"
  },
  "Periodic Table": {
    definition: "A tabular display of the chemical elements, which are arranged by atomic number, electron configuration, and recurring chemical properties.",
    category: termCategories.CHEMISTRY,
    href: "/natural-science/chemistry/periodic-table"
  },

  // --- BIOLOGY ---
  "Taxonomy": {
    definition: "The branch of science concerned with classification, especially of organisms; systematics.",
    category: termCategories.BIOLOGY,
    href: "/natural-science/biology"
  },
  "Photosynthesis": {
    definition: "The process by which green plants and some other organisms use sunlight to synthesize foods from carbon dioxide and water.",
    category: termCategories.BIOLOGY,
    href: "/natural-science/biology/botany"
  },
  "Mycelium": {
    definition: "The vegetative part of a fungus, consisting of a network of fine white filaments (hyphae).",
    category: termCategories.BIOLOGY,
    href: "/natural-science/biology/mycology"
  }
};