import type { KnowledgeNode } from "./ontology";

/** Verified routed branches for Humanities disciplines. */
export const humanitiesOntologyExpansions: Record<string, KnowledgeNode[]> = {
  philosophy: [
    { id: "aesthetics", label: "Aesthetics", slug: "/humanities/philosophy/aesthetics", kind: "branch", status: "live" },
    { id: "ethics", label: "Ethics", slug: "/humanities/philosophy/ethics", kind: "branch", status: "live" },
    { id: "metaphysics", label: "Metaphysics", slug: "/humanities/philosophy/metaphysics", kind: "branch", status: "live" },
  ],
};

export function humanitiesExpansionFor(nodeId: string): KnowledgeNode[] {
  return humanitiesOntologyExpansions[nodeId] ?? [];
}
