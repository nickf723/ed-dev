"use client";
import Link from "next/link";
import StyleFlowBackground from "./StyleFlowBackground";
import FlexboxPlayground from "./FlexboxPlayground";
import { 
  Palette, Layers, Smartphone, Box, 
  ArrowRight, Hash, LayoutGrid, FileCode 
} from "lucide-react";

export default function CssPage() {
  return (
    <main className="relative min-h-screen bg-[#0f172a] text-slate-200 overflow-hidden font-sans selection:bg-pink-500/30">
      <StyleFlowBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* HERO */}
        <header className="mb-16 border-b border-pink-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/applied-science/engineering/software/frontend" className="p-2 bg-pink-500/10 border border-pink-500/30 rounded hover:bg-pink-500/20 transition-colors">
              <Palette className="text-pink-400" size={20} />
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-pink-400">
              Frontend // Style
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
            CSS <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">&</span><br/>
            <span className="text-slate-500">ARCHITECTURE</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-pink-500/50 pl-6">
            Cascading Style Sheets control the presentation of the web. Modern CSS is a powerful layout engine that handles responsiveness, animation, and system-level architecture at scale.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: THEORY */}
          <div className="lg:col-span-6 space-y-12">
            
            {/* The Cascade Concept */}
            <div className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Layers size={20} className="text-pink-400" /> The Cascade
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Styles "cascade" down from generic to specific. Conflicts are resolved by <strong>Specificity</strong>. Understanding this hierarchy is the difference between writing clean code and fighting with `!important`.
              </p>
              
              {/* Specificity Calculator Visual */}
              <div className="grid grid-cols-3 gap-2 text-center">
                 <div className="p-2 bg-black/40 rounded border border-pink-500/30">
                    <div className="text-lg font-bold text-pink-400">100</div>
                    <div className="text-[9px] text-slate-500 uppercase">ID (#id)</div>
                 </div>
                 <div className="p-2 bg-black/40 rounded border border-sky-500/30">
                    <div className="text-lg font-bold text-sky-400">10</div>
                    <div className="text-[9px] text-slate-500 uppercase">Class (.class)</div>
                 </div>
                 <div className="p-2 bg-black/40 rounded border border-white/10">
                    <div className="text-lg font-bold text-white">1</div>
                    <div className="text-[9px] text-slate-500 uppercase">Tag (div)</div>
                 </div>
              </div>
            </div>

            

            {/* Layout Systems Grid */}
            <div>
               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Layout Engines</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="p-4 bg-slate-900/60 border border-white/5 rounded-xl hover:border-pink-500/30 transition-colors">
                    <div className="flex items-center gap-2 mb-2 text-pink-400 font-bold text-sm">
                        <Box size={16} /> Flexbox (1D)
                    </div>
                    <p className="text-xs text-slate-400">Best for components. Aligning items in a single row or column. (e.g., Navbars, Cards)</p>
                 </div>
                 <div className="p-4 bg-slate-900/60 border border-white/5 rounded-xl hover:border-pink-500/30 transition-colors">
                    <div className="flex items-center gap-2 mb-2 text-purple-400 font-bold text-sm">
                        <LayoutGrid size={16} /> Grid (2D)
                    </div>
                    <p className="text-xs text-slate-400">Best for page layout. Handling rows and columns simultaneously. (e.g., Dashboards)</p>
                 </div>
               </div>
            </div>

            

            {/* Mobile First */}
            <div className="flex gap-4 p-4 bg-pink-900/10 border border-pink-500/20 rounded-xl">
                <Smartphone className="text-pink-500 shrink-0" />
                <div>
                    <h4 className="text-sm font-bold text-white uppercase">Mobile-First Design</h4>
                    <p className="text-xs text-slate-400 mt-1">
                        Start with base styles for mobile, then use <code>@media (min-width)</code> to enhance for larger screens. It creates faster, simpler code.
                    </p>
                </div>
            </div>

          </div>

          {/* RIGHT: THE LAB */}
          <div className="lg:col-span-6 space-y-6">
            <FlexboxPlayground />
            
            <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl">
               <h4 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
                   <FileCode size={16} className="text-slate-400" /> Methodologies
               </h4>
               <div className="space-y-4">
                  <Methodology 
                    title="BEM" 
                    sub="Block Element Modifier" 
                    desc="Naming convention to keep specificity low." 
                    code=".card__button--active" 
                  />
                  <Methodology 
                    title="Utility-First" 
                    sub="Tailwind CSS" 
                    desc="Composing designs directly in markup." 
                    code="flex items-center p-4 bg-blue-500" 
                  />
                  <Methodology 
                    title="CSS-in-JS" 
                    sub="Styled Components" 
                    desc="Scoped styles tied to React components." 
                    code="const Button = styled.div`...`" 
                  />
               </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

function Methodology({ title, sub, desc, code }: any) {
    return (
        <div className="border-b border-white/5 last:border-0 pb-3 last:pb-0">
            <div className="flex justify-between items-baseline mb-1">
                <span className="text-sm font-bold text-white">{title}</span>
                <span className="text-[10px] text-slate-500 uppercase">{sub}</span>
            </div>
            <p className="text-xs text-slate-400 mb-2">{desc}</p>
            <code className="text-[10px] font-mono text-pink-400 bg-black/40 px-2 py-1 rounded block w-fit">
                {code}
            </code>
        </div>
    )
}