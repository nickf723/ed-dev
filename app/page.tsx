"use client";

import { useState } from "react";
import {
  Atom, Handshake, Hammer, Palette, Link as LinkIcon, Wrench, BookOpen, Binary, Search,
} from "@/components/icons";
import TopicCard from "@/components/TopicCard";
import { Skull, Theater, Search as SearchIcon, LayoutGrid, Settings } from "lucide-react";
import NetworkBackground from "@/components/NetworkBackground";
import { motion } from "framer-motion";

// 1. Separate Data
const mainDisciplines = [
  {
    title: "Formal Sciences",
    desc: "Logic, Mathematics, Systems Theory, and the abstract languages of the universe.",
    href: "/formal-science",
    Icon: Binary,
    className: "theme-formal-science",
    tags: ["math", "logic", "cs"]
  },
  {
    title: "Natural Sciences",
    desc: "Physics, Chemistry, Biology, and the study of the physical world.",
    href: "/natural-science",
    Icon: Atom,
    className: "theme-natural-science",
    tags: ["physics", "bio", "chem", "space"]
  },
  {
    title: "Social Sciences",
    desc: "Sociology, Psychology, Economics, and the complex web of human interaction.",
    href: "/social-science",
    Icon: Handshake,
    className: "theme-social-science",
    tags: ["people", "society", "mind"]
  },
  {
    title: "Applied Sciences",
    desc: "Engineering, Medicine, Technology, and putting knowledge to work.",
    href: "/applied-science",
    Icon: Hammer,
    className: "theme-applied-science",
    tags: ["tech", "build", "health"]
  },
  {
    title: "Humanities",
    desc: "Philosophy, History, Arts, and the exploration of the human condition.",
    href: "/humanities",
    Icon: Palette,
    className: "theme-humanities",
    tags: ["art", "history", "thought"]
  },
  {
    title: "Interdisciplines",
    desc: "Bioengineering, Astrophysics, and fields that bridge the gaps.",
    href: "/interdisciplines",
    Icon: LinkIcon,
    className: "theme-interdisciplines",
    tags: ["mix", "bridge"]
  },
];

const metaTools = [
  {
    title: "Glossary",
    desc: "Definitions & Key Terms.",
    href: "/glossary",
    Icon: BookOpen,
    className: "theme-glossary",
    tags: ["words", "definitions"]
  },
  {
    title: "Dev Playground",
    desc: "UI Experiments & Tests.",
    href: "/dev-playground",
    Icon: Wrench,
    className: "theme-dev-playground",
    tags: ["code", "test"]
  },
  {
    title: "Skeleton Pages",
    desc: "Design Templates.",
    href: "/skeleton",
    Icon: Skull,
    className: "theme-skeleton",
    tags: ["layout", "design"]
  },
  {
    title: "Stage",
    desc: "Presentation Studio.",
    href: "/stage",
    Icon: Theater,
    className: "theme-stage",
    tags: ["video", "demo"]
  }
];

export default function Home() {
  const [search, setSearch] = useState("");

  const filterList = (list: any[]) => list.filter((c) => 
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.desc.toLowerCase().includes(search.toLowerCase()) ||
    c.tags.some((t: string) => t.includes(search.toLowerCase()))
  );

  const filteredMain = filterList(mainDisciplines);
  const filteredMeta = filterList(metaTools);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-neutral-950 selection:bg-cyan-500/30">
      
      {/* --- Atmospheric Background Blobs --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/20 rounded-full blur-[120px] animate-blob-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/20 rounded-full blur-[120px] animate-blob-medium" />
        <div className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] bg-cyan-500/10 rounded-full blur-[100px] animate-blob-fast" />
      </div>

      {/* Interactive Network Canvas */}
      <NetworkBackground />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 py-20">
        
        {/* --- Hero Section --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-24 text-center max-w-4xl"
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.2)] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
            </span>
            System Online
          </div>
          
          <h1 className="mb-8 text-6xl font-extrabold tracking-tighter text-white sm:text-8xl lg:text-9xl drop-shadow-2xl">
            KNOWLEDGE<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-text">
              NETWORK
            </span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-xl text-neutral-300/80 font-light leading-relaxed">
            Navigating the archives of human understanding. <br className="hidden sm:block" />
            Connect the dots across science, humanities, and technology.
          </p>

          {/* Omnibar Search */}
          <div className="mx-auto mt-12 flex max-w-lg items-center gap-4 rounded-full border border-white/10 bg-neutral-900/60 px-6 py-4 shadow-2xl backdrop-blur-xl transition-all focus-within:border-cyan-500/50 focus-within:bg-neutral-900/90 focus-within:shadow-[0_0_30px_rgba(34,211,238,0.15)] group">
            <SearchIcon className="h-6 w-6 text-neutral-500 group-focus-within:text-cyan-400 transition-colors" />
            <input 
              type="text"
              placeholder="Search the network..."
              className="flex-1 bg-transparent text-lg text-neutral-100 placeholder-neutral-600 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </motion.div>

        {/* --- Main Content: Domains --- */}
        {filteredMain.length > 0 && (
          <section className="w-full mb-20">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4"
            >
              <LayoutGrid className="text-cyan-400" />
              <h2 className="text-2xl font-bold text-neutral-100 tracking-wide">Core Domains</h2>
            </motion.div>

            <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredMain.map((card, i) => (
                <motion.div
                  key={card.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + (i * 0.05) }}
                >
                  <TopicCard
                    href={card.href}
                    title={card.title}
                    desc={card.desc}
                    Icon={card.Icon}
                    className={`${card.className} h-full border-opacity-50 bg-opacity-40 hover:bg-opacity-60 backdrop-blur-sm`}
                  />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* --- Secondary Content: Meta/Tools --- */}
        {filteredMeta.length > 0 && (
          <section className="w-full">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4"
            >
              <Settings className="text-purple-400" />
              <h2 className="text-2xl font-bold text-neutral-100 tracking-wide">System & Meta</h2>
            </motion.div>

            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredMeta.map((card, i) => (
                <motion.div
                  key={card.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + (i * 0.05) }}
                >
                  {/* Smaller, more compact cards for tools */}
                  <TopicCard
                    href={card.href}
                    title={card.title}
                    desc={card.desc}
                    Icon={card.Icon}
                    className={`${card.className} h-full !p-6 !min-h-0 border-opacity-30 bg-opacity-20`}
                  />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {filteredMain.length === 0 && filteredMeta.length === 0 && (
            <div className="mt-12 text-neutral-500 italic">
                Signal lost. No nodes found matching "{search}".
            </div>
        )}

      </div>
    </main>
  );
}