"use client";
import Link from "next/link";
import DomTreeBackground from "./DomTreeBackground";
import CssBoxModelLab from "./CssBoxModelLab";
import { 
  Layout, Code, Layers, Smartphone, 
  Eye, Zap, Box, Terminal 
} from "lucide-react";

export default function FrontendPage() {
  const stack = [
    { id: "html-semantics", title: "HTML & Semantics", icon: Layout, color: "text-orange-400", desc: "The structural skeleton of the web. Accessibility and SEO." },
    { id: "css-architecture", title: "CSS & Architecture", icon: Palette, color: "text-pink-400", desc: "Visual styling, layout systems (Flex/Grid), and responsiveness." },
    { id: "javascript-logic", title: "JavaScript Logic", icon: Terminal, color: "text-yellow-400", desc: "Interactivity, state management, and DOM manipulation." },
    { id: "modern-frameworks", title: "Modern Frameworks", icon: Box, color: "text-sky-400", desc: "React, Vue, and Next.js component-based architectures." }
  ];

  return (
    <main className="relative min-h-screen bg-[#0f172a] text-slate-200 overflow-hidden font-sans selection:bg-sky-500/30">
      <DomTreeBackground />
      {/* Overlay to darken background for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/80 via-transparent to-[#0f172a]/80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* HERO */}
        <header className="mb-16 border-b border-sky-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-sky-500/10 border border-sky-500/30 rounded">
              <Eye className="text-sky-400" size={20} />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-sky-400">
              Software // Client-Side
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
            FRONT<span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">END</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-sky-500/50 pl-6">
            The intersection of design and logic. Building the user interface (UI), managing state, and ensuring performance across every device and screen size.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: THE STACK */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Philosophy */}
            <div className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Smartphone size={20} className="text-sky-400" /> Responsive by Default
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Modern frontend engineering isn't about pixel perfection on one screen; it's about <strong className="text-sky-300">fluidity</strong>. Creating systems that adapt gracefully from a 30-inch monitor to a 4-inch phone.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {stack.map((item) => (
                <div key={item.title} className="group relative p-5 bg-black/40 border border-white/5 hover:border-sky-500/50 rounded-xl transition-all hover:translate-x-2">
                  <Link
                      key={item.id}
                      href={`/applied-science/engineering/software/frontend/${item.id}`}>                
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-white/5 ${item.color}`}>
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-xs text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-3 gap-2">
                <Metric label="FCP" value="0.8s" desc="First Contentful Paint" color="text-green-400" />
                <Metric label="LCP" value="1.2s" desc="Largest Contentful Paint" color="text-emerald-400" />
                <Metric label="CLS" value="0.01" desc="Cumulative Layout Shift" color="text-sky-400" />
            </div>
          </div>

          {/* RIGHT: THE COMPONENT LAB */}
          <div className="lg:col-span-5 space-y-6">
            <CssBoxModelLab />
            
            <div className="p-6 bg-indigo-900/10 border border-indigo-500/20 rounded-2xl">
              <h4 className="text-sm font-bold text-white uppercase mb-2 flex items-center gap-2">
                <Layers size={16} className="text-indigo-400" /> Component Driven
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                We build interfaces like Legos. Small, isolated, reusable pieces (Components) composed together to create complex applications. 
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

function Metric({ label, value, desc, color }: any) {
    return (
        <div className="p-3 bg-black/40 border border-white/5 rounded-xl text-center">
            <div className={`text-xl font-mono font-bold ${color}`}>{value}</div>
            <div className="text-[10px] font-black text-white uppercase mt-1">{label}</div>
            <div className="text-[8px] text-slate-500 mt-1">{desc}</div>
        </div>
    )
}

import { Palette } from 'lucide-react'; // Late import fix