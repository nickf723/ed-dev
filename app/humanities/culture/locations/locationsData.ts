export type Continent = 'North America' | 'Europe' | 'Asia' | 'Africa' | 'South America' | 'Oceania';
export type Sector = 'Tech' | 'History' | 'Nature' | 'Urban';

export interface LocationNode {
  id: string;
  name: string;
  continent: Continent;
  country: string; // e.g., "USA", "Japan"
  coords: [number, number];
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
    continent: 'Asia',
    country: 'Japan',
    coords: [35.6762, 139.6503],
    sector: ['Tech', 'Urban'],
    desc: 'The Neon Metropolis. Cyberpunk aesthetic meets Edo tradition.',
    link: '/humanities/culture/locations/tokyo',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Skyscrapers_of_Shinjuku_2009_January.jpg/800px-Skyscrapers_of_Shinjuku_2009_January.jpg',
    status: 'Online'
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    continent: 'Asia',
    country: 'Japan',
    coords: [35.0116, 135.7681],
    sector: ['History', 'Nature'],
    desc: 'The Thousand Year Capital.',
    link: '#',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Kinkaku-ji_2011-06-04.jpg/800px-Kinkaku-ji_2011-06-04.jpg',
    status: 'Locked'
  },
  {
    id: 'boulder',
    name: 'Boulder',
    continent: 'North America',
    country: 'United States',
    coords: [40.0150, -105.2705],
    sector: ['Nature', 'Tech'],
    desc: 'Where mountains meet the mind.',
    link: '/humanities/culture/locations/boulder',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Boulder_Flatirons.jpg/800px-Boulder_Flatirons.jpg',
    status: 'Online'
  },
  {
    id: 'boston',
    name: 'Boston',
    continent: 'North America',
    country: 'United States',
    coords: [42.3601, -71.0589],
    sector: ['History', 'Tech'],
    desc: 'The Cradle of Liberty.',
    link: '/humanities/culture/locations/boston',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Boston_Skyline_from_Fan_Pier.jpg/800px-Boston_Skyline_from_Fan_Pier.jpg',
    status: 'Online'
  },
  {
    id: 'cairo',
    name: 'Cairo',
    continent: 'Africa',
    country: 'Egypt',
    coords: [30.0444, 31.2357],
    sector: ['History', 'Urban'],
    desc: 'The Mother of the World.',
    link: '/humanities/culture/locations/cairo',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/All_Gizah_Pyramids.jpg/800px-All_Gizah_Pyramids.jpg',
    status: 'Online'
  },
  {
    id: 'london',
    name: 'London',
    continent: 'Europe',
    country: 'United Kingdom',
    coords: [51.5074, -0.1278],
    sector: ['History', 'Urban'],
    desc: 'The Old Smoke.',
    link: '#', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg/800px-Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg',
    status: 'Offline'
  }
];