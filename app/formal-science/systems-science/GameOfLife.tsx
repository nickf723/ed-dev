"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, RefreshCw, SkipForward, Sparkles } from "lucide-react";
import { Surface } from "@/app/_page-system/scene";

const ROWS = 22;
const COLS = 34;

type Grid = number[][];
type SeedKey = "glider" | "oscillators" | "random";

const NEIGHBORS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1], [0, 1],
  [1, -1], [1, 0], [1, 1],
] as const;

export default function GameOfLife() {
  const [seedKey, setSeedKey] = useState<SeedKey>("glider");
  const [grid, setGrid] = useState<Grid>(() => makeSeed("glider"));
  const [generation, setGeneration] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const population = useMemo(() => grid.reduce((sum, row) => sum + row.reduce((rowSum, cell) => rowSum + cell, 0), 0), [grid]);

  const step = useCallback(() => {
    setGrid((current) => nextGeneration(current));
    setGeneration((value) => value + 1);
  }, []);

  useEffect(() => {
    if (!running) return;
    timerRef.current = setInterval(step, 220);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [running, step]);

  const loadSeed = (key: SeedKey) => {
    setSeedKey(key);
    setGrid(makeSeed(key));
    setGeneration(0);
    setRunning(false);
  };

  const toggleCell = (row: number, col: number) => {
    setRunning(false);
    setGrid((current) => current.map((line, r) => line.map((cell, c) => r === row && c === col ? 1 - cell : cell)));
  };

  return (
    <Surface variant="glass" className="overflow-hidden rounded-[30px] border-red-100/[0.12]" style={{ background: "rgba(14,7,9,0.24)" }}>
      <div className="grid border-b border-red-100/[0.08] lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-red-200/60"><Sparkles size={14} /> Cellular automaton · local-rule emergence</div>
          <h3 className="mt-2 text-[clamp(1.7rem,2.8vw,2.7rem)] font-semibold tracking-[-0.045em] text-white">Can a global pattern persist when no cell knows the global pattern exists?</h3>
          <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400/72">Conway’s Game of Life updates every cell using only its eight neighbors. The board is finite here, with dead cells beyond the edge, so boundary behavior differs from an infinite plane.</p>
        </div>
        <div className="border-t border-red-100/[0.08] bg-black/[0.07] p-5 backdrop-blur-[12px] lg:border-l lg:border-t-0">
          <div className="grid grid-cols-2 gap-3"><Readout label="Generation" value={String(generation)} /><Readout label="Population" value={String(population)} /></div>
          <p className="mt-3 text-[11px] leading-5 text-slate-500">Emergence does not mean “unpredictable” or “magical.” It means system-level patterns can arise from repeated local interactions without being specified as a global rule.</p>
        </div>
      </div>

      <div className="grid gap-4 p-4 xl:grid-cols-[230px_minmax(0,1fr)] sm:p-5">
        <div>
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">Seed patterns</div>
          <div className="mt-3 grid gap-2 sm:grid-cols-3 xl:grid-cols-1">
            <SeedButton selected={seedKey === "glider"} onClick={() => loadSeed("glider")} label="Glider" note="small translating pattern" />
            <SeedButton selected={seedKey === "oscillators"} onClick={() => loadSeed("oscillators")} label="Oscillators" note="periodic local structures" />
            <SeedButton selected={seedKey === "random"} onClick={() => loadSeed("random")} label="Dense seed" note="deterministic pseudo-random field" />
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/[0.07] pt-5">
            <button type="button" onClick={() => setRunning((value) => !value)} className="flex items-center justify-center gap-2 border border-red-300/20 bg-red-500/[0.07] px-2 py-2 text-[11px] font-semibold text-red-100/80 transition hover:bg-red-500/[0.12]">{running ? <Pause size={13} /> : <Play size={13} />}{running ? "Pause" : "Run"}</button>
            <button type="button" onClick={step} className="flex items-center justify-center gap-2 border border-white/[0.08] bg-black/[0.06] px-2 py-2 text-[11px] text-slate-400 transition hover:text-white"><SkipForward size={13} /> Step</button>
            <button type="button" onClick={() => loadSeed(seedKey)} className="flex items-center justify-center gap-2 border border-white/[0.08] bg-black/[0.06] px-2 py-2 text-[11px] text-slate-400 transition hover:text-white"><RefreshCw size={13} /> Reset</button>
          </div>

          <div className="mt-5 border-l-2 border-red-300/20 pl-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.07em] text-slate-600">Rules</span>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">A live cell survives with 2 or 3 live neighbors. A dead cell becomes live with exactly 3. All other cells are dead next generation.</p>
          </div>
        </div>

        <div className="relative overflow-hidden border border-white/[0.07] bg-black/[0.14] p-2 sm:p-3">
          <div className="grid w-full" style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}>
            {grid.map((row, rowIndex) => row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                type="button"
                aria-label={`Cell row ${rowIndex + 1}, column ${colIndex + 1}, ${cell ? "alive" : "dead"}`}
                onClick={() => toggleCell(rowIndex, colIndex)}
                className="aspect-square border border-[#2b1015]/60 transition-colors hover:bg-red-200/20"
                style={{ background: cell ? "rgba(239,68,68,0.78)" : "rgba(8,8,12,0.54)" }}
              />
            )))}
          </div>
          <div className="mt-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.07em] text-slate-600"><span>click cells to edit initial condition</span><span>{ROWS} × {COLS} finite grid</span></div>
        </div>
      </div>
    </Surface>
  );
}

