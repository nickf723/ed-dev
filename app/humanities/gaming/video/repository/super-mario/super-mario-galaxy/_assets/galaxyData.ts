// MEDIA REPOSITORY
export const GALAXY_MEDIA = {
  hero: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=1600", // Nebula/Galaxy
  orchestra: "https://images.unsplash.com/photo-1465847899078-b29dedca94f9?auto=format&fit=crop&q=80&w=1000", // Orchestra/Conductor
  observatory: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&q=80&w=1000", // Observatory/Telescope
  diagrams: {
    gravityVectors: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Newton_Canon.svg/1024px-Newton_Canon.svg.png" // Orbital Mechanics
  }
};

// VOCABULARY REPOSITORY
export interface GalaxyTerm {
  id: string;
  term: string;
  def: string;
  context: string;
}

export const GALAXY_VOCAB: GalaxyTerm[] = [
  {
    id: 'spherical_gravity',
    term: 'Spherical Gravity',
    def: 'A physics system where the gravity vector pulls objects toward the center of a sphere, rather than a flat plane.',
    context: 'Allowed Mario to run upside down without falling off the world.'
  },
  {
    id: 'dynamic_camera',
    term: 'Dynamic Camera',
    def: 'An automated camera system that adjusts its "up" vector to match the local gravity of the planetoid.',
    context: 'Prevented motion sickness even when the player was upside down.'
  },
  {
    id: 'star_pointer',
    term: 'Star Pointer',
    def: 'A mechanic utilizing the Wii Remote\'s IR sensor to collect items (Star Bits) independently of character movement.',
    context: 'Kept the player engaged even during cutscenes or passive movement.'
  },
  {
    id: 'orchestration',
    term: 'Adaptive Orchestration',
    def: 'The use of a live symphony orchestra that shifts intensity based on gameplay events.',
    context: 'Galaxy was the first Mario game to ditch synthesized MIDI for live recordings.'
  }
];