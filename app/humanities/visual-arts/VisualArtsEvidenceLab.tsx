"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Eye,
  FileSearch,
  RotateCcw,
  Stamp,
  XCircle,
} from "lucide-react";
import {
  VISUAL_ARTS_EVIDENCE_CASES,
  getHarmonyHues,
  isVisualArtsEvidenceAnswerCorrect,
  type VisualArtsEvidenceCaseId,
} from "./visualArtsModel";

type Answers = Partial<Record<VisualArtsEvidenceCaseId, string>>;

export default function VisualArtsEvidenceLab() {
  const [activeId, setActiveId] = useState<VisualArtsEvidenceCaseId>(
    VISUAL_ARTS_EVIDENCE_CASES[0].id
  );
  const [answers, setAnswers] = useState<Answers>({});
  const active =
    VISUAL_ARTS_EVIDENCE_CASES.find((item) => item.id === activeId) ??
    VISUAL_ARTS_EVIDENCE_CASES[0];
  const selectedOptionId = answers[active.id];
  const answered = selectedOptionId !== undefined;
  const correct = answered
    ? isVisualArtsEvidenceAnswerCorrect(active.id, selectedOptionId)
    : false;
  const correctCount = VISUAL_ARTS_EVIDENCE_CASES.filter((item) => {
    const answer = answers[item.id];
    return answer && isVisualArtsEvidenceAnswerCorrect(item.id, answer);
  }).length;

  function reset() {
    setAnswers({});
    setActiveId(VISUAL_ARTS_EVIDENCE_CASES[0].id);
  }

  return (
    <section className="bg-[#0b0708]/72 overflow-hidden rounded-[30px] border border-rose-100/[0.12] shadow-[0_32px_110px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
      <div className="grid gap-5 border-b border-white/[0.07] p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-rose-200/65">
            <Eye size={14} aria-hidden="true" /> Check · observe, infer, verify
          </div>
          <h2 className="mt-3 max-w-5xl text-[clamp(1.9rem,3.6vw,3.35rem)] font-semibold leading-[0.96] tracking-[-0.052em] text-white">
            Make the strongest claim the evidence can carry—then stop.
          </h2>
          <p className="mt-4 max-w-4xl text-[15px] leading-7 text-stone-400">
            Begin with one exact color-wheel calculation, then test the
            boundaries between observation and interpretation, object and
            process, metadata and provenance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-rose-100/55">
            {correctCount}/{VISUAL_ARTS_EVIDENCE_CASES.length} supported
          </span>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.10] bg-black/20 px-4 py-2.5 text-[12px] font-semibold text-stone-300 transition hover:border-rose-100/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200/60"
          >
            <RotateCcw size={13} aria-hidden="true" /> Reset files
          </button>
        </div>
      </div>

      <div className="grid xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
        <div className="border-b border-white/[0.07] p-4 sm:p-6 xl:border-b-0 xl:border-r">
          <EvidencePlate
            activeId={active.id}
            observation={active.observation}
          />

          <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
            {VISUAL_ARTS_EVIDENCE_CASES.map((item, index) => {
              const itemAnswer = answers[item.id];
              const itemCorrect = itemAnswer
                ? isVisualArtsEvidenceAnswerCorrect(item.id, itemAnswer)
                : undefined;
              const selected = item.id === active.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveId(item.id)}
                  className={`grid min-h-[68px] grid-cols-[36px_minmax(0,1fr)] items-center gap-3 rounded-[16px] border px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200/60 ${
                    selected
                      ? "border-rose-200/28 bg-rose-300/[0.06]"
                      : "border-white/[0.06] bg-black/[0.05] hover:border-white/[0.14]"
                  }`}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-black/20 font-mono text-[10px] text-stone-500">
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
                    <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.07em] text-stone-600">
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
            <FileSearch size={13} aria-hidden="true" /> Strongest supported
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
              const optionCorrect = isVisualArtsEvidenceAnswerCorrect(
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
                  className={`rounded-[18px] border px-4 py-4 text-left text-[14px] leading-6 text-stone-300 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200/60 ${stateClass}`}
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
                  ? "That claim fits the evidence boundary."
                  : "That claim exceeds or misreads the evidence."
                : "Choose an answer, then inspect its evidence boundary."}
            </strong>
            <p className="mt-2 max-w-4xl text-[13px] leading-6 text-stone-400">
              {answered
                ? correct
                  ? active.success
                  : active.correction
                : "Describe what is inspectable, identify the process or record field that supports the inference, and name what would require more evidence."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function EvidencePlate({
  activeId,
  observation,
}: {
  activeId: VisualArtsEvidenceCaseId;
  observation: string;
}) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-orange-100/[0.10] bg-[#080504]/80">
      <div className="relative min-h-[280px] overflow-hidden p-5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(251,146,60,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(251,146,60,0.035)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="relative flex min-h-[240px] items-center justify-center">
          {activeId === "hue-calculation" ? <HuePlate /> : null}
          {activeId === "observation-interpretation" ? (
            <ObservationPlate />
          ) : null}
          {activeId === "process-evidence" ? <EditionPlate /> : null}
          {activeId === "record-boundary" ? <RecordPlate /> : null}
        </div>
      </div>
      <div className="border-t border-white/[0.07] px-4 py-4">
        <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.10em] text-orange-100/50">
          Evidence file
        </div>
        <p className="mt-2 text-[13px] leading-6 text-stone-300/75">
          {observation}
        </p>
      </div>
    </div>
  );
}

function HuePlate() {
  const hues = getHarmonyHues(18, "complementary");
  return (
    <div className="w-full max-w-md">
      <div className="grid grid-cols-2 overflow-hidden rounded-[18px] border border-white/[0.10]">
        {hues.map((hue) => (
          <div
            key={hue}
            className="flex min-h-[150px] items-end p-4"
            style={{ background: `hsl(${hue} 72% 54%)` }}
          >
            <span className="rounded-full bg-black/40 px-3 py-1.5 font-mono text-[12px] text-white backdrop-blur-sm">
              {hue}°
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 text-center font-mono text-[12px] text-stone-400">
        (18 + 180) mod 360 = 198
      </div>
    </div>
  );
}

function ObservationPlate() {
  return (
    <div className="relative h-[220px] w-full max-w-md overflow-hidden rounded-[16px] border border-white/[0.10] bg-[#050711]">
      {[18, 34, 50, 66, 82].map((left) => (
        <span
          key={left}
          className="absolute top-[18%] h-[68%] w-3 -rotate-[24deg] rounded-full bg-blue-500/70"
          style={{ left: `${left}%` }}
        />
      ))}
      <span className="absolute right-[15%] top-[18%] h-12 w-12 rounded-full bg-amber-300 shadow-[0_0_32px_rgba(252,211,77,0.30)]" />
      <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.09em] text-white/45">
        marks · interval · contrast
      </span>
    </div>
  );
}

function EditionPlate() {
  return (
    <div
      className="grid w-full max-w-md grid-cols-3 gap-3"
      aria-label="Six related print impressions"
    >
      {Array.from({ length: 6 }, (_, index) => (
        <div
          key={index}
          className="relative aspect-[4/5] overflow-hidden rounded-[4px] border border-stone-200/20 bg-stone-200"
        >
          <Stamp
            size={38}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#15110f]"
            style={{ opacity: 0.76 + index * 0.035 }}
          />
          <span className="absolute bottom-1.5 right-2 font-mono text-[8px] text-stone-800">
            {index + 1}/6
          </span>
        </div>
      ))}
    </div>
  );
}

function RecordPlate() {
  return (
    <div className="w-full max-w-md rounded-[16px] border border-white/[0.10] bg-black/35 p-5">
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.10em] text-emerald-200/65">
        <CheckCircle2 size={13} /> Provider fields present
      </div>
      <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3 text-[12px]">
        {[
          ["title", "present"],
          ["maker", "present"],
          ["medium", "present"],
          ["public-domain image", "yes"],
          ["object URL", "present"],
          ["ownership chain", "not supplied"],
        ].map(([label, value]) => (
          <div key={label} className="border-b border-white/[0.07] pb-2">
            <span className="block text-stone-500">{label}</span>
            <strong
              className={
                value === "not supplied"
                  ? "text-amber-200/70"
                  : "text-stone-200"
              }
            >
              {value}
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
}
