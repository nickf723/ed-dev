"use client";
import Link from "next/link";
import GlassBackground from "@/app/humanities/history/medieval/GlassBackground";
import FeudalPyramid from "@/app/humanities/history/medieval/FeudalPyramid";
import { 
  ArrowLeft, Castle, Crown, Book, Skull, Church, 
  Sword, Scroll,
  Hammer
} from "lucide-react";

export default function MedievalPage() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0a] text-stone-300 overflow-hidden selection:bg-red-900/30 font-serif">
      
      {/* 1. VISUAL ENGINE */}
      <GlassBackground />
      
      {/* OVERLAY: Parchment Grain & Vignette */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] pointer-events-none z-0 mix-blend-overlay" />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none z-0" />

      {/* 2. DASHBOARD */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col pointer-events-none">
        
        {/* HEADER */}
        <header className="mb-16 pointer-events-auto">
             <Link href="/humanities/history" className="flex items-center gap-2 text-xs font-mono text-red-500 hover:text-red-400 transition-colors mb-4 uppercase tracking-widest">
                <ArrowLeft size={12} /> History // Medieval
             </Link>
             <div className="flex items-center gap-4">
                 <div className="p-3 bg-[#292524] border border-red-900/50 rounded-sm shadow-[0_0_20px_rgba(153,27,27,0.3)]">
                    <Castle size={32} className="text-red-600" />
                 </div>
                 <h1 className="text-5xl md:text-7xl font-black text-[#e7e5e4] tracking-tighter drop-shadow-xl font-serif">
                    THE MIDDLE AGES
                 </h1>
             </div>
             <p className="mt-4 text-stone-500 max-w-xl text-lg italic border-l-2 border-red-900 pl-4">
                 From the fall of Rome to the dawn of the Renaissance. An era of faith, feudalism, and fortress building.
             </p>
        </header>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 flex-1 pointer-events-auto">
            
            {/* LEFT: THE THREE ESTATES */}
            <div className="lg:col-span-7 space-y-8">
                
                {/* THE ESTATES CARD */}
                <div className="bg-[#1c1917]/90 backdrop-blur-md border border-stone-800 p-8 rounded-sm shadow-2xl relative overflow-hidden group hover:border-red-900/30 transition-colors">
                    
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Scroll className="text-stone-500" /> The Three Estates
                    </h2>
                    
                    <p className="text-stone-400 text-sm leading-relaxed mb-6">
                        Medieval society was strictly divided into three orders, each with a specific role ordained by God.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-black/30 p-4 border border-white/5 text-center">
                            <Church className="mx-auto text-amber-500 mb-2" />
                            <div className="text-xs font-bold text-white uppercase">Oratores</div>
                            <div className="text-[10px] text-stone-500 italic">"Those who pray"</div>
                            <div className="text-[10px] text-stone-600 mt-1">Clergy</div>
                        </div>
                        <div className="bg-black/30 p-4 border border-white/5 text-center">
                            <Sword className="mx-auto text-red-500 mb-2" />
                            <div className="text-xs font-bold text-white uppercase">Bellatores</div>
                            <div className="text-[10px] text-stone-500 italic">"Those who fight"</div>
                            <div className="text-[10px] text-stone-600 mt-1">Nobility</div>
                        </div>
                        <div className="bg-black/30 p-4 border border-white/5 text-center">
                            <Hammer className="mx-auto text-stone-400 mb-2" />
                            <div className="text-xs font-bold text-white uppercase">Laboratores</div>
                            <div className="text-[10px] text-stone-500 italic">"Those who work"</div>
                            <div className="text-[10px] text-stone-600 mt-1">Peasantry</div>
                        </div>
                    </div>
                </div>

                {/* THE BLACK DEATH */}
                <div className="bg-[#1c1917]/90 backdrop-blur-md border border-stone-800 p-6 rounded-sm shadow-2xl flex gap-6 items-center">
                    <div className="p-4 bg-black/40 rounded-full border border-stone-800">
                        <Skull size={32} className="text-stone-500" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white mb-2">The Black Death (1347-1351)</h2>
                        <p className="text-sm text-stone-400 leading-relaxed">
                            The bubonic plague wiped out ~30-60% of Europe's population. This catastrophe actually improved wages for survivors and helped end serfdom by creating a labor shortage.
                        </p>
                    </div>
                </div>

            </div>


            {/* RIGHT: INTERACTIVE FEUDALISM */}
            <div className="lg:col-span-5 space-y-8">
                
                {/* WIDGET */}
                <FeudalPyramid />

                {/* MAGNA CARTA */}
                <div className="bg-[#1c1917]/90 border border-stone-800 rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 text-stone-800 opacity-20">
                        <Book size={120} />
                    </div>
                    <div className="relative z-10">
                        <h3 className="font-bold text-amber-500 mb-2 flex items-center gap-2">
                            <Crown size={16} /> Magna Carta (1215)
                        </h3>
                        <p className="text-xs text-stone-400 leading-relaxed">
                            The first document to put into writing the principle that the king and his government was not above the law. It laid the foundation for modern democracy.
                        </p>
                    </div>
                </div>

            </div>

        </div>
      </div>
    </main>
  );
}