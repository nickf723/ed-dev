// app/formal-science/logic/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  LockKeyholeOpen,
  Binary,
  GitMerge,
  BookText,
} from "@/components/icons";
import React from "react";

const logicSymbols = [
  "\\forall", "\\exists", "\\land", "\\lor", "\\neg", "\\to", "\\iff", "\\therefore",
];

const branches = [
  {
    title: "Propositional Logic",
    desc: "The study of simple, declarative statements and the logical connectives that combine them (AND, OR, NOT).",
    href: "/formal-science/logic/propositional-logic",
    Icon: LockKeyholeOpen,
    className: "theme-logic",
  },
  {
    title: "Predicate Logic",
    desc: "Extending logic to include predicates, variables, and quantifiers (for all, there exists).",
    href: "/formal-science/logic/predicate-logic",
    Icon: Binary,
    className: "theme-logic",
  },
  {
    title: "Argument Structure & Fallacies",
    desc: "Analyzing the structure of arguments (deductive, inductive) and identifying common logical errors.",
    href: "/formal-science/logic/argument-structure",
    Icon: BookText,
    className: "theme-logic",
  },
  {
    title: "Modal & Advanced Logics",
    desc: "The study of necessity and possibility, and logics dealing with time, knowledge, and belief.",
    href: "/formal-science/logic/modal-logics",
    Icon: GitMerge,
    className: "theme-logic",
  },
];

export default function LogicPage() {
  return (
    <main className="topic-page theme-logic lg:px-16">
      <FloatingSymbols symbols={logicSymbols} />
      <PageHeader
        eyebrow="Formal Science"
        title="Logic"
        subtitle="The study of correct reasoning. Logic provides the universal, formal framework for constructing valid arguments and determining truth, forming the foundation for mathematics and computing."
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