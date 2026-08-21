import type { CurriculumNode } from "@/lib/curriculum/types";

function planned(
  id: string,
  label: string,
  href: string,
  description: string
): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "natural",
    status: "placeholder",
    pageKind: "unit",
  };
}

export const BOTANY_CURRICULUM: CurriculumNode = {
  id: "natural.biology.botany",
  label: "Botany",
  href: "/natural-science/biology/botany",
  description:
    "Plant structure, physiology, reproduction, diversity, adaptation, and ecological roles.",
  domainId: "natural",
  status: "active",
  pageKind: "hub",
  children: [
    planned(
      "natural.biology.botany.structure-development",
      "Structure & Development",
      "/natural-science/biology/botany/structure-development",
      "Follow plant organization from cells and tissues through roots, stems, leaves, meristems, organs, growth, and changing body plans."
    ),
    planned(
      "natural.biology.botany.physiology",
      "Plant Physiology",
      "/natural-science/biology/botany/physiology",
      "Study water relations, photosynthesis, respiration, mineral nutrition, transport, signaling, hormones, and responses to stress."
    ),
    planned(
      "natural.biology.botany.reproduction",
      "Reproduction & Life Cycles",
      "/natural-science/biology/botany/reproduction",
      "Connect alternation of generations, spores, pollen, ovules, flowers, cones, seeds, fruits, dispersal, and clonal reproduction."
    ),
    planned(
      "natural.biology.botany.diversity-evolution",
      "Diversity, Systematics & Evolution",
      "/natural-science/biology/botany/diversity-evolution",
      "Compare major plant lineages and reconstruct relationships using morphology, development, fossils, molecules, and phylogenetic evidence."
    ),
    planned(
      "natural.biology.botany.ecology",
      "Plant Ecology",
      "/natural-science/biology/botany/ecology",
      "Study plant populations, communities, competition, facilitation, mutualism, herbivory, succession, biomes, and environmental change."
    ),
    planned(
      "natural.biology.botany.methods-collections",
      "Methods & Collections",
      "/natural-science/biology/botany/methods-collections",
      "Learn field observation, identification, microscopy, physiology experiments, herbaria, gardens, specimen records, and reproducible plant data."
    ),
  ],
};
