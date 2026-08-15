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

export function resolvePageRecipe(recipe: PageRecipe): PageRecipe {
  const context = getCurriculumPageContext(recipe.nodeId);
  const organization =
    recipe.organization.kind === "multiple-lenses"
      ? {
          ...recipe.organization,
          items: recipe.organization.items.map((item): LensItem => resolveLink(item)),
        }
      : {
          ...recipe.organization,
          groups: recipe.organization.groups.map(
            (group): RegimeGroup => ({
              ...group,
              items: group.items.map((item) => resolveLink(item)),
            }),
          ),
        };

  return {
    ...recipe,
    identity: {
      ...recipe.identity,
      breadcrumbs: context?.breadcrumbs ?? recipe.identity.breadcrumbs,
    },
    organization,
  };
}
