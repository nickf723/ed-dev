// app/natural-science/physics/classical-mechanics/dynamics/page.tsx
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
  AppletContainer
} from "@/components/LessonBlocks";
import {
  Key,
  AlertTriangle,
  BookCopy,
  ChevronRight,
  Move, // Force/Motion icon
  Equal, // F=ma icon
  Replace, // Action/Reaction icon
  Calculator,
} from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { M } from "@/components/Math";
import GlossaryTerm from "@/components/GlossaryTerm";

// Symbols for the background
const dynamicsSymbols = [
  "F=ma", "a=F/m", "F_1 = -F_2", "\\Sigma F", "N", "kg", "m/s^2", "W", "T", "f", "Fn",
];


function DynamicsFmaCalculator() {
    const [force, setForce] = useState(10);
    const [mass, setMass] = useState(2);
    const [result, setResult] = useState(5.0);

    const calculateAcceleration = () => {
        if (mass === 0) {
            setResult(Infinity);
        } else {
            setResult(force / mass);
        }
    };
    
    React.useEffect(() => {
        calculateAcceleration();
    }, [force, mass]);

    return (
        <AppletContainer title="F=ma Calculator">
            <ContentP>
                Calculate the acceleration (<M>{"a"}</M>) resulting from a <GlossaryTerm term="Force">Force</GlossaryTerm> (<M>{"F"}</M>) acting on a <GlossaryTerm term="Mass">Mass</GlossaryTerm> (<M>{"m"}</M>): <M>{"a = \\frac{F}{m}"}</M>.
            </ContentP>
            <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-semibold text-neutral-400" htmlFor="force">Force (<M>{"F"}</M> in <M>{"N"}</M>)</label>
                    <input
                        id="force"
                        type="number"
                        value={force}
                        onChange={(e) => setForce(Number(e.target.value))}
                        className="mt-1 w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-neutral-100"
                    />
                </div>
                <div>
                    <label className="text-sm font-semibold text-neutral-400" htmlFor="mass">Mass (<M>{"m"}</M> in <M>{"\\text{kg}"}</M>)</label>
                    <input
                        id="mass"
                        type="number"
                        value={mass}
                        onChange={(e) => setMass(Number(e.target.value))}
                        className="mt-1 w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-neutral-100"
                    />
                </div>
                <button
                    onClick={calculateAcceleration}
                    className="col-span-2 rounded-md bg-cyan-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-cyan-500"
                >
                    Calculate Acceleration (<M>{"a"}</M>)
                </button>
            </div>
            <div className="mt-4 rounded-lg bg-neutral-800 p-4 text-center">
                <span className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
                    Resulting Acceleration (<M>{"a"}</M>)
                </span>
                <p className="font-mono text-3xl font-bold text-cyan-300">
                    <M>{`${isFinite(result) ? result.toFixed(2) : "Undefined"} \\text{ m/s}^2`}</M>
                </p>
            </div>
        </AppletContainer>
    );
}


