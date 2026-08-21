import Link from "next/link";
import type { Metadata } from "next";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Blocks,
  Database,
  Eye,
  ExternalLink,
  GitCompareArrows,
  Network,
  Scale,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Target,
  TestTube2,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import DataScienceBackground from "./_components/DataScienceBackground";
import DataScienceEvidenceLab from "./_components/DataScienceEvidenceLab";
import KMeansLab from "./_components/KMeansLab";
import { DATA_SCIENCE_BRANCH_IDS } from "./dataScienceModel";

const NODE_ID = "formal.data-science";

export const metadata: Metadata = {
  title: "Data Science",
  description:
    "Learn the path from data collection and exploration through modeling, evaluation, causal reasoning, and responsible communication.",
};

type BranchMeta = {
  icon: LucideIcon;
  code: string;
  question: string;
  rgb: string;
};

const BRANCH_META: Record<string, BranchMeta> = {
  "formal.data-science.collection-wrangling": {
    icon: Database,
    code: "DATA",
    question:
      "How was the dataset measured, sampled, joined, cleaned, transformed, and documented before analysis began?",
    rgb: "34,211,238",
  },
  "formal.data-science.exploration": {
    icon: Eye,
    code: "EDA",
    question:
      "Which distributions, relationships, groups, anomalies, missing patterns, and scale choices deserve closer attention?",
    rgb: "94,234,212",
  },
  "formal.data-science.statistics": {
    icon: Scale,
    code: "STAT",
    question:
      "Which probability model represents uncertainty, and what can the sample support about a larger process or population?",
    rgb: "251,191,36",
  },
  "formal.data-science.machine-learning": {
    icon: Target,
    code: "ML",
    question:
      "Which representation, objective, model family, training procedure, and validation design support useful generalization?",
    rgb: "167,139,250",
  },
  "formal.data-science.data-engineering": {
    icon: Blocks,
    code: "PIPE",
    question:
      "How should data be stored, moved, validated, recomputed, monitored, and served reliably at the required scale?",
    rgb: "96,165,250",
  },
  "formal.data-science.visualization-communication": {
    icon: BarChart3,
    code: "VIS",
    question:
      "Which visual encodings reveal the important pattern without hiding uncertainty, scale, missingness, or comparison context?",
    rgb: "244,114,182",
  },
  "formal.data-science.causal-experiments": {
    icon: TestTube2,
    code: "CAUSE",
    question:
      "What intervention or design would distinguish a causal effect from association, confounding, selection, or common causes?",
    rgb: "251,146,60",
  },
  "formal.data-science.responsible-evaluation": {
    icon: ShieldCheck,
    code: "EVAL",
    question:
      "Does the measurement remain valid, the evaluation remain independent, and the system remain useful across groups, shifts, and real deployment?",
    rgb: "248,113,113",
  },
};

const QUESTIONS = [
  {
    label: "Measure",
    note: "What does each row, field, label, and missing value actually represent?",
    rgb: "34,211,238",
  },
  {
    label: "Describe",
    note: "What patterns exist in this dataset before a predictive model is involved?",
    rgb: "94,234,212",
  },
  {
    label: "Infer",
    note: "Which claims extend beyond the observed sample, and how uncertain are they?",
    rgb: "251,191,36",
  },
  {
    label: "Predict",
    note: "How well will a model perform on relevant data it did not train on?",
    rgb: "167,139,250",
  },
  {
    label: "Explain cause",
    note: "What would happen under an intervention, not merely what tends to co-occur?",
    rgb: "251,146,60",
  },
  {
    label: "Communicate",
    note: "What does the audience need to see to inspect the evidence and its limits?",
    rgb: "244,114,182",
  },
] as const;

