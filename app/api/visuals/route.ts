import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const collectionId = searchParams.get('collectionId');

  const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
  
  // We search WITHIN your specific collection to ensure academic quality
  const unsplashUrl = `https://api.unsplash.com/search/photos?query=${query}&collections=${collectionId}&client_id=${ACCESS_KEY}&per_page=1`;

  const res = await fetch(unsplashUrl);
  const data = await res.json();
  
  return NextResponse.json(data.results[0]?.urls?.regular || null);
}