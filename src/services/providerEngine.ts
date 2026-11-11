/**
 * Neon Provider Engine
 * Inspired by modular client architectures (like Zangetsu & Stremio),
 * this engine orchestrates stream resolution across built-in official preview providers
 * and user-configured dynamic community providers.
 */

import { StreamSource, CommunityProvider } from '../types/index.js';
import { getAnimeDetails } from './anilist.js';

// In-memory registered providers (can be augmented via environment variables or runtime headers)
const REGISTERED_PROVIDERS: CommunityProvider[] = [
  {
    id: 'official-preview',
    name: 'Official Anime Preview & Trailer Engine',
    endpoint: 'internal://official-preview',
    enabled: true,
    priority: 1,
  },
];

export function getRegisteredProviders(): CommunityProvider[] {
  return [...REGISTERED_PROVIDERS];
}

export function registerCommunityProvider(provider: Omit<CommunityProvider, 'enabled' | 'priority'>): boolean {
  if (REGISTERED_PROVIDERS.some(p => p.id === provider.id)) {
    return false;
  }
  REGISTERED_PROVIDERS.push({
    ...provider,
    enabled: true,
    priority: REGISTERED_PROVIDERS.length + 1,
  });
  return true;
}

/**
 * Resolves available streaming sources for a given Anime ID and Episode.
 * First checks official HD trailer/preview stream, then delegates to any user-configured community endpoints.
 */
export async function resolveStreams(animeId: number, episode = 1, customProviderUrl?: string): Promise<StreamSource[]> {
  const sources: StreamSource[] = [];

  // 1. Fetch Anime Metadata from AniList
  const anime = await getAnimeDetails(animeId);
  if (!anime) return sources;

  // 2. Built-in Official Preview Source (YouTube official trailer)
  if (anime.trailer && anime.trailer.id && anime.trailer.site === 'youtube') {
    sources.push({
      title: `${anime.title.english || anime.title.romaji} — Official Trailer & Preview`,
      url: `https://www.youtube-nocookie.com/embed/${anime.trailer.id}?autoplay=1&enablejsapi=1`,
      quality: '1080p',
      format: 'mp4',
      isM3U8: false,
      server: 'Official Anime Studio / YouTube',
      subtitles: [
        { lang: 'en', url: '', label: 'English (Official)' }
      ]
    });
  }

  // 3. User-Provided Community Extension / Custom Provider
  const envCommunityUrl = typeof (globalThis as any).process !== 'undefined' ? (globalThis as any).process?.env?.COMMUNITY_PROVIDER_URL : undefined;
  const targetProviderUrl = customProviderUrl || envCommunityUrl;

  if (targetProviderUrl && targetProviderUrl.startsWith('http')) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const queryUrl = `${targetProviderUrl.replace(/\/$/, '')}/resolve?id=${animeId}&episode=${episode}&title=${encodeURIComponent(anime.title.romaji)}`;
      const resp = await fetch(queryUrl, {
        headers: { 'User-Agent': 'Neon-Provider-Engine/1.0', 'Accept': 'application/json' },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (resp.ok) {
        const communityData: any = await resp.json();
        if (Array.isArray(communityData.streams)) {
          sources.push(...communityData.streams);
        }
      }
    } catch {
      // Community provider failed or timed out — fail gracefully
    }
  }

  return sources;
}
