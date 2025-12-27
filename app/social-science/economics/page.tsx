"use client";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import MarketFlowBackground from "@/app/social-science/economics/MarketFlowBackground"; // NEW BACKGROUND
import SupplyDemandWidget from "@/app/social-science/economics/SupplyDemandWidget";     // NEW WIDGET
import { motion } from "framer-motion";
import {
  DollarSign, LineChart, Target, Network, Scale, Globe, Briefcase, TrendingUp
} from "@/components/icons";

// --- DATA SECTORS ---
const sectors = [
  {
    name: "Microeconomics",
    desc: "The study of individual decision-making. Households, firms, and markets.",
    color: "text-emerald-400",
    icon: DollarSign,
    items: [
      {
        title: "Supply & Demand",
        desc: "The fundamental model of price determination in competitive markets.",
        href: "/social-science/economics/supply-demand",
        Icon: Scale,
        className: "theme-economics",
        subtitle: "Market Forces"
      },
      {
        title: "Game Theory",
        desc: "Strategic interaction between rational decision-makers.",
        href: "/social-science/economics/game-theory",
        Icon: Target,
        className: "theme-economics",
        subtitle: "Strategy"
      }
    ]
  },
  {
    name: "Macroeconomics",
    desc: "The study of the economy as a whole. Growth, inflation, and policy.",
    color: "text-blue-400",
    icon: Globe,
    items: [
      {
        title: "Fiscal & Monetary Policy",
        desc: "How governments and central banks influence the economy.",
        href: "/social-science/economics/policy",
        Icon: Landmark,
        className: "theme-economics",
        subtitle: "Regulation"
      },
      {
        title: "International Trade",
        desc: "Exchange of goods, services, and capital across borders.",
        href: "/social-science/economics/trade",
        Icon: Network,
        className: "theme-economics",
        subtitle: "Globalization"
      }
    ]
  },
  {
    name: "Behavioral & Finance",
    desc: "The psychology of money and the mechanics of investment.",
    color: "text-amber-400",
    icon: LineChart,
    items: [
      {
        title: "Behavioral Economics",
        desc: "Why humans are irrational. Biases, heuristics, and nudges.",
        href: "/social-science/economics/behavioral",
        Icon: BrainCog,
        className: "theme-economics",
        subtitle: "Psychology"
      },
      {
        title: "Financial Markets",
        desc: "Stocks, bonds, and the allocation of capital over time.",
        href: "/social-science/economics/finance",
        Icon: TrendingUp,
        className: "theme-economics",
        subtitle: "Investment"
      }
    ]
  }
];

import { Landmark, BrainCog } from "lucide-react"; // Extra icons needed

export default function EconomicsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. VISUAL ENGINE: Capital Flow */}
      <MarketFlowBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Social Science"
          title="Economics"
          subtitle="The study of scarcity and choice. We analyze how societies allocate resources, how markets function, and the incentives that drive human behavior."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* MAIN CONTENT (9 Cols) */}
          <div className="lg:col-span-9 space-y-12">
            {sectors.map((sector, idx) => (
              <section key={sector.name}>
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

          {/* SIDEBAR (3 Cols) */}
          <div className="flex flex-col gap-6 lg:col-span-3 lg:sticky lg:top-6 h-fit pt-2">
            
            {/* WIDGET: Supply & Demand */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <SupplyDemandWidget />
            </motion.div>

            {/* WIDGET: Quote Box */}
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-5 backdrop-blur-md">
                <div className="flex flex-col gap-3">
                    <Briefcase size={20} className="text-emerald-400"/>
                    <p className="text-xs text-neutral-300 leading-relaxed italic">
                        "It is not from the benevolence of the butcher, the brewer, or the baker that we expect our dinner, but from their regard to their own interest."
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 text-right">
                        — Adam Smith
                    </p>
                </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}