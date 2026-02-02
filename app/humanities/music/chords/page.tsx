"use client";
import Link from "next/link";
import HarmonicStackBackground from "./HarmonicStackBackground";
import ChordBuilderLab from "./ChordBuilderLab";
import { 
  Layers, Music, ArrowRight, Activity, 
  Menu, Grid3X3, Zap
} from "lucide-react";

export default function ChordsPage() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-rose-500/30">
      <HarmonicStackBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* HERO */}
        <header className="mb-16 border-b border-rose-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/humanities/music" className="p-2 bg-rose-500/10 border border-rose-500/30 rounded hover:bg-rose-500/20 transition-colors">
              <Music className="text-rose-400" size={20} />
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-rose-400">
              Music Theory // Harmony
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
            CHORDS <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-200">&</span><br/>
            <span className="text-slate-500">HARMONY</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-rose-500/50 pl-6">
            If melody is the line, harmony is the color. Chords are formed by stacking intervals vertically. The specific distance between these notes determines whether the sound is happy, sad, tense, or magical.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: THEORY */}
          <div className="lg:col-span-6 space-y-12">
            
            {/* The Triad Pitch */}
            <div className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Grid3X3 size={20} className="text-rose-400" /> The Triad
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                The most basic chord. It consists of three notes stacked in thirds:
              </p>
              <ul className="space-y-2 mt-4">
                  <li className="flex items-center gap-3 text-sm text-slate-300">
                     <span className="font-mono text-rose-400 font-bold">1</span>
                     <span>The Root (Defines the name)</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-300">
                     <span className="font-mono text-amber-400 font-bold">3</span>
                     <span>The Third (Defines the quality: Major/Minor)</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-300">
                     <span className="font-mono text-blue-400 font-bold">5</span>
                     <span>The Fifth (Adds stability)</span>
                  </li>
              </ul>
            </div>
            
            

            {/* Intervals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Feature title="Major Third" desc="4 Semitones. Bright, happy." color="bg-amber-500" />
                <Feature title="Minor Third" desc="3 Semitones. Dark, sad." color="bg-slate-500" />
                <Feature title="Perfect Fifth" desc="7 Semitones. Powerful, open." color="bg-blue-500" />
                <Feature title="Tritone" desc="6 Semitones. The 'Devil in Music'." color="bg-red-500" />
            </div>

            

            {/* Extensions Note */}
            <div className="flex gap-4 p-4 bg-rose-900/10 border border-rose-500/20 rounded-xl">
                <Zap className="text-rose-500 shrink-0" />
                <div>
                    <h4 className="text-sm font-bold text-white uppercase">Extensions (Jazz)</h4>
                    <p className="text-xs text-slate-400 mt-1">
                        You can keep stacking! Adding a 7th, 9th, 11th, or 13th creates complex, lush textures used in Jazz and R&B.
                    </p>
                </div>
            </div>

          </div>

          {/* RIGHT: THE LAB */}
          <div className="lg:col-span-6 space-y-8">
            <ChordBuilderLab />
            
            <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl">
               <h4 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
                   <Activity size={16} className="text-slate-400" /> Inversions
               </h4>
               <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  You don't always have to put the Root at the bottom. Shuffling the order creates smoother voice leading between chords.
               </p>
               <div className="font-mono text-xs space-y-2">
                  <div className="p-2 bg-black/40 rounded border-l-2 border-rose-400 text-slate-400">
                     Root Pos: <span className="text-white">C - E - G</span>
                  </div>
                  <div className="p-2 bg-black/40 rounded border-l-2 border-amber-400 text-slate-400">
                     1st Inv: <span className="text-white">E - G - C</span>
                  </div>
                  <div className="p-2 bg-black/40 rounded border-l-2 border-blue-400 text-slate-400">
                     2nd Inv: <span className="text-white">G - C - E</span>
                  </div>
               </div>
            </div>
            
            
          </div>

        </div>
      </div>
    </main>
  );
}

function Feature({ title, desc, color }: any) {
    return (
        <div className="p-4 bg-black/40 border border-white/5 rounded-xl hover:border-white/20 transition-colors flex gap-3 items-start">
            <div className={`w-2 h-2 rounded-full mt-1.5 ${color}`} />
            <div>
                <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
                <p className="text-xs text-slate-400 leading-snug">{desc}</p>
            </div>
        </div>
    )
}