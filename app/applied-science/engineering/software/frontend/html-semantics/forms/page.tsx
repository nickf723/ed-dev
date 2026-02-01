"use client";
import Link from "next/link";
import DataEntryBackground from "./DataEntryBackground";
import FormValidatorLab from "./FormValidatorLab";
import { 
  TextCursorInput, FormInput, AlertCircle, CheckSquare, 
  ArrowRight, Keyboard, MousePointerClick 
} from "lucide-react";

export default function FormsPage() {
  return (
    <main className="relative min-h-screen bg-[#0f172a] text-slate-200 overflow-hidden font-sans selection:bg-orange-500/30">
      <DataEntryBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* HERO */}
        <header className="mb-16 border-b border-orange-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/applied-science/engineering/software/frontend/html-semantics" className="p-2 bg-orange-500/10 border border-orange-500/30 rounded hover:bg-orange-500/20 transition-colors">
              <FormInput className="text-orange-400" size={20} />
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-orange-400">
              HTML // Interaction
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
            FORMS <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">&</span><br/>
            <span className="text-slate-500">INPUTS</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-orange-500/50 pl-6">
            Forms are the bridge between user intent and server data. They require a delicate balance of usability, accessibility, and strict data validation to function correctly.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: THEORY */}
          <div className="lg:col-span-6 space-y-12">
            
            {/* The "Label" Pitch */}
            <div className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <TextCursorInput size={20} className="text-orange-400" /> The Golden Rule
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Every input <strong>must</strong> have a label. Placeholders are not labels; they disappear when the user types. Labels provide context, click targets, and critical info for screen readers.
              </p>
              
              <div className="bg-black/50 p-4 rounded-lg font-mono text-xs border-l-2 border-emerald-500">
                <span className="text-slate-500">&lt;!-- Explicit Link --&gt;</span><br/>
                <span className="text-orange-400">&lt;label</span> <span className="text-sky-400">for</span>="email"<span className="text-orange-400">&gt;</span>Email<span className="text-orange-400">&lt;/label&gt;</span><br/>
                <span className="text-orange-400">&lt;input</span> <span className="text-sky-400">id</span>="email" <span className="text-sky-400">type</span>="email" /<span className="text-orange-400">&gt;</span>
              </div>
            </div>

            

            {/* Input Types Grid */}
            <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Semantic Types</h3>
                <div className="grid grid-cols-2 gap-3">
                    <InputCard type="email" desc="Triggers @ keyboard on mobile." />
                    <InputCard type="tel" desc="Triggers number pad." />
                    <InputCard type="date" desc="Native OS date picker." />
                    <InputCard type="password" desc="Masks characters securely." />
                </div>
            </div>

            {/* UX Note */}
            <div className="flex gap-4 p-4 bg-orange-900/10 border border-orange-500/20 rounded-xl">
                <MousePointerClick className="text-orange-500 shrink-0" />
                <div>
                    <h4 className="text-sm font-bold text-white uppercase">Click Targets</h4>
                    <p className="text-xs text-slate-400 mt-1">
                        wrapping an input inside a &lt;label&gt; makes the text clickable too, increasing the hit area by 300%.
                    </p>
                </div>
            </div>

          </div>

          {/* RIGHT: THE LAB */}
          <div className="lg:col-span-6 space-y-6">
            <FormValidatorLab />

            
            
            <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl">
                <h4 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
                    <Keyboard size={16} className="text-slate-400" /> Focus Management
                </h4>
                <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                        <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center font-bold text-white border border-white/10">Tab</div>
                        <span>Moves focus to next interactive element</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                        <div className="w-16 h-6 rounded bg-slate-800 flex items-center justify-center font-bold text-white border border-white/10">Space</div>
                        <span>Toggles checkboxes / Activates buttons</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                        <div className="w-12 h-6 rounded bg-slate-800 flex items-center justify-center font-bold text-white border border-white/10">Enter</div>
                        <span>Submits the form (implicitly)</span>
                    </div>
                </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

function InputCard({ type, desc }: any) {
    return (
        <div className="p-3 bg-black/40 border border-white/5 rounded-lg flex flex-col gap-2">
            <div className="font-mono text-xs text-orange-400 bg-orange-500/10 self-start px-2 py-0.5 rounded">type="{type}"</div>
            <div className="text-[10px] text-slate-500 leading-tight">{desc}</div>
        </div>
    )
}