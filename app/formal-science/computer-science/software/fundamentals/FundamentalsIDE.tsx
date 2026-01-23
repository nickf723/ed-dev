"use client";
import React from "react";
import { Play, Terminal, Cpu, Database } from "lucide-react";
import { CodeConcept } from "./fundamentals-data";

// Simple Syntax Highlighter
const highlight = (code: string) => {
  const keywords = ["int", "float", "string", "bool", "if", "else", "for", "while", "function", "class", "try", "catch", "return", "new", "this", "map"];
  const operators = ["=", "+", "-", "*", "/", "<", ">", "!", "++", "--"];
  
  return code.split(/(\s+|[(){};[\],])/).map((word, i) => {
    if (keywords.includes(word)) return <span key={i} className="text-purple-400 font-bold">{word}</span>;
    if (operators.includes(word)) return <span key={i} className="text-pink-500">{word}</span>;
    if (!isNaN(Number(word))) return <span key={i} className="text-orange-400">{word}</span>;
    if (word.startsWith('"') || word.endsWith('"')) return <span key={i} className="text-emerald-400">{word}</span>;
    if (word.startsWith('//')) return <span key={i} className="text-stone-500 italic">{word}</span>;
    return <span key={i} className="text-stone-300">{word}</span>;
  });
};

export default function FundamentalsIDE({ concept }: { concept: CodeConcept }) {
  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-[#121212] border border-green-900/50 rounded-xl overflow-hidden shadow-2xl relative font-mono">
      
      {/* LEFT: EDITOR & CONSOLE */}
      <div className="flex-1 flex flex-col min-h-[400px] border-r border-green-900/30">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#0a0a0a] border-b border-green-900/30">
            <div className="flex gap-2">
               <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
               <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
               <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
            </div>
            <div className="text-[10px] uppercase text-stone-500 flex items-center gap-2">
                <Terminal size={10} /> script.js
            </div>
          </div>

          {/* Code Area */}
          <div className="flex-1 p-6 text-sm overflow-auto bg-[#121212] relative group">
             <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-green-900/20 border border-green-500/30 rounded text-green-400 text-[10px] font-bold uppercase tracking-widest hover:bg-green-500 hover:text-black transition-all">
                      <Play size={10} /> Run
                  </button>
             </div>
             <div className="flex gap-4">
                 <div className="flex flex-col text-right text-stone-700 select-none text-xs pt-0.5">
                     {[1,2,3,4,5,6,7,8,9,10].map(n => <span key={n}>{n}</span>)}
                 </div>
                 <div className="whitespace-pre-wrap leading-relaxed">
                     {concept.snippet.split('\n').map((line, i) => (
                         <div key={i}>{highlight(line)}</div>
                     ))}
                 </div>
             </div>
          </div>

          {/* Console */}
          <div className="h-32 bg-[#050505] border-t border-green-900/30 p-4 text-xs">
              <div className="flex items-center gap-2 text-green-700 mb-2 font-bold tracking-widest">
                  <Terminal size={12} /> TERMINAL
              </div>
              <div className="text-green-400/90 whitespace-pre-wrap">
                  {concept.output}
                  <span className="inline-block w-1.5 h-3 bg-green-500 ml-1 animate-pulse align-middle" />
              </div>
          </div>
      </div>

      {/* RIGHT: MEMORY STACK */}
      <div className="w-full md:w-64 bg-[#0a0a0a] flex flex-col">
          <div className="px-4 py-3 bg-[#080808] border-b border-green-900/30 text-[10px] font-bold uppercase tracking-widest text-stone-500 flex items-center gap-2">
              <Cpu size={12} /> Memory Stack
          </div>
          
          <div className="p-4 space-y-3 overflow-y-auto">
              {concept.memory.map((mem, i) => (
                  <div key={i} className="bg-[#151515] border border-white/5 rounded p-2 text-xs relative group hover:border-green-500/30 transition-colors">
                      <div className="flex justify-between items-center mb-1">
                          <span className="text-purple-400 font-bold">{mem.name}</span>
                          <span className="text-[9px] text-stone-600 bg-white/5 px-1 rounded">{mem.type}</span>
                      </div>
                      <div className="text-emerald-400 font-mono truncate">
                          {mem.val}
                      </div>
                      {/* Memory Address Decoration */}
                      <div className="absolute -left-2 top-2 text-[8px] text-stone-700 opacity-0 group-hover:opacity-100 font-mono">
                          0x{1000 + i*4}
                      </div>
                  </div>
              ))}
              
              <div className="mt-4 pt-4 border-t border-white/5 text-center">
                  <div className="text-[9px] text-stone-600 flex items-center justify-center gap-1">
                      <Database size={10} /> Heap Usage: 12%
                  </div>
                  <div className="w-full h-1 bg-stone-800 rounded-full mt-1 overflow-hidden">
                      <div className="w-[12%] h-full bg-green-600" />
                  </div>
              </div>
          </div>
      </div>

    </div>
  );
}