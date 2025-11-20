// app/social-science/sociology/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Users,
  Network,
  Scale,
  BrainCog,
} from "@/components/icons";
import React from "react";

const sociologySymbols = [
  "\\text{Class}", "\\text{Status}", "\\text{Role}", "\\text{Norm}", "\\text{Culture}", "\\text{Institution}", "\\text{Deviance}", "\\text{Socialization}",
];

const branches = [
  {
    title: "Foundations & Theory",
    desc: "Key sociological theorists (Marx, Weber, Durkheim) and major perspectives (functionalism, conflict theory, symbolic interactionism).",
    href: "/social-science/sociology/foundations-theory",
    Icon: BrainCog,
    className: "theme-social-science",
  },
  {
    title: "Social Structure & Groups",
    desc: "The study of social hierarchies, groups, statuses, roles, and how social institutions operate.",
    href: "/social-science/sociology/social-structure",
    Icon: Users,
    className: "theme-social-science",
  },
  {
    title: "Culture, Norms, & Deviance",
    desc: "Analyzing shared beliefs, values, and practices, and the study of behavior that violates social norms.",
    href: "/social-science/sociology/culture-deviance",
    Icon: Network,
    className: "theme-social-science",
  },
  {
    title: "Inequality & Stratification",
    desc: "Examining systems of inequality based on class, race, and gender, and the concept of social mobility.",
    href: "/social-science/sociology/inequality-stratification",
    Icon: Scale,
    className: "theme-social-science",
  },
];

export default function SociologyPage() {
  return (
    <main className="topic-page theme-social-science lg:px-16">
      <FloatingSymbols symbols={sociologySymbols} />
      <PageHeader
        eyebrow="Social Science"
        title="Sociology"
        subtitle="The scientific study of social life, social change, and the social causes and consequences of human behavior. It is the framework for understanding human society."
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