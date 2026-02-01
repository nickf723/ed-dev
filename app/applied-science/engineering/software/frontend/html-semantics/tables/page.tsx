"use client";
import Link from "next/link";
import DataGridBackground from "./DataGridBackground";
import TableStructureLab from "./TableStructureLab";
import { 
  Table, Database, FileSpreadsheet, AlertTriangle, 
  ArrowRight, LayoutGrid, List
} from "lucide-react";

export default function TablesPage() {
  return (
    <main className="relative min-h-screen bg-[#0f172a] text-slate-200 overflow-hidden font-sans selection:bg-orange-500/30">
      <DataGridBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* HERO */}
        <header className="mb-16 border-b border-orange-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/applied-science/engineering/software/frontend/html-semantics" className="p-2 bg-orange-500/10 border border-orange-500/30 rounded hover:bg-orange-500/20 transition-colors">
              <Database className="text-orange-400" size={20} />
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-orange-400">
              HTML // Data
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
            TABLES <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">&</span><br/>
            <span className="text-slate-500">DATASETS</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-orange-500/50 pl-6">
            Tables are for tabular data—financial reports, schedules, and analytics. They are powerful tools for density and comparison, but must be structured carefully to remain accessible.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: THEORY */}
          <div className="lg:col-span-6 space-y-12">
            
            {/* The Anti-Pattern Warning */}
            <div className="p-6 bg-red-950/20 border border-red-500/20 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertTriangle size={20} className="text-red-400" /> The Golden Rule
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                <strong>Never use tables for layout.</strong> In the 1990s, this was common. Today, we use CSS Grid and Flexbox. Tables should only be used when data has a distinct two-dimensional relationship (Rows & Columns).
              </p>
            </div>
            
            

            {/* Structure Breakdown */}
            <div className="grid grid-cols-1 gap-4">
               <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center font-mono font-bold text-orange-400">&lt;th&gt;</div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Table Header</h4>
                    <p className="text-xs text-slate-400 mt-1">Defines the label for a column or row. Must use <code className="bg-white/10 px-1 rounded">scope</code> to clarify direction.</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center font-mono font-bold text-slate-400">&lt;td&gt;</div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Table Data</h4>
                    <p className="text-xs text-slate-400 mt-1">The actual data cell. Contains content, images, or links.</p>
                  </div>
               </div>
            </div>

            

            {/* Accessibility Note */}
            <div className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl">
               <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Accessibility Superpower</h4>
               <p className="text-sm text-slate-400">
                 The <code>scope</code> attribute is magic. It tells a screen reader: "This header applies to all cells below it." Without it, navigating a complex table by voice is a nightmare.
               </p>
               <div className="mt-4 p-3 bg-black/40 rounded border border-white/5 font-mono text-xs text-orange-400">
                  &lt;th <span className="text-sky-400">scope</span>="col"&gt;Price&lt;/th&gt;
               </div>
            </div>

          </div>

          {/* RIGHT: THE LAB */}
          <div className="lg:col-span-6 space-y-6">
            <TableStructureLab />

            {/* Comparison */}
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-900/50 border border-white/10 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                        <LayoutGrid size={16} className="text-sky-400" />
                        <span className="text-xs font-bold text-white uppercase">CSS Grid</span>
                    </div>
                    <p className="text-[10px] text-slate-500">Best for page layout, galleries, and flexible positioning.</p>
                </div>
                <div className="p-4 bg-slate-900/50 border border-white/10 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                        <List size={16} className="text-orange-400" />
                        <span className="text-xs font-bold text-white uppercase">HTML Table</span>
                    </div>
                    <p className="text-[10px] text-slate-500">Best for financial data, schedules, and comparison matrices.</p>
                </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}