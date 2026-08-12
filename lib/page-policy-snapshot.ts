import { normalizeCurriculumHref } from "@/lib/curriculum/route";
import { curriculumRegistry } from "@/lib/curriculum/registry";
import { DOMAIN_BY_ID, type DomainId } from "@/lib/domains";
import {
  PAGE_POLICY_BY_DOMAIN_ID,
  PAGE_POLICY_BY_NODE_ID,
  type PagePolicy,
} from "@/lib/page-policy";

export type ResolvedPagePolicyRoute = {
  curriculumNodeId?: string;
  pageLabel: string;
  policy: Readonly<PagePolicy>;
};

export type PagePolicyRouteSnapshot = Readonly<
  Record<string, ResolvedPagePolicyRoute>
>;

/**
 * Build a small product-policy index for the client shell without sending the
 * curriculum registry itself to the browser.
 *
 * Curriculum policy remains authored by stable node ID. Domain-root policy is
 * authored by stable domain ID because those product pages are not nodes.
 */
export function buildPagePolicyRouteSnapshot(): PagePolicyRouteSnapshot {
  const domainEntries = (Object.keys(PAGE_POLICY_BY_DOMAIN_ID) as DomainId[]).flatMap(
    (domainId) => {
      const policy = PAGE_POLICY_BY_DOMAIN_ID[domainId];
      if (!policy) return [];
      const domain = DOMAIN_BY_ID[domainId];
      return [
        [
          normalizeCurriculumHref(domain.href),
          { pageLabel: domain.title, policy },
        ] as const,
      ];
    },
  );

  const nodeEntries = Object.entries(PAGE_POLICY_BY_NODE_ID).map(([nodeId, policy]) => {
    const node = curriculumRegistry.getNode(nodeId);
    if (!node) {
      throw new Error(`Page policy references unknown curriculum node ${nodeId}`);
    }
    return [
      normalizeCurriculumHref(node.href),
      { curriculumNodeId: nodeId, pageLabel: node.label, policy },
    ] as const;
  });

  return Object.fromEntries([...domainEntries, ...nodeEntries]);
}
