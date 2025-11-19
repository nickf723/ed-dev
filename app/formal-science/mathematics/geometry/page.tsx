// app/formal-science/mathematics/geometry/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Square,
  Network,
  Calculator,
  Tangent,
  GitMerge,
} from "@/components/icons";
import React from "react";

const geometrySymbols = [
  "\\triangle", "\\pi", "\\alpha", "a^2+b^2=c^2", "\\sin(\\theta)", "\\cos(\\theta)", "E=mc^2", "\\nabla",
];

const branches = [
  {
    title: "Euclidean Geometry",
    desc: "The classical study of points, lines, planes, and shapes on a flat surface.",
    href: "/formal-science/mathematics/geometry/euclidean",
    Icon: Square,
    className: "theme-geometry",
  },
  {
    title: "Coordinate Geometry",
    desc: "Connecting algebra and geometry by representing shapes and figures on a coordinate plane.",
    href: "/formal-science/mathematics/geometry/coordinate",
    Icon: Network,
    className: "theme-geometry",
  },
  {
    title: "Trigonometry",
    desc: "The study of the relationships between the sides and angles of triangles and periodic functions.",
    href: "/formal-science/mathematics/geometry/trigonometry",
    Icon: Tangent,
    className: "theme-geometry",
  },
  {
    title: "Topology & Non-Euclidean",
    desc: "Advanced studies of shapes that stretch or bend (topology) or curved space (relativity).",
    href: "/formal-science/mathematics/geometry/advanced",
    Icon: GitMerge,
    className: "theme-geometry",
  },
];

export default function GeometryPage() {
  return (
    <main className="topic-page theme-geometry lg:px-16">
      <FloatingSymbols symbols={geometrySymbols} />
      <PageHeader
        eyebrow="Mathematics"
        title="Geometry & Trigonometry"
        subtitle="The study of space, shape, size, and relative position of figures. It is mathematics made visual, providing the framework for architecture, art, and physics."
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