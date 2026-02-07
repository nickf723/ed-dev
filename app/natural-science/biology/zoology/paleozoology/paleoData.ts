export type Era = 'Cenozoic' | 'Mesozoic' | 'Paleozoic';

export interface PaleoEntry {
  id: string;
  name: string;
  scientificName: string;
  era: Era;
  period: string;
  diet: 'Carnivore' | 'Herbivore' | 'Piscivore';
  desc: string;
  image: string;    // The "Alive" Art
  skeleton: string; // The "Dead" Science
}

export const PALEO_DB: PaleoEntry[] = [
  {
    id: 'trex',
    name: 'Tyrannosaurus',
    scientificName: 'Tyrannosaurus rex',
    era: 'Mesozoic',
    period: 'Late Cretaceous',
    diet: 'Carnivore',
    desc: "The definitive apex predator. New research suggests it had lips, excellent low-frequency hearing, and the bite force to crush solid bone.",
    // Sue the T-Rex (Field Museum) vs Life Restoration
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Tyrannosaurus_rex_scale.svg/1200px-Tyrannosaurus_rex_scale.svg.png', 
    // Using scale diagrams often aligns better than random art
    skeleton: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Tyrannosaurus_rex_scale.svg/1200px-Tyrannosaurus_rex_scale.svg.png' 
    // TRICK: For this demo, I'm using a "Scale Diagram" which usually shows bone + silhouette. 
    // In a real app, you would use:
    // Image: /dinos/trex_life.png
    // Skeleton: /dinos/trex_bone.png (Transparent PNG)
  },
  {
    id: 'stego',
    name: 'Stegosaurus',
    scientificName: 'Stegosaurus stenops',
    era: 'Mesozoic',
    period: 'Late Jurassic',
    diet: 'Herbivore',
    desc: "Famous for its thagomizer (tail spikes) and dorsal plates, which may have been used for thermoregulation or display rather than just defense.",
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Stegosaurus_stenops_life_reconstruction.png',
    skeleton: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Stegosaurus_stenops_skeletal_reconstruction.png/1280px-Stegosaurus_stenops_skeletal_reconstruction.png'
  },
  {
    id: 'triceratops',
    name: 'Triceratops',
    scientificName: 'Triceratops horridus',
    era: 'Mesozoic',
    period: 'Late Cretaceous',
    diet: 'Herbivore',
    desc: "One of the last non-avian dinosaurs to evolve. Its massive frill was likely for display and species recognition, not just neck protection.",
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Triceratops_horridus_life_reconstruction.png/1280px-Triceratops_horridus_life_reconstruction.png',
    skeleton: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Triceratops_horridus_skeletal_reconstruction.png/1280px-Triceratops_horridus_skeletal_reconstruction.png'
  },
  {
    id: 'spino',
    name: 'Spinosaurus',
    scientificName: 'Spinosaurus aegyptiacus',
    era: 'Mesozoic',
    period: 'Cretaceous',
    diet: 'Piscivore',
    desc: "The river monster. Recent discoveries of its paddle-like tail confirm it was the first known semi-aquatic dinosaur.",
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Spinosaurus_aegyptiacus_scale_diagram.svg/1280px-Spinosaurus_aegyptiacus_scale_diagram.svg.png',
    skeleton: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Spinosaurus_aegyptiacus_scale_diagram.svg/1280px-Spinosaurus_aegyptiacus_scale_diagram.svg.png'
  }
];