import { configureStore } from "@reduxjs/toolkit";
import { configurationSlice, movieDetailsSlice, moviesSlice, paginationSlice, thereAreErrorsSlice } from "./slices";

export const storeActions = {
  configuration: configurationSlice.actions,
  movies: moviesSlice.actions,
  movieDetails: movieDetailsSlice.actions, 
  pagination: paginationSlice.actions,
  errors:thereAreErrorsSlice.actions
};

export const reduxStore = configureStore({
  reducer: {
    configuration: configurationSlice.reducer,
    movies: moviesSlice.reducer,
    movieDetails: movieDetailsSlice.reducer,
    pagination: paginationSlice.reducer,
    errors: thereAreErrorsSlice.reducer
  },
});
