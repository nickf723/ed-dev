"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  LockKeyholeOpen,
  Zap,
  Ghost,
  Sparkle,
  ScanLine,
} from "@/components/icons";
import { BoxSelect } from "lucide-react";

const devSymbols = [
  "CSS", "JS", "3D", "GL", "R3F"
];

export default function DevPlaygroundPage() {
  const experiments = [
    {
      title: "Neon Pulse",
      desc: "High-contrast glowing borders for emphasis.",
      href: "#",
      Icon: Zap,
      className: "card-neon-pulse"
    },
    {
      title: "Gradient Border",
      desc: "Animated RGB gradient rotating around the card.",
      href: "#",
      Icon: BoxSelect,
      className: "card-gradient-border"
    },
    {
      title: "Holographic",
      desc: "Simulated iridescent foil effect on hover.",
      href: "#",
      Icon: Sparkle,
      className: "card-holographic"
    },
    {
      title: "Glass Frost",
      desc: "Heavy blur and noise texture for a frosted look.",
      href: "#",
      Icon: Ghost,
      className: "card-frost"
    },
    {
      title: "Data Stream",
      desc: "CRT scanline animation for retro terminals.",
      href: "#",
      Icon: ScanLine,
      className: "card-data-stream"
    },
    {
      title: "Glitch Text",
      desc: "RGB split animation for errors or tech themes.",
      href: "#",
      Icon: LockKeyholeOpen,
      className: "effect-glitch"
    },
  ];

  return (
    <main className="topic-page theme-dev-playground lg:px-16">
      <FloatingSymbols symbols={devSymbols} />
      <PageHeader
        eyebrow="Laboratory"
        title="UI Playground"
        subtitle="Experimental styles, animations, and component behaviors. A testing ground for the future of the interface."
      />
      <section className="topic-grid">
        {experiments.map((branch) => (
          <TopicCard
            key={branch.title}
            href={branch.href}
            title={branch.title}
            desc={branch.desc}
            Icon={branch.Icon}
            className={branch.className}
          />
        ))}
      </section>

      {/* Button Lab */}
      <section className="w-full max-w-7xl mt-16">
        <h2 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">Button Lab</h2>
        <div className="flex flex-wrap gap-6 justify-center">
            <button className="btn-neon">Neon Action</button>
            <button className="btn-cyber">Cyber Press</button>
            <button className="btn-glass">Glass Click</button>
            <button className="btn-shimmer">Shimmer</button>
        </div>
      </section>
    </main>
  );
}