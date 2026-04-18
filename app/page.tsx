'use client';

import { motion } from 'framer-motion';
import LibraryBackground from '@/app/_homepage/HomepageBackground';
import NetworkBackground from '@/app/_homepage/NetworkBackground';
import WireframeBackground from '@/app/_homepage/WireframeBackground';
import HexGrid from './_homepage/HexGrid';
import Assessment, { AssessmentQuestion } from '@/app/_components/Assessment';
import { BookOpen, Zap } from 'lucide-react';

// --- INTERDISCIPLINARY DAILY CHALLENGE ---
const dailyQuiz: AssessmentQuestion[] = [
  {
    id: 'h1',
    type: 'mcq',
    prompt: 'Which of the following best describes "Entropy" in the Natural Sciences?',
    options: [
      'The exact amount of energy in a closed system.',
      'A measure of disorder or randomness in a system.',
      'The force that binds atoms together.',
      'The rate of acceleration in a vacuum.'
    ],
    correctAnswer: 'A measure of disorder or randomness in a system.',
    explanation: 'In thermodynamics, entropy represents the unavailability of a system\'s thermal energy for conversion into mechanical work, often interpreted as the degree of disorder or randomness in the system.'
  },
  {
    id: 'h2',
    type: 'matching',
    prompt: 'Match the overarching Domain to its core focus.',
    leftItems: ['Formal Sciences', 'Social Sciences', 'Humanities'],
    rightItems: ['Human Culture & Expression', 'Structure, Logic & Proof', 'Human Patterns & Behavior'],
    correctPairs: {
      'Formal Sciences': 'Structure, Logic & Proof',
      'Social Sciences': 'Human Patterns & Behavior',
      'Humanities': 'Human Culture & Expression',
    },
    explanation: 'Formal sciences build logical frameworks (math, code). Social sciences study how humans interact (sociology, economics). Humanities explore the meaning of the human experience (art, history, philosophy).'
  },
  {
    id: 'h3',
    type: 'tf',
    prompt: 'True or False: In the Formal Sciences, an "axiom" is a statement that has been proven true through rigorous physical experimentation.',
    correctAnswer: false,
    explanation: 'False. An axiom is a starting assumption or premise that is accepted as true without proof, serving as the starting point for further reasoning and logic.'
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 relative selection:bg-cyan-500/30 flex flex-col items-center overflow-x-hidden">
      
      {/* Layered Visual Engines */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <NetworkBackground />
        <LibraryBackground />
        <WireframeBackground />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6 py-12 flex flex-col items-center">       
        
        {/* HEADER */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center space-y-2 mb-4 mt-12"
        >
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter italic leading-none">THE WEB</h1>
          <p className="text-cyan-400/60 uppercase tracking-widest text-xs font-bold mt-4">
            Interactive Knowledge Grid
          </p>
        </motion.header>

        {/* THE NAVIGATION REACTOR */}
        <HexGrid />

        {/* --- NEW: THE DAILY HUB --- */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 pb-24"
        >
          {/* Vocab of the Day Widget */}
          <div className="col-span-1 flex flex-col gap-8">
            <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 w-full shadow-2xl relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
                 <div className="absolute top-0 right-0 p-4 text-cyan-500/10 group-hover:text-cyan-500/20 transition-colors">
                    <BookOpen size={64} />
                 </div>
                 <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-cyan-400 mb-6">
                    <Zap size={14} className="text-amber-400" /> Vocab of the Day
                 </div>
                 
                 <h4 className="text-4xl font-serif italic text-white mb-2">Axiom</h4>
                 <div className="text-[10px] text-slate-500 font-mono mb-6 uppercase tracking-wider">
                    noun | [ ak-see-uhm ] | Formal Sciences
                 </div>
                 
                 <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    A statement or proposition which is regarded as being established, accepted, or self-evidently true, serving as a starting point for further reasoning.
                 </p>

                 <div className="p-4 bg-cyan-950/30 border-l-2 border-cyan-500 rounded-r-lg">
                    <p className="text-xs text-cyan-200/80 italic font-serif">
                      "The entire structure of geometry is built upon a few simple axioms."
                    </p>
                 </div>
            </div>
          </div>

          {/* Daily Assessment Widget */}
          <div className="col-span-1 lg:col-span-2">
            <Assessment 
              title="Daily Challenge: Interdisciplinary Hub" 
              questions={dailyQuiz} 
              onComplete={(score, total) => console.log(`Daily Challenge Scored: ${score}/${total}`)}
            />
          </div>
        </motion.div>

      </div>
    </main>
  );
}