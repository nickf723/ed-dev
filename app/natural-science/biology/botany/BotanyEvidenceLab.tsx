"use client";

import { useState } from "react";
import {
  CheckCircle2,
  CircleDotDashed,
  FlaskConical,
  RotateCcw,
  XCircle,
} from "lucide-react";
import {
  BOTANY_EVIDENCE_CASES,
  calculateStomatalExchange,
  isBotanyEvidenceAnswerCorrect,
  type BotanyEvidenceCaseId,
} from "./botanyModel";

type Answers = Partial<Record<BotanyEvidenceCaseId, string>>;

export default function BotanyEvidenceLab() {
  const [activeId, setActiveId] = useState<BotanyEvidenceCaseId>(
    BOTANY_EVIDENCE_CASES[0].id
  );
  const [answers, setAnswers] = useState<Answers>({});
  const active =
    BOTANY_EVIDENCE_CASES.find((item) => item.id === activeId) ??
    BOTANY_EVIDENCE_CASES[0];
  const selectedOptionId = answers[active.id];
  const answered = selectedOptionId !== undefined;
  const correct = answered
    ? isBotanyEvidenceAnswerCorrect(active.id, selectedOptionId)
    : false;
  const correctCount = BOTANY_EVIDENCE_CASES.filter((item) => {
    const answer = answers[item.id];
    return answer && isBotanyEvidenceAnswerCorrect(item.id, answer);
  }).length;

  function reset() {
    setAnswers({});
    setActiveId(BOTANY_EVIDENCE_CASES[0].id);
  }

  return (
    <section className="overflow-hidden rounded-[30px] border border-lime-100/[0.12] bg-[#031108]/70 backdrop-blur-2xl">
      <div className="grid gap-4 border-b border-white/[0.07] p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-lime-100/60">
            <FlaskConical size={14} aria-hidden="true" /> Check · model,
            mechanism, and evidence
          </div>
          <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.6vw,3.35rem)] font-semibold leading-[0.96] tracking-[-0.052em] text-white">
            Calculate what the model says, then stop where its evidence stops.
          </h2>
          <p className="mt-3 max-w-4xl text-[15px] leading-7 text-slate-400">
            The first file is rote practice with the displayed equation. The
            remaining files test whether you can separate a useful mechanism
            from a universal claim, a shortcut, or a human-made category.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-lime-100/55">
            {correctCount}/{BOTANY_EVIDENCE_CASES.length} supported
          </span>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.10] bg-black/20 px-4 py-2 text-[12px] font-semibold text-slate-300 transition hover:border-lime-100/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-200/60"
          >
            <RotateCcw size={13} aria-hidden="true" /> Reset files
          </button>
        </div>
      </div>

      <div className="grid xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
        <div className="border-b border-white/[0.07] p-4 sm:p-5 xl:border-b-0 xl:border-r">
          <EvidenceTray activeId={active.id} observation={active.observation} />

          <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
            {BOTANY_EVIDENCE_CASES.map((item, index) => {
              const itemAnswer = answers[item.id];
              const itemCorrect = itemAnswer
                ? isBotanyEvidenceAnswerCorrect(item.id, itemAnswer)
                : undefined;
              const selected = item.id === active.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveId(item.id)}
                  className={`grid min-h-[64px] grid-cols-[34px_minmax(0,1fr)] items-center gap-3 rounded-[16px] border px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-200/60 ${
                    selected
                      ? "border-lime-200/30 bg-lime-300/[0.06]"
                      : "border-white/[0.06] bg-black/[0.05] hover:border-white/[0.14]"
                  }`}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-black/20 font-mono text-[10px] text-slate-500">
                    {itemCorrect === true ? (
                      <CheckCircle2
                        size={15}
                        className="text-lime-300"
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
            answer
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
              const optionCorrect = isBotanyEvidenceAnswerCorrect(
                active.id,
                option.id
              );
              const stateClass = answered
                ? optionCorrect
                  ? "border-lime-300/38 bg-lime-300/[0.07]"
                  : selected
                    ? "border-rose-300/38 bg-rose-300/[0.07]"
                    : "border-white/[0.06] bg-black/[0.05] opacity-[0.62]"
                : selected
                  ? "border-emerald-200/36 bg-emerald-300/[0.07]"
                  : "border-white/[0.08] bg-black/[0.08] hover:border-emerald-100/24";

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
                  className={`rounded-[18px] border px-4 py-4 text-left text-[14px] leading-6 text-slate-300 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200/60 ${stateClass}`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <div
            className={`mt-5 min-h-[104px] border-l-2 px-4 py-3 ${
              answered
                ? correct
                  ? "border-lime-300/50 bg-lime-300/[0.035]"
                  : "border-rose-300/50 bg-rose-300/[0.035]"
                : "border-white/[0.10] bg-black/[0.06]"
            }`}
            aria-live="polite"
          >
            <strong className="text-[13px] text-white">
              {answered
                ? correct
                  ? "That answer fits the evidence boundary."
                  : "That answer outruns or misreads the evidence."
                : "Choose an answer, then inspect the boundary."}
            </strong>
            <p className="mt-2 max-w-4xl text-[13px] leading-6 text-slate-400">
              {answered
                ? correct
                  ? active.success
                  : active.correction
                : "Separate the model's defined quantities from measured biological rates, and separate useful observations from evolutionary classification."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function EvidenceTray({
  activeId,
  observation,
}: {
  activeId: BotanyEvidenceCaseId;
  observation: string;
}) {
  const humid = calculateStomatalExchange(50, "humid");
  const dry = calculateStomatalExchange(50, "dry");

  return (
    <div className="overflow-hidden rounded-[22px] border border-emerald-100/[0.10] bg-[#020904]/80">
      <div className="relative min-h-[250px] p-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_25%,rgba(74,222,128,0.10),transparent_28%),linear-gradient(rgba(134,239,172,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(134,239,172,0.035)_1px,transparent_1px)] bg-[size:auto,32px_32px,32px_32px]" />
        <div className="relative flex min-h-[210px] items-center justify-center">
          {activeId === "dryness-calculation" ? (
            <div className="grid w-full max-w-md grid-cols-[1fr_auto_1fr] items-center gap-3">
              <MetricLeaf label="humid" value={humid.waterVaporFlux} />
              <span className="font-mono text-[13px] text-slate-600">vs</span>
              <MetricLeaf label="dry" value={dry.waterVaporFlux} hot />
            </div>
          ) : null}
          {activeId === "tradeoff" ? <StomaSketch /> : null}
          {activeId === "source-sink" ? <TransportSketch /> : null}
          {activeId === "classification" ? <LineageSketch /> : null}
        </div>
      </div>
      <div className="border-t border-white/[0.07] px-4 py-4">
        <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.10em] text-emerald-100/50">
          Evidence file
        </div>
        <p className="mt-2 text-[13px] leading-6 text-slate-300/75">
          {observation}
        </p>
      </div>
    </div>
  );
}

function MetricLeaf({
  label,
  value,
  hot = false,
}: {
  label: string;
  value: number;
  hot?: boolean;
}) {
  return (
    <div
      className={`rounded-[48%_16%_48%_16%] border p-5 text-center ${
        hot
          ? "border-amber-200/25 bg-amber-300/[0.07]"
          : "border-cyan-200/25 bg-cyan-300/[0.06]"
      }`}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-slate-500">
        {label} · aperture 50
      </span>
      <strong className="mt-2 block text-[34px] text-white">{value}%</strong>
      <span className="text-[10px] text-slate-500">water-vapor indicator</span>
    </div>
  );
}

function StomaSketch() {
  return (
    <svg viewBox="0 0 420 220" className="w-full max-w-md" role="img">
      <title>
        Open stomatal pore with carbon dioxide entering and water vapor leaving
      </title>
      <ellipse
        cx="165"
        cy="110"
        rx="66"
        ry="90"
        fill="rgba(74,222,128,.13)"
        stroke="rgba(134,239,172,.45)"
        strokeWidth="3"
        transform="rotate(12 165 110)"
      />
      <ellipse
        cx="255"
        cy="110"
        rx="66"
        ry="90"
        fill="rgba(74,222,128,.13)"
        stroke="rgba(134,239,172,.45)"
        strokeWidth="3"
        transform="rotate(-12 255 110)"
      />
      <ellipse
        cx="210"
        cy="110"
        rx="21"
        ry="73"
        fill="#010503"
        stroke="rgba(255,255,255,.13)"
      />
      <path d="M210 0V49" stroke="rgba(103,232,249,.8)" strokeWidth="6" />
      <path
        d="m202 40 8 12 8-12"
        fill="none"
        stroke="rgba(103,232,249,.8)"
        strokeWidth="3"
      />
      <path
        d="M176 168 115 217M244 168l61 49"
        stroke="rgba(125,211,252,.72)"
        strokeWidth="6"
      />
      <text x="226" y="24" fill="rgba(165,243,252,.72)" fontSize="13">
        CO₂
      </text>
      <text x="314" y="206" fill="rgba(186,230,253,.68)" fontSize="13">
        H₂O
      </text>
    </svg>
  );
}

function TransportSketch() {
  return (
    <div className="grid w-full max-w-lg grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-center">
      <PlantNode label="mature leaf" role="source" accent="lime" />
      <span className="text-lime-200/60">→</span>
      <PlantNode label="phloem" role="transport" accent="pink" />
      <span className="text-lime-200/60">↗ ↘</span>
      <div className="space-y-2">
        <PlantNode label="shoot tip" role="sink" accent="cyan" compact />
        <PlantNode label="root" role="sink" accent="amber" compact />
      </div>
    </div>
  );
}

function PlantNode({
  label,
  role,
  accent,
  compact = false,
}: {
  label: string;
  role: string;
  accent: "lime" | "pink" | "cyan" | "amber";
  compact?: boolean;
}) {
  const colors = {
    lime: "border-lime-200/25 bg-lime-300/[0.06]",
    pink: "border-pink-200/25 bg-pink-300/[0.06]",
    cyan: "border-cyan-200/25 bg-cyan-300/[0.06]",
    amber: "border-amber-200/25 bg-amber-300/[0.06]",
  };
  return (
    <div className={`border ${colors[accent]} ${compact ? "p-2" : "p-4"}`}>
      <strong className="block text-[12px] text-white/85">{label}</strong>
      <span className="mt-1 block font-mono text-[9px] uppercase text-slate-500">
        {role}
      </span>
    </div>
  );
}

function LineageSketch() {
  return (
    <div className="w-full max-w-lg font-mono text-[11px] text-slate-400">
      <div className="border-l border-emerald-200/30 pl-5">
        <div className="relative py-3 before:absolute before:-left-5 before:top-1/2 before:w-5 before:border-t before:border-emerald-200/30">
          green photosynthetic look-alike · outside lineage
        </div>
        <div className="relative border-l border-lime-200/30 py-4 pl-6 before:absolute before:-left-5 before:top-1/2 before:w-5 before:border-t before:border-emerald-200/30">
          <strong className="text-lime-100/80">plant lineage</strong>
          <div className="mt-3 space-y-2">
            <div className="border-l border-lime-200/30 pl-3">
              green photosynthetic plant
            </div>
            <div className="border-l border-lime-200/30 pl-3">
              non-green parasitic plant
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-[10px] uppercase tracking-[0.09em] text-slate-600">
        relationship beats color
      </p>
    </div>
  );
}
