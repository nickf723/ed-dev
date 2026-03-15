"use client";
import React from "react";
import { BookOpen, ArrowUpRight } from "lucide-react";
import { GlossaryDatabase } from "@/lib/glossary/types"; // Adjust path as needed
import Link from "next/link";

interface VocabModuleProps {
  terms: GlossaryDatabase;
  title?: string;
}

export default function VocabModule({ terms, title = "Key Terminology" }: VocabModuleProps) {
  const entries = Object.entries(terms).sort(([a], [b]) => a.localeCompare(b));

  return (
    <div className="rounded-xl border border-cyan-900/30 bg-cyan-950/10 p-6 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-6 border-b border-cyan-900/30 pb-4">
        <BookOpen size={18} className="text-cyan-400" />
        <h3 className="text-sm font-bold uppercase tracking-widest text-cyan-100">
          {title}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {entries.map(([term, data]) => (
          <div 
            key={term} 
            className="group relative flex flex-col gap-1 rounded-lg bg-black/20 p-3 transition-all hover:bg-cyan-900/20"
          >
            <div className="flex items-baseline justify-between">
                <span className="font-bold text-cyan-200 text-sm">{term}</span>
                {data.tags && (
                    <div className="flex gap-1">
                        {data.tags.map(tag => (
                            <span key={tag} className="text-[9px] uppercase tracking-wider text-cyan-600/80 border border-cyan-900/30 px-1 rounded">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
              {data.definition}
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-cyan-900/30 text-center">
          <Link href="/glossary" className="text-[10px] uppercase tracking-widest text-cyan-600 hover:text-cyan-400 transition-colors flex items-center justify-center gap-1">
              View Full Database <ArrowUpRight size={10} />
          </Link>
      </div>
    </div>
  );
}