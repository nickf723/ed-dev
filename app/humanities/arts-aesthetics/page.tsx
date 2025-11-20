"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Palette,
  QuarterNote,
  Theater,
  Camera,
  Landmark,
  Eye,
} from "@/components/icons";
import React from "react";

const artSymbols = [
  "RGB", "CMYK", "Tempo", "Harmony", "Perspective", "Form", "Space", "Timbre",
];

export default function ArtsPage() {
  const branches = [
    {
      title: "Visual Arts",
      desc: "The study and practice of painting, sculpture, drawing, printmaking, and other static visual forms.",
      href: "/humanities/arts-aesthetics/visual-arts",
      Icon: Palette,
      className: "theme-humanities",
    },
    {
      title: "Musicology & Theory",
      desc: "The scholarly analysis of music, including its history, cultural context, structure, harmony, and composition.",
      href: "/humanities/arts-aesthetics/music",
      Icon: QuarterNote,
      className: "theme-humanities",
    },
    {
      title: "Performing Arts",
      desc: "Arts performed for an audience, including dance, theatre, opera, and performance art.",
      href: "/humanities/arts-aesthetics/performing-arts",
      Icon: Theater,
      className: "theme-humanities",
    },
    {
      title: "Film & Media Studies",
      desc: "The critical analysis of cinema, television, and new media as art forms and cultural artifacts.",
      href: "/humanities/arts-aesthetics/film",
      Icon: Camera,
      className: "theme-humanities",
    },
    {
      title: "Art History",
      desc: "The historical evolution of the visual arts, exploring style, context, and meaning across eras.",
      href: "/humanities/arts-aesthetics/art-history",
      Icon: Landmark,
      className: "theme-humanities",
    },
    {
      title: "Aesthetics",
      desc: "A branch of philosophy dealing with the nature of beauty, art, and taste, and the creation of appreciation of beauty.",
      href: "/humanities/arts-aesthetics/aesthetics",
      Icon: Eye,
      className: "theme-humanities",
    },
  ];

  return (
    <main className="topic-page theme-humanities lg:px-16">
      <FloatingSymbols symbols={artSymbols} />
      <PageHeader
        eyebrow="Humanities"
        title="Arts & Aesthetics"
        subtitle="The study of human creative skill and imagination, analyzing how we express emotion, beauty, and meaning through sensory experiences."
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