"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DoorOpen, Trophy, Skull, RefreshCw, HelpCircle } from 'lucide-react';

export default function MontyHallLab() {
  const [doors, setDoors] = useState([0, 1, 2]);
  const [prizeDoor, setPrizeDoor] = useState<number | null>(null);
  const [selectedDoor, setSelectedDoor] = useState<number | null>(null);
  const [openedDoor, setOpenedDoor] = useState<number | null>(null);
  const [gamePhase, setGamePhase] = useState<'start' | 'pick' | 'reveal' | 'decision' | 'result'>('start');
  const [stats, setStats] = useState({ switchWins: 0, switchPlays: 0, stayWins: 0, stayPlays: 0 });

  // Initialize Game
  const startGame = () => {
    setPrizeDoor(Math.floor(Math.random() * 3));
    setSelectedDoor(null);
    setOpenedDoor(null);
    setGamePhase('pick');
  };

  // Step 1: User picks a door
  const handlePick = (doorIdx: number) => {
    if (gamePhase !== 'pick') return;
    setSelectedDoor(doorIdx);
    
    // Host opens a door (must not be prize, must not be selected)
    const possibleOpens = doors.filter(d => d !== prizeDoor && d !== doorIdx);
    const toOpen = possibleOpens[Math.floor(Math.random() * possibleOpens.length)];
    
    setTimeout(() => {
        setOpenedDoor(toOpen);
        setGamePhase('decision');
    }, 600);
  };

  // Step 2: Switch or Stay
  const handleDecision = (switchDoor: boolean) => {
    let finalDoor = selectedDoor;
    if (switchDoor) {
        finalDoor = doors.find(d => d !== selectedDoor && d !== openedDoor) || 0;
    }

    const win = finalDoor === prizeDoor;
    
    // Update Stats
    setStats(prev => ({
        switchWins: switchDoor && win ? prev.switchWins + 1 : prev.switchWins,
        switchPlays: switchDoor ? prev.switchPlays + 1 : prev.switchPlays,
        stayWins: !switchDoor && win ? prev.stayWins + 1 : prev.stayWins,
        stayPlays: !switchDoor ? prev.stayPlays + 1 : prev.stayPlays,
    }));

    setGamePhase('result');
    setSelectedDoor(finalDoor); // Visually update selection if switched
  };

  return (
    <div className="w-full bg-slate-900/90 border border-purple-500/20 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col">
      <div className="p-4 bg-black/20 border-b border-white/5 flex justify-between items-center">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <HelpCircle className="text-purple-400" size={16} /> The Monty Hall Paradox
        </h3>
        <button onClick={startGame} className="p-1 hover:text-white text-slate-500">
            <RefreshCw size={14} />
        </button>
      </div>

      <div className="p-8 flex flex-col items-center">
        
        {/* GAME PHASE INSTRUCTIONS */}
        <div className="mb-8 h-8 text-center">
            {gamePhase === 'start' && <button onClick={startGame} className="px-4 py-1 bg-purple-500 text-white font-bold rounded-full text-xs hover:scale-105 transition-transform">START SIMULATION</button>}
            {gamePhase === 'pick' && <span className="text-sm font-bold text-white animate-pulse">Select a Door</span>}
            {gamePhase === 'decision' && <span className="text-sm font-bold text-purple-300">Do you want to SWITCH?</span>}
            {gamePhase === 'result' && (
                <span className={`text-lg font-black uppercase ${selectedDoor === prizeDoor ? 'text-emerald-400' : 'text-red-400'}`}>
                    {selectedDoor === prizeDoor ? 'YOU WON!' : 'YOU LOST'}
                </span>
            )}
        </div>

        {/* THE DOORS */}
        <div className="flex gap-4 mb-8">
            {doors.map(door => (
                <div key={door} className="relative w-20 h-32 md:w-24 md:h-40 perspective-1000">
                    <motion.div 
                        className={`w-full h-full rounded-lg border-2 flex items-center justify-center cursor-pointer transition-colors relative overflow-hidden ${
                            selectedDoor === door ? 'border-purple-500 bg-purple-500/20' : 
                            openedDoor === door ? 'border-slate-800 bg-black/50' : 'border-white/10 bg-slate-800 hover:bg-slate-700'
                        }`}
                        onClick={() => handlePick(door)}
                        animate={{ 
                            rotateY: (openedDoor === door || gamePhase === 'result') ? 180 : 0 
                        }}
                        transition={{ duration: 0.6 }}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        {/* FRONT OF DOOR */}
                        <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center text-slate-500">
                            <span className="text-2xl font-black opacity-20">{door + 1}</span>
                            {selectedDoor === door && <div className="absolute bottom-2 text-[8px] font-bold text-purple-400 uppercase tracking-widest">Selected</div>}
                        </div>

                        {/* BACK OF DOOR (REVEAL) */}
                        <div className="absolute inset-0 bg-slate-900 backface-hidden flex items-center justify-center" style={{ transform: "rotateY(180deg)" }}>
                            {prizeDoor === door ? (
                                <Trophy className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" size={40} />
                            ) : (
                                <Skull className="text-slate-700" size={40} />
                            )}
                        </div>
                    </motion.div>
                </div>
            ))}
        </div>

        {/* CONTROLS */}
        {gamePhase === 'decision' && (
            <div className="flex gap-4">
                <button onClick={() => handleDecision(false)} className="px-6 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-xs font-bold text-slate-300">Stay</button>
                <button onClick={() => handleDecision(true)} className="px-6 py-2 rounded-lg bg-purple-500 hover:bg-purple-400 text-xs font-bold text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]">Switch!</button>
            </div>
        )}

        {/* STATS */}
        <div className="w-full mt-8 pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
            <StatBlock 
                label="Win % (Stay)" 
                val={stats.stayPlays > 0 ? ((stats.stayWins / stats.stayPlays) * 100).toFixed(1) + '%' : '--'} 
                sub={`(${stats.stayWins}/${stats.stayPlays})`}
                color="text-slate-400"
            />
            <StatBlock 
                label="Win % (Switch)" 
                val={stats.switchPlays > 0 ? ((stats.switchWins / stats.switchPlays) * 100).toFixed(1) + '%' : '--'} 
                sub={`(${stats.switchWins}/${stats.switchPlays})`}
                color="text-purple-400"
            />
        </div>
      </div>
    </div>
  );
}

function StatBlock({ label, val, sub, color }: any) {
    return (
        <div className="text-center">
            <div className="text-[9px] uppercase font-bold text-slate-600 mb-1">{label}</div>
            <div className={`text-2xl font-mono font-bold ${color}`}>{val}</div>
            <div className="text-[9px] font-mono text-slate-600">{sub}</div>
        </div>
    )
}