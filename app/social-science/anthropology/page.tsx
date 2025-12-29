"use client";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import PaleoBackground from "@/app/social-science/anthropology/PaleoBackground";
import SkullTimeline from "@/app/social-science/anthropology/SkullTimeline";
import { motion } from "framer-motion";
import {
  Skull, Hammer, BookOpen, Users, Globe, Footprints, Search, Shovel
} from "lucide-react"; 

// --- DATA ---
const sectors = [
  {
    name: "Biological Anthropology",
    desc: "The study of humans as biological organisms, evolution, and primates.",
    color: "text-amber-500",
    icon: Skull,
    items: [
      { 
        title: "Human Evolution", 
        desc: "The evolutionary process that led to the emergence of anatomically modern humans.", 
        href: "/social-science/anthropology/human-evolution", 
        Icon: Footprints, 
        className: "theme-anthropology",
        subtitle: "Origins" 
      },
      { 
        title: "Primatology", 
        desc: "The study of non-human primates (apes, monkeys) to understand human behavior.", 
        href: "/social-science/anthropology/primatology", 
        Icon: Skull, 
        className: "theme-biology", // Cross-link
        subtitle: "Relatives" 
      }
    ]
  },
  {
    name: "Archaeology",
    desc: "The study of human history through the excavation of sites and artifacts.",
    color: "text-orange-400",
    icon: Shovel,
    items: [
      { 
        title: "Excavation & Methods", 
        desc: "The techniques used to find, recover, and date material remains.", 
        href: "/social-science/anthropology/archaeology", 
        Icon: Hammer, 
        className: "theme-anthropology",
        subtitle: "Discovery" 
      },
      { 
        title: "Civilization", 
        desc: "The rise of complex societies, agriculture, and urbanization.", 
        href: "/social-science/anthropology/civilization", 
        Icon: Landmark, // Need to import
        className: "theme-history", // Cross-link
        subtitle: "Society" 
      }
    ]
  },
  {
    name: "Cultural Anthropology",
    desc: "The study of living human societies and cultural diversity.",
    color: "text-yellow-500",
    icon: Globe,
    items: [
      { 
        title: "Ethnography", 
        desc: "The systematic study of people and cultures from the insider's viewpoint.", 
        href: "/social-science/anthropology/ethnography", 
        Icon: BookOpen, 
        className: "theme-anthropology",
        subtitle: "Fieldwork" 
      },
      { 
        title: "Ritual & Belief", 
        desc: "The study of myth, religion, and symbolic practices.", 
        href: "/social-science/anthropology/ritual", 
        Icon: Users, 
        className: "theme-sociology", // Cross-link
        subtitle: "Meaning" 
      }
    ]
  }
];

// Helper for missing icons
import { Landmark } from "lucide-react";

export default function AnthropologyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Paleo Background */}
      <PaleoBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Social Science"
          title="Anthropology"
          subtitle="The study of what makes us human. From the bones of our ancestors to the rituals of modern tribes, anthropology bridges the gap between biology and culture to tell the full story of our species."
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
            
            {/* Hominid Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <SkullTimeline />
            </motion.div>

            {/* Quote */}
            <div className="p-5 rounded-xl border border-dashed border-neutral-700 bg-neutral-900/40">
                <h4 className="text-xs font-bold uppercase text-amber-500 mb-2 flex items-center gap-2">
                    <Search size={14} /> Relativism
                </h4>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                    <strong>Cultural Relativism:</strong> The principle that a person's beliefs and activities should be understood based on their own culture, rather than judged against the criteria of another.
                </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}