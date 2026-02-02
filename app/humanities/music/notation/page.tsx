"use client";
import Link from "next/link";
import ScoreFlowBackground from "./ScoreFlowBackground";
import SightReadingLab from "./SightReadingLab";
import { 
  FileAudio, Music, ArrowRight, PenTool, 
  Hash, AlignLeft, Flag
} from "lucide-react";

export default function NotationPage() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-purple-500/30">
      <ScoreFlowBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* HERO */}
        <header className="mb-16 border-b border-purple-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/humanities/music" className="p-2 bg-purple-500/10 border border-purple-500/30 rounded hover:bg-purple-500/20 transition-colors">
              <Music className="text-purple-400" size={20} />
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-purple-400">
              Music Theory // Reading
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
            MUSIC <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">NOTATION</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-purple-500/50 pl-6">
            Notation is the code of music. It provides a coordinate system for pitch (vertical) and time (horizontal), allowing complex symphonies to be preserved and reproduced centuries later.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: THEORY */}
          <div className="lg:col-span-6 space-y-12">
            
            {/* The Staff Pitch */}
            <div className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <AlignLeft size={20} className="text-purple-400" /> The Grand Staff
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Music is written on 5 lines. Notes can sit <strong>on a line</strong> or <strong>in a space</strong>.
              </p>
              

[Image of grand staff diagram with middle C]

              <div className="mt-4 space-y-2">
                 <div className="flex gap-4 p-3 bg-black/40 rounded border border-white/5">
                    <div className="text-4xl font-serif text-white leading-none">𝄞</div>
                    <div>
                        <div className="text-xs font-bold text-purple-400 uppercase">Treble Clef (G Clef)</div>
                        <div className="text-[10px] text-slate-500">For high instruments (Violin, Flute, Right Hand). The curl wraps around the G line.</div>
                    </div>
                 </div>
                 <div className="flex gap-4 p-3 bg-black/40 rounded border border-white/5">
                    <div className="text-4xl font-serif text-white leading-none">𝄢</div>
                    <div>
                        <div className="text-xs font-bold text-purple-400 uppercase">Bass Clef (F Clef)</div>
                        <div className="text-[10px] text-slate-500">For low instruments (Cello, Tuba, Left Hand). The dots surround the F line.</div>
                    </div>
                 </div>
              </div>
            </div>

            {/* Note Anatomy */}
            <div className="grid grid-cols-2 gap-4">
                <Feature title="Head" desc="The oval part. Determines the pitch." icon="●" />
                <Feature title="Stem" desc="The vertical line. Points up or down." icon="|" />
                <Feature title="Flag" desc="The curved tail. Halves the duration." icon="🚩" />
                <Feature title="Beam" desc="Connects multiple flagged notes." icon="▬▬" />
            </div>

            

            {/* Accidentals */}
            <div className="flex gap-4 p-4 bg-purple-900/10 border border-purple-500/20 rounded-xl">
                <Hash className="text-purple-500 shrink-0" />
                <div>
                    <h4 className="text-sm font-bold text-white uppercase">Accidentals</h4>
                    <p className="text-xs text-slate-400 mt-1">
                        Symbols that alter pitch temporarily. 
                        <strong> Sharp (♯)</strong> raises by one semitone. 
                        <strong> Flat (♭)</strong> lowers by one semitone. 
                        <strong> Natural (♮)</strong> cancels them out.
                    </p>
                </div>
            </div>

          </div>

          {/* RIGHT: THE LAB */}
          <div className="lg:col-span-6 space-y-8">
            <SightReadingLab />
            
            <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl">
               <h4 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
                   <PenTool size={16} className="text-slate-400" /> Mnemonics
               </h4>
               <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  How musicians memorize the lines and spaces:
               </p>
               
               <div className="grid grid-cols-2 gap-4">
                   <div className="bg-black/40 p-3 rounded">
                       <div className="text-[10px] text-purple-400 uppercase font-bold mb-1">Treble Lines</div>
                       <div className="text-sm font-bold text-white">E G B D F</div>
                       <div className="text-[9px] text-slate-500 italic">Every Good Boy Does Fine</div>
                   </div>
                   <div className="bg-black/40 p-3 rounded">
                       <div className="text-[10px] text-purple-400 uppercase font-bold mb-1">Treble Spaces</div>
                       <div className="text-sm font-bold text-white">F A C E</div>
                       <div className="text-[9px] text-slate-500 italic">Spells "FACE"</div>
                   </div>
                   <div className="bg-black/40 p-3 rounded">
                       <div className="text-[10px] text-purple-400 uppercase font-bold mb-1">Bass Lines</div>
                       <div className="text-sm font-bold text-white">G B D F A</div>
                       <div className="text-[9px] text-slate-500 italic">Good Boys Do Fine Always</div>
                   </div>
                   <div className="bg-black/40 p-3 rounded">
                       <div className="text-[10px] text-purple-400 uppercase font-bold mb-1">Bass Spaces</div>
                       <div className="text-sm font-bold text-white">A C E G</div>
                       <div className="text-[9px] text-slate-500 italic">All Cows Eat Grass</div>
                   </div>
               </div>
            </div>
            
            
          </div>

        </div>
      </div>
    </main>
  );
}

function Feature({ title, desc, icon }: any) {
    return (
        <div className="p-4 bg-black/40 border border-white/5 rounded-xl hover:border-purple-500/30 transition-colors flex gap-3 items-center">
            <div className="text-xl text-purple-400 font-serif w-8 text-center">{icon}</div>
            <div>
                <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
                <p className="text-xs text-slate-400 leading-snug">{desc}</p>
            </div>
        </div>
    )
}