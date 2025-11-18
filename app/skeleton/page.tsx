// app/skeleton/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import {
  BookMarked,
} from "@/components/icons";
import React from "react";
import TopicCard from "@/components/TopicCard";

// Symbols for the background
const placeholderSymbols = [""];

// Data for the three branches
const placeholderBranches = [
  {
    title: "Title",
    href: "",
    Icon: BookMarked,
    difficulty: "Difficulty",
    description:
      "Description",
    units: [
      { name: "Unit Name", href: "", status: "In Progress" },
    ],
    className: "theme",
    subtitle: "Subtitle",
  },
];

// Main Page Component
export default function placeholderPage() {
  return (
    <main className="topic-page theme-skeleton lg:px-16">
      <FloatingSymbols symbols={placeholderSymbols} />
      <PageHeader
        eyebrow="Discipline Overview"
        title="Title"
        subtitle="Subtitle"
      />

      <section className="grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-1 lg:grid-cols-3">
        {placeholderBranches.map((branch) => (
          <TopicCard
            key={branch.href}
            href={branch.href}
            title={branch.title}
            Icon={branch.Icon}
            desc={branch.description}
            difficulty={branch.difficulty}
            units={branch.units as any}
            className={branch.className}
            subtitle={branch.subtitle}
          />
        ))}
      </section>
    </main>
  );
}