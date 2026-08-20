import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  Asterisk,
  ArrowRight,
  Brackets,
  ChartNoAxesCombined,
  Clock3,
  Fingerprint,
  KeyRound,
  Network,
  Orbit,
  type LucideIcon,
} from "lucide-react";
import NumberTheoryBackground from "./_components/NumberTheoryBackground";
import PrimeLab from "./_components/PrimeLab";

const NODE_ID = "formal.mathematics.number-theory";

type BranchMeta = {
  icon: LucideIcon;
  lens: string;
  question: string;
  rgb: string;
};

const BRANCH_META: Record<string, BranchMeta> = {
  "formal.mathematics.number-theory.primes": {
    icon: Asterisk,
    lens: "multiplicative structure",
    question: "Which primes build an integer, and how does divisibility organize those building blocks?",
    rgb: "52, 211, 153",
  },
  "formal.mathematics.number-theory.modular": {
    icon: Clock3,
    lens: "cyclic structure",
    question: "Which integers behave alike when only their remainders matter?",
    rgb: "167, 139, 250",
  },
  "formal.mathematics.number-theory.diophantine": {
    icon: Brackets,
    lens: "integer constraints",
    question: "Which whole-number points satisfy an equation—and when can none exist?",
    rgb: "251, 113, 133",
  },
  "formal.mathematics.number-theory.analytic": {
    icon: ChartNoAxesCombined,
    lens: "global distribution",
    question: "How do primes and arithmetic patterns behave across very large ranges?",
    rgb: "251, 191, 36",
  },
};

const STRUCTURAL_READS = [
  ["Factorization", "360 = 2³ × 3² × 5", "one integer, one prime-power signature"],
  ["Congruence", "360 ≡ 0 (mod 12)", "compare integers by their remainder class"],
  ["Equation", "8x + 12y = 360", "ask for lattice points instead of every real solution"],
] as const;

export default function NumberTheoryPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  if (context.pageKind !== "hub") {
    throw new Error("Number Theory must be classified as a curriculum hub.");
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#05050a] text-zinc-100 selection:bg-violet-400/25">
      <NumberTheoryBackground />
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_16%,rgba(139,92,246,0.12),transparent_30%),radial-gradient(circle_at_17%_78%,rgba(16,185,129,0.07),transparent_28%),linear-gradient(to_bottom,rgba(5,5,10,0.08),rgba(5,5,10,0.72)_72%,rgba(5,5,10,0.97))]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1560px] px-4 pb-16 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#05050a]/78 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Integers · divisibility · congruence · integer solutions"
            eyebrowStyle="rule"
            icon={Fingerprint}
            title={<span>Number Theory</span>}
            subtitle="Number theory studies the integers as structured objects. It asks how they factor, how remainders create repeating arithmetic, when equations admit integer solutions, and how primes are distributed across the number line."
            accentRgb="167, 139, 250"
            titleClassName="font-sans text-[clamp(3rem,5.8vw,6.4rem)] font-semibold leading-[0.83] tracking-[-0.067em] text-[#fbfaff]"
            headerClassName="border-violet-100/[0.11]"
          />
        </div>

        <section className="mt-5 overflow-hidden rounded-[32px] border border-violet-200/[0.12] bg-black/[0.16] backdrop-blur-xl">
          <div className="grid xl:grid-cols-[390px_minmax(0,1fr)]">
            <aside className="relative overflow-hidden border-b border-white/[0.07] p-5 sm:p-7 xl:border-b-0 xl:border-r">
              <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-violet-300/24 to-transparent" aria-hidden="true" />
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-violet-200/58">Integer specimen</div>
              <div className="mt-6 flex items-end gap-4">
                <span className="text-[clamp(5rem,9vw,8rem)] font-semibold leading-[0.76] tracking-[-0.08em] text-white">360</span>
                <span className="pb-1 text-[12px] leading-5 text-zinc-500">one value<br />several structures</span>
              </div>
              <div className="mt-8 divide-y divide-white/[0.065] border-y border-white/[0.065]">
                {STRUCTURAL_READS.map(([label, expression, meaning]) => (
                  <div key={label} className="py-4">
                    <div className="flex items-center justify-between gap-3">
                      <strong className="text-[12px] text-zinc-200">{label}</strong>
                      <span className="font-mono text-[12px] text-violet-200/78">{expression}</span>
                    </div>
                    <p className="mt-1 text-[11px] leading-5 text-zinc-600">{meaning}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-[12px] leading-6 text-zinc-500">
                The integer does not change. The question changes which structure becomes visible.
              </p>
            </aside>

            <nav aria-label="Number Theory branches" className="min-w-0">
              <div className="border-b border-white/[0.07] px-5 py-5 sm:px-7">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-violet-200/62">
                  <Orbit size={14} /> Primary branches
                </div>
                <h2 className="mt-2 max-w-4xl text-[clamp(1.75rem,3vw,2.9rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-white">
                  Choose the kind of integer structure the problem asks you to inspect.
                </h2>
              </div>
              <div>
                {context.children.map((branch, index) => (
                  <BranchRoute key={branch.id} branch={branch} index={index} />
                ))}
              </div>
            </nav>
          </div>
        </section>

        <section className="mt-7 grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
          <div>
            <div className="mb-4 max-w-4xl">
              <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-emerald-200/58">Multiplicative fingerprint</div>
              <h2 className="mt-2 text-[clamp(1.8rem,3.4vw,3.1rem)] font-semibold leading-[0.98] tracking-[-0.047em] text-white">
                Break an integer into prime powers without changing its value.
              </h2>
              <p className="mt-3 text-[13px] leading-6 text-zinc-500">
                The Fundamental Theorem of Arithmetic says every integer greater than 1 is either prime or has a unique prime factorization, apart from the order of its factors.
              </p>
            </div>
            <PrimeLab />
          </div>

          <aside className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.15] backdrop-blur-xl">
            <div className="border-b border-white/[0.07] p-5">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-200/54"><Network size={14} /> Where integer structure travels</div>
              <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-white">Applications are cross-links, not extra branches.</h2>
              <p className="mt-3 text-[12px] leading-6 text-zinc-500">Number theory supplies ideas used elsewhere. Those applications keep their own canonical academic homes.</p>
            </div>
            <CrossLink
              href="/formal-science/computer-science/security-cryptography"
              icon={KeyRound}
              label="Security & Cryptography"
              note="Public-key systems use modular arithmetic and carefully chosen computational problems, but security also depends on protocols, software, threat models, and implementation."
              rgb="34, 211, 238"
            />
            <CrossLink
              href="/formal-science/mathematics/discrete"
              icon={Network}
              label="Discrete Mathematics"
              note="Sets, graphs, counting, and discrete structures provide neighboring tools and a broader home for finite and countable systems."
              rgb="52, 211, 153"
            />
            <CrossLink
              href="/formal-science/mathematics/algebra/abstract-algebra"
              icon={Orbit}
              label="Abstract Algebra"
              note="Groups, rings, and fields formalize structures that modular arithmetic and algebraic number theory repeatedly use."
              rgb="244, 114, 182"
            />
          </aside>
        </section>
      </div>
    </main>
  );
}

