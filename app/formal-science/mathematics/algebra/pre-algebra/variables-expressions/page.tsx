// app/formal-science/mathematics/algebra/pre-algebra/variables-expressions/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import {
  CollapsibleTopic,
  ContentP,
  ContentSubhead,
  TermDefinition,
  ExampleBlock,
  SideNote,
  PracticeProblem,
} from "@/components/LessonBlocks";
import {
  Key,
  AlertTriangle,
  BookCopy,
  ChevronRight,
  Variable as VariableIcon, // Renamed to avoid conflict
  Puzzle,
  Calculator,
  Lightbulb,
  Equal,
  Replace,
} from "@/components/icons";
import React from "react";
import Link from "next/link";
import { M, MBlock } from "@/components/Math";
import GlossaryTerm from "@/components/GlossaryTerm";
import {
  EvaluateApplet,
  VariableQuiz,
} from "@/components/VariableComponents";

// Symbols for the background
const varSymbols = [
  "x", "y", "z", "a", "b", "n", "t", "f(x)", "2x", "y = mx+b",
];

export default function VariablesAndExpressionsPage() {
  return (
    <main className="topic-page theme-elementary-algebra-foundations lg:px-16">
      <FloatingSymbols symbols={varSymbols} />
      <PageHeader
        eyebrow="Pre-Algebra"
        title="Variables and Expressions"
        subtitle="Learn how letters like 'x' and 'y' are used to represent unknown numbers, forming the building blocks of algebra."
      />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 text-left">
          
          <CollapsibleTopic
            title="1. What is a Variable?"
            icon={VariableIcon}
            startOpen={true}
          >
            <ContentP>
              A <GlossaryTerm term="Variable">Variable</GlossaryTerm> is a symbol, usually a letter, that
              represents an unknown value or a value that can change.
              Think of it as a labeled box that can hold a number.
            </ContentP>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <TermDefinition term="Variable">
                A symbol (like <M>x</M>) that stands for a number.
                <br />
                <strong>Examples:</strong> <M>x, y, a, t, n</M>
              </TermDefinition>
              <TermDefinition term="Constant">
                A fixed number whose value does not change.
                <br />
                <strong>Examples:</strong> <M>5, -10, \pi, 1/2</M>
              </TermDefinition>
              <TermDefinition term="Coefficient">
                A number multiplied by a variable.
                <br />
                <strong>Examples:</strong> <M>5</M> in <M>5x</M>, <M>4</M> in <M>4y^2</M>
              </TermDefinition>
            </div>
            <ExampleBlock>
              <p>
                In the expression <M>2x + 5</M>:
              </p>
              <ul className="mt-2 list-disc pl-5">
                <li>
                  <M>x</M> is the <strong><GlossaryTerm term="Variable">variable</GlossaryTerm></strong>.
                </li>
                <li>
                  <M>2</M> is the <strong><GlossaryTerm term="Coefficient">coefficient</GlossaryTerm></strong> (the number
                  multiplied by the variable).
                </li>
                <li>
                  <M>5</M> is the <strong><GlossaryTerm term="Constant">constant</GlossaryTerm></strong>.
                </li>
              </ul>
            </ExampleBlock>
          </CollapsibleTopic>

          <CollapsibleTopic
            title="2. Algebraic Expressions"
            icon={Puzzle}
          >
            <ContentP>
              An <strong><GlossaryTerm term="Expression">algebraic expression</GlossaryTerm></strong> is a mathematical
              phrase made of variables, constants, and operations
              (+, &minus;, &times;, &divide;).
            </ContentP>
            <TermDefinition term="Expression">
              A combination of numbers, variables, and operations. It does
              <strong>not</strong> have an equals sign.
              <br />
              <strong>Examples:</strong> <M>x + 3</M>, <M>5y</M>,{" "}
              <M>4a - b + 7</M>
            </TermDefinition>
            <SideNote>
              <ContentP>
                An <strong><GlossaryTerm term="Equation">equation</GlossaryTerm></strong> is different. An equation sets
                two expressions equal to each other.
              </ContentP>
              <p>
                <strong><GlossaryTerm term="Expression">Expression</GlossaryTerm>:</strong> <M>2x + 3</M>
              </p>
              <p>
                <strong><GlossaryTerm term="Equation">Equation</GlossaryTerm>:</strong> <M>2x + 3 = 11</M>
              </p>
            </SideNote>
            <PracticeProblem
              question="Write an expression for: 'a number n increased by 10'"
              solution="n + 10"
            />
            <PracticeProblem
              question="Write an expression for: 'the product of 7 and y'"
              solution="7y"
            />
          </CollapsibleTopic>

          <CollapsibleTopic
            title="3. Evaluating Expressions"
            icon={Calculator}
          >
            <ContentP>
              To <GlossaryTerm term="Evaluate">evaluate</GlossaryTerm> an expression means to find its
              numerical value after replacing the variables with specific
              numbers. This is also called <GlossaryTerm term="Substitution">substitution</GlossaryTerm>.
            </ContentP>
            <ExampleBlock>
              <p>
                Evaluate <M>3n - 5</M> when <M>n = 4</M>.
              </p>
              <p>
                1. <strong><GlossaryTerm term="Substitution">Substitute</GlossaryTerm>:</strong> Replace 'n' with '4'.
              </p>
              <p className="pl-4">
                <M>3(4) - 5</M>
              </p>
              <p>
                2. <strong>Calculate (PEMDAS):</strong> Multiply first, then
                subtract.
              </p>
              <p className="pl-4">
                <M>12 - 5</M>
              </p>
              <p>
                3. <strong>Answer:</strong>
              </p>
              <p className="pl-4">
                <M>7</M>
              </p>
            </ExampleBlock>
            <ContentP>
              Try it yourself!
            </ContentP>
            <EvaluateApplet
              expression="5x + 2"
              fn={(x) => 5 * x + 2}
            />
          </CollapsibleTopic>

          <CollapsibleTopic title="4. Test Your Knowledge" icon={Lightbulb}>
            <ContentP>
              See if you can answer these questions about variables and
              expressions.
            </ContentP>
            <VariableQuiz />
          </CollapsibleTopic>
        </div>

        {/* --- Column 2: Aside/Sidebar --- */}
        <aside className="lg:col-span-1 text-left lg:sticky lg:top-24 h-min space-y-8">
          <KeyConceptsAside />
          <CommonPitfallsAside />
          <RelatedTopicsAside />
        </aside>
      </div>
    </main>
  );
}

