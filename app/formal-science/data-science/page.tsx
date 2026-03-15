import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Network, Database, LineChart, BrainCircuit, Activity } from 'lucide-react';
import DataScienceBackground from './_components/DataScienceBackground';
import KMeansLab from './_components/KMeansLab';

// Re-using your robust math component!
import { M } from '@/app/_components/Math';

// Routing Grid Array
const DS_TOPICS = [
    {
        id: 'statistics',
        title: 'Statistical Inference',
        description: 'Probability distributions, p-values, and hypothesis testing.',
        icon: LineChart,
        color: 'sky',
        href: '#'
    },
    {
        id: 'supervised',
        title: 'Supervised Learning',
        description: 'Linear regression, decision trees, and training models with labeled data.',
        icon: Target, // Make sure to import Target from lucide-react if you use this
        color: 'emerald',
        href: '#'
    },
    {
        id: 'neural',
        title: 'Deep Learning',
        description: 'Backpropagation, gradient descent, and artificial neural networks.',
        icon: BrainCircuit,
        color: 'violet',
        href: '#'
    },
    {
        id: 'bigdata',
        title: 'Big Data Architecture',
        description: 'Data pipelines, SQL/NoSQL, and distributed computing.',
        icon: Database,
        color: 'amber',
        href: '#'
    }
];

// Fallback import fix
import { Target } from 'lucide-react';

export default function DataSciencePage() {
    return (
        <main className="relative min-h-screen bg-[#050a0f] text-zinc-300 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
            
            <DataScienceBackground />

            <div className="relative z-10 max-w-[85rem] mx-auto px-6 py-12 md:py-24">
                
                {/* HEADER */}
                <header className="mb-16 border-b border-white/10 pb-8 backdrop-blur-sm">
                    <Link href="/formal-science" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
                        <ArrowLeft size={14} /> Formal Science Directory
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-4">
                        <span className="p-2 bg-black/50 border border-cyan-500/30 rounded-lg text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                            <Network size={24} />
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-300/50">
                            Formal Science // Computation
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                        DATA SCIENCE & <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">MACHINE LEARNING</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 font-light max-w-3xl leading-relaxed">
                        Extracting knowledge from noise. Data science utilizes mathematics, statistics, and computer algorithms to uncover hidden patterns in massive datasets, turning raw information into predictive power.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24">
                    
                    {/* LEFT: THEORETICAL TEXT */}
                    <div className="lg:col-span-5 space-y-12">
                        
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Activity className="text-cyan-400" /> The Data Pipeline
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                Before a model can predict the future, data must be cleaned and transformed. Real-world data is messy, incomplete, and highly unstructured.
                            </p>
                            
                            

[Image of the Data Science Lifecycle]


                            <div className="p-5 bg-black/40 border-l-4 border-cyan-500 text-sm text-zinc-300 font-serif italic rounded-r-xl mt-6">
                                "Data is the new oil. It’s valuable, but if unrefined it cannot really be used." — Clive Humby
                            </div>
                        </section>

                        <section className="pt-8 border-t border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <BrainCircuit className="text-indigo-400" /> Unsupervised Learning
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                In <strong>Supervised Learning</strong>, we train models using labeled data (e.g., thousands of pictures explicitly tagged as "cats"). In <strong>Unsupervised Learning</strong>, we throw raw, unlabeled data at an algorithm and ask it to find the structure itself.
                            </p>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                The <strong>K-Means Clustering</strong> algorithm does this by scattering $k$ "centroids" into the data space. It then mathematically groups points based on Euclidean distance:
                            </p>
                            
                            <div className="p-4 bg-zinc-900/50 border border-white/10 rounded-xl flex justify-center overflow-x-auto text-white shadow-inner mb-6">
                                <M display>{String.raw`d(p, q) = \sqrt{(p_x - q_x)^2 + (p_y - q_y)^2}`}</M>
                            </div>

                            
                        </section>

                    </div>

                    {/* RIGHT: INTERACTIVE LAB */}
                    <div className="lg:col-span-7">
                        <div className="sticky top-24">
                            <KMeansLab />
                        </div>
                    </div>

                </div>

                {/* BOTTOM: DOMAIN ROUTING */}
                <div className="pt-16 border-t border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                        <Network className="text-cyan-400" /> Advanced Disciplines
                    </h2>
                    <p className="text-zinc-500 font-light mb-8">Navigate to specialized analytical modules.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {DS_TOPICS.map((topic) => {
                            const Icon = topic.icon;
                            const borderHover = 
                                topic.color === 'cyan' ? 'hover:border-cyan-500/50' :
                                topic.color === 'violet' ? 'hover:border-violet-500/50' :
                                topic.color === 'emerald' ? 'hover:border-emerald-500/50' :
                                topic.color === 'sky' ? 'hover:border-sky-500/50' :
                                'hover:border-amber-500/50';
                                
                            const iconColor = 
                                topic.color === 'cyan' ? 'text-cyan-400' :
                                topic.color === 'violet' ? 'text-violet-400' :
                                topic.color === 'emerald' ? 'text-emerald-400' :
                                topic.color === 'sky' ? 'text-sky-400' :
                                'text-amber-400';

                            return (
                                <Link key={topic.id} href={topic.href} className={`bg-black/40 border border-white/5 p-6 rounded-2xl transition-all duration-300 group hover:-translate-y-1 ${borderHover}`}>
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-3 bg-white/5 rounded-xl ${iconColor}`}>
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