"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Binary,
  Atom,
  Handshake,
  Hammer,
  Palette,
  Link as LinkIcon,
  Layers,
} from "@/components/icons";
import { ArrowRight } from "lucide-react";

type Sector = {
  id: string;
  title: string;
  tagline: string;
  href: string;
  color: string;      // text color, e.g. "text-cyan-400"
  accent: string;     // border / chip color, e.g. "border-cyan-500/50"
  gradient: string;   // bg gradient classes
  icon: React.ComponentType<{ size?: number }>;
  sampleTopics: string[];
};

const SECTORS: Sector[] = [
  {
    id: "formal",
    title: "Formal Sciences",
    tagline: "The language of structure: logic, math, computers, systems.",
    href: "/formal-science",
    color: "text-red-400",
    accent: "border-red-500/50",
    gradient: "from-red-500/15 via-red-500/5 to-transparent",
    icon: Binary,
    sampleTopics: ["Logic", "Algebra", "Computer Science"],
  },
  {
    id: "natural",
    title: "Natural Sciences",
    tagline: "Matter, energy, life, and the cosmos.",
    href: "/natural-science",
    color: "text-cyan-400",
    accent: "border-cyan-500/50",
    gradient: "from-cyan-500/15 via-cyan-500/5 to-transparent",
    icon: Atom,
    sampleTopics: ["Physics", "Biology", "Chemistry"],
  },
  {
    id: "social",
    title: "Social Sciences",
    tagline: "Minds, societies, economies, and culture.",
    href: "/social-science",
    color: "text-violet-400",
    accent: "border-violet-500/50",
    gradient: "from-violet-500/15 via-violet-500/5 to-transparent",
    icon: Handshake,
    sampleTopics: ["Psychology", "Sociology", "Economics"],
  },
  {
    id: "applied",
    title: "Applied Sciences",
    tagline: "Turning theory into tools and technology.",
    href: "/applied-science",
    color: "text-orange-400",
    accent: "border-orange-500/50",
    gradient: "from-orange-500/15 via-orange-500/5 to-transparent",
    icon: Hammer,
    sampleTopics: ["Engineering", "Medicine", "Tech"],
  },
  {
    id: "humanities",
    title: "Humanities",
    tagline: "Meaning, stories, and aesthetics.",
    href: "/humanities",
    color: "text-amber-400",
    accent: "border-amber-500/50",
    gradient: "from-amber-500/15 via-amber-500/5 to-transparent",
    icon: Palette,
    sampleTopics: ["Philosophy", "History", "Literature"],
  },
  {
    id: "inter",
    title: "Interdisciplines",
    tagline: "The spaces between fields.",
    href: "/interdisciplines",
    color: "text-lime-400",
    accent: "border-lime-500/50",
    gradient: "from-lime-500/15 via-lime-500/5 to-transparent",
    icon: LinkIcon,
    sampleTopics: ["Game Studies", "AI", "Astrobiology"],
  },
];

export default function MainMenu() {
  return (
    <section className="relative max-w-7xl mx-auto mt-20 space-y-8">
      {/* Header row */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pl-2 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <Layers className="text-neutral-500" size={20} />
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-500">
              Main Menu
            </p>
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-white mt-1">
              Choose a sector of knowledge
            </h2>
          </div>
        </div>
        <p className="max-w-md text-xs md:text-sm text-neutral-400">
          Each tile is a doorway into a full web of courses, units, and
          applets. Start where you feel most curious.
        </p>
      </div>

      {/* Grid of sectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {SECTORS.map((sector, index) => (
          <SectorCard
            key={sector.id}
            sector={sector}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

function SectorCard({ sector, index }: { sector: Sector; index: number }) {
  const Icon = sector.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className="relative group"
    >
      {/* Glow */}
      <div
        className={`pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br ${sector.gradient} opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-300`}
      />

      <Link
        href={sector.href}
        className={`relative block h-full rounded-3xl border bg-neutral-950/70 backdrop-blur-xl p-6 md:p-7 
          border-white/5 hover:border-white/15 transition-all duration-300
          shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.7)]
        `}
      >
        {/* Top row: icon + chip */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div
            className={`inline-flex items-center justify-center rounded-2xl border ${sector.accent} bg-white/5 p-3 ${sector.color}`}
          >
            <Icon size={26} />
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-300">
            Sector
          </span>
        </div>

        {/* Title & tagline */}
        <div className="space-y-2 mb-5">
          <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
            {sector.title}
          </h3>
          <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">
            {sector.tagline}
          </p>
        </div>

        {/* Topics & CTA row */}
        <div className="flex flex-col gap-4 mt-auto">
          <div className="flex flex-wrap gap-2">
            {sector.sampleTopics.map((topic) => (
              <span
                key={topic}
                className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[11px] text-neutral-200 font-medium"
              >
                {topic}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500">
              Enter {sector.title.split(" ")[0]}
            </span>
            <span
              className={`inline-flex items-center gap-2 text-xs font-semibold ${sector.color} group-hover:translate-x-1 transition-transform`}
            >
              Explore
              <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
