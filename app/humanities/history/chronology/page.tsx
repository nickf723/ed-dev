import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import HistoryBackground from "../_components/HistoryBackground";
import {
  ArrowRight,
  CalendarDays,
  Castle,
  Compass,
  Factory,
  Landmark,
  type LucideIcon,
} from "lucide-react";

const NODE_ID = "humanities.history.chronology";

type EraPresentation = {
  span: string;
  prompt: string;
  icon: LucideIcon;
  rgb: string;
};

const ERAS: Record<string, EraPresentation> = {
  "humanities.history.chronology.prehistory": {
    span: "before c. 3000 BCE",
    prompt: "Human life before written archives",
    icon: Landmark,
    rgb: "168, 162, 158",
  },
  "humanities.history.chronology.antiquity": {
    span: "c. 3000 BCE–500 CE",
    prompt: "Cities, writing, states, and empires",
    icon: Landmark,
    rgb: "245, 158, 11",
  },
  "humanities.history.chronology.post-classical": {
    span: "c. 500–1500",
    prompt: "Regional worlds and long-distance networks",
    icon: Castle,
    rgb: "192, 132, 252",
  },
  "humanities.history.chronology.early-modern": {
    span: "c. 1500–1800",
    prompt: "Oceanic exchange, empires, and new knowledge",
    icon: Compass,
    rgb: "34, 211, 238",
  },
  "humanities.history.chronology.modern": {
    span: "c. 1800–present",
    prompt: "Industry, mass politics, global conflict, and decolonization",
    icon: Factory,
    rgb: "96, 165, 250",
  },
};

