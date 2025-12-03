"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import NetworkBackground from "@/components/NetworkBackground";
import { 
  Binary, Atom, Handshake, Hammer, Palette, Link as LinkIcon,
  Search, ArrowRight, Activity, Database, Zap, Globe, Cpu, BookOpen, Layers
} from "lucide-react";

// --- DOMAIN DATA ---
const DOMAINS = [
  {
    id: "formal",
    title: "Formal Sciences",
    short: "Formal",
    desc: "The language of abstract structure. Logic, Mathematics, and Systems.",
    href: "/formal-science",
    icon: Binary,
    color: "text-red-500",
    glow: "shadow-red-500/50",
    bg: "bg-red-950/20",
    border: "border-red-500/50",
    stats: [
      { label: "Axioms", value: "404" },
      { label: "Logic Gates", value: "Active" },
    ],
    // HUD Position: Top Center
    position: "top-8 left-1/2 -translate-x-1/2",
    lineOrigin: "bottom"
  },
  {
    id: "natural",
    title: "Natural Sciences",
    short: "Natural",
    desc: "The study of the physical universe. Physics, Biology, and Chemistry.",
    href: "/natural-science",
    icon: Atom,
    color: "text-cyan-400",
    glow: "shadow-cyan-500/50",
    bg: "bg-cyan-950/20",
    border: "border-cyan-500/50",
    stats: [
      { label: "Laws", value: "108" },
      { label: "Entropy", value: "Rising" },
    ],
    // HUD Position: Top Right
    position: "top-1/4 right-8 md:right-16",
    lineOrigin: "left"
  },
  {
    id: "social",
    title: "Social Sciences",
    short: "Social",
    desc: "The web of human interaction. Psychology, Sociology, and Economics.",
    href: "/social-science",
    icon: Handshake,
    color: "text-violet-400",
    glow: "shadow-violet-500/50",
    bg: "bg-violet-950/20",
    border: "border-violet-500/50",
    stats: [
      { label: "Agents", value: "8B+" },
      { label: "Patterns", value: "Complex" },
    ],
    // HUD Position: Bottom Right
    position: "bottom-1/4 right-8 md:right-16",
    lineOrigin: "left"
  },
  {
    id: "applied",
    title: "Applied Sciences",
    short: "Applied",
    desc: "Knowledge in action. Engineering, Medicine, and Technology.",
    href: "/applied-science",
    icon: Hammer,
    color: "text-orange-400",
    glow: "shadow-orange-500/50",
    bg: "bg-orange-950/20",
    border: "border-orange-500/50",
    stats: [
      { label: "Tools", value: "Infinity" },
      { label: "Status", value: "Building" },
    ],
    // HUD Position: Bottom Center
    position: "bottom-8 left-1/2 -translate-x-1/2",
    lineOrigin: "top"
  },
  {
    id: "humanities",
    title: "Humanities",
    short: "Humanities",
    desc: "The human condition. Art, History, Philosophy, and Literature.",
    href: "/humanities",
    icon: Palette,
    color: "text-amber-400",
    glow: "shadow-amber-500/50",
    bg: "bg-amber-950/20",
    border: "border-amber-500/50",
    stats: [
      { label: "Era", value: "Post-Modern" },
      { label: "Archive", value: "Deep" },
    ],
    // HUD Position: Bottom Left
    position: "bottom-1/4 left-8 md:left-16",
    lineOrigin: "right"
  },
  {
    id: "inter",
    title: "Interdisciplines",
    short: "Synthesis",
    desc: "The spaces between. Astrobiology, Game Studies, and AI.",
    href: "/interdisciplines",
    icon: LinkIcon,
    color: "text-lime-400",
    glow: "shadow-lime-500/50",
    bg: "bg-lime-950/20",
    border: "border-lime-500/50",
    stats: [
      { label: "Links", value: "Forging..." },
      { label: "Novelty", value: "High" },
    ],
    // HUD Position: Top Left
    position: "top-1/4 left-8 md:left-16",
    lineOrigin: "right"
  },
];

