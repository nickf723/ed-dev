"use client";

import { useMemo, useState } from "react";
import { ArrowRightLeft, Handshake, Target, UsersRound } from "lucide-react";

type Strategy = "C" | "D";

type Cell = {
  row: Strategy;
  column: Strategy;
  p1: number;
  p2: number;
  label: string;
};

const CELLS: readonly Cell[] = [
  { row: "C", column: "C", p1: 3, p2: 3, label: "Mutual cooperation" },
  { row: "C", column: "D", p1: 0, p2: 5, label: "Player 2 exploits" },
  { row: "D", column: "C", p1: 5, p2: 0, label: "Player 1 exploits" },
  { row: "D", column: "D", p1: 1, p2: 1, label: "Mutual defection" },
];

function payoff(row: Strategy, column: Strategy): Cell {
  return CELLS.find((cell) => cell.row === row && cell.column === column) ?? CELLS[0];
}

export default function PayoffMatrix() {
  const [row, setRow] = useState<Strategy>("D");
  const [column, setColumn] = useState<Strategy>("D");
  const selected = payoff(row, column);

  const deviations = useMemo(() => {
    const p1Alternative = payoff(row === "C" ? "D" : "C", column);
    const p2Alternative = payoff(row, column === "C" ? "D" : "C");
    return {
      p1Gain: p1Alternative.p1 - selected.p1,
      p2Gain: p2Alternative.p2 - selected.p2,
    };
  }, [row, column, selected]);

  const isNash = deviations.p1Gain <= 0 && deviations.p2Gain <= 0;

  return (
    <section className="overflow-hidden rounded-[30px] border border-amber-200/[0.12] bg-black/[0.18] shadow-[0_24px_90px_rgba(0,0,0,0.24)] backdrop-blur-xl">
      <div className="grid border-b border-white/[0.07] lg:grid-cols-[minmax(0,1fr)_390px]">
        <div className="px-5 py-5 sm:px-6">
          <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-amber-200/62"><UsersRound size={13} /> Payoff matrix explorer</div>
          <h2 className="mt-2 text-[clamp(1.8rem,3.2vw,3rem)] font-semibold tracking-[-0.047em] text-white">A strategy profile is stable only if nobody benefits by deviating alone.</h2>
          <p className="mt-2 max-w-3xl text-[12px] leading-6 text-slate-400">Choose one strategy for each player in a classic Prisoner&apos;s Dilemma. The matrix shows the outcome, then checks what each player would gain or lose by changing only their own move while the other player stays fixed.</p>
        </div>
        <div className="border-t border-white/[0.07] p-5 lg:border-l lg:border-t-0">
          <div className="font-mono text-[8px] uppercase tracking-[0.12em] text-slate-600">Selected profile</div>
          <div className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-white">{selected.label}</div>
          <div className={`mt-2 inline-flex rounded-full border px-3 py-1 font-mono text-[8px] uppercase tracking-[0.1em] ${isNash ? "border-emerald-200/[0.18] bg-emerald-200/[0.035] text-emerald-200/68" : "border-amber-200/[0.16] bg-amber-200/[0.025] text-amber-200/60"}`}>{isNash ? "Nash equilibrium" : "profitable deviation exists"}</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="border-b border-white/[0.07] p-5 sm:p-6 lg:border-b-0 lg:border-r">
          <div className="grid grid-cols-[70px_repeat(2,minmax(0,1fr))] grid-rows-[48px_repeat(2,minmax(120px,1fr))] gap-2">
            <div />
            <ColumnLabel active={column === "C"} label="P2 Cooperate" onClick={() => setColumn("C")} />
            <ColumnLabel active={column === "D"} label="P2 Defect" onClick={() => setColumn("D")} />
            <RowLabel active={row === "C"} label="P1 Cooperate" onClick={() => setRow("C")} />
            <MatrixCell cell={payoff("C", "C")} selected={row === "C" && column === "C"} />
            <MatrixCell cell={payoff("C", "D")} selected={row === "C" && column === "D"} />
            <RowLabel active={row === "D"} label="P1 Defect" onClick={() => setRow("D")} />
            <MatrixCell cell={payoff("D", "C")} selected={row === "D" && column === "C"} />
            <MatrixCell cell={payoff("D", "D")} selected={row === "D" && column === "D"} />
          </div>
          <p className="mt-4 text-[9px] leading-4 text-slate-600">Each ordered pair is (Player 1 payoff, Player 2 payoff). The numbers encode preferences for this example; they are not money or universal units.</p>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.12em] text-slate-600"><ArrowRightLeft size={11} /> Unilateral deviation test</div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Deviation label="Player 1" gain={deviations.p1Gain} />
            <Deviation label="Player 2" gain={deviations.p2Gain} />
          </div>

          <div className="mt-5 rounded-[18px] border border-white/[0.07] bg-black/[0.12] p-4">
            <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.1em] text-amber-200/48"><Target size={11} /> Best-response logic</div>
            <p className="mt-2 text-[10px] leading-5 text-slate-500">
              {isNash
                ? "Neither player can improve their own payoff by changing strategies alone. That makes this profile a Nash equilibrium, even though mutual cooperation gives both players a higher payoff."
                : "At least one player can improve their own payoff by switching strategies while the other player stays fixed, so this profile is not a Nash equilibrium."}
            </p>
          </div>

          <div className="mt-5 rounded-[18px] border border-emerald-200/[0.10] bg-emerald-200/[0.02] p-4">
            <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.1em] text-emerald-200/46"><Handshake size={11} /> Equilibrium ≠ collective optimum</div>
            <p className="mt-2 text-[10px] leading-5 text-slate-600">The Prisoner&apos;s Dilemma is famous precisely because individually stable incentives can lead to an outcome both players prefer less than mutual cooperation.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function MatrixCell({ cell, selected }: { cell: Cell; selected: boolean }) {
  return <div className={`flex min-h-[120px] flex-col items-center justify-center rounded-[16px] border p-3 text-center transition ${selected ? "border-amber-200/[0.34] bg-amber-200/[0.07] shadow-[0_0_30px_rgba(251,191,36,0.08)]" : "border-white/[0.06] bg-black/[0.10]"}`}><div className="font-mono text-[24px] font-semibold tracking-[-0.04em] text-white">{cell.p1}, {cell.p2}</div><div className="mt-2 text-[8px] uppercase tracking-[0.09em] text-slate-600">{cell.label}</div></div>;
}

