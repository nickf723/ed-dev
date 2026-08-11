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
    domainId: "applied",
    status: "placeholder",
  };
}

export const ARCHITECTURE_CURRICULUM: CurriculumNode = {
  id: "applied.architecture",
  label: "Architecture",
  href: "/applied-science/architecture",
  description:
    "Design buildings and built environments by coordinating human use, site, structure, enclosure, technical systems, and project delivery.",
  domainId: "applied",
  children: [
    branch(
      "applied.architecture.spatial-design",
      "Spatial Design & Program",
      "/applied-science/architecture/spatial-design",
      "Translate human activities into rooms, relationships, circulation, dimensions, and spatial sequences.",
    ),
    branch(
      "applied.architecture.site-context",
      "Site & Context",
      "/applied-science/architecture/site-context",
      "Respond to orientation, climate, terrain, access, neighboring conditions, and the larger setting of a building.",
    ),
    branch(
      "applied.architecture.structures-construction",
      "Structure & Construction",
      "/applied-science/architecture/structures-construction",
      "Coordinate load paths, structural systems, assemblies, sequencing, tolerances, and constructability.",
    ),
    branch(
      "applied.architecture.building-science",
      "Envelope & Building Science",
      "/applied-science/architecture/building-science",
      "Design walls, roofs, openings, and material layers to manage heat, air, moisture, weather, and daylight.",
    ),
    branch(
      "applied.architecture.building-systems",
      "Building Systems",
      "/applied-science/architecture/building-systems",
      "Integrate heating, cooling, ventilation, electrical, plumbing, lighting, acoustics, and life-safety systems with space and structure.",
    ),
    branch(
      "applied.architecture.practice-delivery",
      "Practice, Codes & Delivery",
      "/applied-science/architecture/practice-delivery",
      "Work within accessibility, egress, zoning, documentation, coordination, procurement, and construction-delivery constraints.",
    ),
  ],
};
