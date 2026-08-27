import Link from "next/link";
import { notFound } from "next/navigation";
import KnowledgeMapPreview from "@/app/studio/_components/KnowledgeMapPreview";
import { findGraphPath, searchKnowledgeGraph } from "@/app/_data/knowledge-graph";

export const metadata = {
  title: "Knowledge Map Preview",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function KnowledgeMapPreviewPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  if (process.env.NODE_ENV !== "development") notFound();

  const params = await searchParams;
  const focus = Array.isArray(params.focus) ? params.focus[0] : params.focus;
  const selected = Array.isArray(params.node) ? params.node[0] : params.node;
  const query = (Array.isArray(params.q) ? params.q[0] : params.q)?.trim() ?? "";
  const results = query ? searchKnowledgeGraph(query, 10) : [];

  return (
    <>
      <div className="bg-slate-950 px-6 pt-6 text-slate-100">
        <div className="mx-auto max-w-[1900px] rounded-3xl border border-white/10 bg-slate-900/70 p-4">
          <form action="/studio/knowledge-map" method="get" className="flex flex-wrap gap-2">
            {focus ? <input type="hidden" name="focus" value={focus} /> : null}
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Find Set Theory, coefficient, Greek Mythology…"
              className="min-w-64 flex-1 rounded-2xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-violet-400/50"
            />
            <button
              type="submit"
              className="rounded-2xl border border-violet-400/30 bg-violet-400/10 px-4 py-2.5 text-sm font-medium text-violet-100 hover:bg-violet-400/15"
            >
              Search map
            </button>
            {query ? (
              <Link
                href={focus ? `/studio/knowledge-map?focus=${focus}` : "/studio/knowledge-map"}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/10 hover:text-white"
              >
                Clear
              </Link>
            ) : null}
          </form>

          {query ? (
            <div className="mt-3 border-t border-white/10 pt-3">
              <p className="mb-2 text-xs text-slate-500">
                {results.length ? `${results.length} matches for “${query}”` : `No graph nodes match “${query}”`}
              </p>
              {results.length ? (
                <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                  {results.map((node) => {
                    const path = findGraphPath(node.id) ?? [];
                    const withinCurrentFocus = focus ? path.some((part) => part.id === focus) : false;
                    const resultParams = new URLSearchParams();
                    if (focus && withinCurrentFocus) resultParams.set("focus", focus);
                    resultParams.set("node", node.id);
                    resultParams.set("q", query);
                    const isEmbedded = !node.slug;

                    return (
                      <Link
                        key={node.id}
                        href={`/studio/knowledge-map?${resultParams.toString()}`}
                        className={`rounded-2xl border px-3 py-2.5 transition ${
                          isEmbedded
                            ? "border-dashed border-white/10 bg-transparent hover:bg-white/[0.04]"
                            : "border-white/10 bg-white/[0.03] hover:bg-white/[0.07]"
                        }`}
                      >
                        <span className="flex items-center justify-between gap-3">
                          <span className="text-sm font-medium text-slate-100">{node.label}</span>
                          <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] ${
                            isEmbedded
                              ? "border-slate-600/40 text-slate-500"
                              : "border-violet-400/20 bg-violet-400/[0.07] text-violet-300/70"
                          }`}>
                            {isEmbedded ? "embedded" : "page"}
                          </span>
                        </span>
                        <span className="mt-1 block truncate text-[11px] text-slate-500">
                          {path.map((part) => part.label).join(" / ")}
                        </span>
                        <span className="mt-1 block text-[10px] text-slate-600">{node.kind}</span>
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      <KnowledgeMapPreview focusId={focus} selectedId={selected} />
    </>
  );
}
