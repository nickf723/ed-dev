export interface MonsterData {
  id: string;
  codename: string; // "PROJECT ALICE", "SUBJECT 808"
  name: string;
  class: 'Undead' | 'Cryptid' | 'Demon' | 'Construct' | 'Eldritch' | 'Slasher';
  threatLevel: 'Low' | 'Moderate' | 'High' | 'Extinction-Event';
  origin: string;
  weakness: string;
  stats: {
    strength: number; // 0-100
    intelligence: number;
    speed: number;
  };
  image: string; // The "API" image source
  desc: string;
}

export const MONSTER_DB: MonsterData[] = [
  {
    id: 'xenomorph',
    codename: 'SUBJECT XX-121',
    name: 'The Xenomorph',
    class: 'Cryptid',
    threatLevel: 'Extinction-Event',
    origin: 'Acheron (LV-426)',
    weakness: 'Extreme Thermal Shock',
    stats: { strength: 95, intelligence: 80, speed: 90 },
    image: 'https://upload.wikimedia.org/wikipedia/en/c/c1/Alien_%281979%29_-_The_Alien.jpg',
    desc: "A perfect organism. Its structural perfection is matched only by its hostility. Unclouded by conscience, remorse, or delusions of morality."
  },
  {
    id: 'dracula',
    codename: 'SUBJECT VLAD',
    name: 'Count Dracula',
    class: 'Undead',
    threatLevel: 'High',
    origin: 'Transylvania, Romania',
    weakness: 'Sunlight, Wooden Stake',
    stats: { strength: 85, intelligence: 100, speed: 70 },
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Max_Schreck_Nosferatu.jpg',
    desc: "An ancient aristocratic necromancer. Capable of shape-shifting (mist, bat, wolf) and mental domination. Feeds on the vital essence of the living."
  },
  {
    id: 'pennywise',
    codename: 'PROJECT MACROVERSE',
    name: 'Pennywise',
    class: 'Eldritch',
    threatLevel: 'High',
    origin: 'The Macroverse (Derry, ME)',
    weakness: 'The Ritual of Chüd',
    stats: { strength: 70, intelligence: 95, speed: 60 },
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Pennywise_%28It%2C_2017%29_cosplay.jpg',
    desc: "A trans-dimensional entity that awakens every 27 years to feed on fear. Often manifests as a circus clown to lure children."
  },
  {
    id: 'frankenstein',
    codename: 'THE MODERN PROMETHEUS',
    name: 'The Creature',
    class: 'Construct',
    threatLevel: 'Moderate',
    origin: 'Ingolstadt, Germany',
    weakness: 'Fire (Psychological)',
    stats: { strength: 98, intelligence: 60, speed: 40 },
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Frankenstein%27s_monster_%28Boris_Karloff%29.jpg',
    desc: "A sapient humanoid assembled from cadavers and vivified by electricity. Possesses superhuman strength but childlike emotional regulation."
  },
  {
    id: 'michael_myers',
    codename: 'THE SHAPE',
    name: 'Michael Myers',
    class: 'Slasher',
    threatLevel: 'High',
    origin: 'Haddonfield, IL',
    weakness: 'Unknown (Regenerative)',
    stats: { strength: 80, intelligence: 50, speed: 50 },
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Michael_Myers_mask.jpg',
    desc: "Pure evil. A human male possessing supernatural durability and an utter lack of empathy. Motivated solely by the urge to kill."
  }
];