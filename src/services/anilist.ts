/**
 * AniList Public GraphQL Service
 * High-speed, official metadata provider for Neon Anime Gateway.
 * Zero API key required, 100% legal, and globally cached.
 */

import { MediaItem } from '../types/index.js';

const ANILIST_GRAPHQL_ENDPOINT = 'https://graphql.anilist.co';

const MEDIA_FIELDS = `
  id
  title {
    romaji
    english
    native
  }
  format
  status
  episodes
  duration
  description(asHtml: false)
  seasonYear
  genres
  averageScore
  popularity
  coverImage {
    extraLarge
    large
    medium
    color
  }
  bannerImage
  trailer {
    id
    site
    thumbnail
  }
  studios(isMain: true) {
    nodes {
      name
    }
  }
  nextAiringEpisode {
    airingAt
    timeUntilAiring
    episode
  }
`;

async function fetchAniList<T>(query: string, variables: Record<string, any> = {}): Promise<T> {
  const resp = await fetch(ANILIST_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'Neon-Anime-Gateway/1.0',
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!resp.ok) {
    throw new Error(`AniList GraphQL error: ${resp.status} ${resp.statusText}`);
  }

  const json: any = await resp.json();
  if (json.errors && json.errors.length > 0) {
    throw new Error(`AniList query error: ${json.errors[0].message}`);
  }

  return json.data;
}

function normalizeMedia(raw: any): MediaItem {
  return {
    id: raw.id,
    title: {
      romaji: raw.title?.romaji || 'Unknown',
      english: raw.title?.english || null,
      native: raw.title?.native || null,
    },
    format: raw.format || 'TV',
    status: raw.status || 'FINISHED',
    episodes: raw.episodes || null,
    duration: raw.duration || null,
    description: (raw.description || 'No synopsis available.').replace(/<[^>]*>/g, '').trim(),
    seasonYear: raw.seasonYear || null,
    genres: raw.genres || [],
    averageScore: raw.averageScore || null,
    popularity: raw.popularity || null,
    coverImage: {
      extraLarge: raw.coverImage?.extraLarge || '',
      large: raw.coverImage?.large || '',
      medium: raw.coverImage?.medium || '',
      color: raw.coverImage?.color || '#00f0ff',
    },
    bannerImage: raw.bannerImage || raw.coverImage?.extraLarge || null,
    trailer: raw.trailer?.id ? {
      id: raw.trailer.id,
      site: raw.trailer.site || 'youtube',
      thumbnail: raw.trailer.thumbnail || `https://i.ytimg.com/vi/${raw.trailer.id}/hqdefault.jpg`,
    } : null,
    studios: raw.studios?.nodes?.map((s: any) => s.name) || [],
    nextAiringEpisode: raw.nextAiringEpisode || null,
  };
}

export async function getTrendingAnime(page = 1, perPage = 20): Promise<{ media: MediaItem[]; pageInfo: any }> {
  const query = `
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          hasNextPage
        }
        media(type: ANIME, sort: TRENDING_DESC, isAdult: false) {
          ${MEDIA_FIELDS}
        }
      }
    }
  `;

  const data = await fetchAniList<any>(query, { page, perPage });
  return {
    media: (data.Page.media || []).map(normalizeMedia),
    pageInfo: data.Page.pageInfo,
  };
}

export async function searchAnime(q: string, page = 1, perPage = 20): Promise<{ media: MediaItem[]; pageInfo: any }> {
  const query = `
    query ($search: String, $page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          hasNextPage
        }
        media(type: ANIME, search: $search, sort: SEARCH_MATCH, isAdult: false) {
          ${MEDIA_FIELDS}
        }
      }
    }
  `;

  const data = await fetchAniList<any>(query, { search: q, page, perPage });
  return {
    media: (data.Page.media || []).map(normalizeMedia),
    pageInfo: data.Page.pageInfo,
  };
}

export async function getAnimeDetails(id: number): Promise<MediaItem | null> {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        ${MEDIA_FIELDS}
      }
    }
  `;

  try {
    const data = await fetchAniList<any>(query, { id });
    if (!data.Media) return null;
    return normalizeMedia(data.Media);
  } catch {
    return null;
  }
}

export async function getTopRatedAnime(page = 1, perPage = 20): Promise<{ media: MediaItem[]; pageInfo: any }> {
  const query = `
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          hasNextPage
        }
        media(type: ANIME, sort: SCORE_DESC, isAdult: false) {
          ${MEDIA_FIELDS}
        }
      }
    }
  `;

  const data = await fetchAniList<any>(query, { page, perPage });
  return {
    media: (data.Page.media || []).map(normalizeMedia),
    pageInfo: data.Page.pageInfo,
  };
}
