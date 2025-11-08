// app/formal-science/mathematics/algebra/elementary-algebra/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Sparkles,
  Equal,
  AreaChart,
  BookMarked,
  ExternalLink,
  ChevronRight,
} from "@/components/icons"; // Using lucide icons via our icons file
import Link from "next/link";
import React from "react";

// Symbols for the background
const elemAlgebraSymbols = [
  "x",
  "y",
  "2a",
  "b²",
  "3x + 1",
  "a+b",
  "(a+b)²",
  "a² + 2ab + b²",
  "ƒ(x)",
  "y = mx + b",
  "ax² + bx + c",
];

// Data for the unit cards
const elementaryAlgebraUnits = [
  {
    title: "Foundations",
    href: "/formal-science/mathematics/algebra/elementary-algebra/foundations",
    Icon: Sparkles,
    description: "The basic building blocks: numbers, variables, and operations.",
    className: "card-theme-elementary-algebra-foundations",
  },
  {
    title: "Solving Equations",
    href: "#",
    Icon: Equal,
    description: "Finding the value of 'x' in linear and simple equations.",
    className: "card-theme-elementary-algebra",
  },
  {
    title: "Functions & Graphs",
    href: "#",
    Icon: AreaChart,
    description: "Visualizing relationships between variables on the coordinate plane.",
    className: "card-theme-elementary-algebra",
  },
];

// Main Page Component
export default function ElementaryAlgebraPage() {
  return (
    <main className="topic-page theme-elementary-algebra lg:px-16">
      <FloatingSymbols symbols={elemAlgebraSymbols} />
      <PageHeader
        eyebrow="Algebra"
        title="Elementary Algebra"
        subtitle="The study of variables, expressions, equations, and functions. This is the first step in abstract mathematical reasoning, providing the tools to model and solve real-world problems."
      />

      <section className="grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-1 lg:grid-cols-3">
        {elementaryAlgebraUnits.map((unit) => (
          <TopicCard
            key={unit.title}
            href={unit.href}
            title={unit.title}
            Icon={unit.Icon}
            desc={unit.description}
            className={unit.className}
          />
        ))}
      </section>

      <section className="mt-16 grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AlgebraReferenceChart />
        </div>
        <div>
          <ExternalResources />
        </div>
      </section>
    </main>
  );
}

// --- Internal Component: Algebra Reference Chart ---
function AlgebraReferenceChart() {
  const terms = [
    {
      term: "Variable",
      def: "A symbol, like 'x' or 'y', that represents an unknown number or value.",
    },
    {
      term: "Coefficient",
      def: "A number multiplied by a variable. In '5x', the coefficient is 5.",
    },
    {
      term: "Term",
      def: "A single number, variable, or product of numbers and variables (e.g., '7', 'x', or '5x²').",
    },
    {
      term: "Expression",
      def: "A group of terms connected by operations (+, -, ×, ÷). E.g., '3x + 1'.",
    },
    {
      term: "Equation",
      def: "A statement that two expressions are equal, using an equals sign (=). E.g., '3x + 1 = 10'.",
    },
    {
      term: "Function",
      def: "A rule that assigns exactly one output (y) for each input (x). E.g., 'f(x) = 2x + 1'.",
    },
  ];

  return (
    <div className="glass h-full rounded-2xl border border-neutral-800/60 p-6">
      <div className="flex items-center gap-3">
        <BookMarked className="h-6 w-6 text-pink-400" />
        <h2 className="text-xl font-bold text-neutral-100">
          Key Concepts Reference
        </h2>
      </div>
      <p className="mb-6 mt-2 text-sm text-neutral-300">
        A quick reference for the core building blocks of algebra.
      </p>
      <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        {terms.map((item) => (
          <div key={item.term} className="rounded-lg bg-neutral-900/50 p-3">
            <dt className="text-sm font-semibold text-pink-300">
              {item.term}
            </dt>
            <dd className="mt-1 text-sm text-neutral-300">{item.def}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

// --- Internal Component: External Resources ---
function ExternalResources() {
  const resources = [
    {
      name: "Khan Academy (Algebra 1)",
      href: "https://www.khanacademy.org/math/algebra",
      desc: "Comprehensive video lessons and practice.",
    },
    {
      name: "Paul's Online Math Notes",
      href: "https://tutorial.math.lamar.edu/Classes/Alg/Alg.aspx",
      desc: "In-depth university-level class notes.",
    },
    {
      name: "WolframAlpha",
      href: "https://www.wolframalpha.com/",
      desc: "Powerful computational engine to check work.",
    },
  ];

  return (
    <div className="glass h-full rounded-2xl border border-neutral-800/60 p-6">
      <div className="flex items-center gap-3">
        <ExternalLink className="h-6 w-6 text-pink-400" />
        <h2 className="text-xl font-bold text-neutral-100">
          External Resources
        </h2>
      </div>
      <p className="mb-6 mt-2 text-sm text-neutral-300">
        Helpful sites for practice, explanation, and computation.
      </p>
      <ul className="space-y-3">
        {resources.map((res) => (
          <li key={res.name}>
            <Link
              href={res.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-lg bg-neutral-900/50 p-4 transition-all duration-200 hover:bg-neutral-800/70 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-pink-300 group-hover:underline">
                  {res.name}
                </span>
                <ChevronRight className="h-5 w-5 text-neutral-500 transition-transform group-hover:translate-x-1 group-hover:text-pink-400" />
              </div>
              <p className="mt-1 text-sm text-neutral-400">{res.desc}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}