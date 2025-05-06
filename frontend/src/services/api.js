const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
}

export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results;
}

export const getGenres = async () => {
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en`)
    const data = await response.json();
    return data.genres;
}

export const getPopularActors = async() => {
    const response = await fetch(`${BASE_URL}/person/popular?api_key=${API_KEY}&language=en&page=1`)
    const data = await response.json();
    return data.results;
}

export const searchActors = async (query) => {
    const response = await fetch(`${BASE_URL}/search/person?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=1`)
    const data = await response.json();
    return data.results;
}

export const getMovieDetails = async(movie_id) => {
    const response = await fetch(`${BASE_URL}/movie/${movie_id}?api_key=${API_KEY}&language=en`)
    const data = await response.json();
    return data.results;
}
