// lib/asset-db.ts

export type AssetType = "Simulation" | "3D Model" | "Diagram" | "Map" | "Interactive";

export type AssetEntry = {
  id: string;
  title: string;
  type: AssetType;
  discipline: "Natural Science" | "Social Science" | "Formal Science" | "Applied Science" | "Humanities";
  desc: string;
  componentKey: string; // Used to map to the actual React component
};

export const ASSET_LIBRARY: AssetEntry[] = [
  // --- NATURAL SCIENCE ---
  {
    id: "cell-inspector",
    title: "Animal Cell Explorer",
    type: "3D Model",
    discipline: "Natural Science",
    desc: "Interactive cross-section of a eukaryotic cell showing organelles.",
    componentKey: "CellInspector"
  },
  {
    id: "dna-helix",
    title: "Double Helix",
    type: "Simulation",
    discipline: "Natural Science",
    desc: "Rotating DNA strand demonstrating base pairing and sugar-phosphate backbone.",
    componentKey: "DnaBackground" // We can present the background as a contained widget
  },
  {
    id: "orbital-sim",
    title: "Electron Orbitals",
    type: "Simulation",
    discipline: "Natural Science",
    desc: "Probabilistic cloud model of electron distribution around a nucleus.",
    componentKey: "OrbitalBackground"
  },
  {
    id: "molecule-viewer",
    title: "Molecular Geometry",
    type: "3D Model",
    discipline: "Natural Science",
    desc: "VSEPR theory visualizer for water, methane, and carbon dioxide.",
    componentKey: "MoleculeViewer"
  },
  {
    id: "pendulum-chaos",
    title: "Double Pendulum",
    type: "Simulation",
    discipline: "Natural Science",
    desc: "Demonstration of deterministic chaos in a mechanical system.",
    componentKey: "PendulumWidget"
  },

  // --- SOCIAL SCIENCE ---
  {
    id: "political-compass",
    title: "Ideology Spectrum",
    type: "Diagram",
    discipline: "Social Science",
    desc: "Two-axis chart mapping economic and social political stances.",
    componentKey: "PoliticalCompassWidget"
  },
  {
    id: "parliament",
    title: "Legislative Hemicycle",
    type: "Diagram",
    discipline: "Social Science",
    desc: "Seating chart visualization for parliamentary coalitions.",
    componentKey: "ParliamentWidget"
  },
  {
    id: "supply-demand",
    title: "Market Equilibrium",
    type: "Simulation",
    discipline: "Social Science",
    desc: "Interactive graph showing the relationship between price and quantity.",
    componentKey: "SupplyDemandWidget"
  },
  {
    id: "maslow",
    title: "Hierarchy of Needs",
    type: "Diagram",
    discipline: "Social Science",
    desc: "Pyramid structure of human motivation and psychological development.",
    componentKey: "MaslowWidget"
  },

  // --- FORMAL / APPLIED ---
  {
    id: "tech-stack",
    title: "Technology Layers",
    type: "Diagram",
    discipline: "Applied Science",
    desc: "The abstraction hierarchy of modern computing systems.",
    componentKey: "TechStackWidget"
  },
  {
    id: "rosetta",
    title: "The Rosetta Stone",
    type: "Interactive",
    discipline: "Humanities", // Or Social Science (Linguistics)
    desc: "Comparative linguistics tool for writing systems and phonetics.",
    componentKey: "RosettaWidget"
  },
];