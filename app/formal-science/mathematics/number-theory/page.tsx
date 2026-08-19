import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  Asterisk,
  ArrowRight,
  Brackets,
  Fingerprint,
  Grid3X3,
  KeyRound,
  Repeat2,
  Sigma,
  type LucideIcon,
} from "lucide-react";
import NumberTheoryBackground from "./_components/NumberTheoryBackground";
import PrimeLab from "./_components/PrimeLab";

const NODE_ID = "formal.mathematics.number-theory";

type BranchMeta = {
  icon: LucideIcon;
  code: string;
  question: string;
  rgb: string;
};

const BRANCH_META: Record<string, BranchMeta> = {
  "formal.mathematics.number-theory.primes": {
    icon: Asterisk,
    code: "PRI",
    question: "How do integers decompose, divide, and distribute?",
    rgb: "52, 211, 153",
  },
  "formal.mathematics.number-theory.modular": {
    icon: Repeat2,
    code: "MOD",
    question: "What structure appears when integers are grouped by remainder?",
    rgb: "167, 139, 250",
  },
  "formal.mathematics.number-theory.diophantine": {
    icon: Brackets,
    code: "DIO",
    question: "Which equations have integer solutions?",
    rgb: "244, 114, 182",
  },
  "formal.mathematics.number-theory.cryptography": {
    icon: KeyRound,
    code: "CRY",
    question: "How can arithmetic structure support cryptographic constructions?",
    rgb: "56, 189, 248",
  },
};

const STRUCTURE = [
  {
    icon: Fingerprint,
    label: "Factorization",
    detail: "Every integer greater than 1 decomposes uniquely into prime factors, up to ordering.",
    notation: "n = p₁ᵃ¹ ··· pₖᵃᵏ",
    rgb: "52, 211, 153",
  },
  {
    icon: Grid3X3,
    label: "Divisibility",
    detail: "Greatest common divisors and divisibility organize when linear combinations and integer equations can exist.",
    notation: "gcd(a,b)",
    rgb: "250, 204, 21",
  },
  {
    icon: Repeat2,
    label: "Congruence",
    detail: "Arithmetic modulo n groups integers that have the same remainder and creates finite arithmetic systems.",
    notation: "a ≡ b (mod n)",
    rgb: "167, 139, 250",
  },
  {
    icon: Sigma,
    label: "Integer solutions",
    detail: "Restricting equations to integer solutions turns familiar algebra into arithmetic questions with new obstructions and structure.",
    notation: "ax + by = c",
    rgb: "244, 114, 182",
  },
] as const;

const PRINCIPLES = [
  ["Unique factorization", "Every integer greater than 1 is prime or can be written as a product of primes in exactly one way apart from factor order."],
  ["Bézout identity", "The set of all integer combinations ax + by is precisely the set of multiples of gcd(a,b). In particular, ax + by = c has an integer solution exactly when gcd(a,b) divides c."],
  ["Congruence is equivalence", "For a fixed n > 0, congruence modulo n partitions the integers into residue classes and respects addition and multiplication."],
  ["Cryptography uses several hard problems", "Modern public-key systems may rely on integer factorization, discrete logarithms, elliptic-curve discrete logarithms, lattice problems, or other assumptions. Number theory is one important source of that structure, not the whole security stack."],
] as const;

