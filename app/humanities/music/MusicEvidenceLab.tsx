"use client";

import { useMemo, useState } from "react";
import {
  AudioLines,
  Check,
  Disc3,
  FileMusic,
  RotateCcw,
  Waves,
  X,
} from "lucide-react";
import {
  getMeasureLedger,
  isMusicAssessmentAnswerCorrect,
  MUSIC_ASSESSMENT_CASES,
  transposePhrase,
  type MusicAssessmentCase,
} from "./musicModel";

type Answers = Partial<Record<MusicAssessmentCase["id"], number>>;

const meterLedger = getMeasureLedger(["half", "quarter", "eighth", "eighth"]);
const transposedPhrase = transposePhrase(["C", "E", "G"], 2);

export default function MusicEvidenceLab() {
  const [activeId, setActiveId] = useState<MusicAssessmentCase["id"]>("meter");
  const [answers, setAnswers] = useState<Answers>({});
  const activeCase =
    MUSIC_ASSESSMENT_CASES.find((item) => item.id === activeId) ??
    MUSIC_ASSESSMENT_CASES[0];
  const selectedIndex = answers[activeCase.id];
  const correct =
    selectedIndex === undefined
      ? undefined
      : isMusicAssessmentAnswerCorrect(activeCase.id, selectedIndex);
  const answered = Object.keys(answers).length;
  const score = useMemo(
    () =>
      MUSIC_ASSESSMENT_CASES.filter((item) => {
        const answer = answers[item.id];
        return answer !== undefined && answer === item.correctIndex;
      }).length,
    [answers]
  );

  function reset() {
    setAnswers({});
    setActiveId("meter");
  }

  return (
    <section
      data-assessment="music-evidence-files"
      data-model="music-pitch-duration-model"
      className="overflow-hidden rounded-[34px] border border-white/[0.09] bg-black/[0.18] shadow-[0_34px_120px_rgba(0,0,0,0.28)] backdrop-blur-xl"
    >
      <div className="grid gap-5 border-b border-white/[0.08] p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <div className="text-cyan-100/66 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.13em]">
            <AudioLines size={14} aria-hidden="true" /> Listening evidence files
          </div>
          <h2 className="mt-3 max-w-4xl text-[clamp(2rem,4vw,3.7rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">
            Match each musical claim to the representation that can support it.
          </h2>
          <p className="text-slate-300/68 mt-4 max-w-3xl text-[14px] leading-7">
            Compute durations and pitch movement exactly. Then separate what a
            score, performance, recording, and catalog record can actually
            establish.
          </p>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.08em] text-slate-500">
          <span>{score} correct</span>
          <span className="text-white/15">·</span>
          <span>{answered}/4 reviewed</span>
          <button
            type="button"
            onClick={reset}
            className="ml-2 inline-flex items-center gap-2 rounded-full border border-white/[0.09] px-3 py-2 text-slate-400 transition hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200/60"
          >
            <RotateCcw size={12} aria-hidden="true" /> Reset
          </button>
        </div>
      </div>

      <div className="grid xl:grid-cols-[310px_minmax(0,1fr)]">
        <div className="border-b border-white/[0.08] p-4 sm:p-5 xl:border-b-0 xl:border-r">
          <div
            className="space-y-2"
            role="tablist"
            aria-label="Music evidence files"
          >
            {MUSIC_ASSESSMENT_CASES.map((item, index) => {
              const answer = answers[item.id];
              const state =
                answer === undefined
                  ? "open"
                  : answer === item.correctIndex
                    ? "correct"
                    : "revisit";
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCase.id === item.id}
                  onClick={() => setActiveId(item.id)}
                  className={`w-full rounded-[17px] border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200/60 ${
                    activeCase.id === item.id
                      ? "border-rose-200/25 bg-rose-200/[0.055]"
                      : "border-white/[0.07] bg-white/[0.012] hover:bg-white/[0.025]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[11px] text-rose-100/55">
                      FILE {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-mono text-[11px] uppercase tracking-[0.08em] ${
                        state === "correct"
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

        <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(0,0.88fr)_minmax(360px,1.12fr)]">
          <RepresentationPlate representation={activeCase.representation} />
          <div>
            <div className="text-violet-200/64 font-mono text-[11px] font-semibold uppercase tracking-[0.12em]">
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
                    className={`flex w-full items-start gap-3 rounded-[16px] border p-4 text-left text-[13px] leading-6 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200/60 ${
                      selected
                        ? "border-rose-200/30 bg-rose-200/[0.06] text-white"
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
              className="mt-5 min-h-[94px] rounded-[17px] border border-white/[0.07] bg-black/20 p-4"
              aria-live="polite"
            >
              {correct === undefined ? (
                <p className="text-[13px] leading-6 text-slate-500">
                  Choose the claim that matches the represented evidence.
                </p>
              ) : (
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${correct ? "bg-emerald-300/10 text-emerald-200" : "bg-amber-300/10 text-amber-200"}`}
                  >
                    {correct ? (
                      <Check size={14} aria-hidden="true" />
                    ) : (
                      <X size={14} aria-hidden="true" />
                    )}
                  </span>
                  <div>
                    <strong className="text-[13px] text-white">
                      {correct
                        ? "Evidence fits."
                        : "Recheck the representation."}
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

function RepresentationPlate({
  representation,
}: {
  representation: MusicAssessmentCase["representation"];
}) {
  if (representation === "beat-ledger") {
    return (
      <Plate icon={AudioLines} label="4/4 measure · quarter-note units">
        <div className="grid grid-cols-4 gap-2">
          {[2, 1, 0.5, 0.5].map((beats, index) => (
            <div
              key={`${beats}-${index}`}
              className="rounded-[13px] border border-rose-100/[0.12] bg-rose-200/[0.04] p-3 text-center"
            >
              <span className="font-mono text-[16px] text-rose-100/80">
                {beats}
              </span>
              <span className="mt-1 block text-[11px] text-slate-600">
                beats
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-white/[0.07] pt-4 font-mono text-[11px] uppercase tracking-[0.08em] text-slate-500">
          <span>used {meterLedger.usedBeats}</span>
          <span>capacity {meterLedger.beatsPerMeasure}</span>
          <span className="text-emerald-200/68">complete</span>
        </div>
      </Plate>
    );
  }

  if (representation === "pitch-strip") {
    return (
      <Plate icon={Waves} label="Equal transposition · +2 semitones">
        <PitchRow label="source" pitches={["C", "E", "G"]} />
        <div className="text-cyan-200/52 my-3 text-center font-mono text-[12px]">
          ↓ +2 each
        </div>
        <PitchRow label="result" pitches={transposedPhrase} />
      </Plate>
    );
  }

  if (representation === "object-chain") {
    return (
      <Plate icon={FileMusic} label="Related objects · different identities">
        <div className="space-y-3">
          <ObjectRow
            icon={FileMusic}
            label="Composition"
            note="structural plan"
            rgb="244,114,182"
          />
          <ObjectRow
            icon={AudioLines}
            label="Performance"
            note="situated event"
            rgb="251,146,60"
          />
          <ObjectRow
            icon={Disc3}
            label="Recording"
            note="captured artifact"
            rgb="34,211,238"
          />
        </div>
      </Plate>
    );
  }

  return (
    <Plate icon={Disc3} label="Catalog fields · evidence boundary">
      <div className="flex flex-wrap gap-2">
        {["artist", "release group", "first release", "cover image"].map(
          (tag) => (
            <span
              key={tag}
              className="text-amber-100/58 rounded-full border border-amber-100/[0.12] bg-amber-100/[0.035] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.07em]"
            >
              {tag}
            </span>
          )
        )}
      </div>
      <div className="mt-5 border-t border-white/[0.07] pt-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-slate-600">
          Not contained
        </span>
        <p className="mt-2 text-[13px] leading-6 text-slate-400/70">
          The actual sounding rhythm, a score, and a defensible analysis of
          syncopation.
        </p>
      </div>
    </Plate>
  );
}

function Plate({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof AudioLines;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#08040b]/72 self-start rounded-[24px] border border-white/[0.08] p-5 shadow-[inset_0_1px_rgba(255,255,255,0.025)] sm:p-6">
      <div className="mb-5 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">
        <Icon size={13} aria-hidden="true" /> {label}
      </div>
      {children}
    </div>
  );
}

function PitchRow({
  label,
  pitches,
}: {
  label: string;
  pitches: readonly string[];
}) {
  return (
    <div className="grid grid-cols-[68px_repeat(3,1fr)] items-center gap-2">
      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-slate-600">
        {label}
      </span>
      {pitches.map((pitch, index) => (
        <span
          key={`${pitch}-${index}`}
          className="text-cyan-100/76 flex h-12 items-center justify-center rounded-[13px] border border-cyan-100/[0.13] bg-cyan-100/[0.04] font-mono text-[16px]"
        >
          {pitch}
        </span>
      ))}
    </div>
  );
}

function ObjectRow({
  icon: Icon,
  label,
  note,
  rgb,
}: {
  icon: typeof AudioLines;
  label: string;
  note: string;
  rgb: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-[15px] border border-white/[0.07] bg-white/[0.012] p-3">
      <span
        className="flex h-10 w-10 items-center justify-center rounded-[12px] border"
        style={{
          color: `rgb(${rgb})`,
          borderColor: `rgba(${rgb},0.2)`,
          background: `rgba(${rgb},0.04)`,
        }}
      >
        <Icon size={15} aria-hidden="true" />
      </span>
      <div>
        <strong className="text-white/84 text-[13px]">{label}</strong>
        <span className="mt-0.5 block text-[11px] text-slate-600">{note}</span>
      </div>
    </div>
  );
}
