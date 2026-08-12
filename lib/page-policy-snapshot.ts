import { normalizeCurriculumHref } from "@/lib/curriculum/route";
import { curriculumRegistry } from "@/lib/curriculum/registry";
import {
  PAGE_POLICY_BY_NODE_ID,
  type PagePolicy,
} from "@/lib/page-policy";

export type ResolvedPagePolicyRoute = {
  nodeId: string;
  nodeLabel: string;
  policy: Readonly<PagePolicy>;
};

export type PagePolicyRouteSnapshot = Readonly<
  Record<string, ResolvedPagePolicyRoute>
>;

/**
 * Build a small product-policy index for the client shell without sending the
 * curriculum registry itself to the browser.
 *
 * Policy remains authored by stable curriculum node ID. Routes and display
 * identity are resolved here, at the server boundary, from canonical data.
 */
export function buildPagePolicyRouteSnapshot(): PagePolicyRouteSnapshot {
  const entries = Object.entries(PAGE_POLICY_BY_NODE_ID).map(([nodeId, policy]) => {
    const node = curriculumRegistry.getNode(nodeId);
    if (!node) {
      throw new Error(`Page policy references unknown curriculum node ${nodeId}`);
    }
    return [
      normalizeCurriculumHref(node.href),
      { nodeId, nodeLabel: node.label, policy },
    ] as const;
  });

  return Object.fromEntries(entries);
}
