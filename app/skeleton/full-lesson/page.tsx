"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
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
import { M, MBlock } from "@/components/Math";
import { Atom, BookOpen } from "@/components/icons";
import { Activity } from "lucide-react";

export default function FullLessonPage() {
  return (
    <main className="topic-page theme-skeleton lg:px-16">
      <FloatingSymbols symbols={["v", "t", "a", "F"]} />
      <PageHeader
        eyebrow="Physics 101"
        title="Kinematics: The Basics"
        subtitle="A sample lesson demonstrating how to structure a complete educational unit."
      />

      <div className="w-full max-w-4xl mx-auto text-left pb-24">
        
        <LessonHeader icon={Atom} title="1. Introduction to Motion" />
        <ContentP>
            Kinematics is the branch of mechanics that describes the motion of points, bodies (objects), and systems of bodies (groups of objects) without considering the forces that cause them to move.
        </ContentP>

        <ContentSubhead title="Position and Displacement" />
        <ContentP>
            To describe motion, we first need to define where an object is.
        </ContentP>
        
        <TermDefinition term="Displacement">
            The vector difference between the final and initial position of a point. It represents the shortest distance between two points.
        </TermDefinition>

        <SideNote>
            <p><strong>Note:</strong> Displacement is not the same as distance traveled. If you run a full lap around a track and end up where you started, your displacement is zero!</p>
        </SideNote>

        <LessonHeader icon={Activity} title="2. Velocity vs. Speed" />
        <ContentP>
            Velocity is a vector quantity, meaning it has both magnitude and direction. The average velocity is defined as:
        </ContentP>

        <ExampleBlock>
            <p><strong>Calculating Velocity:</strong></p>
            <p>A car travels from position <M>x_i = 0</M> m to <M>x_f = 100</M> m in 5 seconds.</p>
            <p className="mt-2 font-mono text-green-200/80">
                v = (100 - 0) / 5 = 20 m/s
            </p>
        </ExampleBlock>

        <CollapsibleTopic title="Deep Dive: Instantaneous Velocity" icon={BookOpen}>
            <ContentP>
                If we shrink the time interval <M>\Delta t</M> to nearly zero, we get the instantaneous velocity. This requires calculus limits:
            </ContentP>
        </CollapsibleTopic>

        <LessonHeader icon={Activity} title="3. Interactive Lab" />
        <AppletContainer title="Velocity Graph Simulation">
            <div className="h-64 flex items-center justify-center border border-dashed border-neutral-700 text-neutral-500">
                [Interactive Graphing Tool Placeholder]
            </div>
        </AppletContainer>

        <QuizContainer title="Check Your Understanding">
            <div className="space-y-4">
                <p className="text-neutral-300">1. Is velocity a scalar or a vector?</p>
                <div className="flex gap-4">
                    <button className="px-4 py-2 rounded border border-neutral-700 hover:bg-neutral-800 text-neutral-400">Scalar</button>
                    <button className="px-4 py-2 rounded border border-neutral-700 hover:bg-indigo-900/50 hover:border-indigo-500 text-neutral-400 hover:text-indigo-300">Vector</button>
                </div>
            </div>
        </QuizContainer>

      </div>
    </main>
  );
}