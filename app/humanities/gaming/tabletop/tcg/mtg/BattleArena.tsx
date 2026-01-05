"use client";
import { useState } from "react";
import { Swords, Shield, Skull, RotateCcw, Heart, Zap } from "lucide-react";

type Card = {
    id: number;
    name: string;
    power: number;
    toughness: number;
    color: string; // Tailwind class
    image: string; // Emoji/Icon
    status: "ready" | "tapped" | "dead";
    blockingId?: number | null; // ID of attacker this card is blocking
};

const USER_START: Card[] = [
    { id: 1, name: "Grizzly Bears", power: 2, toughness: 2, color: "bg-green-600 border-green-400", image: "🐻", status: "ready" },
    { id: 2, name: "Serra Angel", power: 4, toughness: 4, color: "bg-yellow-200 border-yellow-400", image: "👼", status: "ready" },
];

const ENEMY_START: Card[] = [
    { id: 3, name: "Goblin Piker", power: 2, toughness: 1, color: "bg-red-600 border-red-400", image: "👺", status: "ready" },
    { id: 4, name: "Hill Giant", power: 3, toughness: 3, color: "bg-red-700 border-red-500", image: "👹", status: "ready" },
];

type Phase = "MAIN" | "DECLARE_ATTACKERS" | "DECLARE_BLOCKERS" | "DAMAGE" | "END";

