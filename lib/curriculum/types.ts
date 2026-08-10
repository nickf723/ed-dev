import type { DomainId } from "@/lib/domains";

export type CurriculumNodeStatus = "active" | "placeholder";

/**
 * A curriculum node participates in two structures at once:
 *
 * 1. `children` describes containment for browsing and navigation.
 * 2. `prerequisiteIds` describes directed mastery edges between nodes.
 *
 * Keeping those relationships separate lets the curriculum remain a familiar
 * nested sitemap while also growing into a prerequisite DAG over time.
 */
export type CurriculumNode = {
  id: string;
  label: string;
  href: string;
  domainId: DomainId;
  status?: CurriculumNodeStatus;
  prerequisiteIds?: readonly string[];
  children?: readonly CurriculumNode[];
};

export type CurriculumDomain = {
  domainId: DomainId;
  children: readonly CurriculumNode[];
};

export type CurriculumRegistrySnapshot = {
  domains: readonly CurriculumDomain[];
  nodes: readonly CurriculumNode[];
};
