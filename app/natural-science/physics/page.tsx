// app/natural-science/physics/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  RollerCoaster,
  Zap,
  Waves,
  Flame,
  Orbit,
  Hourglass,

} from "@/components/icons";

// Symbols for the background
const physicsSymbols = [
  "F=ma","E=mc²","λ","v","c","ħ","G","k","Ω","μ₀","ε₀","T","S","Ψ","ΔxΔp ≥ ħ/2",
];

export default function PhysicsPage() {
  const branches = [
    {
      title: "Classical Mechanics",
      desc: "The study of motion, forces, and energy for macroscopic objects. (e.g., Kinematics, Dynamics, Statics)",
      href: "/natural-science/physics/classical-mechanics",
      Icon: RollerCoaster,
      className: "theme-classical-mechanics topic-card-wide",
    },
    {
      title: "Electromagnetism",
      desc: "The study of electric and magnetic fields and their interaction with matter.",
      href: "/natural-science/physics/electromagnetism",
      Icon: Zap,
      className: "theme-electromagnetism topic-card-wide",
    },
    {
      title: "Thermodynamics",
      desc: "The study of heat, work, temperature, and energy in physical systems.",
      href: "/natural-science/physics/thermodynamics",
      Icon: Flame,
      className: "theme-thermodynamics topic-card-wide",
    },
    {
      title: "Waves and Optics",
      desc: "The study of oscillations, wave propagation, and the behavior of light.",
      href: "/natural-science/physics/waves-optics",
      Icon: Waves,
      className: "theme-waves-optics topic-card-wide",
    },
    {
      title: "Quantum Mechanics",
      desc: "The study of physics at the atomic and subatomic level, where particles behave in probabilistic ways.",
      href: "/natural-science/physics/quantum-mechanics",
      Icon: Orbit,
      className: "theme-quantum-mechanics topic-card-wide",
    },
    {
      title: "Relativity",
      desc: "The study of motion at high velocities and the nature of gravity and spacetime.",
      href: "/natural-science/physics/relativity",
      Icon: Hourglass,
      className: "theme-relativity topic-card-wide",
    },
  ];

  return (
    <main className="topic-page theme-physics lg:px-16">
      <FloatingSymbols symbols={physicsSymbols} />
      <PageHeader
        eyebrow="Natural Science"
        title="Physics"
        subtitle="The fundamental study of matter, energy, motion, and force, and how they interact on every scale, from the subatomic to the cosmic."
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