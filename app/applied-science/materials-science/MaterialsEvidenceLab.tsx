"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  RotateCcw,
  ScanLine,
  XCircle,
} from "lucide-react";
import {
  MATERIALS_EVIDENCE_CASES,
  isMaterialsEvidenceAnswerCorrect,
  type MaterialsEvidenceCaseId,
} from "./materialsScienceModel";

type Answers = Partial<Record<MaterialsEvidenceCaseId, string>>;

export default function MaterialsEvidenceLab() {
  const [activeId, setActiveId] = useState<MaterialsEvidenceCaseId>(
    MATERIALS_EVIDENCE_CASES[0].id
  );
  const [answers, setAnswers] = useState<Answers>({});
  const active =
    MATERIALS_EVIDENCE_CASES.find((item) => item.id === activeId) ??
    MATERIALS_EVIDENCE_CASES[0];
  const selectedOptionId = answers[active.id];
  const answered = selectedOptionId !== undefined;
  const correct = answered
    ? isMaterialsEvidenceAnswerCorrect(active.id, selectedOptionId)
    : false;
  const correctCount = MATERIALS_EVIDENCE_CASES.filter((item) => {
    const answer = answers[item.id];
    return answer && isMaterialsEvidenceAnswerCorrect(item.id, answer);
  }).length;

  function reset() {
    setAnswers({});
    setActiveId(MATERIALS_EVIDENCE_CASES[0].id);
  }

  return (
    <section className="bg-[#050b10]/76 overflow-hidden rounded-[30px] border border-sky-100/[0.12] shadow-[0_34px_120px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
      <div className="grid gap-5 border-b border-white/[0.07] p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-sky-200/65">
            <ClipboardCheck size={14} aria-hidden="true" /> Check · calculate,
            inspect, qualify
          </div>
          <h2 className="mt-3 max-w-5xl text-[clamp(1.9rem,3.6vw,3.35rem)] font-semibold leading-[0.96] tracking-[-0.052em] text-white">
            A material claim is only as strong as its specimen, test, and
            service boundary.
          </h2>
          <p className="mt-4 max-w-4xl text-[15px] leading-7 text-slate-400">
            Calculate one exact stress, then distinguish stiffness from
            strength, trace a processing pathway, and refuse a selection metric
            that does not represent the conditions of use.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-sky-100/55">
            {correctCount}/{MATERIALS_EVIDENCE_CASES.length} reviews passed
          </span>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.10] bg-black/20 px-4 py-2.5 text-[12px] font-semibold text-slate-300 transition hover:border-sky-100/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200/60"
          >
            <RotateCcw size={13} aria-hidden="true" /> Reset reviews
          </button>
        </div>
      </div>

      <div className="grid xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
        <div className="border-b border-white/[0.07] p-4 sm:p-6 xl:border-b-0 xl:border-r">
          <EvidenceBench activeId={active.id} evidence={active.evidence} />

          <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
            {MATERIALS_EVIDENCE_CASES.map((item, index) => {
              const itemAnswer = answers[item.id];
              const itemCorrect = itemAnswer
                ? isMaterialsEvidenceAnswerCorrect(item.id, itemAnswer)
                : undefined;
              const selected = item.id === active.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveId(item.id)}
                  className={`grid min-h-[70px] grid-cols-[38px_minmax(0,1fr)] items-center gap-3 rounded-[16px] border px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200/60 ${
                    selected
                      ? "border-sky-200/28 bg-sky-300/[0.06]"
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
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-orange-100/60">
            <ScanLine size={13} aria-hidden="true" /> Strongest supported
            conclusion
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
              const optionCorrect = isMaterialsEvidenceAnswerCorrect(
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
                  ? "border-orange-200/36 bg-orange-300/[0.07]"
                  : "border-white/[0.08] bg-black/[0.08] hover:border-orange-100/24";

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
                  className={`rounded-[18px] border px-4 py-4 text-left text-[14px] leading-6 text-slate-300 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200/60 ${stateClass}`}
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
                  ? "The conclusion stays inside the test boundary."
                  : "The conclusion outruns the supplied evidence."
                : "Choose a conclusion, then inspect the test boundary."}
            </strong>
            <p className="mt-2 max-w-4xl text-[13px] leading-6 text-slate-400">
              {answered
                ? correct
                  ? active.success
                  : active.correction
                : "Check units, identify the measured curve feature, trace processing through structure, and translate service conditions into required properties and failure tests."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function EvidenceBench({
  activeId,
  evidence,
}: {
  activeId: MaterialsEvidenceCaseId;
  evidence: string;
}) {
  return (
    <div className="bg-[#03080c]/84 overflow-hidden rounded-[22px] border border-sky-100/[0.10]">
      <div className="relative min-h-[290px] overflow-hidden p-5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(125,211,252,0.032)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.032)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="relative flex min-h-[250px] items-center justify-center">
          {activeId === "stress-calculation" ? <StressPlate /> : null}
          {activeId === "stiffness-strength" ? <SlopePlate /> : null}
          {activeId === "processing-path" ? <ProcessPlate /> : null}
          {activeId === "selection-boundary" ? <ServicePlate /> : null}
        </div>
      </div>
      <div className="border-t border-white/[0.07] px-4 py-4">
        <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.10em] text-sky-100/50">
          Specimen record
        </div>
        <p className="mt-2 text-[13px] leading-6 text-slate-300/75">
          {evidence}
        </p>
      </div>
    </div>
  );
}

function StressPlate() {
  return (
    <div className="w-full max-w-md">
      <svg viewBox="0 0 440 150" className="w-full" aria-hidden="true">
        <path
          d="M28 52H105c20 0 25 18 38 23h154c13-5 18-23 38-23h77v46h-77c-20 0-25-18-38-23H143c-13 5-18 23-38 23H28Z"
          fill="rgba(125,211,252,0.07)"
          stroke="rgba(186,230,253,0.42)"
        />
        <path d="M12 75H80M428 75h-68" stroke="rgba(251,191,36,0.48)" />
        <path
          d="M12 75l14-7v14zM428 75l-14-7v14z"
          fill="rgba(251,191,36,0.48)"
        />
        <text
          x="178"
          y="126"
          fill="rgba(203,213,225,0.58)"
          fontSize="11"
          fontFamily="monospace"
        >
          A₀ = 60 mm²
        </text>
        <text
          x="184"
          y="28"
          fill="rgba(253,230,138,0.65)"
          fontSize="11"
          fontFamily="monospace"
        >
          F = 18 kN
        </text>
      </svg>
      <div className="mt-3 rounded-[14px] border border-amber-200/15 bg-amber-300/[0.035] px-4 py-3 text-center font-mono text-[13px] text-amber-100/75">
        σ = F / A₀ = 18,000 N / 60 mm²
      </div>
    </div>
  );
}

function SlopePlate() {
  return (
    <div className="w-full max-w-md">
      <svg
        viewBox="0 0 440 250"
        className="w-full"
        role="img"
        aria-label="Two partial stress-strain curves with different initial slopes"
      >
        <path d="M58 24V212H416" fill="none" stroke="rgba(203,213,225,0.34)" />
        <path
          d="M58 212L148 55"
          fill="none"
          stroke="rgba(125,211,252,0.82)"
          strokeWidth="4"
        />
        <path
          d="M58 212L245 86"
          fill="none"
          stroke="rgba(251,191,36,0.76)"
          strokeWidth="4"
        />
        <text
          x="132"
          y="48"
          fill="rgba(186,230,253,0.74)"
          fontSize="12"
          fontFamily="monospace"
        >
          A · steeper
        </text>
        <text
          x="248"
          y="86"
          fill="rgba(253,230,138,0.70)"
          fontSize="12"
          fontFamily="monospace"
        >
          B
        </text>
        <text
          x="270"
          y="235"
          fill="rgba(148,163,184,0.48)"
          fontSize="10"
          fontFamily="monospace"
        >
          strain →
        </text>
        <text
          x="13"
          y="40"
          fill="rgba(148,163,184,0.48)"
          fontSize="10"
          fontFamily="monospace"
        >
          stress
        </text>
      </svg>
      <div className="text-center font-mono text-[11px] uppercase tracking-[0.08em] text-slate-500">
        partial curves · no maximum or fracture area shown
      </div>
    </div>
  );
}

function ProcessPlate() {
  const steps = [
    { label: "heat treatment", rgb: "251,146,60" },
    { label: "phase + grain", rgb: "125,211,252" },
    { label: "curve response", rgb: "251,191,36" },
  ] as const;

  return (
    <div className="grid w-full max-w-lg grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
      {steps.map((step, index) => (
        <div key={step.label} className="contents">
          <div
            className="flex aspect-square items-center justify-center rounded-[18px] border px-3 text-center font-mono text-[11px]"
            style={{
              borderColor: `rgba(${step.rgb},0.28)`,
              background: `rgba(${step.rgb},0.05)`,
              color: `rgba(${step.rgb},0.78)`,
            }}
          >
            {step.label}
          </div>
          {index < steps.length - 1 ? (
            <ArrowRight size={18} className="text-slate-600" />
          ) : null}
        </div>
      ))}
    </div>
  );
}

function ServicePlate() {
  return (
    <div className="w-full max-w-md">
      <div className="border-sky-200/24 mx-auto flex h-28 w-28 items-center justify-center rounded-full border bg-sky-300/[0.05] text-center font-mono text-[11px] text-sky-100/75">
        Candidate X<br />
        highest room-T
        <br />
        strength
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {["700 °C", "20,000 h", "cyclic load", "corrosive gas"].map(
          (condition) => (
            <span
              key={condition}
              className="border-rose-200/16 rounded-full border bg-rose-300/[0.035] px-3 py-2 text-center font-mono text-[10px] text-rose-100/65"
            >
              {condition}
            </span>
          )
        )}
      </div>
      <div className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.08em] text-amber-100/55">
        required service evidence missing
      </div>
    </div>
  );
}
