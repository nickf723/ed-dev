"use client";
import PageHeader from "@/components/PageHeader";
import FourierLesson from "@/app/stage/FourierLesson";
import { Clapperboard } from "lucide-react";

export default function StagePage() {
  return (
    <main className="relative min-h-screen bg-[#050505] lg:px-12 pb-20">
      
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col py-10 items-center">
        
        <PageHeader
          eyebrow="Production Studio"
          title="The Stage"
          subtitle="Render farm for educational shorts. This viewport is locked to a 1080x1080 master format."
        />

        {/* The Production Unit */}
        <div className="w-full flex justify-center mt-8">
            <FourierLesson />
        </div>

        <div className="mt-12 p-6 border border-dashed border-neutral-800 rounded-xl max-w-2xl w-full text-center">
            <div className="flex items-center justify-center gap-2 text-neutral-400 mb-2">
                <Clapperboard size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Workflow</span>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed">
                1. Set screen recorder to capture the square video area.<br/>
                2. Press Play on the Control Desk.<br/>
                3. For TikTok/Reels: Place the square video in the center of a 9:16 frame and add a blurred copy of the video behind it to fill the screen.
            </p>
        </div>

      </div>
    </main>
  );
}