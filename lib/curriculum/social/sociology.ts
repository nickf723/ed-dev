import type { CurriculumNode } from "@/lib/curriculum/types";

function child(
  id: string,
  label: string,
  href: string,
  description: string,
  status: CurriculumNode["status"] = "placeholder",
): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "social",
    status,
    pageKind: "unit",
  };
}

export const SOCIOLOGY_CURRICULUM: CurriculumNode = {
  id: "social.sociology",
  label: "Sociology",
  href: "/social-science/sociology",
  description:
    "Social relationships, groups, institutions, inequality, population, and change across interacting levels of social life.",
  domainId: "social",
  status: "active",
  pageKind: "hub",
  children: [
    child(
      "social.sociology.interaction",
      "Social Interaction",
      "/social-science/sociology/interaction",
      "Meaning, identity, norms, roles, socialization, and the patterned encounters through which everyday social life is produced.",
    ),
    child(
      "social.sociology.groups-networks",
      "Groups & Networks",
      "/social-science/sociology/groups-networks",
      "Ties, groups, communities, organizations, social capital, diffusion, bridges, clustering, and network structure.",
    ),
    child(
      "social.sociology.institutions",
      "Institutions",
      "/social-science/sociology/institutions",
      "Durable social arrangements such as family, education, religion, work, markets, medicine, media, and the state.",
    ),
    child(
      "social.sociology.stratification",
      "Stratification & Inequality",
      "/social-science/sociology/stratification",
      "Class, status, race, ethnicity, gender, power, mobility, and the institutions that distribute resources and opportunities unevenly.",
    ),
    child(
      "social.sociology.demography",
      "Population & Demography",
      "/social-science/sociology/demography",
      "Fertility, mortality, migration, age structure, households, population change, and the social consequences of demographic patterns.",
    ),
    child(
      "social.sociology.social-change",
      "Social Change",
      "/social-science/sociology/social-change",
      "Collective action, movements, technology, diffusion, modernization, crisis, institutional change, and transformations in norms and relationships.",
    ),
    child(
      "social.sociology.theory-methods",
      "Theory & Methods",
      "/social-science/sociology/theory-methods",
      "Competing theoretical lenses plus surveys, interviews, ethnography, experiments, network analysis, comparative research, and quantitative inference.",
    ),
  ],
};
