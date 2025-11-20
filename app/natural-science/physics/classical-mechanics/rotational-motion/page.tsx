// app/natural-science/physics/classical-mechanics/rotational-motion/page.tsx
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
  RotateCw, // Rotational Icon
  Move, // Torque Icon
  RefreshCcw, // Conservation Icon
} from "@/components/icons";
import React from "react";
import Link from "next/link";
import { M, MBlock } from "@/components/Math";
import GlossaryTerm from "@/components/GlossaryTerm";

// Symbols for the background
const rotationSymbols = [
  "\\tau = rF \\sin\\theta", "\\alpha", "\\omega", "\\theta", "\\vec{L} = I\\vec{\\omega}", "\\text{rad}", "\\text{N} \\cdot \\text{m}", "\\text{kg} \\cdot \\text{m}^2",
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
          <GlossaryTerm term="Torque">Torque</GlossaryTerm> ($\tau$) is the rotational equivalent of <GlossaryTerm term="Force">Force</GlossaryTerm>.
        </li>
        <li>
          Rotational <GlossaryTerm term="Inertia">Inertia</GlossaryTerm> ($I$) is the rotational equivalent of <GlossaryTerm term="Mass">Mass</GlossaryTerm>.
        </li>
        <li>
          <GlossaryTerm term="Angular Momentum">Angular Momentum</GlossaryTerm> ($\vec{'L'}$) is conserved if the net <GlossaryTerm term="Torque">torque</GlossaryTerm> is zero.
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
          Forgetting that the radius $r$ in <GlossaryTerm term="Torque">torque</GlossaryTerm> ($\tau = rF\sin\theta$) must be perpendicular to the force.
        </li>
        <li>
          Confusing linear acceleration $a$ with angular acceleration $\alpha$.
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
          href="/natural-science/physics/classical-mechanics/dynamics"
          title="Dynamics (Linear)"
          description="The linear analogues (Force, Mass, Momentum)."
        />
        <AsideLink
          href="/natural-science/physics/classical-mechanics/gravitation"
          title="Gravitation"
          description="Applying rotation to planetary orbits."
        />
      </ul>
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function RotationalMotionPage() {
  return (
    <main className="topic-page theme-classical-mechanics lg:px-16">
      <FloatingSymbols symbols={rotationSymbols} />
      <PageHeader
        eyebrow="Classical Mechanics"
        title="Rotational Motion"
        subtitle="The study of objects that spin or turn. It is the rotational equivalent of linear kinematics and dynamics, governed by concepts like torque and angular momentum."
      />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 text-left">
          
          <CollapsibleTopic
            title="1. The Rotational Variables"
            icon={RotateCw}
            startOpen={true}
          >
            <ContentP>
              Every linear motion variable has a rotational equivalent. <GlossaryTerm term="Displacement">Displacement</GlossaryTerm> {"($\\vec{'x'}$)"} becomes angular displacement ($\theta$), <GlossaryTerm term="Velocity">Velocity</GlossaryTerm> {"($\\vec{'v'}$)"} becomes angular velocity ($\omega$), and <GlossaryTerm term="Acceleration">Acceleration</GlossaryTerm> {"($\\vec{'a'}$)"} becomes angular acceleration ($\alpha$).
            </ContentP>
            <ExampleBlock>
              <p>
                The relationship is defined by the radius ($r$):
              </p>
              <MBlock>{"\\text{Linear} = \\text{Radius} \\times \\text{Angular}"}</MBlock>
              <MBlock>{"\\vec{v} = r \\vec{\\omega} \\quad \\text{and} \\quad \\vec{a} = r \\vec{\\alpha}"}</MBlock>
            </ExampleBlock>
          </CollapsibleTopic>

          <CollapsibleTopic
            title="2. Torque (Rotational Force)"
            icon={Move}
          >
            <ContentP>
              The rotational equivalent of <GlossaryTerm term="Force">Force</GlossaryTerm> is <GlossaryTerm term="Torque">Torque</GlossaryTerm> {"($\\vec{\\tau}$)"} It is what causes an object to angularly accelerate.
            </ContentP>
            <TermDefinition term="Torque">
              The measure of how much a force acting on an object causes that object to rotate.
            </TermDefinition>
            <MBlock>{"\\vec{\\tau} = r \\vec{F} \\sin(\\theta)"}</MBlock>
            <SideNote>
              <ContentP>
                The farther you push from the pivot point ($r$), the less <GlossaryTerm term="Force">force</GlossaryTerm> is required for the same <GlossaryTerm term="Torque">torque</GlossaryTerm>. This is why it is easier to open a door near the edge than near the hinge.
              </ContentP>
            </SideNote>
            <PracticeProblem
              question="What is the rotational equivalent of Newton's Second Law ($\Sigma \vec{F} = m\vec{a}$)? (Hint: The equivalent of mass is Rotational Inertia $I$)."
              solution="$\\Sigma \\vec{\\tau} = I\\vec{\\alpha}$ (Net Torque equals Rotational Inertia times Angular Acceleration)."
            />
          </CollapsibleTopic>

          <CollapsibleTopic
            title="3. Angular Momentum"
            icon={RefreshCcw}
          >
            <ContentP>
              <GlossaryTerm term="Angular Momentum">Angular Momentum</GlossaryTerm> {"($\\vec{'L'}$)"} is the rotational version of <GlossaryTerm term="Momentum">linear momentum</GlossaryTerm>. It is a conserved quantity.
            </ContentP>
            <TermDefinition term="Angular Momentum">
              A conserved quantity of a rotating object, equal to the product of its Rotational Inertia ($I$) and its angular velocity ($\omega$).
            </TermDefinition>
            <MBlock>{"\\vec{L} = I \\vec{\\omega}"}</MBlock>
            <ExampleBlock>
              <p>
                When an ice skater pulls their arms in, their Rotational Inertia ($I$) decreases. To keep {"$\\vec{'L'}$"} conserved, their angular velocity ($\omega$) must increase, causing them to spin faster.
              </p>
            </ExampleBlock>
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