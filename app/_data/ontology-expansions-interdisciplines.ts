import type { KnowledgeNode } from "./ontology";

/** Verified routed branches for interdisciplinary subjects. */
export const interdisciplinaryOntologyExpansions: Record<string, KnowledgeNode[]> = {
  "game-studies": [
    {
      id: "game-studies-library",
      label: "Library",
      slug: "/interdisciplines/game-studies/library",
      kind: "branch",
      status: "live",
    },
    {
      id: "game-studies-science",
      label: "Science",
      slug: "/interdisciplines/game-studies/science",
      kind: "branch",
      status: "live",
    },
  ],
};

export function interdisciplinaryExpansionFor(nodeId: string): KnowledgeNode[] {
  return interdisciplinaryOntologyExpansions[nodeId] ?? [];
}
