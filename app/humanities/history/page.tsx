import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  Archive,
  ArrowRight,
  BookOpen,
  Clock3,
  Compass,
  GitCompare,
  Layers3,
  Map as MapIcon,
  Network,
  Search,
  type LucideIcon,
} from "lucide-react";
import HistoryBackground from "./HistoryBackground";
import HistoryEvidenceDesk from "./HistoryEvidenceDesk";

const NODE_ID = "humanities.history";

type LensMeta = {
  icon: LucideIcon;
  eyebrow: string;
  question: string;
  rgb: string;
  index: string;
  motif: "time" | "place" | "theme";
};

const LENS_META: Record<string, LensMeta> = {
  "humanities.history.chronology": {
    icon: Clock3,
    eyebrow: "sequence · duration · turning point",
    question: "What changed, what endured, and when did the direction of events shift?",
    rgb: "251,191,36",
    index: "01",
    motif: "time",
  },
  "humanities.history.regional": {
    icon: MapIcon,
    eyebrow: "environment · border · network",
    question: "How did location, movement, and connection shape different historical experiences?",
    rgb: "56,189,248",
    index: "02",
    motif: "place",
  },
  "humanities.history.theme": {
    icon: Network,
    eyebrow: "power · exchange · belief · everyday life",
    question: "How does one recurring human problem transform across many eras and places?",
    rgb: "167,139,250",
    index: "03",
    motif: "theme",
  },
};

const METHOD_STEPS = [
  {
    icon: Search,
    label: "Frame a question",
    text: "Decide what needs explanation before collecting every available fact.",
    rgb: "251,191,36",
  },
  {
    icon: Archive,
    label: "Interrogate sources",
    text: "Examine provenance, perspective, purpose, context, and what the record leaves silent.",
    rgb: "56,189,248",
  },
  {
    icon: GitCompare,
    label: "Corroborate",
    text: "Compare independent evidence, resolve tensions, and preserve uncertainty where sources disagree.",
    rgb: "52,211,153",
  },
  {
    icon: BookOpen,
    label: "Build an argument",
    text: "Connect evidence through causation, comparison, continuity, change, and historical significance.",
    rgb: "167,139,250",
  },
] as const;

export default function HistoryPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <SceneFrame
      background={<HistoryBackground />}
      className="bg-[#0a0807] text-stone-100 selection:bg-amber-300/25"
      maxWidthClassName="max-w-[1580px]"
      headerBackground="rgba(12,9,7,0.50)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Time · place · theme · evidence · interpretation"
          eyebrowStyle="rule"
          icon={Archive}
          title={<span>History</span>}
          subtitle="History is not a warehouse of dates. It is the disciplined reconstruction of human change from incomplete evidence. Enter through time, place, or theme, then combine those lenses into an explanation."
          accentRgb="251, 191, 36"
          titleClassName="font-serif text-[clamp(3rem,5.8vw,6.5rem)] font-semibold leading-[0.82] tracking-[-0.062em] text-[#fff8e8]"
          headerClassName="border-amber-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-amber-100/[0.12] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(18,11,7,0.42),rgba(10,11,16,0.13)_54%,transparent_82%)] backdrop-blur-[3px]" />
        <div className="relative grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(390px,0.72fr)]">
          <div className="min-w-0">
            <div className="max-w-4xl px-1">
              <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-amber-200/72">
                <Compass size={14} /> Primary navigation · three historical lenses
              </div>
              <h2 className="mt-2 text-[clamp(2rem,4vw,4.1rem)] font-semibold leading-[0.93] tracking-[-0.055em] text-white">
                The same past becomes a different problem when the organizing lens changes.
              </h2>
              <p className="mt-3 max-w-3xl text-[14px] leading-6 text-stone-300/72">
                These are the direct children of History. None is a complete substitute for the others: chronology provides sequence, place supplies context and connection, and theme reveals patterns that cross boundaries.
              </p>
            </div>

            <nav aria-label="History branches" className="mt-5 grid gap-3">
              {context.children.map((child) => (
                <LensRoute key={child.id} child={child} />
              ))}
            </nav>
          </div>

          <LensWeave />
        </div>
      </section>

      <section className="mt-8">
        <HistoryEvidenceDesk />
      </section>

      <section className="mt-8 border-t border-stone-100/[0.10] pt-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-100/62">
              <Layers3 size={14} /> Historical method · reference, not navigation
            </div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.6vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.052em] text-white">
              Evidence becomes history through a chain of transparent reasoning.
            </h2>
          </div>
          <p className="text-[14px] leading-6 text-stone-400/74">
            Historians can disagree without abandoning rigor. The disagreement becomes useful when the sources, assumptions, comparison set, and inferential steps remain visible enough to examine.
          </p>
        </div>

        <div className="mt-5 grid border-y border-stone-100/[0.09] md:grid-cols-2 xl:grid-cols-4">
          {METHOD_STEPS.map((step, index) => (
            <MethodStep key={step.label} {...step} index={index + 1} />
          ))}
        </div>
      </section>
    </SceneFrame>
  );
}

