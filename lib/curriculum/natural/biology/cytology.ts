import type { CurriculumNode } from "@/lib/curriculum/types";

function planned(id: string, label: string, href: string, description: string): CurriculumNode {
  return { id, label, href, description, domainId: "natural", status: "placeholder", pageKind: "unit" };
}

export const CYTOLOGY_CURRICULUM: CurriculumNode = {
  id: "natural.biology.cytology",
  label: "Cytology",
  href: "/natural-science/biology/cytology",
  description:
    "Study cells as organized living systems through membranes, compartments, molecular machinery, energy conversion, transport, signaling, growth, division, interactions, and microscopy.",
  domainId: "natural",
  status: "active",
  pageKind: "hub",
  children: [
    planned("natural.biology.cytology.membranes-transport", "Membranes & Transport", "/natural-science/biology/cytology/membranes-transport", "Study lipid bilayers, membrane proteins, diffusion, osmosis, channels, carriers, pumps, electrochemical gradients, endocytosis, exocytosis, and selective transport."),
    planned("natural.biology.cytology.organelles", "Organelles & Compartments", "/natural-science/biology/cytology/organelles", "Study the nucleus, endoplasmic reticulum, Golgi apparatus, mitochondria, lysosomes, peroxisomes, vesicles, and how compartment boundaries organize cellular chemistry."),
    planned("natural.biology.cytology.cytoskeleton", "Cytoskeleton & Motility", "/natural-science/biology/cytology/cytoskeleton", "Study actin filaments, microtubules, intermediate filaments, motor proteins, intracellular transport, cell shape, mechanical support, cilia, flagella, and cell movement."),
    planned("natural.biology.cytology.energy-metabolism", "Cellular Energy & Metabolism", "/natural-science/biology/cytology/energy-metabolism", "Study ATP coupling, redox chemistry, glycolysis, mitochondrial respiration, metabolic pathways, energy transfer, biosynthesis, and the relationship between cellular structure and metabolism."),
    planned("natural.biology.cytology.protein-trafficking", "Protein Synthesis & Trafficking", "/natural-science/biology/cytology/protein-trafficking", "Follow information and material from transcription and translation through folding, targeting, rough ER, vesicles, Golgi processing, secretion, membranes, and intracellular destinations."),
    planned("natural.biology.cytology.signaling", "Cell Signaling", "/natural-science/biology/cytology/signaling", "Study receptors, ligands, second messengers, phosphorylation, signal amplification, feedback, gene regulation, cell-cell communication, and how cells respond to changing environments."),
    planned("natural.biology.cytology.cell-cycle", "Cell Cycle & Division", "/natural-science/biology/cytology/cell-cycle", "Study cell-cycle control, DNA replication, checkpoints, mitosis, cytokinesis, chromosome segregation, growth, quiescence, senescence, and regulated cell death."),
    planned("natural.biology.cytology.junctions-matrix", "Cell Junctions & Extracellular Matrix", "/natural-science/biology/cytology/junctions-matrix", "Study cell adhesion, tight and gap junctions, anchoring structures, extracellular matrix, mechanotransduction, polarity, tissue organization, and communication between cells and their surroundings."),
    planned("natural.biology.cytology.methods", "Microscopy & Cell Methods", "/natural-science/biology/cytology/methods", "Study optical and electron microscopy, fluorescence, labeling, live-cell imaging, cell culture, fractionation, flow cytometry, image interpretation, controls, resolution, and experimental limitations."),
  ],
};
