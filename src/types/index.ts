/**
 * Neon Anime Gateway — Core Type Definitions
 * Clean Architecture contracts for media items, stream resolvers, and provider manifests.
 */

export interface MediaTitle {
  romaji: string;
  english: string | null;
  native: string | null;
}

export interface MediaTrailer {
  id: string | null;
  site: string | null;
  thumbnail: string | null;
}

export interface MediaItem {
  id: number;
  title: MediaTitle;
  format: string; // 'TV' | 'MOVIE' | 'OVA' | 'ONA' | 'SPECIAL'
  status: string; // 'FINISHED' | 'RELEASING' | 'NOT_YET_RELEASED'
  episodes: number | null;
  duration: number | null; // duration per episode in mins
  description: string;
  seasonYear: number | null;
  genres: string[];
  averageScore: number | null; // 0-100
  popularity: number | null;
  coverImage: {
    extraLarge: string;
    large: string;
    medium: string;
    color: string | null;
  };
  bannerImage: string | null;
  trailer: MediaTrailer | null;
  studios?: string[];
  nextAiringEpisode?: {
    airingAt: number;
    timeUntilAiring: number;
    episode: number;
  } | null;
}

export interface EpisodeInfo {
  number: number;
  title: string;
  thumbnail?: string;
  description?: string;
  airedAt?: string;
}

export interface StreamSubtitle {
  lang: string;
  url: string;
  label?: string;
  default?: boolean;
}

export interface StreamSource {
  title: string;
  url: string;
  quality: '1080p' | '720p' | '480p' | '360p' | 'auto';
  format: 'hls' | 'mp4' | 'dash';
  isM3U8: boolean;
  server: string;
  subtitles?: StreamSubtitle[];
  headers?: Record<string, string>;
}

export interface ProviderManifest {
  id: string;
  name: string;
  version: string;
  description: string;
  author?: string;
  types: ('anime' | 'manga' | 'movie' | 'music')[];
  icon?: string;
}

export interface CommunityProvider {
  id: string;
  name: string;
  endpoint: string; // URL to external community manifest or resolver
  enabled: boolean;
  priority: number;
}
