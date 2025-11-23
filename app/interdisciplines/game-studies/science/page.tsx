"use client";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import LudologyBackground from "@/components/LudologyBackground";
import GameTheoryWidget from "@/components/GameTheoryWidget";
import { motion } from "framer-motion";
import {
  Dices, Puzzle, Scroll, Users, Hexagon, Trophy, Layers
} from "lucide-react";

const sectors = [
  {
    name: "Formal Systems",
    desc: "The mathematical and logical rules that define the playspace.",
    color: "text-purple-400",
    icon: Hexagon,
    items: [
      { 
        title: "Game Theory", 
        desc: "The study of mathematical models of strategic interaction.", 
        href: "/interdisciplines/game-studies/science/game-theory", 
        Icon: Puzzle, 
        className: "theme-math",
        subtitle: "Strategy" 
      },
      { 
        title: "Mechanics & Rules", 
        desc: "Methods of play (dice, cards) and constraints.", 
        href: "/interdisciplines/game-studies/science/mechanics", 
        Icon: Layers, 
        className: "theme-game-studies",
        subtitle: "The Engine" 
      }
    ]
  },
  {
    name: "Interactive Narrative",
    desc: "How stories are told through player agency.",
    color: "text-yellow-400",
    icon: Scroll,
    items: [
      { 
        title: "Ludonarrative", 
        desc: "The intersection of gameplay and story.", 
        href: "/interdisciplines/game-studies/science/ludonarrative", 
        Icon: Scroll, 
        className: "theme-literature",
        subtitle: "Storytelling" 
      },
      { 
        title: "Role-Playing", 
        desc: "Assuming a persona. The psychology of immersion.", 
        href: "/interdisciplines/game-studies/science/rpgs", 
        Icon: Users, 
        className: "theme-psychology",
        subtitle: "Identity" 
      }
    ]
  }
];

export default function GameSciencePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      <LudologyBackground />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Game Studies"
          title="Ludology: The Science"
          subtitle="The academic analysis of play. Here we strip away the graphics and flavor text to look at the raw mathematical and psychological engines that drive engagement."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
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

          <div className="flex flex-col gap-6 lg:col-span-3 lg:sticky lg:top-6 h-fit pt-2">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <GameTheoryWidget />
            </motion.div>
          </div>

        </div>
      </div>
    </main>
  );
}