export default function NumberTheoryPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#05050a] text-slate-100 selection:bg-violet-400/25">
      <NumberTheoryBackground />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_18%,rgba(139,92,246,0.11),transparent_29%),radial-gradient(circle_at_16%_82%,rgba(52,211,153,0.055),transparent_28%),linear-gradient(to_bottom,rgba(5,5,10,0.08),rgba(5,5,10,0.72)_72%,rgba(5,5,10,0.96))]" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1560px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#05050a]/80 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Integers · divisibility · primes · congruence · equations"
            eyebrowStyle="rule"
            icon={Fingerprint}
            title={<span>Number Theory</span>}
            subtitle="Number theory studies the arithmetic structure of integers: how numbers factor, divide, repeat modulo a base, and satisfy equations when solutions are restricted to whole numbers. Applications such as cryptography grow from these structures, but the subject reaches far beyond them."
            accentRgb="167, 139, 250"
            titleClassName="font-sans text-[clamp(3rem,5.7vw,6.2rem)] font-semibold leading-[0.83] tracking-[-0.067em] text-[#fdfaff]"
            headerClassName="border-violet-100/[0.10]"
          />
        </div>

        <section className="mt-5 overflow-hidden rounded-[30px] border border-violet-200/[0.10] bg-black/[0.15] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_410px] lg:items-end sm:px-6">
            <div>
              <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/62">Integer structure</div>
              <h2 className="mt-2 text-[clamp(1.9rem,3.6vw,3.3rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">The integers look like a line, but their arithmetic contains many overlapping structures.</h2>
            </div>
            <p className="text-[12px] leading-6 text-slate-400">Factorization, gcds, residue classes, and integer equations are different ways to expose the same discrete arithmetic world. Each view creates its own invariants and algorithms.</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4">
            {STRUCTURE.map((item, index) => {
              const Icon = item.icon;
              return <article key={item.label} className="min-h-[210px] border-b border-white/[0.06] px-5 py-5 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0"><div className="flex items-center justify-between gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full border" style={{ color: `rgb(${item.rgb})`, borderColor: `rgba(${item.rgb},0.22)` }}><Icon size={14} /></span><span className="font-mono text-[8px] text-slate-700">0{index + 1}</span></div><h3 className="mt-5 text-[14px] font-semibold text-white">{item.label}</h3><div className="mt-1 font-mono text-[9px]" style={{ color: `rgba(${item.rgb},0.60)` }}>{item.notation}</div><p className="mt-3 text-[10px] leading-5 text-slate-600">{item.detail}</p></article>;
            })}
          </div>
        </section>

        <section className="mt-5 grid gap-5 xl:grid-cols-[420px_minmax(0,1fr)]">
          <nav aria-label="Number Theory branches" className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.14] backdrop-blur-xl">
            <div className="border-b border-white/[0.07] px-5 py-4"><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/58">Primary branches</div><p className="mt-1 text-[10px] leading-5 text-slate-600">Diophantine Equations is currently the built child route. The other fields remain visible as planned curriculum rather than dead links.</p></div>
            <div className="px-4 py-2">{context.children.map((branch: CurriculumNode, index: number) => <BranchRoute key={branch.id} branch={branch} index={index} />)}</div>
          </nav>

          <section className="rounded-[28px] border border-white/[0.08] bg-black/[0.13] p-5 backdrop-blur-xl sm:p-6">
            <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-200/54">Fundamental theorem of arithmetic</div>
            <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">Prime factorization gives every positive integer greater than 1 a unique multiplicative fingerprint.</h2>
            <p className="mt-3 max-w-4xl text-[12px] leading-6 text-slate-500">For example, 60 = 2² × 3 × 5. The uniqueness is up to rearranging the factors. That decomposition controls divisor counts, gcds, Euler's totient function, multiplicative functions, and many modular properties.</p>
          </section>
        </section>

        <div className="mt-5"><PrimeLab /></div>

        <section className="mt-6 overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_410px] lg:items-end sm:px-6"><div><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-200/50">Arithmetic principles</div><h2 className="mt-2 text-[clamp(1.7rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">Small definitions can impose surprisingly strong global constraints on integers.</h2></div><p className="text-[11px] leading-5 text-slate-500">Number-theoretic statements often look elementary enough to ask in a sentence while their proofs require algebra, analysis, geometry, probability, or computation.</p></div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4">{PRINCIPLES.map(([term, detail], index) => <div key={term} className="min-h-[190px] border-b border-white/[0.06] px-4 py-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0"><span className="font-mono text-[8px] text-violet-200/34">0{index + 1}</span><strong className="mt-4 block text-[12px] text-white/82">{term}</strong><p className="mt-2 text-[10px] leading-5 text-slate-600">{detail}</p></div>)}</div>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          <Neighbor href="/formal-science/mathematics/algebra/abstract-algebra" label="Abstract Algebra" note="Generalize arithmetic operations into groups, rings, fields, and maps." rgb="96, 165, 250" />
          <Neighbor href="/formal-science/mathematics/discrete" label="Discrete Mathematics" note="Connect integers to counting, algorithms, and finite structures." rgb="163, 230, 53" />
          <Neighbor href="/formal-science/computer-science/security-cryptography" label="Security & Cryptography" note="See computational security as a broader computer-science field." rgb="56, 189, 248" />
        </section>
      </div>
    </main>
  );
}

function BranchRoute({ branch, index }: { branch: CurriculumNode; index: number }) {
  const meta = BRANCH_META[branch.id] ?? BRANCH_META["formal.mathematics.number-theory.diophantine"];
  const Icon = meta.icon;
  const planned = branch.status === "placeholder";
  const content = <div className={`group grid min-h-[88px] grid-cols-[42px_minmax(0,1fr)_auto] items-center gap-3 border-b border-white/[0.06] px-2 py-3 ${planned ? "opacity-45" : "transition hover:bg-white/[0.025]"}`}><span className="flex h-9 w-9 items-center justify-center rounded-[12px] border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.20)`, background: `rgba(${meta.rgb},0.03)` }}><Icon size={15} /></span><span className="min-w-0"><span className="flex items-center gap-2"><strong className="text-[12px] text-white/84">{branch.label}</strong><span className="font-mono text-[7px] text-slate-700">0{index + 1}</span></span><span className="mt-1 block font-mono text-[8px] uppercase tracking-[0.1em]" style={{ color: `rgba(${meta.rgb},0.56)` }}>{meta.code} · {meta.question}</span><span className="mt-1 line-clamp-1 block text-[9px] text-slate-700">{branch.description}</span></span><span className="font-mono text-[7px] uppercase tracking-[0.08em] text-slate-600">{planned ? "planned" : "open"}</span></div>;
  return planned ? <div aria-label={`${branch.label}, planned`}>{content}</div> : <Link href={branch.href}>{content}</Link>;
}

function Neighbor({ href, label, note, rgb }: { href: string; label: string; note: string; rgb: string }) {
  return <Link href={href} className="group flex min-h-[82px] items-center gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.12] px-4 py-3 backdrop-blur-md transition hover:bg-white/[0.025]"><span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: `rgb(${rgb})`, boxShadow: `0 0 18px rgba(${rgb},0.22)` }} /><span className="min-w-0 flex-1"><strong className="block text-[12px] text-white/82">{label}</strong><span className="mt-1 block text-[10px] leading-4 text-slate-600">{note}</span></span><ArrowRight size={12} className="text-slate-600 transition group-hover:translate-x-1" /></Link>;
}
