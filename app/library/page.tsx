"use client";
import PageHeader from "@/components/PageHeader";
import LibraryBackground from "@/components/LibraryBackground";
import Link from "next/link";
import { BookOpen, Dices, Database, Search, Archive, Gamepad2, Sword } from "lucide-react";

export default function LibraryHub() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      <LibraryBackground />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="The Nexus"
          title="The Grand Library"
          subtitle="The central repository of all definitions, rulesets, and reference materials. Here knowledge is static, indexed, and ready for retrieval."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            
            {/* Glossary */}
            <Link href="/glossary" className="group p-8 rounded-2xl border border-white/10 bg-neutral-900/60 hover:bg-neutral-900/80 hover:border-cyan-500/50 transition-all">
                <div className="mb-4 p-3 w-fit rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 group-hover:scale-110 transition-transform">
                    <BookOpen size={32} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">System Glossary</h2>
                <p className="text-sm text-neutral-400 mb-6">
                    A master index of all terms, axioms, and definitions used across the network.
                </p>
                <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">Access Archives →</span>
            </Link>

            {/* Game Rules (Ludarium) */}
            <Link href="/interdisciplines/game-studies/library" className="group p-8 rounded-2xl border border-white/10 bg-neutral-900/60 hover:bg-neutral-900/80 hover:border-amber-500/50 transition-all">
                <div className="mb-4 p-3 w-fit rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 group-hover:scale-110 transition-transform">
                    <Dices size={32} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">The Ludarium</h2>
                <p className="text-sm text-neutral-400 mb-6">
                    Rulebooks and guides for interactive systems. Learn how to play Magic, D&D, and more.
                </p>
                <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Enter Library →</span>
            </Link>

            {/* Card Database (Direct Shortcut) */}
            <Link href="/interdisciplines/game-studies/library/magic-the-gathering" className="group p-8 rounded-2xl border border-white/10 bg-neutral-900/60 hover:bg-neutral-900/80 hover:border-purple-500/50 transition-all">
                <div className="mb-4 p-3 w-fit rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 group-hover:scale-110 transition-transform">
                    <Sword size={32} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">MTG Oracle</h2>
                <p className="text-sm text-neutral-400 mb-6">
                    Direct access to the card fetcher, rules engine, and battlefield simulator.
                </p>
                <span className="text-purple-400 text-xs font-bold uppercase tracking-widest">Open Database →</span>
            </Link>

        </div>
      </div>
    </main>
  );
}