// app/hooks/useAestheticAPI.ts
import { useState, useEffect } from 'react';

// REAL Unsplash Image IDs to ensure the vibe is perfect for the demo
const MOCK_DB: Record<string, string[]> = {
  "steampunk": [
    "https://images.unsplash.com/photo-1535581652167-3d6b98c36cd9?auto=format&fit=crop&q=80&w=800", // Clockwork
    "https://images.unsplash.com/photo-1625686008630-3c139c5b2075?auto=format&fit=crop&q=80&w=800", // Brass
    "https://images.unsplash.com/photo-1502484433091-6670868112eb?auto=format&fit=crop&q=80&w=800", // Vintage Train
  ],
  "dark-fantasy": [
    "https://images.unsplash.com/photo-1599940824399-b87987ce179a?auto=format&fit=crop&q=80&w=800", // Foggy Forest
    "https://images.unsplash.com/photo-1535585102257-6c3482782b54?auto=format&fit=crop&q=80&w=800", // Castle
    "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?auto=format&fit=crop&q=80&w=800", // Gothic
  ],
  "cyberpunk": [
    "https://images.unsplash.com/photo-1515630278258-407f66498911?auto=format&fit=crop&q=80&w=800", // Neon
    "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=800", // Rainy City
    "https://images.unsplash.com/photo-1605218427306-635ba2439af2?auto=format&fit=crop&q=80&w=800", // Lasers
  ],
  "cottagecore": [
    "https://images.unsplash.com/photo-1595166663246-817812978051?auto=format&fit=crop&q=80&w=800", // Picnic
    "https://images.unsplash.com/photo-1560717845-968823efbee1?auto=format&fit=crop&q=80&w=800", // Baking
    "https://images.unsplash.com/photo-1466853817435-05b43fe45b39?auto=format&fit=crop&q=80&w=800", // Meadow
  ],
  "vaporwave": [
    "https://images.unsplash.com/photo-1515405295579-ba7b45498955?auto=format&fit=crop&q=80&w=800", // Neon Pink
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800", // Retro
    "https://images.unsplash.com/photo-1506456077382-749e79354728?auto=format&fit=crop&q=80&w=800", // Glitch
  ],
  "k-pop": [
    "https://images.unsplash.com/photo-1514525253440-b393452e233e?auto=format&fit=crop&q=80&w=800", // Colorful
    "https://images.unsplash.com/photo-1496348323742-91155dc878c4?auto=format&fit=crop&q=80&w=800", // Fashion
    "https://images.unsplash.com/photo-1533512930330-4ac257c86793?auto=format&fit=crop&q=80&w=800", // Concert
  ]
};

export function useAestheticAPI(aestheticId: string) {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Simulate API delay
    const timer = setTimeout(() => {
        setImages(MOCK_DB[aestheticId] || []);
        setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [aestheticId]);

  return { images, loading };
}