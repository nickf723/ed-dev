"use client";
import Link from "next/link";
import CaveBackground from "@/app/humanities/history/chronology/prehistory/CaveBackground";
import HominidWidget from "@/app/humanities/history/chronology/prehistory/HominidWidget";
import { 
  ArrowLeft, Flame, Hammer, HandMetal, Skull, 
  Mountain, Sunrise 
} from "lucide-react";

export default function PrehistoryPage() {
  return (
    <main className="relative min-h-screen bg-black text-[#a8a29e] overflow-hidden selection:bg-amber-600/30 font-serif">
      
      {/* 1. VISUAL ENGINE */}
      <CaveBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.08] pointer-events-none z-0 mix-blend-overlay" />

      {/* 2. DASHBOARD */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col pointer-events-none">
        
        {/* HEADER */}
        <header className="mb-16 pointer-events-auto">
             <Link href="/humanities/history" className="flex items-center gap-2 text-xs font-mono text-amber-700 hover:text-amber-600 transition-colors mb-4 uppercase tracking-widest">
                <ArrowLeft size={12} /> History // Prehistory
             </Link>
             <div className="flex items-center gap-4">
                 <div className="p-3 bg-stone-900 border border-stone-700 rounded-full shadow-[0_0_20px_rgba(251,191,36,0.1)]">
                    <HandMetal size={32} className="text-amber-700" />
                 </div>
                 <h1 className="text-5xl md:text-7xl font-black text-[#d6d3d1] tracking-tighter drop-shadow-lg">
                    PREHISTORY
                 </h1>
             </div>
             <p className="mt-4 text-stone-500 max-w-xl text-lg italic border-l-2 border-amber-900 pl-4">
                 The long silence before the written word. 99% of human history occurred here, in the firelight.
             </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 flex-1 pointer-events-auto">
            
            {/* LEFT: THE AGES OF STONE */}
            <div className="lg:col-span-7 space-y-8">
                
                {/* STONE AGE CARD */}
                <div className="bg-[#1c1917]/80 backdrop-blur-sm border border-stone-800 p-8 rounded-sm shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-stone-800 rounded-bl-full opacity-20 group-hover:scale-110 transition-transform" />
                    
                    <h2 className="text-2xl font-bold text-[#e7e5e4] mb-6 flex items-center gap-3">
                        <Mountain className="text-stone-500" /> The Stone Age
                    </h2>
                    
                    <div className="space-y-6 relative border-l border-stone-700 ml-2 pl-6">
                        <div className="relative">
                            <span className="absolute -left-[31px] top-1 w-3 h-3 bg-stone-600 rounded-full border-2 border-[#1c1917]" />
                            <h3 className="text-amber-600 font-bold text-sm tracking-widest uppercase mb-1">Paleolithic (Old Stone)</h3>
                            <p className="text-xs text-stone-400">Hunter-gatherers. Discovery of fire. Cave art. The longest period of human development.</p>
                        </div>
                        <div className="relative">
                            <span className="absolute -left-[31px] top-1 w-3 h-3 bg-stone-500 rounded-full border-2 border-[#1c1917]" />
                            <h3 className="text-amber-600/80 font-bold text-sm tracking-widest uppercase mb-1">Mesolithic (Middle Stone)</h3>
                            <p className="text-xs text-stone-400">Retreat of glaciers. Microliths (small stone tools). Transition towards settling.</p>
                        </div>
                        <div className="relative">
                            <span className="absolute -left-[31px] top-1 w-3 h-3 bg-stone-400 rounded-full border-2 border-[#1c1917]" />
                            <h3 className="text-amber-600/60 font-bold text-sm tracking-widest uppercase mb-1">Neolithic (New Stone)</h3>
                            <p className="text-xs text-stone-400">The Agricultural Revolution. Domestication of plants and animals. Pottery. Permanent settlements.</p>
                        </div>
                    </div>
                </div>

                {/* THE COGNITIVE REVOLUTION */}
                <div className="bg-[#1c1917]/80 backdrop-blur-sm border border-stone-800 p-8 rounded-sm shadow-2xl">
                    <h2 className="text-2xl font-bold text-[#e7e5e4] mb-4 flex items-center gap-3">
                        <Sunrise className="text-amber-500" /> The Cognitive Revolution
                    </h2>
                    <p className="text-sm text-stone-400 leading-relaxed mb-4">
                        Around 70,000 years ago, *Homo sapiens* developed the ability to communicate about things that do not exist in the physical world (myths, gods, money). This "Fictive Language" allowed large groups of strangers to cooperate.
                    </p>
                    <div className="flex gap-4">
                        <div className="bg-black/30 px-3 py-2 border border-stone-800 rounded text-xs text-stone-300">Symbolic Art</div>
                        <div className="bg-black/30 px-3 py-2 border border-stone-800 rounded text-xs text-stone-300">Ritual Burial</div>
                        <div className="bg-black/30 px-3 py-2 border border-stone-800 rounded text-xs text-stone-300">Complex Tools</div>
                    </div>
                </div>

            </div>


            {/* RIGHT: INTERACTIVE EVOLUTION */}
            <div className="lg:col-span-5 space-y-8">
                
                {/* WIDGET */}
                <HominidWidget />

                {/* FIRE DISCOVERY */}
                <div className="bg-gradient-to-br from-orange-950/40 to-stone-900/80 border border-orange-900/50 p-6 rounded-xl flex items-start gap-4">
                    <div className="p-3 bg-orange-900/20 rounded-full border border-orange-500/20 animate-pulse">
                        <Flame size={24} className="text-orange-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-orange-200 mb-2">Control of Fire</h3>
                        <p className="text-xs text-stone-400 leading-relaxed">
                            Controlled fire (~1 MYA) provided warmth, protection, and cooked food. Cooking broke down proteins, making digestion easier and allowing the human gut to shrink while the brain grew.
                        </p>
                    </div>
                </div>

            </div>

        </div>

      </div>
    </main>
  );
}