// app/formal-science/mathematics/statistics/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  ChartScatter,
  Dices,
  BarChart,
  Target,
} from "@/components/icons";
import React from "react";

const statisticsSymbols = [
  "\\mu", "\\sigma^2", "P(A)", "\\bar{x}", "Z", "t", "\\chi^2", "n", "\\approx",
];

const branches = [
  {
    title: "Descriptive Statistics",
    desc: "Collecting, organizing, and summarizing data using measures of central tendency (mean, median, mode).",
    href: "/formal-science/mathematics/statistics/descriptive-statistics",
    Icon: BarChart,
    className: "theme-statistics",
  },
  {
    title: "Probability Theory",
    desc: "The study of randomness and uncertainty, providing the foundation for statistical inference.",
    href: "/formal-science/mathematics/statistics/probability-theory",
    Icon: Dices,
    className: "theme-statistics",
  },
  {
    title: "Inferential Statistics",
    desc: "Drawing conclusions about a large population from a small sample of data.",
    href: "/formal-science/mathematics/statistics/inferential-statistics",
    Icon: Target,
    className: "theme-statistics",
  },
  {
    title: "Regression & Modeling",
    desc: "Techniques for modeling the relationship between variables and making predictions.",
    href: "/formal-science/mathematics/statistics/regression-modeling",
    Icon: ChartScatter,
    className: "theme-statistics",
  },
];

export default function StatisticsPage() {
  return (
    <main className="topic-page theme-statistics lg:px-16">
      <FloatingSymbols symbols={statisticsSymbols} />
      <PageHeader
        eyebrow="Mathematics"
        title="Statistics & Probability"
        subtitle="The discipline that concerns the collection, organization, analysis, interpretation, and presentation of data. It is the math that helps us manage uncertainty and find meaning in the real world."
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