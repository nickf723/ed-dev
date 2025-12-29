"use client";
import Link from "next/link";
import SafariBackground from "@/app/natural-science/biology/zoology/SafariBackground";
import FoodWebWidget from "@/app/natural-science/biology/zoology/FoodWebWidget";
import { 
  ArrowLeft, Cat, Bug, Fish, Bird, Grip, Search, 
  Footprints, Skull
} from "lucide-react";

export default function ZoologyPage() {
  return (
    <main className="relative min-h-screen bg-[#1c1917] text-stone-200 overflow-hidden selection:bg-lime-500/30 font-sans">
      
      {/* 1. VISUAL ENGINE */}
      <SafariBackground />
      
      {/* VIGNETTE & TEXTURE */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900/90 via-stone-900/20 to-stone-900/90 pointer-events-none z-0" />

      {/* 2. DASHBOARD */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col pointer-events-none">
        
        {/* HEADER */}
        <header className="flex justify-between items-start mb-16 pointer-events-auto">
             <div>
                 <Link href="/natural-science/biology" className="flex items-center gap-2 text-xs font-mono text-lime-600 hover:text-lime-500 transition-colors mb-4 uppercase tracking-widest">
                    <ArrowLeft size={12} /> Biology // Zoology
                 </Link>
                 <div className="flex items-center gap-4">
                     <div className="p-3 bg-stone-800 border border-stone-700 rounded-xl shadow-xl">
                        <Footprints size={32} className="text-lime-600" />
                     </div>
                     <h1 className="text-5xl md:text-7xl font-black text-stone-100 tracking-tighter drop-shadow-lg font-serif">
                        ZOOLOGY
                     </h1>
                 </div>
             </div>
             
             <div className="hidden md:block text-right font-mono text-stone-500 text-xs bg-stone-900/80 p-4 rounded-lg border border-stone-700">
                 <div className="mb-1">BIOME: DIGITAL SAVANNA</div>
                 <div className="text-lime-600 font-bold">STATUS: ACTIVE SIMULATION</div>
                 <div className="mt-2 text-[10px] opacity-60">CLICK BACKGROUND TO SEED PLANTS</div>
             </div>
        </header>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 flex-1 pointer-events-auto">
            
            {/* LEFT: CLASSIFICATION SYSTEM */}
            <div className="lg:col-span-8 space-y-8">
                
                {/* VERTEBRATES */}
                <div className="bg-stone-900/80 backdrop-blur-md border border-stone-700 rounded-2xl p-8 hover:border-lime-700/50 transition-colors group">
                    <div className="flex items-center gap-3 mb-6">
                        <Skull size={24} className="text-stone-400" />
                        <h2 className="text-2xl font-bold text-white font-serif">Vertebrata</h2>
                        <span className="text-xs bg-stone-800 px-2 py-1 rounded text-stone-500">Backbones</span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 bg-stone-800/50 rounded-xl border border-stone-700 text-center hover:bg-stone-800 transition-colors cursor-pointer">
                            <Cat size={32} className="mx-auto text-amber-600 mb-2" />
                            <span className="text-xs font-bold text-stone-300">MAMMALS</span>
                        </div>
                        <div className="p-4 bg-stone-800/50 rounded-xl border border-stone-700 text-center hover:bg-stone-800 transition-colors cursor-pointer">
                            <Bird size={32} className="mx-auto text-sky-600 mb-2" />
                            <span className="text-xs font-bold text-stone-300">AVES</span>
                        </div>
                        <div className="p-4 bg-stone-800/50 rounded-xl border border-stone-700 text-center hover:bg-stone-800 transition-colors cursor-pointer">
                            <Fish size={32} className="mx-auto text-blue-600 mb-2" />
                            <span className="text-xs font-bold text-stone-300">PISCES</span>
                        </div>
                        <div className="p-4 bg-stone-800/50 rounded-xl border border-stone-700 text-center hover:bg-stone-800 transition-colors cursor-pointer">
                            <Grip size={32} className="mx-auto text-emerald-600 mb-2" /> {/* Reptile-ish */}
                            <span className="text-xs font-bold text-stone-300">REPTILIA</span>
                        </div>
                    </div>
                </div>

                {/* INVERTEBRATES */}
                <div className="bg-stone-900/80 backdrop-blur-md border border-stone-700 rounded-2xl p-8 hover:border-lime-700/50 transition-colors">
                    <div className="flex items-center gap-3 mb-6">
                        <Bug size={24} className="text-stone-400" />
                        <h2 className="text-2xl font-bold text-white font-serif">Invertebrata</h2>
                        <span className="text-xs bg-stone-800 px-2 py-1 rounded text-stone-500">97% of Life</span>
                    </div>
                    <p className="text-sm text-stone-400 leading-relaxed mb-4">
                        Animals lacking a vertebral column. This vast group includes arthropods (insects, spiders, crustaceans), mollusks, cnidarians (jellyfish), and worms. They are the foundation of most food webs.
                    </p>
                    <div className="h-1 w-full bg-stone-800 rounded overflow-hidden">
                        <div className="h-full bg-lime-600 w-[97%]" title="97% of all animal species" />
                    </div>
                </div>

                {/* ETHOLOGY */}
                <div className="bg-stone-900/80 backdrop-blur-md border border-stone-700 rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Search size={24} className="text-stone-400" />
                        <h2 className="text-2xl font-bold text-white font-serif">Ethology</h2>
                    </div>
                    <p className="text-sm text-stone-400 mb-4">
                        The scientific study of animal behavior. Instinct vs. Learning.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                        <div className="border-l-2 border-lime-600 pl-3">
                            <div className="text-white font-bold">INNATE</div>
                            <div className="text-stone-500">Fixed Action Patterns</div>
                        </div>
                        <div className="border-l-2 border-amber-600 pl-3">
                            <div className="text-white font-bold">LEARNED</div>
                            <div className="text-stone-500">Habituation & Conditioning</div>
                        </div>
                    </div>
                </div>

            </div>


            {/* RIGHT: ECOLOGICAL SYSTEMS */}
            <div className="lg:col-span-4 space-y-6">
                
                {/* FOOD WEB WIDGET */}
                <FoodWebWidget />

                {/* CONSERVATION STATUS */}
                <div className="bg-stone-900/80 border border-stone-700 rounded-xl p-6">
                    <h3 className="font-bold text-stone-300 mb-4 border-b border-stone-800 pb-2">IUCN Red List Status</h3>
                    <div className="space-y-2 text-xs font-bold">
                        <div className="flex items-center justify-between p-2 rounded bg-black/40">
                            <span className="text-red-500">CRITICAL</span>
                            <span className="text-stone-500">Extinction Imminent</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded bg-black/40">
                            <span className="text-orange-500">ENDANGERED</span>
                            <span className="text-stone-500">Very High Risk</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded bg-black/40">
                            <span className="text-yellow-500">VULNERABLE</span>
                            <span className="text-stone-500">High Risk</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded bg-black/40">
                            <span className="text-green-600">LEAST CONCERN</span>
                            <span className="text-stone-500">Stable</span>
                        </div>
                    </div>
                </div>

            </div>

        </div>
      </div>
    </main>
  );
}