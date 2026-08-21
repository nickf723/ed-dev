import type { Metadata } from "next";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface, WorldWindow } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  Activity,
  ArrowRight,
  Brain,
  ClipboardCheck,
  Dna,
  HeartHandshake,
  Microscope,
  Network,
  Repeat2,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import CognitiveFieldBackground from "./CognitiveFieldBackground";
import CognitionLab from "./CognitionLab";
import PsychologyEvidenceReview from "./PsychologyEvidenceReview";
import {
  PSYCHOLOGY_BRANCH_IDS,
  type PsychologyBranchId,
} from "./psychologyModel";

const NODE_ID = "social.psychology";

export const metadata: Metadata = {
  title: "Psychology",
  description:
    "Study behavior and mental processes across cognitive, biological, developmental, social, personality, clinical, and measurement perspectives.",
};

const SCENES = [
  {
    id: "perception",
    label: "Perception",
    description:
      "Trace how noisy sensory evidence, organization, and context contribute to a stable interpretation.",
    accentRgb: "34, 211, 238",
  },
  {
    id: "attention",
    label: "Attention",
    description:
      "Place a target among competing inputs and see how similarity, load, and useful cues change selection pressure.",
    accentRgb: "244, 114, 182",
  },
  {
    id: "memory",
    label: "Working memory",
    description:
      "Balance limited active capacity against rehearsal and interference while information is maintained.",
    accentRgb: "167, 139, 250",
  },
];

type BranchPresentation = {
  icon: LucideIcon;
  question: string;
  index: string;
  classes: {
    border: string;
    background: string;
    icon: string;
    marker: string;
  };
};

const BRANCH_PRESENTATIONS: Record<PsychologyBranchId, BranchPresentation> = {
  "social.psychology.cognitive": {
    icon: Brain,
    question: "How is information selected, represented, transformed, and remembered?",
    index: "01",
    classes: {
      border: "border-violet-200/20",
      background: "bg-violet-300/[0.035]",
      icon: "text-violet-200",
      marker: "bg-violet-300/70",
    },
  },
  "social.psychology.biological": {
    icon: Dna,
    question: "How do nervous systems, bodies, genes, and environments participate?",
    index: "02",
    classes: {
      border: "border-emerald-200/20",
      background: "bg-emerald-300/[0.035]",
      icon: "text-emerald-200",
      marker: "bg-emerald-300/70",
    },
  },
  "social.psychology.developmental": {
    icon: Repeat2,
    question: "What changes, what persists, and how do pathways differ across a life?",
    index: "03",
    classes: {
      border: "border-amber-200/20",
      background: "bg-amber-300/[0.035]",
      icon: "text-amber-200",
      marker: "bg-amber-300/70",
    },
  },
  "social.psychology.social-personality": {
    icon: Users,
    question: "How do situations, groups, culture, identity, and traits shape action?",
    index: "04",
    classes: {
      border: "border-cyan-200/20",
      background: "bg-cyan-300/[0.035]",
      icon: "text-cyan-200",
      marker: "bg-cyan-300/70",
    },
  },
  "social.psychology.clinical-counseling": {
    icon: HeartHandshake,
    question: "How are distress, adaptation, assessment, and intervention understood?",
    index: "05",
    classes: {
      border: "border-pink-200/20",
      background: "bg-pink-300/[0.035]",
      icon: "text-pink-200",
      marker: "bg-pink-300/70",
    },
  },
  "social.psychology.methods-measurement": {
    icon: Microscope,
    question: "How can private experience become public, ethical, testable evidence?",
    index: "06",
    classes: {
      border: "border-sky-200/20",
      background: "bg-sky-300/[0.035]",
      icon: "text-sky-200",
      marker: "bg-sky-300/70",
    },
  },
};

