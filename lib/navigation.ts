import { BookOpen, Theater } from "lucide-react";
import { DOMAIN_BY_ID, type DomainId } from "@/lib/domains";

function domainNavItem(id: DomainId, children: any[]) {
  const domain = DOMAIN_BY_ID[id];
  return {
    label: domain.navLabel,
    href: domain.href,
    icon: domain.icon,
    domain: domain.id,
    children,
  };
}

export const NAVIGATION_DATA = [
  {
    title: "Knowledge Graph",
    items: [
      domainNavItem("formal", [
        {
          label: "Mathematics",
          href: "/formal-science/mathematics",
          children: [
            {
              label: "Foundations",
              href: "/formal-science/mathematics/foundations",
              children: [
                { label: "Arithmetic", href: "/formal-science/mathematics/foundations/arithmetic" },
                { label: "Geometry", href: "/formal-science/mathematics/foundations/geometry" },
                { label: "Grouping & Sets", href: "/formal-science/mathematics/foundations/grouping" },
              ],
            },
            {
              label: "Calculus",
              href: "/formal-science/mathematics/calculus",
              children: [
                {
                  label: "Differential Equations",
                  href: "/formal-science/mathematics/calculus/differential-equations",
                },
                {
                  label: "Multivariate",
                  href: "/formal-science/mathematics/calculus/multivariate",
                  children: [
                    {
                      label: "Vector Calculus",
                      href: "/formal-science/mathematics/calculus/multivariate/vector-calculus",
                    },
                    {
                      label: "Multiple Integrals",
                      href: "/formal-science/mathematics/calculus/multivariate/multiple-integrals",
                    },
                  ],
                },
              ],
            },
            {
              label: "Abstract Algebra",
              href: "/formal-science/mathematics/algebra/abstract-algebra",
              children: [
                {
                  label: "Field Theory",
                  href: "/formal-science/mathematics/algebra/abstract-algebra/field-theory",
                },
              ],
            },
          ],
        },
        { label: "Logic", href: "/formal-science/logic" },
        {
          label: "Computer Science",
          href: "/formal-science/computer-science",
          children: [
            {
              label: "Algorithms",
              href: "/formal-science/computer-science/algorithms",
              children: [
                { label: "Sorting", href: "/formal-science/computer-science/algorithms/sorting" },
                { label: "Search", href: "/formal-science/computer-science/algorithms/search" },
                {
                  label: "Graph Theory",
                  href: "/formal-science/computer-science/algorithms/graphs",
                },
              ],
            },
            {
              label: "Software Engineering",
              href: "/formal-science/computer-science/software-engineering",
            },
            {
              label: "Game Development",
              href: "/formal-science/computer-science/game-development",
            },
          ],
        },
        { label: "Systems Science", href: "/formal-science/systems-science" },
        {
          label: "Data Science",
          href: "/formal-science/data-science",
          children: [
            { label: "Machine Learning", href: "/formal-science/data-science/machine-learning" },
            { label: "Neural Networks", href: "/formal-science/data-science/neural-networks" },
          ],
        },
        { label: "Information Science", href: "/formal-science/information-science" },
      ]),
      domainNavItem("natural", [
        {
          label: "Physics",
          href: "/natural-science/physics",
          children: [
            { label: "Classical Mechanics", href: "/natural-science/physics/classical-mechanics" },
            { label: "Quantum Mechanics", href: "/natural-science/physics/quantum-mechanics" },
            {
              label: "Theoretical Cosmology",
              href: "/natural-science/physics/theoretical-cosmology",
            },
          ],
        },
        {
          label: "Chemistry",
          href: "/natural-science/chemistry",
          children: [
            { label: "Quantum Chemistry", href: "/natural-science/chemistry/quantum" },
            { label: "Organic Chemistry", href: "/natural-science/chemistry/organic" },
          ],
        },
        { label: "Biology", href: "/natural-science/biology" },
        { label: "Earth Science", href: "/natural-science/earth-science" },
        {
          label: "Astronomy",
          href: "/natural-science/astronomy",
          children: [
            {
              label: "Planetary Astronomy",
              href: "/natural-science/astronomy/planetary-astronomy",
            },
            {
              label: "Stellar Astrophysics",
              href: "/natural-science/astronomy/stellar-astrophysics",
            },
          ],
        },
      ]),
      domainNavItem("social", [
        { label: "Psychology", href: "/social-science/psychology" },
        { label: "Economics", href: "/social-science/economics" },
        { label: "Sociology", href: "/social-science/sociology" },
        { label: "Political Science", href: "/social-science/political-science" },
        { label: "Anthropology", href: "/social-science/anthropology" },
        {
          label: "Linguistics",
          href: "/social-science/linguistics",
          children: [
            { label: "Phonology", href: "/social-science/linguistics/phonology" },
            { label: "Syntax & Grammar", href: "/social-science/linguistics/syntax" },
          ],
        },
      ]),
      domainNavItem("applied", [
        { label: "Engineering", href: "/applied-science/engineering" },
        {
          label: "Technology",
          href: "/applied-science/technology",
          children: [
            { label: "Web Development", href: "/applied-science/technology/web-development" },
            {
              label: "Embedded Systems",
              href: "/applied-science/technology/embedded-systems",
            },
            {
              label: "Telecommunications",
              href: "/applied-science/technology/telecommunications",
            },
          ],
        },
        { label: "Industrial Design", href: "/applied-science/industrial-design" },
        { label: "Medicine", href: "/applied-science/medicine" },
        { label: "Architecture", href: "/applied-science/architecture" },
      ]),
      domainNavItem("humanities", [
        { label: "Philosophy", href: "/humanities/philosophy" },
        {
          label: "Religion",
          href: "/humanities/religion",
          children: [
            {
              label: "Mythology",
              href: "/humanities/religion/mythology",
              children: [
                { label: "Hellenic Pantheon", href: "/humanities/religion/mythology/greek" },
                { label: "Nordic Pantheon", href: "/humanities/religion/mythology/norse" },
                { label: "Kemetic Pantheon", href: "/humanities/religion/mythology/egyptian" },
              ],
            },
            { label: "Theology", href: "/humanities/religion/theology" },
          ],
        },
        { label: "History", href: "/humanities/history" },
        { label: "Futurology", href: "/humanities/futurology" },
        {
          label: "Languages",
          href: "/humanities/languages",
          children: [
            { label: "Translation Engines", href: "/humanities/languages/translation" },
            { label: "Etymology", href: "/humanities/languages/etymology" },
          ],
        },
        { label: "Literature", href: "/humanities/literature" },
        { label: "Visual Arts", href: "/humanities/visual-arts" },
        {
          label: "Music",
          href: "/humanities/music",
          children: [
            { label: "Theory & Composition", href: "/humanities/music/theory" },
            { label: "Acoustics", href: "/humanities/music/acoustics" },
          ],
        },
        { label: "Performing Arts", href: "/humanities/performing-arts" },
        {
          label: "Gaming",
          href: "/humanities/gaming",
          children: [
            { label: "Digital Mechanics", href: "/humanities/gaming/digital" },
            { label: "Tabletop & Rule Systems", href: "/humanities/gaming/tabletop" },
          ],
        },
        { label: "Culinary Arts", href: "/humanities/culinary-arts" },
        { label: "Sports", href: "/humanities/sports" },
        { label: "Culture", href: "/humanities/culture" },
      ]),
      domainNavItem("inter", [
        { label: "Cognitive Science", href: "/interdisciplines/cognitive-science" },
        { label: "Bioinformatics", href: "/interdisciplines/bioinformatics" },
        { label: "Mechatronics", href: "/interdisciplines/mechatronics" },
      ]),
    ],
  },
  {
    title: "Meta",
    items: [
      { label: "Glossary", href: "/glossary", icon: BookOpen, domain: "meta" },
      { label: "Stage", href: "/stage", icon: Theater, domain: "meta" },
    ],
  },
];
