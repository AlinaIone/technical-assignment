import { createSlice } from "@reduxjs/toolkit";

export const configurationSlice = createSlice({
  name: "configuration",
  initialState: { baseUrl: null, genres: null },
  reducers: {
    setBaseUrl: (state, action) => {
      state.baseUrl = action.payload.baseUrl;
      console.log(state.baseUrl);
    },
    setGenre: (state, action) => {
      state.genres = action.payload;
      console.log(state.genres);
    },
  },
});

export const moviesSlice = createSlice({
  name: "movies",
  initialState: { movies: null },
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
  },
});

export const movieDetailsSlice = createSlice({
  name: "movieDetails",
  initialState: { movieDetails: null },
  reducers: {
    setMovieDetails: (state, action) => {
      state.movieDetails = action.payload;
    },
  },
});
