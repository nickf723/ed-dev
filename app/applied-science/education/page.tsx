import type { Metadata } from "next";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpenCheck,
  Brain,
  ClipboardCheck,
  GraduationCap,
  Layers3,
  Users,
} from "lucide-react";
import LearningStudioBackground from "./LearningStudioBackground";
import LearningAlignmentLab from "./LearningAlignmentLab";
import EducationEvidenceReview from "./EducationEvidenceReview";
import {
  EDUCATION_DIRECT_BRANCH_IDS,
  EDUCATION_FOLIOS,
} from "./educationModel";

const NODE_ID = "applied.education";

export const metadata: Metadata = {
  title: "Education",
  description:
    "Study learning goals, instruction, practice, feedback, assessment, accessibility, technology, professional learning, and educational systems.",
};

const BRANCH_META: Record<
  string,
  { icon: LucideIcon; code: string; rgb: string }
> = {
  "applied.education.learning-sciences": {
    icon: Brain,
    code: "LS",
    rgb: "96,165,250",
  },
  "applied.education.curriculum-instruction": {
    icon: BookOpenCheck,
    code: "CI",
    rgb: "167,139,250",
  },
  "applied.education.assessment": {
    icon: ClipboardCheck,
    code: "ASM",
    rgb: "52,211,153",
  },
  "applied.education.instructional-design": {
    icon: Layers3,
    code: "ID",
    rgb: "251,191,36",
  },
  "applied.education.accessibility-special-education": {
    icon: Users,
    code: "ACC",
    rgb: "244,114,182",
  },
  "applied.education.educational-technology": {
    icon: Layers3,
    code: "EDT",
    rgb: "125,211,252",
  },
  "applied.education.teaching-learning-environments": {
    icon: Users,
    code: "ENV",
    rgb: "134,239,172",
  },
  "applied.education.policy-systems": {
    icon: GraduationCap,
    code: "SYS",
    rgb: "253,186,116",
  },
  "applied.education.teacher-learning": {
    icon: GraduationCap,
    code: "TPL",
    rgb: "216,180,254",
  },
};

const LOOP = [
  {
    label: "Experience",
    note: "encounter an example, problem, explanation, model, demonstration, text, discussion, or situation",
    rgb: "96,165,250",
  },
  {
    label: "Practice",
    note: "attempt the target performance with an appropriate level of support and variation",
    rgb: "167,139,250",
  },
  {
    label: "Feedback",
    note: "compare evidence with the goal, surface errors or gaps, and decide what to revise or reinforce",
    rgb: "52,211,153",
  },
  {
    label: "Transfer",
    note: "revisit the learning in changed tasks, contexts, time intervals, representations, or combinations",
    rgb: "251,191,36",
  },
] as const;

const REFERENCE_SOURCES = [
  {
    label: "What Works Clearinghouse",
    eyebrow: "Research review repository",
    href: "https://ies.ed.gov/ncee/wwc/",
    note: "Search practice guides, intervention reports, individual-study reviews, and downloadable review data.",
    boundary:
      "A WWC review applies stated evidence standards to available studies. It is not an endorsement, a universal prescription, or a substitute for local judgment.",
    rgb: "52,211,153",
  },
  {
    label: "NCES Common Core of Data",
    eyebrow: "Public system records",
    href: "https://nces.ed.gov/ccd/",
    note: "Inspect annual records and descriptive statistics for U.S. public schools and districts, with documentation attached.",
    boundary:
      "Keep year, geography, universe, unit, release status, missingness, and revision notes with every number. A system record is not a causal estimate or a learner diagnosis.",
    rgb: "96,165,250",
  },
  {
    label: "CAST UDL Guidelines 3.0",
    eyebrow: "Design reference",
    href: "https://udlguidelines.cast.org/",
    note: "Explore design considerations intended to reduce barriers and support meaningful participation and learner agency.",
    boundary:
      "The guidelines are a revisable design resource, not a guarantee that one option works for every learner and not an individualized legal determination.",
    rgb: "167,139,250",
  },
  {
    label: "IDEA statute & regulations",
    eyebrow: "United States legal source",
    href: "https://sites.ed.gov/idea/",
    note: "Follow the official U.S. Department of Education source for the statute, regulations, policy material, and implementation resources.",
    boundary:
      "Jurisdiction, eligibility, age, setting, current guidance, and individual circumstances matter. This page teaches a field boundary; it does not provide legal advice.",
    rgb: "244,114,182",
  },
] as const;

