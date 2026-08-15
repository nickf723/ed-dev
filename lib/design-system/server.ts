import { promises as fs } from "node:fs";
import path from "node:path";
import {
  parseGlobalDesignSystem,
  type GlobalDesignSystem,
} from "@/lib/design-system/schema";

const DESIGN_SYSTEM_FILE = "content/design-system/globals.json";

function resolveDesignSystemPath() {
  const root = process.cwd();
  const contentRoot = path.resolve(root, "content", "design-system");
  const target = path.resolve(root, DESIGN_SYSTEM_FILE);
  const allowedPrefix = `${contentRoot}${path.sep}`;

  if (target !== contentRoot && !target.startsWith(allowedPrefix)) {
    throw new Error("Global design system path escaped its approved directory");
  }
  return target;
}

export async function readGlobalDesignSystem(): Promise<GlobalDesignSystem> {
  const source = await fs.readFile(resolveDesignSystemPath(), "utf8");
  return parseGlobalDesignSystem(JSON.parse(source));
}

export async function writeGlobalDesignSystem(
  input: unknown,
): Promise<GlobalDesignSystem> {
  const designSystem = parseGlobalDesignSystem(input);
  const target = resolveDesignSystemPath();
  const backupDirectory = path.resolve(process.cwd(), ".next", "studio-backups");
  await fs.mkdir(backupDirectory, { recursive: true });

  try {
    const existing = await fs.readFile(target, "utf8");
    await fs.writeFile(
      path.join(backupDirectory, `global-design-system-${Date.now()}.json`),
      existing,
      "utf8",
    );
  } catch (error) {
    const code =
      error instanceof Error && "code" in error ? String(error.code) : "";
    if (code !== "ENOENT") throw error;
  }

  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(
    target,
    `${JSON.stringify(designSystem, null, 2)}\n`,
    "utf8",
  );
  return designSystem;
}
