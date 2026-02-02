"use client";
import Link from "next/link";
import HighmarkSnowBackground from "./HighmarkSnowBackground";
import TeamErasTimeline from "./TeamErasTimeline";
import { 
  Trophy, Shield, MapPin, ArrowRight, 
  Users, Snowflake, Flame, Skull 
} from "lucide-react";

export default function BuffaloBillsPage() {
  return (
    <main className="relative min-h-screen bg-[#00338D] text-slate-200 overflow-hidden font-sans selection:bg-red-600/30">
      <HighmarkSnowBackground />
      {/* Frosty Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00338D]/50 to-[#001e52] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* HERO */}
        <header className="mb-16 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Link href="/humanities/sports/repository/football" className="p-2 bg-white/10 border border-white/20 rounded hover:bg-white/20 transition-colors">
                <Shield className="text-white" size={20} />
              </Link>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/70">
                AFC East // Franchise
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-lg">
              BUFFALO <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">BILLS</span>
            </h1>
          </div>
          
          <div className="flex gap-4">
             <StatBox label="Est." value="1960" />
             <StatBox label="Titles" value="2 (AFL)" />
             <StatBox label="Stadium" value="Highmark" />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: IDENTITY */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* The Mafia Card */}
            <div className="p-6 bg-[#C60C30]/90 border border-white/10 rounded-2xl shadow-xl">
               <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                   <Users size={20} /> Bills Mafia
               </h3>
               <p className="text-xs text-white/90 leading-relaxed font-medium">
                   More than a fanbase. A community known for extreme loyalty, charitable donations ($1M+ to Oishei Children's Hospital), and smashing folding tables in the parking lot.
               </p>
            </div>

            {/* Stadium Info */}
            <div className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md">
                <h4 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
                   <MapPin size={16} className="text-blue-400" /> Orchard Park, NY
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                   One of the few remaining open-air stadiums in the north. The wind swirls unpredictably, and late-season games are often played in sub-zero temperatures.
                </p>
                <div className="flex items-center gap-2 text-[10px] text-blue-300 uppercase font-bold">
                    <Snowflake size={12} /> Home Field Advantage
                </div>
            </div>

            {/* Roster Link (Next Step) */}
            <Link href="/humanities/sports/repository/football/buffalo-bills/josh-allen" className="group block p-1 rounded-2xl bg-gradient-to-r from-white to-slate-300">
                <div className="bg-slate-950 rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-8xl text-white select-none">17</div>
                    <div className="relative z-10">
                        <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">Franchise Quarterback</div>
                        <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">JOSH ALLEN</h3>
                        <div className="mt-4 flex items-center gap-2 text-xs font-bold text-red-500">
                            View Player Profile <ArrowRight size={14} />
                        </div>
                    </div>
                </div>
            </Link>

          </div>

          {/* RIGHT: HISTORY */}
          <div className="lg:col-span-8 space-y-8">
            <TeamErasTimeline />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FactCard 
                    icon={Flame} 
                    title="The Comeback" 
                    desc="1993 Wild Card vs Oilers. Down 35-3, backup QB Frank Reich led the greatest comeback in NFL history (41-38)." 
                />
                <FactCard 
                    icon={Skull} 
                    title="Wide Right" 
                    desc="Super Bowl XXV. The closest the Bills ever came. Scott Norwood's 47-yard kick sailed wide right as time expired." 
                />
            </div>
            
            
          </div>

        </div>
      </div>
    </main>
  );
}

function StatBox({ label, value }: any) {
    return (
        <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-center backdrop-blur-sm">
            <div className="text-[9px] uppercase font-bold text-slate-400">{label}</div>
            <div className="text-lg font-black text-white">{value}</div>
        </div>
    )
}

function FactCard({ icon: Icon, title, desc }: any) {
    return (
        <div className="p-4 bg-black/40 border border-white/5 rounded-xl flex gap-4 items-start">
            <div className="p-2 bg-white/10 rounded-lg text-white">
                <Icon size={20} />
            </div>
            <div>
                <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
                <p className="text-xs text-slate-400 leading-snug">{desc}</p>
            </div>
        </div>
    )
}