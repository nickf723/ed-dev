import type { Metadata } from "next";
import VisualArtsHub from "./VisualArtsHub";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import { VISUAL_ARTS_BRANCH_IDS } from "./visualArtsModel";

const NODE_ID = "humanities.visual-arts";

export const metadata: Metadata = {
  title: "Visual Arts",
  description:
    "Study visual art through material, form, context, museum records, composition, color relationships, and evidence-based interpretation.",
};

export default function VisualArtsPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  if (context.pageKind !== "hub") {
    throw new Error("Visual Arts must be classified as a navigation hub.");
  }

  assertBranchCoverage(context.children);

  return (
    <VisualArtsHub
      breadcrumbs={context.breadcrumbs}
      branches={context.children.map((child: CurriculumNode) => ({
        id: child.id,
        label: child.label,
        href: child.href,
        description: child.description,
        status: child.status ?? "active",
      }))}
    />
  );
}

function assertBranchCoverage(children: readonly CurriculumNode[]) {
  const childIds = children.map((child) => child.id);
  const exactMatch =
    childIds.length === VISUAL_ARTS_BRANCH_IDS.length &&
    childIds.every((id, index) => id === VISUAL_ARTS_BRANCH_IDS[index]);

  if (!exactMatch) {
    throw new Error(
      `Visual Arts branch presentation must match the curriculum registry. Expected ${VISUAL_ARTS_BRANCH_IDS.join(
        ", "
      )}; received ${childIds.join(", ")}.`
    );
  }
}
