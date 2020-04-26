export const API_KEY = 'e7d0686a92c04b2baa9142434a8e6cad';

// ------------------------------------
// Top news
// ------------------------------------

export const apiTopNews = country =>
  `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=e7d0686a92c04b2baa9142434a8e6cad`;

// ------------------------------------
// Categories
// ------------------------------------

export const apiCategoryNews = (country, category, pageSize) =>
  `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&apiKey=e7d0686a92c04b2baa9142434a8e6cad`;

// ------------------------------------
// Search
// ------------------------------------
