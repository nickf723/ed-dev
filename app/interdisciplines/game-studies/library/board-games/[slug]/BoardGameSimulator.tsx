"use client";

import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import type { BoardGameSimulatorId } from "../board-game-data";

export default function BoardGameSimulator({ simulator }: { simulator: BoardGameSimulatorId }) {
  if (simulator === "tic-tac-toe") return <TicTacToeSimulator />;
  if (simulator === "four-in-a-row") return <FourInARowSimulator />;
  return <KalahSimulator />;
}

type Mark = "X" | "O";
type TicCell = Mark | null;

const TIC_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
] as const;

function TicTacToeSimulator() {
  const [cells, setCells] = useState<TicCell[]>(() => Array<TicCell>(9).fill(null));
  const current: Mark = cells.filter(Boolean).length % 2 === 0 ? "X" : "O";
  const winningLine = TIC_LINES.find(([a, b, c]) => cells[a] && cells[a] === cells[b] && cells[a] === cells[c]);
  const winner = winningLine ? cells[winningLine[0]] : null;
  const draw = !winner && cells.every(Boolean);

  const play = (index: number) => {
    if (winner || draw || cells[index]) return;
    setCells((currentCells) => currentCells.map((cell, cellIndex) => cellIndex === index ? current : cell));
  };

  const reset = () => setCells(Array<TicCell>(9).fill(null));

  return (
    <SimulatorShell
      status={winner ? `${winner} completes a line.` : draw ? "The board is full: draw." : `${current} to place a mark.`}
      reset={reset}
      note="The simulator stops as soon as a winning line appears."
    >
      <div className="mx-auto grid w-full max-w-[430px] grid-cols-3 gap-2" role="grid" aria-label="Tic-Tac-Toe board">
        {cells.map((cell, index) => {
          const winning = winningLine?.some((cellIndex) => cellIndex === index) ?? false;
          return (
            <button
              key={index}
              type="button"
              role="gridcell"
              disabled={Boolean(cell || winner || draw)}
              onClick={() => play(index)}
              aria-label={cell ? `Space ${index + 1}: ${cell}` : `Place ${current} in space ${index + 1}`}
              className="aspect-square rounded-[18px] border text-[clamp(2.2rem,7vw,4rem)] font-semibold transition disabled:cursor-default"
              style={{
                color: cell === "X" ? "rgb(56,189,248)" : "rgb(251,146,60)",
                borderColor: winning ? "rgba(74,222,128,0.55)" : "rgba(255,255,255,0.10)",
                background: winning ? "rgba(74,222,128,0.08)" : "rgba(0,0,0,0.16)",
              }}
            >
              {cell}
            </button>
          );
        })}
      </div>
    </SimulatorShell>
  );
}

type Disc = "amber" | "cyan";
type FourCell = Disc | null;

const FOUR_ROWS = 6;
const FOUR_COLUMNS = 7;

function FourInARowSimulator() {
  const [cells, setCells] = useState<FourCell[]>(() => Array<FourCell>(FOUR_ROWS * FOUR_COLUMNS).fill(null));
  const current: Disc = cells.filter(Boolean).length % 2 === 0 ? "amber" : "cyan";
  const winner = findFourWinner(cells);
  const draw = !winner && cells.every(Boolean);

  const drop = (column: number) => {
    if (winner || draw) return;
    for (let row = FOUR_ROWS - 1; row >= 0; row -= 1) {
      const index = row * FOUR_COLUMNS + column;
      if (!cells[index]) {
        setCells((currentCells) => currentCells.map((cell, cellIndex) => cellIndex === index ? current : cell));
        return;
      }
    }
  };

  const reset = () => setCells(Array<FourCell>(FOUR_ROWS * FOUR_COLUMNS).fill(null));

  return (
    <SimulatorShell
      status={winner ? `${capitalize(winner)} connects four.` : draw ? "The grid is full: draw." : `${capitalize(current)} to choose a column.`}
      reset={reset}
      note="Select any space in a column; the disc falls to its lowest empty row."
    >
      <div className="mx-auto grid w-full max-w-[670px] grid-cols-7 gap-1.5 rounded-[22px] border border-blue-200/[0.12] bg-blue-950/30 p-2.5 sm:gap-2 sm:p-4" role="grid" aria-label="Four in a Row board">
        {cells.map((cell, index) => {
          const column = index % FOUR_COLUMNS;
          const row = Math.floor(index / FOUR_COLUMNS);
          return (
            <button
              key={index}
              type="button"
              role="gridcell"
              disabled={Boolean(winner || draw || cells[column])}
              onClick={() => drop(column)}
              aria-label={cell ? `Row ${row + 1}, column ${column + 1}: ${cell} disc` : `Drop ${current} disc in column ${column + 1}`}
              className="aspect-square rounded-full border border-white/[0.08] bg-black/35 p-[13%] transition hover:border-white/20 disabled:cursor-default"
            >
              <span
                className="block h-full w-full rounded-full transition"
                style={{
                  background: cell === "amber" ? "rgb(250,204,21)" : cell === "cyan" ? "rgb(34,211,238)" : "rgba(255,255,255,0.035)",
                  boxShadow: cell ? `inset 0 2px 0 rgba(255,255,255,0.26),0 0 14px ${cell === "amber" ? "rgba(250,204,21,0.18)" : "rgba(34,211,238,0.18)"}` : undefined,
                }}
              />
            </button>
          );
        })}
      </div>
    </SimulatorShell>
  );
}

