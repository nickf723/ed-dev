// app/formal-science/mathematics/number-theory/tier-0-foundations/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import { Tally5, CirclePlus, CircleSlash } from "@/components/icons";
import React from "react";

const symbols = ["1", "2", "3", "4", "5", "+", "-", "0"];

const topics = [
  {
    title: "Counting & Cardinality",
    href: "/formal-science/mathematics/number-theory/tier-0-foundations/counting-cardinality",
    Icon: Tally5,
    desc: "Counting objects, one-to-one correspondence, and cardinality.",
    className: "theme-number-theory",
  },
  {
    title: "Early Number Concepts",
    href: "/formal-science/mathematics/number-theory/tier-0-foundations/early-number-concepts",
    Icon: CircleSlash,
    desc: "Reading/writing numbers, magnitude, and the concept of zero.",
    className: "theme-number-theory",
  },
  {
    title: "Early Operations",
    href: "/formal-science/mathematics/number-theory/tier-0-foundations/early-operations",
    Icon: CirclePlus,
    desc: "Conceptual addition, subtraction, and composition of numbers.",
    className: "theme-number-theory",
  },
];

export default function Tier0Page() {
  return (
    <main className="topic-page theme-number-theory lg:px-16">
      <FloatingSymbols symbols={symbols} />
      <PageHeader
        eyebrow="Number Theory"
        title="Tier 0: Pre-NT Foundations"
        subtitle="The raw ingredients before formal number theory: counting, comparing, and combining."
      />
      <section className="topic-grid">
        {topics.map((topic) => (
          <TopicCard
            key={topic.href}
            href={topic.href}
            title={topic.title}
            desc={topic.desc}
            Icon={topic.Icon}
            className={topic.className}
          />
        ))}
      </section>
    </main>
  );
}