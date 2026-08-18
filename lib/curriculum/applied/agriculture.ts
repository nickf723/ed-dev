import type { CurriculumNode } from "@/lib/curriculum/types";

function branch(id: string, label: string, href: string, description: string): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "applied",
    status: "placeholder",
    pageKind: "unit",
  };
}

export const AGRICULTURE_CURRICULUM: CurriculumNode = {
  id: "applied.agriculture",
  label: "Agriculture",
  href: "/applied-science/agriculture",
  description:
    "Study managed food, fiber, forest, animal, aquatic, soil, and land systems by connecting biology, ecology, chemistry, engineering, economics, climate, labor, technology, and long-term resource stewardship.",
  domainId: "applied",
  status: "active",
  pageKind: "hub",
  children: [
    branch(
      "applied.agriculture.agronomy",
      "Agronomy & Crop Science",
      "/applied-science/agriculture/agronomy",
      "Field crops, rotations, crop physiology, breeding, weeds, pests, nutrient and water management, yield formation, harvesting, and production across varying soils and climates.",
    ),
    branch(
      "applied.agriculture.soil-nutrients",
      "Soil Science & Nutrient Management",
      "/applied-science/agriculture/soil-nutrients",
      "Soil formation, texture, structure, organic matter, biology, water, nutrient cycling, fertility, erosion, amendments, testing, and site-specific nutrient management.",
    ),
    branch(
      "applied.agriculture.horticulture",
      "Horticulture",
      "/applied-science/agriculture/horticulture",
      "Fruit, vegetable, ornamental, nursery, greenhouse, and specialty-crop systems, including propagation, pruning, protected cultivation, postharvest quality, and landscape horticulture.",
    ),
    branch(
      "applied.agriculture.animal-science",
      "Animal Science & Livestock Systems",
      "/applied-science/agriculture/animal-science",
      "Animal nutrition, genetics, reproduction, health, welfare, behavior, housing, grazing, manure management, product quality, and livestock production systems.",
    ),
    branch(
      "applied.agriculture.aquaculture",
      "Aquaculture",
      "/applied-science/agriculture/aquaculture",
      "Managed production of fish, shellfish, algae, and other aquatic organisms through water-quality management, nutrition, health, breeding, system design, ecology, and biosecurity.",
    ),
    branch(
      "applied.agriculture.forestry-agroforestry",
      "Forestry & Agroforestry",
      "/applied-science/agriculture/forestry-agroforestry",
      "Forest and tree-crop systems, silviculture, regeneration, timber and non-timber products, habitat, fire, soils, watershed functions, carbon, and integration of trees with crops or livestock.",
    ),
    branch(
      "applied.agriculture.agroecology",
      "Agroecology & Sustainable Agriculture",
      "/applied-science/agriculture/agroecology",
      "Ecological interactions in managed landscapes, biodiversity, rotations, integrated pest management, soil conservation, resilience, nutrient and water cycles, and tradeoffs among production and environmental goals.",
    ),
    branch(
      "applied.agriculture.engineering-technology",
      "Agricultural Engineering & Technology",
      "/applied-science/agriculture/engineering-technology",
      "Machinery, irrigation, drainage, controlled environments, sensing, automation, robotics, precision agriculture, storage, processing, energy, structures, and data-enabled farm management.",
    ),
    branch(
      "applied.agriculture.economics-food-systems",
      "Agricultural Economics & Food Systems",
      "/applied-science/agriculture/economics-food-systems",
      "Farm decisions, risk, markets, labor, land, supply chains, trade, policy, processing, distribution, food access, externalities, and how biological production connects to wider food systems.",
    ),
  ],
};
