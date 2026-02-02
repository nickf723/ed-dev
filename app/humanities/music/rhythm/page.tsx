"use client";
import Link from "next/link";
import PolyrhythmBackground from "./PolyrhythmBackground";
import RhythmSequencerLab from "./RhythmSequencerLab";
import { 
  Repeat, Music, ArrowRight, Zap, 
  Watch, Activity, Divide
} from "lucide-react";

export default function RhythmPage() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-teal-500/30">
      <PolyrhythmBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* HERO */}
        <header className="mb-16 border-b border-teal-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/humanities/music" className="p-2 bg-teal-500/10 border border-teal-500/30 rounded hover:bg-teal-500/20 transition-colors">
              <Music className="text-teal-400" size={20} />
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-teal-400">
              Music Theory // Time
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
            RHYTHM <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-200">&</span><br/>
            <span className="text-slate-500">METER</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-teal-500/50 pl-6">
            Rhythm is the organization of music in time. It determines when notes are played, for how long, and with what emphasis. It is the heartbeat that transforms sound into a groove.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: THEORY */}
          <div className="lg:col-span-6 space-y-12">
            
            {/* Time Signature */}
            <div className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Watch size={20} className="text-teal-400" /> The Time Signature
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                The fraction at the start of the staff. It tells you the grid size of the measure.
              </p>
              
              <div className="flex gap-6 items-center">
                 <div className="flex flex-col items-center font-black text-4xl text-white font-serif leading-none">
                    <span>4</span>
                    <span>4</span>
                 </div>
                 <div className="space-y-2 text-xs">
                    <div className="flex gap-2 items-center">
                        <span className="text-teal-400 font-bold">Top:</span>
                        <span className="text-slate-400">4 beats per measure.</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <span className="text-teal-400 font-bold">Bottom:</span>
                        <span className="text-slate-400">Quarter note gets the beat.</span>
                    </div>
                 </div>
              </div>
            </div>
            
            [Image of musical note duration tree]

            {/* Note Values */}
            <div className="grid grid-cols-2 gap-4">
                <Feature title="Quarter Note (1/4)" desc="The standard beat (The Walk)." icon="♩" />
                <Feature title="Eighth Note (1/8)" desc="Twice as fast (The Jog)." icon="♫" />
                <Feature title="Sixteenth (1/16)" desc="Four per beat (The Sprint)." icon="♬" />
                <Feature title="Triplet (1/3)" desc="Three notes in the space of two." icon="3" />
            </div>

            [Image of time signatures simple vs compound]

            {/* Syncopation Note */}
            <div className="flex gap-4 p-4 bg-teal-900/10 border border-teal-500/20 rounded-xl">
                <Zap className="text-teal-500 shrink-0" />
                <div>
                    <h4 className="text-sm font-bold text-white uppercase">Syncopation</h4>
                    <p className="text-xs text-slate-400 mt-1">
                        Placing an accent on a <strong>weak beat</strong> (the "and" of the beat). This creates surprise and "groove" (used heavily in Funk, Jazz, and Latin music).
                    </p>
                </div>
            </div>

          </div>

          {/* RIGHT: THE LAB */}
          <div className="lg:col-span-6 space-y-8">
            <RhythmSequencerLab />
            
            <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl">
               <h4 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
                   <Divide size={16} className="text-slate-400" /> Polyrhythms
               </h4>
               <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  When two different rhythms play simultaneously. Look at the background:
               </p>
               <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-xs text-slate-400">
                     <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                     <span><strong>4/4 Ring:</strong> Pulses 4 times per cycle.</span>
                  </li>
                  <li className="flex items-center gap-3 text-xs text-slate-400">
                     <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                     <span><strong>3/4 Ring:</strong> Pulses 3 times per cycle.</span>
                  </li>
                  <li className="flex items-center gap-3 text-xs text-slate-400">
                     <span className="w-1.5 h-1.5 rounded-full bg-white" />
                     <span><strong>The Downbeat:</strong> They only meet perfectly at the start of the loop (The "1").</span>
                  </li>
               </ul>
            </div>
            
            [Image of 3 against 2 polyrhythm notation]
          </div>

        </div>
      </div>
    </main>
  );
}

function Feature({ title, desc, icon }: any) {
    return (
        <div className="p-4 bg-black/40 border border-white/5 rounded-xl hover:border-teal-500/30 transition-colors flex gap-3 items-center">
            <div className="text-2xl text-teal-400 font-serif w-8 text-center">{icon}</div>
            <div>
                <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
                <p className="text-xs text-slate-400 leading-snug">{desc}</p>
            </div>
        </div>
    )
}