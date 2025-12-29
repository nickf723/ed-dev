"use client";
import Link from "next/link";
import DigBackground from "@/app/humanities/archaeology/DigBackground";
import CarbonDater from "@/app/humanities/archaeology/CarbonDater";
import { 
  ArrowLeft, Pickaxe, Map, Skull, Scroll, Search, 
  Brush, Layers, MapPin
} from "lucide-react";

export default function ArchaeologyPage() {
  return (
    <main className="relative min-h-screen bg-[#0c0a09] text-[#e7e5e4] overflow-hidden selection:bg-amber-500/30 font-serif">
      
      {/* 1. VISUAL ENGINE */}
      <DigBackground />
      
      {/* OVERLAY: Dirty Texture & Vignette */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.1] pointer-events-none z-0 mix-blend-overlay" />
      <div className="absolute inset-0 bg-radial-vignette opacity-50 pointer-events-none z-0" />
      
      {/* Custom Cursor Hint Overlay */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 text-white/20 font-bold text-4xl animate-pulse select-none">
          CLICK & DRAG TO EXCAVATE
      </div>

      {/* 2. DASHBOARD */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col pointer-events-none">
        
        {/* HEADER */}
        <header className="flex justify-between items-start mb-16 pointer-events-auto">
             <div>
                 <Link href="/humanities/history" className="flex items-center gap-2 text-xs font-mono text-amber-600 hover:text-amber-500 transition-colors mb-4 uppercase tracking-widest">
                    <ArrowLeft size={12} /> History // Archaeology
                 </Link>
                 <div className="flex items-center gap-4">
                     <div className="p-3 bg-[#292524] border border-[#57534e] rounded-sm shadow-xl rotate-[-2deg]">
                        <Pickaxe size={32} className="text-amber-600" />
                     </div>
                     <h1 className="text-5xl md:text-7xl font-black text-[#f5f5f4] tracking-tighter drop-shadow-xl font-serif">
                        THE DIG
                     </h1>
                 </div>
             </div>
             
             <div className="hidden md:block text-right font-mono text-stone-500 text-xs bg-[#1c1917]/90 p-4 rounded-sm border border-stone-700 shadow-lg rotate-1">
                 <div>SITE: SECTOR_07</div>
                 <div>DEPTH: 2.5m</div>
                 <div className="text-amber-600 font-bold">STATUS: ACTIVE EXCAVATION</div>
             </div>
        </header>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 flex-1 pointer-events-auto">
            
            {/* LEFT: FIELD NOTES */}
            <div className="lg:col-span-7 space-y-8">
                
                {/* STRATIGRAPHY CARD */}
                <div className="bg-[#1c1917]/90 backdrop-blur-md border border-[#44403c] p-1 shadow-2xl rotate-[-1deg]">
                    <div className="border border-[#44403c] border-dashed p-6">
                        <div className="flex items-center gap-3 mb-4 text-amber-600">
                            <Layers size={24} />
                            <h2 className="text-2xl font-bold font-serif">Stratigraphy</h2>
                        </div>
                        <p className="text-stone-400 text-sm leading-relaxed mb-4 font-mono">
                            The Law of Superposition: In any undisturbed sequence of rocks deposited in layers, the youngest layer is on top and the oldest on bottom.
                        </p>
                        <div className="space-y-1">
                            <div className="h-8 bg-[#292524] flex items-center px-4 text-[10px] text-stone-500">STRATUM A (Topsoil) - Modern</div>
                            <div className="h-8 bg-[#451a03] flex items-center px-4 text-[10px] text-stone-400">STRATUM B (Clay) - Iron Age</div>
                            <div className="h-8 bg-[#27272a] flex items-center px-4 text-[10px] text-stone-500">STRATUM C (Bedrock) - Paleolithic</div>
                        </div>
                    </div>
                </div>

                {/* ANTHROPOLOGY / ROCK MAN CARD */}
                <div className="bg-[#1c1917]/90 backdrop-blur-md border border-[#44403c] p-1 shadow-2xl rotate-[1deg]">
                    <div className="border border-[#44403c] border-dashed p-6">
                        <div className="flex items-center gap-3 mb-4 text-stone-300">
                            <Skull size={24} />
                            <h2 className="text-2xl font-bold font-serif">Paleoanthropology</h2>
                        </div>
                        <p className="text-stone-400 text-sm leading-relaxed mb-6 font-mono">
                            The study of ancient humans. The "Rock Men" of our past. Tracing the lineage from <em>Australopithecus</em> to <em>Homo sapiens</em> through fossilized remains.
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-black/20 p-3 border border-white/5">
                                <div className="text-[10px] text-amber-600 font-bold mb-1">LUCY (AL 288-1)</div>
                                <div className="text-xs text-stone-500">3.2 MYA // Ethiopia</div>
                            </div>
                            <div className="bg-black/20 p-3 border border-white/5">
                                <div className="text-[10px] text-amber-600 font-bold mb-1">TURKANA BOY</div>
                                <div className="text-xs text-stone-500">1.6 MYA // Kenya</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            {/* RIGHT: TOOLS & WIDGET */}
            <div className="lg:col-span-5 space-y-8 flex flex-col items-center">
                
                {/* CARBON DATER WIDGET */}
                <CarbonDater />

                {/* TOOLKIT */}
                <div className="w-full bg-[#1c1917]/90 border border-[#44403c] p-6 shadow-xl relative">
                    <div className="absolute -top-3 left-6 bg-[#f5f5f4] text-black px-2 text-xs font-bold font-mono rotate-2">
                        FIELD KIT
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="flex flex-col items-center gap-2 text-stone-500 hover:text-amber-500 transition-colors cursor-pointer">
                            <Brush size={24} />
                            <span className="text-[10px] font-mono font-bold">BRUSH</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 text-stone-500 hover:text-amber-500 transition-colors cursor-pointer">
                            <MapPin size={24} />
                            <span className="text-[10px] font-mono font-bold">GRID</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 text-stone-500 hover:text-amber-500 transition-colors cursor-pointer">
                            <Search size={24} />
                            <span className="text-[10px] font-mono font-bold">SURVEY</span>
                        </div>
                    </div>
                </div>

            </div>

        </div>
      </div>
    </main>
  );
}