import type { KnowledgeNode } from "./ontology";

/** Verified routed branches for Social Science disciplines. */
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
};

export function socialExpansionFor(nodeId: string): KnowledgeNode[] {
  return socialScienceOntologyExpansions[nodeId] ?? [];
}
