"use client";
import React from "react";
import { AstronomyBackground } from "./AstronomyBackground";
import { DashboardCard } from "@/components/ui/DashboardCard";
import { 
  Telescope, 
  Orbit, 
  Sun, 
  Sparkles, 
  Aperture, 
  Rocket, 
  Eye, 
  Sigma,
  Infinity
} from "lucide-react";

export default function AstronomyHub() {
  return (
    <div className="p-8 md:p-12 min-h-screen space-y-12 animate-in fade-in duration-1000">
      <AstronomyBackground />
      
      {/* HEADER */}
      <header className="relative z-10 flex flex-col items-center text-center gap-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/30 text-purple-300 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
           <Telescope size={12} /> Sector 01: Cosmos
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/20 tracking-tighter">
          ASTRONOMY
        </h1>
        <p className="text-slate-400 max-w-lg mx-auto text-lg">
          The observation and explanation of events occurring outside Earth's atmosphere.
        </p>
      </header>

      {/* THE CONSTELLATION GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        
        {/* 1. PLANETARY (Earth's Neighborhood) */}
        <DashboardCard 
          title="Planetary" 
          icon={Orbit} 
          href="/natural-science/astronomy/planetary-astronomy"
          accentColor="cyan"
          className="bg-black/40 border-cyan-500/20"
        >
          <div className="mt-auto text-xs text-slate-400">
            Study of planets, moons, and systems.
          </div>
        </DashboardCard>

        {/* 2. SOLAR (The Source) */}
        <DashboardCard 
          title="Solar" 
          icon={Sun} 
          href="/natural-science/astronomy/solar-astronomy"
          accentColor="orange"
          className="bg-black/40 border-orange-500/20"
        >
          <div className="mt-auto text-xs text-slate-400">
            Physics of our nearest star.
          </div>
        </DashboardCard>

        {/* 3. STELLAR (The Population) */}
        <DashboardCard 
          title="Stellar" 
          icon={Sparkles} 
          href="/natural-science/astronomy/stellar-astronomy"
          accentColor="purple"
          className="bg-black/40 border-purple-500/20"
        >
          <div className="mt-auto text-xs text-slate-400">
            Star formation, evolution, and death.
          </div>
        </DashboardCard>

        {/* 4. GALACTIC (The City) */}
        <DashboardCard 
          title="Galactic" 
          icon={Aperture} 
          href="/natural-science/astronomy/galactic-astronomy"
          accentColor="emerald"
          className="bg-black/40 border-emerald-500/20"
        >
          <div className="mt-auto text-xs text-slate-400">
            Structure and motion of the Milky Way.
          </div>
        </DashboardCard>

        {/* 5. EXTRA-GALACTIC (The Ocean) */}
        <DashboardCard 
          title="Extragalactic" 
          icon={Infinity} 
          href="/natural-science/astronomy/extragalactic-astronomy"
          accentColor="purple"
          className="lg:col-span-2 bg-gradient-to-r from-purple-950/20 to-black/40 border-purple-500/20"
        >
          <div className="flex items-center justify-between mt-auto">
            <div className="text-sm font-bold text-white">Beyond the Milky Way</div>
            <div className="text-[10px] font-mono text-purple-400">Active Galactic Nuclei • Quasars</div>
          </div>
        </DashboardCard>

        {/* 6. COSMOLOGY (The Fabric) */}
        <DashboardCard 
          title="Cosmology" 
          icon={Sigma} 
          href="/natural-science/astronomy/cosmology"
          accentColor="slate"
          className="lg:col-span-2 bg-gradient-to-l from-slate-900/40 to-black/40 border-white/10"
        >
           <div className="flex items-center justify-between mt-auto">
            <div className="text-sm font-bold text-white">Origin & Evolution</div>
            <div className="text-[10px] font-mono text-slate-400">Big Bang • Dark Matter • Inflation</div>
          </div>
        </DashboardCard>

        {/* 7. OBSERVATIONAL (The Method) */}
        <DashboardCard 
          title="Observational" 
          icon={Eye} 
          href="/natural-science/astronomy/observational-astronomy"
          accentColor="cyan"
          className="bg-black/40"
        >
           <div className="mt-auto text-xs text-slate-400">
            Data acquisition via telescope.
          </div>
        </DashboardCard>

        {/* 8. THEORETICAL (The Code) */}
        <DashboardCard 
          title="Theoretical" 
          icon={Rocket} 
          href="/natural-science/astronomy/theoretical-astronomy"
          accentColor="orange"
          className="bg-black/40"
        >
           <div className="mt-auto text-xs text-slate-400">
            Simulations and analytical models.
          </div>
        </DashboardCard>

      </div>
    </div>
  );
}