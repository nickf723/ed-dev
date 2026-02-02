"use client";
import Link from "next/link";
import MonteCarloBackground from "./MonteCarloBackground";
import MontyHallLab from "./MontyHallLab";
import { 
  Dices, Shuffle, Percent, Trophy, 
  ArrowRight, Binary, Target, Scale
} from "lucide-react";

export default function ProbabilityPage() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-purple-500/30">
      <MonteCarloBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* HERO */}
        <header className="mb-16 border-b border-purple-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/formal-science/mathematics/statistics" className="p-2 bg-purple-500/10 border border-purple-500/30 rounded hover:bg-purple-500/20 transition-colors">
              <Percent className="text-purple-400" size={20} />
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-purple-400">
              Statistics // Chance
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
            PROB<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">ABILITY</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-purple-500/50 pl-6">
            The mathematical study of uncertainty. While we cannot predict the future of a single event, we can predict the behavior of millions. From coin flips to quantum mechanics, probability is the logic of the universe.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: THEORY */}
          <div className="lg:col-span-6 space-y-12">
            
            {/* The Pitch */}
            <div className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Target size={20} className="text-purple-400" /> The Law of Large Numbers
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Look at the background. We are randomly throwing points. At first, the value is chaos. But as $N$ increases, order emerges. The ratio of points inside the circle inevitably converges to $\pi$ (3.14159...).
              </p>
              
              <div className="mt-4 flex items-center gap-4 text-xs font-mono text-purple-300 bg-purple-500/10 p-3 rounded border border-purple-500/20">
                 <span>P(A) =</span>
                 <div className="flex flex-col items-center leading-none">
                    <span className="border-b border-purple-300 pb-1">Number of Favorable Outcomes</span>
                    <span className="pt-1">Total Number of Possible Outcomes</span>
                 </div>
              </div>
            </div>


            {/* Concepts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Feature icon={Dices} title="Random Variables" desc="A variable whose value is unknown (e.g., a die roll)." />
                <Feature icon={Shuffle} title="Independence" desc="When one event does not affect the likelihood of another." />
                <Feature icon={Binary} title="Combinatorics" desc="Counting the number of ways events can occur." />
                <Feature icon={Scale} title="Expected Value" desc="The average outcome if an experiment is repeated infinitely." />
            </div>

            

            {/* Formula Card */}
            <div className="p-4 border border-white/10 rounded-xl bg-slate-900/50">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Bayes' Theorem</h4>
                <div className="font-mono text-lg text-white text-center">
                    P(A|B) = <span className="inline-block align-middle text-center"><span className="block border-b border-white/20">P(B|A) • P(A)</span><span className="block">P(B)</span></span>
                </div>
                <p className="text-[10px] text-slate-500 text-center mt-3">
                    Updating the probability of a hypothesis (A) as more evidence (B) becomes available.
                </p>
            </div>

          </div>

          {/* RIGHT: THE LAB */}
          <div className="lg:col-span-6 space-y-8">
            <MontyHallLab />
            
            <div className="p-6 bg-pink-900/10 border border-pink-500/20 rounded-2xl">
               <h4 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
                   <Trophy size={16} className="text-pink-400" /> Why Switch?
               </h4>
               <p className="text-xs text-slate-300 leading-relaxed">
                  When you first picked a door, you had a <strong>1/3</strong> chance of being right. That means there was a <strong>2/3</strong> chance the prize was in the "other" group.
               </p>
               <p className="text-xs text-slate-300 leading-relaxed mt-2">
                  When the host opens a door (which he knows is empty), he doesn't change those odds. The 2/3 chance is now concentrated entirely on the remaining closed door.
               </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

function Feature({ icon: Icon, title, desc }: any) {
    return (
        <div className="p-4 bg-black/40 border border-white/5 rounded-xl hover:border-purple-500/30 transition-colors">
            <Icon className="text-purple-400 mb-2" size={20} />
            <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
            <p className="text-xs text-slate-400 leading-snug">{desc}</p>
        </div>
    )
}