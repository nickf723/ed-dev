import type { Metadata } from "next";
import Link from "next/link";
import CurriculumSiblingNav from "@/app/_components/CurriculumSiblingNav";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import {
  ArrowRight,
  Binary,
  Braces,
  Database,
  Layers3,
  ScanSearch,
  ShieldAlert,
} from "lucide-react";
import SetOperator from "./SetOperator";
import SetTheoryAssessment from "./SetTheoryAssessment";
import SetTheoryWorld from "./SetTheoryWorld";

const NODE_ID = "formal.mathematics.discrete.set-theory";

export const metadata: Metadata = {
  title: "Set Theory",
  description:
    "Learn how membership determines union, intersection, and difference, then practice operations on finite sets.",
};

const MEMBERSHIP_REGIONS = [
  {
    label: "A only",
    rule: "in A and not in B",
    members: "{2}",
    tone: "cyan",
  },
  {
    label: "Both",
    rule: "in A and in B",
    members: "{4, 6}",
    tone: "amber",
  },
  {
    label: "B only",
    rule: "in B and not in A",
    members: "{5}",
    tone: "violet",
  },
  {
    label: "Neither",
    rule: "outside both sets",
    members: "{1, 3}",
    tone: "slate",
  },
] as const;

const OPERATION_RULES = [
  {
    name: "Union",
    symbol: "A ∪ B",
    logic: "A OR B",
    result: "{2, 4, 5, 6}",
    note: "Keep every element that belongs to at least one set.",
    tone: "cyan",
  },
  {
    name: "Intersection",
    symbol: "A ∩ B",
    logic: "A AND B",
    result: "{4, 6}",
    note: "Keep only elements that belong to both sets.",
    tone: "amber",
  },
  {
    name: "Difference",
    symbol: "A ∖ B",
    logic: "A AND NOT B",
    result: "{2}",
    note: "Start in A, then remove anything that also belongs to B.",
    tone: "violet",
  },
] as const;

const TONE_CLASSES = {
  cyan: "border-cyan-200/20 bg-cyan-300/[0.05] text-cyan-100",
  amber: "border-amber-200/20 bg-amber-300/[0.05] text-amber-100",
  violet: "border-violet-200/20 bg-violet-300/[0.05] text-violet-100",
  slate: "border-slate-200/10 bg-slate-300/[0.025] text-slate-300",
} as const;

