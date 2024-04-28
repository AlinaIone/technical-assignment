import { createSlice } from "@reduxjs/toolkit";

export const configurationSlice = createSlice({
  name: "configuration",
  initialState: { baseUrl: null, genres: null },
  reducers: {
    setBaseUrl: (state, action) => {
      state.baseUrl = action.payload.baseUrl;
    },
    setGenre: (state, action) => {
      state.genres = action.payload;
    },
  },
});

export const moviesSlice = createSlice({
  name: "movies",
  initialState: { movies: null, favoriteMovies: [] },
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setFavoriteMovies: (state, action) => {
      state.favoriteMovies = action.payload;
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

export const paginationSlice = createSlice({
  name: "pagination",
  initialState: { activePage: 1, totalPages: null },
  reducers: {
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
  },
})
