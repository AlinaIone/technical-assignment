import { createSlice } from "@reduxjs/toolkit";

export const configurationSlice = createSlice({
  name: "configuration",
  initialState: { baseUrl: null },
  reducers: {
    setBaseUrl: (state, action) => {
      state.baseUrl = action.payload.baseUrl;
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
