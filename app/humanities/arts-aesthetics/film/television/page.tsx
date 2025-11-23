"use client";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import { Tv, Users, Smile } from "lucide-react";

const sectors = [
  {
    name: "Genres",
    desc: "Categorization of content.",
    color: "text-cyan-400",
    icon: Tv,
    items: [
      { 
        title: "The Ensemble Sitcom", 
        desc: "A comedy centered on a fixed set of characters who bond, fight, and grow in a single location.", 
        href: "/humanities/arts-aesthetics/film/television/cougar-town", 
        Icon: Users, 
        className: "theme-media",
        subtitle: "Hangout Comedy" 
      }
    ]
  }
];

export default function TVPage() {
  return (
    <main className="relative min-h-screen bg-neutral-950 lg:px-12 py-10">
      <PageHeader eyebrow="Film & Media" title="Television Studies" subtitle="The intimate medium." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 max-w-4xl">
          {sectors[0].items.map(i => <TopicCard key={i.title} {...i} />)}
      </div>
    </main>
  );
}