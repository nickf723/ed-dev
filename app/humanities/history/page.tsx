"use client";
import { useState } from "react";
import Link from "next/link";
import TimeBackground from "@/app/humanities/history/TimeBackground";
import EraTimeline from "@/app/humanities/history/EraTimeline";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Hourglass, Globe, BookOpen, Scroll, 
  Landmark, Map, PenTool, FlaskConical, Palette
} from "lucide-react";

// --- DATA ---
const classifications = [
  { id: "chronological", label: "CHRONOLOGICAL", icon: Hourglass },
  { id: "regional", label: "REGIONAL", icon: Globe },
  { id: "thematic", label: "THEMATIC", icon: BookOpen },
];

export default function HistoryPage() {
  const [activeView, setActiveView] = useState("chronological");

  return (
    <main className="relative min-h-screen bg-[#1a0505] text-stone-200 overflow-hidden selection:bg-amber-500/30 font-serif">
      
      {/* 1. VISUAL ENGINE */}
      <TimeBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.06] pointer-events-none z-0 mix-blend-overlay" />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      {/* 2. DASHBOARD */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col">
        
        {/* HEADER */}
        <header className="mb-12">
             <Link href="/humanities" className="flex items-center gap-2 text-xs font-mono text-amber-600 hover:text-amber-500 transition-colors mb-4 uppercase tracking-widest">
                <ArrowLeft size={12} /> Humanities // History
             </Link>
             <div className="flex items-center gap-4 mb-8">
                 <div className="p-3 bg-amber-900/30 border border-amber-500/20 rounded-sm rotate-3">
                    <Scroll size={32} className="text-amber-500" />
                 </div>
                 <h1 className="text-5xl md:text-7xl font-black text-amber-100 tracking-tighter drop-shadow-xl">
                    HISTORY
                 </h1>
             </div>

             {/* CLASSIFICATION TABS */}
             <div className="flex gap-1 bg-black/30 p-1 rounded-lg w-fit backdrop-blur-md border border-white/10">
                 {classifications.map((c) => (
                     <button
                        key={c.id}
                        onClick={() => setActiveView(c.id)}
                        className={`
                            px-6 py-2 rounded-md flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all
                            ${activeView === c.id 
                                ? "bg-amber-800 text-white shadow-lg" 
                                : "hover:bg-white/5 text-stone-500 hover:text-stone-300"
                            }
                        `}
                     >
                         <c.icon size={14} /> {c.label}
                     </button>
                 ))}
             </div>
        </header>

        {/* 3. DYNAMIC CONTENT AREA */}
        <div className="flex-1 relative">
            <AnimatePresence mode="wait">
                
                {/* VIEW 1: CHRONOLOGICAL */}
                {activeView === "chronological" && (
                    <motion.div
                        key="chronos"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-8"
                    >
                        <EraTimeline />
                        

[Image of historical timeline chart]


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 bg-[#120404] border border-amber-900/30 hover:border-amber-500/50 transition-colors group">
                                <div className="text-amber-500 font-bold mb-2 flex items-center gap-2">
                                    <Landmark size={18} /> ANCIENT HISTORY
                                </div>
                                <p className="text-sm text-stone-500 leading-relaxed">
                                    The cradle of civilization. From the invention of writing in Sumer to the fall of the Western Roman Empire.
                                </p>
                            </div>
                            <div className="p-6 bg-[#120404] border border-amber-900/30 hover:border-amber-500/50 transition-colors group">
                                <div className="text-amber-500 font-bold mb-2 flex items-center gap-2">
                                    <Scroll size={18} /> POST-CLASSICAL
                                </div>
                                <p className="text-sm text-stone-500 leading-relaxed">
                                    The Middle Ages. The Golden Age of Islam, the feudal systems of Europe, and the Silk Road trade networks.
                                </p>
                            </div>
                            {/* Add Modern etc... */}
                        </div>
                    </motion.div>
                )}

                {/* VIEW 2: REGIONAL */}
                {activeView === "regional" && (
                    <motion.div
                        key="topos"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                    >
                        

[Image of world civilizations map]

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                            <RegionalCard title="The West" sub="Europe & Americas" icon={Map} color="text-blue-400" />
                            <RegionalCard title="The East" sub="Asia & Oceania" icon={Globe} color="text-red-400" />
                            <RegionalCard title="The South" sub="Africa & South America" icon={Map} color="text-amber-400" />
                        </div>
                    </motion.div>
                )}

                {/* VIEW 3: THEMATIC */}
                {activeView === "thematic" && (
                    <motion.div
                        key="thema"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        <div className="bg-[#2a0a0a] p-8 border-l-4 border-purple-500 shadow-xl">
                            <Palette size={32} className="text-purple-500 mb-4" />
                            <h2 className="text-2xl font-bold text-white mb-2">History of Art</h2>
                            <p className="text-stone-400 text-sm">
                                From cave paintings at Lascaux to the digital revolution. How visual expression mirrors the human condition.
                            </p>
                        </div>

                        <div className="bg-[#2a0a0a] p-8 border-l-4 border-cyan-500 shadow-xl">
                            <FlaskConical size={32} className="text-cyan-500 mb-4" />
                            <h2 className="text-2xl font-bold text-white mb-2">History of Science</h2>
                            <p className="text-stone-400 text-sm">
                                The evolution of empirical thought. From Aristotelian physics to Quantum Mechanics.
                            </p>
                        </div>
                        
                        <div className="bg-[#2a0a0a] p-8 border-l-4 border-rose-500 shadow-xl">
                            <PenTool size={32} className="text-rose-500 mb-4" />
                            <h2 className="text-2xl font-bold text-white mb-2">Intellectual History</h2>
                            <p className="text-stone-400 text-sm">
                                The history of ideas. How philosophy, religion, and political thought have shaped societies.
                            </p>
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>

      </div>
    </main>
  );
}

function RegionalCard({ title, sub, icon: Icon, color }: any) {
    return (
        <div className="aspect-[3/4] bg-[#120404] border border-white/5 p-6 flex flex-col items-center justify-center text-center hover:bg-[#1a0505] transition-colors group cursor-pointer relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-0`} />
            <div className={`p-4 rounded-full bg-white/5 mb-4 group-hover:scale-110 transition-transform relative z-10 ${color}`}>
                <Icon size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white font-serif relative z-10">{title}</h3>
            <span className="text-xs font-mono text-stone-500 uppercase tracking-widest mt-2 relative z-10">{sub}</span>
        </div>
    )
}