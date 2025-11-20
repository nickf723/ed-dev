// app/social-science/psychology/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  BrainCog,
  Lightbulb,
  Users,
  FlaskConical,
} from "@/components/icons";
import React from "react";

const psychologySymbols = [
  "\\text{ID}", "\\text{EGO}", "\\text{SUPEREGO}", "\\text{Pavlov}", "\\text{Skinner}", "\\text{IQ}", "\\text{r}", "\\alpha",
];

const branches = [
  {
    title: "Cognitive Psychology",
    desc: "The study of mental processes such as memory, thinking, problem-solving, language, and attention.",
    href: "/social-science/psychology/cognitive-psychology",
    Icon: BrainCog,
    className: "theme-social-science"
  },
  {
    title: "Developmental Psychology",
    desc: "The scientific study of how and why human beings change over the course of their life.",
    href: "/social-science/psychology/developmental-psychology",
    Icon: Lightbulb,
    className: "theme-social-science"
  },
  {
    title: "Social Psychology",
    desc: "The study of how social influence, social perception, and social interaction affect individual and group behavior.",
    href: "/social-science/psychology/social-psychology",
    Icon: Users,
    className: "theme-social-science"
  },
  {
    title: "Biological Basis of Behavior",
    desc: "Exploring the physiological, genetic, and evolutionary mechanisms underlying behavior and mental processes.",
    href: "/social-science/psychology/biological-basis",
    Icon: FlaskConical,
    className: "theme-social-science"
  },
];

export default function PsychologyPage() {
  return (
    <main className="topic-page theme-social-science lg:px-16">
      <FloatingSymbols symbols={psychologySymbols} />
      <PageHeader
        eyebrow="Social Science"
        title="Psychology"
        subtitle="The scientific study of the mind and behavior. It seeks to understand human thought processes, emotional states, and the factors that drive individual and group actions."
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