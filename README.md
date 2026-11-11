<div align="center">

# ⚡ Neon Anime Gateway

### **High-Performance Edge Anime Discovery Engine & Spatial Web Player**
*Built on Hono v4, Cloudflare Workers & AniList GraphQL for [Neon Anime](https://github.com/ansh2222949) and [Stremio](https://stremio.com).*

<br/>

[![Framework](https://img.shields.io/badge/Framework-Hono%20v4-E36002?style=for-the-badge&logo=hono&logoColor=white)](https://hono.dev)
[![Runtime](https://img.shields.io/badge/Runtime-Cloudflare%20Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://workers.cloudflare.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![GraphQL](https://img.shields.io/badge/Metadata-AniList%20GraphQL-02A9FF?style=for-the-badge&logo=graphql&logoColor=white)](https://anilist.co)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

<br/>

[**🚀 1-Click Deploy**](#-deploy-to-cloud) • [**🏛️ Architecture**](#-key-architectural-innovations) • [**🍏 Spatial Web Hub**](#-visionos--apple-spatial-glass-web-player) • [**📡 API Matrix**](#-api-reference) • [**💻 Local Setup**](#-local-development)

---

<p align="center">
  <a href="https://deploy.workers.cloudflare.com/?url=https://github.com/ansh2222949/neon-anime-gateway"><img src="https://deploy.workers.cloudflare.com/button" alt="Deploy to Cloudflare Workers" height="32" /></a>
  &nbsp;&nbsp;
  <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fansh2222949%2Fneon-anime-gateway"><img src="https://vercel.com/button" alt="Deploy with Vercel" height="32" /></a>
</p>

</div>

<br/>

## ✨ Why Neon Anime Gateway? (At a Glance)

| 🌐 **AniList GraphQL Engine** | ⚡ **Edge-Native (<15ms Latency)** | 🍏 **visionOS Spatial Web Hub** | 🔄 **Extensible Provider Architecture** |
| :--- | :--- | :--- | :--- |
| Zero-key official public GraphQL pipeline fetching trending charts, synopsis, studio credits, and release dates. | Ultra-lightweight Hono v4 engine deployed across 300+ global Cloudflare edge data centers with zero cold-start lag. | Dark OLED visionOS glass aesthetic with dynamic ambient orbs, instant keyboard search (`/`), and HD trailer modal. | Modular provider registry inspired by Zangetsu & Stremio, supporting official studio previews and custom community endpoints. |

---

## 🚀 Key Architectural Innovations

Traditional anime apps either hardcode brittle scrapers directly inside mobile APKs (requiring constant app updates) or host copyright-infringing video files on expensive servers.

**Neon Anime Gateway** decouples this pipeline following the **Modular Provider Pattern**:

1. **🏛️ Separation of Concerns (The Clean Gateway):**
   - The Gateway acts as a clean, high-performance edge proxy and metadata aggregator.
   - Core metadata and trending series are fetched directly from **AniList's public GraphQL API**.
   - Zero video files are hosted or stored on the server (100% compliant with zero-storage educational standards).

2. **🔌 Dynamic Community Provider Engine (`src/services/providerEngine.ts`):**
   - Built-in official preview resolver for HD studio trailers.
   - Supports plug-and-play community resolvers via runtime headers (`X-Provider-Url`) or registration endpoints (`POST /api/v1/providers/register`).

3. **🔄 Unified Dual-Protocol Compatibility:**
   - **Neon Anime App REST API**: `/api/v1/trending`, `/api/v1/search`, `/api/v1/anime/:id`, `/api/v1/watch/:id`.
   - **Stremio Addon Protocol**: Full support for Stremio series/movie catalog discovery, rich metadata with 500x750 posters, and direct stream triggers (`/catalog/...`, `/meta/...`, `/stream/...`).

4. **🍏 visionOS Spatial Glass Web Dashboard:**
   - Integrated dark OLED web console at `/` matching the Neon design language.
   - Instant search with keyboard navigation (`/` to search, `Esc` to close).
   - One-click copy buttons for Neon App and Stremio installation (`stremio://...`).

---

## 🛠️ Deploy to Cloud

### Option 1: 1-Click Deploy to Cloudflare Workers (Recommended)
1. Click the button below:  
   [![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/ansh2222949/neon-anime-gateway)
2. Log into your free Cloudflare account.
3. Your worker will be live globally in `<30` seconds on:  
   `https://neon-anime-gateway.<your-subdomain>.workers.dev`

### Option 2: Deploy via Wrangler CLI
```bash
# Clone the repository
git clone https://github.com/ansh2222949/neon-anime-gateway.git
cd neon-anime-gateway

# Install dependencies
npm install

# Deploy to Cloudflare Workers
npx wrangler deploy
```

---

## 📱 How to Connect to Stremio & Neon Anime App

### 1. In Stremio (Desktop / Android / Android TV)
1. In your browser or Stremio app, enter:
   ```text
   stremio://neon-anime-gateway.<your-worker>.workers.dev/manifest.json
   ```
2. Tap **Install**.
3. Browse the **Anime — Trending** catalog to explore top series, episode lists, and launch previews.

### 2. In Neon Anime App (Android)
1. Open **Neon Anime** on your phone.
2. Go to **Settings → Addon & Gateways**.
3. Paste your gateway manifest URL:
   ```text
   https://neon-anime-gateway.<your-worker>.workers.dev/manifest.json
   ```
4. Tap **Connect**. Instant edge discovery is activated!

---

## 📡 API Reference

| Method | Endpoint | Description | Cache Policy |
|---|---|---|---|
| `GET` | `/` | Apple visionOS Spatial Glass Web Hub & Search | `public, max-age=3600` |
| `GET` | `/health` | Service health, version & registered providers count | `no-cache` |
| `GET` | `/manifest.json` | Dual Stremio & Neon Addon Manifest | `public, max-age=86400` |
| `GET` | `/api/v1/trending?page=1&perPage=24` | Fetch top trending anime series from AniList | `public, max-age=3600` |
| `GET` | `/api/v1/search?q={query}` | Multi-lingual anime search (English + Romaji) | `public, max-age=3600` |
| `GET` | `/api/v1/anime/:id` | Detailed anime metadata, episodes, studio, trailer | `public, max-age=86400` |
| `GET` | `/api/v1/top-rated` | All-time highest-rated anime list | `public, max-age=3600` |
| `GET` | `/api/v1/watch/:id/:episode?` | Resolve available streams via Provider Engine | `public, max-age=1800` |
| `GET` | `/api/v1/providers` | List all active media providers | `no-cache` |
| `POST` | `/api/v1/providers/register` | Register external community provider URL | `no-cache` |
| `GET` | `/catalog/series/:id/:extra?.json` | Stremio anime catalog endpoint | `public, max-age=3600` |
| `GET` | `/meta/series/:id.json` | Stremio rich metadata & episode selector | `public, max-age=86400` |
| `GET` | `/stream/series/:id.json` | Stremio stream resolution endpoint | `public, max-age=3600` |

---

## 💻 Local Development

```bash
# 1. Clone the repository
git clone https://github.com/ansh2222949/neon-anime-gateway.git
cd neon-anime-gateway

# 2. Install dependencies
npm install

# 3. Start local edge development server
npm run dev

# 4. Run endpoint tests
node test_endpoints.mjs
```

Local server starts at `http://localhost:8787`.

---

## 📄 License & Legal Disclaimer

* **License:** Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.
* **Disclaimer:** See [`DISCLAIMER.md`](DISCLAIMER.md) for full educational notice and DMCA guidelines.

<div align="center">
<br/>

**Neon Anime Gateway** — *Crafted with architectural precision by **Ansh Shrivastava** for high-speed edge anime discovery.*

</div>
