export interface GameNode {
  id: string;
  title: string;
  category: 'History' | 'Tech' | 'Design' | 'Culture' | 'Genre';
  desc: string;
  link: string; // Internal route or external
  image: string; // Unsplash ID
}

export const GAME_REPO: GameNode[] = [
  {
    id: 'history',
    title: 'The Generations',
    category: 'History',
    desc: 'From the Oscilloscope to the PS5. Tracing the 9 generations of hardware evolution.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000' // Retro Arcade
  },
  {
    id: 'design',
    title: 'Game Design',
    category: 'Design',
    desc: 'Mechanics, dynamics, and aesthetics. How rules create fun and why we play.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=1000' // Level Design / Paper
  },
  {
    id: 'graphics',
    title: 'Rendering Pipeline',
    category: 'Tech',
    desc: 'Polygons, shaders, and ray tracing. The math behind the magic of 3D graphics.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1612287230217-969b659c9462?auto=format&fit=crop&q=80&w=1000' // Wireframe / GPU
  },
  {
    id: 'esports',
    title: 'Competitive Play',
    category: 'Culture',
    desc: 'APM, metas, and stadiums. The rise of digital athletes and global leagues.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000' // Esports Arena
  },
  {
    id: 'platformers', // Changed ID for clarity
    title: 'The Platformer',
    category: 'Genre', // Changed Category
    desc: 'The study of movement, gravity, and spatial reasoning. From 2D sprites to spherical worlds.',
    link: '/humanities/gaming/video/platformers', // THE NEW LINK
    image: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&q=80&w=1000' // Super Mario style sneakers/jumping
  },
];