function BranchRoute({ branch, index }: { branch: CurriculumNode; index: number }) {
  const meta = BRANCH_META[branch.id] ?? BRANCH_META["formal.mathematics.number-theory.primes"];
  const Icon = meta.icon;
  const planned = branch.status === "placeholder";

  const content = (
    <div className={`group grid min-h-[126px] gap-4 border-b border-white/[0.065] px-5 py-5 last:border-b-0 sm:grid-cols-[56px_230px_minmax(0,1fr)_auto] sm:items-center sm:px-7 ${planned ? "opacity-50" : "transition-colors hover:bg-white/[0.03]"}`}>
      <span
        className="flex h-12 w-12 items-center justify-center rounded-full border"
        style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.24)`, backgroundColor: `rgba(${meta.rgb},0.04)` }}
      >
        <Icon size={18} />
      </span>
      <span>
        <span className="block text-[11px] font-semibold uppercase tracking-[0.13em]" style={{ color: `rgba(${meta.rgb},0.62)` }}>0{index + 1} · {meta.lens}</span>
        <strong className="mt-1 block text-[16px] text-white/88">{branch.label}</strong>
      </span>
      <span className="text-[13px] leading-6 text-zinc-500">{meta.question}</span>
      <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-600">
        {planned ? "planned" : "open"}
        {planned ? null : <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />}
      </span>
    </div>
  );

  return planned ? (
    <div aria-label={`${branch.label}, planned`} aria-disabled="true">{content}</div>
  ) : (
    <Link href={branch.href}>{content}</Link>
  );
}

function CrossLink({ href, icon: Icon, label, note, rgb }: { href: string; icon: LucideIcon; label: string; note: string; rgb: string }) {
  return (
    <Link href={href} className="group grid grid-cols-[42px_minmax(0,1fr)_auto] gap-3 border-b border-white/[0.065] p-5 last:border-b-0 transition-colors hover:bg-white/[0.025]">
      <span className="flex h-10 w-10 items-center justify-center rounded-[13px] border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.20)`, backgroundColor: `rgba(${rgb},0.035)` }}><Icon size={16} /></span>
      <span><strong className="block text-[13px] text-white/84">{label}</strong><span className="mt-1 block text-[11px] leading-5 text-zinc-600">{note}</span></span>
      <ArrowRight size={14} className="mt-1 text-zinc-700 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
