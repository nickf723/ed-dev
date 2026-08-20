import type { VocabTerm } from "../types";

export const graphTheoryVocab: VocabTerm[] = [
  {
    id: "graph-vertex",
    word: "Vertex",
    definition: "An object represented as a point in a graph.",
    domain: "Graph Theory",
    tags: ["Graphs", "Objects"],
    relatedTerms: ["graph-edge", "graph-degree"],
    isAdult: false,
  },
  {
    id: "graph-edge",
    word: "Edge",
    definition: "A connection joining a pair of vertices in a graph.",
    domain: "Graph Theory",
    tags: ["Graphs", "Relations"],
    relatedTerms: ["graph-vertex", "graph-path"],
    isAdult: false,
  },
  {
    id: "graph-degree",
    word: "Degree",
    definition: "The number of edges incident to a vertex.",
    domain: "Graph Theory",
    tags: ["Graphs", "Measurement"],
    relatedTerms: ["graph-vertex", "graph-edge"],
    isAdult: false,
  },
  {
    id: "graph-path",
    word: "Path",
    definition:
      "A sequence of vertices in which each consecutive pair is joined by an edge.",
    domain: "Graph Theory",
    tags: ["Graphs", "Traversal"],
    relatedTerms: ["graph-edge", "graph-connected"],
    isAdult: false,
  },
  {
    id: "graph-connected",
    word: "Connected Graph",
    definition:
      "A graph in which a path exists between every pair of vertices.",
    domain: "Graph Theory",
    tags: ["Graphs", "Connectivity"],
    relatedTerms: ["graph-path"],
    isAdult: false,
  },
];
