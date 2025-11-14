// app/natural-science/physics/classical-mechanics/kinematics/page.tsx
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
  TrendingUp, // Kinematics icon
  Move, // Displacement icon
  Gauge, // Velocity icon
  Rabbit, // Acceleration icon
} from "@/components/icons";
import React from "react";
import Link from "next/link";
import { M, MBlock } from "@/components/Math";
import GlossaryTerm from "@/components/GlossaryTerm";

// Symbols for the background
const kinematicsSymbols = [
  "v = d/t", "Δx", "v₀", "a(t)", "v(t)", "x(t)", "g = 9.8m/s²", "v² = v₀² + 2ad", "d = v₀t + ½at²",
];

export default function KinematicsPage() {
  return (
    <main className="topic-page theme-classical-mechanics lg:px-16">
      <FloatingSymbols symbols={kinematicsSymbols} />
      <PageHeader
        eyebrow="Classical Mechanics"
        title="Kinematics"
        subtitle="The study of motion without considering the forces that cause it. We will describe *how* things move, not *why* they move."
      />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 text-left">
          
          <CollapsibleTopic
            title="1. The Language of Motion"
            icon={TrendingUp}
            startOpen={true}
          >
            <ContentP>
              <strong>Kinematics</strong> is the branch of mechanics that provides the language and mathematical tools to describe motion. Before we can understand *why* a ball falls (which is Dynamics), we must first agree on how to describe its position, speed, and acceleration.
            </ContentP>
            <SideNote>
              <ContentP>
                The key distinction:
              </ContentP>
              <ul className="list-disc space-y-2 pl-5 text-sm text-amber-300">
                <li><strong>Kinematics:</strong> Describes motion. (e.g., "The car is moving at 20 m/s.")</li>
                <li><strong>Dynamics:</strong> Explains the *cause* of motion. (e.g., "The car's engine provides a force that overcomes friction, causing it to accelerate.")</li>
              </ul>
            </SideNote>
          </CollapsibleTopic>

          <CollapsibleTopic
            title="2. Displacement (Δx)"
            icon={Move}
          >
            <ContentP>
              We often use "distance" and "displacement" interchangeably in daily life, but in physics, they are very different.
            </ContentP>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <TermDefinition term="Distance (Scalar)">
                The total path length traveled. If you run a 5km race and end where you started, you ran a distance of 5km.
              </TermDefinition>
              <TermDefinition term="Displacement (Vector)">
                The change in <strong>position</strong>; a straight line from the start point to the end point. If you run a 5km race and end where you started, your displacement is <strong>0 km</strong>.
              </TermDefinition>
            </div>
            <ExampleBlock>
              <p>You walk 3 meters East, then 4 meters North.</p>
              <ul className="mt-2 list-disc pl-5">
                <li><strong>Distance:</strong> <M>3\text(m) + 4\text(m) = 7\text(m)</M></li>
                <li><strong>Displacement:</strong> The hypotenuse of the triangle. Using Pythagoras: <M>\sqrt(3^2 + 4^2) = 5\text(m)</M> (Northeast)</li>
              </ul>
            </ExampleBlock>
            <ContentP>
              Displacement is represented by <M>\Delta x</M> (read "delta-ex"), which means "change in x" or <M>x_(final) - x_(initial)</M>.
            </ContentP>
          </CollapsibleTopic>

          <CollapsibleTopic
            title="3. Velocity (v)"
            icon={Gauge}
          >
            <ContentP>
              Similar to the previous topic, "speed" and "velocity" have distinct meanings in physics.
            </ContentP>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <TermDefinition term="Speed (Scalar)">
                How fast an object is moving. It's the rate of change of <strong>distance</strong>.
                <br />
                <M>\text(Average Speed) = \frac(\text(Total Distance))(\text(Total Time))</M>
              </TermDefinition>
              <TermDefinition term="Velocity (Vector)">
                How fast an object's <strong>position</strong> is changing. It includes direction.
                <br />
                <M>\vec(v)_(avg) = \frac(\Delta \vec(x))(\Delta t) = \frac(\text(Displacement))(\text(Time))</M>
              </TermDefinition>
            </div>
            <SideNote>
              <ContentP>
                A car driving in a perfect circle at a constant 50 km/h has a constant <strong>speed</strong>, but its <strong>velocity</strong> is constantly changing because its direction is always changing!
              </ContentP>
            </SideNote>
          </CollapsibleTopic>

          <CollapsibleTopic
            title="4. Acceleration (a)"
            icon={Rabbit}
          >
            <ContentP>
              Acceleration is any change in <strong>velocity</strong>. You are accelerating if you speed up, slow down, or turn a corner.
            </ContentP>
            <TermDefinition term="Acceleration (Vector)">
              The rate of change of <strong>velocity</strong> over time.
              <br />
              <M>\vec(a)_(avg) = \frac(\Delta \vec(v))(\Delta t) = \frac(\vec(v)_(final) - \vec(v)_(initial))(\text(Time))</M>
            </TermDefinition>
            <ExampleBlock>
              <p>A car speeds up from 0 m/s to 20 m/s in 5 seconds. Its acceleration is:</p>
              <MBlock>a = \frac(20 \text( m/s) - 0 \text( m/s))(5 \text( s)) = 4 \text( m/s)^2</MBlock>
              <p>This means for every second that passes, the car's velocity increases by 4 m/s.</p>
            </ExampleBlock>
            <SideNote>
              <ContentP>
                Slowing down is also acceleration, just in the opposite direction of motion. We often call this <strong>deceleration</strong>.
              </ContentP>
              <ContentP>
                An object in free-fall near Earth's surface accelerates downwards at <M>g \approx 9.8 \text( m/s)^2</M>.
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

// --- ASIDE COMPONENTS ---

function KeyConceptsAside() {
  return (
    <div className="glass rounded-2xl border border-cyan-800/40 bg-cyan-900/20 p-6">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-cyan-300">
        <Key size={18} />
        Key Concepts
      </h3>
      <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-300">
        <li>
          <strong>Kinematics</strong> describes *how* objects move, not *why*.
        </li>
        <li>
          <strong>Scalar vs. Vector:</strong> Scalars have magnitude only (like speed, 10 m/s). Vectors have magnitude *and* direction (like velocity, 10 m/s East).
        </li>
        <li>
          <strong>Displacement (<M>\Delta x</M>):</strong> Change in position (a vector).
        </li>
        <li>
          <strong>Velocity (<M>v</M>):</strong> The rate of change of displacement (a vector).
        </li>
        <li>
          <strong>Acceleration (<M>a</M>):</strong> The rate of change of velocity (a vector). You accelerate if you speed up, slow down, or change direction.
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
          Confusing <strong>distance</strong> (total path) with <strong>displacement</strong> (start-to-end change).
        </li>
        <li>
          Confusing <strong>speed</strong> (how fast) with <strong>velocity</strong> (how fast and in what direction).
        </li>
        <li>
          Thinking acceleration only means "speeding up". Slowing down (deceleration) is also acceleration.
        </li>
         <li>
          Forgetting that turning (changing direction) is a change in velocity, and therefore is an acceleration, even if speed is constant.
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
          href="/natural-science/physics/classical-mechanics"
          title="Classical Mechanics Overview"
          description="Return to the main hub for this topic."
        />
        <AsideLink
          href="#"
          title="Dynamics (Newton's Laws)"
          description="The next step: understanding *why* motion changes (Forces)."
        />
        <AsideLink
          href="/formal-science/mathematics/algebra/pre-algebra/variables-expressions"
          title="Algebra: Variables"
          description="Review how we use symbols like 'v' and 't' to represent values."
        />
      </ul>
    </div>
  );
}

function AsideLink({
  href,
  title,
  description,
}: {
  href: string;
  title:string;
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