import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import HistoryBackground from "./_components/HistoryBackground";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Lightbulb,
  Map,
  type LucideIcon,
} from "lucide-react";

const NODE_ID = "humanities.history";

type LensKind = "time" | "place" | "theme";

type LensPresentation = {
  kind: LensKind;
  number: string;
  question: string;
  title: string;
  summary: string;
  accent: string;
  icon: LucideIcon;
};

const LENSES: Record<string, LensPresentation> = {
  "humanities.history.chronology": {
    kind: "time",
    number: "01",
    question: "When?",
    title: "History by Time",
    summary: "Follow sequence, duration, turning points, change, and continuity from deep human history to the present.",
    accent: "245, 158, 11",
    icon: Clock,
  },
  "humanities.history.regional": {
    kind: "place",
    number: "02",
    question: "Where?",
    title: "History by Place",
    summary: "Compare local experiences and trace the movement of people, goods, ideas, institutions, and environments across regions.",
    accent: "16, 185, 129",
    icon: Map,
  },
  "humanities.history.theme": {
    kind: "theme",
    number: "03",
    question: "What pattern?",
    title: "History by Theme",
    summary: "Follow power, exchange, belief, technology, health, environment, and everyday life across many eras and places.",
    accent: "129, 140, 248",
    icon: Lightbulb,
  },
};

