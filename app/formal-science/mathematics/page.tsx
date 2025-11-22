"use client";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import VectorFieldBackground from "@/components/VectorFieldBackground";
import ConstantsWidget from "@/components/ConstantsWidget";
import { motion } from "framer-motion";
import {
  Calculator, Variable, Shapes, Spline, ChartScatter, Tally5, Sigma, 
  Binary, Scale, Grid3X3, Braces
} from "lucide-react";

// --- DATA ---
const sectors = [
  {
    name: "Structure & Quantity",
    desc: "The foundation. Numbers, symbols, and discrete structures.",
    color: "text-pink-400",
    icon: Grid3X3,
    items: [
      {
        title: "Algebra",
        desc: "The study of symbols and the rules for manipulating them.",
        href: "/formal-science/mathematics/algebra",
        Icon: Variable,
        className: "theme-algebra",
        subtitle: "Symbolic Logic"
      },
      {
        title: "Number Theory",
        desc: "The study of integers and their properties (primes, factorization).",
        href: "/formal-science/mathematics/number-theory",
        Icon: Calculator,
        className: "theme-number-theory",
        subtitle: "The Integers"
      },
      {
        title: "Discrete Math",
        desc: "Mathematical structures that are fundamentally distinct and separable.",
        href: "/formal-science/mathematics/discrete-mathematics",
        Icon: Tally5,
        className: "theme-discrete-math",
        subtitle: "Countable Sets"
      }
    ]
  },
  {
    name: "Space & Change",
    desc: "The continuous world. Shapes, curves, and infinite processes.",
    color: "text-blue-400",
    icon: Shapes,
    items: [
      {
        title: "Geometry",
        desc: "The properties of space, shape, size, and relative position.",
        href: "/formal-science/mathematics/geometry",
        Icon: Shapes,
        className: "theme-geometry",
        subtitle: "Visual Space"
      },
      {
        title: "Calculus",
        desc: "The mathematical study of continuous change.",
        href: "/formal-science/mathematics/calculus",
        Icon: Spline,
        className: "theme-calculus",
        subtitle: "Limits & Motion"
      }
    ]
  },
  {
    name: "Pattern & Chance",
    desc: "Making sense of data and uncertainty.",
    color: "text-amber-400",
    icon: ChartScatter,
    items: [
      {
        title: "Statistics & Probability",
        desc: "Collecting, analyzing, interpreting, and presenting data.",
        href: "/formal-science/mathematics/statistics",
        Icon: ChartScatter,
        className: "theme-statistics",
        subtitle: "Data & Risk"
      }
    ]
  }
];

export default function MathPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Vector Field Background */}
      <VectorFieldBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Discipline"
          title="Mathematics"
          subtitle="The queen of the sciences. Mathematics is the abstract study of topics such as quantity, structure, space, and change. It is the language in which the universe is written."
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
            
            {/* Constants Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <ConstantsWidget />
            </motion.div>

            {/* Axiom Box */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="rounded-lg border border-pink-500/20 bg-pink-950/10 p-4 backdrop-blur-md"
            >
                <div className="flex items-start gap-3">
                    <Braces size={18} className="text-pink-400 shrink-0 mt-1"/>
                    <div>
                        <h4 className="text-xs font-bold uppercase text-pink-400 mb-1">
                            Axiomatic System
                        </h4>
                        <p className="text-[11px] text-neutral-400 leading-relaxed">
                            Math is built on <strong>Axioms</strong>: statements accepted as true without proof. Everything else is derived from them.
                        </p>
                    </div>
                </div>
            </motion.div>

          </div>

        </div>
      </div>
    </main>
  );
}