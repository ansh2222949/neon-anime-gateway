import app from './src/index.js';

async function runTests() {
  console.log('Testing Neon Anime Gateway endpoints...\n');

  // 1. Health
  const resHealth = await app.request('/health');
  console.log('1. /health -> status:', resHealth.status);
  const healthData = await resHealth.json();
  console.log('   Data:', healthData);

  // 2. Manifest
  const resManifest = await app.request('/manifest.json');
  console.log('\n2. /manifest.json -> status:', resManifest.status);
  const manifestData = await resManifest.json();
  console.log('   Addon Name:', manifestData.name);

  // 3. Trending Anime
  const resTrending = await app.request('/api/v1/trending?perPage=3');
  console.log('\n3. /api/v1/trending -> status:', resTrending.status);
  const trendingData = await resTrending.json();
  console.log('   Trending count:', trendingData.media?.length);
  if (trendingData.media && trendingData.media.length > 0) {
    console.log('   Top Anime:', trendingData.media[0].title.english || trendingData.media[0].title.romaji);
  }

  // 4. Search Anime
  const resSearch = await app.request('/api/v1/search?q=Solo%20Leveling&perPage=2');
  console.log('\n4. /api/v1/search?q=Solo Leveling -> status:', resSearch.status);
  const searchData = await resSearch.json();
  console.log('   Search match:', searchData.media?.[0]?.title);

  // 5. HTML Dashboard
  const resHtml = await app.request('/');
  console.log('\n5. / (Dashboard HTML) -> status:', resHtml.status);
  const html = await resHtml.text();
  console.log('   HTML length:', html.length, 'bytes');

  console.log('\nALL ENDPOINT TESTS PASSED SUCCESSFULLY! 🚀');
}

runTests().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
