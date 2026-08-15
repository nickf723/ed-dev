import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import HistoryBackground from "../_components/HistoryBackground";
import {
  BookOpen,
  CircleDashed,
  Coins,
  Crown,
  FlaskConical,
  Leaf,
  Lightbulb,
  Palette,
  Stethoscope,
  Swords,
  type LucideIcon,
} from "lucide-react";

const NODE_ID = "humanities.history.theme";

type ThemePresentation = {
  left: number;
  top: number;
  rgb: string;
  icon: LucideIcon;
};

const THEME_PRESENTATIONS: Record<string, ThemePresentation> = {
  "humanities.history.theme.power": { left: 50, top: 12, rgb: "245, 158, 11", icon: Crown },
  "humanities.history.theme.conflict": { left: 79, top: 27, rgb: "248, 113, 113", icon: Swords },
  "humanities.history.theme.exchange": { left: 87, top: 59, rgb: "34, 211, 238", icon: Coins },
  "humanities.history.theme.belief": { left: 69, top: 84, rgb: "192, 132, 252", icon: Palette },
  "humanities.history.theme.technology": { left: 31, top: 84, rgb: "96, 165, 250", icon: FlaskConical },
  "humanities.history.theme.health": { left: 13, top: 59, rgb: "244, 114, 182", icon: Stethoscope },
  "humanities.history.theme.environment": { left: 21, top: 27, rgb: "52, 211, 153", icon: Leaf },
  "humanities.history.theme.everyday-life": { left: 50, top: 50, rgb: "129, 140, 248", icon: BookOpen },
};

