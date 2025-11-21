"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  ChartScatter,
  Dices,
  BarChart,
  Target,
  TrendingUp,
  AlertTriangle,
  Sigma
} from "@/components/icons";
import React from "react";

const statisticsSymbols = [
  "\\mu", "\\sigma^2", "P(A)", "\\bar{x}", "Z", "t", "\\chi^2", "n", "\\approx",
];

const branches = [
  {
    title: "Descriptive Statistics",
    desc: "Summarizing data sets using measures like mean, median, and standard deviation.",
    href: "/formal-science/mathematics/statistics/descriptive-statistics",
    Icon: BarChart,
    className: "theme-statistics",
  },
  {
    title: "Probability Theory",
    desc: "The mathematical framework for quantifying uncertainty and randomness.",
    href: "/formal-science/mathematics/statistics/probability-theory",
    Icon: Dices,
    className: "theme-statistics",
  },
  {
    title: "Inferential Statistics",
    desc: "Drawing conclusions about a population based on a sample (Hypothesis Testing, Confidence Intervals).",
    href: "/formal-science/mathematics/statistics/inferential-statistics",
    Icon: Target,
    className: "theme-statistics",
  },
  {
    title: "Regression & Modeling",
    desc: "Modeling relationships between variables to make predictions.",
    href: "/formal-science/mathematics/statistics/regression-modeling",
    Icon: ChartScatter,
    className: "theme-statistics",
  },
];

// --- DATA: Common Pitfalls ---
const pitfalls = [
  { title: "Correlation ≠ Causation", desc: "Just because two things move together doesn't mean one causes the other." },
  { title: "P-Hacking", desc: "Checking many hypotheses until one appears statistically significant by chance." },
  { title: "Sampling Bias", desc: "Drawing conclusions from a group that doesn't represent the whole." },
];

export default function StatisticsPage() {
  return (
    <main className="topic-page theme-statistics lg:px-16">
      <FloatingSymbols symbols={statisticsSymbols} />
      <PageHeader
        eyebrow="Mathematics"
        title="Statistics & Probability"
        subtitle="The science of learning from data. It provides the tools to navigate uncertainty and find the signal in the noise."
      />

      <div className="grid w-full max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
           <div className="mb-8 flex items-center gap-2 border-b border-neutral-800 pb-4">
            <TrendingUp className="text-purple-400" />
            <h2 className="text-2xl font-bold text-neutral-100">Core Topics</h2>
          </div>
          <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {branches.map((branch) => (
              <TopicCard key={branch.href} {...branch} />
            ))}
          </section>
        </div>

        <div className="flex flex-col gap-8 lg:col-span-4 lg:sticky lg:top-24 h-fit">
           {/* Pitfalls */}
           <div className="glass p-6 rounded-2xl border border-amber-900/20 bg-gradient-to-b from-neutral-900/80 to-neutral-950/80">
             <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-amber-400 flex items-center gap-2">
               <AlertTriangle size={16} /> Common Pitfalls
             </h3>
             <div className="flex flex-col gap-4">
               {pitfalls.map((p) => (
                 <div key={p.title}>
                   <h4 className="text-sm font-bold text-neutral-200 mb-1">{p.title}</h4>
                   <p className="text-xs text-neutral-400 leading-relaxed">{p.desc}</p>
                 </div>
               ))}
             </div>
          </div>
          
          {/* The Bell Curve */}
          <div className="p-5 rounded-xl border border-dashed border-neutral-700/50 bg-neutral-900/20 text-center">
             <Sigma className="mx-auto mb-2 text-purple-500" size={24} />
             <h4 className="text-sm font-bold text-neutral-300 mb-1">Normal Distribution</h4>
             <p className="text-xs text-neutral-400">
               Why do so many natural phenomena (height, test scores, errors) form a Bell Curve? The <strong>Central Limit Theorem</strong> explains it.
             </p>
          </div>
        </div>
      </div>
    </main>
  );
}