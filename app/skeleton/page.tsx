"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import {
  Component,
  Scale
} from "@/components/icons";
import React from "react";
import TopicCard from "@/components/TopicCard";
import { Gamepad2, History, ImageIcon, LayoutDashboard, LayoutTemplate } from "lucide-react";

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
    Icon: Gamepad2,
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
  {
    title: "Timeline Layout",
    href: "/skeleton/timeline-layout",
    Icon: History,
    difficulty: "Layout",
    description: "A vertical chronological layout for displaying sequences, history, or step-by-step evolution.",
    className: "theme-skeleton",
    subtitle: "Sequential Data",
  },
  {
    title: "Dashboard Hub",
    href: "/skeleton/dashboard-layout",
    Icon: LayoutDashboard,
    difficulty: "Layout",
    description: "A dense, information-rich hub with a main grid and sticky sidebar widgets (Concept Maps, Ladders).",
    className: "theme-skeleton",
    subtitle: "Topic Hub",
  },
  {
    title: "Comparative Layout",
    href: "/skeleton/comparative-layout",
    Icon: Scale,
    difficulty: "Layout",
    description: "Side-by-side comparisons and 'Vs' cards to build intuition through contrast.",
    className: "theme-skeleton",
    subtitle: "Contrast & Intuition",
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