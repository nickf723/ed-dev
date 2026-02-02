"use client";
import Link from "next/link";
import TaxonomyTreeBackground from "./TaxonomyTreeBackground";
import StructureComparator from "./StructureComparator";
import { 
  FolderTree, Network, Tags, GitMerge, 
  ArrowRight, Database, FileJson, Book 
} from "lucide-react";

export default function TaxonomyPage() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-indigo-500/30">
      <TaxonomyTreeBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* HERO */}
        <header className="mb-16 border-b border-indigo-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/applied-science/information-science" className="p-2 bg-indigo-500/10 border border-indigo-500/30 rounded hover:bg-indigo-500/20 transition-colors">
              <FolderTree className="text-indigo-400" size={20} />
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-indigo-400">
              Information Science // Structure
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
            TAXONOMY <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-amber-400">&</span><br/>
            ONTOLOGY
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-indigo-500/50 pl-6">
            Taxonomy provides the shelves; Ontology provides the map. These are the twin pillars of organizing knowledge, allowing us to move from simple lists to complex, interconnected semantic webs.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: THEORY */}
          <div className="lg:col-span-6 space-y-12">
            
            {/* The Distinction */}
            <div className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <GitMerge size={20} className="text-indigo-400" /> Tree vs. Web
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                A <strong>Taxonomy</strong> organizes items into a hierarchy (Parent/Child). It is rigid but easy to navigate.<br/><br/>
                An <strong>Ontology</strong> organizes items by their relationships (Subject-Predicate-Object). It is complex but allows machines to understand context.
              </p>
            </div>
            
            

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Feature icon={FolderTree} title="Hierarchy" desc="Nested categories. e.g., Kingdom > Phylum > Class." color="text-indigo-400" />
                <Feature icon={Network} title="Semantics" desc="Meaning defined by connection. e.g., 'A Dog is a Mammal'." color="text-amber-400" />
                <Feature icon={Tags} title="Folksonomy" desc="User-generated structure via tagging (Hashtags)." color="text-pink-400" />
                <Feature icon={Database} title="RDF Triples" desc="The atomic unit of Ontology: Subject -> Predicate -> Object." color="text-emerald-400" />
            </div>

            

[Image of semantic web layer cake]


            {/* The Linnaean Example */}
            <div className="flex gap-4 p-4 bg-indigo-900/10 border border-indigo-500/20 rounded-xl">
                <Book className="text-indigo-500 shrink-0" />
                <div>
                    <h4 className="text-sm font-bold text-white uppercase">The Linnaean System</h4>
                    <p className="text-xs text-slate-400 mt-1">
                        Carl Linnaeus created the most famous taxonomy in 1735, classifying all life into kingdoms and species. It is the foundation of modern biology.
                    </p>
                    

[Image of Linnaean taxonomy chart]

                </div>
            </div>

          </div>

          {/* RIGHT: THE LAB */}
          <div className="lg:col-span-6 space-y-8">
            <StructureComparator />
            
            <div className="p-6 bg-amber-900/10 border border-amber-500/20 rounded-2xl">
               <h4 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
                   <FileJson size={16} className="text-amber-400" /> RDF Syntax (The Triple)
               </h4>
               <p className="text-xs text-slate-400 mb-4">
                 Ontologies are often written in RDF/XML or Turtle. This allows computers to "read" the relationship.
               </p>
               <div className="font-mono text-xs p-3 bg-black/50 border border-white/5 rounded text-amber-200/80">
                  <span className="text-indigo-400">&lt;rdf:Description</span> <span className="text-sky-400">about</span>="http://example.org/Cat"<span className="text-indigo-400">&gt;</span><br/>
                  &nbsp;&nbsp;<span className="text-pink-400">&lt;ex:eats</span> <span className="text-sky-400">rdf:resource</span>="http://example.org/Mouse" /<span className="text-pink-400">&gt;</span><br/>
                  <span className="text-indigo-400">&lt;/rdf:Description&gt;</span>
               </div>
            </div>
            
            
          </div>

        </div>
      </div>
    </main>
  );
}

function Feature({ icon: Icon, title, desc, color }: any) {
    return (
        <div className="p-4 bg-black/40 border border-white/5 rounded-xl hover:border-white/20 transition-colors">
            <Icon className={`mb-2 ${color}`} size={20} />
            <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
            <p className="text-xs text-slate-400 leading-snug">{desc}</p>
        </div>
    )
}