import type { KnowledgeNode } from "./ontology";

/** Verified routed branches for Natural Science disciplines not yet promoted into the base ontology. */
export const naturalScienceOntologyExpansions: Record<string, KnowledgeNode[]> = {
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
};

export function naturalExpansionFor(nodeId: string): KnowledgeNode[] {
  return naturalScienceOntologyExpansions[nodeId] ?? [];
}
