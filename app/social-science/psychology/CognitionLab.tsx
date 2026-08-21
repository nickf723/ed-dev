"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Brain,
  Eye,
  Focus,
  Gauge,
  RefreshCcw,
  Sparkles,
} from "lucide-react";
import { Surface, useWorldDirector } from "@/app/_page-system/scene";

type PsychologyScene = "perception" | "attention" | "memory";
type SearchItem = {
  id: number;
  target: boolean;
  shape: "circle" | "triangle";
  tone: "pink" | "cyan" | "violet";
  rotation: number;
};

export default function CognitionLab() {
  const director = useWorldDirector();
  const scene = resolveScene(director.scene);
  const [signal, setSignal] = useState(72);
  const [noise, setNoise] = useState(34);
  const [expectation, setExpectation] = useState(42);
  const [distractors, setDistractors] = useState(15);
  const [similarity, setSimilarity] = useState(45);
  const [cue, setCue] = useState(55);
  const [span, setSpan] = useState(4);
  const [rehearsal, setRehearsal] = useState(2);
  const [interference, setInterference] = useState(38);
  const [trial, setTrial] = useState(1);
  const [found, setFound] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [elapsed, setElapsed] = useState<number | null>(null);
  const startedAtRef = useRef<number | null>(null);

  const evidence = clamp(signal * 0.72 + (100 - noise) * 0.28, 0, 100);
  const organization = clamp(evidence * 0.78 + expectation * 0.22, 0, 100);
  const selection = clamp(94 - distractors * 1.8 - similarity * 0.36 + cue * 0.34, 4, 98);
  const retention = clamp(34 + rehearsal * 12 + selection * 0.18 - span * 4.4 - interference * 0.38, 3, 98);
  const items = useMemo(
    () => buildSearchItems(trial, distractors, similarity),
    [distractors, similarity, trial],
  );

  useEffect(() => {
    if (scene === "attention") startedAtRef.current = Date.now();
  }, [scene, trial]);

  function newTrial() {
    setTrial((value) => value + 1);
    setFound(false);
    setMistakes(0);
    setElapsed(null);
  }

  return (
    <div className="grid h-full gap-3 xl:grid-cols-[minmax(0,1fr)_320px]">
      <Surface variant="ghost" className="overflow-hidden rounded-[24px]">
        <div className="flex flex-col gap-2 border-b border-white/[0.08] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-pink-200/68">
              <Brain size={14} /> Cognitive model
            </div>
            <h3 className="mt-1 text-[21px] font-semibold tracking-[-0.035em] text-white">
              {sceneTitle(scene)}
            </h3>
          </div>
          <span className="rounded-full border border-white/[0.08] bg-black/[0.20] px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-300/66">
            conceptual, not diagnostic
          </span>
        </div>

        <div className="min-h-[330px] border-b border-white/[0.08] bg-[#0b0712]/72 p-4">
          {scene === "perception" ? (
            <PerceptionStage signal={signal} noise={noise} expectation={expectation} organization={organization} />
          ) : null}
          {scene === "attention" ? (
            <AttentionStage
              items={items}
              found={found}
              onChoose={(item) => {
                if (found) return;
                if (item.target) {
                  setFound(true);
                  setElapsed(
                    startedAtRef.current === null
                      ? null
                      : Date.now() - startedAtRef.current,
                  );
                } else {
                  setMistakes((value) => value + 1);
                }
              }}
            />
          ) : null}
          {scene === "memory" ? (
            <MemoryStage span={span} rehearsal={rehearsal} interference={interference} retention={retention} />
          ) : null}
        </div>

        <div className="grid gap-2 p-3 sm:grid-cols-3">
          {scene === "perception" ? (
            <>
              <Readout label="Sensory evidence" value={`${Math.round(evidence)} / 100`} rgb="34,211,238" />
              <Readout label="Organized signal" value={`${Math.round(organization)} / 100`} rgb="244,114,182" />
              <Readout label="Main pressure" value={noise > 55 ? "noise" : expectation > 65 ? "prior expectation" : "incoming signal"} rgb="167,139,250" />
            </>
          ) : null}
          {scene === "attention" ? (
            <>
              <Readout label="Selection cue" value={`${Math.round(selection)} / 100`} rgb="34,211,238" />
              <Readout label="Mistakes" value={String(mistakes)} rgb="250,204,21" />
              <Readout label="Find time" value={elapsed === null ? "not found" : `${(elapsed / 1000).toFixed(2)} s`} rgb="52,211,153" />
            </>
          ) : null}
          {scene === "memory" ? (
            <>
              <Readout label="Items held" value={String(span)} rgb="34,211,238" />
              <Readout label="Rehearsal cycles" value={String(rehearsal)} rgb="52,211,153" />
              <Readout label="Retention cue" value={`${Math.round(retention)} / 100`} rgb="167,139,250" />
            </>
          ) : null}
        </div>
      </Surface>

      <Surface variant="glass" className="rounded-[24px] p-4">
        <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-cyan-200/68">
          <Gauge size={14} /> Model controls
        </div>
        <p className="mt-2 text-[12px] leading-5 text-slate-300/68">
          These controls show directional relationships from basic cognitive psychology. The numerical readouts are a toy model, not measured human performance.
        </p>

        {scene === "perception" ? (
          <div className="mt-4 grid gap-3">
            <RangeControl label="Signal strength" value={signal} onChange={setSignal} rgb="34,211,238" />
            <RangeControl label="Background noise" value={noise} onChange={setNoise} rgb="244,114,182" />
            <RangeControl label="Expectation / context" value={expectation} onChange={setExpectation} rgb="167,139,250" />
            <Interpretation icon={Eye} title="Perception is constructed from evidence" text="Incoming stimulation matters, but organization and prior context influence which stable interpretation becomes available." />
          </div>
        ) : null}

        {scene === "attention" ? (
          <div className="mt-4 grid gap-3">
            <RangeControl label="Distractor count" value={distractors} min={5} max={28} onChange={setDistractors} rgb="34,211,238" />
            <RangeControl label="Target similarity" value={similarity} onChange={setSimilarity} rgb="244,114,182" />
            <RangeControl label="Cue usefulness" value={cue} onChange={setCue} rgb="52,211,153" />
            <button type="button" onClick={newTrial} className="flex min-h-[42px] items-center justify-center gap-2 rounded-[12px] border border-white/[0.08] bg-black/[0.16] text-[12px] font-semibold text-slate-300 hover:bg-white/[0.04]">
              <RefreshCcw size={14} /> New search trial
            </button>
            <Interpretation icon={Focus} title="Selection becomes harder under competition" text="More distractors and greater target similarity usually require more item-by-item checking. Helpful cues can narrow the search set." />
          </div>
        ) : null}

        {scene === "memory" ? (
          <div className="mt-4 grid gap-3">
            <RangeControl label="Items competing for access" value={span} min={2} max={8} onChange={setSpan} rgb="34,211,238" />
            <RangeControl label="Rehearsal cycles" value={rehearsal} min={0} max={5} onChange={setRehearsal} rgb="52,211,153" />
            <RangeControl label="Interference" value={interference} onChange={setInterference} rgb="244,114,182" />
            <Interpretation icon={Sparkles} title="Working memory is active and limited" text="Maintaining information requires attention. Rehearsal can refresh traces, while competing material increases interference and loss." />
          </div>
        ) : null}
      </Surface>
    </div>
  );
}

