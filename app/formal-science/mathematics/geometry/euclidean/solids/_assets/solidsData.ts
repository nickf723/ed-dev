export const SOLIDS_MEDIA = {
  hero: "https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?auto=format&fit=crop&q=80&w=1600", // Abstract Geometric Structures
  pyramids: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=1000", // Giza
  atomium: "https://images.unsplash.com/photo-1575389658537-4b6d4b967d3e?auto=format&fit=crop&q=80&w=1000", // Atomium Brussels (Spheres)
};

export const SOLID_TYPES = [
  {
    id: 'polyhedra',
    title: 'Polyhedra',
    desc: 'Solids with flat faces that are polygons. Includes prisms, pyramids, and the Platonic solids.',
    icon: 'Box'
  },
  {
    id: 'non-polyhedra',
    title: 'Non-Polyhedra',
    desc: 'Solids with curved surfaces. Includes cylinders, cones, and spheres.',
    icon: 'Circle'
  }
];

export const SOLIDS_VOCAB = [
  {
    term: 'Face',
    def: 'A flat surface that forms part of the boundary of a solid object.',
    meta: '2D Surface'
  },
  {
    term: 'Edge',
    def: 'A line segment where two faces meet.',
    meta: '1D Line'
  },
  {
    term: 'Vertex',
    def: 'A point where three or more edges meet. (Plural: Vertices)',
    meta: '0D Point'
  },
  {
    term: 'Euler\'s Formula',
    def: 'For any convex polyhedron, the number of faces plus the number of vertices minus the number of edges always equals 2.',
    meta: 'F + V - E = 2'
  }
];