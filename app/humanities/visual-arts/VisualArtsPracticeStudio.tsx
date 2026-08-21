"use client";

import PracticeStudioTopology, {
  type PracticeStudioNode,
} from "@/app/_page-system/topologies/PracticeStudioTopology";
import {
  Aperture,
  Brush,
  History,
  MonitorPlay,
  Printer,
  Shapes,
  type LucideIcon,
} from "lucide-react";

export type VisualArtsBranch = {
  id: string;
  label: string;
  href: string;
  description?: string;
  status: "active" | "placeholder";
};

type BranchPresentation = {
  question: string;
  material: string;
  rgb: string;
  icon: LucideIcon;
  position: { x: number; y: number; w: number; h: number };
};

const PRESENTATION: Record<string, BranchPresentation> = {
  "humanities.visual-arts.painting": {
    question: "How can marks, color, line, and surface organize an image?",
    material: "surface · pigment · line",
    rgb: "244, 63, 94",
    icon: Brush,
    position: { x: 6, y: 8, w: 34, h: 36 },
  },
  "humanities.visual-arts.sculpture": {
    question: "How does a work occupy, shape, or interrupt physical space?",
    material: "mass · void · material",
    rgb: "251, 146, 60",
    icon: Shapes,
    position: { x: 43, y: 8, w: 25, h: 44 },
  },
  "humanities.visual-arts.photography": {
    question: "What changes when an image is made through a lens and exposure?",
    material: "light · lens · frame",
    rgb: "34, 211, 238",
    icon: Aperture,
    position: { x: 71, y: 8, w: 23, h: 30 },
  },
  "humanities.visual-arts.printmaking": {
    question: "How does a matrix create repeatable images and editions?",
    material: "matrix · impression · edition",
    rgb: "250, 204, 21",
    icon: Printer,
    position: { x: 6, y: 48, w: 27, h: 36 },
  },
  "humanities.visual-arts.digital-media": {
    question:
      "What happens when the artwork can change through time, code, or interaction?",
    material: "screen · time · interaction",
    rgb: "167, 139, 250",
    icon: MonitorPlay,
    position: { x: 36, y: 57, w: 32, h: 32 },
  },
  "humanities.visual-arts.art-history": {
    question:
      "How do objects acquire meaning through time, place, institutions, and interpretation?",
    material: "object · evidence · context",
    rgb: "96, 165, 250",
    icon: History,
    position: { x: 71, y: 43, w: 23, h: 41 },
  },
};

export default function VisualArtsPracticeStudio({
  branches,
}: {
  branches: VisualArtsBranch[];
}) {
  const nodes: PracticeStudioNode[] = branches.map((branch) => {
    const presentation =
      PRESENTATION[branch.id] ??
      PRESENTATION["humanities.visual-arts.painting"];
    return {
      id: branch.id,
      label: branch.label,
      question: presentation.question,
      summary: branch.description ?? "",
      material: presentation.material,
      rgb: presentation.rgb,
      href: branch.href,
      status: branch.status === "placeholder" ? "planned" : "active",
      icon: presentation.icon,
      position: presentation.position,
    };
  });

  return <PracticeStudioTopology nodes={nodes} />;
}
