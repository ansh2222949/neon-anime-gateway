/**
 * AniList Public GraphQL Service
 * High-speed, official metadata provider for Neon Anime Gateway.
 * Zero API key required, 100% legal, and globally cached.
 */

import { MediaItem, AiringScheduleItem, CharacterItem, RecommendationItem } from '../types/index.js';

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

/**
 * Fetches the weekly airing schedule with real-time countdown timestamps.
 */
export async function getAiringSchedule(daysAhead = 7, perPage = 30): Promise<AiringScheduleItem[]> {
  const now = Math.floor(Date.now() / 1000);
  const future = now + daysAhead * 86400;

  const query = `
    query ($now: Int, $future: Int, $perPage: Int) {
      Page(page: 1, perPage: $perPage) {
        airingSchedules(airingAt_greater: $now, airingAt_lesser: $future, sort: TIME) {
          id
          airingAt
          timeUntilAiring
          episode
          media {
            id
            title {
              romaji
              english
              native
            }
            format
            coverImage {
              large
              extraLarge
            }
            genres
            averageScore
          }
        }
      }
    }
  `;

  try {
    const data = await fetchAniList<any>(query, { now, future, perPage });
    const schedules = data.Page?.airingSchedules || [];
    return schedules.map((s: any) => ({
      id: s.id,
      airingAt: s.airingAt,
      timeUntilAiring: s.timeUntilAiring,
      episode: s.episode,
      media: {
        id: s.media.id,
        title: s.media.title,
        format: s.media.format,
        coverImage: s.media.coverImage,
        genres: s.media.genres || [],
        averageScore: s.media.averageScore || null,
      }
    }));
  } catch (err) {
    console.error('Failed to fetch airing schedule:', err);
    return [];
  }
}

/**
 * Fetches character cast with Japanese Voice Actors (Seiyuu) and similar recommendations.
 */
export async function getAnimeCastAndRecommendations(id: number): Promise<{ characters: CharacterItem[]; recommendations: RecommendationItem[] }> {
  const query = `
    query ($id: Int) {
      Media(id: $id) {
        characters(sort: ROLE, perPage: 10) {
          edges {
            role
            node {
              id
              name {
                full
              }
              image {
                large
              }
            }
            voiceActors(language: JAPANESE) {
              id
              name {
                full
              }
              image {
                large
              }
              language
            }
          }
        }
        recommendations(sort: RATING_DESC, perPage: 8) {
          nodes {
            mediaRecommendation {
              id
              title {
                romaji
                english
              }
              format
              coverImage {
                large
              }
              averageScore
            }
          }
        }
      }
    }
  `;

  try {
    const data = await fetchAniList<any>(query, { id });
    const rawChars = data.Media?.characters?.edges || [];
    const characters: CharacterItem[] = rawChars.map((edge: any) => {
      const va = edge.voiceActors?.[0];
      return {
        id: edge.node.id,
        name: edge.node.name.full,
        role: edge.role || 'MAIN',
        image: edge.node.image?.large || '',
        voiceActor: va ? {
          id: va.id,
          name: va.name.full,
          image: va.image?.large || '',
          language: va.language || 'Japanese',
        } : null,
      };
    });

    const rawRecs = data.Media?.recommendations?.nodes || [];
    const recommendations: RecommendationItem[] = rawRecs
      .filter((n: any) => n.mediaRecommendation)
      .map((n: any) => ({
        id: n.mediaRecommendation.id,
        title: n.mediaRecommendation.title.english || n.mediaRecommendation.title.romaji,
        coverImage: n.mediaRecommendation.coverImage?.large || '',
        averageScore: n.mediaRecommendation.averageScore,
        format: n.mediaRecommendation.format || 'TV',
      }));

    return { characters, recommendations };
  } catch (err) {
    console.error('Failed to fetch cast/recs:', err);
    return { characters: [], recommendations: [] };
  }
}
