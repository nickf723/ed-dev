import type { CurriculumNode } from "@/lib/curriculum/types";

function node(
  id: string,
  label: string,
  href: string,
  description: string,
  status: CurriculumNode["status"] = "active",
  pageKind?: CurriculumNode["pageKind"],
): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "natural",
    status,
    pageKind,
  };
}

export const BIOLOGY_CURRICULUM: CurriculumNode = {
  id: "natural.biology",
  label: "Biology",
  href: "/natural-science/biology",
  description:
    "Living systems from molecular machinery and cells to organisms, evolution, and ecosystems.",
  domainId: "natural",
  status: "active",
  pageKind: "hub",
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
    {
      id: "natural.biology.zoology",
      label: "Zoology",
      href: "/natural-science/biology/zoology",
      description:
        "Animal diversity, anatomy, physiology, behavior, adaptation, and relationships across the animal kingdom.",
      domainId: "natural",
      status: "active",
      pageKind: "hub",
      children: [
        node(
          "natural.biology.zoology.diversity",
          "Animal Diversity & Taxonomy",
          "/natural-science/biology/zoology/diversity",
          "Animal classification, body plans, phylogeny, species concepts, and the major lineages of the animal kingdom.",
          "active",
          "unit",
        ),
        node(
          "natural.biology.zoology.comparative",
          "Comparative Zoology",
          "/natural-science/biology/zoology/comparative",
          "Compare anatomy, physiology, development, and functional adaptations across animal groups.",
          "active",
          "unit",
        ),
        node(
          "natural.biology.zoology.ethology",
          "Ethology",
          "/natural-science/biology/zoology/ethology",
          "Animal behavior, communication, learning, mating, cooperation, conflict, and behavioral ecology.",
          "placeholder",
          "unit",
        ),
        node(
          "natural.biology.zoology.paleozoology",
          "Paleozoology",
          "/natural-science/biology/zoology/paleozoology",
          "Extinct animals, fossils, evolutionary transitions, ancient ecosystems, and the history of animal life.",
          "active",
          "unit",
        ),
      ],
    },
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
