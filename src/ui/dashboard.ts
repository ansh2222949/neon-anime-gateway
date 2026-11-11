/**
 * Apple visionOS & Spatial Glass Anime Dashboard (Flagship Edition)
 * Features:
 * - Live Airing Countdown Timers (Ticks every second)
 * - Official Free Full Episode Player & Stremio Launcher
 * - Anime OP/ED Soundtrack Jukebox Player
 * - Characters & Japanese Voice Actors (Seiyuu) Showcase
 * - AI Anime Vibe Matcher
 * - Custom Community Provider URL settings
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
        --glass-surface: rgba(26, 26, 30, 0.58);
        --glass-elevated: rgba(40, 40, 44, 0.72);
        --glass-pill: rgba(255, 255, 255, 0.08);
        --border-specular: rgba(255, 255, 255, 0.12);
        --border-highlight: rgba(255, 255, 255, 0.24);
        --neon-cyan: #00f0ff;
        --neon-purple: #a855f7;
        --apple-blue: #0a84ff;
        --apple-green: #30d158;
        --apple-red: #fa243c;
        --text-primary: #f5f5f7;
        --text-secondary: rgba(235, 235, 245, 0.65);
        --text-tertiary: rgba(235, 235, 245, 0.4);
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
        background: radial-gradient(circle at 50% 0%, #151522 0%, #000000 85%);
      }

      .ambient-orb {
        position: absolute;
        width: 650px;
        height: 650px;
        border-radius: 50%;
        filter: blur(150px);
        opacity: 0.18;
        animation: floatOrb 22s ease-in-out infinite alternate;
      }
      .orb-1 { top: -120px; left: -100px; background: var(--neon-cyan); }
      .orb-2 { top: 250px; right: -160px; background: var(--neon-purple); animation-delay: -8s; }

      @keyframes floatOrb {
        0% { transform: scale(1) translate(0, 0); }
        100% { transform: scale(1.22) translate(60px, 90px); }
      }

      /* Top Navigation Bar */
      .nav-bar {
        position: sticky;
        top: 0;
        z-index: 100;
        height: 58px;
        background: rgba(10, 10, 14, 0.75);
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
        padding: 7px 15px;
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
      .btn-cyan {
        background: var(--neon-cyan);
        color: #000;
        border: none;
      }

      /* Container */
      .container {
        position: relative;
        z-index: 1;
        max-width: 1200px;
        margin: 0 auto;
        padding: 32px 24px 80px;
      }

      /* Hero Section */
      .hero {
        text-align: center;
        margin-bottom: 36px;
      }

      .hero h1 {
        font-size: clamp(2.3rem, 5.5vw, 3.8rem);
        font-weight: 800;
        letter-spacing: -0.035em;
        line-height: 1.08;
        margin-bottom: 12px;
        background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.68) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .hero p {
        color: var(--text-secondary);
        font-size: clamp(1rem, 2vw, 1.15rem);
        max-width: 600px;
        margin: 0 auto 24px;
      }

      /* Navigation Tabs (Apple Segmented Bar) */
      .tab-bar {
        display: flex;
        justify-content: center;
        gap: 6px;
        margin: 0 auto 36px;
        background: rgba(28, 28, 32, 0.65);
        padding: 4px;
        border-radius: 999px;
        max-width: 580px;
        border: 0.5px solid var(--border-specular);
        backdrop-filter: blur(20px);
      }

      .tab-btn {
        flex: 1;
        padding: 8px 16px;
        border-radius: 999px;
        border: none;
        background: transparent;
        color: var(--text-secondary);
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.25s var(--spring);
      }
      .tab-btn.active {
        background: rgba(255, 255, 255, 0.16);
        color: #fff;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      }

      /* Search Box */
      .search-wrapper {
        position: relative;
        max-width: 620px;
        margin: 0 auto 36px;
      }

      .search-input {
        width: 100%;
        height: 52px;
        padding: 0 48px 0 20px;
        background: rgba(30, 30, 36, 0.68);
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
        box-shadow: 0 0 24px rgba(0, 240, 255, 0.25);
        background: rgba(38, 38, 46, 0.88);
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
        margin-bottom: 22px;
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
        box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45);
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

      .countdown-badge {
        position: absolute;
        bottom: 10px;
        left: 10px;
        right: 10px;
        padding: 4px 8px;
        border-radius: 8px;
        font-size: 11px;
        font-weight: 700;
        font-family: var(--font-mono);
        background: rgba(0, 0, 0, 0.85);
        color: var(--neon-cyan);
        text-align: center;
        backdrop-filter: blur(10px);
        border: 0.5px solid rgba(0, 240, 255, 0.3);
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

      /* Modal Player & Details */
      .modal-overlay {
        position: fixed;
        inset: 0;
        z-index: 200;
        background: rgba(0, 0, 0, 0.88);
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
        background: #14141a;
        border: 1px solid var(--border-highlight);
        border-radius: 24px;
        max-width: 960px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 32px 80px rgba(0, 0, 0, 0.75);
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

      .modal-body {
        padding: 24px;
      }

      .modal-tabs {
        display: flex;
        gap: 8px;
        margin-bottom: 20px;
        border-bottom: 0.5px solid var(--border-specular);
        padding-bottom: 12px;
      }

      .modal-tab-btn {
        padding: 6px 14px;
        border-radius: 999px;
        border: none;
        background: transparent;
        color: var(--text-secondary);
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s var(--spring);
      }
      .modal-tab-btn.active {
        background: rgba(255, 255, 255, 0.16);
        color: #fff;
      }

      /* Cast Grid */
      .cast-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
        gap: 14px;
      }
      .cast-card {
        background: rgba(30, 30, 36, 0.6);
        border: 0.5px solid var(--border-specular);
        border-radius: 12px;
        padding: 8px;
        text-align: center;
      }
      .cast-img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
        margin: 0 auto 8px;
      }

      /* Theme list */
      .theme-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 14px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.04);
        margin-bottom: 8px;
        border: 0.5px solid var(--border-specular);
      }

      .toast {
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: rgba(30, 30, 35, 0.95);
        backdrop-filter: blur(20px);
        border: 0.5px solid var(--border-highlight);
        padding: 10px 22px;
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
        <button class="btn" onclick="openProviderSettings()">⚙️ Provider Settings</button>
        <button class="btn" onclick="copyManifestUrl()">📋 Copy Addon URL</button>
        <a id="stremioBtn" class="btn btn-primary" href="#">🍿 Add to Stremio</a>
      </div>
    </nav>

    <div class="container">
      <header class="hero">
        <h1>Pure Anime. Live Edge.</h1>
        <p>Real-time AniList releases, live episode countdowns, official themes & Stremio stream resolution.</p>

        <!-- Segmented Tab Navigation -->
        <div class="tab-bar">
          <button id="tabTrending" class="tab-btn active" onclick="switchView('trending')">🔥 Trending</button>
          <button id="tabSchedule" class="tab-btn" onclick="switchView('schedule')">📅 Airing Radar</button>
          <button id="tabVibe" class="tab-btn" onclick="switchView('vibe')">🧠 Vibe Matcher</button>
          <button id="tabTop" class="tab-btn" onclick="switchView('top')">⭐ Top Rated</button>
        </div>

        <div class="search-wrapper">
          <input
            id="searchInput"
            class="search-input"
            type="text"
            placeholder="Search anime (e.g. Solo Leveling, Jujutsu Kaisen, Frieren)..."
            autocomplete="off"
          />
          <span class="search-hint">/</span>
        </div>
      </header>

      <section>
        <div class="section-header">
          <div class="section-title">
            <span id="gridIcon">🔥</span>
            <span id="gridTitle">Trending Now</span>
          </div>
          <span id="resultCount" style="font-size: 12px; color: var(--text-secondary);">Loading...</span>
        </div>

        <div id="animeGrid" class="anime-grid">
          <!-- Populated via JS -->
        </div>
      </section>
    </div>

    <!-- Video & Details Modal -->
    <div id="videoModal" class="modal-overlay" onclick="closeModal(event)">
      <div class="modal-content" onclick="event.stopPropagation()">
        <button class="modal-close" onclick="closeModal()">✕</button>
        <div class="video-wrapper" id="videoContainer">
          <!-- Iframe or Video Player -->
        </div>
        <div class="modal-body">
          <div class="modal-title" id="modalAnimeTitle" style="font-size: 22px; font-weight: 700; margin-bottom: 6px;"></div>
          <div id="modalMeta" style="display: flex; gap: 8px; margin-bottom: 16px; font-size: 12px; color: var(--neon-cyan);"></div>

          <div class="modal-tabs">
            <button class="modal-tab-btn active" onclick="switchModalTab('overview')">Overview</button>
            <button class="modal-tab-btn" onclick="switchModalTab('watch')">🎬 Watch Free</button>
            <button class="modal-tab-btn" onclick="switchModalTab('themes')">🎵 Themes (OP/ED)</button>
            <button class="modal-tab-btn" onclick="switchModalTab('cast')">👥 Characters & Cast</button>
          </div>

          <div id="modalTabOverview">
            <div class="modal-desc" id="modalAnimeDesc" style="font-size: 13px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 20px;"></div>
            <div style="display: flex; gap: 10px;">
              <button class="btn btn-cyan" onclick="launchFreeWatchModal()">🎬 Watch Episode</button>
              <button class="btn btn-primary" onclick="launchInStremioCurrent()">🍿 Watch in Stremio</button>
            </div>
          </div>

          <div id="modalTabWatch" style="display: none;">
            <div id="watchOptionsContent" style="padding: 10px 0;">Loading watch options...</div>
          </div>

          <div id="modalTabThemes" style="display: none;">
            <div id="themesContent">Loading soundtracks...</div>
          </div>

          <div id="modalTabCast" style="display: none;">
            <div id="castContent" class="cast-grid">Loading characters...</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Provider Settings Modal -->
    <div id="providerModal" class="modal-overlay" onclick="closeProviderModal(event)">
      <div class="modal-content" style="max-width: 520px; padding: 24px;" onclick="event.stopPropagation()">
        <button class="modal-close" onclick="closeProviderModal()">✕</button>
        <h3 style="font-size: 18px; margin-bottom: 12px;">⚙️ Custom Community Provider</h3>
        <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 16px;">
          Like Zangetsu & Stremio, you can paste any custom community resolver URL to dynamically resolve 1080p streams.
        </p>
        <input
          id="customProviderInput"
          class="search-input"
          style="height: 44px; margin-bottom: 14px;"
          type="url"
          placeholder="https://community-provider-domain.com"
        />
        <div style="display: flex; gap: 10px; justify-content: flex-end;">
          <button class="btn" onclick="saveProviderUrl()">Save Provider</button>
          <button class="btn btn-primary" onclick="clearProviderUrl()">Reset to Default</button>
        </div>
      </div>
    </div>

    <div id="toast" class="toast">Action completed!</div>

    <script>
      let currentAnimeList = [];
      let activeAnime = null;
      let currentView = 'trending';
      let countdownInterval = null;

      const stremioProtocolUrl = 'stremio://' + window.location.host + '/manifest.json';
      document.getElementById('stremioBtn').href = stremioProtocolUrl;

      function showToast(msg) {
        const toast = document.getElementById('toast');
        toast.innerText = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2400);
      }

      function copyManifestUrl() {
        navigator.clipboard.writeText(window.location.origin + '/manifest.json');
        showToast('Addon URL copied for Neon App & Stremio!');
      }

      function openProviderSettings() {
        document.getElementById('customProviderInput').value = localStorage.getItem('neon_community_provider') || '';
        document.getElementById('providerModal').classList.add('active');
      }

      function closeProviderModal() {
        document.getElementById('providerModal').classList.remove('active');
      }

      function saveProviderUrl() {
        const val = document.getElementById('customProviderInput').value.trim();
        if (val) {
          localStorage.setItem('neon_community_provider', val);
          showToast('Custom provider saved!');
        }
        closeProviderModal();
      }

      function clearProviderUrl() {
        localStorage.removeItem('neon_community_provider');
        document.getElementById('customProviderInput').value = '';
        showToast('Reset to official preview resolver!');
        closeProviderModal();
      }

      function formatCountdown(sec) {
        if (sec <= 0) return 'Aired Just Now';
        const d = Math.floor(sec / 86400);
        const h = Math.floor((sec % 86400) / 3600);
        const m = Math.floor((sec % 3600) / 60);
        const s = Math.floor(sec % 60);
        if (d > 0) return \`\${d}d \${h}h \${m}m\`;
        return \`\${h}h \${m}m \${s}s\`;
      }

      async function switchView(view) {
        currentView = view;
        clearInterval(countdownInterval);

        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        if (view === 'trending') document.getElementById('tabTrending').classList.add('active');
        if (view === 'schedule') document.getElementById('tabSchedule').classList.add('active');
        if (view === 'vibe') document.getElementById('tabVibe').classList.add('active');
        if (view === 'top') document.getElementById('tabTop').classList.add('active');

        if (view === 'trending') {
          loadTrending();
        } else if (view === 'schedule') {
          loadSchedule();
        } else if (view === 'vibe') {
          loadVibe();
        } else if (view === 'top') {
          loadTopRated();
        }
      }

      async function loadTrending() {
        document.getElementById('gridTitle').innerText = 'Trending Now';
        document.getElementById('gridIcon').innerText = '🔥';
        document.getElementById('resultCount').innerText = 'Loading...';
        try {
          const resp = await fetch('/api/v1/trending');
          const data = await resp.json();
          currentAnimeList = data.media || [];
          renderGrid(currentAnimeList);
        } catch (err) {
          console.error(err);
        }
      }

      async function loadTopRated() {
        document.getElementById('gridTitle').innerText = 'All-Time Top Rated';
        document.getElementById('gridIcon').innerText = '⭐';
        document.getElementById('resultCount').innerText = 'Loading...';
        try {
          const resp = await fetch('/api/v1/top-rated');
          const data = await resp.json();
          currentAnimeList = data.media || [];
          renderGrid(currentAnimeList);
        } catch (err) {
          console.error(err);
        }
      }

      async function loadSchedule() {
        document.getElementById('gridTitle').innerText = 'Weekly Airing Radar (Live Countdowns)';
        document.getElementById('gridIcon').innerText = '📅';
        document.getElementById('resultCount').innerText = 'Loading schedule...';

        try {
          const resp = await fetch('/api/v1/schedule');
          const data = await resp.json();
          const schedules = data.schedule || [];

          document.getElementById('resultCount').innerText = schedules.length + ' upcoming releases';
          const grid = document.getElementById('animeGrid');
          grid.innerHTML = '';

          schedules.forEach(item => {
            const card = document.createElement('div');
            card.className = 'anime-card';
            card.onclick = () => openModal({
              id: item.media.id,
              title: item.media.title,
              format: item.media.format,
              coverImage: item.media.coverImage,
              averageScore: item.media.averageScore,
              genres: item.media.genres,
              description: 'Airing Episode ' + item.episode + ' soon.'
            });

            card.innerHTML = \`
              <div class="card-poster">
                <img src="\${item.media.coverImage.extraLarge || item.media.coverImage.large}" alt="\${item.media.title.romaji}" loading="lazy" />
                <span class="countdown-badge" data-countdown="\${item.timeUntilAiring}">\${formatCountdown(item.timeUntilAiring)}</span>
              </div>
              <div class="card-body">
                <div class="card-title">\${item.media.title.english || item.media.title.romaji}</div>
                <div class="card-meta">
                  <span style="color:var(--neon-cyan);">Ep \${item.episode}</span>
                  <span>\${item.media.format}</span>
                </div>
              </div>
            \`;
            grid.appendChild(card);
          });

          // Ticking countdown timer
          countdownInterval = setInterval(() => {
            document.querySelectorAll('[data-countdown]').forEach(el => {
              let t = parseInt(el.getAttribute('data-countdown'), 10) - 1;
              if (t < 0) t = 0;
              el.setAttribute('data-countdown', t);
              el.innerText = formatCountdown(t);
            });
          }, 1000);

        } catch (err) {
          console.error(err);
        }
      }

      async function loadVibe() {
        document.getElementById('gridTitle').innerText = 'AI Anime Vibe Matcher';
        document.getElementById('gridIcon').innerText = '🧠';
        document.getElementById('resultCount').innerText = 'Select a vibe...';

        const grid = document.getElementById('animeGrid');
        grid.innerHTML = \`
          <div style="grid-column: 1 / -1; display:flex; flex-wrap:wrap; gap:10px; margin-bottom:20px;">
            <button class="btn btn-cyan" onclick="queryVibe('Dark Supernatural Mind Games')">🧠 Dark & Mind Games</button>
            <button class="btn btn-cyan" onclick="queryVibe('Solo Leveling Overpowered Action')">⚡ Overpowered Action</button>
            <button class="btn btn-cyan" onclick="queryVibe('Wholesome Heartfelt Romance')">💖 Wholesome Romance</button>
            <button class="btn btn-cyan" onclick="queryVibe('Hype Shonen Tournament')">🔥 Hype Shonen</button>
          </div>
        \`;
        queryVibe('Dark Supernatural Mind Games');
      }

      async function queryVibe(vibe) {
        document.getElementById('resultCount').innerText = 'Matching ' + vibe + '...';
        try {
          const resp = await fetch('/api/v1/recommend?vibe=' + encodeURIComponent(vibe));
          const data = await resp.json();
          currentAnimeList = data.matchedAnime || [];
          renderGrid(currentAnimeList);
        } catch (err) {
          console.error(err);
        }
      }

      let searchTimeout = null;
      document.getElementById('searchInput').addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const q = e.target.value.trim();
        if (!q) {
          switchView('trending');
          return;
        }
        searchTimeout = setTimeout(async () => {
          document.getElementById('resultCount').innerText = 'Searching...';
          try {
            const resp = await fetch('/api/v1/search?q=' + encodeURIComponent(q));
            const data = await resp.json();
            currentAnimeList = data.media || [];
            renderGrid(currentAnimeList);
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
          closeProviderModal();
        }
      });

      function renderGrid(list) {
        const grid = document.getElementById('animeGrid');
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

      async function openModal(anime) {
        activeAnime = anime;
        switchModalTab('overview');

        document.getElementById('modalAnimeTitle').innerText = anime.title.english || anime.title.romaji;
        document.getElementById('modalAnimeDesc').innerText = anime.description || 'No description available.';
        
        const metaDiv = document.getElementById('modalMeta');
        metaDiv.innerHTML = \`
          <span>⭐ \${anime.averageScore ? (anime.averageScore / 10).toFixed(1) + '/10' : 'N/A'}</span>
          <span>•</span>
          <span>📅 \${anime.seasonYear || 'N/A'}</span>
          <span>•</span>
          <span>🎬 \${anime.format || 'TV'} (\${anime.episodes || '?'} Episodes)</span>
          <span>•</span>
          <span>🏷️ \${(anime.genres || []).slice(0, 3).join(', ')}</span>
        \`;

        // Trailer Video
        const container = document.getElementById('videoContainer');
        if (anime.trailer && anime.trailer.id && anime.trailer.site === 'youtube') {
          container.innerHTML = \`<iframe src="https://www.youtube-nocookie.com/embed/\${anime.trailer.id}?autoplay=1&enablejsapi=1" allow="autoplay; fullscreen" allowfullscreen></iframe>\`;
        } else {
          container.innerHTML = \`<div style="display:flex;height:100%;align-items:center;justify-content:center;color:#888;">Preview available in Stremio or Neon Player.</div>\`;
        }

        document.getElementById('videoModal').classList.add('active');

        // Preload themes & cast
        loadModalThemes(anime.id);
        loadModalCast(anime.id);
        loadModalWatch(anime.id);
      }

      function closeModal() {
        document.getElementById('videoModal').classList.remove('active');
        document.getElementById('videoContainer').innerHTML = '';
      }

      function switchModalTab(tab) {
        document.querySelectorAll('.modal-tab-btn').forEach(b => b.classList.remove('active'));
        document.getElementById('modalTabOverview').style.display = 'none';
        document.getElementById('modalTabWatch').style.display = 'none';
        document.getElementById('modalTabThemes').style.display = 'none';
        document.getElementById('modalTabCast').style.display = 'none';

        if (tab === 'overview') {
          document.getElementById('modalTabOverview').style.display = 'block';
        } else if (tab === 'watch') {
          document.getElementById('modalTabWatch').style.display = 'block';
        } else if (tab === 'themes') {
          document.getElementById('modalTabThemes').style.display = 'block';
        } else if (tab === 'cast') {
          document.getElementById('modalTabCast').style.display = 'block';
        }
      }

      async function loadModalWatch(animeId) {
        const customProv = localStorage.getItem('neon_community_provider') || '';
        try {
          const resp = await fetch('/api/v1/watch/' + animeId + '/1?provider=' + encodeURIComponent(customProv));
          const data = await resp.json();
          const div = document.getElementById('watchOptionsContent');

          let html = '';
          if (data.officialFree) {
            html += \`
              <div style="background:rgba(48,209,88,0.1); border:0.5px solid var(--apple-green); border-radius:12px; padding:14px; margin-bottom:14px;">
                <div style="font-weight:700; color:var(--apple-green); margin-bottom:4px;">🟢 Official Free Full Episodes Available</div>
                <div style="font-size:12px; color:var(--text-secondary); margin-bottom:10px;">Licensed directly on YouTube by \${data.officialFree.channel} in 1080p with subtitles.</div>
                <button class="btn btn-cyan" onclick="embedWatchPlayer('\${data.officialFree.embedUrl}')">▶️ Play Full Episode 1 (Free)</button>
              </div>
            \`;
          }

          html += \`
            <div style="background:rgba(255,255,255,0.05); border:0.5px solid var(--border-specular); border-radius:12px; padding:14px;">
              <div style="font-weight:700; margin-bottom:4px;">🍿 Watch via Stremio / Community Resolver</div>
              <div style="font-size:12px; color:var(--text-secondary); margin-bottom:10px;">Launch directly in Stremio with community multi-audio/subtitle streams.</div>
              <button class="btn btn-primary" onclick="launchInStremioCurrent()">Launch in Stremio</button>
            </div>
          \`;

          div.innerHTML = html;
        } catch (err) {
          console.error(err);
        }
      }

      function embedWatchPlayer(url) {
        document.getElementById('videoContainer').innerHTML = \`<iframe src="\${url}&autoplay=1" allow="autoplay; fullscreen" allowfullscreen></iframe>\`;
        switchModalTab('overview');
      }

      async function loadModalThemes(animeId) {
        try {
          const resp = await fetch('/api/v1/anime/' + animeId + '/themes');
          const data = await resp.json();
          const div = document.getElementById('themesContent');
          if (!data.themes || data.themes.length === 0) {
            div.innerHTML = '<div style="color:#888;">No themes indexed yet.</div>';
            return;
          }
          div.innerHTML = data.themes.map(t => \`
            <div class="theme-item">
              <div>
                <span class="brand-badge" style="margin-right:8px;">\${t.type}</span>
                <strong style="font-size:13px;">\${t.name}</strong>
                <div style="font-size:11px; color:var(--text-secondary);">\${t.artist || 'Anime OST'}</div>
              </div>
              <button class="btn" onclick="embedWatchPlayer('\${t.videoUrl}')">▶️ Listen</button>
            </div>
          \`).join('');
        } catch (err) {
          console.error(err);
        }
      }

      async function loadModalCast(animeId) {
        try {
          const resp = await fetch('/api/v1/anime/' + animeId + '/cast');
          const data = await resp.json();
          const div = document.getElementById('castContent');
          if (!data.characters || data.characters.length === 0) {
            div.innerHTML = '<div style="color:#888;">No character details found.</div>';
            return;
          }
          div.innerHTML = data.characters.map(c => \`
            <div class="cast-card">
              <img class="cast-img" src="\${c.image || 'https://via.placeholder.com/80'}" alt="\${c.name}" />
              <div style="font-size:12px; font-weight:600; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">\${c.name}</div>
              <div style="font-size:10px; color:var(--neon-cyan);">\${c.voiceActor ? c.voiceActor.name : c.role}</div>
            </div>
          \`).join('');
        } catch (err) {
          console.error(err);
        }
      }

      function launchInStremioCurrent() {
        if (!activeAnime) return;
        window.location.href = 'stremio://' + window.location.host + '/detail/series/neon_anime_' + activeAnime.id;
      }

      function launchFreeWatchModal() {
        switchModalTab('watch');
      }

      loadTrending();
    </script>
  </body>
</html>`;
}
