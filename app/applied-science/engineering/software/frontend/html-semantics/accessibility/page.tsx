"use client";
import Link from "next/link";
import FocusPathBackground from "./FocusPathBackground";
import ScreenReaderLab from "./ScreenReaderLab";
import { 
  Eye, Ear, Keyboard, MousePointer2, 
  Accessibility, AlertTriangle, CheckSquare, 
  ArrowRight 
} from "lucide-react";

export default function AccessibilityPage() {
  const principles = [
    { title: "Perceivable", icon: Eye, desc: "Information must be presented in ways users can perceive (e.g., Alt text for blind users, Captions for deaf users)." },
    { title: "Operable", icon: Keyboard, desc: "Interface components must be usable. Everything must work with a keyboard, not just a mouse." },
    { title: "Understandable", icon: Ear, desc: "Information and operation must be clear. No confusing jargon or unpredictable layout shifts." },
    { title: "Robust", icon: Accessibility, desc: "Content must be interpreted reliably by a wide variety of user agents, including assistive technologies." }
  ];

  return (
    <main className="relative min-h-screen bg-[#0f172a] text-slate-200 overflow-hidden font-sans selection:bg-yellow-500/30">
      <FocusPathBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* HERO */}
        <header className="mb-16 border-b border-yellow-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/applied-science/engineering/software/frontend/html-semantics" className="p-2 bg-yellow-500/10 border border-yellow-500/30 rounded hover:bg-yellow-500/20 transition-colors">
              <Accessibility className="text-yellow-400" size={20} />
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-yellow-400">
              HTML // Access
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
            A11Y <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-200">&</span><br/>
            <span className="text-slate-500">ARIA</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-yellow-500/50 pl-6">
            Web Accessibility (a11y) ensures the web is usable by everyone, including people with disabilities. It is not a feature; it is the baseline of engineering ethics.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: THEORY */}
          <div className="lg:col-span-6 space-y-12">
            
            {/* The First Rule */}
            <div className="p-6 bg-yellow-950/20 border border-yellow-500/20 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertTriangle size={20} className="text-yellow-400" /> The First Rule of ARIA
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed italic">
                "If you can use a native HTML element [HTML5] or attribute with the semantics and behavior you require already built in, then do so instead of re-purposing an element and adding an ARIA role, state or property."
              </p>
            </div>

            

            {/* POUR Principles */}
            <div>
               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">WCAG Principles (POUR)</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {principles.map((p) => (
                   <div key={p.title} className="p-4 bg-slate-900/60 border border-white/5 rounded-xl hover:border-yellow-500/30 transition-colors">
                     <div className="flex items-center gap-3 mb-2">
                       <p.icon className="text-yellow-400" size={18} />
                       <h4 className="font-bold text-white text-sm uppercase">{p.title}</h4>
                     </div>
                     <p className="text-xs text-slate-400 leading-snug">{p.desc}</p>
                   </div>
                 ))}
               </div>
            </div>

            {/* Focus Ring Note */}
            <div className="flex gap-4 p-4 bg-sky-900/10 border border-sky-500/20 rounded-xl">
                <Keyboard className="text-sky-400 shrink-0" />
                <div>
                    <h4 className="text-sm font-bold text-white uppercase">The Focus Ring</h4>
                    <p className="text-xs text-slate-400 mt-1">
                        Never set <code>outline: none</code> without providing a replacement style. Keyboard users rely on that ring to know where they are.
                    </p>
                </div>
            </div>

          </div>

          {/* RIGHT: THE LAB */}
          <div className="lg:col-span-6 space-y-8">
            <ScreenReaderLab />
            
            

            <div className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl">
               <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Common ARIA Attributes</h4>
               <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                     <span className="text-yellow-400">aria-label</span>
                     <span className="text-slate-400">Overwrites text content for screen readers.</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                     <span className="text-yellow-400">aria-hidden</span>
                     <span className="text-slate-400">Hides decorative elements from assistive tech.</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                     <span className="text-yellow-400">aria-expanded</span>
                     <span className="text-slate-400">Communicates open/closed state of menus.</span>
                  </div>
                  <div className="flex justify-between pt-2">
                     <span className="text-yellow-400">role="alert"</span>
                     <span className="text-slate-400">Immediately announces important updates.</span>
                  </div>
               </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}