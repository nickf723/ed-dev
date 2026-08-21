import type { VocabTerm } from "@/app/_data/vocab/types";

export const religionMethodsVocab: VocabTerm[] = [
  {
    id: "rel-emic",
    word: "Emic Perspective",
    definition:
      "An account that attends to categories, meanings, distinctions, and explanations used by people within the community or practice being studied, without assuming any one participant represents the whole.",
    domain: "Religious Studies & Methods",
    tags: ["Perspective", "Method"],
    relatedTerms: ["rel-etic", "rel-context"],
    isAdult: false,
  },
  {
    id: "rel-etic",
    word: "Etic Perspective",
    definition:
      "An analytical account using concepts developed for comparison or explanation across cases, which must state how its categories were chosen and remain answerable to evidence and the people affected.",
    domain: "Religious Studies & Methods",
    tags: ["Analysis", "Method"],
    relatedTerms: ["rel-emic", "rel-comparison"],
    isAdult: false,
  },
];

export const religionTraditionsVocab: VocabTerm[] = [
  {
    id: "rel-community-of-practice",
    word: "Religious Community of Practice",
    definition:
      "A group whose shared and negotiated activities, roles, relationships, materials, stories, skills, and institutions help sustain a form of religious life without making every member identical.",
    domain: "Religious Traditions & Communities",
    tags: ["Community", "Practice"],
    relatedTerms: ["rel-tradition", "rel-internal-diversity"],
    isAdult: false,
  },
  {
    id: "rel-denomination",
    word: "Denomination",
    definition:
      "An organized and named religious body within a wider tradition or religious field, with boundaries, authority, institutions, and recognition that vary by place and history.",
    domain: "Religious Traditions & Communities",
    tags: ["Institution", "Identity"],
    relatedTerms: ["rel-tradition", "rel-religious-authority"],
    isAdult: false,
  },
];

export const religionTextsVocab: VocabTerm[] = [
  {
    id: "rel-canon",
    word: "Canon",
    definition:
      "A collection of texts or works recognized as especially authoritative by a community or institution through historically developed processes of selection, ordering, exclusion, transmission, and use.",
    domain: "Sacred Texts & Interpretation",
    tags: ["Text", "Authority"],
    relatedTerms: ["rel-hermeneutics", "rel-religious-authority"],
    isAdult: false,
  },
  {
    id: "rel-hermeneutics",
    word: "Hermeneutics",
    definition:
      "The theory and practice of interpretation, including how language, genre, translation, history, reader, institution, performance, and authority shape understanding.",
    domain: "Sacred Texts & Interpretation",
    tags: ["Interpretation", "Reception"],
    relatedTerms: ["rel-canon", "rel-interpretation"],
    isAdult: false,
  },
];

export const religionRitualVocab: VocabTerm[] = [
  {
    id: "rel-ritual",
    word: "Ritual",
    definition:
      "A patterned and socially situated performance through which participants may enact relationships, identities, transitions, obligations, memory, devotion, discipline, power, or meaning.",
    domain: "Ritual, Practice & Experience",
    tags: ["Performance", "Embodiment"],
    relatedTerms: ["rel-lived-religion", "rel-pilgrimage"],
    isAdult: false,
  },
  {
    id: "rel-pilgrimage",
    word: "Pilgrimage",
    definition:
      "Travel oriented toward a place, route, object, person, event, or purpose experienced as religiously significant, shaped by bodies, infrastructure, institutions, economies, narratives, and local encounter.",
    domain: "Ritual, Practice & Experience",
    tags: ["Travel", "Place"],
    relatedTerms: ["rel-ritual", "rel-sacred-space"],
    isAdult: false,
  },
];

export const religionMaterialVocab: VocabTerm[] = [
  {
    id: "rel-material-religion",
    word: "Material Religion",
    definition:
      "The study of how objects, bodies, images, buildings, clothing, food, sound, media, technologies, and sensory environments participate in producing and mediating religious life.",
    domain: "Material Religion, Art & Place",
    tags: ["Object", "Senses"],
    relatedTerms: ["rel-lived-religion", "rel-sacred-space"],
    isAdult: false,
  },
  {
    id: "rel-sacred-space",
    word: "Sacred Space",
    definition:
      "A place treated as religiously significant through practice, narrative, memory, authority, design, restriction, presence, or relationship rather than through one universal spatial property.",
    domain: "Material Religion, Art & Place",
    tags: ["Place", "Practice"],
    relatedTerms: ["rel-material-religion", "rel-pilgrimage"],
    isAdult: false,
  },
];

export const religionSocietyVocab: VocabTerm[] = [
  {
    id: "rel-secularism",
    word: "Secularism",
    definition:
      "A family of political, legal, social, and intellectual arrangements that define and regulate relations among religion, state, public life, institutions, and nonreligion differently across contexts.",
    domain: "Religion, Society & Politics",
    tags: ["Politics", "Public Life"],
    relatedTerms: ["rel-confessional-descriptive", "rel-syncretism"],
    isAdult: false,
  },
  {
    id: "rel-syncretism",
    word: "Syncretism",
    definition:
      "A contested label for religious forms produced through contact, translation, mixture, adaptation, or exchange; its use should identify who applies the label and avoid implying that other traditions are historically pure.",
    domain: "Religion, Society & Politics",
    tags: ["Contact", "Change"],
    relatedTerms: ["rel-tradition", "rel-secularism"],
    isAdult: false,
  },
];

export const religionTheologyVocab: VocabTerm[] = [
  {
    id: "rel-theodicy",
    word: "Theodicy",
    definition:
      "An argument that attempts to reconcile suffering or evil with claims about divine goodness, power, justice, order, freedom, or purpose within a particular theological framework.",
    domain: "Theology & Philosophy of Religion",
    tags: ["Evil", "Argument"],
    relatedTerms: ["rel-eschatology", "rel-confessional-descriptive"],
    isAdult: false,
  },
  {
    id: "rel-eschatology",
    word: "Eschatology",
    definition:
      "Teachings or reflection about endings, judgment, death, afterlife, renewal, final destiny, liberation, or the culmination of history, whose content and importance vary across traditions.",
    domain: "Theology & Philosophy of Religion",
    tags: ["Endings", "Doctrine"],
    relatedTerms: ["rel-theodicy", "rel-cosmology"],
    isAdult: false,
  },
];

export const religionMythologyVocab: VocabTerm[] = [
  {
    id: "rel-myth",
    word: "Myth",
    definition:
      "A culturally authoritative narrative that may orient cosmology, identity, ritual, ethics, place, memory, or social order; in religious studies the term does not simply mean a false story.",
    domain: "Mythology & Sacred Narrative",
    tags: ["Narrative", "Authority"],
    relatedTerms: ["rel-cosmology", "rel-tradition"],
    isAdult: false,
  },
  {
    id: "rel-cosmology",
    word: "Religious Cosmology",
    definition:
      "An account of the structure, origin, ordering, inhabitants, powers, purpose, or destiny of a world, expressed through narrative, image, doctrine, ritual, place, or philosophical argument.",
    domain: "Mythology & Sacred Narrative",
    tags: ["World", "Narrative"],
    relatedTerms: ["rel-myth", "rel-eschatology"],
    isAdult: false,
  },
];

export const religionBranchVocab = [
  ...religionMethodsVocab,
  ...religionTraditionsVocab,
  ...religionTextsVocab,
  ...religionRitualVocab,
  ...religionMaterialVocab,
  ...religionSocietyVocab,
  ...religionTheologyVocab,
  ...religionMythologyVocab,
];
