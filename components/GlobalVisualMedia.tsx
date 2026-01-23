"use client";
import React, { useState, useEffect } from "react";
import { Loader2, BookOpen } from "lucide-react";

interface VisualMediaProps {
  query: string;
  alt: string;
  className?: string;
}

export default function GlobalVisualMedia({ query, alt, className = "" }: VisualMediaProps) {
  const [src, setSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const fetchWikiImage = async () => {
        setLoading(true);
        setError(false);
        
        try {
            // STEP 1: Search for the Page ID
            // "Golden Gate Bridge construction" -> Page ID 12345
            const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${encodeURIComponent(query)}&srlimit=1&origin=*`;
            const searchRes = await fetch(searchUrl);
            const searchJson = await searchRes.json();

            if (!searchJson.query?.search?.length) {
                throw new Error("No Article Found");
            }

            const pageId = searchJson.query.search[0].pageid;

            // STEP 2: Fetch Image using Page ID (The Robust Way)
            // We ask for the 'original' image source or a thumbnail
            const imgUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&pithumbsize=800&pageids=${pageId}&origin=*`;
            const imgRes = await fetch(imgUrl);
            const imgJson = await imgRes.json();
            
            const pages = imgJson.query?.pages;
            const pageData = pages ? pages[pageId] : null;

            if (pageData && pageData.thumbnail) {
                if (isMounted) setSrc(pageData.thumbnail.source);
            } else {
                throw new Error("Article exists, but has no image");
            }

        } catch (err) {
            // console.warn(`Wiki Image Failed for: ${query}`, err);
            if (isMounted) setError(true);
        } finally {
            if (isMounted) setLoading(false);
        }
    };

    fetchWikiImage();

    return () => { isMounted = false; };
  }, [query]);

  return (
    <div className={`relative overflow-hidden bg-stone-900/50 w-full h-full ${className}`}>
      
      {/* 1. LOADING STATE */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-950/80 backdrop-blur-sm z-10">
          <Loader2 className="animate-spin text-cyan-500" size={20} />
        </div>
      )}

      {/* 2. ERROR / NO IMAGE STATE */}
      {(error || (!loading && !src)) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-950 z-10 p-4 text-center border border-white/5">
            <BookOpen className="text-stone-800 mb-2" size={24} />
            <div className="text-[8px] font-mono text-stone-700 uppercase tracking-widest">
                No Archive Visual
            </div>
            {/* Debug Info */}
            <div className="mt-1 text-[8px] font-bold text-stone-800 truncate max-w-[80%] opacity-50">
                {query}
            </div>
        </div>
      )}

      {/* 3. THE IMAGE */}
      {src && !loading && (
        <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover animate-in fade-in duration-700"
        />
      )}
      
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

    </div>
  );
}