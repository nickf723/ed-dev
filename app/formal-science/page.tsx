// app/formal-science/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Calculator,
  BrainCircuit,
  Network,
  ChartScatter,
  BookText,
  Binary,
} from "@/components/icons";

const formalScienceSymbols = [
  "{}",
  "[]",
  "λ",
  "∀",
  "∃",
  "∈",
  "σ",
  "μ",
  "()",
  "⇒",
  "⇔",
  "∴",
  "f(x)",
  "0",
  "1",
];

export default function FormalSciencePage() {
  const disciplines = [
    {
      title: "Mathematics",
      desc: "The study of quantity, structure, space, and change.",
      href: "/formal-science/mathematics",
      Icon: Calculator,
      className: "theme-math"
    },
    {
      title: "Logic",
      desc: "The study of reasoning, inference, and validity.",
      href: "/formal-science/logic",
      Icon: BrainCircuit,
      className: "theme-logic"
    },
    {
      title: "Systems Science",
      desc: "The study of complex systems, their structure, and behavior.",
      href: "/formal-science/systems-science",
      Icon: Network,
      className: "theme-systems-science"
    },
    {
      title: "Data Science",
      desc: "Extracting knowledge and insights from structured and unstructured data.",
      href: "/formal-science/data-science",
      Icon: ChartScatter,
      className: "theme-data-science"
    },
    {
      title: "Information Science",
      desc: "The study of information processing, storage, and retrieval.",
      href: "/formal-science/information-science",
      Icon: BookText,
      className: "theme-information-science"
    },
    {
      title: "Computer Science",
      desc: "The study of computation, automation, and information.",
      href: "/formal-science/computer-science",
      Icon: Binary,
      className: "theme-computer-science"
    },
  ];

  return (
    <main className="topic-page theme-formal-science lg:px-16">
      <FloatingSymbols symbols={formalScienceSymbols} />
      <PageHeader
        eyebrow="Discipline Overview"
        title="Formal Sciences"
        subtitle="The formal sciences are disciplines concerned with abstract structures, distinct from the empirical sciences. They are based on formal systems, logic, and mathematics."
      />
      <section className="topic-grid">
        {disciplines.map((branch) => (
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