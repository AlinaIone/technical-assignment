import { configureStore } from "@reduxjs/toolkit";
import { configurationSlice, movieDetailsSlice, moviesSlice, paginationSlice } from "./slices";

export const storeActions = {
  configuration: configurationSlice.actions,
  movies: moviesSlice.actions,
  movieDetails: movieDetailsSlice.actions, 
  pagination: paginationSlice.actions
};

export const reduxStore = configureStore({
  reducer: {
    configuration: configurationSlice.reducer,
    movies: moviesSlice.reducer,
    movieDetails: movieDetailsSlice.reducer,
    pagination: paginationSlice.reducer
  },
});
