// lib/curriculum-db.ts

export type SkillNode = {
  id: string;
  title: string;
  category: "Formal" | "Natural" | "Social" | "Applied" | "Humanities";
  href: string;     // The actual page URL
  parents: string[]; // IDs of required skills
  desc?: string;
};

export const CURRICULUM_GRAPH: Record<string, SkillNode> = {
  // --- TIER 1: FOUNDATIONS ---
  "arithmetic": {
    id: "arithmetic",
    title: "Arithmetic",
    category: "Formal",
    href: "/formal-science/mathematics/number-theory/arithmetic",
    parents: [],
    desc: "Basic operations: +, -, *, /."
  },
  
  // --- TIER 2: PRE-ALGEBRA ---
  "variables": {
    id: "variables",
    title: "Variables",
    category: "Formal",
    href: "/formal-science/mathematics/algebra/pre-algebra/variables-expressions",
    parents: ["arithmetic"],
    desc: "Symbols representing unknown numbers."
  },
  "cartesian-coords": {
    id: "cartesian-coords",
    title: "Cartesian Plane",
    category: "Formal",
    href: "/formal-science/mathematics/geometry/cartesian-plane",
    parents: ["arithmetic"],
    desc: "Mapping points on an X-Y grid."
  },

  // --- TIER 3: ALGEBRA (The Atomic Skill) ---
  "slope-intercept": {
    id: "slope-intercept",
    title: "Slope-Intercept Form",
    category: "Formal",
    href: "/formal-science/mathematics/algebra/linear-equations/slope-intercept",
    parents: ["variables", "cartesian-coords"],
    desc: "The equation y = mx + b."
  },

  // --- TIER 4: UNLOCKED SKILLS ---
  "linear-graphing": {
    id: "linear-graphing",
    title: "Graphing Lines",
    category: "Formal",
    href: "/formal-science/mathematics/algebra/linear-equations/graphing",
    parents: ["slope-intercept"],
    desc: "Visualizing linear equations."
  },
  "linear-inequalities": {
    id: "linear-inequalities",
    title: "Linear Inequalities",
    category: "Formal",
    href: "/formal-science/mathematics/algebra/linear-equations/inequalities",
    parents: ["slope-intercept"],
    desc: "Regions defined by lines (y > mx + b)."
  },
  "physics-kinematics": {
    id: "physics-kinematics",
    title: "Kinematics 101",
    category: "Natural",
    href: "/natural-science/physics/classical-mechanics/kinematics",
    parents: ["slope-intercept"], // Physics depends on Math!
    desc: "Modeling motion using linear equations."
  }
};

// Helper to get the "Local Neighborhood" of a node
export function getNeighborhood(nodeId: string) {
  const node = CURRICULUM_GRAPH[nodeId];
  if (!node) return null;

  const parents = node.parents.map(id => CURRICULUM_GRAPH[id]).filter(Boolean);
  
  // Find children (nodes that list THIS node as a parent)
  const children = Object.values(CURRICULUM_GRAPH).filter(n => 
    n.parents.includes(nodeId)
  );

  return { node, parents, children };
}