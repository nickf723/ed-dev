export const termCategories = {
  GENERAL: "General",
  MATH: "Math Foundations",
  NUMBER_SYSTEMS: "Number Systems",
  ALGEBRA: "Algebra",
  CALCULUS: "Calculus",
  PHYSICS: "Physics",
  CHEMISTRY: "Chemistry",
  BIOLOGY: "Biology",
  SOCIAL_SCIENCE: "Social Science",
  APPLIED_SCIENCE: "Applied Science",
  COMPUTER_SCIENCE: "Computer Science",
  LOGIC: "Logic",
  ARTS: "Arts & Aesthetics",
  ENGINEERING: "Engineering",
  TECHNOLOGY: "Technology",
  AGRICULTURE: "Agriculture",
  MEDICINE: "Medicine",
  HISTORY: "History",
  LITERATURE: "Literature",
  PHILOSOPHY: "Philosophy",
};

export interface GlossaryItem {
  definition: string;
  category: string;
  href?: string; // Optional link to the lesson page
  tags?: string[];
}

export type GlossaryDatabase = Record<string, GlossaryItem>;