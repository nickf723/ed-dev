"use client";
import Link from "next/link";
import VectorSearchLab from "./VectorSearchLab";
import { 
  Database, Network, FileSearch, Archive, 
  ArrowRight, Library, SearchCheck, Layers,
  Binary, FileJson
} from "lucide-react";
import BinaryOceanBackground from "./BinaryOceanBackground";

export default function InformationSciencePage() {
  // Navigation Modules (The Child Pages)
  const modules = [
    { 
      title: "Information Retrieval", 
      href: "/formal-science/information-science/information-retrieval", 
      icon: SearchCheck, 
      color: "text-cyan-400", 
      border: "hover:border-cyan-500/50",
      bg: "hover:bg-cyan-500/10",
      desc: "The science of search engines. Indexing, querying, and ranking relevance." 
    },
    { 
      title: "Taxonomy & Ontology", 
      href: "/formal-science/information-science/taxonomy-ontology", 
      icon: Layers, 
      color: "text-indigo-400", 
      border: "hover:border-indigo-500/50",
      bg: "hover:bg-indigo-500/10",
      desc: "The classification of things. Creating hierarchies and relationships between concepts." 
    },
    { 
      title: "Archival Science", 
      href: "/formal-science/information-science/archival-science", 
      icon: Archive, 
      color: "text-amber-400", 
      border: "hover:border-amber-500/50",
      bg: "hover:bg-amber-500/10",
      desc: "Preservation of data for long-term access and historical integrity." 
    },
    { 
      title: "Bibliometrics", 
      href: "/formal-science/information-science/bibliometrics", 
      icon: Library, 
      color: "text-emerald-400", 
      border: "hover:border-emerald-500/50",
      bg: "hover:bg-emerald-500/10",
      desc: "Quantitative analysis of written publications and citation networks." 
    },
  ];

  return (
    <main className="relative min-h-screen bg-[#0f172a] text-slate-200 overflow-hidden font-sans selection:bg-cyan-500/30">
      <BinaryOceanBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* HERO */}
        <header className="mb-16 border-b border-cyan-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/applied-science" className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded hover:bg-cyan-500/20 transition-colors">
              <Database className="text-cyan-400" size={20} />
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400">
              Formal Science // Data
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
            INFORMATION <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">SCIENCE</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-cyan-500/50 pl-6">
            We are drowning in data but starving for wisdom. Information Science is the discipline of collecting, organizing, storing, retrieving, and disseminating information to create meaning.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: THEORY & NAVIGATION */}
          <div className="lg:col-span-6 space-y-12">
            
            {/* DIKW Pyramid */}
            <div className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Layers size={20} className="text-cyan-400" /> The Hierarchy of Value
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                The core philosophy of the field is moving raw input up the value chain.
              </p>
              
              
              
              <div className="space-y-2 mt-4 bg-black/40 p-4 rounded-xl border border-white/5">
                 <div className="flex gap-4 items-baseline border-b border-white/5 pb-2">
                    <span className="text-xs font-bold text-amber-400 w-20 text-right uppercase tracking-wider">Wisdom</span>
                    <span className="text-xs text-slate-500">Applied knowledge. "Knowing WHY."</span>
                 </div>
                 <div className="flex gap-4 items-baseline border-b border-white/5 pb-2">
                    <span className="text-xs font-bold text-indigo-400 w-20 text-right uppercase tracking-wider">Knowledge</span>
                    <span className="text-xs text-slate-500">Synthesized information. "Knowing HOW."</span>
                 </div>
                 <div className="flex gap-4 items-baseline border-b border-white/5 pb-2">
                    <span className="text-xs font-bold text-cyan-400 w-20 text-right uppercase tracking-wider">Information</span>
                    <span className="text-xs text-slate-500">Structured data. "Knowing WHAT."</span>
                 </div>
                 <div className="flex gap-4 items-baseline pt-1">
                    <span className="text-xs font-bold text-slate-400 w-20 text-right uppercase tracking-wider">Data</span>
                    <span className="text-xs text-slate-500">Raw signals. Chaos.</span>
                 </div>
              </div>
            </div>

            {/* NAVIGABLE MODULE GRID */}
            <div>
               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <FileJson size={14} /> Knowledge Domains
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {modules.map((m) => (
                   <Link 
                     key={m.title} 
                     href={m.href}
                     className={`group p-5 bg-black/40 border border-white/5 rounded-xl transition-all hover:-translate-y-1 ${m.border} ${m.bg}`}
                   >
                      <div className="flex items-start justify-between mb-3">
                         <m.icon className={m.color} size={24} />
                         <ArrowRight size={16} className={`opacity-0 group-hover:opacity-100 transition-opacity ${m.color}`} />
                      </div>
                      <h4 className="font-bold text-white text-sm mb-1">{m.title}</h4>
                      <p className="text-xs text-slate-400 leading-snug">{m.desc}</p>
                   </Link>
                 ))}
               </div>
            </div>

            

            {/* Retrieval Concept */}
            <div className="flex gap-4 p-4 bg-indigo-900/10 border border-indigo-500/20 rounded-xl">
                <FileSearch className="text-indigo-500 shrink-0" />
                <div>
                    <h4 className="text-sm font-bold text-white uppercase">The Inverted Index</h4>
                    <p className="text-xs text-slate-400 mt-1">
                        How Google works. Instead of scanning every document for a word, it keeps a list of every word and which documents contain it.
                    </p>
                    
                    
                </div>
            </div>

          </div>

          {/* RIGHT: THE LAB */}
          <div className="lg:col-span-6 space-y-8">
            <VectorSearchLab />
            
            <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl">
               <h4 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
                   <Network size={16} className="text-slate-400" /> The Knowledge Graph
               </h4>
               <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  The future of information is the <strong>Graph</strong>. Entities (People, Places, Things) are nodes, and edges describe their relationship (e.g., "Leonardo da Vinci" —painted&rarr; "Mona Lisa").
               </p>
               
               
            </div>

            {/* Metadata Card */}
            <div className="p-6 bg-amber-900/10 border border-amber-500/20 rounded-2xl">
               <h4 className="text-sm font-bold text-white uppercase mb-4">Metadata: Data about Data</h4>
               <div className="font-mono text-xs space-y-2 text-amber-200/80">
                  <div className="flex justify-between border-b border-white/5 pb-1">
                     <span>DC.Title</span>
                     <span className="text-white">"Information Science"</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                     <span>DC.Creator</span>
                     <span className="text-white">"Society OS"</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                     <span>DC.Date</span>
                     <span className="text-white">"2026-02-02"</span>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}