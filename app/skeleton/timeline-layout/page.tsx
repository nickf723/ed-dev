"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import {
  Globe,
  Rocket,
  Zap,
  Binary
} from "@/components/icons";
import Link from "next/link";
import React from "react";
import { Cpu, History } from "lucide-react";

// Data for the timeline
const timelineEvents = [
  {
    year: "1843",
    title: "The First Algorithm",
    desc: "Ada Lovelace writes the first algorithm intended for processing on Charles Babbage's Analytical Engine.",
    Icon: Binary,
    href: "#"
  },
  {
    year: "1936",
    title: "The Turing Machine",
    desc: "Alan Turing formalizes the concept of algorithms and computation with his universal machine model.",
    Icon: Cpu,
    href: "#"
  },
  {
    year: "1969",
    title: "ARPANET",
    desc: "The first packet-switching network is established, laying the technical foundation for the modern Internet.",
    Icon: Globe,
    href: "#"
  },
  {
    year: "1991",
    title: "The World Wide Web",
    desc: "Tim Berners-Lee releases the first web browser and web server, democratizing information access.",
    Icon: Zap,
    href: "#"
  },
  {
    year: "Future",
    title: "Quantum Supremacy",
    desc: "Computing moves beyond binary bits to qubits, solving problems previously thought impossible.",
    Icon: Rocket,
    href: "#"
  }
];

// Reusable Timeline Item Component
function TimelineItem({ item, isLast }: { item: typeof timelineEvents[0]; isLast: boolean }) {
  return (
    <div className="relative flex gap-6 pb-12 group">
      {/* Vertical Connector Line */}
      {!isLast && (
        <div className="absolute left-[23px] top-12 bottom-0 w-0.5 bg-neutral-800 group-hover:bg-indigo-500/50 transition-colors duration-500" />
      )}
      
      {/* Icon Bubble */}
      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 shadow-md transition-all duration-300 group-hover:border-indigo-500/50 group-hover:bg-indigo-950/30 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]">
        <item.Icon className="h-5 w-5 text-neutral-400 group-hover:text-indigo-400 transition-colors" />
      </div>

      {/* Card Content */}
      <Link href={item.href} className="flex-1 block">
        <div className="glass p-5 rounded-xl border border-white/5 hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <h3 className="text-xl font-bold text-neutral-100 group-hover:text-indigo-200 transition-colors">
              {item.title}
            </h3>
            <span className="text-xs font-mono font-semibold text-indigo-400/80 bg-indigo-900/20 px-2 py-1 rounded uppercase tracking-wider">
              {item.year}
            </span>
          </div>
          <p className="text-sm text-neutral-400 leading-relaxed">{item.desc}</p>
        </div>
      </Link>
    </div>
  );
}

export default function TimelineLayoutPage() {
  return (
    <main className="topic-page theme-skeleton lg:px-16">
      <FloatingSymbols symbols={["t=0", "t=1", "->", "=>"]} />
      <PageHeader
        eyebrow="Layout Pattern"
        title="Timeline Layout"
        subtitle="A specialized layout for displaying chronological events, evolutionary steps, or sequential processes."
      />

      <div className="w-full max-w-3xl mx-auto text-left">
        <div className="mb-8 flex items-center gap-2 border-b border-neutral-800 pb-4">
            <History className="text-indigo-400" />
            <h2 className="text-2xl font-bold text-neutral-100">Chronology</h2>
        </div>

        <div className="pl-2">
            {timelineEvents.map((event, index) => (
                <TimelineItem 
                    key={event.title} 
                    item={event} 
                    isLast={index === timelineEvents.length - 1} 
                />
            ))}
        </div>
      </div>
    </main>
  );
}