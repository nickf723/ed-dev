import type { Metadata } from "next";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  Activity,
  ArrowRight,
  Bone,
  Brain,
  CircleDot,
  Droplets,
  Heart,
  Microscope,
  Network,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Wind,
  type LucideIcon,
} from "lucide-react";
import AnatomyAssessment from "./AnatomyAssessment";
import BiologicalBackground from "./BiologicalBackground";
import SystemScanner from "./SystemScanner";
import { ORGANIZATION_LEVELS } from "./anatomyModel";

const NODE_ID = "applied.medicine.anatomy-physiology";

export const metadata: Metadata = {
  title: "Anatomy & Physiology",
  description:
    "Learn how chemical components, cells, tissues, organs, body systems, and regions connect human structure to physiological function.",
};

type ChildMeta = {
  icon: LucideIcon;
  cue: string;
  accent: string;
};

const CHILD_META: Record<string, ChildMeta> = {
  "applied.medicine.anatomy-physiology.organization-language": {
    icon: Network,
    cue: "scale · regions · directions",
    accent: "244,114,182",
  },
  "applied.medicine.anatomy-physiology.homeostasis": {
    icon: Activity,
    cue: "range · feedback · regulation",
    accent: "52,211,153",
  },
  "applied.medicine.anatomy-physiology.integumentary": {
    icon: ShieldCheck,
    cue: "boundary · protection · sensation",
    accent: "251,146,60",
  },
  "applied.medicine.anatomy-physiology.skeletal": {
    icon: Bone,
    cue: "support · protection · leverage",
    accent: "251,191,36",
  },
  "applied.medicine.anatomy-physiology.muscular": {
    icon: Activity,
    cue: "force · posture · movement",
    accent: "248,113,113",
  },
  "applied.medicine.anatomy-physiology.nervous": {
    icon: Brain,
    cue: "sensation · integration · response",
    accent: "96,165,250",
  },
  "applied.medicine.anatomy-physiology.endocrine": {
    icon: Sparkles,
    cue: "hormones · receptors · distributed control",
    accent: "167,139,250",
  },
  "applied.medicine.anatomy-physiology.cardiovascular": {
    icon: Heart,
    cue: "pump · vessels · pressure · flow",
    accent: "251,113,133",
  },
  "applied.medicine.anatomy-physiology.lymphatic-immune": {
    icon: ShieldCheck,
    cue: "fluid return · surveillance · defense",
    accent: "45,212,191",
  },
  "applied.medicine.anatomy-physiology.respiratory": {
    icon: Wind,
    cue: "ventilation · exchange · regulation",
    accent: "34,211,238",
  },
  "applied.medicine.anatomy-physiology.digestive": {
    icon: CircleDot,
    cue: "digestion · absorption · motility",
    accent: "251,191,36",
  },
  "applied.medicine.anatomy-physiology.urinary": {
    icon: Droplets,
    cue: "filtration · balance · excretion",
    accent: "56,189,248",
  },
  "applied.medicine.anatomy-physiology.reproductive": {
    icon: Network,
    cue: "gametes · hormones · development",
    accent: "244,114,182",
  },
};

const ATLAS_GROUPS = [
  {
    id: "foundations",
    title: "Shared foundations",
    question: "How is the body organized, located, and regulated?",
    accent: "244,114,182",
    nodeIds: [
      "applied.medicine.anatomy-physiology.organization-language",
      "applied.medicine.anatomy-physiology.homeostasis",
    ],
  },
  {
    id: "support",
    title: "Boundary, support & movement",
    question:
      "How does the body protect itself, bear loads, and produce motion?",
    accent: "251,191,36",
    nodeIds: [
      "applied.medicine.anatomy-physiology.integumentary",
      "applied.medicine.anatomy-physiology.skeletal",
      "applied.medicine.anatomy-physiology.muscular",
    ],
  },
  {
    id: "control",
    title: "Regulation & control",
    question: "How are rapid signals and slower chemical signals coordinated?",
    accent: "167,139,250",
    nodeIds: [
      "applied.medicine.anatomy-physiology.nervous",
      "applied.medicine.anatomy-physiology.endocrine",
    ],
  },
  {
    id: "transport",
    title: "Transport & defense",
    question:
      "How do materials, fluid, cells, and defenses move through tissues?",
    accent: "45,212,191",
    nodeIds: [
      "applied.medicine.anatomy-physiology.cardiovascular",
      "applied.medicine.anatomy-physiology.lymphatic-immune",
    ],
  },
  {
    id: "exchange",
    title: "Exchange, nutrition & elimination",
    question:
      "How does the body exchange gases, acquire materials, and regulate wastes and fluid?",
    accent: "34,211,238",
    nodeIds: [
      "applied.medicine.anatomy-physiology.respiratory",
      "applied.medicine.anatomy-physiology.digestive",
      "applied.medicine.anatomy-physiology.urinary",
    ],
  },
  {
    id: "continuity",
    title: "Continuity",
    question:
      "How are gametes, reproduction, development, and hormonal coordination connected?",
    accent: "244,114,182",
    nodeIds: ["applied.medicine.anatomy-physiology.reproductive"],
  },
] as const;

