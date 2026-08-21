"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  RotateCcw,
  ShieldAlert,
  XCircle,
} from "lucide-react";
import {
  DATA_SCIENCE_EVIDENCE_CASES,
  isDataScienceEvidenceAnswerCorrect,
  type DataScienceEvidenceCaseId,
} from "../dataScienceModel";

type Answers = Partial<Record<DataScienceEvidenceCaseId, string>>;

export default function DataScienceEvidenceLab() {
  const [activeId, setActiveId] = useState<DataScienceEvidenceCaseId>(
    DATA_SCIENCE_EVIDENCE_CASES[0].id
  );
  const [answers, setAnswers] = useState<Answers>({});
  const active =
    DATA_SCIENCE_EVIDENCE_CASES.find((item) => item.id === activeId) ??
    DATA_SCIENCE_EVIDENCE_CASES[0];
  const selectedOptionId = answers[active.id];
  const answered = selectedOptionId !== undefined;
  const correct = answered
    ? isDataScienceEvidenceAnswerCorrect(active.id, selectedOptionId)
    : false;
  const correctCount = DATA_SCIENCE_EVIDENCE_CASES.filter((item) => {
    const answer = answers[item.id];
    return answer && isDataScienceEvidenceAnswerCorrect(item.id, answer);
  }).length;

  function reset() {
    setAnswers({});
    setActiveId(DATA_SCIENCE_EVIDENCE_CASES[0].id);
  }

  return (
    <section className="bg-[#020910]/74 overflow-hidden rounded-[30px] border border-cyan-100/[0.12] shadow-[0_34px_120px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
      <div className="grid gap-5 border-b border-white/[0.07] p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-200/65">
            <FileCheck2 size={14} aria-hidden="true" /> Check · calculate,
            isolate, qualify
          </div>
          <h2 className="mt-3 max-w-5xl text-[clamp(1.9rem,3.6vw,3.35rem)] font-semibold leading-[0.96] tracking-[-0.052em] text-white">
            Inspect the denominator, the timeline, the split, and the claim.
          </h2>
          <p className="mt-4 max-w-4xl text-[15px] leading-7 text-slate-400">
            A result is defensible only when its calculation and evidence
            boundary survive inspection. Start with exact metric arithmetic,
            then audit three common ways a persuasive score can overstate what
            the data support.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-cyan-100/55">
            {correctCount}/{DATA_SCIENCE_EVIDENCE_CASES.length} checks passed
          </span>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.10] bg-black/20 px-4 py-2.5 text-[12px] font-semibold text-slate-300 transition hover:border-cyan-100/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/60"
          >
            <RotateCcw size={13} aria-hidden="true" /> Reset audit
          </button>
        </div>
      </div>

      <div className="grid xl:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]">
        <div className="border-b border-white/[0.07] p-4 sm:p-6 xl:border-b-0 xl:border-r">
          <EvidencePanel activeId={active.id} evidence={active.evidence} />

          <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
            {DATA_SCIENCE_EVIDENCE_CASES.map((item, index) => {
              const itemAnswer = answers[item.id];
              const itemCorrect = itemAnswer
                ? isDataScienceEvidenceAnswerCorrect(item.id, itemAnswer)
                : undefined;
              const selected = item.id === active.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveId(item.id)}
                  className={`grid min-h-[70px] grid-cols-[38px_minmax(0,1fr)] items-center gap-3 rounded-[16px] border px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/60 ${
                    selected
                      ? "border-cyan-200/28 bg-cyan-300/[0.06]"
                      : "border-white/[0.06] bg-black/[0.05] hover:border-white/[0.14]"
                  }`}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-black/20 font-mono text-[10px] text-slate-500">
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
                    <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.07em] text-slate-600">
                      {item.eyebrow}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-5 sm:p-7 xl:p-9">
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-100/60">
            <ShieldAlert size={13} aria-hidden="true" /> Strongest defensible
            answer
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
              const optionCorrect = isDataScienceEvidenceAnswerCorrect(
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
                  ? "The evidence and the claim remain aligned."
                  : "The answer crosses an evidence boundary."
                : "Choose an answer, then inspect the boundary it uses."}
            </strong>
            <p className="mt-2 max-w-4xl text-[13px] leading-6 text-slate-400">
              {answered
                ? correct
                  ? active.success
                  : active.correction
                : "Check exactly what was counted, what was available at prediction time, what influenced model choice, and whether the proposed claim describes or intervenes."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function EvidencePanel({
  activeId,
  evidence,
}: {
  activeId: DataScienceEvidenceCaseId;
  evidence: string;
}) {
  return (
    <div className="bg-[#01070c]/82 overflow-hidden rounded-[22px] border border-cyan-100/[0.10]">
      <div className="relative min-h-[288px] overflow-hidden p-5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.035)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="relative flex min-h-[248px] items-center justify-center">
          {activeId === "metric-arithmetic" ? <MetricPanel /> : null}
          {activeId === "temporal-leakage" ? <TimelinePanel /> : null}
          {activeId === "test-contamination" ? <SplitPanel /> : null}
          {activeId === "causal-boundary" ? <CausalPanel /> : null}
        </div>
      </div>
      <div className="border-t border-white/[0.07] px-4 py-4">
        <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.10em] text-cyan-100/50">
          Evidence register
        </div>
        <p className="mt-2 text-[13px] leading-6 text-slate-300/75">
          {evidence}
        </p>
      </div>
    </div>
  );
}

function MetricPanel() {
  return (
    <div className="w-full max-w-md">
      <div className="grid grid-cols-[96px_1fr_1fr] overflow-hidden rounded-[16px] border border-white/[0.10] text-center">
        <div className="bg-black/20" />
        <Cell value="Predicted +" muted />
        <Cell value="Predicted −" muted />
        <Cell value="Actual +" muted />
        <Cell value="42 · TP" rgb="94,234,212" />
        <Cell value="2 · FN" rgb="248,113,113" />
        <Cell value="Actual −" muted />
        <Cell value="8 · FP" rgb="251,191,36" />
        <Cell value="48 · TN" rgb="34,211,238" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 font-mono text-[11px]">
        <span className="border-l border-cyan-200/30 px-3 py-2 text-cyan-100/70">
          accuracy · 90/100
        </span>
        <span className="border-l border-violet-200/30 px-3 py-2 text-violet-100/70">
          recall · 42/44
        </span>
      </div>
    </div>
  );
}

function Cell({
  value,
  rgb,
  muted = false,
}: {
  value: string;
  rgb?: string;
  muted?: boolean;
}) {
  return (
    <div
      className="flex min-h-[58px] items-center justify-center border-l border-t border-white/[0.07] px-2 font-mono text-[10px]"
      style={{
        color: muted ? "rgba(148,163,184,0.58)" : `rgba(${rgb},0.82)`,
        background: muted ? "rgba(0,0,0,0.14)" : `rgba(${rgb},0.055)`,
      }}
    >
      {value}
    </div>
  );
}

function TimelinePanel() {
  return (
    <div className="w-full max-w-md">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <TimelineStop label="Discharge" note="prediction now" active />
        <ArrowRight className="text-slate-600" size={20} />
        <TimelineStop
          label="Following 45 days"
          note="prescription fill recorded"
        />
      </div>
      <div className="mt-6 rounded-full border border-rose-200/20 bg-rose-300/[0.045] px-4 py-2 text-center font-mono text-[11px] uppercase tracking-[0.08em] text-rose-200/70">
        unavailable at prediction time
      </div>
    </div>
  );
}

function TimelineStop({
  label,
  note,
  active = false,
}: {
  label: string;
  note: string;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-[16px] border p-4 ${
        active
          ? "border-cyan-200/28 bg-cyan-300/[0.055]"
          : "border-rose-200/20 bg-rose-300/[0.035]"
      }`}
    >
      <strong className="block text-[13px] text-white/85">{label}</strong>
      <span className="mt-2 block font-mono text-[10px] leading-4 text-slate-500">
        {note}
      </span>
    </div>
  );
}

function SplitPanel() {
  return (
    <div className="w-full max-w-md">
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 font-mono text-[10px]">
        <SplitBlock label="train" rgb="34,211,238" />
        <ArrowRight size={16} className="text-slate-700" />
        <SplitBlock label="validate" rgb="167,139,250" />
        <ArrowRight size={16} className="text-slate-700" />
        <SplitBlock label="test" rgb="251,191,36" />
      </div>
      <svg viewBox="0 0 420 90" className="mt-3 w-full" aria-hidden="true">
        <path
          d="M366 16 C366 72 210 75 210 24"
          fill="none"
          stroke="rgba(248,113,113,0.55)"
          strokeDasharray="5 6"
        />
        <path
          d="M205 29L210 20L215 29"
          fill="none"
          stroke="rgba(248,113,113,0.55)"
        />
        <text
          x="228"
          y="67"
          fill="rgba(254,202,202,0.60)"
          fontSize="11"
          fontFamily="monospace"
        >
          repeated selection feeds test evidence back into tuning
        </text>
      </svg>
    </div>
  );
}

function SplitBlock({ label, rgb }: { label: string; rgb: string }) {
  return (
    <div
      className="flex aspect-square items-center justify-center rounded-[16px] border uppercase tracking-[0.08em]"
      style={{
        borderColor: `rgba(${rgb},0.28)`,
        background: `rgba(${rgb},0.05)`,
        color: `rgba(${rgb},0.78)`,
      }}
    >
      {label}
    </div>
  );
}

function CausalPanel() {
  return (
    <div className="relative h-[238px] w-full max-w-md">
      <CausalNode label="Tree cover" left="8%" top="42%" rgb="94,234,212" />
      <CausalNode
        label="Electricity use"
        left="66%"
        top="42%"
        rgb="251,191,36"
      />
      <CausalNode
        label="Housing + income"
        left="36%"
        top="4%"
        rgb="167,139,250"
      />
      <CausalNode label="Heat + shade" left="36%" top="76%" rgb="244,114,182" />
      <svg
        viewBox="0 0 420 238"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <path
          d="M103 120H278"
          stroke="rgba(94,234,212,0.35)"
          strokeDasharray="6 5"
        />
        <path
          d="M205 48L105 104M215 48L305 104M205 191L105 142M215 191L305 142"
          stroke="rgba(167,139,250,0.24)"
        />
        <text
          x="155"
          y="111"
          fill="rgba(203,213,225,0.48)"
          fontSize="10"
          fontFamily="monospace"
        >
          observed association
        </text>
      </svg>
    </div>
  );
}

function CausalNode({
  label,
  left,
  top,
  rgb,
}: {
  label: string;
  left: string;
  top: string;
  rgb: string;
}) {
  return (
    <span
      className="absolute z-10 flex h-14 w-[112px] items-center justify-center rounded-full border px-3 text-center font-mono text-[10px]"
      style={{
        left,
        top,
        borderColor: `rgba(${rgb},0.28)`,
        background: `rgba(2,9,16,0.92)`,
        color: `rgba(${rgb},0.78)`,
      }}
    >
      {label}
    </span>
  );
}
