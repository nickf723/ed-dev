"use client";

import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Building2,
  CircleDollarSign,
  Globe2,
  Landmark,
  Microscope,
  Scale,
  Users,
  Vote,
  type LucideIcon,
} from "lucide-react";
import HexMapBackground from "./HexMapBackground";
import ParliamentWidget from "./ParliamentWidget";

const NODE_ID = "social.political-science";

type BranchMeta = {
  icon: LucideIcon;
  group: "ideas" | "institutions" | "collective" | "external";
  question: string;
  rgb: string;
  position: { x: number; y: number };
};

const BRANCH_META: Record<string, BranchMeta> = {
  "social.political-science.theory": {
    icon: BookOpen,
    group: "ideas",
    question: "What makes authority legitimate, just, free, equal, or binding?",
    rgb: "251,191,36",
    position: { x: 6, y: 10 },
  },
  "social.political-science.comparative": {
    icon: BarChart3,
    group: "ideas",
    question: "Why do political systems differ, persist, democratize, or break down?",
    rgb: "96,165,250",
    position: { x: 6, y: 37 },
  },
  "social.political-science.institutions": {
    icon: Building2,
    group: "institutions",
    question: "How do constitutions, legislatures, executives, courts, and rules shape outcomes?",
    rgb: "167,139,250",
    position: { x: 6, y: 64 },
  },
  "social.political-science.behavior": {
    icon: Vote,
    group: "collective",
    question: "How do citizens, parties, campaigns, identities, and information shape participation?",
    rgb: "244,114,182",
    position: { x: 68, y: 10 },
  },
  "social.political-science.policy": {
    icon: Landmark,
    group: "collective",
    question: "How do problems reach agendas, become policy, and survive implementation?",
    rgb: "52,211,153",
    position: { x: 68, y: 37 },
  },
  "social.political-science.international-relations": {
    icon: Globe2,
    group: "external",
    question: "Why do political actors cooperate, compete, bargain, deter, or fight across borders?",
    rgb: "34,211,238",
    position: { x: 68, y: 64 },
  },
  "social.political-science.political-economy": {
    icon: CircleDollarSign,
    group: "institutions",
    question: "How do political rules and economic interests shape one another?",
    rgb: "250,204,21",
    position: { x: 37, y: 78 },
  },
  "social.political-science.methods": {
    icon: Microscope,
    group: "ideas",
    question: "What evidence could distinguish rival explanations of political outcomes?",
    rgb: "148,163,184",
    position: { x: 37, y: 2 },
  },
};

const RECURRING_QUESTIONS = [
  { label: "Authority", text: "Who can make binding decisions, and why are those decisions accepted or resisted?", rgb: "251,191,36" },
  { label: "Institutions", text: "Which rules structure incentives, veto points, representation, enforcement, and accountability?", rgb: "167,139,250" },
  { label: "Collective choice", text: "How do many preferences become one policy, government, coalition, or public outcome?", rgb: "244,114,182" },
  { label: "Power", text: "Who can shape agendas, resources, information, participation, and the range of feasible choices?", rgb: "34,211,238" },
] as const;

export default function PoliticalSciencePage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <SceneFrame
      background={<HexMapBackground />}
      className="bg-[#060607] text-slate-100 selection:bg-amber-400/25"
      maxWidthClassName="max-w-[1580px]"
      headerBackground="rgba(7,7,8,0.50)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Power · legitimacy · institutions · behavior · policy · international order"
          eyebrowStyle="rule"
          icon={Landmark}
          title={<span>Political Science</span>}
          subtitle="Political science studies how collective decisions are made, contested, implemented, and constrained. Map the field by the question being asked, then examine how institutional rules turn preferences into governing coalitions."
          accentRgb="251, 191, 36"
          titleClassName="font-sans text-[clamp(2.8rem,5.3vw,6rem)] font-semibold leading-[0.84] tracking-[-0.066em] text-[#fffaf0]"
          headerClassName="border-amber-100/[0.09]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-amber-100/[0.12] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(251,191,36,0.055),transparent_24%),linear-gradient(90deg,rgba(8,8,10,0.32),transparent_36%,transparent_64%,rgba(8,8,10,0.24))] backdrop-blur-[3px]" />
        <div className="relative">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-amber-200/70">
                <Scale size={14} /> Primary navigation · map of political questions
              </div>
              <h2 className="mt-2 max-w-5xl text-[clamp(2rem,4vw,4.1rem)] font-semibold leading-[0.93] tracking-[-0.055em] text-white">
                Start with the political mechanism you want to explain.
              </h2>
            </div>
            <p className="text-[14px] leading-6 text-slate-300/70">
              The eight destinations are curriculum peers. Their placement around a common governing core shows overlap without implying that one subfield sits above another.
            </p>
          </div>

          <PoliticalFieldMap branches={context.children} />
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-3 flex items-center gap-3">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-amber-200/70">Institutional instrument</span>
          <span className="h-px flex-1 bg-gradient-to-r from-amber-200/[0.18] to-transparent" />
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-slate-600">votes → seats → coalition constraint</span>
        </div>
        <ParliamentWidget />
      </section>

      <section className="mt-8 border-t border-white/[0.10] pt-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div>
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">Recurring questions · reference, not navigation</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.6vw,3.5rem)] font-semibold leading-[0.95] tracking-[-0.052em] text-white">Political systems differ, but the same analytical questions keep returning.</h2>
          </div>
          <p className="text-[14px] leading-6 text-slate-400/70">The field is broader than elections or ideology. Political scientists also study institutions, administration, international conflict and cooperation, political economy, public opinion, historical change, and research design.</p>
        </div>

        <div className="mt-5 grid border-y border-white/[0.08] md:grid-cols-2 xl:grid-cols-4">
          {RECURRING_QUESTIONS.map((item) => (
            <QuestionBand key={item.label} {...item} />
          ))}
        </div>
      </section>
    </SceneFrame>
  );
}

