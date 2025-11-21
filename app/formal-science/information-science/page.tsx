"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Binary,
  Database,
  ChartScatter,
  Lock,
  Server,
  Pyramid
} from "@/components/icons";
import React from "react";

const informationScienceSymbols = [
  "\\text{log}_2", "\\text{byte}", "\\text{bit}", "\\text{HTML}", "\\text{SQL}", "\\text{KB}", "\\text{GB}", "\\text{TB}",
];

const disciplines = [
  {
    title: "Information Theory",
    desc: "Quantifying information. How much can be compressed? How fast can it be sent? (Entropy, Bits).",
    href: "/formal-science/information-science/information-theory",
    Icon: Binary,
    className: "theme-information-science",
  },
  {
    title: "Information Retrieval",
    desc: "The science of search engines. Indexing, querying, and ranking data to find what is relevant.",
    href: "/formal-science/information-science/information-retrieval",
    Icon: Database,
    className: "theme-information-science",
  },
  {
    title: "Data Visualization",
    desc: "Translating abstract information into graphical representations to enable human understanding.",
    href: "/formal-science/information-science/data-visualization",
    Icon: ChartScatter,
    className: "theme-information-science",
  },
  {
    title: "InfoSec",
    desc: "Protecting the confidentiality, integrity, and availability of information assets.",
    href: "/formal-science/information-science/information-security",
    Icon: Lock,
    className: "theme-information-science",
  },
];

// --- DATA: DIKW Pyramid ---
const dikw = [
  { title: "Wisdom", desc: "Applied understanding", color: "bg-lime-500" },
  { title: "Knowledge", desc: "Contextualized info", color: "bg-lime-600" },
  { title: "Information", desc: "Processed data", color: "bg-lime-700" },
  { title: "Data", desc: "Raw facts & symbols", color: "bg-lime-900" },
];

export default function InformationSciencePage() {
  return (
    <main className="topic-page theme-information-science lg:px-16">
      <FloatingSymbols symbols={informationScienceSymbols} />
      <PageHeader
        eyebrow="Formal Science"
        title="Information Science"
        subtitle="The study of the lifecycle of information: creation, organization, management, retrieval, and dissemination."
      />

      <div className="grid w-full max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
           <div className="mb-8 flex items-center gap-2 border-b border-neutral-800 pb-4">
            <Server className="text-lime-400" />
            <h2 className="text-2xl font-bold text-neutral-100">Fields of Study</h2>
          </div>
          <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {disciplines.map((branch) => (
              <TopicCard key={branch.href} {...branch} />
            ))}
          </section>
        </div>

        <div className="flex flex-col gap-8 lg:col-span-4 lg:sticky lg:top-24 h-fit">
          <div className="glass p-6 rounded-2xl border border-lime-900/20 bg-gradient-to-b from-neutral-900/80 to-neutral-950/80">
             <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-lime-400 flex items-center gap-2">
               <Pyramid size={16} /> The DIKW Hierarchy
             </h3>
             <div className="flex flex-col gap-1 items-center">
               {dikw.map((level, i) => (
                 <div 
                    key={level.title} 
                    className={`w-full rounded-md p-2 text-center text-white shadow-sm transition-transform hover:scale-105 ${level.color}`}
                    style={{ width: `${40 + (i * 20)}%`}}
                 >
                   <div className="font-bold text-xs uppercase">{level.title}</div>
                   <div className="text-[10px] opacity-80">{level.desc}</div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}