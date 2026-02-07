"use client";
import AttractorBackground from "@/app/formal-science/systems-science/complexity-chaos/AttractorBackground";
import PendulumWidget from "@/app/formal-science/systems-science/complexity-chaos/PendulumWidget";
import { motion } from "framer-motion";
import {
  Activity, Wind, Snowflake, Fingerprint, GitMerge, RefreshCcw
} from "lucide-react";

// --- DATA ---
const sectors = [
  {
    name: "Deterministic Chaos",
    desc: "Systems that are governed by laws but impossible to predict.",
    color: "text-violet-400",
    icon: Wind,
    items: [
      { 
        title: "The Butterfly Effect", 
        desc: "Sensitive dependence on initial conditions. A butterfly flapping its wings in Brazil can cause a tornado in Texas.", 
        href: "/formal-science/systems-science/complexity-chaos/butterfly-effect", 
        Icon: GitMerge, 
        className: "theme-systems-science",
        subtitle: "Sensitivity" 
      },
      { 
        title: "Attractors", 
        desc: "States toward which a system tends to evolve. Strange attractors have fractal structures.", 
        href: "/formal-science/systems-science/complexity-chaos/attractors", 
        Icon: RefreshCcw, 
        className: "theme-systems-science",
        subtitle: "Orbits" 
      }
    ]
  },
  {
    name: "Fractal Geometry",
    desc: "The geometry of nature. Self-similarity at every scale.",
    color: "text-blue-400",
    icon: Snowflake,
    items: [
      { 
        title: "Mandelbrot Set", 
        desc: "The most famous object in modern mathematics. Infinite complexity from a simple formula.", 
        href: "/formal-science/systems-science/complexity-chaos/fractals", 
        Icon: Snowflake, 
        className: "theme-systems-science",
        subtitle: "Recursion" 
      }
    ]
  },
  {
    name: "Emergence",
    desc: "Order arising from chaos without central control.",
    color: "text-cyan-400",
    icon: Fingerprint,
    items: [
      { 
        title: "Self-Organization", 
        desc: "How flocks of birds, ant colonies, and economies organize themselves spontaneously.", 
        href: "/formal-science/systems-science/complexity-chaos/emergence", 
        Icon: Activity, 
        className: "theme-biology", // Cross-link
        subtitle: "Collective" 
      }
    ]
  }
];

export default function ChaosPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Attractor Background */}
      <AttractorBackground />
      
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
            
            {/* Pendulum Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <PendulumWidget />
            </motion.div>

            {/* Quote */}
            <div className="p-5 rounded-xl border border-dashed border-neutral-700 bg-neutral-900/40">
                <h4 className="text-xs font-bold uppercase text-blue-400 mb-2 flex items-center gap-2">
                    <Activity size={14} /> Prediction Horizon
                </h4>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                    Because of chaos, we can never predict the weather more than about two weeks out. The errors in our data eventually swallow the signal. This limit is called the <strong>Lyapunov Time</strong>.
                </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}