import type { KnowledgeNode } from "./ontology";

/** Verified routed branches plus explicit concepts taught inside Social Science pages. */
export const socialScienceOntologyExpansions: Record<string, KnowledgeNode[]> = {
  anthropology: [
    {
      id: "anthropology-archaeology",
      label: "Archaeology",
      slug: "/social-science/anthropology/archaeology",
      kind: "branch",
      status: "live",
    },
  ],

  "political-science": [
    { id: "political-theory", label: "Political Theory", kind: "concept", status: "live" },
    { id: "comparative-politics", label: "Comparative Politics", kind: "concept", status: "live" },
    { id: "political-institutions", label: "Political Institutions", kind: "concept", status: "live" },
    { id: "political-behavior", label: "Political Behavior", kind: "concept", status: "live" },
    { id: "public-policy", label: "Public Policy", kind: "concept", status: "live" },
    { id: "international-relations", label: "International Relations", kind: "concept", status: "live" },
    { id: "political-economy", label: "Political Economy", kind: "concept", status: "live" },
    { id: "political-methods", label: "Political Methods", kind: "concept", status: "live" },
    {
      id: "political-recurring-questions",
      label: "Recurring Political Questions",
      kind: "concept",
      status: "live",
      children: [
        { id: "political-authority", label: "Authority", kind: "concept", status: "live" },
        { id: "political-institutions-question", label: "Institutions", kind: "concept", status: "live" },
        { id: "collective-choice", label: "Collective Choice", kind: "concept", status: "live" },
        { id: "political-power", label: "Power", kind: "concept", status: "live" },
      ],
    },
  ],

  sociology: [
    { id: "social-interaction", label: "Social Interaction", kind: "concept", status: "live" },
    { id: "groups-networks", label: "Groups & Networks", kind: "concept", status: "live" },
    { id: "social-institutions", label: "Institutions", kind: "concept", status: "live" },
    { id: "social-stratification", label: "Stratification", kind: "concept", status: "live" },
    { id: "demography", label: "Demography", kind: "concept", status: "live" },
    { id: "social-change", label: "Social Change", kind: "concept", status: "live" },
    {
      id: "sociological-theory-methods",
      label: "Theory & Methods",
      kind: "concept",
      status: "live",
      children: [
        { id: "symbolic-interactionism", label: "Interactionist Lens", kind: "concept", status: "live" },
        { id: "conflict-theory", label: "Conflict Lens", kind: "concept", status: "live" },
        { id: "functional-systems", label: "Functional / Systems Lens", kind: "concept", status: "live" },
      ],
    },
  ],
};

export function socialExpansionFor(nodeId: string): KnowledgeNode[] {
  return socialScienceOntologyExpansions[nodeId] ?? [];
}
