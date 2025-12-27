"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import RiemannBackground from "@/app/formal-science/mathematics/calculus/integral-calculus/RiemannBackground";
import { motion } from "framer-motion";
import {
  Sigma, Layers, RotateCw, Box, Divide, 
  ArrowUpRight, Scale, FunctionSquare
} from "lucide-react";

// --- DATA ---
const sectors = [
  {
    name: "Foundations",
    desc: "The inverse of the derivative.",
    color: "text-blue-400",
    icon: ArrowUpRight,
    items: [
      { 
        title: "Antiderivatives", 
        desc: "Reversing the process of differentiation. Finding F(x) given f'(x).", 
        href: "/formal-science/mathematics/calculus/integral-calculus/antiderivatives", 
        Icon: RotateCw, 
        className: "theme-calculus",
        subtitle: "The Reverse" 
      },
      { 
        title: "Definite Integrals", 
        desc: "Calculating the exact area under a curve between two points.", 
        href: "/formal-science/mathematics/calculus/integral-calculus/definite-integrals", 
        Icon: Sigma, 
        className: "theme-calculus",
        subtitle: "Exact Area" 
      },
      {
        title: "Fundamental Theorem",
        desc: "The bridge that connects Differential and Integral Calculus.",
        href: "/formal-science/mathematics/calculus/integral-calculus/ftc",
        Icon: FunctionSquare,
        className: "theme-calculus",
        subtitle: "The Bridge"
      }
    ]
  },
  {
    name: "Techniques of Integration",
    desc: "Tools for solving complex integrals.",
    color: "text-indigo-400",
    icon: Layers,
    items: [
      { 
        title: "U-Substitution", 
        desc: "The reverse Chain Rule. Simplifying integrals by changing variables.", 
        href: "/formal-science/mathematics/calculus/integral-calculus/substitution", 
        Icon: Divide, 
        className: "theme-calculus",
        subtitle: "Substitution" 
      },
      { 
        title: "Integration by Parts", 
        desc: "The reverse Product Rule. Integrating the product of functions.", 
        href: "/formal-science/mathematics/calculus/integral-calculus/by-parts", 
        Icon: Scale, 
        className: "theme-calculus",
        subtitle: "Product Rule" 
      }
    ]
  },
  {
    name: "Applications",
    desc: "Using integrals to solve real-world problems.",
    color: "text-cyan-400",
    icon: Box,
    items: [
      { 
        title: "Area & Volume", 
        desc: "Calculating areas between curves and volumes of solids of revolution.", 
        href: "/formal-science/mathematics/calculus/integral-calculus/volume", 
        Icon: Box, 
        className: "theme-calculus",
        subtitle: "3D Space" 
      },
      { 
        title: "Physics Applications", 
        desc: "Calculating Work, Center of Mass, and Fluid Force.", 
        href: "/formal-science/mathematics/calculus/integral-calculus/physics", 
        Icon: Scale, 
        className: "theme-physics", // Cross-discipline theme
        subtitle: "Applied" 
      }
    ]
  }
];

export default function IntegralCalculusPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Background */}
      <RiemannBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Calculus"
          title="Integral Calculus"
          subtitle="The mathematics of accumulation. If differentiation slices the world into instants, integration stitches it back together to calculate totals: total distance, total volume, total energy."
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

                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            
            {/* Riemann Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
            </motion.div>

            {/* Quote */}
            <div className="p-5 rounded-xl border border-dashed border-neutral-700 bg-neutral-900/40">
                <h4 className="text-xs font-bold uppercase text-blue-400 mb-2 flex items-center gap-2">
                    <Sigma size={14} /> Summation
                </h4>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                    The Integral symbol ($\int$) is actually a stylized "S" for Summa (Sum). It represents the adding up of infinitely many infinitesimal slices.
                </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}