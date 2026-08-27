import type { KnowledgeNode } from "./ontology";

/** Verified routed branches for Humanities disciplines. */
export const humanitiesOntologyExpansions: Record<string, KnowledgeNode[]> = {
  literature: [
    {
      id: "narrative-fiction",
      label: "Narrative Fiction",
      slug: "/humanities/literature/narrative-fiction",
      kind: "branch",
      status: "live",
    },
  ],

  music: [
    { id: "music-chords", label: "Chords", slug: "/humanities/music/chords", kind: "branch", status: "live" },
    { id: "music-harmony", label: "Harmony", slug: "/humanities/music/harmony", kind: "branch", status: "live" },
    { id: "music-notation", label: "Notation", slug: "/humanities/music/notation", kind: "branch", status: "live" },
    { id: "music-performance", label: "Performance", slug: "/humanities/music/performance", kind: "branch", status: "live" },
  ],

  philosophy: [
    { id: "aesthetics", label: "Aesthetics", slug: "/humanities/philosophy/aesthetics", kind: "branch", status: "live" },
    { id: "ethics", label: "Ethics", slug: "/humanities/philosophy/ethics", kind: "branch", status: "live" },
    { id: "metaphysics", label: "Metaphysics", slug: "/humanities/philosophy/metaphysics", kind: "branch", status: "live" },
  ],
};

export function humanitiesExpansionFor(nodeId: string): KnowledgeNode[] {
  return humanitiesOntologyExpansions[nodeId] ?? [];
}
