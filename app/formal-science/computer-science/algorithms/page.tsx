"use client";
import React from "react";
import { AlgorithmsBackground } from "./AlgorithmsBackground";
import { DashboardCard } from "@/components/ui/DashboardCard"; // <--- CORRECT PATH
import { 
  GitGraph, 
  Search, 
  SortAsc, 
  Database, 
  FunctionSquare, 
  Network, 
  Binary,
  Cpu
} from "lucide-react";

export default function AlgorithmsPage() {
  return (
    <div className="p-8 md:p-12 min-h-screen space-y-12 animate-in fade-in duration-500 font-mono">
      <AlgorithmsBackground />
      
      {/* HERO SECTION */}
      <header className="flex flex-col gap-4 border-l-4 border-emerald-500 pl-6 py-2">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest">
            <Cpu size={14} />
            <span>Optimization Protocol</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
          ALGORITHMS
        </h1>
        <p className="text-slate-400 max-w-xl text-lg">
          The mathematical recipes that power computation. From sorting data to traversing networks.
        </p>
      </header>

      {/* THE ALGORITHM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* 1. SORTING (The Classic) */}
        <DashboardCard 
          title="Sorting" 
          icon={SortAsc} 
          href="/learn/sorting"
          accentColor="emerald"
          className="bg-black/60 border-emerald-500/20"
        >
          <div className="mt-auto space-y-2">
            <div className="flex gap-1 h-8 items-end justify-between px-4 opacity-50">
               <div className="w-1 bg-emerald-500 h-[30%]" />
               <div className="w-1 bg-emerald-500 h-[50%]" />
               <div className="w-1 bg-emerald-500 h-[80%]" />
               <div className="w-1 bg-emerald-500 h-[100%]" />
               <div className="w-1 bg-emerald-500 h-[40%]" />
               <div className="w-1 bg-emerald-500 h-[60%]" />
            </div>
            <div className="text-xs text-slate-500 text-center">
                Quick • Merge • Heap • Bubble
            </div>
          </div>
        </DashboardCard>

        {/* 2. SEARCH (The Finder) */}
        <DashboardCard 
          title="Search" 
          icon={Search} 
          href="/learn/search"
          accentColor="cyan"
          className="bg-black/60 border-cyan-500/20"
        >
           <div className="mt-auto flex items-center justify-between text-xs text-cyan-300">
              <span>Binary Search</span>
              <span className="font-bold">O(log n)</span>
           </div>
        </DashboardCard>

        {/* 3. GRAPHS (The Network) */}
        <DashboardCard 
          title="Graph Theory" 
          icon={Network} 
          href="/learn/graphs"
          accentColor="purple"
          className="bg-black/60 border-purple-500/20"
        >
           <div className="mt-auto text-xs text-purple-300 flex flex-wrap gap-2">
              <span className="bg-purple-900/30 px-1 rounded">Dijkstra</span>
              <span className="bg-purple-900/30 px-1 rounded">A* Star</span>
              <span className="bg-purple-900/30 px-1 rounded">BFS/DFS</span>
           </div>
        </DashboardCard>

        {/* 4. BIG O (The Complexity - Large Card) */}
        <DashboardCard 
          title="Complexity Analysis" 
          icon={FunctionSquare} 
          href="/learn/complexity"
          accentColor="orange"
          className="lg:col-span-2 bg-gradient-to-r from-orange-950/20 to-black/60 border-orange-500/20"
        >
          <div className="flex items-end justify-between mt-auto">
             <div>
                <div className="text-3xl font-black text-white">Big O</div>
                <div className="text-xs text-orange-400">Time & Space Complexity</div>
             </div>
             {/* Mini Chart Visualization */}
             <div className="flex items-end gap-1 h-12 w-24">
                <div className="w-1 bg-green-500 h-[10%]" title="O(1)" />
                <div className="w-1 bg-green-400 h-[20%]" title="O(log n)" />
                <div className="w-1 bg-yellow-400 h-[40%]" title="O(n)" />
                <div className="w-1 bg-orange-500 h-[70%]" title="O(n^2)" />
                <div className="w-1 bg-red-600 h-[100%]" title="O(n!)" />
             </div>
          </div>
        </DashboardCard>

        {/* 5. TREES (The Hierarchy) */}
        <DashboardCard 
          title="Trees & Heaps" 
          icon={GitGraph} 
          href="/learn/trees"
          accentColor="emerald"
          className="bg-black/60 border-emerald-500/20"
        >
           <div className="mt-auto text-xs text-slate-400">
              Binary Trees • AVL • Red-Black • Tries
           </div>
        </DashboardCard>

        {/* 6. HASHING (The Map) */}
        <DashboardCard 
          title="Hash Maps" 
          icon={Database} 
          href="/learn/hashing"
          accentColor="cyan"
          className="bg-black/60 border-cyan-500/20"
        >
           <div className="flex items-center gap-2 mt-auto">
              <div className="text-[10px] font-mono text-cyan-500 bg-cyan-950/20 px-1 border border-cyan-500/30">
                 KEY: "ID_01"
              </div>
              <div className="w-4 h-px bg-cyan-500" />
              <div className="text-[10px] font-mono text-white bg-cyan-900/50 px-1">
                 VAL: 0x4F
              </div>
           </div>
        </DashboardCard>

        {/* 7. DYNAMIC PROGRAMMING (The Optimizer) */}
        <DashboardCard 
          title="Dynamic Programming" 
          icon={Binary} 
          href="/learn/dynamic-programming"
          accentColor="purple"
          className="lg:col-span-3 bg-gradient-to-r from-purple-950/20 via-black/40 to-black/40 border-purple-500/20"
        >
           <div className="flex items-center justify-between mt-auto">
              <div className="text-sm font-bold text-white">
                 Breaking problems into sub-problems.
              </div>
              <div className="text-[10px] font-mono text-purple-400 opacity-70">
                 MEMOIZATION • TABULATION
              </div>
           </div>
        </DashboardCard>

      </div>
    </div>
  );
}