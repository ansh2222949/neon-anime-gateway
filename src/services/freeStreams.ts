/**
 * Free Anime Stream & Episode Router
 * Identifies official free streaming sources (Muse Asia, Ani-One, YouTube Licensors)
 * and resolves stream URLs for web player and Stremio.
 */

import { StreamSource } from '../types/index.js';
import { getAnimeDetails } from './anilist.js';
import { resolveStreams } from './providerEngine.js';

// Curated list of popular anime with official 100% free full episodes on YouTube
const OFFICIAL_FREE_LICENSORS: Record<string, { channel: string; searchPrefix: string }> = {
  'spy x family': { channel: 'Muse Asia', searchPrefix: 'Spy x Family Episode' },
  'jujutsu kaisen': { channel: 'Ani-One Asia', searchPrefix: 'Jujutsu Kaisen Episode' },
  'chainsaw man': { channel: 'Ani-One Asia', searchPrefix: 'Chainsaw Man Episode' },
  'tokyo revengers': { channel: 'Muse Asia', searchPrefix: 'Tokyo Revengers Episode' },
  'frieren': { channel: 'Muse Asia', searchPrefix: 'Frieren Episode' },
  'mob psycho 100': { channel: 'Muse Asia', searchPrefix: 'Mob Psycho 100 Episode' },
  'classroom of the elite': { channel: 'Muse Asia', searchPrefix: 'Classroom of the Elite Episode' },
  'danmachi': { channel: 'Muse Asia', searchPrefix: 'Is It Wrong to Try to Pick Up Girls in a Dungeon Episode' },
  'bleach': { channel: 'Ani-One Asia', searchPrefix: 'Bleach Thousand-Year Blood War Episode' },
};

export async function getEpisodeWatchOptions(animeId: number, episode = 1, customProviderUrl?: string) {
  const anime = await getAnimeDetails(animeId);
  if (!anime) return { anime: null, streams: [], officialFree: null, stremioUrl: null };

  const titleLower = (anime.title.english || anime.title.romaji).toLowerCase();
  let officialFreeChannel: string | null = null;
  let officialFreeEmbedUrl: string | null = null;

  for (const [key, info] of Object.entries(OFFICIAL_FREE_LICENSORS)) {
    if (titleLower.includes(key)) {
      officialFreeChannel = info.channel;
      const searchQuery = `${info.searchPrefix} ${episode} ${info.channel}`;
      officialFreeEmbedUrl = `https://www.youtube-nocookie.com/embed?listType=search&list=${encodeURIComponent(searchQuery)}`;
      break;
    }
  }

  // Resolve streams (official trailer + any community provider)
  const streams = await resolveStreams(animeId, episode, customProviderUrl);

  // If official free YouTube licensor matches, add it as a primary free stream
  if (officialFreeEmbedUrl && officialFreeChannel) {
    streams.unshift({
      title: `${anime.title.english || anime.title.romaji} — Episode ${episode} (Official Free Stream)`,
      url: officialFreeEmbedUrl,
      quality: '1080p',
      format: 'mp4',
      isM3U8: false,
      isFreeOfficial: true,
      server: `Official Licensor (${officialFreeChannel})`,
      subtitles: [
        { lang: 'en', url: '', label: 'English' }
      ]
    });
  }

  const stremioDeepLink = `stremio:///detail/series/neon_anime_${animeId}`;

  return {
    anime,
    episode,
    officialFree: officialFreeChannel ? { channel: officialFreeChannel, embedUrl: officialFreeEmbedUrl } : null,
    stremioUrl: stremioDeepLink,
    streams
  };
}
