"use client";

import { useState } from "react";
import {
  CheckCircle2,
  CircleDotDashed,
  MapPinned,
  RotateCcw,
  XCircle,
} from "lucide-react";
import {
  GEOGRAPHY_EVIDENCE_CASES,
  isGeographyEvidenceAnswerCorrect,
  type GeographyEvidenceCaseId,
} from "./geographyModel";

type Answers = Partial<Record<GeographyEvidenceCaseId, string>>;
type EvidenceVisual = (typeof GEOGRAPHY_EVIDENCE_CASES)[number]["visual"];

export default function GeographyEvidenceLab() {
  const [activeId, setActiveId] = useState<GeographyEvidenceCaseId>(
    GEOGRAPHY_EVIDENCE_CASES[0].id
  );
  const [answers, setAnswers] = useState<Answers>({});
  const active =
    GEOGRAPHY_EVIDENCE_CASES.find((item) => item.id === activeId) ??
    GEOGRAPHY_EVIDENCE_CASES[0];
  const selectedOptionId = answers[active.id];
  const answered = selectedOptionId !== undefined;
  const correct = answered
    ? isGeographyEvidenceAnswerCorrect(active.id, selectedOptionId)
    : false;

  function reset() {
    setAnswers({});
    setActiveId(GEOGRAPHY_EVIDENCE_CASES[0].id);
  }

  return (
    <section className="overflow-hidden rounded-[30px] border border-emerald-100/[0.12] bg-[#03101f]/55 backdrop-blur-2xl">
      <div className="grid gap-4 border-b border-white/[0.07] p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-emerald-100/60">
            <MapPinned size={14} aria-hidden="true" /> Check · map evidence
            versus claim
          </div>
          <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.6vw,3.35rem)] font-semibold leading-[0.96] tracking-[-0.052em] text-white">
            Make the strongest claim the spatial evidence can actually carry.
          </h2>
          <p className="mt-3 max-w-4xl text-[15px] leading-7 text-slate-400">
            Maps make patterns visible, but a pattern is not automatically a
            rate, a local description, or a causal mechanism. Inspect each layer
            file before choosing an inference.
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.10] bg-black/20 px-4 py-2 text-[12px] font-semibold text-slate-300 transition hover:border-emerald-100/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200/60"
        >
          <RotateCcw size={13} aria-hidden="true" /> Reset files
        </button>
      </div>

      <div className="grid xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
        <div className="border-b border-white/[0.07] p-4 sm:p-5 xl:border-b-0 xl:border-r">
          <div className="overflow-hidden rounded-[22px] border border-sky-100/[0.10] bg-[#020817]/75">
            <EvidenceMap visual={active.visual} />
            <div className="border-t border-white/[0.07] px-4 py-4">
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.10em] text-sky-100/50">
                Recorded observation
              </div>
              <p className="mt-2 text-[13px] leading-6 text-slate-300/75">
                {active.observation}
              </p>
            </div>
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-3 xl:grid-cols-1">
            {GEOGRAPHY_EVIDENCE_CASES.map((item, index) => {
              const itemAnswer = answers[item.id];
              const itemCorrect = itemAnswer
                ? isGeographyEvidenceAnswerCorrect(item.id, itemAnswer)
                : undefined;
              const selected = item.id === active.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveId(item.id)}
                  className={`grid min-h-[62px] grid-cols-[32px_minmax(0,1fr)] items-center gap-3 rounded-[16px] border px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200/60 ${
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
                    <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.08em] text-slate-600">
                      {item.eyebrow}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-5 sm:p-6 xl:p-8">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-amber-100/55">
            <CircleDotDashed size={13} aria-hidden="true" /> Strongest supported
            claim
          </div>
          <h3 className="mt-3 max-w-4xl text-[clamp(1.3rem,2.25vw,1.85rem)] font-semibold leading-[1.22] tracking-[-0.035em] text-white">
            {active.prompt}
          </h3>

          <div
            className="mt-6 grid gap-3"
            role="group"
            aria-label={active.prompt}
          >
            {active.options.map((option) => {
              const selected = option.id === selectedOptionId;
              const optionCorrect = isGeographyEvidenceAnswerCorrect(
                active.id,
                option.id
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
            className={`mt-5 min-h-[96px] border-l-2 px-4 py-3 ${
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
                  ? "That claim matches the evidence boundary."
                  : "That claim outruns the layer file."
                : "Choose a claim, then compare it with the evidence boundary."}
            </strong>
            <p className="mt-2 max-w-4xl text-[13px] leading-6 text-slate-400">
              {answered
                ? correct
                  ? active.success
                  : active.correction
                : "Ask whether the evidence shows a count or rate, an aggregate or local pattern, and an association or mechanism."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function EvidenceMap({ visual }: { visual: EvidenceVisual }) {
  return (
    <svg
      viewBox="0 0 520 300"
      role="img"
      aria-labelledby={`geography-evidence-${visual}`}
      className="block min-h-[250px] w-full"
    >
      <title id={`geography-evidence-${visual}`}>
        {visual === "counts"
          ? "Two-zone crash count and bicycle trip exposure diagram"
          : visual === "scale"
            ? "Citywide average over a grid of varied neighborhood values"
            : "Transit corridor with stations and nearby retail growth"}
      </title>
      <rect width="520" height="300" fill="#020817" />
      <g stroke="rgba(125,211,252,0.08)" strokeWidth="1">
        {Array.from({ length: 12 }, (_, index) => (
          <path key={`v-${index}`} d={`M${index * 48} 0V300`} />
        ))}
        {Array.from({ length: 8 }, (_, index) => (
          <path key={`h-${index}`} d={`M0 ${index * 44}H520`} />
        ))}
      </g>
      {visual === "counts" ? <CountsMap /> : null}
      {visual === "scale" ? <ScaleMap /> : null}
      {visual === "association" ? <AssociationMap /> : null}
    </svg>
  );
}

function CountsMap() {
  return (
    <g>
      <path
        d="M38 52L248 34L261 267L52 250Z"
        fill="rgba(56,189,248,0.12)"
        stroke="rgba(125,211,252,0.42)"
      />
      <path
        d="M270 34L482 57L470 250L261 267Z"
        fill="rgba(167,139,250,0.10)"
        stroke="rgba(196,181,253,0.34)"
      />
      <text x="72" y="92" fill="rgba(186,230,253,0.72)" fontSize="12">
        CENTRAL ZONE
      </text>
      <text x="72" y="148" fill="white" fontSize="38" fontWeight="700">
        120
      </text>
      <text x="72" y="174" fill="rgba(148,163,184,0.74)" fontSize="13">
        crashes · 5× trips
      </text>
      <text x="307" y="92" fill="rgba(221,214,254,0.68)" fontSize="12">
        OUTER ZONE
      </text>
      <text x="307" y="148" fill="white" fontSize="38" fontWeight="700">
        60
      </text>
      <text x="307" y="174" fill="rgba(148,163,184,0.74)" fontSize="13">
        crashes · 1× trips
      </text>
    </g>
  );
}

function ScaleMap() {
  const values = [8, 14, 45, 61, 11, 24, 52, 47, 5, 19, 33, 56, 9, 22, 28, 34];
  return (
    <g>
      {values.map((value, index) => {
        const column = index % 4;
        const row = Math.floor(index / 4);
        return (
          <g key={`${index}-${value}`}>
            <rect
              x={54 + column * 94}
              y={40 + row * 54}
              width="88"
              height="48"
              fill={`rgba(74,222,128,${0.04 + value / 180})`}
              stroke="rgba(134,239,172,0.18)"
            />
            <text
              x={98 + column * 94}
              y={69 + row * 54}
              textAnchor="middle"
              fill="rgba(240,253,244,0.76)"
              fontSize="12"
            >
              {value}%
            </text>
          </g>
        );
      })}
      <rect
        x="338"
        y="212"
        width="136"
        height="58"
        rx="8"
        fill="rgba(2,8,23,0.86)"
        stroke="rgba(125,211,252,0.24)"
      />
      <text x="354" y="236" fill="rgba(148,163,184,0.72)" fontSize="10">
        CITYWIDE AVERAGE
      </text>
      <text x="354" y="259" fill="white" fontSize="22" fontWeight="700">
        28%
      </text>
    </g>
  );
}

function AssociationMap() {
  const stations = [96, 210, 324, 438];
  const retail = [
    [74, 108],
    [121, 180],
    [186, 118],
    [238, 176],
    [302, 110],
    [350, 183],
    [414, 116],
    [462, 174],
  ];
  return (
    <g>
      <path
        d="M36 224C142 42 376 43 486 214"
        fill="none"
        stroke="rgba(56,189,248,0.54)"
        strokeWidth="8"
      />
      <path
        d="M36 224C142 42 376 43 486 214"
        fill="none"
        stroke="rgba(224,242,254,0.66)"
        strokeWidth="2"
        strokeDasharray="7 10"
      />
      {stations.map((x, index) => (
        <g key={x} transform={`translate(${x} ${index % 2 === 0 ? 143 : 102})`}>
          <circle r="13" fill="#020817" stroke="rgba(125,211,252,0.76)" />
          <circle r="4" fill="rgba(186,230,253,0.90)" />
        </g>
      ))}
      {retail.map(([x, y]) => (
        <rect
          key={`${x}-${y}`}
          x={x - 6}
          y={y - 6}
          width="12"
          height="12"
          rx="2"
          fill="rgba(251,191,36,0.64)"
          stroke="rgba(254,240,138,0.55)"
        />
      ))}
      <text x="42" y="272" fill="rgba(148,163,184,0.74)" fontSize="11">
        CYAN · TRANSIT STATIONS
      </text>
      <text x="328" y="272" fill="rgba(253,230,138,0.72)" fontSize="11">
        AMBER · RETAIL GROWTH
      </text>
    </g>
  );
}
