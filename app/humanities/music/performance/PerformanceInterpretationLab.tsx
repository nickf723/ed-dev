"use client";

import { useMemo, useState } from "react";
import { Activity, Clock3, Play, SlidersHorizontal, Volume2 } from "lucide-react";
import { Surface } from "@/app/_page-system/scene";

type ArticulationKey = "connected" | "detached";
type ContourKey = "even" | "swell" | "accent";
type TimingKey = "strict" | "cadence";

type NoteEvent = {
  label: string;
  frequency: number;
  start: number;
  duration: number;
  gain: number;
};

const MOTIF = [
  { label: "A4", frequency: 440 },
  { label: "C5", frequency: 523.25 },
  { label: "E5", frequency: 659.25 },
  { label: "D5", frequency: 587.33 },
  { label: "A4", frequency: 440 },
] as const;

const CONTOURS: Record<ContourKey, readonly number[]> = {
  even: [0.17, 0.17, 0.17, 0.17, 0.17],
  swell: [0.10, 0.15, 0.24, 0.18, 0.11],
  accent: [0.25, 0.13, 0.14, 0.17, 0.11],
};

export default function PerformanceInterpretationLab() {
  const [tempo, setTempo] = useState(96);
  const [articulation, setArticulation] = useState<ArticulationKey>("connected");
  const [contour, setContour] = useState<ContourKey>("swell");
  const [timing, setTiming] = useState<TimingKey>("cadence");
  const [playing, setPlaying] = useState(false);

  const events = useMemo(() => buildEvents(tempo, articulation, contour, timing), [articulation, contour, tempo, timing]);
  const phraseDuration = events.at(-1) ? events.at(-1)!.start + events.at(-1)!.duration : 0;
  const maxGain = Math.max(...events.map((event) => event.gain));

  async function playPhrase() {
    if (playing || typeof window === "undefined") return;
    const context = new AudioContext();
    await context.resume();
    const now = context.currentTime + 0.05;

    events.forEach((event) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(event.frequency, now + event.start);
      gain.gain.setValueAtTime(0.0001, now + event.start);
      gain.gain.linearRampToValueAtTime(event.gain, now + event.start + 0.025);
      gain.gain.setValueAtTime(event.gain, Math.max(now + event.start + 0.03, now + event.start + event.duration - 0.055));
      gain.gain.exponentialRampToValueAtTime(0.0001, now + event.start + event.duration);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now + event.start);
      oscillator.stop(now + event.start + event.duration + 0.03);
    });

    setPlaying(true);
    window.setTimeout(() => {
      setPlaying(false);
      void context.close();
    }, phraseDuration * 1000 + 250);
  }

  return (
    <Surface variant="glass" className="overflow-hidden rounded-[30px] border-orange-100/[0.11]" style={{ background: "rgba(15,8,4,0.30)" }}>
      <div className="grid border-b border-white/[0.07] lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-[0.09em] text-orange-200/64"><Volume2 size={14} /> Interpretation laboratory</div>
          <h3 className="mt-2 text-[clamp(1.8rem,3vw,2.9rem)] font-semibold tracking-[-0.045em] text-white">Keep the notes fixed. Change how the phrase is performed.</h3>
          <p className="mt-3 max-w-3xl text-[14px] leading-6 text-slate-300/74">The motif always uses the same five pitches in the same order. Change tempo, articulation, dynamic contour, and phrase timing, then listen to a simple synthesized reference tone. The timbre is intentionally plain so the timing and envelope stay easy to hear.</p>
        </div>
        <div className="border-t border-white/[0.07] bg-black/[0.055] p-5 lg:border-l lg:border-t-0">
          <span className="font-mono text-[11px] uppercase tracking-[0.07em] text-slate-500">Current realization</span>
          <strong className="mt-2 block text-[20px] text-orange-200">{tempo} BPM · {articulation} · {contour}</strong>
          <p className="mt-2 text-[12px] leading-5 text-slate-400/72">{timing === "cadence" ? "The final approach stretches slightly, creating a phrase-end timing cue." : "Beat spacing stays mechanically even across the phrase."}</p>
        </div>
      </div>

      <div className="grid gap-5 p-4 sm:p-5 xl:grid-cols-[235px_minmax(0,1fr)_310px] xl:items-start">
        <div>
          <label className="block rounded-[16px] border border-white/[0.06] bg-black/[0.07] p-3.5">
            <span className="flex items-center justify-between gap-3"><span className="text-[12px] font-semibold text-white/82">Tempo</span><strong className="font-mono text-[13px] text-orange-200">{tempo} BPM</strong></span>
            <input aria-label="Tempo" type="range" min="64" max="132" step="2" value={tempo} onChange={(event) => setTempo(Number(event.target.value))} className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-orange-400" />
            <div className="mt-2 flex justify-between font-mono text-[10px] text-slate-600"><span>slower</span><span>faster</span></div>
          </label>

          <ChoiceGroup label="Articulation" options={[{ key: "connected", label: "Connected" }, { key: "detached", label: "Detached" }]} value={articulation} onChange={(value) => setArticulation(value as ArticulationKey)} />
          <ChoiceGroup label="Dynamic contour" options={[{ key: "even", label: "Even" }, { key: "swell", label: "Swell" }, { key: "accent", label: "Accent" }]} value={contour} onChange={(value) => setContour(value as ContourKey)} />
          <ChoiceGroup label="Phrase timing" options={[{ key: "strict", label: "Strict" }, { key: "cadence", label: "Phrase-end stretch" }]} value={timing} onChange={(value) => setTiming(value as TimingKey)} />
        </div>

        <div>
          <div className="relative overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#120905]/72 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3"><div><div className="font-mono text-[10px] uppercase tracking-[0.07em] text-slate-500">Rendered phrase</div><strong className="mt-1 block text-[14px] text-white/84">A4 · C5 · E5 · D5 · A4</strong></div><button type="button" onClick={() => void playPhrase()} disabled={playing} className="flex min-h-[42px] items-center gap-2 rounded-full border border-orange-200/[0.20] bg-orange-300/[0.045] px-4 text-[12px] font-semibold text-orange-100 disabled:opacity-40"><Play size={14} /> {playing ? "Playing" : "Play phrase"}</button></div>

            <div className="relative mt-5 h-[210px] rounded-[18px] border border-white/[0.055] bg-black/[0.16]">
              {[25,50,75].map((top) => <div key={top} className="absolute left-0 right-0 h-px bg-white/[0.035]" style={{ top: `${top}%` }} />)}
              {events.map((event, index) => {
                const left = phraseDuration ? (event.start / phraseDuration) * 90 + 4 : 4;
                const width = phraseDuration ? Math.max(5, (event.duration / phraseDuration) * 88) : 10;
                const height = 24 + (event.gain / maxGain) * 90;
                return (
                  <div key={`${event.label}-${index}`} className="absolute bottom-[42px] rounded-t-[8px] border border-orange-100/[0.14] bg-gradient-to-t from-orange-400/[0.09] to-pink-300/[0.14]" style={{ left: `${left}%`, width: `${width}%`, height }}>
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-[10px] text-orange-100/64">{event.label}</span>
                    <span className="absolute bottom-2 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-orange-200/45" />
                  </div>
                );
              })}
              <div className="absolute bottom-[30px] left-[4%] right-[4%] h-px bg-white/[0.08]" />
              <span className="absolute bottom-2 left-4 font-mono text-[9px] uppercase tracking-[0.06em] text-slate-600">time →</span>
              <span className="absolute left-3 top-3 font-mono text-[9px] uppercase tracking-[0.06em] text-slate-600">height = relative dynamic level</span>
            </div>
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            <Readout label="Phrase duration" value={`${phraseDuration.toFixed(2)} s`} note="from first onset through last release" rgb="251,146,60" />
            <Readout label="Note gate" value={articulation === "connected" ? "long" : "short"} note="relative sounding duration per beat" rgb="244,114,182" />
            <Readout label="Timing grid" value={timing === "strict" ? "even" : "shaped"} note="onset spacing across the motif" rgb="167,139,250" />
          </div>
        </div>

        <aside className="xl:sticky xl:top-[172px] xl:self-start">
          <div className="rounded-[20px] border border-white/[0.07] bg-black/[0.07] p-4">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-orange-200/52"><Activity size={13} /> What to notice</div>
            <p className="mt-3 text-[13px] leading-6 text-slate-300/72">The written pitch sequence is unchanged, but the sounding event is not. Performance adds timing, duration, dynamic shape, tone, gesture, interaction, and context to whatever a score, lead sheet, memory, tradition, or improvisational rule specifies.</p>
          </div>
          <div className="mt-3 rounded-[17px] border border-pink-100/[0.08] bg-pink-300/[0.02] p-4">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.06em] text-pink-200/48"><SlidersHorizontal size={11} /> Interpretation is constrained</div>
            <p className="mt-2 text-[12px] leading-5 text-slate-400/72">Interpretation is not arbitrary decoration. Style, notation, ensemble role, instrument, technique, acoustics, tradition, coordination, and the surrounding musical structure all constrain plausible choices.</p>
          </div>
          <div className="mt-3 rounded-[17px] border border-violet-100/[0.08] bg-violet-300/[0.02] p-4">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.06em] text-violet-200/48"><Clock3 size={11} /> The audio is a reference tone</div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">The Web Audio oscillator is not a piano, voice, violin, or realistic instrument model. It exists only to make onset timing, note length, and relative dynamic contour audible.</p>
          </div>
        </aside>
      </div>
    </Surface>
  );
}

