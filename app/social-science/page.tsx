"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Brain, Users, MessageSquare, Gavel, 
  Coins, Map, Landmark, Search, LineChart
} from "lucide-react";
import SocialDynamicsBackground from "./SocialDynamicsBackground";

export default function SocialStudiesHub() {
  const [activeLens, setActiveLens] = useState<string | null>("systems");

  const sectors = [
    { 
      id: "micro", 
      title: "The Individual", 
      disciplines: [
        { name: "Psychology", href: "/social-science/psychology", icon: Brain, color: "text-pink-400", desc: "Mind & Behavior" },
        { name: "Communications", href: "/social-science/communications", icon: MessageSquare, color: "text-cyan-400", desc: "Interaction & Media" }
      ] 
    },
    { 
      id: "macro", 
      title: "The System", 
      disciplines: [
        { name: "Sociology", href: "/social-science/sociology", icon: Users, color: "text-indigo-400", desc: "Structures & Groups" },
        { name: "Political Science", href: "/social-science/political-science", icon: Gavel, color: "text-amber-400", desc: "Power & Policy" },
        { name: "Economics", href: "/social-science/economics", icon: Coins, color: "text-emerald-400", desc: "Resources & Choice" }
      ] 
    },
    { 
      id: "context", 
      title: "The Environment", 
      disciplines: [
        { name: "Human Geography", href: "/social-science/geography", icon: Map, color: "text-sky-400", desc: "Space & Place" },
        { name: "Anthropology", href: "/social-science/anthropology", icon: Search, color: "text-orange-500", desc: "Evolution & Culture" },
        { name: "Linguistics", href: "/social-science/linguistics", icon: Landmark, color: "text-lime-400", desc: "Language & Logic" }
      ] 
    }
  ];

  return (
    <main className="relative min-h-screen bg-[#050510] text-slate-200 overflow-hidden font-sans">
      <SocialDynamicsBackground />
      
      <div className="relative z-10 container mx-auto px-6 py-12 flex flex-col min-h-screen">
        <header className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-teal-500 mb-4 uppercase tracking-[0.3em]">
            <ArrowLeft size={12} /> Knowledge Graph // Social Studies
          </Link>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter drop-shadow-2xl">
            SOCIAL<span className="text-teal-500">.</span>SCIENCE
          </h1>
          <p className="max-w-2xl text-slate-400 text-lg leading-relaxed italic">
            "The study of human society and the relationships among individuals within it."
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">

          {/* RIGHT: THE SECTOR MAP */}
          <div className="lg:col-span-8 space-y-12">
            {sectors.map((sector) => (
              <section key={sector.id} className="relative">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/30 mb-6 flex items-center gap-4">
                  {sector.title} <div className="h-[1px] flex-1 bg-white/5" />
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sector.disciplines.map((d) => (
                    <Link key={d.name} href={d.href} className="group relative bg-slate-900/40 border border-white/5 p-6 rounded-xl hover:bg-white/5 hover:border-teal-500/50 transition-all">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg bg-black/40 border border-white/10 ${d.color} group-hover:scale-110 transition-transform`}>
                          <d.icon size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-white group-hover:text-teal-400 transition-colors">{d.name}</h4>
                          <p className="text-xs text-slate-500">{d.desc}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}