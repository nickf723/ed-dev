// app/applied-science/computer-technology/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Binary,
  Database,
  Terminal,
  Network,
} from "@/components/icons";
import React from "react";

const compTechSymbols = [
  "\\text{Stack}", "\\text{Queue}", "\\text{Tree}", "\\text{HTTP}", "\\text{TCP/IP}", "\\text{OS}", "\\text{Cloud}", "\\text{SQL}",
];

const branches = [
  {
    title: "Data Structures & Algorithms",
    desc: "Practical application of efficient data organization and problem-solving methods.",
    href: "/applied-science/computer-technology/data-structures",
    Icon: Binary,
    className: "theme-applied-science"
  },
  {
    title: "Software Development",
    desc: "The principles and processes behind designing, implementing, and maintaining software applications.",
    href: "/applied-science/computer-technology/software-development",
    Icon: Terminal,
    className: "theme-applied-science"
  },
  {
    title: "Database Systems",
    desc: "Design, implementation, and maintenance of systems for storing and retrieving large amounts of data (SQL, NoSQL).",
    href: "/applied-science/computer-technology/database-systems",
    Icon: Database,
    className: "theme-applied-science"
  },
  {
    title: "System Administration & Cloud",
    desc: "Managing computer systems, servers, networks, and cloud computing infrastructure.",
    href: "/applied-science/computer-technology/system-admin",
    Icon: Network,
    className: "theme-applied-science"
  },
];

export default function ComputerTechnologyPage() {
  return (
    <main className="topic-page theme-applied-science lg:px-16">
      <FloatingSymbols symbols={compTechSymbols} />
      <PageHeader
        eyebrow="Applied Sciences"
        title="Computer Technology"
        subtitle="The practical application of computational and communication systems to manage and process information efficiently in real-world scenarios."
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