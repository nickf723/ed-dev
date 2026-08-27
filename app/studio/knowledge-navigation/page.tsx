import { notFound } from "next/navigation";
import KnowledgeNavigator from "@/app/_components/KnowledgeNavigator";

export const metadata = {
  title: "Knowledge Navigation Preview",
  robots: { index: false, follow: false },
};

const EXAMPLES = [
  {
    id: "mathematics",
    eyebrow: "Discipline",
    note: "Broad routed node with many children and descendants.",
  },
  {
    id: "set-theory",
    eyebrow: "Routed topic + embedded concepts",
    note: "A standalone page whose conceptual anatomy lives underneath it.",
  },
  {
    id: "coefficient",
    eyebrow: "Embedded concept",
    note: "No route of its own; resolves back to Expressions & Variables.",
  },
  {
    id: "photosynthesis",
    eyebrow: "Nested embedded concept",
    note: "Lives inside Plant Physiology, which itself lives inside Botany.",
  },
  {
    id: "collective-choice",
    eyebrow: "Cross-linked concept",
    note: "Canonical Political Science child with several non-hierarchical connections.",
  },
  {
    id: "narrative-story",
    eyebrow: "Interpretive concept",
    note: "Shows that the same graph/navigation model works outside STEM.",
  },
] as const;

export default function KnowledgeNavigationPreviewPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-slate-100 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 border-b border-white/10 pb-6">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300/60">
            Knowledge Studio · navigation primitive
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
            One graph, several navigation scales
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
            These previews all use the same canonical knowledge graph. Graph-native surfaces can
            resolve by stable node ID, while existing pages can resolve from the route they already know.
            Either way, path, parent, siblings, children, host page, descendants, and cross-links come
            from the same source of truth.
          </p>
        </header>

        <section className="mb-10 grid gap-3 lg:grid-cols-[250px_minmax(0,1fr)] lg:items-start">
          <div className="pt-2">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-300/50">
              Existing-page migration
            </div>
            <div className="mt-1 break-all font-mono text-xs text-cyan-300/70">
              /formal-science/mathematics/discrete/set-theory
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              Route-based resolution means an existing page does not need to know its ontology ID before adopting graph navigation.
            </p>
          </div>
          <KnowledgeNavigator slug="/formal-science/mathematics/discrete/set-theory" />
        </section>

        <div className="space-y-8 border-t border-white/10 pt-8">
          {EXAMPLES.map((example) => (
            <section key={example.id} className="grid gap-3 lg:grid-cols-[250px_minmax(0,1fr)] lg:items-start">
              <div className="pt-2">
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                  {example.eyebrow}
                </div>
                <div className="mt-1 font-mono text-xs text-violet-300/70">{example.id}</div>
                <p className="mt-2 text-xs leading-5 text-slate-500">{example.note}</p>
              </div>
              <KnowledgeNavigator nodeId={example.id} />
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
