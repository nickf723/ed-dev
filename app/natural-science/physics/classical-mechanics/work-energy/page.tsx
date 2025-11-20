// app/natural-science/physics/classical-mechanics/work-energy/page.tsx
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
  Zap, // Energy Icon
  Move, // Work Icon
  RefreshCcw, // Conservation Icon
} from "@/components/icons";
import React from "react";
import Link from "next/link";
import { M, MBlock } from "@/components/Math";
import GlossaryTerm from "@/components/GlossaryTerm";

// Symbols for the background
const workEnergySymbols = [
  "W = Fd", "\\text{KE} = \\frac{1}{2} mv^2", "\\text{PE} = mgh", "J", "\\text{W}", "\\text{E}_i = \\text{E}_f", "P = \\frac{W}{t}",
];

// --- ASIDE COMPONENTS (Helper functions included locally as defined in prior lessons) ---
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
          <GlossaryTerm term="Work">Work</GlossaryTerm> is the energy transferred by a <GlossaryTerm term="Force">Force</GlossaryTerm> (W = Fd).
        </li>
        <li>
          <GlossaryTerm term="Kinetic Energy">Kinetic Energy</GlossaryTerm> is the energy of motion ($\text{'KE'} = \frac{1}{2} mv^2$).
        </li>
        <li>
          <GlossaryTerm term="Potential Energy">Potential Energy</GlossaryTerm> is stored energy (e.g., $\text{'PE'} = mgh$).
        </li>
        <li>
          The <GlossaryTerm term="Conservation of Energy">Law of Conservation of Energy</GlossaryTerm> is that total energy is constant ($\text{'E'}_i = \text{'E'}_f$).
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
          Forgetting that <GlossaryTerm term="Work">work</GlossaryTerm> is zero if the <GlossaryTerm term="Force">force</GlossaryTerm> is perpendicular to the <GlossaryTerm term="Displacement">displacement</GlossaryTerm>.
        </li>
        <li>
          Misunderstanding that energy transforms, it is never "lost" (it just becomes thermal energy, often called heat).
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
          title="Dynamics (Newton's Laws)"
          description="The preceding topic: The cause of motion (Force)."
        />
        <AsideLink
          href="/natural-science/physics/classical-mechanics/momentum-collisions"
          title="Momentum and Collisions"
          description="The next step: Another form of conservation (p = mv)."
        />
      </ul>
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function WorkEnergyPage() {
  return (
    <main className="topic-page theme-classical-mechanics lg:px-16">
      <FloatingSymbols symbols={workEnergySymbols} />
      <PageHeader
        eyebrow="Classical Mechanics"
        title="Work and Energy"
        subtitle="The study of energy transfer. Work and energy provide an elegant alternative to force-based analysis by focusing on conservation laws."
      />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 text-left">
          
          <CollapsibleTopic
            title="1. Work (The Transfer of Energy)"
            icon={Move}
            startOpen={true}
          >
            <ContentP>
              In physics, <GlossaryTerm term="Work">Work</GlossaryTerm> is strictly defined as the transfer of <GlossaryTerm term="Energy">Energy</GlossaryTerm> when a <GlossaryTerm term="Force">Force</GlossaryTerm> causes a <GlossaryTerm term="Displacement">displacement</GlossaryTerm>. If nothing moves, no work is done.
            </ContentP>
            <TermDefinition term="Work">
              The scalar product of the magnitude of the force and the distance over which it acts.
            </TermDefinition>
            <MBlock>{"W = Fd \\cos(\\theta)"}</MBlock>
            <SideNote>
              <ContentP>
                The angle $\theta$ is between the force and the displacement. If you carry a box horizontally ($\theta = 90^\circ$), the vertical lifting force does $\cos(90^\circ)=0$ work!
              </ContentP>
            </SideNote>
          </CollapsibleTopic>

          <CollapsibleTopic
            title="2. Kinetic Energy (Energy of Motion)"
            icon={Zap}
          >
            <ContentP>
              <GlossaryTerm term="Kinetic Energy">Kinetic Energy</GlossaryTerm> is the energy an object possesses due to its motion. Work done *on* an object changes its kinetic energy (Work-Energy Theorem).
            </ContentP>
            <TermDefinition term="Kinetic Energy">
              The energy associated with an object's linear or rotational motion.
            </TermDefinition>
            <MBlock>{"\\text{KE} = \\frac{1}{2} m v^2"}</MBlock>
            <PracticeProblem
              question="How does doubling an object's mass affect its Kinetic Energy (KE)?"
              solution="Since KE is directly proportional to mass (m), doubling the mass doubles the KE."
            />
          </CollapsibleTopic>

          <CollapsibleTopic
            title="3. Potential Energy (Stored Energy)"
            icon={Zap}
          >
            <ContentP>
              <GlossaryTerm term="Potential Energy">Potential Energy</GlossaryTerm> is energy stored within a physical system. The most common types are gravitational and spring potential energy.
            </ContentP>
            <TermDefinition term="Gravitational Potential Energy">
              Energy stored by position relative to a gravitational field.
            </TermDefinition>
            <MBlock>{"\\text{PE}_g = mgh"}</MBlock>
            <ExampleBlock>
              <p>
                A ball with mass <M>{"2\\text{ kg}"}</M> sitting <M>{"5\\text{ m}"}</M> high has a gravitational potential energy of:
              </p>
              <MBlock>{"\\text{PE}_g = (2 \\text{ kg})(9.8 \\text{ m/s}^2)(5 \\text{ m}) = 98 \\text{ J}"}</MBlock>
            </ExampleBlock>
          </CollapsibleTopic>
          
          <CollapsibleTopic
            title="4. Conservation of Energy"
            icon={RefreshCcw}
          >
            <TermDefinition term="Conservation of Energy">
              The total mechanical energy ($\text{'E'}$) in a closed, isolated system remains constant.
            </TermDefinition>
            <MBlock>{"\\text{E}_{initial} = \\text{E}_{final} \\quad \\text{or} \\quad \\text{KE}_i + \\text{PE}_i = \\text{KE}_f + \\text{PE}_f"}</MBlock>
            <SideNote>
              <ContentP>
                This law is one of the most powerful and far-reaching concepts in all of science. It means that to solve for velocity at any point, you only need to know the initial height, not the whole path.
              </ContentP>
            </SideNote>
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