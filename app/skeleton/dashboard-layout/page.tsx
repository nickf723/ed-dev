"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Database,
  Server,
  Network,
  Globe,
  ChevronUp,
  Zap
} from "@/components/icons";
import React from "react";
import { Cpu, Layers, LayoutDashboard } from "lucide-react";

// Dummy Data for Main Grid
const dashboardTopics = [
  { title: "Topic A", desc: "Description for topic A.", href: "#", Icon: Database, className: "theme-skeleton" },
  { title: "Topic B", desc: "Description for topic B.", href: "#", Icon: Server, className: "theme-skeleton" },
  { title: "Topic C", desc: "Description for topic C.", href: "#", Icon: Network, className: "theme-skeleton" },
  { title: "Topic D", desc: "Description for topic D.", href: "#", Icon: Globe, className: "theme-skeleton" },
];

// Dummy Data for Sidebar "Stack" Widget
const stackLayers = [
  { title: "Application", Icon: Globe, color: "text-blue-400" },
  { title: "Transport", Icon: Network, color: "text-green-400" },
  { title: "Internet", Icon: Globe, color: "text-orange-400" },
  { title: "Link", Icon: Zap, color: "text-yellow-400" },
  { title: "Physical", Icon: Cpu, color: "text-red-400" },
];

function SidebarWidget({ title, items }: { title: string, items: typeof stackLayers }) {
    return (
        <div className="glass p-1 rounded-2xl border border-neutral-800 bg-gradient-to-b from-neutral-900/80 to-neutral-950/80">
            <div className="p-4 border-b border-white/5">
                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                    <Layers size={16} /> {title}
                </h3>
            </div>
            <div className="p-2 flex flex-col">
                {items.map((layer, i) => (
                    <div key={layer.title} className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-white/5 transition-colors cursor-default group">
                        <div className="flex items-center gap-3">
                            <layer.Icon size={16} className={`${layer.color} opacity-70 group-hover:opacity-100`} />
                            <span className="text-sm font-medium text-neutral-400 group-hover:text-neutral-200">{layer.title}</span>
                        </div>
                        <div className="h-1.5 w-1.5 rounded-full bg-neutral-800 group-hover:bg-white/20" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function DashboardLayoutPage() {
  return (
    <main className="topic-page theme-skeleton lg:px-16">
      <FloatingSymbols symbols={["#", "%", "&", "@"]} />
      <PageHeader
        eyebrow="Layout Pattern"
        title="Dashboard Hub"
        subtitle="A high-density layout for index pages. Features a primary grid for navigation and a sticky sidebar for context widgets."
      />

      <div className="grid w-full max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12 text-left">
        
        {/* MAIN CONTENT (8 Columns) */}
        <div className="lg:col-span-8">
           <div className="mb-8 flex items-center gap-2 border-b border-neutral-800 pb-4">
            <LayoutDashboard className="text-pink-400" />
            <h2 className="text-2xl font-bold text-neutral-100">Main Content Area</h2>
          </div>
          
          <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {dashboardTopics.map((branch) => (
              <TopicCard
                key={branch.title}
                href={branch.href}
                title={branch.title}
                desc={branch.desc}
                Icon={branch.Icon}
                className={branch.className}
              />
            ))}
          </section>

          <div className="mt-12 p-6 rounded-2xl border border-neutral-800 bg-neutral-900/30">
            <h3 className="text-lg font-bold text-neutral-200 mb-2">Secondary Content Area</h3>
            <p className="text-neutral-400">Use this space for methodology, introductions, or additional context that sits below the main navigation grid.</p>
          </div>
        </div>

        {/* SIDEBAR (4 Columns) */}
        <div className="flex flex-col gap-8 lg:col-span-4 lg:sticky lg:top-24 h-fit">
          
          {/* Widget 1: The Stack */}
          <SidebarWidget title="Abstraction Stack" items={stackLayers} />

          {/* Widget 2: Context Link */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-5 transition-colors hover:border-pink-500/30">
            <h4 className="font-semibold text-neutral-200 mb-2">Cross-Reference</h4>
            <p className="text-sm text-neutral-400 mb-4">
              Link to related disciplines or prerequisites here.
            </p>
            <button className="text-sm font-bold text-pink-400 hover:text-pink-300 flex items-center gap-1">
              Go to Prerequisites <ChevronUp className="rotate-90 h-4 w-4" />
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}