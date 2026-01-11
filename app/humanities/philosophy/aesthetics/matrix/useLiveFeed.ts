import { useState, useEffect } from 'react';
import { AestheticItem } from '../data/aesthetics';

export function useLiveFeed(item: AestheticItem | null, collectionId?: string) {
  const [liveUrl, setLiveUrl] = useState<string | null>(null);

  useEffect(() => {
    // Reset when item changes
    setLiveUrl(null);
    
    if (!item || !collectionId) return;

    // If we have a manual local upload, use it instantly!
    if (item.localImage) {
        setLiveUrl(item.localImage);
        return;
    }

    // Otherwise, fetch from our new API
    const fetchImage = async () => {
      try {
        const res = await fetch(`/api/image-proxy?query=${encodeURIComponent(item.imageQuery)}&collectionId=${collectionId}`);
        const data = await res.json();
        if (data.url) setLiveUrl(data.url);
      } catch (e) {
        console.error("Failed to fetch live feed");
      }
    };

    fetchImage();
  }, [item, collectionId]);

  return liveUrl;
}