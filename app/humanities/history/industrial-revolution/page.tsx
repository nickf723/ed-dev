"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import {
  BlockQuote,
  ContentP,
  LessonImage
} from "@/components/LessonBlocks";
import { Factory, Hammer, TrainFront, Zap, Globe } from "@/components/icons";
import Link from "next/link";

// Custom Timeline Item for this page
function EventCard({ year, title, desc, Icon }: { year: string, title: string, desc: string, Icon: any }) {
    return (
        <div className="relative flex gap-6 pb-16 last:pb-0 group">
            <div className="absolute left-[23px] top-12 bottom-0 w-0.5 bg-neutral-800 group-hover:bg-amber-900/50 transition-colors" />
            <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 shadow-md transition-all group-hover:border-amber-500/50 group-hover:text-amber-400 text-neutral-500">
                <Icon size={20} />
            </div>
            <div className="glass p-6 rounded-xl border-neutral-800 flex-1 hover:border-amber-900/30 transition-all">
                <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-xl font-bold text-neutral-200">{title}</h3>
                    <span className="font-mono text-amber-500/80 text-sm">{year}</span>
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}

export default function IndustrialRevPage() {
  return (
    <main className="topic-page theme-humanities lg:px-16">
      <FloatingSymbols symbols={["Coal", "Steam", "Iron", "Capital"]} />
      <PageHeader
        eyebrow="Late Modern History"
        title="The Industrial Revolution"
        subtitle="The transition to new manufacturing processes in Great Britain, continental Europe, and the United States."
      />

      <div className="w-full max-w-3xl mx-auto text-left pb-24">
        
        <ContentP>
            Before the late 18th century, most manufacturing was done in homes using hand tools or basic machines. Industrialization marked a shift to powered, special-purpose machinery, factories and mass production.
        </ContentP>

        <BlockQuote author="William Blake" source="Jerusalem">
            And did the Countenance Divine,<br/>
            Shine forth upon our clouded hills?<br/>
            And was Jerusalem builded here,<br/>
            Among these dark Satanic Mills?
        </BlockQuote>

        <div className="mt-12 pl-2">
            <EventCard 
                year="1712" 
                title="The Newcomen Engine" 
                desc="Thomas Newcomen invents the first practical steam engine for pumping water out of mines."
                Icon={Zap}
            />
            <EventCard 
                year="1764" 
                title="The Spinning Jenny" 
                desc="James Hargreaves invents a machine that allows one worker to spin eight threads at once."
                Icon={Hammer}
            />
            <EventCard 
                year="1769" 
                title="Watt's Steam Engine" 
                desc="James Watt improves the steam engine, making it efficient enough to power machinery in factories."
                Icon={Factory}
            />
            <EventCard 
                year="1825" 
                title="First Public Railway" 
                desc="The Stockton and Darlington Railway opens, the first to use steam locomotives to carry passengers."
                Icon={TrainFront}
            />
            <EventCard 
                year="1851" 
                title="The Great Exhibition" 
                desc="Britain showcases its industrial dominance to the world at the Crystal Palace in London."
                Icon={Globe}
            />
        </div>

      </div>
    </main>
  );
}