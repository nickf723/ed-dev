import { promises as fs } from "node:fs";
import path from "node:path";
import { PAGE_RECIPE_CATALOG, getPageRecipeCatalogEntry } from "@/lib/page-system/catalog";
import { parsePageRecipe, type PageRecipe } from "@/lib/page-system/schema";

function resolveRecipePath(file: string) {
  const root = process.cwd();
  const contentRoot = path.resolve(root, "content", "pages");
  const target = path.resolve(root, file);
  const allowedPrefix = `${contentRoot}${path.sep}`;

  if (target !== contentRoot && !target.startsWith(allowedPrefix)) {
    throw new Error(`Recipe path escapes the approved content directory: ${file}`);
  }

  return target;
}

export async function readPageRecipe(id: string): Promise<PageRecipe> {
  const entry = getPageRecipeCatalogEntry(id);
  if (!entry) throw new Error(`Unknown page recipe: ${id}`);

  const target = resolveRecipePath(entry.file);
  const source = await fs.readFile(target, "utf8");
  return parsePageRecipe(JSON.parse(source));
}

export async function readAllPageRecipes(): Promise<PageRecipe[]> {
  return Promise.all(PAGE_RECIPE_CATALOG.map((entry) => readPageRecipe(entry.id)));
}

export async function writePageRecipe(id: string, input: unknown): Promise<PageRecipe> {
  const entry = getPageRecipeCatalogEntry(id);
  if (!entry) throw new Error(`Unknown page recipe: ${id}`);

  const recipe = parsePageRecipe(input);
  if (recipe.id !== id) {
    throw new Error(`Recipe id ${recipe.id} does not match requested id ${id}`);
  }

  const target = resolveRecipePath(entry.file);
  const backupDirectory = path.resolve(process.cwd(), ".next", "studio-backups");
  await fs.mkdir(backupDirectory, { recursive: true });

  try {
    const existing = await fs.readFile(target, "utf8");
    const safeId = id.replace(/[^a-z0-9.-]+/gi, "-");
    await fs.writeFile(
      path.join(backupDirectory, `${safeId}-${Date.now()}.json`),
      existing,
      "utf8",
    );
  } catch (error) {
    const code = error instanceof Error && "code" in error ? String(error.code) : "";
    if (code !== "ENOENT") throw error;
  }

  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, `${JSON.stringify(recipe, null, 2)}\n`, "utf8");
  return recipe;
}
