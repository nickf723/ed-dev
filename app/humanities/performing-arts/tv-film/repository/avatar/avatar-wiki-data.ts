import { Flame, Wind, Droplets, Mountain, Scroll, Users, Tv, Map, Zap } from "lucide-react";
import { createElement } from "react";

export const ATLA_WIKI = {
  meta: {
    id: "atla-2005",
    title: "Avatar: The Last Airbender",
    heroColor: "from-cyan-500 to-blue-600",
  },
  // Navigation sections for the wiki sidebar
  sections: [
    { id: 'hub', label: 'Main Hub', icon: Tv, href: '/humanities/performing-arts/tv-film/repository/avatar' },
    { id: 'chars', label: 'Characters', icon: Users, href: '/humanities/performing-arts/tv-film/repository/avatar/characters' },
    { id: 'world', label: 'World & Lore', icon: Map, href: '/humanities/performing-arts/tv-film/repository/avatar/world' },
    { id: 'bending', label: 'Bending Arts', icon: Zap, href: '/humanities/performing-arts/tv-film/repository/avatar/bending' },
  ],
  // Character Data with IDs for linking
  characters: [
    { id: "aang", name: "Aang", role: "The Avatar", element: "air", desc: "The reluctant hero and last Air Nomad, frozen for a century." },
    { id: "katara", name: "Katara", role: "Water Master", element: "water", desc: "The compassionate and determined heart of Team Avatar." },
    { id: "sokka", name: "Sokka", role: "Strategist", element: "non-bender", desc: "The sarcastic, inventive warrior and leader." },
    { id: "zuko", name: "Zuko", role: "Fire Prince", element: "fire", desc: "A banished prince driven by a desperate need for honor." },
    { id: "toph", name: "Toph Beifong", role: "Earth Master", element: "earth", desc: "The blind, rebellious prodigy who invented Metalbending." },
    { id: "iroh", name: "Iroh", role: "Dragon of the West", element: "fire", desc: "A wise, tea-loving retired general and mentor to Zuko." },
  ],
  // Helpers
  elementColors: {
    air: "text-orange-400 bg-orange-400/10 border-orange-400/20",
    water: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
    earth: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    fire: "text-red-500 bg-red-500/10 border-red-500/20",
    "non-bender": "text-stone-400 bg-stone-400/10 border-stone-400/20"
  }
};

export const getElementIcon = (element: string) => {
  const size = 14;
  const className = ATLA_WIKI.elementColors[element as keyof typeof ATLA_WIKI.elementColors]?.split(' ')[0] || "text-stone-500";
  switch(element) {
    case 'air': return createElement(Wind, { size, className });
    case 'water': return createElement(Droplets, { size, className });
    case 'earth': return createElement(Mountain, { size, className });
    case 'fire': return createElement(Flame, { size, className });
    default: return createElement(Scroll, { size, className });
  }
};