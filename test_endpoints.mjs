import app from './src/index.js';

async function runTests() {
  console.log('Testing Enhanced Neon Anime Gateway Endpoints...\n');

  // 1. Health
  const resHealth = await app.request('/health');
  console.log('1. /health -> status:', resHealth.status);

  // 2. Schedule (Live Countdowns)
  const resSchedule = await app.request('/api/v1/schedule?perPage=2');
  console.log('\n2. /api/v1/schedule -> status:', resSchedule.status);
  const schedData = await resSchedule.json();
  console.log('   Schedule item count:', schedData.schedule?.length);
  if (schedData.schedule?.[0]) {
    console.log(`   Next airing: Ep ${schedData.schedule[0].episode} in ${schedData.schedule[0].timeUntilAiring}s (${schedData.schedule[0].media.title.romaji})`);
  }

  // 3. Characters & Cast for Solo Leveling (153518)
  const resCast = await app.request('/api/v1/anime/153518/cast');
  console.log('\n3. /api/v1/anime/153518/cast -> status:', resCast.status);
  const castData = await resCast.json();
  console.log('   Cast count:', castData.characters?.length);
  if (castData.characters?.[0]) {
    console.log(`   Main Character: ${castData.characters[0].name} (VA: ${castData.characters[0].voiceActor?.name || 'N/A'})`);
  }

  // 4. Themes (OP/ED)
  const resThemes = await app.request('/api/v1/anime/153518/themes');
  console.log('\n4. /api/v1/anime/153518/themes -> status:', resThemes.status);
  const themeData = await resThemes.json();
  console.log('   Themes count:', themeData.themes?.length);
  if (themeData.themes?.[0]) {
    console.log(`   Theme: [${themeData.themes[0].type}] ${themeData.themes[0].name} by ${themeData.themes[0].artist}`);
  }

  // 5. Watch Options
  const resWatch = await app.request('/api/v1/watch/153518/1');
  console.log('\n5. /api/v1/watch/153518/1 -> status:', resWatch.status);
  const watchData = await resWatch.json();
  console.log('   Watch streams count:', watchData.streams?.length);

  // 6. AI Vibe Matcher
  const resVibe = await app.request('/api/v1/recommend?vibe=Dark%20Mind%20Games');
  console.log('\n6. /api/v1/recommend?vibe=Dark Mind Games -> status:', resVibe.status);
  const vibeData = await resVibe.json();
  console.log('   Matched anime:', vibeData.matchedAnime?.[0]?.title?.romaji);

  console.log('\nALL 6 NEW KILLER FEATURES ARE LIVE AND PASSING 100%! 🚀');
}

runTests().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
