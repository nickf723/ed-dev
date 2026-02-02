"use client";
import Link from "next/link";
import FieldTacticsBackground from "./FieldTacticsBackground";
import FormationLab from "./FormationLab";
import { 
  Shield, Trophy, Map, ArrowRight, 
  Users, Target, Swords, Timer
} from "lucide-react";

export default function FootballPage() {
  const afcTeams = [
    { name: "Buffalo Bills", id: "bills", color: "text-blue-400", border: "border-blue-500/50", href: "/humanities/sports/repository/football/buffalo-bills" },
    { name: "Kansas City Chiefs", id: "chiefs", color: "text-red-500", border: "border-red-500/20", href: "#" },
    { name: "Baltimore Ravens", id: "ravens", color: "text-purple-400", border: "border-purple-500/20", href: "#" },
  ];

  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-emerald-500/30">
      <FieldTacticsBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* HERO */}
        <header className="mb-16 border-b border-emerald-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/humanities/sports/repository" className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded hover:bg-emerald-500/20 transition-colors">
              <Trophy className="text-emerald-400" size={20} />
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-400">
              Repository // Team
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
            AMERICAN <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-orange-400">FOOTBALL</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-emerald-500/50 pl-6">
            A turn-based strategy game played at sprinting speed. 22 players, 100 yards, and 4 downs to advance the ball. It is the ultimate collision of brute force and complex orchestration.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: THEORY */}
          <div className="lg:col-span-5 space-y-12">
            
            {/* The Downs System */}
            <div className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Map size={20} className="text-emerald-400" /> The Gridiron Logic
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Unlike Soccer or Basketball (Continuous Flow), Football is discrete.
              </p>
              <ul className="space-y-3">
                 <li className="flex gap-4 p-3 bg-black/40 rounded border border-white/5">
                    <div className="text-2xl font-black text-white">4</div>
                    <div>
                        <div className="text-xs font-bold text-orange-400 uppercase">Downs</div>
                        <div className="text-[10px] text-slate-500">Chances to move the ball 10 yards. Fail, and you turnover.</div>
                    </div>
                 </li>
                 <li className="flex gap-4 p-3 bg-black/40 rounded border border-white/5">
                    <div className="text-2xl font-black text-white">11</div>
                    <div>
                        <div className="text-xs font-bold text-sky-400 uppercase">Players</div>
                        <div className="text-[10px] text-slate-500">Per side. Highly specialized roles (QB, Linemen, Receivers).</div>
                    </div>
                 </li>
              </ul>
            </div>
            
            

[Image of American football field dimensions diagram]


            {/* League Structure (Links to Teams) */}
            <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl">
                <h4 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
                   <Shield size={16} className="text-slate-400" /> Active Franchises
                </h4>
                <div className="space-y-2">
                    {afcTeams.map(team => (
                        <Link key={team.id} href={team.href} className={`flex items-center justify-between p-3 rounded-lg bg-black/40 border ${team.border} hover:bg-white/5 transition-all group`}>
                            <span className={`font-bold text-sm ${team.color}`}>{team.name}</span>
                            <ArrowRight size={14} className="text-slate-600 group-hover:text-white transition-colors" />
                        </Link>
                    ))}
                    <div className="p-2 text-center text-[10px] text-slate-600 italic">
                        + 29 other teams...
                    </div>
                </div>
            </div>

          </div>

          {/* RIGHT: THE LAB */}
          <div className="lg:col-span-7 space-y-8">
            <FormationLab />
            
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-orange-900/10 border border-orange-500/20 rounded-xl">
                    <Swords className="text-orange-500 mb-2" />
                    <h4 className="text-sm font-bold text-white uppercase">The Blitz</h4>
                    <p className="text-xs text-slate-400 mt-1">
                        Sending more than 4 rushers. High risk (leaves WRs open), high reward (sacks the QB).
                    </p>
                </div>
                <div className="p-4 bg-sky-900/10 border border-sky-500/20 rounded-xl">
                    <Target className="text-sky-500 mb-2" />
                    <h4 className="text-sm font-bold text-white uppercase">Zone Coverage</h4>
                    <p className="text-xs text-slate-400 mt-1">
                        Defenders guard a specific *area* of the field rather than chasing a specific player.
                    </p>
                </div>
            </div>
            
            
          </div>

        </div>
      </div>
    </main>
  );
}