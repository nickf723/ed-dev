import type { CurriculumNode } from "@/lib/curriculum/types";

function planned(id: string, label: string, href: string, description: string): CurriculumNode {
  return { id, label, href, description, domainId: "humanities", status: "placeholder", pageKind: "unit" };
}

function active(id: string, label: string, href: string, description: string): CurriculumNode {
  return { id, label, href, description, domainId: "humanities", status: "active", pageKind: "unit" };
}

export const CULINARY_ARTS_CURRICULUM: CurriculumNode = {
  id: "humanities.culinary-arts",
  label: "Culinary Arts",
  href: "/humanities/culinary-arts",
  description:
    "Study ingredients, techniques, dishes, sensory judgment, kitchen practice, safety, preservation, timing, and service as a craft that connects material transformation with culture and human experience.",
  domainId: "humanities",
  status: "active",
  pageKind: "hub",
  children: [
    active(
      "humanities.culinary-arts.market",
      "Ingredient Atlas",
      "/humanities/culinary-arts/market",
      "Study ingredients through seasonality, varieties, structure, flavor, ripeness, storage, sourcing, substitution, preparation, and how their physical properties affect cooking.",
    ),
    planned(
      "humanities.culinary-arts.methods",
      "Cooking Methods",
      "/humanities/culinary-arts/methods",
      "Study dry and moist heat, frying, steaming, roasting, baking, grilling, braising, chilling, fermentation, emulsification, thickening, and how time, temperature, moisture, and geometry transform food.",
    ),
    active(
      "humanities.culinary-arts.recipes",
      "Recipe Library",
      "/humanities/culinary-arts/recipes",
      "Explore complete preparations as records of proportion, technique, sequence, timing, sensory targets, variation, context, and serving rather than as isolated lists of instructions.",
    ),
    planned(
      "humanities.culinary-arts.fundamentals",
      "Kitchen Fundamentals",
      "/humanities/culinary-arts/fundamentals",
      "Build foundational practice in mise en place, knife and tool use, measurement, seasoning, tasting, timing, food safety, storage, cleaning, workflow, communication, and coordinated service.",
    ),
  ],
};
