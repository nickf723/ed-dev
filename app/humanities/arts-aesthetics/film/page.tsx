"use client";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import { Clapperboard, Film, Tv, Video } from "lucide-react";

const sectors = [
  {
    name: "Format & Medium",
    desc: "The method of delivery.",
    color: "text-pink-400",
    icon: Film,
    items: [
      { 
        title: "Television Studies", 
        desc: "The study of serialized narrative, broadcast history, and the sitcom format.", 
        href: "/humanities/arts-aesthetics/film/television", 
        Icon: Tv, 
        className: "theme-media",
        subtitle: "Serialized" 
      }
    ]
  }
];

export default function FilmPage() {
  return (
    <main className="relative min-h-screen bg-neutral-950 lg:px-12 py-10">
      <PageHeader eyebrow="Arts & Aesthetics" title="Film & Media" subtitle="The moving image." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 max-w-4xl">
          {sectors[0].items.map(i => <TopicCard key={i.title} {...i} />)}
      </div>
    </main>
  );
}