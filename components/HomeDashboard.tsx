"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Map, Database, Gamepad2, BookOpen, Search, ArrowRight, 
  Zap, Globe, Scale, User 
} from "lucide-react";

// Import your databases directly to sample from them!
// (In a real app, you'd use the nexus-engine logic)
import { PANTHEON } from "@/lib/people-db";
import { ASSET_LIBRARY } from "@/lib/asset-db";
import { AXIOM_LIBRARY } from "@/lib/axiom-db";

export default function HomeDashboard() {
  const [featuredPerson, setFeaturedPerson] = useState<any>(null);
  const [featuredAsset, setFeaturedAsset] = useState<any>(null);
  const [featuredAxiom, setFeaturedAxiom] = useState<any>(null);

  useEffect(() => {
    // Randomly pick content on mount
    setFeaturedPerson(PANTHEON[Math.floor(Math.random() * PANTHEON.length)]);
    setFeaturedAsset(ASSET_LIBRARY[Math.floor(Math.random() * ASSET_LIBRARY.length)]);
    setFeaturedAxiom(AXIOM_LIBRARY[Math.floor(Math.random() * AXIOM_LIBRARY.length)]);
  }, []);

  const openSearch = () => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12">
        
        {/* 1. HERO: Search & Status */}
        <section className="relative text-center py-20">
            <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-4">
                    NEXUS <span className="text-cyan-500">OS</span>
                </h1>
                <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                    The operating system for human knowledge. 
                    <span className="text-cyan-400 font-mono mx-2">{new Date().getFullYear()}</span>
                    Edition.
                </p>

                {/* Search Bar */}
                <div className="max-w-xl mx-auto relative group cursor-text" onClick={openSearch}>
                    <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full opacity-20 group-hover:opacity-40 transition-opacity" />
                    <div className="relative flex items-center bg-neutral-900 border border-white/10 rounded-full px-6 py-4 shadow-2xl hover:border-cyan-500/50 transition-colors">
                        <Search className="text-neutral-500 mr-4" />
                        <span className="text-neutral-500 text-lg">Query the database...</span>
                        <div className="ml-auto flex items-center gap-2">
                            <kbd className="hidden sm:inline-block bg-white/10 px-2 py-1 rounded text-xs font-mono text-neutral-400">⌘K</kbd>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>

        {/* 2. APP DOCK (Quick Access) */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AppCard 
                title="Atlas" desc="Knowledge Map" href="/nexus/map" icon={Map} 
                color="text-purple-400" bg="bg-purple-500/10 border-purple-500/20" 
            />
            <AppCard 
                title="Library" desc="Grand Archive" href="/library" icon={Database} 
                color="text-cyan-400" bg="bg-cyan-500/10 border-cyan-500/20" 
            />
            <AppCard 
                title="Arcade" desc="Simulations" href="/arcade" icon={Gamepad2} 
                color="text-pink-400" bg="bg-pink-500/10 border-pink-500/20" 
            />
            <AppCard 
                title="Dev Console" desc="System Admin" href="/development" icon={BookOpen} 
                color="text-amber-400" bg="bg-amber-500/10 border-amber-500/20" 
            />
        </section>

        {/* 3. DISCOVERY FEED (Dynamic Content) */}
        <section>
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-6 flex items-center gap-2">
                <Zap size={14} /> Live Feed
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Featured Person */}
                {featuredPerson && (
                    <Link href={`/library/pantheon?id=${featuredPerson.id}`} className="group p-6 rounded-2xl border border-white/10 bg-neutral-900/40 hover:bg-neutral-900/80 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400">Architect</span>
                            <User size={16} className="text-neutral-600 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">{featuredPerson.name}</h3>
                        <p className="text-xs text-neutral-500 mb-4">{featuredPerson.role}</p>
                        <p className="text-sm text-neutral-400 line-clamp-3">{featuredPerson.bio}</p>
                    </Link>
                )}

                {/* Featured Axiom */}
                {featuredAxiom && (
                    <Link href={`/library/axioms?id=${featuredAxiom.id}`} className="group p-6 rounded-2xl border border-white/10 bg-neutral-900/40 hover:bg-neutral-900/80 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-violet-400">Law</span>
                            <Scale size={16} className="text-neutral-600 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">{featuredAxiom.title}</h3>
                        {featuredAxiom.formula && (
                            <div className="bg-black/30 p-2 rounded mb-4 font-mono text-xs text-center text-violet-200">
                                {featuredAxiom.formula}
                            </div>
                        )}
                        <p className="text-sm text-neutral-400 line-clamp-3">{featuredAxiom.desc}</p>
                    </Link>
                )}

                {/* Featured Asset */}
                {featuredAsset && (
                    <Link href={`/library/gallery?id=${featuredAsset.id}`} className="group p-6 rounded-2xl border border-white/10 bg-neutral-900/40 hover:bg-neutral-900/80 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-green-400">Simulation</span>
                            <Globe size={16} className="text-neutral-600 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">{featuredAsset.title}</h3>
                        <p className="text-xs text-neutral-500 mb-4">{featuredAsset.discipline}</p>
                        <div className="mt-auto flex items-center gap-2 text-xs font-bold text-green-400 uppercase">
                            Launch <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                )}

            </div>
        </section>

    </div>
  );
}

// Helper Component
function AppCard({ title, desc, href, icon: Icon, color, bg }: any) {
    return (
        <Link href={href} className={`group p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${bg}`}>
            <Icon size={24} className={`mb-4 ${color}`} />
            <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
            <p className="text-xs text-neutral-400">{desc}</p>
        </Link>
    )
}