export default function PsychologyPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  if (context.pageKind !== "hub") {
    throw new Error("Psychology must be classified as a navigation hub.");
  }

  assertBranchCoverage(context.children);

  return (
    <SceneFrame
      background={<CognitiveFieldBackground />}
      initialScene="perception"
      className="bg-[#070610] text-slate-100 selection:bg-pink-400/25"
      maxWidthClassName="max-w-[1600px]"
      headerBackground="rgba(7,6,16,0.50)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Behavior · cognition · biology · development · context · evidence"
          eyebrowStyle="rule"
          icon={Brain}
          title={<span>Psychology</span>}
          subtitle="Psychology studies behavior and mental processes through multiple levels of explanation. It connects observable action and reported experience to cognitive processes, bodies and brains, development, relationships, institutions, culture, and carefully bounded evidence."
          accentRgb="244, 114, 182"
          titleClassName="font-sans text-[clamp(2.9rem,5.5vw,6.2rem)] font-semibold leading-[0.84] tracking-[-0.066em] text-[#fff5fb]"
          headerClassName="border-pink-100/[0.09]"
          aside={
            <div className="grid grid-cols-3 border border-pink-100/[0.12] bg-black/20 font-mono">
              <HeaderMeasure value="6" label="lenses" />
              <HeaderMeasure value="3" label="lab scenes" bordered />
              <HeaderMeasure value="1" label="person" />
            </div>
          }
        />
      }
    >
      <section className="relative isolate mt-7 overflow-hidden border-y border-pink-100/[0.12] py-6 sm:py-7">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(11,7,20,0.36),transparent_32%,transparent_70%,rgba(11,7,20,0.30))] backdrop-blur-[5px]" />
        <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div className="rounded-[20px] bg-[#0b0714]/[0.26] px-4 py-3 backdrop-blur-[18px]">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-pink-200/70">
              <Network size={14} aria-hidden="true" /> Primary navigation ·
              observation register
            </div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.8vw,3.8rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">
              One action can be examined through several compatible lenses.
            </h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-300/75">
              These are direct branches, not six isolated definitions of a
              person. Methods and measurement travel across every branch; the
              other lenses often supply converging explanations for the same
              observation.
            </p>
          </div>
          <Link
            href={context.parent?.href ?? "/social-science"}
            className="group flex items-center justify-between gap-4 border border-white/[0.08] bg-[#0b0714]/[0.36] px-4 py-4 backdrop-blur-[16px] transition hover:bg-[#0b0714]/[0.48] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-200/60"
          >
            <span>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                Parent field
              </span>
              <strong className="mt-1 block text-[15px] text-white">
                {context.parent?.label ?? "Social Science"}
              </strong>
            </span>
            <ArrowRight
              size={15}
              className="text-pink-200/55 transition group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="relative mt-6 grid gap-3 lg:grid-cols-2">
          {context.children.map((child) => (
            <BranchRegister key={child.id} child={child} />
          ))}
        </div>
      </section>

      <section className="mt-24">
        <div className="mb-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
          <div className="rounded-[18px] bg-[#0b0714]/[0.22] px-4 py-3 backdrop-blur-[14px]">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-cyan-200/66">
              <Activity size={14} aria-hidden="true" /> Worked model · one
              process at a time
            </div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">
              Cognition transforms input; it does not passively copy the world.
            </h2>
          </div>
          <p className="rounded-[16px] bg-[#0b0714]/[0.22] px-4 py-3 text-[14px] leading-6 text-slate-400/78 backdrop-blur-[14px]">
            The readouts below are directional teaching models. They help isolate
            relationships among signal, competition, rehearsal, and
            interference; they are not measurements of a learner or clinical
            tests.
          </p>
        </div>
        <WorldWindow
          density="compact"
          eyebrow="Cognition laboratory"
          title="Select a scene, vary one pressure, and compare the representation with the explanation."
          description="Perception, attention, and working memory share information-processing language, but each scene makes a different question visible."
          scenes={SCENES}
        >
          <CognitionLab />
        </WorldWindow>
      </section>

      <section className="mt-24 border-t border-pink-100/[0.10] pt-7">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
          <div className="rounded-[18px] bg-[#0b0714]/[0.18] px-4 py-3 backdrop-blur-[14px]">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-violet-200/62">
              <Network size={14} aria-hidden="true" /> Levels of explanation
            </div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.5vw,3.5rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">
              A biological account and a social account can both matter without
              saying the same thing.
            </h2>
          </div>
          <Surface variant="ghost" className="rounded-[22px] p-5">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-400">
              A good explanation asks
            </div>
            <div className="mt-3 grid gap-2">
              <Question label="What behavior or experience is being explained?" />
              <Question label="At which level does the proposed mechanism operate?" />
              <Question label="What evidence could distinguish competing accounts?" />
            </div>
          </Surface>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-[minmax(0,1.15fr)_minmax(330px,0.85fr)]">
          <Surface variant="ghost" className="rounded-[24px] p-5 sm:p-6">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-cyan-200/68">
              <ClipboardCheck size={14} aria-hidden="true" /> Evidence pipeline
            </div>
            <h3 className="mt-3 text-[clamp(1.7rem,3vw,2.8rem)] font-semibold leading-[0.96] tracking-[-0.045em] text-white">
              Psychological constructs become scientific through explicit
              measurements and testable comparisons.
            </h3>
            <div className="mt-5 grid gap-2 sm:grid-cols-4">
              <MethodStep number="01" label="Define" text="Specify the construct, question, and population." />
              <MethodStep number="02" label="Operationalize" text="Connect it to observable tasks, reports, or measures." />
              <MethodStep number="03" label="Compare" text="Design a contrast that addresses plausible alternatives." />
              <MethodStep number="04" label="Replicate" text="Estimate uncertainty and test whether the pattern repeats." />
            </div>
          </Surface>

          <Surface variant="glass" className="rounded-[24px] p-5 sm:p-6">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-amber-200/68">
              <Activity size={14} aria-hidden="true" /> Correlation is a clue,
              not a mechanism
            </div>
            <div className="mt-5 grid grid-cols-[1fr_54px_1fr] items-center gap-2 text-center">
              <CausalNode label="Sleep quality" tone="cyan" />
              <span className="text-[24px] text-slate-600">↔</span>
              <CausalNode label="Attention score" tone="pink" />
            </div>
            <div className="mx-auto mt-3 h-10 w-px bg-violet-200/24" />
            <CausalNode
              label="Stress, schedule, health, environment…"
              tone="violet"
            />
            <p className="mt-4 text-[13px] leading-6 text-slate-300/70">
              An association may reflect direct influence, reverse influence,
              shared causes, measurement choices, or sampling. Causal claims
              require a design that addresses those alternatives.
            </p>
          </Surface>
        </div>
      </section>

      <section className="mt-24">
        <PsychologyEvidenceReview />
      </section>

      <section className="mt-20 grid gap-5 pb-8 lg:grid-cols-2">
        <div className="border-l border-violet-200/25 bg-violet-300/[0.025] px-5 py-5 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-100/58">
            <Microscope size={13} aria-hidden="true" /> Research boundary ·
            people are not data props
          </div>
          <p className="mt-2 text-[14px] leading-6 text-slate-400">
            Real human-subject research needs ethical review appropriate to its
            context. Respect for persons, beneficence, and justice inform consent,
            risk–benefit review, privacy, and fair participant selection. The
            masked IDs and scores on this page are invented teaching fixtures.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[12px] font-semibold text-violet-100/70">
            <a
              href="https://www.hhs.gov/ohrp/regulations-and-policy/belmont-report/read-the-belmont-report/index.html"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              HHS Belmont Report ↗
            </a>
            <a
              href="https://grants.nih.gov/news-events/nih-extramural-nexus-news/2026/02/nih-launches-new-central-resource-to-support-replication-and-reproducibility"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              NIH replication & reproducibility ↗
            </a>
          </div>
        </div>

        <div className="border-l border-pink-200/25 bg-pink-300/[0.025] px-5 py-5 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-pink-100/58">
            <ShieldCheck size={13} aria-hidden="true" /> Education boundary ·
            not diagnosis or treatment
          </div>
          <p className="mt-2 text-[14px] leading-6 text-slate-400">
            This page explains psychological science. Its tasks and numerical
            cues do not screen, diagnose, assess, or recommend treatment for any
            person. For personal mental-health concerns, use a qualified health
            professional or an appropriate local support service.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[12px] font-semibold text-pink-100/70">
            <a
              href="https://www.apa.org/education-career/guide/subfields"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              APA psychology subfields ↗
            </a>
            <a
              href="https://www.nimh.nih.gov/health/find-help"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              NIMH finding help ↗
            </a>
          </div>
        </div>
      </section>
    </SceneFrame>
  );
}

