"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import {
  CollapsibleTopic,
  ContentP,
  TermDefinition,
  ExampleBlock,
  PracticeProblem,
  SideNote
} from "@/components/LessonBlocks";
import {
  DollarSign,
  TrendingUp,
  Scale,
  Users,
} from "@/components/icons";
import React from "react";
import { M, MBlock } from "@/components/Math";
import GlossaryTerm from "@/components/GlossaryTerm";

const microSymbols = [
  "S", "D", "P", "Q", "\\epsilon", "\\text{MC=MR}", "\\pi", "U(x)",
];

export default function MicroeconomicsPage() {
  return (
    <main className="topic-page theme-social-science lg:px-16">
      <FloatingSymbols symbols={microSymbols} />
      <PageHeader
        eyebrow="Economics"
        title="Microeconomics"
        subtitle="The study of individuals, households, and firms. It analyzes how they make decisions to allocate limited resources, typically in markets where goods or services are bought and sold."
      />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 text-left">
          
          <CollapsibleTopic title="1. Scarcity and Choice" icon={Scale} startOpen={true}>
            <ContentP>
              Economics is the study of <GlossaryTerm term="Scarcity">Scarcity</GlossaryTerm>. We have unlimited wants but limited resources. This forces us to make choices, leading to the concept of <strong>Opportunity Cost</strong>.
            </ContentP>
            <TermDefinition term="Opportunity Cost">
              The value of the next-best alternative that you give up when you make a choice.
            </TermDefinition>
            <ExampleBlock>
              If you spend 1 hour studying Economics, you give up 1 hour of watching TV. The "cost" of the studying is the enjoyment you <em>would have had</em> watching TV.
            </ExampleBlock>
          </CollapsibleTopic>

          <CollapsibleTopic title="2. Supply and Demand" icon={TrendingUp}>
            <ContentP>
              The model of <GlossaryTerm term="Supply and Demand">Supply and Demand</GlossaryTerm> describes how prices vary as a result of a balance between product availability and consumer desire.
            </ContentP>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <TermDefinition term="Law of Demand">
                 As price increases ($P \uparrow$), quantity demanded decreases ($Q_d \downarrow$), ceteris paribus.
               </TermDefinition>
               <TermDefinition term="Law of Supply">
                 As price increases ($P \uparrow$), quantity supplied increases ($Q_s \uparrow$), ceteris paribus.
               </TermDefinition>
            </div>
            <SideNote>
              "Ceteris Paribus" is Latin for "all other things being equal." It is a crucial assumption in economic models to isolate specific variables.
            </SideNote>
          </CollapsibleTopic>

          <CollapsibleTopic title="3. Elasticity" icon={DollarSign}>
            <ContentP>
              Elasticity measures responsiveness. If the price of pizza goes up by 10%, do people buy 10% less pizza? Or do they keep buying it anyway?
            </ContentP>
            <MBlock>{"E_d = \\frac{\\% \\Delta Q_d}{\\% \\Delta P}"}</MBlock>
            <PracticeProblem 
              question="If the price of insulin doubles, diabetics will likely continue to buy nearly the same amount. Is this demand elastic or inelastic?"
              solution="Inelastic. The quantity demanded does not change much in response to price, because it is a necessity."
            />
          </CollapsibleTopic>

        </div>

        <aside className="lg:col-span-1 text-left space-y-8">
           <div className="glass rounded-2xl border border-blue-800/40 bg-blue-900/20 p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-blue-300">
              <Users size={18} />
              Key Concepts
            </h3>
            <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-300">
              <li><strong>Incentives:</strong> People respond to potential rewards or punishments.</li>
              <li><strong>Marginal Thinking:</strong> Decisions are made on the margin (e.g., "Should I eat <i>one more</i> slice?").</li>
              <li><strong>Equilibrium:</strong> The point where Supply equals Demand.</li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}