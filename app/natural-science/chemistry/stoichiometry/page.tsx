"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import {
  CollapsibleTopic,
  ContentP,
  TermDefinition,
  ExampleBlock,
  SideNote,
} from "@/components/LessonBlocks";
import {
  FlaskConical,
  Scale,
  Beaker,
  Calculator, // For mole calculations
} from "@/components/icons";
import React from "react";
import { M } from "@/components/Math";
import GlossaryTerm from "@/components/GlossaryTerm";

const stoichiometrySymbols = [
  "\\text{mol}", "6.022 \\times 10^{23}", "\\text{g/mol}", "\\text{M}", "\\text{PV=nRT}", "\\text{aq}", "(s)", "(g)",
];

export default function StoichiometryPage() {
  return (
    <main className="topic-page theme-chemistry lg:px-16">
      <FloatingSymbols symbols={stoichiometrySymbols} />
      <PageHeader
        eyebrow="Chemistry"
        title="Stoichiometry"
        subtitle="The quantitative relationships between reactants and products in chemical reactions. It is the 'math of chemistry' used to predict how much product you will get."
      />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 text-left">
          
          <CollapsibleTopic title="1. The Mole Concept" icon={FlaskConical} startOpen={true}>
            <ContentP>
              Atoms are too small to count individually. Instead, we use a standard unit called the <strong>Mole</strong>.
            </ContentP>
            <TermDefinition term="Mole (mol)">
              A unit of measurement for amount of substance. One mole contains exactly <M>{"6.022 \\times 10^{23}"}</M> elementary entities (Avogadro&apos;s number).
            </TermDefinition>
            <SideNote>
              Think of a mole like a &quot;dozen.&quot; A dozen is 12 of anything. A mole is <M>{"6.022 \\times 10^{23}"}</M> of anything.
            </SideNote>
          </CollapsibleTopic>

          <CollapsibleTopic title="2. Molar Mass" icon={Scale}>
            <ContentP>
              To convert between mass (grams) and amount (moles), we use Molar Mass. It is the mass of one mole of a substance.
            </ContentP>
            <ExampleBlock>
              <p><strong>Calculate Molar Mass of Water (<M>{"H_2O"}</M>):</strong></p>
              <ul className="list-disc pl-5 mt-2 text-sm">
                <li>H: <M>{"1.008 \\text{ g/mol} \\times 2 = 2.016 \\text{ g/mol}"}</M></li>
                <li>O: <M>{"16.00 \\text{ g/mol} \\times 1 = 16.00 \\text{ g/mol}"}</M></li>
                <li>Total: <M>{"18.016 \\text{ g/mol}"}</M></li>
              </ul>
            </ExampleBlock>
          </CollapsibleTopic>

          <CollapsibleTopic title="3. Balancing Equations" icon={Beaker}>
            <ContentP>
              Due to the <GlossaryTerm term="Conservation of Mass">Conservation of Mass</GlossaryTerm>, atoms cannot be created or destroyed. We must balance chemical equations to reflect this.
            </ContentP>
            <ContentP>
              <strong>Unbalanced:</strong> <M>{"H_2 + O_2 \\to H_2O"}</M> (2 Oxygen inputs, 1 output? Impossible.)
            </ContentP>
            <ContentP>
              <strong>Balanced:</strong> <M>{"2H_2 + O_2 \\to 2H_2O"}</M> (4H and 2O on both sides.)
            </ContentP>
          </CollapsibleTopic>

        </div>

        <aside className="lg:col-span-1 text-left space-y-8">
           <div className="glass rounded-2xl border border-amber-800/40 bg-amber-900/20 p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-amber-300">
              <Calculator size={18} />
              Key Conversions
            </h3>
            <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-300">
              <li>
                <strong>Mass to Moles:</strong> <M>{"\\text{moles} = \\frac{\\text{mass}}{\\text{Molar Mass}}"}</M>
              </li>
              <li>
                <strong>Moles to Particles:</strong> <M>{"\\text{particles} = \\text{moles} \\times (6.022 \\times 10^{23})"}</M>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}