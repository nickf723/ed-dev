import Link from "next/link";
import { layoutKnowledgeTree } from "@/app/_data/knowledge-layout";
import { educationStationKnowledgeGraph } from "@/app/_data/knowledge-graph";

const DOMAIN_ACCENTS: Record<string, string> = {
  "formal-science": "#9b5cff",
  "natural-science": "#36d399",
  "social-science": "#f59e0b",
  humanities: "#f472b6",
  "applied-science": "#38bdf8",
  interdisciplines: "#a3e635",
};

const WIDTH = 1800;
const HEIGHT = 1180;
const PAD_X = 90;
const PAD_Y = 60;

function domainFor(nodeId: string, parentById: Map<string, string | undefined>): string | undefined {
  let cursor: string | undefined = nodeId;
  while (cursor) {
    if (DOMAIN_ACCENTS[cursor]) return cursor;
    cursor = parentById.get(cursor);
  }
  return undefined;
}

export default function KnowledgeMapPreview() {
  const layout = layoutKnowledgeTree(educationStationKnowledgeGraph);
  const byId = new Map(layout.nodes.map((node) => [node.id, node]));
  const parentById = new Map(layout.nodes.map((node) => [node.id, node.parentId]));

  const point = (id: string) => {
    const node = byId.get(id);
    if (!node) return { x: 0, y: 0 };
    return {
      x: PAD_X + node.x * (WIDTH - PAD_X * 2),
      y: PAD_Y + node.y * (HEIGHT - PAD_Y * 2),
    };
  };

  return (
    <section className="min-h-screen bg-slate-950 px-6 py-8 text-slate-100">
      <div className="mx-auto max-w-[1900px]">
        <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
              Knowledge Studio · ontology preview
            </p>
            <h1 className="text-3xl font-semibold tracking-tight">Map of Education Station</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
              A renderer-agnostic tree generated from the same knowledge graph intended to power
              navigation, breadcrumbs, discovery, and the future homepage atlas.
            </p>
          </div>
          <div className="flex gap-2 text-xs text-slate-400">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              {layout.nodes.length} nodes
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              {layout.edges.length} edges
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              depth {layout.maxDepth}
            </span>
          </div>
        </header>

        <div className="overflow-auto rounded-3xl border border-white/10 bg-slate-900/70 shadow-2xl shadow-black/30">
          <div className="relative" style={{ width: WIDTH, height: HEIGHT }}>
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
              aria-hidden="true"
            >
              <defs>
                <filter id="knowledge-map-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {layout.edges.map((edge) => {
                const source = point(edge.sourceId);
                const target = point(edge.targetId);
                const domain = domainFor(edge.targetId, parentById);
                const accent = domain ? DOMAIN_ACCENTS[domain] : "#64748b";
                const bend = source.x + (target.x - source.x) * 0.5;

                return (
                  <path
                    key={`${edge.sourceId}-${edge.targetId}`}
                    d={`M ${source.x} ${source.y} C ${bend} ${source.y}, ${bend} ${target.y}, ${target.x} ${target.y}`}
                    fill="none"
                    stroke={accent}
                    strokeOpacity="0.24"
                    strokeWidth="1.5"
                  />
                );
              })}
            </svg>

            {layout.nodes.map((node) => {
              const { x, y } = point(node.id);
              const domain = domainFor(node.id, parentById);
              const accent = domain ? DOMAIN_ACCENTS[domain] : "#e2e8f0";
              const isRoot = node.depth === 0;
              const isDomain = node.depth === 1;
              const className = [
                "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border backdrop-blur-md transition",
                node.slug ? "hover:z-20 hover:scale-105" : "cursor-default",
                isRoot
                  ? "min-w-36 px-5 py-3 text-center text-sm font-semibold"
                  : isDomain
                    ? "min-w-32 px-4 py-2.5 text-center text-xs font-semibold"
                    : "max-w-40 px-3 py-2 text-center text-[11px] font-medium leading-tight",
              ].join(" ");

              const style = {
                left: x,
                top: y,
                borderColor: `${accent}66`,
                backgroundColor: `${accent}16`,
                boxShadow: isRoot || isDomain ? `0 0 22px ${accent}22` : undefined,
              };

              if (!node.slug) {
                return (
                  <div key={node.id} className={className} style={style} title={node.id}>
                    {node.label}
                  </div>
                );
              }

              return (
                <Link
                  key={node.id}
                  href={node.slug}
                  className={className}
                  style={style}
                  title={`${node.label} · ${node.slug}`}
                >
                  {node.label}
                </Link>
              );
            })}
          </div>
        </div>

        <footer className="mt-4 text-xs leading-5 text-slate-500">
          Nodes link to their existing routed pages. The preview is deliberately isolated in the
          development-only Studio while the graph is audited and expanded.
        </footer>
      </div>
    </section>
  );
}
