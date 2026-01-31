"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import PaleoBackground from "@/app/social-science/anthropology/PaleoBackground";
import SkullTimeline from "@/app/social-science/anthropology/SkullTimeline";
import { 
  Skull, Shovel, Globe, MessageSquare, 
  Search, Landmark, Footprints, BookOpen 
} from "lucide-react";

export default function AnthropologyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-stone-950 text-stone-200 font-sans selection:bg-amber-500/30">
      {/* Visual Engine: Primal Earth */}
      <PaleoBackground />

      {/* Anthropology Hero Replacement */}
      <div className="relative z-20 pt-20 pb-10 px-6 max-w-5xl">
        <div className="flex items-start gap-6">
          <div className="hidden md:block w-24 h-24 border border-amber-500/30 rounded-lg flex items-center justify-center text-amber-500/20">
            <Skull size={48} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-amber-500/50 underline">REF: SPECIES_STORY</span>
              <span className="text-xs font-mono text-amber-500/50 italic">Location: Earth (Global)</span>
            </div>
            <h1 className="text-6xl font-serif font-bold text-amber-50 text-shadow-glow">ANTHROPOLOGY</h1>
            <div className="h-1 w-32 bg-amber-500/50" />
            <p className="text-sm text-amber-200/40 italic pt-4">
              "To understand the present, we must unearth the biological and cultural foundations of the past".
            </p>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          



          {/* LEFT COLUMN: THE PHYSICAL & MATERIAL (PAST) */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* 1. BIOLOGICAL MODULE: Specimen View */}
            <section className="group">
              <div className="flex items-center gap-3 mb-6">
                <Skull className="text-amber-500" size={24} />
                <h2 className="text-2xl font-black tracking-tighter uppercase italic">Biological Specimen</h2>
                <div className="h-px flex-1 bg-amber-500/20" />
              </div>
              
              <div className="relative overflow-hidden rounded-2xl bg-stone-900/80 border border-amber-900/30 p-8 hover:border-amber-500/50 transition-all">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-full md:w-1/2">
                    <SkullTimeline /> {/* The Immersive Specimen Widget */}
                  </div>
                  <div className="w-full md:w-1/2 space-y-4">
                    <h3 className="text-xl font-bold text-amber-500">Human Evolution</h3>
                    <p className="text-sm text-stone-400 leading-relaxed">
                      Tracing the 7-million-year journey from the first hominids to modern <span className="text-white italic">Homo Sapiens</span>. Analyzing morphology, genetics, and adaptation.
                    </p>
                    <Link href="/social-science/anthropology/evolution" className="inline-flex items-center gap-2 text-xs font-bold text-amber-500 hover:text-white transition-colors uppercase tracking-widest">
                      Enter Laboratory <Footprints size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. ARCHAEOLOGY MODULE: The Stratigraphy View */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Shovel className="text-orange-500" size={24} />
                <h2 className="text-2xl font-black tracking-tighter uppercase italic">Archaeological Dig</h2>
                <div className="h-px flex-1 bg-orange-500/20" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-b from-orange-950/20 to-stone-900 border border-orange-900/30 p-6 rounded-xl relative overflow-hidden group hover:border-orange-500/50 transition-all">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                    <Landmark size={80} />
                  </div>
                  <h3 className="text-lg font-bold text-orange-400 mb-2">Civilization Roots</h3>
                  <p className="text-xs text-stone-500 mb-4">The rise of complex societies, urban sprawl, and the material history of power.</p>
                  <Link href="/social-science/anthropology/civilization" className="text-[10px] font-bold uppercase tracking-widest text-orange-500 hover:text-white transition-colors underline decoration-orange-500/30 underline-offset-4">Excavate Site</Link>
                </div>

                <div className="bg-stone-900/80 border border-orange-900/30 p-6 rounded-xl hover:border-orange-500/50 transition-all">
                  <h3 className="text-lg font-bold text-orange-400 mb-2">Artifact Analysis</h3>
                  <p className="text-xs text-stone-500 mb-4">Reading the stories left behind in pottery shards, tools, and architecture.</p>
                  <Link href="/social-science/anthropology/archaeology" className="text-[10px] font-bold uppercase tracking-widest text-orange-500 hover:text-white transition-colors underline decoration-orange-500/30 underline-offset-4">Open Archive</Link>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: THE SOCIAL & VIRTUAL (PRESENT/FUTURE) */}
          <div className="lg:col-span-5 space-y-12">
            
            {/* 3. CULTURAL MODULE: The Field Journal */}
            <section className="bg-stone-900/60 backdrop-blur-md border border-yellow-900/20 p-8 rounded-3xl relative overflow-hidden group">
               {/* Visual Flourish: Journal Paper Texture */}
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="text-yellow-500" />
                  <h2 className="text-xl font-bold tracking-tight text-white uppercase tracking-widest">Field Journal</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="border-l-2 border-yellow-500/30 pl-4 py-2">
                    <h4 className="font-bold text-yellow-500 uppercase text-xs mb-1">Ethnography</h4>
                    <p className="text-sm text-stone-300 leading-relaxed italic">
                      "Deep Hanging Out" — The systematic study of people and cultures through participant observation.
                    </p>
                  </div>
                  
                  <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                    <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
                      <Search size={14} className="text-yellow-500" /> Cultural Relativism
                    </h4>
                    <p className="text-xs text-stone-500">
                      Understanding beliefs and activities within their own context rather than judging them by outside standards.
                    </p>
                  </div>

                  <Link href="/social-science/anthropology/ethnography" className="block w-full text-center py-3 rounded-xl bg-yellow-500 text-stone-950 font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors">
                    Start Fieldwork
                  </Link>
                </div>
              </div>
            </section>

            {/* 4. DIGITAL MODULE: The Network HUD */}
            <section className="bg-black border border-cyan-900/30 p-8 rounded-3xl relative overflow-hidden group">
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px]" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4 text-cyan-400">
                  <MessageSquare size={20} />
                  <h3 className="font-mono text-sm font-bold uppercase tracking-[0.2em]">Digital Mankind</h3>
                </div>
                <h4 className="text-2xl font-bold text-white mb-4 tracking-tighter">Cyber-Ethnography</h4>
                <p className="text-xs text-stone-400 leading-relaxed mb-6">
                  How technology reshapes identity. Studying communities in the metaverse, digital kinship, and the evolution of the "Digital Tribe."
                </p>
                <Link href="/social-science/anthropology/digital" className="flex items-center justify-between text-xs font-mono text-cyan-400 hover:text-white transition-colors">
                  <span>ACCESS NETWORK DATA</span>
                  <span className="animate-pulse">_</span>
                </Link>
              </div>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}