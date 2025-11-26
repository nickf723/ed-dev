"use client";
import PageHeader from "@/components/PageHeader";
import SkillTree from "@/components/SkillTree";
import FloatingSymbols from "@/components/FloatingSymbols";
import { Trophy, Flame, Target, Brain, BookOpen, History } from "lucide-react";

export default function DashboardPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#050505] lg:px-12 pb-20">
      
      {/* Background */}
      <FloatingSymbols symbols={["XP", "Lvl", "100%", "Rank", "A+"]} />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="The Nexus"
          title="Command Center"
          subtitle="Track your journey across the knowledge network. Your understanding is expanding, node by node."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
            
            {/* LEFT: The Skill Tree (8 Cols) */}
            <div className="lg:col-span-8">
                <SkillTree />
            </div>

            {/* RIGHT: Meta Stats (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
                
                {/* Main Level Card */}
                <div className="p-6 rounded-xl border border-amber-500/30 bg-amber-900/10 relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-amber-500">Current Rank</h3>
                                <h2 className="text-3xl font-black text-white">Polymath IV</h2>
                            </div>
                            <Trophy size={32} className="text-amber-400" />
                        </div>
                        
                        {/* XP Bar */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold text-amber-200">
                                <span>XP: 4,250</span>
                                <span>Next: 5,000</span>
                            </div>
                            <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-amber-600 to-amber-400 w-[85%]" />
                            </div>
                        </div>
                    </div>
                    {/* Background Glow */}
                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-amber-500/20 blur-3xl rounded-full" />
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <StatBox icon={Flame} label="Streak" value="12 Days" color="text-orange-500" />
                    <StatBox icon={Target} label="Accuracy" value="94%" color="text-green-500" />
                    <StatBox icon={Brain} label="Axioms" value="24" color="text-violet-500" />
                    <StatBox icon={BookOpen} label="Lexicon" value="108" color="text-cyan-500" />
                </div>

                {/* Recent Activity Feed */}
                <div className="p-5 rounded-xl border border-white/10 bg-neutral-900/50 backdrop-blur-sm">
                    <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">
                        <History size={12} /> Recent Unlocks
                    </h3>
                    <div className="space-y-4">
                        <ActivityItem 
                            action="Mastered" 
                            target="Newton's 2nd Law" 
                            time="2h ago" 
                            icon={<div className="w-2 h-2 rounded-full bg-green-500" />} 
                        />
                        <ActivityItem 
                            action="Discovered" 
                            target="Term: Zeitgeist" 
                            time="5h ago" 
                            icon={<div className="w-2 h-2 rounded-full bg-cyan-500" />} 
                        />
                        <ActivityItem 
                            action="Completed" 
                            target="Simulation: Pendulum" 
                            time="1d ago" 
                            icon={<div className="w-2 h-2 rounded-full bg-purple-500" />} 
                        />
                    </div>
                </div>

            </div>

        </div>

      </div>
    </main>
  );
}

function StatBox({ icon: Icon, label, value, color }: any) {
    return (
        <div className="p-4 rounded-xl border border-white/5 bg-neutral-900/40 flex flex-col items-center text-center">
            <Icon size={20} className={`mb-2 ${color}`} />
            <span className="text-xl font-bold text-white">{value}</span>
            <span className="text-[10px] font-bold uppercase text-neutral-500">{label}</span>
        </div>
    );
}

function ActivityItem({ action, target, time, icon }: any) {
    return (
        <div className="flex items-center gap-3 text-sm">
            {icon}
            <div className="flex-1">
                <span className="text-neutral-500 text-xs">{action} </span>
                <span className="text-neutral-200 font-bold">{target}</span>
            </div>
            <span className="text-[10px] font-mono text-neutral-600">{time}</span>
        </div>
    );
}