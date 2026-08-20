"use client";

import { useMemo, useState } from "react";
import { ArrowRight, AudioLines, CircleDot, Layers3 } from "lucide-react";

type Chord = {
  numeral: string;
  name: string;
  role: string;
  root: readonly number[];
  compact: readonly number[];
};

type Progression = {
  id: string;
  label: string;
  note: string;
  chords: readonly Chord[];
};

const PITCH_NAMES = ["C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "A♭", "A", "B♭", "B"];

const CHORDS = {
  I: { numeral: "I", name: "C major", role: "tonic", root: [60, 64, 67], compact: [60, 64, 67] },
  ii: { numeral: "ii", name: "D minor", role: "predominant", root: [62, 65, 69], compact: [62, 65, 69] },
  IV: { numeral: "IV", name: "F major", role: "predominant", root: [65, 69, 72], compact: [60, 65, 69] },
  V: { numeral: "V", name: "G major", role: "dominant", root: [67, 71, 74], compact: [59, 62, 67] },
  vi: { numeral: "vi", name: "A minor", role: "tonic-family", root: [69, 72, 76], compact: [60, 64, 69] },
} satisfies Record<string, Chord>;

const PROGRESSIONS: readonly Progression[] = [
  {
    id: "cadence",
    label: "ii → V → I",
    note: "A compact tonal cadence: predominant moves to dominant, then tonic.",
    chords: [CHORDS.ii, CHORDS.V, CHORDS.I],
  },
  {
    id: "departure",
    label: "I → IV → V → I",
    note: "Tonic departs through predominant and dominant before returning.",
    chords: [CHORDS.I, CHORDS.IV, CHORDS.V, CHORDS.I],
  },
  {
    id: "deceptive",
    label: "I → IV → V → vi",
    note: "The dominant arrives, but the final chord avoids the expected tonic arrival.",
    chords: [CHORDS.I, CHORDS.IV, CHORDS.V, CHORDS.vi],
  },
];

function pitchLabel(midi: number) {
  const pitchClass = ((midi % 12) + 12) % 12;
  const octave = Math.floor(midi / 12) - 1;
  return `${PITCH_NAMES[pitchClass]}${octave}`;
}

function movement(chords: readonly Chord[], mode: "root" | "compact") {
  let total = 0;
  for (let index = 1; index < chords.length; index += 1) {
    const before = chords[index - 1][mode];
    const after = chords[index][mode];
    for (let voice = 0; voice < 3; voice += 1) total += Math.abs(after[voice] - before[voice]);
  }
  return total;
}

export default function VoiceLeadingLab() {
  const [progressionId, setProgressionId] = useState("departure");
  const [mode, setMode] = useState<"root" | "compact">("compact");
  const progression = useMemo(
    () => PROGRESSIONS.find((item) => item.id === progressionId) ?? PROGRESSIONS[0],
    [progressionId],
  );
  const totalMovement = movement(progression.chords, mode);
  const allPitches = progression.chords.flatMap((chord) => chord[mode]);
  const minimum = Math.min(...allPitches) - 1;
  const maximum = Math.max(...allPitches) + 1;
  const span = Math.max(1, maximum - minimum);

  return (
    <section className="overflow-hidden rounded-[28px] border border-violet-200/[0.16] bg-[#0d0711]/82 shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl">
      <div className="border-b border-white/[0.06] p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-300/70">
              <AudioLines size={14} /> Voice-leading lab
            </div>
            <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.6rem)] font-semibold tracking-[-0.045em] text-white">
              A chord is vertical. Harmony also moves horizontally.
            </h2>
            <p className="mt-2 max-w-3xl text-[12px] leading-5 text-slate-400">
              Keep the chord identities fixed and change only their voicing. The colored lines trace three voices from one sonority to the next, making common tones, stepwise motion, and larger leaps visible.
            </p>
          </div>
          <div className="flex shrink-0 rounded-xl border border-white/[0.07] bg-black/25 p-1">
            {(["compact", "root"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setMode(option)}
                className={`rounded-lg px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] transition-colors ${
                  mode === option ? "bg-violet-300/12 text-violet-100" : "text-slate-600 hover:text-slate-300"
                }`}
              >
                {option === "compact" ? "compact voicing" : "root-position blocks"}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {PROGRESSIONS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setProgressionId(item.id)}
              className={`rounded-xl border px-3 py-2 text-[11px] font-semibold transition-colors ${
                progression.id === item.id
                  ? "border-rose-300/30 bg-rose-300/[0.07] text-rose-100"
                  : "border-white/[0.06] bg-black/15 text-slate-500 hover:border-rose-200/16 hover:text-slate-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 p-4 sm:p-5 xl:grid-cols-[minmax(0,1.25fr)_310px]">
        <div className="relative h-[340px] overflow-hidden rounded-[22px] border border-white/[0.07] bg-black/28">
          {Array.from({ length: maximum - minimum + 1 }, (_, index) => {
            const midi = maximum - index;
            const y = ((maximum - midi) / span) * 82 + 9;
            const isC = midi % 12 === 0;
            return (
              <div key={midi} className="absolute left-0 right-0" style={{ top: `${y}%` }}>
                <div className={`h-px ${isC ? "bg-white/[0.09]" : "bg-white/[0.035]"}`} />
                {isC && <span className="absolute left-2 -top-2.5 font-mono text-[8px] text-slate-700">{pitchLabel(midi)}</span>}
              </div>
            );
          })}

          <svg viewBox="0 0 1000 340" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            {[0, 1, 2].map((voice) => {
              const points = progression.chords.map((chord, index) => {
                const pitches = chord[mode];
                const x = progression.chords.length === 1 ? 500 : 90 + (index / (progression.chords.length - 1)) * 820;
                const y = 31 + ((maximum - pitches[voice]) / span) * 278;
                return `${x},${y}`;
              });
              const colors = ["rgba(244,114,182,0.72)", "rgba(167,139,250,0.72)", "rgba(45,212,191,0.68)"];
              return <polyline key={voice} points={points.join(" ")} fill="none" stroke={colors[voice]} strokeWidth="2.2" />;
            })}
          </svg>

          {progression.chords.map((chord, index) => {
            const x = progression.chords.length === 1 ? 50 : 9 + (index / (progression.chords.length - 1)) * 82;
            return (
              <div key={`${chord.numeral}-${index}`} className="absolute inset-y-0" style={{ left: `${x}%` }}>
                {chord[mode].map((pitch, voice) => {
                  const y = ((maximum - pitch) / span) * 82 + 9;
                  const colors = ["border-rose-300/60 bg-rose-300/15 text-rose-100", "border-violet-300/60 bg-violet-300/15 text-violet-100", "border-teal-300/55 bg-teal-300/12 text-teal-100"];
                  return (
                    <div
                      key={`${pitch}-${voice}`}
                      className={`absolute flex h-8 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border font-mono text-[9px] ${colors[voice]}`}
                      style={{ top: `${y}%` }}
                    >
                      {pitchLabel(pitch)}
                    </div>
                  );
                })}
                <div className="absolute bottom-4 left-0 w-24 -translate-x-1/2 text-center">
                  <div className="text-lg font-semibold text-white">{chord.numeral}</div>
                  <div className="mt-0.5 text-[9px] text-slate-600">{chord.name}</div>
                  <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.08em] text-violet-300/50">{chord.role}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.016] p-4">
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-slate-600">
              <Layers3 size={12} /> selected progression
            </div>
            <div className="mt-2 text-xl font-semibold text-white">{progression.label}</div>
            <p className="mt-2 text-[11px] leading-5 text-slate-400">{progression.note}</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-rose-300/12 bg-rose-300/[0.025] p-3">
              <div className="font-mono text-[8px] uppercase tracking-[0.1em] text-slate-600">total voice motion</div>
              <div className="mt-1 text-2xl font-semibold text-rose-200">{totalMovement}</div>
              <div className="text-[9px] text-slate-600">semitone steps across 3 voices</div>
            </div>
            <div className="rounded-xl border border-violet-300/12 bg-violet-300/[0.025] p-3">
              <div className="font-mono text-[8px] uppercase tracking-[0.1em] text-slate-600">voicing</div>
              <div className="mt-1 text-[13px] font-semibold text-violet-200">{mode === "compact" ? "compact" : "root-position"}</div>
              <div className="mt-1 text-[9px] text-slate-600">same chord labels, different pitch placement</div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-black/20 p-4">
            <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-300">
              <CircleDot size={13} className="text-teal-300/70" /> What changed?
            </div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">
              The Roman-numeral progression did not change. Only register and inversion changed. Voice leading is one layer of harmonic organization, not a score for how “good” the progression is.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/[0.055] px-3 py-2 text-[10px] text-slate-600">
            chord identity <ArrowRight size={11} /> voicing <ArrowRight size={11} /> voice motion <ArrowRight size={11} /> heard continuity
          </div>
        </div>
      </div>
    </section>
  );
}
