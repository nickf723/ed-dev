// app/formal-science/mathematics/discrete-mathematics/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  LockKeyholeOpen,
  Tally5,
  Network,
  Binary,
} from "@/components/icons";
import React from "react";

const discreteMathSymbols = [
  "\\forall", "\\exists", "\\land", "\\lor", "\\neg", "0", "1", "P\\to Q",
];

const branches = [
  {
    title: "Logic & Proof",
    desc: "The formal foundations of mathematical statements, truth tables, and constructing valid arguments.",
    href: "/formal-science/mathematics/discrete-mathematics/logic-proof",
    Icon: LockKeyholeOpen,
    className: "theme-discrete-math",
  },
  {
    title: "Set Theory",
    desc: "The foundational language for defining collections of distinct objects and their relationships.",
    href: "/formal-science/mathematics/discrete-mathematics/set-theory",
    Icon: Tally5,
    className: "theme-discrete-math",
  },
  {
    title: "Graph Theory",
    desc: "The study of vertices and edges, used to model networks, relationships, and optimization problems.",
    href: "/formal-science/mathematics/discrete-mathematics/graph-theory",
    Icon: Network,
    className: "theme-discrete-math",
  },
  {
    title: "Combinatorics",
    desc: "The art of counting: permutations, combinations, and probability in finite sets.",
    href: "/formal-science/mathematics/discrete-mathematics/combinatorics",
    Icon: Binary,
    className: "theme-discrete-math",
  },
];

export default function DiscreteMathematicsPage() {
  return (
    <main className="topic-page theme-discrete-math lg:px-16">
      <FloatingSymbols symbols={discreteMathSymbols} />
      <PageHeader
        eyebrow="Mathematics"
        title="Discrete Mathematics"
        subtitle="The study of countable, distinctly separate structures. It forms the foundational logical and combinatorial backbone of computer science and complex systems modeling."
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