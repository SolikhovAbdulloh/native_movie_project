import { api_key } from "../constants";
import { ApiRequest } from "./axiso";

const base_url = "https://api.themoviedb.org/3";

const tredingmovie = `${base_url}/trending/movie/day?api_key=${api_key}`;
const upcomingmovie = `${base_url}/movie/upcoming?api_key=${api_key}`;
const top_ratedmovie = `${base_url}/movie/top_rated?api_key=${api_key}`;
const pupularmovie = `${base_url}/movie/popular?api_key=${api_key}`;

export const fetchTopratedMovie = () => {
  return ApiRequest(top_ratedmovie);
};
export const fetchPopularMovie = () => {
  return ApiRequest(pupularmovie);
};
export const fetchTrendingMovie = () => {
  return ApiRequest(tredingmovie);
};

export const fetchUpcomingMovie = () => {
  return ApiRequest(upcomingmovie);
};

export const Image500 = (posterPath) => {
  return posterPath ? "https://image.tmdb.org/t/p/w500" + posterPath : null;
};
export const Image350 = (posterPath) => {
  return posterPath ? "https://image.tmdb.org/t/p/w350" + posterPath : null;
};
export const Image185 = (posterPath) => {
  return posterPath ? "https://image.tmdb.org/t/p/w185" + posterPath : null;
};
export const movieDetail = (id) => `${base_url}/movie/${id}?api_key=${api_key}`;

export const movieCredits = (id) =>
  `${base_url}/movie/${id}/credits?api_key=${api_key}`;

export const similarMovie = (id) =>
  `${base_url}/movie/${id}/similar?api_key=${api_key}`;

export const fetchMovieDetails = (id) => {
  return ApiRequest(movieDetail(id));
};

export const fetchMovieCredits = (id) => {
  return ApiRequest(movieCredits(id));
};

export const fetchMovieSimilar = (id) => {
  return ApiRequest(similarMovie(id));
};
