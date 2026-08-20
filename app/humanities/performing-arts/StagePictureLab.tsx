"use client";

import { useMemo, useState } from "react";
import { Eye, Move, Radio, Users } from "lucide-react";
import { Surface } from "@/app/_page-system/scene";

type PerformerId = "A" | "B" | "C";
type FocusId = PerformerId | "ensemble";
type Position = { col: number; row: number };

const PERFORMERS: readonly { id: PerformerId; label: string; rgb: string }[] = [
  { id: "A", label: "Performer A", rgb: "244,63,94" },
  { id: "B", label: "Performer B", rgb: "34,211,238" },
  { id: "C", label: "Performer C", rgb: "251,191,36" },
] as const;

const PRESETS = {
  dialogue: { label: "Two-person exchange", positions: { A: { col: 1, row: 2 }, B: { col: 3, row: 2 }, C: { col: 2, row: 0 } } },
  triangle: { label: "Triangular ensemble", positions: { A: { col: 0, row: 2 }, B: { col: 4, row: 2 }, C: { col: 2, row: 0 } } },
  line: { label: "Shared front line", positions: { A: { col: 1, row: 2 }, B: { col: 2, row: 2 }, C: { col: 3, row: 2 } } },
  depth: { label: "Depth stack", positions: { A: { col: 2, row: 2 }, B: { col: 2, row: 1 }, C: { col: 2, row: 0 } } },
} as const;

const COL_LABELS = ["SL", "L", "C", "R", "SR"];
const ROW_LABELS = ["upstage", "midstage", "downstage"];

