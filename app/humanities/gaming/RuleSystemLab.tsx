"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Footprints, Goal, Grid3X3, Route } from "lucide-react";
import { Surface } from "@/app/_page-system/scene";

type RuleKey = "orthogonal" | "diagonal" | "jump";
type Cell = { row: number; col: number };

type Rule = {
  key: RuleKey;
  label: string;
  rgb: string;
  description: string;
  offsets: readonly [number, number][];
};

const SIZE = 7;
const START: Cell = { row: 5, col: 1 };
const GOAL: Cell = { row: 1, col: 5 };
const BLOCKERS = new Set(["1,1", "2,4", "3,2", "4,4", "5,3"]);

const RULES: readonly Rule[] = [
  {
    key: "orthogonal",
    label: "Orthogonal step",
    rgb: "34,211,238",
    description: "One square up, down, left, or right. Diagonal adjacency does not count as a legal move.",
    offsets: [[-1,0],[1,0],[0,-1],[0,1]],
  },
  {
    key: "diagonal",
    label: "Eight-way step",
    rgb: "192,132,252",
    description: "One square in any of eight neighboring directions. The board is unchanged, but adjacency has been redefined.",
    offsets: [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]],
  },
  {
    key: "jump",
    label: "Knight-like jump",
    rgb: "251,146,60",
    description: "Move two squares along one axis and one along the other. Intermediate cells do not matter, so blockers constrain play differently.",
    offsets: [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]],
  },
] as const;

