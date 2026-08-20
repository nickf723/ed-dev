import {
  CAMPUS_EDGES,
  CAMPUS_VERTEX_BY_ID,
  CAMPUS_VERTICES,
  campusDegree,
  edgeKey,
  type GraphEdge,
  type GraphVertexId,
} from "./graphTheoryNetwork";

export default function CampusGraphDiagram({
  visited = [],
  frontier = [],
  current,
  route = [],
  start,
  goal,
  showDegree = false,
  className = "",
}: {
  visited?: readonly GraphVertexId[];
  frontier?: readonly GraphVertexId[];
  current?: GraphVertexId;
  route?: readonly GraphVertexId[];
  start?: GraphVertexId;
  goal?: GraphVertexId;
  showDegree?: boolean;
  className?: string;
}) {
  const visitedSet = new Set(visited);
  const frontierSet = new Set(frontier);
  const routeEdgeSet = new Set(
    route.slice(1).map((vertexId, index) => edgeKey(route[index], vertexId))
  );

  return (
    <svg
      viewBox="0 0 1000 560"
      className={className}
      role="img"
      aria-label="Seven-vertex campus graph with ten undirected edges"
    >
      <defs>
        <filter
          id="graph-node-glow"
          x="-80%"
          y="-80%"
          width="260%"
          height="260%"
        >
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="graph-route-gradient" x1="0" x2="1">
          <stop offset="0" stopColor="#67e8f9" />
          <stop offset="1" stopColor="#6ee7b7" />
        </linearGradient>
      </defs>

      <g>
        {CAMPUS_EDGES.map((edge) => {
          const source = CAMPUS_VERTEX_BY_ID.get(edge.source);
          const target = CAMPUS_VERTEX_BY_ID.get(edge.target);
          if (!source || !target) return null;
          const onRoute = routeEdgeSet.has(edgeKey(edge.source, edge.target));
          return (
            <line
              key={edge.id}
              x1={source.x * 10}
              y1={source.y * 5.6}
              x2={target.x * 10}
              y2={target.y * 5.6}
              stroke={
                onRoute
                  ? "url(#graph-route-gradient)"
                  : "rgba(148,163,184,0.24)"
              }
              strokeWidth={onRoute ? 8 : 4}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          );
        })}
      </g>

      {CAMPUS_VERTICES.map((vertex) => {
        const isVisited = visitedSet.has(vertex.id);
        const isFrontier = frontierSet.has(vertex.id);
        const isCurrent = current === vertex.id;
        const isStart = start === vertex.id;
        const isGoal = goal === vertex.id;
        const fill = isCurrent
          ? "#fef3c7"
          : isFrontier
            ? "#fbbf24"
            : isVisited
              ? "#5eead4"
              : "#07131a";
        const stroke = isGoal
          ? "#c4b5fd"
          : isStart
            ? "#67e8f9"
            : isVisited || isFrontier
              ? fill
              : "rgba(148,163,184,0.52)";

        return (
          <g
            key={vertex.id}
            transform={`translate(${vertex.x * 10} ${vertex.y * 5.6})`}
          >
            {isCurrent ? (
              <circle
                r="42"
                fill="none"
                stroke="rgba(251,191,36,0.38)"
                strokeWidth="3"
              />
            ) : null}
            <circle
              r="25"
              fill={fill}
              stroke={stroke}
              strokeWidth={isStart || isGoal || isCurrent ? 5 : 3}
              filter={
                isCurrent || isFrontier ? "url(#graph-node-glow)" : undefined
              }
              className="transition-all duration-300"
            />
            <text
              textAnchor="middle"
              dominantBaseline="central"
              fill={
                isVisited || isFrontier || isCurrent ? "#031013" : "#e2e8f0"
              }
              fontSize="18"
              fontWeight="700"
            >
              {vertex.symbol}
            </text>
            <text
              y="48"
              textAnchor="middle"
              fill="rgba(226,232,240,0.74)"
              fontSize="15"
              fontWeight="600"
            >
              {vertex.label}
            </text>
            {showDegree ? (
              <text
                y="68"
                textAnchor="middle"
                fill="rgba(103,232,249,0.68)"
                fontSize="12"
                fontFamily="monospace"
              >
                deg {campusDegree(vertex.id)}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

export function graphEdgesForRoute(
  route: readonly GraphVertexId[]
): GraphEdge[] {
  return route.slice(1).map((target, index) => ({
    id: edgeKey(route[index], target),
    source: route[index],
    target,
  }));
}
