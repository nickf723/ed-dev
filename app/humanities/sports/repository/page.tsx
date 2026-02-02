"use client";
import Link from "next/link";
import StadiumLightsBackground from "./StadiumLightsBackground";
import DisciplineExplorer from "./DisciplineExplorer";
import { 
  Trophy, Medal, Globe, Flame, 
  ArrowRight, Users, Timer 
} from "lucide-react";

export default function SportsRepositoryPage() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-emerald-500/30">
      <StadiumLightsBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* HERO */}
        <header className="mb-16 border-b border-emerald-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/humanities/sports" className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded hover:bg-emerald-500/20 transition-colors">
              <Trophy className="text-emerald-400" size={20} />
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-400">
              Sports // Database
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">REPOSITORY</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-emerald-500/50 pl-6">
            The archive of human athletic achievement. From the tactical gridiron of American Football to the endurance of the Marathon. Select a discipline to access teams, players, and history.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-12">
          
          {/* Main Widget */}
          <DisciplineExplorer />

          {/* Featured Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
                icon={Flame} 
                label="Most Caloric" 
                value="Nordic Skiing" 
                sub="~1,200 cal/hr"
                color="text-orange-400"
            />
            <StatCard 
                icon={Users} 
                label="Most Popular" 
                value="Soccer (Football)" 
                sub="~3.5 Billion Fans"
                color="text-emerald-400"
            />
            <StatCard 
                icon={Timer} 
                label="Fastest Ball" 
                value="Jai Alai" 
                sub="~188 MPH (302 KM/H)"
                color="text-sky-400"
            />
          </div>
          
          

        </div>
      </div>
    </main>
  );
}

function StatCard({ icon: Icon, label, value, sub, color }: any) {
    return (
        <div className="p-6 bg-slate-900/50 border border-white/5 rounded-xl flex items-center gap-4">
            <div className={`p-3 bg-black/40 rounded-full ${color}`}>
                <Icon size={24} />
            </div>
            <div>
                <div className="text-xs font-bold text-slate-500 uppercase">{label}</div>
                <div className="text-xl font-black text-white">{value}</div>
                <div className="text-[10px] text-slate-400 font-mono">{sub}</div>
            </div>
        </div>
    )
}