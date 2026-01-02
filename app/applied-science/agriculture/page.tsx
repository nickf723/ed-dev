"use client";
import Link from "next/link";
import AgriBackground from "@/app/applied-science/agriculture/AgriBackground";
import NitrogenLab from "@/app/applied-science/agriculture/NitrogenLab";
import { 
  ArrowLeft, Sprout, Trees, Wheat, Fish, 
  Flower2, Apple, Microscope, ArrowUpRight
} from "lucide-react";

// --- DOMAINS CONFIG ---
const DOMAINS = [
  {
    id: "agronomy", title: "Agronomy", icon: Wheat,
    desc: "The science of soil management and crop production. Wheat, Corn, Rice.",
    color: "text-yellow-400", border: "border-yellow-500/20", bg: "bg-yellow-500/10"
  },
  {
    id: "forestry", title: "Forestry", icon: Trees,
    desc: "Managing forests, tree plantations, and natural resources.",
    color: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/10"
  },
  {
    id: "agrology", title: "Agrology (Soil)", icon: Microscope,
    desc: "The study of soil science, ecology, and land capability.",
    color: "text-stone-400", border: "border-stone-500/20", bg: "bg-stone-500/10"
  },
  {
    id: "husbandry", title: "Animal Husbandry", icon: Sprout, // Using sprout as generic life, or maybe a paw/cow icon if available
    desc: "Breeding and caring for farm animals. Livestock, dairy, and poultry.",
    color: "text-red-300", border: "border-red-400/20", bg: "bg-red-400/10"
  },
  {
    id: "aquaculture", title: "Aquaculture", icon: Fish,
    desc: "Farming of aquatic organisms. Fish, crustaceans, mollusks, and algae.",
    color: "text-blue-400", border: "border-blue-500/20", bg: "bg-blue-500/10"
  },
  {
    id: "horticulture", title: "Horticulture", icon: Flower2,
    desc: "Garden crops. Vegetables, ornamental plants, and landscape design.",
    color: "text-pink-400", border: "border-pink-500/20", bg: "bg-pink-500/10"
  },
  {
    id: "pomology", title: "Pomology", icon: Apple,
    desc: "The branch of botany that studies fruit and its cultivation.",
    color: "text-rose-400", border: "border-rose-500/20", bg: "bg-rose-500/10"
  }
];

export default function AgriculturePage() {
  return (
    <main className="relative min-h-screen bg-[#1c1917] text-zinc-300 overflow-hidden font-sans selection:bg-green-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <AgriBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />

      {/* 2. HEADER */}
      <header className="relative z-20 flex items-center justify-between px-8 py-6 border-b border-white/10 bg-[#1c1917]/90 backdrop-blur-md sticky top-0">
         <div className="flex items-center gap-6">
             <Link href="/applied-science" className="flex items-center gap-2 text-xs font-mono text-green-500 hover:text-green-400 transition-colors uppercase tracking-widest">
                <ArrowLeft size={12} /> Applied Science
             </Link>
             <div className="h-4 w-px bg-white/10" />
             <div className="flex items-center gap-3">
                 <div className="p-1.5 bg-zinc-800 border border-green-500/50 rounded">
                    <Sprout size={18} className="text-green-500" />
                 </div>
                 <h1 className="text-xl font-bold text-white tracking-tight font-sans">
                    AGRICULTURE
                 </h1>
             </div>
         </div>
         <div className="hidden md:block text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            Cultivating Civilization
         </div>
      </header>

      {/* 3. CONTENT GRID */}
      <div className="relative z-10 container mx-auto p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* LEFT: THE DISCIPLINES */}
                <div className="lg:col-span-7 space-y-6">
                    
                    {/* HERO CARD */}
                    <div className="bg-[#292524]/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative overflow-hidden group shadow-xl">
                        <div className="absolute top-0 right-0 p-32 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-4">The Foundation of Life</h2>
                            <p className="text-sm text-zinc-300 leading-relaxed mb-6 font-sans">
                                Agriculture is the art and science of cultivating the soil, growing crops, and raising livestock. It is the foundation of sedentary human civilization, allowing us to sustain populations far larger than nature alone could support.
                            </p>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-white/5">
                                    <Wheat size={14} className="text-yellow-400" />
                                    <span className="text-xs font-mono">Calories</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-white/5">
                                    <Trees size={14} className="text-green-400" />
                                    <span className="text-xs font-mono">Resources</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    

[Image of sustainable farming cycle diagram]


                    {/* DYNAMIC DISCIPLINES GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {DOMAINS.map((d) => (
                            <Link 
                                key={d.id} 
                                href={`/applied-science/agriculture/${d.id}`}
                                className={`
                                    group flex flex-col p-5 rounded-xl border backdrop-blur-sm bg-[#292524]/60 transition-all duration-300 
                                    hover:-translate-y-1 hover:shadow-lg hover:bg-[#292524]/90
                                    ${d.border}
                                `}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${d.bg}`}>
                                            <d.icon className={d.color} size={18} />
                                        </div>
                                        <h3 className="font-bold text-white text-sm font-sans">{d.title}</h3>
                                    </div>
                                    <ArrowUpRight size={16} className="text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                                    {d.desc}
                                </p>
                            </Link>
                        ))}
                    </div>

                </div>

                {/* RIGHT: INTERACTIVE LAB */}
                <div className="lg:col-span-5 space-y-6 flex flex-col items-center">
                    
                    {/* WIDGET */}
                    <NitrogenLab />

                    {/* GREEN REVOLUTION CARD */}
                    <div className="bg-[#292524]/60 border border-white/10 rounded-xl p-6 w-full">
                        <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                            <Microscope size={18} className="text-green-500" /> The Green Revolution
                        </h3>
                        <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                            In the mid-20th century, new technologies (synthetic fertilizers, pesticides, and high-yield crop varieties) saved over a billion people from starvation, but also introduced new ecological challenges.
                        </p>
                    </div>

                </div>

            </div>
      </div>
    </main>
  );
}