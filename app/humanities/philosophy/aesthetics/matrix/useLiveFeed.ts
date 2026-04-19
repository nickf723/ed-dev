import { useState, useEffect } from 'react';
import { AestheticItem } from '../data/aesthetics';

export function useLiveFeed(item: AestheticItem | null, collectionId?: string) {
  const [liveUrl, setLiveUrl] = useState<string | null>(null);

  useEffect(() => {
    // Keep the argument in the signature for call-site compatibility.
    void collectionId;

    // Reset when item changes
    setLiveUrl(null);
    
    if (!item) return;

    // AestheticItem currently stores the display image directly.
    if (item.imageUrl) {
      setLiveUrl(item.imageUrl);
    }
  }, [item, collectionId]);

  return liveUrl;
}