import Link from "next/link";
import type { Metadata } from "next";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  ArrowDown,
  ArrowRight,
  Building2,
  Cable,
  Compass,
  Construction,
  DraftingCompass,
  ExternalLink,
  Frame,
  History,
  Layers3,
  Map,
  Ruler,
  SunMedium,
  Trees,
} from "lucide-react";
import BlueprintBackground from "./BlueprintBackground";
import VitruvianTotem from "./VitruvianTotem";
import ArchitectureEvidenceLab from "./ArchitectureEvidenceLab";
import { ARCHITECTURE_BRANCH_IDS } from "./architectureModel";

const NODE_ID = "applied.architecture";

export const metadata: Metadata = {
  title: "Architecture",
  description:
    "Explore architectural design, construction, structures, environmental systems, site, history, representation, and professional constraints through coordinated spatial evidence.",
};

type BranchMeta = {
  icon: LucideIcon;
  code: string;
  question: string;
  rgb: string;
};

const BRANCH_META: Record<string, BranchMeta> = {
  "applied.architecture.design-studio": {
    icon: DraftingCompass,
    code: "DES",
    question:
      "How do program, circulation, form, precedent, iteration, critique, and representation become a coherent spatial proposal?",
    rgb: "125,211,252",
  },
  "applied.architecture.building-technology": {
    icon: Construction,
    code: "BLD",
    question:
      "How do materials, envelopes, joints, moisture control, sequencing, and fabrication make an idea physically buildable?",
    rgb: "251,191,36",
  },
  "applied.architecture.structures": {
    icon: Frame,
    code: "STR",
    question:
      "How do loads move through frames, shells, walls, spans, foundations, and lateral systems without fighting the architecture?",
    rgb: "192,132,252",
  },
  "applied.architecture.environmental-systems": {
    icon: SunMedium,
    code: "ENV",
    question:
      "How do daylight, climate, comfort, ventilation, acoustics, energy, water, and services shape the building from the inside out?",
    rgb: "94,234,212",
  },
  "applied.architecture.urban-site": {
    icon: Map,
    code: "URB",
    question:
      "How does a building meet terrain, streets, public space, mobility, ecology, density, and the life around it?",
    rgb: "74,222,128",
  },
  "applied.architecture.history-theory": {
    icon: History,
    code: "HIS",
    question:
      "How have culture, technology, institutions, typologies, criticism, and changing values produced different built worlds?",
    rgb: "251,146,60",
  },
  "applied.architecture.representation-fabrication": {
    icon: Layers3,
    code: "REP",
    question:
      "How can drawings, models, BIM, diagrams, simulations, prototypes, and fabrication communicate or test spatial ideas?",
    rgb: "96,165,250",
  },
  "applied.architecture.practice-codes": {
    icon: Accessibility,
    code: "PRC",
    question:
      "How do accessibility, life safety, codes, ethics, contracts, coordination, permitting, and liability constrain professional work?",
    rgb: "244,114,182",
  },
};

const SCALES = [
  {
    label: "Body",
    detail: "reach · movement · perception · comfort",
    rgb: "244,114,182",
  },
  {
    label: "Room",
    detail: "use · adjacency · light · threshold",
    rgb: "125,211,252",
  },
  {
    label: "Building",
    detail: "structure · envelope · systems · circulation",
    rgb: "192,132,252",
  },
  {
    label: "Site",
    detail: "ground · climate · access · ecology",
    rgb: "74,222,128",
  },
  {
    label: "City",
    detail: "street · block · infrastructure · public realm",
    rgb: "251,191,36",
  },
] as const;

const INTEGRATION = [
  { label: "Space", note: "sequence, proportion, adjacency, threshold, view" },
  { label: "Structure", note: "span, load path, stability, material, grid" },
  { label: "Environment", note: "sun, air, sound, water, energy, comfort" },
  { label: "Construction", note: "assembly, tolerance, durability, sequence" },
  { label: "People", note: "access, safety, culture, use, adaptation" },
] as const;

