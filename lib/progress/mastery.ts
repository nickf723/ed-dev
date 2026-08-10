import { curriculumRegistry } from "@/lib/curriculum/registry";

const STORAGE_KEY = "educationstation64:mastery";
const CHANGE_EVENT = "educationstation64:mastery-change";

export type MasteryEntry = {
  nodeId: string;
  masteredAt: string;
};

export type MasterySnapshot = {
  version: 1;
  mastered: Record<string, MasteryEntry>;
};

const emptySnapshot = (): MasterySnapshot => ({ version: 1, mastered: {} });

function sanitizeSnapshot(value: unknown): MasterySnapshot {
  if (!value || typeof value !== "object") return emptySnapshot();
  const candidate = value as Partial<MasterySnapshot>;
  if (candidate.version !== 1 || !candidate.mastered || typeof candidate.mastered !== "object") {
    return emptySnapshot();
  }

  const mastered = Object.fromEntries(
    Object.entries(candidate.mastered).filter(([nodeId, entry]) => {
      if (!curriculumRegistry.getNode(nodeId) || !entry || typeof entry !== "object") return false;
      const candidateEntry = entry as Partial<MasteryEntry>;
      return candidateEntry.nodeId === nodeId && typeof candidateEntry.masteredAt === "string";
    }),
  ) as Record<string, MasteryEntry>;

  return { version: 1, mastered };
}

export function readMastery(): MasterySnapshot {
  if (typeof window === "undefined") return emptySnapshot();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? sanitizeSnapshot(JSON.parse(raw)) : emptySnapshot();
  } catch {
    return emptySnapshot();
  }
}

function writeMastery(snapshot: MasterySnapshot): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function isNodeMastered(nodeId: string, snapshot = readMastery()): boolean {
  return Boolean(snapshot.mastered[nodeId]);
}

export function isNodeUnlocked(nodeId: string, snapshot = readMastery()): boolean {
  const node = curriculumRegistry.getNode(nodeId);
  if (!node) return false;
  return (node.prerequisiteIds ?? []).every((id) => isNodeMastered(id, snapshot));
}

export function setNodeMastered(nodeId: string, mastered: boolean): MasterySnapshot {
  const node = curriculumRegistry.getNode(nodeId);
  if (!node) throw new Error(`Cannot update mastery for unknown curriculum node ${nodeId}`);

  const snapshot = readMastery();
  const nextMastered = { ...snapshot.mastered };

  if (mastered) {
    if (!isNodeUnlocked(nodeId, snapshot)) return snapshot;
    nextMastered[nodeId] = { nodeId, masteredAt: new Date().toISOString() };
  } else {
    delete nextMastered[nodeId];
  }

  const next: MasterySnapshot = { version: 1, mastered: nextMastered };
  writeMastery(next);
  return next;
}

export function subscribeToMastery(callback: () => void): () => void {
  if (typeof window === "undefined") return () => undefined;

  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) callback();
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}
