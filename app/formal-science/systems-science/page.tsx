// app/formal-science/systems-science/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Network,
  Waves,
  RefreshCcw,
  Sigma,
} from "@/components/icons";
import React from "react";

const systemsScienceSymbols = [
  "\\Sigma F", "I \\to O", "\\text{Feedback}", "E=mc^2", "\\frac{dx}{dt}", "\\approx", "\\lambda", "\\phi",
];

const branches = [
  {
    title: "General Systems Theory",
    desc: "The conceptual framework for studying systems in nature, society, and science, independent of their specific domain.",
    href: "/formal-science/systems-science/general-systems-theory",
    Icon: Network,
    className: "theme-systems-science",
  },
  {
    title: "Complexity and Chaos",
    desc: "Analyzing non-linear dynamics, emergence, sensitivity to initial conditions, and chaotic behavior in systems.",
    href: "/formal-science/systems-science/complexity-chaos",
    Icon: Waves,
    className: "theme-systems-science",
  },
  {
    title: "Cybernetics & Control",
    desc: "The study of communication and control in regulatory systems (natural and artificial), focusing on feedback loops.",
    href: "/formal-science/systems-science/cybernetics-control",
    Icon: RefreshCcw,
    className: "theme-systems-science",
  },
  {
    title: "System Dynamics",
    desc: "Modeling complex problems by mapping causal links and analyzing how policy and structure influence behavior over time.",
    href: "/formal-science/systems-science/system-dynamics",
    Icon: Sigma,
    className: "theme-systems-science",
  },
];

export default function SystemsSciencePage() {
  return (
    <main className="topic-page theme-systems-science lg:px-16">
      <FloatingSymbols symbols={systemsScienceSymbols} />
      <PageHeader
        eyebrow="Formal Science"
        title="Systems Science"
        subtitle="The interdisciplinary field that studies the nature of systems—from atoms to ecosystems—developing abstract models and principles applicable across all scientific domains."
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