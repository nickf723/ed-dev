// _utils/audioCache.ts
const bufferCache: Record<string, AudioBuffer> = {};

export const AudioCache = {
  get: (key: string) => bufferCache[key],
  
  has: (key: string) => !!bufferCache[key],

  // Store by Custom Key (instrument:note) instead of URL
  load: async (ctx: AudioContext, url: string): Promise<AudioBuffer> => {
    // If we were just fetching by URL, we'd cache by URL.
    // But our hook manages the keys. 
    // This helper is for the FETCH part.
    
    // Check if URL is already cached (optional optimization)
    // Here we just fetch and return. The hook stores it in the Map.
    
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to load ${url}`);
    
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
    
    return audioBuffer;
  },
  
  // Set manually
  set: (key: string, buffer: AudioBuffer) => {
      bufferCache[key] = buffer;
  },
  
  // Helper for iteration
  keys: () => Object.keys(bufferCache)
};