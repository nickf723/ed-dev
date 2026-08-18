import type { CurriculumNode } from "@/lib/curriculum/types";

function branch(id: string, label: string, href: string, description: string): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "humanities",
    status: "placeholder",
    pageKind: "unit",
  };
}

export const RELIGION_CURRICULUM: CurriculumNode = {
  id: "humanities.religion",
  label: "Religion",
  href: "/humanities/religion",
  description:
    "Study religious traditions, practices, institutions, texts, experiences, material cultures, histories, and ideas through comparative, historical, anthropological, philosophical, and other academic approaches.",
  domainId: "humanities",
  status: "active",
  pageKind: "hub",
  children: [
    branch(
      "humanities.religion.methods",
      "Religious Studies & Methods",
      "/humanities/religion/methods",
      "How historians, anthropologists, sociologists, philosophers, textual scholars, archaeologists, and other researchers frame evidence and questions about religion.",
    ),
    branch(
      "humanities.religion.traditions",
      "Religious Traditions & Communities",
      "/humanities/religion/traditions",
      "Study particular traditions and communities in their internal diversity, historical development, geographic settings, institutions, and lived forms rather than reducing them to a few universal labels.",
    ),
    branch(
      "humanities.religion.texts-interpretation",
      "Sacred Texts & Interpretation",
      "/humanities/religion/texts-interpretation",
      "Canon, scripture, commentary, oral transmission, translation, authority, genre, interpretation, reception, and the communities that preserve and debate texts.",
    ),
    branch(
      "humanities.religion.ritual-practice",
      "Ritual, Practice & Experience",
      "/humanities/religion/ritual-practice",
      "Prayer, worship, meditation, pilgrimage, fasting, festivals, rites of passage, healing, discipline, embodiment, emotion, and other forms of religious practice and experience.",
    ),
    branch(
      "humanities.religion.material-place",
      "Material Religion, Art & Place",
      "/humanities/religion/material-place",
      "Architecture, images, objects, clothing, food, music, landscape, relics, technologies, sensory environments, and other material dimensions of religious life.",
    ),
    branch(
      "humanities.religion.society-politics",
      "Religion, Society & Politics",
      "/humanities/religion/society-politics",
      "Institutions, identity, law, power, gender, class, race, nationalism, secularism, pluralism, migration, conflict, cooperation, and religion in public life.",
    ),
    branch(
      "humanities.religion.theology-philosophy",
      "Theology & Philosophy of Religion",
      "/humanities/religion/theology-philosophy",
      "Arguments, doctrines, concepts of divinity or ultimacy, revelation, evil, salvation or liberation, religious language, epistemology, ethics, and philosophical reflection within and about traditions.",
    ),
    {
      id: "humanities.religion.mythology",
      label: "Mythology & Sacred Narrative",
      href: "/humanities/religion/mythology",
      description:
        "Study myth, sacred narrative, cosmology, hero cycles, ritual narrative, oral tradition, reception, and the historical communities that tell and reinterpret these stories.",
      domainId: "humanities",
      status: "active",
      pageKind: "unit",
      children: [
        {
          id: "humanities.religion.mythology.greek",
          label: "Greek Mythology",
          href: "/humanities/religion/mythology/greek",
          description: "Gods, heroes, ritual contexts, literary traditions, visual culture, local variants, and later reception in the ancient Greek world and beyond.",
          domainId: "humanities",
          status: "active",
          pageKind: "unit",
        },
      ],
    },
  ],
};
