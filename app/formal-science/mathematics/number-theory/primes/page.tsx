import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import { ArrowRight, Asterisk, Binary, Divide, Fingerprint, Sigma } from "lucide-react";
import DivisibilityLab from "./DivisibilityLab";

const NODE_ID = "formal.mathematics.number-theory.primes";

const QUESTIONS = [
  {
    icon: Divide,
    label: "Divisibility",
    question: "Which integers divide which others exactly?",
    detail: "Divisibility relations lead to gcds, lcms, prime factors, arithmetic functions, and solvability conditions for integer equations.",
    rgb: "52, 211, 153",
  },
  {
    icon: Asterisk,
    label: "Primality",
    question: "Which integers have no nontrivial positive divisors?",
    detail: "Prime numbers are the irreducible multiplicative building blocks of positive integers under unique factorization.",
    rgb: "250, 204, 21",
  },
  {
    icon: Fingerprint,
    label: "Factorization",
    question: "How does an integer decompose into primes?",
    detail: "Prime exponents encode divisor structure, gcds, lcms, Euler's totient, and many multiplicative arithmetic functions.",
    rgb: "167, 139, 250",
  },
  {
    icon: Sigma,
    label: "Distribution",
    question: "How frequently do primes appear among large integers?",
    detail: "Primes become sparser, but their distribution follows deep asymptotic patterns studied through the prime-counting function π(x).",
    rgb: "56, 189, 248",
  },
] as const;

const FACTS = [
  ["Infinitely many primes", "Euclid's classical argument shows that no finite list of primes can contain them all."],
  ["Prime Number Theorem", "The number of primes up to x satisfies π(x) ~ x / log x as x grows, describing the first-order decline in prime density."],
  ["Unique factorization", "Every integer greater than 1 factors uniquely into primes, apart from the order of those prime factors."],
  ["Primality vs factorization", "Testing whether a number is prime and finding its prime factors are different computational problems; efficient primality tests exist even when factoring large integers remains difficult."],
] as const;

export default function PrimesDivisibilityPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#04100c] text-slate-100 selection:bg-emerald-300/25">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_18%,rgba(52,211,153,0.11),transparent_29%),radial-gradient(circle_at_16%_82%,rgba(167,139,250,0.055),transparent_28%),linear-gradient(to_bottom,#04100c,#030b08_62%,#020806)]" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.10] [background-image:linear-gradient(rgba(110,231,183,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(110,231,183,0.08)_1px,transparent_1px)] [background-size:38px_38px] [mask-image:linear-gradient(to_bottom,black,transparent_91%)]" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1540px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#04100c]/80 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Divisibility · gcd · primes · factorization"
            eyebrowStyle="rule"
            icon={Asterisk}
            title={<span>Primes & Divisibility</span>}
            subtitle="Primes and divisibility expose the multiplicative structure of the integers. Greatest common divisors, prime factorization, divisor functions, and the distribution of primes connect elementary arithmetic to some of number theory's deepest questions."
            accentRgb="52, 211, 153"
            titleClassName="font-sans text-[clamp(2.8rem,5.4vw,6rem)] font-semibold leading-[0.84] tracking-[-0.066em] text-[#f2fff9]"
            headerClassName="border-emerald-100/[0.10]"
          />
        </div>

        <section className="mt-5 overflow-hidden rounded-[30px] border border-emerald-200/[0.10] bg-black/[0.15] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_410px] lg:items-end sm:px-6">
            <div><div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-200/62"><Binary size={13} /> Multiplicative structure</div><h2 className="mt-2 text-[clamp(1.9rem,3.6vw,3.3rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">Divisibility turns the number line into a network of factors and multiples.</h2></div>
            <p className="text-[12px] leading-6 text-slate-400">Addition orders integers along a line. Multiplication reveals another structure entirely: primes, common divisors, factor lattices, and residue behavior organize integers by how they combine.</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4">
            {QUESTIONS.map((item, index) => {
              const Icon = item.icon;
              return <article key={item.label} className="min-h-[220px] border-b border-white/[0.06] px-5 py-5 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0"><div className="flex items-center justify-between gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full border" style={{ color: `rgb(${item.rgb})`, borderColor: `rgba(${item.rgb},0.22)` }}><Icon size={14} /></span><span className="font-mono text-[8px] text-slate-700">0{index + 1}</span></div><h3 className="mt-5 text-[14px] font-semibold text-white">{item.label}</h3><div className="mt-1 font-mono text-[8px] uppercase tracking-[0.08em]" style={{ color: `rgba(${item.rgb},0.58)` }}>{item.question}</div><p className="mt-3 text-[10px] leading-5 text-slate-600">{item.detail}</p></article>;
            })}
          </div>
        </section>

        <div className="mt-5"><DivisibilityLab /></div>

        <section className="mt-6 overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-end sm:px-6"><div><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-200/50">Prime facts</div><h2 className="mt-2 text-[clamp(1.7rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">Simple definitions, subtle distribution.</h2></div><p className="text-[11px] leading-5 text-slate-500">Primes are easy to define and endlessly numerous, but their locations among the integers exhibit patterns that connect arithmetic to analysis and computation.</p></div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4">{FACTS.map(([term, detail], index) => <div key={term} className="min-h-[185px] border-b border-white/[0.06] px-4 py-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0"><span className="font-mono text-[8px] text-emerald-200/34">0{index + 1}</span><strong className="mt-4 block text-[12px] text-white/82">{term}</strong><p className="mt-2 text-[10px] leading-5 text-slate-600">{detail}</p></div>)}</div>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          <Neighbor href="/formal-science/mathematics/number-theory" label="Number Theory" note="Return to the integer-structure hub." rgb="167, 139, 250" />
          <Neighbor href="/formal-science/mathematics/number-theory/diophantine" label="Diophantine Equations" note="Use gcd structure to decide integer solvability." rgb="244, 114, 182" />
          <Neighbor href="/formal-science/mathematics/algebra/abstract-algebra" label="Abstract Algebra" note="Generalize divisibility and factorization into rings and fields." rgb="96, 165, 250" />
        </section>
      </div>
    </main>
  );
}

function Neighbor({ href, label, note, rgb }: { href: string; label: string; note: string; rgb: string }) {
  return <Link href={href} className="group flex min-h-[82px] items-center gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.12] px-4 py-3 backdrop-blur-md transition hover:bg-white/[0.025]"><span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: `rgb(${rgb})`, boxShadow: `0 0 18px rgba(${rgb},0.22)` }} /><span className="min-w-0 flex-1"><strong className="block text-[12px] text-white/82">{label}</strong><span className="mt-1 block text-[10px] leading-4 text-slate-600">{note}</span></span><ArrowRight size={12} className="text-slate-600 transition group-hover:translate-x-1" /></Link>;
}
