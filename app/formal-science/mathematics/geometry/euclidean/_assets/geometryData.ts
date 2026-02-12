export const GEOMETRY_MEDIA = {
  hero: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1600", // Geometric Architectural Facade
  parthenon: "https://images.unsplash.com/photo-1521575256226-c22501d51a65?auto=format&fit=crop&q=80&w=1000", // Parthenon (Golden Ratio)
  compass: "https://images.unsplash.com/photo-1581093588401-fbb07aa86d87?auto=format&fit=crop&q=80&w=1000", // Drafting Tools
};

export const GEOMETRY_TOPICS = [
  {
    id: 'basics',
    title: 'Points, Lines & Planes',
    desc: 'The undefinable terms that build the universe. Understanding dimensions 0, 1, and 2.',
    icon: 'Dot',
    link: '/formal-science/mathematics/geometry/euclidean/points-lines'
  },
  {
    id: 'shapes',
    title: 'Polygons & Circles',
    desc: 'Triangles, quadrilaterals, and the infinite symmetry of the circle. Area and perimeter logic.',
    icon: 'Triangle',
    link: '/formal-science/mathematics/geometry/euclidean/polygons-circles'
  },
  {
    id: 'angles',
    title: 'Angles & Intersections',
    desc: 'The language of inclination. Complementary, supplementary, vertical angles, and angle sums.',
    icon: 'Angle',
    link: '/formal-science/mathematics/geometry/euclidean/angles-intersections'
  },
  {
    id: 'solids',
    title: '3D Solids',
    desc: 'The world of volume and surface area. Prisms, pyramids, cylinders, cones, and spheres.',
    icon: 'Cube',
    link: '/formal-science/mathematics/geometry/euclidean/solids'
  },
  {
    id: 'congruence',
    title: 'Triangle Congruence',
    desc: 'When are two shapes truly identical? Proving triangle congruence with SSS, SAS, ASA, AAS, and HL.',
    icon: 'Triangle',
    link: '/formal-science/mathematics/geometry/euclidean/triangle-congruence'
  },
  {
    id: 'proofs',
    title: 'Logic & Proofs',
    desc: 'Deductive reasoning. Using axioms and postulates to prove theorems with absolute certainty.',
    icon: 'Scroll',
    link: '/formal-science/mathematics/geometry/euclidean/logic-proofs'
  },
  {
    id: 'constructions',
    title: 'Classic Constructions',
    desc: 'The game of geometry. creating perfect shapes using only a compass and a straightedge.',
    icon: 'Compass',
    link: '/formal-science/mathematics/geometry/euclidean/classic-constructions'
  }
];

export const GEOMETRY_VOCAB = [
  {
    term: 'Axiom',
    def: 'A statement accepted as true without proof. The foundation of the logical system.',
    example: 'Euclid\'s 1st Axiom: "A straight line segment can be drawn joining any two points."'
  },
  {
    term: 'Theorem',
    def: 'A statement that has been proven to be true based on axioms and other theorems.',
    example: 'Pythagorean Theorem: a² + b² = c²'
  },
  {
    term: 'Corollary',
    def: 'A direct consequence of a proven theorem, often easily deduced from it.',
    example: 'If a triangle is equilateral, it is also equiangular.'
  }
];