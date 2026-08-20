import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { readAllPageRecipes, writePageRecipe } from "@/lib/page-system/server";
import { validatePageRecipe } from "@/lib/page-system/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function unavailable() {
  return NextResponse.json({ ok: false, error: "Knowledge Studio is available only through next dev." }, { status: 404 });
}

export async function GET() {
  if (process.env.NODE_ENV !== "development") return unavailable();
  const recipes = await readAllPageRecipes();
  return NextResponse.json({ ok: true, recipes });
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") return unavailable();

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 1_000_000) {
    return NextResponse.json({ ok: false, error: "Recipe payload is too large." }, { status: 413 });
  }

  try {
    const body = (await request.json()) as { id?: unknown; recipe?: unknown };
    if (typeof body.id !== "string" || !body.id) {
      return NextResponse.json({ ok: false, error: "A recipe id is required." }, { status: 400 });
    }

    const validation = validatePageRecipe(body.recipe);
    if (!validation.ok) {
      return NextResponse.json({ ok: false, error: "Recipe validation failed.", errors: validation.errors }, { status: 400 });
    }

    const recipe = await writePageRecipe(body.id, body.recipe);
    revalidatePath("/studio");
    revalidatePath(recipe.route);

    return NextResponse.json({ ok: true, recipe, savedAt: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unable to save recipe." },
      { status: 500 },
    );
  }
}
