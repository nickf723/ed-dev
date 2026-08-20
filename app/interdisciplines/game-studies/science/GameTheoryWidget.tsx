"use client";

import { useMemo, useState } from "react";
import { Bot, Handshake, RotateCcw, Swords, User } from "lucide-react";

type Move = "cooperate" | "defect";
type Strategy = "always-cooperate" | "always-defect" | "tit-for-tat";

const STRATEGIES: readonly { id: Strategy; label: string; rule: string }[] = [
  { id: "always-cooperate", label: "Always cooperate", rule: "Cooperates every round." },
  { id: "always-defect", label: "Always defect", rule: "Defects every round." },
  { id: "tit-for-tat", label: "Tit for tat", rule: "Cooperates first, then copies your previous move." },
] as const;

const PAYOFFS: Record<`${Move}-${Move}`, readonly [number, number]> = {
  "cooperate-cooperate": [3, 3],
  "cooperate-defect": [0, 5],
  "defect-cooperate": [5, 0],
  "defect-defect": [1, 1],
};

export default function GameTheoryWidget() {
  const [strategy, setStrategy] = useState<Strategy>("tit-for-tat");
  const [playerHistory, setPlayerHistory] = useState<Move[]>([]);
  const [opponentHistory, setOpponentHistory] = useState<Move[]>([]);
  const [score, setScore] = useState({ player: 0, opponent: 0 });

  const round = playerHistory.length;
  const lastPlayer = playerHistory.at(-1);
  const lastOpponent = opponentHistory.at(-1);
  const currentStrategy = STRATEGIES.find((item) => item.id === strategy) ?? STRATEGIES[2];

  const outcome = useMemo(() => {
    if (!lastPlayer || !lastOpponent) return "Choose a move to begin.";
    if (lastPlayer === "cooperate" && lastOpponent === "cooperate") return "Mutual cooperation: both receive 3.";
    if (lastPlayer === "defect" && lastOpponent === "defect") return "Mutual defection: both receive 1.";
    if (lastPlayer === "defect") return "You defected while the opponent cooperated: 5 to 0.";
    return "You cooperated while the opponent defected: 0 to 5.";
  }, [lastOpponent, lastPlayer]);

  function opponentMove(): Move {
    if (strategy === "always-cooperate") return "cooperate";
    if (strategy === "always-defect") return "defect";
    return playerHistory.at(-1) ?? "cooperate";
  }

  function play(move: Move) {
    const opponent = opponentMove();
    const [playerPayoff, opponentPayoff] = PAYOFFS[`${move}-${opponent}`];
    setPlayerHistory((history) => [...history, move]);
    setOpponentHistory((history) => [...history, opponent]);
    setScore((current) => ({ player: current.player + playerPayoff, opponent: current.opponent + opponentPayoff }));
  }

  function reset(nextStrategy = strategy) {
    setStrategy(nextStrategy);
    setPlayerHistory([]);
    setOpponentHistory([]);
    setScore({ player: 0, opponent: 0 });
  }

  return (
    <section className="overflow-hidden rounded-[24px] border border-violet-100/[0.10] bg-[#0c0815]/70 backdrop-blur-xl">
      <div className="grid gap-3 border-b border-white/[0.07] p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div>
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-violet-200/68">Repeated-game laboratory</div>
          <h3 className="mt-2 text-[21px] font-semibold tracking-[-0.035em] text-white">The same payoff matrix can behave differently across opponent strategies.</h3>
        </div>
        <button type="button" onClick={() => reset()} className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.06em] text-slate-400 hover:text-white"><RotateCcw size={11} /> reset</button>
      </div>

      <div className="grid gap-5 p-4 xl:grid-cols-[230px_minmax(0,1fr)_300px] sm:p-5">
        <div>
          <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.07em] text-slate-500">Opponent policy</div>
          <div className="mt-3 space-y-2">
            {STRATEGIES.map((item) => {
              const active = item.id === strategy;
              return (
                <button key={item.id} type="button" onClick={() => reset(item.id)} className="w-full rounded-[14px] border p-3 text-left transition" style={{ borderColor: active ? "rgba(167,139,250,0.28)" : "rgba(255,255,255,0.06)", background: active ? "rgba(167,139,250,0.055)" : "rgba(0,0,0,0.04)" }}>
                  <strong className="text-[12px] text-white/84">{item.label}</strong>
                  <span className="mt-1 block text-[10px] leading-4 text-slate-500">{item.rule}</span>
                </button>
              );
            })}
          </div>
          <p className="mt-4 border-l-2 border-violet-300/28 pl-3 text-[11px] leading-5 text-slate-500">Changing the opponent resets the history so each policy starts from a clean repeated game.</p>
        </div>

        <div>
          <div className="grid grid-cols-3 gap-2">
            <Score label="You" value={score.player} icon={User} rgb="167,139,250" />
            <div className="rounded-[16px] border border-white/[0.07] bg-black/[0.16] p-3 text-center"><div className="font-mono text-[9px] uppercase tracking-[0.06em] text-slate-500">round</div><div className="mt-1 text-[24px] font-semibold text-white">{round}</div></div>
            <Score label="Opponent" value={score.opponent} icon={Bot} rgb="250,204,21" />
          </div>

          <div className="mt-3 rounded-[18px] border border-white/[0.07] bg-black/[0.16] p-4">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
              <MoveDisplay label="You" move={lastPlayer} />
              <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-slate-600">vs</span>
              <MoveDisplay label="Opponent" move={lastOpponent} />
            </div>
            <p className="mt-4 text-center text-[12px] leading-5 text-slate-400">{outcome}</p>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button type="button" onClick={() => play("cooperate")} className="flex items-center justify-center gap-2 rounded-[14px] border border-emerald-300/[0.18] bg-emerald-300/[0.04] px-3 py-3 text-[12px] font-semibold text-emerald-200 transition hover:bg-emerald-300/[0.08]"><Handshake size={15} /> Cooperate</button>
            <button type="button" onClick={() => play("defect")} className="flex items-center justify-center gap-2 rounded-[14px] border border-rose-300/[0.18] bg-rose-300/[0.04] px-3 py-3 text-[12px] font-semibold text-rose-200 transition hover:bg-rose-300/[0.08]"><Swords size={15} /> Defect</button>
          </div>

          <div className="mt-4 font-mono text-[9px] uppercase tracking-[0.06em] text-slate-500">Current opponent: {currentStrategy.label}</div>
        </div>

        <aside className="xl:sticky xl:top-[172px] xl:self-start">
          <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.07em] text-slate-500">Illustrative stage-game payoffs</div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Payoff title="C / C" player={3} opponent={3} />
            <Payoff title="C / D" player={0} opponent={5} />
            <Payoff title="D / C" player={5} opponent={0} />
            <Payoff title="D / D" player={1} opponent={1} />
          </div>
          <div className="mt-4 border-l-2 border-amber-300/28 pl-3">
            <strong className="text-[11px] text-amber-100/78">What repeated play adds</strong>
            <p className="mt-1 text-[11px] leading-5 text-slate-500">The one-round payoff matrix stays fixed, but history and opponent policy change which future outcomes a move can trigger. That is why repeated games are not just the same isolated decision copied many times.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Score({ label, value, icon: Icon, rgb }: { label: string; value: number; icon: typeof User; rgb: string }) {
  return <div className="rounded-[16px] border border-white/[0.07] bg-black/[0.16] p-3 text-center"><div className="flex items-center justify-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.06em]" style={{ color: `rgba(${rgb},0.72)` }}><Icon size={11} /> {label}</div><div className="mt-1 text-[24px] font-semibold text-white">{value}</div></div>;
}

function MoveDisplay({ label, move }: { label: string; move?: Move }) {
  const cooperate = move === "cooperate";
  return <div className="text-center"><div className="font-mono text-[9px] uppercase tracking-[0.06em] text-slate-500">{label}</div><div className={`mt-2 flex items-center justify-center gap-2 text-[12px] font-semibold ${!move ? "text-slate-600" : cooperate ? "text-emerald-300" : "text-rose-300"}`}>{move ? cooperate ? <Handshake size={16} /> : <Swords size={16} /> : null}{move ?? "waiting"}</div></div>;
}

function Payoff({ title, player, opponent }: { title: string; player: number; opponent: number }) {
  return <div className="rounded-[13px] border border-white/[0.06] bg-black/[0.10] p-3"><strong className="font-mono text-[10px] text-white/76">{title}</strong><div className="mt-2 flex justify-between text-[10px] text-slate-500"><span>you {player}</span><span>opp {opponent}</span></div></div>;
}
