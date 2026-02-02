"use client";
import Link from "next/link";
import ScaleStreamBackground from "./ScaleStreamBackground";
import ModeShifterLab from "./ModeShifterLab";
import { 
  MoveHorizontal, Music, ArrowRight, Zap, 
  Ruler, LayoutList, GitBranch
} from "lucide-react";

export default function ScalesPage() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-teal-500/30">
      <ScaleStreamBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* HERO */}
        <header className="mb-16 border-b border-teal-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/humanities/music" className="p-2 bg-teal-500/10 border border-teal-500/30 rounded hover:bg-teal-500/20 transition-colors">
              <Music className="text-teal-400" size={20} />
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-teal-400">
              Music Theory // Melody
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
            SCALES <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-200">&</span><br/>
            <span className="text-slate-500">MODES</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-teal-500/50 pl-6">
            If chords are the landscape, scales are the path you walk. A scale is a specific sequence of intervals (Whole and Half steps) that defines the "pool" of notes available for a melody.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: THEORY */}
          <div className="lg:col-span-6 space-y-12">
            
            {/* The Major Formula */}
            <div className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Ruler size={20} className="text-teal-400" /> The Golden Formula
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Every Major scale follows the same physical pattern of distances between notes. Memorize this, and you can play in any key.
              </p>
              
              <div className="flex justify-between items-center text-center font-mono text-sm font-bold">
                 <Step label="W" sub="Whole" />
                 <Step label="W" sub="Whole" />
                 <Step label="H" sub="Half" color="text-teal-400" />
                 <Step label="W" sub="Whole" />
                 <Step label="W" sub="Whole" />
                 <Step label="W" sub="Whole" />
                 <Step label="H" sub="Half" color="text-teal-400" />
              </div>
            </div>
            
            

            {/* Pentatonic Note */}
            <div className="flex gap-4 p-4 bg-teal-900/10 border border-teal-500/20 rounded-xl">
                <LayoutList className="text-teal-500 shrink-0" />
                <div>
                    <h4 className="text-sm font-bold text-white uppercase">The Pentatonic Scale</h4>
                    <p className="text-xs text-slate-400 mt-1">
                        If you remove the "tense" intervals (4th and 7th) from the Major scale, you get the 5-note Pentatonic. It is nearly impossible to play a bad note in this scale.
                    </p>
                </div>
            </div>

            

          </div>

          {/* RIGHT: THE LAB */}
          <div className="lg:col-span-6 space-y-8">
            <ModeShifterLab />
            
            <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl">
               <h4 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
                   <GitBranch size={16} className="text-slate-400" /> What is a Mode?
               </h4>
               <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  A mode is just a Major scale starting on a different note. 
                  If you play the <strong>C Major</strong> scale (all white keys) but start and end on <strong>D</strong>, you are playing <strong>D Dorian</strong>.
               </p>
               <p className="text-xs text-slate-300 leading-relaxed">
                  The notes are the same, but the <em>center of gravity</em> shifts, changing the interval pattern and the emotion.
               </p>
            </div>
            
            
          </div>

        </div>
      </div>
    </main>
  );
}

function Step({ label, sub, color = "text-white" }: any) {
    return (
        <div className="flex flex-col items-center">
            <div className={`text-lg ${color}`}>{label}</div>
            <div className="text-[9px] text-slate-500 uppercase">{sub}</div>
        </div>
    )
}