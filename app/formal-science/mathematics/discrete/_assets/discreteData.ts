export const DISCRETE_MEDIA = {
  hero: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&q=80&w=1600", // Server rack / Network nodes
  graph: "https://images.unsplash.com/photo-1509228627129-669005e74585?auto=format&fit=crop&q=80&w=1000", // Connected dots
  sets: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1000", // Venn Diagram abstract
};

export const DISCRETE_TOPICS = [
  {
    id: 'sets',
    title: 'Set Theory',
    desc: 'The study of collections of objects. The foundation of all mathematical structure.',
    icon: 'Layers',
    link: 'discrete/set-theory'
  },
  {
    id: 'graph',
    title: 'Graph Theory',
    desc: 'The study of nodes and edges. Modeling networks, social media, and pathfinding.',
    icon: 'Share2',
    link: 'discrete/graph-theory'
  },
  {
    id: 'combinatorics',
    title: 'Combinatorics',
    desc: 'The art of counting. Permutations, combinations, and the Pigeonhole Principle.',
    icon: 'Hash',
    link: 'discrete/combinatorics'
  },
  {
    id: 'recursion',
    title: 'Recursion Theory',
    desc: 'The study of self-referential definitions and step-by-step procedures.',
    icon: 'Repeat',
    link: 'discrete/recursion-theory'
  }
];

export const DISCRETE_VOCAB = [
  {
    term: 'Set',
    def: 'A collection of distinct objects, considered as an object in its own right.',
    notation: '{1, 2, 3}'
  },
  {
    term: 'Vertex (Node)',
    def: 'The fundamental unit of which graphs are formed.',
    notation: 'V'
  },
  {
    term: 'Edge',
    def: 'A connection between two vertices in a graph.',
    notation: 'E'
  },
  {
    term: 'Algorithm',
    def: 'A finite sequence of well-defined instructions to solve a class of problems.',
    notation: 'f(x)'
  }
];