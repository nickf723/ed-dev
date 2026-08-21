import type { Metadata } from "next";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import MarketFlowBackground from "@/app/_page-system/backgrounds/MarketFlowBackground";
import CurveShiftLab from "@/app/_page-system/instruments/CurveShiftLab";
import ResourceFlowTopology from "@/app/_page-system/topologies/ResourceFlowTopology";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  ArrowRight,
  Brain,
  ChartLine,
  Coins,
  ExternalLink,
  Globe2,
  Landmark,
  Scale,
  Sigma,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import EconomicsEvidenceLab from "./EconomicsEvidenceLab";
import { ECONOMICS_BRANCH_IDS } from "./economicsModel";

const NODE_ID = "social.economics";

export const metadata: Metadata = {
  title: "Economics",
  description:
    "Study scarcity, exchange, institutions, markets, national accounts, measurement, policy, development, and causal evidence across seven economics branches.",
};

type FieldMeta = {
  question: string;
  icon: LucideIcon;
  rgb: string;
  role: "core" | "applied";
};

const FIELD_META: Record<string, FieldMeta> = {
  "social.economics.microeconomics": {
    question: "How do people, firms, and individual markets choose?",
    icon: ChartLine,
    rgb: "34, 197, 94",
    role: "core",
  },
  "social.economics.macroeconomics": {
    question: "How does the economy behave as a connected whole?",
    icon: Globe2,
    rgb: "59, 130, 246",
    role: "core",
  },
  "social.economics.econometrics": {
    question: "How do we estimate relationships from economic data?",
    icon: Sigma,
    rgb: "167, 139, 250",
    role: "core",
  },
  "social.economics.behavioral": {
    question:
      "What changes when real decision-makers are not perfectly rational?",
    icon: Brain,
    rgb: "244, 114, 182",
    role: "applied",
  },
  "social.economics.international": {
    question: "What changes when exchange crosses borders?",
    icon: Globe2,
    rgb: "34, 211, 238",
    role: "applied",
  },
  "social.economics.public": {
    question:
      "How do taxes, public goods, and government policy change outcomes?",
    icon: Landmark,
    rgb: "250, 204, 21",
    role: "applied",
  },
  "social.economics.development": {
    question:
      "Why do living standards and institutions diverge across places and time?",
    icon: TrendingUp,
    rgb: "20, 184, 166",
    role: "applied",
  },
};

