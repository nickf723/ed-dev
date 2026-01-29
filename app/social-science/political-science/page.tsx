"use client";
import PageHeader from "@/components/PageHeader";
import HexMapBackground from "@/app/social-science/political-science/HexMapBackground"; // NEW BACKGROUND
import PoliticalCompassWidget from "@/app/social-science/political-science/PoliticalCompassWidget"; 
import ParliamentWidget from "@/app/social-science/political-science/ParliamentWidget"; // NEW WIDGET
import { motion } from "framer-motion";
import {
  Landmark, Gavel, Users, Earth, Scale, BookOpen, Shield, Speech
} from "lucide-react";

// --- DATA SECTORS ---
const sectors = [
  {
    name: "Theory & Systems",
    desc: "The foundations of power. Philosophies of justice and the machinery of the state.",
    color: "text-violet-400",
    icon: Scale,
    items: [
      {
        title: "Political Theory",
        desc: "From Plato's Republic to modern liberalism. What is the 'Good Society'?",
        href: "/social-science/political-science/political-theory",
        Icon: BookOpen,
        className: "theme-social-science",
        subtitle: "Philosophy"
      },
      {
        title: "Public Administration",
        desc: "The bureaucracy. How policy is actually implemented by civil servants.",
        href: "/social-science/political-science/public-administration",
        Icon: Landmark,
        className: "theme-social-science",
        subtitle: "Governance"
      }
    ]
  },
  {
    name: "Global & Comparative",
    desc: "How states interact with their citizens and with each other.",
    color: "text-indigo-400",
    icon: Earth,
    items: [
      {
        title: "International Relations",
        desc: "War, diplomacy, and trade. Realism, Liberalism, and Constructivism.",
        href: "/social-science/political-science/international-relations",
        Icon: Earth,
        className: "theme-social-science",
        subtitle: "Geopolitics"
      },
      {
        title: "Comparative Politics",
        desc: "Democracies vs. Autocracies. Comparing systems across borders.",
        href: "/social-science/political-science/comparative-politics",
        Icon: Users,
        className: "theme-social-science",
        subtitle: "Systems"
      }
    ]
  },
  {
    name: "Law & Policy",
    desc: "The rules of the game.",
    color: "text-fuchsia-400",
    icon: Gavel,
    items: [
      {
        title: "Public Law",
        desc: "Constitutional rights, administrative law, and the judicial process.",
        href: "/social-science/political-science/public-law",
        Icon: Gavel,
        className: "theme-social-science",
        subtitle: "Justice"
      },
      {
        title: "Political Behavior",
        desc: "Voting, public opinion, and psychology. Why do people choose what they choose?",
        href: "/social-science/political-science/political-behavior",
        Icon: Speech,
        className: "theme-social-science",
        subtitle: "The Voter"
      }
    ]
  }
];

export default function PoliticalSciencePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. VISUAL ENGINE: Strategy Map */}
      <HexMapBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Social Science"
          title="Political Science"
          subtitle="The systematic study of power. Who gets what, when, and how? We analyze the architecture of the state and the behavior of the citizen."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* MAIN CONTENT (9 Cols) */}
          <div className="lg:col-span-9 space-y-12">
            {sectors.map((sector, idx) => (
              <section key={sector.name}>
                 {/* Sector Header */}
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

                 {/* Card Grid */}
                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
                    {sector.items.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.1 + (i * 0.05) }}
                        >
                            <a
                              href={item.href}
                              className={`block rounded-xl border border-neutral-800 hover:border-white/20 transition-colors p-6 h-full bg-gradient-to-b from-neutral-900/50 to-neutral-900/20 backdrop-blur-md`}
                            >
                              <item.Icon size={32} className={`${item.className} mb-4`} />
                              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                              <p className="text-sm text-neutral-400">{item.desc}</p>
                              {item.subtitle && (
                                <p className="mt-2 text-xs text-neutral-500 uppercase tracking-wider">{item.subtitle}</p>
                              )}
                            </a>
                        </motion.div>
                    ))}
                 </div>
              </section>
            ))}
          </div>

          {/* SIDEBAR (3 Cols) */}
          <div className="flex flex-col gap-6 lg:col-span-3 lg:sticky lg:top-6 h-fit pt-2">
            
            {/* WIDGET 1: Political Compass */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <PoliticalCompassWidget />
            </motion.div>

            {/* WIDGET 2: Parliament (NEW) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
               <ParliamentWidget />
            </motion.div>

            {/* WIDGET 3: Quote Box */}
            <div className="rounded-xl border border-violet-500/20 bg-violet-950/10 p-5 backdrop-blur-md">
                <div className="flex flex-col gap-3">
                    <Shield size={20} className="text-violet-400"/>
                    <p className="text-xs text-neutral-300 leading-relaxed italic">
                        "Man is by nature a political animal."
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-violet-500 text-right">
                        — Aristotle
                    </p>
                </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}