"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Crosshair, Move, Users } from "lucide-react";
import { Surface } from "@/app/_page-system/scene";

type ShapeKey = "compact" | "width" | "overload" | "transition";

type Player = { x: number; y: number; role: "team" | "opponent"; emphasis?: boolean };

type Shape = {
  key: ShapeKey;
  label: string;
  rgb: string;
  question: string;
  description: string;
  players: readonly Player[];
  reads: readonly [string, string][];
};

const SHAPES: readonly Shape[] = [
  {
    key: "compact",
    label: "Compact support",
    rgb: "52,211,153",
    question: "What changes when teammates stay close enough to support one another?",
    description: "Shorter passing and covering distances can improve local support, but a compact shape may leave less width and can concentrate opponents around the same space.",
    players: [
      { x: 27, y: 52, role: "team" }, { x: 38, y: 39, role: "team" }, { x: 39, y: 65, role: "team" }, { x: 51, y: 51, role: "team", emphasis: true },
      { x: 63, y: 38, role: "opponent" }, { x: 66, y: 60, role: "opponent" }, { x: 77, y: 49, role: "opponent" },
    ],
    reads: [["Support distance", "short"], ["Width", "limited"], ["Local options", "dense"], ["Exposure", "far side space"]],
  },
  {
    key: "width",
    label: "Create width",
    rgb: "96,165,250",
    question: "What changes when the attacking shape stretches the playing area?",
    description: "Wide positions can force an opponent to defend a larger horizontal span, opening interior lanes or isolated matchups. The tradeoff is longer support distance if possession is lost.",
    players: [
      { x: 18, y: 22, role: "team" }, { x: 28, y: 72, role: "team" }, { x: 47, y: 49, role: "team", emphasis: true }, { x: 74, y: 20, role: "team" },
      { x: 58, y: 38, role: "opponent" }, { x: 61, y: 58, role: "opponent" }, { x: 72, y: 48, role: "opponent" },
    ],
    reads: [["Support distance", "mixed"], ["Width", "high"], ["Interior lanes", "possible"], ["Exposure", "long recoveries"]],
  },
  {
    key: "overload",
    label: "Local overload",
    rgb: "251,146,60",
    question: "What changes when more attackers are concentrated around one side or matchup?",
    description: "An overload can create a local numerical or positional advantage. It also leaves another area intentionally underoccupied, which can become useful space or a vulnerability depending on the next action.",
    players: [
      { x: 43, y: 27, role: "team" }, { x: 54, y: 35, role: "team" }, { x: 50, y: 53, role: "team", emphasis: true }, { x: 62, y: 45, role: "team" },
      { x: 67, y: 31, role: "opponent" }, { x: 69, y: 51, role: "opponent" }, { x: 78, y: 41, role: "opponent" },
    ],
    reads: [["Local numbers", "high"], ["Far side", "underloaded"], ["Combination options", "dense"], ["Next question", "switch or penetrate?"]],
  },
  {
    key: "transition",
    label: "Transition",
    rgb: "244,114,182",
    question: "What changes when possession or initiative changes before both sides are organized?",
    description: "Transitions temporarily scramble established spacing. The important relationships can become direction, recovery, immediate support, available space, and whether the opponent is balanced or stretched.",
    players: [
      { x: 32, y: 54, role: "team" }, { x: 46, y: 37, role: "team", emphasis: true }, { x: 54, y: 67, role: "team" }, { x: 67, y: 47, role: "team" },
      { x: 59, y: 26, role: "opponent" }, { x: 69, y: 58, role: "opponent" }, { x: 82, y: 39, role: "opponent" },
    ],
    reads: [["Organization", "changing"], ["Open space", "temporary"], ["Decision speed", "important"], ["Direction", "strong"]],
  },
] as const;

