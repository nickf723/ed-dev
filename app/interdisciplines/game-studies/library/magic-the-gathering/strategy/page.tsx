"use client";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import LeylineBackground from "@/app/interdisciplines/game-studies/library/magic-the-gathering/strategy/LeylineBackground";
import ArchetypeTriangle from "@/app/interdisciplines/game-studies/library/magic-the-gathering/ArchetypeTriangle";
import ManaCurveWidget from "@/app/interdisciplines/game-studies/library/magic-the-gathering/strategy/ManaCurveWidget";
import { motion } from "framer-motion";
import {
  Swords, Shield, Hourglass, Layers, Zap, Crown, Scale, Gauge
} from "lucide-react";

// --- DATA ---
const sectors = [
  {
    name: "Deck Construction",
    desc: "The engineering phase. Building a statistical machine.",
    color: "text-cyan-400",
    icon: Layers,
    items: [
      { 
        title: "Mana Base Math", 
        desc: "Using hypergeometric distribution to calculate the optimal number of lands.", 
        href: "/interdisciplines/game-studies/library/magic-the-gathering/strategy/mana-base", 
        Icon: Gauge, 
        className: "theme-mtg-construct",
        subtitle: "Probability" 
      },
      { 
        title: "The Curve", 
        desc: "Balancing card costs to maximize mana efficiency across turns.", 
        href: "/interdisciplines/game-studies/library/magic-the-gathering/strategy/curve", 
        Icon: Scale, 
        className: "theme-mtg-construct",
        subtitle: "Efficiency" 
      }
    ]
  },
  {
    name: "Strategic Theory",
    desc: "The philosophy of winning.",
    color: "text-amber-400",
    icon: Crown,
    items: [
      { 
        title: "Who is the Beatdown?", 
        desc: "The most famous article in Magic theory. Identifying your role (Aggressor vs. Defender) in a matchup.", 
        href: "/interdisciplines/game-studies/library/magic-the-gathering/strategy/beatdown", 
        Icon: Swords, 
        className: "theme-mtg-construct",
        subtitle: "Role Assignment" 
      },
      { 
        title: "Card Advantage", 
        desc: "The concept that having more options than your opponent leads to victory.", 
        href: "/interdisciplines/game-studies/library/magic-the-gathering/strategy/card-advantage", 
        Icon: Zap, 
        className: "theme-mtg-construct",
        subtitle: "Resources" 
      }
    ]
  },
  {
    name: "Archetypes",
    desc: "The taxonomy of decks.",
    color: "text-rose-400",
    icon: Shield,
    items: [
      { 
        title: "Tempo", 
        desc: "Trading cards for time. Deploying a threat and protecting it just long enough to win.", 
        href: "/interdisciplines/game-studies/library/magic-the-gathering/strategy/tempo", 
        Icon: Hourglass, 
        className: "theme-mtg-construct",
        subtitle: "Velocity" 
      }
    ]
  }
];

export default function MTGStrategyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Leyline Background */}
      <LeylineBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Magic: The Gathering"
          title="Deck Building & Strategy"
          subtitle="The Artificer's Workshop. Magic is not just about playing cards; it is about designing systems (decks) that statistically outperform your opponent's system."
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
            
            {/* Archetype Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <ArchetypeTriangle />
            </motion.div>

            {/* Mana Curve Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
               <ManaCurveWidget />
            </motion.div>

          </div>

        </div>
      </div>
    </main>
  );
}