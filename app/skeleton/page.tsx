"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import {
  Component,
} from "@/components/icons"; // Assuming Image is exported or available from lucide-react
import React from "react";
import TopicCard from "@/components/TopicCard";
import { Gamepad2Icon, ImageIcon, LayoutTemplate } from "lucide-react";

const placeholderSymbols = ["?","!","{ }","< >"];

const placeholderBranches = [
  {
    title: "Component Gallery",
    href: "/skeleton/component-gallery",
    Icon: Component,
    difficulty: "Reference",
    description: "A visual guide to all available static lesson blocks: typography, definitions, side notes, and lists.",
    className: "theme-skeleton",
    subtitle: "Static Blocks",
  },
  {
    title: "Multimedia & Links",
    href: "/skeleton/multimedia-gallery",
    Icon: ImageIcon,
    difficulty: "Reference",
    description: "Showcase of visual media components, video embeds, and internal/external navigation links.",
    className: "theme-skeleton",
    subtitle: "Media Blocks",
  },
  {
    title: "Interactive Template",
    href: "/skeleton/interactive-template",
    Icon: Gamepad2Icon,
    difficulty: "Template",
    description: "Layout examples for applets, quizzes, tabs, and practice problems.",
    className: "theme-skeleton",
    subtitle: "Dynamic Blocks",
  },
  {
    title: "Full Lesson Layout",
    href: "/skeleton/full-lesson",
    Icon: LayoutTemplate,
    difficulty: "Example",
    description: "A completely assembled dummy lesson showing how all pieces fit together in a real page structure.",
    className: "theme-skeleton",
    subtitle: "Page Structure",
  },
];

export default function SkeletonPage() {
  return (
    <main className="topic-page theme-skeleton lg:px-16">
      <FloatingSymbols symbols={placeholderSymbols} />
      <PageHeader
        eyebrow="Design System"
        title="Skeleton Pages"
        subtitle="Templates and component references for building consistent, high-quality lessons across the platform."
      />

      <section className="grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {placeholderBranches.map((branch) => (
          <TopicCard
            key={branch.href}
            href={branch.href}
            title={branch.title}
            Icon={branch.Icon}
            desc={branch.description}
            difficulty={branch.difficulty}
            className={branch.className}
            subtitle={branch.subtitle}
          />
        ))}
      </section>
    </main>
  );
}