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

export const PSYCHOLOGY_CURRICULUM: CurriculumNode = {
  id: "social.psychology",
  label: "Psychology",
  href: "/social-science/psychology",
  description:
    "Study behavior and mental processes through biological, cognitive, developmental, social, personality, clinical, and measurement perspectives.",
  domainId: "social",
  status: "active",
  pageKind: "hub",
  children: [
    branch(
      "social.psychology.cognitive",
      "Cognitive Psychology",
      "/social-science/psychology/cognitive",
      "Perception, attention, memory, language, problem solving, judgment, and the representations and processes used to explain them.",
    ),
    branch(
      "social.psychology.biological",
      "Biological Psychology",
      "/social-science/psychology/biological",
      "How nervous systems, hormones, genes, bodies, development, and environments participate in behavior and experience.",
    ),
    branch(
      "social.psychology.developmental",
      "Developmental Psychology",
      "/social-science/psychology/developmental",
      "Continuity and change in physical, cognitive, emotional, and social development across the lifespan.",
    ),
    branch(
      "social.psychology.social-personality",
      "Social & Personality Psychology",
      "/social-science/psychology/social-personality",
      "How situations, groups, relationships, identity, culture, and relatively stable individual differences shape behavior.",
    ),
    branch(
      "social.psychology.clinical-counseling",
      "Clinical & Counseling Psychology",
      "/social-science/psychology/clinical-counseling",
      "The scientific study and professional assessment of distress, adaptation, well-being, prevention, and psychological intervention.",
    ),
    branch(
      "social.psychology.methods-measurement",
      "Methods & Measurement",
      "/social-science/psychology/methods-measurement",
      "Research design, operationalization, psychometrics, sampling, uncertainty, replication, ethics, and the limits of psychological evidence.",
    ),
  ],
};
