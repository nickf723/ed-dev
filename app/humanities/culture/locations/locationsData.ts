export type Region = 'North America' | 'Europe' | 'Asia' | 'Africa' | 'South America' | 'Oceania';
export type Sector = 'Tech' | 'History' | 'Nature' | 'Urban';

export interface LocationNode {
  id: string;
  name: string;
  region: Region;
  coords: string; // "35.6762° N, 139.6503° E"
  sector: Sector[];
  desc: string;
  link: string;
  image: string;
  status: 'Online' | 'Offline' | 'Locked';
}

export const LOCATIONS: LocationNode[] = [
  {
    id: 'tokyo',
    name: 'Tokyo',
    region: 'Asia',
    coords: '35.6762° N, 139.6503° E',
    sector: ['Tech', 'Urban'],
    desc: 'The Neon Metropolis. Cyberpunk aesthetic meets Edo tradition.',
    link: '/humanities/culture/locations/tokyo',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Skyscrapers_of_Shinjuku_2009_January.jpg/800px-Skyscrapers_of_Shinjuku_2009_January.jpg',
    status: 'Online'
  },
  {
    id: 'boulder',
    name: 'Boulder',
    region: 'North America',
    coords: '40.0150° N, 105.2705° W',
    sector: ['Nature', 'Tech'],
    desc: 'The Flatirons. Where atmospheric science meets elite athleticism.',
    link: '/humanities/culture/locations/boulder',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Boulder_Flatirons.jpg/800px-Boulder_Flatirons.jpg',
    status: 'Online'
  },
  {
    id: 'cairo',
    name: 'Cairo',
    region: 'Africa',
    coords: '30.0444° N, 31.2357° E',
    sector: ['History', 'Urban'],
    desc: 'Umm al-Dunya. The chaos of the city against the silence of the pyramids.',
    link: '/humanities/culture/locations/cairo',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/All_Gizah_Pyramids.jpg/800px-All_Gizah_Pyramids.jpg',
    status: 'Online'
  },
  {
    id: 'boston',
    name: 'Boston',
    region: 'North America',
    coords: '42.3601° N, 71.0589° W',
    sector: ['History', 'Tech'],
    desc: 'The Hub. Brick row houses, revolutionary history, and biotech innovation.',
    link: '/humanities/culture/locations/boston',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Boston_Skyline_from_Fan_Pier.jpg/800px-Boston_Skyline_from_Fan_Pier.jpg',
    status: 'Online'
  },
  {
    id: 'london',
    name: 'London',
    region: 'Europe',
    coords: '51.5074° N, 0.1278° W',
    sector: ['History', 'Urban', 'Tech'],
    desc: 'The Old Smoke. A global financial center layered over Roman ruins.',
    link: '#', // Placeholder
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg/800px-Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg',
    status: 'Offline'
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    region: 'Asia',
    coords: '35.0116° N, 135.7681° E',
    sector: ['History', 'Nature'],
    desc: 'The Thousand Year Capital. Zen gardens, geisha districts, and autumn leaves.',
    link: '#',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Kinkaku-ji_2011-06-04.jpg/800px-Kinkaku-ji_2011-06-04.jpg',
    status: 'Locked'
  }
];