"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import LivingCanvasBackground from "@/app/humanities/arts-aesthetics/LivingCanvasBackground";
import ColorTheoryWidget from "@/app/humanities/arts-aesthetics/ColorTheoryWidget";
import { motion } from "framer-motion";
import {
  Palette, Eye, Brush, Box,
  Music, Clapperboard, Mic2, Theater,
  Landmark, PenTool, Frame
} from "lucide-react";

// --- DATA ---
const sectors = [
  {
    name: "Visual Arts",
    desc: "The creation of works that are primarily visual in nature (Space).",
    color: "text-pink-400",
    icon: Palette,
    items: [
      { 
        title: "Painting & 2D", 
        desc: "Expression through pigment, color, and composition on a flat surface.", 
        href: "/humanities/arts-aesthetics/visual", 
        Icon: Brush, 
        className: "theme-humanities",
        subtitle: "Image" 
      },
      { 
        title: "Sculpture & 3D", 
        desc: "Shaping materials like stone, metal, or clay into three-dimensional form.", 
        href: "/humanities/arts-aesthetics/sculpture", 
        Icon: Box, 
        className: "theme-humanities",
        subtitle: "Form" 
      },
      { 
        title: "Architecture", 
        desc: "The art and science of designing and constructing buildings and spaces.", 
        href: "/humanities/arts-aesthetics/architecture", 
        Icon: Landmark, 
        className: "theme-humanities",
        subtitle: "Space" 
      }
    ]
  },
  {
    name: "Performing Arts",
    desc: "Art forms in which artists use their voices or bodies (Time).",
    color: "text-orange-400",
    icon: Theater,
    items: [
      { 
        title: "Film & Media", 
        desc: "Storytelling through moving images, editing, and sound design.", 
        href: "/humanities/arts-aesthetics/film", 
        Icon: Clapperboard, 
        className: "theme-humanities",
        subtitle: "Motion" 
      },
      { 
        title: "Theater & Dance", 
        desc: "Live performance involving acting, movement, and stagecraft.", 
        href: "/humanities/arts-aesthetics/performance", 
        Icon: Theater, 
        className: "theme-humanities",
        subtitle: "Presence" 
      }
    ]
  },
  {
    name: "Theory & Criticism",
    desc: "The intellectual framework for understanding and valuing art.",
    color: "text-yellow-500",
    icon: Eye,
    items: [
      { 
        title: "Art History", 
        desc: "The study of art objects in their historical development and stylistic context.", 
        href: "/humanities/arts-aesthetics/art-history", 
        Icon: Frame, 
        className: "theme-humanities",
        subtitle: "Context" 
      },
      { 
        title: "Aesthetics", 
        desc: "The branch of philosophy dealing with the nature of beauty and taste.", 
        href: "/humanities/arts-aesthetics/aesthetics", 
        Icon: Eye, 
        className: "theme-humanities",
        subtitle: "Philosophy" 
      },
      { 
        title: "Design", 
        desc: "The planning and creation of objects with a specific function and form.", 
        href: "/humanities/arts-aesthetics/design", 
        Icon: PenTool, 
        className: "theme-humanities",
        subtitle: "Function" 
      }
    ]
  }
];

export default function ArtsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Living Canvas Background */}
      <LivingCanvasBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Humanities"
          title="Arts & Aesthetics"
          subtitle="The expression of human creativity. We explore how form, color, sound, and movement combine to create meaning, emotion, and beauty."
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

                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            
            {/* Color Theory Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <ColorTheoryWidget />
            </motion.div>

            {/* Quote Box */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="rounded-lg border border-pink-500/20 bg-pink-950/10 p-4 backdrop-blur-md"
            >
                <div className="flex items-start gap-3">
                    <Brush size={18} className="text-pink-400 shrink-0 mt-1"/>
                    <div>
                        <h4 className="text-xs font-bold uppercase text-pink-400 mb-1">
                            Mimesis
                        </h4>
                        <p className="text-[11px] text-neutral-400 leading-relaxed">
                            Aristotle defined art as <em>Mimesis</em>—the imitation of life. We create to reflect, distort, or idealize the reality we experience.
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