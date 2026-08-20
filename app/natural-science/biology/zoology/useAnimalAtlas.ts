"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AnimalRecord } from "./zoology-data";

type ApiPayload = {
  mode?: "collection" | "search";
  collectionId?: string;
  query?: string;
  animals?: AnimalRecord[];
  error?: string;
};

type AtlasMode =
  | { kind: "collection"; collectionId: string }
  | { kind: "search"; query: string };

const atlasCache = new Map<string, AnimalRecord[]>();

export function useAnimalAtlas(collectionId: string) {
  const [animals, setAnimals] = useState<AnimalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<AtlasMode>({
    kind: "collection",
    collectionId,
  });
  const requestRef = useRef<AbortController | null>(null);

  const load = useCallback(async (nextMode: AtlasMode, force = false) => {
    const key =
      nextMode.kind === "collection"
        ? `collection:${nextMode.collectionId}`
        : `search:${nextMode.query.toLocaleLowerCase()}`;

    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    setMode(nextMode);
    setError(null);

    if (!force) {
      const cached = atlasCache.get(key);
      if (cached) {
        setAnimals(cached);
        setLoading(false);
        return;
      }
    }

    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (nextMode.kind === "collection") {
        params.set("collection", nextMode.collectionId);
      } else {
        params.set("q", nextMode.query);
      }

      const response = await fetch(`/api/zoology/taxa?${params.toString()}`, {
        signal: controller.signal,
      });
      const payload = (await response.json()) as ApiPayload;
      if (!response.ok) {
        throw new Error(payload.error || "Unable to load the animal collection.");
      }

      const records = payload.animals ?? [];
      atlasCache.set(key, records);
      setAnimals(records);
    } catch (reason) {
      if (reason instanceof DOMException && reason.name === "AbortError") return;
      setError(
        reason instanceof Error
          ? reason.message
          : "Unable to load the animal collection.",
      );
      setAnimals([]);
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load({ kind: "collection", collectionId });
    return () => requestRef.current?.abort();
  }, [collectionId, load]);

  const search = useCallback(
    async (query: string) => {
      const trimmed = query.trim();
      if (!trimmed) return;
      await load({ kind: "search", query: trimmed });
    },
    [load],
  );

  const clearSearch = useCallback(async () => {
    await load({ kind: "collection", collectionId });
  }, [collectionId, load]);

  const refresh = useCallback(async () => {
    await load(mode, true);
  }, [load, mode]);

  return {
    animals,
    loading,
    error,
    mode,
    search,
    clearSearch,
    refresh,
  };
}

// Kept for older imports while the Zoology branch finishes migrating.
export const useWikiZoo = useAnimalAtlas;
export type { AnimalRecord } from "./zoology-data";
