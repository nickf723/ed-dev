import type { CurriculumNode } from "@/lib/curriculum/types";

function node(
  id: string,
  label: string,
  href: string,
  description: string,
  status: CurriculumNode["status"] = "active",
  pageKind: CurriculumNode["pageKind"] = "hub"
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

export const EARTH_SCIENCE_CURRICULUM: CurriculumNode = {
  id: "natural.earth-science",
  label: "Earth Science",
  href: "/natural-science/earth-science",
  description:
    "Earth as a coupled system of rock, minerals, water, atmosphere, climate, landforms, and spatial processes.",
  domainId: "natural",
  status: "active",
  pageKind: "hub",
  children: [
    node(
      "natural.earth-science.geology",
      "Geology",
      "/natural-science/earth-science/geology",
      "Earth materials, tectonics, volcanism, deformation, deep time, and the processes that build and recycle the solid planet."
    ),
    node(
      "natural.earth-science.mineralogy",
      "Mineralogy",
      "/natural-science/earth-science/mineralogy",
      "Mineral chemistry, crystal structure, identification, formation, and the materials from which rocks and many Earth systems are built.",
      "active",
      "reference"
    ),
    node(
      "natural.earth-science.hydrology",
      "Hydrology",
      "/natural-science/earth-science/hydrology",
      "Water storage and movement through oceans, rivers, lakes, soils, groundwater, ice, organisms, and the atmosphere."
    ),
    node(
      "natural.earth-science.meteorology",
      "Meteorology",
      "/natural-science/earth-science/meteorology",
      "Atmospheric motion, moisture, clouds, fronts, storms, radiation, and the processes that create weather."
    ),
    node(
      "natural.earth-science.geography",
      "Physical Geography",
      "/natural-science/earth-science/geography",
      "Spatial patterns in landforms, water, climate, soils, and environments, with maps and field observations connecting Earth processes to place."
    ),
    node(
      "natural.earth-science.climatology",
      "Climatology",
      "/natural-science/earth-science/climatology",
      "Long-term atmospheric patterns, climate variability, forcing, feedback, paleoclimate, and interactions among the atmosphere, ocean, ice, land, and biosphere.",
      "placeholder"
    ),
  ],
};
