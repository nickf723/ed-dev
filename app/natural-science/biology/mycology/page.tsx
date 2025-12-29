"use client";
import Link from "next/link";
import { M } from "@/components/Math";
import MyceliumBackground from "@/app/natural-science/biology/mycology/MyceliumBackground";
import WoodWideWebWidget from "@/app/natural-science/biology/mycology/WoodWideWebWidget";
import { 
  ArrowLeft, Sprout, Network, Recycle, Skull, Umbrella 
} from "lucide-react";

export default function MycologyPage() {
  return (
    <main className="relative min-h-screen bg-[#1c1917] text-stone-200 overflow-hidden selection:bg-purple-500/30 font-sans">
      
      {/* 1. VISUAL ENGINE */}
      <MyceliumBackground />
      
      {/* VIGNETTE */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none z-0" />

      {/* 2. DASHBOARD */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col pointer-events-none">
        
        {/* HEADER */}
        <header className="flex justify-between items-start mb-16 pointer-events-auto">
             <div>
                 <Link href="/natural-science/biology" className="flex items-center gap-2 text-xs font-mono text-stone-500 hover:text-stone-400 transition-colors mb-4 uppercase tracking-widest">
                    <ArrowLeft size={12} /> Biology // Fungi
                 </Link>
                 <div className="flex items-center gap-4">
                     <div className="p-3 bg-purple-900/30 border border-purple-500/20 rounded-2xl">
                        <Umbrella size={32} className="text-purple-400" />
                     </div>
                     <h1 className="text-5xl md:text-7xl font-black text-stone-100 tracking-tighter drop-shadow-lg font-serif">
                        MYCOLOGY
                     </h1>
                 </div>
             </div>
             
             <div className="hidden md:block text-right font-mono text-stone-500 text-xs">
                 <div>KINGDOM: Fungi</div>
                 <div>ROLE: Decomposers</div>
             </div>
        </header>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 flex-1 pointer-events-auto">
            
            {/* LEFT: THE HIDDEN KINGDOM */}
            <div className="lg:col-span-7 space-y-8">
                
                {/* MYCELIUM CARD */}
                <div className="bg-stone-900/80 backdrop-blur-md border border-stone-700 rounded-3xl p-8 relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-6">
                        <Network size={24} className="text-stone-400" />
                        <h2 className="text-2xl font-bold text-white font-serif">The Mycelial Network</h2>
                    </div>
                    
                    <p className="text-stone-400 text-sm leading-relaxed mb-6">
                        What we call "mushrooms" are just the fruiting bodies. The real organism is the <strong>mycelium</strong>: a vast, underground web of microscopic threads (hyphae) that can span entire forests.
                    </p>

                    <div className="bg-black/30 p-4 rounded-xl border border-white/5 flex gap-4">
                        <div className="flex-1 border-r border-white/10">
                            <div className="text-xs text-stone-500 mb-1">LARGEST ORGANISM</div>
                            <div className="text-white font-bold">Armillaria ostoyae</div>
                            <div className="text-[10px] text-purple-400">Oregon, 2,385 acres</div>
                        </div>
                        <div className="flex-1 pl-4">
                            <div className="text-xs text-stone-500 mb-1">GROWTH RATE</div>
                            <div className="text-white font-bold">Exponential</div>
                            <div className="text-[10px] text-purple-400">Radial expansion</div>
                        </div>
                    </div>
                </div>

                {/* DECOMPOSITION CARD */}
                <div className="bg-stone-900/80 backdrop-blur-md border border-stone-700 rounded-3xl p-8 group hover:border-purple-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-6">
                        <Recycle size={24} className="text-purple-500" />
                        <h2 className="text-2xl font-bold text-white font-serif">The Great Recyclers</h2>
                    </div>
                    <p className="text-stone-400 text-sm leading-relaxed">
                        Fungi are the primary decomposers of organic matter. They secrete enzymes to break down tough materials like <strong>lignin</strong> and <strong>cellulose</strong> in wood, releasing carbon and nutrients back into the ecosystem. Without them, the world would be buried in dead plants.
                    </p>
                </div>

            </div>


            {/* RIGHT: SYMBIOSIS & WIDGET */}
            <div className="lg:col-span-5 space-y-8">
                
                {/* INTERACTIVE WIDGET */}
                <WoodWideWebWidget />

                {/* PATHOGENS & TOXINS */}
                <div className="bg-stone-900/80 border border-stone-700 rounded-2xl p-6 flex gap-4">
                    <div className="p-3 bg-red-900/20 rounded-full h-fit border border-red-900/50">
                        <Skull size={20} className="text-red-500" />
                    </div>
                    <div>
                        <h3 className="font-bold text-stone-200 mb-2">Pathogens & Toxins</h3>
                        <p className="text-xs text-stone-500 leading-relaxed mb-3">
                            Not all fungi are benign. Some are parasitic (Cordyceps), while others produce deadly mycotoxins (Amanita phalloides).
                        </p>
                    </div>
                </div>

                {/* LICHEN */}
                <div className="bg-stone-900/80 border border-stone-700 rounded-2xl p-6">
                    <h3 className="font-bold text-stone-200 mb-2 flex items-center gap-2">
                        <Sprout size={16} className="text-lime-500" /> Lichen Symbiosis
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed">
                        A composite organism arising from algae or cyanobacteria living among filaments of multiple fungi species in a mutualistic relationship.
                    </p>
                </div>

            </div>

        </div>
      </div>
    </main>
  );
}