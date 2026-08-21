"use client";

import { useState } from "react";
import {
  CheckCircle2,
  ClipboardCheck,
  ReceiptText,
  RotateCcw,
  XCircle,
} from "lucide-react";
import {
  ECONOMICS_EVIDENCE_CASES,
  isEconomicsEvidenceAnswerCorrect,
  type EconomicsEvidenceCaseId,
} from "./economicsModel";

type Answers = Partial<Record<EconomicsEvidenceCaseId, string>>;
type EvidenceVisual = (typeof ECONOMICS_EVIDENCE_CASES)[number]["visual"];

export default function EconomicsEvidenceLab() {
  const [activeId, setActiveId] = useState<EconomicsEvidenceCaseId>(
    ECONOMICS_EVIDENCE_CASES[0].id
  );
  const [answers, setAnswers] = useState<Answers>({});
  const active =
    ECONOMICS_EVIDENCE_CASES.find((item) => item.id === activeId) ??
    ECONOMICS_EVIDENCE_CASES[0];
  const selectedOptionId = answers[active.id];
  const answered = selectedOptionId !== undefined;
  const correct = answered
    ? isEconomicsEvidenceAnswerCorrect(active.id, selectedOptionId)
    : false;
  const correctCount = ECONOMICS_EVIDENCE_CASES.filter((item) => {
    const answer = answers[item.id];
    return answer && isEconomicsEvidenceAnswerCorrect(item.id, answer);
  }).length;

  function reset() {
    setAnswers({});
    setActiveId(ECONOMICS_EVIDENCE_CASES[0].id);
  }

  return (
    <section
      data-assessment="economics-claim-ledger"
      className="bg-[#030c08]/72 overflow-hidden rounded-[30px] border border-emerald-100/[0.13] shadow-[0_34px_120px_rgba(0,0,0,0.30)] backdrop-blur-2xl"
    >
      <div className="grid gap-5 border-b border-white/[0.07] p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-200/65">
            <ClipboardCheck size={14} aria-hidden="true" /> Check · calculate,
            model, measure, identify
          </div>
          <h2 className="mt-3 max-w-5xl text-[clamp(1.9rem,3.6vw,3.35rem)] font-semibold leading-[0.96] tracking-[-0.052em] text-white">
            Keep every economic conclusion inside the ledger that produced it.
          </h2>
          <p className="mt-4 max-w-4xl text-[15px] leading-7 text-slate-400">
            Balance an accounting identity, read a two-curve model, inspect a
            price measure, and distinguish association from causal evidence.
            Each task uses a different kind of economic reasoning.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[11px] text-emerald-100/55">
            {correctCount}/{ECONOMICS_EVIDENCE_CASES.length} claims cleared
          </span>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.10] bg-black/20 px-4 py-2.5 text-[12px] font-semibold text-slate-300 transition hover:border-emerald-100/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200/60"
          >
            <RotateCcw size={13} aria-hidden="true" /> Reset ledger
          </button>
        </div>
      </div>

      <div className="grid xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
        <div className="border-b border-white/[0.07] p-4 sm:p-6 xl:border-b-0 xl:border-r">
          <EvidenceLedger visual={active.visual} evidence={active.evidence} />

          <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
            {ECONOMICS_EVIDENCE_CASES.map((item, index) => {
              const itemAnswer = answers[item.id];
              const itemCorrect = itemAnswer
                ? isEconomicsEvidenceAnswerCorrect(item.id, itemAnswer)
                : undefined;
              const selected = item.id === active.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveId(item.id)}
                  className={`grid min-h-[70px] grid-cols-[38px_minmax(0,1fr)] items-center gap-3 rounded-[16px] border px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200/60 ${
                    selected
                      ? "border-emerald-200/28 bg-emerald-300/[0.06]"
                      : "border-white/[0.06] bg-black/[0.05] hover:border-white/[0.14]"
                  }`}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-black/20 font-mono text-[11px] text-slate-500">
                    {itemCorrect === true ? (
                      <CheckCircle2
                        size={16}
                        className="text-emerald-300"
                        aria-label="Correct"
                      />
                    ) : itemCorrect === false ? (
                      <XCircle
                        size={16}
                        className="text-rose-300"
                        aria-label="Try again"
                      />
                    ) : (
                      String(index + 1).padStart(2, "0")
                    )}
                  </span>
                  <span>
                    <span className="block text-[13px] font-semibold text-white/85">
                      {item.label}
                    </span>
                    <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.07em] text-slate-600">
                      {item.eyebrow}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-5 sm:p-7 xl:p-9">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-100/60">
            <ReceiptText size={14} aria-hidden="true" /> Strongest supported
            entry
          </div>
          <h3 className="mt-4 max-w-4xl text-[clamp(1.35rem,2.3vw,1.95rem)] font-semibold leading-[1.2] tracking-[-0.035em] text-white">
            {active.prompt}
          </h3>

          <div
            className="mt-7 grid gap-3"
            role="group"
            aria-label={active.prompt}
          >
            {active.options.map((option) => {
              const selected = option.id === selectedOptionId;
              const optionCorrect = isEconomicsEvidenceAnswerCorrect(
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
                  ? "border-amber-200/36 bg-amber-300/[0.07]"
                  : "border-white/[0.08] bg-black/[0.08] hover:border-amber-100/24";

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
                  className={`rounded-[18px] border px-4 py-4 text-left text-[14px] leading-6 text-slate-300 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60 ${stateClass}`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <div
            className={`mt-6 min-h-[112px] border-l-2 px-4 py-3 ${
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
                  ? "The conclusion matches the evidence boundary."
                  : "The conclusion exceeds the supplied evidence."
                : "Choose an entry, then inspect which reasoning system produced it."}
            </strong>
            <p className="mt-2 max-w-4xl text-[13px] leading-6 text-slate-400">
              {answered
                ? correct
                  ? active.success
                  : active.correction
                : "Ask whether the task is an identity, a model calculation, an empirical measurement, or a causal estimate. Those labels determine what the result can mean."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function EvidenceLedger({
  visual,
  evidence,
}: {
  visual: EvidenceVisual;
  evidence: string;
}) {
  return (
    <div className="bg-[#020805]/84 overflow-hidden rounded-[22px] border border-emerald-100/[0.10]">
      <div className="relative min-h-[285px] overflow-hidden p-5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(110,231,183,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(110,231,183,0.035)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="relative flex min-h-[245px] items-center justify-center">
          {visual === "ledger" ? <GdpLedger /> : null}
          {visual === "curves" ? <CurveLedger /> : null}
          {visual === "basket" ? <BasketLedger /> : null}
          {visual === "comparison" ? <ComparisonLedger /> : null}
        </div>
      </div>
      <div className="border-t border-white/[0.07] px-4 py-4">
        <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-emerald-100/50">
          Evidence on file
        </div>
        <p className="mt-2 text-[13px] leading-6 text-slate-300/75">
          {evidence}
        </p>
      </div>
    </div>
  );
}

function GdpLedger() {
  const rows = [
    ["Consumption · C", "+500"],
    ["Investment · I", "+120"],
    ["Government · G", "+160"],
    ["Exports · X", "+90"],
    ["Imports · M", "−110"],
  ];
  return (
    <div className="w-full max-w-sm rotate-[-1deg] border border-emerald-100/15 bg-[#07110c] p-5 shadow-2xl">
      <div className="flex justify-between border-b border-dashed border-white/15 pb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-emerald-100/55">
        <span>Domestic output</span>
        <span>period 01</span>
      </div>
      <div className="py-3">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex justify-between py-1.5 text-[13px] text-slate-400"
          >
            <span>{label}</span>
            <strong className="font-mono text-slate-200">{value}</strong>
          </div>
        ))}
      </div>
      <div className="flex justify-between border-t border-double border-white/20 pt-3 text-[15px] font-semibold text-white">
        <span>GDP</span>
        <span className="font-mono text-amber-200">?</span>
      </div>
    </div>
  );
}

function CurveLedger() {
  return (
    <svg
      viewBox="0 0 440 260"
      className="w-full max-w-lg"
      role="img"
      aria-label="Demand and supply both shift right, raising quantity while price stays constant"
    >
      <path d="M48 24V222H414" fill="none" stroke="rgba(203,213,225,0.34)" />
      <path
        d="M76 50L350 210M112 50L386 210"
        fill="none"
        stroke="rgba(52,211,153,0.55)"
        strokeWidth="3"
      />
      <path
        d="M76 210L350 50M112 210L386 50"
        fill="none"
        stroke="rgba(96,165,250,0.55)"
        strokeWidth="3"
      />
      <path
        d="M213 130H249M249 130V222"
        fill="none"
        stroke="rgba(251,191,36,0.48)"
        strokeDasharray="5 6"
      />
      <circle cx="213" cy="130" r="6" fill="rgba(148,163,184,0.65)" />
      <circle cx="249" cy="130" r="7" fill="rgba(251,191,36,0.95)" />
      <text x="201" y="116" fill="rgba(203,213,225,0.60)" fontSize="12">
        Q 40
      </text>
      <text x="253" y="116" fill="rgba(253,230,138,0.78)" fontSize="12">
        Q 50
      </text>
      <text x="58" y="124" fill="rgba(253,230,138,0.68)" fontSize="12">
        P 50
      </text>
    </svg>
  );
}

function BasketLedger() {
  const items = ["rent", "food", "fuel +18%", "care", "clothing", "transit"];
  return (
    <div className="grid w-full max-w-md grid-cols-3 gap-2">
      {items.map((item) => (
        <div
          key={item}
          className={`flex min-h-[72px] items-center justify-center border px-2 text-center font-mono text-[12px] uppercase ${item.includes("18") ? "border-amber-200/35 bg-amber-300/[0.08] text-amber-100" : "border-white/10 bg-white/[0.025] text-slate-500"}`}
        >
          {item}
        </div>
      ))}
      <div className="col-span-3 border-t border-dashed border-white/15 pt-3 text-center text-[13px] text-slate-400">
        one changed item ≠ a complete price index
      </div>
    </div>
  );
}

function ComparisonLedger() {
  return (
    <div className="w-full max-w-md">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <RegionCard
          label="Region A"
          wage="higher wage"
          jobs="higher employment"
        />
        <span className="font-mono text-[18px] text-slate-600">≠</span>
        <RegionCard
          label="Region B"
          wage="lower wage"
          jobs="lower employment"
        />
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2 text-center font-mono text-[11px] uppercase text-violet-200/60">
        <span className="border border-violet-200/10 px-2 py-2">
          industry mix
        </span>
        <span className="border border-violet-200/10 px-2 py-2">growth</span>
        <span className="border border-violet-200/10 px-2 py-2">timing</span>
      </div>
      <p className="mt-4 text-center text-[13px] text-slate-400">
        association needs a comparison design
      </p>
    </div>
  );
}

function RegionCard({
  label,
  wage,
  jobs,
}: {
  label: string;
  wage: string;
  jobs: string;
}) {
  return (
    <div className="border border-white/10 bg-black/20 p-4 text-center">
      <strong className="text-[14px] text-white">{label}</strong>
      <span className="mt-3 block text-[12px] text-emerald-200/65">{wage}</span>
      <span className="mt-1 block text-[12px] text-blue-200/65">{jobs}</span>
    </div>
  );
}
