export const TRIANGLE_MEDIA = {
  hero: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1600", // Bridge truss structure
  truss: "https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&q=80&w=1000", // Construction beams
};

export const CONGRUENCE_POSTULATES = [
  { id: 'SSS', name: 'Side-Side-Side', desc: 'If 3 sides of one triangle are congruent to 3 sides of another, the triangles are congruent.' },
  { id: 'SAS', name: 'Side-Angle-Side', desc: 'If 2 sides and the included angle are congruent, the triangles are congruent.' },
  { id: 'ASA', name: 'Angle-Side-Angle', desc: 'If 2 angles and the included side are congruent, the triangles are congruent.' },
  { id: 'AAS', name: 'Angle-Angle-Side', desc: 'If 2 angles and a non-included side are congruent, the triangles are congruent.' },
  { id: 'HL', name: 'Hypotenuse-Leg', desc: 'If the hypotenuse and a leg of a right triangle are congruent, the triangles are congruent.' }
];

export const PROOF_VOCAB = [
  { term: 'CPCTC', def: 'Corresponding Parts of Congruent Triangles are Congruent. (Used AFTER proving congruence).' },
  { term: 'Reflexive Property', def: 'A quantity is equal to itself. (Used when triangles share a common side).' },
  { term: 'Vertical Angles', def: 'Angles opposite each other at an intersection. They are always equal.' },
  { term: 'Midpoint', def: 'A point that divides a segment into two congruent segments.' },
  { term: 'Bisector', def: 'A line or ray that divides an angle or segment into two equal parts.' }
];