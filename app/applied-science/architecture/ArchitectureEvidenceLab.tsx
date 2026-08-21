"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  Accessibility,
  Check,
  DraftingCompass,
  Layers3,
  RotateCcw,
  Ruler,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  ARCHITECTURE_ASSESSMENT_CASES,
  drawingMillimetersToActualMeters,
  getRampRunMeters,
  getRectangularArea,
  isArchitectureAssessmentAnswerCorrect,
  type ArchitectureAssessmentCase,
} from "./architectureModel";

type Answers = Partial<Record<ArchitectureAssessmentCase["id"], number>>;

const studioArea = getRectangularArea(8, 6);
const actualWallLength = drawingMillimetersToActualMeters(72, 100);
const rampRun = getRampRunMeters(0.75);

export default function ArchitectureEvidenceLab() {
  const [activeId, setActiveId] =
    useState<ArchitectureAssessmentCase["id"]>("area");
  const [answers, setAnswers] = useState<Answers>({});
  const activeCase =
    ARCHITECTURE_ASSESSMENT_CASES.find((item) => item.id === activeId) ??
    ARCHITECTURE_ASSESSMENT_CASES[0];
  const selectedIndex = answers[activeCase.id];
  const correct =
    selectedIndex === undefined
      ? undefined
      : isArchitectureAssessmentAnswerCorrect(activeCase.id, selectedIndex);
  const answered = Object.keys(answers).length;
  const score = useMemo(
    () =>
      ARCHITECTURE_ASSESSMENT_CASES.filter(
        (item) => answers[item.id] === item.correctIndex
      ).length,
    [answers]
  );

  function reset() {
    setAnswers({});
    setActiveId("area");
  }

  return (
    <section
      data-assessment="architecture-coordination-review"
      data-model="architecture-spatial-arithmetic"
      className="bg-[#04111d]/52 overflow-hidden rounded-[32px] border border-sky-100/[0.11] shadow-[0_36px_120px_rgba(0,0,0,0.26)] backdrop-blur-xl"
    >
      <div className="grid gap-5 border-b border-sky-100/[0.09] p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <div className="text-sky-200/66 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em]">
            <DraftingCompass size={14} aria-hidden="true" /> Coordination review
          </div>
          <h2 className="mt-3 max-w-4xl text-[clamp(2rem,4vw,3.7rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">
            Calculate one layer exactly, then check what the calculation leaves
            out.
          </h2>
          <p className="text-slate-300/68 mt-4 max-w-3xl text-[14px] leading-7">
            Plans, scale drawings, and sections support precise arithmetic.
            Design judgment begins when several drawings and obligations must
            agree.
          </p>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.08em] text-slate-500">
          <span>{score} correct</span>
          <span className="text-white/15">·</span>
          <span>{answered}/4 reviewed</span>
          <button
            type="button"
            onClick={reset}
            className="ml-2 inline-flex items-center gap-2 rounded-full border border-white/[0.09] px-3 py-2 text-slate-400 transition hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200/60"
          >
            <RotateCcw size={12} aria-hidden="true" /> Reset
          </button>
        </div>
      </div>

      <div className="grid xl:grid-cols-[310px_minmax(0,1fr)]">
        <div className="border-b border-sky-100/[0.08] p-4 sm:p-5 xl:border-b-0 xl:border-r">
          <div
            className="space-y-2"
            role="tablist"
            aria-label="Architecture review files"
          >
            {ARCHITECTURE_ASSESSMENT_CASES.map((item, index) => {
              const answer = answers[item.id];
              const state =
                answer === undefined
                  ? "open"
                  : answer === item.correctIndex
                    ? "coordinated"
                    : "revisit";
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCase.id === item.id}
                  onClick={() => setActiveId(item.id)}
                  className={`w-full rounded-[16px] border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200/60 ${
                    activeCase.id === item.id
                      ? "border-sky-200/25 bg-sky-200/[0.055]"
                      : "border-white/[0.07] bg-white/[0.012] hover:bg-white/[0.025]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[11px] text-sky-100/55">
                      SHEET {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-mono text-[11px] uppercase tracking-[0.07em] ${
                        state === "coordinated"
                          ? "text-emerald-200/70"
                          : state === "revisit"
                            ? "text-amber-200/70"
                            : "text-slate-600"
                      }`}
                    >
                      {state}
                    </span>
                  </div>
                  <strong className="text-white/84 mt-2 block text-[14px] leading-5">
                    {item.eyebrow}
                  </strong>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,1.1fr)]">
          <DrawingPlate representation={activeCase.representation} />
          <div>
            <div className="text-amber-200/64 font-mono text-[11px] font-semibold uppercase tracking-[0.11em]">
              {activeCase.eyebrow}
            </div>
            <h3 className="mt-3 text-[clamp(1.55rem,2.8vw,2.5rem)] font-semibold leading-tight tracking-[-0.04em] text-white">
              {activeCase.prompt}
            </h3>

            <div className="mt-6 space-y-2">
              {activeCase.options.map((option, index) => {
                const selected = selectedIndex === index;
                return (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={selected}
                    onClick={() =>
                      setAnswers((current) => ({
                        ...current,
                        [activeCase.id]: index,
                      }))
                    }
                    className={`flex w-full items-start gap-3 rounded-[15px] border p-4 text-left text-[13px] leading-6 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200/60 ${
                      selected
                        ? "border-sky-200/30 bg-sky-200/[0.06] text-white"
                        : "text-slate-300/72 border-white/[0.07] bg-white/[0.012] hover:bg-white/[0.025]"
                    }`}
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10 font-mono text-[11px] text-slate-500">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>

            <div
              className="mt-5 min-h-[94px] rounded-[16px] border border-white/[0.07] bg-black/20 p-4"
              aria-live="polite"
            >
              {correct === undefined ? (
                <p className="text-[13px] leading-6 text-slate-500">
                  Choose the conclusion supported by the drawing or coordination
                  record.
                </p>
              ) : (
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                      correct
                        ? "bg-emerald-300/10 text-emerald-200"
                        : "bg-amber-300/10 text-amber-200"
                    }`}
                  >
                    {correct ? (
                      <Check size={14} aria-hidden="true" />
                    ) : (
                      <X size={14} aria-hidden="true" />
                    )}
                  </span>
                  <div>
                    <strong className="text-[13px] text-white">
                      {correct ? "Sheet checks out." : "Recheck the sheet."}
                    </strong>
                    <p className="text-slate-400/72 mt-1 text-[12px] leading-5">
                      {activeCase.explanation}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DrawingPlate({
  representation,
}: {
  representation: ArchitectureAssessmentCase["representation"];
}) {
  if (representation === "plan") {
    return (
      <Plate icon={Ruler} label="Plan · studio footprint">
        <div className="relative aspect-[4/3] border border-sky-100/[0.18] bg-sky-100/[0.025]">
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 opacity-40">
            {Array.from({ length: 12 }, (_, index) => (
              <span
                key={index}
                className="border-b border-r border-sky-100/[0.10]"
              />
            ))}
          </div>
          <span className="absolute inset-x-0 -bottom-7 text-center font-mono text-[11px] text-sky-100/55">
            8 m
          </span>
          <span className="absolute inset-y-0 -right-10 flex items-center font-mono text-[11px] text-sky-100/55">
            6 m
          </span>
          <strong className="absolute inset-0 flex items-center justify-center font-mono text-[24px] text-white/80">
            {studioArea} m²
          </strong>
        </div>
      </Plate>
    );
  }

  if (representation === "scale-bar") {
    return (
      <Plate icon={DraftingCompass} label="Drawing scale · 1:100">
        <div className="mt-8">
          <div className="flex h-10 items-stretch">
            {Array.from({ length: 6 }, (_, index) => (
              <span
                key={index}
                className={`flex-1 border-y border-r border-sky-100/[0.18] ${index % 2 ? "bg-sky-100/[0.025]" : "bg-sky-100/[0.08]"}`}
              />
            ))}
          </div>
          <div className="mt-3 flex justify-between font-mono text-[11px] text-slate-500">
            <span>0</span>
            <span>72 mm on sheet</span>
          </div>
          <div className="mt-7 rounded-[14px] border border-amber-100/[0.12] bg-amber-100/[0.035] p-4 text-center font-mono text-[18px] text-amber-100/75">
            {actualWallLength} m actual
          </div>
        </div>
      </Plate>
    );
  }

  if (representation === "section") {
    return (
      <Plate icon={Accessibility} label="Section · simplified ramp ratio">
        <svg viewBox="0 0 360 220" className="w-full" aria-hidden="true">
          <path
            d="M40 174 H322 L322 78"
            fill="none"
            stroke="rgba(186,230,253,0.18)"
          />
          <path
            d="M48 174 L322 78"
            fill="none"
            stroke="rgba(251,191,36,0.55)"
            strokeWidth="3"
          />
          <path
            d="M322 174 V78"
            stroke="rgba(244,114,182,0.35)"
            strokeDasharray="5 6"
          />
          <text
            x="176"
            y="202"
            fill="rgba(186,230,253,0.52)"
            fontSize="12"
            textAnchor="middle"
          >
            RUN {rampRun} m
          </text>
          <text
            x="338"
            y="132"
            fill="rgba(244,114,182,0.56)"
            fontSize="12"
            transform="rotate(90 338 132)"
            textAnchor="middle"
          >
            RISE 0.75 m
          </text>
        </svg>
        <p className="mt-1 text-[12px] leading-5 text-slate-500">
          Ratio arithmetic only. Real compliance requires the complete
          applicable standard and local review.
        </p>
      </Plate>
    );
  }

  return (
    <Plate icon={Layers3} label="Coordination overlay · entry condition">
      <div className="relative h-[260px] overflow-hidden border border-white/[0.08] bg-black/15">
        <div className="absolute inset-6 border border-sky-100/[0.18]" />
        <div className="absolute bottom-6 left-[22%] top-6 w-14 bg-violet-300/[0.07] ring-1 ring-violet-200/25" />
        <div className="absolute bottom-[28%] left-6 right-6 h-16 -skew-y-6 bg-amber-200/[0.07] ring-1 ring-amber-200/25" />
        <div className="absolute bottom-6 left-[28%] top-6 border-l-2 border-rose-300/55" />
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
          <LayerTag label="structure" rgb="192,132,252" />
          <LayerTag label="route" rgb="251,191,36" />
          <LayerTag label="conflict" rgb="244,114,182" />
        </div>
      </div>
    </Plate>
  );
}

function Plate({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-[#03101a]/72 self-start rounded-[22px] border border-sky-100/[0.09] p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-500">
        <Icon size={13} aria-hidden="true" /> {label}
      </div>
      {children}
    </div>
  );
}

function LayerTag({ label, rgb }: { label: string; rgb: string }) {
  return (
    <span
      className="rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.06em]"
      style={{
        color: `rgba(${rgb},0.72)`,
        borderColor: `rgba(${rgb},0.22)`,
        background: `rgba(${rgb},0.04)`,
      }}
    >
      {label}
    </span>
  );
}
