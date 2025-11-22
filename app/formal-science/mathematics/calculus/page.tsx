"use client";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import CalculusBackground from "@/components/CalculusBackground";
import DerivativeWidget from "@/components/DerivativeWidget";
import { motion } from "framer-motion";
import {
  Diff,
  Sigma,
  Network,
  RotateCw,
  TrendingUp,
  Infinity,
  Minimize2
} from "lucide-react";

// --- DATA ---
const sectors = [
  {
    name: "The Study of Change",
    desc: "How things change at an instantaneous moment.",
    color: "text-red-500",
    icon: Diff,
    items: [
      { 
        title: "Limits & Continuity", 
        desc: "The foundational concept of calculus. Approaching a value without necessarily reaching it.", 
        href: "/formal-science/mathematics/calculus/limits", 
        Icon: Minimize2, 
        className: "theme-calculus",
        subtitle: "The Approach" 
      },
      { 
        title: "Differential Calculus", 
        desc: "The study of the derivative: instantaneous rates of change and the slope of curves.", 
        href: "/formal-science/mathematics/calculus/differential-calculus", 
        Icon: TrendingUp, 
        className: "theme-calculus",
        subtitle: "The Slope" 
      }
    ]
  },
  {
    name: "Accumulation & Area",
    desc: "Adding up infinitely many infinitesimal pieces.",
    color: "text-blue-500",
    icon: Sigma,
    items: [
      { 
        title: "Integral Calculus", 
        desc: "The study of integrals: accumulation of quantities and the area under curves.", 
        href: "/formal-science/mathematics/calculus/integral-calculus", 
        Icon: Sigma, 
        className: "theme-calculus",
        subtitle: "The Area" 
      },
      { 
        title: "Differential Equations", 
        desc: "Equations relating a function to its derivatives. The language of physics.", 
        href: "/formal-science/mathematics/calculus/differential-equations", 
        Icon: RotateCw, 
        className: "theme-calculus",
        subtitle: "Modeling Nature" 
      }
    ]
  },
  {
    name: "Higher Dimensions",
    desc: "Calculus in 3D space and beyond.",
    color: "text-purple-500",
    icon: Network,
    items: [
      { 
        title: "Multivariable Calculus", 
        desc: "Extending limits, derivatives, and integrals to functions of multiple variables.", 
        href: "/formal-science/mathematics/calculus/multivariable-calculus", 
        Icon: Network, 
        className: "theme-calculus",
        subtitle: "3D Space" 
      }
    ]
  }
];

export default function CalculusPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Slope Field Background */}
      <CalculusBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Mathematics"
          title="Calculus"
          subtitle="The mathematics of motion and change. While Algebra solves for static unknowns, Calculus provides the tools to model dynamic systems—from the orbit of planets to the flow of economies."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* MAIN CONTENT (9 cols) */}
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
                            <TopicCard {...item} />
                        </motion.div>
                    ))}
                 </div>
              </section>
            ))}
          </div>

          {/* SIDEBAR (3 cols) */}
          <div className="flex flex-col gap-6 lg:col-span-3 lg:sticky lg:top-6 h-fit pt-2">
            
            {/* Derivative Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <DerivativeWidget />
            </motion.div>

            {/* Zeno's Paradox Quote */}
            <div className="p-5 rounded-xl border border-dashed border-neutral-700 bg-neutral-900/40">
                <h4 className="text-xs font-bold uppercase text-red-400 mb-2 flex items-center gap-2">
                    <Infinity size={14} /> The Infinite
                </h4>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                    Calculus tamed the infinite. By using <strong>Limits</strong>, mathematicians solved paradoxes that had baffled philosophers for 2,000 years.
                </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}