const EXPECTED_CHILD_IDS = ATLAS_GROUPS.flatMap((group) => group.nodeIds);

export default function AnatomyPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  if (context.pageKind !== "unit") {
    throw new Error("Anatomy & Physiology must be classified as a root unit.");
  }

  assertAtlasCoverage(context.children);

  return (
    <SceneFrame
      background={<BiologicalBackground />}
      className="bg-[#08070b] text-slate-100 selection:bg-rose-300/25"
      maxWidthClassName="max-w-[1540px]"
      headerBackground="rgba(8,7,11,0.58)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Human structure · function · region · system · regulation"
          eyebrowStyle="rule"
          icon={Activity}
          title={<span>Anatomy &amp; Physiology</span>}
          subtitle="Read the human body in two directions at once: chemical components build cells, tissues, organs, systems, and the organism, while circulation, nerves, forces, signals, and feedback cross those nested levels to keep the whole body functioning."
          accentRgb="244, 114, 182"
          titleClassName="font-sans text-[clamp(2.6rem,5vw,5.8rem)] font-semibold leading-[0.85] tracking-[-0.06em] text-[#fff5f8]"
          headerClassName="border-rose-100/[0.10]"
          aside={
            <div className="grid grid-cols-3 border border-rose-100/[0.12] bg-black/20 font-mono">
              <HeaderMeasure value="6" label="levels" />
              <HeaderMeasure value="11" label="systems" bordered />
              <HeaderMeasure value="1" label="body" />
            </div>
          }
        />
      }
    >
      <CourseAtlas directChildren={context.children} />

      <section
        className="mt-24 grid gap-8 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1.32fr)] lg:items-start"
        aria-labelledby="anatomy-scale-title"
      >
        <div className="max-w-xl lg:sticky lg:top-44">
          <div className="text-rose-100/62 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em]">
            <Network size={14} aria-hidden="true" /> Model · six structural
            levels
          </div>
          <h2
            id="anatomy-scale-title"
            className="mt-3 text-[clamp(2rem,4vw,3.65rem)] font-semibold leading-[0.96] tracking-[-0.052em] text-white"
          >
            Higher levels are built from lower levels, but none works alone.
          </h2>
          <p className="mt-5 text-[16px] leading-7 text-slate-300">
            Anatomy asks where structures are and how they are organized.
            Physiology asks what those structures do and how their activity
            changes. The same femur can be studied as mineralized matrix, living
            tissue, an organ, part of the skeletal system, and one contributor
            to a moving person.
          </p>
          <p className="border-cyan-200/32 mt-5 border-l-2 pl-4 text-[14px] leading-6 text-slate-500">
            A named level is a useful focus, not a sealed box. Blood vessels,
            nerves, connective tissue, chemical signals, and mechanical forces
            connect the levels continuously.
          </p>
        </div>

        <OrganizationScale />
      </section>

      <section className="mt-28" aria-labelledby="regional-anatomy-title">
        <div className="mb-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-cyan-100/60">
              <ScanLine size={14} aria-hidden="true" /> Explore · one body,
              overlapping systems
            </div>
            <h2
              id="regional-anatomy-title"
              className="mt-3 max-w-4xl text-[clamp(2rem,3.7vw,3.45rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-white"
            >
              A region tells you where to look. A system tells you which
              coordinated function to follow.
            </h2>
          </div>
          <p className="text-[15px] leading-7 text-slate-400">
            Select a region and inspect the structures and systems that cross
            it. The scanner keeps the distinction visible before the evidence
            check asks you to use it.
          </p>
        </div>
        <SystemScanner />
      </section>

      <section className="mt-28">
        <AnatomyAssessment />
      </section>

      <section className="mt-28 border-y border-rose-100/[0.10] py-8">
        <div className="grid gap-6 md:grid-cols-3">
          <Principle
            icon={Microscope}
            title="Structure constrains function"
            text="Shape, material, geometry, and organization make some physiological actions possible and others difficult or impossible."
          />
          <Principle
            icon={ShieldCheck}
            title="Systems overlap"
            text="A named system is an analytical grouping. Real tissues and organs are physically interwoven and physiologically interdependent."
          />
          <Principle
            icon={Activity}
            title="Living structure changes"
            text="Development, activity, injury, disease, adaptation, repair, and aging continually modify both anatomy and physiology."
          />
        </div>
      </section>

      <section className="mt-20 grid gap-5 pb-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Link
          href="/natural-science/biology/anatomy"
          className="group border-l border-cyan-200/25 bg-cyan-300/[0.025] px-5 py-5 backdrop-blur-xl transition hover:bg-cyan-300/[0.05]"
        >
          <div className="text-cyan-100/52 text-[10px] font-semibold uppercase tracking-[0.14em]">
            Conceptual cross-link · Natural Science
          </div>
          <strong className="mt-2 block text-[20px] text-white">
            Comparative Anatomy
          </strong>
          <p className="mt-2 max-w-2xl text-[14px] leading-6 text-slate-400">
            Compare anatomical structures across organisms there. This medical
            unit centers human structure–function relationships as a foundation
            for clinical reasoning.
          </p>
          <span className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold text-cyan-100/70">
            Open the biological comparison{" "}
            <ArrowRight
              size={13}
              className="transition group-hover:translate-x-1"
            />
          </span>
        </Link>

        <div className="border-rose-200/22 border-l bg-rose-300/[0.022] px-5 py-5 backdrop-blur-xl">
          <div className="text-rose-100/52 text-[10px] font-semibold uppercase tracking-[0.14em]">
            Reviewed teaching sources
          </div>
          <p className="mt-2 text-[14px] leading-6 text-slate-400">
            The six-level model, eleven-system map, and homeostasis boundary
            follow the open introductory sequence in OpenStax{" "}
            <cite>Anatomy and Physiology 2e</cite>.
          </p>
          <div className="text-rose-100/68 mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[12px] font-semibold">
            <a
              href="https://openstax.org/books/anatomy-and-physiology-2e/pages/1-2-structural-organization-of-the-human-body"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              Structural organization ↗
            </a>
            <a
              href="https://openstax.org/books/anatomy-and-physiology-2e/pages/1-5-homeostasis"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              Homeostasis ↗
            </a>
          </div>
          <p className="mt-4 text-[12px] leading-5 text-slate-600">
            Introductory education only; this page is not patient-specific
            advice, diagnosis, or a substitute for laboratory instruction.
          </p>
        </div>
      </section>
    </SceneFrame>
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
      className={`px-4 py-3 text-center ${bordered ? "border-x border-white/[0.08]" : ""}`}
    >
      <strong className="block text-[18px] text-rose-100">{value}</strong>
      <span className="text-[10px] uppercase tracking-[0.12em] text-slate-600">
        {label}
      </span>
    </div>
  );
}

