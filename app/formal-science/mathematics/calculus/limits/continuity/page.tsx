import DomainPageHeader from "@/app/_components/DomainPageHeader";
import CurriculumSiblingNav from "@/app/_components/CurriculumSiblingNav";
import { M } from "@/app/_components/Math";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import { Activity, CircleDot, GitCommitHorizontal, Waves } from "lucide-react";
import ContinuityBackground from "./_components/ContinuityBackground";
import ContinuityLab from "./_components/ContinuityLab";

const NODE_ID = "formal.mathematics.calculus.limits.continuity";

const CONDITIONS = [
  ["Defined", "The function value f(c) exists."],
  ["Limit exists", "The left-hand and right-hand limits agree on one finite value L."],
  ["Value matches limit", "The actual value satisfies f(c) = L."],
] as const;

const DISCONTINUITIES = [
  ["Removable", "The two-sided limit exists, but the function is missing or assigned a different value at the point. Redefining one point can repair continuity."],
  ["Jump", "The left-hand and right-hand limits approach different finite values, so there is no single two-sided limit to match."],
  ["Infinite", "At least one one-sided limit is unbounded near the point, producing vertical-asymptote behavior rather than a finite continuous connection."],
  ["Oscillatory", "Nearby outputs do not settle toward one value because the function continues oscillating at every scale near the point."],
] as const;

export default function ContinuityPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#03100a] text-slate-100 selection:bg-emerald-300/25">
      <ContinuityBackground />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_14%,rgba(52,211,153,0.10),transparent_29%),radial-gradient(circle_at_18%_84%,rgba(59,130,246,0.045),transparent_28%),linear-gradient(to_bottom,rgba(3,16,10,0.08),rgba(3,16,10,0.80)_78%,rgba(2,9,6,0.98))]" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1460px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#03100a]/80 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Function value · two-sided limit · local agreement"
            eyebrowStyle="rule"
            icon={Activity}
            title={<span>Continuity</span>}
            subtitle="Continuity at a point is a three-way agreement: the function must be defined there, nearby values must approach one two-sided limit, and that limit must equal the actual function value. It is stronger than simply having a limit."
            accentRgb="52, 211, 153"
            titleClassName="font-sans text-[clamp(3rem,5.7vw,6.2rem)] font-semibold leading-[0.83] tracking-[-0.067em] text-[#f3fff8]"
            headerClassName="border-emerald-100/[0.10]"
          />
        </div>

        <section className="mt-5 overflow-hidden rounded-[30px] border border-emerald-200/[0.10] bg-black/[0.14] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end sm:px-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-200/52"><CircleDot size={13} /> Point continuity</div>
              <h2 className="mt-2 text-[clamp(1.9rem,3.5vw,3.2rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">The limit describes nearby behavior; continuity additionally anchors that behavior to the point itself.</h2>
            </div>
            <div className="rounded-[16px] border border-emerald-200/[0.09] bg-emerald-200/[0.018] px-4 py-4 text-center">
              <M display>{`\\lim_{x\\to c} f(x)=f(c)`}</M>
            </div>
          </div>
          <div className="grid md:grid-cols-3">
            {CONDITIONS.map(([name, detail], index) => (
              <article key={name} className="min-h-[155px] border-b border-white/[0.06] px-5 py-4 md:border-b-0 md:border-r md:last:border-r-0">
                <span className="font-mono text-[8px] text-emerald-200/28">0{index + 1}</span>
                <h3 className="mt-3 text-[13px] font-semibold text-white/84">{name}</h3>
                <p className="mt-2 text-[10px] leading-5 text-slate-600">{detail}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-6"><ContinuityLab /></div>

        <section className="mt-6 overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-end sm:px-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/46"><GitCommitHorizontal size={13} /> Classifying discontinuities</div>
              <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.7rem)] font-semibold tracking-[-0.045em] text-white">Ask which part of the continuity agreement fails.</h2>
            </div>
            <p className="text-[11px] leading-5 text-slate-500">The labels describe local behavior near a point. A function can have different discontinuity types at different inputs.</p>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4">
            {DISCONTINUITIES.map(([name, detail], index) => (
              <article key={name} className="min-h-[180px] border-b border-white/[0.06] px-5 py-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0">
                <span className="font-mono text-[8px] text-violet-200/28">0{index + 1}</span>
                <h3 className="mt-3 text-[12px] font-semibold text-white/84">{name}</h3>
                <p className="mt-2 text-[10px] leading-5 text-slate-600">{detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
          <div className="rounded-[28px] border border-white/[0.08] bg-black/[0.13] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-200/44"><Waves size={13} /> Continuity on an interval</div>
            <h2 className="mt-2 text-[23px] font-semibold tracking-[-0.04em] text-white">Pointwise continuity builds interval-level guarantees.</h2>
            <p className="mt-3 text-[11px] leading-5 text-slate-500">If a function is continuous at every point of an interval, the graph cannot jump over intermediate output values. This is the idea behind the Intermediate Value Theorem: on a closed interval, any value between f(a) and f(b) is attained somewhere between a and b.</p>
          </div>
          <aside className="rounded-[28px] border border-amber-200/[0.08] bg-black/[0.13] p-5 backdrop-blur-xl sm:p-6">
            <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-200/42">Useful caution</div>
            <p className="mt-3 text-[11px] leading-5 text-slate-500">“Draw it without lifting your pencil” is a helpful picture for many familiar graphs, but it is not a definition. Continuity is the local limit condition, and rigorous statements depend on the function's domain and the point being considered.</p>
          </aside>
        </section>

        <CurriculumSiblingNav previous={context.previousActiveSibling} parent={context.parent} next={context.nextActiveSibling} accentRgb="52, 211, 153" />
      </div>
    </main>
  );
}