export default function ArchitecturePage() {
  const context = requireCurriculumPageContext(NODE_ID);

  if (context.pageKind !== "hub") {
    throw new Error("Architecture must be classified as a navigation hub.");
  }

  assertBranchCoverage(context.children);

  const left = context.children.slice(0, 4);
  const right = context.children.slice(4);

  return (
    <SceneFrame
      background={<BlueprintBackground />}
      className="bg-[#04111d] text-slate-100 selection:bg-sky-300/25"
      maxWidthClassName="max-w-[1600px]"
      headerBackground="rgba(4,17,29,0.47)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Space · structure · climate · construction · culture · use"
          eyebrowStyle="rule"
          icon={Building2}
          title={<span>Architecture</span>}
          subtitle="Architecture coordinates spatial experience with structure, climate, construction, systems, history, regulation, and the needs of people. A drawing is not the building, and a beautiful object is not enough: the discipline lives in the negotiation among many constraints at once."
          accentRgb="125, 211, 252"
          titleClassName="font-sans text-[clamp(2.9rem,5.5vw,6.2rem)] font-semibold leading-[0.84] tracking-[-0.066em] text-[#f4fbff]"
          headerClassName="border-sky-100/[0.10]"
        />
      }
    >
      <section
        data-navigation="architecture-branch-section"
        className="relative isolate mt-10 overflow-hidden border-y border-sky-100/[0.11] py-5 sm:py-6"
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(4,17,29,0.40),transparent_29%,transparent_71%,rgba(4,17,29,0.34))] backdrop-blur-[2px]" />
        <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
          <div>
            <div className="text-sky-200/66 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em]">
              <Compass size={14} /> Primary navigation · direct fields
            </div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.7vw,3.7rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">
              Enter architecture through design, building systems, history,
              site, representation, or professional constraints.
            </h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-300/70">
              The blueprint behind this page is a schematic building section,
              not a decorative grid. Floors, stairs, a courtyard void, site
              contours, dimensions, an envelope, and one slow daylight study
              make the subject visible without mirroring every foreground
              interaction.
            </p>
          </div>
          <Link
            href="/applied-science"
            className="group flex items-center justify-between gap-4 border-l border-sky-200/[0.18] bg-black/[0.08] px-4 py-3 backdrop-blur-[10px] transition hover:bg-black/[0.15]"
          >
            <span>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                Parent field
              </span>
              <strong className="mt-1 block text-[14px] text-white">
                Applied Sciences
              </strong>
            </span>
            <ArrowRight
              size={15}
              className="text-sky-200/55 transition group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="relative mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px_minmax(0,1fr)] xl:items-stretch">
          <div className="space-y-2.5">
            {left.map((branch) => (
              <ArchitectureRoute key={branch.id} branch={branch} side="left" />
            ))}
          </div>
          <ScaleCore />
          <div className="space-y-2.5">
            {right.map((branch) => (
              <ArchitectureRoute key={branch.id} branch={branch} side="right" />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-24 grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] xl:items-start">
        <VitruvianTotem />
        <Surface
          variant="ghost"
          className="overflow-hidden rounded-[30px] border-emerald-100/[0.10]"
          style={{ background: "rgba(4,17,29,0.09)" }}
        >
          <div className="p-5 sm:p-6">
            <div className="text-emerald-200/58 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em]">
              <Cable size={14} /> Integration desk · reference, not navigation
            </div>
            <h3 className="mt-2 text-[clamp(1.7rem,2.7vw,2.6rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-white">
              A change in one system usually redraws several others.
            </h3>
            <p className="mt-3 text-[13px] leading-6 text-slate-400/70">
              Moving a stair changes circulation and structure. Opening a facade
              changes daylight, heat gain, views, waterproofing, cost, and
              appearance. Architecture is integration work.
            </p>
          </div>
          <div className="border-t border-white/[0.07]">
            {INTEGRATION.map((item, index) => (
              <div
                key={item.label}
                className="grid grid-cols-[42px_120px_minmax(0,1fr)] items-center gap-3 border-b border-white/[0.06] px-4 py-3 last:border-b-0"
              >
                <span className="text-sky-200/38 font-mono text-[11px]">
                  0{index + 1}
                </span>
                <strong className="text-slate-200/86 text-[13px]">
                  {item.label}
                </strong>
                <span className="text-[12px] leading-5 text-slate-500">
                  {item.note}
                </span>
              </div>
            ))}
          </div>
        </Surface>
      </section>

      <div className="mt-24">
        <ArchitectureEvidenceLab />
      </div>

      <section
        data-source-boundary="architecture"
        className="bg-[#04111d]/52 mt-24 rounded-[30px] border border-sky-100/[0.10] p-6 backdrop-blur-xl sm:p-8"
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_460px] lg:items-end">
          <div>
            <div className="text-rose-200/62 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em]">
              <Accessibility size={14} aria-hidden="true" /> Standards and model
              boundary
            </div>
            <h2 className="mt-3 max-w-4xl text-[clamp(1.8rem,3.4vw,3.2rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">
              A diagram can teach a relationship without certifying a building.
            </h2>
            <p className="text-slate-300/66 mt-4 max-w-3xl text-[14px] leading-7">
              The area, scale, and ramp exercises are exact for the stated
              simplified inputs. They are not construction documents, structural
              analysis, energy modeling, or code review. Accessibility and
              building requirements vary by project type, jurisdiction, adopted
              edition, and authority having jurisdiction; real work requires the
              complete applicable standards and qualified coordination.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            <SourceLink
              href="https://www.access-board.gov/ada/guides/chapter-4-ramps-and-curb-ramps/"
              label="U.S. Access Board · Ramps"
            />
            <SourceLink
              href="https://www.energycodes.gov/about"
              label="DOE · Building Energy Codes"
            />
            <SourceLink
              href="https://www.nist.gov/buildings-construction"
              label="NIST · Buildings & Construction"
            />
          </div>
        </div>
      </section>
    </SceneFrame>
  );
}