function findFourWinner(cells: readonly FourCell[]): Disc | null {
  const directions = [[0, 1], [1, 0], [1, 1], [1, -1]] as const;
  for (let row = 0; row < FOUR_ROWS; row += 1) {
    for (let column = 0; column < FOUR_COLUMNS; column += 1) {
      const disc = cells[row * FOUR_COLUMNS + column];
      if (!disc) continue;
      for (const [rowStep, columnStep] of directions) {
        let connected = true;
        for (let offset = 1; offset < 4; offset += 1) {
          const nextRow = row + rowStep * offset;
          const nextColumn = column + columnStep * offset;
          if (
            nextRow < 0 || nextRow >= FOUR_ROWS ||
            nextColumn < 0 || nextColumn >= FOUR_COLUMNS ||
            cells[nextRow * FOUR_COLUMNS + nextColumn] !== disc
          ) {
            connected = false;
            break;
          }
        }
        if (connected) return disc;
      }
    }
  }
  return null;
}

type KalahPlayer = "south" | "north";

const KALAH_INITIAL = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0] as const;
const SOUTH_PITS = [0, 1, 2, 3, 4, 5] as const;
const NORTH_PITS = [7, 8, 9, 10, 11, 12] as const;

function KalahSimulator() {
  const [pits, setPits] = useState<number[]>(() => [...KALAH_INITIAL]);
  const [turn, setTurn] = useState<KalahPlayer>("south");
  const [message, setMessage] = useState("South begins. Choose a nonempty pit.");
  const ended = isKalahEnded(pits);

  const result = useMemo(() => {
    if (!ended) return null;
    if (pits[6] === pits[13]) return "Draw";
    return pits[6] > pits[13] ? "South wins" : "North wins";
  }, [ended, pits]);

  const play = (pit: number) => {
    if (ended || pits[pit] === 0 || !ownsPit(turn, pit)) return;
    const next = [...pits];
    let stones = next[pit];
    next[pit] = 0;
    let cursor = pit;

    while (stones > 0) {
      cursor = (cursor + 1) % next.length;
      if ((turn === "south" && cursor === 13) || (turn === "north" && cursor === 6)) continue;
      next[cursor] += 1;
      stones -= 1;
    }

    const ownStore = turn === "south" ? 6 : 13;
    const ownOrdinaryPit = turn === "south" ? cursor >= 0 && cursor <= 5 : cursor >= 7 && cursor <= 12;
    let turnMessage = `${capitalize(turn)} sowed from pit ${pitLabel(pit)}.`;

    if (ownOrdinaryPit && next[cursor] === 1) {
      const opposite = 12 - cursor;
      if (next[opposite] > 0) {
        const captured = next[opposite] + 1;
        next[ownStore] += captured;
        next[cursor] = 0;
        next[opposite] = 0;
        turnMessage = `${capitalize(turn)} captured ${captured} stones.`;
      }
    }

    const gameEnded = sweepKalahIfEnded(next);
    if (gameEnded) {
      setPits(next);
      setMessage("One side is empty. Remaining stones move to the opposite store.");
      return;
    }

    if (cursor === ownStore) {
      setPits(next);
      setMessage(`${capitalize(turn)} landed in their store and takes another turn.`);
      return;
    }

    const nextTurn = turn === "south" ? "north" : "south";
    setPits(next);
    setTurn(nextTurn);
    setMessage(`${turnMessage} ${capitalize(nextTurn)} to move.`);
  };

  const reset = () => {
    setPits([...KALAH_INITIAL]);
    setTurn("south");
    setMessage("South begins. Choose a nonempty pit.");
  };

  return (
    <SimulatorShell
      status={ended && result ? `${result}: South ${pits[6]} · North ${pits[13]}` : message}
      reset={reset}
      note="North's row is shown from right to left so opposite pits align vertically."
    >
      <div className="mx-auto w-full max-w-[900px] rounded-[30px] border border-orange-100/[0.15] bg-[linear-gradient(145deg,rgba(120,53,15,0.30),rgba(41,22,11,0.42))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-5">
        <div className="mb-3 flex items-center justify-between px-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
          <span className={turn === "north" && !ended ? "text-cyan-200" : ""}>North</span>
          <span>store ← row → store</span>
          <span className={turn === "south" && !ended ? "text-amber-200" : ""}>South</span>
        </div>

        <div className="grid grid-cols-[54px_minmax(0,1fr)_54px] gap-2 sm:grid-cols-[78px_minmax(0,1fr)_78px] sm:gap-3">
          <Store label="North store" value={pits[13]} accent="cyan" />
          <div className="grid grid-cols-6 gap-1.5 sm:gap-2.5">
            {[...NORTH_PITS].reverse().map((pit) => <KalahPit key={pit} pit={pit} value={pits[pit]} enabled={!ended && turn === "north" && pits[pit] > 0} onPlay={play} accent="cyan" />)}
            {SOUTH_PITS.map((pit) => <KalahPit key={pit} pit={pit} value={pits[pit]} enabled={!ended && turn === "south" && pits[pit] > 0} onPlay={play} accent="amber" />)}
          </div>
          <Store label="South store" value={pits[6]} accent="amber" />
        </div>
      </div>
    </SimulatorShell>
  );
}

