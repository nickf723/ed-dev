// app/formal-science/computer-science/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Terminal,
  BrainCog,
  Network,
  Lock,
} from "@/components/icons";
import React from "react";

const csSymbols = [
  "0", "1", "\\text{CPU}", "\\text{RAM}", "\\text{ALGO}", "\\text{NP}", "\\text{P}", "\\text{HALT}",
];

const branches = [
  {
    title: "Algorithms & Complexity",
    desc: "The study of efficient methods for solving problems and the resources required (time and space).",
    href: "/formal-science/computer-science/algorithms-complexity",
    Icon: Terminal,
    className: "theme-computer-science",
  },
  {
    title: "Artificial Intelligence",
    desc: "The design of intelligent agents that perceive their environment and take actions maximizing their chance of success.",
    href: "/formal-science/computer-science/artificial-intelligence",
    Icon: BrainCog,
    className: "theme-computer-science",
  },
  {
    title: "Networking & Distributed Systems",
    desc: "How computers connect and communicate, and how systems are built across multiple machines.",
    href: "/formal-science/computer-science/networking",
    Icon: Network,
    className: "theme-computer-science",
  },
  {
    title: "Security & Cryptography",
    desc: "The techniques for securing data, ensuring privacy, and building unforgeable digital communications.",
    href: "/formal-science/computer-science/security-cryptography",
    Icon: Lock,
    className: "theme-computer-science",
  },
];

export default function ComputerSciencePage() {
  return (
    <main className="topic-page theme-computer-science lg:px-16">
      <FloatingSymbols symbols={csSymbols} />
      <PageHeader
        eyebrow="Formal Science"
        title="Computer Science"
        subtitle="The study of computation, automation, and information. It deals with theoretical foundations, algorithmic methods, and practical implementation of information processing systems."
      />
      <section className="topic-grid">
        {branches.map((branch) => (
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