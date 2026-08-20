import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  Activity,
  ArrowLeftRight,
  ArrowRight,
  Divide,
  Infinity as InfinityIcon,
  Microscope,
  Sigma,
  Zap,
  type LucideIcon,
} from "lucide-react";
import CalculusBackground from "./_components/CalculusBackground";
import LimitsLab from "./_components/LimitsLab";

const NODE_ID = "formal.mathematics.calculus.limits";

type LessonMeta = { icon: LucideIcon; role: string; question: string; rgb: string; prerequisite?: string };
const LESSON_META: Record<string, LessonMeta> = {
  "formal.mathematics.calculus.limits.laws": { icon: Sigma, role: "evaluate by structure", question: "When can limits of complicated expressions be assembled from simpler component limits?", rgb: "96, 165, 250" },
  "formal.mathematics.calculus.limits.infinity": { icon: InfinityIcon, role: "unbounded behavior", question: "What does it mean for function values to grow without bound near a finite input?", rgb: "192, 132, 252" },
  "formal.mathematics.calculus.limits.continuity": { icon: Activity, role: "connect limit to value", question: "When does the function's actual value agree with the value approached from nearby inputs?", rgb: "52, 211, 153" },
  "formal.mathematics.calculus.limits.epsilon-delta": { icon: Microscope, role: "make approach precise", question: "How do we turn 'arbitrarily close' into a quantified mathematical statement?", rgb: "250, 204, 21" },
  "formal.mathematics.calculus.limits.lhopital": { icon: Zap, role: "derivative-based theorem", question: "When can a quotient's indeterminate limit be replaced by a limit of derivatives?", rgb: "248, 113, 113", prerequisite: "uses derivative concepts" },
};

const LENSES = [
  ["Nearby input", "The expression x → c describes inputs approaching c, not necessarily taking the value c."],
  ["One-sided behavior", "A two-sided finite limit requires the left-hand and right-hand limits to exist and agree."],
  ["Function value", "The value f(c) can differ from the limit or fail to exist entirely; the limit is controlled by nearby behavior."],
  ["Continuity", "Continuity at c adds the requirement that f(c) exists and equals the two-sided limit as x approaches c."],
] as const;

const FAILURE_MODES = [
  ["Jump", "The left and right limits approach different finite values, so there is no single two-sided limit."],
  ["Unbounded", "Values grow without bound in magnitude. One-sided signs may agree or disagree, and the ordinary finite limit does not exist."],
  ["Oscillation", "The function keeps visiting separated output values arbitrarily close to the target input rather than settling toward one value."],
  ["Removable hole", "The nearby values approach one finite number even though the function is undefined there or assigned a different value."],
] as const;

