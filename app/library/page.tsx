"use client";
import PageHeader from "@/components/PageHeader";
import LibraryBackground from "@/components/LibraryBackground";
import Link from "next/link";
import { 
  BookOpen, Globe, Scale, Hourglass, Image as ImageIcon, Wifi, 
  Search, ArrowRight, Database, PenTool, LayoutGrid
} from "lucide-react";

// Defined modules for the Library Hub
const LIBRARY_MODULES = [
  {
    title: "Universal Index",
    href: "/library/browse",
    icon: LayoutGrid,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    desc: "The Encyclopedia. A structured inventory of objects and ideas."
  },
  {
    title: "Glossary",
    href: "/glossary",
    icon: BookOpen,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
    desc: "The Dictionary. Definitions of terms, jargon, and concepts."
  },
  {
    title: "Axiom Archive",
    href: "/library/axioms",
    icon: Scale,
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
    desc: "The Rulebook. Immutable laws of physics, logic, and economics."
  },
  {
    title: "The Chronicle",
    href: "/library/chronicle",
    icon: Hourglass,
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    desc: "The Timeline. A linear history of the cosmos from Big Bang to AI."
  },
  {
    title: "Asset Gallery",
    href: "/library/gallery",
    icon: ImageIcon,
    color: "text-pink-400",
    bg: "bg-pink-500/10 border-pink-500/20",
    desc: "The Museum. Interactive models, simulations, and visualizations."
  },
  {
    title: "External Portal",
    href: "/library/portal",
    icon: Wifi,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    desc: "The Uplink. Live data and open-source media from the web."
  },
  {
    title: "Toolbox",
    href: "/library/toolbox",
    icon: PenTool,
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
    desc: "The Utility Belt. Calculators, converters, and productivity aids."
  }
];

export default function LibraryHub() {
  // Global Search Trigger
  const openSearch = () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#050505] lg:px-12 pb-20">
      
      {/* Background Layer */}
      <LibraryBackground />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        {/* Header Section */}
        <PageHeader
          eyebrow="The Nexus"
          title="The Grand Library"
          subtitle="The central repository of human knowledge. Access static definitions, dynamic simulations, and live data streams from a single point of entry."
        />

        {/* Unified Search Interface */}
        <div 
            onClick={openSearch}
            className="w-full max-w-2xl mb-12 relative group cursor-pointer"
        >
            <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            <div className="relative flex items-center bg-neutral-900/80 border border-white/10 rounded-full px-6 py-4 shadow-2xl backdrop-blur-md hover:border-cyan-500/50 transition-colors">
                <Search className="text-neutral-500 mr-4" />
                <span className="text-neutral-500 select-none">Search the entire network...</span>
                <div className="ml-auto hidden sm:flex items-center gap-2 text-[10px] font-mono text-neutral-600 border border-white/5 px-2 py-1 rounded bg-black/20">
                    <span>⌘</span><span>K</span>
                </div>
            </div>
        </div>

        {/* Application Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LIBRARY_MODULES.map((mod) => (
                <Link 
                    key={mod.title} 
                    href={mod.href}
                    className={`group relative p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden ${mod.bg}`}
                >
                    {/* Hover Glow Effect */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-gradient-to-br ${mod.color.replace('text', 'from')} to-transparent`} />

                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                            <div className={`mb-6 p-3 w-fit rounded-xl bg-neutral-950/50 border border-white/5 ${mod.color} shadow-inner`}>
                                <mod.icon size={32} />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-3 group-hover:underline decoration-white/20 underline-offset-4">
                                {mod.title}
                            </h2>
                            <p className="text-sm text-neutral-300 leading-relaxed">
                                {mod.desc}
                            </p>
                        </div>
                        
                        <div className={`mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${mod.color}`}>
                            <span>Access</span>
                            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                        </div>
                    </div>
                </Link>
            ))}
        </div>

        {/* System Footer */}
        <div className="mt-16 pt-8 border-t border-white/5 flex justify-between items-center text-xs text-neutral-500 font-mono">
            <div className="flex gap-6">
                <span className="flex items-center gap-2"><Database size={12} /> Local DB: Active</span>
                <span className="flex items-center gap-2"><Globe size={12} /> Network: Online</span>
            </div>
            <span>V2.4.0</span>
        </div>

      </div>
    </main>
  );
}