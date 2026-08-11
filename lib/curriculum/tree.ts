import type { DomainId } from "@/lib/domains";
import type { CurriculumDomain, CurriculumNode } from "@/lib/curriculum/types";

function node(
  id: string,
  label: string,
  href: string,
  domainId: DomainId,
  children?: readonly CurriculumNode[],
): CurriculumNode {
  return { id, label, href, domainId, children };
}

function describe(value: CurriculumNode, description: string): CurriculumNode {
  return { ...value, description };
}

export const CURRICULUM_DOMAINS = [
  {
    domainId: "formal",
    children: [
      node("formal.mathematics", "Mathematics", "/formal-science/mathematics", "formal", [
        describe(
          node("formal.mathematics.foundations", "Foundations", "/formal-science/mathematics/foundations", "formal", [
            describe(
              node("formal.mathematics.foundations.arithmetic", "Arithmetic", "/formal-science/mathematics/foundations/arithmetic", "formal"),
              "The absolute core: Addition, Subtraction, Multiplication, and Division.",
            ),
            describe(
              node("formal.mathematics.foundations.fractions", "Fractions & Ratios", "/formal-science/mathematics/foundations/fractions", "formal"),
              "Parts of a whole. Decimals, percentages, and proportional reasoning.",
            ),
            describe(
              node("formal.mathematics.foundations.inequalities", "Magnitude", "/formal-science/mathematics/foundations/inequalities", "formal"),
              "Evaluating relative size. Greater than, less than, and the number line.",
            ),
            describe(
              node("formal.mathematics.foundations.geometry", "Basic Geometry", "/formal-science/mathematics/foundations/geometry", "formal"),
              "Recognizing fundamental shapes: Circles, polygons, angles, and symmetry.",
            ),
            describe(
              node("formal.mathematics.foundations.measurement", "Measurement", "/formal-science/mathematics/foundations/measurement", "formal"),
              "Units, telling time, and mapping the Cartesian coordinate plane.",
            ),
            describe(
              node("formal.mathematics.foundations.grouping", "Sets & Grouping", "/formal-science/mathematics/foundations/grouping", "formal"),
              "The precursor to Set Theory. Organizing objects by shared properties.",
            ),
            describe(
              node("formal.mathematics.foundations.statistics", "Data Analysis", "/formal-science/mathematics/foundations/statistics", "formal"),
              "Collecting and charting data to make informed predictions about the world.",
            ),
          ]),
          "Arithmetic, pre-algebra, and numerical reasoning.",
        ),
        describe(
          node("formal.mathematics.algebra", "Algebra", "/formal-science/mathematics/algebra", "formal", [
            node("formal.mathematics.algebra.abstract-algebra", "Abstract Algebra", "/formal-science/mathematics/algebra/abstract-algebra", "formal", [
              node("formal.mathematics.algebra.abstract-algebra.field-theory", "Field Theory", "/formal-science/mathematics/algebra/abstract-algebra/field-theory", "formal"),
            ]),
          ]),
          "The rules for manipulating mathematical symbols.",
        ),
        describe(
          node("formal.mathematics.geometry", "Geometry", "/formal-science/mathematics/geometry", "formal"),
          "Properties of distance, shape, size, and position.",
        ),
        describe(
          node("formal.mathematics.calculus", "Calculus", "/formal-science/mathematics/calculus", "formal", [
            node("formal.mathematics.calculus.differential-equations", "Differential Equations", "/formal-science/mathematics/calculus/differential-equations", "formal"),
            node("formal.mathematics.calculus.multivariate", "Multivariate", "/formal-science/mathematics/calculus/multivariate", "formal", [
              node("formal.mathematics.calculus.multivariate.vector-calculus", "Vector Calculus", "/formal-science/mathematics/calculus/multivariate/vector-calculus", "formal"),
              node("formal.mathematics.calculus.multivariate.multiple-integrals", "Multiple Integrals", "/formal-science/mathematics/calculus/multivariate/multiple-integrals", "formal"),
            ]),
          ]),
          "The mathematical study of motion and accumulation.",
        ),
        describe(
          node("formal.mathematics.statistics", "Statistics", "/formal-science/mathematics/statistics", "formal"),
          "Analysis, interpretation, and presentation of data.",
        ),
        describe(
          node("formal.mathematics.number-theory", "Number Theory", "/formal-science/mathematics/number-theory", "formal"),
          "The properties of integers and arithmetic structures.",
        ),
        describe(
          node("formal.mathematics.discrete", "Discrete Math", "/formal-science/mathematics/discrete", "formal"),
          "Structures that are fundamentally discrete.",
        ),
        describe(
          node("formal.mathematics.applied", "Applied Math", "/formal-science/mathematics/applied", "formal"),
          "Methods used in practical applications across science.",
        ),
      ]),
      node("formal.logic", "Logic", "/formal-science/logic", "formal"),
      node("formal.computer-science", "Computer Science", "/formal-science/computer-science", "formal", [
        node("formal.computer-science.algorithms", "Algorithms", "/formal-science/computer-science/algorithms", "formal", [
          node("formal.computer-science.algorithms.sorting", "Sorting", "/formal-science/computer-science/algorithms/sorting", "formal"),
          node("formal.computer-science.algorithms.search", "Search", "/formal-science/computer-science/algorithms/search", "formal"),
          node("formal.computer-science.algorithms.graphs", "Graph Theory", "/formal-science/computer-science/algorithms/graphs", "formal"),
        ]),
        node("formal.computer-science.software-engineering", "Software Engineering", "/formal-science/computer-science/software-engineering", "formal"),
        node("formal.computer-science.game-development", "Game Development", "/formal-science/computer-science/game-development", "formal"),
      ]),
      node("formal.systems-science", "Systems Science", "/formal-science/systems-science", "formal"),
      node("formal.data-science", "Data Science", "/formal-science/data-science", "formal", [
        node("formal.data-science.machine-learning", "Machine Learning", "/formal-science/data-science/machine-learning", "formal"),
        node("formal.data-science.neural-networks", "Neural Networks", "/formal-science/data-science/neural-networks", "formal"),
      ]),
      node("formal.information-science", "Information Science", "/formal-science/information-science", "formal"),
    ],
  },
  {
    domainId: "natural",
    children: [
      node("natural.physics", "Physics", "/natural-science/physics", "natural", [
        node("natural.physics.classical-mechanics", "Classical Mechanics", "/natural-science/physics/classical-mechanics", "natural"),
        node("natural.physics.quantum-mechanics", "Quantum Mechanics", "/natural-science/physics/quantum-mechanics", "natural"),
        node("natural.physics.theoretical-cosmology", "Theoretical Cosmology", "/natural-science/physics/theoretical-cosmology", "natural"),
      ]),
      node("natural.chemistry", "Chemistry", "/natural-science/chemistry", "natural", [
        node("natural.chemistry.quantum", "Quantum Chemistry", "/natural-science/chemistry/quantum", "natural"),
        node("natural.chemistry.organic", "Organic Chemistry", "/natural-science/chemistry/organic", "natural"),
      ]),
      node("natural.biology", "Biology", "/natural-science/biology", "natural"),
      node("natural.earth-science", "Earth Science", "/natural-science/earth-science", "natural"),
      node("natural.astronomy", "Astronomy", "/natural-science/astronomy", "natural", [
        node("natural.astronomy.planetary", "Planetary Astronomy", "/natural-science/astronomy/planetary-astronomy", "natural"),
        node("natural.astronomy.stellar-astrophysics", "Stellar Astrophysics", "/natural-science/astronomy/stellar-astrophysics", "natural"),
      ]),
    ],
  },
  {
    domainId: "social",
    children: [
      node("social.psychology", "Psychology", "/social-science/psychology", "social"),
      node("social.economics", "Economics", "/social-science/economics", "social"),
      node("social.sociology", "Sociology", "/social-science/sociology", "social"),
      node("social.political-science", "Political Science", "/social-science/political-science", "social"),
      node("social.anthropology", "Anthropology", "/social-science/anthropology", "social"),
      node("social.linguistics", "Linguistics", "/social-science/linguistics", "social", [
        node("social.linguistics.phonology", "Phonology", "/social-science/linguistics/phonology", "social"),
        node("social.linguistics.syntax", "Syntax & Grammar", "/social-science/linguistics/syntax", "social"),
      ]),
    ],
  },
  {
    domainId: "humanities",
    children: [
      node("humanities.philosophy", "Philosophy", "/humanities/philosophy", "humanities"),
      node("humanities.religion", "Religion", "/humanities/religion", "humanities", [
        node("humanities.religion.mythology", "Mythology", "/humanities/religion/mythology", "humanities", [
          node("humanities.religion.mythology.greek", "Hellenic Pantheon", "/humanities/religion/mythology/greek", "humanities"),
          node("humanities.religion.mythology.norse", "Nordic Pantheon", "/humanities/religion/mythology/norse", "humanities"),
          node("humanities.religion.mythology.egyptian", "Kemetic Pantheon", "/humanities/religion/mythology/egyptian", "humanities"),
        ]),
        node("humanities.religion.theology", "Theology", "/humanities/religion/theology", "humanities"),
      ]),
      node("humanities.history", "History", "/humanities/history", "humanities"),
      node("humanities.futurology", "Futurology", "/humanities/futurology", "humanities"),
      node("humanities.languages", "Languages", "/humanities/languages", "humanities", [
        node("humanities.languages.translation", "Translation Engines", "/humanities/languages/translation", "humanities"),
        node("humanities.languages.etymology", "Etymology", "/humanities/languages/etymology", "humanities"),
      ]),
      node("humanities.literature", "Literature", "/humanities/literature", "humanities"),
      node("humanities.visual-arts", "Visual Arts", "/humanities/visual-arts", "humanities"),
      node("humanities.music", "Music", "/humanities/music", "humanities", [
        node("humanities.music.theory", "Theory & Composition", "/humanities/music/theory", "humanities"),
        node("humanities.music.acoustics", "Acoustics", "/humanities/music/acoustics", "humanities"),
      ]),
      node("humanities.performing-arts", "Performing Arts", "/humanities/performing-arts", "humanities"),
      node("humanities.gaming", "Gaming", "/humanities/gaming", "humanities", [
        node("humanities.gaming.digital", "Digital Mechanics", "/humanities/gaming/digital", "humanities"),
        node("humanities.gaming.tabletop", "Tabletop & Rule Systems", "/humanities/gaming/tabletop", "humanities"),
      ]),
      node("humanities.culinary-arts", "Culinary Arts", "/humanities/culinary-arts", "humanities"),
      node("humanities.sports", "Sports", "/humanities/sports", "humanities"),
      node("humanities.culture", "Culture", "/humanities/culture", "humanities"),
    ],
  },
  {
    domainId: "applied",
    children: [
      node("applied.engineering", "Engineering", "/applied-science/engineering", "applied", [
        node("applied.engineering.mechanical", "Mechanical Engineering", "/applied-science/engineering/mechanical", "applied"),
        node("applied.engineering.civil", "Civil Engineering", "/applied-science/engineering/civil", "applied"),
        node("applied.engineering.electrical", "Electrical Engineering", "/applied-science/engineering/electrical", "applied"),
        node("applied.engineering.software", "Software Engineering", "/applied-science/engineering/software", "applied"),
        node("applied.engineering.aerospace", "Aerospace Engineering", "/applied-science/engineering/aerospace", "applied"),
        node("applied.engineering.chemical", "Chemical Engineering", "/applied-science/engineering/chemical", "applied"),
      ]),
      node("applied.technology", "Technology", "/applied-science/technology", "applied", [
        node("applied.technology.web-development", "Web Development", "/applied-science/technology/web-development", "applied"),
        node("applied.technology.embedded-systems", "Embedded Systems", "/applied-science/technology/embedded-systems", "applied"),
        node("applied.technology.telecommunications", "Telecommunications", "/applied-science/technology/telecommunications", "applied"),
      ]),
      node("applied.materials-science", "Materials Science", "/applied-science/materials-science", "applied"),
      node("applied.industrial-design", "Industrial Design", "/applied-science/industrial-design", "applied"),
      node("applied.architecture", "Architecture", "/applied-science/architecture", "applied"),
      node("applied.medicine", "Medicine", "/applied-science/medicine", "applied", [
        node("applied.medicine.anatomy-physiology", "Anatomy & Physiology", "/applied-science/medicine/anatomy-physiology", "applied"),
      ]),
      node("applied.health", "Health Sciences", "/applied-science/health", "applied", [
        node("applied.health.specializations", "Specializations", "/applied-science/health/specializations", "applied"),
      ]),
      node("applied.agriculture", "Agriculture", "/applied-science/agriculture", "applied"),
      node("applied.business", "Business", "/applied-science/business", "applied", [
        node("applied.business.accounting", "Accounting", "/applied-science/business/accounting", "applied"),
        node("applied.business.marketing", "Marketing", "/applied-science/business/marketing", "applied"),
      ]),
    ],
  },
  {
    domainId: "inter",
    children: [
      node("inter.cognitive-science", "Cognitive Science", "/interdisciplines/cognitive-science", "inter"),
      node("inter.bioinformatics", "Bioinformatics", "/interdisciplines/bioinformatics", "inter"),
      node("inter.mechatronics", "Mechatronics", "/interdisciplines/mechatronics", "inter"),
    ],
  },
] satisfies readonly CurriculumDomain[];