export default function SetTheoryPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  if (context.pageKind !== "lesson") {
    throw new Error("Set Theory must be classified as an atomic lesson.");
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#02060b] text-slate-100 selection:bg-cyan-200/25">
      <SetTheoryWorld />
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_32%,transparent_0%,rgba(2,6,11,0.08)_50%,rgba(2,6,11,0.7)_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 pb-28 sm:px-6 xl:px-10">
        <div className="bg-[#02060b]/72 sticky top-0 z-30 -mx-4 border-b border-cyan-100/[0.08] px-4 pb-4 pt-6 shadow-[0_18px_58px_rgba(0,0,0,0.2)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-10 xl:px-10">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Discrete mathematics · membership lesson"
            eyebrowStyle="rule"
            icon={Braces}
            title={<span>Set Theory</span>}
            subtitle="A set turns a collection into a precise membership rule. Once every object has an address—A only, both, B only, or neither—set operations become readable questions instead of symbols to memorize."
            accentRgb="103, 232, 249"
            titleClassName="font-sans text-[clamp(2.8rem,5.2vw,5.35rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-[#f4fdff]"
            headerClassName="border-cyan-100/[0.1]"
          />
        </div>

        <section
          className="mt-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"
          aria-labelledby="membership-address-title"
        >
          <div className="max-w-xl">
            <div className="text-cyan-100/64 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
              <ScanSearch size={14} /> Orient · one object at a time
            </div>
            <h2
              id="membership-address-title"
              className="mt-3 text-[clamp(2rem,4.3vw,4rem)] font-semibold leading-[0.96] tracking-[-0.055em] text-white"
            >
              Every element has a membership address.
            </h2>
            <p className="mt-5 text-[16px] leading-7 text-slate-300">
              Let the universe be <strong>U = {"{1, 2, 3, 4, 5, 6}"}</strong>.
              Set A contains the even numbers, while set B contains numbers
              greater than 3. Test each number against both rules.
            </p>
            <div className="mt-6 border-y border-white/[0.08] py-5 font-mono text-[15px] leading-8 text-slate-300">
              <div>
                <span className="text-cyan-200">A</span> = {"{2, 4, 6}"}
              </div>
              <div>
                <span className="text-violet-200">B</span> = {"{4, 5, 6}"}
              </div>
            </div>
            <p className="mt-5 text-[14px] leading-6 text-slate-500">
              The circles are a map of those decisions. Their geometric overlap
              is useful because it represents shared membership—not because sets
              are literally circles.
            </p>
          </div>

          <MembershipAddressMap />
        </section>

        <section className="mt-28" aria-labelledby="membership-rule-title">
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-amber-100/62 text-[11px] font-semibold uppercase tracking-[0.16em]">
              Explain · the reusable rule
            </div>
            <h2
              id="membership-rule-title"
              className="mt-3 text-[clamp(2rem,3.8vw,3.45rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-white"
            >
              An operation is a filter on membership.
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-slate-400">
              Keep the two sets fixed and change only the question. Read OR,
              AND, and NOT literally for each element; the surviving elements
              form the result set.
            </p>
          </div>

          <div className="mt-8 grid gap-3 lg:grid-cols-3">
            {OPERATION_RULES.map((operation) => (
              <article
                key={operation.name}
                className={`border p-5 backdrop-blur-xl ${TONE_CLASSES[operation.tone]}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-[20px] font-semibold text-white">
                      {operation.name}
                    </h3>
                    <div className="mt-1 font-mono text-[22px] font-semibold">
                      {operation.symbol}
                    </div>
                  </div>
                  <span className="border-current/20 border px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.12em]">
                    {operation.logic}
                  </span>
                </div>
                <p className="mt-5 min-h-12 text-[13px] leading-6 text-slate-400">
                  {operation.note}
                </p>
                <div className="mt-5 border-t border-white/[0.08] pt-4 font-mono text-[14px] text-slate-200">
                  Result: {operation.result}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-32" aria-labelledby="set-operator-title">
          <div className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
            <div className="max-w-3xl">
              <div className="text-cyan-100/64 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
                <Binary size={14} /> Do · membership scanner
              </div>
              <h2
                id="set-operator-title"
                className="mt-3 text-[clamp(2rem,4vw,3.65rem)] font-semibold leading-[0.98] tracking-[-0.052em] text-white"
              >
                Change the rule. Watch the result move.
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-slate-400">
                Load a curated pair of sets, choose an operation, and inspect
                both the highlighted Venn regions and the resulting roster.
              </p>
            </div>
            <aside className="border-l border-cyan-200/20 pl-5 text-[13px] leading-6 text-slate-400">
              <strong className="block text-[14px] text-cyan-100">
                Duplicates never accumulate.
              </strong>
              A set records whether an element belongs, not how many times it
              was encountered. In a union, a shared element still appears once.
            </aside>
          </div>

          <SetOperator />
        </section>

        <section
          className="mt-32 grid gap-4 lg:grid-cols-2"
          aria-labelledby="set-boundaries-title"
        >
          <div className="border border-amber-200/[0.15] bg-[#100d08]/60 p-6 backdrop-blur-xl sm:p-8">
            <div className="text-amber-100/62 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
              <ShieldAlert size={14} /> Boundary · object or collection?
            </div>
            <h2
              id="set-boundaries-title"
              className="mt-3 text-[27px] font-semibold tracking-[-0.04em] text-white"
            >
              Element and subset are different relationships.
            </h2>
            <div className="mt-5 space-y-3 font-mono text-[16px]">
              <div className="border border-white/[0.08] bg-black/20 px-4 py-3 text-slate-200">
                2 ∈ {"{2, 4, 6}"}
                <span className="ml-3 font-sans text-[13px] text-slate-500">
                  an object belongs
                </span>
              </div>
              <div className="border border-white/[0.08] bg-black/20 px-4 py-3 text-slate-200">
                {"{2, 4}"} ⊆ {"{2, 4, 6}"}
                <span className="ml-3 font-sans text-[13px] text-slate-500">
                  every member belongs
                </span>
              </div>
            </div>
            <p className="mt-5 text-[14px] leading-6 text-slate-400">
              The symbol ∈ compares an object with a set. The symbol ⊆ compares
              one set with another.
            </p>
          </div>

          <div className="border border-violet-200/[0.15] bg-[#090811]/60 p-6 backdrop-blur-xl sm:p-8">
            <div className="text-violet-100/62 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
              <Layers3 size={14} /> Boundary · empty overlap
            </div>
            <h2 className="mt-3 text-[27px] font-semibold tracking-[-0.04em] text-white">
              An empty intersection does not mean empty sets.
            </h2>
            <div className="mt-5 border-y border-white/[0.08] py-5 font-mono text-[17px] leading-8 text-slate-200">
              <div>A = {"{2, 4}"}</div>
              <div>B = {"{1, 3, 5}"}</div>
              <div className="mt-2 text-violet-200">A ∩ B = ∅</div>
            </div>
            <p className="mt-5 text-[14px] leading-6 text-slate-400">
              Both sets contain elements; they simply share none. Use the
              <strong className="text-slate-200"> Disjoint</strong> preset in
              the scanner to see this boundary case.
            </p>
          </div>
        </section>

        <section className="mt-32" aria-labelledby="set-check-title">
          <div className="mb-8 max-w-3xl">
            <div className="text-emerald-100/62 text-[11px] font-semibold uppercase tracking-[0.16em]">
              Check · transfer and fluency
            </div>
            <h2
              id="set-check-title"
              className="mt-3 text-[clamp(2rem,4vw,3.55rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-white"
            >
              Can the membership rule travel?
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-slate-400">
              First interpret a set operation in a new context. Then compute
              fresh finite-set results generated from reproducible cases.
            </p>
          </div>
          <SetTheoryAssessment />
        </section>

        <section className="bg-[#050d14]/58 mt-28 border-y border-white/[0.08] backdrop-blur-xl">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 sm:p-8 lg:border-r lg:border-white/[0.08]">
              <div className="text-cyan-100/62 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
                <Database size={14} /> Connect · querying collections
              </div>
              <h2 className="mt-3 text-[27px] font-semibold tracking-[-0.04em] text-white">
                Databases turn membership rules into useful results.
              </h2>
              <p className="mt-4 max-w-2xl text-[14px] leading-7 text-slate-400">
                A database query often selects rows that satisfy several
                conditions. Asking for people who are active AND subscribed is
                an intersection; combining two mailing lists is a union; finding
                active people who are NOT subscribed is a difference.
              </p>
              <div className="mt-5 border border-cyan-200/[0.12] bg-black/25 px-4 py-3 font-mono text-[13px] text-cyan-100/80">
                active patrons ∩ newsletter subscribers
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <div className="text-violet-100/62 text-[11px] font-semibold uppercase tracking-[0.16em]">
                Related lenses
              </div>
              <div className="mt-4 divide-y divide-white/[0.08] border-y border-white/[0.08]">
                <Link
                  href="/formal-science/logic"
                  className="group flex items-center justify-between gap-5 py-4"
                >
                  <span>
                    <strong className="block text-[14px] text-slate-100">
                      Logic
                    </strong>
                    <span className="mt-1 block text-[12px] text-slate-500">
                      OR, AND, and NOT as propositions
                    </span>
                  </span>
                  <ArrowRight
                    className="text-slate-500 transition-transform group-hover:translate-x-1"
                    size={15}
                  />
                </Link>
                <Link
                  href="/formal-science/mathematics/statistics/probability"
                  className="group flex items-center justify-between gap-5 py-4"
                >
                  <span>
                    <strong className="block text-[14px] text-slate-100">
                      Probability Theory
                    </strong>
                    <span className="mt-1 block text-[12px] text-slate-500">
                      Events as subsets of a sample space
                    </span>
                  </span>
                  <ArrowRight
                    className="text-slate-500 transition-transform group-hover:translate-x-1"
                    size={15}
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <CurriculumSiblingNav
          previous={context.previousActiveSibling}
          parent={context.parent}
          next={context.nextActiveSibling}
          accentRgb="103, 232, 249"
        />
      </div>
    </main>
  );
}

function MembershipAddressMap() {
  return (
    <div className="bg-[#061019]/66 relative overflow-hidden border border-cyan-100/[0.14] p-5 shadow-[0_34px_100px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:p-7">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/55 to-transparent" />
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100/60">
            Worked membership map
          </div>
          <h3 className="mt-2 text-[25px] font-semibold tracking-[-0.04em] text-white">
            Four addresses cover every case
          </h3>
        </div>
        <Braces className="text-cyan-200/68 shrink-0" size={24} />
      </div>

      <div className="bg-[#02070c]/66 relative mt-7 min-h-[270px] overflow-hidden border border-white/[0.07] p-4 sm:p-6">
        <div className="border-cyan-200/32 pointer-events-none absolute left-[13%] top-[12%] h-[76%] w-[45%] rounded-[50%] border bg-cyan-300/[0.045] shadow-[0_0_60px_rgba(34,211,238,0.07)]" />
        <div className="border-violet-200/32 pointer-events-none absolute right-[13%] top-[12%] h-[76%] w-[45%] rounded-[50%] border bg-violet-300/[0.045] shadow-[0_0_60px_rgba(167,139,250,0.07)]" />
        <div className="relative grid min-h-[220px] grid-cols-2 gap-2 sm:grid-cols-4 sm:items-center">
          {MEMBERSHIP_REGIONS.map((region) => (
            <div
              key={region.label}
              className={`relative z-10 border p-3 text-center backdrop-blur-md ${TONE_CLASSES[region.tone]}`}
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.12em]">
                {region.label}
              </div>
              <div className="mt-2 font-mono text-[18px] text-white">
                {region.members}
              </div>
              <div className="mt-2 text-[11px] leading-5 text-slate-500">
                {region.rule}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
