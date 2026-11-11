/**
 * Neon Anime Gateway — Core Type Definitions
 * Clean Architecture contracts for media items, airing schedules, character cast, and stream resolvers.
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

export interface AiringScheduleItem {
  id: number;
  airingAt: number; // Unix epoch seconds
  timeUntilAiring: number; // seconds remaining
  episode: number;
  media: {
    id: number;
    title: MediaTitle;
    format: string;
    coverImage: {
      large: string;
      extraLarge: string;
    };
    genres: string[];
    averageScore: number | null;
  };
}

export interface CharacterItem {
  id: number;
  name: string;
  role: string;
  image: string;
  voiceActor?: {
    id: number;
    name: string;
    image: string;
    language: string;
  } | null;
}

export interface RecommendationItem {
  id: number;
  title: string;
  coverImage: string;
  averageScore: number | null;
  format: string;
}

export interface AnimeTheme {
  type: 'OP' | 'ED';
  name: string;
  artist?: string;
  videoUrl?: string;
  audioUrl?: string;
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
  isFreeOfficial?: boolean;
  subtitles?: StreamSubtitle[];
  headers?: Record<string, string>;
}

export interface CommunityProvider {
  id: string;
  name: string;
  endpoint: string;
  enabled: boolean;
  priority: number;
}