function nextGeneration(grid: Grid): Grid {
  return grid.map((row, r) => row.map((cell, c) => {
    let neighbors = 0;
    for (const [dr, dc] of NEIGHBORS) {
      const rr = r + dr;
      const cc = c + dc;
      if (rr >= 0 && rr < ROWS && cc >= 0 && cc < COLS) neighbors += grid[rr][cc];
    }
    if (cell === 1) return neighbors === 2 || neighbors === 3 ? 1 : 0;
    return neighbors === 3 ? 1 : 0;
  }));
}

function emptyGrid(): Grid {
  return Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => 0));
}

function makeSeed(key: SeedKey): Grid {
  const grid = emptyGrid();
  if (key === "glider") {
    const r = 8;
    const c = 13;
    [[0, 1], [1, 2], [2, 0], [2, 1], [2, 2]].forEach(([dr, dc]) => { grid[r + dr][c + dc] = 1; });
    return grid;
  }
  if (key === "oscillators") {
    [[8, 7], [8, 8], [8, 9], [13, 20], [14, 20], [15, 20], [5, 26], [6, 26], [7, 26]].forEach(([r, c]) => { grid[r][c] = 1; });
    return grid;
  }
  for (let r = 0; r < ROWS; r += 1) {
    for (let c = 0; c < COLS; c += 1) {
      const hash = (r * 73 + c * 131 + r * c * 17) % 19;
      grid[r][c] = hash < 6 ? 1 : 0;
    }
  }
  return grid;
}

function SeedButton({ selected, onClick, label, note }: { selected: boolean; onClick: () => void; label: string; note: string }) {
  return <button type="button" onClick={onClick} className={`border px-3 py-3 text-left transition ${selected ? "border-red-300/30 bg-red-500/[0.08]" : "border-white/[0.07] bg-black/[0.055]"}`}><strong className="block text-[12px] text-white/84">{label}</strong><span className="mt-1 block text-[11px] leading-4 text-slate-600">{note}</span></button>;
}

function Readout({ label, value }: { label: string; value: string }) {
  return <div className="border-l-2 border-red-300/18 bg-black/[0.05] px-3 py-2"><span className="block text-[10px] uppercase tracking-[0.07em] text-slate-600">{label}</span><strong className="mt-1 block font-mono text-[16px] text-white/76">{value}</strong></div>;
}
