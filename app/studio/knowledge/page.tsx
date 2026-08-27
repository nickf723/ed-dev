import Link from "next/link";
import { notFound } from "next/navigation";
import { flattenKnowledgeGraph } from "@/app/_data/knowledge-graph";
import { knowledgeRelations } from "@/app/_data/knowledge-relations";

export const metadata = {
  title: "Knowledge Studio",
  robots: { index: false, follow: false },
};

const TOOLS = [
  {
    href: "/studio/knowledge-home",
    title: "Homepage Atlas",
    eyebrow: "Composition preview",
    description: "Test the knowledge graph as a quiet homepage background and six-domain entry surface.",
  },
  {
    href: "/studio/knowledge-map",
    title: "Knowledge Map",
    eyebrow: "Graph explorer",
    description: "Navigate routed pages, embedded concepts, canonical ancestry, search, focus, and typed cross-links.",
  },
  {
    href: "/studio/knowledge-navigation",
    title: "Navigation Lab",
    eyebrow: "Reusable primitive",
    description: "Compare graph-driven breadcrumbs, parent/child/sibling navigation, host-page resolution, and relations.",
  },
] as const;

export default function KnowledgeStudioHubPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  const nodes = flattenKnowledgeGraph();
  const routed = nodes.filter((node) => node.slug).length;
  const embedded = nodes.length - routed;

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-10 text-slate-100 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="border-b border-white/10 pb-7">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300/60">
            Education Station · Knowledge Studio
          </div>
          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.045em] text-white">
            The ontology workshop
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
            Three views of the same source of truth: a homepage composition, an explorable atlas,
            and a reusable navigation primitive. None of these routes are available outside development.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-[10px] text-slate-500">
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">{nodes.length} nodes</span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">{routed} routed</span>
            <span className="rounded-full border border-dashed border-white/10 px-3 py-1.5">{embedded} embedded</span>
            <span className="rounded-full border border-cyan-300/10 bg-cyan-300/[0.02] px-3 py-1.5 text-cyan-200/50">{knowledgeRelations.length} cross-links</span>
          </div>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {TOOLS.map((tool, index) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group min-h-56 rounded-3xl border border-white/10 bg-white/[0.025] p-5 transition hover:-translate-y-0.5 hover:border-violet-300/20 hover:bg-violet-300/[0.035]"
            >
              <div className="font-mono text-[10px] text-slate-600">0{index + 1}</div>
              <div className="mt-6 text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-300/55">
                {tool.eyebrow}
              </div>
              <h2 className="mt-1 text-xl font-semibold text-white">{tool.title}</h2>
              <p className="mt-3 text-xs leading-6 text-slate-500 group-hover:text-slate-400">
                {tool.description}
              </p>
            </Link>
          ))}
        </section>

        <section className="mt-10 rounded-3xl border border-white/[0.08] bg-black/20 p-5">
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">
            Current architecture
          </div>
          <div className="mt-4 grid gap-2 text-sm text-slate-400 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
              <strong className="text-slate-200">Tree = canonical home</strong>
              <p className="mt-1 text-xs leading-5 text-slate-500">Parent-child answers where a field or concept lives.</p>
            </div>
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
              <strong className="text-slate-200">Relations = conceptual connections</strong>
              <p className="mt-1 text-xs leading-5 text-slate-500">Typed cross-links express prerequisites, parts, contrasts, applications, and related ideas.</p>
            </div>
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
              <strong className="text-slate-200">Routes ≠ knowledge</strong>
              <p className="mt-1 text-xs leading-5 text-slate-500">Concepts may exist without standalone URLs and resolve to the page that teaches them.</p>
            </div>
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
              <strong className="text-slate-200">Views are projections</strong>
              <p className="mt-1 text-xs leading-5 text-slate-500">Homepage, atlas, and navigation can reveal different detail without duplicating structure.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
