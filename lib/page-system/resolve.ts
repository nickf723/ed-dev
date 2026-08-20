import { GLOBAL_DESIGN_SYSTEM } from "@/lib/design-system/globals";
import { applyGlobalDesign } from "@/lib/design-system/resolve";
import type { GlobalDesignSystem } from "@/lib/design-system/schema";
import { getCurriculumPageContext } from "@/lib/curriculum/page-context";
import { curriculumRegistry } from "@/lib/curriculum/registry";
import type {
  LensItem,
  PageRecipe,
  RecipeLink,
  RegimeGroup,
} from "@/lib/page-system/schema";

function resolveLink<T extends RecipeLink>(link: T): T {
  if (!link.nodeId) return link;
  const node = curriculumRegistry.getNode(link.nodeId);
  if (!node) return link;

  return {
    ...link,
    label: link.label || node.label,
    summary: link.summary || node.description || "",
    href: node.href,
    status: node.status === "placeholder" ? "planned" : "active",
  };
}

export function resolvePageRecipe(
  recipe: PageRecipe,
  designSystem: GlobalDesignSystem = GLOBAL_DESIGN_SYSTEM,
): PageRecipe {
  const designed = applyGlobalDesign(recipe, designSystem);
  const context = getCurriculumPageContext(designed.nodeId);
  const organization =
    designed.organization.kind === "multiple-lenses"
      ? {
          ...designed.organization,
          items: designed.organization.items.map(
            (item): LensItem => resolveLink(item),
          ),
        }
      : {
          ...designed.organization,
          groups: designed.organization.groups.map(
            (group): RegimeGroup => ({
              ...group,
              items: group.items.map((item) => resolveLink(item)),
            }),
          ),
        };

  return {
    ...designed,
    identity: {
      ...designed.identity,
      breadcrumbs: context?.breadcrumbs
        ? [...context.breadcrumbs]
        : designed.identity.breadcrumbs,
    },
    organization,
  };
}
