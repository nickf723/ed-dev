"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import SocialDynamicsBackground from "@/app/social-science/SocialDynamicsBackground";
import AnalysisLens from "@/app/social-science/AnalysisLens";
import { motion } from "framer-motion";
import {
  BrainCircuit, Speech, TrendingUp, Map, Users, Scale, Landmark, ScrollText, Globe
} from "lucide-react";

// --- DATA: Disciplines ---
const sectors = [
  {
    name: "The Mind & The Self",
    desc: "Internal processes and individual expression.",
    color: "text-blue-400",
    icon: BrainCircuit,
    items: [
      { 
        id: "psychology", 
        level: "micro", 
        title: "Psychology", 
        desc: "The study of mind, behavior, and cognitive processes.", 
        href: "/social-science/psychology", 
        Icon: BrainCircuit, 
        className: "theme-psychology", 
        subtitle: "Cognition & Behavior" 
      },
      { 
        id: "linguistics", 
        level: "micro", 
        title: "Linguistics", 
        desc: "The structure, meaning, and context of language.", 
        href: "/social-science/linguistics", 
        Icon: Speech, 
        className: "theme-linguistics", 
        subtitle: "Communication" 
      }
    ]
  },
  {
    name: "Interaction & Exchange",
    desc: "How individuals connect, trade, and inhabit space.",
    color: "text-indigo-400",
    icon: TrendingUp,
    items: [
      { 
        id: "economics", 
        level: "meso", 
        title: "Economics", 
        desc: "The production, distribution, and consumption of wealth.", 
        href: "/social-science/economics", 
        Icon: TrendingUp, 
        className: "theme-economics", 
        subtitle: "Value & Incentives" 
      },
      { 
        id: "geography", 
        level: "meso", 
        title: "Geography", 
        desc: "The relationship between people and their environments.", 
        href: "/social-science/geography", 
        Icon: Map, 
        className: "theme-geography", 
        subtitle: "Space & Place" 
      }
    ]
  },
  {
    name: "Structure & Society",
    desc: "Collective organizations, governance, and culture.",
    color: "text-purple-400",
    icon: Landmark,
    items: [
      { 
        id: "sociology", 
        level: "macro", 
        title: "Sociology", 
        desc: "The study of social life, change, and consequences.", 
        href: "/social-science/sociology", 
        Icon: Users, 
        className: "theme-sociology", 
        subtitle: "Social Structures" 
      },
      { 
        id: "political-science", 
        level: "macro", 
        title: "Political Science", 
        desc: "Systems of governance, power, and policy.", 
        href: "/social-science/political-science", 
        Icon: Scale, 
        className: "theme-political-science", 
        subtitle: "Power & Authority" 
      },
      { 
        id: "anthropology", 
        level: "macro", 
        title: "Anthropology", 
        desc: "The holistic study of humanity across time and space.", 
        href: "/social-science/anthropology", 
        Icon: Globe, 
        className: "theme-anthropology", 
        subtitle: "Culture & Evolution" 
      }
    ]
  }
];

export default function SocialSciencePage() {
  const [activeLens, setActiveLens] = useState<string | null>(null);

  const getVariant = (level: string) => {
    if (!activeLens) return "default";
    return activeLens === level ? "highlighted" : "dimmed";
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      <SocialDynamicsBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Domain 03"
          title="Social Sciences"
          subtitle="Deciphering the human web. We study the complex feedback loops between individual agency, social structures, and cultural evolution."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* MAIN CONTENT */}
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
                            <TopicCard 
                                {...item} 
                                variant={getVariant(item.level)}
                            />
                        </motion.div>
                    ))}
                 </div>
              </section>
            ))}
          </div>

          {/* SIDEBAR */}
          <div className="flex flex-col gap-6 lg:col-span-3 lg:sticky lg:top-6 h-fit pt-2">
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <AnalysisLens activeLens={activeLens} setActiveLens={setActiveLens} />
            </motion.div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="rounded-lg border border-indigo-500/20 bg-indigo-950/10 p-4 backdrop-blur-md"
            >
                <div className="flex items-start gap-3">
                    <ScrollText size={18} className="text-indigo-400 shrink-0 mt-1"/>
                    <div>
                        <h4 className="text-xs font-bold uppercase text-indigo-400 mb-1">
                            Methodology
                        </h4>
                        <p className="text-[11px] text-neutral-400 leading-relaxed">
                            A blend of statistical data (quantitative) and interpretive analysis (qualitative).
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