import type { CurriculumNode } from "@/lib/curriculum/types";

function node(
  id: string,
  label: string,
  href: string,
  description: string,
  status: CurriculumNode["status"] = "placeholder",
): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "humanities",
    status,
    pageKind: "unit",
  };
}

export const VISUAL_ARTS_CURRICULUM: CurriculumNode = {
  id: "humanities.visual-arts",
  label: "Visual Arts",
  href: "/humanities/visual-arts",
  description:
    "Images and objects organized through material, composition, color, space, representation, making, interpretation, and historical context.",
  domainId: "humanities",
  status: "active",
  pageKind: "hub",
  children: [
    node(
      "humanities.visual-arts.painting",
      "Painting & Drawing",
      "/humanities/visual-arts/painting",
      "Pigment, line, mark, surface, value, color, composition, representation, abstraction, and two-dimensional image making.",
      "active",
    ),
    node(
      "humanities.visual-arts.sculpture",
      "Sculpture",
      "/humanities/visual-arts/sculpture",
      "Three-dimensional form, mass, void, material, fabrication, carving, modeling, assemblage, installation, and spatial encounter.",
      "active",
    ),
    node(
      "humanities.visual-arts.photography",
      "Photography",
      "/humanities/visual-arts/photography",
      "Lens-based images, exposure, framing, optics, photographic process, documentation, manipulation, and photographic interpretation.",
    ),
    node(
      "humanities.visual-arts.printmaking",
      "Printmaking",
      "/humanities/visual-arts/printmaking",
      "Relief, intaglio, lithography, screen printing, editions, matrices, reproduction, and the visual logic of printed images.",
    ),
    node(
      "humanities.visual-arts.digital-media",
      "Digital & Media Art",
      "/humanities/visual-arts/digital-media",
      "Digital image making, video, animation, interactive art, computation, networks, installations, and time-based media.",
    ),
    node(
      "humanities.visual-arts.art-history",
      "Art History",
      "/humanities/visual-arts/art-history",
      "Visual objects across time, place, culture, institutions, patronage, technology, exchange, interpretation, and historical change.",
    ),
  ],
};
