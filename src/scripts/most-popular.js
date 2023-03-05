import { fetchNews } from './FetchNews';

import { renderNewsCards, savePopularData } from './CommonFunctions';

onLoad();

async function onLoad() {
  try {
    const response = await fetchNews.fetchNewsByPopular();
    fetchNews.setHits(response.data.num_results);
    fetchNews.setFilterParams('popular');
    savePopularData(response.data.results);

    renderNewsCards();
    fetchNews.setNodeChild(document.querySelectorAll('.news-card'));
    fetchNews.setIsUrlRequest(true);
    // логіка localstorage
  } catch (error) {
    console.log(error);
  }
}