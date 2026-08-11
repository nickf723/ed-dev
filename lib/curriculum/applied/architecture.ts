import type { CurriculumNode } from "@/lib/curriculum/types";

function plannedLesson(
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

function plannedBranch(
  id: string,
  label: string,
  href: string,
  description: string,
): CurriculumNode {
  return plannedLesson(id, label, href, description);
}

const spatialDesign: CurriculumNode = {
  id: "applied.architecture.spatial-design",
  label: "Spatial Design & Program",
  href: "/applied-science/architecture/spatial-design",
  description:
    "Translate human activities into rooms, relationships, circulation, dimensions, and spatial sequences.",
  domainId: "applied",
  children: [
    plannedLesson(
      "applied.architecture.spatial-design.program-area",
      "Program & Area",
      "/applied-science/architecture/spatial-design/program-area",
      "Turn activities, users, furniture, equipment, and capacity into a program of required spaces and approximate areas.",
    ),
    plannedLesson(
      "applied.architecture.spatial-design.adjacency-zoning",
      "Adjacency & Zoning",
      "/applied-science/architecture/spatial-design/adjacency-zoning",
      "Organize which spaces should connect, separate, cluster, or transition based on privacy, noise, service, and use.",
    ),
    plannedLesson(
      "applied.architecture.spatial-design.circulation-wayfinding",
      "Circulation & Wayfinding",
      "/applied-science/architecture/spatial-design/circulation-wayfinding",
      "Design entrances, paths, decision points, queues, vertical movement, and spatial cues that help people move and orient themselves.",
    ),
    plannedLesson(
      "applied.architecture.spatial-design.human-scale-accessibility",
      "Human Scale & Accessibility",
      "/applied-science/architecture/spatial-design/human-scale-accessibility",
      "Use body dimensions, reach, furniture, clearances, turning space, and inclusive access to size spaces around real people.",
    ),
  ],
};

export const ARCHITECTURE_CURRICULUM: CurriculumNode = {
  id: "applied.architecture",
  label: "Architecture",
  href: "/applied-science/architecture",
  description:
    "Design buildings and built environments by coordinating human use, site, structure, enclosure, technical systems, and project delivery.",
  domainId: "applied",
  children: [
    spatialDesign,
    plannedBranch(
      "applied.architecture.site-context",
      "Site & Context",
      "/applied-science/architecture/site-context",
      "Respond to orientation, climate, terrain, access, neighboring conditions, and the larger setting of a building.",
    ),
    plannedBranch(
      "applied.architecture.structures-construction",
      "Structure & Construction",
      "/applied-science/architecture/structures-construction",
      "Coordinate load paths, structural systems, assemblies, sequencing, tolerances, and constructability.",
    ),
    plannedBranch(
      "applied.architecture.building-science",
      "Envelope & Building Science",
      "/applied-science/architecture/building-science",
      "Design walls, roofs, openings, and material layers to manage heat, air, moisture, weather, and daylight.",
    ),
    plannedBranch(
      "applied.architecture.building-systems",
      "Building Systems",
      "/applied-science/architecture/building-systems",
      "Integrate heating, cooling, ventilation, electrical, plumbing, lighting, acoustics, and life-safety systems with space and structure.",
    ),
    plannedBranch(
      "applied.architecture.practice-delivery",
      "Practice, Codes & Delivery",
      "/applied-science/architecture/practice-delivery",
      "Work within accessibility, egress, zoning, documentation, coordination, procurement, and construction-delivery constraints.",
    ),
  ],
};
