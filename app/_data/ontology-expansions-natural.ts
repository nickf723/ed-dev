import type { KnowledgeNode } from "./ontology";

/** Verified routed branches plus explicit concepts taught inside Natural Science pages. */
export const naturalScienceOntologyExpansions: Record<string, KnowledgeNode[]> = {
  astronomy: [
    {
      id: "cosmology",
      label: "Cosmology",
      slug: "/natural-science/astronomy/cosmology",
      kind: "branch",
      status: "live",
    },
    {
      id: "planetary-astronomy",
      label: "Planetary Astronomy",
      slug: "/natural-science/astronomy/planetary-astronomy",
      kind: "branch",
      status: "live",
    },
  ],

  botany: [
    { id: "plant-structure-development", label: "Structure & Development", kind: "concept", status: "live" },
    {
      id: "plant-physiology",
      label: "Plant Physiology",
      kind: "concept",
      status: "live",
      children: [
        { id: "photosynthesis", label: "Photosynthesis", kind: "concept", status: "live" },
        { id: "xylem", label: "Xylem", kind: "concept", status: "live" },
        { id: "stomata", label: "Stomata", kind: "concept", status: "live" },
        { id: "phloem", label: "Phloem", kind: "concept", status: "live" },
        { id: "transpiration", label: "Transpiration", kind: "concept", status: "live" },
        { id: "source-sink", label: "Source–Sink Relationships", kind: "concept", status: "live" },
      ],
    },
    { id: "plant-reproduction", label: "Plant Reproduction", kind: "concept", status: "live" },
    { id: "plant-diversity-evolution", label: "Plant Diversity & Evolution", kind: "concept", status: "live" },
    { id: "plant-ecology", label: "Plant Ecology", kind: "concept", status: "live" },
    { id: "botanical-methods", label: "Methods & Collections", kind: "concept", status: "live" },
  ],

  chemistry: [
    {
      id: "general-chemistry",
      label: "General Chemistry",
      slug: "/natural-science/chemistry/general",
      kind: "branch",
      status: "live",
    },
    {
      id: "quantum-chemistry",
      label: "Quantum Chemistry",
      slug: "/natural-science/chemistry/quantum",
      kind: "branch",
      status: "live",
    },
  ],

  "earth-science": [
    {
      id: "physical-geography",
      label: "Geography",
      slug: "/natural-science/earth-science/geography",
      kind: "branch",
      status: "live",
    },
    {
      id: "geology",
      label: "Geology",
      slug: "/natural-science/earth-science/geology",
      kind: "branch",
      status: "live",
    },
    {
      id: "hydrology",
      label: "Hydrology",
      slug: "/natural-science/earth-science/hydrology",
      kind: "branch",
      status: "live",
    },
    {
      id: "meteorology",
      label: "Meteorology",
      slug: "/natural-science/earth-science/meteorology",
      kind: "branch",
      status: "live",
    },
    {
      id: "mineralogy",
      label: "Mineralogy",
      slug: "/natural-science/earth-science/mineralogy",
      kind: "branch",
      status: "live",
    },
  ],

  mechanics: [
    {
      id: "forces",
      label: "Forces",
      slug: "/natural-science/physics/mechanics/forces",
      kind: "topic",
      status: "live",
      children: [
        { id: "free-body-diagrams", label: "Free-Body Diagrams", slug: "/natural-science/physics/mechanics/forces/free-body-diagrams", kind: "concept", status: "live" },
        { id: "net-force", label: "Net Force", slug: "/natural-science/physics/mechanics/forces/net-force", kind: "concept", status: "live" },
        { id: "newtons-second-law", label: "Newton’s Second Law", slug: "/natural-science/physics/mechanics/forces/newtons-second-law", kind: "concept", status: "live" },
      ],
    },
    {
      id: "mechanical-energy",
      label: "Energy",
      slug: "/natural-science/physics/mechanics/energy",
      kind: "topic",
      status: "live",
      children: [
        { id: "work-energy", label: "Work & Energy", slug: "/natural-science/physics/mechanics/energy/work-energy", kind: "concept", status: "live" },
        { id: "momentum", label: "Momentum", slug: "/natural-science/physics/mechanics/energy/momentum", kind: "concept", status: "live" },
      ],
    },
  ],
};

export function naturalExpansionFor(nodeId: string): KnowledgeNode[] {
  return naturalScienceOntologyExpansions[nodeId] ?? [];
}