export default function BattleArena() {
  const [phase, setPhase] = useState<Phase>("MAIN");
  const [myBoard, setMyBoard] = useState<Card[]>(USER_START);
  const [enemyBoard, setEnemyBoard] = useState<Card[]>(ENEMY_START);
  const [combatLog, setCombatLog] = useState<string[]>(["Battle started."]);

  const log = (msg: string) => setCombatLog(prev => [msg, ...prev].slice(0, 3));

  // 1. Declare Attackers
  const toggleAttack = (id: number) => {
      if (phase !== "DECLARE_ATTACKERS") return;
      setMyBoard(prev => prev.map(c => {
          if (c.id === id && c.status !== "dead") {
              return { ...c, status: c.status === "tapped" ? "ready" : "tapped" };
          }
          return c;
      }));
  };

  // 2. AI Declares Blockers
  const resolveBlockers = () => {
      setPhase("DECLARE_BLOCKERS");
      const attackers = myBoard.filter(c => c.status === "tapped");
      if (attackers.length === 0) {
          log("No attackers declared.");
          setTimeout(() => resolveDamage(), 1000);
          return;
      }

      // Simple AI: Block if can kill attacker OR if blocker survives
      const newEnemyBoard = [...enemyBoard];
      
      attackers.forEach(atk => {
          const blockerIndex = newEnemyBoard.findIndex(
              blk => blk.status === "ready" && !blk.blockingId && (blk.power >= atk.toughness || blk.toughness > atk.power)
          );
          
          if (blockerIndex !== -1) {
              newEnemyBoard[blockerIndex].blockingId = atk.id;
              log(`${newEnemyBoard[blockerIndex].name} blocks ${atk.name}!`);
          }
      });
      setEnemyBoard(newEnemyBoard);
  };

  // 3. Resolve Damage
  const resolveDamage = () => {
      setPhase("DAMAGE");
      
      // Calculate damage simultaneously
      const nextMyBoard = [...myBoard];
      const nextEnemyBoard = [...enemyBoard];

      // Handle Blocked Combat
      nextEnemyBoard.forEach(blk => {
          if (blk.blockingId) {
              const atk = nextMyBoard.find(c => c.id === blk.blockingId);
              if (atk) {
                  // Damage Exchange
                  if (atk.power >= blk.toughness) blk.status = "dead";
                  if (blk.power >= atk.toughness) atk.status = "dead";
              }
          }
      });

      // Handle Unblocked (Direct Damage) - purely visual here
      nextMyBoard.forEach(atk => {
          if (atk.status === "tapped") {
              const isBlocked = nextEnemyBoard.some(blk => blk.blockingId === atk.id);
              if (!isBlocked) log(`${atk.name} deals ${atk.power} damage to Opponent!`);
          }
      });

      setMyBoard(nextMyBoard);
      setEnemyBoard(nextEnemyBoard);

      setTimeout(() => setPhase("END"), 1500);
  };

  const reset = () => {
      setMyBoard(USER_START);
      setEnemyBoard(ENEMY_START);
      setPhase("MAIN");
      setCombatLog(["Battle reset."]);
  };

  return (
    <div className="bg-[#1c1917] border-2 border-[#b45309] rounded-xl p-6 shadow-2xl w-full max-w-lg relative overflow-hidden">
        
        {/* Phase Indicator */}
        <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-[#fcd34d] flex items-center gap-2 font-serif tracking-wider">
                <Swords size={20} /> COMBAT_SIM
            </h3>
            <div className={`text-[10px] font-bold font-mono px-3 py-1 rounded border transition-colors duration-300
                ${phase === "DAMAGE" ? "bg-red-900/50 border-red-500 text-red-400" : "bg-[#292524] border-[#78350f] text-[#a8a29e]"}
            `}>
                PHASE: {phase.replace("_", " ")}
            </div>
        </div>

        {/* BATTLEFIELD */}
        <div className="relative min-h-[300px] bg-[url('/noise.png')] bg-opacity-10 bg-[#0c0a09] rounded-lg border border-[#44403c] p-4 flex flex-col justify-between mb-4">
            
            {/* ENEMY ZONE */}
            <div className="flex justify-center gap-4 relative z-10 min-h-[100px]">
                {enemyBoard.map(card => (
                    card.status !== "dead" && (
                        <div 
                            key={card.id}
                            className={`
                                w-20 h-28 rounded shadow-lg flex flex-col items-center justify-between p-1 transition-all duration-500
                                ${card.color} text-black
                                ${card.blockingId ? "translate-y-12 z-20 scale-105" : ""}
                            `}
                        >
                            <div className="text-[8px] font-bold uppercase truncate w-full text-center bg-white/30 rounded px-1">{card.name}</div>
                            <div className="text-3xl">{card.image}</div>
                            <div className="bg-black/80 text-white text-xs font-bold px-2 py-0.5 rounded-full flex gap-1">
                                <span>{card.power}</span><span className="text-zinc-500">/</span><span>{card.toughness}</span>
                            </div>
                        </div>
                    )
                ))}
            </div>

            {/* COMBAT ZONE (Divider) */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 border-t border-dashed border-white/20" />

            {/* PLAYER ZONE */}
            <div className="flex justify-center gap-4 relative z-10 min-h-[100px]">
                {myBoard.map(card => (
                    card.status !== "dead" && (
                        <div 
                            key={card.id}
                            onClick={() => toggleAttack(card.id)}
                            className={`
                                w-20 h-28 rounded shadow-lg flex flex-col items-center justify-between p-1 transition-all duration-300 cursor-pointer
                                ${card.color} text-black hover:scale-105 hover:ring-2 ring-white
                                ${card.status === "tapped" ? "rotate-12 -translate-y-12 z-20" : ""}
                            `}
                        >
                            <div className="text-[8px] font-bold uppercase truncate w-full text-center bg-white/30 rounded px-1">{card.name}</div>
                            <div className="text-3xl">{card.image}</div>
                            <div className="bg-black/80 text-white text-xs font-bold px-2 py-0.5 rounded-full flex gap-1">
                                <span>{card.power}</span><span className="text-zinc-500">/</span><span>{card.toughness}</span>
                            </div>
                        </div>
                    )
                ))}
            </div>

        </div>

        {/* LOG */}
        <div className="h-12 bg-black/40 border border-white/5 rounded p-2 mb-4 overflow-hidden flex flex-col justify-end">
             {combatLog.map((l, i) => <div key={i} className="text-[10px] text-[#fcd34d] font-mono">{l}</div>)}
        </div>

        {/* ACTION BUTTONS */}
        {phase === "MAIN" && (
            <button onClick={() => setPhase("DECLARE_ATTACKERS")} className="w-full py-3 bg-[#b45309] hover:bg-[#d97706] text-white font-bold rounded flex items-center justify-center gap-2">
                <Swords size={18} /> BEGIN COMBAT
            </button>
        )}
        {phase === "DECLARE_ATTACKERS" && (
            <button onClick={resolveBlockers} className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded flex items-center justify-center gap-2">
                <Zap size={18} /> DECLARE ATTACKERS
            </button>
        )}
        {phase === "DECLARE_BLOCKERS" && (
            <button onClick={resolveDamage} className="w-full py-3 bg-zinc-700 hover:bg-zinc-600 text-white font-bold rounded flex items-center justify-center gap-2">
                <Shield size={18} /> PROCEED TO DAMAGE
            </button>
        )}
        {(phase === "DAMAGE" || phase === "END") && (
            <button onClick={reset} className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded flex items-center justify-center gap-2">
                <RotateCcw size={18} /> RESET BATTLE
            </button>
        )}

    </div>
  );
}