export default function DynamicsPage() {
  return (
    <main className="topic-page theme-classical-mechanics lg:px-16">
      <FloatingSymbols symbols={dynamicsSymbols} />
      <PageHeader
        eyebrow="Classical Mechanics"
        title="Dynamics (Newton's Laws)"
        subtitle="The study of why objects move. Learn the relationship between force, mass, and acceleration, forming the foundation of all non-quantum physics."
      />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 text-left">
          
          <CollapsibleTopic
            title="1. Force, Mass, and Inertia"
            icon={Move}
            startOpen={true}
          >
            <ContentP>
              <GlossaryTerm term="Dynamics">Dynamics</GlossaryTerm> is the study that connects the motion described in <GlossaryTerm term="Kinematics">Kinematics</GlossaryTerm> to its cause, which is a <GlossaryTerm term="Force">Force</GlossaryTerm> (a push or pull). The effect of a force depends entirely on the object's <GlossaryTerm term="Mass">Mass</GlossaryTerm>.
            </ContentP>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <TermDefinition term="Force">
                A push or pull. It is a vector quantity, meaning it has both magnitude and direction. Unit: Newton (<M>{"\\text{N}"}</M>).
              </TermDefinition>
              <TermDefinition term="Mass">
                A measure of the object’s <GlossaryTerm term="Inertia">Inertia</GlossaryTerm> (resistance to changes in motion). It is a fundamental property and is measured in kilograms (<M>{"\\text{kg}"}</M>).
              </TermDefinition>
            </div>
            <SideNote>
              <ContentP>
                A <strong>force</strong> is only important when it's unbalanced. The <GlossaryTerm term="Net Force">Net Force</GlossaryTerm> (<M>{"\\Sigma \\vec{F}"}</M>) is the sum of all forces acting on an object. If <M>{"\\Sigma \\vec{F} = 0"}</M>, the object's velocity won't change.
              </ContentP>
            </SideNote>
          </CollapsibleTopic>

          <CollapsibleTopic
            title="2. Newton's First Law (Inertia)"
            icon={Move}
          >
            <TermDefinition term="Newton's First Law">
              An object remains at rest or in uniform motion (constant velocity) unless acted upon by a nonzero net force.
            </TermDefinition>
            <ContentP>
              This law is really about <GlossaryTerm term="Inertia">Inertia</GlossaryTerm>. It tells us that motion doesn't need a force to keep going—only to change. If you push a box and it immediately stops, it's because the friction force opposed your push and made the <GlossaryTerm term="Net Force">Net Force</GlossaryTerm> zero.
            </ContentP>
            <ExampleBlock>
              <p>
                Imagine throwing an object in deep space, far from any gravity or air. Once you release it, the object would continue moving forever at a constant velocity without any force pushing it.
              </p>
            </ExampleBlock>
            <PracticeProblem
              question="A hockey puck slides across ice at a constant velocity. What is the net force acting on it?"
              solution="Since the velocity is constant (zero acceleration), the net force must be zero (ΣF = 0)."
            />
          </CollapsibleTopic>

          <CollapsibleTopic
            title="3. Newton's Second Law (F = ma)"
            icon={Equal}
          >
            <TermDefinition term="Newton's Second Law">
              The acceleration (<M>{"\\vec{a}"}</M>) of an object is directly proportional to the net force (<M>{"\\Sigma \\vec{F}"}</M>) acting on it and inversely proportional to its mass (<M>{"m"}</M>).
            </TermDefinition>
            <M>{"\\Sigma \\vec{F} = m \\vec{a}"}</M> 
            <ContentP>
              This is the most powerful equation in classical physics. It quantifies *how* a force changes motion.
            </ContentP>
            <ul className="list-disc pl-5 space-y-2">
              <li>If you apply more force (<M>{"\\Sigma \\vec{F}"}</M>), you get more acceleration.</li>
              <li>If the object has more mass (<M>{"m"}</M>), the same force gives you less acceleration.</li>
            </ul>
            <ExampleBlock>
              <p>
                A <M>{"2\\text{ kg}"}</M> mass is pushed by a <M>{"10\\text{ N}"}</M> force. What is its acceleration?
              </p>
              <M>{"\\vec{a} = \\frac{\\Sigma \\vec{F}}{m} = \\frac{10 \\text{ N}}{2 \\text{ kg}} = 5 \\text{ m/s}^2"}</M>
            </ExampleBlock>
            <ContentP>
              Use the calculator below to practice solving for acceleration.
            </ContentP>
            <DynamicsFmaCalculator />
          </CollapsibleTopic>

          <CollapsibleTopic
            title="4. Newton's Third Law (Action-Reaction)"
            icon={Replace}
          >
            <TermDefinition term="Newton's Third Law">
              For every action force, there is a reaction force that is equal in magnitude and opposite in direction.
            </TermDefinition>
            <ContentP>
              This law explains that forces always come in pairs. When you push on a wall, the wall simultaneously pushes back on you with an equal and opposite force. The two forces in an action-reaction pair never cancel each other out because they act on <strong>different objects</strong>.
            </ContentP>
            <ExampleBlock>
              <p>
                A baseball bat hits a baseball. 

[Image of action-reaction forces between bat and ball]

              </p>
              <ul className="mt-2 list-disc pl-5">
                <li><strong>Action:</strong> The bat exerts a large force on the ball.</li>
                <li><strong>Reaction:</strong> The ball exerts an equal, opposite force on the bat.</li>
              </ul>
              <p className="mt-2">
                It's the force on the bat (the reaction) that slows it down and makes your hands sting!
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

// --- ASIDE COMPONENTS (Unchanged logic, but included for completeness) ---

function KeyConceptsAside() {
  return (
    <div className="glass rounded-2xl border border-cyan-800/40 bg-cyan-900/20 p-6">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-cyan-300">
        <Key size={18} />
        Key Concepts
      </h3>
      <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-300">
        <li>
          <strong><GlossaryTerm term="Force">Force</GlossaryTerm>:</strong> A push or pull that causes acceleration.
        </li>
        <li>
          <strong><GlossaryTerm term="Inertia">Inertia</GlossaryTerm>:</strong> An object’s resistance to motion change, measured by <GlossaryTerm term="Mass">Mass</GlossaryTerm>.
        </li>
        <li>
          <strong><GlossaryTerm term="Newton's First Law">1st Law (Inertia)</GlossaryTerm>:</strong> Velocity is constant when the <GlossaryTerm term="Net Force">Net Force</GlossaryTerm> is zero.
        </li>
        <li>
          <strong><GlossaryTerm term="Newton's Second Law">2nd Law (F=ma)</GlossaryTerm>:</strong> <M>{"\\Sigma \\vec{F} = m \\vec{a}"}</M>. Force causes acceleration.
        </li>
        <li>
          <strong><GlossaryTerm term="Newton's Third Law">3rd Law (Action-Reaction)</GlossaryTerm>:</strong> Forces always come in equal and opposite pairs acting on *different* objects.
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
          Confusing an object's <strong><GlossaryTerm term="Mass">Mass</GlossaryTerm></strong> with its <strong>Weight</strong> (Weight is a force, W = mg).
        </li>
        <li>
          Thinking the action-reaction pair from the 3rd law cancels out. They don't, because they act on <strong>different bodies</strong>.
        </li>
        <li>
          Forgetting the Second Law (<M>{"\\Sigma \\vec{F} = m \\vec{a}"}</M>) involves the <strong><GlossaryTerm term="Net Force">Net Force</GlossaryTerm></strong> (sum of all forces), not just one single force.
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
          href="/natural-science/physics/classical-mechanics/kinematics"
          title="Kinematics"
          description="The preceding topic: Describing motion (v, a, t) without forces."
        />
        <AsideLink
          href="#"
          title="Work and Energy"
          description="The next step: Applying forces over a distance (W=Fd) and conservation laws."
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