function assertBranchCoverage(children: readonly CurriculumNode[]) {
  const childIds = children.map((child) => child.id);
  const exactMatch =
    childIds.length === ARCHITECTURE_BRANCH_IDS.length &&
    childIds.every((id, index) => id === ARCHITECTURE_BRANCH_IDS[index]);

  if (!exactMatch) {
    throw new Error(
      `Architecture branch presentation must match the curriculum registry. Expected ${ARCHITECTURE_BRANCH_IDS.join(", ")}; received ${childIds.join(", ")}.`
    );
  }
}

function ArchitectureRoute({
  branch,
  side,
}: {
  branch: CurriculumNode;
  side: "left" | "right";
}) {
  const meta = BRANCH_META[branch.id] ?? {
    icon: Ruler,
    code: "ARC",
    question: branch.description ?? "Explore this architecture branch.",
    rgb: "125,211,252",
  };
  const Icon = meta.icon;
  const planned = branch.status === "placeholder";
  const card = (
    <div
      className="group relative min-h-[108px] border-y border-white/[0.07] bg-black/[0.07] px-3 py-3 backdrop-blur-[10px] transition hover:bg-black/[0.13]"
      style={{
        boxShadow: `inset ${side === "left" ? "3px" : "-3px"} 0 0 rgba(${meta.rgb},0.38)`,
      }}
    >
      <div className="grid grid-cols-[40px_minmax(0,1fr)_54px] gap-3">
        <span
          className="flex h-9 w-9 items-center justify-center border"
          style={{
            color: `rgb(${meta.rgb})`,
            borderColor: `rgba(${meta.rgb},0.26)`,
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
    <div aria-disabled="true">{card}</div>
  ) : (
    <Link href={branch.href}>{card}</Link>
  );
}

function ScaleCore() {
  return (
    <Surface
      variant="open"
      className="relative min-h-[452px] overflow-hidden rounded-[28px] border-sky-100/[0.08]"
      style={{ background: "rgba(4,17,29,0.025)" }}
    >
      <div className="relative p-4">
        <div className="text-sky-200/54 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em]">
          <Trees size={13} /> Scale stack
        </div>
        <p className="text-slate-400/64 mt-2 text-[12px] leading-5">
          Architectural decisions move continuously between human-scale details
          and larger systems.
        </p>
      </div>
      <div className="relative mx-4 mt-1 space-y-1">
        {SCALES.map((step, index) => (
          <div
            key={step.label}
            className="relative border-b border-white/[0.06] py-3 last:border-b-0"
          >
            <div className="flex items-start gap-3">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-[11px]"
                style={{
                  color: `rgb(${step.rgb})`,
                  borderColor: `rgba(${step.rgb},0.24)`,
                  background: `rgba(${step.rgb},0.04)`,
                }}
              >
                0{index + 1}
              </span>
              <span>
                <strong
                  className="block text-[13px]"
                  style={{ color: `rgba(${step.rgb},0.84)` }}
                >
                  {step.label}
                </strong>
                <span className="mt-1 block text-[11px] leading-4 text-slate-500">
                  {step.detail}
                </span>
              </span>
            </div>
            {index < SCALES.length - 1 ? (
              <ArrowDown size={13} className="ml-[10px] mt-2 text-slate-600" />
            ) : null}
          </div>
        ))}
      </div>
      <div className="text-sky-200/34 absolute inset-x-4 bottom-4 border-t border-sky-100/[0.07] pt-3 text-center font-mono text-[11px] uppercase tracking-[0.07em]">
        details can reshape the whole building
      </div>
    </Surface>
  );
}

function SourceLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-sky-100/[0.12] bg-black/15 px-4 py-2.5 text-[11px] font-semibold text-sky-100/60 transition hover:border-sky-100/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200/60"
    >
      {label} <ExternalLink size={12} aria-hidden="true" />
    </a>
  );
}
