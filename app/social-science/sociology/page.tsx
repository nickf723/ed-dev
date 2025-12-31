"use client";
import Link from "next/link";
import NetworkGraph from "@/app/social-science/sociology/NetworkGraph";
import SchellingModel from "@/app/social-science/sociology/SchellingModel";
import { 
  ArrowLeft, Globe2, Network, Users, Building, 
  Search, Layers
} from "lucide-react";

export default function SociologyPage() {
  return (
    <main className="relative min-h-screen bg-[#0f172a] text-slate-200 overflow-hidden selection:bg-cyan-500/30 font-sans">
      
      {/* 1. VISUAL ENGINE */}
      <NetworkGraph />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] pointer-events-none z-0 mix-blend-overlay" />
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />

      {/* 2. DASHBOARD */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col pointer-events-none">
        
        {/* HEADER */}
        <header className="mb-16 pointer-events-auto text-center md:text-left">
             <Link href="/social-science" className="inline-flex items-center gap-2 text-xs font-mono text-cyan-500 hover:text-cyan-400 transition-colors mb-4 uppercase tracking-widest">
                <ArrowLeft size={12} /> Social Science // Sociology
             </Link>
             <div className="flex flex-col md:flex-row items-center gap-4">
                 <div className="p-4 bg-slate-900 border border-cyan-500/30 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.15)] relative overflow-hidden">
                    <div className="absolute inset-0 bg-cyan-500/5 animate-pulse" />
                    <Globe2 size={40} className="text-cyan-400 relative z-10" />
                 </div>
                 <div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-xl font-serif">
                        SOCIOLOGY
                    </h1>
                    <p className="text-cyan-500/60 text-lg font-light tracking-wide italic">
                        The study of the development, structure, and functioning of human society.
                    </p>
                 </div>
             </div>
        </header>

        

[Image of social network analysis graph]


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 flex-1 pointer-events-auto">
            
            {/* LEFT: THE THREE PERSPECTIVES */}
            <div className="lg:col-span-7 space-y-8">
                
                <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 p-8 rounded-xl relative overflow-hidden">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Layers size={24} className="text-cyan-500" /> The Three Perspectives
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="mt-1"><Building size={20} className="text-slate-500" /></div>
                            <div>
                                <h3 className="font-bold text-cyan-100">Functionalism</h3>
                                <p className="text-sm text-slate-400">Society is a complex system whose parts work together to promote solidarity and stability. (Durkheim)</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="mt-1"><Search size={20} className="text-slate-500" /></div>
                            <div>
                                <h3 className="font-bold text-cyan-100">Conflict Theory</h3>
                                <p className="text-sm text-slate-400">Society is in a state of perpetual conflict because of competition for limited resources. (Marx)</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="mt-1"><Users size={20} className="text-slate-500" /></div>
                            <div>
                                <h3 className="font-bold text-cyan-100">Symbolic Interactionism</h3>
                                <p className="text-sm text-slate-400">Society is viewed as composed of symbols that people use to establish meaning, develop their views of the world, and communicate. (Weber)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SOCIAL FACT */}
                <div className="bg-gradient-to-r from-cyan-900/20 to-slate-900 border border-cyan-500/20 rounded-xl p-8">
                    <h2 className="text-xl font-bold text-white mb-2">Social Facts</h2>
                    <p className="text-sm text-slate-300 leading-relaxed">
                        Émile Durkheim defined social facts as values, cultural norms, and social structures that transcend the individual and can exercise social control. They are "things" that exist outside of us but control us (e.g., the law, fashion trends, language).
                    </p>
                </div>

            </div>


            {/* RIGHT: INTERACTIVE WIDGET */}
            <div className="lg:col-span-5 space-y-8 flex flex-col items-center">
                
                {/* WIDGET */}
                <SchellingModel />

                {/* NETWORK THEORY */}
                <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-6 w-full">
                    <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                        <Network size={18} className="text-indigo-400" /> The Strength of Weak Ties
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        Mark Granovetter's theory suggests that acquaintances ("weak ties") are often more important than close friends ("strong ties") for finding jobs or spreading new ideas, because they bridge otherwise disconnected social groups.
                    </p>
                </div>

            </div>

        </div>
      </div>
    </main>
  );
}