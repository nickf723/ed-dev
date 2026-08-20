"use client";

import { Braces, Database, Terminal } from "lucide-react";
import type { CodeConcept } from "./fundamentals-data";

const KEYWORDS = new Set(["int", "float", "string", "bool", "if", "else", "for", "while", "function", "class", "try", "catch", "return", "new", "this", "map"]);

function highlight(line: string) {
  return line.split(/(\s+|[(){};[\],])/).map((word, index) => {
    if (KEYWORDS.has(word)) return <span key={index} className="font-semibold text-violet-300">{word}</span>;
    if (/^-?\d+(?:\.\d+)?$/.test(word)) return <span key={index} className="text-amber-300">{word}</span>;
    if (word.startsWith("//")) return <span key={index} className="italic text-slate-600">{word}</span>;
    if (word.includes('"')) return <span key={index} className="text-emerald-300">{word}</span>;
    return <span key={index} className="text-slate-300">{word}</span>;
  });
}

export default function FundamentalsIDE({ concept }: { concept: CodeConcept }) {
  const lines = concept.snippet.split("\n");

  return (
    <section className="overflow-hidden rounded-[24px] border border-green-200/[0.10] bg-black/[0.17] font-mono backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] px-4 py-3">
        <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.10em] text-green-200/52"><Braces size={12} /> Illustrative pseudocode</div>
        <div className="text-[8px] uppercase tracking-[0.09em] text-slate-700">concept trace · not executed</div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="border-b border-white/[0.07] lg:border-b-0 lg:border-r">
          <div className="min-h-[300px] overflow-auto p-5 text-[12px] leading-6">
            <div className="grid grid-cols-[28px_minmax(0,1fr)] gap-3">
              <div className="select-none text-right text-[10px] text-slate-800">{lines.map((_, index) => <div key={index}>{index + 1}</div>)}</div>
              <div className="whitespace-pre-wrap">{lines.map((line, index) => <div key={index}>{highlight(line)}</div>)}</div>
            </div>
          </div>
          <div className="border-t border-white/[0.07] bg-black/[0.14] p-4">
            <div className="flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.10em] text-green-200/44"><Terminal size={11} /> Expected output</div>
            <pre className="mt-2 whitespace-pre-wrap text-[10px] leading-5 text-green-200/72">{concept.output}</pre>
          </div>
        </div>

        <aside className="p-4 sm:p-5">
          <div className="flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.10em] text-cyan-200/44"><Database size={11} /> Conceptual state</div>
          <p className="mt-2 text-[9px] leading-4 text-slate-600">These bindings illustrate values relevant to the example. They are not a literal heap, stack frame, or memory-address dump.</p>
          <div className="mt-4 space-y-2">
            {concept.memory.map((binding) => (
              <div key={`${binding.name}-${binding.type}`} className="rounded-[13px] border border-white/[0.06] bg-black/[0.10] p-3">
                <div className="flex items-center justify-between gap-3"><strong className="text-[10px] text-violet-200/72">{binding.name}</strong><span className="rounded border border-white/[0.06] px-1.5 py-0.5 text-[7px] uppercase text-slate-700">{binding.type}</span></div>
                <div className="mt-1 truncate text-[10px] text-emerald-200/66">{binding.val}</div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