export default function EconomicsPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  if (context.pageKind !== "hub") {
    throw new Error("Economics must be classified as a navigation hub.");
  }

  assertBranchCoverage(context.children);

  const core = context.children.filter(
    (child) => FIELD_META[child.id]?.role === "core"
  );
  const applied = context.children.filter(
    (child) => FIELD_META[child.id]?.role === "applied"
  );

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#040b08] text-slate-100 selection:bg-emerald-400/25">
      <MarketFlowBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="bg-[#040b08]/78 sticky top-0 z-30 -mx-4 border-b border-white/[0.06] px-4 pb-3 pt-4 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Scarcity · choice · exchange · institutions · measurement"
            eyebrowStyle="pill"
            icon={Coins}
            title={<span>Economics</span>}
            subtitle="Economics studies how scarce resources move through choices, markets, institutions, and whole economies. The same flow can be examined close-up, at system scale, or through data."
            accentRgb="34, 197, 94"
            titleClassName="font-sans text-[clamp(2.8rem,5.4vw,5.9rem)] font-semibold leading-[0.84] tracking-[-0.062em] text-[#f3fff7]"
            headerClassName="border-white/[0.08]"
          />
        </div>

        <section className="mt-10 grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)] xl:items-stretch">
          <div className="rounded-[24px] border border-emerald-200/[0.11] bg-black/[0.11] p-5 backdrop-blur-xl sm:p-6">
            <div className="text-emerald-200/72 font-mono text-[11px] font-semibold uppercase tracking-[0.10em]">
              The starting constraint
            </div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,2.9rem)] font-semibold tracking-[-0.045em] text-white">
              Wants can exceed available time, labor, land, materials, money,
              and attention.
            </h2>
            <p className="text-slate-300/78 mt-3 max-w-3xl text-[14px] leading-6">
              Scarcity forces tradeoffs. Economics follows how those tradeoffs
              become prices, production, income, institutions, inequality,
              growth, and policy choices.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 rounded-[24px] border border-white/[0.08] bg-black/[0.11] p-3 backdrop-blur-xl">
            <Principle
              icon={Scale}
              label="Tradeoff"
              text="Choosing one use means giving up another."
              rgb="250, 204, 21"
            />
            <Principle
              icon={TrendingUp}
              label="Margin"
              text="Many choices depend on the next unit, not the average."
              rgb="34, 197, 94"
            />
            <Principle
              icon={Users}
              label="Institution"
              text="Rules change incentives and who bears costs or gains."
              rgb="59, 130, 246"
            />
          </div>
        </section>

        <section
          data-navigation="economics-branch-atlas"
          className="mt-20 overflow-hidden rounded-[26px] border border-white/[0.08] bg-black/[0.12] backdrop-blur-xl"
        >
          <div className="grid gap-4 border-b border-white/[0.07] p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_410px] lg:items-end">
            <div>
              <div className="text-blue-200/68 font-mono text-[11px] font-semibold uppercase tracking-[0.10em]">
                Primary navigation · fields by scale and question
              </div>
              <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.6rem)] font-semibold tracking-[-0.04em] text-white">
                Do not confuse the scale of a question with the tools used to
                answer it.
              </h2>
            </div>
            <p className="text-[13px] leading-6 text-slate-400">
              Microeconomics and macroeconomics primarily differ by scale.
              Econometrics is a measurement toolkit used in both. Applied fields
              cut across those foundations with a particular kind of problem.
            </p>
          </div>

          <div className="grid xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="relative border-b border-white/[0.07] p-5 sm:p-6 xl:border-b-0 xl:border-r">
              <div className="absolute left-[9%] right-[9%] top-[82px] hidden h-px bg-gradient-to-r from-emerald-300/30 via-violet-300/30 to-blue-300/30 md:block" />
              <div className="grid gap-3 md:grid-cols-3">
                {core.map((child, index) => (
                  <FieldNode key={child.id} child={child} index={index} />
                ))}
              </div>
              <div className="mt-4 rounded-[16px] border border-white/[0.06] bg-white/[0.014] p-3 text-center font-mono text-[11px] uppercase tracking-[0.07em] text-slate-500">
                individual decisions{" "}
                <span className="mx-3 text-slate-700">→</span> measured
                relationships <span className="mx-3 text-slate-700">→</span>{" "}
                economy-wide feedback
              </div>
            </div>

            <aside className="p-5 sm:p-6 xl:sticky xl:top-[172px] xl:self-start">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-500">
                Cross-cutting applications
              </div>
              <div className="mt-3 space-y-2">
                {applied.map((child) => (
                  <AppliedField key={child.id} child={child} />
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-20">
          <ResourceFlowTopology />
        </section>

        <section className="mt-20 grid gap-4 xl:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)] xl:items-start">
          <CurveShiftLab />
          <div className="rounded-[24px] border border-white/[0.08] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6 xl:sticky xl:top-[172px]">
            <div className="text-emerald-200/68 font-mono text-[11px] font-semibold uppercase tracking-[0.09em]">
              One microeconomic model
            </div>
            <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.035em] text-white">
              A model isolates a relationship so you can reason about change.
            </h2>
            <p className="mt-3 text-[13px] leading-6 text-slate-400">
              Supply and demand deliberately ignore enormous amounts of detail.
              Hold many things fixed, change one relationship, and ask what the
              model predicts about price and quantity.
            </p>
            <div className="mt-4 space-y-2">
              <ModelRule
                number="01"
                title="State what is held fixed"
                text="A useful prediction depends on the assumptions around the model."
              />
              <ModelRule
                number="02"
                title="Distinguish shift from movement"
                text="Changing price moves along a curve; changing the underlying relationship shifts the curve."
              />
              <ModelRule
                number="03"
                title="Return to evidence"
                text="The model predicts direction and mechanism; data tests how well it describes a real market."
              />
            </div>
            <div className="mt-5 border-l-2 border-amber-200/30 bg-amber-200/[0.025] px-4 py-3">
              <strong className="text-[12px] text-amber-100/75">
                Equilibrium is a model condition, not a moral verdict.
              </strong>
              <p className="mt-2 text-[12px] leading-5 text-slate-500">
                An intersection can be inefficient, unequal, unstable,
                regulated, or outside the range where these linear relationships
                describe a real market.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <EconomicsEvidenceLab />
        </section>

        <section
          data-source-boundary="economics"
          className="mt-20 grid gap-5 border-t border-emerald-100/[0.10] px-1 pt-8 md:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)]"
        >
          <div>
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-slate-500">
              Source &amp; model boundary
            </div>
            <p className="mt-3 max-w-4xl text-[13px] leading-6 text-slate-500">
              The circular flow is a topology, the GDP exercise is a defined
              accounting identity, and the supply–demand instrument uses
              normalized linear teaching indices with no currency, quantity
              unit, market size, uncertainty, or empirical calibration. The
              price index and causal cases are evidence-boundary exercises, not
              reported estimates. A model equilibrium is neither a forecast nor
              proof that an outcome is efficient, fair, stable, or desirable.
            </p>
          </div>
          <div className="flex flex-wrap content-start gap-2 md:justify-end">
            <SourceLink
              href="https://www.bea.gov/index.php/news/blog/2025-06-03/bea-blog-expenditures-approach-measuring-gdp"
              label="BEA · GDP expenditure approach"
            />
            <SourceLink
              href="https://www.bea.gov/resources/learning-center/what-to-know-gdp"
              label="BEA · GDP boundary"
            />
            <SourceLink
              href="https://www.bls.gov/cpi/overview.htm"
              label="BLS · CPI overview"
            />
          </div>
        </section>
      </div>
    </main>
  );
}

