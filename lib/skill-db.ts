// lib/skill-db.ts

export type SkillStatus = "locked" | "available" | "mastered";

export type SkillNode = {
  id: string;
  title: string;
  category: "Formal" | "Natural" | "Social" | "Applied";
  x: number; // Grid Position X (0-100)
  y: number; // Grid Position Y (0-100)
  parents: string[]; // IDs of prerequisites
  status: SkillStatus; // In a real app, this comes from the User DB
};

export const SKILL_TREE: SkillNode[] = [
  // --- ROOTS (Tier 1) ---
  { id: "logic", title: "Logic", category: "Formal", x: 50, y: 90, parents: [], status: "mastered" },
  
  // --- TIER 2 ---
  { id: "math", title: "Mathematics", category: "Formal", x: 35, y: 75, parents: ["logic"], status: "mastered" },
  { id: "philo", title: "Philosophy", category: "Social", x: 65, y: 75, parents: ["logic"], status: "mastered" },

  // --- TIER 3 ---
  { id: "physics", title: "Physics", category: "Natural", x: 25, y: 60, parents: ["math"], status: "mastered" },
  { id: "comp-sci", title: "Comp Sci", category: "Formal", x: 45, y: 60, parents: ["math", "logic"], status: "available" },
  { id: "poli-sci", title: "Poli Sci", category: "Social", x: 75, y: 60, parents: ["philo"], status: "available" },

  // --- TIER 4 ---
  { id: "chem", title: "Chemistry", category: "Natural", x: 20, y: 45, parents: ["physics"], status: "locked" },
  { id: "eng", title: "Engineering", category: "Applied", x: 35, y: 45, parents: ["physics", "math"], status: "locked" },
  { id: "econ", title: "Economics", category: "Social", x: 60, y: 45, parents: ["math", "poli-sci"], status: "locked" },

  // --- TIER 5 ---
  { id: "bio", title: "Biology", category: "Natural", x: 20, y: 30, parents: ["chem"], status: "locked" },
  { id: "ai", title: "AI / ML", category: "Applied", x: 45, y: 30, parents: ["comp-sci", "math"], status: "locked" },

  // --- APEX (Tier 6) ---
  { id: "neuro", title: "Neuroscience", category: "Natural", x: 30, y: 15, parents: ["bio", "ai"], status: "locked" },
  { id: "complex", title: "Complexity", category: "Formal", x: 50, y: 10, parents: ["ai", "econ", "bio"], status: "locked" },
];