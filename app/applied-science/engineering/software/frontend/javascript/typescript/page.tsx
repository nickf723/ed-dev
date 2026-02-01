"use client";
import Link from "next/link";
import TypeCheckBackground from "./TypeCheckBackground";
import InterfaceLab from "./InterfaceLab";
import { 
  FileCode, Shield, Braces, Box, 
  ArrowRight, GitMerge, AlertTriangle 
} from "lucide-react";

export default function TypeScriptPage() {
  return (
    <main className="relative min-h-screen bg-[#0f172a] text-slate-200 overflow-hidden font-sans selection:bg-blue-500/30">
      <TypeCheckBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        <header className="mb-16 border-b border-blue-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/applied-science/engineering/software/frontend/javascript" className="p-2 bg-blue-500/10 border border-blue-500/30 rounded hover:bg-blue-500/20 transition-colors">
              <FileCode className="text-blue-400" size={20} />
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-blue-400">
              JavaScript // Superset
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
            TYPE<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">SCRIPT</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-blue-500/50 pl-6">
            JavaScript with syntax for types. It adds a compile-time safety layer that catches errors before you run the code, making large-scale application development robust and predictable.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-6 space-y-12">
            <div className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Shield size={20} className="text-blue-400" /> Static Analysis
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                In standard JS, `1 + "1"` equals `"11"`. In TypeScript, this is an error. By defining the <strong>Shape</strong> of your data upfront, the compiler ensures you never access properties that don't exist.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Feature icon={Braces} title="Interfaces" desc="Contracts that define the structure of objects." />
                <Feature icon={Box} title="Generics" desc="Reusable components that work with any data type." />
                <Feature icon={GitMerge} title="Unions" desc="Variables that can be one of several specific types." />
                <Feature icon={AlertTriangle} title="Strict Null" desc="Prevents the 'undefined is not an object' crash." />
            </div>
            
            [Image of TypeScript compilation process diagram]
          </div>

          <div className="lg:col-span-6 space-y-8">
            <InterfaceLab />
            
            <div className="p-6 bg-blue-900/10 border border-blue-500/20 rounded-2xl">
               <h4 className="text-sm font-bold text-white uppercase mb-4">The Compilation Step</h4>
               <div className="flex items-center gap-4 text-xs font-mono">
                  <div className="bg-black/40 p-3 rounded border border-white/10 text-blue-300">code.ts</div>
                  <ArrowRight size={16} className="text-slate-600" />
                  <div className="p-2 bg-slate-800 rounded text-[10px] text-slate-400 uppercase">TSC Compiler</div>
                  <ArrowRight size={16} className="text-slate-600" />
                  <div className="bg-black/40 p-3 rounded border border-white/10 text-yellow-300">code.js</div>
               </div>
               <p className="mt-4 text-xs text-slate-400">Browsers cannot run TypeScript. It must be "transpiled" down to standard JavaScript first.</p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

function Feature({ icon: Icon, title, desc }: any) {
    return (
        <div className="p-4 bg-black/40 border border-white/5 rounded-xl hover:border-blue-500/30 transition-colors">
            <Icon className="text-blue-400 mb-2" size={20} />
            <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
            <p className="text-xs text-slate-400 leading-snug">{desc}</p>
        </div>
    )
}