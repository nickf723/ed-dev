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
 * Designed to sit behind homepage or hub content without becoming a second
 * navigation implementation. Interactive atlas behavior belongs in Studio/map
 * surfaces; this component is deliberately pointer-events-none.
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
    return node ? { x: node.x * 1000, y: node.y * 700 } : { x: 0, y: 0 };
  };

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
      style={{ opacity }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 700"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="knowledge-atlas-fade" cx="50%" cy="48%" r="68%">
            <stop offset="0%" stopColor="white" stopOpacity="0.96" />
            <stop offset="64%" stopColor="white" stopOpacity="0.54" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="knowledge-atlas-mask">
            <rect width="1000" height="700" fill="url(#knowledge-atlas-fade)" />
          </mask>
        </defs>

        <g mask="url(#knowledge-atlas-mask)">
          {layout.edges.map((edge) => {
            const source = point(edge.sourceId);
            const target = point(edge.targetId);
            const domain = domainFor(edge.targetId);
            const accent = domain ? DOMAIN_ACCENTS[domain] : "#94a3b8";
            const bend = source.x + (target.x - source.x) * 0.48;

            return (
              <path
                key={`${edge.sourceId}-${edge.targetId}`}
                d={`M ${source.x} ${source.y} C ${bend} ${source.y}, ${bend} ${target.y}, ${target.x} ${target.y}`}
                fill="none"
                stroke={accent}
                strokeOpacity="0.19"
                strokeWidth="1.2"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}

          {layout.nodes.map((node) => {
            const { x, y } = point(node.id);
            const domain = domainFor(node.id);
            const accent = domain ? DOMAIN_ACCENTS[domain] : "#cbd5e1";
            const radius = node.depth === 0 ? 5.5 : node.depth === 1 ? 4.2 : node.childIds.length ? 2.7 : 1.8;
            const labelVisible = showLabels && (node.depth <= 2 || (node.childIds.length > 0 && node.depth <= 3));

            return (
              <g key={node.id} transform={`translate(${x} ${y})`}>
                <circle r={radius * 3.3} fill={accent} fillOpacity="0.035" />
                <circle
                  r={radius}
                  fill={accent}
                  fillOpacity={node.depth <= 1 ? "0.9" : "0.66"}
                  stroke={accent}
                  strokeOpacity="0.38"
                  strokeWidth="0.8"
                  vectorEffect="non-scaling-stroke"
                />
                {labelVisible ? (
                  <text
                    x={radius + 4}
                    y="3"
                    fill={accent}
                    fillOpacity={node.depth <= 1 ? "0.72" : "0.42"}
                    fontSize={node.depth <= 1 ? "10" : "7.5"}
                    fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                    letterSpacing="0.35"
                  >
                    {node.label}
                  </text>
                ) : null}
              </g>
            );
          })}
        </g>
      </svg>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_0%,rgba(2,6,23,0.08)_48%,rgba(2,6,23,0.72)_100%)]" />
    </div>
  );
}
