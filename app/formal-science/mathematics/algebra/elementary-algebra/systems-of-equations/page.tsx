import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Eye,
  GitMerge,
  Layers,
  Replace,
  Target,
  type LucideIcon,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";

const NODE_ID = "formal.mathematics.algebra.elementary-algebra.systems";
const ACCENT = "6, 182, 212";

type MethodMeta = {
  icon: LucideIcon;
  step: string;
  role: "foundation" | "view" | "method";
  verb: string;
  cue: string;
  rgb: string;
};

const META: Record<string, MethodMeta> = {
  "formal.mathematics.algebra.elementary-algebra.systems.solution-types": {
    icon: Target,
    step: "01",
    role: "foundation",
    verb: "Classify",
    cue: "Before solving, know whether two constraints can share one point, no points, or every point on the same line.",
    rgb: "6, 182, 212",
  },
  "formal.mathematics.algebra.elementary-algebra.systems.graphing": {
    icon: Eye,
    step: "02",
    role: "view",
    verb: "See",
    cue: "Graph both equations and read the system’s solution from the place where their graphs meet.",
    rgb: "16, 185, 129",
  },
  "formal.mathematics.algebra.elementary-algebra.systems.substitution": {
    icon: Replace,
    step: "03A",
    role: "method",
    verb: "Replace",
    cue: "Best when one variable is already isolated, or can be isolated cleanly, so an equivalent expression can take its place.",
    rgb: "249, 115, 22",
  },
  "formal.mathematics.algebra.elementary-algebra.systems.elimination": {
    icon: GitMerge,
    step: "03B",
    role: "method",
    verb: "Combine",
    cue: "Best when coefficients already oppose each other, or can be scaled into opposites, so one variable cancels.",
    rgb: "129, 140, 248",
  },
};

export default function SystemsOfEquationsUnitPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  const foundation = context.children.find((child) => META[child.id]?.role === "foundation");
  const view = context.children.find((child) => META[child.id]?.role === "view");
  const methods = context.children.filter((child) => META[child.id]?.role === "method");

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050a13] text-slate-100 selection:bg-cyan-400/25">
      <div className="pointer-events-none fixed inset-0 z-0" style={{ background: "radial-gradient(circle at 18% 22%, rgba(6,182,212,.10), transparent 30%), radial-gradient(circle at 82% 72%, rgba(129,140,248,.08), transparent 32%), linear-gradient(to bottom, #050a13, #02050a)" }} />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-30" style={{ backgroundImage: "linear-gradient(rgba(6,182,212,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,.035) 1px, transparent 1px)", backgroundSize: "46px 46px" }} />

      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-4 pb-14 pt-5 sm:px-6 xl:px-8">
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Integrated Algebra · One shared solution, several representations"
          icon={Layers}
          title={<span>Systems of Equations</span>}
          subtitle="A system describes several constraints at once. Learn what a shared solution means, see it geometrically, then choose an algebraic method that exposes the same point efficiently."
          accentRgb={ACCENT}
          titleClassName="font-mono text-[clamp(2.35rem,5vw,5rem)] font-semibold uppercase leading-[0.86] tracking-[-0.058em] text-[#f7fbff]"
          headerClassName="border-white/[0.10]"
        />

        <section className="mt-6 grid gap-5 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start">
          <div className="lg:sticky lg:top-5">
            <div className="rounded-[24px] border border-cyan-200/[0.13] bg-black/[0.24] p-5 shadow-[0_20px_60px_rgba(0,0,0,.20)] backdrop-blur-xl">
              <div className="text-[10px] font-semibold uppercase tracking-[0.13em] text-cyan-200/70">One specimen, every route</div>
              <div className="mt-5 flex items-center gap-4">
                <span className="text-[48px] font-light leading-none text-cyan-200/35">{"{"}</span>
                <div className="space-y-2 font-mono text-[22px] font-semibold text-white">
                  <div>x + y = 7</div>
                  <div>x − y = 1</div>
                </div>
              </div>
              <div className="mt-5 rounded-[16px] border border-white/[0.08] bg-white/[0.025] px-4 py-4">
                <div className="text-[10px] uppercase tracking-[0.10em] text-slate-500">Shared solution</div>
                <div className="mt-2 font-mono text-[25px] font-semibold text-emerald-100">(4, 3)</div>
              </div>
              <p className="mt-4 text-[14px] leading-7 text-slate-300">The method may change. The mathematical object does not: find the ordered pair that makes every equation true at the same time.</p>
            </div>

            <div className="mt-4 rounded-[20px] border border-white/[0.08] bg-black/[0.18] p-4 text-[13px] leading-6 text-slate-400 backdrop-blur-xl">
              <strong className="text-slate-200">Navigation rule:</strong> first understand the solution set, then use graphing as the geometric anchor. Substitution and elimination are sibling strategies, not two different meanings of a system.
            </div>
          </div>

          <nav aria-label="Systems of Equations learning map" className="rounded-[28px] border border-white/[0.10] bg-[#060b14]/84 p-4 shadow-[0_28px_90px_rgba(0,0,0,.24)] backdrop-blur-2xl sm:p-6">
            <div className="mx-auto max-w-[820px]">
              <div className="text-center">
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-200/70">The conceptual path</div>
                <h2 className="mt-2 text-[clamp(1.55rem,3vw,2.3rem)] font-semibold tracking-[-0.035em] text-white">Understand the intersection, see it, then choose how to compute it.</h2>
              </div>

              {foundation ? <PathNode child={foundation} meta={META[foundation.id]} /> : null}
              <Connector label="gives meaning to" />
              {view ? <PathNode child={view} meta={META[view.id]} /> : null}

              <div className="relative mt-5 pt-10">
                <div className="absolute left-1/2 top-0 hidden h-6 w-px -translate-x-1/2 bg-white/[0.11] sm:block" />
                <div className="absolute left-1/4 right-1/4 top-6 hidden h-px bg-white/[0.11] sm:block" />
                <div className="absolute left-1/4 top-6 hidden h-4 w-px bg-white/[0.11] sm:block" />
                <div className="absolute right-1/4 top-6 hidden h-4 w-px bg-white/[0.11] sm:block" />
                <div className="mb-3 flex items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.11em] text-slate-500"><ArrowDown size={13} /> choose an algebraic route</div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {methods.map((child) => <MethodNode key={child.id} child={child} meta={META[child.id]} />)}
                </div>
              </div>
            </div>
          </nav>
        </section>

        <section className="mt-6 overflow-hidden rounded-[24px] border border-white/[0.09] bg-black/[0.20] backdrop-blur-xl">
          <div className="border-b border-white/[0.08] px-5 py-4 sm:px-6">
            <div className="text-[10px] font-semibold uppercase tracking-[0.13em] text-cyan-200/65">Choose the method from the equation, not from habit</div>
            <h2 className="mt-2 text-[22px] font-semibold text-white">The fastest route depends on the form you are given.</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead className="text-[10px] uppercase tracking-[0.10em] text-slate-500">
                <tr><th className="px-5 py-3 font-semibold">Method</th><th className="px-5 py-3 font-semibold">Look for</th><th className="px-5 py-3 font-semibold">Core move</th><th className="px-5 py-3 font-semibold">What you see</th></tr>
              </thead>
              <tbody className="divide-y divide-white/[0.07] text-[13px] text-slate-300">
                <ChoiceRow method="Graphing" look="Lines or curves that are easy to draw accurately" move="Plot both constraints" result="The shared point appears as an intersection" rgb="16, 185, 129" />
                <ChoiceRow method="Substitution" look="x = … or y = …, or a variable that isolates cleanly" move="Replace a variable with an equivalent expression" result="Two variables collapse into one equation" rgb="249, 115, 22" />
                <ChoiceRow method="Elimination" look="Matching/opposite coefficients, or coefficients that scale cleanly" move="Add or subtract whole equations" result="One variable cancels from the combined equality" rgb="129, 140, 248" />
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-6 pb-6">
          <Link href="/formal-science/mathematics/algebra/elementary-algebra" className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/[0.18] px-4 py-2.5 text-[11px] font-semibold text-slate-400 transition hover:text-white">← Integrated Algebra map</Link>
        </div>
      </div>
    </main>
  );
}