function PoliticalFieldMap({ branches }: { branches: readonly CurriculumNode[] }) {
  return (
    <nav aria-label="Political Science branches" className="relative mt-5 min-h-[610px] overflow-hidden rounded-[34px] border border-white/[0.08] bg-black/[0.035] backdrop-blur-[8px]">
      <svg className="pointer-events-none absolute inset-0 hidden h-full w-full xl:block" viewBox="0 0 1000 610" preserveAspectRatio="none" aria-hidden="true">
        {branches.map((branch) => {
          const meta = BRANCH_META[branch.id];
          if (!meta) return null;
          const x = meta.position.x * 10 + 120;
          const y = meta.position.y * 5.5 + 45;
          return <line key={branch.id} x1="500" y1="310" x2={x} y2={y} stroke={`rgba(${meta.rgb},0.14)`} strokeWidth="1.4" strokeDasharray="4 7" />;
        })}
        <circle cx="500" cy="310" r="118" fill="rgba(251,191,36,0.025)" stroke="rgba(251,191,36,0.12)" />
        <circle cx="500" cy="310" r="78" fill="none" stroke="rgba(255,255,255,0.06)" />
      </svg>

      <div className="relative z-10 grid gap-3 p-4 md:grid-cols-2 xl:block xl:h-[610px] xl:p-0">
        <div className="order-first flex min-h-[180px] items-center justify-center rounded-[28px] border border-amber-100/[0.12] bg-black/[0.10] p-5 text-center backdrop-blur-[14px] md:col-span-2 xl:absolute xl:left-1/2 xl:top-1/2 xl:h-[220px] xl:w-[220px] xl:-translate-x-1/2 xl:-translate-y-1/2 xl:rounded-[34%]">
          <span>
            <Landmark size={24} className="mx-auto text-amber-200/80" />
            <strong className="mt-3 block text-[20px] leading-6 text-white">Collective rule</strong>
            <span className="mt-2 block text-[12px] leading-5 text-slate-400">power · legitimacy · institutions · choice</span>
          </span>
        </div>

        {branches.map((branch) => (
          <FieldRoute key={branch.id} branch={branch} />
        ))}
      </div>
    </nav>
  );
}

function FieldRoute({ branch }: { branch: CurriculumNode }) {
  const meta = BRANCH_META[branch.id] ?? {
    icon: Landmark,
    group: "institutions" as const,
    question: branch.description ?? "Explore this political-science branch.",
    rgb: "251,191,36",
    position: { x: 10, y: 10 },
  };
  const Icon = meta.icon;
  const planned = branch.status === "placeholder";
  const body = (
    <Surface
      variant="glass"
      className={`group min-h-[118px] rounded-[20px] p-4 ${planned ? "opacity-[0.62]" : "transition hover:-translate-y-0.5"}`}
      style={{
        borderColor: `rgba(${meta.rgb},${planned ? 0.10 : 0.24})`,
        background: `linear-gradient(145deg,rgba(${meta.rgb},0.055),rgba(7,7,9,0.17))`,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-[12px] border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.28)`, background: `rgba(${meta.rgb},0.05)` }}><Icon size={17} /></span>
        {planned ? <span className="mt-2 h-2 w-2 rounded-full border border-white/[0.14]" /> : <ArrowRight size={15} className="mt-1 text-white/30 transition group-hover:translate-x-1" />}
      </div>
      <strong className="mt-3 block text-[16px] font-semibold text-white">{branch.label}</strong>
      <span className="mt-1 block text-[11px] leading-4 text-slate-500">{meta.question}</span>
    </Surface>
  );

  const positioned = (
    <div
      className="xl:absolute xl:w-[270px]"
      style={{ left: `${meta.position.x}%`, top: `${meta.position.y}%` }}
    >
      {body}
    </div>
  );

  return planned ? (
    <div aria-disabled="true">{positioned}</div>
  ) : (
    <Link href={branch.href}>{positioned}</Link>
  );
}

function QuestionBand({ label, text, rgb }: { label: string; text: string; rgb: string }) {
  return (
    <article className="relative min-h-[170px] border-b border-white/[0.07] px-5 py-5 last:border-b-0 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0">
      <div className="absolute left-0 top-5 h-12 w-px" style={{ background: `rgba(${rgb},0.48)` }} />
      <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em]" style={{ color: `rgb(${rgb})` }}>{label}</div>
      <p className="mt-3 text-[14px] leading-6 text-slate-300/70">{text}</p>
    </article>
  );
}
