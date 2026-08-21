"use client";

import { useState } from "react";
import {
  CheckCircle2,
  ClipboardCheck,
  FlaskConical,
  RotateCcw,
  ScanSearch,
  XCircle,
} from "lucide-react";
import {
  CHEMISTRY_EVIDENCE_CASES,
  isChemistryEvidenceAnswerCorrect,
  type ChemistryEvidenceCaseId,
} from "./chemistryModel";

type Answers = Partial<Record<ChemistryEvidenceCaseId, string>>;
type EvidenceVisual = (typeof CHEMISTRY_EVIDENCE_CASES)[number]["visual"];

export default function ChemistryEvidenceLab() {
  const [activeId, setActiveId] = useState<ChemistryEvidenceCaseId>(
    CHEMISTRY_EVIDENCE_CASES[0].id
  );
  const [answers, setAnswers] = useState<Answers>({});
  const active =
    CHEMISTRY_EVIDENCE_CASES.find((item) => item.id === activeId) ??
    CHEMISTRY_EVIDENCE_CASES[0];
  const selectedOptionId = answers[active.id];
  const answered = selectedOptionId !== undefined;
  const correct = answered
    ? isChemistryEvidenceAnswerCorrect(active.id, selectedOptionId)
    : false;
  const correctCount = CHEMISTRY_EVIDENCE_CASES.filter((item) => {
    const answer = answers[item.id];
    return answer && isChemistryEvidenceAnswerCorrect(item.id, answer);
  }).length;

  function reset() {
    setAnswers({});
    setActiveId(CHEMISTRY_EVIDENCE_CASES[0].id);
  }

  return (
    <section
      data-assessment="chemistry-evidence-files"
      className="bg-[#020a07]/72 overflow-hidden rounded-[30px] border border-emerald-100/[0.13] shadow-[0_34px_120px_rgba(0,0,0,0.30)] backdrop-blur-2xl"
    >
      <div className="grid gap-5 border-b border-white/[0.07] p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-200/65">
            <ClipboardCheck size={14} aria-hidden="true" /> Check · reconcile
            representation with evidence
          </div>
          <h2 className="mt-3 max-w-5xl text-[clamp(1.9rem,3.6vw,3.35rem)] font-semibold leading-[0.96] tracking-[-0.052em] text-white">
            A chemical representation is useful only when you know what it
            preserves—and what it leaves out.
          </h2>
          <p className="mt-4 max-w-4xl text-[15px] leading-7 text-slate-400">
            Balance a symbolic equation, track nuclear identity, infer polarity
            from geometry, and stop when an unknown sample exceeds the evidence
            and safety boundary.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[11px] text-emerald-100/55">
            {correctCount}/{CHEMISTRY_EVIDENCE_CASES.length} files reconciled
          </span>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.10] bg-black/20 px-4 py-2.5 text-[12px] font-semibold text-slate-300 transition hover:border-emerald-100/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200/60"
          >
            <RotateCcw size={13} aria-hidden="true" /> Reset files
          </button>
        </div>
      </div>

      <div className="grid xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
        <div className="border-b border-white/[0.07] p-4 sm:p-6 xl:border-b-0 xl:border-r">
          <EvidencePlate visual={active.visual} evidence={active.evidence} />

          <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
            {CHEMISTRY_EVIDENCE_CASES.map((item, index) => {
              const itemAnswer = answers[item.id];
              const itemCorrect = itemAnswer
                ? isChemistryEvidenceAnswerCorrect(item.id, itemAnswer)
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
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-100/60">
            <ScanSearch size={14} aria-hidden="true" /> Strongest supported
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
              const optionCorrect = isChemistryEvidenceAnswerCorrect(
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
                  ? "border-cyan-200/36 bg-cyan-300/[0.07]"
                  : "border-white/[0.08] bg-black/[0.08] hover:border-cyan-100/24";

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
                  className={`rounded-[18px] border px-4 py-4 text-left text-[14px] leading-6 text-slate-300 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/60 ${stateClass}`}
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
                  ? "The conclusion preserves the supplied chemical boundary."
                  : "The conclusion changes identity or outruns the evidence."
                : "Choose a conclusion, then reconcile it with the representation."}
            </strong>
            <p className="mt-2 max-w-4xl text-[13px] leading-6 text-slate-400">
              {answered
                ? correct
                  ? active.success
                  : active.correction
                : "Ask what the symbols count, which particle fixes identity, how geometry combines vectors, and whether the sample is known well enough to handle safely."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function EvidencePlate({
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
          {visual === "balance" ? <BalancePlate /> : null}
          {visual === "isotopes" ? <IsotopePlate /> : null}
          {visual === "dipoles" ? <DipolePlate /> : null}
          {visual === "unknown" ? <UnknownPlate /> : null}
        </div>
      </div>
      <div className="border-t border-white/[0.07] px-4 py-4">
        <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-emerald-100/50">
          Observation record
        </div>
        <p className="mt-2 text-[13px] leading-6 text-slate-300/75">
          {evidence}
        </p>
      </div>
    </div>
  );
}

function BalancePlate() {
  return (
    <div className="w-full max-w-md">
      <div className="flex flex-wrap items-center justify-center gap-3 text-[25px] font-semibold text-white">
        <span className="text-emerald-200">CH₄</span>
        <span className="text-slate-600">+</span>
        <span className="text-cyan-200">? O₂</span>
        <span className="text-amber-200/55">→</span>
        <span className="text-emerald-200">CO₂</span>
        <span className="text-slate-600">+</span>
        <span className="text-cyan-200">? H₂O</span>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-2 text-center font-mono text-[12px]">
        {[
          ["C", "1 ↔ 1"],
          ["H", "4 ↔ ?"],
          ["O", "? ↔ ?"],
        ].map(([element, count]) => (
          <div
            key={element}
            className="border border-white/10 bg-black/20 px-3 py-3"
          >
            <strong className="block text-emerald-100">{element}</strong>
            <span className="mt-1 block text-slate-500">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function IsotopePlate() {
  return (
    <div className="grid w-full max-w-md grid-cols-2 gap-4">
      <NucleusCard label="¹²C" protons={6} neutrons={6} />
      <NucleusCard label="¹⁴C" protons={6} neutrons={8} />
      <div className="col-span-2 text-center font-mono text-[12px] uppercase tracking-[0.08em] text-emerald-100/55">
        same Z = 6 · different mass number
      </div>
    </div>
  );
}

function NucleusCard({
  label,
  protons,
  neutrons,
}: {
  label: string;
  protons: number;
  neutrons: number;
}) {
  return (
    <div className="border border-white/10 bg-black/20 p-4 text-center">
      <strong className="text-[25px] text-white">{label}</strong>
      <div className="mx-auto mt-4 flex h-24 w-24 flex-wrap content-center justify-center gap-1 rounded-full border border-emerald-200/15 bg-emerald-300/[0.035] p-3">
        {Array.from({ length: protons + neutrons }, (_, index) => (
          <span
            key={index}
            className={`h-3 w-3 rounded-full ${index < protons ? "bg-rose-300/70" : "bg-cyan-300/55"}`}
          />
        ))}
      </div>
      <span className="mt-3 block text-[12px] text-slate-400">
        {protons} p⁺ · {neutrons} n
      </span>
    </div>
  );
}

function DipolePlate() {
  return (
    <svg
      viewBox="0 0 470 230"
      className="w-full max-w-lg"
      role="img"
      aria-label="Linear carbon dioxide dipoles cancel while bent water dipoles do not"
    >
      <text
        x="111"
        y="32"
        textAnchor="middle"
        fill="rgba(165,243,252,0.62)"
        fontSize="13"
      >
        CO₂ · linear
      </text>
      <path d="M44 112H178" stroke="rgba(226,232,240,0.28)" strokeWidth="8" />
      <circle cx="44" cy="112" r="24" fill="rgba(248,113,113,0.48)" />
      <circle cx="111" cy="112" r="26" fill="rgba(100,116,139,0.58)" />
      <circle cx="178" cy="112" r="24" fill="rgba(248,113,113,0.48)" />
      <path
        d="M100 72H52m-8 0l12-7v14zM122 72h48m8 0l-12-7v14z"
        stroke="rgba(251,191,36,0.58)"
        fill="rgba(251,191,36,0.58)"
      />
      <text
        x="111"
        y="178"
        textAnchor="middle"
        fill="rgba(148,163,184,0.58)"
        fontSize="12"
      >
        equal · opposite · cancel
      </text>

      <text
        x="355"
        y="32"
        textAnchor="middle"
        fill="rgba(165,243,252,0.62)"
        fontSize="13"
      >
        H₂O · bent
      </text>
      <path
        d="M355 100L300 156M355 100L410 156"
        stroke="rgba(226,232,240,0.28)"
        strokeWidth="8"
      />
      <circle cx="355" cy="100" r="28" fill="rgba(248,113,113,0.50)" />
      <circle cx="300" cy="156" r="19" fill="rgba(241,245,249,0.58)" />
      <circle cx="410" cy="156" r="19" fill="rgba(241,245,249,0.58)" />
      <path
        d="M339 124L312 150m-7 6l4-13 9 9zM371 124l27 26m7 6l-13-4 9-9z"
        stroke="rgba(251,191,36,0.58)"
        fill="rgba(251,191,36,0.58)"
      />
      <text
        x="355"
        y="206"
        textAnchor="middle"
        fill="rgba(148,163,184,0.58)"
        fontSize="12"
      >
        vectors do not cancel
      </text>
    </svg>
  );
}

function UnknownPlate() {
  return (
    <div className="w-full max-w-sm text-center">
      <div className="relative mx-auto h-44 w-28">
        <div className="absolute left-6 top-0 h-10 w-16 border border-white/15 bg-slate-300/10" />
        <div className="absolute inset-x-0 bottom-0 top-8 overflow-hidden rounded-b-[34px] border border-amber-200/20 bg-black/25">
          <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-cyan-200/20 to-cyan-100/5" />
          <div className="absolute inset-x-3 top-14 border border-rose-200/20 bg-rose-300/[0.06] px-2 py-2 font-mono text-[18px] font-bold text-rose-100/70">
            ?
          </div>
        </div>
      </div>
      <div className="mt-4 inline-flex items-center gap-2 border border-rose-200/15 bg-rose-300/[0.035] px-4 py-2 font-mono text-[12px] uppercase tracking-[0.08em] text-rose-100/65">
        <FlaskConical size={14} aria-hidden="true" /> unknown ≠ safe
      </div>
    </div>
  );
}
