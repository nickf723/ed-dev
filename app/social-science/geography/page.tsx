// app/social-science/geography/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Earth,
  ChartScatter,
  TreeDeciduous,
  Mountain,
} from "lucide-react";
import React from "react";

const geographySymbols = [
  "\\text{GIS}", "\\text{Map}", "\\text{Scale}", "\\text{Cultures}", "\\text{Pop}", "\\text{Urban}", "\\text{Climate}", "\\text{Region}",
];

const branches = [
  {
    title: "Human Geography",
    desc: "The study of human cultures, communities, economies, and interactions with the environment, often focusing on spatial organization.",
    href: "/social-science/geography/human-geography",
    Icon: TreeDeciduous,
    className: "theme-social-science"
  },
  {
    title: "Physical Geography",
    desc: "The study of natural features and phenomena of the Earth's surface, such as climate, soil, water, and landforms.",
    href: "/social-science/geography/physical-geography",
    Icon: Mountain,
    className: "theme-social-science"
  },
  {
    title: "Geographic Information Systems (GIS)",
    desc: "The powerful technology and methodology for capturing, storing, managing, and analyzing geographically referenced data.",
    href: "/social-science/geography/gis-remote-sensing",
    Icon: ChartScatter,
    className: "theme-social-science"
  },
  {
    title: "Regional Analysis",
    desc: "The comparative study of distinct areas of the world, focusing on their unique combinations of human and physical characteristics.",
    href: "/social-science/geography/regional-analysis",
    Icon: Earth,
    className: "theme-social-science"
  },
];

export default function GeographyPage() {
  return (
    <main className="topic-page theme-social-science lg:px-16">
      <FloatingSymbols symbols={geographySymbols} />
      <PageHeader
        eyebrow="Social Science"
        title="Geography"
        subtitle="The scientific study of places and the relationships between people and their environments, exploring physical properties, spatial distribution, and human-environment interactions."
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