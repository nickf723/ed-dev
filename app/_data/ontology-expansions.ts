import type { KnowledgeNode } from "./ontology";

/**
 * Verified deeper branches discovered from real studio routes.
 *
 * These are intentionally separate from the currently active top-level
 * ontology while the knowledge-map migration is still additive. Every slug
 * below corresponds to a routed academic page already present on `studio`.
 */
export const verifiedOntologyExpansions: Record<string, KnowledgeNode[]> = {
  "computer-science": [
    {
      id: "algorithms",
      label: "Algorithms",
      slug: "/formal-science/computer-science/algorithms",
      kind: "branch",
      status: "live",
      children: [
        { id: "sorting-algorithms", label: "Sorting", slug: "/formal-science/computer-science/algorithms/sorting", kind: "topic", status: "live" },
      ],
    },
    {
      id: "artificial-intelligence",
      label: "Artificial Intelligence",
      slug: "/formal-science/computer-science/artificial-intelligence",
      kind: "branch",
      status: "live",
      children: [
        { id: "machine-learning", label: "Machine Learning", slug: "/formal-science/computer-science/artificial-intelligence/machine-learning", kind: "topic", status: "live" },
      ],
    },
    {
      id: "computer-hardware",
      label: "Hardware",
      slug: "/formal-science/computer-science/hardware",
      kind: "branch",
      status: "live",
      children: [
        { id: "computer-circuits", label: "Circuits", slug: "/formal-science/computer-science/hardware/circuits", kind: "topic", status: "live" },
      ],
    },
    { id: "security-cryptography", label: "Security & Cryptography", slug: "/formal-science/computer-science/security-cryptography", kind: "branch", status: "live" },
    { id: "software", label: "Software", slug: "/formal-science/computer-science/software", kind: "branch", status: "live" },
    { id: "computer-science-theory", label: "Theory", slug: "/formal-science/computer-science/theory", kind: "branch", status: "live" },
  ],

  algebra: [
    {
      id: "abstract-algebra",
      label: "Abstract Algebra",
      slug: "/formal-science/mathematics/algebra/abstract-algebra",
      kind: "branch",
      status: "live",
      children: [
        { id: "field-theory", label: "Field Theory", slug: "/formal-science/mathematics/algebra/abstract-algebra/field-theory", kind: "topic", status: "live" },
        {
          id: "group-theory",
          label: "Group Theory",
          slug: "/formal-science/mathematics/algebra/abstract-algebra/group-theory",
          kind: "topic",
          status: "live",
          children: [
            { id: "finite-groups", label: "Finite Groups", slug: "/formal-science/mathematics/algebra/abstract-algebra/group-theory/finite-groups", kind: "concept", status: "live" },
          ],
        },
        { id: "homomorphisms", label: "Maps & Homomorphisms", slug: "/formal-science/mathematics/algebra/abstract-algebra/maps", kind: "topic", status: "live" },
      ],
    },
    {
      id: "elementary-algebra",
      label: "Elementary Algebra",
      slug: "/formal-science/mathematics/algebra/elementary-algebra",
      kind: "branch",
      status: "live",
      children: [
        { id: "complex-numbers", label: "Complex Numbers", slug: "/formal-science/mathematics/algebra/elementary-algebra/complex", kind: "topic", status: "live" },
        { id: "exponents", label: "Exponents", slug: "/formal-science/mathematics/algebra/elementary-algebra/exponents", kind: "topic", status: "live" },
        {
          id: "factoring",
          label: "Factoring",
          slug: "/formal-science/mathematics/algebra/elementary-algebra/factoring",
          kind: "topic",
          status: "live",
          children: [
            { id: "difference-of-perfect-squares", label: "Difference of Perfect Squares", slug: "/formal-science/mathematics/algebra/elementary-algebra/factoring/dops", kind: "concept", status: "live" },
            { id: "greatest-common-factor", label: "Greatest Common Factor", slug: "/formal-science/mathematics/algebra/elementary-algebra/factoring/gcf", kind: "concept", status: "live" },
            { id: "simple-trinomials", label: "Simple Trinomials", slug: "/formal-science/mathematics/algebra/elementary-algebra/factoring/trinomial_simple", kind: "concept", status: "live" },
          ],
        },
        { id: "functions", label: "Functions", slug: "/formal-science/mathematics/algebra/elementary-algebra/functions", kind: "topic", status: "live" },
        { id: "algebra-fundamentals", label: "Fundamentals", slug: "/formal-science/mathematics/algebra/elementary-algebra/fundamentals", kind: "topic", status: "live" },
        { id: "inequalities", label: "Inequalities", slug: "/formal-science/mathematics/algebra/elementary-algebra/inequalities", kind: "topic", status: "live" },
        { id: "linear-equations", label: "Linear Equations", slug: "/formal-science/mathematics/algebra/elementary-algebra/linear-equations", kind: "topic", status: "live" },
        { id: "quadratic-equations", label: "Quadratic Equations", slug: "/formal-science/mathematics/algebra/elementary-algebra/quadratic-equations", kind: "topic", status: "live" },
        { id: "radical-expressions", label: "Radical Expressions", slug: "/formal-science/mathematics/algebra/elementary-algebra/radical-expressions", kind: "topic", status: "live" },
        { id: "rational-expressions", label: "Rational Expressions", slug: "/formal-science/mathematics/algebra/elementary-algebra/rational-expressions", kind: "topic", status: "live" },
        { id: "systems-of-equations", label: "Systems of Equations", slug: "/formal-science/mathematics/algebra/elementary-algebra/systems-of-equations", kind: "topic", status: "live" },
      ],
    },
  ],

  biology: [
    { id: "anatomy", label: "Anatomy", slug: "/natural-science/biology/anatomy", kind: "branch", status: "live" },
    { id: "botany", label: "Botany", slug: "/natural-science/biology/botany", kind: "branch", status: "live" },
    { id: "cytology", label: "Cytology", slug: "/natural-science/biology/cytology", kind: "branch", status: "live" },
    { id: "microbiology", label: "Microbiology", slug: "/natural-science/biology/microbiology", kind: "branch", status: "live" },
    { id: "mycology", label: "Mycology", slug: "/natural-science/biology/mycology", kind: "branch", status: "live" },
    {
      id: "zoology",
      label: "Zoology",
      slug: "/natural-science/biology/zoology",
      kind: "branch",
      status: "live",
      children: [
        { id: "comparative-zoology", label: "Comparative Zoology", slug: "/natural-science/biology/zoology/comparative", kind: "topic", status: "live" },
        { id: "animal-diversity", label: "Animal Diversity", slug: "/natural-science/biology/zoology/diversity", kind: "topic", status: "live" },
        { id: "ethology", label: "Ethology", slug: "/natural-science/biology/zoology/ethology", kind: "topic", status: "live" },
        { id: "paleozoology", label: "Paleozoology", slug: "/natural-science/biology/zoology/paleozoology", kind: "topic", status: "live" },
      ],
    },
  ],

  physics: [
    { id: "atomic-physics", label: "Atomic Physics", slug: "/natural-science/physics/atomic", kind: "branch", status: "live" },
    { id: "classical-mechanics", label: "Classical Mechanics", slug: "/natural-science/physics/classical-mechanics", kind: "branch", status: "live" },
    { id: "electromagnetism", label: "Electromagnetism", slug: "/natural-science/physics/electromagnetism", kind: "branch", status: "live" },
    { id: "mechanics", label: "Mechanics", slug: "/natural-science/physics/mechanics", kind: "branch", status: "live" },
    { id: "motion", label: "Motion", slug: "/natural-science/physics/motion", kind: "branch", status: "live" },
    { id: "nuclear-physics", label: "Nuclear Physics", slug: "/natural-science/physics/nuclear", kind: "branch", status: "live" },
  ],

  history: [
    {
      id: "chronology",
      label: "Chronology",
      slug: "/humanities/history/chronology",
      kind: "branch",
      status: "live",
      children: [
        { id: "prehistory", label: "Prehistory", slug: "/humanities/history/chronology/prehistory", kind: "topic", status: "live" },
        { id: "antiquity", label: "Antiquity", slug: "/humanities/history/chronology/antiquity", kind: "topic", status: "live" },
        { id: "medieval-history", label: "Medieval", slug: "/humanities/history/chronology/medieval", kind: "topic", status: "live" },
        { id: "early-modern-history", label: "Early Modern", slug: "/humanities/history/chronology/early-modern", kind: "topic", status: "live" },
        { id: "modern-history", label: "Modern", slug: "/humanities/history/chronology/modern", kind: "topic", status: "live" },
      ],
    },
    {
      id: "regional-history",
      label: "Regional History",
      slug: "/humanities/history/regional",
      kind: "branch",
      status: "live",
      children: [
        {
          id: "history-americas",
          label: "Americas",
          slug: "/humanities/history/regional/americas",
          kind: "topic",
          status: "live",
          children: [
            { id: "north-american-history", label: "North America", slug: "/humanities/history/regional/americas/north-america", kind: "concept", status: "live" },
            { id: "united-states-history", label: "United States", slug: "/humanities/history/regional/americas/usa", kind: "concept", status: "live" },
          ],
        },
      ],
    },
    { id: "thematic-history", label: "Thematic History", slug: "/humanities/history/theme", kind: "branch", status: "live" },
  ],
};

export function expansionFor(nodeId: string): KnowledgeNode[] {
  return verifiedOntologyExpansions[nodeId] ?? [];
}
