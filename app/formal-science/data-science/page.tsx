"use client";
import ClusterBackground from "@/app/formal-science/data-science/ClusterBackground";
import DistributionWidget from "@/app/formal-science/data-science/DistributionWidget";
import { motion } from "framer-motion";
import {
  ChartScatter,
  BrainCog,
  Table,
  Target,
  Database,
  Eye,
} from "lucide-react"; 

// Helper for icons if needed
import { BarChart, Filter, Layers, Network } from "lucide-react";

// --- DATA ---
const sectors = [
  {
    name: "Inference & Prediction",
    desc: "Using math to uncover patterns and predict future events.",
    color: "text-amber-400",
    icon: BrainCog,
    items: [
      {
        title: "Statistical Inference",
        desc: "Drawing conclusions about a population from a sample using probability theory.",
        href: "/formal-science/data-science/statistical-modeling",
        Icon: ChartScatter,
        className: "theme-data-science",
        subtitle: "Hypothesis Testing"
      },
      {
        title: "Machine Learning",
        desc: "Algorithms that improve automatically through experience. Classification, Regression, and Clustering.",
        href: "/formal-science/data-science/machine-learning",
        Icon: Network,
        className: "theme-data-science",
        subtitle: "Automated Learning"
      }
    ]
  },
  {
    name: "Data Engineering",
    desc: "The architecture of data. Cleaning, storing, and structuring information.",
    color: "text-orange-500",
    icon: Database,
    items: [
      {
        title: "Data Wrangling",
        desc: "The process of cleaning and transforming raw data into a usable format.",
        href: "/formal-science/data-science/data-wrangling",
        Icon: Filter,
        className: "theme-data-science",
        subtitle: "Pre-processing"
      },
      {
        title: "Experiment Design",
        desc: "Designing A/B tests and trials to establish causality rather than just correlation.",
        href: "/formal-science/data-science/experiment-design",
        Icon: Target,
        className: "theme-data-science",
        subtitle: "Causality"
      }
    ]
  }
];

// Static Pipeline Data for Sidebar
const pipeline = [
  { title: "Collection", desc: "APIs, Sensors", Icon: Database },
  { title: "Processing", desc: "Cleaning, ETL", Icon: Filter },
  { title: "Analysis", desc: "EDA, Modeling", Icon: BarChart },
  { title: "Action", desc: "Decision Making", Icon: Target },
];

function PipelineStep({ item, isLast }: { item: typeof pipeline[0]; isLast: boolean }) {
  return (
    <div className="relative flex gap-4 pb-6 last:pb-0 group">
      {!isLast && <div className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-neutral-800 group-hover:bg-amber-500/30 transition-colors" />}
      <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 text-neutral-500 group-hover:bg-amber-950/30 group-hover:text-amber-400 group-hover:border-amber-500/50 transition-colors">
        <item.Icon size={14} />
      </div>
      <div className="pt-1">
        <h4 className="text-xs font-bold text-neutral-300 group-hover:text-white transition-colors">{item.title}</h4>
        <p className="text-[10px] text-neutral-500">{item.desc}</p>
      </div>
    </div>
  );
}

export default function DataSciencePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Cluster Background */}
      <ClusterBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">


        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* MAIN CONTENT (8 cols) */}
          <div className="lg:col-span-9 space-y-10">
             {sectors.map((sector, idx) => (
              <section key={sector.name}>
                 <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="mb-4 flex items-center gap-3"
                 >
                    <sector.icon className={sector.color} size={20} />
                    <h2 className="text-lg font-bold text-white tracking-wide">{sector.name}</h2>
                    <div className="h-[1px] flex-1 bg-white/10"></div>
                 </motion.div>

                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
                    {sector.items.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.1 + (i * 0.05) }}
                        >
                        </motion.div>
                    ))}
                 </div>
              </section>
            ))}
          </div>

          {/* SIDEBAR (3 cols) */}
          <div className="flex flex-col gap-6 lg:col-span-3 lg:sticky lg:top-6 h-fit pt-2">
            
            {/* Distribution Lab Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <DistributionWidget />
            </motion.div>

            {/* Pipeline Static Widget */}
            <div className="glass p-6 rounded-xl border border-amber-900/20 bg-gradient-to-b from-neutral-900/80 to-neutral-950/80">
               <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-amber-500 flex items-center gap-2">
                 <Layers size={14} /> The Data Pipeline
               </h3>
               <div>
                 {pipeline.map((p, i) => <PipelineStep key={p.title} item={p} isLast={i === pipeline.length - 1} />)}
               </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}