function KalahPit({ pit, value, enabled, onPlay, accent }: { pit: number; value: number; enabled: boolean; onPlay: (pit: number) => void; accent: "amber" | "cyan" }) {
  return (
    <button
      type="button"
      disabled={!enabled}
      onClick={() => onPlay(pit)}
      aria-label={`${accent === "amber" ? "South" : "North"} pit ${pitLabel(pit)} with ${value} stones`}
      className="aspect-[0.82] rounded-[45%] border border-white/[0.09] bg-black/25 p-1 text-center transition enabled:hover:-translate-y-0.5 enabled:hover:border-white/25 disabled:cursor-default sm:p-2"
    >
      <span className="block text-[clamp(0.9rem,3vw,1.55rem)] font-semibold" style={{ color: accent === "amber" ? "rgb(251,191,36)" : "rgb(34,211,238)" }}>{value}</span>
      <span className="mt-0.5 hidden font-mono text-[11px] text-slate-600 sm:block">pit {pitLabel(pit)}</span>
    </button>
  );
}

function Store({ label, value, accent }: { label: string; value: number; accent: "amber" | "cyan" }) {
  return (
    <div className="flex min-h-[132px] flex-col items-center justify-center rounded-[42%] border border-white/[0.10] bg-black/30 px-1 text-center sm:min-h-[190px]">
      <strong className="text-[clamp(1.2rem,4vw,2rem)]" style={{ color: accent === "amber" ? "rgb(251,191,36)" : "rgb(34,211,238)" }}>{value}</strong>
      <span className="mt-1 hidden font-mono text-[11px] uppercase tracking-[0.06em] text-slate-600 sm:block">{label}</span>
    </div>
  );
}

function isKalahEnded(pits: readonly number[]): boolean {
  return SOUTH_PITS.every((pit) => pits[pit] === 0) || NORTH_PITS.every((pit) => pits[pit] === 0);
}

function sweepKalahIfEnded(pits: number[]): boolean {
  const southEmpty = SOUTH_PITS.every((pit) => pits[pit] === 0);
  const northEmpty = NORTH_PITS.every((pit) => pits[pit] === 0);
  if (!southEmpty && !northEmpty) return false;

  for (const pit of SOUTH_PITS) {
    pits[6] += pits[pit];
    pits[pit] = 0;
  }
  for (const pit of NORTH_PITS) {
    pits[13] += pits[pit];
    pits[pit] = 0;
  }
  return true;
}

function ownsPit(player: KalahPlayer, pit: number): boolean {
  return player === "south" ? pit >= 0 && pit <= 5 : pit >= 7 && pit <= 12;
}

function pitLabel(pit: number): number {
  return pit <= 5 ? pit + 1 : pit - 6;
}

function SimulatorShell({ children, status, note, reset }: { children: React.ReactNode; status: string; note: string; reset: () => void }) {
  return (
    <div className="rounded-[26px] border border-white/[0.09] bg-black/[0.16] p-4 backdrop-blur-xl sm:p-6">
      <div className="mb-5 flex flex-col justify-between gap-3 border-b border-white/[0.07] pb-4 sm:flex-row sm:items-center">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-slate-600">table state</div>
          <p className="mt-1 text-[14px] font-semibold text-white" aria-live="polite">{status}</p>
        </div>
        <button type="button" onClick={reset} className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.025] px-4 text-[11px] font-semibold text-slate-400 transition hover:border-white/20 hover:text-white">
          <RotateCcw size={13} /> Reset table
        </button>
      </div>
      {children}
      <p className="mt-5 text-center text-[11px] leading-5 text-slate-600">{note}</p>
    </div>
  );
}

function capitalize<T extends string>(value: T): Capitalize<T> {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}` as Capitalize<T>;
}
