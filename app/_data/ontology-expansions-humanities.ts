import type { KnowledgeNode } from "./ontology";

/** Verified routed branches plus explicit concepts taught inside Humanities pages. */
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

  religion: [
    {
      id: "mythology",
      label: "Mythology",
      slug: "/humanities/religion/mythology",
      kind: "branch",
      status: "live",
      children: [
        {
          id: "greek-mythology",
          label: "Greek Mythology",
          slug: "/humanities/religion/mythology/greek",
          kind: "topic",
          status: "live",
        },
      ],
    },
  ],

  "greek-mythology": [
    { id: "olympians", label: "Olympians", kind: "concept", status: "live" },
    { id: "titans", label: "Titans", kind: "concept", status: "live" },
    { id: "titanomachy", label: "Titanomachy", kind: "concept", status: "live" },
    { id: "divine-reciprocity", label: "Divine Reciprocity", kind: "concept", status: "live" },
    { id: "hubris", label: "Hubris", kind: "concept", status: "live" },
    { id: "legendary-artifacts", label: "Legendary Artifacts", kind: "concept", status: "live" },
  ],
};

export function humanitiesExpansionFor(nodeId: string): KnowledgeNode[] {
  return humanitiesOntologyExpansions[nodeId] ?? [];
}
