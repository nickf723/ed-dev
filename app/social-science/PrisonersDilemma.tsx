"use client";
import { useState, useEffect } from "react";
import { Users, Handshake, Sword, RefreshCw, Trophy } from "lucide-react";

export default function PrisonersDilemma() {
  const [playerScore, setPlayerScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [history, setHistory] = useState<{p: string, b: string, res: string}[]>([]);
  const [round, setRound] = useState(0);
  
  // Strategies: Tit-for-Tat (starts coop, then copies opponent)
  const playRound = (playerMove: "coop" | "defect") => {
      let botMove: "coop" | "defect" = "coop"; // Default nice
      
      // Bot Logic: Tit-for-Tat
      if (history.length > 0) {
          botMove = history[0].p as "coop" | "defect"; // Copy player's last move
      }

      // Calculate Payoff
      // Both Coop: +3, +3
      // Both Defect: +1, +1
      // One Defects: Defector +5, Sucker +0
      let pPoints = 0;
      let bPoints = 0;
      let res = "";

      if (playerMove === "coop" && botMove === "coop") {
          pPoints = 3; bPoints = 3; res = "Cooperation!";
      } else if (playerMove === "defect" && botMove === "defect") {
          pPoints = 1; bPoints = 1; res = "Mutual Betrayal";
      } else if (playerMove === "defect" && botMove === "coop") {
          pPoints = 5; bPoints = 0; res = "You Exploited Bot";
      } else {
          pPoints = 0; bPoints = 5; res = "Bot Exploited You";
      }

      setPlayerScore(p => p + pPoints);
      setBotScore(b => b + bPoints);
      setHistory(prev => [{p: playerMove, b: botMove, res}, ...prev.slice(0, 4)]);
      setRound(r => r + 1);
  };

  const reset = () => {
      setPlayerScore(0);
      setBotScore(0);
      setHistory([]);
      setRound(0);
  };

  return (
    <div className="bg-slate-900/90 border border-teal-500/30 rounded-xl p-6 backdrop-blur-md shadow-2xl max-w-md w-full">
        
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-teal-100 flex items-center gap-2 font-serif tracking-wider">
                <Users size={18} className="text-teal-500" /> GAME THEORY
            </h3>
            <span className="text-xs font-mono text-teal-500 uppercase">Prisoner's Dilemma</span>
        </div>

        {/* SCOREBOARD */}
        <div className="flex gap-4 mb-6">
            <div className="flex-1 bg-black/40 p-3 rounded-lg border border-teal-500/20 text-center">
                <div className="text-[10px] text-teal-500 font-bold uppercase">YOU</div>
                <div className="text-3xl font-black text-white">{playerScore}</div>
            </div>
            <div className="flex items-center text-teal-500/50 font-mono text-xs">VS</div>
            <div className="flex-1 bg-black/40 p-3 rounded-lg border border-teal-500/20 text-center">
                <div className="text-[10px] text-teal-500 font-bold uppercase">BOT (Tit-for-Tat)</div>
                <div className="text-3xl font-black text-white">{botScore}</div>
            </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="grid grid-cols-2 gap-4 mb-6">
            <button 
                onClick={() => playRound("coop")}
                className="group p-4 bg-teal-900/30 border border-teal-500/30 rounded-xl hover:bg-teal-500/20 transition-all flex flex-col items-center gap-2"
            >
                <Handshake size={24} className="text-teal-400 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-teal-100">COOPERATE</span>
                <span className="text-[10px] text-teal-400/60">Risk it for trust</span>
            </button>

            <button 
                onClick={() => playRound("defect")}
                className="group p-4 bg-rose-900/20 border border-rose-500/30 rounded-xl hover:bg-rose-500/20 transition-all flex flex-col items-center gap-2"
            >
                <Sword size={24} className="text-rose-400 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-rose-100">DEFECT</span>
                <span className="text-[10px] text-rose-400/60">Betray for gain</span>
            </button>
        </div>

        {/* HISTORY LOG */}
        <div className="bg-black/20 rounded-lg p-3 min-h-[100px]">
            <div className="flex justify-between items-center mb-2 border-b border-white/5 pb-1">
                <span className="text-[10px] text-teal-500 font-bold">RECENT ROUNDS</span>
                <button onClick={reset} className="text-teal-500/50 hover:text-teal-400"><RefreshCw size={12}/></button>
            </div>
            <div className="space-y-2">
                {history.map((h, i) => (
                    <div key={i} className="flex items-center justify-between text-xs animate-fadeIn">
                        <span className={`font-bold ${h.p === 'coop' ? 'text-teal-400' : 'text-rose-400'}`}>
                            {h.p === 'coop' ? 'COOP' : 'DEFECT'}
                        </span>
                        <span className="text-slate-500 text-[10px] italic">{h.res}</span>
                        <span className={`font-bold ${h.b === 'coop' ? 'text-teal-400' : 'text-rose-400'}`}>
                            {h.b === 'coop' ? 'COOP' : 'DEFECT'}
                        </span>
                    </div>
                ))}
                {history.length === 0 && (
                    <div className="text-center text-slate-600 text-xs py-4">Make your move...</div>
                )}
            </div>
        </div>

    </div>
  );
}