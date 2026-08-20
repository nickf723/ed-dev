"use client";

import { useMemo, useState } from "react";
import { Grid3X3, RotateCcw } from "lucide-react";

type RuleNumber = 30 | 90 | 110;

const RULES: readonly { rule: RuleNumber; label: string; note: string }[] = [
  { rule: 30, label: "Rule 30", note: "Simple local update, irregular-looking global pattern." },
  { rule: 90, label: "Rule 90", note: "A local XOR-like rule produces a nested triangular pattern." },
  { rule: 110, label: "Rule 110", note: "Persistent structures and interactions emerge from the same repeated neighborhood rule." },
] as const;

const WIDTH = 61;
const GENERATIONS = 34;

export default function LocalRuleLab() {
  const [rule, setRule] = useState<RuleNumber>(30);
  const [seedOffset, setSeedOffset] = useState(0);

  const rows = useMemo(() => evolve(rule, seedOffset), [rule, seedOffset]);
  const activeCount = rows.reduce((total, row) => total + row.filter(Boolean).length, 0);

  return (
    <section className="overflow-hidden rounded-[24px] border border-orange-100/[0.10] bg-[#100b07]/68 backdrop-blur-xl">
      <div className="grid gap-3 border-b border-white/[0.07] p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-orange-200/68"><Grid3X3 size={13} /> Local-rule laboratory</div>
          <h3 className="mt-2 text-[21px] font-semibold tracking-[-0.035em] text-white">No cell sees the whole pattern.</h3>
        </div>
        <button type="button" onClick={() => { setRule(30); setSeedOffset(0); }} className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.06em] text-slate-400 hover:text-white"><RotateCcw size={11} /> reset</button>
      </div>

      <div className="grid gap-5 p-4 xl:grid-cols-[220px_minmax(0,1fr)_280px] sm:p-5">
        <div>
          <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.07em] text-slate-500">Choose one local rule</div>
          <div className="mt-3 space-y-2">
            {RULES.map((item) => {
              const active = item.rule === rule;
              return (
                <button key={item.rule} type="button" onClick={() => setRule(item.rule)} className="w-full rounded-[14px] border p-3 text-left transition" style={{ borderColor: active ? "rgba(251,146,60,0.30)" : "rgba(255,255,255,0.06)", background: active ? "rgba(251,146,60,0.055)" : "rgba(0,0,0,0.04)" }}>
                  <strong className="text-[12px] text-white/86">{item.label}</strong>
                  <span className="mt-1 block text-[10px] leading-4 text-slate-500">{item.note}</span>
                </button>
              );
            })}
          </div>

          <label className="mt-4 block rounded-[14px] border border-white/[0.06] bg-black/[0.10] p-3">
            <div className="flex justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.05em] text-slate-500"><span>move initial seed</span><span>{seedOffset > 0 ? `+${seedOffset}` : seedOffset}</span></div>
            <input type="range" min={-12} max={12} step={1} value={seedOffset} onChange={(event) => setSeedOffset(Number(event.target.value))} className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-orange-400" aria-label="Move initial active cell" />
          </label>
        </div>

        <div className="overflow-hidden rounded-[18px] border border-white/[0.07] bg-[#050403] p-2">
          <div className="grid gap-[1px]" style={{ gridTemplateColumns: `repeat(${WIDTH}, minmax(0, 1fr))` }} aria-label={`${GENERATIONS} generations of elementary cellular automaton rule ${rule}`}>
            {rows.flatMap((row, y) => row.map((active, x) => (
              <span key={`${x}-${y}`} className="aspect-square" style={{ background: active ? "rgba(251,146,60,0.90)" : "rgba(255,255,255,0.018)" }} />
            )))}
          </div>
        </div>

        <aside className="xl:sticky xl:top-[172px] xl:self-start">
          <div className="rounded-[17px] border border-white/[0.07] bg-black/[0.12] p-4">
            <div className="font-mono text-[9px] uppercase tracking-[0.06em] text-slate-500">Global readout</div>
            <strong className="mt-2 block text-[28px] text-orange-200">{activeCount}</strong>
            <span className="text-[10px] text-slate-500">active cell-generations in this display</span>
          </div>
          <div className="mt-3 border-l-2 border-orange-300/30 pl-3">
            <strong className="text-[11px] text-orange-100/80">What is emergent here?</strong>
            <p className="mt-1 text-[11px] leading-5 text-slate-500">Each cell only reads its immediate left, center, and right neighbors from the previous row. Triangles, irregular regions, and persistent structures are properties of the repeated interaction, not instructions stored in any individual cell.</p>
          </div>
          <div className="mt-4 rounded-[14px] border border-white/[0.06] bg-black/[0.10] p-3">
            <div className="font-mono text-[9px] uppercase tracking-[0.06em] text-slate-500">Rule {rule}</div>
            <div className="mt-2 grid grid-cols-4 gap-1">
              {ruleTable(rule).map((item) => <div key={item.neighborhood} className="rounded-[8px] border border-white/[0.05] p-1.5 text-center"><div className="font-mono text-[8px] text-slate-500">{item.neighborhood}</div><div className={`mt-1 mx-auto h-2.5 w-2.5 rounded-sm ${item.output ? "bg-orange-300" : "bg-slate-800"}`} /></div>)}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function evolve(rule: RuleNumber, seedOffset: number) {
  const rows: boolean[][] = [];
  let row = Array.from({ length: WIDTH }, () => false);
  const center = Math.max(0, Math.min(WIDTH - 1, Math.floor(WIDTH / 2) + seedOffset));
  row[center] = true;
  rows.push(row);

  for (let generation = 1; generation < GENERATIONS; generation++) {
    const next = Array.from({ length: WIDTH }, () => false);
    for (let x = 0; x < WIDTH; x++) {
      const left = row[(x - 1 + WIDTH) % WIDTH] ? 1 : 0;
      const centerValue = row[x] ? 1 : 0;
      const right = row[(x + 1) % WIDTH] ? 1 : 0;
      const index = (left << 2) | (centerValue << 1) | right;
      next[x] = ((rule >> index) & 1) === 1;
    }
    row = next;
    rows.push(row);
  }
  return rows;
}

function ruleTable(rule: RuleNumber) {
  return [7, 6, 5, 4, 3, 2, 1, 0].map((index) => ({ neighborhood: index.toString(2).padStart(3, "0"), output: ((rule >> index) & 1) === 1 }));
}