function LensRoute({ child }: { child: CurriculumNode }) {
  const meta = LENS_META[child.id] ?? {
    icon: Archive,
    eyebrow: "historical branch",
    question: child.description ?? "Explore this way of organizing the past.",
    rgb: "251,191,36",
    index: "--",
    motif: "time" as const,
  };
  const Icon = meta.icon;
  const planned = child.status === "placeholder";
  const content = (
    <Surface
      variant="glass"
      className={`group relative overflow-hidden rounded-l-[18px] rounded-r-[34px] p-0 transition ${
        planned ? "opacity-55" : "hover:translate-x-1"
      }`}
      style={{
        borderColor: `rgba(${meta.rgb},${planned ? 0.08 : 0.19})`,
        background: `linear-gradient(90deg,rgba(17,11,8,0.62),rgba(${meta.rgb},0.045)_56%,rgba(8,8,13,0.12))`,
        boxShadow: planned ? undefined : `inset 3px 0 0 rgba(${meta.rgb},0.52)`,
      }}
    >
      <div className="grid min-h-[112px] gap-4 px-4 py-4 sm:grid-cols-[42px_52px_220px_minmax(0,1fr)_28px] sm:items-center sm:px-5">
        <span className="font-mono text-[12px] text-stone-600">{meta.index}</span>
        <span
          className="flex h-11 w-11 items-center justify-center rounded-[13px] border"
          style={{
            color: `rgb(${meta.rgb})`,
            borderColor: `rgba(${meta.rgb},0.28)`,
            background: `rgba(${meta.rgb},0.055)`,
          }}
        >
          <Icon size={18} />
        </span>
        <span>
          <span
            className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em]"
            style={{ color: `rgba(${meta.rgb},0.72)` }}
          >
            {meta.eyebrow}
          </span>
          <strong className="mt-1 block text-[19px] font-semibold text-white">
            {child.label}
          </strong>
        </span>
        <span className="text-[14px] leading-6 text-stone-300/72">
          {meta.question}
        </span>
        {planned ? (
          <span className="h-2 w-2 rounded-full border border-white/[0.14]" />
        ) : (
          <ArrowRight
            size={16}
            className="text-white/30 transition group-hover:translate-x-1 group-hover:text-white/82"
          />
        )}
      </div>
      <LensMotif motif={meta.motif} rgb={meta.rgb} />
    </Surface>
  );

  return planned ? (
    <div aria-disabled="true">{content}</div>
  ) : (
    <Link href={child.href}>{content}</Link>
  );
}

function LensMotif({ motif, rgb }: { motif: LensMeta["motif"]; rgb: string }) {
  if (motif === "time") {
    return (
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-5 opacity-65">
        <div className="absolute inset-x-0 bottom-2 h-px" style={{ background: `rgba(${rgb},0.23)` }} />
        {Array.from({ length: 18 }, (_, index) => (
          <span
            key={index}
            className="absolute bottom-0 w-px"
            style={{
              left: `${3 + index * 5.55}%`,
              height: index % 4 === 0 ? 13 : 7,
              background: `rgba(${rgb},${index % 4 === 0 ? 0.34 : 0.16})`,
            }}
          />
        ))}
      </div>
    );
  }

  if (motif === "place") {
    return (
      <svg className="pointer-events-none absolute inset-y-0 right-0 h-full w-[36%] opacity-36" viewBox="0 0 300 110" aria-hidden="true">
        <path d="M10 72 Q72 10 132 60 T288 28" fill="none" stroke={`rgba(${rgb},0.42)`} strokeWidth="1.5" />
        <path d="M20 92 Q92 52 154 84 T286 70" fill="none" stroke={`rgba(${rgb},0.20)`} strokeWidth="1" />
        {[{ x: 22, y: 81 }, { x: 92, y: 35 }, { x: 151, y: 69 }, { x: 222, y: 41 }, { x: 282, y: 28 }].map((point) => (
          <rect key={`${point.x}-${point.y}`} x={point.x - 3} y={point.y - 3} width="6" height="6" fill={`rgba(${rgb},0.48)`} />
        ))}
      </svg>
    );
  }

  return (
    <svg className="pointer-events-none absolute inset-y-0 right-0 h-full w-[38%] opacity-36" viewBox="0 0 320 110" aria-hidden="true">
      <path d="M4 18 C72 14 94 102 170 78 S250 22 320 46" fill="none" stroke={`rgba(${rgb},0.42)`} strokeWidth="1.5" />
      <path d="M0 68 C70 98 116 12 192 36 S258 104 320 88" fill="none" stroke="rgba(251,191,36,0.26)" strokeWidth="1.2" />
      <path d="M18 104 C98 62 120 74 176 22 S262 42 312 8" fill="none" stroke="rgba(45,212,191,0.24)" strokeWidth="1.2" />
    </svg>
  );
}

