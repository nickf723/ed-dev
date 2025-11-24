"use client";
import StandardLessonLayout from "@/components/layouts/StandardLessonLayout"; // The new component
import LessonHeader, {
  ContentP,
  ContentSubhead,
  TermDefinition,
  SideNote,
  ExampleBlock,
  AppletContainer,
  QuizContainer,
  CollapsibleTopic
} from "@/components/LessonBlocks";
import { M } from "@/components/Math";
import { Atom, BookOpen, Key, AlertTriangle, BookCopy, Activity } from "@/components/icons";

export default function FullLessonPage() {
  return (
    <StandardLessonLayout
      eyebrow="Physics 101"
      title="Kinematics: The Basics"
      subtitle="A sample lesson demonstrating how to structure a complete educational unit."
      symbols={["v", "t", "a", "F"]}
      theme="theme-skeleton"
      // THE SIDEBAR CONTENT GOES HERE
      aside={
        <>
           <KeyConceptsStub />
           <RelatedTopicsStub />
        </>
      }
    >
        {/* MAIN LESSON CONTENT */}
        <LessonHeader icon={Atom} title="1. Introduction to Motion" />
        <ContentP>
            Kinematics is the branch of mechanics that describes the motion of points...
        </ContentP>

        <ContentSubhead title="Position and Displacement" />
        <ContentP>
            To describe motion, we first need to define where an object is.
        </ContentP>
        
        <TermDefinition term="Displacement">
            The vector difference between the final and initial position...
        </TermDefinition>

        <SideNote>
            <p><strong>Note:</strong> Displacement is not the same as distance traveled...</p>
        </SideNote>

        <LessonHeader icon={Activity} title="2. Velocity vs. Speed" />
        <ExampleBlock>
            <p><strong>Calculating Velocity:</strong></p>
            <p>A car travels from position <M>x_i = 0</M> m to <M>x_f = 100</M> m...</p>
        </ExampleBlock>

        <CollapsibleTopic title="Deep Dive: Instantaneous Velocity" icon={BookOpen}>
            <ContentP>
                If we shrink the time interval <M>\Delta t</M> to nearly zero...
            </ContentP>
        </CollapsibleTopic>

        <LessonHeader icon={Activity} title="3. Interactive Lab" />
        <AppletContainer title="Velocity Graph Simulation">
            <div className="h-64 flex items-center justify-center border border-dashed border-neutral-700 text-neutral-500">
                [Interactive Graphing Tool Placeholder]
            </div>
        </AppletContainer>

        <QuizContainer title="Check Your Understanding">
             <div className="h-24 rounded bg-neutral-900/50">{/* Quiz content placeholder */}</div>
        </QuizContainer>

    </StandardLessonLayout>
  );
}

// --- Reusable Sidebar Stubs for the Skeleton ---
function KeyConceptsStub() {
    return (
        <div className="glass rounded-2xl border border-neutral-800/60 p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-neutral-100">
                <Key size={18} /> Key Concepts
            </h3>
            <div className="h-32 rounded bg-neutral-900/50 animate-pulse" />
        </div>
    )
}

function RelatedTopicsStub() {
    return (
        <div className="glass rounded-2xl border border-neutral-800/60 p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-neutral-100">
                <BookCopy size={18} /> Related Topics
            </h3>
            <div className="space-y-3">
                <div className="h-12 rounded bg-neutral-900/50" />
                <div className="h-12 rounded bg-neutral-900/50" />
            </div>
        </div>
    )
}