export default function LimitsHubPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#030711] text-slate-100 selection:bg-blue-300/25">
      <CalculusBackground />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_14%,rgba(59,130,246,0.11),transparent_29%),radial-gradient(circle_at_17%_84%,rgba(52,211,153,0.045),transparent_28%),linear-gradient(to_bottom,rgba(3,7,17,0.08),rgba(3,7,17,0.80)_78%,rgba(2,5,12,0.98))]" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-[1560px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#030711]/80 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader breadcrumbs={context.breadcrumbs} eyebrow="Approach · one-sided behavior · continuity · precision" eyebrowStyle="rule" icon={Microscope} title={<span>Limits & Continuity</span>} subtitle="Limits describe what function values approach as inputs move toward a target. They let calculus reason about local behavior even when the function value at the target is missing, different, or irrelevant, and they provide the limiting definitions behind derivatives and integrals." accentRgb="59, 130, 246" titleClassName="font-sans text-[clamp(2.8rem,5.4vw,6.1rem)] font-semibold leading-[0.84] tracking-[-0.067em] text-[#f5f9ff]" headerClassName="border-blue-100/[0.10]" />
        </div>

        <section className="mt-5 overflow-hidden rounded-[30px] border border-blue-200/[0.10] bg-black/[0.14] backdrop-blur-xl"><div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end sm:px-6"><div><div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-blue-200/52"><ArrowLeftRight size={13}/> What the notation separates</div><h2 className="mt-2 text-[clamp(1.9rem,3.6vw,3.25rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">Approaching a point and evaluating at the point are different operations.</h2></div><p className="text-[12px] leading-6 text-slate-400">That separation is what makes holes, asymptotes, endpoint behavior, derivative definitions, and many piecewise constructions mathematically manageable.</p></div><div className="grid md:grid-cols-2 xl:grid-cols-4">{LENSES.map(([name,detail],index)=><article key={name} className="min-h-[175px] border-b border-white/[0.06] px-5 py-4 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0"><span className="font-mono text-[8px] text-blue-200/28">0{index+1}</span><h3 className="mt-3 text-[12px] font-semibold text-white/84">{name}</h3><p className="mt-2 text-[10px] leading-5 text-slate-600">{detail}</p></article>)}</div></section>

        <section className="mt-6 overflow-hidden rounded-[30px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl"><div className="border-b border-white/[0.07] px-5 py-5 sm:px-6"><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-200/46">Lessons · registry-backed navigation</div><h2 className="mt-2 text-[clamp(1.7rem,3vw,2.7rem)] font-semibold tracking-[-0.045em] text-white">Move from evaluation tools toward precise definitions.</h2></div><nav aria-label="Limits lessons" className="grid md:grid-cols-2 xl:grid-cols-5">{context.children.map((lesson,index)=><LessonRoute key={lesson.id} lesson={lesson} index={index}/>)}</nav></section>

        <section className="mt-6"><div className="mb-3 grid gap-3 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end"><div><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-200/44">Precision laboratory</div><h2 className="mt-1 text-[24px] font-semibold tracking-[-0.04em] text-white">Experiment with ε and δ neighborhoods around a candidate limit.</h2></div><p className="text-[11px] leading-5 text-slate-500">The lab samples the graph numerically, so it builds intuition for the quantified definition rather than replacing a proof.</p></div><LimitsLab /></section>

        <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px]"><div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl"><div className="border-b border-white/[0.07] px-5 py-5 sm:px-6"><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/44">Ways a finite two-sided limit can fail</div><h2 className="mt-2 text-[clamp(1.6rem,2.8vw,2.5rem)] font-semibold tracking-[-0.043em] text-white">Different failure modes require different diagnoses.</h2></div><div className="grid sm:grid-cols-2">{FAILURE_MODES.map(([name,detail],index)=><article key={name} className="min-h-[160px] border-b border-white/[0.06] px-5 py-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0"><span className="font-mono text-[8px] text-violet-200/28">0{index+1}</span><h3 className="mt-3 text-[12px] font-semibold text-white/84">{name}</h3><p className="mt-2 text-[10px] leading-5 text-slate-600">{detail}</p></article>)}</div></div><aside className="rounded-[28px] border border-rose-200/[0.08] bg-black/[0.13] p-5 backdrop-blur-xl sm:p-6"><div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-rose-200/44"><Zap size={13}/> L’Hôpital belongs downstream</div><h2 className="mt-2 text-[23px] font-semibold tracking-[-0.04em] text-white">It is a theorem for particular indeterminate quotients, not a general limit law.</h2><p className="mt-3 text-[11px] leading-5 text-slate-500">Its hypotheses use differentiability and compare the behavior of derivatives. Direct substitution, algebraic simplification, limit laws, one-sided analysis, squeeze arguments, or other methods may be more appropriate depending on the expression.</p></aside></section>

        <section className="mt-6 grid gap-3 sm:grid-cols-3"><Neighbor href="/formal-science/mathematics/calculus" label="Calculus" note="Return to the change-and-accumulation spine." rgb="34, 211, 238"/><Neighbor href="/formal-science/mathematics/calculus/differential" label="Differential Calculus" note="Use limits of difference quotients to define derivatives and local linear change." rgb="34, 211, 238"/><Neighbor href="/formal-science/mathematics/calculus/integral" label="Integral Calculus" note="Use limits of sums to define accumulated quantity across intervals." rgb="251, 146, 60"/></section>
      </div>
    </main>
  );
}
function LessonRoute({lesson,index}:{lesson:CurriculumNode;index:number}){const meta=LESSON_META[lesson.id]??LESSON_META["formal.mathematics.calculus.limits.laws"];const Icon=meta.icon;return <Link href={lesson.href} className="group min-h-[220px] border-b border-white/[0.06] px-5 py-5 transition hover:bg-white/[0.025] md:border-r md:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0"><div className="flex items-center justify-between"><span className="flex h-9 w-9 items-center justify-center rounded-[13px] border" style={{color:`rgb(${meta.rgb})`,borderColor:`rgba(${meta.rgb},0.22)`,background:`rgba(${meta.rgb},0.035)`}}><Icon size={15}/></span><span className="font-mono text-[8px] text-slate-700">0{index+1}</span></div><div className="mt-4 font-mono text-[8px] uppercase tracking-[0.09em]" style={{color:`rgba(${meta.rgb},0.56)`}}>{meta.role}</div><h3 className="mt-1 text-[13px] font-semibold text-white/84">{lesson.label}</h3><p className="mt-2 text-[10px] leading-5 text-slate-600">{meta.question}</p><div className="mt-4 flex items-center justify-between font-mono text-[8px] uppercase text-slate-700"><span>{meta.prerequisite??"open"}</span><ArrowRight size={12} className="transition group-hover:translate-x-1"/></div></Link>}
function Neighbor({href,label,note,rgb}:{href:string;label:string;note:string;rgb:string}){return <Link href={href} className="group flex min-h-[88px] items-center gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.12] px-4 py-3 backdrop-blur-md transition hover:bg-white/[0.025]"><span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{background:`rgb(${rgb})`,boxShadow:`0 0 18px rgba(${rgb},0.22)`}}/><span className="min-w-0 flex-1"><strong className="block text-[12px] text-white/82">{label}</strong><span className="mt-1 block text-[10px] leading-4 text-slate-600">{note}</span></span><ArrowRight size={12} className="text-slate-600 transition group-hover:translate-x-1"/></Link>}
