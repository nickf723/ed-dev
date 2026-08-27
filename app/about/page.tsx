import Link from "next/link";
import {
  ArrowRight,
  Braces,
  Compass,
  Eye,
  Network,
  Sparkles,
} from "lucide-react";
import KnowledgeAtlasBackdrop from "@/app/_components/KnowledgeAtlasBackdrop";

const PRINCIPLES = [
  {
    icon: Network,
    title: "Organize ideas by what they are",
    body: "Education Station treats knowledge as a connected hierarchy rather than a stack of courses. Broad fields lead into disciplines, branches, topics, and individual concepts.",
  },
  {
    icon: Eye,
    title: "Make the idea visible first",
    body: "Whenever possible, a concept begins with a visual model, interaction, or concrete pattern before formal notation takes over.",
  },
  {
    icon: Compass,
    title: "Let curiosity choose the route",
    body: "Pages are designed to support wandering. A learner can move upward for context, downward for depth, or sideways toward related ideas and applications.",
  },
] as const;

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02050b] text-slate-100 selection:bg-cyan-200/25">
      <KnowledgeAtlasBackdrop opacity={0.34} className="scale-110" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_48%_18%,rgba(34,211,238,0.08),transparent_34%),linear-gradient(to_bottom,rgba(2,5,11,0.48),rgba(2,5,11,0.94)_76%)]" />

      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
          <Link href="/" className="font-mono text-[10px] font-semibold uppercase tracking-[0.17em] text-cyan-100/55 transition hover:text-cyan-100">
            ES64 / Education Station
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs text-slate-400 transition hover:bg-white/[0.07] hover:text-white">
            Back to the atlas <ArrowRight size={12} />
          </Link>
        </header>

        <section className="grid gap-10 py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)] lg:items-end lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-200/65">
              <Sparkles size={12} /> About the project
            </div>
            <h1 className="mt-5 max-w-4xl text-[clamp(3.3rem,7vw,6.8rem)] font-semibold leading-[0.86] tracking-[-0.07em] text-white">
              A personal map
              <span className="block text-slate-400">for understanding ideas.</span>
            </h1>
          </div>
          <p className="max-w-xl text-[15px] leading-7 text-slate-300/75 sm:text-base">
            Education Station is my evolving collection of interactive explanations,
            visualizations, experiments, and notes. The project asks two questions over and over:
            <strong className="text-slate-100"> where does an idea fit</strong>, and
            <strong className="text-slate-100"> what would make it intuitive</strong>?
          </p>
        </section>

        <section className="grid gap-3 md:grid-cols-3" aria-label="Design principles">
          {PRINCIPLES.map(({ icon: Icon, title, body }) => (
            <article key={title} className="rounded-3xl border border-white/[0.09] bg-[#071019]/58 p-6 backdrop-blur-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-200/15 bg-cyan-200/[0.05] text-cyan-100/75">
                <Icon size={18} />
              </div>
              <h2 className="mt-5 text-lg font-semibold tracking-[-0.02em] text-white">{title}</h2>
              <p className="mt-3 text-[13px] leading-6 text-slate-400">{body}</p>
            </article>
          ))}
        </section>

        <section className="mt-20 grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-10">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.17em] text-slate-500">
              From hierarchy to graph
            </div>
            <h2 className="mt-3 text-[clamp(2.2rem,4vw,4rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-white">
              One structure powers the way through the site.
            </h2>
            <p className="mt-5 max-w-lg text-[14px] leading-7 text-slate-400">
              The same underlying map can drive breadcrumbs, parent and child navigation,
              related concepts, search, and eventually the atlas itself. That keeps the
              organization meaningful instead of maintaining several disconnected menus.
            </p>
          </div>

          <div className="rounded-[30px] border border-white/[0.09] bg-black/25 p-5 backdrop-blur-xl sm:p-7">
            <div className="font-mono text-[11px] leading-8 text-slate-400">
              <div><span className="text-violet-200">Formal Science</span></div>
              <div className="pl-5">↳ Mathematics</div>
              <div className="pl-10">↳ Algebra</div>
              <div className="pl-15">↳ Elementary Algebra</div>
              <div className="pl-20">↳ Fundamentals</div>
              <div className="pl-25">↳ Expressions &amp; Variables</div>
              <div className="pl-30 text-cyan-100">↳ Coefficient</div>
            </div>
            <div className="mt-6 border-t border-white/[0.08] pt-5 text-[13px] leading-6 text-slate-500">
              A concept does not need its own page to have a place in the map. Fine-grained ideas
              can live inside the page that teaches them while still participating in search and
              conceptual relationships.
            </div>
          </div>
        </section>

        <section className="mt-20 rounded-[34px] border border-white/[0.09] bg-gradient-to-br from-cyan-300/[0.055] via-[#07101b]/72 to-violet-300/[0.04] p-6 backdrop-blur-2xl sm:p-8 lg:p-10">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.17em] text-cyan-100/55">
                <Braces size={13} /> A good place to start
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                See the idea in Set Theory.
              </h2>
              <p className="mt-3 max-w-2xl text-[14px] leading-7 text-slate-400">
                The Set Theory page begins with visible properties and membership, turns operations
                into filters, and then lets the learner manipulate the structure directly.
              </p>
            </div>
            <Link href="/formal-science/mathematics/discrete/set-theory" className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/[0.07] px-4 py-2.5 text-sm font-medium text-cyan-50 transition hover:bg-cyan-200/[0.12]">
              Open Set Theory <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
