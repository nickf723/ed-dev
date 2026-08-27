import type { KnowledgeNode } from "./ontology";

/** Verified routed branches for Natural Science disciplines not yet promoted into the base ontology. */
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
