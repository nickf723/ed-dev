"use client";

import { useState } from "react";
import {
  CheckCircle2,
  MapPinned,
  RotateCcw,
  XCircle,
} from "lucide-react";
import {
  EARTH_SCIENCE_EVIDENCE_CASES,
  isEarthScienceEvidenceAnswerCorrect,
  type EarthScienceEvidenceCaseId,
} from "./earthScienceModel";

type Answers = Partial<Record<EarthScienceEvidenceCaseId, string>>;

export default function EarthScienceEvidenceReview() {
  const [activeId, setActiveId] = useState<EarthScienceEvidenceCaseId>(
    EARTH_SCIENCE_EVIDENCE_CASES[0].id,
  );
  const [answers, setAnswers] = useState<Answers>({});
  const active =
    EARTH_SCIENCE_EVIDENCE_CASES.find((item) => item.id === activeId) ??
    EARTH_SCIENCE_EVIDENCE_CASES[0];
  const selectedOptionId = answers[active.id];
  const answered = selectedOptionId !== undefined;
  const correct = answered
    ? isEarthScienceEvidenceAnswerCorrect(active.id, selectedOptionId)
    : false;

  function reset() {
    setAnswers({});
    setActiveId(EARTH_SCIENCE_EVIDENCE_CASES[0].id);
  }

  return (
    <section className="overflow-hidden rounded-[30px] border border-emerald-100/[0.12] bg-[#031017]/58 backdrop-blur-2xl">
      <div className="grid gap-4 border-b border-white/[0.07] p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-emerald-100/60">
            <MapPinned size={14} aria-hidden="true" /> Check · field record
            before planet claim
          </div>
          <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.6vw,3.35rem)] font-semibold leading-[0.96] tracking-[-0.052em] text-white">
            Keep the system boundary, spatial scale, timescale, and measured
            variable attached to the conclusion.
          </h2>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.10] bg-black/20 px-4 py-2 text-[12px] font-semibold text-slate-300 transition hover:border-emerald-100/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200/60"
        >
          <RotateCcw size={13} aria-hidden="true" /> Reset files
        </button>
      </div>

      <div className="grid xl:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
        <div className="border-b border-white/[0.07] p-4 sm:p-5 xl:border-b-0 xl:border-r">
          <FieldRecord />
          <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
            {EARTH_SCIENCE_EVIDENCE_CASES.map((item, index) => {
              const itemAnswer = answers[item.id];
              const itemCorrect = itemAnswer
                ? isEarthScienceEvidenceAnswerCorrect(item.id, itemAnswer)
                : undefined;
              const selected = item.id === active.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveId(item.id)}
                  className={`grid min-h-[68px] grid-cols-[34px_minmax(0,1fr)] items-center gap-3 rounded-[16px] border px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200/60 ${
                    selected
                      ? "border-emerald-200/30 bg-emerald-300/[0.06]"
                      : "border-white/[0.06] bg-black/[0.05] hover:border-white/[0.14]"
                  }`}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-black/20 font-mono text-[10px] text-slate-500">
                    {itemCorrect === true ? (
                      <CheckCircle2
                        size={15}
                        className="text-emerald-300"
                        aria-label="Correct"
                      />
                    ) : itemCorrect === false ? (
                      <XCircle
                        size={15}
                        className="text-rose-300"
                        aria-label="Try again"
                      />
                    ) : (
                      String(index + 1).padStart(2, "0")
                    )}
                  </span>
                  <span>
                    <span className="block text-[12px] font-semibold text-white/85">
                      {item.label}
                    </span>
                    <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.08em] text-slate-600">
                      {item.eyebrow}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-5 sm:p-6 xl:p-8">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.13em] text-sky-100/55">
            Recorded observation
          </div>
          <p className="mt-2 border-l border-sky-200/20 pl-4 text-[13px] leading-6 text-slate-300/75">
            {active.observation}
          </p>
          <h3 className="mt-6 max-w-4xl text-[clamp(1.3rem,2.25vw,1.85rem)] font-semibold leading-[1.22] tracking-[-0.035em] text-white">
            {active.prompt}
          </h3>

          <div className="mt-6 grid gap-3" role="group" aria-label={active.prompt}>
            {active.options.map((option) => {
              const selected = option.id === selectedOptionId;
              const optionCorrect = isEarthScienceEvidenceAnswerCorrect(
                active.id,
                option.id,
              );
              const stateClass = answered
                ? optionCorrect
                  ? "border-emerald-300/38 bg-emerald-300/[0.07]"
                  : selected
                    ? "border-rose-300/38 bg-rose-300/[0.07]"
                    : "border-white/[0.06] bg-black/[0.05] opacity-[0.62]"
                : selected
                  ? "border-sky-200/36 bg-sky-300/[0.07]"
                  : "border-white/[0.08] bg-black/[0.08] hover:border-sky-100/24";

              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() =>
                    setAnswers((current) => ({
                      ...current,
                      [active.id]: option.id,
                    }))
                  }
                  className={`rounded-[18px] border px-4 py-4 text-left text-[14px] leading-6 text-slate-300 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200/60 ${stateClass}`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <div
            className={`mt-5 min-h-[102px] border-l-2 px-4 py-3 ${
              answered
                ? correct
                  ? "border-emerald-300/50 bg-emerald-300/[0.035]"
                  : "border-rose-300/50 bg-rose-300/[0.035]"
                : "border-white/[0.10] bg-black/[0.06]"
            }`}
            aria-live="polite"
          >
            <strong className="text-[13px] text-white">
              {answered
                ? correct
                  ? "The claim fits the field record."
                  : "That claim outruns the field record."
                : "Choose a claim, then inspect its scale and boundary."}
            </strong>
            <p className="mt-2 max-w-4xl text-[13px] leading-6 text-slate-400">
              {answered
                ? correct
                  ? active.success
                  : active.correction
                : "Ask what crossed the system boundary, where and when the observation was made, and which alternatives remain unresolved."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FieldRecord() {
  return (
    <div className="overflow-hidden rounded-[22px] border border-sky-100/[0.11] bg-[#020b10]/78">
      <svg
        viewBox="0 0 520 270"
        role="img"
        aria-labelledby="earth-science-field-record-title"
        className="block min-h-[230px] w-full"
      >
        <title id="earth-science-field-record-title">
          Schematic ridge-to-stream field transect with atmosphere, rock layers,
          groundwater, runoff, and monitoring stations
        </title>
        <rect width="520" height="270" fill="#020b10" />
        <path
          d="M0 145L72 122L136 72L196 132L252 110L322 152L382 126L438 158L520 146V270H0Z"
          fill="rgba(74,222,128,0.08)"
          stroke="rgba(167,243,208,0.34)"
        />
        <path
          d="M0 188C100 164 180 212 274 180S424 198 520 176"
          fill="none"
          stroke="rgba(251,146,60,0.22)"
        />
        <path
          d="M138 78C176 106 198 152 230 172C276 200 334 180 376 152"
          fill="none"
          stroke="rgba(56,189,248,0.54)"
          strokeWidth="6"
        />
        <path
          d="M192 190C258 222 334 204 390 166"
          fill="none"
          stroke="rgba(96,165,250,0.28)"
          strokeDasharray="7 9"
        />
        <path
          d="M176 32C198 14 232 20 242 44C278 34 304 58 294 82H170C150 70 154 46 176 32Z"
          fill="rgba(186,230,253,0.09)"
          stroke="rgba(186,230,253,0.24)"
        />
        {[192, 224, 256].map((x) => (
          <path
            key={x}
            d={`M${x} 88l-8 30`}
            stroke="rgba(125,211,252,0.44)"
            strokeWidth="2"
          />
        ))}
        {[
          [92, 124, "G-01"],
          [234, 170, "H-02"],
          [412, 144, "M-03"],
        ].map(([x, y, label]) => (
          <g key={label} transform={`translate(${x} ${y})`}>
            <circle r="9" fill="#020b10" stroke="rgba(253,230,138,0.60)" />
            <circle r="2" fill="#fde68a" />
            <text x="14" y="4" fill="rgba(254,243,199,0.58)" fontSize="10">
              {label}
            </text>
          </g>
        ))}
      </svg>
      <div className="border-t border-white/[0.07] px-4 py-4">
        <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.10em] text-sky-100/50">
          Shared observation surface
        </div>
        <p className="mt-2 text-[13px] leading-6 text-slate-400">
          The same transect can hold atmospheric, hydrologic, geomorphic,
          geologic, material, ecological, and climate evidence. The field label
          tells us what was measured—not which single field owns the place.
        </p>
      </div>
    </div>
  );
}
