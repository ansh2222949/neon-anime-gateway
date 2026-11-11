/**
 * Stremio Addon Protocol Adapter
 * Exposes full catalog, metadata, and stream resolution for Stremio (Desktop, Mobile, Android TV).
 */

import { getTrendingAnime, searchAnime, getAnimeDetails } from '../services/anilist.js';
import { resolveStreams } from '../services/providerEngine.js';

export function getStremioManifest() {
  return {
    id: 'org.neonanime.gateway',
    version: '1.0.0',
    name: 'Neon Anime Gateway',
    description: 'High-performance Anime discovery, metadata, and streaming resolver for Neon & Stremio.',
    logo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    resources: ['catalog', 'meta', 'stream'],
    types: ['series', 'movie'],
    idPrefixes: ['neon_anime_'],
    catalogs: [
      {
        type: 'series',
        id: 'neon_anime_trending',
        name: 'Neon Anime — Trending',
        extra: [
          { name: 'search', isRequired: false },
          { name: 'genre', isRequired: false, options: ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Romance', 'Sci-Fi'] },
          { name: 'skip', isRequired: false }
        ]
      }
    ],
    behaviorHints: {
      configurable: true,
      configurationRequired: false
    }
  };
}

export async function handleStremioCatalog(type: string, id: string, search?: string) {
  let items: any[] = [];

  if (search) {
    const res = await searchAnime(search, 1, 30);
    items = res.media;
  } else {
    const res = await getTrendingAnime(1, 30);
    items = res.media;
  }

  const metas = items.map(anime => ({
    id: `neon_anime_${anime.id}`,
    type: anime.format === 'MOVIE' ? 'movie' : 'series',
    name: anime.title.english || anime.title.romaji,
    poster: anime.coverImage.extraLarge || anime.coverImage.large,
    posterShape: 'poster',
    banner: anime.bannerImage,
    genres: anime.genres,
    releaseInfo: anime.seasonYear ? `${anime.seasonYear}` : undefined,
    imdbRating: anime.averageScore ? `${(anime.averageScore / 10).toFixed(1)}` : undefined,
    description: anime.description
  }));

  return { metas };
}

export async function handleStremioMeta(type: string, id: string) {
  const animeId = parseInt(id.replace('neon_anime_', ''), 10);
  if (isNaN(animeId)) return { meta: null };

  const anime = await getAnimeDetails(animeId);
  if (!anime) return { meta: null };

  const totalEpisodes = anime.episodes || 12;
  const videos = [];

  for (let i = 1; i <= totalEpisodes; i++) {
    videos.push({
      id: `neon_anime_${anime.id}:${i}`,
      title: `Episode ${i}`,
      season: 1,
      episode: i,
      released: new Date().toISOString()
    });
  }

  return {
    meta: {
      id: `neon_anime_${anime.id}`,
      type: anime.format === 'MOVIE' ? 'movie' : 'series',
      name: anime.title.english || anime.title.romaji,
      poster: anime.coverImage.extraLarge || anime.coverImage.large,
      banner: anime.bannerImage,
      genres: anime.genres,
      year: anime.seasonYear,
      imdbRating: anime.averageScore ? `${(anime.averageScore / 10).toFixed(1)}` : undefined,
      description: anime.description,
      videos: anime.format === 'MOVIE' ? undefined : videos
    }
  };
}

export async function handleStremioStream(type: string, id: string) {
  // ID format: neon_anime_153518:1 (animeId:episode)
  const parts = id.replace('neon_anime_', '').split(':');
  const animeId = parseInt(parts[0], 10);
  const episode = parts.length > 1 ? parseInt(parts[1], 10) : 1;

  if (isNaN(animeId)) return { streams: [] };

  const sources = await resolveStreams(animeId, episode);

  const streams = sources.map(s => ({
    name: `[Neon] ${s.server}`,
    title: `${s.title}\nQuality: ${s.quality} • ${s.format.toUpperCase()}`,
    url: s.url,
    behaviorHints: {
      notWebReady: false
    }
  }));

  return { streams };
}
