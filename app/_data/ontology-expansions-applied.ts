import type { KnowledgeNode } from "./ontology";

/** Verified routed branches for Applied Science disciplines. */
export const appliedScienceOntologyExpansions: Record<string, KnowledgeNode[]> = {
  engineering: [
    { id: "aerospace-engineering", label: "Aerospace Engineering", slug: "/applied-science/engineering/aerospace", kind: "branch", status: "live" },
    { id: "chemical-engineering", label: "Chemical Engineering", slug: "/applied-science/engineering/chemical", kind: "branch", status: "live" },
    { id: "civil-engineering", label: "Civil Engineering", slug: "/applied-science/engineering/civil", kind: "branch", status: "live" },
    { id: "electrical-engineering", label: "Electrical Engineering", slug: "/applied-science/engineering/electrical", kind: "branch", status: "live" },
    { id: "mechanical-engineering", label: "Mechanical Engineering", slug: "/applied-science/engineering/mechanical", kind: "branch", status: "live" },
    { id: "software-engineering", label: "Software Engineering", slug: "/applied-science/engineering/software", kind: "branch", status: "live" },
  ],

  medicine: [
    {
      id: "anatomy-physiology-medicine",
      label: "Anatomy & Physiology",
      slug: "/applied-science/medicine/anatomy-physiology",
      kind: "branch",
      status: "live",
    },
  ],
};

export function appliedExpansionFor(nodeId: string): KnowledgeNode[] {
  return appliedScienceOntologyExpansions[nodeId] ?? [];
}
