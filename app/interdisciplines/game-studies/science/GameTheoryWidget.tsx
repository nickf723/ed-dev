"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Swords, Handshake, Trophy, RotateCcw, User, Bot } from "lucide-react";

type Choice = "cooperate" | "defect" | null;

export default function GameTheoryWidget() {
  const [playerChoice, setPlayerChoice] = useState<Choice>(null);
  const [botChoice, setBotChoice] = useState<Choice>(null);
  const [score, setScore] = useState({ p: 0, b: 0 });
  const [round, setRound] = useState(0);

  const play = (choice: "cooperate" | "defect") => {
      // Bot Strategy: Tit-for-Tat (Starts nice, then copies you)
      // On round 0, cooperate. Else, do what player did last time.
      // Since we don't store history in this simple version, let's use a probabilistic "Nice" bot
      // 80% Cooperate, 20% Defect to keep it spicy.
      const botMove = Math.random() > 0.2 ? "cooperate" : "defect";
      
      setPlayerChoice(choice);
      setBotChoice(botMove);
      
      // Calculate Payoff (Standard PD Matrix)
      // Both Coop: 3, 3
      // Both Defect: 1, 1
      // P Coop / B Defect: 0, 5
      // P Defect / B Coop: 5, 0
      
      let pAdd = 0;
      let bAdd = 0;

      if (choice === "cooperate" && botMove === "cooperate") { pAdd=3; bAdd=3; }
      else if (choice === "defect" && botMove === "defect") { pAdd=1; bAdd=1; }
      else if (choice === "cooperate" && botMove === "defect") { pAdd=0; bAdd=5; }
      else if (choice === "defect" && botMove === "cooperate") { pAdd=5; bAdd=0; }

      setScore(s => ({ p: s.p + pAdd, b: s.b + bAdd }));
      setRound(r => r + 1);
  };

  const reset = () => {
      setScore({ p: 0, b: 0 });
      setRound(0);
      setPlayerChoice(null);
      setBotChoice(null);
  };

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Swords size={14} className="text-purple-400" /> Prisoner's Dilemma
        </h3>
        <button onClick={reset}><RotateCcw size={14} className="text-neutral-600 hover:text-white" /></button>
      </div>

      <div className="p-6 flex flex-col items-center">
        
        {/* Scoreboard */}
        <div className="flex justify-between w-full mb-6 px-4">
            <div className="text-center">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-purple-400 mb-1">
                    <User size={12} /> You
                </div>
                <span className="text-2xl font-black text-white">{score.p}</span>
            </div>
            <div className="text-center">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-yellow-400 mb-1">
                    <Bot size={12} /> Opponent
                </div>
                <span className="text-2xl font-black text-white">{score.b}</span>
            </div>
        </div>

        {/* Result Area */}
        <div className="h-24 w-full bg-neutral-950/50 rounded-xl border border-white/5 flex items-center justify-center mb-6">
            {!playerChoice ? (
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest">Make your move</span>
            ) : (
                <div className="flex gap-8 items-center">
                    <div className={`flex flex-col items-center ${playerChoice === 'defect' ? "text-red-400" : "text-green-400"}`}>
                        {playerChoice === 'defect' ? <Swords size={24} /> : <Handshake size={24} />}
                        <span className="text-[9px] font-bold uppercase mt-1">{playerChoice}</span>
                    </div>
                    <span className="text-neutral-600 font-mono">VS</span>
                    <div className={`flex flex-col items-center ${botChoice === 'defect' ? "text-red-400" : "text-green-400"}`}>
                        {botChoice === 'defect' ? <Swords size={24} /> : <Handshake size={24} />}
                        <span className="text-[9px] font-bold uppercase mt-1">{botChoice}</span>
                    </div>
                </div>
            )}
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-3 w-full">
            <button 
                onClick={() => play("cooperate")}
                className="py-3 rounded-lg border border-green-500/30 bg-green-500/10 text-green-400 font-bold text-xs hover:bg-green-500/20 transition-all flex items-center justify-center gap-2"
            >
                <Handshake size={16} /> Cooperate
            </button>
            <button 
                onClick={() => play("defect")}
                className="py-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 font-bold text-xs hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
            >
                <Swords size={16} /> Defect
            </button>
        </div>

      </div>
    </div>
  );
}