import type { CollectionMediaRecord, CollectionSource } from "../schema";

export type MetTag = { term?: string };

export type MetObject = {
  objectID: number;
  isPublicDomain?: boolean;
  primaryImage?: string;
  primaryImageSmall?: string;
  objectName?: string;
  title?: string;
  culture?: string;
  period?: string;
  dynasty?: string;
  reign?: string;
  artistRole?: string;
  artistDisplayName?: string;
  artistDisplayBio?: string;
  objectDate?: string;
  objectBeginDate?: number;
  objectEndDate?: number;
  medium?: string;
  dimensions?: string;
  creditLine?: string;
  city?: string;
  country?: string;
  region?: string;
  classification?: string;
  metadataDate?: string;
  objectURL?: string;
  tags?: MetTag[] | null;
  GalleryNumber?: string;
  department?: string;
};

export const MET_COLLECTION_SOURCE: Readonly<CollectionSource>;
export function buildMetSearchUrl(value: string): string;
export function buildMetObjectUrl(id: number | string): string;
export function normalizeMetObject(object: MetObject): CollectionMediaRecord;
