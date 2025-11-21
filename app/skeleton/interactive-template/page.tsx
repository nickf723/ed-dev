"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import {
  AppletContainer,
  QuizContainer,
  PracticeProblem,
  ContentTabs,
  ContentP
} from "@/components/LessonBlocks";
import {
  CheckCircle,
  ListStart,
  Play,
  } from "@/components/icons";
import { Settings } from "lucide-react";

export default function InteractiveTemplatePage() {
  return (
    <main className="topic-page theme-skeleton lg:px-16">
      <FloatingSymbols symbols={["RUN", "TEST", "If/Else"]} />
      <PageHeader
        eyebrow="Skeleton"
        title="Interactive Template"
        subtitle="Testing the layout and behavior of dynamic lesson components."
      />

      <div className="w-full max-w-4xl mx-auto text-left space-y-12 pb-24">

        {/* Applet Container */}
        <section>
            <h2 className="text-xl font-bold text-pink-400 border-b border-pink-500/30 pb-2 mb-6">1. Applet Container</h2>
            <AppletContainer title="Interactive Simulation Wrapper">
                <div className="flex flex-col items-center justify-center gap-4 p-8 border border-dashed border-neutral-700 rounded-lg">
                    <Settings className="animate-spin text-neutral-500" size={48} />
                    <p className="text-neutral-400 text-sm">Custom React components (calculators, graphs, games) go here.</p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-cyan-600 rounded hover:bg-cyan-500 transition-colors text-white font-bold">Start</button>
                        <button className="px-4 py-2 border border-neutral-600 rounded hover:bg-neutral-800 transition-colors text-neutral-300">Reset</button>
                    </div>
                </div>
            </AppletContainer>
        </section>

        {/* Content Tabs */}
        <section>
            <h2 className="text-xl font-bold text-pink-400 border-b border-pink-500/30 pb-2 mb-6">2. Content Tabs</h2>
            <ContentTabs 
                items={[
                    {
                        title: "Tab One",
                        icon: ListStart,
                        content: <div className="p-4"><ContentP>Content for the first tab. Useful for showing multiple methods to solve a single problem.</ContentP></div>
                    },
                    {
                        title: "Tab Two",
                        icon: CheckCircle,
                        content: <div className="p-4"><ContentP>Content for the second tab. Keeps the UI uncluttered.</ContentP></div>
                    },
                    {
                        title: "Video Tab",
                        icon: Play,
                        content: <div className="p-4 flex justify-center items-center h-32 bg-black/40 rounded"><span className="text-neutral-500">Video Placeholder</span></div>
                    }
                ]}
            />
        </section>

        {/* Practice & Quiz */}
        <section>
            <h2 className="text-xl font-bold text-pink-400 border-b border-pink-500/30 pb-2 mb-6">3. Assessment</h2>
            
            <div className="space-y-4">
                <PracticeProblem 
                    question="What is the purpose of a PracticeProblem component?"
                    solution="To provide immediate, low-stakes feedback to the learner via a 'Show Solution' toggle."
                />
                
                <QuizContainer title="Topic Quiz">
                    <div className="p-4 text-center text-neutral-400 italic">
                        (Quiz Logic/State would be implemented here)
                    </div>
                    <button className="w-full py-3 rounded-md bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/30 transition-all">
                        Start Quiz
                    </button>
                </QuizContainer>
            </div>
        </section>

      </div>
    </main>
  );
}