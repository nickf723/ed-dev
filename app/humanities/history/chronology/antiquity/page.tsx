"use client";
import Link from "next/link";
import RiverBackground from "@/app/humanities/history/chronology/antiquity/RiverBackground";
import EmpireSelector from "@/app/humanities/history/chronology/antiquity/EmpireSelector";
import { 
  ArrowLeft, Landmark, Scroll, Scale, BookOpen
} from "lucide-react";

export default function AntiquityPage() {
  return (
    <main className="relative min-h-screen bg-[#0f172a] text-slate-200 overflow-hidden selection:bg-amber-500/30 font-serif">
      
      {/* 1. VISUAL ENGINE */}
      <RiverBackground />
      
      {/* OVERLAY: Marble/Gold Texture */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] pointer-events-none z-0 mix-blend-overlay" />
      <div className="absolute inset-0 bg-radial-vignette opacity-50 pointer-events-none z-0" />

      {/* 2. DASHBOARD */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col pointer-events-none">
        
        {/* HEADER */}
        <header className="mb-16 pointer-events-auto">
             <Link href="/humanities/history" className="flex items-center gap-2 text-xs font-mono text-amber-500 hover:text-amber-400 transition-colors mb-4 uppercase tracking-widest">
                <ArrowLeft size={12} /> History // Antiquity
             </Link>
             <div className="flex items-center gap-4">
                 <div className="p-3 bg-[#1e293b] border border-amber-500/30 rounded-sm shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                    <Landmark size={32} className="text-amber-500" />
                 </div>
                 <h1 className="text-5xl md:text-7xl font-black text-[#f1f5f9] tracking-tighter drop-shadow-xl">
                    ANTIQUITY
                 </h1>
             </div>
             <p className="mt-4 text-slate-400 max-w-xl text-lg italic border-l-2 border-amber-500/50 pl-4">
                 The age of city-states, empires, and the foundations of modern thought. From the invention of writing to the fall of Rome.
             </p>
        </header>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 flex-1 pointer-events-auto">
            
            {/* LEFT: THE CRADLE OF CIVILIZATION */}
            <div className="lg:col-span-7 space-y-8">
                
                {/* HYDRAULIC EMPIRES CARD */}
                <div className="bg-[#1e293b]/80 backdrop-blur-md border border-slate-600 rounded-xl p-8 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-colors" />
                    
                    <h2 className="text-2xl font-bold text-amber-100 mb-6 flex items-center gap-3">
                        <Scroll className="text-amber-500" /> Hydraulic Civilizations
                    </h2>
                    
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                        Early civilizations arose in fertile river valleys. Controlling water (irrigation) required centralized organization, leading to the first governments, bureaucracies, and social hierarchies.
                    </p>

                    <div className="flex gap-4 text-center">
                        <div className="flex-1 bg-black/20 p-3 rounded border border-white/5">
                            <div className="text-xs font-bold text-amber-500">NILE</div>
                            <div className="text-[10px] text-slate-500">Egypt</div>
                        </div>
                        <div className="flex-1 bg-black/20 p-3 rounded border border-white/5">
                            <div className="text-xs font-bold text-amber-500">TIGRIS</div>
                            <div className="text-[10px] text-slate-500">Mesopotamia</div>
                        </div>
                        <div className="flex-1 bg-black/20 p-3 rounded border border-white/5">
                            <div className="text-xs font-bold text-amber-500">INDUS</div>
                            <div className="text-[10px] text-slate-500">Harappa</div>
                        </div>
                    </div>
                </div>

                {/* THE AXIAL AGE */}
                <div className="bg-[#1e293b]/80 backdrop-blur-md border border-slate-600 rounded-xl p-8 shadow-2xl">
                    <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3">
                        <Scale className="text-sky-400" /> The Axial Age
                    </h2>
                    <p className="text-sm text-slate-400 leading-relaxed mb-4">
                        Between 800 and 200 BC, distinct cultures across the world simultaneously laid the spiritual and philosophical foundations of humanity.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 text-xs text-slate-300">
                            <span className="w-1.5 h-1.5 bg-sky-400 rounded-full" /> Socrates & Plato (Greece)
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-300">
                            <span className="w-1.5 h-1.5 bg-sky-400 rounded-full" /> Confucius (China)
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-300">
                            <span className="w-1.5 h-1.5 bg-sky-400 rounded-full" /> The Buddha (India)
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-300">
                            <span className="w-1.5 h-1.5 bg-sky-400 rounded-full" /> Hebrew Prophets (Levant)
                        </div>
                    </div>
                </div>

            </div>


            {/* RIGHT: INTERACTIVE EMPIRES */}
            <div className="lg:col-span-5 space-y-8">
                
                {/* WIDGET */}
                <EmpireSelector />

                {/* WRITING SYSTEMS */}
                <div className="bg-[#1e293b]/80 border border-slate-600 rounded-xl p-6">
                    <h3 className="font-bold text-slate-200 mb-4 flex items-center gap-2">
                        <BookOpen size={18} className="text-slate-400" /> Birth of Record Keeping
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                        History begins when people start writing it down. It began as accounting (counting grain) and evolved into law, poetry, and myth.
                    </p>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex">
                        <div className="w-[10%] bg-amber-600" title="Oral Tradition" />
                        <div className="w-[90%] bg-sky-600" title="Written History" />
                    </div>
                    <div className="flex justify-between mt-1 text-[10px] font-mono text-slate-500">
                        <span>3200 BC</span>
                        <span>WRITING INVENTED</span>
                    </div>
                </div>

            </div>

        </div>
      </div>
    </main>
  );
}