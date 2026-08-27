export type KnowledgeNodeKind =
  | "root"
  | "domain"
  | "discipline"
  | "branch"
  | "topic"
  | "concept";

export type KnowledgeNodeStatus = "live" | "partial" | "planned";

export type KnowledgeNode = {
  id: string;
  label: string;
  slug?: string;
  kind: KnowledgeNodeKind;
  status?: KnowledgeNodeStatus;
  description?: string;
  children?: KnowledgeNode[];
};

/**
 * Canonical parent-child ontology for Education Station.
 *
 * This deliberately describes knowledge rather than school courses,
 * standards, units, or assessments. It is intended to become the common
 * source for the knowledge map, navigation, breadcrumbs, and expansion
 * planning while existing route structure is migrated gradually.
 */
export const educationStationOntology: KnowledgeNode = {
  id: "education-station",
  label: "Education Station",
  kind: "root",
  status: "live",
  children: [
    {
      id: "formal-science",
      label: "Formal Science",
      slug: "/formal-science",
      kind: "domain",
      status: "live",
      children: [
        {
          id: "computer-science",
          label: "Computer Science",
          slug: "/formal-science/computer-science",
          kind: "discipline",
          status: "live",
        },
        {
          id: "data-science",
          label: "Data Science",
          slug: "/formal-science/data-science",
          kind: "discipline",
          status: "live",
        },
        {
          id: "information-science",
          label: "Information Science",
          slug: "/formal-science/information-science",
          kind: "discipline",
          status: "live",
        },
        {
          id: "logic",
          label: "Logic",
          slug: "/formal-science/logic",
          kind: "discipline",
          status: "live",
        },
        {
          id: "mathematics",
          label: "Mathematics",
          slug: "/formal-science/mathematics",
          kind: "discipline",
          status: "live",
          children: [
            {
              id: "algebra",
              label: "Algebra",
              slug: "/formal-science/mathematics/algebra",
              kind: "branch",
              status: "live",
            },
            {
              id: "applied-mathematics",
              label: "Applied Mathematics",
              slug: "/formal-science/mathematics/applied",
              kind: "branch",
              status: "live",
            },
            {
              id: "calculus",
              label: "Calculus",
              slug: "/formal-science/mathematics/calculus",
              kind: "branch",
              status: "live",
            },
            {
              id: "discrete-mathematics",
              label: "Discrete Mathematics",
              slug: "/formal-science/mathematics/discrete",
              kind: "branch",
              status: "live",
            },
            {
              id: "foundations-of-mathematics",
              label: "Foundations",
              slug: "/formal-science/mathematics/foundations",
              kind: "branch",
              status: "live",
            },
            {
              id: "geometry",
              label: "Geometry",
              slug: "/formal-science/mathematics/geometry",
              kind: "branch",
              status: "live",
            },
            {
              id: "number-theory",
              label: "Number Theory",
              slug: "/formal-science/mathematics/number-theory",
              kind: "branch",
              status: "live",
            },
            {
              id: "statistics",
              label: "Statistics",
              slug: "/formal-science/mathematics/statistics",
              kind: "branch",
              status: "live",
            },
          ],
        },
        {
          id: "systems-science",
          label: "Systems Science",
          slug: "/formal-science/systems-science",
          kind: "discipline",
          status: "live",
        },
      ],
    },
    {
      id: "natural-science",
      label: "Natural Science",
      slug: "/natural-science",
      kind: "domain",
      status: "live",
      children: [
        { id: "astronomy", label: "Astronomy", slug: "/natural-science/astronomy", kind: "discipline", status: "live" },
        { id: "biology", label: "Biology", slug: "/natural-science/biology", kind: "discipline", status: "live" },
        { id: "chemistry", label: "Chemistry", slug: "/natural-science/chemistry", kind: "discipline", status: "live" },
        { id: "earth-science", label: "Earth Science", slug: "/natural-science/earth-science", kind: "discipline", status: "live" },
        { id: "physics", label: "Physics", slug: "/natural-science/physics", kind: "discipline", status: "live" },
      ],
    },
    {
      id: "social-science",
      label: "Social Science",
      slug: "/social-science",
      kind: "domain",
      status: "live",
      children: [
        { id: "anthropology", label: "Anthropology", slug: "/social-science/anthropology", kind: "discipline", status: "live" },
        { id: "communications", label: "Communications", slug: "/social-science/communications", kind: "discipline", status: "live" },
        { id: "economics", label: "Economics", slug: "/social-science/economics", kind: "discipline", status: "live" },
        { id: "geography", label: "Geography", slug: "/social-science/geography", kind: "discipline", status: "live" },
        { id: "law", label: "Law", slug: "/social-science/law", kind: "discipline", status: "live" },
        { id: "linguistics", label: "Linguistics", slug: "/social-science/linguistics", kind: "discipline", status: "live" },
        { id: "political-science", label: "Political Science", slug: "/social-science/political-science", kind: "discipline", status: "live" },
        { id: "psychology", label: "Psychology", slug: "/social-science/psychology", kind: "discipline", status: "live" },
        { id: "sociology", label: "Sociology", slug: "/social-science/sociology", kind: "discipline", status: "live" },
      ],
    },
    {
      id: "humanities",
      label: "Humanities",
      slug: "/humanities",
      kind: "domain",
      status: "live",
      children: [
        { id: "archaeology", label: "Archaeology", slug: "/humanities/archaeology", kind: "discipline", status: "live" },
        { id: "arts-aesthetics", label: "Arts & Aesthetics", slug: "/humanities/arts-aesthetics", kind: "discipline", status: "live" },
        { id: "culinary-arts", label: "Culinary Arts", slug: "/humanities/culinary-arts", kind: "discipline", status: "live" },
        { id: "culture", label: "Culture", slug: "/humanities/culture", kind: "discipline", status: "live" },
        { id: "futurology", label: "Futurology", slug: "/humanities/futurology", kind: "discipline", status: "live" },
        { id: "gaming", label: "Gaming", slug: "/humanities/gaming", kind: "discipline", status: "live" },
        { id: "history", label: "History", slug: "/humanities/history", kind: "discipline", status: "live" },
        { id: "languages", label: "Languages", slug: "/humanities/languages", kind: "discipline", status: "live" },
        { id: "literature", label: "Literature", slug: "/humanities/literature", kind: "discipline", status: "live" },
        { id: "music", label: "Music", slug: "/humanities/music", kind: "discipline", status: "live" },
        { id: "performing-arts", label: "Performing Arts", slug: "/humanities/performing-arts", kind: "discipline", status: "live" },
        { id: "philosophy", label: "Philosophy", slug: "/humanities/philosophy", kind: "discipline", status: "live" },
        { id: "religion", label: "Religion", slug: "/humanities/religion", kind: "discipline", status: "live" },
        { id: "sports", label: "Sports", slug: "/humanities/sports", kind: "discipline", status: "live" },
        { id: "visual-arts", label: "Visual Arts", slug: "/humanities/visual-arts", kind: "discipline", status: "live" },
      ],
    },
    {
      id: "applied-science",
      label: "Applied Science",
      slug: "/applied-science",
      kind: "domain",
      status: "live",
      children: [
        { id: "agriculture", label: "Agriculture", slug: "/applied-science/agriculture", kind: "discipline", status: "live" },
        { id: "architecture", label: "Architecture", slug: "/applied-science/architecture", kind: "discipline", status: "live" },
        { id: "business", label: "Business", slug: "/applied-science/business", kind: "discipline", status: "live" },
        { id: "computer-technology", label: "Computer Technology", slug: "/applied-science/computer-technology", kind: "discipline", status: "live" },
        { id: "education", label: "Education", slug: "/applied-science/education", kind: "discipline", status: "live" },
        { id: "engineering", label: "Engineering", slug: "/applied-science/engineering", kind: "discipline", status: "live" },
        { id: "health", label: "Health", slug: "/applied-science/health", kind: "discipline", status: "live" },
        { id: "industrial-design", label: "Industrial Design", slug: "/applied-science/industrial-design", kind: "discipline", status: "live" },
        { id: "library-science", label: "Library Science", slug: "/applied-science/library-science", kind: "discipline", status: "live" },
        { id: "materials-science", label: "Materials Science", slug: "/applied-science/materials-science", kind: "discipline", status: "live" },
        { id: "medicine", label: "Medicine", slug: "/applied-science/medicine", kind: "discipline", status: "live" },
      ],
    },
    {
      id: "interdisciplines",
      label: "Interdisciplines",
      slug: "/interdisciplines",
      kind: "domain",
      status: "live",
      children: [
        { id: "astrobiology", label: "Astrobiology", slug: "/interdisciplines/astrobiology", kind: "discipline", status: "live" },
        { id: "bioinformatics", label: "Bioinformatics", slug: "/interdisciplines/bioinformatics", kind: "discipline", status: "live" },
        { id: "cognitive-science", label: "Cognitive Science", slug: "/interdisciplines/cognitive-science", kind: "discipline", status: "live" },
        { id: "game-studies", label: "Game Studies", slug: "/interdisciplines/game-studies", kind: "discipline", status: "live" },
        { id: "mechatronics", label: "Mechatronics", slug: "/interdisciplines/mechatronics", kind: "discipline", status: "live" },
        { id: "psychedelics", label: "Psychedelics", slug: "/interdisciplines/psychedelics", kind: "discipline", status: "live" },
      ],
    },
  ],
};

export function flattenKnowledgeTree(root: KnowledgeNode): KnowledgeNode[] {
  return [root, ...(root.children ?? []).flatMap(flattenKnowledgeTree)];
}

export function findKnowledgeNode(id: string): KnowledgeNode | undefined {
  return flattenKnowledgeTree(educationStationOntology).find((node) => node.id === id);
}

export function findKnowledgePath(id: string): KnowledgeNode[] | undefined {
  const walk = (node: KnowledgeNode, path: KnowledgeNode[]): KnowledgeNode[] | undefined => {
    const nextPath = [...path, node];
    if (node.id === id) return nextPath;

    for (const child of node.children ?? []) {
      const result = walk(child, nextPath);
      if (result) return result;
    }

    return undefined;
  };

  return walk(educationStationOntology, []);
}
