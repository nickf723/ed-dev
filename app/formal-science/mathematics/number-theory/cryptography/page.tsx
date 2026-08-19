import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import { ArrowRight, Binary, Fingerprint, KeyRound, LockKeyhole, Network, ShieldCheck } from "lucide-react";
import ToyRsaLab from "./ToyRsaLab";

const NODE_ID = "formal.mathematics.number-theory.cryptography";

const LAYERS = [
  {
    icon: Fingerprint,
    label: "Arithmetic structure",
    question: "Which algebraic operation has useful computational properties?",
    detail: "Modular exponentiation, finite groups, elliptic curves, lattices, and related structures supply operations from which cryptographic primitives can be built.",
    rgb: "52, 211, 153",
  },
  {
    icon: Binary,
    label: "Hardness assumption",
    question: "Which inversion or distinguishing task is believed computationally difficult?",
    detail: "Security reductions and cryptanalysis study assumptions such as integer factorization, discrete logarithms, or lattice problems rather than relying on arithmetic obscurity alone.",
    rgb: "250, 204, 21",
  },
  {
    icon: KeyRound,
    label: "Primitive / scheme",
    question: "How is the hard problem turned into a useful cryptographic operation?",
    detail: "Encryption, signatures, key exchange, commitments, and other primitives add algorithms, randomness, encoding rules, and security definitions around the mathematics.",
    rgb: "56, 189, 248",
  },
  {
    icon: ShieldCheck,
    label: "Protocol & implementation",
    question: "Does the full system remain secure outside the blackboard model?",
    detail: "Padding, authenticated modes, key generation, randomness, side channels, certificate validation, protocol design, and software quality determine real-world security too.",
    rgb: "244, 114, 182",
  },
] as const;

const FAMILIES = [
  ["RSA", "Uses modular exponentiation modulo a composite n. Standard key generation uses two large primes; factoring n reveals the factorization needed to reconstruct the usual private-key parameters. Secure RSA also requires standardized padding and large key sizes."],
  ["Finite-field discrete logarithms", "Diffie–Hellman and ElGamal-style constructions can use cyclic groups where exponentiation is easy but recovering an exponent from a group element is believed hard at appropriate parameters."],
  ["Elliptic-curve groups", "Elliptic-curve cryptography uses discrete-log-type problems in groups of points on elliptic curves, enabling smaller keys than traditional finite-field systems at comparable classical security levels."],
  ["Post-quantum directions", "Many post-quantum constructions rely on lattices, error-correcting codes, hash functions, or other structures. Public-key cryptography is broader than classical prime/factorization methods."],
] as const;

export default function ArithmeticCryptographyPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#041017] text-slate-100 selection:bg-cyan-300/25">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_18%,rgba(56,189,248,0.12),transparent_29%),radial-gradient(circle_at_16%_82%,rgba(167,139,250,0.055),transparent_28%),linear-gradient(to_bottom,#041017,#030b10_62%,#02070a)]" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.10] [background-image:linear-gradient(rgba(125,211,252,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.08)_1px,transparent_1px)] [background-size:42px_42px] [mask-image:linear-gradient(to_bottom,black,transparent_91%)]" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1540px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#041017]/80 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Arithmetic · hard problems · schemes · protocols"
            eyebrowStyle="rule"
            icon={LockKeyhole}
            title={<span>Arithmetic Cryptography</span>}
            subtitle="Number theory supplies arithmetic structures used in cryptographic constructions, but secure cryptography is not simply 'hard math.' Computational assumptions, security definitions, randomized schemes, protocols, implementation details, and operational key management all sit between a theorem and a secure system."
            accentRgb="56, 189, 248"
            titleClassName="font-sans text-[clamp(2.8rem,5.4vw,6rem)] font-semibold leading-[0.84] tracking-[-0.066em] text-[#f2fbff]"
            headerClassName="border-cyan-100/[0.10]"
          />
        </div>

        <section className="mt-5 overflow-hidden rounded-[30px] border border-cyan-200/[0.10] bg-black/[0.15] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_410px] lg:items-end sm:px-6">
            <div><div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-200/62"><Network size={13} /> From arithmetic to security</div><h2 className="mt-2 text-[clamp(1.9rem,3.6vw,3.3rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">A hard arithmetic problem becomes security only after several additional layers are designed correctly.</h2></div>
            <p className="text-[12px] leading-6 text-slate-400">This page focuses on the number-theoretic layer and uses toy RSA to expose the modular arithmetic. For practical cryptography, the canonical home remains Computer Science → Security & Cryptography.</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4">
            {LAYERS.map((item, index) => {
              const Icon = item.icon;
              return <article key={item.label} className="min-h-[230px] border-b border-white/[0.06] px-5 py-5 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0"><div className="flex items-center justify-between gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full border" style={{ color: `rgb(${item.rgb})`, borderColor: `rgba(${item.rgb},0.22)` }}><Icon size={14} /></span><span className="font-mono text-[8px] text-slate-700">0{index + 1}</span></div><h3 className="mt-5 text-[14px] font-semibold text-white">{item.label}</h3><div className="mt-1 font-mono text-[8px] uppercase tracking-[0.08em]" style={{ color: `rgba(${item.rgb},0.58)` }}>{item.question}</div><p className="mt-3 text-[10px] leading-5 text-slate-600">{item.detail}</p></article>;
            })}
          </div>
        </section>

        <div className="mt-5"><ToyRsaLab /></div>

        <section className="mt-6 overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_410px] lg:items-end sm:px-6"><div><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/50">Public-key families</div><h2 className="mt-2 text-[clamp(1.7rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">There is no single “cryptography problem.”</h2></div><p className="text-[11px] leading-5 text-slate-500">Different schemes rely on different mathematical structures and security assumptions. Parameter sizes and threat models change as algorithms and computing capabilities evolve.</p></div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4">{FAMILIES.map(([term, detail], index) => <div key={term} className="min-h-[215px] border-b border-white/[0.06] px-4 py-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0"><span className="font-mono text-[8px] text-cyan-200/34">0{index + 1}</span><strong className="mt-4 block text-[12px] text-white/82">{term}</strong><p className="mt-2 text-[10px] leading-5 text-slate-600">{detail}</p></div>)}</div>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          <Neighbor href="/formal-science/mathematics/number-theory/modular" label="Modular Arithmetic" note="Study inverses, powers, and finite residue systems directly." rgb="167, 139, 250" />
          <Neighbor href="/formal-science/mathematics/number-theory/primes" label="Primes & Divisibility" note="See factorization, gcds, and Euler's totient function." rgb="52, 211, 153" />
          <Neighbor href="/formal-science/computer-science/security-cryptography" label="Security & Cryptography" note="Continue into protocols, threat models, primitives, and implementation." rgb="56, 189, 248" />
        </section>
      </div>
    </main>
  );
}

function Neighbor({ href, label, note, rgb }: { href: string; label: string; note: string; rgb: string }) {
  return <Link href={href} className="group flex min-h-[82px] items-center gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.12] px-4 py-3 backdrop-blur-md transition hover:bg-white/[0.025]"><span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: `rgb(${rgb})`, boxShadow: `0 0 18px rgba(${rgb},0.22)` }} /><span className="min-w-0 flex-1"><strong className="block text-[12px] text-white/82">{label}</strong><span className="mt-1 block text-[10px] leading-4 text-slate-600">{note}</span></span><ArrowRight size={12} className="text-slate-600 transition group-hover:translate-x-1" /></Link>;
}
