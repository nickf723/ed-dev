"use client";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import LogicBackground from "@/app/formal-science/logic/LogicBackground";
import SymbolTranslator from "@/app/formal-science/logic/SymbolTranslator";
import { motion } from "framer-motion";
import {
  LockKeyholeOpen,
  Binary,
  GitMerge,
  BookText,
  Scale,
  CheckCircle
} from "@/components/icons"; // Ensure icons are exported from your icon file

// --- DATA ---
const sectors = [
  {
    name: "Formal Systems",
    desc: "The structural rules for constructing valid statements.",
    color: "text-cyan-400",
    icon: Binary,
    items: [
      { 
        title: "Propositional Logic", 
        desc: "The logic of simple statements and truth connectives (AND, OR, NOT).", 
        href: "/formal-science/logic/propositional-logic", 
        Icon: LockKeyholeOpen, 
        className: "theme-logic",
        subtitle: "Boolean Algebra"
      },
      { 
        title: "Predicate Logic", 
        desc: "Quantifiers and variables. The foundation of mathematical proof.", 
        href: "/formal-science/logic/predicate-logic", 
        Icon: Binary, 
        className: "theme-logic",
        subtitle: "Quantification"
      }
    ]
  },
  {
    name: "Applied Reasoning",
    desc: "Analyzing arguments and non-standard truths.",
    color: "text-blue-400",
    icon: Scale,
    items: [
      { 
        title: "Argument & Fallacies", 
        desc: "Identifying validity, soundness, and errors in natural language.", 
        href: "/formal-science/logic/argument-structure", 
        Icon: BookText, 
        className: "theme-logic",
        subtitle: "Critical Thinking"
      },
      { 
        title: "Modal & Non-Classical", 
        desc: "Logic involving possibility, necessity, time, and fuzzy truths.", 
        href: "/formal-science/logic/modal-logics", 
        Icon: GitMerge, 
        className: "theme-logic",
        subtitle: "Beyond True/False"
      }
    ]
  }
];

export default function LogicPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      <LogicBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Formal Science"
          title="Logic"
          subtitle="The calculus of truth. Logic provides the rigorous framework for distinguishing valid inference from fallacy, forming the bedrock of all rational inquiry."
        />

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

          {/* SIDEBAR (3 cols) */}
          <div className="flex flex-col gap-6 lg:col-span-3 lg:sticky lg:top-6 h-fit pt-2">
            
            {/* Translator Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <SymbolTranslator />
            </motion.div>

            {/* Info Box */}
            <div className="p-4 rounded-lg border border-dashed border-neutral-700 bg-neutral-900/40">
                <div className="flex items-center gap-2 mb-2 text-neutral-300">
                    <CheckCircle size={14} className="text-green-500" />
                    <span className="text-xs font-bold uppercase">Soundness</span>
                </div>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                    An argument is <strong>Sound</strong> only if it is both Valid (correct structure) AND its premises are actually true.
                </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}