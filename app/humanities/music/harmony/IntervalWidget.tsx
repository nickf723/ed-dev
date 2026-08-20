"use client";

import { useMemo, useState } from "react";
import { Activity, Divide, Music2 } from "lucide-react";

type Interval = {
  name: string;
  semitones: number;
  justLabel?: string;
  justFactor?: number;
  note: string;
};

const INTERVALS: readonly Interval[] = [
  { name: "Unison", semitones: 0, justLabel: "1:1", justFactor: 1, note: "Both tones use the same frequency." },
  { name: "Minor third", semitones: 3, justLabel: "6:5", justFactor: 6 / 5, note: "One common just-intonation form uses the ratio 6:5." },
  { name: "Major third", semitones: 4, justLabel: "5:4", justFactor: 5 / 4, note: "One common just-intonation form uses the ratio 5:4." },
  { name: "Perfect fifth", semitones: 7, justLabel: "3:2", justFactor: 3 / 2, note: "A 3:2 fifth is slightly wider than the equal-tempered fifth." },
  { name: "Tritone", semitones: 6, note: "Equal temperament places this interval exactly halfway through the octave; just-intonation practice does not reduce it to one universal ratio." },
  { name: "Octave", semitones: 12, justLabel: "2:1", justFactor: 2, note: "Doubling frequency produces an octave in both systems shown here." },
];

function wavePath(factor: number, width: number, height: number, phase = 0) {
  const points: string[] = [];
  const center = height / 2;
  const amplitude = height * 0.23;
  const cycles = 2.15 * factor;
  for (let x = 0; x <= width; x += 4) {
    const y = center + Math.sin((x / width) * Math.PI * 2 * cycles + phase) * amplitude;
    points.push(`${x === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return points.join(" ");
}

export default function IntervalWidget() {
  const [activeName, setActiveName] = useState("Perfect fifth");
  const active = useMemo(() => INTERVALS.find((item) => item.name === activeName) ?? INTERVALS[0], [activeName]);
  const equalFactor = Math.pow(2, active.semitones / 12);
  const equalPath = useMemo(() => wavePath(equalFactor, 640, 150), [equalFactor]);
  const basePath = useMemo(() => wavePath(1, 640, 150), []);

  return (
    <section className="overflow-hidden rounded-[24px] border border-rose-200/[0.14] bg-[#0c080e]/82 backdrop-blur-xl">
      <div className="border-b border-white/[0.06] p-4">
        <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-rose-300/65">
          <Activity size={13} /> Interval tuning lens
        </div>
        <h3 className="mt-2 text-lg font-semibold text-white">The same interval can be tuned more than one way.</h3>
        <p className="mt-1.5 text-[11px] leading-5 text-slate-500">
          Twelve-tone equal temperament divides the octave into twelve equal logarithmic steps. Just intonation instead describes selected intervals with whole-number frequency ratios.
        </p>
      </div>

      <div className="grid gap-3 p-4 lg:grid-cols-[minmax(0,1fr)_250px]">
        <div>
          <div className="relative h-[150px] overflow-hidden rounded-2xl border border-white/[0.06] bg-black/28">
            <svg viewBox="0 0 640 150" preserveAspectRatio="none" className="h-full w-full">
              <path d={basePath} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="2" />
              <path d={equalPath} fill="none" stroke="rgba(244,114,182,0.72)" strokeWidth="2.4" />
            </svg>
            <div className="absolute left-3 top-3 rounded-lg border border-white/[0.06] bg-black/35 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.08em] text-slate-600">
              reference tone + equal-tempered interval
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-rose-300/12 bg-rose-300/[0.025] p-3">
              <div className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-slate-600">
                <Divide size={10} /> 12-TET factor
              </div>
              <div className="mt-1 text-xl font-semibold text-rose-200">{equalFactor.toFixed(4)}</div>
              <div className="mt-1 text-[9px] text-slate-600">2^({active.semitones}/12)</div>
            </div>
            <div className="rounded-xl border border-violet-300/12 bg-violet-300/[0.025] p-3">
              <div className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-slate-600">
                <Music2 size={10} /> just example
              </div>
              <div className="mt-1 text-xl font-semibold text-violet-200">{active.justLabel ?? "varies"}</div>
              <div className="mt-1 text-[9px] text-slate-600">{active.justFactor ? active.justFactor.toFixed(4) : "no single ratio shown"}</div>
            </div>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-1.5 lg:grid-cols-1">
            {INTERVALS.map((interval) => {
              const selected = interval.name === active.name;
              return (
                <button
                  key={interval.name}
                  type="button"
                  onClick={() => setActiveName(interval.name)}
                  className={`flex min-h-10 items-center justify-between rounded-xl border px-3 py-2 text-left text-[10px] transition-colors ${
                    selected
                      ? "border-rose-300/28 bg-rose-300/[0.07] text-rose-100"
                      : "border-white/[0.055] bg-black/15 text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <span className="font-semibold">{interval.name}</span>
                  <span className="font-mono text-[8px] text-slate-700">{interval.semitones} st</span>
                </button>
              );
            })}
          </div>
          <div className="mt-3 rounded-xl border border-white/[0.055] bg-white/[0.014] p-3 text-[10px] leading-5 text-slate-500">
            {active.note}
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.055] bg-black/18 px-4 py-3 text-[10px] leading-5 text-slate-600">
        Frequency relationships help describe tuning and beating, but they do not assign one universal emotional meaning or a single culture-independent consonance ranking to every interval.
      </div>
    </section>
  );
}
