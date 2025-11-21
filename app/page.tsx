"use client";

import { useState } from "react";
import {
  Atom,
  Handshake,
  Hammer,
  Palette,
  Link as LinkIcon,
  Wrench,
  BookOpen,
  Binary,
  Search,
} from "@/components/icons";
import TopicCard from "@/components/TopicCard";
import { Skull, Theater, Search as SearchIcon } from "lucide-react";
import NetworkBackground from "@/components/NetworkBackground";
import { motion } from "framer-motion"; // Make sure to install: npm install framer-motion

const allCategories = [
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
  {
    title: "Glossary",
    desc: "A centralized dictionary of key terms and definitions.",
    href: "/glossary",
    Icon: BookOpen,
    className: "theme-glossary",
    tags: ["words", "definitions"]
  },
  {
    title: "Dev Playground",
    desc: "UI experiments, animations, and component testing ground.",
    href: "/dev-playground",
    Icon: Wrench,
    className: "theme-dev-playground",
    tags: ["code", "test"]
  },
  {
    title: "Skeleton Pages",
    desc: "Design templates and layout patterns for future content.",
    href: "/skeleton",
    Icon: Skull,
    className: "theme-skeleton",
    tags: ["layout", "design"]
  },
  {
    title: "Stage",
    desc: "The recording studio and presentation area.",
    href: "/stage",
    Icon: Theater,
    className: "theme-stage",
    tags: ["video", "demo"]
  }
];

export default function Home() {
  const [search, setSearch] = useState("");

  // Filter logic
  const filteredCards = allCategories.filter((c) => 
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.desc.toLowerCase().includes(search.toLowerCase()) ||
    c.tags.some(tag => tag.includes(search.toLowerCase()))
  );

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-neutral-950 selection:bg-cyan-500/30">
      
      {/* 1. Interactive Background */}
      <NetworkBackground />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 py-20">
        
        {/* 2. Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/30 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-cyan-400 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
            </span>
            System Online
          </div>
          
          <h1 className="mb-6 text-6xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl">
            Knowledge <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Network</span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg text-neutral-400">
            Access the archives. Explore interconnected concepts across science, humanities, and technology in a unified interface.
          </p>

          {/* 3. Search Bar */}
          <div className="mx-auto mt-8 flex max-w-lg items-center gap-2 rounded-2xl border border-neutral-800 bg-neutral-900/80 px-4 py-3 shadow-2xl backdrop-blur-xl transition-colors focus-within:border-cyan-500/50 focus-within:bg-neutral-900">
            <SearchIcon className="h-5 w-5 text-neutral-500" />
            <input 
              type="text"
              placeholder="Filter nodes (e.g., 'Physics', 'Logic')..."
              className="flex-1 bg-transparent text-neutral-100 placeholder-neutral-500 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </motion.div>

        {/* 4. Dynamic Grid */}
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCards.map((card, i) => (
            <motion.div
              key={card.href}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <TopicCard
                href={card.href}
                title={card.title}
                desc={card.desc}
                Icon={card.Icon}
                className={`${card.className} h-full`}
              />
            </motion.div>
          ))}
        </div>

        {filteredCards.length === 0 && (
            <div className="mt-12 text-neutral-500">
                No nodes found matching "{search}".
            </div>
        )}

      </div>
    </main>
  );
}