export default function Home() {
  const [activeDomain, setActiveDomain] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const openSearch = () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
  };

  // Find the active domain object
  const currentDomain = DOMAINS.find(d => d.id === activeDomain);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#020202] text-white selection:bg-cyan-500/30 font-sans">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="fixed inset-0 z-0 pointer-events-none transition-colors duration-1000">
          <NetworkBackground />
          
          {/* Dynamic Ambient Glow based on Active Domain */}
          <motion.div 
            animate={{ 
                background: activeDomain && currentDomain
                    ? `radial-gradient(circle at center, ${currentDomain.color.replace('text-', '')}10 0%, transparent 70%)`
                    : "radial-gradient(circle at center, rgba(6,182,212,0.05) 0%, transparent 70%)"
            }}
            className="absolute inset-0 transition-all duration-1000"
          />
          
          {/* Vignette & Scanlines */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_95%)]" />
          <div className="absolute inset-0 bg-[length:100%_4px] bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.4)_50%)] opacity-20" />
      </div>

      {/* --- HUD INTERFACE --- */}
      <div className="relative z-10 w-full h-screen flex items-center justify-center">
        
        {/* CENTER STAGE: The "Holographic" Projector */}
        <div className="relative z-20 w-full max-w-4xl px-6 flex flex-col items-center justify-center text-center h-[60vh]">
            <AnimatePresence mode="wait">
                
                {/* STATE 1: IDLE (Nexus Core) */}
                {!activeDomain ? (
                    <motion.div 
                        key="idle"
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center"
                    >
                        <div className="mb-8 relative">
                            <div className="absolute inset-0 bg-cyan-500/20 blur-[80px] rounded-full animate-pulse" />
                            <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter text-white relative z-10 select-none">
                                NEXUS
                            </h1>
                            <div className="absolute -bottom-4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                        </div>
                        
                        <p className="text-neutral-400 max-w-lg mb-10 text-lg font-light tracking-wide">
                            The operating system for human knowledge. <br/>
                            <span className="text-cyan-400">Select a sector to initialize data stream.</span>
                        </p>

                        {/* Search Bar */}
                        <button 
                            onClick={openSearch}
                            className="group flex items-center gap-4 px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 transition-all w-full max-w-md backdrop-blur-xl"
                        >
                            <Search className="text-neutral-500 group-hover:text-cyan-400 transition-colors" />
                            <span className="text-neutral-400 group-hover:text-white uppercase tracking-widest text-xs">Global Search Protocol</span>
                            <kbd className="ml-auto text-[10px] font-mono text-neutral-600 border border-white/10 px-2 py-1 rounded">⌘K</kbd>
                        </button>
                    </motion.div>
                ) : (
                    /* STATE 2: ACTIVE (Domain Preview) */
                    <motion.div 
                        key="active"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center"
                    >
                        {/* Domain Icon (Large) */}
                        <motion.div 
                            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                            className={`mb-6 p-6 rounded-3xl bg-black/50 backdrop-blur-xl border ${currentDomain?.border} ${currentDomain?.glow} shadow-2xl`}
                        >
                            {currentDomain && <currentDomain.icon size={64} className={currentDomain.color} />}
                        </motion.div>

                        {/* Domain Title */}
                        <motion.h2 
                            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight"
                        >
                            {currentDomain?.title}
                        </motion.h2>

                        {/* Stats Grid */}
                        <motion.div 
                            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                            className="flex gap-8 mb-10"
                        >
                            {currentDomain?.stats.map((stat, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <span className={`text-2xl font-bold font-mono ${currentDomain.color}`}>{stat.value}</span>
                                    <span className="text-[10px] uppercase tracking-widest text-neutral-500">{stat.label}</span>
                                </div>
                            ))}
                        </motion.div>

                        {/* Description */}
                        <motion.p 
                            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                            className="text-xl text-neutral-300 max-w-2xl mb-12 font-light leading-relaxed"
                        >
                            {currentDomain?.desc}
                        </motion.p>

                        {/* Enter Button */}
                        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
                            <Link 
                                href={currentDomain?.href || "#"}
                                className={`
                                    group relative px-10 py-4 rounded-full bg-white text-black font-bold uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-3
                                    ${currentDomain?.glow} shadow-lg
                                `}
                            >
                                Enter Sector <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                            </Link>
                        </motion.div>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* --- PERIMETER SATELLITES --- */}
        {/* These are the clickable nodes around the screen */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
            {DOMAINS.map((domain) => {
                const isActive = activeDomain === domain.id;
                
                return (
                    <div key={domain.id} className={`absolute pointer-events-auto transition-all duration-700 ${domain.position}`}>
                        {/* Connection Line (CSS draw) */}
                        <div 
                            className={`absolute w-[40vw] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-500
                                ${isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}
                                ${domain.lineOrigin === 'left' ? 'right-full top-1/2 origin-right' : ''}
                                ${domain.lineOrigin === 'right' ? 'left-full top-1/2 origin-left' : ''}
                                ${domain.lineOrigin === 'top' ? 'left-1/2 bottom-full h-[40vh] w-[1px] origin-bottom bg-gradient-to-b' : ''}
                                ${domain.lineOrigin === 'bottom' ? 'left-1/2 top-full h-[40vh] w-[1px] origin-top bg-gradient-to-b' : ''}
                            `} 
                        />

                        <button
                            onMouseEnter={() => setActiveDomain(domain.id)}
                            // We don't clear activeDomain onMouseLeave immediately to keep the preview visible while moving mouse, 
                            // but for a snappy feel, maybe we do? Let's try sticking it until another is hovered or background clicked.
                            // onMouseLeave={() => setActiveDomain(null)} 
                            onClick={() => window.location.href = domain.href}
                            className={`
                                group relative flex items-center gap-4 p-4 rounded-full border backdrop-blur-md transition-all duration-300
                                ${isActive 
                                    ? `bg-neutral-900 border-white/20 scale-110 ${domain.glow} shadow-2xl` 
                                    : "bg-black/40 border-white/5 hover:border-white/20 hover:bg-neutral-900/60"
                                }
                            `}
                        >
                            <div className={`p-3 rounded-full bg-white/5 ${isActive ? domain.color : "text-neutral-500 group-hover:text-white"}`}>
                                <domain.icon size={24} />
                            </div>
                            
                            {/* Label (Hidden unless active/hovered to save space?) No, let's show short title */}
                            <div className={`text-left pr-4 transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100"}`}>
                                <div className="text-xs font-bold uppercase tracking-widest text-white">{domain.short}</div>
                                <div className="text-[9px] text-neutral-500 font-mono">SECTOR_{domain.id.substring(0,3).toUpperCase()}</div>
                            </div>
                        </button>
                    </div>
                );
            })}
        </div>

        {/* --- MOBILE LIST (Fallback) --- */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:hidden z-30 bg-gradient-to-t from-black via-black/90 to-transparent">
            <div className="grid grid-cols-3 gap-3">
                {DOMAINS.map(d => (
                    <Link key={d.id} href={d.href} className="flex flex-col items-center justify-center p-4 rounded-xl bg-neutral-900/80 border border-white/10">
                        <d.icon size={20} className={`mb-2 ${d.color}`} />
                        <span className="text-[10px] font-bold text-neutral-300">{d.short}</span>
                    </Link>
                ))}
            </div>
        </div>

        {/* --- CORNER WIDGETS --- */}
        <div className="absolute top-8 left-8 hidden lg:block">
            <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-600">
                <Globe size={12} />
                <span>NEXUS_OS // V.2.8.4</span>
            </div>
        </div>

        <div className="absolute top-8 right-8 hidden lg:block">
             <div className="flex gap-4">
                <Link href="/library" className="text-neutral-500 hover:text-cyan-400 transition-colors"><Database size={20} /></Link>
                <Link href="/arcade" className="text-neutral-500 hover:text-pink-400 transition-colors"><Zap size={20} /></Link>
             </div>
        </div>

      </div>
      
      {/* Background click to reset */}
      <div className="absolute inset-0 z-0" onClick={() => setActiveDomain(null)} />
    </main>
  );
}