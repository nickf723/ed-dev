"use client";
import MandelbrotBackground from "@/app/formal-science/systems-science/complexity-chaos/fractals/MandelbrotBackground";
import FractalExplorer from "@/app/formal-science/systems-science/complexity-chaos/fractals/FractalExplorer";
import { motion } from "framer-motion";
import {
  Snowflake, Activity, GitMerge, Maximize, Scale, Globe, Map
} from "lucide-react";

// --- DATA ---
const sectors = [
  {
    name: "The Mandelbrot Set",
    desc: "The map of all possible Julia sets.",
    color: "text-blue-400",
    icon: Snowflake,
    items: [
      { 
        title: "Iteration", 
        desc: "The simple formula Z = Z² + C. Applying a rule repeatedly to its own output.", 
        href: "#", // Anchor link
        Icon: Activity, 
        className: "theme-systems-science",
        subtitle: "Feedback" 
      },
      { 
        title: "Self-Similarity", 
        desc: "The property where a part of the object resembles the whole.", 
        href: "#", 
        Icon: Maximize, 
        className: "theme-systems-science",
        subtitle: "Recursion" 
      }
    ]
  },
  {
    name: "Fractal Geometry",
    desc: "Measuring the roughness of reality.",
    color: "text-violet-400",
    icon: Map,
    items: [
      { 
        title: "Hausdorff Dimension", 
        desc: "Dimensions that aren't integers. A coastline is more than a line (1D) but less than a plane (2D).", 
        href: "#", 
        Icon: Scale, 
        className: "theme-systems-science",
        subtitle: "Fractional" 
      },
      { 
        title: "Nature's Code", 
        desc: "How trees, lungs, rivers, and clouds use fractals to maximize surface area.", 
        href: "#", 
        Icon: Globe, 
        className: "theme-biology", // Cross-link
        subtitle: "Biomimicry" 
      }
    ]
  }
];

export default function FractalsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Mandelbrot Background */}
      <MandelbrotBackground />
      
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

                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
            
            {/* Fractal Explorer */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <FractalExplorer />
            </motion.div>

            {/* Quote Box */}
            <div className="p-5 rounded-xl border border-dashed border-neutral-700 bg-neutral-900/40">
                <h4 className="text-xs font-bold uppercase text-blue-400 mb-2 flex items-center gap-2">
                    <Snowflake size={14} /> Benoit Mandelbrot
                </h4>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                    "Clouds are not spheres, mountains are not cones, coastlines are not circles, and bark is not smooth, nor does lightning travel in a straight line."
                </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}