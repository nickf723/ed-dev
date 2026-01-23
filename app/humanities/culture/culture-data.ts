import { Calendar, Ghost, Film, Smartphone, Music, MapPin } from "lucide-react";

export const CULTURE_SECTORS = [
  {
    id: "holidays",
    label: "The Calendar",
    sub: "Traditions & Holidays",
    desc: "From the fireworks of July 4th to the feasts of Thanksgiving. The rhythm of American life.",
    icon: Calendar,
    link: "/humanities/culture/holidays", // New Path
    color: "text-red-500",
    border: "group-hover:border-red-500/50",
    bg: "group-hover:bg-red-950/10",
    imageQuery: "American holidays collage fireworks thanksgiving parade"
  },
  {
    id: "folklore",
    label: "American Mythos",
    sub: "Legends & Cryptids",
    desc: "Tall tales, urban legends, and the creatures that hide in the national parks. (Mothman, Bigfoot, etc.)",
    icon: Ghost,
    link: "/humanities/culture/folklore", // Connects to your existing work
    color: "text-purple-500",
    border: "group-hover:border-purple-500/50",
    bg: "group-hover:bg-purple-950/10",
    imageQuery: "American folklore tall tales legends illustration"
  },
  {
    id: "media",
    label: "Hollywood & Stage",
    sub: "Cinema & Theater",
    desc: "The Dream Factory. The history of film, television, and the Broadway stage.",
    icon: Film,
    link: "#", // Future Build
    color: "text-yellow-400",
    border: "group-hover:border-yellow-500/50",
    bg: "group-hover:bg-yellow-950/10",
    imageQuery: "Hollywood cinema film production set"
  },
  {
    id: "music",
    label: "Soundwaves",
    sub: "Jazz, Rock, & Hip-Hop",
    desc: "The heartbeat of the nation. From the Delta Blues to the Bronx block parties.",
    icon: Music,
    link: "#", // Future Build
    color: "text-cyan-400",
    border: "group-hover:border-cyan-500/50",
    bg: "group-hover:bg-cyan-950/10",
    imageQuery: "American music history jazz rock hip hop collage"
  },
  {
    id: "digital",
    label: "The Silicon Age",
    sub: "Internet & Tech",
    desc: "Social media, meme culture, and the rise of the digital frontier.",
    icon: Smartphone,
    link: "#", // Future Build
    color: "text-pink-500",
    border: "group-hover:border-pink-500/50",
    bg: "group-hover:bg-pink-950/10",
    imageQuery: "Cyberpunk internet digital network visualization"
  },
  {
    id: "places",
    label: "Roadside America",
    sub: "Travel & Landmarks",
    desc: "Route 66, diners, national monuments, and the great open road.",
    icon: MapPin,
    link: "#", // Future Build
    color: "text-emerald-400",
    border: "group-hover:border-emerald-500/50",
    bg: "group-hover:bg-emerald-950/10",
    imageQuery: "Route 66 american roadside diner neon sign"
  }
];