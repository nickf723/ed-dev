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
  Terminal,
  Network,
  Binary,
  GitMerge,
  Shuffle,
  Clock, // Assuming Clock is available or use Watch/Timer, otherwise fallback to Terminal
} from "@/components/icons"; // Ensure Clock/Watch is imported or substituted
import { M, MBlock } from "@/components/Math";
import GlossaryTerm from "@/components/GlossaryTerm";

const algoSymbols = [
  "O(n)", "O(1)", "O(\\log n)", "P \\neq NP", "\\text{sort()}", "0110", "\\text{if/else}",
];

export default function AlgorithmsPage() {
  return (
    <main className="topic-page theme-computer-science lg:px-16">
      <FloatingSymbols symbols={algoSymbols} />
      <PageHeader
        eyebrow="Computer Science"
        title="Algorithms & Complexity"
        subtitle="The study of efficient problem-solving. It asks not just 'can this be solved?', but 'how fast and with how much memory?'"
      />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 text-left">
          
          <CollapsibleTopic
            title="1. What is an Algorithm?"
            icon={Terminal}
            startOpen={true}
          >
            <ContentP>
              An <GlossaryTerm term="Algorithm">Algorithm</GlossaryTerm> is a precise, step-by-step sequence of instructions to solve a problem or perform a computation. It is the logic behind the code.
            </ContentP>
            <ExampleBlock>
              <p><strong>Problem:</strong> Find the largest number in a list.</p>
              <p><strong>Algorithm:</strong></p>
              <ol className="list-decimal pl-5 mt-2 space-y-1 font-mono text-sm">
                <li>Set 'max' to the first number.</li>
                <li>Look at each remaining number one by one.</li>
                <li>If a number is greater than 'max', update 'max'.</li>
                <li>After checking all numbers, 'max' is the largest.</li>
              </ol>
            </ExampleBlock>
          </CollapsibleTopic>

          <CollapsibleTopic
            title="2. Big O Notation (Complexity)"
            icon={Network} // Using Network for complexity graph idea
          >
            <ContentP>
              How do we measure speed? Not in seconds, but in <GlossaryTerm term="Time Complexity">steps</GlossaryTerm>. <strong>Big O Notation</strong> describes how the runtime grows as the input size (<M>n</M>) grows.
            </ContentP>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <TermDefinition term="O(1) - Constant">
                The fastest. Speed doesn't change, no matter how much data. (e.g., Accessing an array index).
              </TermDefinition>
              <TermDefinition term="O(n) - Linear">
                If you double the data, you double the time. (e.g., Reading a book page by page).
              </TermDefinition>
              <TermDefinition term="O(n^2) - Quadratic">
                Slow. Doubling data quadruples the time. (e.g., Nested loops).
              </TermDefinition>
              <TermDefinition term="O(log n) - Logarithmic">
                Very efficient. Doubling data only adds one extra step. (e.g., Binary Search).
              </TermDefinition>
            </div>
            <MBlock>{"T(n) = O(n^2) \\quad \\text{vs} \\quad T(n) = O(n \\log n)"}</MBlock>
          </CollapsibleTopic>

          <CollapsibleTopic
            title="3. Sorting & Searching"
            icon={Shuffle}
          >
            <ContentP>
              Organizing data is fundamental. A sorted list allows for blazing fast searching using <strong>Binary Search</strong>.
            </ContentP>
            <ExampleBlock>
              <p><strong>Binary Search Logic:</strong></p>
              <p>Instead of checking every item, compare the target to the <em>middle</em> item.</p>
              <ul className="list-disc pl-5 mt-2">
                <li>If target is smaller, throw away the right half.</li>
                <li>If target is bigger, throw away the left half.</li>
                <li>Repeat. You cut the problem in half every step!</li>
              </ul>
            </ExampleBlock>
            <SideNote>
              This is why <M>O(\\log n)</M> is so powerful. To search 1,000 items takes 10 steps. To search 1,000,000 items takes only 20 steps!
            </SideNote>
          </CollapsibleTopic>

        </div>

        <aside className="lg:col-span-1 text-left space-y-8">
           {/* Reusing your generic aside styles */}
           <div className="glass rounded-2xl border border-green-800/40 bg-green-900/20 p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-green-300">
              <Terminal size={18} />
              Key Concepts
            </h3>
            <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-300">
              <li><strong>Algorithm:</strong> A step-by-step recipe for solving a problem.</li>
              <li><strong>Big O:</strong> The standard language for discussing efficiency.</li>
              <li><strong>Recursion:</strong> A function that calls itself to solve smaller sub-problems.</li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}