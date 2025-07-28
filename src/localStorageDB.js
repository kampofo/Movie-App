// localStorageDB.js

const STORAGE_KEY = "movie_searches";

function getStoredData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    const data = getStoredData();
    const index = data.findIndex((item) => item.searchTerm === searchTerm);

    if (index !== -1) {
      data[index].count += 1;
    } else {
      data.push({
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }

    saveData(data);
  } catch (error) {
    console.error("Failed to update local search count:", error);
  }
};

export const getTrendingMovies = async () => {
  try {
    const data = getStoredData();
    return data.sort((a, b) => b.count - a.count).slice(0, 5);
  } catch (error) {
    console.error("Failed to load trending movies:", error);
    return [];
  }
};
