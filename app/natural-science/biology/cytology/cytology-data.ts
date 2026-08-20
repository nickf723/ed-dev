export type CellStructureId =
  | "nucleus"
  | "mitochondrion"
  | "rough-er"
  | "golgi"
  | "lysosome"
  | "membrane"
  | "cytoskeleton"
  | "ribosome";

export type CellStructure = {
  id: CellStructureId;
  label: string;
  rgb: string;
  kind: string;
  function: string;
  processes: readonly string[];
  connections: readonly string[];
  caution?: string;
};

export const CELL_STRUCTURES: readonly CellStructure[] = [
  {
    id: "nucleus",
    label: "Nucleus",
    rgb: "192,132,252",
    kind: "Double-membrane compartment",
    function:
      "Contains most of the nuclear genome in eukaryotic cells and organizes processes including transcription, RNA processing, DNA replication, and chromosome segregation.",
    processes: ["DNA storage & replication", "transcription", "RNA processing", "nuclear transport"],
    connections: ["nuclear envelope is continuous with endoplasmic reticulum", "nuclear pores regulate traffic between nucleus and cytoplasm", "gene expression supplies RNA used throughout the cell"],
  },
  {
    id: "mitochondrion",
    label: "Mitochondrion",
    rgb: "251,191,36",
    kind: "Double-membrane organelle",
    function:
      "Carries out major parts of aerobic energy metabolism, including the citric acid cycle and oxidative phosphorylation, while also participating in biosynthesis, signaling, and regulated cell death.",
    processes: ["oxidative phosphorylation", "citric acid cycle", "metabolite exchange", "cellular signaling"],
    connections: ["imports many proteins encoded by nuclear genes", "exchanges metabolites with the cytosol", "mitochondrial abundance and shape vary with cell type and state"],
  },
  {
    id: "rough-er",
    label: "Rough Endoplasmic Reticulum",
    rgb: "96,165,250",
    kind: "Membrane network with bound ribosomes",
    function:
      "Supports synthesis, insertion, folding, and early modification of many proteins destined for secretion, membranes, or the endomembrane system.",
    processes: ["protein translocation", "protein folding", "quality control", "membrane synthesis"],
    connections: ["continuous with the nuclear envelope", "sends cargo toward the Golgi in transport carriers", "works with cytosolic and membrane-bound ribosomes"],
  },
  {
    id: "golgi",
    label: "Golgi Apparatus",
    rgb: "244,114,182",
    kind: "Stacked membrane cisternae",
    function:
      "Receives biosynthetic cargo from the endoplasmic reticulum, modifies many proteins and lipids, and sorts cargo toward different cellular destinations.",
    processes: ["cargo modification", "sorting", "vesicle trafficking", "glycan processing"],
    connections: ["receives ER-derived cargo", "sorts material toward the plasma membrane, lysosomes, and other destinations", "maintains distinct cisternal identities across the stack"],
  },
  {
    id: "lysosome",
    label: "Lysosome",
    rgb: "248,113,113",
    kind: "Acidic membrane-bound compartment",
    function:
      "Contains hydrolytic enzymes and supports degradation and recycling of macromolecules and cellular material delivered through endocytic, phagocytic, and autophagic pathways.",
    processes: ["macromolecule degradation", "recycling", "autophagy", "endocytic processing"],
    connections: ["receives material from endocytic pathways", "exchanges cargo with the broader endomembrane system", "releases reusable breakdown products back to cellular metabolism"],
    caution: "Lysosomes are especially characteristic of animal cells; other eukaryotes use related lytic compartments such as vacuoles.",
  },
  {
    id: "membrane",
    label: "Plasma Membrane",
    rgb: "52,211,153",
    kind: "Lipid bilayer with embedded proteins",
    function:
      "Defines the cell boundary and regulates exchange, signaling, adhesion, electrical gradients, and mechanical interactions with the extracellular environment.",
    processes: ["selective transport", "signal reception", "cell adhesion", "membrane potential"],
    connections: ["receives and removes membrane through trafficking", "connects to cytoskeletal and extracellular structures", "hosts channels, pumps, carriers, receptors, and adhesion proteins"],
  },
  {
    id: "cytoskeleton",
    label: "Cytoskeleton",
    rgb: "34,211,238",
    kind: "Dynamic filament systems",
    function:
      "Actin filaments, microtubules, intermediate filaments, and associated proteins organize cell shape, mechanics, intracellular transport, motility, polarity, and division.",
    processes: ["mechanical support", "organelle positioning", "motor-protein transport", "cell motility & division"],
    connections: ["microtubules provide tracks for many long-range transport events", "actin supports cortex and shape changes", "filament systems interact with membranes, junctions, motors, and organelles"],
  },
  {
    id: "ribosome",
    label: "Ribosome",
    rgb: "163,230,53",
    kind: "Ribonucleoprotein complex, not membrane-bound",
    function:
      "Translates messenger RNA into polypeptide chains. Ribosomes can operate free in the cytosol or become associated with the rough ER during synthesis of particular proteins.",
    processes: ["translation", "mRNA decoding", "peptide-bond formation", "protein synthesis"],
    connections: ["uses mRNA produced from gene expression", "cytosolic ribosomes make many cytosolic and organelle-targeted proteins", "ER-bound ribosomes synthesize many secreted and membrane proteins"],
  },
] as const;

export function getCellStructure(id: string | null): CellStructure | undefined {
  return CELL_STRUCTURES.find((structure) => structure.id === id);
}
