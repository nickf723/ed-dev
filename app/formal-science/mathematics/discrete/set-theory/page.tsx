import type { Metadata } from "next";
import Link from "next/link";
import CurriculumSiblingNav from "@/app/_components/CurriculumSiblingNav";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  ArrowRight,
  Binary,
  Braces,
  Database,
  Layers3,
  Route,
  ScanSearch,
  ShieldAlert,
  Shapes,
} from "lucide-react";
import SetOperator from "./SetOperator";
import SetTheoryAssessment from "./SetTheoryAssessment";
import SetTheoryWorld from "./SetTheoryWorld";
import {
  SET_THEORY_SPECIMENS,
  specimensAtAddress,
  type SetTheoryMembershipAddress,
  type SetTheorySpecimen,
} from "./setTheorySpecimens";

const NODE_ID = "formal.mathematics.discrete.set-theory";

const SHAPE_SET_A = SET_THEORY_SPECIMENS.filter(
  (specimen) => specimen.address === "aOnly" || specimen.address === "both",
);
const SHAPE_SET_B = SET_THEORY_SPECIMENS.filter(
  (specimen) => specimen.address === "both" || specimen.address === "bOnly",
);

export const metadata: Metadata = {
  title: "Set Theory",
  description:
    "Build an intuitive foundation for set theory, explore finite-set operations, and follow a bounded path into containment, relations, partitions, and foundations.",
};

const MEMBERSHIP_REGIONS = [
  {
    id: "both",
    row: "cyan",
    column: "triangle",
    label: "Both",
    rule: "cyan and a triangle",
    tone: "amber",
  },
  {
    id: "aOnly",
    row: "cyan",
    column: "not-triangle",
    label: "A only",
    rule: "cyan and not a triangle",
    tone: "cyan",
  },
  {
    id: "bOnly",
    row: "not-cyan",
    column: "triangle",
    label: "B only",
    rule: "a triangle and not cyan",
    tone: "violet",
  },
  {
    id: "neither",
    row: "not-cyan",
    column: "not-triangle",
    label: "Neither",
    rule: "not cyan and not a triangle",
    tone: "slate",
  },
] as const satisfies readonly {
  id: SetTheoryMembershipAddress;
  row: "cyan" | "not-cyan";
  column: "triangle" | "not-triangle";
  label: string;
  rule: string;
  tone: "cyan" | "amber" | "violet" | "slate";
}[];

function specimenRoster(specimens: readonly SetTheorySpecimen[]) {
  return `{${specimens.map((specimen) => specimen.name).join(", ")}}`;
}

