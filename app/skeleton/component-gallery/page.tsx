"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import LessonHeader, {
  ContentP,
  ContentSubhead,
  TermDefinition,
  SideNote,
  ExampleBlock,
  StepByStepSolution,
  CollapsibleTopic,
} from "@/components/LessonBlocks";
import {
  BookOpen,
  Palette,
  Lightbulb
} from "@/components/icons";

export default function ComponentGalleryPage() {
  return (
    <main className="topic-page theme-skeleton lg:px-16">
      <FloatingSymbols symbols={["Aa", "¶", "§"]} />
      <PageHeader
        eyebrow="Skeleton"
        title="Component Gallery"
        subtitle="A showcase of all static text and layout components."
      />

      <div className="w-full max-w-4xl mx-auto text-left space-y-12 pb-24">
        
        {/* Typography Section */}
        <section>
          <h2 className="text-xl font-bold text-pink-400 border-b border-pink-500/30 pb-2 mb-6">1. Headers & Text</h2>
          
          <LessonHeader icon={BookOpen} title="Lesson Header Component" />
          <ContentP>
            This is a <strong>ContentP</strong> (Content Paragraph). It handles standard body text with proper leading and text color.
          </ContentP>
          <ContentSubhead title="Content Subhead Component" />
          <ContentP>
            Used to break up sections within a topic.
          </ContentP>
        </section>

        {/* Callouts Section */}
        <section>
          <h2 className="text-xl font-bold text-pink-400 border-b border-pink-500/30 pb-2 mb-6">2. Callouts & Definitions</h2>
          
          <TermDefinition term="Term Definition Block">
            This component is used to define glossary terms inline. It highlights the term and provides a distinct background to separate it from the flow of text.
          </TermDefinition>

          <SideNote>
            <p><strong>SideNote Component:</strong></p>
            <p>Useful for interesting facts, historical context, or tangentially related information that adds flavor without breaking the core lesson flow.</p>
          </SideNote>

          <ExampleBlock>
            <p><strong>Example Block:</strong></p>
            <p>Used to show concrete examples of abstract concepts.</p>
            <ul className="list-disc pl-5 mt-2 text-sm">
                <li>Step 1: Identify the variable.</li>
                <li>Step 2: Substitute the value.</li>
            </ul>
          </ExampleBlock>
        </section>

        {/* Complex Layouts */}
        <section>
          <h2 className="text-xl font-bold text-pink-400 border-b border-pink-500/30 pb-2 mb-6">3. Complex Layouts</h2>
          
          <StepByStepSolution 
            title="Step-by-Step Solution (Click to Expand)"
            steps={[
                "This component reveals steps one by one.",
                "It is useful for long derivations or proofs.",
                "Keeps the initial page view clean."
            ]}
          />

          <CollapsibleTopic title="Collapsible Topic Section" icon={Palette}>
            <ContentP>
                This is the primary wrapper for a lesson section. It keeps long pages manageable by allowing users to collapse sections they have already finished.
            </ContentP>
            <SideNote>
                It can contain any other component inside it!
            </SideNote>
          </CollapsibleTopic>
        </section>

      </div>
    </main>
  );
}