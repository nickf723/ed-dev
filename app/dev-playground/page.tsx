"use client";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import WireframeBackground from "@/components/WireframeBackground";
import XRayConsole from "@/components/XRayConsole";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  GalleryVerticalEnd,
  Presentation,
  ListVideo,
  DraftingCompass,
  Columns,
  Box
} from "lucide-react";

// Maps to your actual file structure
const templates = [
  {
    title: "Timeline Layout",
    desc: "Vertical chronological sequencing for history or process flows.",
    href: "/skeleton/timeline-layout",
    Icon: ListVideo,
    className: "theme-skeleton",
    subtitle: "Chronology"
  },
  {
    title: "Dashboard Grid",
    desc: "Dense data visualization layout with sidebar and widgets.",
    href: "/skeleton/dashboard-layout",
    Icon: LayoutDashboard,
    className: "theme-skeleton",
    subtitle: "Data View"
  },
  {
    title: "Component Gallery",
    desc: "Showcase grid for atomic UI elements and design tokens.",
    href: "/skeleton/component-gallery",
    Icon: Box,
    className: "theme-skeleton",
    subtitle: "Design System"
  },
  {
    title: "Multimedia Gallery",
    desc: "Masonry or grid layout focused on image and video assets.",
    href: "/skeleton/multimedia-gallery",
    Icon: GalleryVerticalEnd,
    className: "theme-skeleton",
    subtitle: "Media"
  },
  {
    title: "Full Lesson",
    desc: "Long-form educational content with progress tracking.",
    href: "/skeleton/full-lesson",
    Icon: Presentation,
    className: "theme-skeleton",
    subtitle: "Education"
  },
  {
    title: "Interactive Tool",
    desc: "Frame for calculators, simulations, and active widgets.",
    href: "/skeleton/interactive-template",
    Icon: DraftingCompass,
    className: "theme-skeleton",
    subtitle: "Application"
  },
  {
    title: "Comparative",
    desc: "Split-screen layout for side-by-side analysis.",
    href: "/skeleton/comparative-layout",
    Icon: Columns,
    className: "theme-skeleton",
    subtitle: "Analysis"
  },
];

export default function SkeletonPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Wireframe Background */}
      <WireframeBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="System Blueprint"
          title="Skeleton Pages"
          subtitle="The architectural bones of the network. These templates define the structural patterns used to organize content across all domains."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* MAIN CONTENT (8 cols) */}
          <div className="lg:col-span-8">
             <section>
                 <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                    <DraftingCompass className="text-emerald-400" size={24} />
                    <h2 className="text-xl font-bold text-white tracking-wide">Layout Patterns</h2>
                 </div>

                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {templates.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                        >
                            <TopicCard {...item} />
                        </motion.div>
                    ))}
                 </div>
             </section>
          </div>

          {/* SIDEBAR (4 cols) */}
          <div className="flex flex-col gap-6 lg:col-span-4 lg:sticky lg:top-6 h-fit pt-2">
            
            {/* X-Ray Console */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <XRayConsole />
            </motion.div>

            {/* Info Box */}
            <div className="p-5 rounded-xl border border-dashed border-neutral-700 bg-neutral-900/40">
                <h4 className="text-xs font-bold uppercase text-neutral-400 mb-2">
                    Design Philosophy
                </h4>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                    Content precedes design. These skeletons ensure that information hierarchy is established before aesthetic layers are applied.
                </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}