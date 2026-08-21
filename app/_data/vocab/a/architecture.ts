import type { VocabTerm } from "../types";

export const architectureVocab: VocabTerm[] = [
  term(
    "architecture",
    "Architecture",
    "The discipline of shaping buildings and places by coordinating spatial, structural, environmental, technical, cultural, and human requirements.",
    ["Foundations"]
  ),
  term(
    "program",
    "Program",
    "The activities, users, spaces, capacities, relationships, and performance needs a project is expected to support.",
    ["Design Studio", "Use"]
  ),
  term(
    "parti",
    "Parti",
    "A concise organizing idea or diagram that expresses a project's central spatial strategy.",
    ["Design Studio", "Representation"]
  ),
  term(
    "plan",
    "Plan",
    "A horizontal drawing or projection used to show spatial arrangement, walls, openings, circulation, and dimensions.",
    ["Representation"]
  ),
  term(
    "section",
    "Section",
    "A drawing made by conceptually cutting through a building or site to reveal vertical relationships and construction.",
    ["Representation"]
  ),
  term(
    "elevation",
    "Elevation",
    "An orthographic view of a building face or vertical surface without perspective convergence.",
    ["Representation"]
  ),
  term(
    "scale",
    "Drawing Scale",
    "A fixed ratio between a represented dimension and the corresponding full-size dimension.",
    ["Representation", "Measurement"]
  ),
  term(
    "circulation",
    "Circulation",
    "The routes, sequences, and systems through which people and goods move within and around a place.",
    ["Design Studio", "Use"]
  ),
  term(
    "adjacency",
    "Adjacency",
    "A planned relationship of proximity or direct connection between spaces or functions.",
    ["Design Studio", "Program"]
  ),
  term(
    "threshold",
    "Threshold",
    "A spatial condition that marks or mediates a transition between places, levels of privacy, or environmental states.",
    ["Design Studio", "Experience"]
  ),
  term(
    "load-path",
    "Load Path",
    "The continuous route through which applied forces travel through structural elements to the ground.",
    ["Structures"]
  ),
  term(
    "span",
    "Span",
    "The distance a structural element or system bridges between supports.",
    ["Structures"]
  ),
  term(
    "cantilever",
    "Cantilever",
    "A projecting structural element fixed or supported primarily at one end.",
    ["Structures"]
  ),
  term(
    "envelope",
    "Building Envelope",
    "The assemblies that separate interior and exterior conditions, including roofs, walls, openings, and foundations.",
    ["Building Technology", "Environment"]
  ),
  term(
    "assembly",
    "Assembly",
    "A coordinated combination of materials and components designed to perform together as part of a building.",
    ["Building Technology", "Construction"]
  ),
  term(
    "daylight",
    "Daylighting",
    "The deliberate admission and distribution of natural light within or around buildings.",
    ["Environmental Systems"]
  ),
  term(
    "passive-design",
    "Passive Design",
    "Use of orientation, form, envelope, shading, mass, and natural flows to shape environmental performance with reduced mechanical demand.",
    ["Environmental Systems", "Climate"]
  ),
  term(
    "thermal-comfort",
    "Thermal Comfort",
    "A person's subjective satisfaction with the thermal environment, influenced by air, surfaces, movement, humidity, clothing, and activity.",
    ["Environmental Systems", "People"]
  ),
  term(
    "accessibility",
    "Accessibility",
    "The quality of environments, routes, information, and services being usable by people with diverse bodies and abilities.",
    ["Practice", "People"]
  ),
  term(
    "life-safety",
    "Life Safety",
    "Design provisions intended to protect occupants during hazards, including safe movement, detection, containment, and egress.",
    ["Practice", "Codes"]
  ),
  term(
    "site",
    "Site",
    "The physical, ecological, infrastructural, legal, climatic, and cultural setting in which a project is situated.",
    ["Site", "Urban Design"]
  ),
  term(
    "public-realm",
    "Public Realm",
    "Streets, paths, squares, parks, and other publicly accessible spaces that support shared civic life.",
    ["Urban Design"]
  ),
  term(
    "adaptive-reuse",
    "Adaptive Reuse",
    "The conversion of an existing building to support a new use while retaining and modifying parts of its fabric.",
    ["History", "Sustainability"]
  ),
  term(
    "bim",
    "Building Information Modeling",
    "A process for creating and coordinating data-rich digital representations of building elements and systems.",
    ["Representation", "Coordination"]
  ),
];

function term(
  id: string,
  word: string,
  definition: string,
  tags: string[]
): VocabTerm {
  return {
    id: `architecture-${id}`,
    word,
    definition,
    domain: "Architecture",
    tags,
    isAdult: false,
  };
}