const OPERATION_RULES = [
  {
    name: "Union",
    symbol: "A ∪ B",
    logic: "A OR B",
    result: specimenRoster(
      SET_THEORY_SPECIMENS.filter((specimen) => specimen.address !== "neither"),
    ),
    note: "Keep every element that belongs to at least one set.",
    tone: "cyan",
  },
  {
    name: "Intersection",
    symbol: "A ∩ B",
    logic: "A AND B",
    result: specimenRoster(specimensAtAddress("both")),
    note: "Keep only elements that belong to both sets.",
    tone: "amber",
  },
  {
    name: "Difference",
    symbol: "A ∖ B",
    logic: "A AND NOT B",
    result: specimenRoster(specimensAtAddress("aOnly")),
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

  if (context.pageKind !== "unit") {
    throw new Error("Set Theory must be classified as a root unit.");
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
            eyebrow="Discrete mathematics · root unit"
            eyebrowStyle="rule"
            icon={Braces}
            title={<span>Set Theory</span>}
            subtitle="Begin with the practical idea of membership, then follow one bounded path through containment, operations, relations, partitions, and—much later—the foundations beneath them."
            accentRgb="103, 232, 249"
            titleClassName="font-sans text-[clamp(2.8rem,5.2vw,5.35rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-[#f4fdff]"
            headerClassName="border-cyan-100/[0.1]"
          />
        </div>

        <SetTheoryLearningPath lessons={context.children} />

        <section
          className="mt-28 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"
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
              Every object answers two visible questions.
            </h2>
            <p className="mt-5 text-[16px] leading-7 text-slate-300">
              Look at the same six tiles shown in the background. Set A contains
              every <strong className="text-cyan-100">cyan object</strong>. Set
              B contains every{" "}
              <strong className="text-violet-100">triangle</strong>. Color and
              shape are independent properties, so every tile lands in exactly
              one of four membership addresses.
            </p>
            <div className="mt-6 border-y border-white/[0.08] py-5 font-mono text-[14px] leading-7 text-slate-300">
              <div>
                <span className="text-cyan-200">A</span> ={" "}
                {specimenRoster(SHAPE_SET_A)}
              </div>
              <div>
                <span className="text-violet-200">B</span> ={" "}
                {specimenRoster(SHAPE_SET_B)}
              </div>
            </div>
            <p className="mt-5 text-[14px] leading-6 text-slate-500">
              This property matrix and the scenery use one identical universe.
              The scanner later translates the same four-address logic into a
              conventional Venn diagram with a newly labeled numeric case.
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
                <div className="mt-5 border-t border-white/[0.08] pt-4 font-mono text-[13px] leading-6 text-slate-200 [overflow-wrap:anywhere]">
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

function SetTheoryLearningPath({
  lessons,
}: {
  lessons: readonly CurriculumNode[];
}) {
  return (
    <section
      className="mt-14 grid gap-8 border-b border-cyan-100/[0.08] pb-16 lg:grid-cols-[0.72fr_1.28fr] lg:items-start"
      aria-labelledby="set-theory-path-title"
    >
      <div className="max-w-lg lg:sticky lg:top-44">
        <div className="text-cyan-100/64 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
          <Route size={14} /> Navigate · one finite learning path
        </div>
        <h2
          id="set-theory-path-title"
          className="mt-3 text-[clamp(2rem,3.8vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.052em] text-white"
        >
          Learn the useful structure before the foundations.
        </h2>
        <p className="mt-5 text-[15px] leading-7 text-slate-400">
          Set theory can descend indefinitely. This root deliberately does not.
          Six direct lessons form a practical sequence; the final foundations
          stop stays on the horizon until the earlier structure is familiar.
        </p>

        <div className="mt-7 border-l border-amber-200/30 bg-amber-300/[0.035] py-4 pl-5 pr-4">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-100/60">
            <Shapes size={13} /> Current overview workshop
          </div>
          <strong className="mt-2 block text-[17px] text-white">
            Membership & basic operations
          </strong>
          <p className="mt-2 text-[13px] leading-6 text-slate-500">
            Build the four-address model, then practice union, intersection, and
            difference before choosing a deeper lesson.
          </p>
        </div>
      </div>

      <nav aria-label="Set Theory learning path">
        <ol className="relative ml-3 border-l border-cyan-200/20 pl-7 sm:ml-5 sm:pl-9">
          {lessons.map((child, index) => {
            const deferred = child.id.endsWith(".foundations");
            return (
              <li key={child.id} className="relative pb-4 last:pb-0">
                <span
                  className={`absolute -left-[2.55rem] top-5 flex h-7 w-7 items-center justify-center rounded-full border bg-[#061019] font-mono text-[10px] font-semibold sm:-left-[3.3rem] ${
                    deferred
                      ? "border-violet-200/30 text-violet-100/70"
                      : "border-cyan-200/30 text-cyan-100/70"
                  }`}
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <article
                  className={`border-y px-4 py-4 backdrop-blur-xl sm:px-5 ${
                    deferred
                      ? "border-violet-200/[0.12] bg-violet-300/[0.025]"
                      : "bg-[#061019]/54 border-white/[0.08]"
                  }`}
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                        {deferred ? "Far horizon" : "Planned lesson"}
                      </div>
                      <h3 className="mt-1 text-[18px] font-semibold tracking-[-0.025em] text-slate-200">
                        {child.label}
                      </h3>
                    </div>
                    <span className="w-fit border border-white/[0.08] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.13em] text-slate-600">
                      {deferred ? "deferred" : "planned"}
                    </span>
                  </div>
                  <p className="mt-2 max-w-2xl text-[13px] leading-6 text-slate-500">
                    {child.description}
                  </p>
                </article>
              </li>
            );
          })}
        </ol>
      </nav>
    </section>
  );
}

function MembershipAddressMap() {
  const both = MEMBERSHIP_REGIONS.find((region) => region.id === "both");
  const aOnly = MEMBERSHIP_REGIONS.find((region) => region.id === "aOnly");
  const bOnly = MEMBERSHIP_REGIONS.find((region) => region.id === "bOnly");
  const neither = MEMBERSHIP_REGIONS.find((region) => region.id === "neither");

  if (!both || !aOnly || !bOnly || !neither) {
    throw new Error("The four Set Theory membership addresses are required.");
  }

  return (
    <div className="bg-[#061019]/66 relative overflow-hidden border border-cyan-100/[0.14] p-5 shadow-[0_34px_100px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:p-7">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/55 to-transparent" />
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100/60">
            Worked membership map
          </div>
          <h3 className="mt-2 text-[25px] font-semibold tracking-[-0.04em] text-white">
            Color × shape makes every address visible
          </h3>
        </div>
        <Braces className="text-cyan-200/68 shrink-0" size={24} />
      </div>

      <div className="mt-7 overflow-x-auto [scrollbar-color:rgba(103,232,249,0.18)_transparent] [scrollbar-width:thin]">
        <div className="bg-[#02070c]/68 grid min-w-[570px] grid-cols-[82px_minmax(0,1fr)_minmax(0,1fr)] border border-white/[0.08]">
          <div className="flex min-h-16 items-end border-b border-r border-white/[0.08] p-3 font-mono text-[9px] uppercase leading-4 tracking-[0.12em] text-slate-600">
            Set A ↓<br />
            Set B →
          </div>
          <MatrixAxisHeader tone="violet" title="Triangle" subtitle="in B" />
          <MatrixAxisHeader
            tone="slate"
            title="Not triangle"
            subtitle="not in B"
          />

          <MatrixRowHeader title="Cyan" subtitle="in A" active />
          <MembershipMatrixCell region={both} />
          <MembershipMatrixCell region={aOnly} />

          <MatrixRowHeader title="Not cyan" subtitle="not in A" />
          <MembershipMatrixCell region={bOnly} />
          <MembershipMatrixCell region={neither} />
        </div>
      </div>

      <p className="mt-4 text-[12px] leading-5 text-slate-500">
        Read down for color and across for shape. The cyan triangle satisfies
        both rules; changing either property moves an object to a neighboring
        address.
      </p>
    </div>
  );
}

function MatrixAxisHeader({
  tone,
  title,
  subtitle,
}: {
  tone: "violet" | "slate";
  title: string;
  subtitle: string;
}) {
  return (
    <div
      className={`min-h-16 border-b border-r border-white/[0.08] p-3 text-center last:border-r-0 ${
        tone === "violet" ? "bg-violet-300/[0.04]" : "bg-white/[0.012]"
      }`}
    >
      <strong
        className={`block text-[12px] uppercase tracking-[0.12em] ${
          tone === "violet" ? "text-violet-100" : "text-slate-400"
        }`}
      >
        {title}
      </strong>
      <span className="mt-1 block font-mono text-[10px] text-slate-600">
        {subtitle}
      </span>
    </div>
  );
}

function MatrixRowHeader({
  title,
  subtitle,
  active = false,
}: {
  title: string;
  subtitle: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex min-h-36 flex-col justify-center border-b border-r border-white/[0.08] p-3 text-center ${
        active ? "bg-cyan-300/[0.04]" : "bg-white/[0.012]"
      }`}
    >
      <strong
        className={`text-[11px] uppercase tracking-[0.1em] ${
          active ? "text-cyan-100" : "text-slate-400"
        }`}
      >
        {title}
      </strong>
      <span className="mt-1 font-mono text-[9px] text-slate-600">
        {subtitle}
      </span>
    </div>
  );
}

function MembershipMatrixCell({
  region,
}: {
  region: (typeof MEMBERSHIP_REGIONS)[number];
}) {
  const specimens = specimensAtAddress(region.id);

  return (
    <div
      className={`min-h-36 border-b border-r border-white/[0.08] p-3 last:border-r-0 ${TONE_CLASSES[region.tone]}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <strong className="block text-[10px] uppercase tracking-[0.12em]">
            {region.label}
          </strong>
          <span className="mt-1 block text-[10px] leading-4 text-slate-600">
            {region.rule}
          </span>
        </div>
        <span className="font-mono text-[11px] text-slate-600">
          {specimens.length}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap items-end gap-4">
        {specimens.map((specimen) => (
          <SpecimenToken key={specimen.id} specimen={specimen} />
        ))}
      </div>
    </div>
  );
}

function SpecimenToken({ specimen }: { specimen: SetTheorySpecimen }) {
  const palette = {
    cyan: { fill: "#0891b2", stroke: "#a5f3fc" },
    amber: { fill: "#b45309", stroke: "#fde68a" },
    violet: { fill: "#7c3aed", stroke: "#ddd6fe" },
  }[specimen.tone];

  return (
    <figure className="flex min-w-16 flex-col items-center gap-1.5">
      <svg
        viewBox="0 0 52 52"
        className="h-11 w-11 drop-shadow-[0_8px_12px_rgba(0,0,0,0.34)]"
        aria-hidden="true"
      >
        <SpecimenTokenShape
          shape={specimen.shape}
          fill={palette.fill}
          stroke={palette.stroke}
        />
      </svg>
      <figcaption className="max-w-20 text-center text-[9px] leading-3 text-slate-500">
        {specimen.name}
      </figcaption>
    </figure>
  );
}

function SpecimenTokenShape({
  shape,
  fill,
  stroke,
}: {
  shape: SetTheorySpecimen["shape"];
  fill: string;
  stroke: string;
}) {
  const shared = {
    fill,
    fillOpacity: 0.82,
    stroke,
    strokeOpacity: 0.82,
    strokeWidth: 1.8,
  };

  if (shape === "circle") return <circle cx="26" cy="26" r="18" {...shared} />;
  if (shape === "square") {
    return <rect x="9" y="9" width="34" height="34" rx="5" {...shared} />;
  }
  if (shape === "triangle") {
    return <polygon points="26,6 46,43 6,43" {...shared} />;
  }
  return <polygon points="26,6 43,16 43,36 26,46 9,36 9,16" {...shared} />;
}
