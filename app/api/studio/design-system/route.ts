import { NextResponse } from "next/server";
import { writeGlobalDesignSystem } from "@/lib/design-system/server";

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Studio writes are development-only" }, { status: 404 });
  }

  try {
    const payload = (await request.json()) as { designSystem?: unknown };
    const designSystem = await writeGlobalDesignSystem(payload.designSystem);
    return NextResponse.json({ ok: true, designSystem });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to save global design system" },
      { status: 400 },
    );
  }
}
