"use client";
import PageHeader from "@/components/PageHeader";
import LudologyBackground from "@/components/LudologyBackground"; // Reuse for now
import Link from "next/link";
import { Gamepad2, Swords, Zap, Monitor } from "lucide-react";

export default function ArcadeHub() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      <LudologyBackground />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="The Nexus"
          title="The Arcade"
          subtitle="Active simulations and interactive experiments. Stop reading and start doing."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            
            {/* MTG Battle */}
            <Link href="/interdisciplines/game-studies/library/magic-the-gathering" className="group relative h-64 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/40 hover:border-red-500/50 transition-all">
                 <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10" />
                 <div className="relative z-20 p-8 h-full flex flex-col justify-center">
                    <Swords size={40} className="text-red-500 mb-4" />
                    <h3 className="text-3xl font-black text-white mb-2">Battle Simulator</h3>
                    <p className="text-neutral-400 max-w-sm">Test deck concepts in a vacuum environment.</p>
                 </div>
            </Link>

            {/* Game Theory */}
            <Link href="/interdisciplines/game-studies" className="group relative h-64 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/40 hover:border-blue-500/50 transition-all">
                 <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10" />
                 <div className="relative z-20 p-8 h-full flex flex-col justify-center">
                    <Monitor size={40} className="text-blue-500 mb-4" />
                    <h3 className="text-3xl font-black text-white mb-2">Prisoner's Dilemma</h3>
                    <p className="text-neutral-400 max-w-sm">Challenge the algorithm in a game of trust.</p>
                 </div>
            </Link>

             {/* Dev Lab */}
            <Link href="/dev-playground" className="col-span-1 md:col-span-2 group relative h-40 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/40 hover:border-green-500/50 transition-all flex items-center px-12 gap-8">
                 <Zap size={40} className="text-green-500 shrink-0" />
                 <div>
                    <h3 className="text-2xl font-bold text-white">UI Component Lab</h3>
                    <p className="text-neutral-400">Test the visual systems.</p>
                 </div>
            </Link>

        </div>
      </div>
    </main>
  );
}