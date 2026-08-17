"use client";

import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  ArrowRight,
  Building2,
  GitBranch,
  Layers3,
  MessageCircle,
  Microscope,
  Network,
  Scale,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import SchellingModel from "./SchellingModel";
import SociologyBackground from "./SociologyBackground";

const NODE_ID = "social.sociology";

type Level = "micro" | "meso" | "macro" | "cross";

type BranchMeta = {
  icon: LucideIcon;
  level: Level;
  question: string;
  rgb: string;
  index: string;
};

const BRANCH_META: Record<string, BranchMeta> = {
  "social.sociology.interaction": {
    icon: MessageCircle,
    level: "micro",
    question: "How do people create meaning, identity, norms, and roles in interaction?",
    rgb: "34,211,238",
    index: "01",
  },
  "social.sociology.groups-networks": {
    icon: Network,
    level: "meso",
    question: "How do ties, groups, organizations, and network positions shape action?",
    rgb: "167,139,250",
    index: "02",
  },
  "social.sociology.institutions": {
    icon: Building2,
    level: "meso",
    question: "How do durable rules and organizations coordinate social life?",
    rgb: "52,211,153",
    index: "03",
  },
  "social.sociology.stratification": {
    icon: Scale,
    level: "macro",
    question: "How are resources, opportunities, status, and power distributed unequally?",
    rgb: "244,114,182",
    index: "04",
  },
  "social.sociology.demography": {
    icon: Users,
    level: "macro",
    question: "How do births, deaths, migration, households, and age structure reshape society?",
    rgb: "250,204,21",
    index: "05",
  },
  "social.sociology.social-change": {
    icon: TrendingUp,
    level: "macro",
    question: "How do movements, technology, crisis, diffusion, and institutions transform social patterns?",
    rgb: "96,165,250",
    index: "06",
  },
  "social.sociology.theory-methods": {
    icon: Microscope,
    level: "cross",
    question: "Which evidence and theoretical lens can distinguish competing explanations?",
    rgb: "196,181,253",
    index: "07",
  },
};

const THEORY_LENSES = [
  {
    label: "Interactionist",
    prompt: "How is meaning produced in encounters?",
    text: "Study symbols, definitions of situations, identity, roles, and how patterned interaction builds social reality from the ground up.",
    rgb: "34,211,238",
  },
  {
    label: "Conflict",
    prompt: "Who has resources, leverage, and the power to set rules?",
    text: "Examine inequality, domination, bargaining, exclusion, and how institutions distribute advantages and constraints across groups.",
    rgb: "244,114,182",
  },
  {
    label: "Functional / systems",
    prompt: "What relationships hold a social arrangement together, and what consequences follow?",
    text: "Analyze interdependence, coordination, integration, dysfunction, and the intended or unintended consequences of institutions and norms.",
    rgb: "52,211,153",
  },
] as const;

export default function SociologyPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <SceneFrame
      background={<SociologyBackground />}
      className="bg-[#09050f] text-violet-50 selection:bg-violet-400/25"
      maxWidthClassName="max-w-[1580px]"
      headerBackground="rgba(10,5,16,0.50)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Interaction · networks · institutions · inequality · population · change"
          eyebrowStyle="rule"
          icon={Users}
          title={<span>Sociology</span>}
          subtitle="Sociology studies patterned relationships between people and the larger structures they build and inherit. Move across social scales, then test how local rules can generate collective outcomes."
          accentRgb="167, 139, 250"
          titleClassName="font-sans text-[clamp(2.9rem,5.5vw,6.2rem)] font-semibold leading-[0.83] tracking-[-0.067em] text-[#fbf8ff]"
          headerClassName="border-violet-100/[0.09]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-violet-100/[0.12] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(14,7,23,0.36),rgba(8,7,18,0.08)_58%,transparent_82%)] backdrop-blur-[3px]" />
        <div className="relative grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_390px]">
          <div className="min-w-0">
            <div className="max-w-4xl px-1">
              <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-violet-200/70">
                <Layers3 size={14} /> Primary navigation · social scales
              </div>
              <h2 className="mt-2 text-[clamp(2rem,4vw,4.1rem)] font-semibold leading-[0.93] tracking-[-0.055em] text-white">
                Follow a social pattern from encounter to institution to population.
              </h2>
              <p className="mt-3 max-w-3xl text-[14px] leading-6 text-violet-100/70">
                These branches are peers in the curriculum. The scale bands are an analytical map, not a ranking: sociologists move between micro, meso, and macro explanations and use theory and methods across all three.
              </p>
            </div>

            <nav aria-label="Sociology branches" className="mt-5 space-y-3">
              <ScaleBand
                level="micro"
                label="Micro"
                note="encounters, meaning, identity"
                branches={branchesAt(context.children, "micro")}
              />
              <ScaleBand
                level="meso"
                label="Meso"
                note="groups, networks, organizations"
                branches={branchesAt(context.children, "meso")}
              />
              <ScaleBand
                level="macro"
                label="Macro"
                note="institutions, inequality, population, change"
                branches={branchesAt(context.children, "macro")}
              />
              <CrossCuttingRoute branch={branchesAt(context.children, "cross")[0]} />
            </nav>
          </div>

          <CrossScaleTrace />
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-3 flex items-center gap-3">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-violet-200/70">
            Signature model
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-violet-200/[0.18] to-transparent" />
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-slate-600">
            micro rule → macro pattern
          </span>
        </div>
        <SchellingModel />
      </section>

      <section className="mt-8 border-t border-violet-100/[0.10] pt-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-200/60">
              <GitBranch size={14} /> Theoretical lenses · reference, not navigation
            </div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.6vw,3.5rem)] font-semibold leading-[0.95] tracking-[-0.052em] text-white">
              The same evidence can support different questions before it supports different conclusions.
            </h2>
          </div>
          <p className="text-[14px] leading-6 text-violet-100/60">
            Sociological theories are not colored teams. They emphasize different mechanisms, scales, and kinds of evidence. Strong analysis states which lens is being used and what competing explanations would predict.
          </p>
        </div>

        <div className="mt-5 grid border-y border-violet-100/[0.08] md:grid-cols-3">
          {THEORY_LENSES.map((lens) => (
            <TheoryLens key={lens.label} {...lens} />
          ))}
        </div>
      </section>
    </SceneFrame>
  );
}

