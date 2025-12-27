"use client";
import PageHeader from "@/components/PageHeader";
import USubstitutionBackground from "@/app/formal-science/mathematics/calculus/integral-calculus/substitution/USubstitutionBackground";
import USubstitutionWidget from "@/app/formal-science/mathematics/calculus/integral-calculus/substitution/USubstitutionWidget";
import { motion } from "framer-motion";
import {
  CollapsibleTopic,
  ContentP,
  TermDefinition,
  ExampleBlock,
  SideNote,
  StepByStepSolution
} from "@/components/LessonBlocks";
import { M, } from "@/components/Math";
import { Divide, Layers, ArrowRightLeft, AlertTriangle } from "lucide-react";

export default function USubstitutionPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Warping Grid Background */}
      <USubstitutionBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Integral Calculus"
          title="Integration by Substitution"
          subtitle="Also known as 'U-Substitution.' It is the reverse of the Chain Rule, allowing us to simplify complex integrals by changing the variable of integration."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* MAIN CONTENT (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
             
             {/* Section 1: The Concept */}
             <CollapsibleTopic title="1. The Reverse Chain Rule" icon={Divide} startOpen={true}>
                <ContentP>
                    When we differentiate a composite function <M>f(g(x))</M>, we use the <strong>Chain Rule</strong>:
                </ContentP>
                <M>{"\\frac{d}{dx} f(g(x)) = f'(g(x)) \\cdot g'(x)"}</M>
                <ContentP>
                    Integration by Substitution is simply running this process in reverse. We look for an integrand that fits the pattern <M>{"f(g(x)) \\cdot g'(x)"}</M>. If we can find that inner function <M>g(x)</M> and its derivative <M>g'(x)</M>, we can swap them out for a single variable <M>u</M>.
                </ContentP>
             </CollapsibleTopic>

             {/* Section 2: The Algorithm */}
             <CollapsibleTopic title="2. The Procedure" icon={Layers}>
                <ContentP>
                    The goal is to transform a difficult integral in terms of <M>x</M> into a simple integral in terms of <M>u</M>.
                </ContentP>
                <StepByStepSolution 
                    title="Example: Find \int 2x(x^2 + 1)^3 dx"
                    steps={[
                        "1. Choose u. Look for the 'inner' part. Let u = x^2 + 1.",
                        "2. Differentiate u. Find du/dx = 2x.",
                        "3. Solve for dx (or match terms). Here, du = 2x dx.",
                        "4. Substitute. Replace (x^2+1) with u, and (2x dx) with du.",
                        "   New Integral: \\int u^3 du",
                        "5. Integrate. \\int u^3 du = \\frac{u^4}{4} + C",
                        "6. Back-Substitute. Replace u with x^2 + 1.",
                        "   Final Answer: \\frac{(x^2 + 1)^4}{4} + C"
                    ]}
                />
             </CollapsibleTopic>

             {/* Section 3: Definite Integrals */}
             <CollapsibleTopic title="3. Definite Integrals & Limits" icon={ArrowRightLeft}>
                <ContentP>
                    When using U-Substitution on a definite integral (one with limits <M>a</M> and <M>b</M>), you have two choices:
                </ContentP>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="p-4 rounded-lg bg-indigo-900/20 border border-indigo-500/30">
                        <h4 className="font-bold text-indigo-300 mb-2">Method 1: Back-Substitute</h4>
                        <p className="text-sm text-neutral-400">Integrate in terms of <M>u</M>, substitute <M>x</M> back in, then use original limits <M>a</M> and <M>b</M>.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-emerald-900/20 border border-emerald-500/30">
                        <h4 className="font-bold text-emerald-300 mb-2">Method 2: Change Limits (Recommended)</h4>
                        <p className="text-sm text-neutral-400">
                            Calculate new limits <M>u(a)</M> and <M>u(b)</M>. Solve entirely in <M>u</M>. Never go back to <M>x</M>!
                        </p>
                    </div>
                </div>
                <ExampleBlock>
                    <p><strong>Changing Limits:</strong> If <M>u = x^2 + 1</M> and limits are <M>x=0</M> to <M>x=2</M>:</p>
                    <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                        <li>Lower Limit: <M>u(0) = 0^2 + 1 = 1</M></li>
                        <li>Upper Limit: <M>u(2) = 2^2 + 1 = 5</M></li>
                        <li>New Integral: <M>{"\\int_{1}^{5} u^3 du"}</M></li>
                    </ul>
                </ExampleBlock>
             </CollapsibleTopic>

          </div>

          {/* SIDEBAR (4 cols) */}
          <div className="flex flex-col gap-6 lg:col-span-4 lg:sticky lg:top-6 h-fit pt-2">
            
            {/* Interactive Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <USubstitutionWidget />
            </motion.div>

            {/* Warning Box */}
            <div className="p-5 rounded-xl border border-dashed border-neutral-700 bg-neutral-900/40">
                <h4 className="text-xs font-bold uppercase text-red-400 mb-2 flex items-center gap-2">
                    <AlertTriangle size={14} /> Warning: Constant Multiples Only
                </h4>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                    U-Substitution only handles constant factors. If you have extra <M>x</M>'s floating around that don't cancel out with <M>du</M>, this method will fail. You might need <em>Integration by Parts</em> instead.
                </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}