function Principle({
  icon: Icon,
  label,
  text,
  rgb,
}: {
  icon: LucideIcon;
  label: string;
  text: string;
  rgb: string;
}) {
  return (
    <div className="flex min-h-[138px] flex-col justify-between rounded-[16px] border border-white/[0.06] bg-white/[0.012] p-3">
      <Icon size={17} style={{ color: `rgb(${rgb})` }} />
      <div>
        <div
          className="font-mono text-[11px] uppercase tracking-[0.07em]"
          style={{ color: `rgba(${rgb},0.76)` }}
        >
          {label}
        </div>
        <p className="mt-1.5 text-[12px] leading-5 text-slate-400">{text}</p>
      </div>
    </div>
  );
}

function FieldNode({ child, index }: { child: CurriculumNode; index: number }) {
  const meta =
    FIELD_META[child.id] ?? FIELD_META["social.economics.econometrics"];
  const Icon = meta.icon;
  const planned = child.status === "placeholder";
  const content = (
    <div
      className={`relative z-10 flex min-h-[184px] flex-col rounded-[20px] border p-4 ${planned ? "opacity-65" : "transition hover:-translate-y-1"}`}
      style={{
        borderColor: `rgba(${meta.rgb},0.16)`,
        background: `linear-gradient(145deg,rgba(${meta.rgb},0.055),rgba(0,0,0,0.16))`,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-[12px] border"
          style={{
            color: `rgb(${meta.rgb})`,
            borderColor: `rgba(${meta.rgb},0.22)`,
          }}
        >
          <Icon size={17} />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-slate-600">
          0{index + 1}
        </span>
      </div>
      <h3 className="mt-4 text-[17px] font-semibold text-white">
        {child.label}
      </h3>
      <p className="mt-2 text-[12px] leading-5 text-slate-400">
        {meta.question}
      </p>
      <span
        className="mt-auto pt-4 font-mono text-[11px] uppercase tracking-[0.07em]"
        style={{ color: `rgba(${meta.rgb},0.64)` }}
      >
        {planned ? "planned branch" : "open branch"}
      </span>
    </div>
  );
  return planned ? content : <Link href={child.href}>{content}</Link>;
}

function AppliedField({ child }: { child: CurriculumNode }) {
  const meta = FIELD_META[child.id];
  const Icon = meta?.icon ?? Coins;
  const rgb = meta?.rgb ?? "34, 197, 94";
  const planned = child.status === "placeholder";
  const content = (
    <div
      className={`group flex items-center gap-3 rounded-[14px] border border-white/[0.06] bg-white/[0.014] px-3 py-3 ${planned ? "opacity-60" : "transition hover:bg-white/[0.03]"}`}
    >
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border"
        style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.18)` }}
      >
        <Icon size={14} />
      </span>
      <div className="min-w-0 flex-1">
        <strong className="block text-[13px] text-slate-200">
          {child.label}
        </strong>
        <span className="mt-1 block text-[11px] leading-4 text-slate-500">
          {meta?.question}
        </span>
      </div>
      {planned ? (
        <span className="font-mono text-[11px] uppercase text-slate-700">
          planned
        </span>
      ) : (
        <ArrowRight size={12} className="shrink-0 text-slate-600" />
      )}
    </div>
  );
  return planned ? content : <Link href={child.href}>{content}</Link>;
}

function ModelRule({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="grid grid-cols-[34px_1fr] gap-3 rounded-[14px] border border-white/[0.06] bg-white/[0.012] p-3">
      <div className="font-mono text-[11px] text-emerald-200/50">{number}</div>
      <div>
        <strong className="block text-[12px] text-slate-200">{title}</strong>
        <p className="mt-1 text-[11px] leading-5 text-slate-500">{text}</p>
      </div>
    </div>
  );
}

function assertBranchCoverage(children: readonly CurriculumNode[]) {
  const childIds = children.map((child) => child.id);
  const exactMatch =
    childIds.length === ECONOMICS_BRANCH_IDS.length &&
    childIds.every((id, index) => id === ECONOMICS_BRANCH_IDS[index]);

  if (!exactMatch) {
    throw new Error(
      `Economics branch presentation must match the curriculum registry. Expected ${ECONOMICS_BRANCH_IDS.join(", ")}; received ${childIds.join(", ")}.`
    );
  }
}

function SourceLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="hover:border-emerald-100/28 inline-flex items-center gap-2 rounded-full border border-emerald-100/[0.11] bg-black/15 px-4 py-2.5 text-[11px] font-semibold text-emerald-100/60 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200/60"
    >
      {label} <ExternalLink size={12} aria-hidden="true" />
    </a>
  );
}
