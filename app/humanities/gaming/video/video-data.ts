import { Gamepad2, Cpu, Layers, Box, Monitor, Ghost } from "lucide-react";
import { GlossaryDatabase, termCategories } from "@/lib/glossary/types";

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

// 2. GLOSSARY EXPORT (Copy this to your library later)
export const videoGamingTerms: GlossaryDatabase = {
  "Ludonarrative Dissonance": {
    definition: "The conflict between a video game's narrative told through the story and the narrative told through the gameplay.",
    category: termCategories.ARTS,
    href: "/humanities/gaming/video",
    tags: ["Theory", "Critique"]
  },
  "Ray Tracing": {
    definition: "A rendering technique for generating an image by tracing the path of light as pixels in an image plane and simulating the effects of its encounters with virtual objects.",
    category: termCategories.COMPUTER_SCIENCE,
    href: "/formal-science/computer-science/graphics",
    tags: ["Graphics", "Rendering"]
  },
  "Hitbox": {
    definition: "An invisible shape commonly used in video games for real-time collision detection.",
    category: termCategories.COMPUTER_SCIENCE,
    tags: ["Mechanics", "Programming"]
  },
  "Frame Rate": {
    definition: "The frequency at which consecutive images called frames appear on a display. Measured in FPS (frames per second).",
    category: termCategories.TECHNOLOGY,
    tags: ["Performance", "Hardware"]
  },
  "NPC": {
    definition: "Non-Player Character. Any character in a game that is not controlled by a player.",
    category: termCategories.COMPUTER_SCIENCE,
    tags: ["AI", "Design"]
  }
};