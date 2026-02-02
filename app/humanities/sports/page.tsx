"use client";
import Link from "next/link";
import PlaybookBackground from "./PlaybookBackground";
import BiomechanicsLab from "./BiomechanicsLab";
import { 
  Trophy, Activity, BrainCircuit, BarChart3, 
  ArrowRight, Users, Timer, Dumbbell 
} from "lucide-react";

export default function SportsPage() {
  const modules = [
    { 
      title: "Physiology & Training", 
      href: "/humanities/sports/physiology", 
      icon: Dumbbell, 
      color: "text-emerald-400", 
      border: "hover:border-emerald-500/50",
      bg: "hover:bg-emerald-500/10",
      desc: "The biology of performance. Muscles, energy systems (ATP), and periodization." 
    },
    { 
      title: "Strategy & Tactics", 
      href: "/humanities/sports/strategy", 
      icon: Users, 
      color: "text-orange-400", 
      border: "hover:border-orange-500/50",
      bg: "hover:bg-orange-500/10",
      desc: "Game theory applied to the field. Formations, spacing, and play-calling." 
    },
    { 
      title: "Sports Psychology", 
      href: "/humanities/sports/psychology", 
      icon: BrainCircuit, 
      color: "text-purple-400", 
      border: "hover:border-purple-500/50",
      bg: "hover:bg-purple-500/10",
      desc: "The mental game. Flow state, visualization, and performing under pressure." 
    },
    { 
      title: "Analytics (Sabermetrics)", 
      href: "/humanities/sports/analytics", 
      icon: BarChart3, 
      color: "text-sky-400", 
      border: "hover:border-sky-500/50",
      bg: "hover:bg-sky-500/10",
      desc: "Using data to optimize winning. eFG%, xG, and player efficiency ratings." 
    },
  ];

  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-emerald-500/30">
      <PlaybookBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* HERO */}
        <header className="mb-16 border-b border-emerald-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/humanities" className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded hover:bg-emerald-500/20 transition-colors">
              <Trophy className="text-emerald-400" size={20} />
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-400">
              Humanities // Performance
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
            SPORTS <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-orange-400">&</span><br/>
            <span className="text-slate-500">THEORY</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-emerald-500/50 pl-6">
            Sports are not just games; they are the optimization of the human machine. They combine biomechanics, psychology, and complex game theory into a measurable competition of skill.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: THEORY */}
          <div className="lg:col-span-6 space-y-12">
            
            {/* Physics of Motion */}
            <div className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Activity size={20} className="text-emerald-400" /> Biomechanics
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Every athletic movement is a physics equation. A pitcher generating torque, a sprinter maximizing ground reaction force, or a diver controlling angular momentum.
              </p>

            </div>

            {/* Navigation Grid */}
            <div>
               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Timer size={14} /> Core Disciplines
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {modules.map((m) => (
                   <Link 
                     key={m.title} 
                     href={m.href}
                     className={`group p-5 bg-black/40 border border-white/5 rounded-xl transition-all hover:-translate-y-1 ${m.border} ${m.bg}`}
                   >
                      <div className="flex items-start justify-between mb-3">
                         <m.icon className={m.color} size={24} />
                         <ArrowRight size={16} className={`opacity-0 group-hover:opacity-100 transition-opacity ${m.color}`} />
                      </div>
                      <h4 className="font-bold text-white text-sm mb-1">{m.title}</h4>
                      <p className="text-xs text-slate-400 leading-snug">{m.desc}</p>
                   </Link>
                 ))}
               </div>
            </div>

            

[Image of human muscle anatomy chart]


            {/* Game Theory Card */}
            <div className="flex gap-4 p-4 bg-orange-900/10 border border-orange-500/20 rounded-xl">
                <Users className="text-orange-500 shrink-0" />
                <div>
                    <h4 className="text-sm font-bold text-white uppercase">Space & Time</h4>
                    <p className="text-xs text-slate-400 mt-1">
                        In team sports (Soccer, Basketball, Football), the goal is identical: manipulate the defense to create <strong>Space</strong> and buy <strong>Time</strong> for a high-percentage shot.
                    </p>
                </div>
            </div>

          </div>

          {/* RIGHT: THE LAB */}
          <div className="lg:col-span-6 space-y-8">
            <BiomechanicsLab />
            
            <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl">
               <h4 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
                   <BarChart3 size={16} className="text-slate-400" /> The Moneyball Revolution
               </h4>
               <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  We no longer rely on the "Eye Test." Sensors track every movement.
               </p>
               <ul className="space-y-3 font-mono text-xs text-slate-400">
                  <li className="flex justify-between border-b border-white/5 pb-2">
                     <span>xG (Expected Goals)</span>
                     <span className="text-emerald-400">Quality of a shot attempt.</span>
                  </li>
                  <li className="flex justify-between border-b border-white/5 pb-2">
                     <span>PER (Player Efficiency)</span>
                     <span className="text-emerald-400">Overall per-minute production.</span>
                  </li>
                  <li className="flex justify-between pt-1">
                     <span>Spin Rate</span>
                     <span className="text-emerald-400">RPM of a baseball pitch.</span>
                  </li>
               </ul>
            </div>
            
            
          </div>

        </div>
      </div>
    </main>
  );
}