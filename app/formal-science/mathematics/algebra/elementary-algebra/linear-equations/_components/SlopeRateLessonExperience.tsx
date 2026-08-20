"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Gauge,
  Minus,
  MoveRight,
  MoveVertical,
  Sparkles,
  Table2,
  TrendingDown,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import Assessment, {
  type AssessmentQuestion,
} from "@/app/_components/Assessment";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import LessonUtilityBar from "@/app/_components/LessonUtilityBar";
import {
  SceneFrame,
  Surface,
  WorldSceneFocus,
  WorldWindow,
} from "@/app/_page-system/scene";
import SlopeRateBackground from "./SlopeRateBackground";
import SlopeRateWorkbench from "./SlopeRateWorkbench";

export type LinearLessonNavItem = {
  label: string;
  href: string;
};

type SlopeRateLessonExperienceProps = {
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: LinearLessonNavItem;
  next?: LinearLessonNavItem;
  unitHref: string;
};

const ACCENT = "45, 212, 191";

const SLOPE_SCENES = [
  {
    id: "positive",
    label: "Positive rate",
    description:
      "As x increases, y increases. The line rises from left to right.",
    accentRgb: "45, 212, 191",
  },
  {
    id: "negative",
    label: "Negative rate",
    description:
      "As x increases, y decreases. The line falls from left to right.",
    accentRgb: "244, 114, 182",
  },
  {
    id: "zero",
    label: "Zero rate",
    description:
      "x changes while y stays constant, producing a horizontal line.",
    accentRgb: "96, 165, 250",
  },
  {
    id: "vertical",
    label: "No horizontal run",
    description:
      "The selected points share an x-value, so Δx = 0 and slope is undefined.",
    accentRgb: "250, 204, 21",
  },
] as const;

const QUIZ: AssessmentQuestion[] = [
  {
    id: "slope-points",
    type: "short_answer",
    prompt: "Find the slope through (1, 2) and (4, 8). Enter m.",
    acceptableAnswers: ["2", "m=2", "m = 2"],
    explanation:
      "Δy = 8 − 2 = 6 and Δx = 4 − 1 = 3, so m = 6/3 = 2.",
  },
  {
    id: "slope-negative",
    type: "mcq",
    prompt:
      "A line falls 3 units for every 2 units it moves right. What is its slope?",
    options: ["−3/2", "3/2", "−2/3", "0"],
    correctAnswer: "−3/2",
    explanation:
      "The run is positive and the vertical change is negative, so m = −3/2.",
  },
  {
    id: "slope-order",
    type: "tf",
    prompt:
      "Reversing the point order changes both Δy and Δx, so the slope stays the same.",
    correctAnswer: true,
    explanation:
      "Both differences change sign. Their ratio is unchanged because the two negatives cancel.",
  },
  {
    id: "slope-vertical",
    type: "tf",
    prompt: "A vertical line has slope 0.",
    correctAnswer: false,
    explanation:
      "A vertical line has Δx = 0. Division by zero is undefined, so its slope is undefined rather than zero.",
  },
];