function LensWeave() {
  const strands = [
    { label: "Time", question: "when and in what sequence?", rgb: "251,191,36", top: "20%", side: "left" },
    { label: "Place", question: "where and through which connections?", rgb: "56,189,248", top: "48%", side: "right" },
    { label: "Theme", question: "which recurring force is being traced?", rgb: "167,139,250", top: "75%", side: "left" },
  ] as const;

  return (
    <Surface
      variant="ghost"
      className="relative min-h-[520px] overflow-hidden rounded-[30px] border-stone-100/[0.09]"
      style={{ background: "rgba(8,7,9,0.09)" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(226,207,164,0.065),transparent_25%),linear-gradient(180deg,rgba(16,10,7,0.16),transparent_72%)]" />
      <div className="relative px-5 pt-5">
        <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-stone-400">
          Interpretation weave
        </div>
        <p className="mt-2 max-w-md text-[13px] leading-5 text-stone-400/72">
          Strong historical explanations braid multiple lenses instead of mistaking one organizing scheme for the past itself.
        </p>
      </div>

      <div className="absolute inset-x-5 bottom-6 top-[105px]">
        <div className="absolute left-1/2 top-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[30%] border border-amber-100/[0.14] bg-black/[0.13] p-5 text-center backdrop-blur-[12px]">
          <span>
            <Archive size={22} className="mx-auto text-amber-200/74" />
            <strong className="mt-3 block text-[18px] leading-5 text-white">Historical explanation</strong>
            <span className="mt-2 block text-[12px] leading-5 text-stone-400">claim · evidence · context · uncertainty</span>
          </span>
        </div>

        {strands.map((strand, index) => {
          const leftSide = strand.side === "left";
          return (
            <div key={strand.label} className="absolute inset-x-0" style={{ top: strand.top }}>
              <div
                className={`absolute top-1/2 h-px w-[38%] ${leftSide ? "left-[12%]" : "right-[12%]"}`}
                style={{ background: `linear-gradient(${leftSide ? "90deg" : "270deg"},rgba(${strand.rgb},0.05),rgba(${strand.rgb},0.42))` }}
              />
              <div
                className={`absolute top-1/2 h-px w-[30%] ${leftSide ? "right-[20%]" : "left-[20%]"}`}
                style={{ background: `rgba(${strand.rgb},0.22)`, transform: `rotate(${leftSide ? -8 - index * 3 : 8 + index * 3}deg)` }}
              />
              <div
                className={`absolute -translate-y-1/2 rounded-[14px] border px-3 py-2 backdrop-blur-[10px] ${leftSide ? "left-0 text-left" : "right-0 text-right"}`}
                style={{
                  borderColor: `rgba(${strand.rgb},0.18)`,
                  background: `rgba(${strand.rgb},0.045)`,
                }}
              >
                <strong className="block text-[13px]" style={{ color: `rgb(${strand.rgb})` }}>{strand.label}</strong>
                <span className="mt-0.5 block max-w-[170px] text-[11px] leading-4 text-stone-500">{strand.question}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Surface>
  );
}

function MethodStep({
  icon: Icon,
  label,
  text,
  rgb,
  index,
}: (typeof METHOD_STEPS)[number] & { index: number }) {
  return (
    <article className="relative min-h-[190px] border-b border-stone-100/[0.07] px-5 py-5 last:border-b-0 md:border-r md:last:border-r-0 xl:border-b-0">
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-[12px] border backdrop-blur-[10px]" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.22)`, background: `rgba(${rgb},0.045)` }}>
          <Icon size={17} />
        </span>
        <span className="font-mono text-[11px] text-stone-600">{String(index).padStart(2, "0")}</span>
      </div>
      <h3 className="mt-4 text-[18px] font-semibold tracking-[-0.025em] text-white">{label}</h3>
      <p className="mt-2 text-[14px] leading-6 text-stone-400/72">{text}</p>
    </article>
  );
}