export default function StagePictureLab() {
  const [positions, setPositions] = useState<Record<PerformerId, Position>>({ A: { col: 0, row: 2 }, B: { col: 4, row: 2 }, C: { col: 2, row: 0 } });
  const [selected, setSelected] = useState<PerformerId>("A");
  const [focus, setFocus] = useState<FocusId>("ensemble");

  const analysis = useMemo(() => analyzeStagePicture(positions), [positions]);

  function moveSelected(col: number, row: number) {
    setPositions((current) => ({ ...current, [selected]: { col, row } }));
  }

  function applyPreset(key: keyof typeof PRESETS) {
    setPositions(PRESETS[key].positions);
  }

  return (
    <Surface variant="glass" className="overflow-hidden rounded-[30px] border-amber-100/[0.10]" style={{ background: "rgba(8,5,5,0.29)" }}>
      <div className="grid border-b border-white/[0.07] lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-amber-100/56"><Move size={13} /> Blocking & focus laboratory</div>
          <h3 className="mt-2 text-[clamp(1.7rem,2.9vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">Move bodies, then ask what the audience can read.</h3>
          <p className="mt-3 max-w-3xl text-[13px] leading-6 text-stone-400/76">Select a performer and click a stage zone. The lab reports simple geometry from a centered frontal audience viewpoint. It does not score artistic quality, acting, choreography, or the many sightlines of a real venue.</p>
        </div>
        <div className="border-t border-white/[0.07] bg-black/[0.055] p-5 lg:border-l lg:border-t-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-stone-600">Current focus cue</span>
          <strong className="mt-2 block text-[17px] text-amber-100/82">{focus === "ensemble" ? "Ensemble" : `Performer ${focus}`}</strong>
          <p className="mt-2 text-[10px] leading-4 text-stone-600">A light, gesture, line, stillness, sound, framing choice, or movement can all compete to organize attention. This control represents only one abstract focus cue.</p>
        </div>
      </div>

      <div className="grid gap-5 p-4 xl:grid-cols-[190px_minmax(0,1fr)_285px] sm:p-5">
        <div>
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-stone-600">Performer to move</div>
          <div className="mt-3 space-y-2">
            {PERFORMERS.map((performer) => <button key={performer.id} type="button" onClick={() => setSelected(performer.id)} className="flex w-full items-center gap-2 border px-3 py-2.5 text-left transition" style={{ borderColor: selected === performer.id ? `rgba(${performer.rgb},0.34)` : "rgba(255,255,255,0.06)", background: selected === performer.id ? `rgba(${performer.rgb},0.055)` : "rgba(0,0,0,0.03)" }}><span className="flex h-7 w-7 items-center justify-center rounded-full border font-mono text-[10px]" style={{ color: `rgb(${performer.rgb})`, borderColor: `rgba(${performer.rgb},0.28)` }}>{performer.id}</span><strong className="text-[10px] text-white/74">{performer.label}</strong></button>)}
          </div>

          <div className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-stone-600">Stage pictures</div>
          <div className="mt-2 space-y-1.5">{(Object.keys(PRESETS) as Array<keyof typeof PRESETS>).map((key) => <button key={key} type="button" onClick={() => applyPreset(key)} className="w-full border border-white/[0.055] bg-black/[0.025] px-3 py-2 text-left text-[10px] text-stone-500 transition hover:border-amber-100/15 hover:text-stone-300">{PRESETS[key].label}</button>)}</div>

          <div className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-stone-600">Focus cue</div>
          <div className="mt-2 grid grid-cols-2 gap-1.5"><FocusButton value="ensemble" focus={focus} setFocus={setFocus} label="Ensemble" rgb="226,232,240" />{PERFORMERS.map((performer) => <FocusButton key={performer.id} value={performer.id} focus={focus} setFocus={setFocus} label={performer.id} rgb={performer.rgb} />)}</div>
        </div>

        <div className="relative min-h-[430px] overflow-hidden border border-white/[0.065] bg-black/[0.14] p-4">
          <div className="absolute inset-x-[9%] top-[8%] bottom-[16%] border-x-[18px] border-rose-950/25 border-t-[12px] border-t-rose-950/30" />
          <div className="absolute inset-x-[13%] top-[13%] bottom-[20%] bg-[linear-gradient(rgba(251,191,36,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.035)_1px,transparent_1px)] bg-[size:20%_33.333%]" />
          <div className="absolute inset-x-[13%] top-[13%] bottom-[20%] grid grid-cols-5 grid-rows-3">
            {Array.from({ length: 15 }, (_, index) => {
              const row = Math.floor(index / 5);
              const col = index % 5;
              const occupants = PERFORMERS.filter((performer) => positions[performer.id].col === col && positions[performer.id].row === row);
              return (
                <button key={index} type="button" onClick={() => moveSelected(col, row)} className="relative border border-white/[0.028] transition hover:bg-amber-100/[0.025]" aria-label={`Move ${selected} to ${ROW_LABELS[row]} ${COL_LABELS[col]}`}>
                  {occupants.map((performer, performerIndex) => {
                    const focused = focus === "ensemble" || focus === performer.id;
                    return <span key={performer.id} className="absolute flex h-8 w-8 items-center justify-center rounded-full border font-mono text-[11px] font-bold transition" style={{ left: `calc(50% - 16px + ${performerIndex * 12}px)`, top: `calc(50% - 16px + ${performerIndex * 9}px)`, color: `rgb(${performer.rgb})`, borderColor: `rgba(${performer.rgb},${focused ? 0.64 : 0.24})`, background: `rgba(${performer.rgb},${focused ? 0.16 : 0.05})`, boxShadow: focused && focus !== "ensemble" ? `0 0 28px rgba(${performer.rgb},0.24)` : undefined }}>{performer.id}</span>;
                  })}
                  <span className="absolute bottom-1 left-1 font-mono text-[8px] text-stone-700">{row === 2 ? COL_LABELS[col] : ""}</span>
                </button>
              );
            })}
          </div>
          <div className="absolute inset-x-[13%] bottom-[8%] text-center"><div className="mx-auto h-px w-[80%] bg-stone-500/12" /><div className="mt-2 flex items-center justify-center gap-2 font-mono text-[9px] uppercase tracking-[0.08em] text-stone-700"><Users size={11} /> centered audience viewpoint</div></div>
          {focus !== "ensemble" ? <div className="pointer-events-none absolute left-1/2 top-[8%] h-[66%] w-[40%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(254,240,138,0.06),transparent_62%)]" /> : null}
        </div>

        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-stone-600"><Eye size={12} /> Geometry readout</div>
          <div className="mt-3 space-y-2">
            <Readout label="Closest pair" value={`${analysis.closestPair} · ${analysis.closestDistance.toFixed(1)} zones`} note="Schematic center-to-center distance between occupied stage zones." rgb="251,191,36" />
            <Readout label="Depth layers used" value={`${analysis.depthLayers} / 3`} note="Number of upstage/midstage/downstage rows currently occupied." rgb="167,139,250" />
            <Readout label="Frontal column overlaps" value={String(analysis.columnOverlaps)} note="Pairs sharing the same left-right column. From a centered frontal viewpoint, depth stacking can partly hide one body behind another." rgb="34,211,238" />
            <Readout label="Shared cells" value={String(analysis.sharedCells)} note="Performers occupying the same schematic zone. Real blocking can of course include close contact, partnering, and intentional clustering." rgb="244,63,94" />
          </div>
          <div className="mt-5 border-t border-white/[0.06] pt-3">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.07em] text-stone-600"><Radio size={11} /> Rehearsal questions</div>
            <ul className="mt-2 space-y-2 text-[10px] leading-4 text-stone-600">
              <li>• Where should the audience look first, and what else competes for attention?</li>
              <li>• What changes when the same composition is viewed from side seats or a different venue?</li>
              <li>• Does movement reveal a relationship, create a transition, solve a sightline, or merely add motion?</li>
              <li>• How do light, sound, text, costume, scenery, and performer timing reinforce or contradict the stage picture?</li>
            </ul>
          </div>
        </div>
      </div>
    </Surface>
  );
}

