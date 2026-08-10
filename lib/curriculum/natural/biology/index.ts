import type { CurriculumNode } from "@/lib/curriculum/types";

function node(
  id: string,
  label: string,
  href: string,
  description: string,
  status: CurriculumNode["status"] = "active",
): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "natural",
    status,
  };
}

export const BIOLOGY_CURRICULUM: CurriculumNode = {
  id: "natural.biology",
  label: "Biology",
  href: "/natural-science/biology",
  description: "Living systems from molecular machinery and cells to organisms, evolution, and ecosystems.",
  domainId: "natural",
  status: "active",
  children: [
    node(
      "natural.biology.cytology",
      "Cytology",
      "/natural-science/biology/cytology",
      "Cell structure, organelles, membranes, transport, division, and the processes that make cells function.",
    ),
    node(
      "natural.biology.genetics",
      "Genetics",
      "/natural-science/biology/genetics",
      "Genes, inheritance, variation, chromosomes, and the transmission of biological information.",
      "placeholder",
    ),
    node(
      "natural.biology.molecular",
      "Molecular Biology",
      "/natural-science/biology/molecular",
      "DNA, RNA, proteins, gene expression, and the molecular machinery underlying living systems.",
      "placeholder",
    ),
    node(
      "natural.biology.microbiology",
      "Microbiology",
      "/natural-science/biology/microbiology",
      "Microscopic life and biological agents, including bacteria, archaea, protists, and viruses.",
    ),
    node(
      "natural.biology.mycology",
      "Mycology",
      "/natural-science/biology/mycology",
      "Fungi, their structures, life cycles, ecological roles, symbioses, and interactions with other organisms.",
    ),
    node(
      "natural.biology.botany",
      "Botany",
      "/natural-science/biology/botany",
      "Plant structure, physiology, reproduction, diversity, adaptation, and ecological roles.",
    ),
    node(
      "natural.biology.zoology",
      "Zoology",
      "/natural-science/biology/zoology",
      "Animal diversity, anatomy, physiology, behavior, adaptation, and relationships across the animal kingdom.",
    ),
    node(
      "natural.biology.anatomy",
      "Anatomy & Physiology",
      "/natural-science/biology/anatomy",
      "The structures of organisms and how tissues, organs, and body systems work together.",
    ),
    node(
      "natural.biology.ecology",
      "Ecology",
      "/natural-science/biology/ecology",
      "Relationships among organisms, populations, communities, ecosystems, resources, and environments.",
      "placeholder",
    ),
    node(
      "natural.biology.evolution",
      "Evolution",
      "/natural-science/biology/evolution",
      "Heritable change across generations, natural selection, common ancestry, adaptation, and biodiversity.",
      "placeholder",
    ),
  ],
};