export default function TacticalSpacingLab() {
  const [shapeKey, setShapeKey] = useState<ShapeKey>("width");
  const shape = useMemo(() => SHAPES.find((item) => item.key === shapeKey) ?? SHAPES[1], [shapeKey]);

  return (
    <Surface variant="glass" className="overflow-hidden rounded-[30px] border-emerald-100/[0.12]" style={{ background: "rgba(4,13,10,0.20)" }}>
      <div className="grid border-b border-white/[0.07] lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-orange-200/62"><Crosshair size={14} /> Tactical spacing board</div>
          <h3 className="mt-2 text-[clamp(1.65rem,2.8vw,2.6rem)] font-semibold tracking-[-0.045em] text-white">Rules stay fixed. Spatial relationships change.</h3>
          <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400/78">These are schematic shapes for invasion-style team games, not prescribed formations. They make spacing, support, overload, width, and transition visible without pretending soccer, basketball, hockey, football, lacrosse, and other sports use the same tactics.</p>
        </div>
        <div className="border-t border-white/[0.07] bg-black/[0.06] p-5 backdrop-blur-[10px] lg:border-l lg:border-t-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.07em] text-slate-600">Current question</span>
          <strong className="mt-2 block text-[16px] leading-6 text-white/88">{shape.question}</strong>
        </div>
      </div>

      <div className="grid gap-5 p-4 sm:p-5 xl:grid-cols-[210px_minmax(0,1fr)_250px]">
        <div>
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-600">Shape library</div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
            {SHAPES.map((item) => {
              const selected = item.key === shapeKey;
              return <button key={item.key} type="button" onClick={() => setShapeKey(item.key)} className="flex items-center gap-3 border px-3 py-3 text-left transition" style={{ borderColor: selected ? `rgba(${item.rgb},0.34)` : "rgba(255,255,255,0.06)", background: selected ? `rgba(${item.rgb},0.06)` : "rgba(0,0,0,0.035)" }}><span className="flex h-8 w-8 items-center justify-center rounded-full border" style={{ color: `rgb(${item.rgb})`, borderColor: `rgba(${item.rgb},0.25)` }}><Move size={13} /></span><strong className="text-[12px] text-white/80">{item.label}</strong></button>;
            })}
          </div>
        </div>

        <div className="relative min-h-[390px] overflow-hidden border border-white/[0.07] bg-[#06110d]/44 backdrop-blur-[8px]">
          <Pitch />
          {shape.players.map((player, index) => <PlayerMarker key={`${shape.key}-${index}`} player={player} rgb={shape.rgb} index={index} />)}
          <div className="absolute left-[49%] top-[47%] flex h-4 w-4 items-center justify-center rounded-full border border-amber-100/45 bg-amber-200/22 shadow-[0_0_14px_rgba(251,191,36,0.22)]"><span className="h-1.5 w-1.5 rounded-full bg-amber-100/80" /></div>
          {shape.key === "transition" ? <div className="absolute left-[45%] top-[38%] w-[31%] border-t border-dashed border-pink-300/30 after:absolute after:-right-1 after:-top-[4px] after:h-2 after:w-2 after:rotate-45 after:border-r after:border-t after:border-pink-300/40" /> : null}
          <div className="absolute inset-x-4 bottom-4 border-t border-white/[0.07] pt-3 text-[12px] leading-5 text-slate-400/72">{shape.description}</div>
        </div>

        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-600"><Users size={12} /> Read the relationships</div>
          <div className="mt-3 divide-y divide-white/[0.06] border-y border-white/[0.07]">
            {shape.reads.map(([label, value]) => <div key={label} className="grid grid-cols-[minmax(0,1fr)_110px] gap-3 py-3"><span className="text-[11px] text-slate-500">{label}</span><strong className="text-right text-[11px] text-white/78">{value}</strong></div>)}
          </div>
          <div className="mt-4 border-l-2 px-3 py-3" style={{ borderColor: `rgba(${shape.rgb},0.34)`, background: `rgba(${shape.rgb},0.04)` }}>
            <span className="font-mono text-[10px] uppercase tracking-[0.07em]" style={{ color: `rgba(${shape.rgb},0.62)` }}>Tactical reading</span>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">A shape is never good by itself. Its value depends on rules, opponent behavior, game state, athlete capabilities, risk, timing, and what happens after the next action.</p>
          </div>
          <div className="mt-3 flex items-center gap-2 text-[10px] text-slate-600"><ArrowRight size={11} /> Watch relationships, not dots.</div>
        </div>
      </div>
    </Surface>
  );
}

function Pitch() {
  return <svg className="absolute inset-[5%_4%_21%_4%] h-[74%] w-[92%]" viewBox="0 0 1000 560" preserveAspectRatio="none" aria-hidden="true"><rect x="20" y="20" width="960" height="520" rx="22" fill="rgba(16,185,129,0.025)" stroke="rgba(110,231,183,0.22)" strokeWidth="2" /><line x1="500" y1="20" x2="500" y2="540" stroke="rgba(110,231,183,0.16)" strokeWidth="2" /><ellipse cx="500" cy="280" rx="85" ry="85" fill="none" stroke="rgba(110,231,183,0.14)" strokeWidth="2" /><rect x="20" y="150" width="145" height="260" fill="none" stroke="rgba(110,231,183,0.13)" strokeWidth="2" /><rect x="835" y="150" width="145" height="260" fill="none" stroke="rgba(110,231,183,0.13)" strokeWidth="2" /><path d="M20 280h-16M980 280h16" stroke="rgba(251,191,36,0.18)" strokeWidth="4" /></svg>;
}

function PlayerMarker({ player, rgb, index }: { player: Player; rgb: string; index: number }) {
  const team = player.role === "team";
  return <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${player.x}%`, top: `${player.y}%` }}><div className="flex h-7 w-7 items-center justify-center rounded-full border font-mono text-[9px] font-semibold shadow-[0_0_14px_rgba(0,0,0,0.3)]" style={{ borderColor: team ? `rgba(${rgb},0.65)` : "rgba(96,165,250,0.45)", color: team ? `rgb(${rgb})` : "rgba(191,219,254,0.82)", background: team ? `rgba(${rgb},${player.emphasis ? 0.18 : 0.08})` : "rgba(59,130,246,0.08)" }}>{team ? index + 1 : "D"}</div>{player.emphasis ? <div className="absolute inset-[-6px] rounded-full border" style={{ borderColor: `rgba(${rgb},0.16)` }} /> : null}</div>;
}
