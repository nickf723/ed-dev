import type { CurriculumNode } from "@/lib/curriculum/types";

function branch(
  id: string,
  label: string,
  href: string,
  description: string,
): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "social",
    status: "placeholder",
    pageKind: "unit",
  };
}

export const GEOGRAPHY_CURRICULUM: CurriculumNode = {
  id: "social.geography",
  label: "Geography",
  href: "/social-science/geography",
  description:
    "Study how people, places, environments, networks, economies, borders, and settlements are distributed across space and connected across scale.",
  domainId: "social",
  status: "active",
  pageKind: "hub",
  children: [
    branch(
      "social.geography.population",
      "Population & Demography",
      "/social-science/geography/population",
      "Population distribution, density, age structure, fertility, mortality, household composition, demographic change, and population measurement.",
    ),
    branch(
      "social.geography.migration",
      "Migration & Mobility",
      "/social-science/geography/migration",
      "Migration, commuting, displacement, tourism, circulation, transport, barriers, networks, and the movement of people across space.",
    ),
    branch(
      "social.geography.urban",
      "Urban & Settlement Geography",
      "/social-science/geography/urban",
      "Cities, settlements, land use, housing, infrastructure, segregation, metropolitan systems, and patterns of urbanization.",
    ),
    branch(
      "social.geography.cultural",
      "Cultural Geography",
      "/social-science/geography/cultural",
      "Language, religion, identity, landscape, diffusion, place meaning, cultural regions, heritage, and spatial expressions of culture.",
    ),
    branch(
      "social.geography.political",
      "Political Geography",
      "/social-science/geography/political",
      "Territory, borders, states, sovereignty, electoral geography, geopolitics, conflict, governance, and spatial organization of political power.",
    ),
    branch(
      "social.geography.economic",
      "Economic Geography",
      "/social-science/geography/economic",
      "Production, trade, labor, logistics, industry, services, resources, global value chains, and uneven economic development across space.",
    ),
    branch(
      "social.geography.development",
      "Development Geography",
      "/social-science/geography/development",
      "Well-being, infrastructure, inequality, institutions, globalization, sustainability, and competing ways of measuring and explaining development.",
    ),
    branch(
      "social.geography.methods",
      "Geographic Methods & GIS",
      "/social-science/geography/methods",
      "Maps, scale, projections, spatial data, fieldwork, remote sensing, geographic information systems, spatial analysis, and cartographic reasoning.",
    ),
  ],
};
