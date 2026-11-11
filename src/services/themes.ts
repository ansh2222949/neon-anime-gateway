/**
 * Anime Themes (OP/ED) & Soundtrack Resolver
 * Provides official HD opening and ending themes with video previews and high-fidelity audio.
 */

import { AnimeTheme } from '../types/index.js';

// Curated database of iconic anime openings and endings
const CURATED_THEMES: Record<string, AnimeTheme[]> = {
  // Solo Leveling
  'solo leveling': [
    { type: 'OP', name: 'LEveL', artist: 'SawanoHiroyuki[nZk]:TOMORROW X TOGETHER', videoUrl: 'https://www.youtube-nocookie.com/embed/Pj1aY6gC5e0' },
    { type: 'ED', name: 'request', artist: 'krage', videoUrl: 'https://www.youtube-nocookie.com/embed/0G6wN8m7wWw' },
  ],
  // Jujutsu Kaisen
  'jujutsu kaisen': [
    { type: 'OP', name: 'Kaikai Kitan', artist: 'Eve', videoUrl: 'https://www.youtube-nocookie.com/embed/1tk1pqwrOys' },
    { type: 'OP', name: 'Ao no Sumika (Where Our Blue Is)', artist: 'Tatsuya Kitani', videoUrl: 'https://www.youtube-nocookie.com/embed/gcgKUcJKxIs' },
    { type: 'OP', name: 'SPECIALZ', artist: 'King Gnu', videoUrl: 'https://www.youtube-nocookie.com/embed/5yb2N3pnZT4' },
    { type: 'ED', name: 'Lost in Paradise', artist: 'ALI ft. AKLO', videoUrl: 'https://www.youtube-nocookie.com/embed/6qgcPCTfl2U' },
  ],
  // Demon Slayer
  'kimetsu no yaiba': [
    { type: 'OP', name: 'Gurenge', artist: 'LiSA', videoUrl: 'https://www.youtube-nocookie.com/embed/pmanD_s7G3U' },
    { type: 'OP', name: 'Zankyosanka', artist: 'Aimer', videoUrl: 'https://www.youtube-nocookie.com/embed/tLQLa6lM3Us' },
    { type: 'OP', name: 'Kizuna no Kiseki', artist: 'MAN WITH A MISSION x milet', videoUrl: 'https://www.youtube-nocookie.com/embed/Jb6Zlg304yI' },
  ],
  // Oshi no Ko
  'oshi no ko': [
    { type: 'OP', name: 'Idol (アイドル)', artist: 'YOASOBI', videoUrl: 'https://www.youtube-nocookie.com/embed/ZRtdQ81jPUQ' },
    { type: 'ED', name: 'Mephisto', artist: 'QUEEN BEE', videoUrl: 'https://www.youtube-nocookie.com/embed/0_k0Zp7G4i0' },
  ],
  // Chainsaw Man
  'chainsaw man': [
    { type: 'OP', name: 'KICK BACK', artist: 'Kenshi Yonezu', videoUrl: 'https://www.youtube-nocookie.com/embed/dFlDRhvM4b0' },
    { type: 'ED', name: 'Chainsaw Blood', artist: 'Vaundy', videoUrl: 'https://www.youtube-nocookie.com/embed/8ofCGSEBM4A' },
  ],
  // Frieren
  'frieren': [
    { type: 'OP', name: 'Yuusha (The Brave)', artist: 'YOASOBI', videoUrl: 'https://www.youtube-nocookie.com/embed/OIBODIPC_8Y' },
    { type: 'OP', name: 'Haru', artist: 'yorushika', videoUrl: 'https://www.youtube-nocookie.com/embed/QoHMb6_R2lY' },
    { type: 'ED', name: 'Anytime Anywhere', artist: 'milet', videoUrl: 'https://www.youtube-nocookie.com/embed/9Gsm9p9xRHg' },
  ],
  // Attack on Titan
  'shingeki no kyojin': [
    { type: 'OP', name: 'Shinzo wo Sasageyo!', artist: 'Linked Horizon', videoUrl: 'https://www.youtube-nocookie.com/embed/CID-sYQNCew' },
    { type: 'OP', name: 'The Rumbling', artist: 'SiM', videoUrl: 'https://www.youtube-nocookie.com/embed/2S4qGKmzBJE' },
  ],
  // Tokyo Ghoul
  'tokyo ghoul': [
    { type: 'OP', name: 'Unravel', artist: 'TK from Ling tosite sigure', videoUrl: 'https://www.youtube-nocookie.com/embed/7aMOurgDB-o' },
  ],
  // Mashle
  'mashle': [
    { type: 'OP', name: 'Bling-Bang-Bang-Born', artist: 'Creepy Nuts', videoUrl: 'https://www.youtube-nocookie.com/embed/210R0ozmVwg' },
  ]
};

export function getAnimeThemesForTitle(title: string): AnimeTheme[] {
  const cleanTitle = title.toLowerCase();
  for (const [key, themes] of Object.entries(CURATED_THEMES)) {
    if (cleanTitle.includes(key) || key.includes(cleanTitle)) {
      return themes;
    }
  }

  // Generic fallback theme search link
  return [
    {
      type: 'OP',
      name: `${title} — Official Opening Theme`,
      artist: 'Anime Original Soundtrack',
      videoUrl: `https://www.youtube-nocookie.com/embed?listType=search&list=${encodeURIComponent(title + ' anime opening theme')}`,
    }
  ];
}
