import Link from "next/link";
import { layoutKnowledgeTree, layoutSubtree } from "@/app/_data/knowledge-layout";
import {
  educationStationKnowledgeGraph,
  findGraphNode,
  graphChildren,
  graphDescendantCount,
} from "@/app/_data/knowledge-graph";
import { navigationForKnowledgeNode } from "@/app/_data/knowledge-navigation";

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

function mapHref(nodeId: string, focusId?: string) {
  const params = new URLSearchParams();
  if (focusId) params.set("focus", focusId);
  params.set("node", nodeId);
  return `/studio/knowledge-map?${params.toString()}`;
}

function focusHref(nodeId: string) {
  const params = new URLSearchParams({ focus: nodeId, node: nodeId });
  return `/studio/knowledge-map?${params.toString()}`;
}

export default function KnowledgeMapPreview({
  focusId,
  selectedId,
}: {
  focusId?: string;
  selectedId?: string;
}) {
  const requestedRoot = focusId ? findGraphNode(focusId) : undefined;
  const root = requestedRoot ?? educationStationKnowledgeGraph;
  const layout = requestedRoot ? layoutSubtree(requestedRoot.id)! : layoutKnowledgeTree(root);
  const byId = new Map(layout.nodes.map((node) => [node.id, node]));
  const parentById = new Map(layout.nodes.map((node) => [node.id, node.parentId]));
  const height = Math.max(620, Math.min(1900, layout.leafCount * 54 + PAD_Y * 2));
  const domainChoices = graphChildren("education-station");
  const selected = selectedId ? navigationForKnowledgeNode(selectedId) : undefined;
  const selectedDescendants = selected ? graphDescendantCount(selected.current.id) : 0;

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

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div>
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
                    const selectedEdge = selectedId && (edge.sourceId === selectedId || edge.targetId === selectedId);

                    return (
                      <path
                        key={`${edge.sourceId}-${edge.targetId}`}
                        d={`M ${source.x} ${source.y} C ${bend} ${source.y}, ${bend} ${target.y}, ${target.x} ${target.y}`}
                        fill="none"
                        stroke={accent}
                        strokeOpacity={selectedEdge ? "0.72" : "0.25"}
                        strokeWidth={selectedEdge ? "2.4" : "1.5"}
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
                  const isSelected = node.id === selectedId;
                  const className = [
                    "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border backdrop-blur-md transition",
                    "hover:z-20 hover:scale-105",
                    isRoot
                      ? "min-w-36 px-5 py-3 text-center text-sm font-semibold"
                      : isDomain
                        ? "min-w-32 px-4 py-2.5 text-center text-xs font-semibold"
                        : "max-w-44 px-3 py-2 text-center text-[11px] font-medium leading-tight",
                  ].join(" ");

                  const style = {
                    left: x,
                    top: y,
                    borderColor: isSelected ? accent : `${accent}66`,
                    backgroundColor: isSelected ? `${accent}33` : `${accent}16`,
                    boxShadow: isSelected
                      ? `0 0 0 2px ${accent}33, 0 0 30px ${accent}44`
                      : isRoot || isDomain
                        ? `0 0 22px ${accent}22`
                        : undefined,
                  };

                  return (
                    <Link
                      key={node.id}
                      href={mapHref(node.id, requestedRoot?.id)}
                      className={className}
                      style={style}
                      title={`${node.label} · ${node.id}`}
                    >
                      {node.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="self-start rounded-3xl border border-white/10 bg-slate-900/75 p-5 xl:sticky xl:top-6">
            {selected ? (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Node inspector
                </p>
                <h2 className="mt-2 text-xl font-semibold text-white">{selected.current.label}</h2>
                <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-slate-400">
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
                    {selected.current.kind}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
                    {selected.current.status ?? "unspecified"}
                  </span>
                </div>

                <div className="mt-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Path</p>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-slate-300">
                    {selected.breadcrumb.map((node, index) => (
                      <span key={node.id} className="contents">
                        {index > 0 ? <span className="text-slate-600">/</span> : null}
                        <Link href={mapHref(node.id, requestedRoot?.id)} className="hover:text-white">
                          {node.label}
                        </Link>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {selected.current.children?.length ? (
                    <Link
                      href={focusHref(selected.current.id)}
                      className="inline-flex rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1.5 text-xs font-medium text-violet-200 hover:bg-violet-400/15"
                    >
                      Focus subtree
                    </Link>
                  ) : null}
                  {requestedRoot && requestedRoot.id !== "education-station" ? (
                    <Link
                      href={mapHref(selected.current.id)}
                      className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white"
                    >
                      Show in entire map
                    </Link>
                  ) : null}
                </div>

                {selected.current.slug ? (
                  <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-3">
                    <p className="break-all font-mono text-[11px] leading-5 text-slate-400">{selected.current.slug}</p>
                    <Link
                      href={selected.current.slug}
                      className="mt-3 inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/10"
                    >
                      Open routed page
                    </Link>
                  </div>
                ) : null}

                <dl className="mt-5 grid grid-cols-2 gap-2 text-center sm:grid-cols-4 xl:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    <dt className="text-[10px] uppercase tracking-wide text-slate-500">Siblings</dt>
                    <dd className="mt-1 text-lg font-semibold">{selected.siblings.length}</dd>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    <dt className="text-[10px] uppercase tracking-wide text-slate-500">Children</dt>
                    <dd className="mt-1 text-lg font-semibold">{selected.children.length}</dd>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    <dt className="text-[10px] uppercase tracking-wide text-slate-500">Descendants</dt>
                    <dd className="mt-1 text-lg font-semibold">{selectedDescendants}</dd>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    <dt className="text-[10px] uppercase tracking-wide text-slate-500">Depth</dt>
                    <dd className="mt-1 text-lg font-semibold">{selected.breadcrumb.length - 1}</dd>
                  </div>
                </dl>

                {selected.parent ? (
                  <div className="mt-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Parent</p>
                    <Link
                      href={mapHref(selected.parent.id, requestedRoot?.id)}
                      className="mt-2 block rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-200 hover:bg-white/[0.06]"
                    >
                      {selected.parent.label}
                    </Link>
                  </div>
                ) : null}

                {selected.children.length ? (
                  <div className="mt-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Children</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selected.children.map((child) => (
                        <Link
                          key={child.id}
                          href={mapHref(child.id, requestedRoot?.id)}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-xs text-slate-300 hover:bg-white/[0.08] hover:text-white"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-sm font-medium text-slate-300">Select a node</p>
                <p className="mx-auto mt-2 max-w-64 text-xs leading-5 text-slate-500">
                  Inspect its canonical path, route, parent, siblings, descendants, and children without leaving the map.
                </p>
              </div>
            )}
          </aside>
        </div>

        <footer className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs leading-5 text-slate-500">
          <span>Map nodes inspect ontology structure; routed pages open from the inspector.</span>
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
