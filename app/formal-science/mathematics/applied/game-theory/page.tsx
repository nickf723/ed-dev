"use client";
import React from "react";
import Link from "next/link";
import { 
  ArrowLeft, Network, Users, BrainCircuit, Swords,
  BookOpen, Zap, Target, Handshake, Pi
} from "lucide-react";
import Assessment, { AssessmentQuestion } from "@/app/_components/Assessment"; 
import PayoffMatrix from "./_components/PayoffMatrix";

// --- CONFIGURATION ---
const SUBDOMAINS = [
  {
    id: "zero-sum", title: "Zero-Sum Games", subtitle: "Strict Competition",
    desc: "Mathematical models where one participant's gain is exactly equal to another's loss (e.g., Poker, Chess).",
    icon: Swords, color: "text-rose-400", border: "border-rose-500/30", bg: "bg-rose-950/20",
    span: "col-span-12 md:col-span-4" 
  },
  {
    id: "non-zero-sum", title: "Non-Zero-Sum", subtitle: "Mutual Benefit",
    desc: "Games where players can both win, or both lose. This introduces the possibility of cooperation.",
    icon: Handshake, color: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-950/20",
    span: "col-span-12 md:col-span-4" 
  },
  {
    id: "evolutionary", title: "Evolutionary Game Theory", subtitle: "Population Dynamics",
    desc: "Applying game theory to evolving populations in biology to study strategies like the Hawk-Dove game.",
    icon: BrainCircuit, color: "text-purple-400", border: "border-purple-500/30", bg: "bg-purple-950/20",
    span: "col-span-12 md:col-span-4" 
  }
];

const gtQuiz: AssessmentQuestion[] = [
  { id: 'g1', type: 'mcq', prompt: 'In a Zero-Sum Game, which of the following is strictly true?', options: ['Both players can win simultaneously.', 'The total wealth of all players remains constant.', 'Players must cooperate to maximize their score.', 'The game goes on infinitely.'], correctAnswer: 'The total wealth of all players remains constant.', explanation: 'In a zero-sum game, wealth is only transferred, never created. If I win +5, you must have lost -5.' },
  { id: 'g2', type: 'matching', prompt: 'Match the concept to its definition.', leftItems: ['Dominant Strategy', 'Nash Equilibrium', 'Zero-Sum'], rightItems: ['A state where no player wants to change their move.', 'A move that is best regardless of the opponent.', 'A game where one wins and one loses.'], correctPairs: { 'Dominant Strategy': 'A move that is best regardless of the opponent.', 'Nash Equilibrium': 'A state where no player wants to change their move.', 'Zero-Sum': 'A game where one wins and one loses.' }, explanation: 'A dominant strategy is your safest bet. A Nash Equilibrium happens when everyone plays their safest bet.' },
  { id: 'g3', type: 'tf', prompt: 'True or False: In the Prisoner\'s Dilemma, mutual cooperation results in the absolute highest combined score for both players.', correctAnswer: true, explanation: 'True! If both cooperate, they get a high combined score (3+3=6). But because of the fear of being betrayed, rational players tend to defect, ending up at the Nash Equilibrium (1+1=2).' }
];

export default function GameTheoryPage() {
  return (
    <main className="relative min-h-screen bg-[#050508] text-white overflow-hidden font-mono selection:bg-amber-500/50 pb-24">
      
      {/* VISUAL ENGINE */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.03)_2px,transparent_2px),linear-gradient(90deg,rgba(245,158,11,0.03)_2px,transparent_2px)] bg-[size:60px_60px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-90 pointer-events-none z-0" />

      {/* 2. BENTO BOX UI CONTAINER */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-12">
        
        {/* THE BENTO GRID */}
        <div className="grid grid-cols-12 gap-6 auto-rows-min">
            
            {/* BOX 1: NAVIGATION (Top Left) */}
            <div className="col-span-12 md:col-span-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex items-center justify-center hover:bg-white/5 transition-colors">
                 <Link href="/mathematics/applied" className="flex items-center gap-2 text-xs text-amber-400 hover:text-white transition-colors uppercase tracking-widest group">
                    <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Back to Applied Math
                 </Link>
            </div>

            {/* BOX 2: HEADER (Top Right) */}
            <div className="col-span-12 md:col-span-9 bg-amber-950/20 backdrop-blur-md border border-amber-500/20 rounded-3xl p-8 flex justify-between items-end relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10"><Network size={120} /></div>
                <div className="relative z-10">
                    <div className="text-[10px] text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Target size={14}/> Domain_01 // Subdomain_02
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-white">
                        GAME THEORY
                    </h1>
                </div>
                <div className="hidden md:flex gap-4 relative z-10">
                    <div className="bg-black/50 border border-amber-500/30 rounded-lg p-3">
                        <div className="text-[10px] text-amber-400 uppercase tracking-widest mb-1">Simulators</div>
                        <div className="text-xl font-bold text-white text-right">01</div>
                    </div>
                </div>
            </div>

            {/* BOXES 3, 4, 5: SUBDOMAINS (Spanning across the middle) */}
            {SUBDOMAINS.map((item) => (
                <Link 
                    key={item.id} href="#"
                    className={`${item.span} group bg-black/40 border border-white/10 rounded-3xl p-6 hover:border-amber-500/50 hover:bg-amber-950/10 transition-all duration-300`}
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-xl bg-black/50 ${item.color} border border-white/5`}><item.icon size={24} /></div>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">{item.title}</h2>
                    <div className={`text-[10px] font-bold uppercase mb-3 opacity-70 ${item.color}`}>{item.subtitle}</div>
                    <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
                </Link>
            ))}

            {/* BOX 6: THE INTERACTIVE WIDGET (Spans full width) */}
            <div className="col-span-12 h-full min-h-[500px]">
                <PayoffMatrix />
            </div>

            {/* BOX 7: VOCAB OF THE DAY (Bottom Left) */}
            <div className="col-span-12 lg:col-span-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-amber-500/30 transition-colors">
                 <div className="absolute top-0 right-0 p-4 text-amber-500/10 group-hover:text-amber-500/20 transition-colors"><BookOpen size={64} /></div>
                 <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-400 mb-6"><Zap size={14} className="text-white" /> Core Terminology</div>
                 <h4 className="text-4xl font-serif italic text-white mb-2">Dominance</h4>
                 <div className="text-[10px] text-slate-500 font-mono mb-6 uppercase tracking-wider">noun | Game Theory</div>
                 <p className="text-sm text-slate-300 leading-relaxed mb-6">A strategy is dominant if, regardless of what any other players do, the strategy earns a player a larger payoff than any other strategy.</p>
                 <div className="p-4 bg-amber-950/30 border-l-2 border-amber-500 rounded-r-lg mt-auto">
                    <p className="text-xs text-amber-200/80 italic font-serif">"In the Prisoner's Dilemma, betraying your partner is the dominant strategy."</p>
                 </div>
            </div>

            {/* BOX 8: ASSESSMENT (Bottom Right) */}
            <div className="col-span-12 lg:col-span-8">
                <Assessment title="Knowledge Check: Game Theory" questions={gtQuiz} onComplete={(score, total) => console.log(`GT Quiz Scored: ${score}/${total}`)} />
            </div>

        </div>
      </div>
    </main>
  );
}