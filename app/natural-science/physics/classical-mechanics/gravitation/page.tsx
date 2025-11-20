// app/natural-science/physics/classical-mechanics/gravitation/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Orbit,
  Earth,
  SquareEqual,
  Move,
} from "@/components/icons";
import React from "react";

const gravitationSymbols = [
  "G", "\\text{F} = \\frac{Gm_1m_2}{r^2}", "g", "\\text{v}_{esc}", "\\text{AU}", "\\text{T}", "\\text{r}",
];

const topics = [
  {
    title: "Universal Law of Gravitation",
    desc: "Newton's fundamental law describing the attractive force between any two objects with mass.",
    href: "/natural-science/physics/classical-mechanics/gravitation/universal-law",
    Icon: SquareEqual,
    className: "theme-classical-mechanics",
    subtitle: "The Attractive Force"
  },
  {
    title: "Acceleration due to Gravity",
    desc: "Analyzing the constant acceleration near a massive body and how 'g' changes with altitude.",
    href: "/natural-science/physics/classical-mechanics/gravitation/acceleration-g",
    Icon: Earth,
    className: "theme-classical-mechanics",
    subtitle: "The Constant Fall"
  },
  {
    title: "Orbital Mechanics",
    desc: "Applying Newton's laws to planetary and satellite motion, including Kepler's Laws.",
    href: "/natural-science/physics/classical-mechanics/gravitation/orbital-mechanics",
    Icon: Orbit,
    className: "theme-classical-mechanics topic-card-wide",
    subtitle: "Motion in Space"
  },
  {
    title: "Gravitational Potential Energy",
    desc: "Energy stored in a system due to the gravitational interaction of two or more masses.",
    href: "/natural-science/physics/classical-mechanics/gravitation/potential-energy",
    Icon: Move,
    className: "theme-classical-mechanics",
    subtitle: "Stored Energy"
  },
];

export default function GravitationPage() {
  return (
    <main className="topic-page theme-classical-mechanics lg:px-16">
      <FloatingSymbols symbols={gravitationSymbols} />
      <PageHeader
        eyebrow="Classical Mechanics"
        title="Gravitation"
        subtitle="The study of the fundamental attractive force between masses, from how objects fall on Earth to the orbits of planets and stars."
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
            subtitle={topic.subtitle}
          />
        ))}
      </section>
    </main>
  );
}