"use client";
import React, { useState, useEffect } from "react";
import { Loader2, BookOpen, Link as LinkIcon, Image as ImageIcon } from "lucide-react";

interface VisualMediaProps {
  // MODE 1: Search Query (Wikipedia or Custom Wiki)
  query?: string;
  // MODE 2: Direct URL (Overrides query)
  src?: string; 
  alt: string;
  className?: string;
  // CONFIG: Which Wiki API to hit? (Defaults to Wikipedia)
  wikiEndpoint?: string; 
  // STYLE: How should the image sit? ('cover' = fill, 'contain' = whole image)
  fit?: "cover" | "contain";
}

export default function GlobalVisualMedia({ 
  query, 
  src: directSrc, 
  alt, 
  className = "", 
  wikiEndpoint = "https://en.wikipedia.org/w/api.php",
  fit = "cover" 
}: VisualMediaProps) {
  
  const [fetchedSrc, setFetchedSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(!!query && !directSrc);
  const [error, setError] = useState(false);

  // Determine active source: Direct URL takes priority over fetched
  const finalSrc = directSrc || fetchedSrc;

  useEffect(() => {
    if (directSrc || !query) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    
    const fetchWikiImage = async () => {
        setLoading(true);
        setError(false);
        
        try {
            // STEP 1: Search for the Page ID on the specific Wiki
            const searchUrl = `${wikiEndpoint}?action=query&format=json&list=search&srsearch=${encodeURIComponent(query)}&srlimit=1&origin=*`;
            const searchRes = await fetch(searchUrl);
            const searchJson = await searchRes.json();

            if (!searchJson.query?.search?.length) {
                throw new Error("No Article Found");
            }

            const pageId = searchJson.query.search[0].pageid;

            // STEP 2: Fetch Image using Page ID
            // We request 'pageimages' to get the main thumbnail
            const imgUrl = `${wikiEndpoint}?action=query&format=json&prop=pageimages&pithumbsize=1000&pageids=${pageId}&origin=*`;
            const imgRes = await fetch(imgUrl);
            const imgJson = await imgRes.json();
            
            const pages = imgJson.query?.pages;
            const pageData = pages ? pages[pageId] : null;

            if (pageData && pageData.thumbnail) {
                if (isMounted) setFetchedSrc(pageData.thumbnail.source);
            } else {
                throw new Error("Article exists, but has no image");
            }

        } catch (err) {
            console.warn(`Visual Fetch Failed: ${query}`, err);
            if (isMounted) setError(true);
        } finally {
            if (isMounted) setLoading(false);
        }
    };

    fetchWikiImage();

    return () => { isMounted = false; };
  }, [query, directSrc, wikiEndpoint]);

  return (
    <div className={`relative overflow-hidden bg-stone-900/50 w-full h-full ${className}`}>
      
      {/* 1. LOADING STATE */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-950/80 backdrop-blur-sm z-20">
          <Loader2 className="animate-spin text-cyan-500" size={20} />
        </div>
      )}

      {/* 2. ERROR / EMPTY STATE */}
      {(error || (!loading && !finalSrc)) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-950 z-10 p-4 text-center border border-white/5">
            <BookOpen className="text-stone-800 mb-2" size={24} />
            <div className="text-[8px] font-mono text-stone-700 uppercase tracking-widest">
                No Visual
            </div>
            {query && <div className="mt-1 text-[8px] font-bold text-stone-800 truncate max-w-[80%] opacity-50">{query}</div>}
        </div>
      )}

      {/* 3. THE IMAGE */}
      {finalSrc && !loading && (
        <>
            <img
                src={finalSrc}
                alt={alt}
                className={`w-full h-full animate-in fade-in duration-700 ${fit === 'contain' ? 'object-contain p-2' : 'object-cover'}`}
            />
            
            {/* Source Indicator (Subtle Badge) */}
            {directSrc && (
                <div className="absolute top-2 right-2 p-1 bg-black/60 rounded text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <LinkIcon size={10} />
                </div>
            )}
            {!directSrc && fetchedSrc && (
                <div className="absolute top-2 right-2 p-1 bg-black/60 rounded text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <BookOpen size={10} />
                </div>
            )}
        </>
      )}
      
      {/* Overlay for depth (only on cover mode to avoid darkening contained diagrams) */}
      {fit === 'cover' && <div className="absolute inset-0 bg-black/10 pointer-events-none" />}

    </div>
  );
}