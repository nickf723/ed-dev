export type HorrorGenre = 'Gothic' | 'Sci-Fi' | 'Folk' | 'Slasher' | 'Cosmic' | 'Psychological';

export interface MonsterEntry {
  id: string;
  name: string;
  class: 'Undead' | 'Cryptid' | 'Demon' | 'Man-Made' | 'Eldritch';
  desc: string;
  genres: HorrorGenre[];
  settings: string[]; // IDs of settings
  weakness: string;
  image: string;
}

export interface HorrorSetting {
  id: string;
  title: string;
  icon: any; // Lucide Icon string reference
  sensory: string;
  color: string;
  image: string; // NEW FIELD
}

export const SETTINGS: HorrorSetting[] = [
  { 
    id: 'hospital', 
    title: 'The Asylum', 
    icon: 'Activity', 
    sensory: "Flickering fluorescents, smell of bleach, distant screaming.", 
    color: "text-cyan-200",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Dilapidated_Hallway.jpg"
  },
  { 
    id: 'cornfield', 
    title: 'The Harvest', 
    icon: 'Wheat', 
    sensory: "Dry stalks rustling, endless rows, the sun is too hot.", 
    color: "text-amber-600",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Scary_night.img.jpg"
  },
  { 
    id: 'mansion', 
    title: 'Gothic Manor', 
    icon: 'Castle', 
    sensory: "Dust motes, ticking clocks, portraits that watch you.", 
    color: "text-purple-400",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Haunted_Mansion_Exterior.JPG"
  },
  { 
    id: 'lab', 
    title: 'Research Lab', 
    icon: 'FlaskConical', 
    sensory: "Cold air, hum of servers, bio-hazard alarms.", 
    color: "text-green-500",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Negative_image_of_what_i_did_in_lab.jpg"
  },
  { 
    id: 'cabin', 
    title: 'The Cabin', 
    icon: 'Trees', 
    sensory: "Isolation, creaking wood, darkness pressing against the glass.", 
    color: "text-stone-400",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Cabin_in_the_woods_%28Unsplash%29.jpg"
  },
];

export const MONSTERS: MonsterEntry[] = [
  {
    id: 'zombie',
    name: 'The Reanimated',
    class: 'Undead',
    desc: "A corpse returned to life, driven by a singular hunger. Origins vary from Haitian Voodoo curses to weaponized nervous system viruses.",
    genres: ['Gothic', 'Sci-Fi'],
    settings: ['hospital', 'lab', 'mansion'],
    weakness: 'Destruction of the Brain Stem',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Night_of_the_Living_Dead_%281968%29_-_ghoul_1.jpg'
  },
  {
    id: 'vampire',
    name: 'The Vampyr',
    class: 'Undead',
    desc: "Apex predators who feed on the vital essence (blood) of the living. Sophisticated, charming, and eternally damned.",
    genres: ['Gothic'],
    settings: ['mansion'],
    weakness: 'Sunlight, Decapitation, Stake to Heart',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Max_Schreck_Nosferatu.jpg'
  },
  {
    id: 'xenomorph',
    name: 'Star-Spawn',
    class: 'Cryptid',
    desc: "Biological weapons from beyond the stars. Perfect organisms. Structural perfection matched only by their hostility.",
    genres: ['Sci-Fi', 'Cosmic'],
    settings: ['lab'],
    weakness: 'Extreme Thermal Shock',
    image: 'https://upload.wikimedia.org/wikipedia/en/c/c1/Alien_%281979%29_-_The_Alien.jpg'
  },
  {
    id: 'cultist',
    name: 'The Believer',
    class: 'Man-Made',
    desc: "Humans corrupted by forbidden knowledge. They do not wish to kill you; they wish to sacrifice you to something older than time.",
    genres: ['Folk', 'Cosmic'],
    settings: ['cornfield', 'cabin'],
    weakness: 'Disruption of the Ritual',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Goya_-_Brujas_vuelo.jpg'
  },
  {
    id: 'slasher',
    name: 'The Mask',
    class: 'Man-Made',
    desc: "The unstoppable force. Often silent, masked, and wielding an edged weapon. Motivated by revenge or pure insanity.",
    genres: ['Slasher', 'Psychological'],
    settings: ['cabin', 'cornfield', 'hospital'],
    weakness: 'The Final Girl',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Michael_Myers_mask.jpg'
  }
];