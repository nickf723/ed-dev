import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import { ArrowRight, CircleDot, Grid3X3, Repeat2, RotateCw, Sigma } from "lucide-react";
import ModularLoom from "../ModularLoom";

const NODE_ID = "formal.mathematics.number-theory.modular";

const IDEAS = [
  {
    icon: Repeat2,
    label: "Residue classes",
    question: "Which integers are equivalent modulo n?",
    detail: "Integers a and b are congruent modulo n when n divides a − b. Congruence partitions all integers into n residue classes.",
    rgb: "167, 139, 250",
  },
  {
    icon: CircleDot,
    label: "Units",
    question: "Which residues can be divided by?",
    detail: "A residue a has a multiplicative inverse modulo n exactly when gcd(a,n)=1. Those invertible classes form the unit group modulo n.",
    rgb: "45, 212, 191",
  },
  {
    icon: RotateCw,
    label: "Periodicity",
    question: "Why do powers and sequences repeat?",
    detail: "Finite residue systems force repeated states, while group structure constrains cycles of powers and multiplicative orders.",
    rgb: "250, 204, 21",
  },
  {
    icon: Grid3X3,
    label: "Reconstruction",
    question: "Can several congruences determine one residue?",
    detail: "The Chinese Remainder Theorem combines compatible information modulo pairwise coprime moduli into a unique class modulo their product.",
    rgb: "96, 165, 250",
  },
] as const;

const THEOREMS = [
  ["Euler's theorem", "If gcd(a,n)=1, then a^φ(n) ≡ 1 (mod n). The exponent φ(n) counts invertible residue classes modulo n."],
  ["Fermat's little theorem", "If p is prime and p does not divide a, then a^(p−1) ≡ 1 (mod p). It is a prime-modulus special case of the broader group phenomenon."],
  ["Chinese Remainder Theorem", "For pairwise coprime moduli n₁,…,nₖ, any chosen residue modulo each nᵢ corresponds to exactly one residue class modulo n₁···nₖ."],
  ["Cancellation needs invertibility", "From ac ≡ bc (mod n), cancelling c is valid when c is a unit modulo n. Without invertibility, cancellation can fail."],
] as const;

export default function ModularArithmeticPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#090615] text-slate-100 selection:bg-violet-400/25">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_18%,rgba(139,92,246,0.12),transparent_29%),radial-gradient(circle_at_16%_82%,rgba(45,212,191,0.055),transparent_28%),linear-gradient(to_bottom,#090615,#070410_62%,#04030a)]" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.10] [background-image:radial-gradient(circle_at_center,rgba(196,181,253,0.18)_1px,transparent_1.2px)] [background-size:34px_34px] [mask-image:linear-gradient(to_bottom,black,transparent_91%)]" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1540px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#090615]/80 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Congruence · residues · inverses · periodicity"
            eyebrowStyle="rule"
            icon={Repeat2}
            title={<span>Modular Arithmetic</span>}
            subtitle="Modular arithmetic studies integers through their remainder classes. Addition and multiplication descend consistently to these finite systems, where invertibility, periodicity, and reconstruction theorems reveal algebraic structure hidden inside ordinary arithmetic."
            accentRgb="167, 139, 250"
            titleClassName="font-sans text-[clamp(2.8rem,5.4vw,6rem)] font-semibold leading-[0.84] tracking-[-0.066em] text-[#fbf8ff]"
            headerClassName="border-violet-100/[0.10]"
          />
        </div>

        <section className="mt-5 overflow-hidden rounded-[30px] border border-violet-200/[0.10] bg-black/[0.15] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_410px] lg:items-end sm:px-6">
            <div><div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/62"><Sigma size={13} /> Finite arithmetic from infinite integers</div><h2 className="mt-2 text-[clamp(1.9rem,3.6vw,3.3rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">Reduce by remainder, then preserve the operations that respect that equivalence.</h2></div>
            <p className="text-[12px] leading-6 text-slate-400">Congruence is not simply “wrapping a number around a clock.” It is an equivalence relation compatible with addition and multiplication, so arithmetic can be performed directly on residue classes.</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4">
            {IDEAS.map((item, index) => {
              const Icon = item.icon;
              return <article key={item.label} className="min-h-[220px] border-b border-white/[0.06] px-5 py-5 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0"><div className="flex items-center justify-between gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full border" style={{ color: `rgb(${item.rgb})`, borderColor: `rgba(${item.rgb},0.22)` }}><Icon size={14} /></span><span className="font-mono text-[8px] text-slate-700">0{index + 1}</span></div><h3 className="mt-5 text-[14px] font-semibold text-white">{item.label}</h3><div className="mt-1 font-mono text-[8px] uppercase tracking-[0.08em]" style={{ color: `rgba(${item.rgb},0.58)` }}>{item.question}</div><p className="mt-3 text-[10px] leading-5 text-slate-600">{item.detail}</p></article>;
            })}
          </div>
        </section>

        <div className="mt-5"><ModularLoom /></div>

        <section className="mt-6 overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-end sm:px-6"><div><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-200/50">Core theorems</div><h2 className="mt-2 text-[clamp(1.7rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">Finite residue systems turn arithmetic into algebra.</h2></div><p className="text-[11px] leading-5 text-slate-500">These results connect gcds, group structure, powers, and simultaneous congruences. They are useful far beyond cryptography.</p></div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4">{THEOREMS.map(([term, detail], index) => <div key={term} className="min-h-[195px] border-b border-white/[0.06] px-4 py-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0"><span className="font-mono text-[8px] text-violet-200/34">0{index + 1}</span><strong className="mt-4 block text-[12px] text-white/82">{term}</strong><p className="mt-2 text-[10px] leading-5 text-slate-600">{detail}</p></div>)}</div>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          <Neighbor href="/formal-science/mathematics/number-theory" label="Number Theory" note="Return to the integer-structure hub." rgb="167, 139, 250" />
          <Neighbor href="/formal-science/mathematics/number-theory/primes" label="Primes & Divisibility" note="Use gcd and prime factorization to analyze units and φ(n)." rgb="52, 211, 153" />
          <Neighbor href="/formal-science/mathematics/algebra/abstract-algebra/group-theory" label="Group Theory" note="The units modulo n form a finite group under multiplication." rgb="250, 204, 21" />
        </section>
      </div>
    </main>
  );
}

function Neighbor({ href, label, note, rgb }: { href: string; label: string; note: string; rgb: string }) {
  return <Link href={href} className="group flex min-h-[82px] items-center gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.12] px-4 py-3 backdrop-blur-md transition hover:bg-white/[0.025]"><span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: `rgb(${rgb})`, boxShadow: `0 0 18px rgba(${rgb},0.22)` }} /><span className="min-w-0 flex-1"><strong className="block text-[12px] text-white/82">{label}</strong><span className="mt-1 block text-[10px] leading-4 text-slate-600">{note}</span></span><ArrowRight size={12} className="text-slate-600 transition group-hover:translate-x-1" /></Link>;
}