function Connector({ label }: { label: string }) {
  return <div className="my-3 flex flex-col items-center text-slate-600"><div className="h-5 w-px bg-white/[0.11]" /><span className="my-1 font-mono text-[9px] uppercase tracking-[0.11em]">{label}</span><ArrowDown size={14} /><div className="h-2 w-px bg-white/[0.11]" /></div>;
}

function PathNode({ child, meta }: { child: { label: string; href: string; status?: string }; meta: MethodMeta }) {
  const Icon = meta.icon;
  return (
    <Link href={child.href} className="group mx-auto mt-5 block max-w-[620px] rounded-[22px] border p-5 transition hover:-translate-y-0.5" style={{ borderColor: `rgba(${meta.rgb},.20)`, background: `linear-gradient(145deg, rgba(${meta.rgb},.06), rgba(3,8,15,.70))` }}>
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},.22)`, background: `rgba(${meta.rgb},.055)` }}><Icon size={20} /></span>
        <div className="min-w-0 flex-1"><div className="text-[10px] font-semibold uppercase tracking-[0.11em]" style={{ color: `rgba(${meta.rgb},.72)` }}>{meta.step} · {meta.verb}</div><h3 className="mt-1 text-[22px] font-semibold text-white">{child.label}</h3><p className="mt-2 text-[14px] leading-6 text-slate-300">{meta.cue}</p></div>
        <ArrowRight size={17} style={{ color: `rgb(${meta.rgb})` }} />
      </div>
    </Link>
  );
}

function MethodNode({ child, meta }: { child: { label: string; href: string }; meta: MethodMeta }) {
  const Icon = meta.icon;
  return (
    <Link href={child.href} className="group block min-h-[215px] rounded-[22px] border p-5 transition hover:-translate-y-0.5" style={{ borderColor: `rgba(${meta.rgb},.19)`, background: `linear-gradient(145deg, rgba(${meta.rgb},.055), rgba(3,8,15,.70))` }}>
      <div className="flex items-start justify-between gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-[15px] border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},.22)` }}><Icon size={20} /></span><ArrowRight size={17} style={{ color: `rgb(${meta.rgb})` }} /></div>
      <div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.11em]" style={{ color: `rgba(${meta.rgb},.72)` }}>{meta.step} · {meta.verb}</div>
      <h3 className="mt-1 text-[23px] font-semibold text-white">{child.label}</h3>
      <p className="mt-3 text-[14px] leading-7 text-slate-300">{meta.cue}</p>
    </Link>
  );
}

function ChoiceRow({ method, look, move, result, rgb }: { method: string; look: string; move: string; result: string; rgb: string }) {
  return <tr><td className="px-5 py-4 font-semibold" style={{ color: `rgb(${rgb})` }}>{method}</td><td className="px-5 py-4">{look}</td><td className="px-5 py-4">{move}</td><td className="px-5 py-4">{result}</td></tr>;
}
