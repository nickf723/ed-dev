import type { Metadata } from "next";
import ChemistryHub from "./ChemistryHub";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import { CHEMISTRY_BRANCH_IDS } from "./chemistryModel";

const NODE_ID = "natural.chemistry";

export const metadata: Metadata = {
  title: "Chemistry",
  description:
    "Explore elemental identity, molecular structure, chemical reactions, measurement, evidence, and laboratory boundaries across seven chemistry branches.",
};

export default function ChemistryPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  if (context.pageKind !== "hub") {
    throw new Error("Chemistry must be classified as a navigation hub.");
  }

  assertBranchCoverage(context.children);

  return (
    <ChemistryHub
      branches={context.children}
      breadcrumbs={context.breadcrumbs}
    />
  );
}

function assertBranchCoverage(children: readonly CurriculumNode[]) {
  const childIds = children.map((child) => child.id);
  const exactMatch =
    childIds.length === CHEMISTRY_BRANCH_IDS.length &&
    childIds.every((id, index) => id === CHEMISTRY_BRANCH_IDS[index]);

  if (!exactMatch) {
    throw new Error(
      `Chemistry branch presentation must match the curriculum registry. Expected ${CHEMISTRY_BRANCH_IDS.join(", ")}; received ${childIds.join(", ")}.`
    );
  }
}
