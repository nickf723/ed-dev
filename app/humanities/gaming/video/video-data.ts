import { Gamepad2, Cpu, Layers, Box, Monitor, Ghost } from "lucide-react";

// 1. PAGE CONTENT
export const VIDEO_ERAS = [
  {
    id: "arcade",
    title: " The Arcade Era",
    year: "1970s - 1980s",
    desc: "The birth of commercial gaming. Coin-operated machines, high scores, and simple, addictive loops.",
    icon: Gamepad2,
    imageQuery: "Pac-Man arcade cabinet neon",
    tech: "Dedicated Circuit Boards",
    directUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Pac-Man_Arcade_Machine.jpg/800px-Pac-Man_Arcade_Machine.jpg"
  },
  {
    id: "console_wars",
    title: "The Console Wars",
    year: "1990s",
    desc: "The shift to home entertainment. 16-bit sprites give way to early 3D polygons. Mario vs. Sonic.",
    icon: Box,
    imageQuery: "Super Nintendo console retro",
    tech: "Cartridges & CDs",
    wikiEndpoint: "https://nintendo.fandom.com/api.php"
  },
  {
    id: "online",
    title: "The Network Age",
    year: "2000s",
    desc: "Gaming goes global. MMORPGs, multiplayer shooters, and the rise of esports.",
    icon: Monitor,
    imageQuery: "LAN party crt monitors",
    tech: "Broadband Internet",
  },
  {
    id: "modern",
    title: "Photorealism & VR",
    year: "2010s - Present",
    desc: "Ray tracing, 4K textures, and immersive virtual reality. The line between film and game blurs.",
    icon: Layers,
    imageQuery: "Virtual reality headset cyberpunk",
    tech: "GPUs & Shader Cores"
  }
];

export const GENRES = [
  { title: "Role-Playing Game (RPG)", 
    desc: "Narrative-driven character growth.", 
    query: "Final Fantasy VII gameplay",
    wikiEndpoint: "https://finalfantasy.fandom.com/api.php",
    fit: "contain" },

  { title: "First-Person Shooter (FPS)", 
    desc: "Combat from the protagonist's viewpoint.", 
    query: "Doom 1993 gameplay",
    directUrl: "https://upload.wikimedia.org/wikipedia/en/5/57/Doom_cover_art.jpg",
    fit: "contain" },

  { title: "Real-Time Strategy (RTS)", 
    desc: "Resource management and tactical warfare.", 
    query: "StarCraft gameplay" },

  { title: "Roguelike", 
    desc: "Procedural generation and permanent death.", 
    query: "Hades game art" },
];
