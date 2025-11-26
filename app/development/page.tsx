"use client";
import PageHeader from "@/components/PageHeader";
import { BentoGrid, BentoItem } from "@/components/BentoGrid";
import { 
  Database, Layout, Component, Palette, 
  Terminal, Activity, FileText, Server
} from "lucide-react";

// Mock data counts (In a real app, import these from your libs)
const DB_STATS = [
  { label: "Glossary Terms", count: 120, color: "text-cyan-400" },
  { label: "Axiom Laws", count: 24, color: "text-violet-400" },
  { label: "Visual Assets", count: 45, color: "text-pink-400" },
  { label: "Timeline Events", count: 80, color: "text-amber-400" },
  { label: "Skill Nodes", count: 65, color: "text-emerald-400" },
  { label: "People", count: 32, color: "text-orange-400" },
];

export default function DevelopmentPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#050505] lg:px-12 pb-20">
      
      {/* Background: Blueprint Grid */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: "radial-gradient(#333 1px, transparent 1px)", backgroundSize: "20px 20px" }} 
      />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="System Admin"
          title="Development Console"
          subtitle="The engine room. Status reports, component registry, and database health metrics."
        />

        <div className="space-y-16">
            
            {/* SECTION 1: DATABASE HEALTH */}
            <section>
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-6 flex items-center gap-2">
                    <Database size={14} /> Data Integrity
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {DB_STATS.map((stat) => (
                        <div key={stat.label} className="p-4 rounded-xl border border-white/5 bg-neutral-900/50 text-center hover:bg-neutral-800 transition-colors">
                            <span className={`block text-2xl font-black ${stat.color}`}>{stat.count}</span>
                            <span className="text-[10px] uppercase text-neutral-500">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 2: COMPONENT REGISTRY */}
            <section>
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-6 flex items-center gap-2">
                    <Component size={14} /> Interactive Modules
                </h3>
                <BentoGrid>
                    <BentoItem 
                        title="Visual Engines"
                        desc="Backgrounds: Orbital, HexMap, Stardust, Matrix, Blueprint."
                        href="/skeleton/component-gallery" // You can point this to a dedicated gallery page
                        Icon={Layout}
                        bgClass="bg-gradient-to-br from-blue-900/20 to-transparent border-blue-500/20"
                        colorClass="text-blue-400"
                    />
                    <BentoItem 
                        title="Simulation Widgets"
                        desc="Physics: Pendulum, Springs. Social: Supply/Demand, Parliament."
                        href="/library/gallery"
                        Icon={Activity}
                        bgClass="bg-gradient-to-br from-green-900/20 to-transparent border-green-500/20"
                        colorClass="text-green-400"
                    />
                    <BentoItem 
                        title="Data Visualizers"
                        desc="Charts: Skill Tree, Knowledge Graph, Taxonomy Tree."
                        href="/nexus/dashboard"
                        Icon={Server}
                        bgClass="bg-gradient-to-br from-purple-900/20 to-transparent border-purple-500/20"
                        colorClass="text-purple-400"
                    />
                    <BentoItem 
                        title="Utilities"
                        desc="Tools: Unit Converter, Calculator, Wiki Portal, Image Lab."
                        href="/library/toolbox"
                        Icon={Terminal}
                        bgClass="bg-gradient-to-br from-amber-900/20 to-transparent border-amber-500/20"
                        colorClass="text-amber-400"
                    />
                </BentoGrid>
            </section>

            {/* SECTION 3: DESIGN SYSTEM CHECK */}
            <section>
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-6 flex items-center gap-2">
                    <Palette size={14} /> Theme Consistency
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Typography */}
                    <div className="p-6 rounded-xl border border-white/5 bg-neutral-900/50">
                        <h1 className="text-4xl font-black text-white mb-2">Heading 1</h1>
                        <h2 className="text-2xl font-bold text-white mb-2">Heading 2</h2>
                        <h3 className="text-xl font-semibold text-white mb-2">Heading 3</h3>
                        <p className="text-sm text-neutral-400 leading-relaxed">
                            Body text should be legible, high-contrast, and spaced comfortably for reading complex academic material. 
                            <span className="text-cyan-400"> Link text</span> should pop.
                        </p>
                    </div>

                    {/* Palette */}
                    <div className="p-6 rounded-xl border border-white/5 bg-neutral-900/50 flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]" />
                            <span className="text-xs font-mono text-neutral-400">Primary (Cyan-500)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.4)]" />
                            <span className="text-xs font-mono text-neutral-400">Accent A (Pink-500)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]" />
                            <span className="text-xs font-mono text-neutral-400">Accent B (Amber-500)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-neutral-900 border border-white/10" />
                            <span className="text-xs font-mono text-neutral-400">Surface (Neutral-900)</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: FILE STRUCTURE */}
            <section>
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-6 flex items-center gap-2">
                    <FileText size={14} /> Core Page Patterns
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                    <a href="/skeleton/full-lesson" className="p-3 rounded border border-white/5 bg-white/5 hover:bg-white/10 block text-neutral-300">
                        📄 Full Lesson
                    </a>
                    <a href="/skeleton/dashboard-layout" className="p-3 rounded border border-white/5 bg-white/5 hover:bg-white/10 block text-neutral-300">
                        📊 Dashboard
                    </a>
                    <a href="/skeleton/multimedia-gallery" className="p-3 rounded border border-white/5 bg-white/5 hover:bg-white/10 block text-neutral-300">
                        🖼️ Gallery
                    </a>
                    <a href="/skeleton/timeline-layout" className="p-3 rounded border border-white/5 bg-white/5 hover:bg-white/10 block text-neutral-300">
                        ⏳ Timeline
                    </a>
                </div>
            </section>

        </div>
      </div>
    </main>
  );
}