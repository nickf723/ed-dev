import { promises as fs } from "node:fs";
import path from "node:path";
import {
  parsePageFoundryQueue,
  type PageFoundryQueue,
} from "@/lib/page-foundry/schema";

const FOUNDRY_FILE = "content/page-foundry/queue.json";

function resolveFoundryPath() {
  const root = process.cwd();
  const contentRoot = path.resolve(root, "content", "page-foundry");
  const target = path.resolve(root, FOUNDRY_FILE);
  if (!target.startsWith(`${contentRoot}${path.sep}`)) {
    throw new Error("Page Foundry path escaped its approved directory");
  }
  return target;
}

export async function readPageFoundryQueue(): Promise<PageFoundryQueue> {
  const source = await fs.readFile(resolveFoundryPath(), "utf8");
  return parsePageFoundryQueue(JSON.parse(source));
}

export async function writePageFoundryQueue(input: unknown): Promise<PageFoundryQueue> {
  const queue = parsePageFoundryQueue(input);
  const target = resolveFoundryPath();
  const backupDirectory = path.resolve(process.cwd(), ".next", "studio-backups");
  await fs.mkdir(backupDirectory, { recursive: true });
  try {
    const existing = await fs.readFile(target, "utf8");
    await fs.writeFile(
      path.join(backupDirectory, `page-foundry-${Date.now()}.json`),
      existing,
      "utf8",
    );
  } catch (error) {
    const code = error instanceof Error && "code" in error ? String(error.code) : "";
    if (code !== "ENOENT") throw error;
  }
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, `${JSON.stringify(queue, null, 2)}\n`, "utf8");
  return queue;
}
