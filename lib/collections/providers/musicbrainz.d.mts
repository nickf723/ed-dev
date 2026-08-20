import type { CollectionMediaRecord, CollectionSource } from "../schema";

export type MusicBrainzArtistCredit = {
  name?: string;
  joinphrase?: string;
  artist?: { id?: string; name?: string };
};

export type MusicBrainzReleaseGroup = {
  id: string;
  title?: string;
  "first-release-date"?: string;
  "primary-type"?: string;
  "secondary-types"?: string[];
  "artist-credit"?: MusicBrainzArtistCredit[];
};

export const MUSICBRAINZ_SOURCE: Readonly<CollectionSource>;
export const COVER_ART_ARCHIVE_SOURCE: Readonly<CollectionSource>;
export function buildMusicBrainzSearchQuery(value: string): string;
export function normalizeMusicBrainzReleaseGroup(group: MusicBrainzReleaseGroup): CollectionMediaRecord;