function ColumnLabel({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} className={`rounded-[12px] border px-2 text-center font-mono text-[8px] uppercase tracking-[0.08em] transition ${active ? "border-amber-200/[0.24] bg-amber-200/[0.045] text-amber-100/72" : "border-white/[0.06] text-slate-600 hover:bg-white/[0.025]"}`}>{label}</button>;
}

function RowLabel({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} className={`rounded-[12px] border px-2 font-mono text-[7px] uppercase tracking-[0.07em] [writing-mode:vertical-rl] transition ${active ? "border-amber-200/[0.24] bg-amber-200/[0.045] text-amber-100/72" : "border-white/[0.06] text-slate-600 hover:bg-white/[0.025]"}`}>{label}</button>;
}

function Deviation({ label, gain }: { label: string; gain: number }) {
  const positive = gain > 0;
  const neutral = gain === 0;
  return <div className={`rounded-[16px] border p-4 ${positive ? "border-rose-200/[0.13] bg-rose-200/[0.025]" : "border-emerald-200/[0.10] bg-emerald-200/[0.02]"}`}><div className="font-mono text-[8px] uppercase tracking-[0.1em] text-slate-600">{label} deviation</div><div className={`mt-2 text-[24px] font-semibold tracking-[-0.04em] ${positive ? "text-rose-200/78" : "text-emerald-200/70"}`}>{gain > 0 ? "+" : ""}{gain}</div><div className="mt-1 text-[9px] text-slate-600">{positive ? "would improve payoff" : neutral ? "same payoff" : "would reduce payoff"}</div></div>;
}
