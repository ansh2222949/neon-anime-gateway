/**
 * Apple visionOS & Spatial Glass Anime Dashboard
 * Features: Dynamic Backdrop Mesh, Trending Carousel, Instant Search,
 * High-Res Media Cards, Episode Selector, and One-Click Stremio/Neon Integration.
 */

export function renderDashboardHtml(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <meta name="theme-color" content="#000000" />
    <title>Neon Anime — Spatial Edge Hub</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
    <style>
      :root {
        --bg-base: #000000;
        --glass-surface: rgba(28, 28, 30, 0.58);
        --glass-elevated: rgba(44, 44, 46, 0.65);
        --glass-pill: rgba(255, 255, 255, 0.08);
        --border-specular: rgba(255, 255, 255, 0.12);
        --border-highlight: rgba(255, 255, 255, 0.24);
        --neon-cyan: #00f0ff;
        --neon-purple: #9d4edd;
        --apple-blue: #0a84ff;
        --apple-green: #30d158;
        --apple-red: #fa243c;
        --text-primary: #f5f5f7;
        --text-secondary: rgba(235, 235, 245, 0.6);
        --text-tertiary: rgba(235, 235, 245, 0.35);
        --font-sans: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif;
        --font-mono: 'SF Mono', 'JetBrains Mono', monospace;
        --spring: cubic-bezier(0.22, 1, 0.36, 1);
      }

      * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }

      body {
        background: var(--bg-base);
        color: var(--text-primary);
        font-family: var(--font-sans);
        min-height: 100vh;
        overflow-x: hidden;
        -webkit-font-smoothing: antialiased;
      }

      /* Ambient Spatial Mesh Backdrop */
      .ambient-canvas {
        position: fixed;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        overflow: hidden;
        background: radial-gradient(circle at 50% 0%, #171720 0%, #000000 80%);
      }

      .ambient-orb {
        position: absolute;
        width: 600px;
        height: 600px;
        border-radius: 50%;
        filter: blur(140px);
        opacity: 0.18;
        animation: floatOrb 20s ease-in-out infinite alternate;
      }
      .orb-1 { top: -100px; left: -100px; background: var(--neon-cyan); }
      .orb-2 { top: 200px; right: -150px; background: var(--neon-purple); animation-delay: -7s; }

      @keyframes floatOrb {
        0% { transform: scale(1) translate(0, 0); }
        100% { transform: scale(1.2) translate(50px, 80px); }
      }

      /* Top Glass Navigation Bar */
      .nav-bar {
        position: sticky;
        top: 0;
        z-index: 100;
        height: 56px;
        background: rgba(10, 10, 12, 0.72);
        backdrop-filter: saturate(180%) blur(25px);
        -webkit-backdrop-filter: saturate(180%) blur(25px);
        border-bottom: 0.5px solid var(--border-specular);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 28px;
      }

      .brand {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 700;
        font-size: 16px;
        letter-spacing: -0.02em;
        text-decoration: none;
        color: #fff;
      }

      .brand-badge {
        font-size: 11px;
        font-weight: 600;
        padding: 2px 8px;
        border-radius: 999px;
        background: rgba(0, 240, 255, 0.12);
        color: var(--neon-cyan);
        border: 0.5px solid rgba(0, 240, 255, 0.3);
      }

      .nav-actions {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 14px;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        text-decoration: none;
        transition: all 0.25s var(--spring);
        border: 0.5px solid var(--border-specular);
        background: var(--glass-pill);
        color: var(--text-primary);
      }
      .btn:hover {
        background: rgba(255, 255, 255, 0.14);
        border-color: var(--border-highlight);
        transform: scale(1.03);
      }
      .btn-primary {
        background: #ffffff;
        color: #000;
        border-color: transparent;
      }
      .btn-primary:hover {
        background: #e5e5ea;
      }

      /* Container */
      .container {
        position: relative;
        z-index: 1;
        max-width: 1200px;
        margin: 0 auto;
        padding: 36px 24px 80px;
      }

      /* Hero Section */
      .hero {
        text-align: center;
        margin-bottom: 40px;
      }

      .hero h1 {
        font-size: clamp(2.2rem, 5vw, 3.6rem);
        font-weight: 800;
        letter-spacing: -0.035em;
        line-height: 1.1;
        margin-bottom: 12px;
        background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.7) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .hero p {
        color: var(--text-secondary);
        font-size: clamp(1rem, 2vw, 1.15rem);
        max-width: 580px;
        margin: 0 auto 24px;
      }

      /* Search Box */
      .search-wrapper {
        position: relative;
        max-width: 620px;
        margin: 0 auto 48px;
      }

      .search-input {
        width: 100%;
        height: 52px;
        padding: 0 48px 0 20px;
        background: rgba(30, 30, 34, 0.65);
        border: 1px solid var(--border-specular);
        border-radius: 999px;
        color: #fff;
        font-size: 15px;
        font-family: inherit;
        backdrop-filter: blur(20px);
        outline: none;
        transition: all 0.3s var(--spring);
      }
      .search-input:focus {
        border-color: var(--neon-cyan);
        box-shadow: 0 0 24px rgba(0, 240, 255, 0.2);
        background: rgba(40, 40, 46, 0.85);
      }

      .search-hint {
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 11px;
        font-family: var(--font-mono);
        color: var(--text-tertiary);
        padding: 2px 6px;
        background: rgba(255, 255, 255, 0.08);
        border-radius: 6px;
      }

      /* Section Header */
      .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
      }
      .section-title {
        font-size: 20px;
        font-weight: 700;
        letter-spacing: -0.02em;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      /* Anime Grid */
      .anime-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 20px;
      }

      .anime-card {
        background: var(--glass-surface);
        border: 0.5px solid var(--border-specular);
        border-radius: 16px;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.3s var(--spring);
        position: relative;
        display: flex;
        flex-direction: column;
      }
      .anime-card:hover {
        transform: translateY(-6px) scale(1.02);
        border-color: var(--border-highlight);
        box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
      }

      .card-poster {
        position: relative;
        width: 100%;
        aspect-ratio: 2 / 3;
        overflow: hidden;
        background: #1c1c1e;
      }
      .card-poster img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s var(--spring);
      }
      .anime-card:hover .card-poster img {
        transform: scale(1.06);
      }

      .score-pill {
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 3px 8px;
        border-radius: 999px;
        font-size: 11px;
        font-weight: 700;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(10px);
        color: var(--apple-green);
        border: 0.5px solid rgba(255, 255, 255, 0.15);
      }

      .format-pill {
        position: absolute;
        bottom: 10px;
        left: 10px;
        padding: 2px 7px;
        border-radius: 6px;
        font-size: 10px;
        font-weight: 600;
        background: rgba(0, 0, 0, 0.75);
        color: #fff;
        text-transform: uppercase;
      }

      .card-body {
        padding: 12px;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
      }

      .card-title {
        font-size: 13px;
        font-weight: 600;
        line-height: 1.35;
        margin-bottom: 6px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .card-meta {
        font-size: 11px;
        color: var(--text-secondary);
        margin-top: auto;
        display: flex;
        justify-content: space-between;
      }

      /* Modal Player */
      .modal-overlay {
        position: fixed;
        inset: 0;
        z-index: 200;
        background: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(30px);
        display: none;
        align-items: center;
        justify-content: center;
        padding: 24px;
      }
      .modal-overlay.active {
        display: flex;
      }

      .modal-content {
        background: #141418;
        border: 1px solid var(--border-highlight);
        border-radius: 24px;
        max-width: 900px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 32px 80px rgba(0, 0, 0, 0.7);
        position: relative;
      }

      .modal-close {
        position: absolute;
        top: 16px;
        right: 16px;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
      }

      .video-wrapper {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 9;
        background: #000;
        border-top-left-radius: 24px;
        border-top-right-radius: 24px;
        overflow: hidden;
      }
      .video-wrapper iframe {
        width: 100%;
        height: 100%;
        border: none;
      }

      .modal-details {
        padding: 24px;
      }
      .modal-title {
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 8px;
      }
      .modal-desc {
        font-size: 13px;
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: 20px;
      }

      .toast {
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: rgba(30, 30, 35, 0.9);
        backdrop-filter: blur(20px);
        border: 0.5px solid var(--border-highlight);
        padding: 10px 20px;
        border-radius: 999px;
        font-size: 13px;
        color: #fff;
        opacity: 0;
        transition: all 0.3s var(--spring);
        z-index: 300;
      }
      .toast.show {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
      }
    </style>
  </head>
  <body>
    <div class="ambient-canvas">
      <div class="ambient-orb orb-1"></div>
      <div class="ambient-orb orb-2"></div>
    </div>

    <nav class="nav-bar">
      <a href="/" class="brand">
        <span>⚡ Neon Anime</span>
        <span class="brand-badge">Edge Gateway</span>
      </a>
      <div class="nav-actions">
        <button class="btn" onclick="copyManifestUrl()">📋 Copy Addon URL</button>
        <a id="stremioBtn" class="btn btn-primary" href="#">🍿 Add to Stremio</a>
      </div>
    </nav>

    <div class="container">
      <header class="hero">
        <h1>Pure Anime. Edge Fast.</h1>
        <p>High-performance Anime discovery, AniList metadata, and official HD stream resolver for Neon & Stremio.</p>

        <div class="search-wrapper">
          <input
            id="searchInput"
            class="search-input"
            type="text"
            placeholder="Search anime (e.g. Solo Leveling, Jujutsu Kaisen, Ado)..."
            autocomplete="off"
          />
          <span class="search-hint">/</span>
        </div>
      </header>

      <section>
        <div class="section-header">
          <div class="section-title">
            <span>🔥</span>
            <span id="gridTitle">Trending Now</span>
          </div>
          <span id="resultCount" style="font-size: 12px; color: var(--text-secondary);">Loading...</span>
        </div>

        <div id="animeGrid" class="anime-grid">
          <!-- Cards populated via JavaScript -->
        </div>
      </section>
    </div>

    <!-- Video Modal Player -->
    <div id="videoModal" class="modal-overlay" onclick="closeModal(event)">
      <div class="modal-content" onclick="event.stopPropagation()">
        <button class="modal-close" onclick="closeModal()">✕</button>
        <div class="video-wrapper" id="videoContainer">
          <!-- Iframe or Video Player -->
        </div>
        <div class="modal-details">
          <div class="modal-title" id="modalAnimeTitle">Anime Title</div>
          <div id="modalMeta" style="display: flex; gap: 8px; margin-bottom: 12px; font-size: 12px; color: var(--neon-cyan);"></div>
          <div class="modal-desc" id="modalAnimeDesc">Synopsis...</div>
          <div style="display: flex; gap: 10px;">
            <button class="btn btn-primary" onclick="launchInStremioCurrent()">🍿 Watch in Stremio</button>
            <button class="btn" onclick="closeModal()">Close Preview</button>
          </div>
        </div>
      </div>
    </div>

    <div id="toast" class="toast">Copied to clipboard!</div>

    <script>
      let currentAnimeList = [];
      let activeAnime = null;

      const origin = window.location.origin;
      const manifestUrl = origin + '/manifest.json';
      const stremioProtocolUrl = 'stremio://' + window.location.host + '/manifest.json';

      document.getElementById('stremioBtn').href = stremioProtocolUrl;

      function showToast(msg) {
        const toast = document.getElementById('toast');
        toast.innerText = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2400);
      }

      function copyManifestUrl() {
        navigator.clipboard.writeText(manifestUrl);
        showToast('Addon URL copied for Neon App & Stremio!');
      }

      async function loadTrending() {
        try {
          const resp = await fetch('/api/v1/trending');
          const data = await resp.json();
          currentAnimeList = data.media || [];
          renderGrid(currentAnimeList, 'Trending Now');
        } catch (err) {
          console.error(err);
        }
      }

      let searchTimeout = null;
      document.getElementById('searchInput').addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const q = e.target.value.trim();
        if (!q) {
          loadTrending();
          return;
        }
        searchTimeout = setTimeout(async () => {
          document.getElementById('resultCount').innerText = 'Searching...';
          try {
            const resp = await fetch('/api/v1/search?q=' + encodeURIComponent(q));
            const data = await resp.json();
            currentAnimeList = data.media || [];
            renderGrid(currentAnimeList, 'Search Results for "' + q + '"');
          } catch (err) {
            console.error(err);
          }
        }, 300);
      });

      window.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement !== document.getElementById('searchInput')) {
          e.preventDefault();
          document.getElementById('searchInput').focus();
        }
        if (e.key === 'Escape') {
          closeModal();
        }
      });

      function renderGrid(list, title) {
        const grid = document.getElementById('animeGrid');
        document.getElementById('gridTitle').innerText = title;
        document.getElementById('resultCount').innerText = list.length + ' titles';
        grid.innerHTML = '';

        list.forEach(anime => {
          const card = document.createElement('div');
          card.className = 'anime-card';
          card.onclick = () => openModal(anime);

          const posterUrl = anime.coverImage.extraLarge || anime.coverImage.large;
          const score = anime.averageScore ? (anime.averageScore / 10).toFixed(1) : null;
          const displayTitle = anime.title.english || anime.title.romaji;

          card.innerHTML = \`
            <div class="card-poster">
              <img src="\${posterUrl}" alt="\${displayTitle}" loading="lazy" />
              \${score ? \`<span class="score-pill">★ \${score}</span>\` : ''}
              <span class="format-pill">\${anime.format}</span>
            </div>
            <div class="card-body">
              <div class="card-title">\${displayTitle}</div>
              <div class="card-meta">
                <span>\${anime.seasonYear || '—'}</span>
                <span>\${anime.episodes ? anime.episodes + ' eps' : 'Releasing'}</span>
              </div>
            </div>
          \`;
          grid.appendChild(card);
        });
      }

      function openModal(anime) {
        activeAnime = anime;
        document.getElementById('modalAnimeTitle').innerText = anime.title.english || anime.title.romaji;
        document.getElementById('modalAnimeDesc').innerText = anime.description || 'No description available.';
        
        const metaDiv = document.getElementById('modalMeta');
        metaDiv.innerHTML = \`
          <span>⭐ \${anime.averageScore ? (anime.averageScore / 10).toFixed(1) + '/10' : 'N/A'}</span>
          <span>•</span>
          <span>📅 \${anime.seasonYear || 'N/A'}</span>
          <span>•</span>
          <span>🎬 \${anime.format} (\${anime.episodes || '?'} Episodes)</span>
          <span>•</span>
          <span>🏷️ \${(anime.genres || []).slice(0, 3).join(', ')}</span>
        \`;

        const container = document.getElementById('videoContainer');
        if (anime.trailer && anime.trailer.id && anime.trailer.site === 'youtube') {
          container.innerHTML = \`<iframe src="https://www.youtube-nocookie.com/embed/\${anime.trailer.id}?autoplay=1&enablejsapi=1" allow="autoplay; fullscreen" allowfullscreen></iframe>\`;
        } else {
          container.innerHTML = \`<div style="display:flex;height:100%;align-items:center;justify-content:center;color:#888;">No trailer preview available. Launch in Stremio or Neon App to stream.</div>\`;
        }

        document.getElementById('videoModal').classList.add('active');
      }

      function closeModal() {
        document.getElementById('videoModal').classList.remove('active');
        document.getElementById('videoContainer').innerHTML = '';
      }

      function launchInStremioCurrent() {
        if (!activeAnime) return;
        window.location.href = 'stremio://' + window.location.host + '/detail/series/neon_anime_' + activeAnime.id;
      }

      loadTrending();
    </script>
  </body>
</html>`;
}
