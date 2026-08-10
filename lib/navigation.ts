import { BookOpen, Theater, type LucideIcon } from "lucide-react";
import { curriculumRegistry } from "@/lib/curriculum/registry";
import type { CurriculumNode } from "@/lib/curriculum/types";
import { DOMAIN_BY_ID, type DomainId } from "@/lib/domains";

export type NavigationItem = {
  label: string;
  href: string;
  icon?: LucideIcon;
  domain: DomainId | "meta";
  children?: NavigationItem[];
};

export type NavigationSection = {
  title: string;
  items: NavigationItem[];
};

function curriculumNodeToNavigation(node: CurriculumNode): NavigationItem {
  return {
    label: node.label,
    href: node.href,
    domain: node.domainId,
    children: node.children?.map(curriculumNodeToNavigation),
  };
}

const academicDomains: NavigationItem[] = curriculumRegistry.allDomains().map((entry) => {
  const domain = DOMAIN_BY_ID[entry.domainId];
  return {
    label: domain.navLabel,
    href: domain.href,
    icon: domain.icon,
    domain: domain.id,
    children: entry.children.map(curriculumNodeToNavigation),
  };
});

export const NAVIGATION_DATA: NavigationSection[] = [
  {
    title: "Knowledge Graph",
    items: academicDomains,
  },
  {
    title: "Meta",
    items: [
      { label: "Glossary", href: "/glossary", icon: BookOpen, domain: "meta" },
      { label: "Stage", href: "/stage", icon: Theater, domain: "meta" },
    ],
  },
];
