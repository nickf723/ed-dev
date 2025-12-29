"use client";
import Link from "next/link";
import NavigationBackground from "@/app/humanities/history/early-modern/NavigationBackground";
import CosmosWidget from "@/app/humanities/history/early-modern/CosmosWidget";
import { 
  ArrowLeft, Compass, Ship, Feather, BookOpen, 
  Lightbulb, Globe
} from "lucide-react";

export default function EarlyModernPage() {
  return (
    <main className="relative min-h-screen bg-[#1e1b4b] text-indigo-100 overflow-hidden selection:bg-amber-500/30 font-serif">
      
      {/* 1. VISUAL ENGINE */}
      <NavigationBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] pointer-events-none z-0 mix-blend-overlay" />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      {/* 2. DASHBOARD */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col pointer-events-none">
        
        {/* HEADER */}
        <header className="mb-16 pointer-events-auto">
             <Link href="/humanities/history" className="flex items-center gap-2 text-xs font-mono text-amber-500 hover:text-amber-400 transition-colors mb-4 uppercase tracking-widest">
                <ArrowLeft size={12} /> History // Early Modern
             </Link>
             <div className="flex items-center gap-4">
                 <div className="p-3 bg-[#312e81] border border-amber-500/50 rounded-full shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                    <Compass size={32} className="text-amber-400" />
                 </div>
                 <h1 className="text-5xl md:text-7xl font-black text-amber-50 tracking-tighter drop-shadow-xl font-serif">
                    AGE OF DISCOVERY
                 </h1>
             </div>
             <p className="mt-4 text-indigo-300 max-w-xl text-lg italic border-l-2 border-amber-600 pl-4">
                 c. 1450 - 1789. The Renaissance, The Reformation, and The Enlightenment. The world becomes connected, and reason challenges tradition.
             </p>
        </header>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 flex-1 pointer-events-auto">
            
            {/* LEFT: THE THREE REVOLUTIONS */}
            <div className="lg:col-span-7 space-y-8">
                
                {/* RENAISSANCE */}
                <div className="bg-[#312e81]/80 backdrop-blur-md border border-indigo-500/30 p-8 rounded-xl relative overflow-hidden group">
                    <div className="flex items-center gap-3 mb-6">
                        <Feather size={24} className="text-amber-400" />
                        <h2 className="text-2xl font-bold text-white font-serif">The Renaissance</h2>
                    </div>
                    <p className="text-indigo-200 text-sm leading-relaxed mb-6">
                        A rebirth of classical learning in art, literature, and philosophy. Starting in Italy, Humanism shifted focus from the divine to the human potential.
                    </p>
                    <div className="flex gap-2">
                        <span className="bg-black/30 px-3 py-1 rounded text-xs text-amber-200 border border-white/10">Leonardo da Vinci</span>
                        <span className="bg-black/30 px-3 py-1 rounded text-xs text-amber-200 border border-white/10">Michelangelo</span>
                        <span className="bg-black/30 px-3 py-1 rounded text-xs text-amber-200 border border-white/10">Machiavelli</span>
                    </div>
                </div>

                {/* SCIENTIFIC REVOLUTION */}
                <div className="bg-[#312e81]/80 backdrop-blur-md border border-indigo-500/30 p-8 rounded-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <Lightbulb size={24} className="text-sky-400" />
                        <h2 className="text-2xl font-bold text-white font-serif">The Scientific Revolution</h2>
                    </div>
                    <p className="text-indigo-200 text-sm leading-relaxed mb-4">
                        The emergence of modern science. Observation and mathematics replaced ancient authority.
                    </p>
                    <div className="bg-black/20 p-4 rounded border border-white/5 flex justify-between items-center">
                        <div>
                            <div className="text-xs font-bold text-white">THE SCIENTIFIC METHOD</div>
                            <div className="text-[10px] text-indigo-400">Hypothesis → Experiment → Conclusion</div>
                        </div>
                        <div className="text-sky-400 font-bold text-xl">1620</div>
                    </div>
                </div>
                
                {/* EXPLORATION */}
                <div className="bg-[#312e81]/80 backdrop-blur-md border border-indigo-500/30 p-8 rounded-xl flex gap-6 items-center">
                    <div className="p-4 bg-black/20 rounded-full border border-white/10">
                        <Ship size={32} className="text-amber-500" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white mb-2">Global Connection</h2>
                        <p className="text-sm text-indigo-200 leading-relaxed">
                            The Columbian Exchange. The Americas were integrated into the global trade network, leading to massive biological and cultural exchange (and devastation).
                        </p>
                    </div>
                </div>
                

            </div>


            {/* RIGHT: INTERACTIVE COSMOS */}
            <div className="lg:col-span-5 space-y-8">
                
                {/* WIDGET */}
                <CosmosWidget />

                {/* PRINTING PRESS */}
                <div className="bg-[#312e81]/80 border border-indigo-500/30 rounded-xl p-6">
                    <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                        <BookOpen size={18} className="text-amber-400" /> The Printing Press (1440)
                    </h3>
                    <p className="text-xs text-indigo-300 leading-relaxed mb-4">
                        Johannes Gutenberg's movable type allowed ideas to spread at exponential speeds, making the Reformation and Scientific Revolution possible.
                    </p>
                    {/* Simple Bar Chart Visual */}
                    <div className="flex items-end gap-1 h-16 opacity-80">
                         <div className="w-1/4 bg-amber-700 h-[10%]" title="Manuscripts"></div>
                         <div className="w-1/4 bg-amber-600 h-[20%]"></div>
                         <div className="w-1/4 bg-amber-500 h-[60%]"></div>
                         <div className="w-1/4 bg-amber-400 h-[100%]" title="Printed Books"></div>
                    </div>
                    <div className="text-[10px] text-center mt-1 text-indigo-400">LITERACY RATE EXPLOSION</div>
                </div>

            </div>

        </div>
      </div>
    </main>
  );
}