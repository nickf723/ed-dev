"use client";
import Link from "next/link";
import WaveInterferenceBackground from "./WaveInterferenceBackground";
import CircleOfFifthsLab from "./CircleOfFifthsLab";
import { 
  Music, Mic2, FileAudio, Repeat, 
  ArrowRight, Activity, Zap, MoveHorizontal
} from "lucide-react";

export default function MusicTheoryPage() {
  // Navigation Modules
  const modules = [
    { 
      title: "Chords & Harmony", 
      href: "/humanities/music/chords", 
      icon: LayersIcon, 
      color: "text-amber-400", 
      border: "hover:border-amber-500/50",
      bg: "hover:bg-amber-500/10",
      desc: "How notes stack together to create emotion. Major, Minor, Diminished, and 7ths." 
    },
    { 
      title: "Scales & Modes", 
      href: "/humanities/music/scales", 
      icon: MoveHorizontal, 
      color: "text-rose-400", 
      border: "hover:border-rose-500/50",
      bg: "hover:bg-rose-500/10",
      desc: "The linear organization of pitch. Major, Minor, Dorian, Phrygian, and Lydian." 
    },
    { 
      title: "Rhythm & Meter", 
      href: "/humanities/music/rhythm", 
      icon: Repeat, 
      color: "text-teal-400", 
      border: "hover:border-teal-500/50",
      bg: "hover:bg-teal-500/10",
      desc: "The organization of time. Time signatures, polyrhythms, and syncopation." 
    },
    { 
      title: "Notation", 
      href: "/humanities/music/notation", 
      icon: FileAudio, 
      color: "text-purple-400", 
      border: "hover:border-purple-500/50",
      bg: "hover:bg-purple-500/10",
      desc: "Reading the map. Staff, clefs, key signatures, and articulation symbols." 
    },
  ];

  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-amber-500/30">
      <WaveInterferenceBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* HERO */}
        <header className="mb-16 border-b border-amber-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/humanities" className="p-2 bg-amber-500/10 border border-amber-500/30 rounded hover:bg-amber-500/20 transition-colors">
              <Music className="text-amber-400" size={20} />
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-400">
              Humanities // Arts
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
            MUSIC <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">THEORY</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-amber-500/50 pl-6">
            Music is physics felt by the soul. Theory is the study of the patterns, structures, and mathematical relationships that make sound pleasing, tense, or resolving.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: THEORY & MODULES */}
          <div className="lg:col-span-6 space-y-12">
            
            {/* Physics of Sound */}
            <div className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Activity size={20} className="text-amber-400" /> The Overtone Series
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                When you pluck a string, you don't just hear one note. You hear a fundamental frequency plus a series of fainter, higher frequencies (Harmonics). These ratios (2:1, 3:2, 4:3) are the physical basis for all chords.
              </p>
            </div>
            
            

            {/* Navigation Grid */}
            <div>
               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Mic2 size={14} /> Core Curriculum
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {modules.map((m) => (
                   <Link 
                     key={m.title} 
                     href={m.href}
                     className={`group p-5 bg-black/40 border border-white/5 rounded-xl transition-all hover:-translate-y-1 ${m.border} ${m.bg}`}
                   >
                      <div className="flex items-start justify-between mb-3">
                         <m.icon className={m.color} size={24} />
                         <ArrowRight size={16} className={`opacity-0 group-hover:opacity-100 transition-opacity ${m.color}`} />
                      </div>
                      <h4 className="font-bold text-white text-sm mb-1">{m.title}</h4>
                      <p className="text-xs text-slate-400 leading-snug">{m.desc}</p>
                   </Link>
                 ))}
               </div>
            </div>

            

[Image of piano keyboard note layout]


            {/* Interval Card */}
            <div className="flex gap-4 p-4 bg-teal-900/10 border border-teal-500/20 rounded-xl">
                <Zap className="text-teal-500 shrink-0" />
                <div>
                    <h4 className="text-sm font-bold text-white uppercase">Intervals</h4>
                    <p className="text-xs text-slate-400 mt-1">
                        The distance between two notes. A <strong>Perfect Fifth</strong> (7 semitones) is the most stable interval after the Octave. A <strong>Tritone</strong> (6 semitones) is the most unstable ("The Devil's Interval").
                    </p>
                </div>
            </div>

          </div>

          {/* RIGHT: THE LAB */}
          <div className="lg:col-span-6 space-y-8">
            <CircleOfFifthsLab />
            
            <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl">
               <h4 className="text-sm font-bold text-white uppercase mb-4">Why the Circle Matters?</h4>
               <p className="text-xs text-slate-300 leading-relaxed">
                  The Circle of Fifths is the periodic table of music. It tells you:
               </p>
               <ul className="mt-3 space-y-2">
                  <li className="flex items-center gap-3 text-xs text-slate-400">
                     <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                     <span>Which keys are "close" to each other (share notes).</span>
                  </li>
                  <li className="flex items-center gap-3 text-xs text-slate-400">
                     <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                     <span>How many sharps/flats are in a key signature.</span>
                  </li>
                  <li className="flex items-center gap-3 text-xs text-slate-400">
                     <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                     <span>The path of harmonic resolution (V resolving to I).</span>
                  </li>
               </ul>
            </div>
            
            

[Image of circle of fifths diagram]

          </div>

        </div>
      </div>
    </main>
  );
}

// Icon helper
function LayersIcon({ className, size }: any) {
    return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
}