// --- ASIDE COMPONENTS ---
// (We define these here locally, just like in the other lesson pages)

function KeyConceptsAside() {
  return (
    <div className="glass rounded-2xl border border-cyan-800/40 bg-cyan-900/20 p-6">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-cyan-300">
        <Key size={18} />
        Key Concepts
      </h3>
      <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-300">
        <li>
          A <strong><GlossaryTerm term="Variable">Variable</GlossaryTerm></strong> (like <M>x</M>) is a placeholder for an
          unknown number.
        </li>
        <li>
          A <strong><GlossaryTerm term="Constant">Constant</GlossaryTerm></strong> (like <M>7</M>) is a number that
          doesn't change.
        </li>
        <li>
          An <strong><GlossaryTerm term="Expression">Expression</GlossaryTerm></strong> (like <M>x + 7</M>) is a math phrase
          with no equals sign.
        </li>
        <li>
          An <strong><GlossaryTerm term="Equation">Equation</GlossaryTerm></strong> (like <M>x + 7 = 10</M>) sets two
          expressions equal.
        </li>
        <li>
          <strong><GlossaryTerm term="Evaluate">Evaluate</GlossaryTerm></strong> means to "plug in" a number for the
          variable and find the answer.
        </li>
      </ul>
    </div>
  );
}

function CommonPitfallsAside() {
  return (
    <div className="glass rounded-2xl border border-amber-800/40 bg-amber-900/20 p-6">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-amber-300">
        <AlertTriangle size={18} />
        Common Pitfalls
      </h3>
      <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-300">
        <li>
          Confusing <M>2x</M> (multiplication) with <M>2 + x</M> (addition).
          Remember, a number next to a variable means multiply!
        </li>
        <li>
          Forgetting <GlossaryTerm term="Order of Operations">PEMDAS</GlossaryTerm> when evaluating.
          Always multiply before adding/subtracting.
        </li>
        <li>
          Mixing up "expression" and "equation". If it doesn't have an <M>=</M>{" "}
          sign, it's an expression.
        </li>
      </ul>
    </div>
  );
}

// --- UPDATED RELATED TOPICS ---
function RelatedTopicsAside() {
  return (
    <div className="glass rounded-2xl border border-neutral-800/60 p-6">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-neutral-100">
        <BookCopy size={18} />
        Related Topics
      </h3>
      <ul className="space-y-3">
        <AsideLink
          href="/formal-science/mathematics/number-theory/tier-1-elementary/whole-number-arithmetic"
          title="Whole Number Arithmetic"
          description="Review the numbers and operations used in expressions."
        />
        <AsideLink
          href="/formal-science/mathematics/number-theory/tier-1-elementary/properties-of-operations"
          title="Properties of Operations"
          description="The rules for how expressions can be simplified."
        />
        <AsideLink
          href="/formal-science/mathematics/algebra/pre-algebra/equations-inequalities"
          title="Equations & Inequalities"
          description="The next step: using expressions to find the value of 'x'."
        />
      </ul>
    </div>
  );
}
// --- END UPDATE ---

// --- NEW HELPER COMPONENT: Aside Link ---
function AsideLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  const isPlanned = href === "#";
  return (
    <Link
      href={href}
      className={`group block rounded-lg bg-neutral-900/50 p-4 transition-all duration-200 ${
        isPlanned
          ? "cursor-not-allowed opacity-60"
          : "hover:bg-neutral-800/70 hover:shadow-lg"
      }`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`font-semibold ${
            isPlanned
              ? "text-neutral-400"
              : "text-cyan-300 group-hover:underline"
          }`}
        >
          {title}
        </span>
        {!isPlanned && (
          <ChevronRight className="h-5 w-5 text-neutral-500 transition-transform group-hover:translate-x-1 group-hover:text-cyan-400" />
        )}
      </div>
      <p className="mt-1 text-sm text-neutral-400">{description}</p>
      {isPlanned && (
        <span className="mt-2 inline-block rounded-full bg-neutral-700 px-2 py-0.5 text-xs font-medium text-neutral-300">
          Planned
        </span>
      )}
    </Link>
  );
}