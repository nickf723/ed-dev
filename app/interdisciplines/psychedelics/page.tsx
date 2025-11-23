"use client";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import PsychedelicBackground from "@/components/PsychedelicBackground";
import BrainStateWidget from "@/components/BrainStateWidget";
import { motion } from "framer-motion";
import {
  FlaskConical, Brain, Sparkles, Eye, Activity, Globe, Flower
} from "lucide-react";

// --- DATA ---
const sectors = [
  {
    name: "Pharmacology",
    desc: "The molecule and the receptor.",
    color: "text-cyan-400",
    icon: FlaskConical,
    items: [
      { 
        title: "Serotonin (5-HT2A)", 
        desc: "The key receptor. How molecules like Psilocybin and LSD mimic neurotransmitters to unlock the gate.", 
        href: "/interdisciplines/psychedelics/serotonin", 
        Icon: Activity, 
        className: "theme-biochemistry",
        subtitle: "Lock & Key" 
      },
      { 
        title: "Tryptamines", 
        desc: "The family of compounds found in nature (Mushrooms, DMT, Ayahuasca).", 
        href: "/interdisciplines/psychedelics/tryptamines", 
        Icon: Flower, 
        className: "theme-chemistry",
        subtitle: "Organic" 
      }
    ]
  },
  {
    name: "Neuroscience",
    desc: "What happens to the hardware.",
    color: "text-fuchsia-400",
    icon: Brain,
    items: [
      { 
        title: "Default Mode Network", 
        desc: "The seat of the Ego. How its disintegration leads to the feeling of 'Oneness'.", 
        href: "/interdisciplines/psychedelics/dmn", 
        Icon: Network, 
        className: "theme-psychedelics",
        subtitle: "Ego Death" 
      },
      { 
        title: "Neuroplasticity", 
        desc: "The rapid growth of new neural connections. A window of opportunity for rewiring trauma.", 
        href: "/interdisciplines/psychedelics/plasticity", 
        Icon: Sparkles, 
        className: "theme-biology",
        subtitle: "Growth" 
      }
    ]
  },
  {
    name: "Phenomenology",
    desc: "The subjective experience.",
    color: "text-yellow-400",
    icon: Eye,
    items: [
      { 
        title: "Synesthesia", 
        desc: "Crossing of the senses. Seeing sounds and tasting colors.", 
        href: "/interdisciplines/psychedelics/synesthesia", 
        Icon: Eye, 
        className: "theme-humanities",
        subtitle: "Sensory" 
      },
      { 
        title: "The Mystical Experience", 
        desc: "The 'Oceanic Boundlessness' scale. Measuring the spiritual impact of the trip.", 
        href: "/interdisciplines/psychedelics/mystical", 
        Icon: Globe, 
        className: "theme-anthropology",
        subtitle: "Transcendent" 
      }
    ]
  }
];

// Helper import for icon
import { Network } from "lucide-react";

export default function PsychedelicsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Background */}
      <PsychedelicBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Interdiscipline"
          title="Psychedelics"
          subtitle="The science of altered states. Bridging chemistry, neuroscience, and psychology to understand how specific molecules can dissolve the ego, rewire the brain, and reveal the mechanics of consciousness itself."
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
            
            {/* Brain State Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <BrainStateWidget />
            </motion.div>

            {/* Quote */}
            <div className="p-5 rounded-xl border border-dashed border-neutral-700 bg-neutral-900/40">
                <h4 className="text-xs font-bold uppercase text-fuchsia-400 mb-2 flex items-center gap-2">
                    <FlaskConical size={14} /> Set & Setting
                </h4>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                    Timothy Leary's principle: The effect of a psychedelic is determined not just by the drug, but by the user's mindset ("Set") and the environment ("Setting").
                </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}