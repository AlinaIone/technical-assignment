import { createSlice } from "@reduxjs/toolkit";

export const configurationSlice = createSlice({
  name: "configuration",
  initialState: { baseUrl: null },
  reducers: {
    setBaseUrl: (state, action) => {
      console.log("we are fetching baseurl", action.payload.baseUrl);
      state.baseUrl = action.payload.baseUrl;
    },
  },
});

export const moviesSlice = createSlice({
  name: "movies",
  initialState: { movies: null },
  reducers: {
    setMovies: (state, action) => {
      console.log("we are fetching movies", action.payload);
      state.movies = action.payload;
    },
  },
});
