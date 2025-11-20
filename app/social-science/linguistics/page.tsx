// app/social-science/linguistics/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  BookText,
  Network,
  Terminal,
  BrainCog,
} from "@/components/icons";
import React from "react";

const linguisticsSymbols = [
  "\\text{Noun}", "\\text{Verb}", "\\text{Syntax}", "\\text{Semantics}", "\\text{Phoneme}", "\\text{Morpheme}", "\\text{Chomsky}", "\\text{Wernicke}",
];

const branches = [
  {
    title: "Phonology & Phonetics",
    desc: "The study of speech sounds: how they are produced (phonetics) and how they function in a language system (phonology).",
    href: "/social-science/linguistics/phonology-phonetics",
    Icon: BookText,
    className: "theme-social-science"
  },
  {
    title: "Syntax & Semantics",
    desc: "The study of sentence structure (syntax) and the study of meaning in language (semantics).",
    href: "/social-science/linguistics/syntax-semantics",
    Icon: Network,
    className: "theme-social-science"
  },
  {
    title: "Sociolinguistics & Pragmatics",
    desc: "The study of language in relation to social factors and the role of context in interpreting meaning.",
    href: "/social-science/linguistics/sociolinguistics",
    Icon: BrainCog,
    className: "theme-social-science"
  },
  {
    title: "Computational Linguistics",
    desc: "The application of computer science to the study of natural language (e.g., Natural Language Processing - NLP).",
    href: "/social-science/linguistics/computational-linguistics",
    Icon: Terminal,
    className: "theme-social-science"
  },
];

export default function LinguisticsPage() {
  return (
    <main className="topic-page theme-social-science lg:px-16">
      <FloatingSymbols symbols={linguisticsSymbols} />
      <PageHeader
        eyebrow="Social Science"
        title="Linguistics"
        subtitle="The scientific study of language, encompassing its structure, meaning, social context, and the cognitive processes underlying its acquisition and use."
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