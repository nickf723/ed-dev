export type GraphVertexId =
  | "gate"
  | "library"
  | "studio"
  | "commons"
  | "observatory"
  | "workshop"
  | "garden";

export type GraphVertex = {
  id: GraphVertexId;
  symbol: string;
  label: string;
  x: number;
  y: number;
};

export type GraphEdge = {
  id: string;
  source: GraphVertexId;
  target: GraphVertexId;
};

export type TraversalAlgorithm = "bfs" | "dfs";

export type TraversalFrame = {
  current?: GraphVertexId;
  visited: readonly GraphVertexId[];
  frontier: readonly GraphVertexId[];
  treeEdges: readonly GraphEdge[];
};

export type TraversalResult = {
  frames: readonly TraversalFrame[];
  route: readonly GraphVertexId[];
};

export const CAMPUS_VERTICES: readonly GraphVertex[] = [
  { id: "gate", symbol: "A", label: "Gate", x: 9, y: 51 },
  { id: "library", symbol: "B", label: "Library", x: 28, y: 24 },
  { id: "studio", symbol: "C", label: "Studio", x: 30, y: 78 },
  { id: "commons", symbol: "D", label: "Commons", x: 51, y: 51 },
  { id: "observatory", symbol: "E", label: "Observatory", x: 70, y: 20 },
  { id: "workshop", symbol: "F", label: "Workshop", x: 73, y: 78 },
  { id: "garden", symbol: "G", label: "Garden", x: 92, y: 50 },
] as const;

export const CAMPUS_EDGES: readonly GraphEdge[] = [
  { id: "ab", source: "gate", target: "library" },
  { id: "ac", source: "gate", target: "studio" },
  { id: "bd", source: "library", target: "commons" },
  { id: "be", source: "library", target: "observatory" },
  { id: "cd", source: "studio", target: "commons" },
  { id: "cf", source: "studio", target: "workshop" },
  { id: "de", source: "commons", target: "observatory" },
  { id: "df", source: "commons", target: "workshop" },
  { id: "eg", source: "observatory", target: "garden" },
  { id: "fg", source: "workshop", target: "garden" },
] as const;

const VERTEX_ORDER = new Map(
  CAMPUS_VERTICES.map((vertex, index) => [vertex.id, index])
);

export const CAMPUS_VERTEX_BY_ID = new Map(
  CAMPUS_VERTICES.map((vertex) => [vertex.id, vertex])
);

export function edgeKey(source: GraphVertexId, target: GraphVertexId) {
  return [source, target].sort().join("--");
}

export function campusNeighbors(vertexId: GraphVertexId): GraphVertexId[] {
  return CAMPUS_EDGES.flatMap((edge) => {
    if (edge.source === vertexId) return [edge.target];
    if (edge.target === vertexId) return [edge.source];
    return [];
  }).sort(
    (left, right) =>
      (VERTEX_ORDER.get(left) ?? 0) - (VERTEX_ORDER.get(right) ?? 0)
  );
}

export function campusDegree(vertexId: GraphVertexId) {
  return campusNeighbors(vertexId).length;
}

function routeFromParents(
  parents: ReadonlyMap<GraphVertexId, GraphVertexId | undefined>,
  start: GraphVertexId,
  goal: GraphVertexId
) {
  const route: GraphVertexId[] = [];
  let cursor: GraphVertexId | undefined = goal;

  while (cursor) {
    route.unshift(cursor);
    if (cursor === start) return route;
    cursor = parents.get(cursor);
  }

  return [];
}

export function campusTraversal(
  algorithm: TraversalAlgorithm,
  start: GraphVertexId,
  goal: GraphVertexId
): TraversalResult {
  const frontier: GraphVertexId[] = [start];
  const discovered = new Set<GraphVertexId>([start]);
  const visited: GraphVertexId[] = [];
  const parents = new Map<GraphVertexId, GraphVertexId | undefined>([
    [start, undefined],
  ]);
  const treeEdges: GraphEdge[] = [];
  const frames: TraversalFrame[] = [
    { visited: [], frontier: [start], treeEdges: [] },
  ];

  while (frontier.length > 0) {
    const current = algorithm === "bfs" ? frontier.shift() : frontier.pop();
    if (!current) break;
    visited.push(current);

    const neighbors = campusNeighbors(current);
    const discoveryOrder =
      algorithm === "dfs" ? [...neighbors].reverse() : neighbors;

    for (const neighbor of discoveryOrder) {
      if (discovered.has(neighbor)) continue;
      discovered.add(neighbor);
      parents.set(neighbor, current);
      treeEdges.push({
        id: `${current}-${neighbor}`,
        source: current,
        target: neighbor,
      });
      frontier.push(neighbor);
    }

    frames.push({
      current,
      visited: [...visited],
      frontier: [...frontier],
      treeEdges: [...treeEdges],
    });

    if (current === goal) break;
  }

  return {
    frames,
    route: routeFromParents(parents, start, goal),
  };
}

export function vertexRoster(vertices: readonly GraphVertexId[]) {
  return vertices
    .map((id) => CAMPUS_VERTEX_BY_ID.get(id)?.symbol ?? id)
    .join(" → ");
}
