"use client";

import { useState } from "react";
import {
  Atom, Handshake, Hammer, Palette, Link as LinkIcon, 
  Binary, Gamepad2, BookOpen, FlaskConical, LayoutGrid,
  Skull, Theater, Terminal
} from "@/components/icons";
import { Search as SearchIcon, ArrowRight, Link } from "lucide-react";
import NetworkBackground from "@/components/NetworkBackground";
import { BentoGrid, BentoItem } from "@/components/BentoGrid";
import NavMenu from "@/components/NavMenu";
import { motion } from "framer-motion";

// --- ACADEMIC DOMAINS ---
const academicDomains = [
  {
    title: "Formal Sciences",
    desc: "The language of structure. Logic, Mathematics, and Systems Theory.",
    href: "/formal-science",
    Icon: Binary,
    color: "text-red-500",
    tags: ["Logic", "Math", "Systems"]
  },
  {
    title: "Natural Sciences",
    desc: "The study of the physical universe. Physics, Biology, and Chemistry.",
    href: "/natural-science",
    Icon: Atom,
    color: "text-cyan-400",
    tags: ["Physics", "Biology", "Chemistry"]
  },
  {
    title: "Social Sciences",
    desc: "The web of human interaction. Psychology, Sociology, and Economics.",
    href: "/social-science",
    Icon: Handshake,
    color: "text-violet-400",
    tags: ["Psychology", "Sociology", "Economics"]
  },
  {
    title: "Applied Sciences",
    desc: "Knowledge in action. Engineering, Medicine, and Technology.",
    href: "/applied-science",
    Icon: Hammer,
    color: "text-orange-400",
    tags: ["Engineering", "Medicine", "Tech"]
  },
  {
    title: "Humanities",
    desc: "The human condition. Art, History, Philosophy, and Literature.",
    href: "/humanities",
    Icon: Palette,
    color: "text-amber-400",
    tags: ["Philosophy", "History", "Arts"]
  },
  {
    title: "Interdisciplines",
    desc: "The spaces between. Astrobiology, Game Studies, and AI.",
    href: "/interdisciplines",
    Icon: LinkIcon,
    color: "text-lime-400",
    tags: ["Astrobiology", "Game Studies", "AI"]
  },
];

export default function Home() {
  const openSearch = () => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#050505] selection:bg-cyan-500/30 pb-20">
      
      {/* Backgrounds */}
      <NetworkBackground />
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(30,30,40,0.5),#050505_80%)]" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 py-16">
        
        {/* --- HEADER --- */}
        <header className="flex justify-between items-center mb-24">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    <LayoutGrid className="text-black" size={20} />
                </div>
                <span className="font-bold tracking-[0.2em] uppercase text-xs text-white">Knowledge Network</span>
            </div>
            <button 
                onClick={openSearch}
                className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-xs font-medium text-neutral-400 group"
            >
                <SearchIcon size={14} className="group-hover:text-white transition-colors" />
                <span>Command Palette</span>
                <kbd className="bg-white/10 px-1.5 rounded text-[10px] font-mono text-neutral-500 group-hover:text-white">⌘K</kbd>
            </button>
        </header>
        
        {/* --- HERO --- */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-32 max-w-4xl"
        >
             <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter text-white mb-8 leading-[0.85]">
                THE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-text">
                    NEXUS
                </span>
            </h1>
            <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed mb-10 font-light">
                An interactive archive of human understanding. From the logic of code to the philosophy of art, mapped and simulated.
            </p>

            <div className="flex flex-wrap gap-4">
                <button onClick={openSearch} className="px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                    Start Exploring <ArrowRight size={16} />
                </button>
                <Link href="/arcade" className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full font-bold uppercase tracking-widest hover:bg-white/10 transition-colors backdrop-blur-md">
                    Enter Arcade
                </Link>
            </div>
        </motion.div>

        {/* --- BENTO GRID (The Hubs) --- */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-32"
        >
            <SectionTitle title="System Modules" icon={Terminal} />
            
            <BentoGrid>
                {/* 1. The Arcade (Big Feature) */}
                <BentoItem 
                    title="The Arcade"
                    desc="Interactive simulations. Game Theory, Magic: The Gathering, and Logic Gates."
                    href="/arcade"
                    Icon={Gamepad2}
                    className="md:col-span-2 md:row-span-2 min-h-[300px]"
                    bgClass="bg-gradient-to-br from-purple-900/40 to-purple-900/10 border-purple-500/30"
                    colorClass="text-purple-400"
                />
                
                {/* 2. The Library */}
                <BentoItem 
                    title="The Library"
                    desc="Reference archives. Glossary & Rules."
                    href="/library"
                    Icon={BookOpen}
                    bgClass="bg-gradient-to-br from-cyan-900/40 to-cyan-900/10 border-cyan-500/30"
                    colorClass="text-cyan-400"
                />

                {/* 3. The Lab */}
                <BentoItem 
                    title="The Lab"
                    desc="Experimental UI components."
                    href="/dev-playground"
                    Icon={FlaskConical}
                    bgClass="bg-gradient-to-br from-emerald-900/40 to-emerald-900/10 border-emerald-500/30"
                    colorClass="text-emerald-400"
                />

                {/* 4. The Stage (New!) */}
                 <BentoItem 
                    title="The Stage"
                    desc="Content production studio."
                    href="/stage"
                    Icon={Theater}
                    bgClass="bg-gradient-to-br from-rose-900/40 to-rose-900/10 border-rose-500/30"
                    colorClass="text-rose-400"
                />

                {/* 5. Skeleton (New!) */}
                <BentoItem 
                    title="Blueprints"
                    desc="Layout patterns."
                    href="/skeleton"
                    Icon={Skull}
                    bgClass="bg-gradient-to-br from-neutral-800/60 to-neutral-900/40 border-white/10"
                    colorClass="text-neutral-400"
                />
            </BentoGrid>
        </motion.div>

        {/* --- NAV MENU (The Graph) --- */}
        <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
        >
            <SectionTitle title="Academic Graph" icon={Binary} />
            <NavMenu items={academicDomains} />
        </motion.div>

      </div>
    </main>
  );
}

function SectionTitle({ title, icon: Icon }: any) {
    return (
        <div className="flex items-center gap-3 mb-8 pl-2">
            <Icon className="text-neutral-500" size={20} />
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">{title}</h2>
        </div>
    );
}