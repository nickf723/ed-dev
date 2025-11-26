"use client";
import VocabTerm from "@/components/VocabTerm";
import { Quote } from "lucide-react";

export default function VocabDemoWidget() {
  return (
    <div className="glass rounded-xl border border-white/10 bg-neutral-900/50 p-8 max-w-2xl mx-auto mt-12">
        
        <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
            <Quote className="text-pink-500" size={20} />
            <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400">
                Contextual Learning Demo
            </h3>
        </div>

        <div className="space-y-6 text-lg leading-relaxed text-neutral-300 font-serif">
            <p>
                To understand the German soul, one must understand their <VocabTerm id="zeitgeist">Zeitgeist</VocabTerm>. 
                It is not merely a mood, but the invisible force that shapes an era.
            </p>
            
            <p>
                Similarly, in Japan, the concept of <VocabTerm id="ikigai">Ikigai</VocabTerm> drives daily life. 
                It is what gets you out of bed in the morning—a stark contrast to the passive accumulation 
                of <VocabTerm id="tsundoku">Tsundoku</VocabTerm> that plagues many intellectuals.
            </p>

            <p>
                From a philosophical perspective, we can accept these cultural differences <VocabTerm id="a_priori">a priori</VocabTerm>, 
                without needing empirical evidence to see their value.
            </p>
        </div>

        <div className="mt-8 pt-4 border-t border-white/5 text-center">
            <p className="text-xs text-neutral-500 font-mono">
                Hover or click the highlighted terms to reveal the Vocabulary Database entry.
            </p>
        </div>

    </div>
  );
}