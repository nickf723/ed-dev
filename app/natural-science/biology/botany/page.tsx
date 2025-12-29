"use client";
import Link from "next/link";
import { M } from "@/components/Math";
import FractalGarden from "@/app/natural-science/biology/botany/FractalGarden";
import PhotosynthesisWidget from "@/app/natural-science/biology/botany/PhotosynthesisWidget";
import { 
  ArrowLeft, Flower, Sprout, Sun, Leaf, Layers, 
  Microscope, TreePine, Binary
} from "lucide-react";

export default function BotanyPage() {
  return (
    <main className="relative min-h-screen bg-[#020402] text-emerald-50 overflow-hidden selection:bg-emerald-500/30 font-sans">
      
      {/* 1. VISUAL ENGINE */}
      <FractalGarden />
      
      {/* VIGNETTE */}
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />

      {/* 2. DASHBOARD */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col pointer-events-none">
        
        {/* HEADER */}
        <header className="flex justify-between items-start mb-16 pointer-events-auto">
             <div>
                 <Link href="/natural-science/biology" className="flex items-center gap-2 text-xs font-mono text-emerald-500 hover:text-emerald-400 transition-colors mb-4 uppercase tracking-widest">
                    <ArrowLeft size={12} /> Biology // Plantae
                 </Link>
                 <div className="flex items-center gap-4">
                     <div className="p-3 bg-emerald-900/50 border border-emerald-500/30 rounded-xl shadow-xl">
                        <Flower size={32} className="text-emerald-400" />
                     </div>
                     <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-lg font-serif">
                        BOTANY
                     </h1>
                 </div>
             </div>
             
             <div className="hidden md:block text-right font-mono text-emerald-500/60 text-xs">
                 <div>EST. SPECIES: ~400,000</div>
                 <div>PRIMARY PRODUCERS</div>
             </div>
        </header>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 flex-1 pointer-events-auto">
            
            {/* LEFT: PHYSIOLOGY & WIDGET */}
            <div className="lg:col-span-5 space-y-8">
                
                {/* WIDGET */}
                <PhotosynthesisWidget />

                {/* INFO CARD */}
                <div className="bg-emerald-950/40 backdrop-blur-md border border-emerald-500/20 rounded-2xl p-6">
                    <h3 className="font-bold text-emerald-200 mb-2 flex items-center gap-2">
                        <Microscope size={18} /> Plant Physiology
                    </h3>
                    <p className="text-sm text-emerald-100/70 leading-relaxed mb-4">
                        Plants are autotrophs. They construct their own food from inorganic substances. They possess a cell wall made of cellulose and large vacuoles for turgor pressure.
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <div className="bg-black/20 p-2 rounded text-center text-lime-300">XYLEM (Water ↑)</div>
                        <div className="bg-black/20 p-2 rounded text-center text-amber-300">PHLOEM (Food ↓)</div>
                    </div>
                </div>

            </div>


            {/* RIGHT: TAXONOMY & DIVERSITY */}
            <div className="lg:col-span-7 space-y-6">
                
                {/* CARD 1: VASCULAR PLANTS */}
                <div className="bg-neutral-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-emerald-500/30 transition-colors group">
                    <div className="flex items-center gap-3 mb-6">
                        <TreePine size={24} className="text-emerald-500" />
                        <h2 className="text-2xl font-bold text-white font-serif">Angiosperms & Gymnosperms</h2>
                    </div>
                    
                    <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                        Seed-producing plants. <strong>Gymnosperms</strong> ("naked seeds") like conifers were the first to evolve seeds. <strong>Angiosperms</strong> ("flowering plants") evolved fruit to protect seeds, dominating the modern world.
                    </p>

                    <div className="flex gap-4">
                        <div className="flex-1 h-24 bg-gradient-to-br from-emerald-900/50 to-black rounded-xl border border-white/5 relative overflow-hidden p-4">
                            <span className="text-xs font-bold text-emerald-400">MONOCOTS</span>
                            <div className="absolute bottom-2 right-2 opacity-20"><Leaf /></div>
                            <div className="text-[10px] text-neutral-500 mt-1">Parallel veins (Grasses)</div>
                        </div>
                        <div className="flex-1 h-24 bg-gradient-to-br from-emerald-900/50 to-black rounded-xl border border-white/5 relative overflow-hidden p-4">
                            <span className="text-xs font-bold text-emerald-400">DICOTS</span>
                            <div className="absolute bottom-2 right-2 opacity-20"><Flower /></div>
                            <div className="text-[10px] text-neutral-500 mt-1">Net veins (Roses, Oaks)</div>
                        </div>
                    </div>
                </div>

                {/* CARD 2: NON-VASCULAR */}
                <div className="bg-neutral-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-emerald-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                        <Layers size={24} className="text-lime-500" />
                        <h3 className="text-xl font-bold text-white font-serif">Bryophytes</h3>
                    </div>
                    <p className="text-neutral-400 text-sm mb-0">
                        Mosses, liverworts, and hornworts. They lack true roots (vascular tissue) and require moist environments to reproduce. They are the pioneers of land colonization.
                    </p>
                </div>

                {/* CARD 3: FRACTAL NATURE */}
                <div className="bg-neutral-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-emerald-500/30 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-white flex items-center gap-2 font-serif">
                            <Binary size={16} className="text-emerald-500" /> Mathematical Beauty
                        </h3>
                        <span className="text-[10px] font-mono text-emerald-600">FIBONACCI SEQUENCE</span>
                    </div>
                    <p className="text-xs text-neutral-500">
                        Plants optimize light exposure using the Golden Ratio (phyllotaxis). The background simulation uses L-Systems, a mathematical language for modeling growth.
                    </p>
                </div>

            </div>

        </div>
      </div>
    </main>
  );
}