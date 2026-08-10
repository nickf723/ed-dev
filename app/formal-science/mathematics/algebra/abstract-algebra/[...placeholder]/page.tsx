import Link from "next/link";
import { ArrowLeft, Construction, Network } from "lucide-react";
import { notFound } from "next/navigation";
import { curriculumRegistry } from "@/lib/curriculum/registry";

const ABSTRACT_ALGEBRA_PATH = "/formal-science/mathematics/algebra/abstract-algebra";

type PlaceholderPageProps = {
  params: Promise<{ placeholder: string[] }>;
};

export default async function AbstractAlgebraPlaceholderPage({ params }: PlaceholderPageProps) {
  const { placeholder } = await params;
  const href = `${ABSTRACT_ALGEBRA_PATH}/${placeholder.join("/")}`;
  const node = curriculumRegistry.getNodeByHref(href);

  if (!node || node.status !== "placeholder") notFound();

  const parent = curriculumRegistry.parentFor(node.id);
  const parentHref = parent?.href ?? ABSTRACT_ALGEBRA_PATH;
  const parentLabel = parent?.label ?? "Abstract Algebra";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05020a] px-6 py-16 text-white selection:bg-purple-500/30">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.035)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(168,85,247,0.14),transparent_35%),linear-gradient(to_bottom,transparent,rgba(0,0,0,0.55))]" />

      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center">
        <Link
          href={parentHref}
          className="mb-8 flex w-max items-center gap-2 rounded-full border border-purple-500/30 bg-black/40 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-purple-300 transition-colors hover:border-purple-400/60 hover:text-white"
        >
          <ArrowLeft size={12} /> {parentLabel}
        </Link>

        <section className="relative overflow-hidden rounded-[28px] border border-purple-500/25 bg-black/45 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:p-12">
          <div className="absolute right-8 top-8 text-purple-500/10">
            <Network size={120} strokeWidth={1} />
          </div>

          <div className="relative z-10">
            <div className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-purple-300/70">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-purple-500/25 bg-purple-500/10 text-purple-300">
                <Construction size={16} />
              </span>
              Planned curriculum node
            </div>

            <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">{node.label}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400">
              {node.description ?? "This branch is mapped into the curriculum, but its learning experience has not been built yet."}
            </p>

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">Status</div>
              <div className="mt-2 text-sm font-semibold text-purple-200">Structure mapped · lesson experience planned</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