function CourseAtlas({
  directChildren,
}: {
  directChildren: readonly CurriculumNode[];
}) {
  const childrenById = new Map(
    directChildren.map((child) => [child.id, child])
  );

  return (
    <nav className="mt-9" aria-labelledby="anatomy-atlas-title">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-end">
        <div>
          <div className="text-amber-100/56 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em]">
            <Sparkles size={14} aria-hidden="true" /> Direct-child course atlas
          </div>
          <h2
            id="anatomy-atlas-title"
            className="mt-3 max-w-5xl text-[clamp(2.15rem,4.3vw,4rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-white"
          >
            Begin with the body&apos;s shared grammar, then follow function
            across its systems.
          </h2>
        </div>
        <p className="text-[15px] leading-7 text-slate-400">
          These are thirteen direct peers: two foundations and the conventional
          eleven organ systems. The families explain study relationships without
          adding another layer of routes. Skeletal System is open; the remaining
          destinations stay visibly planned and non-clickable.
        </p>
      </div>

      <div className="bg-[#10090d]/36 mt-7 overflow-hidden border-y border-rose-100/[0.10] backdrop-blur-xl">
        {ATLAS_GROUPS.map((group, groupIndex) => {
          const groupChildren = group.nodeIds.map((nodeId) => {
            const child = childrenById.get(nodeId);
            if (!child)
              throw new Error(
                `Anatomy atlas is missing curriculum node ${nodeId}`
              );
            return child;
          });

          return (
            <div
              key={group.id}
              className="grid border-b border-white/[0.065] last:border-b-0 xl:grid-cols-[270px_minmax(0,1fr)]"
            >
              <div className="relative px-5 py-5 xl:border-r xl:border-white/[0.07]">
                <div
                  className="absolute inset-y-0 left-0 w-px"
                  style={{ background: `rgba(${group.accent},0.50)` }}
                />
                <span className="font-mono text-[10px] text-slate-600">
                  {String(groupIndex + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-[17px] font-semibold text-white">
                  {group.title}
                </h3>
                <p className="mt-2 text-[12px] leading-5 text-slate-500">
                  {group.question}
                </p>
              </div>
              <div
                className={`grid ${groupChildren.length === 1 ? "sm:grid-cols-1" : groupChildren.length === 2 ? "sm:grid-cols-2" : "md:grid-cols-3"}`}
              >
                {groupChildren.map((child) => (
                  <AtlasDestination key={child.id} child={child} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
}

function AtlasDestination({ child }: { child: CurriculumNode }) {
  const meta = CHILD_META[child.id];
  if (!meta)
    throw new Error(`Anatomy atlas metadata is missing for ${child.id}`);
  const Icon = meta.icon;
  const active = child.status !== "placeholder";
  const content = (
    <div
      className={`flex min-h-[174px] flex-col px-4 py-4 ${active ? "group transition hover:bg-white/[0.025]" : "opacity-[0.58]"}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-full border"
          style={{
            color: `rgb(${meta.accent})`,
            borderColor: `rgba(${meta.accent},0.28)`,
            background: `rgba(${meta.accent},0.05)`,
          }}
        >
          <Icon size={15} aria-hidden="true" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate-600">
          {active ? "open" : "planned"}
        </span>
      </div>
      <div
        className="mt-4 text-[10px] font-semibold uppercase tracking-[0.08em]"
        style={{ color: `rgba(${meta.accent},0.62)` }}
      >
        {meta.cue}
      </div>
      <strong className="text-white/88 mt-1 text-[15px] leading-5">
        {child.label}
      </strong>
      <p className="mt-2 text-[12px] leading-5 text-slate-500">
        {child.description}
      </p>
      {active ? (
        <span
          className="mt-auto flex items-center justify-end gap-2 pt-4 text-[12px] font-semibold"
          style={{ color: `rgba(${meta.accent},0.78)` }}
        >
          Enter system{" "}
          <ArrowRight
            size={13}
            className="transition group-hover:translate-x-1"
          />
        </span>
      ) : null}
    </div>
  );

  return active ? (
    <Link
      href={child.href}
      className="block h-full border-t border-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-rose-200/60 sm:border-l sm:border-t-0"
    >
      {content}
    </Link>
  ) : (
    <div
      aria-disabled="true"
      className="h-full border-t border-white/[0.06] sm:border-l sm:border-t-0"
    >
      {content}
    </div>
  );
}

function OrganizationScale() {
  return (
    <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
      {ORGANIZATION_LEVELS.map((level, index) => (
        <article
          key={level.id}
          className="bg-[#0e0910]/42 relative min-h-[188px] overflow-hidden border border-white/[0.08] p-5 backdrop-blur-xl"
        >
          <div className="absolute right-[-34px] top-[-34px] h-28 w-28 rounded-full border border-rose-200/[0.07]" />
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[11px] text-rose-100/45">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-cyan-100/42 text-[10px] font-semibold uppercase tracking-[0.10em]">
              {level.example}
            </span>
          </div>
          <h3 className="mt-6 text-[19px] font-semibold text-white">
            {level.label}
          </h3>
          <p className="mt-2 text-[13px] leading-6 text-slate-400">
            {level.description}
          </p>
          {index < ORGANIZATION_LEVELS.length - 1 ? (
            <ArrowRight
              size={14}
              className="text-rose-100/28 absolute bottom-5 right-5"
              aria-hidden="true"
            />
          ) : null}
        </article>
      ))}
    </div>
  );
}

function Principle({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <div className="border-l border-rose-100/[0.18] bg-black/[0.10] px-5 py-4 backdrop-blur-[12px]">
      <Icon size={17} className="text-rose-200/65" aria-hidden="true" />
      <strong className="mt-3 block text-[16px] text-white">{title}</strong>
      <p className="mt-2 text-[13px] leading-6 text-slate-400">{text}</p>
    </div>
  );
}

function assertAtlasCoverage(children: readonly CurriculumNode[]) {
  const expected = new Set<string>(EXPECTED_CHILD_IDS);
  const actual = new Set<string>(children.map((child) => child.id));
  const missing = EXPECTED_CHILD_IDS.filter((id) => !actual.has(id));
  const unexpected = children.filter((child) => !expected.has(child.id));

  if (
    missing.length > 0 ||
    unexpected.length > 0 ||
    expected.size !== EXPECTED_CHILD_IDS.length
  ) {
    throw new Error(
      `Anatomy atlas and curriculum disagree. Missing: ${missing.join(", ") || "none"}; unexpected: ${unexpected.map((node) => node.id).join(", ") || "none"}.`
    );
  }
}