export default function RuleSystemLab() {
  const [ruleKey, setRuleKey] = useState<RuleKey>("orthogonal");
  const [budget, setBudget] = useState(5);
  const rule = useMemo(() => RULES.find((item) => item.key === ruleKey) ?? RULES[0], [ruleKey]);
  const analysis = useMemo(() => explore(rule, budget), [rule, budget]);

  return (
    <Surface variant="glass" className="overflow-hidden rounded-[30px] border-fuchsia-100/[0.12]" style={{ background: "rgba(9,8,21,0.22)" }}>
      <div className="grid border-b border-white/[0.07] lg:grid-cols-[minmax(0,1fr)_310px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-cyan-200/62"><Grid3X3 size={14} /> Rule system laboratory</div>
          <h3 className="mt-2 text-[clamp(1.7rem,2.9vw,2.65rem)] font-semibold tracking-[-0.045em] text-white">Keep the board. Change the rule. Watch possibility move.</h3>
          <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400/78">The start, goal, and blocked cells never move. Only the movement rule and action budget change. Reachability is calculated with breadth-first search, so the board reveals exactly which positions can be reached within the current number of actions.</p>
        </div>
        <div className="border-t border-white/[0.07] bg-black/[0.06] p-5 backdrop-blur-[10px] lg:border-l lg:border-t-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.07em] text-slate-600">Current rule</span>
          <strong className="mt-2 block text-[17px] text-white/88">{rule.label}</strong>
          <p className="mt-2 text-[11px] leading-5 text-slate-500">{rule.description}</p>
        </div>
      </div>

      <div className="grid gap-5 p-4 sm:p-5 xl:grid-cols-[220px_minmax(0,1fr)_270px]">
        <div>
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-600">Movement grammar</div>
          <div className="mt-3 grid gap-2 sm:grid-cols-3 xl:grid-cols-1">
            {RULES.map((item) => {
              const selected = item.key === ruleKey;
              return <button key={item.key} type="button" onClick={() => setRuleKey(item.key)} className="border px-3 py-3 text-left transition" style={{ borderColor: selected ? `rgba(${item.rgb},0.34)` : "rgba(255,255,255,0.06)", background: selected ? `rgba(${item.rgb},0.06)` : "rgba(0,0,0,0.035)" }}><strong className="text-[12px]" style={{ color: selected ? `rgb(${item.rgb})` : "rgba(226,232,240,0.74)" }}>{item.label}</strong><span className="mt-1 block text-[10px] leading-4 text-slate-600">{item.description}</span></button>;
            })}
          </div>
          <label className="mt-5 block border-t border-white/[0.07] pt-4">
            <span className="flex items-center justify-between gap-3 text-[11px]"><strong className="text-slate-300">Action budget</strong><span className="font-mono" style={{ color: `rgba(${rule.rgb},0.72)` }}>{budget} moves</span></span>
            <input type="range" min="1" max="10" value={budget} onChange={(event) => setBudget(Number(event.target.value))} className="mt-3 h-1.5 w-full cursor-pointer accent-cyan-400" />
          </label>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[490px] overflow-hidden border border-white/[0.07] bg-[#070914]/56 p-3 backdrop-blur-[8px]">
          <div className="grid h-full w-full grid-cols-7 grid-rows-7 gap-1">
            {Array.from({ length: SIZE * SIZE }, (_, index) => {
              const row = Math.floor(index / SIZE);
              const col = index % SIZE;
              const key = `${row},${col}`;
              const blocked = BLOCKERS.has(key);
              const start = row === START.row && col === START.col;
              const goal = row === GOAL.row && col === GOAL.col;
              const distance = analysis.distance.get(key);
              const reachable = distance !== undefined && distance <= budget;
              const onShortest = analysis.pathKeys.has(key);
              const alpha = reachable ? Math.max(0.035, 0.17 - (distance ?? 0) * 0.014) : 0;
              return (
                <div key={key} className="relative flex items-center justify-center border" style={{ borderColor: blocked ? "rgba(248,113,113,0.20)" : onShortest ? `rgba(${rule.rgb},0.38)` : "rgba(255,255,255,0.055)", background: blocked ? "rgba(248,113,113,0.055)" : reachable ? `rgba(${rule.rgb},${alpha})` : "rgba(255,255,255,0.014)" }}>
                  {distance !== undefined && !start && !blocked ? <span className="absolute right-1 top-1 font-mono text-[8px]" style={{ color: `rgba(${rule.rgb},0.34)` }}>{distance}</span> : null}
                  {blocked ? <span className="h-[36%] w-[36%] rotate-45 border border-red-300/30 bg-red-300/[0.05]" /> : null}
                  {start ? <span className="flex h-7 w-7 items-center justify-center rounded-full border border-cyan-300/45 bg-cyan-300/[0.10] text-cyan-200"><Footprints size={12} /></span> : null}
                  {goal ? <span className="flex h-7 w-7 items-center justify-center rounded-full border border-emerald-300/45 bg-emerald-300/[0.10] text-emerald-200"><Goal size={12} /></span> : null}
                </div>
              );
            })}
          </div>
          <div className="pointer-events-none absolute bottom-3 left-3 border border-white/[0.07] bg-black/35 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.05em] text-slate-500">cell number = minimum moves from start</div>
        </div>

        <div>
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-600">State-space readout</div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Metric label="Reachable" value={`${analysis.reachableCount} / ${SIZE * SIZE - BLOCKERS.size}`} rgb={rule.rgb} />
            <Metric label="Coverage" value={`${Math.round((analysis.reachableCount / (SIZE * SIZE - BLOCKERS.size)) * 100)}%`} rgb={rule.rgb} />
            <Metric label="Goal distance" value={analysis.goalDistance === undefined ? "unreachable" : `${analysis.goalDistance} moves`} rgb="52,211,153" />
            <Metric label="Within budget" value={analysis.goalDistance !== undefined && analysis.goalDistance <= budget ? "yes" : "no"} rgb={analysis.goalDistance !== undefined && analysis.goalDistance <= budget ? "52,211,153" : "248,113,113"} />
          </div>
          <div className="mt-4 border-l-2 px-3 py-3" style={{ borderColor: `rgba(${rule.rgb},0.30)`, background: `rgba(${rule.rgb},0.035)` }}>
            <span className="font-mono text-[10px] uppercase tracking-[0.07em]" style={{ color: `rgba(${rule.rgb},0.60)` }}>What changed?</span>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">The board did not change. The objects did not change. A rule changed which transitions were legal, which changed reachability, shortest paths, the meaning of blockers, and the value of positions.</p>
          </div>
          <div className="mt-3 flex items-start gap-2 text-[10px] leading-4 text-slate-600"><Route size={11} className="mt-0.5 shrink-0" /><span>The highlighted shortest path is only one consequence of the rule system. It is not a claim about what makes a game fun, fair, elegant, or strategically deep.</span></div>
          <div className="mt-3 flex items-center gap-2 text-[10px] text-slate-600"><ArrowRight size={11} /> Rule → legal transition → new state.</div>
        </div>
      </div>
    </Surface>
  );
}

function explore(rule: Rule, budget: number) {
  const startKey = `${START.row},${START.col}`;
  const goalKey = `${GOAL.row},${GOAL.col}`;
  const distance = new Map<string, number>([[startKey, 0]]);
  const previous = new Map<string, string>();
  const queue: Cell[] = [START];

  for (let head = 0; head < queue.length; head += 1) {
    const current = queue[head];
    const currentKey = `${current.row},${current.col}`;
    const currentDistance = distance.get(currentKey) ?? 0;
    for (const [dr, dc] of rule.offsets) {
      const row = current.row + dr;
      const col = current.col + dc;
      if (row < 0 || row >= SIZE || col < 0 || col >= SIZE) continue;
      const key = `${row},${col}`;
      if (BLOCKERS.has(key) || distance.has(key)) continue;
      distance.set(key, currentDistance + 1);
      previous.set(key, currentKey);
      queue.push({ row, col });
    }
  }

  const goalDistance = distance.get(goalKey);
  const pathKeys = new Set<string>();
  if (goalDistance !== undefined) {
    let cursor: string | undefined = goalKey;
    while (cursor) {
      pathKeys.add(cursor);
      cursor = previous.get(cursor);
    }
  }
  let reachableCount = 0;
  distance.forEach((value) => { if (value <= budget) reachableCount += 1; });
  return { distance, goalDistance, pathKeys, reachableCount };
}

function Metric({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return <div className="border border-white/[0.06] bg-black/[0.04] px-3 py-3"><span className="font-mono text-[9px] uppercase tracking-[0.06em] text-slate-600">{label}</span><strong className="mt-1 block text-[13px]" style={{ color: `rgba(${rgb},0.82)` }}>{value}</strong></div>;
}