const CHECKS = [
  {
    label: "Provenance",
    text: "Record where data came from, how it was measured, when it was collected, and which transformations produced the analytical table.",
  },
  {
    label: "Leakage",
    text: "Keep information from the evaluation target or future outside the features available when the prediction would actually be made.",
  },
  {
    label: "Baseline",
    text: "Compare a complicated model against simple rules, naive predictions, or established procedures before calling complexity an improvement.",
  },
  {
    label: "Held-out evidence",
    text: "Use genuinely separate data or designs to estimate performance rather than repeatedly tuning against the same evidence.",
  },
  {
    label: "Shift",
    text: "Ask whether the people, environment, measurement process, incentives, or data distribution can change after development.",
  },
  {
    label: "Decision cost",
    text: "A statistically strong metric can still support a poor system when false positives, false negatives, delay, fairness, privacy, or action costs matter differently.",
  },
] as const;

export default function DataSciencePage() {
  const context = requireCurriculumPageContext(NODE_ID);

  if (context.pageKind !== "hub") {
    throw new Error("Data Science must be classified as a navigation hub.");
  }

  assertBranchCoverage(context.children);

  const left = context.children.slice(0, 4);
  const right = context.children.slice(4);

  return (
    <SceneFrame
      background={<DataScienceBackground />}
      className="bg-[#03070c] text-slate-100 selection:bg-cyan-300/25"
      maxWidthClassName="max-w-[1600px]"
      headerBackground="rgba(3,7,12,0.48)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Measurement · wrangling · inference · modeling · evaluation · communication"
          eyebrowStyle="rule"
          icon={Network}
          title={<span>Data Science</span>}
          subtitle="Data science turns recorded observations into defensible descriptions, inferences, predictions, decisions, and communication. The work begins before modeling, with measurement and provenance, and continues after modeling, with evaluation, interpretation, monitoring, and the consequences of use."
          accentRgb="34, 211, 238"
          titleClassName="font-sans text-[clamp(2.9rem,5.5vw,6.2rem)] font-semibold leading-[0.84] tracking-[-0.065em] text-[#f0fdff]"
          headerClassName="border-cyan-100/[0.09]"
        />
      }
    >
      <section className="relative isolate mt-10 overflow-hidden border-y border-cyan-100/[0.11] py-6 sm:py-8">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,14,0.42),transparent_31%,transparent_69%,rgba(4,4,16,0.38))] backdrop-blur-[2px]" />
        <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
          <div>
            <div className="text-cyan-200/66 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em]">
              <Workflow size={14} /> Primary navigation · data practice map
            </div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.7vw,3.7rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">
              The model is one station in a longer chain from measurement to
              evidence to action.
            </h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-300/70">
              These planned branches separate major kinds of work so navigation
              is clear. Real projects move between them repeatedly: exploration
              can expose a collection problem, evaluation can force a feature
              redesign, and communication can reveal that the original metric
              was answering the wrong question.
            </p>
          </div>
          <Link
            href={context.parent?.href ?? "/formal-science"}
            className="group flex items-center justify-between gap-4 border-l border-cyan-200/[0.18] bg-black/[0.09] px-4 py-3 backdrop-blur-[8px] transition hover:bg-black/[0.16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/60"
          >
            <span>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                Parent field
              </span>
              <strong className="mt-1 block text-[14px] text-white">
                {context.parent?.label ?? "Formal Science"}
              </strong>
            </span>
            <ArrowRight
              size={15}
              className="text-cyan-200/55 transition group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="relative mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px_minmax(0,1fr)] xl:items-stretch">
          <div className="space-y-2.5">
            {left.map((branch) => (
              <DataRoute key={branch.id} branch={branch} side="left" />
            ))}
          </div>
          <QuestionCore />
          <div className="space-y-2.5">
            {right.map((branch) => (
              <DataRoute key={branch.id} branch={branch} side="right" />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-20">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-violet-200/60">
              Unsupervised-learning instrument
            </div>
            <h2 className="mt-1 text-[23px] font-semibold tracking-[-0.035em] text-white">
              Watch a fitting objective create a partition without turning that
              partition into ground truth.
            </h2>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-slate-600">
            deterministic teaching sample
          </span>
        </div>
        <KMeansLab />
      </section>

      <section className="mt-20 border-t border-cyan-100/[0.10] pt-8">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div>
            <div className="text-amber-200/58 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em]">
              <SearchCheck size={14} /> Evaluation discipline · reference, not
              navigation
            </div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">
              A clean metric cannot rescue a contaminated question.
            </h2>
          </div>
          <p className="text-slate-400/72 text-[14px] leading-6">
            The most consequential failures often happen outside the
            optimization loop: a target that does not measure the intended
            concept, leakage from the future, an evaluation set tuned into a
            training set, a deployment population that differs from development,
            or a metric that ignores the cost of mistakes.
          </p>
        </div>
        <div className="mt-5 grid border-y border-white/[0.08] md:grid-cols-2 xl:grid-cols-3">
          {CHECKS.map((item, index) => (
            <div
              key={item.label}
              className="grid grid-cols-[42px_minmax(0,1fr)] gap-3 border-b border-white/[0.07] px-4 py-4 xl:border-b xl:border-r xl:[&:nth-child(3n)]:border-r-0 md:[&:nth-last-child(-n+2)]:border-b-0 xl:[&:nth-last-child(-n+3)]:border-b-0"
            >
              <span className="text-cyan-200/42 font-mono text-[11px]">
                0{index + 1}
              </span>
              <span>
                <strong className="text-slate-200/86 block text-[13px]">
                  {item.label}
                </strong>
                <span className="mt-1 block text-[12px] leading-5 text-slate-500">
                  {item.text}
                </span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 border-t border-cyan-100/[0.10] pt-8">
        <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-slate-500">
          <GitCompareArrows size={13} /> Three claims that should never be
          silently merged
        </div>
        <div className="mt-4 grid border-y border-white/[0.08] lg:grid-cols-3">
          <Claim
            label="Description"
            text="What patterns are present in the observed data?"
            rgb="94,234,212"
          />
          <Claim
            label="Prediction"
            text="How accurately can an outcome be estimated for relevant unseen cases?"
            rgb="167,139,250"
          />
          <Claim
            label="Causation"
            text="How would the outcome change under an intervention?"
            rgb="251,146,60"
          />
        </div>
      </section>

      <div className="mt-20">
        <DataScienceEvidenceLab />
      </div>

      <section className="mt-20 grid gap-5 border-t border-cyan-100/[0.10] px-1 pt-8 md:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)]">
        <div>
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-slate-500">
            Source &amp; model boundary
          </div>
          <p className="mt-3 max-w-4xl text-[13px] leading-6 text-slate-500">
            The K-means instrument uses a fixed two-dimensional teaching sample,
            Euclidean distance, fixed starting centroids, and within-cluster
            squared distance. It demonstrates an optimization procedure—not a
            uniquely true classification. The evaluation files are schematic;
            real validity depends on the population, measurement process,
            decision, and deployment conditions.
          </p>
        </div>
        <div className="flex flex-wrap content-start gap-2 md:justify-end">
          <SourceLink
            href="https://scikit-learn.org/stable/modules/clustering.html#k-means"
            label="scikit-learn · K-means"
          />
          <SourceLink
            href="https://scikit-learn.org/stable/common_pitfalls.html#data-leakage"
            label="scikit-learn · Data leakage"
          />
          <SourceLink
            href="https://www.nist.gov/itl/ai-risk-management-framework"
            label="NIST · AI Risk Management"
          />
        </div>
      </section>
    </SceneFrame>
  );
}

function assertBranchCoverage(children: readonly CurriculumNode[]) {
  const childIds = children.map((child) => child.id);
  const exactMatch =
    childIds.length === DATA_SCIENCE_BRANCH_IDS.length &&
    childIds.every((id, index) => id === DATA_SCIENCE_BRANCH_IDS[index]);

  if (!exactMatch) {
    throw new Error(
      `Data Science branch presentation must match the curriculum registry. Expected ${DATA_SCIENCE_BRANCH_IDS.join(
        ", "
      )}; received ${childIds.join(", ")}.`
    );
  }
}

function DataRoute({
  branch,
  side,
}: {
  branch: CurriculumNode;
  side: "left" | "right";
}) {
  const meta = BRANCH_META[branch.id] ?? {
    icon: Database,
    code: "DATA",
    question: branch.description ?? "Explore this branch of data science.",
    rgb: "34,211,238",
  };
  const Icon = meta.icon;
  const planned = branch.status === "placeholder";
  const content = (
    <div
      className="group relative min-h-[112px] border-y border-white/[0.07] bg-black/[0.075] px-3 py-3 backdrop-blur-[10px] transition hover:bg-black/[0.13]"
      style={{
        boxShadow: `inset ${side === "left" ? "3px" : "-3px"} 0 0 rgba(${meta.rgb},0.38)`,
      }}
    >
      <div className="grid grid-cols-[40px_minmax(0,1fr)_54px] gap-3">
        <span
          className="flex h-9 w-9 items-center justify-center border"
          style={{
            color: `rgb(${meta.rgb})`,
            borderColor: `rgba(${meta.rgb},0.25)`,
            background: `rgba(${meta.rgb},0.045)`,
          }}
        >
          <Icon size={15} />
        </span>
        <span>
          <span
            className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em]"
            style={{ color: `rgba(${meta.rgb},0.70)` }}
          >
            {meta.code}
          </span>
          <strong className="text-white/88 mt-0.5 block text-[15px]">
            {branch.label}
          </strong>
          <span className="mt-1 block text-[11px] leading-4 text-slate-500">
            {meta.question}
          </span>
        </span>
        <span className="pt-1 text-right font-mono text-[11px] uppercase text-slate-600">
          {planned ? "planned" : "open"}
        </span>
      </div>
    </div>
  );
  return planned ? (
    <div aria-disabled="true">{content}</div>
  ) : (
    <Link href={branch.href}>{content}</Link>
  );
}

function QuestionCore() {
  return (
    <Surface
      variant="ghost"
      className="relative min-h-[486px] overflow-hidden rounded-[28px] border-cyan-100/[0.09]"
      style={{ background: "rgba(2,8,14,0.06)" }}
    >
      <div className="relative p-4">
        <div className="text-cyan-200/52 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em]">
          <Sparkles size={13} /> Question stack
        </div>
        <p className="text-slate-400/64 mt-2 text-[12px] leading-5">
          Different analytical goals can use the same dataset while requiring
          different evidence.
        </p>
      </div>
      <div className="relative mx-4 mt-1 space-y-1">
        {QUESTIONS.map((question, index) => (
          <div
            key={question.label}
            className="relative border-b border-white/[0.06] py-3 last:border-b-0"
          >
            <div className="flex items-start gap-3">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-[11px]"
                style={{
                  color: `rgb(${question.rgb})`,
                  borderColor: `rgba(${question.rgb},0.24)`,
                  background: `rgba(${question.rgb},0.04)`,
                }}
              >
                0{index + 1}
              </span>
              <span>
                <strong
                  className="block text-[13px]"
                  style={{ color: `rgba(${question.rgb},0.84)` }}
                >
                  {question.label}
                </strong>
                <span className="mt-1 block text-[11px] leading-4 text-slate-500">
                  {question.note}
                </span>
              </span>
            </div>
            {index < QUESTIONS.length - 1 ? (
              <ArrowDown size={12} className="ml-[10px] mt-2 text-slate-700" />
            ) : null}
          </div>
        ))}
      </div>
    </Surface>
  );
}

function Claim({
  label,
  text,
  rgb,
}: {
  label: string;
  text: string;
  rgb: string;
}) {
  return (
    <div className="px-4 py-4 lg:border-r lg:border-white/[0.08] lg:last:border-r-0">
      <div
        className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em]"
        style={{ color: `rgba(${rgb},0.70)` }}
      >
        {label}
      </div>
      <p className="text-slate-300/68 mt-2 text-[13px] leading-6">{text}</p>
    </div>
  );
}

function SourceLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="hover:border-cyan-100/28 inline-flex items-center gap-2 rounded-full border border-cyan-100/[0.11] bg-black/15 px-4 py-2.5 text-[11px] font-semibold text-cyan-100/60 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/60"
    >
      {label} <ExternalLink size={12} aria-hidden="true" />
    </a>
  );
}