export default function HistoryChronologyPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#070503] text-slate-100 selection:bg-amber-400/25">
      <HistoryBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1460px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#070503]/72 px-4 pb-3 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Humanities", href: "/humanities" },
              { label: "History", href: "/humanities/history" },
              { label: "History by Time" },
            ]}
            eyebrow="Sequence · duration · turning points"
            icon={CalendarDays}
            title={<span>History by Time</span>}
            subtitle="Chronology places developments in sequence so we can ask what came before, what followed, how long change took, and where historians draw useful period boundaries."
            accentRgb="245, 158, 11"
            titleClassName="font-serif text-[clamp(2.5rem,4.8vw,5.1rem)] font-semibold leading-[0.88] tracking-[-0.052em] text-[#fff8e8]"
            headerClassName="border-white/[0.08]"
          />
        </div>

        <section className="mt-5 overflow-hidden rounded-[32px] border border-amber-200/[0.13] bg-black/[0.10] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.22)] backdrop-blur-md sm:p-7">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-300/70">
                Chronological pathway
              </div>
              <h2 className="mt-1 text-[clamp(1.7rem,3vw,2.5rem)] font-semibold tracking-[-0.04em] text-white">
                Follow change from deep history to the present.
              </h2>
            </div>
            <p className="max-w-xl text-[12px] leading-6 text-slate-400">
              These periods are broad navigation tools. Their boundaries are approximate, and different regions do not transform on one universal schedule.
            </p>
          </div>

          <div className="relative mt-8 hidden min-h-[410px] lg:block">
            <div className="absolute left-[5%] right-[5%] top-[145px] h-1 rounded-full bg-gradient-to-r from-stone-400/25 via-amber-300/55 via-cyan-300/42 to-blue-300/45" />
            <div className="absolute left-[5%] top-[137px] h-5 w-px bg-stone-300/30" />
            <div className="absolute right-[5%] top-[137px] h-5 w-px bg-blue-300/30" />

            {context.children.map((child, index) => (
              <EraStation key={child.id} child={child} index={index} total={context.children.length} />
            ))}
          </div>

          <div className="mt-6 space-y-2 lg:hidden">
            {context.children.map((child, index) => (
              <MobileEra key={child.id} child={child} index={index} />
            ))}
          </div>
        </section>

        <section className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(310px,0.9fr)]">
          <div className="rounded-[26px] border border-white/[0.08] bg-black/[0.09] p-5 backdrop-blur-md sm:p-6">
            <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-300/65">
              Read chronology carefully
            </div>
            <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.03em] text-white">
              A timeline shows order, not automatic causation.
            </h2>
            <p className="mt-3 text-[12px] leading-6 text-slate-400">
              One event occurring before another does not prove it caused the later event. Historical explanation also needs evidence, mechanisms, context, and comparison with other possible causes.
            </p>
          </div>

          <div className="rounded-[26px] border border-white/[0.08] bg-black/[0.09] p-5 backdrop-blur-md sm:p-6">
            <div className="grid grid-cols-3 gap-2 text-center">
              <ChronologyQuestion label="Sequence" text="What came before and after?" />
              <ChronologyQuestion label="Duration" text="How quickly or slowly did change unfold?" />
              <ChronologyQuestion label="Continuity" text="What persisted across the boundary?" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function EraStation({
  child,
  index,
  total,
}: {
  child: CurriculumNode;
  index: number;
  total: number;
}) {
  const presentation = ERAS[child.id] ?? {
    span: "",
    prompt: child.description ?? "",
    icon: Landmark,
    rgb: "245, 158, 11",
  };
  const Icon = presentation.icon;
  const left = 7 + (index / Math.max(1, total - 1)) * 86;
  const above = index % 2 === 0;

  return (
    <div
      className={`absolute w-[190px] -translate-x-1/2 ${above ? "top-[52px]" : "top-[162px]"}`}
      style={{ left: `${left}%` }}
    >
      <Link href={child.href} className="group block text-center">
        <div
          className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full border bg-[#0d0a07]/92 transition-transform duration-300 group-hover:scale-105 ${above ? "mb-5" : "mt-5"}`}
          style={{
            color: `rgb(${presentation.rgb})`,
            borderColor: `rgba(${presentation.rgb},0.30)`,
            boxShadow: `0 0 32px rgba(${presentation.rgb},0.10)`,
          }}
        >
          <Icon size={19} />
        </div>
        <div className={above ? "" : "-order-1"}>
          <div className="font-mono text-[9px] uppercase tracking-[0.10em]" style={{ color: `rgba(${presentation.rgb},0.68)` }}>
            {presentation.span}
          </div>
          <strong className="mt-1 block text-[13px] text-white">{child.label}</strong>
          <p className="mt-1 text-[9px] leading-4 text-slate-600">{presentation.prompt}</p>
        </div>
      </Link>
    </div>
  );
}

function MobileEra({ child, index }: { child: CurriculumNode; index: number }) {
  const presentation = ERAS[child.id] ?? {
    span: "",
    prompt: child.description ?? "",
    icon: Landmark,
    rgb: "245, 158, 11",
  };
  const Icon = presentation.icon;

  return (
    <Link
      href={child.href}
      className="flex items-center gap-4 rounded-[18px] border border-white/[0.07] bg-black/[0.10] px-4 py-4"
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] border"
        style={{ color: `rgb(${presentation.rgb})`, borderColor: `rgba(${presentation.rgb},0.22)` }}
      >
        <Icon size={16} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-mono text-[8px] uppercase tracking-[0.10em]" style={{ color: `rgba(${presentation.rgb},0.62)` }}>
          {String(index + 1).padStart(2, "0")} · {presentation.span}
        </div>
        <strong className="mt-1 block text-[12px] text-white">{child.label}</strong>
        <p className="mt-1 text-[10px] text-slate-600">{presentation.prompt}</p>
      </div>
      <ArrowRight size={14} style={{ color: `rgba(${presentation.rgb},0.68)` }} />
    </Link>
  );
}

function ChronologyQuestion({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-[16px] border border-white/[0.06] bg-white/[0.012] px-3 py-4">
      <div className="font-mono text-[9px] uppercase tracking-[0.11em] text-amber-200/65">{label}</div>
      <p className="mt-2 text-[10px] leading-5 text-slate-500">{text}</p>
    </div>
  );
}
