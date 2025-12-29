"use client";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import OrbitalBackground from "@/app/natural-science/chemistry/OrbitalBackground"; // UPGRADE: Dynamic background
import PendulumWidget from "@/app/formal-science/systems-science/complexity-chaos/PendulumWidget";       // UPGRADE: Sidebar widget
import { motion } from "framer-motion";
import {
  RollerCoaster, Zap, Waves, Flame, Orbit, Hourglass, 
  Atom, Scale, Microscope
} from "lucide-react";

// --- DATA STRUCTURE ---
const sectors = [
  {
    name: "Macroscopic World",
    desc: "The physics of the visible. Motion, energy, and heat.",
    color: "text-orange-400",
    icon: RollerCoaster,
    items: [
      {
        title: "Classical Mechanics",
        desc: "Motion, forces, and energy (Kinematics, Dynamics).",
        href: "/natural-science/physics/classical-mechanics",
        Icon: RollerCoaster,
        className: "theme-classical-mechanics",
        subtitle: "Newton's Laws"
      },
      {
        title: "Thermodynamics",
        desc: "Heat, work, entropy, and energy systems.",
        href: "/natural-science/physics/thermodynamics",
        Icon: Flame,
        className: "theme-thermodynamics",
        subtitle: "Energy & Entropy"
      }
    ]
  },
  {
    name: "Fields & Waves",
    desc: "The physics of the invisible. Light, electricity, and magnetism.",
    color: "text-cyan-400",
    icon: Zap,
    items: [
      {
        title: "Electromagnetism",
        desc: "Electric and magnetic fields and their interactions.",
        href: "/natural-science/physics/electromagnetism",
        Icon: Zap,
        className: "theme-electromagnetism",
        subtitle: "Maxwell's Eq."
      },
      {
        title: "Waves & Optics",
        desc: "Oscillations, sound, and the behavior of light.",
        href: "/natural-science/physics/waves-optics",
        Icon: Waves,
        className: "theme-waves-optics",
        subtitle: "Light & Sound"
      }
    ]
  },
  {
    name: "Modern Physics",
    desc: "The physics of the extreme. The very small and the very fast.",
    color: "text-violet-400",
    icon: Atom,
    items: [
      {
        title: "Atomic & Nuclear Physics",
        desc: "Structure of the atom, radioactivity, and nuclear reactions.",
        href: "/natural-science/physics/atomic-nuclear-physics",
        Icon: Microscope,
        className: "theme-atomic-nuclear-physics",
        subtitle: "The Atom"
      },
      {
        title: "Quantum Mechanics",
        desc: "The probabilistic behavior of particles at the atomic scale.",
        href: "/natural-science/physics/quantum-mechanics",
        Icon: Orbit,
        className: "theme-quantum-mechanics",
        subtitle: "Uncertainty"
      },
      {
        title: "Relativity",
        desc: "Gravity, spacetime, and motion near the speed of light.",
        href: "/natural-science/physics/relativity",
        Icon: Hourglass,
        className: "theme-relativity",
        subtitle: "Spacetime"
      }
    ]
  }
];

export default function PhysicsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. VISUAL ENGINE: Orbital Simulation */}
      <OrbitalBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Natural Science"
          title="Physics"
          subtitle="The fundamental study of matter, energy, motion, and force. From the subatomic dance of quarks to the cosmic ballet of galaxies."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* MAIN CONTENT AREA (9 Cols) */}
          <div className="lg:col-span-9 space-y-12">
            {sectors.map((sector, idx) => (
              <section key={sector.name}>
                 {/* Section Header */}
                 <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="mb-6 flex items-center gap-3"
                 >
                    <sector.icon className={sector.color} size={24} />
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-wide">{sector.name}</h2>
                        <p className="text-xs text-neutral-500">{sector.desc}</p>
                    </div>
                    <div className="h-[1px] flex-1 bg-white/10 ml-4"></div>
                 </motion.div>

                 {/* Grid of Cards */}
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

          {/* SIDEBAR WIDGET AREA (3 Cols) */}
          <div className="flex flex-col gap-6 lg:col-span-3 lg:sticky lg:top-6 h-fit pt-2">
            
            {/* WIDGET: Double Pendulum (Chaos) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <PendulumWidget />
            </motion.div>

            {/* WIDGET: Quote */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="rounded-lg border border-orange-500/20 bg-orange-950/10 p-5 backdrop-blur-md"
            >
                <div className="flex flex-col gap-3">
                    <Scale size={20} className="text-orange-400"/>
                    <p className="text-xs text-neutral-300 leading-relaxed italic">
                        "Nature and Nature's laws lay hid in night: God said, Let Newton be! and all was light."
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-orange-500 text-right">
                        — Alexander Pope
                    </p>
                </div>
            </motion.div>

          </div>

        </div>
      </div>
    </main>
  );
}