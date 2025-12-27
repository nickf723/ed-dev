"use client";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import CardAnatomyWidget from "@/app/interdisciplines/game-studies/library/magic-the-gathering/fundamentals/CardAnatomyWidget";
import FormatCompass from "@/app/interdisciplines/game-studies/library/magic-the-gathering/fundamentals/FormatCompass";
import { motion } from "framer-motion";
import {
  Layers, Zap, Shield, Sword, Clock, RotateCcw, Box, Users
} from "lucide-react";

// --- DATA ---
const sectors = [
  {
    name: "Ontology: Card Types",
    desc: "The fundamental objects of the game.",
    color: "text-amber-400",
    icon: Box,
    items: [
      { 
        title: "Permanents", 
        desc: "Cards that stay on the battlefield (Lands, Creatures, Artifacts, Enchantments).", 
        href: "#", // Internal anchor or detailed page
        Icon: Shield, 
        className: "theme-mtg-construct",
        subtitle: "Matter" 
      },
      { 
        title: "Spells", 
        desc: "Cards that have an effect and then go to the graveyard (Instants, Sorceries).", 
        href: "#", 
        Icon: Zap, 
        className: "theme-mtg-construct",
        subtitle: "Energy" 
      }
    ]
  },
  {
    name: "Temporal Mechanics",
    desc: "Understanding speed and timing.",
    color: "text-blue-400",
    icon: Clock,
    items: [
      { 
        title: "Speed", 
        desc: "Sorcery speed (your turn, main phase) vs. Instant speed (any time, response).", 
        href: "#", 
        Icon: Clock, 
        className: "theme-mtg-construct",
        subtitle: "Timing" 
      },
      { 
        title: "The Stack", 
        desc: "The LIFO system that resolves spell interactions.", 
        href: "/interdisciplines/game-studies/library/magic-the-gathering", // Link back to main page visualization
        Icon: Layers, 
        className: "theme-computer-science",
        subtitle: "Resolution" 
      }
    ]
  },
  {
    name: "The Multiverse: Formats",
    desc: "Different ways to play the game.",
    color: "text-green-400",
    icon: Users,
    items: [
      { 
        title: "Constructed", 
        desc: "Bring your own deck (60 or 100 cards). E.g., Standard, Modern, Commander.", 
        href: "#", 
        Icon: Box, 
        className: "theme-mtg-construct",
        subtitle: "Prepared" 
      },
      { 
        title: "Limited", 
        desc: "Build a deck from a limited pool (Draft, Sealed).", 
        href: "#", 
        Icon: RotateCcw, 
        className: "theme-mtg-construct",
        subtitle: "Improvised" 
      }
    ]
  }
];

export default function MTGFundamentalsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* Background Reuse - maybe use the simple one or create a new "Rules" one? 
          Let's reuse Ludology for consistency but maybe a different hue if we could pass props.
          For now, default is fine.
      */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20 bg-[url('https://media.magic.wizards.com/images/wallpaper/library_1920x1080_wallpaper.jpg')] bg-cover bg-center" />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Magic: The Gathering"
          title="Fundamentals & Rules"
          subtitle="The axioms of the game. Before you can break the meta, you must understand the physics of the multiverse: Card Types, The Stack, and the Phases of the Turn."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* MAIN CONTENT (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
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

          {/* SIDEBAR (4 cols) */}
          <div className="flex flex-col gap-6 lg:col-span-4 lg:sticky lg:top-6 h-fit pt-2">
            
            {/* Card Anatomy */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
               <CardAnatomyWidget />
            </motion.div>

            {/* Format Compass */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <FormatCompass />
            </motion.div>

          </div>

        </div>
      </div>
    </main>
  );
}