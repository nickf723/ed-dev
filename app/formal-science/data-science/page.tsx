// app/formal-science/data-science/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  ChartScatter,
  BrainCog,
  Table,
  Target,
} from "@/components/icons";
import React from "react";

const dataScienceSymbols = [
  "\\mu", "\\sigma", "\\text{API}", "\\text{ETL}", "\\text{ML}", "\\text{NLP}", "\\lambda", "\\bar{x}",
];

const disciplines = [
  {
    title: "Statistical Inference & Modeling",
    desc: "Applying statistical methods to draw conclusions and quantify uncertainty from observed data.",
    href: "/formal-science/data-science/statistical-modeling",
    Icon: ChartScatter,
    className: "theme-data-science",
  },
  {
    title: "Machine Learning & AI",
    desc: "Building algorithms that learn from data, including supervised, unsupervised, and deep learning techniques.",
    href: "/formal-science/data-science/machine-learning",
    Icon: BrainCog,
    className: "theme-data-science",
  },
  {
    title: "Data Wrangling & Cleaning",
    desc: "The essential process of inspecting, transforming, and cleaning raw data for accurate analysis.",
    href: "/formal-science/data-science/data-wrangling",
    Icon: Table,
    className: "theme-data-science",
  },
  {
    title: "Experiment Design",
    desc: "Designing valid A/B tests and randomized controlled trials to establish causality and measure impact.",
    href: "/formal-science/data-science/experiment-design",
    Icon: Target,
    className: "theme-data-science",
  },
];

export default function DataSciencePage() {
  return (
    <main className="topic-page theme-data-science lg:px-16">
      <FloatingSymbols symbols={dataScienceSymbols} />
      <PageHeader
        eyebrow="Formal Science"
        title="Data Science"
        subtitle="An interdisciplinary field that uses scientific methods, processes, algorithms, and systems to extract knowledge and insights from noisy, structured, and unstructured data."
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