export default function EducationPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  const children = context.children;
  const byId = new Map(children.map((child) => [child.id, child]));

  if (context.pageKind !== "hub") {
    throw new Error("Education must be classified as a navigation hub.");
  }

  assertBranchCoverage(children);

  return (
    <SceneFrame
      background={<LearningStudioBackground />}
      className="bg-[#070911] text-slate-100 selection:bg-blue-300/25"
      maxWidthClassName="max-w-[1680px]"
      headerBackground="rgba(7,9,17,0.55)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Goals · learning · instruction · evidence · feedback · systems"
          eyebrowStyle="rule"
          icon={GraduationCap}
          title={<span>Education</span>}
          subtitle="Design learning environments that connect worthwhile goals with prior knowledge, instruction, practice, feedback, assessment, accessibility, motivation, social context, technology, curriculum, and opportunities to use learning beyond the original lesson."
          accentRgb="96, 165, 250"
          titleClassName="font-sans text-[clamp(3rem,5.5vw,6rem)] font-semibold leading-[0.84] tracking-[-0.066em] text-[#eff6ff]"
          headerClassName="border-blue-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-8 border-y border-blue-100/[0.10] py-7 sm:py-9">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(7,9,17,0.28),transparent_28%,transparent_72%,rgba(7,9,17,0.24))] backdrop-blur-[5px]" />
        <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div className="-mx-3 rounded-[20px] bg-[#0a0c18]/[0.30] px-3 py-2 backdrop-blur-[20px]">
            <div className="text-blue-100/62 font-mono text-[11px] font-semibold uppercase tracking-[0.11em]">
              Primary navigation · learning-design folio
            </div>
            <h2 className="mt-1 max-w-5xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.046em] text-white">
              Open the field through the questions a learning designer, teacher,
              researcher, or system has to hold together.
            </h2>
            <p className="text-slate-400/72 mt-2 max-w-4xl text-[12px] leading-5">
              The three folio sheets are conceptual work areas, not a sequence
              or hierarchy. Education routinely crosses all three at once, and
              each direct branch can inform the others.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Neighbor
              href="/social-science/psychology"
              label="Psychology"
              note="cognition · development · behavior"
            />
            <Neighbor
              href="/applied-science/computer-technology"
              label="Technology"
              note="tools · platforms · systems"
            />
          </div>
        </div>

        <LearningFolio byId={byId} />
      </section>

      <section className="mt-24">
        <div className="mb-5 grid gap-4 border-b border-blue-100/[0.08] pb-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div className="rounded-[18px] bg-[#0a0c18]/[0.18] px-4 py-3 backdrop-blur-[14px]">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-blue-100/55">
              Alignment instrument · after the field map
            </div>
            <h2 className="mt-1 text-[clamp(1.55rem,2.6vw,2.45rem)] font-semibold tracking-[-0.042em] text-white">
              A learner can only demonstrate what the task actually gives them a
              chance to do.
            </h2>
          </div>
          <p className="rounded-[16px] bg-[#0a0c18]/[0.18] px-4 py-3 text-[13px] leading-6 text-slate-400 backdrop-blur-[14px]">
            The alignment studio tests whether a goal, activity, and evidence
            task ask for compatible performances. It does not collapse teaching
            quality into a magic score.
          </p>
        </div>
        <LearningAlignmentLab />
      </section>

      <section className="mt-24 border-t border-blue-100/[0.09] pt-7">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div className="rounded-[18px] bg-[#0a0c18]/[0.16] px-4 py-3 backdrop-blur-[14px]">
            <div className="text-violet-100/52 font-mono text-[11px] font-semibold uppercase tracking-[0.10em]">
              One useful learning loop · reference, not navigation
            </div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">
              Experience, practice, feedback, and transfer recur, overlap, and
              feed one another.
            </h2>
          </div>
          <p className="text-slate-400/72 rounded-[16px] bg-[#0a0c18]/[0.16] px-4 py-3 text-[13px] leading-6 backdrop-blur-[14px]">
            This is a planning lens, not a universal stage theory. Learning can
            begin with retrieval, inquiry, explanation, observation, direct
            instruction, collaboration, prior experience, or other routes
            depending on the learner, content, goal, and setting.
          </p>
        </div>
        <div className="mt-5 grid border-y border-white/[0.07] md:grid-cols-2 xl:grid-cols-4">
          {LOOP.map((stage, index) => (
            <LoopStage
              key={stage.label}
              stage={stage}
              number={`0${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="mt-24">
        <EducationEvidenceReview />
      </section>

      <section className="mt-24 border-t border-blue-100/[0.10] pb-10 pt-7">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div className="rounded-[18px] bg-[#0a0c18]/[0.16] px-4 py-3 backdrop-blur-[14px]">
            <div className="text-emerald-100/58 font-mono text-[11px] font-semibold uppercase tracking-[0.10em]">
              Reference shelf · provenance before claims
            </div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">
              Evidence, system records, design guidance, and law answer
              different questions.
            </h2>
          </div>
          <p className="rounded-[16px] bg-[#0a0c18]/[0.16] px-4 py-3 text-[13px] leading-6 text-slate-400/75 backdrop-blur-[14px]">
            These official sources establish future repository boundaries. This
            page performs no render-time fetch and does not silently blend a
            research review, a descriptive dataset, a design framework, and a
            legal authority into one confidence score.
          </p>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {REFERENCE_SOURCES.map((source) => (
            <ReferenceSource key={source.label} source={source} />
          ))}
        </div>
      </section>
    </SceneFrame>
  );
}

function LearningFolio({ byId }: { byId: Map<string, CurriculumNode> }) {
  return (
    <nav
      aria-label="Education fields by conceptual work area"
      className="relative mt-5 min-h-[650px] overflow-hidden border border-blue-100/[0.10] bg-[#090b16]/[0.24] shadow-[0_30px_95px_rgba(0,0,0,0.18)] backdrop-blur-[18px] backdrop-saturate-[1.06]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(147,197,253,0.06)_1px,transparent_1px)] [background-size:100%_34px]" />
      <div className="hidden lg:block">
        <FolioSheet
          folio={EDUCATION_FOLIOS[0]}
          byId={byId}
          className="left-[3%] top-[9%] w-[34%] -rotate-[1.2deg]"
        />
        <FolioSheet
          folio={EDUCATION_FOLIOS[1]}
          byId={byId}
          className="left-[33%] top-[15%] z-10 w-[36%] rotate-[0.8deg]"
        />
        <FolioSheet
          folio={EDUCATION_FOLIOS[2]}
          byId={byId}
          className="right-[3%] top-[7%] w-[33%] -rotate-[0.5deg]"
        />
        <div className="text-blue-100/38 absolute bottom-3 left-4 rounded-full bg-[#0a0c18]/60 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.09em] backdrop-blur-[14px]">
          conceptual work areas overlap · not a sequence
        </div>
        <div className="absolute bottom-3 right-4 rounded-full bg-[#0a0c18]/60 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.09em] text-slate-600 backdrop-blur-[14px]">
          planned tabs define the future curriculum
        </div>
      </div>
      <div className="space-y-3 p-3 lg:hidden">
        {EDUCATION_FOLIOS.map((folio) => (
          <MobileFolio key={folio.id} folio={folio} byId={byId} />
        ))}
      </div>
    </nav>
  );
}

function FolioSheet({
  folio,
  byId,
  className,
}: {
  folio: (typeof EDUCATION_FOLIOS)[number];
  byId: Map<string, CurriculumNode>;
  className: string;
}) {
  const branches = folio.ids
    .map((id) => byId.get(id))
    .filter((branch): branch is CurriculumNode => Boolean(branch));
  return (
    <article
      className={`absolute min-h-[470px] border bg-[#0b0d1a]/[0.58] shadow-[0_28px_70px_rgba(0,0,0,0.24)] backdrop-blur-[20px] ${className}`}
      style={{ borderColor: `rgba(${folio.rgb},0.17)` }}
    >
      <div className="border-b border-white/[0.07] px-5 py-4">
        <div
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em]"
          style={{ color: `rgba(${folio.rgb},0.62)` }}
        >
          {folio.number}
        </div>
        <h3 className="mt-1 text-[22px] font-semibold tracking-[-0.04em] text-white">
          {folio.title}
        </h3>
        <p className="mt-2 text-[11px] leading-5 text-slate-500">
          {folio.note}
        </p>
      </div>
      <div className="p-3">
        {branches.map((branch, index) => (
          <FolioTab key={branch.id} branch={branch} index={index} />
        ))}
      </div>
      <div className="pointer-events-none absolute bottom-3 right-4 font-mono text-[11px] uppercase tracking-[0.08em] text-slate-700">
        working sheet
      </div>
    </article>
  );
}

function FolioTab({
  branch,
  index,
}: {
  branch: CurriculumNode;
  index: number;
}) {
  const meta = BRANCH_META[branch.id] ?? {
    icon: GraduationCap,
    code: `E${index + 1}`,
    rgb: "148,163,184",
  };
  const Icon = meta.icon;
  const active = branch.status === "active";
  const content = (
    <div
      className={`group relative mb-2 grid min-h-[82px] grid-cols-[38px_minmax(0,1fr)_60px] gap-3 border border-white/[0.065] bg-black/[0.08] px-3 py-3 backdrop-blur-[12px] transition last:mb-0 ${active ? "hover:bg-white/[0.025]" : "opacity-58"}`}
    >
      <span
        className="flex h-8 w-8 items-center justify-center rounded-full border"
        style={{
          color: `rgb(${meta.rgb})`,
          borderColor: `rgba(${meta.rgb},0.24)`,
          background: `rgba(${meta.rgb},0.04)`,
        }}
      >
        <Icon size={12} />
      </span>
      <span>
        <span
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.07em]"
          style={{ color: `rgba(${meta.rgb},0.60)` }}
        >
          {meta.code}
        </span>
        <strong className="text-white/84 mt-0.5 block text-[12px] leading-4">
          {branch.label}
        </strong>
        <span className="mt-1 block text-[11px] leading-4 text-slate-500">
          {branch.description}
        </span>
      </span>
      <span className="flex items-start justify-end pt-1 font-mono text-[11px] uppercase tracking-[0.06em] text-slate-500">
        {active ? (
          <span
            className="flex items-center gap-1"
            style={{ color: `rgba(${meta.rgb},0.58)` }}
          >
            open{" "}
            <ArrowRight
              size={10}
              className="transition group-hover:translate-x-1"
            />
          </span>
        ) : (
          "planned"
        )}
      </span>
      <span
        className="pointer-events-none absolute -right-3 top-3 h-[24px] w-3 border-y border-r"
        style={{
          borderColor: `rgba(${meta.rgb},0.16)`,
          background: `rgba(${meta.rgb},0.05)`,
        }}
      />
    </div>
  );
  return active ? (
    <Link href={branch.href}>{content}</Link>
  ) : (
    <div aria-disabled="true">{content}</div>
  );
}

function MobileFolio({
  folio,
  byId,
}: {
  folio: (typeof EDUCATION_FOLIOS)[number];
  byId: Map<string, CurriculumNode>;
}) {
  const branches = folio.ids
    .map((id) => byId.get(id))
    .filter((branch): branch is CurriculumNode => Boolean(branch));
  return (
    <section
      className="border bg-[#0b0d1a]/[0.52] backdrop-blur-[20px]"
      style={{ borderColor: `rgba(${folio.rgb},0.16)` }}
    >
      <div className="border-b border-white/[0.06] px-3 py-3">
        <span
          className="font-mono text-[11px] uppercase"
          style={{ color: `rgba(${folio.rgb},0.58)` }}
        >
          {folio.number}
        </span>
        <strong className="text-white/84 mt-1 block text-[14px]">
          {folio.title}
        </strong>
        <p className="mt-1 text-[11px] leading-5 text-slate-500">
          {folio.note}
        </p>
      </div>
      <div className="p-2">
        {branches.map((branch, index) => (
          <FolioTab key={branch.id} branch={branch} index={index} />
        ))}
      </div>
    </section>
  );
}

function Neighbor({
  href,
  label,
  note,
}: {
  href: string;
  label: string;
  note: string;
}) {
  return (
    <Link
      href={href}
      className="group flex min-h-[68px] flex-col justify-between border border-white/[0.08] bg-[#0a0c18]/[0.34] px-3 py-2.5 backdrop-blur-[18px] transition hover:bg-[#0a0c18]/[0.46] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200/60"
    >
      <span className="text-white/82 text-[12px] font-semibold">{label}</span>
      <span className="flex items-end justify-between gap-2">
        <span className="text-[11px] leading-4 text-slate-500">{note}</span>
        <ArrowRight
          size={11}
          className="text-slate-500 transition group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}

function LoopStage({
  stage,
  number,
}: {
  stage: (typeof LOOP)[number];
  number: string;
}) {
  return (
    <div className="grid min-h-[142px] grid-cols-[38px_minmax(0,1fr)] gap-2 border-b border-white/[0.06] bg-[#0a0c18]/[0.14] px-4 py-4 backdrop-blur-[12px] xl:border-b-0 xl:border-r xl:last:border-r-0">
      <span
        className="font-mono text-[11px]"
        style={{ color: `rgba(${stage.rgb},0.42)` }}
      >
        {number}
      </span>
      <span>
        <strong
          className="text-[13px]"
          style={{ color: `rgba(${stage.rgb},0.78)` }}
        >
          {stage.label}
        </strong>
        <span className="mt-2 block text-[12px] leading-5 text-slate-500">
          {stage.note}
        </span>
      </span>
    </div>
  );
}

function ReferenceSource({
  source,
}: {
  source: (typeof REFERENCE_SOURCES)[number];
}) {
  return (
    <a
      href={source.href}
      target="_blank"
      rel="noreferrer"
      className="group grid min-h-[220px] grid-rows-[auto_auto_1fr_auto] border border-white/[0.08] bg-[#0a0c18]/[0.22] px-5 py-5 backdrop-blur-[16px] transition hover:bg-[#0a0c18]/[0.38] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200/60"
      style={{ borderLeftColor: `rgba(${source.rgb},0.38)` }}
    >
      <span
        className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em]"
        style={{ color: `rgba(${source.rgb},0.70)` }}
      >
        {source.eyebrow}
      </span>
      <strong className="mt-2 flex items-center justify-between gap-3 text-[18px] text-white">
        {source.label}
        <ArrowRight
          size={14}
          className="transition group-hover:translate-x-1"
          aria-hidden="true"
        />
      </strong>
      <span className="mt-3 text-[13px] leading-6 text-slate-400">
        {source.note}
      </span>
      <span className="mt-5 border-t border-white/[0.07] pt-3 text-[12px] leading-5 text-slate-500">
        {source.boundary}
      </span>
    </a>
  );
}

function assertBranchCoverage(children: readonly CurriculumNode[]) {
  const actual = children.map((child) => child.id);
  if (
    actual.length !== EDUCATION_DIRECT_BRANCH_IDS.length ||
    actual.some((id, index) => id !== EDUCATION_DIRECT_BRANCH_IDS[index])
  ) {
    throw new Error(
      "Education page branch navigation is out of sync with the curriculum registry."
    );
  }
}
