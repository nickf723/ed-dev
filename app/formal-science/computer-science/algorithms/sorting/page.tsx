import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BarChart2, Layers, Clock, Zap, Cpu, SplitSquareHorizontal } from 'lucide-react';
import SortingBackground from './_components/SortingBackground';
import SortingVisualizer from './_components/SortingVisualizer';
import { M } from '@/app/_components/Math';

const SORTING_TOPICS = [
    {
        id: 'heapsort',
        title: 'Heap Sort',
        description: 'Utilizes a binary heap data structure to continuously extract the maximum element.',
        icon: Cpu,
        color: 'fuchsia',
        href: '#'
    },
    {
        id: 'radixsort',
        title: 'Radix Sort',
        description: 'A non-comparative integer sorting algorithm that sorts data with integer keys by grouping digits.',
        icon: SplitSquareHorizontal,
        color: 'emerald',
        href: '#'
    }
];

export default function SortingAlgorithmsPage() {
    return (
        <main className="relative min-h-screen bg-[#09090b] text-zinc-300 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
            
            <SortingBackground />

            <div className="relative z-10 max-w-[85rem] mx-auto px-6 py-12 md:py-24">
                
                <header className="mb-16 border-b border-white/10 pb-8 backdrop-blur-sm">
                    <Link href="/formal-science/computer-science" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
                        <ArrowLeft size={14} /> Computer Science Hub
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-4">
                        <span className="p-2 bg-black/50 border border-indigo-500/30 rounded-lg text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                            <BarChart2 size={24} />
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-indigo-300/50">
                            Algorithms // Data Structures
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                        SORTING & <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">BIG O NOTATION</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 font-light max-w-3xl leading-relaxed">
                        Organizing chaotic data into sequential order is one of the most thoroughly studied problems in computer science. How you sort your data dictates how fast your database can search, query, and retrieve information.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24">
                    
                    <div className="lg:col-span-5 space-y-12">
                        
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Clock className="text-indigo-400" /> Time Complexity
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                Not all algorithms are created equal. We measure the efficiency of an algorithm using <strong>Big O Notation</strong>, which describes how the runtime scales as the dataset grows larger.
                            </p>
                            
                            <div className="space-y-4 mb-6">
                                <div className="p-4 bg-zinc-900/50 border border-white/5 rounded-xl flex items-center gap-4">
                                    <div className="w-24 text-center font-bold text-rose-400 bg-rose-500/10 py-2 rounded">
                                        <M>{String.raw`O(n^2)`}</M>
                                    </div>
                                    <div className="text-sm text-zinc-400">Quadratic. As data doubles, time quadruples. (Bubble, Insertion, Selection)</div>
                                </div>
                                <div className="p-4 bg-zinc-900/50 border border-white/5 rounded-xl flex items-center gap-4 shadow-[0_0_15px_rgba(14,165,233,0.1)]">
                                    <div className="w-24 text-center font-bold text-sky-400 bg-sky-500/10 py-2 rounded">
                                        <M>{String.raw`O(n \log n)`}</M>
                                    </div>
                                    <div className="text-sm text-zinc-400">Linearithmic. The mathematical speed limit for comparative sorting. (Quick, Merge)</div>
                                </div>
                            </div>
                        </section>

                        <section className="pt-8 border-t border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Layers className="text-emerald-400" /> Divide and Conquer
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                The <M>{String.raw`O(n^2)`}</M> algorithms waste time comparing elements that are already relatively sorted. To reach <M>{String.raw`O(n \log n)`}</M> speeds, we must use recursion.
                            </p>
                            
                            

                            <div className="p-5 bg-black/40 border-l-4 border-emerald-500 text-sm text-zinc-300 font-serif italic rounded-r-xl mt-6">
                                <strong>Merge Sort</strong> works by recursively halving the array until every element is isolated. Then, it "merges" them back together, sorting them perfectly as it zips the halves up.
                            </div>
                            <p className="text-zinc-400 leading-relaxed font-light mt-4">
                                Try running <em>Selection Sort</em>, randomizing the array, and then running <em>Merge Sort</em>. The difference in speed and strategy is incredibly obvious when visualized.
                            </p>
                            
                            
                        </section>

                    </div>

                    <div className="lg:col-span-7">
                        <div className="sticky top-24">
                            <SortingVisualizer />
                        </div>
                    </div>

                </div>

                <div className="pt-16 border-t border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                        <Cpu className="text-indigo-400" /> Further Optimization
                    </h2>
                    <p className="text-zinc-500 font-light mb-8">Move beyond comparative sorting to explore memory constraints and integer keys.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {SORTING_TOPICS.map((topic) => {
                            const Icon = topic.icon;
                            return (
                                <Link key={topic.id} href={topic.href} className="bg-black/40 border border-white/5 p-6 rounded-2xl transition-all duration-300 group hover:-translate-y-1 hover:border-indigo-500/50">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-3 bg-white/5 rounded-xl text-indigo-400">
                                            <Icon size={24} />
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-white mb-2 group-hover:text-white transition-colors">
                                        {topic.title}
                                    </h3>
                                    <p className="text-xs text-zinc-400 leading-relaxed">
                                        {topic.description}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                </div>

            </div>
        </main>
    );
}