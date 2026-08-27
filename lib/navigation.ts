import { curriculumRegistry } from "@/lib/curriculum/registry";
import type { CurriculumNode } from "@/lib/curriculum/types";
import { DOMAIN_BY_ID, type DomainId } from "@/lib/domains";

export type NavigationIconKey = "book-open" | "school";

export type NavigationItem = {
  label: string;
  href: string;
  icon?: NavigationIconKey;
  domain: DomainId | "meta";
  children?: NavigationItem[];
};

export type NavigationSection = {
  title: string;
  items: NavigationItem[];
};

function activeChildren(node: CurriculumNode): readonly CurriculumNode[] {
  return (node.children ?? []).filter((child) => child.status !== "placeholder");
}

function curriculumNodeToNavigation(node: CurriculumNode): NavigationItem {
  const children = activeChildren(node);
  return {
    label: node.label,
    href: node.href,
    domain: node.domainId,
    children: children.length > 0 ? children.map(curriculumNodeToNavigation) : undefined,
  };
}

const academicDomains: NavigationItem[] = curriculumRegistry.allDomains().map((entry) => {
  const domain = DOMAIN_BY_ID[entry.domainId];
  const children = entry.children.filter((child) => child.status !== "placeholder");
  return {
    label: domain.navLabel,
    href: domain.href,
    domain: domain.id,
    children: children.map(curriculumNodeToNavigation),
  };
});

/**
 * Serializable learner-facing navigation. Classroom-specific routes remain
 * available without occupying the primary knowledge navigation.
 */
export const NAVIGATION_DATA: NavigationSection[] = [
  {
    title: "Domains",
    items: academicDomains,
  },
  {
    title: "Reference",
    items: [
      { label: "Glossary", href: "/glossary", icon: "book-open", domain: "meta" },
    ],
  },
];
