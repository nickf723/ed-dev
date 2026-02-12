export const ANGLES_MEDIA = {
  hero: "https://images.unsplash.com/photo-1550684848-86a5d8727436?auto=format&fit=crop&q=80&w=1600", // Abstract Crossing Lines
  architecture: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=1000", // Modern Building Angles
};

export const ANGLE_VOCAB = [
  {
    term: 'Vertical Angles',
    def: 'Two non-adjacent angles formed by two intersecting lines. They share a vertex but no sides.',
    rule: 'They are always congruent (equal).'
  },
  {
    term: 'Linear Pair',
    def: 'Two adjacent angles formed by intersecting lines. They form a straight line.',
    rule: 'They are supplementary (add to 180°).'
  },
  {
    term: 'Transversal',
    def: 'A line that intersects two or more coplanar lines at distinct points.',
    rule: 'Creates 8 distinct angles.'
  },
  {
    term: 'Alternate Interior',
    def: 'A pair of angles on opposite sides of the transversal and between the other two lines.',
    rule: 'If lines are parallel, these are equal.'
  }
];

export const THEOREMS = [
  { id: 'VAT', name: 'Vertical Angles Thm', text: 'Vertical angles are always congruent.' },
  { id: 'LPP', name: 'Linear Pair Postulate', text: 'If two angles form a linear pair, then they are supplementary.' },
  { id: 'AIA', name: 'Alt. Interior Angles Thm', text: 'If parallel lines are cut by a transversal, then alternate interior angles are congruent.' },
];