"use client";
import { useState } from "react";
import Link from "next/link";
import GlobeBackground, { DomainKey } from "./GlobeBackground";
import { 
  ArrowLeft, Globe, ArrowUpRight,
  Mountain, Map, Gem, Droplets, CloudRain, ThermometerSun
} from "lucide-react";

// --- CONFIGURATION ENGINE ---
// Add new domains here. The UI will auto-generate.
const SUBDOMAINS = [
  {
    id: "geology" as DomainKey,
    title: "Geology",
    subtitle: "Solid Earth Systems",
    desc: "The study of rocky planetary bodies and the processes that shape them.",
    icon: Mountain,
    stats: { label: "CRUST DEPTH", value: "5-70 km" },
    styles: {
      bg: "bg-emerald-950/40", border: "border-emerald-500/50", 
      text: "text-emerald-500", shadow: "shadow-emerald-500/10",
      accent: "bg-emerald-500"
    }
  },
  {
    id: "geography" as DomainKey,
    title: "Geography",
    subtitle: "Spatial Analysis",
    desc: "The physical features of the earth and its atmosphere, and of human activity.",
    icon: Map,
    stats: { label: "SURFACE AREA", value: "510M km²" },
    styles: {
      bg: "bg-amber-950/40", border: "border-amber-500/50", 
      text: "text-amber-500", shadow: "shadow-amber-500/10",
      accent: "bg-amber-500"
    }
  },
  {
    id: "mineralogy" as DomainKey,
    title: "Mineralogy",
    subtitle: "Crystalline Structures",
    desc: "Chemistry, crystal structure, and physical properties of minerals.",
    icon: Gem,
    stats: { label: "KNOWN SPECIES", value: "5,700+" },
    styles: {
      bg: "bg-fuchsia-950/40", border: "border-fuchsia-500/50", 
      text: "text-fuchsia-500", shadow: "shadow-fuchsia-500/10",
      accent: "bg-fuchsia-500"
    }
  },
  {
    id: "hydrology" as DomainKey,
    title: "Hydrology",
    subtitle: "Fluid Dynamics",
    desc: "The movement, distribution, and management of water on Earth.",
    icon: Droplets,
    stats: { label: "OCEAN COVER", value: "71%" },
    styles: {
      bg: "bg-blue-950/40", border: "border-blue-500/50", 
      text: "text-blue-500", shadow: "shadow-blue-500/10",
      accent: "bg-blue-500"
    }
  },
  {
    id: "meteorology" as DomainKey,
    title: "Meteorology",
    subtitle: "Atmospheric Science",
    desc: "Forecasting weather processes and atmospheric phenomena.",
    icon: CloudRain,
    stats: { label: "ATM PRESSURE", value: "1013 hPa" },
    styles: {
      bg: "bg-sky-950/40", border: "border-sky-500/50", 
      text: "text-sky-500", shadow: "shadow-sky-500/10",
      accent: "bg-sky-500"
    }
  },
  {
    id: "climatology" as DomainKey,
    title: "Climatology",
    subtitle: "Long-term Patterns",
    desc: "The study of climate, scientifically defined as weather conditions averaged over a period of time.",
    icon: ThermometerSun,
    stats: { label: "GLOBAL AVG", value: "15°C" },
    styles: {
      bg: "bg-red-950/40", border: "border-red-500/50", 
      text: "text-red-500", shadow: "shadow-red-500/10",
      accent: "bg-red-500"
    }
  }
];

export default function EarthSciencePage() {
  const [activeDomain, setActiveDomain] = useState<DomainKey>("geology");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Helper to get active color for headers
  const activeConfig = SUBDOMAINS.find(d => d.id === activeDomain) || SUBDOMAINS[0];

  return (
    <main className="relative min-h-screen bg-[#020408] text-white overflow-hidden selection:bg-teal-500/30 font-sans">
      
      <GlobeBackground domain={activeDomain} />
      
      {/* OVERLAYS */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-50 pointer-events-none z-0" />

      {/* DASHBOARD */}
      <div className="relative z-10 container mx-auto px-6 py-8 min-h-screen flex flex-col">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start mb-12 pointer-events-auto">
             <div>
                 <Link href="/natural-science" className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-white transition-colors mb-2 uppercase tracking-widest group">
                    <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Natural_Sciences // Domain_04
                 </Link>
                 <div className="flex items-center gap-4">
                     <div className="relative">
                        <div className={`absolute inset-0 blur-xl opacity-20 animate-pulse ${activeConfig.styles.accent}`}></div>
                        <Globe size={48} className="text-white relative z-10" strokeWidth={1} />
                     </div>
                     <div>
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                           EARTH SYSTEMS
                        </h1>
                        <div className={`flex gap-4 text-[10px] font-mono uppercase tracking-widest mt-1 ${activeConfig.styles.text} opacity-80`}>
                            <span>Mode: {activeDomain.toUpperCase()}</span>
                            <span>Status: Online</span>
                        </div>
                     </div>
                 </div>
             </div>
        </header>

        {/* --- DYNAMIC GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pointer-events-auto mt-auto mb-12">
            
            {SUBDOMAINS.map((item) => (
                <Link 
                    key={item.id}
                    href={`/natural-science/earth-science/${item.id}`}
                    onMouseEnter={() => { setActiveDomain(item.id); setHoveredCard(item.id); }}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={`
                        relative p-6 rounded-xl border backdrop-blur-xl transition-all duration-500 group overflow-hidden
                        ${activeDomain === item.id 
                            ? `${item.styles.bg} ${item.styles.border} shadow-[0_0_30px_rgba(0,0,0,0.2)] scale-[1.02]` 
                            : "bg-black/40 border-white/5 opacity-60 hover:opacity-100 hover:bg-black/60"}
                    `}
                >
                    {/* Hover Glow */}
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity`} />
                    
                    {/* Icon & Label */}
                    <div className="flex justify-between items-start mb-3">
                        <div className={`p-2 rounded-md ${activeDomain === item.id ? `${item.styles.accent} text-black` : `bg-white/5 ${item.styles.text}`}`}>
                            <item.icon size={20} />
                        </div>
                        <span className={`text-[10px] font-mono opacity-50 ${item.styles.text}`}>
                            SYS_{item.id.substring(0,3).toUpperCase()}
                        </span>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mb-1">{item.title}</h2>
                    <p className={`text-xs font-mono mb-4 uppercase opacity-60 ${item.styles.text}`}>
                        {item.subtitle}
                    </p>
                    <p className="text-sm text-zinc-400 mb-6 line-clamp-2 h-10">
                        {item.desc}
                    </p>

                    {/* Data Viz */}
                    <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-end">
                         <div className="flex flex-col">
                            <span className={`text-[10px] font-mono opacity-60 ${item.styles.text}`}>{item.stats.label}</span>
                            <span className="text-lg font-bold text-white">{item.stats.value}</span>
                         </div>
                         <ArrowUpRight size={16} className="text-zinc-600 group-hover:text-white transition-colors" />
                    </div>
                </Link>
            ))}

        </div>
      </div>
    </main>
  );
}