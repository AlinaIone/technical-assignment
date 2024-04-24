import { MOVIE_RESPONSE_FAKE, WANTED_MOVIES_FAKE } from "./mockData";
import apiTMDB from "./apiInterceptor";

export const getMovieList = async () => {
  const response = await apiTMDB.get("/movie/popular");
  return response.data;

  // return Promise.resolve(MOVIE_RESPONSE_FAKE)
};

export const getConfiguration = async () => {
  const response = await apiTMDB.get("/configuration");
  return response.data;
};

export const getWantedMovies = async (specificWord) => {
  const response = await apiTMDB.get("/search/movie",
    {params: { query: specificWord, include_adult: true }}
  );

  return response.data;
  // return Promise.resolve(WANTED_MOVIES_FAKE)
};


export const getMovieDetails = async (movieId) => {
  const response = await apiTMDB.get(`/movie/${movieId}`)

  return response.data
   // return Promise.resolve(WANTED_MOVIES_FAKE)
}

export const getMovieGenre = async () => {
  const response = await apiTMDB.get(`/genre/movie/list`)

  return response.data
   // return Promise.resolve(WANTED_MOVIES_FAKE)
}

