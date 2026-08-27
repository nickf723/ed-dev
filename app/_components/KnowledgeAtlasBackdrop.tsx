import { layoutKnowledgeTree } from "@/app/_data/knowledge-layout";

const DOMAIN_ACCENTS: Record<string, string> = {
  "formal-science": "#9b5cff",
  "natural-science": "#36d399",
  "social-science": "#f59e0b",
  humanities: "#f472b6",
  "applied-science": "#38bdf8",
  interdisciplines: "#a3e635",
};

export type KnowledgeAtlasBackdropProps = {
  className?: string;
  opacity?: number;
  showLabels?: boolean;
};

/**
 * Decorative routed-page projection of the canonical knowledge graph.
 * The atlas grows from the center outward: depth becomes radius and sibling
 * branches occupy neighboring arcs around the circle.
 */
export default function KnowledgeAtlasBackdrop({
  className = "",
  opacity = 0.72,
  showLabels = true,
}: KnowledgeAtlasBackdropProps) {
  const layout = layoutKnowledgeTree();
  const byId = new Map(layout.nodes.map((node) => [node.id, node]));
  const parentById = new Map(layout.nodes.map((node) => [node.id, node.parentId]));

  const domainFor = (nodeId: string) => {
    let cursor: string | undefined = nodeId;
    while (cursor) {
      if (DOMAIN_ACCENTS[cursor]) return cursor;
      cursor = parentById.get(cursor);
    }
    return undefined;
  };

  const point = (nodeId: string) => {
    const node = byId.get(nodeId);
    return node ? { x: node.x * 1000, y: node.y * 1000 } : { x: 500, y: 500 };
  };

  const ringCount = Math.max(layout.maxDepth, 1);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
      style={{ opacity }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="knowledge-atlas-fade" cx="50%" cy="50%" r="56%">
            <stop offset="0%" stopColor="white" stopOpacity="0.95" />
            <stop offset="72%" stopColor="white" stopOpacity="0.5" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="knowledge-atlas-mask">
            <rect width="1000" height="1000" fill="url(#knowledge-atlas-fade)" />
          </mask>
        </defs>

        <g mask="url(#knowledge-atlas-mask)">
          {Array.from({ length: ringCount }, (_, index) => {
            const radius = ((index + 1) / ringCount) * 460;
            return (
              <circle
                key={`ring-${index}`}
                cx="500"
                cy="500"
                r={radius}
                fill="none"
                stroke="#cbd5e1"
                strokeOpacity="0.035"
                strokeWidth="1"
                strokeDasharray={index % 2 ? "2 8" : undefined}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}

          {layout.edges.map((edge) => {
            const source = point(edge.sourceId);
            const target = point(edge.targetId);
            const domain = domainFor(edge.targetId);
            const accent = domain ? DOMAIN_ACCENTS[domain] : "#94a3b8";

            return (
              <line
                key={`${edge.sourceId}-${edge.targetId}`}
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke={accent}
                strokeOpacity="0.16"
                strokeWidth="1.1"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}

          {layout.nodes.map((node) => {
            const { x, y } = point(node.id);
            const domain = domainFor(node.id);
            const accent = domain ? DOMAIN_ACCENTS[domain] : "#cbd5e1";
            const radius = node.depth === 0 ? 5.4 : node.depth === 1 ? 4 : node.childIds.length ? 2.6 : 1.7;
            const labelVisible = showLabels && node.depth <= 1;

            return (
              <g key={node.id} transform={`translate(${x} ${y})`}>
                <circle r={radius * 3.1} fill={accent} fillOpacity="0.025" />
                <circle
                  r={radius}
                  fill={accent}
                  fillOpacity={node.depth <= 1 ? "0.78" : "0.52"}
                  stroke={accent}
                  strokeOpacity="0.32"
                  strokeWidth="0.75"
                  vectorEffect="non-scaling-stroke"
                />
                {labelVisible ? (
                  <text
                    x={radius + 4}
                    y="3"
                    fill={accent}
                    fillOpacity={node.depth === 0 ? "0.62" : "0.38"}
                    fontSize={node.depth === 0 ? "9" : "7.2"}
                    fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                    letterSpacing="0.3"
                  >
                    {node.label}
                  </text>
                ) : null}
              </g>
            );
          })}
        </g>
      </svg>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(2,6,23,0.05)_46%,rgba(2,6,23,0.74)_100%)]" />
    </div>
  );
}