function branchesAt(branches: readonly CurriculumNode[], level: Level) {
  return branches.filter((branch) => BRANCH_META[branch.id]?.level === level);
}

function ScaleBand({
  label,
  note,
  branches,
  level,
}: {
  label: string;
  note: string;
  branches: readonly CurriculumNode[];
  level: Exclude<Level, "cross">;
}) {
  const bandRgb =
    level === "micro"
      ? "34,211,238"
      : level === "meso"
        ? "167,139,250"
        : "244,114,182";

  return (
    <div className="grid gap-2 sm:grid-cols-[118px_minmax(0,1fr)] sm:items-stretch">
      <div
        className="relative overflow-hidden rounded-[16px] border px-3 py-3 backdrop-blur-[10px]"
        style={{
          borderColor: `rgba(${bandRgb},0.18)`,
          background: `linear-gradient(135deg,rgba(${bandRgb},0.075),rgba(8,5,14,0.16))`,
        }}
      >
        <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgb(${bandRgb})` }}>
          {label}
        </div>
        <div className="mt-1 text-[11px] leading-4 text-slate-500">{note}</div>
      </div>
      <div className={`grid gap-2 ${branches.length >= 3 ? "lg:grid-cols-3" : branches.length === 2 ? "lg:grid-cols-2" : ""}`}>
        {branches.map((branch) => (
          <BranchRoute key={branch.id} branch={branch} />
        ))}
      </div>
    </div>
  );
}

function BranchRoute({ branch }: { branch: CurriculumNode }) {
  const meta = BRANCH_META[branch.id] ?? {
    icon: Users,
    level: "micro" as const,
    question: branch.description ?? "Explore this sociological branch.",
    rgb: "167,139,250",
    index: "--",
  };
  const Icon = meta.icon;
  const planned = branch.status === "placeholder";
  const body = (
    <Surface
      variant="glass"
      className={`group h-full rounded-[18px] p-0 ${planned ? "opacity-[0.62]" : "transition hover:-translate-y-0.5"}`}
      style={{
        borderColor: `rgba(${meta.rgb},${planned ? 0.10 : 0.22})`,
        background: `linear-gradient(145deg,rgba(${meta.rgb},0.055),rgba(8,5,14,0.18))`,
      }}
    >
      <div className="grid min-h-[96px] grid-cols-[34px_40px_minmax(0,1fr)_22px] items-start gap-2 px-3 py-3">
        <span className="font-mono text-[11px] text-slate-600">{meta.index}</span>
        <span
          className="flex h-9 w-9 items-center justify-center rounded-[11px] border"
          style={{
            color: `rgb(${meta.rgb})`,
            borderColor: `rgba(${meta.rgb},0.26)`,
            background: `rgba(${meta.rgb},0.05)`,
          }}
        >
          <Icon size={16} />
        </span>
        <span className="min-w-0">
          <strong className="block text-[15px] font-semibold leading-5 text-white">{branch.label}</strong>
          <span className="mt-1 block text-[11px] leading-4 text-slate-500">{meta.question}</span>
        </span>
        {planned ? (
          <span className="mt-1 h-2 w-2 rounded-full border border-white/[0.14]" />
        ) : (
          <ArrowRight size={14} className="mt-1 text-white/30 transition group-hover:translate-x-1 group-hover:text-white/80" />
        )}
      </div>
    </Surface>
  );

  return planned ? <div aria-disabled="true">{body}</div> : <Link href={branch.href}>{body}</Link>;
}

function CrossCuttingRoute({ branch }: { branch?: CurriculumNode }) {
  if (!branch) return null;
  const meta = BRANCH_META[branch.id];
  const Icon = meta?.icon ?? Microscope;
  const rgb = meta?.rgb ?? "196,181,253";
  const planned = branch.status === "placeholder";
  const content = (
    <div
      className={`group grid min-h-[62px] gap-3 border-y border-violet-100/[0.08] bg-black/[0.07] px-3 py-3 backdrop-blur-[10px] sm:grid-cols-[118px_42px_220px_minmax(0,1fr)_24px] sm:items-center ${planned ? "opacity-[0.62]" : "transition hover:bg-black/[0.12]"}`}
    >
      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-violet-200/60">Cross-cutting</span>
      <span className="flex h-9 w-9 items-center justify-center rounded-full border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.24)` }}>
        <Icon size={15} />
      </span>
      <strong className="text-[15px] text-white">{branch.label}</strong>
      <span className="text-[12px] leading-5 text-slate-500">{meta?.question}</span>
      {planned ? <span className="h-2 w-2 rounded-full border border-white/[0.14]" /> : <ArrowRight size={14} className="text-white/30" />}
    </div>
  );
  return planned ? <div aria-disabled="true">{content}</div> : <Link href={branch.href}>{content}</Link>;
}

