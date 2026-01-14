// app/humanities/philosophy/aesthetics/matrix/data/aesthetics.ts

// --- 1. TYPE DEFINITIONS ---
export type ParentCategory = 'Speculative' | 'Historical' | 'Lifestyle' | 'Digital' | 'Design';

export type CategoryKey = 
  | 'fashion' | 'architecture' | 'tech' | 'transport' 
  | 'cuisine' | 'interior' | 'media' | 'music' | 'philosophy' | 'activities';

export interface AestheticItem {
  title: string;
  desc: string;
  imageQuery: string;
  localImage?: string; // Optional override for manual asset control
  unsplashCollectionId?: string;
}

export interface AestheticProfile {
  id: string;
  name: string;
  parentCategory: ParentCategory;
  desc: string;
  color: string;
  palette: string[];
  tags: string[];
  spotifyPlaylist?: string;
  relatedMedia?: string[];
  // SCHEMA UPDATE: All categories are now Arrays of Items
  items: Partial<Record<CategoryKey, AestheticItem[]>>; 
  unsplashCollectionId?: string;
}

// --- 2. CONFIGURATION ARRAYS ---
export const PARENT_CATEGORIES: ParentCategory[] = [
  "Speculative", "Historical", "Lifestyle", "Digital", "Design"
];

