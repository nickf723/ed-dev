import type { CurriculumNode } from "@/lib/curriculum/types";

function activeLesson(
  id: string,
  label: string,
  href: string,
  description: string,
): CurriculumNode {
  return { id, label, href, description, domainId: "applied" };
}

function plannedLesson(
  id: string,
  label: string,
  href: string,
  description: string,
): CurriculumNode {
  return { ...activeLesson(id, label, href, description), status: "placeholder" };
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
  description: "Translate human activities into rooms, relationships, circulation, dimensions, and spatial sequences.",
  domainId: "applied",
  children: [
    activeLesson("applied.architecture.spatial-design.program-area", "Program & Area", "/applied-science/architecture/spatial-design/program-area", "Turn activities, users, furniture, equipment, and capacity into a program of required spaces and approximate areas."),
    activeLesson("applied.architecture.spatial-design.adjacency-zoning", "Adjacency & Zoning", "/applied-science/architecture/spatial-design/adjacency-zoning", "Organize which spaces should connect, separate, cluster, or transition based on privacy, noise, service, and use."),
    activeLesson("applied.architecture.spatial-design.circulation-wayfinding", "Circulation & Wayfinding", "/applied-science/architecture/spatial-design/circulation-wayfinding", "Design entrances, paths, decision points, queues, vertical movement, and spatial cues that help people move and orient themselves."),
    activeLesson("applied.architecture.spatial-design.human-scale-accessibility", "Human Scale & Accessibility", "/applied-science/architecture/spatial-design/human-scale-accessibility", "Use body and mobility-device envelopes, furniture, clearances, reach, turning space, and inclusive design thinking to size spaces around real people."),
  ],
};

const siteContext: CurriculumNode = {
  id: "applied.architecture.site-context",
  label: "Site & Context",
  href: "/applied-science/architecture/site-context",
  description: "Respond to orientation, climate, terrain, access, neighboring conditions, and the larger setting of a building.",
  domainId: "applied",
  children: [
    activeLesson("applied.architecture.site-context.analysis-constraints", "Site Analysis & Constraints", "/applied-science/architecture/site-context/analysis-constraints", "Map existing physical, legal, ecological, and infrastructural conditions before choosing a building response."),
    activeLesson("applied.architecture.site-context.climate-orientation", "Climate & Orientation", "/applied-science/architecture/site-context/climate-orientation", "Relate solar exposure, shade, wind, seasonal conditions, and orientation to architectural decisions."),
    activeLesson("applied.architecture.site-context.topography-water", "Topography & Water", "/applied-science/architecture/site-context/topography-water", "Read contours, slopes, drainage paths, grading implications, and the movement of water across a site."),
    activeLesson("applied.architecture.site-context.access-surroundings", "Access & Surroundings", "/applied-science/architecture/site-context/access-surroundings", "Coordinate pedestrian, vehicle, service, neighboring-building, street, view, noise, and public-realm relationships."),
  ],
};

export const ARCHITECTURE_CURRICULUM: CurriculumNode = {
  id: "applied.architecture",
  label: "Architecture",
  href: "/applied-science/architecture",
  description: "Design buildings and built environments by coordinating human use, site, structure, enclosure, technical systems, and project delivery.",
  domainId: "applied",
  children: [
    spatialDesign,
    siteContext,
    plannedBranch("applied.architecture.structures-construction", "Structure & Construction", "/applied-science/architecture/structures-construction", "Coordinate load paths, structural systems, assemblies, sequencing, tolerances, and constructability."),
    plannedBranch("applied.architecture.building-science", "Envelope & Building Science", "/applied-science/architecture/building-science", "Design walls, roofs, openings, and material layers to manage heat, air, moisture, weather, and daylight."),
    plannedBranch("applied.architecture.building-systems", "Building Systems", "/applied-science/architecture/building-systems", "Integrate heating, cooling, ventilation, electrical, plumbing, lighting, acoustics, and life-safety systems with space and structure."),
    plannedBranch("applied.architecture.practice-delivery", "Practice, Codes & Delivery", "/applied-science/architecture/practice-delivery", "Work within accessibility, egress, zoning, documentation, coordination, procurement, and construction-delivery constraints."),
  ],
};
