export type VocabularyTriggerPolicy = "global" | "local" | "none";
export type MasterySurfacePolicy = "global" | "local" | "none";

/**
 * Product behavior keyed by stable curriculum node ID.
 *
 * This is deliberately separate from CurriculumNode. Academic structure should
 * not have to know whether a page uses a global utility button or a local one.
 * An omitted property means "use the surrounding product/domain default."
 */
export type PagePolicy = {
  vocabularyTrigger?: VocabularyTriggerPolicy;
  masterySurface?: MasterySurfacePolicy;
};

const EMPTY_PAGE_POLICY: Readonly<PagePolicy> = Object.freeze({});

/**
 * Start narrow. Add policy only after the page's ownership has been verified.
 * These Fundamentals pages already own local reference/vocabulary surfaces, so
 * the global Formal Science vocabulary trigger is redundant there.
 */
export const PAGE_POLICY_BY_NODE_ID: Readonly<Record<string, Readonly<PagePolicy>>> = {
  "formal.mathematics.algebra.elementary-algebra.fundamentals": {
    vocabularyTrigger: "local",
  },
  "formal.mathematics.algebra.elementary-algebra.fundamentals.expressions-variables": {
    vocabularyTrigger: "local",
  },
  "formal.mathematics.algebra.elementary-algebra.fundamentals.equality-equations": {
    vocabularyTrigger: "local",
  },
  "formal.mathematics.algebra.elementary-algebra.fundamentals.algebraic-properties": {
    vocabularyTrigger: "local",
  },
  "formal.mathematics.algebra.elementary-algebra.fundamentals.number-systems": {
    vocabularyTrigger: "local",
  },
};

export function getPagePolicy(nodeId: string): Readonly<PagePolicy> {
  return PAGE_POLICY_BY_NODE_ID[nodeId] ?? EMPTY_PAGE_POLICY;
}

export function hasExplicitPagePolicy(nodeId: string): boolean {
  return Object.hasOwn(PAGE_POLICY_BY_NODE_ID, nodeId);
}
