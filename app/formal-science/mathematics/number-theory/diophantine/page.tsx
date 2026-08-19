import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import { ArrowRight, Brackets, CircleDot, Grid3X3, Sigma, Triangle } from "lucide-react";
import DiophantineBackground from "./_components/DiophantineBackground";
import DiophantineLab from "./_components/DiophantineLab";

const NODE_ID = "formal.mathematics.number-theory.diophantine";

const FAMILIES = [
  {
    icon: Grid3X3,
    label: "Linear equations",
    equation: "ax + by = c",
    detail: "Integer solvability is completely controlled by gcd(a,b): solutions exist exactly when gcd(a,b) divides c.",
    rgb: "52, 211, 153",
  },
  {
    icon: Triangle,
    label: "Pythagorean triples",
    equation: "x² + y² = z²",
    detail: "Primitive positive solutions admit a parameterization, showing how arithmetic restrictions can organize all integer points on a familiar curve.",
    rgb: "56, 189, 248",
  },
  {
    icon: CircleDot,
    label: "Pell equations",
    equation: "x² − Dy² = 1",
    detail: "For nonsquare positive D, solutions connect continued fractions, units in quadratic number fields, and infinite families of integer points.",
    rgb: "250, 204, 21",
  },
  {
    icon: Sigma,
    label: "General polynomial equations",
    equation: "P(x₁,…,xₙ) = 0",
    detail: "Restricting polynomial equations to integer solutions leads to deep arithmetic geometry and, in full generality, undecidability.",
    rgb: "192, 132, 252",
  },
] as const;

const PRINCIPLES = [
  ["Real solvability is not integer solvability", "A polynomial may have many real or rational points and still have no integer solution. The arithmetic domain is part of the problem."],
  ["Local obstructions can rule out solutions", "Reducing an equation modulo carefully chosen integers can prove that no integer solution exists, because every integer solution would have to satisfy the reduced congruence."],
  ["Parameterizations are exceptional power", "Some Diophantine families admit formulas generating all solutions, such as primitive Pythagorean triples. Many nonlinear equations do not have such simple classifications."],
  ["Hilbert's tenth problem is undecidable", "The Matiyasevich–Davis–Putnam–Robinson theorem implies there is no algorithm that can decide, for every polynomial equation with integer coefficients, whether an integer solution exists."],
] as const;

export default function DiophantinePage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#07050a] text-slate-100 selection:bg-rose-400/25">
      <DiophantineBackground />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_18%,rgba(251,113,133,0.11),transparent_29%),radial-gradient(circle_at_16%_82%,rgba(250,204,21,0.045),transparent_28%),linear-gradient(to_bottom,rgba(7,5,10,0.08),rgba(7,5,10,0.74)_72%,rgba(7,5,10,0.96))]" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1540px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#07050a]/80 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Integer points · gcd obstructions · polynomial equations"
            eyebrowStyle="rule"
            icon={Brackets}
            title={<span>Diophantine Equations</span>}
            subtitle="Diophantine equations ask for solutions in integers or another specified arithmetic domain. That restriction turns ordinary equations into questions about divisibility, congruences, parameterization, integer points on curves, and the limits of algorithmic solvability."
            accentRgb="251, 113, 133"
            titleClassName="font-sans text-[clamp(2.8rem,5.4vw,6rem)] font-semibold leading-[0.84] tracking-[-0.066em] text-[#fff7f8]"
            headerClassName="border-rose-100/[0.10]"
          />
        </div>

        <section className="mt-5 overflow-hidden rounded-[30px] border border-rose-200/[0.10] bg-black/[0.15] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_410px] lg:items-end sm:px-6">
            <div><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-rose-200/62">Arithmetic geometry on a lattice</div><h2 className="mt-2 text-[clamp(1.9rem,3.6vw,3.3rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">The equation describes a geometric object; the integer lattice decides which of its points count.</h2></div>
            <p className="text-[12px] leading-6 text-slate-400">For linear equations, gcd structure completely resolves solvability. For nonlinear equations, the same basic question can become dramatically deeper.</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4">
            {FAMILIES.map((item, index) => {
              const Icon = item.icon;
              return <article key={item.label} className="min-h-[220px] border-b border-white/[0.06] px-5 py-5 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0"><div className="flex items-center justify-between gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full border" style={{ color: `rgb(${item.rgb})`, borderColor: `rgba(${item.rgb},0.22)` }}><Icon size={14} /></span><span className="font-mono text-[8px] text-slate-700">0{index + 1}</span></div><h3 className="mt-5 text-[14px] font-semibold text-white">{item.label}</h3><div className="mt-1 font-mono text-[9px]" style={{ color: `rgba(${item.rgb},0.60)` }}>{item.equation}</div><p className="mt-3 text-[10px] leading-5 text-slate-600">{item.detail}</p></article>;
            })}
          </div>
        </section>

        <div className="mt-5"><DiophantineLab /></div>

        <section className="mt-6 overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_410px] lg:items-end sm:px-6"><div><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-200/50">Problem-solving principles</div><h2 className="mt-2 text-[clamp(1.7rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">Integer restrictions create both powerful obstructions and deep unknowns.</h2></div><p className="text-[11px] leading-5 text-slate-500">A Diophantine problem can mix algebraic identities, modular arithmetic, gcds, inequalities, infinite descent, geometry, analysis, and computation depending on the equation.</p></div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4">{PRINCIPLES.map(([term, detail], index) => <div key={term} className="min-h-[205px] border-b border-white/[0.06] px-4 py-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0"><span className="font-mono text-[8px] text-rose-200/34">0{index + 1}</span><strong className="mt-4 block text-[12px] text-white/82">{term}</strong><p className="mt-2 text-[10px] leading-5 text-slate-600">{detail}</p></div>)}</div>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          <Neighbor href="/formal-science/mathematics/number-theory" label="Number Theory" note="Return to the integer-structure hub." rgb="167, 139, 250" />
          <Neighbor href="/formal-science/mathematics/number-theory/primes" label="Primes & Divisibility" note="Use gcds and factorization as arithmetic obstructions." rgb="52, 211, 153" />
          <Neighbor href="/formal-science/mathematics/number-theory/modular" label="Modular Arithmetic" note="Rule out or organize solutions through congruences." rgb="167, 139, 250" />
        </section>
      </div>
    </main>
  );
}

function Neighbor({ href, label, note, rgb }: { href: string; label: string; note: string; rgb: string }) {
  return <Link href={href} className="group flex min-h-[82px] items-center gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.12] px-4 py-3 backdrop-blur-md transition hover:bg-white/[0.025]"><span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: `rgb(${rgb})`, boxShadow: `0 0 18px rgba(${rgb},0.22)` }} /><span className="min-w-0 flex-1"><strong className="block text-[12px] text-white/82">{label}</strong><span className="mt-1 block text-[10px] leading-4 text-slate-600">{note}</span></span><ArrowRight size={12} className="text-slate-600 transition group-hover:translate-x-1" /></Link>;
}
