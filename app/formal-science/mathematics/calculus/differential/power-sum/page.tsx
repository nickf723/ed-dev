import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { ArrowLeft, ArrowRight, Sigma, TriangleAlert } from "lucide-react";
import PowerBackground from "./_components/PowerBackground";
import PowerRuleLab from "./_components/PowerRuleLab";
import PowerRulePractice from "./_components/PowerRulePractice";

const RULES = [
  { title: "Power", formula: `\\frac{d}{dx}(x^n)=nx^{n-1}`, note: "For the positive-integer polynomial powers explored here, the old exponent becomes a coefficient and the exponent decreases by one." },
  { title: "Constant multiple", formula: `\\frac{d}{dx}[c f(x)]=c f'(x)`, note: "A fixed multiplier scales every local rate by the same factor." },
  { title: "Sum / difference", formula: `\\frac{d}{dx}[f(x)\\pm g(x)]=f'(x)\\pm g'(x)`, note: "Addition and subtraction let derivative work distribute term by term." },
  { title: "Constant", formula: `\\frac{d}{dx}(C)=0`, note: "A constant function does not change as x changes, so its local rate is zero." },
] as const;

export default function PowerRulePage() {
  return (
    <SceneFrame
      background={<PowerBackground />}
      className="bg-[#090501] text-slate-100 selection:bg-orange-300/25"
      maxWidthClassName="max-w-[1240px]"
      headerBackground="rgba(9,5,1,0.62)"
      header={
        <DomainPageHeader
          breadcrumbs={[
            { label: "Mathematics", href: "/formal-science/mathematics" },
            { label: "Calculus", href: "/formal-science/mathematics/calculus" },
            { label: "Differential Calculus", href: "/formal-science/mathematics/calculus/differential" },
            { label: "Power & Sum Rules" },
          ]}
          eyebrow="Slope evidence · powers · linearity · polynomial derivatives"
          eyebrowStyle="rule"
          icon={Sigma}
          title={<span>Power &amp; Sum Rules</span>}
          subtitle="Measure local slopes of power functions, identify the reusable pattern, then differentiate polynomial terms without rebuilding the limit definition from scratch each time."
          accentRgb="249, 115, 22"
          titleClassName="font-sans text-[clamp(2.45rem,4.8vw,5.3rem)] font-semibold leading-[0.86] tracking-[-0.06em] text-[#fff7ed]"
          headerClassName="border-orange-100/[0.10]"
        />
      }
    >
      <section className="mt-5 max-w-4xl">
        <div className="font-mono text-[12px] font-semibold uppercase tracking-[0.09em] text-orange-200/62">01 · Phenomenon</div>
        <h2 className="mt-2 text-[clamp(1.9rem,3.7vw,3.5rem)] font-semibold leading-[0.95] tracking-[-0.052em] text-white">At x = 1, tiny secants on x², x³, and x⁴ approach slopes 2, 3, and 4.</h2>
        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-300/72">The exponent seems to be showing up inside the slope. Is that only a coincidence at x = 1, or can one algebraic expression reproduce the local slopes everywhere?</p>
      </section>

      <section className="mt-8">
        <div className="mb-3 font-mono text-[12px] font-semibold uppercase tracking-[0.09em] text-orange-200/62">02 · Slope sandbox</div>
        <PowerRuleLab />
      </section>

      <section className="mt-10 border-t border-orange-100/[0.09] pt-6">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          <div>
            <div className="font-mono text-[12px] font-semibold uppercase tracking-[0.09em] text-pink-200/56">03 · Name the pattern</div>
            <h2 className="mt-2 text-[clamp(1.8rem,3.3vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">The derivative of a power is another power with one less degree.</h2>
            <p className="mt-4 max-w-3xl text-[14px] leading-7 text-slate-300/72">For the polynomial powers explored in the sandbox, the slope measurements fit a compact rule: multiply by the old exponent, then reduce that exponent by one. This is the <strong className="text-orange-100">power rule</strong>.</p>
            <p className="mt-3 max-w-3xl text-[14px] leading-7 text-slate-400/72">The rule is a shortcut built on derivative structure, not a replacement for what a derivative means. It produces the function whose value gives the original function's local rate of change.</p>
          </div>
          <Surface variant="glass" className="rounded-[24px] border-orange-100/[0.10] p-5" style={{ background: "rgba(20,8,2,0.23)" }}>
            <div className="font-mono text-[10px] uppercase tracking-[0.07em] text-orange-200/52">Power rule</div>
            <div className="mt-4 overflow-x-auto rounded-[15px] border border-white/[0.06] bg-black/[0.10] p-4 text-center text-[20px] text-orange-50"><M display>{`\\frac{d}{dx}(x^n)=nx^{n-1}`}</M></div>
            <p className="mt-3 text-[11px] leading-5 text-slate-500">This lesson focuses on positive-integer powers used in polynomials. Broader versions of the power rule require attention to domains and how powers are defined.</p>
          </Surface>
        </div>
      </section>

      <section className="mt-10">
        <div className="font-mono text-[12px] font-semibold uppercase tracking-[0.09em] text-amber-200/56">04 · Formal structure</div>
        <h2 className="mt-2 max-w-4xl text-[clamp(1.7rem,3vw,2.7rem)] font-semibold tracking-[-0.044em] text-white">Polynomials become manageable because differentiation respects scaling and addition.</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {RULES.map((rule) => (
            <div key={rule.title} className="rounded-[20px] border border-white/[0.07] bg-black/[0.07] p-4 backdrop-blur-[10px]">
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.07em] text-orange-200/52">{rule.title}</div>
              <div className="mt-3 overflow-x-auto rounded-[13px] border border-white/[0.055] bg-black/[0.08] px-3 py-3 text-[16px] text-orange-50"><M display>{rule.formula}</M></div>
              <p className="mt-3 text-[12px] leading-5 text-slate-400/72">{rule.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="font-mono text-[12px] font-semibold uppercase tracking-[0.09em] text-cyan-200/54">05 · Worked derivative</div>
        <div className="mt-4 overflow-hidden rounded-[26px] border border-cyan-100/[0.09] bg-[#060d10]/62 backdrop-blur-xl">
          <div className="border-b border-white/[0.07] p-5 sm:p-6">
            <div className="text-[12px] font-semibold text-white/82">Differentiate</div>
            <div className="mt-3 text-[20px] text-cyan-50"><M display>{`f(x)=3x^4-2x^2+5x-7`}</M></div>
          </div>

          <div className="p-5 sm:p-6">
            <DerivationRow number="01" equation={`3x^4-2x^2+5x-7`} note="Start with the original polynomial." />
            <ProcessRow number="01.5" title="Differentiate each term independently" text="Use the power rule on the power terms, d/dx(x)=1 on the linear term, and d/dx(constant)=0." />
            <DerivationRow number="02" equation={`3(4x^3)-2(2x)+5(1)-0`} note="The original coefficients stay as multipliers." />
            <ProcessRow number="02.5" title="Multiply the coefficients and simplify" text="The derivative is already assembled term by term; now only arithmetic remains." />
            <DerivationRow number="03" equation={`f'(x)=12x^3-4x+5`} note="This new function returns the local slope of f at each x." final />
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="font-mono text-[12px] font-semibold uppercase tracking-[0.09em] text-amber-200/56">06 · Common pitfall</div>
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          <div className="rounded-[20px] border border-amber-200/[0.10] bg-amber-300/[0.018] p-5">
            <div className="flex items-center gap-2"><TriangleAlert size={15} className="text-amber-200/70" /><strong className="text-[14px] text-white/86">The exponent does not stay the same.</strong></div>
            <div className="mt-4 grid gap-2 font-mono text-[15px]"><span className="text-red-200/62">wrong: x⁵ → 5x⁵</span><span className="text-emerald-200/78">power rule: x⁵ → 5x⁴</span></div>
            <p className="mt-3 text-[12px] leading-5 text-slate-400/72">The old exponent does two jobs: it becomes a coefficient and the remaining power drops by one.</p>
          </div>
          <div className="rounded-[20px] border border-pink-200/[0.10] bg-pink-300/[0.018] p-5">
            <div className="flex items-center gap-2"><TriangleAlert size={15} className="text-pink-200/70" /><strong className="text-[14px] text-white/86">Term-by-term differentiation works for sums, not products.</strong></div>
            <p className="mt-4 text-[12px] leading-6 text-slate-400/72">If terms are added or subtracted, differentiate each term. If two changing functions are multiplied, <M>{`(fg)'`}</M> is not generally <M>{`f'g'`}</M>. That is why the Product Rule needs its own lesson.</p>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-3 font-mono text-[12px] font-semibold uppercase tracking-[0.09em] text-emerald-200/54">07 · Application</div>
        <PowerRulePractice />
      </section>

      <nav className="mt-10 grid gap-3 border-t border-white/[0.07] pt-5 sm:grid-cols-2" aria-label="Differential calculus sequence">
        <Link href="/formal-science/mathematics/calculus/differential/definition" className="group rounded-[18px] border border-white/[0.07] bg-black/[0.07] p-4 transition hover:bg-black/[0.13]"><span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.07em] text-slate-500"><ArrowLeft size={12} /> Previous</span><strong className="mt-2 block text-[14px] text-white/84">Derivative Definition</strong></Link>
        <Link href="/formal-science/mathematics/calculus/differential/product-rule" className="group rounded-[18px] border border-orange-200/[0.10] bg-orange-300/[0.02] p-4 text-right transition hover:bg-orange-300/[0.04]"><span className="flex items-center justify-end gap-2 font-mono text-[10px] uppercase tracking-[0.07em] text-orange-200/56">Next <ArrowRight size={12} /></span><strong className="mt-2 block text-[14px] text-white/84">Product Rule</strong></Link>
      </nav>
    </SceneFrame>
  );
}

function DerivationRow({ number, equation, note, final = false }: { number: string; equation: string; note: string; final?: boolean }) {
  return <div className={`grid gap-3 border-b border-white/[0.06] py-4 last:border-b-0 lg:grid-cols-[64px_minmax(0,1fr)_280px] lg:items-center ${final ? "bg-emerald-300/[0.018]" : ""}`}><span className="font-mono text-[10px] text-cyan-200/46">{number}</span><div className={`overflow-x-auto text-[19px] ${final ? "text-emerald-100" : "text-white"}`}><M display>{equation}</M></div><p className="text-[12px] leading-5 text-slate-400/72">{note}</p></div>;
}

function ProcessRow({ number, title, text }: { number: string; title: string; text: string }) {
  return <div className="grid gap-3 border-b border-white/[0.045] bg-black/[0.045] py-3 lg:grid-cols-[64px_minmax(0,1fr)_280px] lg:items-center"><span className="font-mono text-[10px] text-orange-200/42">{number}</span><strong className="text-[12px] text-orange-100/78">{title}</strong><p className="text-[11px] leading-5 text-slate-500">{text}</p></div>;
}
