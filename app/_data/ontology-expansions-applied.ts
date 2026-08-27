import type { KnowledgeNode } from "./ontology";

/** Verified routed branches plus explicit concepts taught inside Applied Science pages. */
export const appliedScienceOntologyExpansions: Record<string, KnowledgeNode[]> = {
  agriculture: [
    {
      id: "farm-system-layers",
      label: "Farm System Layers",
      kind: "concept",
      status: "live",
      children: [
        { id: "agriculture-climate-water", label: "Climate & Water", kind: "concept", status: "live" },
        { id: "agriculture-soil-ecology", label: "Soil & Ecology", kind: "concept", status: "live" },
        { id: "managed-organisms", label: "Managed Organisms", kind: "concept", status: "live" },
        { id: "agriculture-tools-labor", label: "Tools & Labor", kind: "concept", status: "live" },
        { id: "food-system-context", label: "Food-System Context", kind: "concept", status: "live" },
      ],
    },
    {
      id: "farm-system-questions",
      label: "Farm System Questions",
      kind: "concept",
      status: "live",
      children: [
        { id: "agriculture-production", label: "Production", kind: "concept", status: "live" },
        { id: "agriculture-soil-water", label: "Soil & Water", kind: "concept", status: "live" },
        { id: "agriculture-risk", label: "Risk", kind: "concept", status: "live" },
        { id: "agriculture-ecology", label: "Ecology", kind: "concept", status: "live" },
        { id: "agriculture-technology", label: "Technology", kind: "concept", status: "live" },
        { id: "agriculture-food-system", label: "Food System", kind: "concept", status: "live" },
      ],
    },
  ],

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