function BranchRegister({ child }: { child: CurriculumNode }) {
  const presentation = BRANCH_PRESENTATIONS[child.id as PsychologyBranchId];
  const Icon = presentation.icon;

  const content = (
    <>
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-black/20 ${presentation.classes.icon}`}
      >
        <Icon size={17} aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <strong className="text-[16px] tracking-[-0.025em] text-white">
            {child.label}
          </strong>
          <span className="font-mono text-[10px] uppercase tracking-[0.09em] text-slate-600">
            {presentation.index} · planned
          </span>
        </span>
        <span className="mt-1 block text-[13px] leading-5 text-slate-300/74">
          {presentation.question}
        </span>
        <span className="mt-2 block text-[12px] leading-5 text-slate-500">
          {child.description}
        </span>
      </span>
      <span className="hidden h-full w-px bg-white/[0.06] sm:block" />
      <span className={`hidden h-2 w-2 rounded-full sm:block ${presentation.classes.marker}`} />
    </>
  );

  const className = `grid min-h-[154px] grid-cols-[44px_minmax(0,1fr)] gap-4 border-l px-4 py-5 backdrop-blur-[16px] sm:grid-cols-[44px_minmax(0,1fr)_1px_8px] sm:items-center ${presentation.classes.border} ${presentation.classes.background}`;

  if (child.status === "placeholder") {
    return <div className={className}>{content}</div>;
  }

  return (
    <Link
      href={child.href}
      className={`${className} transition hover:bg-white/[0.055] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-200/60`}
    >
      {content}
    </Link>
  );
}

function HeaderMeasure({
  value,
  label,
  bordered = false,
}: {
  value: string;
  label: string;
  bordered?: boolean;
}) {
  return (
    <div
      className={`px-3 py-3 text-center ${
        bordered ? "border-x border-pink-100/[0.10]" : ""
      }`}
    >
      <strong className="block text-[18px] text-pink-100">{value}</strong>
      <span className="mt-1 block text-[9px] uppercase tracking-[0.08em] text-slate-600">
        {label}
      </span>
    </div>
  );
}

function Question({ label }: { label: string }) {
  return (
    <div className="rounded-[12px] border border-white/[0.07] bg-black/[0.14] px-3 py-2.5 text-[13px] leading-5 text-slate-200/74">
      {label}
    </div>
  );
}

function MethodStep({
  number,
  label,
  text,
}: {
  number: string;
  label: string;
  text: string;
}) {
  return (
    <div className="min-h-[160px] rounded-[16px] border border-white/[0.07] bg-black/[0.14] p-4">
      <div className="font-mono text-[11px] text-cyan-200/62">{number}</div>
      <h3 className="mt-4 text-[15px] font-semibold text-white">{label}</h3>
      <p className="mt-2 text-[12px] leading-5 text-slate-400/72">{text}</p>
    </div>
  );
}

function CausalNode({
  label,
  tone,
}: {
  label: string;
  tone: "cyan" | "pink" | "violet";
}) {
  const toneClass =
    tone === "cyan"
      ? "border-cyan-200/20 bg-cyan-300/[0.035] text-cyan-100"
      : tone === "pink"
        ? "border-pink-200/20 bg-pink-300/[0.035] text-pink-100"
        : "border-violet-200/20 bg-violet-300/[0.035] text-violet-100";

  return (
    <div
      className={`rounded-[14px] border px-3 py-3 text-center text-[13px] font-semibold ${toneClass}`}
    >
      {label}
    </div>
  );
}

function assertBranchCoverage(children: readonly CurriculumNode[]) {
  const childIds = children.map((child) => child.id);
  const exact =
    childIds.length === PSYCHOLOGY_BRANCH_IDS.length &&
    childIds.every((id, index) => id === PSYCHOLOGY_BRANCH_IDS[index]);

  if (!exact) {
    throw new Error(
      `Psychology branch presentation must match the curriculum registry. Expected ${PSYCHOLOGY_BRANCH_IDS.join(", ")}; received ${childIds.join(", ")}.`,
    );
  }
}
