import { Flame, Wind, Droplets, Mountain, Scroll, Users, Tv } from "lucide-react";

export const AVATAR_DATA = {
  meta: {
    id: "atla-2005",
    title: "Avatar: The Last Airbender",
    network: "Nickelodeon",
    run: "2005 - 2008",
    status: "Archived",
    rating: "9.3/10",
    creators: "Michael Dante DiMartino, Bryan Konietzko",
    tags: ["Animation", "Fantasy", "Martial Arts", "Worldbuilding"]
  },
  visuals: {
    // In a real app, these would be file paths
    heroColor: "from-cyan-500 to-blue-600", // Water tribe vibe for base
    elementColors: {
      air: "text-orange-400",
      water: "text-cyan-400",
      earth: "text-emerald-500",
      fire: "text-red-500"
    }
  },
  synopsis: "In a war-torn world of elemental magic, a young boy reawakens to undertake a dangerous mystic quest to fulfill his destiny as the Avatar, and bring peace to the world.",
  stats: [
    { label: "Seasons", value: "3", icon: Tv },
    { label: "Episodes", value: "61", icon: Scroll },
    { label: "Main Cast", value: "6", icon: Users },
  ],
  characters: [
    { name: "Aang", role: "The Avatar", element: "air", desc: "The last survivor of the Air Nomads." },
    { name: "Katara", role: "Waterbending Master", element: "water", desc: "The last waterbender of the Southern Tribe." },
    { name: "Sokka", role: "Strategist", element: "water", desc: "Warrior of the Southern Water Tribe." },
    { name: "Zuko", role: "Fire Lord", element: "fire", desc: "The banished prince seeking honor." },
    { name: "Toph", role: "Earthbending Master", element: "earth", desc: "The Blind Bandit and inventor of Metalbending." },
  ],
  seasons: [
    { title: "Book One: Water", episodes: 20, desc: "Aang travels to the North Pole to master Waterbending." },
    { title: "Book Two: Earth", episodes: 20, desc: "The group seeks an Earthbending teacher while fleeing Azula." },
    { title: "Book Three: Fire", episodes: 21, desc: "The invasion plan and the final confrontation with Ozai." },
  ]
};