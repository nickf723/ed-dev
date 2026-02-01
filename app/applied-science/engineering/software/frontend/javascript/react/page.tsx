"use client";
import Link from "next/link";
import VirtualDomBackground from "./VirtualDomBackground";
import StateLifecycleLab from "./StateLifecycleLab";
import { 
  LayoutTemplate, Component, RefreshCw, Box, 
  ArrowRight, GitBranch, Layers 
} from "lucide-react";

export default function ReactPage() {
  return (
    <main className="relative min-h-screen bg-[#0f172a] text-slate-200 overflow-hidden font-sans selection:bg-cyan-500/30">
      <VirtualDomBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        <header className="mb-16 border-b border-cyan-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/applied-science/engineering/software/frontend/javascript" className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded hover:bg-cyan-500/20 transition-colors">
              <LayoutTemplate className="text-cyan-400" size={20} />
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400">
              JavaScript // Library
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
            REACT<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">.JS</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-cyan-500/50 pl-6">
            A library for building user interfaces based on components. React introduced the concept of the <strong>Virtual DOM</strong>, making UI updates efficient, predictable, and declarative.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-6 space-y-12">
            <div className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Component size={20} className="text-cyan-400" /> Declarative UI
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                In traditional JS, you manually tell the browser *how* to change the DOM. In React, you simply declare *what* the UI should look like for a given state, and React handles the updates.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Feature icon={Box} title="Components" desc="Isolated pieces of UI logic and visuals." />
                <Feature icon={RefreshCw} title="State" desc="Data that changes over time, triggering updates." />
                <Feature icon={GitBranch} title="Props" desc="Data passed down from parent to child." />
                <Feature icon={Layers} title="Hooks" desc="Functions to tap into lifecycle features." />
            </div>
            
            

            {/* JSX Snippet */}
            <div className="bg-black/50 border border-white/10 rounded-xl p-4 font-mono text-xs">
                <span className="text-purple-400">function</span> <span className="text-yellow-200">Button</span>() {'{'}<br/>
                &nbsp;&nbsp;<span className="text-purple-400">const</span> [count, setCount] = <span className="text-yellow-200">useState</span>(0);<br/>
                &nbsp;&nbsp;<span className="text-purple-400">return</span> (<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">&lt;button</span> <span className="text-sky-400">onClick</span>{'={() => ...}'}<span className="text-cyan-400">&gt;</span><br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Clicks: {'{'}count{'}'}<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">&lt;/button&gt;</span><br/>
                &nbsp;&nbsp;);<br/>
                {'}'}
            </div>
          </div>

          <div className="lg:col-span-6 space-y-8">
            <StateLifecycleLab />
            
            <div className="p-6 bg-cyan-900/10 border border-cyan-500/20 rounded-2xl">
               <h4 className="text-sm font-bold text-white uppercase mb-4">Why Virtual DOM?</h4>
               <p className="text-xs text-slate-400 leading-relaxed">
                  Touching the real DOM is slow. React keeps a lightweight copy in memory. When state changes, it compares the new copy with the old one (Diffing) and only updates the specific text or attribute that changed.
               </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

function Feature({ icon: Icon, title, desc }: any) {
    return (
        <div className="p-4 bg-black/40 border border-white/5 rounded-xl hover:border-cyan-500/30 transition-colors">
            <Icon className="text-cyan-400 mb-2" size={20} />
            <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
            <p className="text-xs text-slate-400 leading-snug">{desc}</p>
        </div>
    )
}