// app/formal-science/mathematics/algebra/pre-algebra/ratios-rates-proportions/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import {
  CollapsibleTopic,
  ContentP,
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
  Percent,
  Equal,
  Calculator,
  SquareDivide,
  X as XIcon,
} from "@/components/icons";
import React from "react";
import Link from "next/link";
import { M, MBlock } from "@/components/Math";
import GlossaryTerm from "@/components/GlossaryTerm";

// Symbols for the background
const ratiosSymbols = [
  "2:3", "\\frac{4}{x} = \\frac{8}{10}", "\\text{MPH}", "\\text{USD}", "\\text{Ratio}", "\\text{Rate}", "\\text{Proportion}", "100\\%",
];

// --- ASIDE COMPONENTS (Helper functions included locally) ---
function AsideLink({ href, title, description, }: { href: string; title: string; description: string; }) {
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

function KeyConceptsAside() {
  return (
    <div className="glass rounded-2xl border border-cyan-800/40 bg-cyan-900/20 p-6">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-cyan-300">
        <Key size={18} />
        Key Concepts
      </h3>
      <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-300">
        <li>
          A <GlossaryTerm term="Ratio">Ratio</GlossaryTerm> compares two quantities ($a:b$).
        </li>
        <li>
          A <GlossaryTerm term="Rate">Rate</GlossaryTerm> compares two quantities with *different* units ($\text{'km'}$ and $\text{'hr'}$).
        </li>
        <li>
          A <GlossaryTerm term="Unit Rate">Unit Rate</GlossaryTerm> has a denominator of 1 ($\text{'dollars'}/1\text{'pound'}$).
        </li>
        <li>
          A <GlossaryTerm term="Proportion">Proportion</GlossaryTerm> sets two <GlossaryTerm term="Ratio">ratios</GlossaryTerm> equal and is solved using cross-multiplication.
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
          Writing ratios in the wrong order (e.g., mixing up the order of $a:b$ vs $b:a$).
        </li>
        <li>
          Forgetting to simplify fractions in ratios to their lowest terms.
        </li>
        <li>
          Mixing units when setting up a <GlossaryTerm term="Proportion">proportion</GlossaryTerm> (e.g., comparing miles per gallon to gallons per mile).
        </li>
      </ul>
    </div>
  );
}

function RelatedTopicsAside() {
  return (
    <div className="glass rounded-2xl border border-neutral-800/60 p-6">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-neutral-100">
        <BookCopy size={18} />
        Related Topics
      </h3>
      <ul className="space-y-3">
        <AsideLink
          href="/formal-science/mathematics/algebra/pre-algebra/variables-expressions"
          title="Variables & Expressions"
          description="Ratios are often written and solved using variables."
        />
        <AsideLink
          href="/formal-science/mathematics/algebra/pre-algebra/equations-inequalities"
          title="Equations & Inequalities"
          description="The next step: The fundamental tools for solving for 'x' in a proportion."
        />
      </ul>
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function RatiosRatesProportionsPage() {
  return (
    <main className="topic-page theme-prealgebra lg:px-16">
      <FloatingSymbols symbols={ratiosSymbols} />
      <PageHeader
        eyebrow="Pre-Algebra"
        title="Ratios, Rates & Proportions"
        subtitle="Learn how to use ratios to compare quantities, calculate rates in the real world, and use proportions to solve for unknown values."
      />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 text-left">
          
          <CollapsibleTopic
            title="1. Understanding Ratios"
            icon={Percent}
            startOpen={true}
          >
            <ContentP>
              A <GlossaryTerm term="Ratio">Ratio</GlossaryTerm> is simply a way to compare two or more quantities. It tells you how much of one thing there is compared to another.
            </ContentP>
            <TermDefinition term="Ratio">
              A comparison of two quantities, often written as $a:b$, $a$ to $b$, or as a fraction $\frac{'a'}{'b'}$.
            </TermDefinition>
            <ExampleBlock>
              <p>
                In a class, there are 12 girls and 8 boys.
              </p>
              <p className="mt-2">
                The ratio of girls to boys can be written as:
              </p>
              <ul className="mt-2 list-disc pl-5">
                <li>$12:8$ (using a colon)</li>
                <li>$12$ to $8$ (using words)</li>
                <li>$\frac{12}{8}$ (as a fraction)</li>
              </ul>
              <p className="mt-2">
                The simplified ratio is $3:2$ (dividing both sides by 4).
              </p>
            </ExampleBlock>
            <PracticeProblem
              question="Write the ratio of 24 apples to 16 bananas in simplest form."
              solution="$\frac{24}{16}$ simplifies to $\frac{3}{2}$ or $3:2$."
            />
          </CollapsibleTopic>

          <CollapsibleTopic
            title="2. Rates and Unit Rates"
            icon={SquareDivide}
          >
            <ContentP>
              A <GlossaryTerm term="Rate">Rate</GlossaryTerm> is a special type of <GlossaryTerm term="Ratio">Ratio</GlossaryTerm> used when the two quantities have *different* units, such as distance and time.
            </ContentP>
            <TermDefinition term="Rate">
              A ratio that compares two quantities measured in different units.
            </TermDefinition>
            <ContentP>
              The most useful form of a rate is the <GlossaryTerm term="Unit Rate">Unit Rate</GlossaryTerm>, which sets the second quantity to 1.
            </ContentP>
            <TermDefinition term="Unit Rate">
              A rate with a denominator of 1. It tells you 'how many of the first item per one unit of the second item'.
            </TermDefinition>
            <ExampleBlock>
              <p>
                A car travels 300 miles in 5 hours. Find the unit rate.
              </p>
              <MBlock>{"\\frac{300 \\text{ miles}}{5 \\text{ hours}} = \\frac{300 \\div 5}{5 \\div 5} = \\frac{60 \\text{ miles}}{1 \\text{ hour}}"}</MBlock>
              <p>
                The unit rate is 60 miles per hour.
              </p>
            </ExampleBlock>
            <PracticeProblem
              question="If 6 cans of soda cost $3.00, what is the unit price?"
              solution="$\frac{3.00}{6} = 0.50$. The unit price is $0.50 per can."
            />
          </CollapsibleTopic>

          <CollapsibleTopic
            title="3. Solving Proportions"
            icon={Equal}
          >
            <ContentP>
              A <GlossaryTerm term="Proportion">Proportion</GlossaryTerm> is an equation that states that two <GlossaryTerm term="Ratio">Ratios</GlossaryTerm> are equivalent. We use cross-multiplication to solve for an unknown <GlossaryTerm term="Variable">variable</GlossaryTerm>.
            </ContentP>
            <TermDefinition term="Proportion">
              An equation showing that two ratios or rates are equal: $\frac{'a'}{'b'} = \frac{'c'}{'d'}$.
            </TermDefinition>
            <ExampleBlock>
              <p>
                Solve the proportion for $x$: $\frac{4}{5} = \frac{'x'}{15}$
              </p>
              <ul className="mt-2 list-disc pl-5">
                <li>1. Cross-Multiply: $4 \times 15 = 5 \times x$</li>
                <li>2. Simplify: $60 = 5x$</li>
                <li>3. Solve for $x$: $x = 12$</li>
              </ul>
            </ExampleBlock>
            <PracticeProblem
              question="If 3 shirts cost $45, how much do 7 shirts cost? Use a proportion."
              solution="Set up: $\frac{3}{45} = \frac{7}{x}$. Cross-multiply: $3x = 45 \times 7$. $3x = 315$. $x = 105$. Answer: $105.00."
            />
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