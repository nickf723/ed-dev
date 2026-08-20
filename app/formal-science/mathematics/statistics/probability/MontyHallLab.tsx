"use client";

import { useState } from "react";
import { DoorOpen, Gift, RefreshCw, X } from "lucide-react";

type Phase = "pick" | "decision" | "result";
type Strategy = "stay" | "switch";

type Stats = {
  stayWins: number;
  stayPlays: number;
  switchWins: number;
  switchPlays: number;
};

const DOORS = [0, 1, 2] as const;

function randomDoor() {
  return Math.floor(Math.random() * 3);
}

export default function MontyHallLab() {
  const [prizeDoor, setPrizeDoor] = useState(randomDoor);
  const [selectedDoor, setSelectedDoor] = useState<number | null>(null);
  const [openedDoor, setOpenedDoor] = useState<number | null>(null);
  const [finalDoor, setFinalDoor] = useState<number | null>(null);
  const [strategy, setStrategy] = useState<Strategy | null>(null);
  const [phase, setPhase] = useState<Phase>("pick");
  const [stats, setStats] = useState<Stats>({ stayWins: 0, stayPlays: 0, switchWins: 0, switchPlays: 0 });

  const resetRound = () => {
    setPrizeDoor(randomDoor());
    setSelectedDoor(null);
    setOpenedDoor(null);
    setFinalDoor(null);
    setStrategy(null);
    setPhase("pick");
  };

  const pickDoor = (door: number) => {
    if (phase !== "pick") return;
    setSelectedDoor(door);
    const available = DOORS.filter((candidate) => candidate !== door && candidate !== prizeDoor);
    const reveal = available[Math.floor(Math.random() * available.length)];
    setOpenedDoor(reveal);
    setPhase("decision");
  };

  const decide = (nextStrategy: Strategy) => {
    if (phase !== "decision" || selectedDoor === null || openedDoor === null) return;
    const chosen = nextStrategy === "stay" ? selectedDoor : DOORS.find((door) => door !== selectedDoor && door !== openedDoor) ?? selectedDoor;
    const win = chosen === prizeDoor;
    setFinalDoor(chosen);
    setStrategy(nextStrategy);
    setStats((current) => ({
      stayWins: current.stayWins + (nextStrategy === "stay" && win ? 1 : 0),
      stayPlays: current.stayPlays + (nextStrategy === "stay" ? 1 : 0),
      switchWins: current.switchWins + (nextStrategy === "switch" && win ? 1 : 0),
      switchPlays: current.switchPlays + (nextStrategy === "switch" ? 1 : 0),
    }));
    setPhase("result");
  };

  return (
    <section className="overflow-hidden rounded-[28px] border border-purple-200/[0.10] bg-[#0c0718]/74 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-4 sm:px-5">
        <div>
          <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-purple-200/66"><DoorOpen size={13} /> Monty Hall conditional-probability lab</div>
          <p className="mt-1 text-[10px] text-slate-600">Standard rules: the host knows the prize, always reveals an unchosen empty door, and always offers the switch.</p>
        </div>
        <button type="button" onClick={resetRound} className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.018] px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-slate-500 transition hover:bg-white/[0.04] hover:text-slate-300"><RefreshCw size={11} /> new round</button>
      </div>

      <div className="grid gap-5 p-4 sm:p-5 xl:grid-cols-[minmax(0,1fr)_260px]">
        <div>
          <div className="min-h-8 text-center font-mono text-[10px] uppercase tracking-[0.11em] text-purple-100/66">
            {phase === "pick" ? "Choose one door" : phase === "decision" ? "One empty door is revealed. Stay or switch?" : finalDoor === prizeDoor ? `${strategy} won this round` : `${strategy} lost this round`}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {DOORS.map((door) => {
              const revealedByHost = openedDoor === door;
              const revealContents = revealedByHost || phase === "result";
              const chosen = phase === "result" ? finalDoor === door : selectedDoor === door;
              return (
                <button
                  key={door}
                  type="button"
                  disabled={phase !== "pick"}
                  onClick={() => pickDoor(door)}
                  className="relative aspect-[3/4] min-h-[150px] overflow-hidden rounded-[18px] border transition"
                  style={{ borderColor: chosen ? "rgba(192,132,252,0.48)" : revealedByHost ? "rgba(148,163,184,0.08)" : "rgba(255,255,255,0.09)", background: chosen ? "rgba(192,132,252,0.08)" : "rgba(255,255,255,0.018)" }}
                >
                  <span className="absolute left-3 top-3 font-mono text-[9px] text-slate-700">0{door + 1}</span>
                  <span className="flex h-full flex-col items-center justify-center gap-3">
                    {revealContents ? (door === prizeDoor ? <Gift size={34} className="text-yellow-300" /> : <X size={32} className="text-slate-700" />) : <DoorOpen size={32} className={chosen ? "text-purple-300" : "text-slate-600"} />}
                    <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-slate-600">{revealedByHost ? "host revealed empty" : chosen ? "your choice" : revealContents ? door === prizeDoor ? "prize" : "empty" : "closed"}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {phase === "decision" ? (
            <div className="mt-4 grid grid-cols-2 gap-2"><button type="button" onClick={() => decide("stay")} className="rounded-[14px] border border-white/[0.08] bg-white/[0.018] px-4 py-2.5 text-[11px] font-semibold text-slate-300 transition hover:bg-white/[0.04]">Stay</button><button type="button" onClick={() => decide("switch")} className="rounded-[14px] border border-purple-300/[0.22] bg-purple-400/[0.10] px-4 py-2.5 text-[11px] font-semibold text-purple-100 transition hover:bg-purple-400/[0.16]">Switch</button></div>
          ) : null}
          {phase === "result" ? <button type="button" onClick={resetRound} className="mt-4 w-full rounded-[14px] border border-white/[0.08] bg-white/[0.018] px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.1em] text-slate-500 transition hover:bg-white/[0.04] hover:text-slate-300">play another round</button> : null}
        </div>

        <aside className="rounded-[20px] border border-white/[0.07] bg-black/[0.13] p-4">
          <div className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-slate-600">Observed strategy results</div>
          <StrategyStat label="Stay" wins={stats.stayWins} plays={stats.stayPlays} target="theory: 1/3" rgb="148, 163, 184" />
          <StrategyStat label="Switch" wins={stats.switchWins} plays={stats.switchPlays} target="theory: 2/3" rgb="192, 132, 252" />
          <div className="mt-5 border-t border-white/[0.06] pt-4"><strong className="text-[11px] text-purple-100/72">Why switching works</strong><p className="mt-2 text-[10px] leading-5 text-slate-600">Your first pick is correct with probability 1/3. Under the standard host rules, switching wins exactly when that first pick was wrong, which occurs with probability 2/3. The host’s informed reveal changes what you know, not the probability that your original choice was correct.</p></div>
        </aside>
      </div>
    </section>
  );
}

function StrategyStat({ label, wins, plays, target, rgb }: { label: string; wins: number; plays: number; target: string; rgb: string }) {
  const rate = plays === 0 ? null : wins / plays;
  return <div className="mt-4 border-b border-white/[0.055] pb-3 last:border-b-0"><div className="flex items-center justify-between gap-3"><strong className="text-[11px]" style={{ color: `rgba(${rgb},0.74)` }}>{label}</strong><span className="font-mono text-[8px] text-slate-700">{wins}/{plays}</span></div><div className="mt-1 font-mono text-[20px] text-white/80">{rate === null ? "—" : `${(rate * 100).toFixed(1)}%`}</div><span className="mt-1 block font-mono text-[7px] uppercase tracking-[0.08em] text-slate-700">{target}</span></div>;
}