export default function HistoryPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  const lenses = context.children.map((child, index) => ({
    child,
    presentation:
      LENSES[child.id] ?? {
        kind: "theme" as LensKind,
        number: String(index + 1).padStart(2, "0"),
        question: "How?",
        title: child.label,
        summary: child.description ?? "",
        accent: "217, 119, 6",
        icon: BookOpen,
      },
  }));

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#070503] text-slate-100 selection:bg-amber-400/25">
      <HistoryBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1480px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#070503]/72 px-4 pb-3 pt-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Humanities", href: "/humanities" },
              { label: "History" },
            ]}
            eyebrow="Evidence · context · change · continuity"
            icon={BookOpen}
            title={<span>History</span>}
            subtitle="The human past is too large for one path. Read it by time, by place, or by a recurring theme—then combine the lenses to explain how change happened."
            accentRgb="217, 119, 6"
            titleClassName="font-serif text-[clamp(3rem,5.4vw,6rem)] font-semibold leading-[0.84] tracking-[-0.055em] text-[#fffaf0]"
            headerClassName="border-white/[0.08]"
          />
        </div>

        <div className="mt-5 flex flex-col gap-2 px-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-300/72">
              Three ways into the past
            </div>
            <h2 className="mt-1 text-[clamp(1.7rem,3vw,2.55rem)] font-semibold tracking-[-0.04em] text-white">
              One history. Three coordinate systems.
            </h2>
          </div>
          <p className="max-w-xl text-[12px] leading-6 text-slate-400">
            Each lens keeps different relationships visible. None is complete alone, and none is merely a different menu for the same list.
          </p>
        </div>

        <nav aria-label="Ways to study history" className="mt-5 grid items-stretch gap-4 xl:grid-cols-3">
          {lenses.map(({ child, presentation }) => (
            <HistoryLens key={child.id} child={child} presentation={presentation} />
          ))}
        </nav>

        <section className="mt-5 overflow-hidden rounded-[30px] border border-white/[0.09] bg-black/[0.10] shadow-[0_28px_90px_rgba(0,0,0,0.20)] backdrop-blur-md">
          <div className="grid lg:grid-cols-[330px_1fr]">
            <div className="border-b border-white/[0.07] p-6 lg:border-b-0 lg:border-r sm:p-7">
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-300/70">
                Combine the lenses
              </div>
              <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.035em] text-white">
                The printing press is not only a date.
              </h2>
              <p className="mt-3 text-[12px] leading-6 text-slate-400">
                A historical explanation gets stronger when the same development is located in sequence, geography, and recurring human systems.
              </p>
              <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-[16px] border border-amber-200/[0.18] bg-amber-400/[0.055] text-amber-200 shadow-[0_0_28px_rgba(245,158,11,0.08)]">
                <BookOpen size={20} />
              </div>
            </div>

            <div className="grid md:grid-cols-3">
              <ExampleLens
                label="Time"
                question="What changed before and after print became widespread?"
                answer="Compare manuscript culture, expanding print networks, and later mass publishing."
                rgb="245, 158, 11"
                edgeClass="border-b md:border-b-0 md:border-r"
              />
              <ExampleLens
                label="Place"
                question="Where did presses, books, and literacy move?"
                answer="Trace cities, trade routes, language regions, states, and the uneven reach of print."
                rgb="16, 185, 129"
                edgeClass="border-b md:border-b-0 md:border-r"
              />
              <ExampleLens
                label="Theme"
                question="Which systems did print reshape?"
                answer="Follow effects on religion, politics, education, commerce, science, and public debate."
                rgb="129, 140, 248"
                edgeClass=""
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function HistoryLens({
  child,
  presentation,
}: {
  child: CurriculumNode;
  presentation: LensPresentation;
}) {
  const Icon = presentation.icon;
  const live = child.status !== "placeholder";
  const body = (
    <article
      className="group relative flex h-full min-h-[500px] flex-col overflow-hidden rounded-[30px] border p-5 shadow-[0_30px_90px_rgba(0,0,0,0.20)] backdrop-blur-md sm:p-6"
      style={{
        borderColor: `rgba(${presentation.accent},${live ? "0.18" : "0.08"})`,
        background: `linear-gradient(155deg, rgba(${presentation.accent},0.055), rgba(5,6,8,0.70) 44%, rgba(0,0,0,0.28))`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle at 52% 40%, rgba(${presentation.accent},0.11), transparent 58%)` }}
      />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em]" style={{ color: `rgba(${presentation.accent},0.70)` }}>
            {presentation.number} · {presentation.question}
          </div>
          <h3 className="mt-2 text-[25px] font-semibold tracking-[-0.035em] text-white">{presentation.title}</h3>
        </div>
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] border"
          style={{
            color: `rgb(${presentation.accent})`,
            borderColor: `rgba(${presentation.accent},0.24)`,
            background: `rgba(${presentation.accent},0.055)`,
          }}
        >
          <Icon size={19} />
        </div>
      </div>

      <p className="relative z-10 mt-3 min-h-[72px] text-[12px] leading-6 text-slate-400">{presentation.summary}</p>

      <div className="relative z-10 mt-5 flex-1">
        {presentation.kind === "time" ? <TimeLensDiagram /> : null}
        {presentation.kind === "place" ? <PlaceLensDiagram /> : null}
        {presentation.kind === "theme" ? <ThemeLensDiagram /> : null}
      </div>

      <div className="relative z-10 mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
        <span className="font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: `rgba(${presentation.accent},0.62)` }}>
          {live ? "Open this lens" : "Planned lens"}
        </span>
        <ArrowRight
          size={15}
          className="transition-transform duration-300 group-hover:translate-x-1"
          style={{ color: `rgba(${presentation.accent},0.72)` }}
        />
      </div>
    </article>
  );

  return live ? <Link href={child.href}>{body}</Link> : <div aria-disabled="true">{body}</div>;
}

function TimeLensDiagram() {
  const eras = ["Deep past", "Ancient", "Post-classical", "Early modern", "Modern"];

  return (
    <div className="relative h-full min-h-[230px] overflow-hidden rounded-[22px] border border-amber-200/[0.10] bg-[#100b06]/66 p-4">
      <div className="absolute left-[8%] right-[8%] top-1/2 h-px bg-gradient-to-r from-amber-700/25 via-amber-300/65 to-orange-200/35" />
      <div className="absolute left-[8%] right-[8%] top-[calc(50%-26px)] h-[52px] rounded-full bg-amber-400/[0.025] blur-xl" />

      <div className="relative flex h-full min-h-[198px] items-center justify-between gap-1">
        {eras.map((era, index) => (
          <div key={era} className="flex min-w-0 flex-1 flex-col items-center text-center">
            <div
              className="h-3 w-3 rounded-full border border-amber-100/45 bg-amber-400 shadow-[0_0_18px_rgba(245,158,11,0.28)]"
              style={{ opacity: 0.45 + index * 0.12 }}
            />
            <div className="mt-5 font-mono text-[8px] uppercase leading-4 tracking-[0.08em] text-amber-100/55">{era}</div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex justify-between font-mono text-[8px] uppercase tracking-[0.11em] text-slate-600">
        <span>before</span>
        <span>sequence · duration · change</span>
        <span>after</span>
      </div>
    </div>
  );
}

function PlaceLensDiagram() {
  return (
    <div className="relative h-full min-h-[230px] overflow-hidden rounded-[22px] border border-emerald-200/[0.10] bg-[#06100c]/66 p-4">
      <div
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            "linear-gradient(rgba(16,185,129,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.045) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <svg viewBox="0 0 480 230" className="relative h-full min-h-[198px] w-full" role="img" aria-label="Abstract map showing connected historical regions">
        <path d="M42 92 C80 50 137 50 167 83 C184 104 159 122 131 119 C109 117 104 142 72 134 C45 127 25 111 42 92Z" fill="rgba(16,185,129,0.055)" stroke="rgba(52,211,153,0.26)" />
        <path d="M208 58 C238 35 278 44 286 70 C292 91 270 97 260 116 C249 138 221 126 216 104 C212 87 191 74 208 58Z" fill="rgba(16,185,129,0.045)" stroke="rgba(52,211,153,0.22)" />
        <path d="M298 72 C337 38 410 54 431 89 C445 113 407 119 389 114 C365 108 358 143 327 135 C300 128 278 94 298 72Z" fill="rgba(16,185,129,0.05)" stroke="rgba(52,211,153,0.24)" />
        <path d="M379 157 C401 143 432 153 440 174 C447 194 421 199 398 195 C378 191 361 170 379 157Z" fill="rgba(16,185,129,0.04)" stroke="rgba(52,211,153,0.18)" />

        <path d="M124 105 Q228 49 332 93" fill="none" stroke="rgba(251,191,36,0.34)" strokeWidth="1.4" strokeDasharray="4 7" />
        <path d="M256 93 Q319 128 409 174" fill="none" stroke="rgba(34,211,238,0.23)" strokeWidth="1.2" strokeDasharray="4 7" />
        <path d="M129 111 Q210 155 335 123" fill="none" stroke="rgba(129,140,248,0.21)" strokeWidth="1.2" strokeDasharray="4 7" />

        {[
          [124, 105],
          [256, 93],
          [332, 93],
          [409, 174],
        ].map(([cx, cy], index) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r={index === 1 ? 6 : 4.5} fill="rgba(52,211,153,0.85)" />
            <circle cx={cx} cy={cy} r={index === 1 ? 15 : 11} fill="none" stroke="rgba(52,211,153,0.20)" />
          </g>
        ))}
      </svg>

      <div className="absolute bottom-4 left-4 right-4 flex justify-between font-mono text-[8px] uppercase tracking-[0.11em] text-slate-600">
        <span>local</span>
        <span>migration · exchange · borders</span>
        <span>global</span>
      </div>
    </div>
  );
}

function ThemeLensDiagram() {
  const nodes = [
    { label: "Power", left: 50, top: 14 },
    { label: "Exchange", left: 82, top: 38 },
    { label: "Belief", left: 70, top: 76 },
    { label: "Environment", left: 30, top: 76 },
    { label: "Health", left: 18, top: 38 },
  ];

  return (
    <div className="relative h-full min-h-[230px] overflow-hidden rounded-[22px] border border-indigo-200/[0.10] bg-[#090817]/66 p-4">
      <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {[
          [200, 108, 200, 35],
          [200, 108, 328, 83],
          [200, 108, 280, 169],
          [200, 108, 120, 169],
          [200, 108, 72, 83],
          [72, 83, 120, 169],
          [328, 83, 280, 169],
        ].map(([x1, y1, x2, y2], index) => (
          <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(129,140,248,0.19)" strokeWidth="1.2" />
        ))}
      </svg>

      <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-indigo-200/[0.24] bg-indigo-400/[0.08] text-center font-mono text-[9px] uppercase tracking-[0.10em] text-indigo-100/75 shadow-[0_0_35px_rgba(99,102,241,0.12)]">
        Human<br />change
      </div>

      {nodes.map((node) => (
        <div
          key={node.label}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-200/[0.14] bg-[#111027]/78 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.08em] text-indigo-100/58"
          style={{ left: `${node.left}%`, top: `${node.top}%` }}
        >
          {node.label}
        </div>
      ))}

      <div className="absolute bottom-4 left-4 right-4 text-center font-mono text-[8px] uppercase tracking-[0.11em] text-slate-600">
        one question traced across many times and places
      </div>
    </div>
  );
}

function ExampleLens({
  label,
  question,
  answer,
  rgb,
  edgeClass,
}: {
  label: string;
  question: string;
  answer: string;
  rgb: string;
  edgeClass: string;
}) {
  return (
    <div className={`min-h-[245px] p-6 ${edgeClass}`} style={{ borderColor: "rgba(255,255,255,0.07)" }}>
      <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em]" style={{ color: `rgba(${rgb},0.72)` }}>
        {label} lens
      </div>
      <p className="mt-4 text-[14px] font-medium leading-6 text-slate-200">{question}</p>
      <p className="mt-3 text-[11px] leading-5 text-slate-500">{answer}</p>
    </div>
  );
}