function PerceptionStage({
  signal,
  noise,
  expectation,
  organization,
}: {
  signal: number;
  noise: number;
  expectation: number;
  organization: number;
}) {
  const waveCount = 5 + Math.round(signal / 18);
  const noisyDots = 12 + Math.round(noise / 4);
  return (
    <div className="relative h-[300px] overflow-hidden rounded-[20px] border border-white/[0.06] bg-[#071018]/76">
      <div className="absolute inset-y-0 left-0 w-[32%] border-r border-white/[0.06] bg-cyan-300/[0.025]">
        {Array.from({ length: waveCount }, (_, index) => (
          <span key={index} className="absolute left-4 h-px bg-cyan-200/28" style={{ top: `${14 + index * 11}%`, width: `${34 + signal * 0.45}%`, transform: `rotate(${Math.sin(index) * 3}deg)` }} />
        ))}
        {Array.from({ length: noisyDots }, (_, index) => (
          <span key={index} className="absolute h-1 w-1 rounded-full bg-pink-300/35" style={{ left: `${8 + ((index * 37) % 82)}%`, top: `${7 + ((index * 53) % 88)}%` }} />
        ))}
        <span className="absolute bottom-4 left-4 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-cyan-100/54">sensory input</span>
      </div>

      <div className="absolute inset-y-0 left-[32%] w-[34%] border-r border-white/[0.06]">
        <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-200/[0.14] bg-violet-300/[0.025]">
          {Array.from({ length: 8 }, (_, index) => (
            <span key={index} className="absolute left-1/2 top-1/2 h-[2px] origin-left bg-violet-200/28" style={{ width: `${32 + expectation * 0.34}px`, transform: `rotate(${index * 45}deg)` }} />
          ))}
          <span className="absolute inset-12 rounded-[18px] border border-white/[0.10] bg-black/[0.24]" />
        </div>
        <span className="absolute bottom-4 left-4 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-violet-100/54">feature organization</span>
      </div>

      <div className="absolute inset-y-0 right-0 w-[34%]">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative h-40 w-40">
            <span className="absolute left-2 top-6 h-24 w-24 rounded-full border border-pink-200/32 bg-pink-300/[0.08]" />
            <span className="absolute right-2 top-6 h-24 w-24 rounded-full border border-cyan-200/32 bg-cyan-300/[0.08]" />
            <span className="absolute bottom-2 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full border border-violet-200/32 bg-violet-300/[0.08]" />
            <strong className="absolute inset-0 flex items-center justify-center text-[22px] text-white">{Math.round(organization)}%</strong>
          </div>
        </div>
        <span className="absolute bottom-4 left-4 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-pink-100/54">stable percept</span>
      </div>
    </div>
  );
}

