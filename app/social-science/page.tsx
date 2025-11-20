// app/social-science/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Handshake,
  Users,
  BrainCog,
  Landmark,
  DollarSign,
  Earth, // Added for Geography
  BookText, // Added for Linguistics
} from "@/components/icons";
import React from "react";

const socialScienceSymbols = [
  "GDP", "NPS", "P\\text{-Value}", "t\\text{-test}", "R", "C", "E", "S", "\\Sigma",
];

export default function SocialSciencePage() {
  const disciplines = [
    {
      title: "Sociology",
      desc: "The scientific study of social behavior, society, patterns of social relationships, social interaction, and culture.",
      href: "/social-science/sociology",
      Icon: Users,
      className: "theme-social-science"
    },
    {
      title: "Psychology",
      desc: "The scientific study of the mind and behavior, exploring mental processes and social dynamics.",
      href: "/social-science/psychology",
      Icon: BrainCog,
      className: "theme-social-science"
    },
    {
      title: "Economics",
      desc: "The study of how people interact with value, production, distribution, and consumption of goods and services.",
      href: "/social-science/economics",
      Icon: DollarSign,
      className: "theme-social-science"
    },
    {
      title: "Political Science",
      desc: "The systematic study of political systems, governance, public policy, and political behavior.",
      href: "/social-science/political-science",
      Icon: Landmark,
      className: "theme-social-science"
    },
    {
      title: "Anthropology",
      desc: "The comprehensive study of humankind, exploring human biology, language, culture, and societies, both past and present.",
      href: "/social-science/anthropology",
      Icon: Handshake,
      className: "theme-social-science"
    },
    {
      title: "Geography",
      desc: "The study of places and the relationships between people and their environments (human and physical).",
      href: "/social-science/geography",
      Icon: Earth,
      className: "theme-social-science"
    },
    {
      title: "Linguistics",
      desc: "The scientific study of language, its structure, meaning, and social context.",
      href: "/social-science/linguistics",
      Icon: BookText,
      className: "theme-social-science"
    },
  ];

  return (
    <main className="topic-page theme-social-science lg:px-16">
      <FloatingSymbols symbols={socialScienceSymbols} />
      <PageHeader
        eyebrow="Discipline Overview"
        title="Social Sciences"
        subtitle="The systematic study of human society and social relationships, exploring collective behavior, institutions, and the foundations of human culture."
      />
      <section className="topic-grid">
        {disciplines.map((branch) => (
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