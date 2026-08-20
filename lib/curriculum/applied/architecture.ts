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
    pageKind: "unit",
  };
}

export const ARCHITECTURE_CURRICULUM: CurriculumNode = {
  id: "applied.architecture",
  label: "Architecture",
  href: "/applied-science/architecture",
  description:
    "Shape buildings and places by coordinating spatial experience, structure, construction, climate, systems, history, representation, codes, and the needs of people and communities.",
  domainId: "applied",
  status: "active",
  pageKind: "hub",
  children: [
    branch(
      "applied.architecture.design-studio",
      "Architectural Design & Studio",
      "/applied-science/architecture/design-studio",
      "Programming, concept development, spatial organization, circulation, form, precedent, iteration, critique, representation, and integrated architectural design practice.",
    ),
    branch(
      "applied.architecture.building-technology",
      "Building Technology & Construction",
      "/applied-science/architecture/building-technology",
      "Materials, assemblies, envelopes, detailing, construction methods, moisture control, durability, fabrication, sequencing, and how designed buildings are physically realized.",
    ),
    branch(
      "applied.architecture.structures",
      "Architectural Structures",
      "/applied-science/architecture/structures",
      "Loads, spanning, stability, structural systems, grids, shells, frames, lateral resistance, and the relationship between structural behavior and architectural form.",
    ),
    branch(
      "applied.architecture.environmental-systems",
      "Environmental & Building Systems",
      "/applied-science/architecture/environmental-systems",
      "Daylight, thermal comfort, ventilation, acoustics, energy, mechanical systems, water, electrical systems, climate response, and building performance.",
    ),
    branch(
      "applied.architecture.urban-site",
      "Urban Design & Site Planning",
      "/applied-science/architecture/urban-site",
      "Site analysis, public realm, blocks, streets, landscape, density, accessibility, mobility, neighborhood form, and the relationship between buildings and larger urban systems.",
    ),
    branch(
      "applied.architecture.history-theory",
      "Architectural History & Theory",
      "/applied-science/architecture/history-theory",
      "Buildings, cities, movements, traditions, typologies, institutions, technology, culture, theory, criticism, and changing ideas about architecture across time and place.",
    ),
    branch(
      "applied.architecture.representation-fabrication",
      "Representation & Digital Fabrication",
      "/applied-science/architecture/representation-fabrication",
      "Drawing, projection, models, diagrams, visualization, BIM, parametric tools, simulation, prototyping, CNC, additive fabrication, and communication of spatial information.",
    ),
    branch(
      "applied.architecture.practice-codes",
      "Professional Practice, Codes & Accessibility",
      "/applied-science/architecture/practice-codes",
      "Building codes, accessibility, life safety, contracts, ethics, project delivery, coordination, liability, documentation, permitting, and professional responsibilities.",
    ),
  ],
};