function CrossScaleTrace() {
  const rows = [
    {
      label: "Micro",
      text: "People negotiate etiquette, identity, and expectations around a new technology.",
      rgb: "34,211,238",
    },
    {
      label: "Meso",
      text: "Groups and organizations rewrite routines, roles, and network connections.",
      rgb: "167,139,250",
    },
    {
      label: "Macro",
      text: "Institutions, inequality, labor markets, population patterns, and regulation can shift.",
      rgb: "244,114,182",
    },
  ] as const;

  return (
    <aside className="relative min-h-[520px] overflow-hidden rounded-[30px] border border-violet-100/[0.09] bg-black/[0.055] backdrop-blur-[10px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(167,139,250,0.09),transparent_25%),linear-gradient(180deg,rgba(16,8,26,0.12),transparent_72%)]" />
      <div className="relative p-5">
        <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-violet-200/60">
          One event across scales
        </div>
        <h3 className="mt-2 text-[20px] font-semibold tracking-[-0.03em] text-white">A new technology enters daily life.</h3>
        <p className="mt-2 text-[13px] leading-5 text-slate-400/70">
          Sociology changes scale without pretending the levels are isolated. Explanations become stronger when mechanisms connect them.
        </p>
      </div>

      <div className="relative mx-5 mt-2">
        <div className="pointer-events-none absolute bottom-6 left-[17px] top-6 w-px bg-gradient-to-b from-cyan-200/35 via-violet-200/32 to-pink-200/32" />
        {rows.map((row, index) => (
          <div key={row.label} className="relative grid grid-cols-[36px_minmax(0,1fr)] gap-4 py-5">
            <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border bg-[#0a0610]/78 font-mono text-[11px]" style={{ color: `rgb(${row.rgb})`, borderColor: `rgba(${row.rgb},0.30)` }}>
              0{index + 1}
            </span>
            <div className="border-b border-white/[0.07] pb-5">
              <strong className="text-[14px]" style={{ color: `rgb(${row.rgb})` }}>{row.label}</strong>
              <p className="mt-1 text-[13px] leading-5 text-slate-400/70">{row.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-x-5 bottom-5 border-t border-violet-100/[0.08] pt-4">
        <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-500">Bridge question</div>
        <p className="mt-2 text-[13px] leading-5 text-violet-100/60">
          Which local interactions accumulate into institutional change, and which institutions reshape the choices available to individuals?
        </p>
      </div>
    </aside>
  );
}

function TheoryLens({
  label,
  prompt,
  text,
  rgb,
}: {
  label: string;
  prompt: string;
  text: string;
  rgb: string;
}) {
  return (
    <article className="relative min-h-[210px] border-b border-violet-100/[0.07] px-5 py-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
      <div className="absolute left-0 top-5 h-14 w-px" style={{ background: `rgba(${rgb},0.48)` }} />
      <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em]" style={{ color: `rgb(${rgb})` }}>
        {label}
      </div>
      <h3 className="mt-3 text-[17px] font-semibold leading-6 text-white">{prompt}</h3>
      <p className="mt-2 text-[13px] leading-6 text-slate-400/70">{text}</p>
    </article>
  );
}
