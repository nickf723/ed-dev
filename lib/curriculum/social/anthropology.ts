import type { CurriculumNode } from "@/lib/curriculum/types";

function field(
  id: string,
  label: string,
  href: string,
  description: string,
  status: CurriculumNode["status"] = "placeholder",
): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "social",
    status,
    pageKind: "unit",
  };
}

/** Four-field Anthropology subtree used by the parent hub and sidebar. */
export const ANTHROPOLOGY_CURRICULUM: CurriculumNode = {
  id: "social.anthropology",
  label: "Anthropology",
  href: "/social-science/anthropology",
  description:
    "The comparative study of human life across culture, biology, language, material evidence, deep time, and living communities.",
  domainId: "social",
  status: "active",
  pageKind: "hub",
  children: [
    field(
      "social.anthropology.cultural",
      "Cultural Anthropology",
      "/social-science/anthropology/cultural",
      "Ethnography, social life, meaning, exchange, kinship, ritual, identity, institutions, and cultural change in living communities.",
    ),
    field(
      "social.anthropology.biological",
      "Biological Anthropology",
      "/social-science/anthropology/biological",
      "Human evolution, primatology, skeletal biology, genetics, adaptation, variation, and the biological dimensions of human life.",
    ),
    field(
      "social.anthropology.archaeology",
      "Archaeology",
      "/social-science/anthropology/archaeology",
      "Reconstruct past human activity through sites, artifacts, ecofacts, architecture, stratigraphy, dating, and material context.",
      "active",
    ),
    field(
      "social.anthropology.linguistic",
      "Linguistic Anthropology",
      "/social-science/anthropology/linguistic",
      "Study how language, interaction, identity, power, culture, and social relationships shape one another in real communities.",
    ),
  ],
};
