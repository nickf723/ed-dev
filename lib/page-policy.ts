import type { DomainId } from "@/lib/domains";

export type VocabularyTriggerPolicy = "global" | "local" | "none";
export type MasterySurfacePolicy = "global" | "local" | "none";

/**
 * Product behavior belongs outside academic ontology. Curriculum-backed routes
 * are keyed by stable node ID; domain-root behavior is keyed by stable domain ID.
 */
export type PagePolicy = {
  vocabularyTrigger?: VocabularyTriggerPolicy;
  masterySurface?: MasterySurfacePolicy;
};

const EMPTY_PAGE_POLICY: Readonly<PagePolicy> = Object.freeze({});

/** Domain roots are product pages but are not CurriculumNode records. */
export const PAGE_POLICY_BY_DOMAIN_ID: Readonly<
  Partial<Record<DomainId, Readonly<PagePolicy>>>
> = {
  formal: {
    vocabularyTrigger: "none",
  },
};

/**
 * Add node policy only after a page's ownership has been verified.
 *
 * `local` vocabulary means the route owns its own reference/vocabulary
 * experience. `none` means the route intentionally exposes no global trigger.
 * Foundation mastery entries preserve the existing global mastery dock behavior
 * without making the dock know curriculum ancestry.
 */
export const PAGE_POLICY_BY_NODE_ID: Readonly<Record<string, Readonly<PagePolicy>>> = {
  "formal.logic": {
    vocabularyTrigger: "local",
  },
  "formal.mathematics.foundations": {
    vocabularyTrigger: "local",
  },
  "formal.mathematics.foundations.arithmetic": {
    masterySurface: "global",
  },
  "formal.mathematics.foundations.fractions": {
    masterySurface: "global",
  },
  "formal.mathematics.foundations.inequalities": {
    masterySurface: "global",
  },
  "formal.mathematics.foundations.geometry": {
    masterySurface: "global",
  },
  "formal.mathematics.foundations.measurement": {
    masterySurface: "global",
  },
  "formal.mathematics.foundations.grouping": {
    masterySurface: "global",
  },
  "formal.mathematics.foundations.statistics": {
    masterySurface: "global",
  },
  "formal.mathematics": {
    vocabularyTrigger: "none",
  },
  "formal.mathematics.algebra": {
    vocabularyTrigger: "none",
  },
  "formal.mathematics.algebra.pre-algebra": {
    vocabularyTrigger: "local",
  },
  "formal.mathematics.algebra.pre-algebra.integers": {
    vocabularyTrigger: "local",
  },
  "formal.mathematics.algebra.pre-algebra.pemdas": {
    vocabularyTrigger: "local",
  },
  "formal.mathematics.algebra.pre-algebra.properties": {
    vocabularyTrigger: "local",
  },
  "formal.mathematics.algebra.pre-algebra.ratios": {
    vocabularyTrigger: "local",
  },
  "formal.mathematics.algebra.pre-algebra.fractions": {
    vocabularyTrigger: "local",
  },
  "formal.mathematics.algebra.pre-algebra.exponents": {
    vocabularyTrigger: "local",
  },
  "formal.mathematics.algebra.pre-algebra.expressions": {
    vocabularyTrigger: "local",
  },
  "formal.mathematics.algebra.pre-algebra.equations": {
    vocabularyTrigger: "local",
  },
  "formal.mathematics.algebra.elementary-algebra": {
    vocabularyTrigger: "none",
  },
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
  "formal.mathematics.algebra.elementary-algebra.linear-equations": {
    vocabularyTrigger: "none",
  },
  "formal.mathematics.algebra.elementary-algebra.systems": {
    vocabularyTrigger: "none",
  },
  "formal.mathematics.algebra.elementary-algebra.inequalities": {
    vocabularyTrigger: "none",
  },
  "formal.mathematics.algebra.elementary-algebra.inequalities.systems": {
    vocabularyTrigger: "none",
  },
};

export function getPagePolicy(nodeId: string): Readonly<PagePolicy> {
  return PAGE_POLICY_BY_NODE_ID[nodeId] ?? EMPTY_PAGE_POLICY;
}

export function hasExplicitPagePolicy(nodeId: string): boolean {
  return Object.hasOwn(PAGE_POLICY_BY_NODE_ID, nodeId);
}
