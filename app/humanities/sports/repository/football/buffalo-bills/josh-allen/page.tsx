"use client";
import Link from "next/link";
import ElectricFieldBackground from "./ElectricFieldBackground";
import ChaosMatrixLab from "./ChaosMatrixLab";
import { 
  Trophy, Zap, Target, TrendingUp, 
  ArrowRight, Shield, Activity, Flame 
} from "lucide-react";

export default function JoshAllenPage() {
  return (
    <main className="relative min-h-screen bg-[#00338D] text-slate-200 overflow-hidden font-sans selection:bg-red-500/30">
      <ElectricFieldBackground />
      {/* Dark Vignette for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00338D]/90 via-[#00338D]/60 to-[#00338D]/20 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* HERO */}
        <header className="mb-16 border-b border-white/10 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/humanities/sports/repository/football/buffalo-bills" className="p-2 bg-white/10 border border-white/20 rounded hover:bg-white/20 transition-colors">
              <Shield className="text-white" size={20} />
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/70">
              Buffalo Bills // QB1
            </span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase leading-none italic transform -skew-x-6 drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]">
            JOSH <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white">ALLEN</span>
          </h1>
          <p className="mt-6 text-blue-100 max-w-2xl text-lg font-light leading-relaxed border-l-4 border-red-500 pl-6 bg-black/20 p-4 rounded-r-xl backdrop-blur-sm">
            The Winter Soldier. A 6'5", 240lb anomaly who hurdles linebackers and throws 80 yards in the air. He is the only player in NFL history to combine elite rushing volume with elite passing volume.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: THE MYTHOS */}
          <div className="lg:col-span-5 space-y-12">
            
            {/* The Unicorn Stat */}
            <div className="p-6 bg-[#C60C30] border border-white/10 rounded-2xl shadow-2xl">
              <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-2 italic">
                <Flame size={28} className="text-yellow-400" /> THE UNICORN
              </h3>
              <div className="space-y-4">
                  <div className="flex justify-between items-end border-b border-white/20 pb-2">
                      <span className="text-xs font-bold uppercase text-white/80">Rushing TDs</span>
                      <span className="text-3xl font-black text-white">No. 1</span>
                  </div>
                  <p className="text-xs text-white leading-relaxed">
                      All-time among QBs (76+). He has more rushing touchdowns than Hall of Fame Running Backs Earl Campbell and Thurman Thomas.
                  </p>
                  <div className="flex justify-between items-end border-b border-white/20 pb-2 pt-2">
                      <span className="text-xs font-bold uppercase text-white/80">Total Yards</span>
                      <span className="text-3xl font-black text-white">24,000+</span>
                  </div>
              </div>
            </div>

            {/* Signature Traits */}
            <div className="grid grid-cols-2 gap-4">
                <Trait title="The Cannon" desc="Recorded 77-yard throw. Top 1% arm strength." icon={Target} />
                <Trait title="The Hurdle" desc="Signature move jumping over defenders in open field." icon={Activity} />
                <Trait title="The Clutch" desc="13 Seconds Game: 4 TDs, 0 INT, Perfect Rating." icon={Zap} />
                <Trait title="The Size" desc="Big enough to play Linebacker. Hard to sack." icon={Shield} />
            </div>

          </div>

          {/* RIGHT: THE LAB */}
          <div className="lg:col-span-7 space-y-8">
            <ChaosMatrixLab />
            
            <div className="p-6 bg-slate-900/80 border border-white/10 rounded-2xl backdrop-blur-md">
               <h4 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
                   <TrendingUp size={16} className="text-blue-400" /> The Growth Mindset
               </h4>
               <p className="text-sm text-slate-300 leading-relaxed">
                  Drafted as a "Project" with accuracy issues (56% in college), Allen defied mathematical probability to become an elite passer (69% in 2020). He is the statistical outlier that every team now tries to find.
               </p>
            </div>
            
            
          </div>

        </div>
      </div>
    </main>
  );
}

function Trait({ title, desc, icon: Icon }: any) {
    return (
        <div className="p-4 bg-black/40 border border-white/5 rounded-xl hover:border-blue-500/50 transition-colors group">
            <Icon className="text-blue-500 mb-2 group-hover:text-white transition-colors" size={24} />
            <h4 className="text-sm font-black text-white mb-1 uppercase italic">{title}</h4>
            <p className="text-xs text-slate-400 leading-snug">{desc}</p>
        </div>
    )
}