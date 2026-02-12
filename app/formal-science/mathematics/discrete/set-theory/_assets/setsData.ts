export const SETS_MEDIA = {
  hero: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1600", // Abstract circles/bubbles
  venn: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?auto=format&fit=crop&q=80&w=1000", // Glassy geometric shapes
};

export const SET_OPERATIONS = [
  {
    id: 'union',
    name: 'Union',
    symbol: 'A ∪ B',
    desc: 'Everything in A OR B (or both). The "Marriage" of sets.',
    logic: (inA: boolean, inB: boolean) => inA || inB
  },
  {
    id: 'intersection',
    name: 'Intersection',
    symbol: 'A ∩ B',
    desc: 'Only things in BOTH A AND B. The "Common Ground".',
    logic: (inA: boolean, inB: boolean) => inA && inB
  },
  {
    id: 'difference',
    name: 'Difference',
    symbol: 'A - B',
    desc: 'Everything in A that is NOT in B. The "Subtraction".',
    logic: (inA: boolean, inB: boolean) => inA && !inB
  },
  {
    id: 'sym_diff',
    name: 'Symmetric Difference',
    symbol: 'A Δ B',
    desc: 'Everything in A or B, but NOT both. The "Exclusion".',
    logic: (inA: boolean, inB: boolean) => inA !== inB
  }
];

export const SET_VOCAB = [
  {
    term: 'Set',
    notation: '{ ... }',
    def: 'A well-defined collection of distinct objects.'
  },
  {
    term: 'Element',
    notation: 'x ∈ A',
    def: 'An object that belongs to a set.'
  },
  {
    term: 'Subset',
    notation: 'A ⊆ B',
    def: 'Set A is a subset of B if every element of A is also in B.'
  },
  {
    term: 'Empty Set',
    notation: '∅ or { }',
    def: 'A set containing no elements. The "zero" of set theory.'
  },
  {
    term: 'Cardinality',
    notation: '|A|',
    def: 'The number of elements contained in a set.'
  },
  {
    term: 'Universal Set',
    notation: 'U',
    def: 'The set containing all objects under consideration.'
  }
];