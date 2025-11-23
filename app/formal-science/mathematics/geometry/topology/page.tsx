"use client";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import ManifoldBackground from "@/components/ManifoldBackground";
import EulerWidget from "@/components/EulerWidget";
import { motion } from "framer-motion";
import {
  GitMerge, Globe, Repeat, Minimize, Maximize, Combine, Network
} from "lucide-react";

// --- DATA ---
const sectors = [
  {
    name: "General Topology",
    desc: "The study of properties preserved under continuous deformation (stretching, crumpling, bending).",
    color: "text-violet-400",
    icon: Globe,
    items: [
      { 
        title: "Homeomorphism", 
        desc: "When two shapes are topologically identical (e.g., a coffee mug and a donut).", 
        href: "/formal-science/mathematics/geometry/topology/homeomorphism", 
        Icon: Repeat, 
        className: "theme-topology",
        subtitle: "Equivalence" 
      },
      { 
        title: "Manifolds", 
        desc: "Spaces that locally resemble Euclidean space but have a complex global structure.", 
        href: "/formal-science/mathematics/geometry/topology/manifolds", 
        Icon: Globe, 
        className: "theme-topology",
        subtitle: "Surfaces" 
      }
    ]
  },
  {
    name: "Algebraic Topology",
    desc: "Using abstract algebra to study topological spaces.",
    color: "text-indigo-400",
    icon: GitMerge,
    items: [
      { 
        title: "Homotopy", 
        desc: "Deforming one path into another. Detecting holes by seeing if a loop can shrink to a point.", 
        href: "/formal-science/mathematics/geometry/topology/homotopy", 
        Icon: Minimize, 
        className: "theme-topology",
        subtitle: "Paths & Loops" 
      },
      { 
        title: "Knot Theory", 
        desc: "The study of mathematical knots. Curves embedded in 3D space that cannot be untangled.", 
        href: "/formal-science/mathematics/geometry/topology/knot-theory", 
        Icon: Network, 
        className: "theme-topology",
        subtitle: "Embeddings" 
      }
    ]
  }
];

export default function TopologyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Background */}
      <ManifoldBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Geometry"
          title="Topology"
          subtitle="Rubber Sheet Geometry. In Topology, distance and angles don't matter—only connectivity does. A sphere is a cube; a donut is a coffee cup. We study the fundamental properties of space that remain unchanged by stretching or bending."
        />

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

                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
            
            {/* Euler Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <EulerWidget />
            </motion.div>

            {/* Quote Box */}
            <div className="p-5 rounded-xl border border-dashed border-neutral-700 bg-neutral-900/40">
                <h4 className="text-xs font-bold uppercase text-indigo-400 mb-2 flex items-center gap-2">
                    <Maximize size={14} /> Connectivity
                </h4>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                    "Topology is the study of properties that are preserved under continuous deformations." If you can stretch it, it's the same shape. If you have to tear it, it's different.
                </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}