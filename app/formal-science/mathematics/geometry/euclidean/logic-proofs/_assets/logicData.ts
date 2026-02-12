export const LOGIC_MEDIA = {
  hero: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600", // Abstract Circuit / Chip
  flowchart: "https://images.unsplash.com/photo-1544256718-3bcf237f38b2?auto=format&fit=crop&q=80&w=1000", // Process Map
  boole: "https://images.unsplash.com/photo-1509228627129-669005e74585?auto=format&fit=crop&q=80&w=1000", // Abstract Math / Nodes
};

export const LOGIC_VOCAB = [
  {
    term: 'Inductive Reasoning',
    def: 'Making a generalization based on observed patterns or examples. (e.g., "The sun rose every day before, so it will rise tomorrow.")',
    type: 'Pattern'
  },
  {
    term: 'Deductive Reasoning',
    def: 'Using facts, rules, definitions, or properties to reach a logical conclusion. (e.g., "All men are mortal. Socrates is a man. Therefore, Socrates is mortal.")',
    type: 'Law'
  },
  {
    term: 'Conditional Statement',
    def: 'A logical statement written in "If-Then" form. Symbolized as p → q.',
    type: 'Structure'
  },
  {
    term: 'Contrapositive',
    def: 'Negating and switching the hypothesis and conclusion (~q → ~p). It is always logically equivalent to the original statement.',
    type: 'Transformation'
  }
];

export const LAWS_OF_LOGIC = [
  {
    name: "Law of Detachment",
    desc: "If p → q is true and p is true, then q is true.",
    symbol: "[(p → q) ∧ p] → q"
  },
  {
    name: "Law of Syllogism",
    desc: "If p → q and q → r are true, then p → r is true.",
    symbol: "[(p → q) ∧ (q → r)] → (p → r)"
  }
];