function FocusButton({ value, focus, setFocus, label, rgb }: { value: FocusId; focus: FocusId; setFocus: (value: FocusId) => void; label: string; rgb: string }) {
  const active = focus === value;
  return <button type="button" onClick={() => setFocus(value)} className="border px-2 py-2 text-[10px] font-semibold transition" style={{ color: active ? `rgb(${rgb})` : "rgba(168,162,158,0.66)", borderColor: active ? `rgba(${rgb},0.30)` : "rgba(255,255,255,0.055)", background: active ? `rgba(${rgb},0.05)` : "rgba(0,0,0,0.02)" }}>{label}</button>;
}

function Readout({ label, value, note, rgb }: { label: string; value: string; note: string; rgb: string }) {
  return <div className="border-l-2 bg-black/[0.035] px-3 py-2.5" style={{ borderColor: `rgba(${rgb},0.28)` }}><div className="flex items-center justify-between gap-3"><span className="text-[10px] text-stone-500">{label}</span><strong className="font-mono text-[10px]" style={{ color: `rgba(${rgb},0.68)` }}>{value}</strong></div><p className="mt-1 text-[9px] leading-4 text-stone-700">{note}</p></div>;
}

function analyzeStagePicture(positions: Record<PerformerId, Position>) {
  const pairs: readonly [PerformerId, PerformerId][] = [["A", "B"], ["A", "C"], ["B", "C"]];
  const distances = pairs.map(([a, b]) => ({ pair: `${a}–${b}`, distance: Math.hypot(positions[a].col - positions[b].col, positions[a].row - positions[b].row) }));
  const closest = distances.reduce((best, current) => current.distance < best.distance ? current : best, distances[0]);
  const depthLayers = new Set(PERFORMERS.map((performer) => positions[performer.id].row)).size;
  const columnOverlaps = pairs.filter(([a, b]) => positions[a].col === positions[b].col).length;
  const sharedCells = pairs.filter(([a, b]) => positions[a].col === positions[b].col && positions[a].row === positions[b].row).length;
  return { closestPair: closest.pair, closestDistance: closest.distance, depthLayers, columnOverlaps, sharedCells };
}
