import { NextResponse } from "next/server";
import { writePageFoundryQueue } from "@/lib/page-foundry/server";

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  try {
    const body = (await request.json()) as { queue?: unknown };
    const queue = await writePageFoundryQueue(body.queue);
    return NextResponse.json({ ok: true, queue });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to save Page Foundry queue",
      },
      { status: 400 },
    );
  }
}
