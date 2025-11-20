"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
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
  Landmark
} from "@/components/icons";
import React from "react";

const historySymbols = [
  "1066", "BC", "AD", "Circa", "Zeitgeist", "Pax Romana", "Dynasty", "Revolution",
];

export default function HistoryPage() {
  // Division 1: Chronological
  const chronology = [
    {
      title: "Ancient History",
      desc: "From the dawn of civilization and writing to the fall of Rome (c. 3000 BC – 476 AD).",
      href: "/humanities/history/ancient",
      Icon: Pyramid,
      className: "theme-humanities",
    },
    {
      title: "Medieval History",
      desc: "The Middle Ages (c. 476 – 1500), characterizing the rise of feudalism, religious empires, and trade routes.",
      href: "/humanities/history/medieval",
      Icon: Castle,
      className: "theme-humanities",
    },
    {
      title: "Modern History",
      desc: "From the 15th century Renaissance to the present Information Age.",
      href: "/humanities/history/modern",
      Icon: Factory,
      className: "theme-humanities",
    },
  ];

  // Division 2: Thematic/Technology
  const thematic = [
    {
      title: "Military History",
      desc: "The history of warfare, strategy, battles, and the impact of conflict on societies.",
      href: "/humanities/history/military",
      Icon: Sword,
      className: "theme-humanities",
    },
    {
      title: "History of Technology",
      desc: "Tracing the development of tools, machines, and techniques—from the wheel to the microchip.",
      href: "/humanities/history/technology",
      Icon: Wrench,
      className: "theme-humanities",
    },
    {
      title: "Cultural & Social History",
      desc: "The history of ordinary people, customs, arts, and social structures, beyond just kings and wars.",
      href: "/humanities/history/cultural",
      Icon: Users,
      className: "theme-humanities",
    },
  ];

  // Division 3: Methodology
  const methodology = [
    {
      title: "Archaeology",
      desc: "The study of human activity through the recovery and analysis of material culture (artifacts).",
      href: "/humanities/history/archaeology",
      Icon: Pickaxe,
      className: "theme-humanities",
    },
    {
      title: "Historiography",
      desc: "The history of history itself. How interpretations of the past change over time.",
      href: "/humanities/history/historiography",
      Icon: BookText,
      className: "theme-humanities",
    },
    {
      title: "World History",
      desc: "Examining history from a global perspective, focusing on cross-cultural interactions.",
      href: "/humanities/history/world",
      Icon: Globe,
      className: "theme-humanities",
    },
  ];

  return (
    <main className="topic-page theme-humanities lg:px-16">
      <FloatingSymbols symbols={historySymbols} />
      <PageHeader
        eyebrow="Humanities"
        title="History"
        subtitle="The continuous, systematic narrative of past human events. We explore history not just as a timeline, but through distinct lenses of time, theme, and method."
      />

      {/* Section 1: Chronological Eras */}
      <div className="w-full max-w-6xl text-left mb-6">
        <h2 className="text-2xl font-bold text-neutral-200 mb-4 flex items-center gap-2 border-b border-neutral-800 pb-2">
          <Hourglass className="text-amber-400" /> Chronological Eras
        </h2>
      </div>
      <section className="topic-card mb-16">
        {chronology.map((branch) => (
          <TopicCard
            key={branch.href}
            href={branch.href}
            title={branch.title}
            desc={branch.desc}
            Icon={branch.Icon}
            className={branch.className}
          />
        ))}
      </section>

      {/* Section 2: Thematic & Technological */}
      <div className="w-full max-w-6xl text-left mb-6">
        <h2 className="text-2xl font-bold text-neutral-200 mb-4 flex items-center gap-2 border-b border-neutral-800 pb-2">
          <Landmark className="text-blue-400" /> Thematic Approaches
        </h2>
      </div>
      <section className="topic-card mb-16">
        {thematic.map((branch) => (
          <TopicCard
            key={branch.href}
            href={branch.href}
            title={branch.title}
            desc={branch.desc}
            Icon={branch.Icon}
            className={branch.className}
          />
        ))}
      </section>

      {/* Section 3: Methodology */}
      <div className="w-full max-w-6xl text-left mb-6">
        <h2 className="text-2xl font-bold text-neutral-200 mb-4 flex items-center gap-2 border-b border-neutral-800 pb-2">
          <Pickaxe className="text-emerald-400" /> Methodology
        </h2>
      </div>
      <section className="topic-card">
        {methodology.map((branch) => (
          <TopicCard
            key={branch.href}
            href={branch.href}
            title={branch.title}
            desc={branch.desc}
            Icon={branch.Icon}
            className={branch.className}
          />
        ))}
      </section>
    </main>
  );
}