"use client";
import Link from "next/link";
import SocialBackground from "@/app/social-science/SocialBackground";
import PrisonersDilemma from "@/app/social-science/PrisonersDilemma";
import { 
  ArrowLeft, Users, Brain, Globe2, Gavel, 
  Coins, HeartPulse, LineChart
} from "lucide-react";

export default function SocialSciencePage() {
  return (
    <main className="relative min-h-screen bg-[#1e1b4b] text-slate-200 overflow-hidden selection:bg-teal-500/30 font-sans">
      
      {/* 1. VISUAL ENGINE */}
      <SocialBackground />
      
      {/* OVERLAY: Grid & Vignette */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      {/* 2. DASHBOARD */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col pointer-events-none">
        
        {/* HEADER */}
        <header className="mb-16 pointer-events-auto text-center md:text-left">
             <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-teal-500 hover:text-teal-400 transition-colors mb-4 uppercase tracking-widest">
                <ArrowLeft size={12} /> Home // Social Science
             </Link>
             <div className="flex flex-col md:flex-row items-center gap-4">
                 <div className="p-4 bg-slate-900 border border-teal-500/30 rounded-2xl shadow-[0_0_30px_rgba(45,212,191,0.1)]">
                    <Users size={40} className="text-teal-400" />
                 </div>
                 <div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-xl font-serif">
                        SOCIAL SCIENCE
                    </h1>
                    <p className="text-teal-500/60 text-lg font-light tracking-wide italic">
                        The study of human society and social relationships.
                    </p>
                 </div>
             </div>
        </header>

        

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 flex-1 pointer-events-auto">
            
            {/* LEFT: THE DISCIPLINES */}
            <div className="lg:col-span-7 space-y-6">
                
                {/* Psychology */}
                <Link href="/social-science/psychology" className="block bg-slate-900/80 border border-slate-700 p-6 rounded-xl hover:border-teal-500/50 transition-all hover:translate-x-2 group">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <Brain className="text-pink-400 group-hover:scale-110 transition-transform" />
                            <h3 className="font-bold text-white text-xl">Psychology</h3>
                        </div>
                        <ArrowLeft className="rotate-180 text-slate-600 group-hover:text-teal-500 transition-colors" />
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed pl-9">
                        The study of the mind and behavior. From cognitive processes to emotional development and mental health.
                    </p>
                </Link>

                {/* Sociology */}
                <Link href="/social-science/sociology" className="block bg-slate-900/80 border border-slate-700 p-6 rounded-xl hover:border-teal-500/50 transition-all hover:translate-x-2 group">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <Globe2 className="text-indigo-400 group-hover:scale-110 transition-transform" />
                            <h3 className="font-bold text-white text-xl">Sociology</h3>
                        </div>
                        <ArrowLeft className="rotate-180 text-slate-600 group-hover:text-teal-500 transition-colors" />
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed pl-9">
                        The study of the development, structure, and functioning of human society. Focusing on groups, institutions, and social stratification.
                    </p>
                </Link>

                {/* Political Science */}
                <Link href="/social-science/political-science" className="block bg-slate-900/80 border border-slate-700 p-6 rounded-xl hover:border-teal-500/50 transition-all hover:translate-x-2 group">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <Gavel className="text-amber-400 group-hover:scale-110 transition-transform" />
                            <h3 className="font-bold text-white text-xl">Political Science</h3>
                        </div>
                        <ArrowLeft className="rotate-180 text-slate-600 group-hover:text-teal-500 transition-colors" />
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed pl-9">
                        The analysis of political activity, political thought, associated constitutions, and behavior.
                    </p>
                </Link>

                {/* Economics */}
                <Link href="/social-science/economics" className="block bg-slate-900/80 border border-slate-700 p-6 rounded-xl hover:border-teal-500/50 transition-all hover:translate-x-2 group">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <Coins className="text-emerald-400 group-hover:scale-110 transition-transform" />
                            <h3 className="font-bold text-white text-xl">Economics</h3>
                        </div>
                        <ArrowLeft className="rotate-180 text-slate-600 group-hover:text-teal-500 transition-colors" />
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed pl-9">
                        The social science that studies the production, distribution, and consumption of goods and services.
                    </p>
                </Link>

            </div>


            {/* RIGHT: INTERACTIVE WIDGET */}
            <div className="lg:col-span-5 space-y-8 flex flex-col items-center">
                
                {/* WIDGET */}
                <PrisonersDilemma />

                {/* INSIGHT CARD */}
                <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-6 w-full">
                    <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                        <LineChart size={18} className="text-teal-500" /> Qualitative vs. Quantitative
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                        Social science bridges the gap between the hard sciences and the humanities. It uses both <strong>Quantitative</strong> methods (statistics, data) and <strong>Qualitative</strong> methods (interviews, ethnography) to understand the human condition.
                    </p>
                </div>

            </div>

        </div>
      </div>
    </main>
  );
}