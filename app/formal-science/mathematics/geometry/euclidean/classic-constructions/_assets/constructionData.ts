export const CONST_MEDIA = {
  hero: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?auto=format&fit=crop&q=80&w=1600", // Technical Drawing / Compass
  daVinci: "https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?auto=format&fit=crop&q=80&w=1000", // Vitruvian Man style sketch
};

export const TOOLS = [
  {
    name: 'The Compass',
    role: 'Distance Transfer',
    rule: 'Can only draw circles or arcs. It essentially "captures" a distance between two points and moves it elsewhere.'
  },
  {
    name: 'The Straightedge',
    role: 'Line Creation',
    rule: 'Can only connect two points with a straight line. It has NO markings (it is not a ruler).'
  }
];

export const CONSTRUCTIONS = [
  {
    id: 'perp_bisector',
    title: 'Perpendicular Bisector',
    desc: 'The most powerful move in geometry. It finds the midpoint of a segment and creates a 90° intersection simultaneously.',
    steps: 4
  },
  {
    id: 'angle_bisector',
    title: 'Angle Bisector',
    desc: 'Splitting an unknown angle perfectly in half without measuring degrees.',
    steps: 4
  },
  {
    id: 'equilateral',
    title: 'Equilateral Triangle',
    desc: 'The simplest construction. Creates a shape with perfect 60° angles and equal sides.',
    steps: 3
  }
];