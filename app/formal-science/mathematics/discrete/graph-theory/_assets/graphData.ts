export const GRAPH_MEDIA = {
  hero: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&q=80&w=1600", // Server/Network
  konigsberg: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Konigsberg_bridges.png", // Historic Seven Bridges
};

export const GRAPH_VOCAB = [
  {
    term: 'Vertex (Node)',
    def: 'The fundamental unit of a graph. Represents an object (Person, City, Router).',
    meta: 'V'
  },
  {
    term: 'Edge (Link)',
    def: 'A connection between two vertices. Can be directed (one-way) or undirected (two-way).',
    meta: 'E'
  },
  {
    term: 'Degree',
    def: 'The number of edges connected to a vertex.',
    meta: 'deg(v)'
  },
  {
    term: 'Path',
    def: 'A sequence of edges that connects a sequence of vertices.',
    meta: 'P'
  },
  {
    term: 'Cycle',
    def: 'A path that starts and ends at the same vertex.',
    meta: 'C'
  },
  {
    term: 'Adjacency Matrix',
    def: 'A square matrix used to represent a finite graph. The elements indicate whether pairs of vertices are adjacent.',
    meta: 'A[i][j]'
  }
];

export const FAMOUS_GRAPHS = [
  { id: 'euler', title: 'Eulerian Path', desc: 'A trail that visits every edge exactly once. (The Seven Bridges Problem).' },
  { id: 'hamilton', title: 'Hamiltonian Path', desc: 'A path that visits every vertex exactly once. (The Traveling Salesman).' },
  { id: 'tree', title: 'Tree', desc: 'A connected graph with no cycles. The structure of file systems and HTML DOM.' },
];