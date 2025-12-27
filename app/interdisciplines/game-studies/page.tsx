"use client";
import PageHeader from "@/components/PageHeader";
import LudologyBackground from "@/app/interdisciplines/game-studies/LudologyBackground";
import Link from "next/link";
import { motion } from "framer-motion";
import { Dices, Microscope, ArrowRight } from "lucide-react";

export default function GameStudiesPortal() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12 flex flex-col">
      
      {/* 1. Background */}
      <LudologyBackground />
      
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center py-20">
        
        <PageHeader
          eyebrow="Interdiscipline"
          title="Game Studies"
          subtitle="Ludology. The intersection of Play, Logic, and Culture."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            
            {/* Path 1: The Library (Play) */}
            <Link href="/interdisciplines/game-studies/library" className="group relative h-80 rounded-3xl border border-white/10 bg-neutral-900/40 overflow-hidden hover:border-yellow-400/50 transition-all">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1610890716271-e7466acfa05b?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" />
                
                <div className="relative z-20 h-full flex flex-col justify-end p-8">
                    <div className="mb-4 p-3 w-fit rounded-xl bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                        <Dices size={32} />
                    </div>
                    <h2 className="text-3xl font-black text-white mb-2">The Library</h2>
                    <p className="text-neutral-300 mb-6 max-w-md">
                        Explore specific games. Learn rules, strategies, and history. From Magic: The Gathering to Video Games.
                    </p>
                    <div className="flex items-center gap-2 text-yellow-400 font-bold text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                        Browse Games <ArrowRight size={16} />
                    </div>
                </div>
            </Link>

            {/* Path 2: The Lab (Science) */}
            <Link href="/interdisciplines/game-studies/science" className="group relative h-80 rounded-3xl border border-white/10 bg-neutral-900/40 overflow-hidden hover:border-purple-400/50 transition-all">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614726365397-b58977399044?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" />
                
                <div className="relative z-20 h-full flex flex-col justify-end p-8">
                    <div className="mb-4 p-3 w-fit rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                        <Microscope size={32} />
                    </div>
                    <h2 className="text-3xl font-black text-white mb-2">The Science</h2>
                    <p className="text-neutral-300 mb-6 max-w-md">
                        Deconstruct the systems. Game Theory, Ludonarrative, and the psychology of play.
                    </p>
                    <div className="flex items-center gap-2 text-purple-400 font-bold text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                        Enter Lab <ArrowRight size={16} />
                    </div>
                </div>
            </Link>

        </div>

      </div>
    </main>
  );
}