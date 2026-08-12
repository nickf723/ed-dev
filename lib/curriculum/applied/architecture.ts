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

function plannedUnit(
  id: string,
  label: string,
  href: string,
  description: string,
  children: readonly CurriculumNode[],
): CurriculumNode {
  return {
    ...plannedLesson(id, label, href, description),
    children,
  };
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

const structureConstruction = plannedUnit(
  "applied.architecture.structures-construction",
  "Structure & Construction",
  "/applied-science/architecture/structures-construction",
  "Coordinate load paths, structural systems, assemblies, sequencing, tolerances, and constructability.",
  [
    plannedLesson("applied.architecture.structures-construction.loads-logic", "Loads & Structural Logic", "/applied-science/architecture/structures-construction/loads-logic", "Trace gravity and lateral forces through simplified load paths and distinguish stability, support, and continuity without performing member design."),
    plannedLesson("applied.architecture.structures-construction.systems-grids", "Structural Systems & Grids", "/applied-science/architecture/structures-construction/systems-grids", "Compare frames, bearing systems, slabs, cores, bays, spans, and grids as organizations that shape architectural space and coordination."),
    plannedLesson("applied.architecture.structures-construction.assemblies-connections", "Assemblies & Connections", "/applied-science/architecture/structures-construction/assemblies-connections", "Understand how components meet through bearing, fastening, joints, movement, tolerances, and coordinated interfaces."),
    plannedLesson("applied.architecture.structures-construction.constructability-sequence", "Constructability & Sequence", "/applied-science/architecture/structures-construction/constructability-sequence", "Reason about staging, access, dependencies, tolerances, prefabrication, temporary conditions, and the order in which a buildable assembly comes together."),
  ],
);

const envelopeBuildingScience = plannedUnit(
  "applied.architecture.building-science",
  "Envelope & Building Science",
  "/applied-science/architecture/building-science",
  "Design walls, roofs, openings, and material layers to manage heat, air, moisture, weather, and daylight.",
  [
    plannedLesson("applied.architecture.building-science.heat-thermal-flow", "Heat & Thermal Flow", "/applied-science/architecture/building-science/heat-thermal-flow", "Read layered assemblies as paths for heat flow and recognize how insulation continuity and thermal bridges change qualitative performance."),
    plannedLesson("applied.architecture.building-science.air-moisture-control", "Air & Moisture Control", "/applied-science/architecture/building-science/air-moisture-control", "Trace air and moisture pathways through an enclosure and connect condensation risk to temperature, humidity, materials, climate, and continuity."),
    plannedLesson("applied.architecture.building-science.weather-drainage-durability", "Weather, Drainage & Durability", "/applied-science/architecture/building-science/weather-drainage-durability", "Follow bulk water through roofs, walls, openings, flashing, drainage planes, and drying paths while considering exposure and durability."),
    plannedLesson("applied.architecture.building-science.openings-daylight-solar", "Openings, Daylight & Solar Control", "/applied-science/architecture/building-science/openings-daylight-solar", "Balance view, daylight, glare, privacy, solar exposure, shading, and envelope continuity where windows and doors interrupt opaque assemblies."),
  ],
);

const buildingSystems = plannedUnit(
  "applied.architecture.building-systems",
  "Building Systems",
  "/applied-science/architecture/building-systems",
  "Integrate heating, cooling, ventilation, electrical, plumbing, lighting, acoustics, and life-safety systems with space and structure.",
  [
    plannedLesson("applied.architecture.building-systems.hvac-comfort", "HVAC & Thermal Comfort", "/applied-science/architecture/building-systems/hvac-comfort", "Relate heating, cooling, ventilation, zoning, supply, return, equipment, and controls to occupied-space comfort and architectural coordination."),
    plannedLesson("applied.architecture.building-systems.water-plumbing", "Water & Plumbing", "/applied-science/architecture/building-systems/water-plumbing", "Trace potable water, hot water, fixtures, drainage, venting, and vertical stacking through a simplified building without performing pipe design."),
    plannedLesson("applied.architecture.building-systems.power-lighting-controls", "Power, Lighting & Controls", "/applied-science/architecture/building-systems/power-lighting-controls", "Connect panels, distribution, circuits, loads, lighting, sensors, switching, and control zones to architectural spaces and use."),
    plannedLesson("applied.architecture.building-systems.acoustics-sound-control", "Acoustics & Sound Control", "/applied-science/architecture/building-systems/acoustics-sound-control", "Reason from sound source to transmission path to receiver, comparing absorption, isolation, background noise, geometry, and system noise qualitatively."),
    plannedLesson("applied.architecture.building-systems.fire-life-safety", "Fire & Life-Safety Systems", "/applied-science/architecture/building-systems/fire-life-safety", "Coordinate detection, alarm, suppression, compartment interfaces, emergency systems, and life-safety layers without presenting generic rules as code compliance."),
  ],
);

const practiceDelivery = plannedUnit(
  "applied.architecture.practice-delivery",
  "Practice, Codes & Delivery",
  "/applied-science/architecture/practice-delivery",
  "Work within accessibility, egress, zoning, documentation, coordination, procurement, cost, schedule, and construction-delivery constraints.",
  [
    plannedLesson("applied.architecture.practice-delivery.regulatory-frameworks", "Regulatory Frameworks & Approvals", "/applied-science/architecture/practice-delivery/regulatory-frameworks", "Distinguish zoning and planning controls, building codes, accessibility requirements, fire review, permits, and other jurisdiction-dependent authorities."),
    plannedLesson("applied.architecture.practice-delivery.documentation", "Documentation & Drawing Sets", "/applied-science/architecture/practice-delivery/documentation", "Follow one building condition across plans, sections, elevations, details, schedules, specifications, and cross-references at different scales."),
    plannedLesson("applied.architecture.practice-delivery.consultant-coordination", "Consultants & Coordination", "/applied-science/architecture/practice-delivery/consultant-coordination", "Coordinate architectural, structural, civil, MEP, landscape, owner, specialist, and construction information around shared geometry and decisions."),
    plannedLesson("applied.architecture.practice-delivery.cost-schedule", "Cost & Schedule", "/applied-science/architecture/practice-delivery/cost-schedule", "Connect scope, quantity, quality, uncertainty, phasing, lead time, and design decisions to qualitative cost and schedule pressure without pretending to produce a real estimate."),
    plannedLesson("applied.architecture.practice-delivery.procurement-delivery", "Procurement & Delivery Methods", "/applied-science/architecture/practice-delivery/procurement-delivery", "Compare common ways roles, contracts, design, construction, and information flow can be organized without ranking one method as universally best."),
    plannedLesson("applied.architecture.practice-delivery.construction-administration", "Construction Administration & Closeout", "/applied-science/architecture/practice-delivery/construction-administration", "Trace submittals, RFIs, observations, changes, payment review, deficiency tracking, record information, commissioning, and closeout as project-information loops."),
  ],
);

export const ARCHITECTURE_CURRICULUM: CurriculumNode = {
  id: "applied.architecture",
  label: "Architecture",
  href: "/applied-science/architecture",
  description: "Design buildings and built environments by coordinating human use, site, structure, enclosure, technical systems, and project delivery.",
  domainId: "applied",
  children: [
    spatialDesign,
    siteContext,
    structureConstruction,
    envelopeBuildingScience,
    buildingSystems,
    practiceDelivery,
  ],
};
