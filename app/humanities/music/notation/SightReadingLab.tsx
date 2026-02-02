"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

export default function SightReadingLab() {
  const [clef, setClef] = useState<'treble' | 'bass'>('treble');
  const [currentNote, setCurrentNote] = useState<{name: string, pos: number} | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [streak, setStreak] = useState(0);

  // Note definitions: pos is visual offset from center line (0) in half-steps of line height
  // Treble: Center line is B4. 
  // Bass: Center line is D3.
  const trebleNotes = [
    { name: 'C', pos: 6 },  // Middle C (Below staff)
    { name: 'D', pos: 5 },
    { name: 'E', pos: 4 },  // Bottom Line
    { name: 'F', pos: 3 },  // Space
    { name: 'G', pos: 2 },  // Line
    { name: 'A', pos: 1 },  // Space
    { name: 'B', pos: 0 },  // Middle Line
    { name: 'C', pos: -1 }, // Space
    { name: 'D', pos: -2 }, // Line
    { name: 'E', pos: -3 }, // Space
    { name: 'F', pos: -4 }, // Top Line
    { name: 'G', pos: -5 }, // Above
  ];

  const bassNotes = [
    { name: 'E', pos: 6 },  // Below
    { name: 'F', pos: 5 },
    { name: 'G', pos: 4 },  // Bottom Line
    { name: 'A', pos: 3 },
    { name: 'B', pos: 2 },
    { name: 'C', pos: 1 },  // Middle C is way up, this is Bass C
    { name: 'D', pos: 0 },  // Middle Line
    { name: 'E', pos: -1 },
    { name: 'F', pos: -2 }, // F Line (Clef anchor)
    { name: 'G', pos: -3 },
    { name: 'A', pos: -4 }, // Top Line
    { name: 'B', pos: -5 },
  ];

  const pool = clef === 'treble' ? trebleNotes : bassNotes;

  const nextNote = () => {
    const random = pool[Math.floor(Math.random() * pool.length)];
    setCurrentNote(random);
    setFeedback(null);
  };

  useEffect(() => {
    nextNote();
  }, [clef]);

  const handleGuess = (noteName: string) => {
    if (!currentNote) return;
    if (noteName === currentNote.name) {
        setFeedback('correct');
        setStreak(s => s + 1);
        setTimeout(nextNote, 800);
    } else {
        setFeedback('wrong');
        setStreak(0);
    }
  };

  return (
    <div className="w-full bg-slate-900/90 border border-purple-500/20 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col">
      <div className="p-4 bg-black/20 border-b border-white/5 flex justify-between items-center">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <Eye className="text-purple-400" size={16} /> Sight Reading Trainer
        </h3>
        <div className="flex items-center gap-4">
            <div className="text-[10px] font-mono text-slate-500 uppercase">Streak: <span className="text-white font-bold">{streak}</span></div>
            <div className="flex bg-slate-800 rounded p-1">
                <button onClick={() => setClef('treble')} className={`px-2 py-1 text-[10px] uppercase font-bold rounded ${clef === 'treble' ? 'bg-purple-500 text-white' : 'text-slate-400'}`}>Treble</button>
                <button onClick={() => setClef('bass')} className={`px-2 py-1 text-[10px] uppercase font-bold rounded ${clef === 'bass' ? 'bg-purple-500 text-white' : 'text-slate-400'}`}>Bass</button>
            </div>
        </div>
      </div>

      <div className="p-8 flex flex-col items-center">
        
        {/* THE STAFF VISUALIZER */}
        <div className="relative w-full max-w-md h-40 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center mb-8 overflow-hidden">
            {/* Staff Lines */}
            <div className="absolute w-3/4 flex flex-col gap-4">
                {[0, 1, 2, 3, 4].map(i => (
                    <div key={i} className="w-full h-px bg-slate-500" />
                ))}
            </div>

            {/* Clef Symbol (Simplified for demo) */}
            <div className="absolute left-10 text-6xl text-slate-400 font-serif select-none">
                {clef === 'treble' ? '𝄞' : '𝄢'}
            </div>

            {/* The Note */}
            {currentNote && (
                <motion.div 
                    key={currentNote.name + currentNote.pos} // Re-render on change
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute"
                    style={{ 
                        // Each step is half the gap (8px approx if gap is 16px)
                        transform: `translateY(${currentNote.pos * 8}px)` 
                    }}
                >
                    <div className={`w-5 h-4 rounded-[50%] -rotate-12 ${feedback === 'correct' ? 'bg-emerald-500' : feedback === 'wrong' ? 'bg-red-500' : 'bg-white'}`} />
                    {/* Ledger Line logic simplified */}
                    {(Math.abs(currentNote.pos) >= 6) && (
                        <div className="absolute top-2 -left-2 w-9 h-px bg-slate-500" />
                    )}
                    <div className={`absolute bottom-2 right-0 w-px h-12 ${feedback === 'correct' ? 'bg-emerald-500' : 'bg-white'}`} />
                </motion.div>
            )}

            {/* Feedback Overlay */}
            {feedback && (
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]"
                >
                    {feedback === 'correct' ? <CheckCircle size={48} className="text-emerald-500" /> : <XCircle size={48} className="text-red-500" />}
                </motion.div>
            )}
        </div>

        {/* CONTROLS (Piano Keys) */}
        <div className="flex gap-2">
            {['C', 'D', 'E', 'F', 'G', 'A', 'B'].map((note) => (
                <button
                    key={note}
                    onClick={() => handleGuess(note)}
                    className="w-10 h-16 bg-white rounded-b-lg border-b-4 border-slate-300 active:border-b-0 active:translate-y-1 transition-all text-slate-900 font-bold flex items-end justify-center pb-2 hover:bg-purple-100"
                >
                    {note}
                </button>
            ))}
        </div>

      </div>
    </div>
  );
}