function AttentionStage({
  items,
  found,
  onChoose,
}: {
  items: SearchItem[];
  found: boolean;
  onChoose: (item: SearchItem) => void;
}) {
  return (
    <div className="flex h-[300px] flex-col rounded-[20px] border border-white/[0.06] bg-[#0a0711]/76 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-pink-200/62">Visual search</div>
          <p className="mt-1 text-[12px] text-slate-400">Find the pink triangle among the distractors.</p>
        </div>
        <span className={`rounded-full border px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] ${found ? "border-emerald-200/[0.24] text-emerald-200" : "border-white/[0.08] text-slate-500"}`}>{found ? "target found" : "search active"}</span>
      </div>
      <div className="mt-3 grid flex-1 grid-cols-7 gap-2 rounded-[16px] border border-white/[0.05] bg-black/[0.16] p-3">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onChoose(item)}
            className="group flex min-h-[34px] items-center justify-center rounded-[9px] border border-white/[0.035] bg-white/[0.01] hover:bg-white/[0.04]"
            aria-label={item.target ? "Target pink triangle" : "Distractor"}
          >
            <SearchGlyph item={item} reveal={found} />
          </button>
        ))}
      </div>
    </div>
  );
}

function SearchGlyph({ item, reveal }: { item: SearchItem; reveal: boolean }) {
  const tone = item.tone === "pink" ? "rgb(244 114 182)" : item.tone === "cyan" ? "rgb(34 211 238)" : "rgb(167 139 250)";
  if (item.shape === "circle") {
    return <span className="h-4 w-4 rounded-full border-2" style={{ borderColor: tone, boxShadow: reveal && item.target ? `0 0 18px ${tone}` : undefined }} />;
  }
  return (
    <span
      className="block h-0 w-0 border-x-[9px] border-b-[16px] border-x-transparent"
      style={{ borderBottomColor: tone, transform: `rotate(${item.rotation}deg)`, filter: reveal && item.target ? `drop-shadow(0 0 8px ${tone})` : undefined }}
    />
  );
}

