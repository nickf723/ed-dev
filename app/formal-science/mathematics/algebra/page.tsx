// app/formal-science/mathematics/algebra/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import {
  SquareFunction,
  Grid3X3,
  BookMarked,
  CircleDotDashed,
} from "@/components/icons";
import React from "react";
import TopicCard from "@/components/TopicCard";

// Symbols for the background
const algebraSymbols = [
  "x",
  "y",
  "ƒ(x)",
  "a(b+c)",
  "ax²+bx+c",
  "β",
  "γ",
  "δ",
  "v",
  "w",
  "A⁻¹",
  "det(A)",
  "V ⊕ W",
  "ker(T)",
  "Im(T)",
  "G/H",
  "R[x]",
  "ℤ/nℤ",
];

// Data for the three branches
const algebraBranches = [
  {
    title: "Pre-Algebra",
    href: "/formal-science/mathematics/algebra/pre-algebra",
    Icon: BookMarked,
    difficulty: "Foundational",
    description:
      "The essential building blocks: numbers, operations, variables, and properties.",
    units: [
      // --- REMOVED THIS UNIT ---
      // {
      //   name: "Numbers and Operations",
      //   href: "/formal-science/mathematics/algebra/pre-algebra/num-ops",
      //   status: "In Progress",
      // },
      // -------------------------
      { name: "Variables & Expressions", href: "/formal-science/mathematics/algebra/pre-algebra/variables-expressions", status: "In Progress" },
      { name: "Algebraic Properties", href: "/formal-science/mathematics/algebra/pre-algebra/algebraic-properties", status: "In Progress" },
    ],
    className: "theme-elementary-algebra-foundations",
    subtitle: "1 2 3 x y z",
  },
  {
    title: "Elementary Algebra",
    href: "/formal-science/mathematics/algebra/elementary-algebra",
    Icon: SquareFunction,
    difficulty: "High School / Early College",
    description:
      "The foundational study of variables, expressions, equations, and functions. This is the language of problem-solving.",
    units: [
      { name: "Solving Equations", href: "#", status: "Planned" },
      { name: "Functions & Graphs", href: "#", status: "Planned" },
    ],
    className: "theme-elementary-algebra",
    subtitle: "X Y Z",
  },
  {
    title: "Linear Algebra",
    href: "/formal-science/mathematics/algebra/linear-algebra",
    Icon: Grid3X3,
    difficulty: "Undergraduate Level",
    description:
      "The study of vectors, matrices, and systems of linear equations. Essential for computer graphics, data science, and physics.",
    units: [
      { name: "Vectors & Spaces", href: "#", status: "Planned" },
      { name: "Matrices & Transformations", href: "#", status: "Planned" },
      { name: "Eigenvalues & Eigenvectors", href: "#", status: "Planned" },
    ],
    className: "theme-linear-algebra",
    subtitle: "",
  },
  {
    title: "Abstract Algebra",
    href: "/formal-science/mathematics/algebra/abstract-algebra",
    Icon: CircleDotDashed,
    difficulty: "Advanced Undergraduate / Graduate Level",
    description:
      "The formal study of abstract algebraic structures like groups, rings, and fields. Explores the deep rules governing mathematics.",
    units: [
      { name: "Group Theory", href: "#", status: "Planned" },
      { name: "Rings & Fields", href: "#", status: "Planned" },
      { name: "Galois Theory", href: "#", status: "Planned" },
    ],
    className: "theme-abstract-algebra",
    subtitle: "",
  },
];

// Main Page Component
export default function AlgebraPage() {
  return (
    <main className="topic-page theme-algebra lg:px-16">
      <FloatingSymbols symbols={algebraSymbols} />
      <PageHeader
        eyebrow="Discipline Overview"
        title="Algebra"
        subtitle="The study of mathematical symbols and the rules for manipulating them. Algebra bridges the gap from arithmetic to higher mathematics by introducing variables and abstract structures."
      />

      <section className="grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-1 lg:grid-cols-3">
        {algebraBranches.map((branch) => (
          <TopicCard
            key={branch.href}
            href={branch.href}
            title={branch.title}
            Icon={branch.Icon}
            desc={branch.description} // Mapped from description
            difficulty={branch.difficulty} // Pass difficulty
            units={branch.units as any} // Pass units (cast to satisfy Unit[])
            className={branch.className} // Pass className
            subtitle={branch.subtitle}
          />
        ))}
      </section>
    </main>
  );
}