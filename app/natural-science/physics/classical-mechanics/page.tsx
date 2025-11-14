// app/natural-science/physics/classical-mechanics/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  TrendingUp,
  Move,
  Replace,
  RotateCw,
  Orbit,
  Zap, // Using Zap for Energy
} from "@/components/icons";

// Symbols for the background
const mechanicsSymbols = [
  "F=ma", "p=mv", "KE=½mv²", "PE=mgh", "v", "a", "t", "d", "ω", "τ", "g", "W=Fd",
];

export default function ClassicalMechanicsPage() {
  const topics = [
    {
      title: "Kinematics",
      desc: "The study of motion without considering its causes. (e.g., displacement, velocity, acceleration)",
      href: "/natural-science/physics/classical-mechanics/kinematics", // Placeholder for /kinematics
      Icon: TrendingUp,
      className: "theme-classical-mechanics",
      subtitle: "Describing Motion"
    },
    {
      title: "Dynamics (Newton's Laws)",
      desc: "The study of how forces cause motion and changes in motion.",
      href: "/natural-science/physics/classical-mechanics/dynamics",
      Icon: Move,
      className: "theme-classical-mechanics topic-card-wide",
      subtitle: "Explaining Motion"
    },
    {
      title: "Work and Energy",
      desc: "Using the concepts of work, kinetic energy, and potential energy to solve problems.",
      href: "/natural-science/physics/classical-mechanics/work-energy",
      Icon: Zap,
      className: "theme-classical-mechanics topic-card-wide",
      subtitle: "The Conservation of Energy"
    },
    {
      title: "Momentum and Collisions",
      desc: "The study of 'quantity of motion' and its conservation during interactions.",
      href: "/natural-science/physics/classical-mechanics/momentum-collisions",
      Icon: Replace,
      className: "theme-classical-mechanics",
      subtitle: "Conservation of Momentum"
    },
    {
      title: "Rotational Motion",
      desc: "The study of objects that spin or rotate, including torque and angular momentum.",
      href: "/natural-science/physics/classical-mechanics/rotational-motion",
      Icon: RotateCw,
      className: "theme-classical-mechanics",
      subtitle: "Spinning Objects"
    },
    {
      title: "Gravitation",
      desc: "The study of the fundamental force of attraction between masses, from apples to planets.",
      href: "/natural-science/physics/classical-mechanics/gravitation",
      Icon: Orbit,
      className: "theme-classical-mechanics",
      subtitle: "Universal Forces"
    },
  ];

  return (
    <main className="topic-page theme-classical-mechanics lg:px-16">
      <FloatingSymbols symbols={mechanicsSymbols} />
      <PageHeader
        eyebrow="Physics"
        title="Classical Mechanics"
        subtitle="The study of the motion of macroscopic objects, from projectiles to planets. This branch of physics describes the physical world we experience every day using the foundational laws set forth by Newton."
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