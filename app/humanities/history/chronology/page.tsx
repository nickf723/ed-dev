import DomainPageHeader from "@/app/_components/DomainPageHeader";
import ChronologyRiverBackground from "@/app/_page-system/backgrounds/ChronologyRiverBackground";
import TemporalScaleTopology, { type TemporalBand, type TemporalWindow } from "@/app/_page-system/topologies/TemporalScaleTopology";
import CausationCheck from "@/app/_page-system/widgets/CausationCheck";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import { CalendarDays, Clock3, MoveRight, Repeat2, Split } from "lucide-react";

const NODE_ID = "humanities.history.chronology";
const PRESENT = 2026;

const ERA_META: Record<string, { start: number; end: number; span: string; summary: string; accentRgb: string }> = {
  "humanities.history.chronology.prehistory": {
    start: -300_000,
    end: -3000,
    span: "c. 300,000–3000 BCE",
    summary: "Most human history: migration, hunting and gathering, language, tools, symbolic culture, agriculture, and the first permanent settlements before written archives became widespread.",
    accentRgb: "168, 162, 158",
  },
  "humanities.history.chronology.antiquity": {
    start: -3000,
    end: 500,
    span: "c. 3000 BCE–500 CE",
    summary: "Writing, cities, states, empires, long-distance trade, philosophical traditions, and classical political cultures reshaped much of Afro-Eurasia and the Mediterranean world.",
    accentRgb: "245, 158, 11",
  },
  "humanities.history.chronology.post-classical": {
    start: 500,
    end: 1500,
    span: "c. 500–1500",
    summary: "Regional states, religious traditions, migrations, commercial networks, and expanding connections linked societies across Africa, Asia, Europe, and the Americas.",
    accentRgb: "192, 132, 252",
  },
  "humanities.history.chronology.early-modern": {
    start: 1500,
    end: 1800,
    span: "c. 1500–1800",
    summary: "Oceanic exchange, gunpowder empires, colonial systems, religious reform, scientific transformation, and intensifying global commerce reorganized the world.",
    accentRgb: "34, 211, 238",
  },
  "humanities.history.chronology.modern": {
    start: 1800,
    end: PRESENT,
    span: "c. 1800–present",
    summary: "Industrialization, nationalism, mass politics, imperialism, world wars, decolonization, technological acceleration, and globalization transformed everyday life at unprecedented speed.",
    accentRgb: "96, 165, 250",
  },
};

const WINDOWS: TemporalWindow[] = [
  { id: "human-story", label: "Human story", start: -300_000, end: PRESENT, note: "The written record occupies only a thin edge of the full human timeline." },
  { id: "written-history", label: "Written history", start: -3000, end: PRESENT, note: "Zooming into written history makes political, cultural, and institutional change legible." },
  { id: "connected-world", label: "Connected world", start: 500, end: PRESENT, note: "Long-distance networks become increasingly dense across regions." },
  { id: "modern-world", label: "Modern world", start: 1800, end: PRESENT, note: "Industrial and technological change compresses major transformations into a few centuries." },
];

export default function HistoryChronologyPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  const bands: TemporalBand[] = context.children.map((child) => {
    const meta = ERA_META[child.id] ?? { start: 0, end: PRESENT, span: "", summary: child.description ?? "", accentRgb: "245, 158, 11" };
    return { id: child.id, label: child.label, href: child.href, ...meta };
  });

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#070503] text-slate-100 selection:bg-amber-400/25">
      <ChronologyRiverBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1460px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#070503]/78 px-4 pb-3 pt-4 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[{ label: "Humanities", href: "/humanities" }, { label: "History", href: "/humanities/history" }, { label: "History by Time" }]}
            eyebrow="Sequence · duration · change · continuity"
            eyebrowStyle="rule"
            icon={CalendarDays}
            title={<span>History by Time</span>}
            subtitle="Chronology is a coordinate system for the past. Change the time window to see duration honestly, then use sequence as the beginning of an explanation, not the end of one."
            accentRgb="245, 158, 11"
            titleClassName="font-serif text-[clamp(2.7rem,5vw,5.5rem)] font-semibold leading-[0.86] tracking-[-0.055em] text-[#fff8e8]"
            headerClassName="border-white/[0.08]"
          />
        </div>

        <section className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)] lg:items-stretch">
          <div className="rounded-[24px] border border-amber-200/[0.12] bg-black/[0.10] p-5 backdrop-blur-md sm:p-6">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.10em] text-amber-200/68">The first chronological insight</div>
            <h2 className="mt-2 max-w-3xl text-[clamp(1.7rem,3vw,2.65rem)] font-semibold tracking-[-0.04em] text-white">The past does not divide itself into eras. Historians draw boundaries to make patterns visible.</h2>
            <p className="mt-3 max-w-3xl text-[14px] leading-6 text-slate-300/78">Period labels are analytical tools. A boundary like “1500” can be useful for one question and misleading for another, because societies transform at different rates and on different schedules.</p>
          </div>

          <div className="grid grid-cols-3 gap-2 rounded-[24px] border border-white/[0.08] bg-black/[0.10] p-3 backdrop-blur-md">
            <Question icon={MoveRight} label="Sequence" text="What came before and after?" />
            <Question icon={Clock3} label="Duration" text="How long did the change take?" />
            <Question icon={Repeat2} label="Continuity" text="What survived the boundary?" />
          </div>
        </section>

        <section className="mt-5"><TemporalScaleTopology bands={bands} windows={WINDOWS} initialWindowId="human-story" /></section>

        <section className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:items-start">
          <div className="overflow-hidden rounded-[22px] border border-white/[0.08] bg-black/[0.11] backdrop-blur-xl">
            <div className="border-b border-white/[0.07] p-5">
              <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-violet-200/68"><Split size={13} /> Period boundaries</div>
              <h2 className="mt-2 text-[23px] font-semibold tracking-[-0.035em] text-white">A turning point is a comparison, not a magic date.</h2>
              <p className="mt-2 text-[13px] leading-6 text-slate-400">To call something a turning point, compare conditions on both sides of the boundary and identify what actually changes.</p>
            </div>
            <div className="grid sm:grid-cols-3">
              <BoundaryStep index="01" title="Before" text="Establish the prior pattern or structure." />
              <BoundaryStep index="02" title="Transition" text="Locate pressures, events, and mechanisms of change." />
              <BoundaryStep index="03" title="After" text="Identify both transformation and persistence." />
            </div>
          </div>

          <CausationCheck cause="Earlier development" outcome="Later historical change" />
        </section>
      </div>
    </main>
  );
}

function Question({ icon: Icon, label, text }: { icon: typeof Clock3; label: string; text: string }) {
  return (
    <div className="flex min-h-[132px] flex-col justify-between rounded-[16px] border border-white/[0.06] bg-white/[0.012] p-3">
      <Icon size={16} className="text-amber-200/60" />
      <div><div className="font-mono text-[9px] uppercase tracking-[0.07em] text-amber-100/70">{label}</div><p className="mt-1.5 text-[11px] leading-5 text-slate-400">{text}</p></div>
    </div>
  );
}

function BoundaryStep({ index, title, text }: { index: string; title: string; text: string }) {
  return (
    <div className="min-h-[150px] border-b border-white/[0.06] p-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <div className="font-mono text-[9px] text-violet-200/55">{index}</div>
      <div className="mt-4 text-[16px] font-semibold text-white">{title}</div>
      <p className="mt-2 text-[12px] leading-5 text-slate-400">{text}</p>
    </div>
  );
}
