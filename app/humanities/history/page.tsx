"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import {
  Hourglass,
  Pyramid,
  Castle,
  Factory,
  Pickaxe,
  BookText,
  Globe,
  Users,
  Sword,
  Wrench,
  Landmark,
  Ship,
  Rocket,
  Bone,
  Scale,
  HandCoins,
  Leaf,
  Dna,
  Map,
  ChevronRight,
  Zap,
} from "@/components/icons";
import React from "react";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

const historySymbols = [
  "1066", "BC", "AD", "Circa", "Zeitgeist", "Pax Romana", "Dynasty", "Revolution", "c.",
];

// --- DATA: Eras ---
const eras = [
  {
    title: "Prehistory",
    range: "Origins – 3000 BC",
    desc: "Human history before written records: the Stone, Bronze, and Iron Ages.",
    href: "/humanities/history/prehistory",
    Icon: Bone,
  },
  {
    title: "Antiquity",
    range: "3000 BC – 500 AD",
    desc: "The rise of civilizations: Mesopotamia, Egypt, Greece, Rome, and Han China.",
    href: "/humanities/history/antiquity",
    Icon: Pyramid,
  },
  {
    title: "Post-Classical (Medieval)",
    range: "500 – 1500",
    desc: "The Middle Ages, the Islamic Golden Age, and the rise of feudalism.",
    href: "/humanities/history/medieval",
    Icon: Castle,
  },
  {
    title: "Early Modern",
    range: "1500 – 1800",
    desc: "The Renaissance, Reformation, Age of Discovery, and the Enlightenment.",
    href: "/humanities/history/early-modern",
    Icon: Ship,
  },
  {
    title: "Late Modern",
    range: "1800 – 1945",
    desc: "The Industrial Revolution, Imperialism, and the two World Wars.",
    href: "/humanities/history/late-modern",
    Icon: Factory,
  },
  {
    title: "Contemporary",
    range: "1945 – Present",
    desc: "The Cold War, decolonization, globalization, and the Information Age.",
    href: "/humanities/history/contemporary",
    Icon: Rocket,
  },
];

// --- DATA: Themes ---
const themes = [
  { title: "Military History", href: "/humanities/history/military", Icon: Sword },
  { title: "History of Technology", href: "/humanities/history/technology", Icon: Wrench },
  { title: "Social & Cultural", href: "/humanities/history/cultural", Icon: Users },
  { title: "Economic History", href: "/humanities/history/economic", Icon: HandCoins },
  { title: "Political History", href: "/humanities/history/political", Icon: Landmark },
  { title: "Legal History", href: "/humanities/history/legal", Icon: Scale },
  { title: "Environmental History", href: "/humanities/history/environmental", Icon: Leaf },
  { title: "Big History", href: "/humanities/history/big-history", Icon: Dna },
];

// --- DATA: Great Debates (New Rich Content) ---
const debates = [
  {
    title: "Great Man vs. Trends",
    desc: "Do individuals shape history (Napoleon, Caesar), or are they merely products of deeper social currents?",
    side1: "Agency",
    side2: "Structure",
  },
  {
    title: "Cyclical vs. Linear",
    desc: "Does history repeat itself in cycles of rise and fall, or does it march forward toward progress?",
    side1: "Cycles",
    side2: "Progress",
  },
];

// --- COMPONENT: Timeline Era ---
function TimelineEra({ era, isLast }: { era: typeof eras[0]; isLast: boolean }) {
  return (
    <div className="relative flex gap-6 pb-12 group">
      {!isLast && (
        <div className="absolute left-[23px] top-12 bottom-0 w-0.5 bg-neutral-800 group-hover:bg-amber-900/50 transition-colors duration-500" />
      )}
      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 shadow-md transition-all duration-300 group-hover:border-amber-500/50 group-hover:bg-amber-950/30 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]">
        <era.Icon className="h-5 w-5 text-neutral-400 group-hover:text-amber-400 transition-colors" />
      </div>
      <Link href={era.href} className="flex-1 block">
        <div className="glass p-5 rounded-xl border border-white/5 hover:border-amber-500/30 transition-all duration-300 hover:-translate-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <h3 className="text-xl font-bold text-neutral-100 group-hover:text-amber-200 transition-colors">
              {era.title}
            </h3>
            <span className="text-xs font-mono font-semibold text-amber-500/80 bg-amber-900/10 px-2 py-1 rounded uppercase tracking-wider">
              {era.range}
            </span>
          </div>
          <p className="text-sm text-neutral-400 leading-relaxed">{era.desc}</p>
        </div>
      </Link>
    </div>
  );
}

