"use client";
import Link from "next/link";
import ViralNetworkBackground from "./ViralNetworkBackground";
import FunnelSimulator from "./FunnelSimulator";
import { 
  Megaphone, Target, BarChart2, Share2, 
  Search, PenTool, Zap, BrainCircuit
} from "lucide-react";

export default function MarketingPage() {
  const strategies = [
    { title: "Brand Strategy", icon: Megaphone, desc: "Crafting identity, voice, and the 'Why' behind the company." },
    { title: "Growth & Performance", icon: BarChart2, desc: "Data-driven acquisition. SEO, PPC, and CRO." },
    { title: "Content & Creative", icon: PenTool, desc: "Storytelling through video, copy, and design." },
    { title: "Consumer Psychology", icon: BrainCircuit, desc: "Understanding cognitive biases and decision making." }
  ];

  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-rose-500/30">
      <ViralNetworkBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-50 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* HERO */}
        <header className="mb-16 border-b border-rose-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/applied-science/business" className="p-2 bg-rose-500/10 border border-rose-500/30 rounded hover:bg-rose-500/20 transition-colors">
              <Zap className="text-rose-400" size={20} />
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-rose-400">
              Business // Influence
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
            MARKET<span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-fuchsia-400">ING</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-rose-500/50 pl-6">
            The engineering of desire. We use data, psychology, and narrative to cut through the noise, capture attention, and drive human behavior.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: STRATEGY MATRIX */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* The Pitch */}
            <section className="bg-slate-900/60 border border-white/5 p-8 rounded-3xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4">Signal vs. Noise</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                In an era of infinite content, attention is the scarcest resource. Marketing is no longer just about "loudness"—it is about <strong>resonance</strong>. It is the art of aligning a product's truth with a customer's identity.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {strategies.map((s) => (
                <div key={s.title} className="p-6 bg-black/40 border border-white/5 hover:border-rose-500/50 rounded-xl transition-all group hover:-translate-y-1">
                  <s.icon className="text-slate-600 group-hover:text-rose-400 transition-colors mb-4" size={28} />
                  <h4 className="text-lg font-bold text-white mb-2">{s.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>

            {/* 4Ps Concept */}
            <div className="grid grid-cols-4 gap-2">
              {['Product', 'Price', 'Place', 'Promotion'].map((p) => (
                <div key={p} className="text-center p-3 rounded-lg bg-rose-900/10 border border-rose-500/20">
                  <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: THE LAB */}
          <div className="lg:col-span-5 space-y-6">
            <FunnelSimulator />
            
            <div className="p-6 bg-gradient-to-br from-fuchsia-900/20 to-slate-900 border border-white/10 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Target size={20} className="text-fuchsia-400" />
                <h4 className="font-bold text-white text-sm uppercase">The Golden Circle</h4>
              </div>
              <p className="text-xs text-slate-400 italic mb-4">
                "People don't buy what you do; they buy why you do it." — Simon Sinek
              </p>
              <div className="relative w-32 h-32 mx-auto">
                <div className="absolute inset-0 rounded-full bg-slate-800 border border-slate-600 flex items-start justify-center pt-2 text-[8px] text-slate-400 uppercase">What</div>
                <div className="absolute inset-4 rounded-full bg-slate-700 border border-slate-500 flex items-start justify-center pt-2 text-[8px] text-slate-300 uppercase">How</div>
                <div className="absolute inset-8 rounded-full bg-rose-500 border border-rose-400 flex items-center justify-center text-[10px] font-black text-white uppercase shadow-[0_0_15px_rgba(244,63,94,0.5)]">Why</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}