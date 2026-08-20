import DomainPageHeader from "@/app/_components/DomainPageHeader";
import CurriculumSiblingNav from "@/app/_components/CurriculumSiblingNav";
import { M } from "@/app/_components/Math";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import { ArrowLeftRight, Infinity as InfinityIcon, Split } from "lucide-react";
import InfinityBackground from "./_components/InfinityBackground";
import InfiniteLab from "./_components/InfiniteLab";

const NODE_ID = "formal.mathematics.calculus.limits.infinity";

const EXAMPLES = [
  {
    formula: `\\frac{1}{x}`,
    left: `-\\infty`,
    right: `+\\infty`,
    note: "The one-sided limits have opposite signs. There is no single two-sided extended limit at zero.",
  },
  {
    formula: `\\frac{1}{x^2}`,
    left: `+\\infty`,
    right: `+\\infty`,
    note: "Both sides grow without bound in the positive direction, so the two-sided infinite-limit statement is meaningful.",
  },
] as const;

const DISTINCTIONS = [
  ["Unbounded near a point", "An infinite limit describes arbitrarily large magnitude in a punctured neighborhood of the input. It does not assign the function a value of infinity."],
  ["One-sided sign matters", "The symbols +∞ and −∞ describe direction of unbounded growth. Left and right behavior must be checked independently."],
  ["Vertical asymptote", "The line x = a is a vertical asymptote when at least one one-sided limit as x approaches a is +∞ or −∞."],
  ["Undefined point", "A function can be undefined at the asymptote and still have precise one-sided limit statements describing its nearby behavior."],
] as const;

export default function InfiniteLimitsPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#080511] text-slate-100 selection:bg-violet-300/25">
      <InfinityBackground />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_14%,rgba(139,92,246,0.11),transparent_29%),radial-gradient(circle_at_18%_84%,rgba(59,130,246,0.04),transparent_28%),linear-gradient(to_bottom,rgba(8,5,17,0.08),rgba(8,5,17,0.80)_78%,rgba(5,3,11,0.98))]" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1460px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#080511]/80 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Unbounded behavior · one-sided limits · vertical asymptotes"
            eyebrowStyle="rule"
            icon={InfinityIcon}
            title={<span>Infinite Limits</span>}
            subtitle="Infinite limits describe function values that grow beyond every finite bound as the input approaches a point. They are statements about nearby behavior and direction of growth, not claims that the function actually takes the value infinity."
            accentRgb="139, 92, 246"
            titleClassName="font-sans text-[clamp(3rem,5.7vw,6.2rem)] font-semibold leading-[0.83] tracking-[-0.067em] text-[#fbf8ff]"
            headerClassName="border-violet-100/[0.10]"
          />
        </div>

        <section className="mt-5 overflow-hidden rounded-[30px] border border-violet-200/[0.10] bg-black/[0.14] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end sm:px-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/52"><ArrowLeftRight size={13} /> One-sided behavior first</div>
              <h2 className="mt-2 text-[clamp(1.9rem,3.5vw,3.2rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">A vertical asymptote can look completely different from its two sides.</h2>
            </div>
            <p className="text-[12px] leading-6 text-slate-400">Approaching from the left and right are separate experiments. A two-sided statement is justified only after those one-sided behaviors are compatible.</p>
          </div>
          <div className="grid lg:grid-cols-2">
            {EXAMPLES.map((example, index) => (
              <article key={example.formula} className="min-h-[215px] border-b border-white/[0.06] p-5 lg:border-b-0 lg:border-r lg:last:border-r-0 sm:p-6">
                <div className="flex items-center justify-between gap-3"><span className="font-mono text-[8px] text-violet-200/28">0{index + 1}</span><M>{example.formula}</M></div>
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <div className="rounded-[13px] border border-white/[0.06] bg-black/[0.10] p-3"><div className="font-mono text-[7px] uppercase text-slate-700">x → 0⁻</div><div className="mt-1 text-[18px] text-white/82"><M>{example.left}</M></div></div>
                  <div className="rounded-[13px] border border-white/[0.06] bg-black/[0.10] p-3"><div className="font-mono text-[7px] uppercase text-slate-700">x → 0⁺</div><div className="mt-1 text-[18px] text-white/82"><M>{example.right}</M></div></div>
                </div>
                <p className="mt-4 text-[10px] leading-5 text-slate-600">{example.note}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-6"><InfiniteLab /></div>

        <section className="mt-6 overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-end sm:px-6">
            <div><div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-200/44"><Split size={13} /> Four distinctions</div><h2 className="mt-2 text-[clamp(1.7rem,3vw,2.7rem)] font-semibold tracking-[-0.045em] text-white">Infinity notation summarizes a trend, not a destination.</h2></div>
            <p className="text-[11px] leading-5 text-slate-500">The most common errors come from treating ∞ as an ordinary number or skipping one-sided analysis near a singular point.</p>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4">
            {DISTINCTIONS.map(([name, detail], index) => (
              <article key={name} className="min-h-[180px] border-b border-white/[0.06] px-5 py-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0">
                <span className="font-mono text-[8px] text-cyan-200/26">0{index + 1}</span>
                <h3 className="mt-3 text-[12px] font-semibold text-white/84">{name}</h3>
                <p className="mt-2 text-[10px] leading-5 text-slate-600">{detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
          <div className="rounded-[28px] border border-white/[0.08] bg-black/[0.13] p-5 backdrop-blur-xl sm:p-6">
            <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/42">Formal reading</div>
            <h2 className="mt-2 text-[23px] font-semibold tracking-[-0.04em] text-white">“Tends to +∞” means eventually larger than every chosen bound.</h2>
            <p className="mt-3 text-[11px] leading-5 text-slate-500">For a right-hand limit such as <M>{`\\lim_{x\\to a^+} f(x)=+\\infty`}</M>, the formal statement says that for every real bound M, there is a sufficiently small right-hand neighborhood of a in which f(x) exceeds M.</p>
          </div>
          <aside className="rounded-[28px] border border-amber-200/[0.08] bg-black/[0.13] p-5 backdrop-blur-xl sm:p-6">
            <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-200/42">Do not substitute x = a</div>
            <p className="mt-3 text-[11px] leading-5 text-slate-500">If the formula contains division by zero at a, that explains why direct evaluation fails. The limit question remains about nearby values, so undefined f(a) does not by itself determine the one-sided or two-sided limit behavior.</p>
          </aside>
        </section>

        <CurriculumSiblingNav previous={context.previousActiveSibling} parent={context.parent} next={context.nextActiveSibling} accentRgb="139, 92, 246" />
      </div>
    </main>
  );
}
