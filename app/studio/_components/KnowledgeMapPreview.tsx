import Link from "next/link";
import { layoutKnowledgeTree, layoutSubtree } from "@/app/_data/knowledge-layout";
import {
  educationStationKnowledgeGraph,
  findGraphNode,
  graphChildren,
} from "@/app/_data/knowledge-graph";

const DOMAIN_ACCENTS: Record<string, string> = {
  "formal-science": "#9b5cff",
  "natural-science": "#36d399",
  "social-science": "#f59e0b",
  humanities: "#f472b6",
  "applied-science": "#38bdf8",
  interdisciplines: "#a3e635",
};

const WIDTH = 1800;
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

export default function KnowledgeMapPreview({ focusId }: { focusId?: string }) {
  const requestedRoot = focusId ? findGraphNode(focusId) : undefined;
  const root = requestedRoot ?? educationStationKnowledgeGraph;
  const layout = requestedRoot ? layoutSubtree(requestedRoot.id)! : layoutKnowledgeTree(root);
  const byId = new Map(layout.nodes.map((node) => [node.id, node]));
  const parentById = new Map(layout.nodes.map((node) => [node.id, node.parentId]));
  const height = Math.max(620, Math.min(1900, layout.leafCount * 54 + PAD_Y * 2));
  const domainChoices = graphChildren("education-station");

  const point = (id: string) => {
    const node = byId.get(id);
    if (!node) return { x: 0, y: 0 };
    return {
      x: PAD_X + node.x * (WIDTH - PAD_X * 2),
      y: PAD_Y + node.y * (height - PAD_Y * 2),
    };
  };

  return (
    <section className="min-h-screen bg-slate-950 px-6 py-8 text-slate-100">
      <div className="mx-auto max-w-[1900px]">
        <header className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
              Knowledge Studio · ontology preview
            </p>
            <h1 className="text-3xl font-semibold tracking-tight">{root.label}</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
              A live tree generated from the knowledge graph intended to power navigation,
              breadcrumbs, discovery, and the future homepage atlas.
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

        <nav className="mb-5 flex flex-wrap gap-2" aria-label="Knowledge map focus">
          <Link
            href="/studio/knowledge-map"
            className={`rounded-full border px-3 py-1.5 text-xs transition ${
              !requestedRoot
                ? "border-white/30 bg-white/10 text-white"
                : "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            Entire map
          </Link>
          {domainChoices.map((domain) => {
            const accent = DOMAIN_ACCENTS[domain.id] ?? "#94a3b8";
            const active = requestedRoot?.id === domain.id;
            return (
              <Link
                key={domain.id}
                href={`/studio/knowledge-map?focus=${domain.id}`}
                className="rounded-full border px-3 py-1.5 text-xs transition hover:-translate-y-px"
                style={{
                  borderColor: `${accent}${active ? "aa" : "44"}`,
                  backgroundColor: `${accent}${active ? "22" : "0d"}`,
                  color: active ? "white" : accent,
                }}
              >
                {domain.label}
              </Link>
            );
          })}
        </nav>

        {requestedRoot && requestedRoot.kind !== "domain" ? (
          <div className="mb-4 text-xs text-slate-500">
            Focused subtree: <span className="text-slate-300">{requestedRoot.label}</span>
          </div>
        ) : null}

        <div className="overflow-auto rounded-3xl border border-white/10 bg-slate-900/70 shadow-2xl shadow-black/30">
          <div className="relative" style={{ width: WIDTH, height }}>
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox={`0 0 ${WIDTH} ${height}`}
              aria-hidden="true"
            >
              {layout.edges.map((edge) => {
                const source = point(edge.sourceId);
                const target = point(edge.targetId);
                const domain = domainFor(edge.targetId, parentById) ?? domainFor(root.id, parentById);
                const accent = domain ? DOMAIN_ACCENTS[domain] : "#64748b";
                const bend = source.x + (target.x - source.x) * 0.5;

                return (
                  <path
                    key={`${edge.sourceId}-${edge.targetId}`}
                    d={`M ${source.x} ${source.y} C ${bend} ${source.y}, ${bend} ${target.y}, ${target.x} ${target.y}`}
                    fill="none"
                    stroke={accent}
                    strokeOpacity="0.25"
                    strokeWidth="1.5"
                  />
                );
              })}
            </svg>

            {layout.nodes.map((node) => {
              const { x, y } = point(node.id);
              const domain = domainFor(node.id, parentById) ?? domainFor(root.id, parentById);
              const accent = domain ? DOMAIN_ACCENTS[domain] : "#e2e8f0";
              const isRoot = node.depth === 0;
              const isDomain = node.depth === 1 && root.id === "education-station";
              const className = [
                "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border backdrop-blur-md transition",
                node.slug ? "hover:z-20 hover:scale-105" : "cursor-default",
                isRoot
                  ? "min-w-36 px-5 py-3 text-center text-sm font-semibold"
                  : isDomain
                    ? "min-w-32 px-4 py-2.5 text-center text-xs font-semibold"
                    : "max-w-44 px-3 py-2 text-center text-[11px] font-medium leading-tight",
              ].join(" ");

              const style = {
                left: x,
                top: y,
                borderColor: `${accent}66`,
                backgroundColor: `${accent}16`,
                boxShadow: isRoot || isDomain ? `0 0 22px ${accent}22` : undefined,
              };

              const label = <>{node.label}</>;

              if (!node.slug) {
                return (
                  <div key={node.id} className={className} style={style} title={node.id}>
                    {label}
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
                  {label}
                </Link>
              );
            })}
          </div>
        </div>

        <footer className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs leading-5 text-slate-500">
          <span>Nodes link to their existing routed pages.</span>
          {requestedRoot && requestedRoot.id !== "education-station" ? (
            <Link href="/studio/knowledge-map" className="text-slate-300 hover:text-white">
              Return to entire map
            </Link>
          ) : null}
        </footer>
      </div>
    </section>
  );
}
