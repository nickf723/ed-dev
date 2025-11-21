"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  ChartScatter,
  BrainCog,
  Table,
  Target,
  Database,
  Eye,
} from "@/components/icons";
import React from "react";
import { Filter, Layers } from "lucide-react";

const dataScienceSymbols = [
  "\\mu", "\\sigma", "\\text{API}", "\\text{ETL}", "\\text{ML}", "\\text{NLP}", "\\lambda", "\\bar{x}",
];

const disciplines = [
  {
    title: "Statistical Inference",
    desc: "Using data from a sample to make estimates or test hypotheses about the larger population.",
    href: "/formal-science/data-science/statistical-modeling",
    Icon: ChartScatter,
    className: "theme-data-science",
  },
  {
    title: "Machine Learning",
    desc: "Algorithms that improve automatically through experience. From Regression to Deep Learning.",
    href: "/formal-science/data-science/machine-learning",
    Icon: BrainCog,
    className: "theme-data-science",
  },
  {
    title: "Data Wrangling",
    desc: "The messy but crucial process of cleaning and transforming raw data into a usable format.",
    href: "/formal-science/data-science/data-wrangling",
    Icon: Table,
    className: "theme-data-science",
  },
  {
    title: "Experiment Design",
    desc: "Designing A/B tests and trials to establish causality rather than just correlation.",
    href: "/formal-science/data-science/experiment-design",
    Icon: Target,
    className: "theme-data-science",
  },
];

// --- DATA: The Pipeline ---
const pipeline = [
  { title: "Collection", desc: "APIs, Sensors, Scraping", Icon: Database },
  { title: "Processing", desc: "Cleaning, ETL, SQL", Icon: Filter },
  { title: "Exploration", desc: "EDA, Visualization", Icon: Eye },
  { title: "Modeling", desc: "Prediction, Classification", Icon: BrainCog },
];

function PipelineStep({ item, isLast }: { item: typeof pipeline[0]; isLast: boolean }) {
  return (
    <div className="relative flex gap-4 pb-8 last:pb-0 group">
      {!isLast && <div className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-neutral-800 group-hover:bg-orange-500/30 transition-colors" />}
      <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-neutral-500 group-hover:bg-orange-900/30 group-hover:text-orange-400 transition-colors">
        <item.Icon size={14} />
      </div>
      <div>
        <h4 className="text-sm font-bold text-neutral-200">{item.title}</h4>
        <p className="text-xs text-neutral-500">{item.desc}</p>
      </div>
    </div>
  );
}

export default function DataSciencePage() {
  return (
    <main className="topic-page theme-data-science lg:px-16">
      <FloatingSymbols symbols={dataScienceSymbols} />
      <PageHeader
        eyebrow="Formal Science"
        title="Data Science"
        subtitle="The extraction of knowledge from data. It combines statistics, computer science, and domain expertise to reveal trends and make predictions."
      />

      <div className="grid w-full max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
           <div className="mb-8 flex items-center gap-2 border-b border-neutral-800 pb-4">
            <Database className="text-orange-400" />
            <h2 className="text-2xl font-bold text-neutral-100">Key Areas</h2>
          </div>
          <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {disciplines.map((branch) => (
              <TopicCard key={branch.href} {...branch} />
            ))}
          </section>
        </div>

        <div className="flex flex-col gap-8 lg:col-span-4 lg:sticky lg:top-24 h-fit">
          <div className="glass p-6 rounded-2xl border border-orange-900/20 bg-gradient-to-b from-neutral-900/80 to-neutral-950/80">
             <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-orange-400 flex items-center gap-2">
               <Layers size={16} /> The Data Pipeline
             </h3>
             <div>
               {pipeline.map((p, i) => <PipelineStep key={p.title} item={p} isLast={i === pipeline.length - 1} />)}
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}