function buildEvents(tempo: number, articulation: ArticulationKey, contour: ContourKey, timing: TimingKey): NoteEvent[] {
  const beat = 60 / tempo;
  const gate = articulation === "connected" ? 0.9 : 0.48;
  const gains = CONTOURS[contour];

  return MOTIF.map((note, index) => {
    const phraseStretch = timing === "cadence" && index >= 3 ? (index - 2) * beat * 0.16 : 0;
    return {
      label: note.label,
      frequency: note.frequency,
      start: index * beat + phraseStretch,
      duration: beat * gate * (timing === "cadence" && index === MOTIF.length - 1 ? 1.22 : 1),
      gain: gains[index],
    };
  });
}

function ChoiceGroup({ label, options, value, onChange }: { label: string; options: readonly { key: string; label: string }[]; value: string; onChange: (value: string) => void }) {
  return <div className="mt-3 rounded-[16px] border border-white/[0.06] bg-black/[0.07] p-3.5"><div className="text-[12px] font-semibold text-white/82">{label}</div><div className="mt-2 grid gap-2">{options.map((option) => <button key={option.key} type="button" onClick={() => onChange(option.key)} className={`rounded-[12px] border px-3 py-2.5 text-left text-[11px] font-semibold transition ${value === option.key ? "border-orange-200/[0.22] bg-orange-300/[0.045] text-orange-100" : "border-white/[0.055] bg-black/[0.04] text-slate-400"}`}>{option.label}</button>)}</div></div>;
}

function Readout({ label, value, note, rgb }: { label: string; value: string; note: string; rgb: string }) {
  return <div className="rounded-[15px] border border-white/[0.06] bg-black/[0.08] p-3"><div className="font-mono text-[10px] uppercase tracking-[0.06em] text-slate-500">{label}</div><div className="mt-1 text-[18px] font-semibold" style={{ color: `rgb(${rgb})` }}>{value}</div><p className="mt-1 text-[11px] leading-4 text-slate-500">{note}</p></div>;
}
