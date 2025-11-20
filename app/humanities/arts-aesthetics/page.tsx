"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import {
  Palette,
  Theater,
  Camera,
  Landmark,
  Eye,
  BrushCleaning, // For Art Conservation? Or use Shield if available
  Hammer,
  PencilRuler,
  Sun,
  Church,
  Heart,
  DiscAlbum,
  Mic,
  Tv,
  QuarterNote,
} from "@/components/icons";
import React from "react";
import Link from "next/link";
import { Monitor } from "lucide-react";

const artSymbols = [
  "RGB", "CMYK", "Tempo", "Harmony", "Perspective", "Form", "Space", "Timbre",
];

// --- DATA: Art History Periods ---
const periods = [
  {
    title: "Prehistoric & Ancient",
    range: "30,000 BC – 400 AD",
    desc: "From cave paintings to the monumental architecture of Egypt, Greece, and Rome.",
    href: "/humanities/arts-aesthetics/ancient",
    Icon: Landmark, 
  },
  {
    title: "Medieval & Gothic",
    range: "400 – 1400",
    desc: "Religious iconography, illuminated manuscripts, and soaring cathedrals.",
    href: "/humanities/arts-aesthetics/medieval",
    Icon: Church,
  },
  {
    title: "Renaissance & Baroque",
    range: "1400 – 1750",
    desc: "The mastery of perspective, realism, light (chiaroscuro), and dramatic emotion.",
    href: "/humanities/arts-aesthetics/renaissance",
    Icon: Sun, 
  },
  {
    title: "Neoclassical & Romantic",
    range: "1750 – 1850",
    desc: "A return to order and reason, followed by a rebellion of intense emotion and nature.",
    href: "/humanities/arts-aesthetics/romanticism",
    Icon: Heart,
  },
  {
    title: "Modern Art",
    range: "1860 – 1970",
    desc: "Impressionism, Cubism, Surrealism, and the abstraction of form.",
    href: "/humanities/arts-aesthetics/modern",
    Icon: Palette,
  },
  {
    title: "Contemporary Art",
    range: "1970 – Present",
    desc: "Pop art, digital media, conceptual art, and the dissolving of boundaries.",
    href: "/humanities/arts-aesthetics/contemporary",
    Icon: Monitor,
  },
];

// --- DATA: Artistic Mediums ---
const mediums = [
  { title: "Visual Arts (Painting)", href: "/humanities/arts-aesthetics/visual", Icon: Palette },
  { title: "Sculpture & 3D", href: "/humanities/arts-aesthetics/sculpture", Icon: Hammer },
  { title: "Architecture", href: "/humanities/arts-aesthetics/architecture", Icon: Landmark },
  { title: "Music & Theory", href: "/humanities/arts-aesthetics/music", Icon: QuarterNote },
  { title: "Theater & Dance", href: "/humanities/arts-aesthetics/performance", Icon: Theater },
  { title: "Film & Media", href: "/humanities/arts-aesthetics/film", Icon: Camera },
  { title: "Design", href: "/humanities/arts-aesthetics/design", Icon: PencilRuler },
];

// --- DATA: Theory & Method ---
const theory = [
  {
    title: "Aesthetics",
    desc: "The philosophical study of beauty, taste, and the appreciation of art.",
    href: "/humanities/arts-aesthetics/aesthetics",
    Icon: Eye,
  },
  {
    title: "Art History",
    desc: "The academic study of objects of art in their historical development and stylistic contexts.",
    href: "/humanities/arts-aesthetics/art-history",
    Icon: Landmark,
  },
  {
    title: "Music Theory",
    desc: "The mechanics of music: harmony, melody, rhythm, and structure.",
    href: "/humanities/arts-aesthetics/music-theory",
    Icon: DiscAlbum,
  }
];

// --- REUSABLE COMPONENTS (Locally defined for this page) ---
function TimelineEra({ era, isLast }: { era: typeof periods[0]; isLast: boolean }) {
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

function MediumPill({ item }: { item: typeof mediums[0] }) {
  return (
    <Link
      href={item.href}
      className="flex items-center gap-3 rounded-lg border border-neutral-800 bg-neutral-900/40 p-4 transition-all hover:bg-neutral-800 hover:border-amber-500/20 hover:shadow-lg group"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-neutral-800 text-neutral-400 group-hover:text-amber-400 group-hover:bg-amber-950/30 transition-colors">
        <item.Icon size={16} />
      </div>
      <span className="text-sm font-medium text-neutral-300 group-hover:text-neutral-100">
        {item.title}
      </span>
    </Link>
  );
}

function TheoryCard({ item }: { item: typeof theory[0] }) {
  return (
    <Link
      href={item.href}
      className="block rounded-xl border border-neutral-800 bg-neutral-900/20 p-5 transition-all hover:bg-neutral-800/50 hover:border-neutral-700"
    >
      <div className="flex items-start gap-4">
        <item.Icon className="mt-1 h-5 w-5 text-neutral-500" />
        <div>
          <h3 className="font-semibold text-neutral-200 mb-1">{item.title}</h3>
          <p className="text-xs text-neutral-400">{item.desc}</p>
        </div>
      </div>
    </Link>
  );
}

export default function ArtsPage() {
  return (
    <main className="topic-page theme-humanities lg:px-16">
      <FloatingSymbols symbols={artSymbols} />
      <PageHeader
        eyebrow="Humanities"
        title="Arts & Aesthetics"
        subtitle="The expression of human creativity. Explore the history of visual culture, the diverse mediums of artistic expression, and the philosophy of beauty."
      />

      <div className="grid w-full max-w-7xl grid-cols-1 gap-16 lg:grid-cols-12">
        {/* LEFT: Art History Timeline */}
        <div className="lg:col-span-7">
          <h2 className="mb-8 flex items-center gap-2 text-2xl font-bold text-neutral-100 border-b border-neutral-800 pb-4">
            <Landmark className="text-amber-400" /> Art History
          </h2>
          <div className="pl-2">
            {periods.map((era, index) => (
              <TimelineEra key={era.title} era={era} isLast={index === periods.length - 1} />
            ))}
          </div>
        </div>

        {/* RIGHT: Mediums & Theory */}
        <div className="flex flex-col gap-12 lg:col-span-5 lg:sticky lg:top-24 h-fit">
          
          {/* Mediums */}
          <section>
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-neutral-100">
              <Palette className="text-blue-400" /> Mediums
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mediums.map((item) => (
                <MediumPill key={item.title} item={item} />
              ))}
            </div>
          </section>

          {/* Theory */}
          <section>
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-neutral-100">
              <Eye className="text-emerald-400" /> Theory & Philosophy
            </h2>
            <div className="space-y-3">
              {theory.map((item) => (
                <TheoryCard key={item.title} item={item} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}