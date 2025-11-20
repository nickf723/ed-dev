// app/natural-science/physics/classical-mechanics/momentum-collisions/page.tsx
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
  Replace, // Collision/Momentum Icon
  RefreshCcw, // Conservation Icon
  Tally5, // Impulse Icon
} from "@/components/icons";
import React from "react";
import Link from "next/link";
import { M, MBlock } from "@/components/Math";
import GlossaryTerm from "@/components/GlossaryTerm";

// Symbols for the background
const momentumSymbols = [
  "p = mv", "J = F\\Delta t", "\\Sigma \\vec{p}_i = \\Sigma \\vec{p}_f", "\\text{kg} \\cdot \\text{m/s}", "\\text{N} \\cdot \\text{s}", "m_1v_1", "m_2v_2",
];

// --- ASIDE COMPONENTS (Helper functions omitted for brevity in output) ---

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
          <GlossaryTerm term="Momentum">Momentum</GlossaryTerm> ($\vec{'p'}$) measures the 'quantity of motion' ($\vec{'p'} = m\vec{'v'}$).
        </li>
        <li>
          <GlossaryTerm term="Impulse">Impulse</GlossaryTerm> ($\vec{'J'}$) is the change in momentum caused by a <GlossaryTerm term="Net Force">Net Force</GlossaryTerm> over time ($\vec{'J'} = \vec{'F'}\\Delta t$).
        </li>
        <li>
          The <GlossaryTerm term="Conservation of Momentum">Law of Conservation of Momentum</GlossaryTerm> is essential for analyzing collisions and explosions.
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
          Forgetting <GlossaryTerm term="Momentum">momentum</GlossaryTerm> and <GlossaryTerm term="Impulse">impulse</GlossaryTerm> are **vector** quantities (direction matters).
        </li>
        <li>
          Confusing elastic (energy is conserved) with inelastic (energy is *not* conserved) collisions.
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
          href="/natural-science/physics/classical-mechanics/work-energy"
          title="Work and Energy"
          description="A different but related conservation law (Energy)."
        />
        <AsideLink
          href="/natural-science/physics/classical-mechanics/rotational-motion"
          title="Rotational Motion"
          description="The rotational analogue of momentum."
        />
      </ul>
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function MomentumCollisionsPage() {
  return (
    <main className="topic-page theme-classical-mechanics lg:px-16">
      <FloatingSymbols symbols={momentumSymbols} />
      <PageHeader
        eyebrow="Classical Mechanics"
        title="Momentum and Collisions"
        subtitle="The study of the 'quantity of motion' and its conservation. Momentum is essential for analyzing what happens when objects interact."
      />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 text-left">
          
          <CollapsibleTopic
            title="1. Momentum (The Quantity of Motion)"
            icon={Replace}
            startOpen={true}
          >
            <ContentP>
              <GlossaryTerm term="Momentum">Momentum</GlossaryTerm> ($\vec{'p'}$) is a concept that measures how difficult it is to stop a moving object. It depends on both <GlossaryTerm term="Mass">mass</GlossaryTerm> and <GlossaryTerm term="Velocity">velocity</GlossaryTerm>.
            </ContentP>
            <TermDefinition term="Momentum">
              A vector quantity equal to the product of an object's mass and velocity.
            </TermDefinition>
            <MBlock>{"\\vec{p} = m \\vec{v}"}</MBlock>
            <SideNote>
              <ContentP>
                A large ship moving slowly can have far greater momentum than a small bullet moving quickly because of the massive difference in mass.
              </ContentP>
            </SideNote>
          </CollapsibleTopic>

          <CollapsibleTopic
            title="2. Impulse (Change in Momentum)"
            icon={Tally5}
          >
            <ContentP>
              To change an object's <GlossaryTerm term="Momentum">momentum</GlossaryTerm>, you must apply an <GlossaryTerm term="Impulse">Impulse</GlossaryTerm>. This concept connects momentum back to <GlossaryTerm term="Force">Force</GlossaryTerm> over time.
            </ContentP>
            <TermDefinition term="Impulse">
              The product of the net force acting on an object and the time interval over which it acts. It is equal to the change in momentum ($\Delta \vec{'p'}$).
            </TermDefinition>
            <MBlock>{"\\vec{J} = \\vec{F}_{avg} \\Delta t = \\Delta \\vec{p}"}</MBlock>
            <ExampleBlock>
              <p>
                Safety equipment like airbags or crash barriers increase the time ($\Delta t$) over which the stopping <GlossaryTerm term="Force">force</GlossaryTerm> acts, thereby reducing the magnitude of the force for the same required <GlossaryTerm term="Impulse">impulse</GlossaryTerm>.
              </p>
            </ExampleBlock>
          </CollapsibleTopic>
          
          <CollapsibleTopic
            title="3. Conservation of Momentum"
            icon={RefreshCcw}
          >
            <ContentP>
              Like <GlossaryTerm term="Energy">Energy</GlossaryTerm>, <GlossaryTerm term="Momentum">momentum</GlossaryTerm> is conserved in a closed system. This principle is the key to analyzing collisions and explosions.
            </ContentP>
            <TermDefinition term="Conservation of Momentum">
              In a closed system, the total vector momentum before a collision or interaction is equal to the total vector momentum after the collision.
            </TermDefinition>
            <MBlock>{"\\Sigma \\vec{p}_{initial} = \\Sigma \\vec{p}_{final} \\quad \\text{or} \\quad m_1\\vec{v}_{1i} + m_2\\vec{v}_{2i} = m_1\\vec{v}_{1f} + m_2\\vec{v}_{2f}"}</MBlock>
            <PracticeProblem
              question="Two trains crash and couple together. What kind of collision is this, and is momentum conserved?"
              solution="This is a perfectly inelastic collision. Momentum is conserved, but kinetic energy is not."
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