export default function SlopeRateLessonExperience({
  breadcrumbs,
  previous,
  next,
  unitHref,
}: SlopeRateLessonExperienceProps) {
  return (
    <SceneFrame
      background={<SlopeRateBackground />}
      initialScene="positive"
      className="bg-[#020810] text-slate-100 selection:bg-teal-400/25"
      maxWidthClassName="max-w-[1560px]"
      headerBackground="rgba(1,8,14,0.62)"
      header={
        <DomainPageHeader
          breadcrumbs={breadcrumbs}
          eyebrow="Linear equations · lesson 01 · constant rate"
          eyebrowStyle="rule"
          icon={TrendingUp}
          title={<span>Slope &amp; Rate of Change</span>}
          subtitle="Slope compares how two quantities change together. Read it as a ratio, see it as a rise-and-run triangle, and interpret it in the units of the situation."
          accentRgb={ACCENT}
          titleClassName="font-sans text-[clamp(2.35rem,4.6vw,5.1rem)] font-semibold leading-[0.86] tracking-[-0.062em] text-[#f3fffe]"
          iconClassName="rounded-[16px]"
          headerClassName="border-teal-200/[0.11]"
        />
      }
    >
      <div className="mt-2">
        <LessonUtilityBar
          practiceTargetId="slope-practice"
          vocabulary
          accentRgb={ACCENT}
        />
      </div>

      <section className="mt-3">
        <WorldWindow
          density="compact"
          eyebrow="Rate-of-change observatory"
          title="Slope is one ratio seen in several forms."
          description="Change the rise, run, starting value, or point order. The graph, numerical ratio, verbal interpretation, and moving direction field remain synchronized."
          scenes={[...SLOPE_SCENES]}
        >
          <SlopeRateWorkbench />
        </WorldWindow>
      </section>

      <section className="mt-9">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-cyan-200/72">
              <Table2 size={14} /> One rate, three representations
            </div>
            <h2 className="mt-3 max-w-5xl text-[clamp(2rem,4vw,4.1rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-white">
              The table, graph, and context should tell the same change story.
            </h2>
          </div>
          <p className="text-[15px] leading-7 text-slate-300/72">
            For the relationship y = 1.5x + 1, every increase of 2 in x produces an increase of 3 in y. The slope is 3/2, or 1.5 output units per input unit.
          </p>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-3">
          <RepresentationCard
            icon={Table2}
            eyebrow="Table"
            title="Repeated differences"
            rgb="45,212,191"
          >
            <div className="overflow-hidden rounded-[15px] border border-white/[0.08] font-mono text-[13px]">
              <div className="grid grid-cols-2 bg-white/[0.025] text-center font-semibold text-slate-300">
                <span className="border-r border-white/[0.08] px-3 py-2">x</span>
                <span className="px-3 py-2">y</span>
              </div>
              {[
                [0, 1],
                [2, 4],
                [4, 7],
              ].map(([x, y]) => (
                <div
                  key={x}
                  className="grid grid-cols-2 border-t border-white/[0.07] text-center text-slate-400"
                >
                  <span className="border-r border-white/[0.07] px-3 py-2">{x}</span>
                  <span className="px-3 py-2">{y}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-center gap-3 font-mono text-[14px]">
              <span className="text-pink-200">Δy = 3</span>
              <span className="text-slate-600">/</span>
              <span className="text-amber-200">Δx = 2</span>
            </div>
          </RepresentationCard>

          <RepresentationCard
            icon={MoveRight}
            eyebrow="Graph"
            title="A repeated staircase"
            rgb="244,114,182"
          >
            <MiniRateGraph />
            <p className="mt-3 text-[13px] leading-5 text-slate-400/74">
              Any rise-and-run triangle drawn on the same line reduces to the same ratio.
            </p>
          </RepresentationCard>

          <RepresentationCard
            icon={Gauge}
            eyebrow="Context"
            title="Units complete the meaning"
            rgb="250,204,21"
          >
            <div className="rounded-[17px] border border-amber-200/[0.12] bg-amber-300/[0.035] p-5 text-center">
              <div className="font-mono text-[28px] font-semibold text-amber-100">
                3 liters
              </div>
              <div className="my-2 h-px bg-amber-100/[0.16]" />
              <div className="font-mono text-[28px] font-semibold text-cyan-100">
                2 minutes
              </div>
            </div>
            <p className="mt-3 text-[13px] leading-5 text-slate-400/74">
              A tank gains 1.5 liters per minute. The ratio carries output units over input units.
            </p>
          </RepresentationCard>
        </div>
      </section>

      <section className="mt-9 grid gap-4 xl:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)]">
        <Surface variant="glass" className="rounded-[30px] p-6 sm:p-7">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-teal-200/72">
            <MoveRight size={14} /> Two-point formula
          </div>
          <h2 className="mt-3 text-[clamp(1.9rem,3.5vw,3.5rem)] font-semibold leading-[0.96] tracking-[-0.052em] text-white">
            Keep the subtraction order consistent in the numerator and denominator.
          </h2>
          <div className="mt-5 rounded-[20px] border border-teal-100/[0.10] bg-black/[0.22] p-5 text-center font-mono text-[clamp(1.2rem,2.5vw,1.9rem)] text-white">
            m = (y₂ − y₁) / (x₂ − x₁)
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <OrderExample
              label="A → B"
              calculation="(5 − 1) / (2 − 0) = 4/2 = 2"
              rgb="45,212,191"
            />
            <OrderExample
              label="B → A"
              calculation="(1 − 5) / (0 − 2) = −4/−2 = 2"
              rgb="167,139,250"
            />
          </div>
          <p className="mt-4 text-[14px] leading-6 text-slate-300/70">
            Reversing the points is legal. Mixing the orders is not: using y₂ − y₁ with x₁ − x₂ would change only one sign and produce the opposite slope.
          </p>
        </Surface>

        <Surface variant="ghost" className="rounded-[30px] p-6 sm:p-7">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-amber-200/72">
            Sign and boundary cases
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <WorldSceneFocus scene="positive">
              <BoundaryCard
                icon={TrendingUp}
                title="Positive"
                formula="m > 0"
                text="The line rises left to right."
                rgb="45,212,191"
              />
            </WorldSceneFocus>
            <WorldSceneFocus scene="negative">
              <BoundaryCard
                icon={TrendingDown}
                title="Negative"
                formula="m < 0"
                text="The line falls left to right."
                rgb="244,114,182"
              />
            </WorldSceneFocus>
            <WorldSceneFocus scene="zero">
              <BoundaryCard
                icon={Minus}
                title="Zero"
                formula="m = 0"
                text="y stays constant while x changes."
                rgb="96,165,250"
              />
            </WorldSceneFocus>
            <WorldSceneFocus scene="vertical">
              <BoundaryCard
                icon={MoveVertical}
                title="Undefined"
                formula="Δx = 0"
                text="A vertical line would divide by zero."
                rgb="250,204,21"
              />
            </WorldSceneFocus>
          </div>
        </Surface>
      </section>

      <section id="slope-practice" className="mt-8 scroll-mt-24">
        <details className="group overflow-hidden rounded-[24px] border border-white/[0.09] bg-black/[0.18] backdrop-blur-xl">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
            <span>
              <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-teal-200/72">
                Transfer check
              </span>
              <strong className="mt-1 block text-[16px] text-slate-200">
                Use slope on four fresh cases
              </strong>
            </span>
            <Sparkles size={17} className="text-teal-300" />
          </summary>
          <div className="linear-assessment border-t border-white/[0.07] p-3 sm:p-4">
            <Assessment
              title="Slope & Rate of Change check"
              questions={QUIZ}
              accentColor="cyan"
            />
          </div>
        </details>
      </section>

      <LessonNavigation previous={previous} next={next} unitHref={unitHref} />

      <style>{`
        .linear-assessment > div {
          border-radius: 18px !important;
          padding: 16px !important;
          background: rgba(0,0,0,0.10) !important;
          box-shadow: none !important;
        }
        .linear-assessment > div > div { min-height: 300px !important; }
      `}</style>
    </SceneFrame>
  );
}

function RepresentationCard({
  icon: Icon,
  eyebrow,
  title,
  rgb,
  children,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  rgb: string;
  children: import("react").ReactNode;
}) {
  return (
    <Surface
      variant="ghost"
      className="rounded-[24px] p-5"
      style={{ borderColor: `rgba(${rgb},0.15)` }}
    >
      <span
        className="flex h-11 w-11 items-center justify-center rounded-[14px] border"
        style={{
          color: `rgb(${rgb})`,
          borderColor: `rgba(${rgb},0.24)`,
          background: `rgba(${rgb},0.05)`,
        }}
      >
        <Icon size={18} />
      </span>
      <div
        className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.10em]"
        style={{ color: `rgba(${rgb},0.72)` }}
      >
        {eyebrow}
      </div>
      <h3 className="mt-1 text-[20px] font-semibold tracking-[-0.035em] text-white">
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </Surface>
  );
}

function MiniRateGraph() {
  return (
    <svg
      viewBox="0 0 320 190"
      className="h-[190px] w-full rounded-[16px] border border-white/[0.08] bg-black/[0.18]"
      role="img"
      aria-label="Line with repeated rise three and run two triangles"
    >
      {Array.from({ length: 9 }, (_, index) => (
        <g key={index}>
          <line
            x1={24 + index * 34}
            y1="14"
            x2={24 + index * 34}
            y2="176"
            stroke="rgba(94,234,212,0.08)"
          />
          <line
            x1="18"
            y1={20 + index * 19}
            x2="302"
            y2={20 + index * 19}
            stroke="rgba(125,211,252,0.07)"
          />
        </g>
      ))}
      <line x1="18" y1="164" x2="302" y2="164" stroke="rgba(226,232,240,0.34)" />
      <line x1="42" y1="14" x2="42" y2="176" stroke="rgba(226,232,240,0.34)" />
      <line x1="42" y1="145" x2="278" y2="38" stroke="rgb(45,212,191)" strokeWidth="4" />
      <path d="M76 130 H144 V99" fill="none" stroke="rgb(250,204,21)" strokeWidth="3" strokeDasharray="7 6" />
      <path d="M144 130 V99" fill="none" stroke="rgb(244,114,182)" strokeWidth="3" strokeDasharray="7 6" />
      <path d="M178 83 H246 V52" fill="none" stroke="rgb(250,204,21)" strokeWidth="3" strokeDasharray="7 6" opacity="0.55" />
      <path d="M246 83 V52" fill="none" stroke="rgb(244,114,182)" strokeWidth="3" strokeDasharray="7 6" opacity="0.55" />
      <text x="110" y="149" fill="rgb(250,204,21)" fontSize="12" textAnchor="middle">run 2</text>
      <text x="153" y="117" fill="rgb(244,114,182)" fontSize="12">rise 3</text>
    </svg>
  );
}

function OrderExample({
  label,
  calculation,
  rgb,
}: {
  label: string;
  calculation: string;
  rgb: string;
}) {
  return (
    <div className="rounded-[17px] border border-white/[0.08] bg-black/[0.17] p-4">
      <div
        className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em]"
        style={{ color: `rgba(${rgb},0.72)` }}
      >
        {label}
      </div>
      <div className="mt-2 font-mono text-[14px] leading-6 text-slate-200/82">
        {calculation}
      </div>
    </div>
  );
}

function BoundaryCard({
  icon: Icon,
  title,
  formula,
  text,
  rgb,
}: {
  icon: LucideIcon;
  title: string;
  formula: string;
  text: string;
  rgb: string;
}) {
  return (
    <div
      className="h-full rounded-[17px] border bg-black/[0.16] p-4 transition hover:-translate-y-0.5 hover:bg-black/[0.24]"
      style={{ borderColor: `rgba(${rgb},0.14)` }}
    >
      <Icon size={17} style={{ color: `rgb(${rgb})` }} />
      <div className="mt-3 text-[15px] font-semibold text-white">{title}</div>
      <div className="mt-1 font-mono text-[13px]" style={{ color: `rgb(${rgb})` }}>
        {formula}
      </div>
      <p className="mt-2 text-[12px] leading-5 text-slate-400/72">{text}</p>
    </div>
  );
}

function LessonNavigation({
  previous,
  next,
  unitHref,
}: {
  previous?: LinearLessonNavItem;
  next?: LinearLessonNavItem;
  unitHref: string;
}) {
  return (
    <nav className="mt-8 pb-8" aria-label="Graphing Linear Equations lesson navigation">
      <div className="mb-2 flex justify-end">
        <span className="font-mono text-[11px] text-slate-600">01 / 04</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {previous ? (
          <NavCard item={previous} direction="previous" />
        ) : (
          <div className="hidden sm:block" aria-hidden="true" />
        )}
        {next ? (
          <NavCard item={next} direction="next" />
        ) : (
          <Link
            href={unitHref}
            className="flex min-h-[76px] items-center rounded-[18px] border border-teal-300/[0.14] bg-teal-400/[0.025] px-4"
          >
            <span className="min-w-0 flex-1 text-right">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.10em] text-slate-500">
                Unit
              </span>
              <strong className="mt-1 block text-[14px] text-slate-200">
                Graphing Linear Equations
              </strong>
            </span>
            <Check size={15} className="ml-3 text-teal-300" />
          </Link>
        )}
      </div>
    </nav>
  );
}

function NavCard({
  item,
  direction,
}: {
  item: LinearLessonNavItem;
  direction: "previous" | "next";
}) {
  const previous = direction === "previous";
  return (
    <Link
      href={item.href}
      className="flex min-h-[76px] items-center gap-3 rounded-[18px] border border-teal-300/[0.12] bg-teal-400/[0.018] px-4 py-3"
    >
      {previous ? <ArrowLeft size={15} className="text-teal-300" /> : null}
      <span className={`min-w-0 flex-1 ${previous ? "" : "text-right"}`}>
        <span className="block text-[11px] font-semibold uppercase tracking-[0.10em] text-slate-500">
          {previous ? "Previous lesson" : "Next lesson"}
        </span>
        <strong className="mt-1 block text-[14px] text-slate-200">
          {item.label}
        </strong>
      </span>
      {!previous ? <ArrowRight size={15} className="text-teal-300" /> : null}
    </Link>
  );
}
