// app/formal-science/information-science/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Binary,
  Database,
  ChartScatter,
  Lock,
} from "@/components/icons";
import React from "react";

const informationScienceSymbols = [
  "\\text{log}_2", "\\text{byte}", "\\text{bit}", "\\text{HTML}", "\\text{SQL}", "\\text{KB}", "\\text{GB}", "\\text{TB}",
];

const disciplines = [
  {
    title: "Information Theory",
    desc: "The mathematical study of the quantification, storage, and communication of information (e.g., entropy and channel capacity).",
    href: "/formal-science/information-science/information-theory",
    Icon: Binary,
    className: "theme-information-science",
  },
  {
    title: "Information Retrieval",
    desc: "The techniques and algorithms for searching, storing, and organizing data to facilitate discovery (e.g., search engines).",
    href: "/formal-science/information-science/information-retrieval",
    Icon: Database,
    className: "theme-information-science",
  },
  {
    title: "Data Visualization & Communication",
    desc: "The graphical representation of data and information to enable quick, effective communication and discovery.",
    href: "/formal-science/information-science/data-visualization",
    Icon: ChartScatter,
    className: "theme-information-science",
  },
  {
    title: "Information Security",
    desc: "The study and practice of protecting information systems from unauthorized access, use, disclosure, disruption, modification, or destruction.",
    href: "/formal-science/information-science/information-security",
    Icon: Lock,
    className: "theme-information-science",
  },
];

export default function InformationSciencePage() {
  return (
    <main className="topic-page theme-information-science lg:px-16">
      <FloatingSymbols symbols={informationScienceSymbols} />
      <PageHeader
        eyebrow="Formal Science"
        title="Information Science"
        subtitle="The academic field concerned with the collection, manipulation, storage, retrieval, and dissemination of information in various digital and physical formats."
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