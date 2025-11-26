"use client";

import { useState } from "react";
import {
  Atom, Handshake, Hammer, Palette, Link as LinkIcon, 
  Binary, Gamepad2, BookOpen, FlaskConical, LayoutGrid,
  Skull, Theater, Terminal
} from "@/components/icons";
import { Search as SearchIcon, ArrowRight, Link, Globe } from "lucide-react";
import NetworkBackground from "@/components/NetworkBackground";
import { BentoGrid, BentoItem } from "@/components/BentoGrid";
import NavMenu from "@/components/NavMenu";
import { motion } from "framer-motion";
import HomeDashboard from "@/components/HomeDashboard";
import DomainExplorer from "@/components/DomainExplorer";

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
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#050505] selection:bg-cyan-500/30 pb-20">
      
      {/* Backgrounds */}
      <NetworkBackground />
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(30,30,40,0.5),#050505_80%)]" />

      <div className="relative z-10 px-6 py-10">
        
       

        {/* 2. THE ACADEMIC GRAPH (Navigation) */}
        <div className="max-w-7xl mx-auto mt-32">
            <div className="flex items-center gap-3 mb-8 pl-2 border-b border-white/10 pb-4">
                <Binary className="text-neutral-500" size={20} />
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">Full Directory</h2>
            </div>
            <div className="max-w-7xl mx-auto mt-32">
                <div className="flex items-center gap-3 mb-12 pl-2 border-b border-white/10 pb-4">
                    <Binary className="text-neutral-500" size={20} />
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">Sector Analysis</h2>
                </div>
                <DomainExplorer />
            </div>
        </div>
         {/* 1. THE DASHBOARD */}
        <HomeDashboard />

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