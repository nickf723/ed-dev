import type { CurriculumNode } from "@/lib/curriculum/types";

function branch(
  id: string,
  label: string,
  href: string,
  description: string,
): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "social",
    status: "placeholder",
    pageKind: "unit",
  };
}

export const COMMUNICATIONS_CURRICULUM: CurriculumNode = {
  id: "social.communications",
  label: "Communication Studies",
  href: "/social-science/communications",
  description:
    "How people create, transmit, interpret, negotiate, amplify, and contest meaning across relationships, organizations, media, technologies, and public life.",
  domainId: "social",
  status: "active",
  pageKind: "hub",
  children: [
    branch(
      "social.communications.interpersonal",
      "Interpersonal Communication",
      "/social-science/communications/interpersonal",
      "Conversation, listening, relationships, identity, conflict, nonverbal behavior, disclosure, and meaning negotiated between people.",
    ),
    branch(
      "social.communications.groups-organizations",
      "Groups & Organizations",
      "/social-science/communications/groups-organizations",
      "Communication in teams, institutions, workplaces, leadership structures, professional cultures, and coordinated collective action.",
    ),
    branch(
      "social.communications.media",
      "Media & Mass Communication",
      "/social-science/communications/media",
      "Journalism, broadcasting, entertainment, audiences, framing, gatekeeping, representation, institutions, and mass-mediated public life.",
    ),
    branch(
      "social.communications.digital",
      "Digital Communication",
      "/social-science/communications/digital",
      "Platforms, networks, online communities, algorithmic mediation, virality, interfaces, digital identity, and computer-mediated interaction.",
    ),
    branch(
      "social.communications.rhetoric",
      "Rhetoric & Persuasion",
      "/social-science/communications/rhetoric",
      "Arguments, audiences, credibility, emotion, evidence, framing, public address, campaigns, and the design of persuasive messages.",
    ),
    branch(
      "social.communications.theory-methods",
      "Theory & Research Methods",
      "/social-science/communications/theory-methods",
      "Models of communication, discourse analysis, surveys, experiments, interviews, content analysis, network analysis, and research design.",
    ),
  ],
};
