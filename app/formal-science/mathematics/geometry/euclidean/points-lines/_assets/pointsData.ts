export const POINTS_MEDIA = {
  hero: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600", // Network connections / Points and Lines
  dimension: "https://images.unsplash.com/photo-1506318137071-a8bcbf6755dd?auto=format&fit=crop&q=80&w=1000", // Abstract Lines
};

export const POINTS_VOCAB = [
  {
    term: 'Point',
    dim: '0D',
    def: 'A location in space. It has no size, no width, no depth. It is represented by a dot.',
    notation: 'Point A'
  },
  {
    term: 'Line',
    dim: '1D',
    def: 'A straight path that extends infinitely in two directions. It has length, but no width.',
    notation: 'Line AB or ↔AB'
  },
  {
    term: 'Plane',
    dim: '2D',
    def: 'A flat surface that extends infinitely in all directions. It has length and width, but no depth.',
    notation: 'Plane M'
  },
  {
    term: 'Collinear',
    dim: 'N/A',
    def: 'Points that lie on the same line.',
    notation: 'A, B, C are collinear'
  },
  {
    term: 'Line Segment',
    dim: '1D',
    def: 'A part of a line bounded by two endpoints. It has a measurable length.',
    notation: 'Segment AB or ̅AB' // Use overline symbol if possible, or describe
  },
  {
    term: 'Ray',
    dim: '1D',
    def: 'A part of a line that starts at an endpoint and extends infinitely in one direction.',
    notation: 'Ray AB or →AB'
  }
];

export const AXIOMS = [
  { id: 1, text: "Through any two points, there is exactly one line." },
  { id: 2, text: "If two lines intersect, then they intersect in exactly one point." },
  { id: 3, text: "If two planes intersect, then they intersect in exactly one line." },
];