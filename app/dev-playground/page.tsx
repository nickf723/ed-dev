// app/formal-science/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Calculator,
  LockKeyholeOpen,
  Network,
  ChartScatter,
  Terminal,
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
      title: "Rainbow Effect",
      desc: "Placeholder text effect for demonstration purposes.",
      href: "",
      Icon: LockKeyholeOpen,
      className: "text-rainbow-smear"
    },
    {
      title: "Move Effect",
      desc: "Placeholder text effect for demonstration purposes.",
      href: "",
      Icon: LockKeyholeOpen,
      className: "effect-shift"
    },
    {
      title: "Placeholder Effect",
      desc: "Placeholder text effect for demonstration purposes.",
      href: "",
      Icon: LockKeyholeOpen,
      className: ""
    },
        {
      title: "Glitch Effect",
      desc: "Placeholder text effect for demonstration purposes.",
      href: "",
      Icon: LockKeyholeOpen,
      className: "effect-glitch"
    },
        {
      title: "Placeholder Effect",
      desc: "Placeholder text effect for demonstration purposes.",
      href: "",
      Icon: LockKeyholeOpen,
      className: ""
    },
        {
      title: "Placeholder Effect",
      desc: "Placeholder text effect for demonstration purposes.",
      href: "",
      Icon: LockKeyholeOpen,
      className: ""
    },
        {
      title: "Glow Up Effect",
      desc: "Placeholder text effect for demonstration purposes.",
      href: "",
      Icon: LockKeyholeOpen,
      className: "effect-glow"
    },
        {
      title: "Placeholder Effect",
      desc: "Placeholder text effect for demonstration purposes.",
      href: "",
      Icon: LockKeyholeOpen,
      className: ""
    },
        {
      title: "Placeholder Effect",
      desc: "Placeholder text effect for demonstration purposes.",
      href: "",
      Icon: LockKeyholeOpen,
      className: ""
    },
        {
      title: "Hover Effect",
      desc: "Placeholder text effect for demonstration purposes.",
      href: "",
      Icon: LockKeyholeOpen,
      className: "effect-cursor"
    },
        {
      title: "Placeholder Effect",
      desc: "Placeholder text effect for demonstration purposes.",
      href: "",
      Icon: LockKeyholeOpen,
      className: ""
    },
        {
      title: "Placeholder Effect",
      desc: "Placeholder text effect for demonstration purposes.",
      href: "",
      Icon: LockKeyholeOpen,
      className: ""
    },
  ];

  return (
    <main className="topic-page theme-dev-playground lg:px-16">
      <FloatingSymbols symbols={formalScienceSymbols} />
      <PageHeader
        eyebrow="Discipline Overview"
        title="Page Header"
        subtitle="Subtitle that should be fairly long to show how it looks on multiple lines in this particular design."
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