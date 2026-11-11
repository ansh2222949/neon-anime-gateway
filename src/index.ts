/**
 * Neon Anime Gateway — Master Hono Edge Application
 * High-performance Anime streaming resolver & discovery engine for Neon & Stremio.
 */

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { getTrendingAnime, searchAnime, getAnimeDetails, getTopRatedAnime } from './services/anilist.js';
import { resolveStreams, getRegisteredProviders, registerCommunityProvider } from './services/providerEngine.js';
import { getStremioManifest, handleStremioCatalog, handleStremioMeta, handleStremioStream } from './protocols/stremio.js';
import { renderDashboardHtml } from './ui/dashboard.js';

const app = new Hono();

// Global CORS Middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'User-Agent', 'X-Provider-Url'],
}));

// 1. Apple visionOS Spatial Glass Web UI
app.get('/', (c) => {
  c.header('Content-Type', 'text/html; charset=utf-8');
  c.header('Cache-Control', 'public, max-age=3600');
  return c.html(renderDashboardHtml());
});

// 2. Health & Diagnostics
app.get('/health', (c) => {
  return c.json({
    status: 'online',
    service: 'Neon Anime Gateway',
    version: '1.0.0',
    providers: getRegisteredProviders().length,
    timestamp: new Date().toISOString()
  });
});

// 3. Stremio Addon Manifest
app.get('/manifest.json', (c) => {
  c.header('Cache-Control', 'public, max-age=86400');
  return c.json(getStremioManifest());
});

// 4. Stremio Protocol Routes
app.get('/catalog/:type/:id/:extra?.json', async (c) => {
  const type = c.req.param('type');
  const id = c.req.param('id');
  const extraParam = c.req.param('extra');

  let search: string | undefined;
  if (extraParam && extraParam.startsWith('search=')) {
    search = decodeURIComponent(extraParam.replace('search=', ''));
  }

  const result = await handleStremioCatalog(type, id, search);
  c.header('Cache-Control', 'public, max-age=3600');
  return c.json(result);
});

app.get('/meta/:type/:id.json', async (c) => {
  const type = c.req.param('type') || 'series';
  const id = c.req.param('id') || '';
  const result = await handleStremioMeta(type, id);
  c.header('Cache-Control', 'public, max-age=86400');
  return c.json(result);
});

app.get('/stream/:type/:id.json', async (c) => {
  const type = c.req.param('type') || 'series';
  const id = c.req.param('id') || '';
  const result = await handleStremioStream(type, id);
  c.header('Cache-Control', 'public, max-age=3600');
  return c.json(result);
});

// 5. Neon Anime Client REST API
app.get('/api/v1/trending', async (c) => {
  const page = parseInt(c.req.query('page') || '1', 10);
  const perPage = parseInt(c.req.query('perPage') || '24', 10);
  const data = await getTrendingAnime(page, perPage);
  c.header('Cache-Control', 'public, max-age=3600');
  return c.json(data);
});

app.get('/api/v1/search', async (c) => {
  const q = c.req.query('q') || '';
  const page = parseInt(c.req.query('page') || '1', 10);
  const perPage = parseInt(c.req.query('perPage') || '24', 10);
  if (!q.trim()) {
    return c.json({ media: [], pageInfo: { total: 0 } });
  }
  const data = await searchAnime(q, page, perPage);
  c.header('Cache-Control', 'public, max-age=3600');
  return c.json(data);
});

app.get('/api/v1/anime/:id', async (c) => {
  const id = parseInt(c.req.param('id'), 10);
  if (isNaN(id)) return c.json({ error: 'Invalid Anime ID' }, 400);

  const anime = await getAnimeDetails(id);
  if (!anime) return c.json({ error: 'Anime not found' }, 404);

  c.header('Cache-Control', 'public, max-age=86400');
  return c.json(anime);
});

app.get('/api/v1/top-rated', async (c) => {
  const page = parseInt(c.req.query('page') || '1', 10);
  const perPage = parseInt(c.req.query('perPage') || '24', 10);
  const data = await getTopRatedAnime(page, perPage);
  c.header('Cache-Control', 'public, max-age=3600');
  return c.json(data);
});

app.get('/api/v1/watch/:id/:episode?', async (c) => {
  const id = parseInt(c.req.param('id'), 10);
  const episode = parseInt(c.req.param('episode') || '1', 10);
  const customProviderUrl = c.req.header('X-Provider-Url') || c.req.query('provider');

  if (isNaN(id)) return c.json({ error: 'Invalid Anime ID' }, 400);

  const streams = await resolveStreams(id, episode, customProviderUrl);
  c.header('Cache-Control', 'public, max-age=1800');
  return c.json({
    animeId: id,
    episode,
    streams
  });
});

app.get('/api/v1/providers', (c) => {
  return c.json({
    providers: getRegisteredProviders()
  });
});

app.post('/api/v1/providers/register', async (c) => {
  try {
    const body: any = await c.req.json();
    if (!body.id || !body.name || !body.endpoint) {
      return c.json({ error: 'Missing required provider fields (id, name, endpoint)' }, 400);
    }
    const success = registerCommunityProvider({
      id: body.id,
      name: body.name,
      endpoint: body.endpoint
    });
    return c.json({ success, message: success ? 'Provider registered successfully' : 'Provider ID already exists' });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

export default app;
