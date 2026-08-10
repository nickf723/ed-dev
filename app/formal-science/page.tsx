import React from 'react';
import Link from 'next/link';
import { BookOpen, BrainCircuit, CheckSquare, GitMerge } from 'lucide-react';

export default function FormalScienceHub() {
  return (
    <main className="relative min-h-screen bg-black text-slate-200 font-sans selection:bg-blue-500/30 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight text-white">
            The Formal Sciences
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Unlike empirical sciences that observe the physical world, formal sciences study abstract structures.
            Here, knowledge is built through logical deduction from a set of foundational rules (axioms).
          </p>
        </section>

        {/* Navigation Hub */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-2 text-white">Subject Hubs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <HubCard
              title="Mathematics"
              description="The study of numbers, quantities, shapes, and the rigorous relationships between them."
              href="/formal-science/mathematics"
              icon={<GitMerge className="w-6 h-6" />}
            />
            <HubCard
              title="Logic"
              description="The systematic study of valid rules of inference and reasoning."
              href="/formal-science/logic"
              icon={<BrainCircuit className="w-6 h-6" />}
            />
            <HubCard
              title="Computer Science"
              description="The theory of computation, algorithms, and information processing."
              href="/formal-science/computer-science"
              icon={<BookOpen className="w-6 h-6" />}
            />
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Vocabulary Infrastructure */}
          <section className="bg-slate-900/40 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-white">
              <BookOpen className="w-6 h-6 text-blue-400" />
              Core Vocabulary
            </h2>
            <p className="text-slate-400 mb-6">
              Mastering formal science requires fluency in its language.
            </p>
            <ul className="space-y-4">
              <VocabItem
                term="Axiom"
                definition="A starting point of reasoning; a premise so evident as to be accepted as true without controversy."
              />
              <VocabItem
                term="Theorem"
                definition="A statement that has been proven on the basis of previously established statements."
              />
              <VocabItem
                term="Algorithm"
                definition="A finite sequence of rigorous instructions used to solve a class of specific problems."
              />
            </ul>
          </section>

          {/* Assessment Infrastructure */}
          <section className="bg-blue-950/20 p-6 rounded-2xl border border-blue-500/20 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-white">
              <CheckSquare className="w-6 h-6 text-blue-400" />
              Knowledge Check
            </h2>
            <p className="text-slate-400 mb-6">
              Test your intuition on the foundations of formal systems before diving into specific subjects.
            </p>

            {/* Placeholder for interactive assessment component */}
            <div className="bg-slate-900/60 p-6 rounded-xl shadow-sm border border-blue-500/20">
              <h3 className="font-semibold text-lg mb-4 text-white">Which of the following relies strictly on empirical observation?</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg border border-white/10 text-slate-300 hover:text-white hover:bg-blue-900/30 hover:border-blue-500/30 transition-colors">
                  A) Proving the Pythagorean theorem
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-white/10 text-slate-300 hover:text-white hover:bg-blue-900/30 hover:border-blue-500/30 transition-colors">
                  B) Measuring the boiling point of water
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-white/10 text-slate-300 hover:text-white hover:bg-blue-900/30 hover:border-blue-500/30 transition-colors">
                  C) Calculating the time complexity of a sorting algorithm
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

// Reusable UI Components

function HubCard({ title, description, href, icon }: { title: string, description: string, href: string, icon: React.ReactNode }) {
  return (
    <Link href={href} className="group block p-6 bg-slate-900/60 rounded-2xl border border-white/10 shadow-sm hover:shadow-md hover:border-blue-500/50 transition-all backdrop-blur-sm">
      <div className="text-blue-400 mb-4 bg-blue-500/10 border border-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400 line-clamp-3">{description}</p>
    </Link>
  );
}

function VocabItem({ term, definition }: { term: string, definition: string }) {
  return (
    <li className="border-b border-white/10 pb-3 last:border-0 last:pb-0">
      <strong className="block text-white font-semibold mb-1">{term}</strong>
      <span className="text-slate-400 text-sm">{definition}</span>
    </li>
  );
}