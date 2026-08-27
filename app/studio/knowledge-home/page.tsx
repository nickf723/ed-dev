import Link from "next/link";
import { notFound } from "next/navigation";
import KnowledgeAtlasBackdrop from "@/app/_components/KnowledgeAtlasBackdrop";
import { graphChildren, graphDescendantCount } from "@/app/_data/knowledge-graph";

export const metadata = {
  title: "Knowledge Atlas Home Preview",
  robots: { index: false, follow: false },
};

const DOMAIN_ACCENTS: Record<string, string> = {
  "formal-science": "155,92,255",
  "natural-science": "54,211,153",
  "social-science": "245,158,11",
  humanities: "244,114,182",
  "applied-science": "56,189,248",
  interdisciplines: "163,230,53",
};

export default function KnowledgeHomePreviewPage() {
  if (process.env.NODE_ENV !== "development") notFound();
  const domains = graphChildren("education-station");

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030612] text-white">
      <KnowledgeAtlasBackdrop className="scale-[1.18]" opacity={0.82} />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,6,18,0.32),rgba(3,6,18,0.62)_62%,#030612_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-8 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-300/65">
              Education Station
            </div>
            <div className="mt-1 text-xs text-slate-500">knowledge atlas preview</div>
          </div>
          <div className="flex gap-2">
            <Link
              href="/studio/knowledge-map"
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-300 backdrop-blur-xl hover:bg-white/[0.08] hover:text-white"
            >
              Open atlas
            </Link>
            <Link
              href="/studio/knowledge-navigation"
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-300 backdrop-blur-xl hover:bg-white/[0.08] hover:text-white"
            >
              Navigation lab
            </Link>
          </div>
        </header>

        <section className="flex flex-1 items-center py-16 sm:py-24">
          <div className="w-full">
            <div className="max-w-4xl rounded-[36px] border border-white/[0.09] bg-[#06091a]/52 p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-9 lg:p-11">
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                An evolving map of ideas
              </div>
              <h1 className="mt-4 max-w-4xl text-[clamp(3.2rem,8vw,7.5rem)] font-semibold leading-[0.84] tracking-[-0.075em] text-white">
                Explore knowledge.
                <span className="block text-slate-400">See how it connects.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-[15px] leading-7 text-slate-300/75 sm:text-base">
                Education Station is an evolving collection of interactive explanations,
                visualizations, and notes organized as a navigable map of mathematics,
                science, humanities, and beyond.
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                <Link
                  href="/studio/knowledge-map"
                  className="rounded-full border border-violet-300/30 bg-violet-300/10 px-4 py-2 text-sm font-medium text-violet-100 backdrop-blur-xl hover:bg-violet-300/15"
                >
                  Explore the map
                </Link>
                <Link
                  href="/formal-science/mathematics/discrete/set-theory"
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300 backdrop-blur-xl hover:bg-white/[0.08] hover:text-white"
                >
                  Visit Set Theory
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-10">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="text-[10px] font-semibold uppercase tracking-[0.17em] text-slate-500">
              Six ways into the atlas
            </div>
            <div className="text-[10px] text-slate-600">same ontology · different branches</div>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {domains.map((domain) => {
              const rgb = DOMAIN_ACCENTS[domain.id] ?? "148,163,184";
              return (
                <Link
                  key={domain.id}
                  href={`/studio/knowledge-map?focus=${domain.id}`}
                  className="group relative overflow-hidden rounded-2xl border px-4 py-4 backdrop-blur-xl transition hover:-translate-y-0.5"
                  style={{
                    borderColor: `rgba(${rgb},0.18)`,
                    background: `linear-gradient(135deg,rgba(${rgb},0.07),rgba(5,8,20,0.46))`,
                  }}
                >
                  <div
                    className="absolute -right-8 -top-8 h-24 w-24 rounded-full blur-3xl transition group-hover:opacity-100"
                    style={{ backgroundColor: `rgba(${rgb},0.16)` }}
                  />
                  <div className="relative">
                    <div className="flex items-center justify-between gap-4">
                      <strong className="text-sm font-semibold text-white">{domain.label}</strong>
                      <span className="font-mono text-[10px] text-slate-500">
                        {graphDescendantCount(domain.id)} nodes
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-slate-500">
                      {domain.children?.slice(0, 4).map((child) => child.label).join(" · ")}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