// --- 3. THE MASTER DATABASE ---
export const AESTHETICS_DB: AestheticProfile[] = [

  // ==============================================
  // A. SPECULATIVE (Sci-Fi / Fantasy)
  // ==============================================
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    parentCategory: "Speculative",
    desc: "High tech, low life. A hyper-capitalist dystopia where the line between human and machine is blurred by cybernetics, neon, and corporate warfare.",
    color: "#00ff00", // Acid Green
    palette: ["#050505", "#00ff00", "#f900bf", "#00eaff"],
    tags: ["Neon", "Hacking", "Transhumanism", "Dystopia", "Night City"],
    relatedMedia: ["Blade Runner 2049", "Akira", "Ghost in the Shell", "Cyberpunk: Edgerunners"],
    items: {
      fashion: [
        { 
          title: "The Street Samurai", 
          desc: "Function over form. Armored leather bomber jackets with high collars, tactical cargo pants, and a concealed thermal katana.", 
          imageQuery: "cyberpunk street samurai fashion armored jacket",
          localImage: "https://images.unsplash.com/photo-1626282874430-c11ae32d2898?q=80&w=1000&auto=format&fit=crop"
        },
        { 
          title: "Corpo-Militarism", 
          desc: "The uniform of the elite. Sharp, angular suits made of ballistic weave, synchronized smart-glasses, and minimal branding.", 
          imageQuery: "cyberpunk corporate suit futuristic business",
          localImage: "https://images.unsplash.com/photo-1515518562304-94a2806aa717?q=80&w=1000&auto=format&fit=crop"
        },
        { 
          title: "Nomad Leathers", 
          desc: "Dust-resistant gear for the badlands. Distressed leather, goggles, scarfs, and tech cobbled together from scrap.", 
          imageQuery: "cyberpunk nomad wasteland fashion" 
        }
      ],
      tech: [
        { 
          title: "The Cyberdeck", 
          desc: "A portable hacking rig. Often custom-built with stickers and exposed wiring, used to breach corporate ICE.", 
          imageQuery: "cyberpunk cyberdeck hacking device prop",
          localImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop"
        },
        { 
          title: "Mantis Blades", 
          desc: "Retractable thermal blades implanted into the forearms, concealing a deadly weapon in plain sight.", 
          imageQuery: "cyberpunk mantis blades arm implant" 
        }
      ],
      architecture: [
        { 
          title: "The Mega-Block", 
          desc: "A self-contained brutalist city-within-a-building. 200 floors of cramped housing, vending machines, and crime.", 
          imageQuery: "cyberpunk brutalist megabuilding apartment",
          localImage: "/images/cyberpunk/arc_mega-block.jpg"
        },
        { 
          title: "The Neon Market", 
          desc: "Street level. A claustrophobic maze of noodle stalls, steam, holographic advertisements, and constant rain.", 
          imageQuery: "cyberpunk alleyway neon market rain",
          unsplashCollectionId: "2CIpgN8B6uw/cyberpunk-neon-market" 
        }
      ],
      transport: [
        { 
          title: "Yaiba Kusanagi", 
          desc: "A high-speed motorcycle with a glowing rim-light chassis, built for weaving through gridlock.", 
          imageQuery: "cyberpunk motorcycle akira bike red" 
        },
        { 
          title: "The Aerodyne (AV)", 
          desc: "Luxury flying vehicles using thrust-vectoring fans to soar above the traffic and smog.", 
          imageQuery: "cyberpunk flying car sci fi city" 
        }
      ],
      cuisine: [
        { 
          title: "Synth-Meat Yakitori", 
          desc: "Lab-grown protein skewers served at roadside stalls. Tastes almost like chicken, if you use enough spice.", 
          imageQuery: "cyberpunk street food stall noodles neon" 
        }
      ],
    },
    unsplashCollectionId: "ahRHde9mLXg/cyberpunk/fb18e771535c16af47355d4d64feacae"

  },
  {
    id: "steampunk",
    name: "Steampunk",
    parentCategory: "Speculative",
    desc: "Victorian industrialism where steam power remains king and electricity never took over.",
    color: "#d97706",
    palette: ["#78350f", "#d97706", "#fcd34d", "#292524"],
    tags: ["Brass", "Gears", "Victorian", "Steam"],
    items: {
      fashion: [
        { title: "The Aviator", desc: "Leather flight caps, brass goggles, and shearling coats for high-altitude airship travel.", imageQuery: "steampunk aviator goggles" },
        { title: "The Aristocrat", desc: "Victorian corsets, bustles, top hats adorned with gears, and velvet frock coats.", imageQuery: "steampunk victorian fashion top hat" },
        { title: "The Tinker", desc: "Oil-stained overalls, tool belts, and mechanical prosthetic limbs.", imageQuery: "steampunk mechanic outfit" }
      ],
      architecture: [
        { title: "Smokestack London", desc: "Brick factories and clock towers shrouded in industrial smog.", imageQuery: "steampunk city london fog" },
        { title: "The Sky-Dock", desc: "High-altitude platforms where dirigibles moor to skyscrapers.", imageQuery: "steampunk airship docking station" }
      ],
      tech: [
        { title: "Difference Engine", desc: "Analog computation using punch cards and brass gears.", imageQuery: "steampunk computer gears" },
        { title: "Steam Limb", desc: "Piston-driven prosthetic arms powered by miniature boilers.", imageQuery: "steampunk prosthetic arm" }
      ]
    }
  },
  {
    id: "solarpunk",
    name: "Solarpunk",
    parentCategory: "Speculative",
    desc: "A sustainable utopia where nature and technology coexist in harmony.",
    color: "#16a34a",
    palette: ["#16a34a", "#fde047", "#06b6d4", "#ffffff"],
    tags: ["Nature", "Eco", "Future", "Hope"],
    items: {
      architecture: [
        { title: "Vertical Forest", desc: "Glass skyscrapers covered in cascading vines and wind turbines.", imageQuery: "solarpunk architecture vertical forest" },
        { title: "Earthship", desc: "Homes built from recycled materials, semi-submerged in the ground.", imageQuery: "earthship sustainable home" }
      ],
      tech: [
        { title: "Biomimicry Drone", desc: "Robots shaped like dragonflies that pollinate flowers.", imageQuery: "futuristic drone dragonfly" },
        { title: "Stained Glass Solar", desc: "Beautiful Art Nouveau panels that generate energy.", imageQuery: "stained glass art nouveau solar" }
      ]
    }
  },
  {
    id: "dieselpunk",
    name: "Dieselpunk",
    parentCategory: "Speculative",
    desc: "Gritty, oil-stained retro-futurism based on the interwar period (1918-1939).",
    color: "#57534e",
    palette: ["#1c1917", "#57534e", "#78716c", "#b45309"],
    tags: ["War", "Oil", "Steel", "Art Deco"],
    items: {
      fashion: [
        { title: "The Mechanic", desc: "Grease-stained jumpsuits and welding goggles.", imageQuery: "dieselpunk mechanic fashion" },
        { title: "Noir Detective", desc: "Fedora, trench coat, and a cigarette in the rain.", imageQuery: "film noir detective rain" }
      ],
      transport: [
        { title: "The Ironclad", desc: "Massive, rivet-covered tanks and war trains.", imageQuery: "dieselpunk tank vehicle" },
        { title: "Flying Wing", desc: "Art deco bombers dominating the skies.", imageQuery: "dieselpunk airplane art deco" }
      ]
    }
  },
  {
    id: "cassette-futurism",
    name: "Cassette Futurism",
    parentCategory: "Speculative",
    desc: "The future as imagined in the late 70s. Chunky analog tech, CRT screens, and flight suits.",
    color: "#ea580c",
    palette: ["#ea580c", "#1c1917", "#44403c", "#ef4444"],
    tags: ["Analog", "Retro", "Sci-Fi", "80s"],
    items: {
      tech: [
        { title: "Analog Terminal", desc: "Monochrome green or amber screens with chunky mechanical keyboards.", imageQuery: "retro computer terminal amber screen" },
        { title: "Data Tape", desc: "Physical media storage reels spinning in massive mainframes.", imageQuery: "mainframe computer reel to reel 70s" }
      ],
      transport: [
        { title: "Space Freighter", desc: "Industrial spaceships designed for utility, not aerodynamics (Alien).", imageQuery: "cassette futurism spaceship interior" }
      ],
      fashion: [
        { title: "Flight Suit", desc: "Padded vests, jumpsuits, and wrist-mounted calculators.", imageQuery: "retro sci fi fashion jumpsuit" }
      ]
    }
  },

  // ==============================================
  // B. DIGITAL (Internet Native)
  // ==============================================
  {
    id: "vaporwave",
    name: "Vaporwave",
    parentCategory: "Digital",
    desc: "A surreal, glitchy remix of 80s consumer culture and digital decay.",
    color: "#d946ef",
    palette: ["#fae8ff", "#d946ef", "#3b82f6", "#06b6d4"],
    tags: ["80s", "Glitch", "Mall", "Neon"],
    items: {
      architecture: [
        { title: "The Dead Mall", desc: "Empty shopping centers with checkered floors and neon palm trees.", imageQuery: "vaporwave dead mall neon" },
        { title: "Pool Rooms", desc: "Endless tiled rooms filled with bright blue water.", imageQuery: "vaporwave pool rooms liminal" }
      ],
      media: [
        { title: "Glitch Art", desc: "VHS static, anime screenshots, and classical marble busts.", imageQuery: "vaporwave glitch art statue" },
        { title: "Windows 95", desc: "Pop-up windows, error messages, and jagged fonts.", imageQuery: "windows 95 aesthetic" }
      ]
    }
  },
  {
    id: "frutiger-aero",
    name: "Frutiger Aero",
    parentCategory: "Digital",
    desc: "The glossy, optimistic tech aesthetic of 2004-2013. Skeuomorphism, water, and grass.",
    color: "#0ea5e9",
    palette: ["#0ea5e9", "#86efac", "#ffffff", "#f0f9ff"],
    tags: ["2000s", "Glossy", "Tech", "Clean"],
    items: {
      tech: [
        { title: "Skeuomorphism", desc: "Icons that look like glossy jelly beans or glass.", imageQuery: "frutiger aero interface glossy" },
        { title: "The Clear Phone", desc: "See-through plastic electronics.", imageQuery: "transparent technology 2000s" }
      ],
      architecture: [
        { title: "Eco-Futurism", desc: "Clean white cities with wind turbines and blue skies.", imageQuery: "frutiger aero city futuristic" },
        { title: "The Windows Desktop", desc: "Rolling green hills and lens flares.", imageQuery: "bliss wallpaper windows xp" }
      ]
    }
  },
  {
    id: "weirdcore",
    name: "Weirdcore",
    parentCategory: "Digital",
    desc: "Disassociation and nostalgia. Low-res images that feel familiar but unsettling.",
    color: "#ef4444",
    palette: ["#000000", "#ef4444", "#ffff00", "#0000ff"],
    tags: ["Liminal", "Creepy", "Nostalgia", "Internet"],
    items: {
      architecture: [
        { title: "Liminal Space", desc: "Empty hallways, playgrounds at night, and places that shouldn't exist.", imageQuery: "liminal space hallway eerie" }
      ],
      media: [
        { title: "Compression Artifacts", desc: "Low-res JPEGs and primitive text editing.", imageQuery: "weirdcore aesthetic glitch text" }
      ]
    }
  },
  {
    id: "synthwave",
    name: "Synthwave",
    parentCategory: "Digital",
    desc: "A neon-soaked, driving rhythm vision of the 1980s night.",
    color: "#7e22ce",
    palette: ["#7e22ce", "#ec4899", "#facc15", "#000000"],
    tags: ["Neon", "Night", "Driving", "80s"],
    items: {
      transport: [
        { title: "The Testarossa", desc: "A sleek sports car speeding towards a wireframe sunset.", imageQuery: "synthwave car outrun ferrari" }
      ],
      architecture: [
        { title: "The Grid", desc: "A digital horizon line made of glowing purple lasers.", imageQuery: "synthwave landscape grid neon" }
      ],
      fashion: [
        { title: "The Driver", desc: "Letterman jackets, driving gloves, and aviators at night.", imageQuery: "synthwave fashion 80s neon" }
      ]
    }
  },

  // ==============================================
  // C. LIFESTYLE (Subcultures)
  // ==============================================
  {
    id: "cottagecore",
    name: "Cottagecore",
    parentCategory: "Lifestyle",
    desc: "Romanticized rural life. Baking, gardening, and escaping modernity.",
    color: "#65a30d",
    palette: ["#fefce8", "#65a30d", "#78350f", "#fef3c7"],
    tags: ["Nature", "Soft", "Vintage", "Bread"],
    items: {
      fashion: [
        { title: "The Forager", desc: "Linen overalls, muddy boots, and a woven basket.", imageQuery: "cottagecore fashion overalls garden" },
        { title: "Prairie Dress", desc: "Flowing cotton dresses with floral prints and lace collars.", imageQuery: "cottagecore prairie dress picnic" }
      ],
      activities: [
        { title: "Bread Making", desc: "Scoring sourdough loaves in a sun-drenched kitchen.", imageQuery: "sourdough bread scoring baking" },
        { title: "Flower Pressing", desc: "Preserving wildflowers in heavy vintage books.", imageQuery: "pressed flowers book aesthetic" }
      ]
    }
  },
  {
    id: "dark-academia",
    name: "Dark Academia",
    parentCategory: "Lifestyle",
    desc: "The pursuit of knowledge, classic literature, and gothic mystery.",
    color: "#451a03",
    palette: ["#1c1917", "#451a03", "#a8a29e", "#f5f5f4"],
    tags: ["Books", "University", "Gothic", "Autumn"],
    items: {
      fashion: [
        { title: "The Scholar", desc: "Tweed blazers, turtlenecks, and wire-rimmed glasses.", imageQuery: "dark academia fashion tweed coat" },
        { title: "The Poet", desc: "Loose white shirts, ink-stained fingers, and messy hair.", imageQuery: "dark academia aesthetic writing" }
      ],
      architecture: [
        { title: "Gothic Library", desc: "Spiral staircases, old books, and rain on windows.", imageQuery: "dark academia library interior" },
        { title: "The Boarding School", desc: "Brick buildings covered in ivy and fog.", imageQuery: "dark academia university ivy" }
      ]
    }
  },
  {
    id: "goblincore",
    name: "Goblincore",
    parentCategory: "Lifestyle",
    desc: "The appreciation of ugliness in nature. Moss, mud, mushrooms, and shiny trinkets.",
    color: "#3f6212",
    palette: ["#3f6212", "#713f12", "#3f3f46", "#a1a1aa"],
    tags: ["Moss", "Mud", "Chaos", "Forest"],
    items: {
      fashion: [
        { title: "Layered Rags", desc: "Oversized sweaters in earth tones, patchworks, and cargo pockets.", imageQuery: "goblincore fashion earthy sweater" }
      ],
      activities: [
        { title: "Shiny Hunting", desc: "Collecting buttons, bottle caps, and interesting stones.", imageQuery: "goblincore collection shiny objects" },
        { title: "Mud Walking", desc: "Exploring damp forests and frog ponds.", imageQuery: "mossy forest floor mushrooms" }
      ]
    }
  },
  {
    id: "pastel-goth",
    name: "Pastel Goth",
    parentCategory: "Lifestyle",
    desc: "Macabre imagery mixed with soft pastel colors. Creepy but cute.",
    color: "#f472b6",
    palette: ["#f472b6", "#000000", "#c084fc", "#86efac"],
    tags: ["Cute", "Spooky", "Pink", "Punk"],
    items: {
      fashion: [
        { title: "Spiked & Soft", desc: "Oversized pastel sweaters with inverted crosses and spiked chokers.", imageQuery: "pastel goth fashion" },
        { title: "Creepers", desc: "Platform shoes with bat wings or bone accessories.", imageQuery: "pastel goth platform shoes" }
      ],
      media: [
        { title: "Graveyard Picnic", desc: "Eating cupcakes and tea in a cemetery.", imageQuery: "pastel goth aesthetic cemetery" }
      ]
    }
  },
  {
    id: "kidcore",
    name: "Kidcore",
    parentCategory: "Lifestyle",
    desc: "Nostalgia for early 2000s childhood. Bright primary colors, stickers, and playfulness.",
    color: "#ef4444",
    palette: ["#ef4444", "#3b82f6", "#eab308", "#ffffff"],
    tags: ["Play", "Bright", "Nostalgia", "Toys"],
    items: {
      fashion: [
        { title: "Primary Color Block", desc: "Overalls, striped shirts, and beads.", imageQuery: "kidcore fashion primary colors" }
      ],
      interior: [
        { title: "The Playroom", desc: "Rainbow rugs, inflatable furniture, and fuzzy textures.", imageQuery: "kidcore bedroom aesthetic" }
      ],
      activities: [
        { title: "Playground", desc: "Ball pits, McDonald's playplaces, and jungle gyms.", imageQuery: "mcdonalds playplace aesthetic 90s" }
      ]
    }
  },
  {
    id: "normcore",
    name: "Normcore",
    parentCategory: "Lifestyle",
    desc: "Unpretentious, average-looking clothing. Freedom in being undistinguished.",
    color: "#737373",
    palette: ["#ffffff", "#737373", "#171717", "#0ea5e9"],
    tags: ["Average", "Plain", "Denim", "Simple"],
    items: {
      fashion: [
        { title: "The Dad Look", desc: "Chunky white sneakers, stonewash jeans, and a plain grey fleece.", imageQuery: "normcore fashion dad shoes" },
        { title: "The Tourist", desc: "Baseball caps, cargo shorts, and generic t-shirts.", imageQuery: "normcore aesthetic outfit" }
      ],
      activities: [
        { title: "Running Errands", desc: "Shopping at a bulk grocery store or waiting for the bus.", imageQuery: "grocery store aesthetic" }
      ]
    }
  },

  // ==============================================
  // D. HISTORICAL (Time Periods)
  // ==============================================
  {
    id: "art-deco",
    name: "Art Deco",
    parentCategory: "Historical",
    desc: "The roaring 20s. Geometric luxury, gold inlays, and the dawn of the machine age.",
    color: "#fbbf24",
    palette: ["#000000", "#fbbf24", "#14532d", "#71717a"],
    tags: ["1920s", "Gold", "Luxury", "Geometric"],
    items: {
      fashion: [
        { title: "The Flapper", desc: "Silk dresses with geometric beading and bobbed hair.", imageQuery: "art deco fashion 1920s flapper" },
        { title: "The Gatsby Tux", desc: "Sharp tuxedos with gold cufflinks.", imageQuery: "1920s men fashion tuxedo" }
      ],
      architecture: [
        { title: "The Skyscraper", desc: "Black marble floors, gold geometric patterns, and statues.", imageQuery: "art deco architecture interior gold" }
      ]
    }
  },
  {
    id: "y2k",
    name: "Y2K Futurism",
    parentCategory: "Historical",
    desc: "The turn of the millennium. Chrome, icy blue hues, and inflatable furniture.",
    color: "#3b82f6",
    palette: ["#eff6ff", "#3b82f6", "#93c5fd", "#c0c0c0"],
    tags: ["2000s", "Chrome", "Pop", "Shiny"],
    items: {
      fashion: [
        { title: "Metallic Puffers", desc: "Silver jackets, tinted shades, and frosted tips.", imageQuery: "y2k fashion metallic futuristic" },
        { title: "Velour Tracksuit", desc: "Bright pink matching sets with rhinestones.", imageQuery: "juicy couture tracksuit 2000s" }
      ],
      tech: [
        { title: "Flip Phone", desc: "Decorated with charms and stickers.", imageQuery: "y2k flip phone bling" }
      ]
    }
  },
  {
    id: "baroque",
    name: "Baroque",
    parentCategory: "Historical",
    desc: "The 17th century style of excessive ornamentation, drama, and gold leaf.",
    color: "#ca8a04",
    palette: ["#ca8a04", "#451a03", "#7f1d1d", "#000000"],
    tags: ["Gold", "Royal", "Drama", "Ornate"],
    items: {
      architecture: [
        { title: "The Palace", desc: "Infinite halls of mirrors, painted ceilings, and gold trim.", imageQuery: "palace of versailles hall of mirrors" },
        { title: "The Cathedral", desc: "Dramatic lighting (chiaroscuro) and marble statues.", imageQuery: "baroque cathedral interior" }
      ],
      fashion: [
        { title: "The Courtier", desc: "Powdered wigs, silk brocade, and heavy velvet robes.", imageQuery: "baroque fashion 18th century wig" }
      ],
      media: [
        { title: "Oil Painting", desc: "Dramatic scenes of gods and martyrs frozen in motion.", imageQuery: "baroque oil painting caravaggio" }
      ],
      music: [
        { title: "Harpsichord", desc: "Intricate counterpoint and fugues.", imageQuery: "harpsichord baroque instrument" }
      ]
    }
  },
  {
    id: "grunge",
    name: "Grunge",
    parentCategory: "Historical",
    desc: "90s Seattle sound. Dirty, unpolished, anti-consumerist, and angst-filled.",
    color: "#52525b",
    palette: ["#18181b", "#52525b", "#7f1d1d", "#3f3f46"],
    tags: ["90s", "Rock", "Messy", "Dark"],
    items: {
      fashion: [
        { title: "The Dropout", desc: "Oversized flannel shirts, ripped jeans, and dirty converse.", imageQuery: "90s grunge fashion flannel" },
        { title: "Kinderwhore", desc: "Tattered babydoll dresses worn with combat boots.", imageQuery: "90s grunge kinderwhore fashion" }
      ],
      interior: [
        { title: "The Garage", desc: "Dimly lit basements, peeling band posters, and cigarette smoke.", imageQuery: "grunge aesthetic messy room" }
      ],
      tech: [
        { title: "Analog Noise", desc: "Cassette tapes, distortion pedals, and bulky Walkmans.", imageQuery: "grunge aesthetic cassette tape" }
      ]
    }
  },
  {
    id: "mid-century-modern",
    name: "Mid-Century Modern",
    parentCategory: "Historical",
    desc: "The design language of the 1950s and 60s. Clean lines, organic curves, and functionality.",
    color: "#b45309",
    palette: ["#b45309", "#15803d", "#0e7490", "#f5f5f4"],
    tags: ["1950s", "Clean", "Wood", "Retro"],
    items: {
      interior: [
        { title: "Sunken Living Room", desc: "Conversation pits, teak sideboards, and Eames chairs.", imageQuery: "mid century modern sunken living room" },
        { title: "The Eames Chair", desc: "Molded plywood and leather lounging furniture.", imageQuery: "eames lounge chair interior" }
      ],
      architecture: [
        { title: "Glass House", desc: "Floor-to-ceiling windows blurring the line between indoors and nature.", imageQuery: "mid century modern architecture palm springs" }
      ],
      tech: [
        { title: "Hi-Fi System", desc: "Wood-paneled record players and tube amplifiers.", imageQuery: "vintage hifi record player 1960s" }
      ]
    }
  },

  // ==============================================
  // E. DESIGN / ART MOVEMENTS
  // ==============================================
  {
    id: "brutalism",
    name: "Brutalism",
    parentCategory: "Design",
    desc: "Architecture characterized by raw concrete, massive scale, and utilitarianism.",
    color: "#737373",
    palette: ["#171717", "#737373", "#d4d4d4", "#a3a3a3"],
    tags: ["Concrete", "Grey", "Massive", "Cold"],
    items: {
      architecture: [
        { title: "Concrete Fortress", desc: "Imposing government buildings with no decoration.", imageQuery: "brutalist architecture concrete building" },
        { title: "The Housing Block", desc: "Repetitive geometric windows and raw cement.", imageQuery: "brutalist apartment block soviet" }
      ]
    }
  },
  {
    id: "memphis",
    name: "Memphis Design",
    parentCategory: "Design",
    desc: "The 1980s rebellion against minimalism. Clashing colors, squiggly lines, and geometric chaos.",
    color: "#facc15",
    palette: ["#facc15", "#ef4444", "#3b82f6", "#000000"],
    tags: ["80s", "Colorful", "Geometric", "Fun"],
    items: {
      interior: [
        { title: "The Playful Room", desc: "Terrazzo floors, laminate furniture, and neon shapes.", imageQuery: "memphis design interior furniture 80s" }
      ]
    }
  },
  {
    id: "art-nouveau",
    name: "Art Nouveau",
    parentCategory: "Design",
    desc: "The turn of the century style inspired by natural forms, curved lines, and asymmetry.",
    color: "#57534e",
    palette: ["#57534e", "#d4d4d8", "#a1a1aa", "#10b981"],
    tags: ["Nature", "Curves", "Elegant", "Paris"],
    items: {
      architecture: [
        { title: "Metro Station", desc: "Wrought iron twisted into vines and floral shapes.", imageQuery: "art nouveau metro station paris" },
        { title: "Stained Glass", desc: "Windows depicting peacocks, flowers, and flowing hair.", imageQuery: "art nouveau stained glass window" }
      ],
      media: [
        { title: "Mucha Print", desc: "Posters featuring women with long, flowing hair and halos.", imageQuery: "alphonse mucha art nouveau" }
      ],
      interior: [
        { title: "The Salon", desc: "Curved velvet sofas and lamps shaped like lilies.", imageQuery: "art nouveau interior furniture" }
      ]
    }
  },
  {
    id: "minimalism",
    name: "Minimalism",
    parentCategory: "Design",
    desc: "The art of less. Focus on form, light, and empty space.",
    color: "#d4d4d4",
    palette: ["#ffffff", "#d4d4d4", "#52525b", "#000000"],
    tags: ["Clean", "White", "Simple", "Modern"],
    items: {
      interior: [
        { title: "The Void", desc: "White walls, polished concrete floors, and a single plant.", imageQuery: "minimalist interior design empty room" }
      ],
      fashion: [
        { title: "The Capsule", desc: "Unbranded monochromatic tees, tailored trousers, and white sneakers.", imageQuery: "minimalist fashion monochrome" }
      ],
      architecture: [
        { title: "The Cube", desc: "Buildings reduced to their essential geometric shapes.", imageQuery: "minimalist architecture concrete white" }
      ]
    }
  }
];