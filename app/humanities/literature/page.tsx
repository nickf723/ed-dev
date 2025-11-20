"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import {
  BookOpen,
  Pen,
  VenetianMask,
  Lightbulb,
  Speech,
  Globe,
  BookText,
  Sparkle,
  Zap,
  Coffee,
  Search,
  Mic,
  Flower2,
  Factory,
  ChevronRight,
} from "@/components/icons";
import React from "react";
import Link from "next/link";
import { Feather, Monitor, TypeIcon } from "lucide-react";

const litSymbols = [
  "Metaphor", "Simile", "Haiku", "Iambic", "Prose", "Syntax", "Theme", "Motif",
];

// --- DATA: Chronological Movements ---
const movements = [
  {
    title: "Classical & Mythic",
    range: "800 BC – 400 AD",
    desc: "The foundations of Western storytelling: Epic poetry, tragedy, and the hero's journey (Homer, Sophocles).",
    href: "/humanities/literature/classical",
    Icon: BookOpen, // Represents the 'source'
  },
  {
    title: "Medieval & Renaissance",
    range: "400 – 1600",
    desc: "Chivalric romance, spiritual allegory, and the rebirth of humanism (Dante, Chaucer, Shakespeare).",
    href: "/humanities/literature/renaissance",
    Icon: Feather, // Quill pen era
  },
  {
    title: "Enlightenment & Romanticism",
    range: "1600 – 1850",
    desc: "The tension between reason, satire, and the explosion of emotion and nature (Voltaire, Austen, Shelley).",
    href: "/humanities/literature/romanticism",
    Icon: Flower2, // Nature/Emotion
  },
  {
    title: "Realism & Victorian",
    range: "1850 – 1900",
    desc: "Depicting life as it actually is, focusing on social issues and the industrial world (Dickens, Tolstoy).",
    href: "/humanities/literature/realism",
    Icon: Factory, 
  },
  {
    title: "Modernism",
    range: "1900 – 1945",
    desc: "Breaking traditional forms. Stream of consciousness, fragmentation, and disillusionment (Woolf, Joyce).",
    href: "/humanities/literature/modernism",
    Icon: Zap, 
  },
  {
    title: "Postmodern & Contemporary",
    range: "1945 – Present",
    desc: "Metafiction, unreliability, magical realism, and the digital age (Morrison, Rushdie).",
    href: "/humanities/literature/contemporary",
    Icon: Monitor, 
  },
];

// --- DATA: Literary Forms (Themes) ---
const forms = [
  { title: "Poetry & Poetics", href: "/humanities/literature/poetry", Icon: Sparkle },
  { title: "The Novel", href: "/humanities/literature/novel", Icon: BookText },
  { title: "Drama & Performance", href: "/humanities/literature/drama", Icon: VenetianMask },
  { title: "Short Story", href: "/humanities/literature/short-story", Icon: Coffee },
  { title: "Screenwriting", href: "/humanities/literature/screenwriting", Icon: Monitor },
  { title: "Non-Fiction & Essays", href: "/humanities/literature/non-fiction", Icon: Pen },
];

// --- DATA: Methodology ---
const methodology = [
  {
    title: "Literary Theory",
    desc: "The critical lenses used to analyze text (Structuralism, Feminism, Marxist theory).",
    href: "/humanities/literature/theory",
    Icon: Search,
  },
  {
    title: "Comparative Literature",
    desc: "Studying literature across cultural, linguistic, and national borders.",
    href: "/humanities/literature/comparative",
    Icon: Globe,
  },
  {
    title: "Rhetoric",
    desc: "The art of persuasion and effective speaking or writing.",
    href: "/humanities/literature/rhetoric",
    Icon: Speech,
  },
  {
    title: "Linguistics",
    desc: "The scientific study of language structure, grammar, and evolution.",
    href: "/humanities/literature/linguistics",
    Icon: TypeIcon,
  }
];

// --- COMPONENT: Timeline Era Card ---
function TimelineEra({ era, isLast }: { era: typeof movements[0]; isLast: boolean }) {
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
function ThemePill({ item }: { item: typeof forms[0] }) {
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

// --- COMPONENT: Compact Card ---
function CompactCard({ item }: { item: typeof methodology[0] }) {
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

export default function LiteraturePage() {
  return (
    <main className="topic-page theme-humanities lg:px-16">
      <FloatingSymbols symbols={litSymbols} />
      <PageHeader
        eyebrow="Humanities"
        title="Literature & Language"
        subtitle="The written and spoken word. Explore the evolution of storytelling from ancient epics to digital narratives, and the structures of language itself."
      />

      <div className="grid w-full max-w-7xl grid-cols-1 gap-16 lg:grid-cols-12">
        {/* LEFT: Movements Timeline */}
        <div className="lg:col-span-7">
          <h2 className="mb-8 flex items-center gap-2 text-2xl font-bold text-neutral-100 border-b border-neutral-800 pb-4">
            <Feather className="text-amber-400" /> Literary Movements
          </h2>
          <div className="pl-2">
            {movements.map((era, index) => (
              <TimelineEra key={era.title} era={era} isLast={index === movements.length - 1} />
            ))}
          </div>
        </div>

        {/* RIGHT: Forms & Methods */}
        <div className="flex flex-col gap-12 lg:col-span-5 lg:sticky lg:top-24 h-fit">
          
          {/* Forms */}
          <section>
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-neutral-100">
              <BookText className="text-blue-400" /> Forms & Genres
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {forms.map((item) => (
                <ThemePill key={item.title} item={item} />
              ))}
            </div>
          </section>

          {/* Methodology */}
          <section>
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-neutral-100">
              <Search className="text-emerald-400" /> Critical Analysis
            </h2>
            <div className="space-y-3">
              {methodology.map((method) => (
                <CompactCard key={method.title} item={method} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}