export default function HistoryThemePage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#06050b] text-slate-100 selection:bg-indigo-400/25">
      <HistoryBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1460px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#06050b]/72 px-4 pb-3 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Humanities", href: "/humanities" },
              { label: "History", href: "/humanities/history" },
              { label: "History by Theme" },
            ]}
            eyebrow="Patterns · systems · recurring questions"
            icon={Lightbulb}
            title={<span>History by Theme</span>}
            subtitle="A theme follows one human system or question across many places and periods. It reveals continuity, comparison, and interaction that a single regional or chronological survey can hide."
            accentRgb="129, 140, 248"
            titleClassName="font-serif text-[clamp(2.5rem,4.8vw,5.1rem)] font-semibold leading-[0.88] tracking-[-0.052em] text-[#f5f3ff]"
            headerClassName="border-white/[0.08]"
          />
        </div>

        <section className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.75fr)]">
          <div className="relative min-h-[660px] overflow-hidden rounded-[32px] border border-indigo-200/[0.13] bg-black/[0.10] shadow-[0_32px_110px_rgba(0,0,0,0.24)] backdrop-blur-md">
            <div className="absolute left-6 top-6 z-20 max-w-lg">
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-indigo-300/70">
                Thematic network
              </div>
              <h2 className="mt-1 text-[clamp(1.6rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">
                Themes overlap because human systems shape one another.
              </h2>
              <p className="mt-2 max-w-xl text-[11px] leading-5 text-slate-500">
                The deeper theme routes are deliberately visible but inactive until their historical surveys are built. The map establishes their relationships now without pretending the pages already exist.
              </p>
            </div>

            <svg viewBox="0 0 700 610" className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="none">
              {[
                [350, 305, 350, 74],
                [350, 305, 553, 165],
                [350, 305, 609, 360],
                [350, 305, 483, 512],
                [350, 305, 217, 512],
                [350, 305, 91, 360],
                [350, 305, 147, 165],
                [147, 165, 350, 74],
                [350, 74, 553, 165],
                [553, 165, 609, 360],
                [609, 360, 483, 512],
                [483, 512, 217, 512],
                [217, 512, 91, 360],
                [91, 360, 147, 165],
              ].map(([x1, y1, x2, y2], index) => (
                <line
                  key={index}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={index < 7 ? "rgba(129,140,248,0.16)" : "rgba(255,255,255,0.045)"}
                  strokeWidth={index < 7 ? 1.4 : 1}
                />
              ))}
              <circle cx="350" cy="305" r="128" fill="none" stroke="rgba(129,140,248,0.055)" strokeDasharray="3 9" />
              <circle cx="350" cy="305" r="216" fill="none" stroke="rgba(255,255,255,0.03)" strokeDasharray="2 12" />
            </svg>

            {context.children.map((child) => (
              <ThemeNode key={child.id} child={child} />
            ))}

            <div className="absolute bottom-5 left-6 right-6 z-20 border-t border-white/[0.06] pt-4 text-center font-mono text-[8px] uppercase tracking-[0.11em] text-slate-600">
              one theme · many periods · many regions · changing meanings
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[28px] border border-white/[0.08] bg-black/[0.10] p-5 backdrop-blur-md sm:p-6">
              <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-indigo-300/68">
                What a theme does
              </div>
              <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.03em] text-white">
                It keeps one question alive while everything else changes.
              </h2>
              <div className="mt-5 space-y-2">
                <ThemeMethod
                  label="Compare"
                  text="How did different societies organize the same human need or problem?"
                />
                <ThemeMethod
                  label="Trace"
                  text="How did an institution, technology, belief, or practice change over long spans of time?"
                />
                <ThemeMethod
                  label="Connect"
                  text="How did power, environment, exchange, health, and culture influence one another?"
                />
                <ThemeMethod
                  label="Recover"
                  text="Whose ordinary experiences disappear when history focuses only on states and major events?"
                />
              </div>
            </div>

            <div className="rounded-[28px] border border-amber-200/[0.10] bg-amber-400/[0.025] p-5 backdrop-blur-md sm:p-6">
              <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-300/65">
                A theme is not a box
              </div>
              <p className="mt-3 text-[12px] leading-6 text-slate-400">
                “Technology” cannot be separated cleanly from labor, war, environment, health, belief, or government. The categories focus attention; the connections produce the explanation.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-5 overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.09] p-5 backdrop-blur-md sm:p-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-indigo-300/65">
                The vertical thread
              </div>
              <h2 className="mt-1 text-[21px] font-semibold text-white">
                A theme crosses every chronological period.
              </h2>
            </div>
            <p className="max-w-xl text-[11px] leading-5 text-slate-500">
              The same label does not mean the same thing in every era. The point is to compare changing forms, not to project modern categories unchanged into the past.
            </p>
          </div>

          <div className="relative mt-6 grid gap-2 md:grid-cols-5">
            {[
              "Prehistory",
              "Antiquity",
              "Post-Classical",
              "Early Modern",
              "Modern",
            ].map((era, index) => (
              <div
                key={era}
                className="relative rounded-[16px] border border-indigo-200/[0.08] bg-indigo-400/[0.018] px-3 py-4 text-center"
              >
                <div className="font-mono text-[8px] text-indigo-200/48">{String(index + 1).padStart(2, "0")}</div>
                <strong className="mt-1 block text-[10px] text-slate-300">{era}</strong>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function ThemeNode({ child }: { child: CurriculumNode }) {
  const presentation = THEME_PRESENTATIONS[child.id] ?? {
    left: 50,
    top: 50,
    rgb: "129, 140, 248",
    icon: Lightbulb,
  };
  const Icon = presentation.icon;
  const live = child.status !== "placeholder";

  return (
    <div
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2 text-center"
      style={{ left: `${presentation.left}%`, top: `${presentation.top}%` }}
      aria-disabled={!live}
    >
      <div
        className="mx-auto flex h-14 w-14 items-center justify-center rounded-[18px] border bg-[#0b0a13]/90"
        style={{
          color: `rgb(${presentation.rgb})`,
          borderColor: `rgba(${presentation.rgb},${live ? "0.30" : "0.15"})`,
          boxShadow: `0 0 28px rgba(${presentation.rgb},${live ? "0.10" : "0.04"})`,
        }}
      >
        {live ? <Icon size={18} /> : <CircleDashed size={17} className="opacity-70" />}
      </div>
      <strong className={`mt-2 block max-w-[130px] text-[10px] leading-4 ${live ? "text-white" : "text-slate-500"}`}>
        {child.label}
      </strong>
      <span className="mt-1 block font-mono text-[7px] uppercase tracking-[0.10em]" style={{ color: `rgba(${presentation.rgb},0.42)` }}>
        {live ? "open theme" : "planned"}
      </span>
    </div>
  );
}

function ThemeMethod({ label, text }: { label: string; text: string }) {
  return (
    <div className="grid grid-cols-[72px_1fr] gap-3 rounded-[15px] border border-white/[0.06] bg-white/[0.012] px-3 py-3">
      <strong className="text-[10px] text-indigo-100/72">{label}</strong>
      <p className="text-[10px] leading-5 text-slate-600">{text}</p>
    </div>
  );
}