// --- COMPONENT: Theme Pill ---
function ThemePill({ theme }: { theme: typeof themes[0] }) {
  return (
    <Link
      href={theme.href}
      className="flex items-center gap-3 rounded-lg border border-neutral-800 bg-neutral-900/40 p-4 transition-all hover:bg-neutral-800 hover:border-amber-500/20 hover:shadow-lg group"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-neutral-800 text-neutral-400 group-hover:text-amber-400 group-hover:bg-amber-950/30 transition-colors">
        <theme.Icon size={16} />
      </div>
      <span className="text-sm font-medium text-neutral-300 group-hover:text-neutral-100">
        {theme.title}
      </span>
    </Link>
  );
}

// --- COMPONENT: Debate Card (New) ---
function DebateCard({ item }: { item: typeof debates[0] }) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-5 hover:border-neutral-700 transition-colors">
      <h4 className="font-bold text-neutral-200 mb-2 flex items-center gap-2">
        <Zap size={16} className="text-yellow-500" />
        {item.title}
      </h4>
      <p className="text-sm text-neutral-400 leading-relaxed mb-4">
        {item.desc}
      </p>
      <div className="flex items-center justify-between text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500">
        <span className="text-blue-400/80">{item.side1}</span>
        <span className="h-px flex-1 bg-neutral-800 mx-3"></span>
        <span className="text-red-400/80">{item.side2}</span>
      </div>
    </div>
  );
}

export default function HistoryPage() {
  return (
    <main className="topic-page theme-humanities lg:px-16">
      <FloatingSymbols symbols={historySymbols} />
      <PageHeader
        eyebrow="Humanities"
        title="History"
        subtitle="The continuous narrative of human experience. Explore the timeline of our species, the themes that define us, and the methods we use to uncover the past."
      />

      <div className="grid w-full max-w-7xl grid-cols-1 gap-16 lg:grid-cols-12">
        
        {/* LEFT COLUMN: The Timeline (Eras) */}
        <div className="lg:col-span-7">
          <h2 className="mb-8 flex items-center gap-2 text-2xl font-bold text-neutral-100 border-b border-neutral-800 pb-4">
            <Hourglass className="text-amber-400" /> Chronology
          </h2>
          <div className="pl-2">
            {eras.map((era, index) => (
              <TimelineEra key={era.title} era={era} isLast={index === eras.length - 1} />
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Themes & Debates */}
        <div className="flex flex-col gap-12 lg:col-span-5 lg:sticky lg:top-24 h-fit">
          
          {/* Thematic Approaches */}
          <section>
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-neutral-100">
              <Users className="text-blue-400" /> Thematic Lenses
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {themes.map((theme) => (
                <ThemePill key={theme.title} theme={theme} />
              ))}
            </div>
          </section>

          {/* Historical Debates (Rich Content) */}
          <section>
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-neutral-100">
              <MessageSquare className="text-amber-400" /> Great Debates
            </h2>
            <div className="space-y-4">
              {debates.map((d) => (
                <DebateCard key={d.title} item={d} />
              ))}
            </div>
          </section>
          
          {/* Methodology Link */}
          <div className="glass p-6 rounded-xl border border-emerald-900/30 bg-emerald-900/5">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-emerald-900/20 text-emerald-400">
                <Pickaxe size={20} />
              </div>
              <div>
                <h3 className="font-bold text-neutral-200 mb-1">Methodology</h3>
                <p className="text-sm text-neutral-400 mb-3">
                  How do we know what we know? Explore archaeology, historiography, and primary sources.
                </p>
                <Link href="/humanities/history/methodology" className="text-sm font-bold text-emerald-400 hover:underline">
                  Explore Methods &rarr;
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}