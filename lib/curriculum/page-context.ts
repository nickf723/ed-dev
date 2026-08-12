import { DOMAIN_BY_ID, type DomainDefinition } from "@/lib/domains";
import { curriculumRegistry } from "@/lib/curriculum/registry";
import type {
  CurriculumNode,
  CurriculumNodeStatus,
  CurriculumPageKind,
} from "@/lib/curriculum/types";

export type CurriculumBreadcrumb = {
  label: string;
  href?: string;
};

export type CurriculumPageContext = {
  node: CurriculumNode;
  domain: DomainDefinition;
  status: CurriculumNodeStatus;
  pageKind?: CurriculumPageKind;
  depth: number;
  parent?: CurriculumNode;
  ancestors: readonly CurriculumNode[];
  breadcrumbs: readonly CurriculumBreadcrumb[];
  siblings: readonly CurriculumNode[];
  activeSiblings: readonly CurriculumNode[];
  previousActiveSibling?: CurriculumNode;
  nextActiveSibling?: CurriculumNode;
  children: readonly CurriculumNode[];
  activeChildren: readonly CurriculumNode[];
  plannedChildren: readonly CurriculumNode[];
};

function ancestorsFor(node: CurriculumNode): CurriculumNode[] {
  const ancestors: CurriculumNode[] = [];
  let cursor = curriculumRegistry.parentFor(node.id);

  while (cursor) {
    ancestors.unshift(cursor);
    cursor = curriculumRegistry.parentFor(cursor.id);
  }

  return ancestors;
}

function siblingsFor(node: CurriculumNode, parent?: CurriculumNode): readonly CurriculumNode[] {
  if (parent) return parent.children ?? [];

  const domain = curriculumRegistry
    .allDomains()
    .find((entry) => entry.domainId === node.domainId);

  return domain?.children ?? [];
}

/**
 * Resolve the semantic relationships a curriculum page should not have to
 * rediscover by hand.
 *
 * This adapter deliberately contains no presentation decisions. It provides
 * facts that headers, page frames, sibling navigation, child maps, mastery UI,
 * and future authoring layers can consume consistently.
 */
export function getCurriculumPageContext(
  nodeId: string,
): CurriculumPageContext | undefined {
  const node = curriculumRegistry.getNode(nodeId);
  if (!node) return undefined;

  const domain = DOMAIN_BY_ID[node.domainId];
  const parent = curriculumRegistry.parentFor(node.id);
  const ancestors = ancestorsFor(node);
  const siblings = siblingsFor(node, parent);
  const activeSiblings = siblings.filter((sibling) => sibling.status !== "placeholder");
  const activeIndex = activeSiblings.findIndex((sibling) => sibling.id === node.id);
  const children = node.children ?? [];

  return {
    node,
    domain,
    status: node.status ?? "active",
    pageKind: node.pageKind,
    depth: ancestors.length + 1,
    parent,
    ancestors,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: domain.navLabel, href: domain.href },
      ...ancestors.map((ancestor) => ({
        label: ancestor.label,
        href: ancestor.href,
      })),
      { label: node.label },
    ],
    siblings,
    activeSiblings,
    previousActiveSibling:
      activeIndex > 0 ? activeSiblings[activeIndex - 1] : undefined,
    nextActiveSibling:
      activeIndex >= 0 && activeIndex < activeSiblings.length - 1
        ? activeSiblings[activeIndex + 1]
        : undefined,
    children,
    activeChildren: children.filter((child) => child.status !== "placeholder"),
    plannedChildren: children.filter((child) => child.status === "placeholder"),
  };
}

export function requireCurriculumPageContext(nodeId: string): CurriculumPageContext {
  const context = getCurriculumPageContext(nodeId);
  if (!context) {
    throw new Error(`Curriculum page context not found for ${nodeId}`);
  }
  return context;
}
