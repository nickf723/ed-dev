"use client";
import Link from "next/link";
import NeuralBackground from "@/app/social-science/psychology/NeuralBackground";
import MaslowPyramid from "@/app/social-science/psychology/MaslowPyramid";
import { 
  ArrowLeft, Brain, Puzzle, Eye, Fingerprint, 
  Activity, Zap, Lightbulb
} from "lucide-react";
import InkblotBackground from "./InkblotBackground";

export default function PsychologyPage() {
  return (
    <main className="relative min-h-screen bg-[#0f0518] text-slate-200 overflow-hidden selection:bg-pink-500/30 font-sans">
      
      {/* 1. VISUAL ENGINE */}
      <NeuralBackground />
      <InkblotBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] pointer-events-none z-0 mix-blend-overlay" />
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />

      {/* 2. DASHBOARD */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col pointer-events-none">
        
        {/* HEADER */}
        <header className="mb-16 pointer-events-auto text-center md:text-left">
             <Link href="/social-science" className="inline-flex items-center gap-2 text-xs font-mono text-pink-500 hover:text-pink-400 transition-colors mb-4 uppercase tracking-widest">
                <ArrowLeft size={12} /> Social Science // Psychology
             </Link>
             <div className="flex flex-col md:flex-row items-center gap-4">
                 <div className="p-4 bg-[#2e1065] border border-pink-500/30 rounded-full shadow-[0_0_30px_rgba(236,72,153,0.15)] relative overflow-hidden">
                    <div className="absolute inset-0 bg-pink-500/10 animate-pulse" />
                    <Brain size={40} className="text-pink-400 relative z-10" />
                 </div>
                 <div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-xl font-serif">
                        PSYCHOLOGY
                    </h1>
                    <p className="text-pink-400/60 text-lg font-light tracking-wide italic">
                        The science of mind, brain, and behavior.
                    </p>
                 </div>
             </div>
        </header>

        

[Image of human brain structure diagram]


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 flex-1 pointer-events-auto">
            
            {/* LEFT: THE SCHOOLS OF THOUGHT */}
            <div className="lg:col-span-7 space-y-8">
                
                {/* SCHOOLS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Psychoanalysis */}
                    <div className="bg-[#1e1b4b]/60 backdrop-blur-md border border-purple-500/20 p-6 rounded-xl hover:border-pink-500/50 transition-colors group">
                        <div className="flex items-center gap-3 mb-3">
                            <Fingerprint className="text-purple-400" />
                            <h3 className="font-bold text-white">Psychoanalysis</h3>
                        </div>
                        <p className="text-xs text-slate-400 mb-2">Sigmund Freud, Carl Jung</p>
                        <p className="text-sm text-slate-300">
                            Focuses on the unconscious mind, dreams, and childhood experiences as the root of behavior.
                        </p>
                    </div>

                    {/* Behaviorism */}
                    <div className="bg-[#1e1b4b]/60 backdrop-blur-md border border-purple-500/20 p-6 rounded-xl hover:border-pink-500/50 transition-colors group">
                        <div className="flex items-center gap-3 mb-3">
                            <Activity className="text-teal-400" />
                            <h3 className="font-bold text-white">Behaviorism</h3>
                        </div>
                        <p className="text-xs text-slate-400 mb-2">B.F. Skinner, Pavlov</p>
                        <p className="text-sm text-slate-300">
                            Rejects internal states. Focuses on observable behavior, conditioning, and stimulus-response.
                        </p>
                    </div>

                    {/* Cognitive */}
                    <div className="bg-[#1e1b4b]/60 backdrop-blur-md border border-purple-500/20 p-6 rounded-xl hover:border-pink-500/50 transition-colors group">
                        <div className="flex items-center gap-3 mb-3">
                            <Zap className="text-yellow-400" />
                            <h3 className="font-bold text-white">Cognitive Psych</h3>
                        </div>
                        <p className="text-xs text-slate-400 mb-2">Jean Piaget, Noam Chomsky</p>
                        <p className="text-sm text-slate-300">
                            Views the brain as an information processor. Studies memory, perception, language, and problem-solving.
                        </p>
                    </div>

                    {/* Humanism */}
                    <div className="bg-[#1e1b4b]/60 backdrop-blur-md border border-purple-500/20 p-6 rounded-xl hover:border-pink-500/50 transition-colors group">
                        <div className="flex items-center gap-3 mb-3">
                            <Lightbulb className="text-pink-400" />
                            <h3 className="font-bold text-white">Humanism</h3>
                        </div>
                        <p className="text-xs text-slate-400 mb-2">Carl Rogers, Abraham Maslow</p>
                        <p className="text-sm text-slate-300">
                            Emphasizes individual potential, growth, and the innate drive towards self-actualization.
                        </p>
                    </div>
                </div>

                {/* THE BRAIN CARD */}
                <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-white/10 rounded-xl p-8 flex items-center gap-8">
                    <div className="hidden md:block">
                        <Puzzle size={64} className="text-white/20" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white mb-2">Nature vs. Nurture</h2>
                        <p className="text-sm text-slate-300 leading-relaxed">
                            The eternal debate. Are we shaped by our biology (genetics, brain structure) or our environment (upbringing, culture)? Modern psychology suggests it's rarely one or the other, but an interaction of both: <span className="text-pink-400 font-bold">Epigenetics</span>.
                        </p>
                    </div>
                </div>

            </div>


            {/* RIGHT: INTERACTIVE WIDGET */}
            <div className="lg:col-span-5 space-y-8 flex flex-col items-center">
                
                {/* WIDGET */}
                <MaslowPyramid />

                {/* PERCEPTION TEST */}
                <div className="bg-black/40 border border-white/10 rounded-xl p-6 w-full text-center group cursor-pointer hover:bg-white/5 transition-colors">
                    <Eye size={24} className="mx-auto text-pink-500 mb-2 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-white mb-1">Gestalt Principles</h3>
                    <p className="text-xs text-slate-400">
                        "The whole is other than the sum of the parts."
                    </p>
                    <div className="mt-4 flex justify-center gap-2 opacity-50">
                        <div className="w-2 h-2 rounded-full bg-white" />
                        <div className="w-2 h-2 rounded-full bg-white" />
                        <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                </div>

            </div>

        </div>
      </div>
    </main>
  );
}