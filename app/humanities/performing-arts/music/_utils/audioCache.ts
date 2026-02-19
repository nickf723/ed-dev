"use client";

/**
 * Tiny cache for "do we know this URL is real?"
 * When a sampler tries to load 40+ files, it’s nice to avoid repeating bad URLs.
 */
type UrlStatus = "ok" | "missing";

const statusCache = new Map<string, UrlStatus>();

export async function probeUrl(url: string): Promise<UrlStatus> {
  const cached = statusCache.get(url);
  if (cached) return cached;

  try {
    // HEAD is enough for existence, faster than GET
    const res = await fetch(url, { method: "HEAD", cache: "force-cache" });
    const status: UrlStatus = res.ok ? "ok" : "missing";
    statusCache.set(url, status);
    return status;
  } catch {
    statusCache.set(url, "missing");
    return "missing";
  }
}

export function clearAudioUrlProbeCache() {
  statusCache.clear();
}