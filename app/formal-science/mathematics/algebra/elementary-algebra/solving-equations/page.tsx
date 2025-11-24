"use client";
import React, { useState } from "react";
import StandardLessonLayout from "@/components/layouts/StandardLessonLayout";
import {
  CollapsibleTopic,
  ContentP,
  TermDefinition,
  ExampleBlock,
  SideNote,
  QuizContainer,
  PracticeProblem
} from "@/components/LessonBlocks";
import { M } from "@/components/Math";
import GlossaryTerm from "@/components/GlossaryTerm";
import { Equal, Scale, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import Link from "next/link";

// --- PAGE COMPONENT ---
export default function SolvingEquationsPage() {
  return (
    <StandardLessonLayout
      eyebrow="Elementary Algebra"
      title="Solving Linear Equations"
      subtitle="Master the 'Golden Rule' of algebra: whatever you do to one side, you must do to the other."
      symbols={["=", "x", "+", "-", "÷"]}
      theme="theme-elementary-algebra" // Assumes you add this to your themes.css
      aside={<EquationsSidebar />}
    >
      
      {/* SECTION 1: THE CONCEPT */}
      <CollapsibleTopic title="1. The Balance Scale" icon={Scale} startOpen={true}>
        <ContentP>
          Imagine an equation as a balanced weighing scale. The equals sign <M>=</M> is the fulcrum in the middle.
          If the scale is balanced, the total weight on the left must equal the total weight on the right.
        </ContentP>
        
        <div className="my-8 flex justify-center">
            {/* Simple Visual Illustration of a Balance Scale */}
            <div className="relative h-32 w-64 border-b-4 border-neutral-700">
                <div className="absolute bottom-0 left-4 flex h-16 w-16 items-center justify-center rounded bg-cyan-900/50 border border-cyan-500/30 text-cyan-200">
                    <M>x + 5</M>
                </div>
                <div className="absolute bottom-0 right-4 flex h-16 w-16 items-center justify-center rounded bg-neutral-800 border border-neutral-600 text-white">
                    <M>12</M>
                </div>
                <div className="absolute bottom-[-10px] left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-white" />
            </div>
        </div>

        <ContentP>
           To find the value of <M>x</M>, we need to get it alone (isolate it). 
           To do that, we have to remove the <M>+5</M>. But if we take 5 off the left side, the scale tips!
           We must also take 5 off the right side to stay balanced.
        </ContentP>

        <TermDefinition term="Inverse Operation">
           An operation that undoes another. 
           <ul className="mt-2 list-disc pl-5">
             <li>The inverse of <strong>Addition</strong> is Subtraction.</li>
             <li>The inverse of <strong>Multiplication</strong> is Division.</li>
           </ul>
        </TermDefinition>
      </CollapsibleTopic>

      {/* SECTION 2: ONE-STEP EQUATIONS */}
      <CollapsibleTopic title="2. One-Step Equations" icon={Equal}>
        <ContentP>
            Your goal is to isolate the variable.
            Look at what is happening to <M>x</M>, and do the <strong>inverse</strong>.
        </ContentP>

        <ExampleBlock>
            <h4 className="mb-2 font-bold text-white">Example: Addition</h4>
            <p className="mb-2">Solve <M>x + 7 = 10</M></p>
            <div className="grid grid-cols-[1fr_auto_1fr] gap-4 text-center font-mono text-lg">
                <div className="text-right"><M>x + 7</M></div>
                <div><M>=</M></div>
                <div className="text-left"><M>10</M></div>

                <div className="text-right text-red-400"><M>- 7</M></div>
                <div></div>
                <div className="text-left text-red-400"><M>- 7</M></div>

                <div className="border-t border-white/20 text-right"><M>x</M></div>
                <div><M>=</M></div>
                <div className="border-t border-white/20 text-left"><M>3</M></div>
            </div>
        </ExampleBlock>

        <PracticeProblem 
            question="Solve for y: y - 5 = 12"
            solution="17"
        />
      </CollapsibleTopic>

      {/* SECTION 3: INTERACTIVE CHECK */}
      <CollapsibleTopic title="3. Verify Your Solution" icon={CheckCircle2}>
        <ContentP>
            You never have to guess in algebra. You can always check your work by plugging your answer back into the original equation.
        </ContentP>
        <SimpleEquationChecker />
      </CollapsibleTopic>

      {/* SECTION 4: QUIZ */}
      <QuizContainer title="Mastery Check">
        <div className="space-y-4">
            <p className="text-neutral-300">Which step would you take first to solve <M>3x = 12</M>?</p>
            <div className="flex flex-col gap-2">
                <button className="rounded border border-neutral-700 p-3 text-left hover:bg-red-900/20 hover:border-red-500/50 text-neutral-400 transition-colors">
                    Subtract 3 from both sides
                </button>
                <button className="rounded border border-neutral-700 p-3 text-left hover:bg-green-900/20 hover:border-green-500/50 text-neutral-400 transition-colors">
                    Divide by 3 on both sides
                </button>
                <button className="rounded border border-neutral-700 p-3 text-left hover:bg-red-900/20 hover:border-red-500/50 text-neutral-400 transition-colors">
                    Multiply by 12
                </button>
            </div>
        </div>
      </QuizContainer>

    </StandardLessonLayout>
  );
}

// --- LOCAL COMPONENTS (Interactive) ---

function SimpleEquationChecker() {
    const [val, setVal] = useState("");
    const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");

    // Equation: 2x + 4 = 12 (Answer is 4)
    const checkAnswer = () => {
        if (val === "4") setStatus("correct");
        else setStatus("wrong");
    };

    return (
        <div className="rounded-xl bg-neutral-900 p-6 border border-neutral-800 text-center">
            <p className="mb-4 text-lg text-neutral-200">
                Solve: <M>2x + 4 = 12</M>
            </p>
            <div className="flex justify-center gap-4 items-center">
                <span className="text-xl font-mono">x =</span>
                <input 
                    type="number" 
                    value={val}
                    onChange={(e) => { setVal(e.target.value); setStatus("idle"); }}
                    className="w-20 rounded bg-black border border-neutral-700 px-3 py-2 text-white focus:border-cyan-500 outline-none text-center"
                />
                <button 
                    onClick={checkAnswer}
                    className="rounded-full bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 font-bold transition-colors"
                >
                    Check
                </button>
            </div>
            {status === "correct" && (
                <p className="mt-4 text-green-400 font-bold animate-pulse">Correct! 2(4) + 4 is indeed 12.</p>
            )}
            {status === "wrong" && (
                <p className="mt-4 text-red-400">Not quite. Try subtracting 4 first, then dividing by 2.</p>
            )}
        </div>
    );
}

function EquationsSidebar() {
    return (
        <>
            {/* Key Concepts */}
            <div className="glass rounded-2xl border border-cyan-800/40 bg-cyan-900/20 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-cyan-300">
                    <Equal size={18} /> Key Concepts
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-300">
                    <li><strong>Inverse Operations:</strong> The "undo" button for math.</li>
                    <li><strong>Isolation:</strong> Getting the variable alone on one side.</li>
                    <li><strong>Balance:</strong> Whatever you do to the Left, you MUST do to the Right.</li>
                </ul>
            </div>

            {/* Common Pitfalls */}
            <div className="glass rounded-2xl border border-amber-800/40 bg-amber-900/20 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-amber-300">
                    <AlertTriangle size={18} /> Pitfalls
                </h3>
                <p className="text-sm text-neutral-300 mb-2">
                    <strong>The "One Side" Mistake:</strong>
                </p>
                <p className="text-xs text-neutral-400 italic">
                    "I subtracted 5 from the left, but forgot to subtract it from the right."
                </p>
                <div className="mt-3 h-px w-full bg-amber-500/20" />
                <p className="text-sm text-neutral-300 mt-3">
                    <strong>Sign Errors:</strong>
                </p>
                <p className="text-xs text-neutral-400 italic">
                    Subtracting a negative is the same as adding! <M>x - (-5)</M> becomes <M>x + 5</M>.
                </p>
            </div>

            {/* Navigation */}
            <div className="glass rounded-2xl border border-neutral-800/60 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-neutral-100">
                    <ArrowRight size={18} /> Up Next
                </h3>
                <Link href="/formal-science/mathematics/algebra/elementary-algebra/multi-step-equations" className="block group">
                    <div className="rounded-lg bg-neutral-900/50 p-4 transition-all hover:bg-neutral-800 hover:shadow-lg border border-transparent hover:border-neutral-700">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-cyan-300 font-bold group-hover:underline">Multi-Step Equations</span>
                            <ArrowRight size={16} className="text-neutral-500 group-hover:translate-x-1 transition-transform"/>
                        </div>
                        <p className="text-xs text-neutral-500">Combining like terms and using the distributive property.</p>
                    </div>
                </Link>
            </div>
        </>
    );
}