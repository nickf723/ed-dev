"use client";
import Link from "next/link";
import StringBackground from "@/app/humanities/music/StringBackground";
import HarmonyEngine from "@/app/humanities/music/HarmonyEngine";
import { 
  ArrowLeft, Music, Mic2, Radio, Speaker, ListMusic, 
  Piano, Guitar, Activity 
} from "lucide-react";

export default function MusicPage() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-200 overflow-hidden selection:bg-amber-500/30 font-sans">
      
      {/* 1. VISUAL ENGINE */}
      <StringBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950 pointer-events-none z-0" />

      {/* 2. DASHBOARD */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col pointer-events-none">
        
        {/* HEADER */}
        <header className="mb-16 pointer-events-auto text-center md:text-left">
             <Link href="/humanities" className="inline-flex items-center gap-2 text-xs font-mono text-amber-600 hover:text-amber-500 transition-colors mb-4 uppercase tracking-widest">
                <ArrowLeft size={12} /> Humanities // Arts
             </Link>
             <div className="flex flex-col md:flex-row items-center gap-4">
                 <div className="p-4 bg-slate-900 border border-amber-500/30 rounded-full shadow-[0_0_30px_rgba(245,158,11,0.1)]">
                    <Music size={40} className="text-amber-500" />
                 </div>
                 <div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-xl font-serif">
                        MUSIC
                    </h1>
                    <p className="text-amber-500/60 text-lg font-light tracking-wide italic">
                        The art of arranging sound in time.
                    </p>
                 </div>
             </div>
        </header>

        

[Image of musical notation]


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 flex-1 pointer-events-auto">
            
            {/* LEFT: THE ELEMENTS OF MUSIC */}
            <div className="lg:col-span-7 space-y-12">
                
                {/* CORE PILLARS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-900/80 border border-slate-700 p-6 rounded-xl hover:border-amber-500/50 transition-colors group">
                        <Activity className="text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="font-bold text-white mb-2">Rhythm</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            The placement of sounds in time. Beat, Tempo, and Meter.
                        </p>
                    </div>
                    <div className="bg-slate-900/80 border border-slate-700 p-6 rounded-xl hover:border-amber-500/50 transition-colors group">
                        <ListMusic className="text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="font-bold text-white mb-2">Melody</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            A sequence of single notes that is musically satisfying.
                        </p>
                    </div>
                    <div className="bg-slate-900/80 border border-slate-700 p-6 rounded-xl hover:border-amber-500/50 transition-colors group">
                        <Mic2 className="text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="font-bold text-white mb-2">Harmony</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            The combination of simultaneously sounded musical notes (Chords).
                        </p>
                    </div>
                </div>

                {/* INSTRUMENT FAMILIES */}
                <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6 font-serif">Instrument Families</h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                            <div className="p-3 bg-white/5 rounded"><Guitar size={20} className="text-slate-300"/></div>
                            <div>
                                <div className="font-bold text-amber-100">Strings</div>
                                <div className="text-xs text-slate-500">Violin, Guitar, Cello. Sound via vibrating strings.</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                            <div className="p-3 bg-white/5 rounded"><Radio size={20} className="text-slate-300"/></div>
                            <div>
                                <div className="font-bold text-amber-100">Woodwind & Brass</div>
                                <div className="text-xs text-slate-500">Flute, Saxophone, Trumpet. Sound via vibrating air columns.</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/5 rounded"><Piano size={20} className="text-slate-300"/></div>
                            <div>
                                <div className="font-bold text-amber-100">Percussion & Keys</div>
                                <div className="text-xs text-slate-500">Drums, Piano, Xylophone. Sound via impact.</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            {/* RIGHT: INTERACTIVE HARMONY */}
            <div className="lg:col-span-5 space-y-8">
                
                {/* WIDGET */}
                <HarmonyEngine />

                {/* ACOUSTICS CARD */}
                <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-6">
                    <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                        <Speaker size={18} className="text-amber-500" /> The Physics of Sound
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                        Music is math. Pitch is frequency (Hz). A440 is the standard tuning pitch. Octaves are a doubling of frequency (440Hz -{">"} 880Hz).
                    </p>
                    {/* Visual: Sine Wave */}
                    <div className="h-12 w-full flex items-center justify-center opacity-50">
                        <svg width="100%" height="40" viewBox="0 0 200 40" preserveAspectRatio="none">
                            <path d="M0 20 Q 25 40, 50 20 T 100 20 T 150 20 T 200 20" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-500" />
                        </svg>
                    </div>
                </div>

            </div>

        </div>
      </div>
    </main>
  );
}