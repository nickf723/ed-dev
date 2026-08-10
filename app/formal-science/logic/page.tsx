"use client";

import React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Calculator,
  CheckSquare,
  GitCommit,
  Infinity,
  SearchCode,
  Waypoints,
} from "lucide-react";
import LogicBackground from "./_components/LogicBackground";
import TruthEngine from "./_components/TruthEngine";
import QuantifierEngine from "./_components/QuantifierEngine";
import Assessment from "@/app/_components/Assessment";
import VocabApplet from "@/app/_components/VocabApplet";
import { M } from "@/app/_components/Math";
import { logicVocab } from "@/app/_data/vocab/l/logic";
import { curriculumRegistry } from "@/lib/curriculum/registry";
import { logicQuiz } from "./_components/assessment";

function requireLogicNode(id: string) {
  const node = curriculumRegistry.getNode(id);
  if (!node) throw new Error(`Logic curriculum node ${id} is missing from the registry.`);
  return node;
}

const PROPOSITIONAL = requireLogicNode("formal.logic.propositional");
const FIRST_ORDER = requireLogicNode("formal.logic.first-order");
const SET_THEORY = requireLogicNode("formal.logic.set-theory");
const FALLACIES = requireLogicNode("formal.logic.fallacies");

export default function LogicHubPage() {
  return (
    <main className="relative min-h-screen bg-[#05030a] overflow-hidden selection:bg-purple-900/30 font-sans pb-32">
      <LogicBackground />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto pt-24">
        <div className="absolute left-6 md:left-24 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/30 to-transparent pointer-events-none" />

        <div className="relative pl-16 md:pl-40 pr-6 mb-32">
          <div className="absolute left-[21px] md:left-[93px] top-4 w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)] ring-4 ring-black" />

          <Link href="/formal-science" className="inline-flex items-center gap-2 text-[10px] font-black tracking-widest text-neutral-500 hover:text-purple-400 mb-8 transition-colors uppercase border border-neutral-800 hover:border-purple-500/30 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Formal Sciences
          </Link>

          <div className="flex items-center gap-3 text-purple-500 mb-4 font-mono text-xs font-bold tracking-[0.2em] uppercase">
            <span>[ DOMAIN 02 ]</span>
            <span className="w-12 h-px bg-purple-500/50" />
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none drop-shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            LOGIC
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed font-light">
            The architecture of truth. Logic strips away context, emotion, and bias, leaving only the immutable framework of <strong className="text-purple-300 font-semibold">valid reasoning</strong>.
          </p>
        </div>

        <div className="relative pl-16 md:pl-40 pr-6 mb-32">
          <div className="absolute left-[21px] md:left-[93px] top-6 w-3 h-3 rounded-full border-2 border-purple-500 bg-black ring-4 ring-black" />

          <div className="flex items-center gap-3 mb-8 text-purple-400 font-mono text-xs font-bold tracking-widest uppercase">
            <Waypoints size={16} /> Level 1: Binary States & Connectives
          </div>

          <p className="text-sm text-neutral-400 max-w-3xl leading-relaxed mb-8">
            Before we can build complex mathematical proofs or computer algorithms, we must define the absolute basics: <strong>True and False</strong>. At this level, we only care about how simple statements combine together.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-3 bg-black/40 border border-neutral-800 px-4 py-2 rounded-lg">
              <div className="text-white font-serif text-lg">∧</div>
              <div className="text-[10px] text-neutral-400 uppercase tracking-widest">AND</div>
            </div>
            <div className="flex items-center gap-3 bg-black/40 border border-neutral-800 px-4 py-2 rounded-lg">
              <div className="text-white font-serif text-lg">∨</div>
              <div className="text-[10px] text-neutral-400 uppercase tracking-widest">OR</div>
            </div>
            <div className="flex items-center gap-3 bg-black/40 border border-neutral-800 px-4 py-2 rounded-lg">
              <div className="text-white font-serif text-lg">¬</div>
              <div className="text-[10px] text-neutral-400 uppercase tracking-widest">NOT</div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-md border border-purple-500/20 rounded-3xl p-2 shadow-2xl relative mb-6">
            <div className="absolute -left-16 md:-left-24 top-1/2 w-16 md:w-24 h-px bg-purple-500/20" />
            <TruthEngine />
          </div>

          <Link href={PROPOSITIONAL.href} className="group flex items-center justify-between p-6 bg-purple-950/10 border border-purple-500/30 rounded-2xl hover:bg-purple-900/20 transition-all max-w-2xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-black border border-purple-500/30 rounded-xl text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                <GitCommit size={20} />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg group-hover:text-purple-300 transition-colors">Module: {PROPOSITIONAL.label}</h4>
                <p className="text-xs text-neutral-500 mt-1">{PROPOSITIONAL.description}</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-purple-500 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="relative pl-16 md:pl-40 pr-6 mb-32">
          <div className="absolute left-[21px] md:left-[93px] top-6 w-3 h-3 rounded-full border-2 border-blue-500 bg-black ring-4 ring-black" />

          <div className="flex items-center gap-3 mb-8 text-blue-400 font-mono text-xs font-bold tracking-widest uppercase">
            <Calculator size={16} /> Level 2: Quantifiers & Sets
          </div>

          <p className="text-sm text-neutral-400 max-w-3xl leading-relaxed mb-8">
            Simple true/false statements aren&apos;t enough to describe the universe. &quot;All dogs are mammals&quot; requires a new syntax. Here, we introduce <strong>Quantifiers</strong> and begin grouping objects into overlapping <strong>Sets</strong>.
          </p>

          <div className="bg-black/40 backdrop-blur-md border border-blue-500/20 rounded-3xl p-2 shadow-2xl relative mb-8">
            <div className="absolute -left-16 md:-left-24 top-1/2 w-16 md:w-24 h-px bg-blue-500/20" />
            <QuantifierEngine />
          </div>

          <div className="mt-4 p-4 border-l-2 border-blue-500/50 bg-blue-900/10 text-sm text-neutral-400 font-light max-w-3xl rounded-r-lg mb-8">
            Notice how a single counter-example breaks a Universal (∀) statement. If you say &quot;∀ objects in Set B are Filled&quot;, the engine immediately flags the empty circles as the reason the statement is FALSE.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
            <Link href={FIRST_ORDER.href} className="group p-6 bg-blue-950/10 border border-blue-500/30 rounded-2xl hover:bg-blue-900/20 transition-all">
              <div className="mb-4 text-blue-400 group-hover:text-blue-300 transition-colors"><SearchCode size={24} /></div>
              <h4 className="text-white font-bold mb-1 group-hover:text-blue-300 transition-colors">{FIRST_ORDER.label}</h4>
              <p className="text-xs text-neutral-500">{FIRST_ORDER.description}</p>
            </Link>

            <article className="relative p-6 bg-cyan-950/10 border border-dashed border-cyan-500/25 rounded-2xl opacity-65">
              <span className="absolute right-4 top-4 rounded-full border border-cyan-500/20 bg-black/40 px-2 py-1 text-[8px] font-bold uppercase tracking-widest text-cyan-300/70">Planned</span>
              <div className="mb-4 text-cyan-400"><Infinity size={24} /></div>
              <h4 className="text-white font-bold mb-1">{SET_THEORY.label}</h4>
              <p className="text-xs text-neutral-500">{SET_THEORY.description}</p>
            </article>
          </div>
        </div>

        <div className="relative pl-16 md:pl-40 pr-6 mb-32">
          <div className="absolute left-[21px] md:left-[93px] top-6 w-3 h-3 rounded-full border-2 border-rose-500 bg-black ring-4 ring-black" />
          <div className="absolute left-[21px] md:left-[93px] top-8 bottom-0 w-3 bg-[#05030a]" />

          <div className="flex items-center gap-3 mb-8 text-rose-400 font-mono text-xs font-bold tracking-widest uppercase">
            <BrainCircuit size={16} /> Level 3: Informal Logic
          </div>

          <p className="text-sm text-neutral-400 max-w-3xl leading-relaxed mb-8">
            Mathematical logic is perfect. Humans are not. When we attempt to apply logical structures to everyday language and debate, we frequently make structural errors known as <strong>Logical Fallacies</strong>.
          </p>

          <article className="relative flex items-center justify-between p-6 bg-rose-950/10 border border-dashed border-rose-500/25 rounded-2xl max-w-2xl opacity-65">
            <span className="absolute right-4 top-4 rounded-full border border-rose-500/20 bg-black/40 px-2 py-1 text-[8px] font-bold uppercase tracking-widest text-rose-300/70">Planned</span>
            <div className="flex items-center gap-4 pr-20">
              <div className="p-3 bg-black border border-rose-500/30 rounded-xl text-rose-400">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">Module: {FALLACIES.label}</h4>
                <p className="text-xs text-neutral-500 mt-1">{FALLACIES.description}</p>
              </div>
            </div>
          </article>
        </div>

        <div className="relative pl-6 md:pl-32 pr-6 border-t border-purple-500/20 pt-24 mt-24">
          <div className="flex items-center gap-3 mb-12 text-purple-400 font-mono text-xs font-bold tracking-widest uppercase">
            <CheckSquare size={16} /> [ Q.E.D. VERIFICATION ]
          </div>

          <div className="grid grid-cols-1 gap-12 max-w-5xl">
            <div className="w-full">
              <VocabApplet currentDomain="Logic" localTerms={logicVocab} accentColor="purple" />
            </div>

            <div className="w-full">
              <Assessment
                title="Proof of Comprehension"
                questions={logicQuiz}
                accentColor="purple"
                onComplete={(score, total) => console.log(`Logic Quiz Scored: ${score}/${total}`)}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