function MemoryStage({
  span,
  rehearsal,
  interference,
  retention,
}: {
  span: number;
  rehearsal: number;
  interference: number;
  retention: number;
}) {
  const visibleSlots = Math.min(8, span);
  return (
    <div className="relative h-[300px] overflow-hidden rounded-[20px] border border-white/[0.06] bg-[#080914]/76 p-4">
      <div className="grid h-full grid-cols-[0.8fr_1.2fr_0.9fr] gap-3">
        <div className="flex flex-col justify-center rounded-[16px] border border-cyan-200/[0.10] bg-cyan-300/[0.025] p-3">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-cyan-200/58">Incoming items</div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {Array.from({ length: visibleSlots }, (_, index) => (
              <span key={index} className="flex aspect-square items-center justify-center rounded-[10px] border border-cyan-200/[0.14] bg-black/[0.18] font-mono text-[13px] text-cyan-100/72">{String.fromCharCode(65 + index)}</span>
            ))}
          </div>
        </div>

        <div className="relative flex flex-col justify-center rounded-[16px] border border-violet-200/[0.12] bg-violet-300/[0.025] p-3">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-violet-200/58">Working memory workspace</div>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }, (_, index) => {
              const occupied = index < Math.min(span, 4);
              return (
                <span key={index} className={`flex aspect-square items-center justify-center rounded-[12px] border font-mono text-[14px] ${occupied ? "border-violet-200/[0.30] bg-violet-300/[0.08] text-violet-100" : "border-white/[0.06] bg-black/[0.14] text-slate-700"}`}>{occupied ? String.fromCharCode(65 + index) : "·"}</span>
              );
            })}
          </div>
          <div className="mt-4 flex gap-1.5">
            {Array.from({ length: 5 }, (_, index) => (
              <span key={index} className="h-1.5 flex-1 rounded-full" style={{ background: index < rehearsal ? "rgba(52,211,153,0.62)" : "rgba(255,255,255,0.06)" }} />
            ))}
          </div>
          <span className="mt-2 text-[12px] text-slate-400">Rehearsal refreshes active traces.</span>
        </div>

        <div className="flex flex-col justify-center rounded-[16px] border border-pink-200/[0.10] bg-pink-300/[0.02] p-3">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-pink-200/58">Interference pressure</div>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/[0.06]">
            <div className="h-full rounded-full bg-pink-300/62" style={{ width: `${interference}%` }} />
          </div>
          <div className="mt-5 text-[34px] font-semibold tracking-[-0.05em] text-white">{Math.round(retention)}%</div>
          <span className="mt-1 text-[12px] leading-5 text-slate-400">Directional retention cue in this toy model.</span>
        </div>
      </div>
    </div>
  );
}

function RangeControl({
  label,
  value,
  min = 0,
  max = 100,
  onChange,
  rgb,
}: {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  rgb: string;
}) {
  return (
    <label className="block rounded-[14px] border border-white/[0.08] bg-black/[0.16] p-3">
      <span className="flex items-center justify-between gap-3 text-[12px] text-slate-300">
        <span>{label}</span>
        <strong className="font-mono" style={{ color: `rgb(${rgb})` }}>{value}</strong>
      </span>
      <input type="range" min={min} max={max} value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-3 w-full accent-pink-400" />
    </label>
  );
}

function Interpretation({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Eye;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[15px] border border-pink-200/[0.11] bg-pink-300/[0.03] p-3">
      <div className="flex items-center gap-2 text-[13px] font-semibold text-pink-100"><Icon size={14} /> {title}</div>
      <p className="mt-2 text-[13px] leading-5 text-slate-200/72">{text}</p>
    </div>
  );
}

function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return (
    <div className="min-w-0 rounded-[13px] border border-white/[0.08] bg-black/[0.16] p-3">
      <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-slate-500">{label}</div>
      <div className="mt-1.5 truncate text-[13px] font-semibold" style={{ color: `rgb(${rgb})` }}>{value}</div>
    </div>
  );
}

function buildSearchItems(seed: number, distractors: number, similarity: number): SearchItem[] {
  const random = mulberry32(seed * 197 + distractors * 31 + similarity * 13);
  const count = Math.max(6, distractors + 1);
  const targetIndex = Math.floor(random() * count);
  return Array.from({ length: count }, (_, index) => {
    if (index === targetIndex) return { id: index, target: true, shape: "triangle", tone: "pink", rotation: 0 };
    const similar = random() * 100 < similarity;
    return {
      id: index,
      target: false,
      shape: similar && random() > 0.45 ? "triangle" : "circle",
      tone: similar && random() > 0.55 ? "pink" : random() > 0.5 ? "cyan" : "violet",
      rotation: similar ? (random() > 0.5 ? 90 : 180) : 0,
    };
  });
}

function sceneTitle(scene: PsychologyScene) {
  if (scene === "attention") return "Selective attention under competition";
  if (scene === "memory") return "Working memory, rehearsal, and interference";
  return "Perception from noisy evidence";
}

function resolveScene(scene: string | null): PsychologyScene {
  return scene === "attention" || scene === "memory" ? scene : "perception";
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function mulberry32(seed: number) {
  return () => {
    let value = (seed += 0x6d2b79f5);
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}
